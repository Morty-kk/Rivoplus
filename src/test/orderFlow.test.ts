import { describe, it, expect } from "vitest";
import { buildOrderMessage } from "@/lib/orderMessage";
import { buildCartItem, buildCartCheckoutMessage } from "@/lib/productSelection";
import { isSafeUrl } from "@/lib/utils";
import { getImageForLanguage } from "@/lib/getImageForLanguage";
import { products } from "@/pages/index-content";
import type { CartItem } from "@/lib/cart";
import type { TvPriceTable } from "@/components/TvPlanSelector";
import type { MusicPrices } from "@/components/MusicPlanSelector";
import type { CreativityPrices } from "@/components/CreativityPlanSelector";

const tvPrices: TvPriceTable = {
  gold: {
    1: { deutsch: 5, arabisch: 5 },
    12: { deutsch: 30, arabisch: 25 },
  },
  diamond: {
    12: { deutsch: 40, arabisch: 35 },
  },
};
const musicPrices: MusicPrices = { youtube: { premium: 40 } };
const creativityPrices: CreativityPrices = { adobe: { 12: 50 }, canva: { 12: 5 } };

const streamProduct = products.find((p) => p.slug === "stream")!;
const musicProduct = products.find((p) => p.slug === "music")!;
const adobeProduct = products.find((p) => p.slug === "adobe")!;
const chatgptProduct = products.find((p) => p.slug === "chatgpt")!;

describe("products data", () => {
  it("has unique slugs", () => {
    const slugs = products.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("provides all three languages for every product", () => {
    for (const p of products) {
      for (const lang of ["ar", "en", "de"] as const) {
        expect(p.title[lang], `${p.slug} title ${lang}`).toBeTruthy();
        expect(p.description[lang], `${p.slug} description ${lang}`).toBeTruthy();
        expect(p.longDescription[lang], `${p.slug} longDescription ${lang}`).toBeTruthy();
        expect(p.highlights[lang].length, `${p.slug} highlights ${lang}`).toBeGreaterThan(0);
      }
    }
  });
});

describe("buildOrderMessage", () => {
  it("builds a stream order with the selected plan, duration, and price", () => {
    const msg = buildOrderMessage({
      language: "en",
      productTitle: streamProduct.title.en,
      slug: "stream",
      tv: { value: { plan: "gold", duration: 12, audience: "arabisch" }, prices: tvPrices },
    });
    expect(msg).toContain("Plan: GOLD");
    expect(msg).toContain("Duration: 12 months");
    expect(msg).toContain("Server: Arabisch");
    expect(msg).toContain("Price: 25€");
  });

  it("falls back to 'On request' when the price is missing", () => {
    const msg = buildOrderMessage({
      language: "en",
      productTitle: streamProduct.title.en,
      slug: "stream",
      tv: { value: { plan: "diamond", duration: 1, audience: "deutsch" }, prices: tvPrices },
    });
    expect(msg).toContain("On request");
  });

  it("builds a music order with the youtube premium price", () => {
    const msg = buildOrderMessage({
      language: "de",
      productTitle: musicProduct.title.de,
      slug: "music",
      music: { value: { service: "youtube", tier: "premium", durationMonths: 12 }, prices: musicPrices },
    });
    expect(msg).toContain("Hallo Rivo+");
    expect(msg).toContain("40€");
  });

  it("uses the 12-month price for adobe and canva", () => {
    const msg = buildOrderMessage({
      language: "en",
      productTitle: adobeProduct.title.en,
      slug: "adobe",
      creativity: { value: { service: "adobe", tier: "pro", durationMonths: 12 }, prices: creativityPrices },
    });
    expect(msg).toContain("Adobe Creative Cloud");
    expect(msg).toContain("50€");
  });

  it("falls back to a plain hello message for products without a selector", () => {
    const msg = buildOrderMessage({
      language: "ar",
      productTitle: chatgptProduct.title.ar,
      slug: "chatgpt",
    });
    expect(msg).toContain(chatgptProduct.title.ar);
  });
});

describe("buildCartItem", () => {
  it("builds a stream cart item with price and option summary", () => {
    const item = buildCartItem({
      product: streamProduct,
      language: "en",
      tv: { value: { plan: "gold", duration: 12, audience: "arabisch" }, prices: tvPrices },
    });
    expect(item.id).toBe("stream:gold-12-arabisch");
    expect(item.price).toBe(25);
    expect(item.optionSummary.some((l) => l.includes("GOLD"))).toBe(true);
  });

  it("builds an 'on request' item for products without a selector", () => {
    const item = buildCartItem({ product: chatgptProduct, language: "en" });
    expect(item.price).toBeNull();
    expect(item.optionSummary).toEqual(["On request"]);
  });

  it("keeps distinct option selections as distinct cart ids", () => {
    const a = buildCartItem({
      product: streamProduct,
      language: "en",
      tv: { value: { plan: "gold", duration: 1, audience: "deutsch" }, prices: tvPrices },
    });
    const b = buildCartItem({
      product: streamProduct,
      language: "en",
      tv: { value: { plan: "diamond", duration: 12, audience: "deutsch" }, prices: tvPrices },
    });
    expect(a.id).not.toBe(b.id);
  });
});

describe("buildCartCheckoutMessage", () => {
  const baseItem: CartItem = {
    id: "stream:gold-12-arabisch",
    slug: "stream",
    title: "Rivo Plus Stream",
    image: "",
    optionSummary: ["Plan: GOLD"],
    price: 25,
    currency: "€",
    quantity: 2,
  };

  it("multiplies price by quantity and totals known prices", () => {
    const msg = buildCartCheckoutMessage([baseItem], "en");
    expect(msg).toContain("Qty: 2");
    expect(msg).toContain("Price: 50€");
    expect(msg).toContain("Total: 50€");
  });

  it("marks unknown prices as on request and appends it to the total", () => {
    const unknown: CartItem = { ...baseItem, id: "chatgpt:default", price: null, quantity: 1 };
    const msg = buildCartCheckoutMessage([baseItem, unknown], "en");
    expect(msg).toContain("Total: 50€ + On request");
  });
});

describe("isSafeUrl", () => {
  it("allows relative, http(s), mailto, and data:image urls", () => {
    expect(isSafeUrl("/assets/x.png")).toBe(true);
    expect(isSafeUrl("https://example.com")).toBe(true);
    expect(isSafeUrl("http://example.com")).toBe(true);
    expect(isSafeUrl("mailto:info@rivoplus.com")).toBe(true);
    expect(isSafeUrl("data:image/png;base64,AAAA")).toBe(true);
  });

  it("rejects javascript: and other unsafe schemes", () => {
    expect(isSafeUrl("javascript:alert(1)")).toBe(false);
    expect(isSafeUrl("data:text/html;base64,AAAA")).toBe(false);
    expect(isSafeUrl("vbscript:x")).toBe(false);
    expect(isSafeUrl("file:///etc/passwd")).toBe(false);
  });
});

describe("getImageForLanguage", () => {
  it("returns the arabic variant for ar when provided", () => {
    expect(getImageForLanguage("ar", "default.png", "ar.png")).toBe("ar.png");
  });

  it("falls back to the default for ar without a variant", () => {
    expect(getImageForLanguage("ar", "default.png")).toBe("default.png");
  });

  it("returns the default for en and de even when a variant exists", () => {
    expect(getImageForLanguage("en", "default.png", "ar.png")).toBe("default.png");
    expect(getImageForLanguage("de", "default.png", "ar.png")).toBe("default.png");
  });
});
