import * as React from "react";
import { Badge } from "@/components/ui/badge";
import AnimatedPillGroup from "@/components/AnimatedPillGroup";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Language } from "@/pages/index-content";

export type TvPlan = "gold" | "diamond";
export type TvDurationMonths = 1 | 3 | 6 | 12 | 24;
export type TvAudience = "deutsch" | "arabisch";

export type TvPriceTable = Record<
  TvPlan,
  Partial<Record<TvDurationMonths, Partial<Record<TvAudience, number>>>>
>;

export type TvPlanMeta = {
  devices?: string;
  note?: string;
};

export type TvPlanSelectorValue = {
  plan: TvPlan;
  duration: TvDurationMonths;
  audience: TvAudience;
};

type Props = {
  value: TvPlanSelectorValue;
  onChange: (next: TvPlanSelectorValue) => void;
  prices: TvPriceTable;
  planMeta?: Partial<Record<TvPlan, Partial<Record<TvDurationMonths, TvPlanMeta>>>>;
  currency?: string;
  language: Language;
};

const DURATIONS: TvDurationMonths[] = [1, 3, 6, 12, 24];

const i18n = {
  title: { ar: "الاختيار", en: "Selection", de: "Auswahl" },
  subtitle: { ar: "الخطة والمدة", en: "Plan & duration", de: "Plan & Laufzeit" },
  plan: { ar: "الخطة", en: "Plan", de: "Plan" },
  duration: { ar: "المدة", en: "Duration", de: "Laufzeit" },
  server: { ar: "السيرفر", en: "Server", de: "Server" },
  monthsShort: { ar: "ش", en: "M", de: "M" },
  monthWord: { ar: "شهر", en: "month", de: "Monat" },
  monthsWord: { ar: "أشهر", en: "months", de: "Monate" },
  onRequest: { ar: "حسب الطلب", en: "On request", de: "Auf Anfrage" },
  requestHint: {
    ar: "‏24 شهر متاح لبعض الخطط حسب الطلب.",
    en: "24 months is available for some plans on request.",
    de: "24 Monate sind bei einigen Plänen auf Anfrage.",
  },
  devices: { ar: "الأجهزة", en: "Devices", de: "Devices" },
  audiences: {
    deutsch: { ar: "ألماني", en: "German", de: "Deutsch" },
    arabisch: { ar: "عربي", en: "Arabic", de: "Arabisch" },
  },
};

const PLANS: { key: TvPlan; label: string }[] = [
  { key: "gold", label: "Gold" },
  { key: "diamond", label: "Diamond" },
];

function formatPrice(amount: number | null | undefined, currency: string, language: Language): string {
  if (amount === null || amount === undefined) return i18n.onRequest[language];
  return `${amount}${currency}`;
}

function getPrice(
  prices: TvPriceTable,
  plan: TvPlan,
  duration: TvDurationMonths,
  audience: TvAudience,
): number | null {
  const amount = prices[plan]?.[duration]?.[audience];
  return typeof amount === "number" ? amount : null;
}

export default function TvPlanSelector({
  value,
  onChange,
  prices,
  planMeta,
  currency = "€",
  language,
}: Props) {
  const price = React.useMemo(
    () => getPrice(prices, value.plan, value.duration, value.audience),
    [prices, value.plan, value.duration, value.audience],
  );

  const meta = planMeta?.[value.plan]?.[value.duration];

  const durationLabel =
    value.duration === 1 ? i18n.monthWord[language] : i18n.monthsWord[language];

  return (
    <div className="space-y-4 rounded-2xl border border-border bg-card/60 p-4 backdrop-blur-md">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="space-y-1">
          <div className="text-sm text-muted-foreground">{i18n.title[language]}</div>
          <div className="text-base font-semibold">{i18n.subtitle[language]}</div>
        </div>
        <Badge className="bg-primary text-primary-foreground hover:bg-primary/90">
          {formatPrice(price, currency, language)} • {value.duration} {durationLabel}
        </Badge>
      </div>

      <div className="space-y-2">
        <div className="text-sm font-semibold">{i18n.plan[language]}</div>
        <AnimatedPillGroup
          value={value.plan}
          ariaLabel={i18n.plan[language]}
          onChange={(k) => onChange({ ...value, plan: k as TvPlan })}
          options={PLANS.map((p) => ({ key: p.key, label: p.label }))}
        />
      </div>

      <div className="space-y-2">
        <div className="text-sm font-semibold">{i18n.duration[language]}</div>
        {/* native dropdown hides other durations until opened; add custom arrow for visibility */}
        <div className="relative">
          <select
            className="w-full appearance-none rounded-md border border-border bg-background px-3 py-2 pr-10 text-sm"
            value={value.duration}
            aria-label={i18n.duration[language]}
            onChange={(e) =>
              onChange({
                ...value,
                duration: Number(e.target.value) as TvDurationMonths,
              })
            }
          >
            {DURATIONS.map((d) => (
              <option key={d} value={d}>
                {d}{i18n.monthsShort[language]}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        </div>
        <div className="text-xs text-muted-foreground">{i18n.requestHint[language]}</div>
      </div>

      <div className="space-y-2">
        <div className="text-sm font-semibold">{i18n.server[language]}</div>
        <AnimatedPillGroup
          value={value.audience}
          ariaLabel={i18n.server[language]}
          onChange={(k) => onChange({ ...value, audience: k as TvAudience })}
          options={[
            { key: "deutsch", label: i18n.audiences.deutsch[language] },
            { key: "arabisch", label: i18n.audiences.arabisch[language] },          ]}
        />
      </div>

      {meta?.devices || meta?.note ? (
        <div className={cn("rounded-xl border border-border bg-background/60 p-3 text-sm backdrop-blur-md")}>
          <div className="flex flex-wrap items-center justify-between gap-2">
            {meta?.devices ? (
              <span>
                {i18n.devices[language]}: <span className="font-semibold">{meta.devices}</span>
              </span>
            ) : null}
            {meta?.note ? <span className="text-muted-foreground">{meta.note}</span> : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}
