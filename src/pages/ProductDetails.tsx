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
    mobileHeightPx: 320,
    desktopHeightPx: 480,
    fit: "cover" as const,
    position: "center",
  };

  return (
    <div dir={t.dir} className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-6 py-8">
        <div className="mb-6 flex items-center justify-between">
          <RivoLogo className="h-10 w-[130px] md:h-14 md:w-[180px]" />
          <Link
            to="/#products"
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-background/40 px-4 py-2 text-sm font-semibold backdrop-blur-md hover:bg-muted/40"
          >
            <ArrowIcon className="h-4 w-4" />
            {language === "ar" ? "العودة" : language === "de" ? "Zurück" : "Back"}
          </Link>
        </div>

        <div className="glass overflow-hidden rounded-2xl border border-border">
          <div className="grid gap-0 lg:grid-cols-2">
            <div
              className="relative overflow-hidden border-b border-border min-h-[var(--hero-mobile-h)] lg:min-h-[var(--hero-desktop-h)] lg:border-b-0 lg:border-r"
              style={{
                ["--hero-mobile-h" as string]: `${heroLayout.mobileHeightPx}px`,
                ["--hero-desktop-h" as string]: `${heroLayout.desktopHeightPx}px`,
              }}
            >
              <img
                src={product.heroImage}
                alt={product.title[language]}
                className="h-full w-full min-h-[var(--hero-mobile-h)] lg:min-h-[var(--hero-desktop-h)]"
                style={{
                  objectFit: heroLayout.fit ?? "cover",
                  objectPosition: heroLayout.position ?? "center",
                }}
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
            </div>

            <div className="p-6 md:p-8">
              <div className="mb-4 flex items-start gap-4">
                <div className="product-card-icon-wrap">
                  <product.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h1 className="text-3xl font-black md:text-4xl">{product.title[language]}</h1>
                  <p className="mt-2 text-muted-foreground">{product.description[language]}</p>
                </div>
              </div>

              <div className="mt-6 space-y-6">
                <section>
                  <h2 className="mb-2 text-base font-extrabold">{i18n.details[language]}</h2>
                  <p className="text-sm leading-relaxed text-muted-foreground">{product.longDescription[language]}</p>
                </section>

                <section>
                  <h2 className="mb-2 text-base font-extrabold">{i18n.highlights[language]}</h2>
                  <ul className="grid gap-2 sm:grid-cols-2">
                    {product.highlights[language].map((item) => (
                      <li
                        key={item}
                        className="rounded-xl border border-border bg-background/60 px-3 py-2 text-sm text-foreground backdrop-blur-md"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>

                  {product.slug === "stream" ? (
                    <div className="mt-4">
                      <TvPlanSelector value={tvValue} onChange={setTvValue} prices={tvPrices} planMeta={tvMeta} language={language} />
                    </div>
                  ) : null}

                  {product.slug === "music" ? (
                    <div className="mt-4">
                      <MusicPlanSelector value={musicValue} onChange={setMusicValue} prices={musicPrices} language={language} />
                    </div>
                  ) : null}

                  {product.slug === "creativity" ? (
                    <div className="mt-4">
                      <CreativityPlanSelector value={creativityValue} onChange={setCreativityValue} prices={creativityPrices} language={language} />
                    </div>
                  ) : null}
                </section>

                <section>
                  <h2 className="mb-2 text-base font-extrabold">{t.products.paymentTitle}</h2>
                  <p className="mb-3 text-sm text-muted-foreground">{t.products.paymentSubtitle}</p>
                  <PaymentMethods size="md" />
                </section>

                <section className="rounded-2xl border border-border bg-background/60 p-4 backdrop-blur-md">
                  <h2 className="mb-2 text-base font-extrabold">{i18n.orderNow[language]}</h2>
                  <p className="mb-4 text-sm text-muted-foreground">{i18n.orderText[language]}</p>

                  <OrderLinks
                    whatsappPhoneE164={WHATSAPP_PHONE}
                    telegramUsername={TELEGRAM_USERNAME}
                    whatsappMessage={orderMessage}
                    className="flex flex-wrap gap-3"
                  />

                  {product.offer ? (
                    <p className="mt-4 text-xs text-muted-foreground">
                      {language === "ar"
                        ? `ينتهي العرض بتاريخ ${product.offer.endsAtISO}`
                        : language === "de"
                        ? `Angebot endet am ${product.offer.endsAtISO}`
                        : `Offer ends on ${product.offer.endsAtISO}`}
                    </p>
                  ) : null}
                </section>

                <section>
                  <h2 className="mb-3 text-base font-extrabold">{i18n.gallery[language]}</h2>
                  <div className="flex gap-3 overflow-x-auto pb-2">
                    {product.gallery.map((srcImg) => (
                      <img
                        key={srcImg}
                        src={srcImg}
                        alt={product.title[language]}
                        className="h-28 w-44 shrink-0 rounded-xl border border-border object-cover"
                        loading="lazy"
                      />
                    ))}
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 text-center text-sm text-muted-foreground">{t.footer}</div>
      </div>
    </div>
  );
}
