import * as React from "react";
import Navigation from "@/components/Navigation";
import CartSection from "@/components/CartSection";
import { copy, type Language } from "./index-content";

const getLanguage = (): Language => {
  if (typeof window === "undefined") return "ar";
  const savedLanguage = window.localStorage.getItem("language");
  return savedLanguage === "ar" || savedLanguage === "en" || savedLanguage === "de" ? savedLanguage : "ar";
};

export default function CartPage() {
  const [language, setLanguage] = React.useState<Language>(getLanguage);
  const t = copy[language] ?? copy.ar;

  React.useEffect(() => {
    const handleLanguageChange = (event: Event) => {
      const nextLanguage = (event as CustomEvent<Language>).detail;
      if (nextLanguage === "ar" || nextLanguage === "en" || nextLanguage === "de") {
        setLanguage(nextLanguage);
      }
    };

    window.addEventListener("rivo-language-change", handleLanguageChange);
    return () => window.removeEventListener("rivo-language-change", handleLanguageChange);
  }, []);

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-background pt-16 font-cairo text-foreground" dir={t.dir}>
        <CartSection language={language} browseHref="/#products" />
      </main>
    </>
  );
}
