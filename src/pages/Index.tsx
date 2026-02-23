import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Globe, Moon, Play, Send, Sun, MessageCircle } from "lucide-react";
import RivoLogo from "@/components/RivoLogo";
import heroBg from "@/assets/hero-bg.jpg";

import { copy, products, type Language, type Product } from "./index-content";

const languageOrder: Language[] = ["ar", "en", "de"];
const languageMeta: Record<Language, { flag: string }> = {
  ar: { flag: "🇸🇦" },
  en: { flag: "🇬🇧" },
  de: { flag: "🇩🇪" },
};

const heroContainer = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      when: "beforeChildren",
      staggerChildren: 0.12,
    },
  },
};

const heroItem = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55 } },
};

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
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    whileHover={{ y: -8, scale: 1.03 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1, duration: 0.5, type: "spring", stiffness: 210, damping: 18 }}
    className={`group relative rounded-lg p-6 transition-all duration-300 hover:scale-[1.03] ${
      product.featured
        ? "glass glow-blue border border-primary/30"
        : "glass hover:border-primary/20"
    }`}
  >
    {product.badge && (
      <span className="absolute -top-3 right-4 rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground">
        {product.badge[language]}
      </span>
    )}
    <product.icon className="mb-4 h-10 w-10 text-primary transition-transform duration-300 group-hover:scale-110" />
    <h3 className="mb-2 text-xl font-bold text-foreground">{product.title[language]}</h3>
    <p className="text-sm leading-relaxed text-muted-foreground">{product.description[language]}</p>
  </motion.div>
);

const getInitialTheme = () => {
  if (typeof window === "undefined") {
    return "light";
  }

  const savedTheme = window.localStorage.getItem("theme");
  if (savedTheme === "light" || savedTheme === "dark") {
    return savedTheme;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

const getInitialLanguage = (): Language => {
  if (typeof window === "undefined") {
    return "ar";
  }

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
    <div className="min-h-screen font-cairo" dir={t.dir}>
      <nav className="fixed top-0 z-50 w-full glass">
        <div className="container mx-auto flex items-center justify-between gap-4 px-6 py-4">
          <RivoLogo className="h-10 w-[130px]" />
          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            <a href="#products" className="transition-colors hover:text-foreground">
              {t.nav.products}
            </a>
            <a href="#pricing" className="transition-colors hover:text-foreground">
              {t.nav.pricing}
            </a>
            <a href="#contact" className="transition-colors hover:text-foreground">
              {t.nav.support}
            </a>
            <a href="#contact" className="transition-colors hover:text-foreground">
              {t.nav.contact}
            </a>

            <div
              className="inline-flex items-center gap-1 rounded-lg border border-border bg-background/80 p-1"
              role="group"
              aria-label={t.language.switchAria}
            >
              <Globe className="mx-1 h-4 w-4 text-muted-foreground" />
              {languageOrder.map((locale) => (
                <motion.button
                  key={locale}
                  type="button"
                  onClick={() => setLanguage(locale)}
                  whileHover={{ y: -1, scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className={`inline-flex items-center gap-1 rounded-md px-2 py-1.5 text-xs font-semibold transition-all ${
                    language === locale
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-foreground hover:bg-muted"
                  }`}
                  aria-pressed={language === locale}
                >
                  <span aria-hidden>{languageMeta[locale].flag}</span>
                  <span>{t.language[locale]}</span>
                </motion.button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-background/80 px-3 py-2 text-foreground transition-colors hover:bg-muted"
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

      <section className="relative flex min-h-[85vh] items-center justify-center overflow-hidden">
        <img src={heroBg} alt="" className="absolute inset-0 h-full w-full object-cover opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/35 via-background/20 to-background/85" />
        <motion.div
          aria-hidden
          className="absolute -left-16 top-1/4 h-48 w-48 rounded-full bg-primary/20 blur-3xl"
          animate={{ y: [0, -16, 0], x: [0, 10, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          aria-hidden
          className="absolute -right-20 bottom-1/4 h-56 w-56 rounded-full bg-primary/25 blur-3xl"
          animate={{ y: [0, 14, 0], x: [0, -8, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          variants={heroContainer}
          initial="hidden"
          animate="visible"
          className="relative z-10 text-center"
        >
          <motion.div variants={heroItem}>
            <RivoLogo className="mx-auto mb-8 h-24 w-[210px]" animated />
          </motion.div>
          <motion.h1 variants={heroItem} className="mb-4 text-4xl font-black leading-tight text-foreground md:text-6xl">
            {t.hero.title} <span className="text-gradient">{t.hero.titleHighlight}</span>
          </motion.h1>
          <motion.p variants={heroItem} className="mx-auto mb-8 max-w-lg text-lg text-muted-foreground">
            {t.hero.subtitle}
          </motion.p>
          <motion.a
            variants={heroItem}
            href="#products"
            whileHover={{ scale: 1.06, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-3 font-bold text-primary-foreground transition-all hover:opacity-95 glow-blue"
          >
            <Play className="h-5 w-5" />
            {t.hero.cta}
          </motion.a>
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

          <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product, i) => (
              <ProductCard key={product.title.en} product={product} index={i} language={language} />
            ))}
          </div>
        </div>
      </section>

      {/* Pricing section moved into main page */}
      <section id="pricing" className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="mb-14 text-center">
            <h2 className="mb-3 text-3xl font-black text-foreground md:text-4xl">{t.nav.pricing}</h2>
            <p className="text-muted-foreground">{t.pricing?.subtitle ?? "Flexible plans for your needs"}</p>
          </div>

          <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-3">
            {(
              // derive plans from a small inline copy structure
              (
                {
                  ar: [
                    { name: "أساسي", price: "$9", details: "للاستخدام الشخصي" },
                    { name: "احترافي", price: "$19", details: "مزايا أكثر وجودة أعلى" },
                    { name: "مؤسسي", price: "$49", details: "للفرق والشركات" },
                  ],
                  en: [
                    { name: "Basic", price: "$9", details: "For personal use" },
                    { name: "Pro", price: "$19", details: "More features and higher quality" },
                    { name: "Business", price: "$49", details: "For teams and companies" },
                  ],
                  de: [
                    { name: "Basic", price: "$9", details: "Für private Nutzung" },
                    { name: "Pro", price: "$19", details: "Mehr Funktionen und höhere Qualität" },
                    { name: "Business", price: "$49", details: "Für Teams und Unternehmen" },
                  ],
                } as Record<Language, { name: string; price: string; details: string }[]>
              )[language]
            ).map((plan) => (
              <motion.article
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="rounded-xl border border-border bg-card p-6 text-center"
              >
                <h3 className="mb-2 text-lg font-bold text-foreground">{plan.name}</h3>
                <p className="mb-2 text-2xl font-black text-primary">{plan.price}</p>
                <p className="text-sm text-muted-foreground">{plan.details}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-24">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-10"
          >
            <h2 className="mb-3 text-3xl font-black text-foreground md:text-4xl">{t.contact.title}</h2>
            <p className="text-muted-foreground">{t.contact.subtitle}</p>
          </motion.div>
          <div className="mx-auto flex max-w-md flex-col gap-4 sm:flex-row sm:justify-center">
            <motion.a
              href="https://wa.me/message/WT2U3TVLWAPAL1"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -3, scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center justify-center gap-3 rounded-lg bg-[#25D366] px-8 py-4 font-bold text-white transition-all hover:opacity-90"
            >
              <MessageCircle className="h-5 w-5" />
              {t.contact.whatsapp}
            </motion.a>
            <motion.a
              href="https://t.me/rivoplus"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -3, scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center justify-center gap-3 rounded-lg bg-[#229ED9] px-8 py-4 font-bold text-white transition-all hover:opacity-90"
            >
              <Send className="h-5 w-5" />
              {t.contact.telegram}
            </motion.a>
          </div>
        </div>
      </section>

      <footer className="border-t border-border py-10 text-center text-sm text-muted-foreground">
        <p>{t.footer}</p>
      </footer>
    </div>
  );
};

export default Index;
