import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo_blue_B.png";
import { copy, products, type Language } from "./index-content";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const getLanguage = (): Language => {
  if (typeof window === "undefined") {
    return "ar";
  }

  const savedLanguage = window.localStorage.getItem("language");
  if (savedLanguage === "ar" || savedLanguage === "en" || savedLanguage === "de") {
    return savedLanguage;
  }

  return "ar";
};

const ProductsPage = () => {
  const [language, setLanguage] = useState<Language>(getLanguage);
  const t = copy[language];

  useEffect(() => {
    window.localStorage.setItem("language", language);
  }, [language]);

  return (
    <main className="min-h-screen bg-background px-6 py-16 font-cairo" dir={t.dir}>
      <LanguageSwitcher
        language={language}
        onChange={setLanguage}
        ariaLabel={t.language.switchAria}
      />

      <div className="container mx-auto max-w-5xl">
        <div className="mb-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={logo}
              alt="Rivo Plus"
              className="h-12 w-12 rounded-full border border-border/70 object-cover"
            />
            <h1 className="text-3xl font-black text-foreground">{t.products.title}</h1>
          </div>
          <Link to="/" className="rounded-lg border border-border px-4 py-2 text-sm text-foreground">
            Home
          </Link>
        </div>

        <p className="mb-8 text-muted-foreground">{t.products.subtitle}</p>

        <div className="grid gap-4 sm:grid-cols-2">
          {products.map((product) => (
            <article key={product.title.en} className="rounded-xl border border-border bg-card p-5">
              <h2 className="mb-2 text-lg font-bold text-foreground">{product.title[language]}</h2>
              <p className="text-sm text-muted-foreground">{product.description[language]}</p>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
};

export default ProductsPage;
