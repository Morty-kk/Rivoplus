import { Link } from "react-router-dom";
import RivoLogo from "@/components/RivoLogo";
import { type Language } from "./index-content";

const pricingCopy: Record<Language, { title: string; subtitle: string; plans: { name: string; price: string; details: string }[] }> = {
  ar: {
    title: "الأسعار",
    subtitle: "باقات مرنة تناسب احتياجك",
    plans: [
      { name: "فضي", price: "$9", details: "1 شهر" },
      { name: "ذهبي", price: "$19", details: "3 اشهر" },
      { name: "دايموند", price: "$49", details: "12 اشهر" },
      { name: "دايموند", price: "$49", details: "12 اشهر" },
    ],
  },
  en: {
    title: "Pricing",
    subtitle: "Flexible plans for your needs",
    plans: [
      { name: "silver", price: "$9", details: "1 Month" },
      { name: "Gold", price: "$19", details: "3 Month" },
      { name: "Diamond", price: "$49", details: "12 Month" },
    ],
  },
  de: {
    title: "Preise",
    subtitle: "Flexible Pakete für deinen Bedarf",
    plans: [
      { name: "Silber", price: "$9", details: "1 Monat" },
      { name: "Gold", price: "$19", details: "3 Monaten" },
      { name: "Diamant", price: "$49", details: "12 Monaten" },
    ],
  },
};

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

const PricingPage = () => {
  const language = getLanguage();
  const t = pricingCopy[language];

  return (
    <main className="min-h-screen bg-background px-6 py-16 font-cairo" dir={language === "ar" ? "rtl" : "ltr"}>
      <div className="container mx-auto max-w-5xl">
        <div className="mb-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <RivoLogo className="h-12 w-[132px]" />
            <h1 className="text-3xl font-black text-foreground">{t.title}</h1>
          </div>
          <Link to="/" className="rounded-lg border border-border px-4 py-2 text-sm text-foreground">
            Home
          </Link>
        </div>

        <p className="mb-8 text-muted-foreground">{t.subtitle}</p>

        <div className="grid gap-4 sm:grid-cols-3">
          {t.plans.map((plan) => (
            <article key={plan.name} className="rounded-xl border border-border bg-card p-5 text-center">
              <h2 className="mb-2 text-lg font-bold text-foreground">{plan.name}</h2>
              <p className="mb-2 text-2xl font-black text-primary">{plan.price}</p>
              <p className="text-sm text-muted-foreground">{plan.details}</p>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
};

export default PricingPage;
