import { Gamepad2, Music, Tv } from "lucide-react";

export type Language = "ar" | "en" | "de";

export type Product = {
  slug: string;
  icon: typeof Tv;
  title: Record<Language, string>;
  description: Record<Language, string>;
  badge: Record<Language, string> | null;
  featured: boolean;
};

export const products: Product[] = [
  {
    slug: "stream",
    icon: Tv,
    title: {
      ar: "ريفو بلس ستريم",
      en: "Rivo Plus Stream",
      de: "Rivo Plus Stream",
    },
    description: {
      ar: "بث مباشر لأفضل المسلسلات والأفلام بجودة 4K",
      en: "Stream top series and movies in 4K with exclusive content.",
      de: "Streame Top-Serien und Filme in 4K mit exklusiven Inhalten.",
    },
    badge: { ar: "الأكثر مبيعاً", en: "Best Seller", de: "Bestseller" },
    featured: true,
  },
  {
    slug: "music",
    icon: Music,
    title: { ar: "ريفو ميوزك", en: "Rivo Music", de: "Rivo Musik" },
    description: {
      ar: "ملايين الأغاني والبودكاست بجودة عالية بدون إعلانات",
      en: "Millions of songs and podcasts in high quality with no ads.",
      de: "Millionen Songs und Podcasts in hoher Qualität ohne Werbung.",
    },
    badge: null,
    featured: false,
  },
  {
    slug: "games",
    icon: Gamepad2,
    title: { ar: "ريفو قيمز", en: "Rivo Games", de: "Rivo Games" },
    description: {
      ar: "مكتبة ضخمة من الألعاب السحابية على جميع الأجهزة",
      en: "A huge cloud gaming library available on all your devices.",
      de: "Eine große Cloud-Gaming-Bibliothek auf all deinen Geräten.",
    },
    badge: { ar: "جديد", en: "New", de: "Neu" },
    featured: false,
  },
];

export const copy = {
  ar: {
    dir: "rtl" as const,
    nav: {
      products: "المنتجات",
      faq: "الأسئلة الشائعة",
      contact: "تواصل معنا",
    },
    hero: {
      title: "كل ما تحتاجه في",
      titleHighlight: "مكان واحد",
      subtitle: "بث، موسيقى، ألعاب، وأكثر — اكتشف منتجاتنا الرقمية المصممة لك",
      cta: "استكشف الآن",
      plans: "الخطط",
    },
    products: {
      title: "منتجاتنا",
      subtitle: "اختر ما يناسبك من خدماتنا الرقمية المتنوعة",
      viewDetails: "عرض التفاصيل",
    },
    pricing: {
      title: "الخطط",
      subtitle: "باقات مرنة تناسب احتياجاتك",
      choose: "اختر الخطة",
    },
    faq: {
      title: "الأسئلة الشائعة",
      subtitle: "أهم الأسئلة التي يطرحها العملاء",
      items: [
        {
          q: "كيف يتم التفعيل؟",
          a: "يتم التفعيل مباشرة بعد تأكيد الطلب، وستصلك معلومات الاستخدام على واتساب أو تيليجرام.",
        },
        {
          q: "هل الخدمة تعمل على جميع الأجهزة؟",
          a: "نعم، تعمل على الهواتف، التلفاز الذكي، أجهزة Android TV، والكمبيوتر حسب نوع المنتج.",
        },
        {
          q: "هل يوجد دعم فني؟",
          a: "نعم، يتوفر دعم سريع لمساعدتك في التفعيل أو أي مشكلة تقنية.",
        },
        {
          q: "هل يمكنني تغيير الخطة لاحقاً؟",
          a: "نعم، يمكنك الترقية أو تغيير الخطة حسب احتياجك.",
        },
      ],
    },
    contact: {
      title: "تواصل معنا",
      subtitle: "نحن هنا لمساعدتك — تواصل معنا عبر قنواتنا المفضلة",
      whatsapp: "واتساب",
      telegram: "تيليجرام",
    },
    footer: "© 2026 ريفو بلس — جميع الحقوق محفوظة",
    theme: { switchAria: "تبديل المظهر", light: "فاتح", dark: "داكن" },
    language: { ar: "العربية", en: "English", de: "Deutsch", switchAria: "تبديل اللغة" },
  },

  en: {
    dir: "ltr" as const,
    nav: {
      products: "Products",
      faq: "FAQ",
      contact: "Contact",
    },
    hero: {
      title: "Everything you need in",
      titleHighlight: "one place",
      subtitle: "Streaming, music, games, and more — discover our digital products.",
      cta: "Explore now",
      plans: "Plans",
    },
    products: {
      title: "Our Products",
      subtitle: "Choose what fits you from our diverse digital services",
      viewDetails: "View details",
    },
    pricing: {
      title: "Plans",
      subtitle: "Flexible plans for your needs",
      choose: "Choose plan",
    },
    faq: {
      title: "FAQ",
      subtitle: "Common questions from customers",
      items: [
        {
          q: "How does activation work?",
          a: "Activation is usually instant after confirmation, and we send details via WhatsApp or Telegram.",
        },
        {
          q: "Does it work on all devices?",
          a: "Yes, depending on the product, it supports phones, smart TVs, Android TV devices, and desktop.",
        },
        {
          q: "Do you provide support?",
          a: "Yes, fast support is available for activation and technical help.",
        },
        {
          q: "Can I change the plan later?",
          a: "Yes, you can upgrade or change your plan based on your needs.",
        },
      ],
    },
    contact: {
      title: "Contact Us",
      subtitle: "We are here to help — reach us on your favorite channel",
      whatsapp: "WhatsApp",
      telegram: "Telegram",
    },
    footer: "© 2026 Rivo Plus — All rights reserved",
    theme: { switchAria: "Toggle theme", light: "Light", dark: "Dark" },
    language: { ar: "العربية", en: "English", de: "Deutsch", switchAria: "Switch language" },
  },

  de: {
    dir: "ltr" as const,
    nav: {
      products: "Produkte",
      faq: "FAQ",
      contact: "Kontakt",
    },
    hero: {
      title: "Alles, was du brauchst, an",
      titleHighlight: "einem Ort",
      subtitle: "Streaming, Musik, Games und mehr — entdecke unsere digitalen Produkte.",
      cta: "Jetzt entdecken",
      plans: "Pakete",
    },
    products: {
      title: "Unsere Produkte",
      subtitle: "Wähle aus unseren vielfältigen digitalen Services",
      viewDetails: "Details ansehen",
    },
    pricing: {
      title: "Pakete",
      subtitle: "Flexible Pakete für deine Bedürfnisse",
      choose: "Plan wählen",
    },
    faq: {
      title: "FAQ",
      subtitle: "Häufige Fragen unserer Kunden",
      items: [
        {
          q: "Wie funktioniert die Aktivierung?",
          a: "Die Aktivierung erfolgt in der Regel sofort nach Bestätigung. Die Daten senden wir per WhatsApp oder Telegram.",
        },
        {
          q: "Funktioniert es auf allen Geräten?",
          a: "Ja, je nach Produkt auf Smartphone, Smart TV, Android TV-Geräten und Computer.",
        },
        {
          q: "Gibt es Support?",
          a: "Ja, wir bieten schnellen Support für Aktivierung und technische Fragen.",
        },
        {
          q: "Kann ich später den Tarif wechseln?",
          a: "Ja, du kannst deinen Tarif später upgraden oder ändern.",
        },
      ],
    },
    contact: {
      title: "Kontakt",
      subtitle: "Wir helfen dir gerne — kontaktiere uns über deinen Lieblingskanal",
      whatsapp: "WhatsApp",
      telegram: "Telegram",
    },
    footer: "© 2026 Rivo Plus — Alle Rechte vorbehalten",
    theme: { switchAria: "Design wechseln", light: "Hell", dark: "Dunkel" },
    language: { ar: "العربية", en: "English", de: "Deutsch", switchAria: "Sprache wechseln" },
  },
};
