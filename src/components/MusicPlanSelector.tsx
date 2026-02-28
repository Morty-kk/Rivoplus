import * as React from "react";
import { Badge } from "@/components/ui/badge";
import AnimatedPillGroup from "@/components/AnimatedPillGroup";
import type { Language } from "@/pages/index-content";

export type MusicService = "spotify" | "youtube";
export type SpotifyTier = "premium" | "duo";
export type YoutubeTier = "premium";
export type MusicTier = SpotifyTier | YoutubeTier;

export type MusicDurationMonths = 12;

export type MusicSelectorValue = {
  service: MusicService;
  tier: MusicTier;
  durationMonths: MusicDurationMonths; // always 12
};

export type MusicPrices = {
  spotify: Partial<Record<SpotifyTier, number>>; // only 12-month price
  youtube: Partial<Record<YoutubeTier, number>>;
};

export function getMusicPrice(prices: MusicPrices, v: MusicSelectorValue): number | null {
  const tier = v.tier === "duo" ? "duo" : "premium";
  if (v.service === "spotify") {
    const amount = prices.spotify?.[tier];
    return typeof amount === "number" ? amount : null;
  }
  const amount = prices.youtube?.premium;
  return typeof amount === "number" ? amount : null;
}

type Props = {
  value: MusicSelectorValue;
  onChange: (next: MusicSelectorValue) => void;
  prices: MusicPrices;
  language: Language;
  currency?: string;
};


const i18n = {
  title: { ar: "الموسيقى", en: "Music", de: "Musik" },
  service: { ar: "الخدمة", en: "Service", de: "Service" },
  plan: { ar: "الخطة", en: "Plan", de: "Plan" },
  duration: { ar: "المدة", en: "Duration", de: "Laufzeit" },
  monthsShort: { ar: "ش", en: "M", de: "M" },
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
            value="12"
            ariaLabel={i18n.duration[language]}
            onChange={() => {}}
            options={[{ key: "12", label: `12${i18n.monthsShort[language]}` }]}
          />
        </div>
      </div>
    </section>
  );
}
