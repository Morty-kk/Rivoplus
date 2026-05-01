import type { Product, Language } from "@/pages/index-content";
import type { TvPlanSelectorValue, TvPriceTable } from "@/components/TvPlanSelector";
import type { MusicSelectorValue, MusicPrices } from "@/components/MusicPlanSelector";
import type { CreativitySelectorValue, CreativityPrices } from "@/components/CreativityPlanSelector";
import { getMusicPrice } from "@/components/MusicPlanSelector";
import { getCreativityPrice } from "@/components/CreativityPlanSelector";
import type { CartItem } from "@/lib/cart";
import { getImageForLanguage } from "@/lib/getImageForLanguage";

type SelectionArgs = {
  product: Product;
  language: Language;
  currency?: string;
  tv?: { value: TvPlanSelectorValue; prices: TvPriceTable };
  music?: { value: MusicSelectorValue; prices: MusicPrices };
  creativity?: { value: CreativitySelectorValue; prices: CreativityPrices };
};

const labels = {
  duration: { ar: "المدة", en: "Duration", de: "Laufzeit" },
  plan: { ar: "الخطة", en: "Plan", de: "Plan" },
  server: { ar: "السيرفر", en: "Server", de: "Server" },
  service: { ar: "الخدمة", en: "Service", de: "Service" },
  months: { ar: "شهر", en: "months", de: "Monate" },
  onRequest: { ar: "حسب الطلب", en: "On request", de: "Auf Anfrage" },
};

function normalizePrice(value: unknown): number | null {
  return typeof value === "number" ? value : null;
}

export function buildCartItem({
  product,
  language,
  currency = "€",
  tv,
  music,
  creativity,
}: SelectionArgs): Omit<CartItem, "quantity"> {
  const optionSummary: string[] = [];
  let price: number | null = null;
  let optionKey = "default";

  if (product.slug === "stream" && tv) {
    const { value, prices } = tv;
    price = normalizePrice(prices[value.plan]?.[value.duration]?.[value.audience]);
    optionSummary.push(`${labels.plan[language]}: ${value.plan.toUpperCase()}`);
    optionSummary.push(`${labels.duration[language]}: ${value.duration} ${labels.months[language]}`);
    optionSummary.push(`${labels.server[language]}: ${value.audience === "deutsch" ? "Deutsch" : "Arabisch"}`);
    optionKey = `${value.plan}-${value.duration}-${value.audience}`;
  }

  if (product.slug === "music" && music) {
    const { value, prices } = music;
    price = getMusicPrice(prices, value);
    optionSummary.push(`${labels.service[language]}: YouTube Premium`);
    optionSummary.push(`${labels.plan[language]}: Premium`);
    optionSummary.push(`${labels.duration[language]}: ${value.durationMonths} ${labels.months[language]}`);
    optionKey = `${value.service}-${value.tier}-${value.durationMonths}`;
  }

  if ((product.slug === "adobe" || product.slug === "canva") && creativity) {
    const service = product.slug;
    price = normalizePrice(creativity.prices?.[service]?.[12]);
    const serviceLabel = service === "adobe" ? "Adobe Creative Cloud" : "Canva Pro";
    optionSummary.push(`${labels.service[language]}: ${serviceLabel}`);
    optionSummary.push(`${labels.duration[language]}: 12 ${labels.months[language]}`);
    optionKey = `${service}-12`;
  }

  if (product.slug === "creativity" && creativity) {
    const { value, prices } = creativity;
    price = getCreativityPrice(prices, value);
    const serviceLabel = value.service === "adobe" ? "Adobe Creative Cloud" : "Canva Pro";
    optionSummary.push(`${labels.service[language]}: ${serviceLabel}`);
    optionSummary.push(`${labels.duration[language]}: ${value.durationMonths} ${labels.months[language]}`);
    optionKey = `${value.service}-${value.durationMonths}`;
  }

  if (optionSummary.length === 0) {
    optionSummary.push(labels.onRequest[language]);
  }

  return {
    id: `${product.slug}:${optionKey}`,
    slug: product.slug,
    title: product.title[language],
    image: getImageForLanguage(language, product.showcaseImage || product.heroImage, product.showcaseImageAr || product.heroImageAr),
    optionSummary,
    price,
    currency,
  };
}

export function buildCartCheckoutMessage(items: CartItem[], language: Language): string {
  const intro = {
    ar: "مرحباً Rivo+، أريد طلب المنتجات التالية:",
    en: "Hello Rivo+, I want to order these products:",
    de: "Hallo Rivo+, ich möchte diese Produkte bestellen:",
  };
  const quantity = { ar: "العدد", en: "Qty", de: "Menge" };
  const price = { ar: "السعر", en: "Price", de: "Preis" };
  const total = { ar: "المجموع", en: "Total", de: "Gesamt" };
  const onRequest = labels.onRequest;

  const lines = [intro[language], ""];
  let knownTotal = 0;
  let hasUnknownPrice = false;

  items.forEach((item, index) => {
    const itemTotal = typeof item.price === "number" ? item.price * item.quantity : null;
    if (itemTotal === null) {
      hasUnknownPrice = true;
    } else {
      knownTotal += itemTotal;
    }

    lines.push(`${index + 1}. ${item.title}`);
    lines.push(`${quantity[language]}: ${item.quantity}`);
    item.optionSummary.forEach((line) => lines.push(line));
    lines.push(`${price[language]}: ${itemTotal === null ? onRequest[language] : `${itemTotal}${item.currency}`}`);
    lines.push("");
  });

  lines.push(`${total[language]}: ${knownTotal > 0 ? `${knownTotal}${items[0]?.currency ?? "€"}` : onRequest[language]}${hasUnknownPrice ? ` + ${onRequest[language]}` : ""}`);

  return lines.join("\n");
}
