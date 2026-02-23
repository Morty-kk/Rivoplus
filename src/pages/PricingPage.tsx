import { Link } from "react-router-dom";
import RivoLogo from "@/components/RivoLogo";
import { type Language } from "./index-content";

const pricingCopy: Record<Language, { title: string; subtitle: string; plans: { name: string; price: string; details: string }[] }> = {
  ar: {
    title: "الأسعار",
    subtitle: "باقات مرنة تناسب احتياجك",
    plans: [
      { name: "أساسي", price: "$9", details: "للاستخدام الشخصي" },
      { name: "احترافي", price: "$19", details: "مزايا أكثر وجودة أعلى" },
      { name: "مؤسسي", price: "$49", details: "للفرق والشركات" },
    ],
  },
  en: {
    title: "Pricing",
    subtitle: "Flexible plans for your needs",
    plans: [
      { name: "Basic", price: "$9", details: "For personal use" },
      { name: "Pro", price: "$19", details: "More features and higher quality" },
      { name: "Business", price: "$49", details: "For teams and companies" },
    ],
  },
  de: {
    title: "Preise",
    subtitle: "Flexible Pakete für deinen Bedarf",
    plans: [
      { name: "Basic", price: "$9", details: "Für private Nutzung" },
      { name: "Pro", price: "$19", details: "Mehr Funktionen und höhere Qualität" },
      { name: "Business", price: "$49", details: "Für Teams und Unternehmen" },
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
