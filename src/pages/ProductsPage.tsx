import * as React from "react";
import { Link } from "react-router-dom";
import { ExternalLink, Eye } from "lucide-react";
import { motion } from "framer-motion";
import RivoLogo from "@/components/RivoLogo";
import PaymentMethods from "@/components/PaymentMethods";
import TvPlanSelector, { type TvPlanSelectorValue, type TvPriceTable } from "@/components/TvPlanSelector";
import MusicPlanSelector, { type MusicSelectorValue, type MusicPrices } from "@/components/MusicPlanSelector";
import CreativityPlanSelector, {
  type CreativitySelectorValue,
  type CreativityPrices,
} from "@/components/CreativityPlanSelector";
import OrderLinks from "@/components/OrderLinks";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { buildOrderMessage } from "@/lib/orderMessage";
import { copy, products, type Language, type Product } from "./index-content";

const getLanguage = (): Language => {
  if (typeof window === "undefined") return "ar";
  const savedLanguage = window.localStorage.getItem("language");
  return savedLanguage === "ar" || savedLanguage === "en" || savedLanguage === "de" ? savedLanguage : "ar";
};

export default function ProductsPage() {
  const language = getLanguage();
  const t = copy[language];

  const [open, setOpen] = React.useState(false);
  const [selectedSlug, setSelectedSlug] = React.useState<string | null>(null);

  const selected: Product | null = React.useMemo(
    () => products.find((p) => p.slug === selectedSlug) ?? null,
    [selectedSlug],
  );

  const [tvValue, setTvValue] = React.useState<TvPlanSelectorValue>({
    plan: "gold",
    duration: 12,
    audience: "arabisch",
  });

  const [musicValue, setMusicValue] = React.useState<MusicSelectorValue>({
    service: "spotify",
    tier: "premium",
    durationMonths: 12,
  });

  const [creativityValue, setCreativityValue] = React.useState<CreativitySelectorValue>({
    service: "adobe",
    tier: "pro",
    durationMonths: 12,
  });

  const tvPrices: TvPriceTable = React.useMemo(
    () => ({
      gold: {
        1: { deutsch: 5, arabisch: 5},
        3: { deutsch: 10, arabisch: 10},
        6: { deutsch: 20, arabisch: 15},
        12: { deutsch: 30, arabisch: 25},
      },
      diamond: {
        1: { deutsch: 10, arabisch: 10},
        3: { deutsch: 20, arabisch: 15},
        6: { deutsch: 30, arabisch: 25},
        12: { deutsch: 40, arabisch: 35},
      },
    }),
    [],
  );

  const tvMeta = React.useMemo(
    () => ({
      gold: {
        12: { devices: "2", note: "2 Devices (Arabic) on request" },
      },
      diamond: {
        1: { devices: "1" },
        3: { devices: "1" },
        6: { devices: "1" },
        12: { devices: "1" },
      },
    }),
    [],
  );

  const musicPrices: MusicPrices = React.useMemo(
    () => ({
      trial24h: 0,
      spotify: {
        premium: { 1: 6, 3: 15, 6: 25, 12: 35 },
        duo: { 1: 10, 3: 25, 6: 40, 12: 55 },
      },
      youtube: {
        premium: { 1: 7, 3: 18, 6: 28, 12: 40 },
      },
    }),
    [],
  );

  const creativityPrices: CreativityPrices = React.useMemo(
    () => ({
      adobe: { 1: 18, 3: 45, 6: 80, 12: 140 },
      canva: { 1: 10, 3: 25, 6: 45, 12: 80 },
    }),
    [],
  );

  const openQuickView = (slug: string) => {
    setSelectedSlug(slug);
    setOpen(true);
  };

  const WHATSAPP_PHONE = "963980582206";
  const TELEGRAM_USERNAME = "rivoplus";

  const orderMessage = React.useMemo(() => {
    if (!selected) return "";
    return buildOrderMessage({
      language,
      productTitle: selected.title[language],
      slug: selected.slug,
      tv: { value: tvValue, prices: tvPrices },
      music: { value: musicValue, prices: musicPrices },
      creativity: { value: creativityValue, prices: creativityPrices },
    });
  }, [selected, language, tvValue, tvPrices, musicValue, musicPrices, creativityValue, creativityPrices]);

  return (
    <main className="min-h-screen bg-background px-6 py-16 font-cairo" dir={t.dir}>
      <div className="container mx-auto max-w-5xl">
        <div className="mb-10 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link to="/" aria-label="Home" className="inline-flex items-center">
              <RivoLogo className="h-12 w-[132px]" />
            </Link>
            <h1 className="text-3xl font-black text-foreground">{t.products.title}</h1>
          </div>
          <Link to="/" className="rounded-xl border border-border bg-background/40 px-4 py-2 text-sm font-semibold text-foreground backdrop-blur-md hover:bg-muted/40">
            {language === "ar" ? "الرئيسية" : language === "de" ? "Start" : "Home"}
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8 rounded-2xl border border-border bg-card/60 p-5 backdrop-blur-md"
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="text-sm font-extrabold text-primary">{t.products.ramadanTitle}</div>
              <div className="text-base font-semibold text-foreground">{t.products.ramadanSubtitle}</div>
            </div>
            <Badge className="bg-primary text-primary-foreground hover:bg-primary/90">
              {language === "ar" ? "خصم محدود" : language === "de" ? "Zeitlich begrenzt" : "Limited time"}
            </Badge>
          </div>
        </motion.div>

        <p className="mb-8 text-muted-foreground">{t.products.subtitle}</p>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <article
              key={product.slug}
              className="group overflow-hidden rounded-2xl border border-border bg-card/60 shadow-sm backdrop-blur-md transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <button
                type="button"
                onClick={() => openQuickView(product.slug)}
                className="relative block w-full text-left touch-manipulation"
                aria-label={t.products.quickView}
              >
                <img
                  src={product.heroImage}
                  alt={product.title[language]}
                  className="h-56 w-full object-cover"
                  loading="lazy"
                />
                <div className="absolute left-4 top-4 flex items-center gap-2">
                  {product.badge ? <Badge variant="secondary">{product.badge[language]}</Badge> : null}
                  {product.offer ? (
                    <Badge className="bg-primary text-primary-foreground hover:bg-primary/90">
                      {product.offer.label[language]} • -{product.offer.discountPercent}%
                    </Badge>
                  ) : null}
                </div>
              </button>

              <div className="p-7">
                <div className="mb-3 flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="product-card-icon-wrap">
                      <product.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-lg font-extrabold text-foreground">{product.title[language]}</h2>
                      <p className="mt-1 text-sm text-muted-foreground">{product.description[language]}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <Button onClick={() => openQuickView(product.slug)} className="gap-2 rounded-2xl px-5 py-6 text-base">
                    <Eye className="h-5 w-5" />
                    {t.products.quickView}
                  </Button>

                  <Button asChild variant="secondary" className="gap-2 rounded-2xl px-5 py-6 text-base">
                    <Link to={`/product/${product.slug}`}>
                      <ExternalLink className="h-5 w-5" />
                      {t.products.openDetails}
                    </Link>
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-border bg-card/60 p-6 backdrop-blur-md">
          <h2 className="text-base font-extrabold">{t.products.paymentTitle}</h2>
          <p className="mt-1 text-sm text-muted-foreground">{t.products.paymentSubtitle}</p>
          <div className="mt-4">
            <PaymentMethods size="md" />
          </div>
        </div>

        <div className="mt-10 text-center text-sm text-muted-foreground">{t.footer}</div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-3xl">
          {selected ? (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-3">
                  <div className="product-card-icon-wrap">
                    <selected.icon className="h-5 w-5 text-primary" />
                  </div>
                  <span>{selected.title[language]}</span>
                  {selected.offer ? (
                    <Badge className="ml-2 bg-primary text-primary-foreground hover:bg-primary/90">
                      {selected.offer.label[language]} • -{selected.offer.discountPercent}%
                    </Badge>
                  ) : null}
                </DialogTitle>
              </DialogHeader>

              <div className="grid gap-6 lg:grid-cols-2">
                <div className="space-y-3">
                  <img
                    src={selected.heroImage}
                    alt={selected.title[language]}
                    className="h-56 w-full rounded-2xl border border-border object-cover"
                    loading="lazy"
                  />
                  <div className="flex gap-3 overflow-x-auto pb-1">
                    {selected.gallery.map((srcImg) => (
                      <img
                        key={srcImg}
                        src={srcImg}
                        alt={selected.title[language]}
                        className="h-20 w-28 shrink-0 rounded-xl border border-border object-cover"
                        loading="lazy"
                      />
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <p className="text-sm leading-relaxed text-muted-foreground">{selected.longDescription[language]}</p>

                  <ul className="grid gap-2 sm:grid-cols-2">
                    {selected.highlights[language].map((h) => (
                      <li key={h} className="rounded-xl border border-border bg-background/50 px-3 py-2 text-sm backdrop-blur-md">
                        {h}
                      </li>
                    ))}
                  </ul>

                  {selected.slug === "stream" ? (
                    <TvPlanSelector value={tvValue} onChange={setTvValue} prices={tvPrices} planMeta={tvMeta} language={language} />
                  ) : null}

                  {selected.slug === "music" ? (
                    <MusicPlanSelector value={musicValue} onChange={setMusicValue} prices={musicPrices} language={language} />
                  ) : null}

                  {selected.slug === "creativity" ? (
                    <CreativityPlanSelector value={creativityValue} onChange={setCreativityValue} prices={creativityPrices} language={language} />
                  ) : null}

                  <div className="rounded-2xl border border-border bg-background/50 p-4 backdrop-blur-md">
                    <div className="text-sm font-extrabold">{t.products.paymentTitle}</div>
                    <div className="mt-1 text-sm text-muted-foreground">{t.products.paymentSubtitle}</div>
                    <div className="mt-3">
                      <PaymentMethods size="sm" />
                    </div>
                  </div>

                  <div className="rounded-2xl border border-border bg-background/50 p-4 backdrop-blur-md">
                    <div className="text-sm font-extrabold">
                      {language === "ar" ? "اطلب الآن" : language === "de" ? "Jetzt anfragen" : "Order now"}
                    </div>
                    <div className="mt-1 text-sm text-muted-foreground">
                      {language === "ar"
                        ? "اكتب لنا وسيتم التفعيل بسرعة."
                        : language === "de"
                        ? "Schreib uns — wir aktivieren schnell."
                        : "Message us — we’ll activate it quickly."}
                    </div>
                    <div className="mt-3">
                      <OrderLinks
                        whatsappPhoneE164={WHATSAPP_PHONE}
                        telegramUsername={TELEGRAM_USERNAME}
                        whatsappMessage={orderMessage}
                      />
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <Button asChild className="gap-2 rounded-2xl px-5 py-6 text-base">
                      <Link to={`/product/${selected.slug}`} onClick={() => setOpen(false)}>
                        <ExternalLink className="h-5 w-5" />
                        {t.products.openDetails}
                      </Link>
                    </Button>

                    <Button variant="secondary" onClick={() => setOpen(false)} className="rounded-2xl px-5 py-6 text-base">
                      {language === "ar" ? "إغلاق" : language === "de" ? "Schließen" : "Close"}
                    </Button>
                  </div>

                  {selected.offer ? (
                    <p className="text-xs text-muted-foreground">
                      {language === "ar"
                        ? `ينتهي العرض بتاريخ ${selected.offer.endsAtISO}`
                        : language === "de"
                        ? `Angebot endet am ${selected.offer.endsAtISO}`
                        : `Offer ends on ${selected.offer.endsAtISO}`}
                    </p>
                  ) : null}
                </div>
              </div>
            </>
          ) : null}
        </DialogContent>
      </Dialog>
    </main>
  );
}
