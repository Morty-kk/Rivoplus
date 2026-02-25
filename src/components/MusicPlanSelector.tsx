import * as React from "react";
import { Badge } from "@/components/ui/badge";
import AnimatedPillGroup from "@/components/AnimatedPillGroup";
import type { Language } from "@/pages/index-content";

export type MusicService = "spotify" | "youtube";
export type SpotifyTier = "premium" | "duo";
export type YoutubeTier = "premium";
export type MusicTier = SpotifyTier | YoutubeTier;

export type MusicDurationMonths = 1 | 3 | 6 | 12 | "trial24h";

export type MusicSelectorValue = {
  service: MusicService;
  tier: MusicTier;
  durationMonths: MusicDurationMonths;
};

export type MusicPrices = {
  trial24h?: number;
  spotify: Partial<Record<SpotifyTier, Partial<Record<MusicDurationMonths, number>>>>;
  youtube: Partial<Record<YoutubeTier, Partial<Record<MusicDurationMonths, number>>>>;
};

export function getMusicPrice(prices: MusicPrices, v: MusicSelectorValue): number | null {
  if (v.durationMonths === "trial24h") {
    return typeof prices.trial24h === "number" ? prices.trial24h : 0;
  }

  if (v.service === "spotify") {
    const tier = v.tier === "duo" ? "duo" : "premium";
    const amount = prices.spotify?.[tier]?.[v.durationMonths];
    return typeof amount === "number" ? amount : null;
  }

  const amount = prices.youtube?.premium?.[v.durationMonths];
  return typeof amount === "number" ? amount : null;
}

type Props = {
  value: MusicSelectorValue;
  onChange: (next: MusicSelectorValue) => void;
  prices: MusicPrices;
  language: Language;
  currency?: string;
};

const DURATIONS: MusicDurationMonths[] = ["trial24h", 1, 3, 6, 12];

const i18n = {
  title: { ar: "الموسيقى", en: "Music", de: "Musik" },
  service: { ar: "الخدمة", en: "Service", de: "Service" },
  plan: { ar: "الخطة", en: "Plan", de: "Plan" },
  duration: { ar: "المدة", en: "Duration", de: "Laufzeit" },
  monthsShort: { ar: "ش", en: "M", de: "M" },
  trial24h: { ar: "تجربة 24 ساعة", en: "24h trial", de: "24h Test" },
  onRequest: { ar: "حسب الطلب", en: "On request", de: "Auf Anfrage" },
  tiers: {
    premium: { ar: "بريميوم", en: "Premium", de: "Premium" },
    duo: { ar: "دويتو", en: "Premium Duo", de: "Premium Duo" },
  },
  services: {
    spotify: "Spotify",
    youtube: "YouTube Premium",
  },
};

export default function MusicPlanSelector({ value, onChange, prices, language, currency = "€" }: Props) {
  const amount = getMusicPrice(prices, value);

  const setService = (service: MusicService) =>
    onChange({ ...value, service, tier: "premium" });

  return (
    <section className="rounded-2xl border border-border bg-card/60 p-4 backdrop-blur-md">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="text-sm font-extrabold">
          {i18n.services.spotify} / {i18n.services.youtube}
        </div>
        <Badge variant="secondary">
          {amount ? `${amount}${currency}` : i18n.onRequest[language]}
        </Badge>
      </div>

      <div className="mt-4 grid gap-4">
        <div>
          <div className="mb-2 text-xs font-bold text-muted-foreground">{i18n.service[language]}</div>
          <AnimatedPillGroup
            value={value.service}
            ariaLabel={i18n.service[language]}
            onChange={(k) => setService(k as MusicService)}
            options={[
              { key: "spotify", label: i18n.services.spotify },
              { key: "youtube", label: i18n.services.youtube },
            ]}
          />
        </div>

        <div>
          <div className="mb-2 text-xs font-bold text-muted-foreground">{i18n.plan[language]}</div>
          {value.service === "spotify" ? (
            <AnimatedPillGroup
              value={value.tier}
              ariaLabel={i18n.plan[language]}
              onChange={(k) => onChange({ ...value, tier: k as MusicTier })}
              options={[
                { key: "premium", label: i18n.tiers.premium[language] },
                { key: "duo", label: i18n.tiers.duo[language] },
              ]}
            />
          ) : (
            <AnimatedPillGroup
              value="premium"
              ariaLabel={i18n.plan[language]}
              onChange={() => {}}
              options={[{ key: "premium", label: i18n.tiers.premium[language] }]}
            />
          )}
        </div>

        <div>
          <div className="mb-2 text-xs font-bold text-muted-foreground">{i18n.duration[language]}</div>
          <AnimatedPillGroup
            value={String(value.durationMonths)}
            ariaLabel={i18n.duration[language]}
            onChange={(k) => onChange({ ...value, durationMonths: Number(k) as MusicDurationMonths })}
            options={DURATIONS.map((d) => ({
              key: String(d),
              label: d === "trial24h" ? i18n.trial24h[language] : `${d}${i18n.monthsShort[language]}`,
            }))}
          />
        </div>
      </div>
    </section>
  );
}
