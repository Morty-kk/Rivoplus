import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Moon, Sun, Play, MessageCircle, Send, Menu, X } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import RivoLogo from "@/components/RivoLogo";
import { copy, products, type Language, type Product } from "./index-content";

const fadeInUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55 } },
};


const ProductCard = ({
  product,
  index,
  language,
  viewDetailsLabel,
}: {
  product: Product;
  index: number;
  language: Language;
  viewDetailsLabel: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 28 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.08, duration: 0.45 }}
  >
    <Link
      to={`/product/${product.slug}`}
      className={`product-card block p-6 ${product.featured ? "featured" : ""}`}
    >
      {product.badge && <span className="product-card-badge">{product.badge[language]}</span>}

      <div className="product-card-icon-wrap">
        <product.icon className="h-6 w-6 text-primary" />
      </div>

      <h3 className="product-card-title">{product.title[language]}</h3>
      <p className="product-card-desc mb-4">{product.description[language]}</p>

      <span className="inline-flex items-center text-sm font-bold text-primary">
        {viewDetailsLabel}
      </span>
    </Link>
  </motion.div>
);

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

const getInitialTheme = (): "light" | "dark" => {
  if (typeof window === "undefined") return "light";
  const savedTheme = window.localStorage.getItem("theme");
  if (savedTheme === "light" || savedTheme === "dark") return savedTheme;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

const getInitialLanguage = (): Language => {
  if (typeof window === "undefined") return "ar";
  const savedLanguage = window.localStorage.getItem("language");
  if (savedLanguage === "ar" || savedLanguage === "en" || savedLanguage === "de") return savedLanguage;
  return "ar";
};

const Index = () => {
  // configure this to the WhatsApp URL you want the trial button to open
  const WHATSAPP_TRIAL_LINK = "https://wa.me/963980582206?text=I%20want%20the%2024h%20trial";

  const [theme, setTheme] = useState<"light" | "dark">(getInitialTheme);
  const [language, setLanguage] = useState<Language>(getInitialLanguage);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const t = copy[language] ?? copy.ar;

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    window.localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    window.localStorage.setItem("language", language);
    setMobileMenuOpen(false);
  }, [language]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="min-h-screen"
      dir={t.dir}
    >
      {/* NAVBAR */}
      <nav className="fixed top-0 z-50 w-full border-b border-border/70 bg-background/70 backdrop-blur-xl">
        <div className="container mx-auto flex items-center justify-between gap-2 px-3 py-2 md:gap-3 md:px-6 md:py-5">
          <Link to="/" aria-label="Home" className="inline-flex items-center">

            <Link to="/" aria-label="Home" className="inline-flex items-center">


              <RivoLogo className="h-7 w-[90px] md:h-16 md:w-[210px]" />


            </Link>

          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex flex-wrap items-center gap-4 text-base font-medium text-muted-foreground">
            <Link to="/products" className="nav-link-fx px-1 py-1 text-muted-foreground">
              {t.nav?.products ?? "Products"}
            </Link>
            <a href="#products" className="nav-link-fx px-1 py-1 text-muted-foreground">
              {t.nav?.categories ?? "Categories"}
            </a>
            <a href="#faq" className="nav-link-fx px-1 py-1 text-muted-foreground">
              {t.nav?.faq ?? "FAQ"}
            </a>
            <a href="#contact" className="nav-link-fx px-1 py-1 text-muted-foreground">
              {t.nav?.contact ?? "Contact"}
            </a>

            <div
              className="inline-flex items-center gap-1 rounded-lg border border-border bg-background/80 p-1"
              role="group"
              aria-label={t.language?.switchAria ?? "Switch language"}
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
              className="interactive-surface inline-flex items-center gap-2 rounded-lg border border-border bg-background/80 px-4 py-2.5 text-base font-medium text-foreground transition-all hover:bg-muted"
              aria-label={t.theme?.switchAria ?? "Toggle theme"}
            >
              {theme === "dark" ? (
                <>
                  <Sun className="h-4 w-4" />
                  {t.theme?.light ?? "Light"}
                </>
              ) : (
                <>
                  <Moon className="h-4 w-4" />
                  {t.theme?.dark ?? "Dark"}
                </>
              )}
            </button>
          </div>

          {/* Mobile Controls */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              type="button"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-border bg-background/80 text-foreground hover:bg-muted"
              aria-label={t.theme?.switchAria ?? "Toggle theme"}
            >
              {theme === "dark" ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-border bg-background/80 text-foreground hover:bg-muted"
              aria-label="Open menu"
            >
              <Menu className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Mobile Backdrop */}
        {mobileMenuOpen && (
          <button
            type="button"
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[2px] md:hidden"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close menu backdrop"
          />
        )}

        {/* Mobile Drawer */}
        <div
          className={`fixed top-0 z-50 h-screen w-[82%] max-w-[320px] bg-background/95 p-4 shadow-2xl backdrop-blur-xl transition-transform duration-300 md:hidden ${
            t.dir === "rtl" ? "left-0 border-r border-border" : "right-0 border-l border-border"
          } ${
            mobileMenuOpen
              ? "translate-x-0"
              : t.dir === "rtl"
              ? "-translate-x-full"
              : "translate-x-full"
          }`}
          dir={t.dir}
        >
          <div className="mb-4 flex items-center justify-between">
            <RivoLogo className="h-8 w-[100px]" />
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-border bg-background/80 text-foreground hover:bg-muted"
              aria-label="Close menu"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="mb-4 h-px bg-border/70" />

          <div className="space-y-1">
            <Link
              to="/products"
              onClick={() => setMobileMenuOpen(false)}
              className="block rounded-lg px-3 py-2 text-sm font-medium text-foreground hover:bg-muted"
            >
              {t.nav?.products ?? "Products"}
            </Link>
            <a
              href="#products"
              onClick={() => setMobileMenuOpen(false)}
              className="block rounded-lg px-3 py-2 text-sm font-medium text-foreground hover:bg-muted"
            >
              {t.nav?.categories ?? "Categories"}
            </a>
            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="block rounded-lg px-3 py-2 text-sm font-medium text-foreground hover:bg-muted"
            >
              {t.nav?.faq ?? "FAQ"}
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block rounded-lg px-3 py-2 text-sm font-medium text-foreground hover:bg-muted"
            >
              {t.nav?.contact ?? "Contact"}
            </a>
          </div>

          <div className="my-4 h-px bg-border/70" />

          <div className="mb-4">
            <p className="mb-2 text-xs font-bold uppercase tracking-wide text-muted-foreground">
              {t.language?.switchAria ?? "Switch language"}
            </p>
            <div className="flex items-center gap-2">
              {[
                { code: "ar", flag: "🇸🇦", label: "العربية" },
                { code: "en", flag: "🇬🇧", label: "English" },
                { code: "de", flag: "🇩🇪", label: "Deutsch" },
              ].map((langItem) => (
                <button
                  key={langItem.code}
                  type="button"
                  onClick={() => setLanguage(langItem.code as Language)}
                  className={`lang-flag-btn ${language === langItem.code ? "active" : ""}`}
                  title={langItem.label}
                  aria-label={langItem.label}
                >
                  <span aria-hidden="true">{langItem.flag}</span>
                </button>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-border bg-background/80 px-4 py-2.5 text-sm font-semibold text-foreground hover:bg-muted"
            aria-label={t.theme?.switchAria ?? "Toggle theme"}
          >
            {theme === "dark" ? (
              <>
                <Sun className="h-4 w-4" />
                {t.theme?.light ?? "Light"}
              </>
            ) : (
              <>
                <Moon className="h-4 w-4" />
                {t.theme?.dark ?? "Dark"}
              </>
            )}
          </button>
        </div>
      </nav>

      {/* HERO */}
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
          className="container relative z-10 mx-auto px-6 pt-20 pb-10 md:pt-28"
        >
          <div className="hero-grid">
            <div className="hero-shell">
              <div className="mb-4 inline-flex">
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
                  {(t.hero?.title ?? "Everything you need in")}{" "}
                  {(t.hero?.titleHighlight ?? "one place")}
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.12, duration: 0.55 }}
                className="mb-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg"
              >
                {t.hero?.subtitle ?? ""}
              </motion.p>

              <div className="mb-7 flex flex-wrap gap-2">
                <span className="hero-chip">
                  ⚡ {language === "ar" ? "تفعيل سريع" : language === "de" ? "Schnelle Aktivierung" : "Quick activation"}
                </span>
                <span className="hero-chip">
                  🔒 {language === "ar" ? "دفع آمن" : language === "de" ? "Sicher zahlen" : "Secure checkout"}
                </span>
                <span className="hero-chip">
                  💬 {language === "ar" ? "دعم سريع" : language === "de" ? "Schneller Support" : "Fast support"}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <motion.a
                  href={WHATSAPP_TRIAL_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="btn-primary fancy-btn interactive-surface"
                >
                  <Play className="h-5 w-5" />
                  {language === "ar"
                    ? "تجربة 24 ساعة"
                    : language === "de"
                    ? "24h Test"
                    : "24h trial"}
                </motion.a>

                <a
                  href="#products"
                  className="interactive-surface inline-flex items-center rounded-lg border border-border bg-background/80 px-5 py-3 font-bold text-foreground hover:bg-muted"
                >
                  {t.nav.products}
                </a>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="hero-panel p-4 md:p-5"
            >
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-foreground">
                    {language === "ar" ? "لوحة سريعة" : language === "de" ? "Quick Übersicht" : "Quick Overview"}
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

              <div className="mb-3 grid grid-cols-2 gap-3">
                <div className="metric-card">
                  <div className="mb-1 flex items-center justify-between">
                    <div className="metric-value">24/7</div>
                    <span className="text-base">🛟</span>
                  </div>
                  <div className="metric-label font-medium">{language === "ar" ? "دعم" : "Support"}</div>
                </div>

                <div className="metric-card">
                  <div className="mb-1 flex items-center justify-between">
                    <div className="metric-value">+99%</div>
                    <span className="text-base">⭐</span>
                  </div>
                  <div className="metric-label font-medium">
                    {language === "ar" ? "رضا العملاء" : language === "de" ? "Kundenzufriedenheit" : "Satisfaction"}
                  </div>
                </div>

                <div className="metric-card">
                  <div className="mb-1 flex items-center justify-between">
                    <div className="metric-value">⚡</div>
                    <span className="text-base">🚀</span>
                  </div>
                  <div className="metric-label font-medium">
                    {language === "ar" ? "تفعيل فوري" : language === "de" ? "Sofort aktiv" : "Instant delivery"}
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
                  {language === "ar" ? "مميزات" : "HIGHLIGHTS"}
                </p>

                <div className="space-y-2 text-sm text-foreground">
                  {[
                    { icon: "📺", ar: "اشتراكات رقمية", en: "Digital subscriptions", de: "Digitale Abos" },
                    { icon: "💸", ar: "أسعار مناسبة", en: "Fair pricing", de: "Faire Preise" },
                    { icon: "💬", ar: "دعم مباشر", en: "Direct support", de: "Direkter Support" },
                  ].map((row) => (
                    <div
                      key={row.en}
                      className="flex items-center justify-between rounded-xl border border-border/70 bg-background/70 px-3 py-2.5 transition-all hover:border-primary/25 hover:bg-background"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-base">{row.icon}</span>
                        <span className="font-semibold">{row[language]}</span>
                      </div>
                      <span className="font-bold text-primary">✓</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* PRODUCTS */}
      <section id="products" className="py-24">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-14 text-center"
          >
            <h2 className="mb-3 text-3xl font-black text-foreground md:text-4xl">
              {t.products?.title ?? "Products"}
            </h2>
            <p className="text-muted-foreground">{t.products?.subtitle ?? ""}</p>
          </motion.div>

          <div className="mx-auto grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {(products ?? []).map((product, i) => (
              <ProductCard
                key={product.slug}
                product={product}
                index={i}
                language={language}
                viewDetailsLabel={t.products?.viewDetails ?? "View details"}
              />
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      
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
                href="https://t.me/dein_telegram_name"
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
    </motion.div>
  );
};

export default Index;