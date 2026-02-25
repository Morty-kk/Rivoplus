import * as React from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
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
import { buildOrderMessage } from "@/lib/orderMessage";
import { copy, products, type Language } from "./index-content";

const getSavedLanguage = (): Language => {
  if (typeof window === "undefined") return "ar";
  const saved = localStorage.getItem("language");
  return saved === "ar" || saved === "en" || saved === "de" ? saved : "ar";
};

const i18n = {
  backToHome: { ar: "العودة للرئيسية", en: "Back to home", de: "Zurück zur Startseite" },
  notFound: { ar: "المنتج غير موجود", en: "Product not found", de: "Produkt nicht gefunden" },
  highlights: { ar: "المميزات", en: "Highlights", de: "Highlights" },
  details: { ar: "تفاصيل المنتج", en: "Product details", de: "Produktdetails" },
  gallery: { ar: "الصور", en: "Gallery", de: "Galerie" },
  orderNow: { ar: "اطلب الآن", en: "Order now", de: "Jetzt anfragen" },
  orderText: {
    ar: "تواصل معنا مباشرة لطلب هذا المنتج وسنقوم بالتفعيل بسرعة.",
    en: "Message us to order this product — we’ll activate it quickly.",
    de: "Schreib uns für die Bestellung — wir aktivieren schnell.",
  },
};

export default function ProductDetails() {
  const { slug } = useParams();
  const language = getSavedLanguage();
  const t = copy[language];
  const product = products.find((p) => p.slug === slug);

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

  const WHATSAPP_PHONE = "963980582206";
  const TELEGRAM_USERNAME = "rivoplus";

  if (!product) {
    return (
      <div dir={t.dir} className="min-h-screen bg-background text-foreground">
        <div className="container mx-auto px-6 py-10">
          <Link to="/" aria-label="Home" className="inline-flex items-center">
            <RivoLogo className="h-10 w-[130px] md:h-14 md:w-[180px]" />
          </Link>
          <div className="mt-10 glass rounded-2xl p-6">
            <p className="mb-4 text-lg font-bold">{i18n.notFound[language]}</p>
            <Link to="/" className="btn-primary">
              {i18n.backToHome[language]}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const ArrowIcon = t.dir === "rtl" ? ArrowRight : ArrowLeft;

  const orderMessage = buildOrderMessage({
    language,
    productTitle: product.title[language],
    slug: product.slug,
    tv: { value: tvValue, prices: tvPrices },
    music: { value: musicValue, prices: musicPrices },
    creativity: { value: creativityValue, prices: creativityPrices },
  });

  const heroLayout = product.heroImageLayout ?? {
    mobileHeightPx: 340,
    desktopHeightPx: 480,
    fit: "cover" as const,
    position: "center",
  };

  return (
    <div dir={t.dir} className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 md:px-6 py-4 md:py-8">
        <div className="mb-4 md:mb-6 flex items-center justify-between gap-3">
          <RivoLogo className="h-8 md:h-10 w-[100px] md:w-[130px] lg:h-14 lg:w-[180px]" />
          <Link
            to="/#products"
            className="inline-flex items-center gap-2 rounded-lg md:rounded-xl border border-border bg-background/40 px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm font-semibold backdrop-blur-md hover:bg-muted/40 flex-shrink-0"
          >
            <ArrowIcon className="h-3 w-3 md:h-4 md:w-4" />
            {language === "ar" ? "العودة" : language === "de" ? "Zurück" : "Back"}
          </Link>
        </div>

        <div className="glass overflow-hidden rounded-2xl border border-border">
          <div className="grid gap-0 grid-cols-1 lg:grid-cols-2">
            {/* IMAGE SECTION */}
            <div
              className="relative overflow-hidden border-b border-border lg:border-b-0 lg:border-r flex items-center justify-center bg-gradient-to-br from-background to-background/80"
              style={{
                aspectRatio: "1 / 1",
              }}
            >
              <div className="w-full h-full flex items-center justify-center p-4 md:p-8">
                <img
                  src={product.heroImage}
                  alt={product.title[language]}
                  className="max-w-full max-h-full w-auto h-auto object-contain"
                  style={{
                    objectFit: "contain",
                    objectPosition: "center",
                  }}
                  loading="lazy"
                />
              </div>
              <div className="absolute left-2 top-2 md:left-4 md:top-4 flex items-center gap-2">
                {product.badge ? <Badge variant="secondary" className="text-xs md:text-sm">{product.badge[language]}</Badge> : null}
                {product.offer ? (
                  <Badge className="bg-primary text-primary-foreground hover:bg-primary/90 text-xs md:text-sm">
                    {product.offer.label[language]} • -{product.offer.discountPercent}%
                  </Badge>
                ) : null}
              </div>
            </div>

            {/* CONTENT SECTION */}
            <div className="p-5 md:p-6 lg:p-8 flex flex-col gap-6 overflow-y-auto">
              <div className="flex items-start gap-3 md:gap-4">
                <div className="product-card-icon-wrap mt-0.5 flex-shrink-0">
                  <product.icon className="h-6 w-6 md:h-7 md:w-7 text-primary" />
                </div>
                <div className="min-w-0">
                  <h1 className="text-2xl md:text-3xl lg:text-4xl font-black break-words">{product.title[language]}</h1>
                  <p className="mt-1.5 text-sm md:text-base text-muted-foreground leading-relaxed">{product.description[language]}</p>
                </div>
              </div>

              <div className="space-y-4">
                <section className="rounded-lg border border-border/50 bg-background/40 p-3 md:p-4 backdrop-blur">
                  <h2 className="text-sm md:text-base font-bold text-foreground mb-2">{i18n.details[language]}</h2>
                  <p className="text-xs md:text-sm leading-relaxed text-muted-foreground">{product.longDescription[language]}</p>
                </section>

                <section>
                  <h2 className="text-sm md:text-base font-bold text-foreground mb-3">{i18n.highlights[language]}</h2>
                  <ul className="grid gap-2 grid-cols-2">
                    {product.highlights[language].map((item) => (
                      <li
                        key={item}
                        className="rounded-lg border border-border/60 bg-gradient-to-br from-primary/5 to-background/60 px-3 py-2 text-xs md:text-sm font-medium text-foreground text-center backdrop-blur"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                  {product.slug === "stream" ? (
                    <div>
                      <TvPlanSelector value={tvValue} onChange={setTvValue} prices={tvPrices} planMeta={tvMeta} language={language} />
                    </div>
                  ) : null}

                  {product.slug === "music" ? (
                    <div>
                      <MusicPlanSelector value={musicValue} onChange={setMusicValue} prices={musicPrices} language={language} />
                    </div>
                  ) : null}

                  {product.slug === "creativity" ? (
                    <div>
                      <CreativityPlanSelector value={creativityValue} onChange={setCreativityValue} prices={creativityPrices} language={language} />
                    </div>
                  ) : null}
                </section>

                <section className="rounded-lg border border-primary/30 bg-gradient-to-br from-primary/10 to-background/60 p-3.5 md:p-4 backdrop-blur">
                  <h2 className="text-sm md:text-base font-bold text-foreground mb-2">{t.products.paymentTitle}</h2>
                  <p className="text-xs md:text-sm text-muted-foreground mb-3">{t.products.paymentSubtitle}</p>
                  <PaymentMethods size="sm" />
                </section>

                <section className="rounded-lg border border-primary/40 bg-gradient-to-br from-primary/15 to-background/50 p-3.5 md:p-4 backdrop-blur">
                  <h2 className="text-sm md:text-base font-bold text-foreground mb-1.5">{i18n.orderNow[language]}</h2>
                  <p className="text-xs md:text-sm text-muted-foreground mb-3">{i18n.orderText[language]}</p>

                  <OrderLinks
                    whatsappPhoneE164={WHATSAPP_PHONE}
                    telegramUsername={TELEGRAM_USERNAME}
                    whatsappMessage={orderMessage}
                    className="flex flex-wrap gap-2 md:gap-3"
                  />

                  {product.offer ? (
                    <p className="mt-2.5 text-xs text-muted-foreground">
                      {language === "ar"
                        ? `ينتهي العرض بتاريخ ${product.offer.endsAtISO}`
                        : language === "de"
                        ? `Angebot endet am ${product.offer.endsAtISO}`
                        : `Offer ends on ${product.offer.endsAtISO}`}
                    </p>
                  ) : null}
                </section>

                <section>
                  <h2 className="text-sm md:text-base font-bold text-foreground mb-3">{i18n.gallery[language]}</h2>
                  <div className="flex gap-2 md:gap-3 overflow-x-auto pb-2 -mx-5 md:-mx-6 lg:-mx-8 px-5 md:px-6 lg:px-8">
                    {product.gallery.map((srcImg) => (
                      <img
                        key={srcImg}
                        src={srcImg}
                        alt={product.title[language]}
                        className="h-24 w-32 md:h-28 md:w-44 shrink-0 rounded-lg border border-border object-cover"
                        loading="lazy"
                      />
                    ))}
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 md:mt-10 text-center text-xs md:text-sm text-muted-foreground py-6">{t.footer}</div>
      </div>
    </div>
  );
}
