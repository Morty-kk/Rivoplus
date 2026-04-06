import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Moon, Sun, Menu, X } from "lucide-react";
import RivoLogo from "@/components/RivoLogo";
import { copy, type Language } from "../pages/index-content";

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

export default function Navigation() {
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
    <>
      {/* NAVBAR */}
      <nav className="fixed top-0 z-50 w-full border-b border-border/70 bg-background/70 backdrop-blur-xl">
        <div className="container mx-auto flex items-center justify-between gap-2 px-3 py-2 md:gap-3 md:px-6 md:py-5">
          <Link to="/" aria-label="Home" className="inline-flex items-center">
            <RivoLogo className="h-7 w-[90px] md:h-16 md:w-[210px]" />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex flex-wrap items-center gap-4 text-base font-medium text-muted-foreground">
            <Link to="/products" className="nav-link-fx px-1 py-1 text-muted-foreground">
              {t.nav?.products ?? "Products"}
            </Link>
            <a href="/#products" className="nav-link-fx px-1 py-1 text-muted-foreground">
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
              href="/#products"
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
    </>
  );
}