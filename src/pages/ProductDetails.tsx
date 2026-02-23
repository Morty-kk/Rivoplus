import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, MessageCircle, Send } from "lucide-react";
import RivoLogo from "@/components/RivoLogo";
import { copy, products, type Language } from "./index-content";

const getSavedLanguage = (): Language => {
  if (typeof window === "undefined") return "ar";
  const saved = localStorage.getItem("language");
  return saved === "ar" || saved === "en" || saved === "de" ? saved : "ar";
};

export default function ProductDetails() {
  const { slug } = useParams();
  const language = getSavedLanguage();
  const t = copy[language];
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    return (
      <div dir={t.dir} className="min-h-screen bg-background text-foreground">
        <div className="container mx-auto px-6 py-8">
          <RivoLogo className="h-10 w-[130px] md:h-14 md:w-[180px]" />
          <div className="mt-10 glass rounded-2xl p-6">
            <p className="mb-4 text-lg font-bold">
              {language === "ar"
                ? "المنتج غير موجود"
                : language === "de"
                ? "Produkt nicht gefunden"
                : "Product not found"}
            </p>
            <Link to="/" className="btn-primary">
              {language === "ar"
                ? "العودة للرئيسية"
                : language === "de"
                ? "Zurück zur Startseite"
                : "Back to home"}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const ArrowIcon = t.dir === "rtl" ? ArrowRight : ArrowLeft;

  return (
    <div dir={t.dir} className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-6 py-8">
        <div className="mb-6 flex items-center justify-between">
          <RivoLogo className="h-10 w-[130px] md:h-14 md:w-[180px]" />
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-background/80 px-4 py-2 text-sm font-semibold hover:bg-muted"
          >
            <ArrowIcon className="h-4 w-4" />
            {language === "ar" ? "العودة" : language === "de" ? "Zurück" : "Back"}
          </Link>
        </div>

        <div className="glass rounded-2xl p-6 md:p-8">
          <div className="mb-6 flex items-start gap-4">
            <div className="product-card-icon-wrap">
              <product.icon className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-black md:text-4xl">{product.title[language]}</h1>
              <p className="mt-2 text-muted-foreground">{product.description[language]}</p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-border bg-background/60 p-4">
              <h2 className="mb-2 font-bold">
                {language === "ar" ? "المميزات" : "Features"}
              </h2>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• {language === "ar" ? "تفعيل سريع" : language === "de" ? "Schnelle Aktivierung" : "Quick activation"}</li>
                <li>• {language === "ar" ? "دعم فني مباشر" : language === "de" ? "Direkter Support" : "Direct support"}</li>
                <li>• {language === "ar" ? "جودة عالية" : language === "de" ? "Hohe Qualität" : "High quality"}</li>
                <li>• {language === "ar" ? "سهل الاستخدام" : language === "de" ? "Einfach zu nutzen" : "Easy to use"}</li>
              </ul>
            </div>

            <div className="rounded-xl border border-border bg-background/60 p-4">
              <h2 className="mb-2 font-bold">
                {language === "ar" ? "اطلب الآن" : language === "de" ? "Jetzt anfragen" : "Order now"}
              </h2>
              <p className="mb-4 text-sm text-muted-foreground">
                {language === "ar"
                  ? "تواصل معنا مباشرة لطلب هذا المنتج"
                  : language === "de"
                  ? "Kontaktiere uns direkt für dieses Produkt"
                  : "Contact us directly for this product"}
              </p>

              <div className="flex flex-wrap gap-2">
                <a
                  href="https://wa.me/491234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary inline-flex items-center gap-2"
                >
                  <MessageCircle className="h-4 w-4" />
                  {t.contact.whatsapp}
                </a>

                <a
                  href="https://t.me/dein_telegram_name"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-2.5 font-bold hover:bg-muted"
                >
                  <Send className="h-4 w-4" />
                  {t.contact.telegram}
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center text-sm text-muted-foreground">{t.footer}</div>
      </div>
    </div>
  );
}
