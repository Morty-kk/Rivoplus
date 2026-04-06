import * as React from "react";
import { Link } from "react-router-dom";
import { ExternalLink, Eye, MessageCircle, Send } from "lucide-react";
import { motion } from "framer-motion";
import RivoLogo from "@/components/RivoLogo";
import Navigation from "@/components/Navigation";
import { ProductShowcase } from "@/components/ProductShowcase";
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

const FAQSection = ({ language }: { language: Language }) => {
  const t = copy[language] ?? copy.ar;
  const faqItems = t.faq?.items ?? [];

  return (
    <section id="faq" className="pb-24">
      <div className="container mx-auto px-6">
        <div className="mb-10 text-center">
          <h2 className="mb-3 text-3xl font-black text-foreground md:text-4xl">
            {t.faq?.title ?? "FAQ"}
          </h2>
          <p className="text-muted-foreground">{t.faq?.subtitle ?? ""}</p>
        </div>

        <div className="mx-auto grid max-w-4xl gap-3">
          {faqItems.map((item, idx) => (
            <details
              key={idx}
              className="group rounded-xl border border-border bg-background/70 p-4 open:border-primary/30"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 font-bold text-foreground">
                <span>{item.q}</span>
                <span className="text-primary transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
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
    service: "youtube",
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
    <>
      <Navigation />
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

        <p className="mb-12 text-muted-foreground">{t.products.subtitle}</p>

        {/* Premium Product Showcase Grid */}
        <div id="products">
          <ProductShowcase
            products={products}
            language={language}
            exploreLabel={language === "ar" ? "استكشف" : language === "de" ? "Entdecken" : "Explore"}
            productDetailsLabel={t.products.openDetails}
            ctaLabel={t.products.viewDetails}
          />
        </div>

        {/* Section Divider */}
        <div className="my-16 border-t border-border/50" />

        {/* Alternative Detailed Selection View */}
        <div>
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-black text-foreground">
              {language === "ar" ? "تخصيص طلبك" : language === "de" ? "Passen Sie Ihre Bestellung an" : "Customize your order"}
            </h2>
            <p className="mt-2 text-muted-foreground">
              {language === "ar"
                ? "اختر من خياراتنا المتنوعة"
                : language === "de"
                ? "Wählen Sie aus unseren Optionen"
                : "Pick your preferred options"}
            </p>
          </div>

          {/* Product cards hidden while customization content is being refined. */}
        </div>

        {/* Payment Methods */}
        <div className="mt-16 rounded-2xl border border-border bg-card/60 p-6 backdrop-blur-md">
          <h2 className="text-base font-extrabold">{t.products.paymentTitle}</h2>
          <p className="mt-1 text-sm text-muted-foreground">{t.products.paymentSubtitle}</p>
          <div className="mt-4">
            <PaymentMethods size="md" />
          </div>
        </div>

        {/* Footer */}
        <div className="mt-10 text-center text-sm text-muted-foreground">{t.footer}</div>
      </div>

      {/* FAQ */}
      <FAQSection language={language} />

      {/* CONTACT */}
      <section id="contact" className="pb-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto max-w-4xl glass p-8 text-center"
          >
            <h2 className="mb-3 text-2xl font-black text-foreground md:text-3xl">
              {t.contact?.title ?? "Contact"}
            </h2>
            <p className="mx-auto mb-6 max-w-2xl text-muted-foreground">
              {t.contact?.subtitle ?? ""}
            </p>

            <div className="flex flex-wrap justify-center gap-3">
              <a
                href="https://wa.me/963980582206"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary interactive-surface inline-flex items-center gap-2"
              >
                <MessageCircle className="h-4 w-4" />
                {t.contact?.whatsapp ?? "WhatsApp"}
              </a>

              <a
                href="https://t.me/rivoplus"
                target="_blank"
                rel="noopener noreferrer"
                className="interactive-surface inline-flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-2.5 font-bold text-foreground hover:bg-muted"
              >
                <Send className="h-4 w-4" />
                {t.contact?.telegram ?? "Telegram"}
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <footer className="border-t border-border/70 py-6 text-center text-sm text-muted-foreground">
        <div className="container mx-auto px-6">{t.footer ?? "© 2026 Rivo Plus"}</div>
      </footer>

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
    </>
  );
}
