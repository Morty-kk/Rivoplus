import * as React from "react";
import { Badge } from "@/components/ui/badge";
import AnimatedPillGroup from "@/components/AnimatedPillGroup";
import type { Language } from "@/pages/index-content";

export type CreativityService = "adobe" | "canva";
export type CreativityTier = "pro";

export type CreativityDurationMonths = 1 | 3 | 6 | 12;

export type CreativitySelectorValue = {
  service: CreativityService;
  tier: CreativityTier;
  durationMonths: CreativityDurationMonths;
};

export type CreativityPrices = Record<CreativityService, Partial<Record<CreativityDurationMonths, number>>>;

export function getCreativityPrice(prices: CreativityPrices, v: CreativitySelectorValue): number | null {
  const amount = prices?.[v.service]?.[v.durationMonths];
  return typeof amount === "number" ? amount : null;
}

type Props = {
  value: CreativitySelectorValue;
  onChange: (next: CreativitySelectorValue) => void;
  prices: CreativityPrices;
  language: Language;
  currency?: string;
};

const DURATIONS: CreativityDurationMonths[] = [1, 3, 6, 12];

const i18n = {
  title: { ar: "الإبداع", en: "Creativity", de: "Creativity" },
  service: { ar: "الخدمة", en: "Service", de: "Service" },
  duration: { ar: "المدة", en: "Duration", de: "Laufzeit" },
  monthsShort: { ar: "ش", en: "M", de: "M" },
  onRequest: { ar: "حسب الطلب", en: "On request", de: "Auf Anfrage" },
  services: {
    adobe: { ar: "أدوبي كريتيف كلاود", en: "Adobe Creative Cloud", de: "Adobe Creative Cloud" },
    canva: { ar: "كانفا برو", en: "Canva Pro", de: "Canva Pro" },
  },
};

export default function CreativityPlanSelector({
  value,
  onChange,
  prices,
  language,
  currency = "€",
}: Props) {
  const amount = getCreativityPrice(prices, value);

  return (
    <section className="rounded-2xl border border-border bg-card/60 p-4 backdrop-blur-md">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="text-sm font-extrabold">{i18n.title[language]}</div>
        <Badge variant="secondary">{amount ? `${amount}${currency}` : i18n.onRequest[language]}</Badge>
      </div>

      <div className="mt-4 grid gap-4">
        <div>
          <div className="mb-2 text-xs font-bold text-muted-foreground">{i18n.service[language]}</div>
          <AnimatedPillGroup
            value={value.service}
            ariaLabel={i18n.service[language]}
            onChange={(k) => onChange({ ...value, service: k as CreativityService })}
            options={[
              { key: "adobe", label: i18n.services.adobe[language] },
              { key: "canva", label: i18n.services.canva[language] },
            ]}
          />
        </div>

        <div>
          <div className="mb-2 text-xs font-bold text-muted-foreground">{i18n.duration[language]}</div>
          <AnimatedPillGroup
            value={String(value.durationMonths)}
            ariaLabel={i18n.duration[language]}
            onChange={(k) => onChange({ ...value, durationMonths: Number(k) as CreativityDurationMonths })}
            options={DURATIONS.map((d) => ({ key: String(d), label: `${d}${i18n.monthsShort[language]}` }))}
          />
        </div>
      </div>
    </section>
  );
}
