import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Play, MessageCircle, Send, Moon, Sun } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo_blue_B.png";
import heroBg from "@/assets/hero-bg.jpg";

import { copy, products, type Language, type Product } from "./index-content";

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
    viewport={{ once: true }}
    transition={{ delay: index * 0.1, duration: 0.5 }}
    className={`relative rounded-lg p-6 transition-all duration-300 hover:scale-[1.03] ${
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
    <product.icon className="mb-4 h-10 w-10 text-primary" />
    <h3 className="mb-2 text-xl font-bold text-foreground">{product.title[language]}</h3>
    <p className="text-sm leading-relaxed text-muted-foreground">
      {product.description[language]}
    </p>
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

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

const languageButtons: Record<Language, string> = {
  ar: "🇸🇦 العربية",
  en: "🇺🇸 English",
  de: "🇩🇪 Deutsch",
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
      <div
        className="fixed left-4 top-4 z-[60] inline-flex items-center gap-1 rounded-xl border border-border bg-background/85 p-1 text-foreground shadow-lg backdrop-blur"
        role="group"
        aria-label={t.language.switchAria}
      >
        {(["ar", "en", "de"] as const).map((lang) => (
          <button
            key={lang}
            type="button"
            onClick={() => setLanguage(lang)}
            className={`rounded-md px-2 py-1 text-xs font-semibold transition-colors ${
              language === lang ? "bg-primary text-primary-foreground" : "hover:bg-muted"
            }`}
          >
            {languageButtons[lang]}
          </button>
        ))}
      </div>
      <nav className="fixed top-0 z-50 w-full glass">
        <div className="container mx-auto flex items-center justify-between gap-4 px-6 py-4">
          <img src={logo} alt="Rivo Plus" className="h-10 w-10 rounded-full border border-border/60 object-cover" />
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <Link to="/products" className="transition-colors hover:text-foreground">
              {t.nav.products}
            </Link>
            <Link to="/pricing" className="transition-colors hover:text-foreground">
              {t.nav.pricing}
            </Link>
            <a href="#" className="transition-colors hover:text-foreground">
              {t.nav.support}
            </a>
            <a href="#contact" className="transition-colors hover:text-foreground">
              {t.nav.contact}
            </a>
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
        <img
          src={heroBg}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/35 via-background/20 to-background/85" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center"
        >
          <motion.img
            src={logo}
            alt="Rivo Plus"
            className="mx-auto mb-8 h-28 w-28 rounded-full border-2 border-primary/40 object-cover animate-float"
          />
          <h1 className="mb-4 text-4xl font-black leading-tight text-foreground md:text-6xl">
            {t.hero.title} <span className="text-gradient">{t.hero.titleHighlight}</span>
          </h1>
          <p className="mx-auto mb-8 max-w-lg text-lg text-muted-foreground">{t.hero.subtitle}</p>
          <a
            href="#products"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-3 font-bold text-primary-foreground transition-all hover:opacity-90 glow-blue"
          >
            <Play className="h-5 w-5" />
            {t.hero.cta}
          </a>
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
            <a
              href="https://wa.me/message/WT2U3TVLWAPAL1"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 rounded-lg bg-[#25D366] px-8 py-4 font-bold text-white transition-all hover:opacity-90"
            >
              <MessageCircle className="h-5 w-5" />
              {t.contact.whatsapp}
            </a>
            <a
              href="https://t.me/rivoplus"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 rounded-lg bg-[#229ED9] px-8 py-4 font-bold text-white transition-all hover:opacity-90"
            >
              <Send className="h-5 w-5" />
              {t.contact.telegram}
            </a>
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
