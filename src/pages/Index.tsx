import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Moon, Sun, Play, MessageCircle, Send } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import RivoLogo from "@/components/RivoLogo";
import { copy, products, type Language, type Product } from "./index-content";

const fadeInUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55 } },
};

type PricingCard = {
  title: Record<Language, string>;
  description: Record<Language, string>;
  price: Record<Language, string>;
  period: Record<Language, string>;
  features: Record<Language, string[]>;
  badge?: Record<Language, string>;
  highlight?: boolean;
};

const pricingCards: PricingCard[] = [
  {
    title: { ar: "الخطة الأساسية", en: "Basic Plan", de: "Basic Plan" },
    description: {
      ar: "خطة مناسبة للاستخدام الشخصي اليومي",
      en: "A great plan for everyday personal use",
      de: "Ein passender Tarif für den täglichen Gebrauch",
    },
    price: { ar: "9€", en: "€9", de: "9€" },
    period: { ar: "/شهرياً", en: "/month", de: "/Monat" },
    features: {
      ar: ["بث وموسيقى", "دعم سريع", "تفعيل فوري"],
      en: ["Streaming & music", "Fast support", "Instant activation"],
      de: ["Streaming & Musik", "Schneller Support", "Sofort aktiv"],
    },
  },
  {
    title: { ar: "الخطة المميزة", en: "Premium Plan", de: "Premium Plan" },
    description: {
      ar: "أفضل قيمة مع مزايا إضافية وخدمات أكثر",
      en: "Best value with extra features and more services",
      de: "Bestes Preis-Leistungs-Verhältnis mit mehr Features",
    },
    price: { ar: "19€", en: "€19", de: "19€" },
    period: { ar: "/شهرياً", en: "/month", de: "/Monat" },
    badge: { ar: "الأكثر طلباً", en: "Most Popular", de: "Beliebt" },
    highlight: true,
    features: {
      ar: ["كل ميزات الأساسية", "أولوية بالدعم", "خدمات إضافية"],
      en: ["All basic features", "Priority support", "Extra services"],
      de: ["Alle Basic-Features", "Prioritäts-Support", "Zusatzservices"],
    },
  },
  {
    title: { ar: "خطة الأعمال", en: "Business Plan", de: "Business Plan" },
    description: {
      ar: "للشركات والفرق مع إدارة أفضل ودعم أقوى",
      en: "For teams and businesses with advanced support",
      de: "Für Teams und Unternehmen mit erweitertem Support",
    },
    price: { ar: "39€", en: "€39", de: "39€" },
    period: { ar: "/شهرياً", en: "/month", de: "/Monat" },
    features: {
      ar: ["دعم مخصص", "إدارة حسابات", "حلول مرنة"],
      en: ["Dedicated support", "Account management", "Flexible solutions"],
      de: ["Dedizierter Support", "Account-Management", "Flexible Lösungen"],
    },
  },
];

const ProductCard = ({
  product,
  index,
  language,
}: {
  product: Product;
  index: number;
  language: Language;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 28 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.08, duration: 0.45 }}
    className={`product-card p-6 ${product.featured ? "featured" : ""}`}
  >
    {product.badge && <span className="product-card-badge">{product.badge[language]}</span>}

    <div className="product-card-icon-wrap">
      <product.icon className="h-6 w-6 text-primary" />
    </div>

    <h3 className="product-card-title">{product.title[language]}</h3>
    <p className="product-card-desc">{product.description[language]}</p>
  </motion.div>
);

const getInitialTheme = () => {
  if (typeof window === "undefined") return "light";

  const savedTheme = window.localStorage.getItem("theme");
  if (savedTheme === "light" || savedTheme === "dark") return savedTheme;

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

const getInitialLanguage = (): Language => {
  if (typeof window === "undefined") return "ar";

  const savedLanguage = window.localStorage.getItem("language");
  if (savedLanguage === "ar" || savedLanguage === "en" || savedLanguage === "de") {
    return savedLanguage;
  }

  return "ar";
};

const Index = () => {
  const [theme, setTheme] = useState<"light" | "dark">(getInitialTheme);
  const [language, setLanguage] = useState<Language>(getInitialLanguage);

  const t = copy[language];

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    window.localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    window.localStorage.setItem("language", language);
  }, [language]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="min-h-screen"
      dir={t.dir}
    >
      <nav className="fixed top-0 z-50 w-full border-b border-border/70 bg-background/70 backdrop-blur-xl">
        <div className="container mx-auto flex items-center justify-between gap-4 px-6 py-3
          lg:gap-6">
          <RivoLogo className="h-16 w-[210px]" />

          <div className="flex flex-wrap items-center gap-4 text-base font-medium text-muted-foreground">
            <a href="#products" className="nav-link-fx text-muted-foreground px-1 py-1">
              {t.nav.products}
            </a>
            <a href="#pricing" className="nav-link-fx text-muted-foreground">
              {t.nav.pricing}
            </a>
            <a href="#contact" className="nav-link-fx text-muted-foreground">
              {t.nav.support}
            </a>
            <a href="#contact" className="nav-link-fx text-muted-foreground">
              {t.nav.contact}
            </a>

            <div
              className="inline-flex items-center gap-1 rounded-lg border border-border bg-background/80 p-1"
              role="group"
              aria-label={t.language.switchAria}
            >
              {[
                { code: "ar", flag: "🇸🇦", label: "العربية" },
                { code: "en", flag: "🇬🇧", label: "English" },
                { code: "de", flag: "🇩🇪", label: "Deutsch" },
              ].map((langItem) => (
                <motion.button
                  key={langItem.code}
                  type="button"
                  whileTap={{ scale: 0.96 }}
                  onClick={() => setLanguage(langItem.code as Language)}
                  className={`lang-flag-btn ${language === langItem.code ? "active" : ""}`}
                  title={langItem.label}
                  aria-label={langItem.label}
                >
                  <span aria-hidden="true">{langItem.flag}</span>
                </motion.button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-background/80 px-3 py-2 text-foreground transition-all hover:bg-muted interactive-surface"
              aria-label={t.theme.switchAria}
            >
              {theme === "dark" ? (
                <>
                  <Sun className="h-4 w-4" />
                  {t.theme.light}
                </>
              ) : (
                <>
                  <Moon className="h-4 w-4" />
                  {t.theme.dark}
                </>
              )}
            </button>
          </div>
        </div>
      </nav>

      <section className="relative flex min-h-[92vh] items-center justify-center overflow-hidden">
        <img
          src={heroBg}
          alt=""
          className="hero-bg-animated absolute inset-0 h-full w-full object-cover opacity-65"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/25 via-background/35 to-background/90" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.14),transparent_35%),radial-gradient(circle_at_80%_30%,rgba(56,189,248,0.10),transparent_40%)]" />

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="container relative z-10 mx-auto px-6 pt-28 pb-10"
        >
          <div className="hero-grid">
            {/* LEFT */}
            <div className="hero-shell">
              <div className="inline-flex mb-4">
                <span className="hero-badge">
                  <span className="hero-badge-dot" />
                  {language === "ar"
                    ? "خدمات رقمية موثوقة وسريعة"
                    : language === "de"
                    ? "Digitale Services schnell & zuverlässig"
                    : "Fast & trusted digital services"}
                </span>
              </div>

              <motion.h1
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05, duration: 0.55 }}
                className="hero-title-strong mb-4 text-4xl font-black text-foreground md:text-6xl"
              >
                <span className="text-gradient">
                  {t.hero.title} {t.hero.titleHighlight}
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.12, duration: 0.55 }}
                className="mb-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg"
              >
                {t.hero.subtitle}
              </motion.p>

              <div className="mb-7 flex flex-wrap gap-2">
                <span className="hero-chip">
                  ⚡{" "}
                  {language === "ar"
                    ? "تفعيل سريع"
                    : language === "de"
                    ? "Schnelle Aktivierung"
                    : "Quick activation"}
                </span>
                <span className="hero-chip">
                  🔒{" "}
                  {language === "ar"
                    ? "دفع آمن"
                    : language === "de"
                    ? "Sicher zahlen"
                    : "Secure checkout"}
                </span>
                <span className="hero-chip">
                  💬{" "}
                  {language === "ar"
                    ? "دعم سريع"
                    : language === "de"
                    ? "Schneller Support"
                    : "Fast support"}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <motion.a
                  href="#products"
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="btn-primary fancy-btn interactive-surface"
                >
                  <Play className="h-5 w-5" />
                  {t.hero.cta}
                </motion.a>

                <a
                  href="#pricing"
                  className="interactive-surface inline-flex items-center rounded-lg border border-border bg-background/80 px-5 py-3 font-bold text-foreground hover:bg-muted"
                >
                  {t.nav.pricing}
                </a>
              </div>
            </div>

            {/* RIGHT */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="hero-panel p-4 md:p-5"
            >
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-foreground">
                    {language === "ar"
                      ? "لوحة سريعة"
                      : language === "de"
                      ? "Quick Übersicht"
                      : "Quick Overview"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {language === "ar"
                      ? "أفضل الخدمات في مكان واحد"
                      : language === "de"
                      ? "Top Services an einem Ort"
                      : "Top services in one place"}
                  </p>
                </div>
                <div className="rounded-xl border border-border bg-background/80 px-3 py-1.5 text-xs font-bold text-primary">
                  +RIVO
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-3">
                <div className="metric-card">
                  <div className="mb-1 flex items-center justify-between">
                    <div className="metric-value">24/7</div>
                    <span className="text-base">🛟</span>
                  </div>
                  <div className="metric-label font-medium">
                    {language === "ar" ? "دعم" : language === "de" ? "Support" : "Support"}
                  </div>
                </div>

                <div className="metric-card">
                  <div className="mb-1 flex items-center justify-between">
                    <div className="metric-value">+99%</div>
                    <span className="text-base">⭐</span>
                  </div>
                  <div className="metric-label font-medium">
                    {language === "ar"
                      ? "رضا العملاء"
                      : language === "de"
                      ? "Kundenzufriedenheit"
                      : "Satisfaction"}
                  </div>
                </div>

                <div className="metric-card">
                  <div className="mb-1 flex items-center justify-between">
                    <div className="metric-value">⚡</div>
                    <span className="text-base">🚀</span>
                  </div>
                  <div className="metric-label font-medium">
                    {language === "ar"
                      ? "تفعيل فوري"
                      : language === "de"
                      ? "Sofort aktiv"
                      : "Instant delivery"}
                  </div>
                </div>

                <div className="metric-card">
                  <div className="mb-1 flex items-center justify-between">
                    <div className="metric-value">🔐</div>
                    <span className="text-base">🛡️</span>
                  </div>
                  <div className="metric-label font-medium">
                    {language === "ar" ? "أمان" : language === "de" ? "Sicher" : "Secure"}
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-background/70 p-4">
                <p className="mb-3 text-xs font-extrabold tracking-wider text-primary/90">
                  {language === "ar" ? "مميزات" : language === "de" ? "HIGHLIGHTS" : "HIGHLIGHTS"}
                </p>

                <div className="space-y-2 text-sm text-foreground">
                  <div className="flex items-center justify-between rounded-xl border border-border/70 bg-background/70 px-3 py-2.5 transition-all hover:border-primary/25 hover:bg-background">
                    <div className="flex items-center gap-2">
                      <span className="text-base">📺</span>
                      <span className="font-semibold">
                        {language === "ar"
                          ? "اشتراكات رقمية"
                          : language === "de"
                          ? "Digitale Abos"
                          : "Digital subscriptions"}
                      </span>
                    </div>
                    <span className="font-bold text-primary">✓</span>
                  </div>

                  <div className="flex items-center justify-between rounded-xl border border-border/70 bg-background/70 px-3 py-2.5 transition-all hover:border-primary/25 hover:bg-background">
                    <div className="flex items-center gap-2">
                      <span className="text-base">💸</span>
                      <span className="font-semibold">
                        {language === "ar"
                          ? "أسعار مناسبة"
                          : language === "de"
                          ? "Faire Preise"
                          : "Fair pricing"}
                      </span>
                    </div>
                    <span className="font-bold text-primary">✓</span>
                  </div>

                  <div className="flex items-center justify-between rounded-xl border border-border/70 bg-background/70 px-3 py-2.5 transition-all hover:border-primary/25 hover:bg-background">
                    <div className="flex items-center gap-2">
                      <span className="text-base">💬</span>
                      <span className="font-semibold">
                        {language === "ar"
                          ? "دعم مباشر"
                          : language === "de"
                          ? "Direkter Support"
                          : "Direct support"}
                      </span>
                    </div>
                    <span className="font-bold text-primary">✓</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      <section id="products" className="py-24">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-14 text-center"
          >
            <h2 className="mb-3 text-3xl font-black text-foreground md:text-4xl">{t.products.title}</h2>
            <p className="text-muted-foreground">{t.products.subtitle}</p>
          </motion.div>

          <div className="mx-auto grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product, i) => (
              <ProductCard key={product.title.en} product={product} index={i} language={language} />
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="py-8 pb-24">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <h2 className="mb-3 text-3xl font-black text-foreground md:text-4xl">{t.nav.pricing}</h2>
            <p className="text-muted-foreground">
              {language === "ar"
                ? "باقات مرنة تناسب احتياجاتك"
                : language === "de"
                ? "Flexible Pakete für deine Bedürfnisse"
                : "Flexible plans for your needs"}
            </p>
          </motion.div>

          <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-3">
            {pricingCards.map((card, i) => (
              <motion.div
                key={card.title.en}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.45 }}
                className={`pricing-card p-6 ${card.highlight ? "featured" : ""}`}
              >
                {card.badge && 
                  <span className="pricing-badge"> {card.badge[language]}
                  </span>
                }

                <h3 className="pricing-title">{card.title[language]}</h3>
                <p className="pricing-desc">{card.description[language]}</p>

                <div className="pricing-price">
                  <span className="pricing-price-value">{card.price[language]}</span>
                  <span className="pricing-price-period">{card.period[language]}</span>
                </div>

                <button
                  type="button"
                  className={`pricing-btn ${card.highlight ? "featured" : ""}`}
                >
                  {language === "ar" ? "اختر الخطة" : language === "de" ? "Plan wählen" : "Choose plan"}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="pb-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto max-w-4xl glass p-8 text-center"
          >
            <h2 className="mb-3 text-2xl font-black text-foreground md:text-3xl">{t.contact.title}</h2>
            <p className="mx-auto mb-6 max-w-2xl text-muted-foreground">{t.contact.subtitle}</p>

            <div className="flex flex-wrap justify-center gap-3">
              <a
                href="https://wa.me/491234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary interactive-surface inline-flex items-center gap-2"
              >
                <MessageCircle className="h-4 w-4" />
                {t.contact.whatsapp}
              </a>

              <a
                href="https://t.me/rivoplus"
                target="_blank"
                rel="noopener noreferrer"
                className="interactive-surface inline-flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-2.5 font-bold text-foreground hover:bg-muted"
              >
                <Send className="h-4 w-4" />
                {t.contact.telegram}
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <footer className="border-t border-border/70 py-6 text-center text-sm text-muted-foreground">
        <div className="container mx-auto px-6">{t.footer}</div>
      </footer>
    </motion.div>
  );
};

export default Index;