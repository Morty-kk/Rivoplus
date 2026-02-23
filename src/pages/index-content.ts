import { Cloud, Gamepad2, Music, ShieldCheck, Tv } from "lucide-react";

export type Language = "ar" | "en" | "de";

export type Product = {
  icon: typeof Tv;
  title: Record<Language, string>;
  description: Record<Language, string>;
  badge: Record<Language, string> | null;
  featured: boolean;
};

export const products: Product[] = [
  {
    icon: Tv,
    title: {
      ar: "ريفو بلس ستريم",
      en: "Rivo Plus Stream",
      de: "Rivo Plus Stream",
    },
    description: {
      ar: "بث مباشر لأفضل المسلسلات والأفلام بجودة 4K مع محتوى حصري",
      en: "Stream top series and movies in 4K with exclusive content.",
      de: "Streame Top-Serien und Filme in 4K mit exklusiven Inhalten.",
    },
    badge: {
      ar: "الأكثر مبيعاً",
      en: "Best Seller",
      de: "Bestseller",
    },
    featured: true,
  },
  {
    icon: Music,
    title: {
      ar: "ريفو ميوزك",
      en: "Rivo Music",
      de: "Rivo Musik",
    },
    description: {
      ar: "ملايين الأغاني والبودكاست بجودة عالية بدون إعلانات",
      en: "Millions of songs and podcasts in high quality with no ads.",
      de: "Millionen Songs und Podcasts in hoher Qualität ohne Werbung.",
    },
    badge: null,
    featured: false,
  },
  {
    icon: Gamepad2,
    title: {
      ar: "ريفو قيمز",
      en: "Rivo Games",
      de: "Rivo Games",
    },
    description: {
      ar: "مكتبة ضخمة من الألعاب السحابية على جميع الأجهزة",
      en: "A huge cloud gaming library available on all your devices.",
      de: "Eine große Cloud-Gaming-Bibliothek auf all deinen Geräten.",
    },
    badge: {
      ar: "جديد",
      en: "New",
      de: "Neu",
    },
    featured: false,
  },
  {
    icon: Cloud,
    title: {
      ar: "ريفو كلاود",
      en: "Rivo Cloud",
      de: "Rivo Cloud",
    },
    description: {
      ar: "تخزين سحابي آمن مع مساحة غير محدودة ومشاركة سهلة",
      en: "Secure cloud storage with unlimited space and easy sharing.",
      de: "Sicherer Cloud-Speicher mit unbegrenztem Platz und einfachem Teilen.",
    },
    badge: null,
    featured: false,
  },
  {
    icon: ShieldCheck,
    title: {
      ar: "ريفو VPN",
      en: "Rivo VPN",
      de: "Rivo VPN",
    },
    description: {
      ar: "تصفح آمن وسريع مع حماية خصوصيتك على الإنترنت",
      en: "Browse safely and fast while protecting your online privacy.",
      de: "Sicher und schnell surfen mit Schutz deiner Online-Privatsphäre.",
    },
    badge: null,
    featured: false,
  },
];

export const copy = {
  ar: {
    dir: "rtl" as const,
    nav: {
      products: "المنتجات",
      pricing: "الأسعار",
      support: "الدعم",
      contact: "تواصل معنا",
    },
    hero: {
      title: "كل ما تحتاجه في",
      titleHighlight: "مكان واحد",
      subtitle: "بث، موسيقى، ألعاب، وأكثر — اكتشف منتجاتنا الرقمية المصممة لك",
      cta: "استكشف الآن",
    },
    products: {
      title: "منتجاتنا",
      subtitle: "اختر ما يناسبك من خدماتنا الرقمية المتنوعة",
    },
    contact: {
      title: "تواصل معنا",
      subtitle: "نحن هنا لمساعدتك — تواصل معنا عبر قنواتنا المفضلة",
      whatsapp: "واتساب",
      telegram: "تيليجرام",
    },
    footer: "© 2026 ريفو بلس — جميع الحقوق محفوظة",
    theme: {
      switchAria: "تبديل المظهر",
      light: "فاتح",
      dark: "داكن",
    },
    language: {
      ar: "العربية",
      en: "English",
      de: "Deutsch",
      switchAria: "تبديل اللغة",
    },
  },
  en: {
    dir: "ltr" as const,
    nav: {
      products: "Products",
      pricing: "Pricing",
      support: "Support",
      contact: "Contact",
    },
    hero: {
      title: "Everything you need in",
      titleHighlight: "one place",
      subtitle: "Streaming, music, games, and more — discover our digital products.",
      cta: "Explore now",
    },
    products: {
      title: "Our Products",
      subtitle: "Choose what fits you from our diverse digital services",
    },
    contact: {
      title: "Contact Us",
      subtitle: "We are here to help — reach us on your favorite channel",
      whatsapp: "WhatsApp",
      telegram: "Telegram",
    },
    footer: "© 2026 Rivo Plus — All rights reserved",
    theme: {
      switchAria: "Toggle theme",
      light: "Light",
      dark: "Dark",
    },
    language: {
      ar: "العربية",
      en: "English",
      de: "Deutsch",
      switchAria: "Switch language",
    },
  },
  de: {
    dir: "ltr" as const,
    nav: {
      products: "Produkte",
      pricing: "Preise",
      support: "Support",
      contact: "Kontakt",
    },
    hero: {
      title: "Alles, was du brauchst, an",
      titleHighlight: "einem Ort",
      subtitle: "Streaming, Musik, Games und mehr — entdecke unsere digitalen Produkte.",
      cta: "Jetzt entdecken",
    },
    products: {
      title: "Unsere Produkte",
      subtitle: "Wähle aus unseren vielfältigen digitalen Services",
    },
    contact: {
      title: "Kontakt",
      subtitle: "Wir helfen dir gerne — kontaktiere uns über deinen Lieblingskanal",
      whatsapp: "WhatsApp",
      telegram: "Telegram",
    },
    footer: "© 2026 Rivo Plus — Alle Rechte vorbehalten",
    theme: {
      switchAria: "Design wechseln",
      light: "Hell",
      dark: "Dunkel",
    },
    language: {
      ar: "العربية",
      en: "English",
      de: "Deutsch",
      switchAria: "Sprache wechseln",
    },
  },
};
