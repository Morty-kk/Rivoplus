import type { Language } from "@/pages/index-content";
import type { TvPlanSelectorValue, TvPriceTable } from "@/components/TvPlanSelector";
import type { MusicSelectorValue, MusicPrices } from "@/components/MusicPlanSelector";
import type { CreativitySelectorValue, CreativityPrices } from "@/components/CreativityPlanSelector";
import { getMusicPrice } from "@/components/MusicPlanSelector";
import { getCreativityPrice } from "@/components/CreativityPlanSelector";

const t = {
  hello: {
    ar: "مرحباً Rivo+، أريد الطلب:",
    en: "Hello Rivo+, I want to order:",
    de: "Hallo Rivo+, ich möchte bestellen:",
  },
  plan: { ar: "الخطة", en: "Plan", de: "Plan" },
  duration: { ar: "المدة", en: "Duration", de: "Laufzeit" },
  server: { ar: "السيرفر", en: "Server", de: "Server" },
  price: { ar: "السعر", en: "Price", de: "Preis" },
  months: { ar: "شهر", en: "months", de: "Monate" },
  hours: { ar: "ساعة", en: "hours", de: "Stunden" },
  trial: { ar: "تجربة", en: "Trial", de: "Test" },
  onRequest: { ar: "حسب الطلب", en: "On request", de: "Auf Anfrage" },
};


function formatDuration(
  language: Language,
  duration: number | "trial24h",
): string {
  if (duration === "trial24h") {
    return `${t.trial[language]}: 24 ${t.hours[language]}`;
  }
  return `${duration} ${t.months[language]}`;
}

function fmtPrice(amount: number | null, currency: string, language: Language): string {
  return typeof amount === "number" ? `${amount}${currency}` : t.onRequest[language];
}

export function buildOrderMessage(args: {
  language: Language;
  productTitle: string;
  slug: "stream" | "music" | "creativity" | string;
  currency?: string;
  tv?: { value: TvPlanSelectorValue; prices: TvPriceTable };
  music?: { value: MusicSelectorValue; prices: MusicPrices };
  creativity?: { value: CreativitySelectorValue; prices: CreativityPrices };
}): string {
  const { language, productTitle, slug, currency = "€" } = args;

  if (slug === "stream" && args.tv) {
    const { value, prices } = args.tv;
    const amount = prices?.[value.plan]?.[value.duration]?.[value.audience] ?? null;
    return [
      `${t.hello[language]} ${productTitle}`,
      `${t.plan[language]}: ${value.plan.toUpperCase()}`,
      `${t.duration[language]}: ${value.duration} ${t.months[language]}`,
      `${t.server[language]}: ${value.audience === "deutsch" ? "Deutsch" : "Arabisch"}`,
      `${t.price[language]}: ${fmtPrice(typeof amount === "number" ? amount : null, currency, language)}`,
    ].join("\n");
  }

  if (slug === "music" && args.music) {
    const { value, prices } = args.music;
    const amount = getMusicPrice(prices, value);
    const serviceLabel = value.service === "spotify" ? "Spotify" : "YouTube Premium";
    const tierLabel =
      value.service === "spotify" ? (value.tier === "duo" ? "Premium Duo" : "Premium") : "Premium";
    return [
      `${t.hello[language]} ${serviceLabel}`,
      `${t.plan[language]}: ${tierLabel}`,
      `${t.duration[language]}: ${formatDuration(language, value.durationMonths as any)}`,
      `${t.price[language]}: ${fmtPrice(amount, currency, language)}`,
    ].join("\n");
  }

  if (slug === "creativity" && args.creativity) {
    const { value, prices } = args.creativity;
    const amount = getCreativityPrice(prices, value);
    const serviceLabel = value.service === "adobe" ? "Adobe Creative Cloud" : "Canva Pro";
    return [
      `${t.hello[language]} ${serviceLabel}`,
      `${t.duration[language]}: ${formatDuration(language, value.durationMonths as any)}`,
      `${t.price[language]}: ${fmtPrice(amount, currency, language)}`,
    ].join("\n");
  }

  return `${t.hello[language]} ${productTitle}`;
}
