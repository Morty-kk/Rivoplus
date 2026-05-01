import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, ShoppingCart, X } from "lucide-react";
import RivoLogo from "@/components/RivoLogo";
import LanguageSelector from "@/components/LanguageSelector";
import { useCart } from "@/lib/cart";
import { copy, type Language } from "../pages/index-content";

const getInitialLanguage = (): Language => {
  if (typeof window === "undefined") return "ar";
  const savedLanguage = window.localStorage.getItem("language");
  if (savedLanguage === "ar" || savedLanguage === "en" || savedLanguage === "de") return savedLanguage;
  return "ar";
};

export default function Navigation() {
  const [language, setLanguage] = useState<Language>(getInitialLanguage);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { itemCount } = useCart();
  const t = copy[language] ?? copy.ar;

  useEffect(() => {
    document.documentElement.classList.add("dark");
    window.localStorage.setItem("theme", "dark");
  }, []);

  useEffect(() => {
    window.localStorage.setItem("language", language);
    window.dispatchEvent(new CustomEvent("rivo-language-change", { detail: language }));
    setMobileMenuOpen(false);
  }, [language]);

  return (
    <>
      <nav className="fixed top-0 z-50 w-full border-b border-border/70 bg-background/70 backdrop-blur-xl">
        <div className="container mx-auto flex items-center justify-between gap-2 px-3 py-2 md:gap-3 md:px-6 md:py-5">
          <Link to="/" aria-label="Home" className="inline-flex items-center">
            <RivoLogo className="h-7 w-[90px] md:h-16 md:w-[210px]" />
          </Link>

          <div className="hidden items-center gap-4 text-base font-medium text-muted-foreground md:flex">
            <Link to="/#products" className="nav-link-fx px-1 py-1 text-muted-foreground">
              {t.nav?.products ?? "Products"}
            </Link>
            <a href="/#faq" className="nav-link-fx px-1 py-1 text-muted-foreground">
              {t.nav?.faq ?? "FAQ"}
            </a>
            <a href="/#contact" className="nav-link-fx px-1 py-1 text-muted-foreground">
              {t.nav?.contact ?? "Contact"}
            </a>

            <Link
              to="/#cart"
              className="interactive-surface relative inline-flex items-center gap-2 rounded-lg border border-border bg-background/80 px-4 py-2.5 text-base font-medium text-foreground transition-all hover:bg-muted"
              aria-label="Cart"
            >
              <ShoppingCart className="h-4 w-4" />
              Cart
              {itemCount > 0 ? (
                <span className="absolute -right-2 -top-2 grid h-5 min-w-5 place-items-center rounded-full bg-primary px-1 text-xs font-black text-primary-foreground">
                  {itemCount}
                </span>
              ) : null}
            </Link>

            <LanguageSelector
              value={language}
              onChange={setLanguage}
              ariaLabel={t.language?.switchAria ?? "Switch language"}
            />
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <Link
              to="/#cart"
              className="relative inline-flex h-8 w-8 items-center justify-center rounded-md border border-border bg-background/80 text-foreground hover:bg-muted"
              aria-label="Cart"
            >
              <ShoppingCart className="h-3.5 w-3.5" />
              {itemCount > 0 ? (
                <span className="absolute -right-1.5 -top-1.5 grid h-4 min-w-4 place-items-center rounded-full bg-primary px-1 text-[10px] font-black text-primary-foreground">
                  {itemCount}
                </span>
              ) : null}
            </Link>

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

        {mobileMenuOpen ? (
          <button
            type="button"
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[2px] md:hidden"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close menu backdrop"
          />
        ) : null}

        <div
          className={`fixed top-0 z-50 h-screen w-[82%] max-w-[320px] bg-background/95 p-4 shadow-2xl backdrop-blur-xl transition-transform duration-300 md:hidden ${
            t.dir === "rtl" ? "left-0 border-r border-border" : "right-0 border-l border-border"
          } ${mobileMenuOpen ? "translate-x-0" : t.dir === "rtl" ? "-translate-x-full" : "translate-x-full"}`}
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
              to="/#products"
              onClick={() => setMobileMenuOpen(false)}
              className="block rounded-lg px-3 py-2 text-sm font-medium text-foreground hover:bg-muted"
            >
              {t.nav?.products ?? "Products"}
            </Link>
            <Link
              to="/#cart"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium text-foreground hover:bg-muted"
            >
              <span>Cart</span>
              {itemCount > 0 ? (
                <span className="rounded-full bg-primary px-2 py-0.5 text-xs font-black text-primary-foreground">
                  {itemCount}
                </span>
              ) : null}
            </Link>
            <a href="/#faq" onClick={() => setMobileMenuOpen(false)} className="block rounded-lg px-3 py-2 text-sm font-medium text-foreground hover:bg-muted">
              {t.nav?.faq ?? "FAQ"}
            </a>
            <a href="/#contact" onClick={() => setMobileMenuOpen(false)} className="block rounded-lg px-3 py-2 text-sm font-medium text-foreground hover:bg-muted">
              {t.nav?.contact ?? "Contact"}
            </a>
          </div>

          <div className="my-4 h-px bg-border/70" />

          <div>
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
    </>
  );
}
