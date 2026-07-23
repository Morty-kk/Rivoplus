import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Play, MessageCircle, Send, Menu, X, ShoppingCart } from "lucide-react";
import heroBg from "@/assets/hero-bg.webp";
import RivoLogo from "@/components/RivoLogo";
import LanguageSelector from "@/components/LanguageSelector";
import { ProductShowcase } from "@/components/ProductShowcase";
import CartSection from "@/components/CartSection";
import { TextParticles } from "@/components/TextParticles";
import { useCart } from "@/lib/cart";
import { buildCartItem } from "@/lib/productSelection";
import { useToast } from "@/hooks/use-toast";
import type { TvPriceTable } from "@/components/TvPlanSelector";
import type { MusicPrices } from "@/components/MusicPlanSelector";
import type { CreativityPrices } from "@/components/CreativityPlanSelector";
import { copy, products, type Language, type Product } from "./index-content";
import { RIVO_WHATSAPP_PHONE, RIVO_TELEGRAM_USERNAME } from "@/config/contact";

const fadeInUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55 } },
};

const chipContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.13, delayChildren: 0.38 } },
};
const chipItem = {
  hidden: { opacity: 0, y: 12, scale: 0.86 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.42, ease: "easeOut" } },
};

const metricContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.22 } },
};
const metricItem = {
  hidden: { opacity: 0, y: 16, scale: 0.9 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.44, ease: "easeOut" } },
};

const featureContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.11, delayChildren: 0.18 } },
};
const featureItem = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.38, ease: "easeOut" } },
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

const getInitialLanguage = (): Language => {
  if (typeof window === "undefined") return "ar";
  const savedLanguage = window.localStorage.getItem("language");
  if (savedLanguage === "ar" || savedLanguage === "en" || savedLanguage === "de") return savedLanguage;
  return "ar";
};

const Index = () => {
  // configure this to the WhatsApp URL you want the trial button to open
  const WHATSAPP_TRIAL_LINK = `https://wa.me/${RIVO_WHATSAPP_PHONE}?text=I%20want%20the%2024h%20trial`;

  const [language, setLanguage] = useState<Language>(getInitialLanguage);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { addItem, itemCount } = useCart();
  const { toast } = useToast();

  const t = copy[language] ?? copy.ar;

  useEffect(() => {
    document.documentElement.classList.add("dark");
    window.localStorage.setItem("theme", "dark");
  }, []);

  useEffect(() => {
    window.localStorage.setItem("language", language);
    document.documentElement.lang = language;
    window.dispatchEvent(new CustomEvent("rivo-language-change", { detail: language }));
    setMobileMenuOpen(false);
  }, [language]);

  const tvPrices: TvPriceTable = {
    gold: {
      1: { deutsch: 5, arabisch: 5 },
      3: { deutsch: 10, arabisch: 10 },
      6: { deutsch: 20, arabisch: 15 },
      12: { deutsch: 30, arabisch: 25 },
    },
    diamond: {
      1: { deutsch: 10, arabisch: 10 },
      3: { deutsch: 20, arabisch: 15 },
      6: { deutsch: 30, arabisch: 25 },
      12: { deutsch: 40, arabisch: 35 },
    },
  };
  const musicPrices: MusicPrices = { youtube: { premium: 40 } };
  const creativityPrices: CreativityPrices = {
    adobe: { 12: 50 },
    canva: { 12: 5 },
  };

  const addProductToCart = (product: Product) => {
    addItem(
      buildCartItem({
        product,
        language,
        tv: { value: { plan: "gold", duration: 12, audience: "arabisch" }, prices: tvPrices },
        music: { value: { service: "youtube", tier: "premium", durationMonths: 12 }, prices: musicPrices },
        creativity: { value: { service: "adobe", tier: "pro", durationMonths: 12 }, prices: creativityPrices },
      }),
    );
    toast({
      title:
        language === "ar"
          ? "تمت الإضافة إلى السلة"
          : language === "de"
          ? "Zum Warenkorb hinzugefügt"
          : "Added to cart",
    });
  };

  const productSections = [
    {
      key: "streaming" as const,
      title: language === "ar" ? "TV و Streaming" : language === "de" ? "TV & Streaming" : "TV & Streaming",
      subtitle:
        language === "ar"
          ? "اشتراكات المشاهدة والموسيقى في مكان واحد."
          : language === "de"
          ? "Streaming, TV und Entertainment zusammen."
          : "Streaming, TV, and entertainment together.",
      products: products.filter((product) => product.category === "streaming"),
    },
    {
      key: "creative" as const,
      title: language === "ar" ? "Adobe و Canva" : language === "de" ? "Adobe & Canva" : "Adobe & Canva",
      subtitle:
        language === "ar"
          ? "أدوات التصميم والإبداع بشكل منفصل وواضح."
          : language === "de"
          ? "Design- und Kreativ-Tools sauber getrennt."
          : "Design and creativity tools, clearly separated.",
      products: products.filter((product) => product.category === "creative"),
    },
    {
      key: "services" as const,
      title: language === "ar" ? "AI Services" : language === "de" ? "AI Services" : "AI Services",
      subtitle:
        language === "ar"
          ? "خدمات مثل ChatGPT و Gemini للكتابة والعمل والدراسة."
          : language === "de"
          ? "Services wie ChatGPT und Gemini für Arbeit, Lernen und Content."
          : "Services like ChatGPT and Gemini for work, study, and content.",
      products: products.filter((product) => product.category === "services"),
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="rivo-site-animated min-h-screen"
      dir={t.dir}
    >
      {/* NAVBAR */}
      <nav className="rivo-nav fixed top-0 z-50 w-full border-b border-border/70 bg-background/70 backdrop-blur-xl">
        <div className="container mx-auto flex items-center justify-between gap-2 px-3 py-2 md:gap-3 md:px-6 md:py-5">
          <Link to="/" aria-label="Home" className="inline-flex items-center">
            <RivoLogo className="h-7 w-[90px] md:h-16 md:w-[210px]" />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex flex-wrap items-center gap-4 text-base font-medium text-muted-foreground">
            <a href="#products" className="nav-link-fx px-1 py-1 text-muted-foreground">
              {t.nav?.products ?? "Products"}
            </a>
            <a href="#cart" className="nav-link-fx px-1 py-1 text-muted-foreground">
              {language === "ar" ? "السلة" : language === "de" ? "Warenkorb" : "Cart"}
            </a>
            <a href="#faq" className="nav-link-fx px-1 py-1 text-muted-foreground">
              {t.nav?.faq ?? "FAQ"}
            </a>
            <a href="#contact" className="nav-link-fx px-1 py-1 text-muted-foreground">
              {t.nav?.contact ?? "Contact"}
            </a>

            <LanguageSelector
              value={language}
              onChange={setLanguage}
              ariaLabel={t.language?.switchAria ?? "Switch language"}
            />

          </div>

          {/* Mobile Controls */}
          <div className="flex items-center gap-2 md:hidden">
            <a
              href="#cart"
              className="relative inline-flex h-8 w-8 items-center justify-center rounded-md border border-border bg-background/80 text-foreground hover:bg-muted"
              aria-label="Cart"
            >
              <ShoppingCart className="h-3.5 w-3.5" />
              {itemCount > 0 ? (
                <span className="absolute -right-1.5 -top-1.5 grid h-4 min-w-4 place-items-center rounded-full bg-primary px-1 text-[10px] font-black text-primary-foreground">
                  {itemCount}
                </span>
              ) : null}
            </a>

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
            <a
              href="#products"
              onClick={() => setMobileMenuOpen(false)}
              className="block rounded-lg px-3 py-2 text-sm font-medium text-foreground hover:bg-muted"
            >
              {t.nav?.products ?? "Products"}
            </a>
            <a
              href="#cart"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium text-foreground hover:bg-muted"
            >
              <span>{language === "ar" ? "السلة" : language === "de" ? "Warenkorb" : "Cart"}</span>
              {itemCount > 0 ? (
                <span className="rounded-full bg-primary px-2 py-0.5 text-xs font-black text-primary-foreground">
                  {itemCount}
                </span>
              ) : null}
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
            <LanguageSelector
              value={language}
              onChange={setLanguage}
              ariaLabel={t.language?.switchAria ?? "Switch language"}
              compact
            />
          </div>

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
        <div className="hero-energy-grid" aria-hidden="true" />
        <TextParticles language={language} />

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="container relative z-10 mx-auto px-6 pt-20 pb-10 md:pt-28"
        >
          <div className="hero-grid">
            <div className="hero-shell hero-shell-kinetic">
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

              <motion.div variants={chipContainer} initial="hidden" animate="visible" className="mb-7 flex flex-wrap gap-2">
                <motion.span variants={chipItem} className="hero-chip">
                  ⚡ {language === "ar" ? "تفعيل سريع" : language === "de" ? "Schnelle Aktivierung" : "Quick activation"}
                </motion.span>
                <motion.span variants={chipItem} className="hero-chip">
                  🔒 {language === "ar" ? "دفع آمن" : language === "de" ? "Sicher zahlen" : "Secure checkout"}
                </motion.span>
                <motion.span variants={chipItem} className="hero-chip">
                  💬 {language === "ar" ? "دعم سريع" : language === "de" ? "Schneller Support" : "Fast support"}
                </motion.span>
              </motion.div>

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
              <div className="hero-scan-line" />
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

              <motion.div variants={metricContainer} initial="hidden" animate="visible" className="mb-3 grid grid-cols-2 gap-3">
                <motion.div variants={metricItem} className="metric-card">
                  <div className="mb-1 flex items-center justify-between">
                    <div className="metric-value">24/7</div>
                    <span className="text-base">🛟</span>
                  </div>
                  <div className="metric-label font-medium">{language === "ar" ? "دعم" : "Support"}</div>
                </motion.div>

                <motion.div variants={metricItem} className="metric-card">
                  <div className="mb-1 flex items-center justify-between">
                    <div className="metric-value">+99%</div>
                    <span className="text-base">⭐</span>
                  </div>
                  <div className="metric-label font-medium">
                    {language === "ar" ? "رضا العملاء" : language === "de" ? "Kundenzufriedenheit" : "Satisfaction"}
                  </div>
                </motion.div>

                <motion.div variants={metricItem} className="metric-card">
                  <div className="mb-1 flex items-center justify-between">
                    <div className="metric-value">⚡</div>
                    <span className="text-base">🚀</span>
                  </div>
                  <div className="metric-label font-medium">
                    {language === "ar" ? "تفعيل فوري" : language === "de" ? "Sofort aktiv" : "Instant delivery"}
                  </div>
                </motion.div>

                <motion.div variants={metricItem} className="metric-card">
                  <div className="mb-1 flex items-center justify-between">
                    <div className="metric-value">🔐</div>
                    <span className="text-base">🛡️</span>
                  </div>
                  <div className="metric-label font-medium">
                    {language === "ar" ? "أمان" : language === "de" ? "Sicher" : "Secure"}
                  </div>
                </motion.div>
              </motion.div>

              <div className="rounded-2xl border border-border bg-background/70 p-4">
                <p className="mb-3 text-xs font-extrabold tracking-wider text-primary/90">
                  {language === "ar" ? "مميزات" : "HIGHLIGHTS"}
                </p>

                <motion.div variants={featureContainer} initial="hidden" animate="visible" className="space-y-2 text-sm text-foreground">
                  {[
                    { icon: "📺", ar: "اشتراكات رقمية", en: "Digital subscriptions", de: "Digitale Abos" },
                    { icon: "💸", ar: "أسعار مناسبة", en: "Fair pricing", de: "Faire Preise" },
                    { icon: "💬", ar: "دعم مباشر", en: "Direct support", de: "Direkter Support" },
                  ].map((row) => (
                    <motion.div
                      variants={featureItem}
                      key={row.en}
                      className="flex items-center justify-between rounded-xl border border-border/70 bg-background/70 px-3 py-2.5 transition-all hover:border-primary/25 hover:bg-background"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-base">{row.icon}</span>
                        <span className="font-semibold">{row[language]}</span>
                      </div>
                      <span className="font-bold text-primary">✓</span>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* PRODUCTS */}
      <section id="products" className="product-section-stage py-24">
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

          <div className="space-y-14">
            {productSections.map((section) => (
              <motion.div
                key={section.key}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-90px" }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <div className="section-heading-kinetic mb-5 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <h3 className="text-2xl font-black text-foreground">{section.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{section.subtitle}</p>
                  </div>
                  <div className="hidden h-px flex-1 bg-border/60 sm:block" />
                </div>

                <ProductShowcase
                  products={section.products}
                  language={language}
                  exploreLabel={language === "ar" ? "استكشف" : language === "de" ? "Entdecken" : "Explore"}
                  productDetailsLabel={t.products?.openDetails ?? "Open details"}
                  ctaLabel={t.products?.viewDetails ?? "View details"}
                  addToCartLabel={language === "ar" ? "أضف للسلة" : language === "de" ? "In den Warenkorb" : "Add to cart"}
                  onAddToCart={addProductToCart}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CartSection language={language} browseHref="#products" />

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
                href={`https://wa.me/${RIVO_WHATSAPP_PHONE}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary interactive-surface inline-flex items-center gap-2"
              >
                <MessageCircle className="h-4 w-4" />
                {t.contact?.whatsapp ?? "WhatsApp"}
              </a>

              <a
                href={`https://t.me/${RIVO_TELEGRAM_USERNAME}`}
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

