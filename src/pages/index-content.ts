import { Bot, BrainCircuit, Clapperboard, Music, Palette, Sparkles, Tv } from "lucide-react";
import type { LucideIcon } from "lucide-react";

// image assets imported from src so we can keep the files where you added them
import musicPic from "../assets/music_pic.png";
import musicPicAr from "../assets/music_pic_ar.png";
import tvPic from "../assets/tv_pic.png";
import tvPicAr from "../assets/tv_pic_ar.png";
import tfs from "../assets/247_pic.png";
import adobePic from "../assets/adobe_pic.png";
import adobePicAr from "../assets/adobe_pic_ar.png";
import canvaPic from "../assets/canva_pic.png";
import canvaPicAr from "../assets/canva_pic_ar.png";
import ytPic from "../assets/yt_pic.png";
import ytPicAr from "../assets/yt_pic_ar.png";
import crunchyrollService from "../assets/crunchyroll_service.svg";
import chatgptService from "../assets/chatgpt_service.svg";
import geminiService from "../assets/gemini_service.svg";

export type Language = "ar" | "en" | "de";

export type ProductOffer = {
  label: Record<Language, string>;
  discountPercent: number;
  endsAtISO: string; // yyyy-mm-dd
};

export type Product = {
  slug: string;
  category: "streaming" | "creative" | "services";
  icon: LucideIcon;
  title: Record<Language, string>;
  description: Record<Language, string>;
  longDescription: Record<Language, string>;
  highlights: Record<Language, string[]>;
  /** Primary/default image used for all languages except Arabic (when arabicImage exists) */
  heroImage: string;
  /** Optional Arabic-specific image variant. Falls back to heroImage if not provided. */
  heroImageAr?: string;
  /** Optional showcase grid image. Falls back to heroImage if not provided. */
  showcaseImage?: string;
  /** Optional Arabic-specific showcase image. Falls back to showcaseImage or heroImage. */
  showcaseImageAr?: string;
  /**
   * Tune hero image sizing on the product details page.
   * - mobileHeightPx is prioritized for phones.
   * - desktopHeightPx controls larger screens.
   */
  heroImageLayout?: {
    mobileHeightPx: number;
    desktopHeightPx: number;
    fit?: "cover" | "contain";
    position?: string;
  };
  gallery: string[];
  badge: Record<Language, string> | null;
  featured: boolean;
  offer: ProductOffer | null;
};

export const products: Product[] = [
  {
    slug: "stream",
    category: "streaming",
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
    longDescription: {
      ar: "ريفو بلس ستريم يقدم تجربة مشاهدة فاخرة: مكتبة مُحدّثة باستمرار، جودة عالية، وسهولة استخدام على الهاتف والتلفاز الذكي. مناسب للعائلة مع ملفات تعريف متعددة وتوصيات ذكية.",
      en: "Rivo Plus Stream delivers a premium viewing experience: a constantly updated library, high quality playback, and a smooth experience across mobile and smart TVs. Great for families with multiple profiles and smart recommendations.",
      de: "Rivo Plus Stream bietet ein Premium-Seherlebnis: laufend aktualisierte Bibliothek, hohe Qualität und eine reibungslose Nutzung auf Smartphone und Smart-TV. Ideal für Familien mit mehreren Profilen und smarten Empfehlungen.",
    },
    highlights: {
      ar: ["جودة 4K", "ملفات تعريف متعددة", "توصيات ذكية", "تفعيل سريع"],
      en: ["4K quality", "Multiple profiles", "Smart recommendations", "Fast activation"],
      de: ["4K-Qualität", "Mehrere Profile", "Smarte Empfehlungen", "Schnelle Aktivierung"],
    },
    // use the imported tvPic instead of the old logo file
    heroImage: tvPic,
    heroImageAr: tvPicAr,
    showcaseImage: tvPic,
    showcaseImageAr: tvPicAr,
    heroImageLayout: {
      mobileHeightPx: 340,
      desktopHeightPx: 500,
      fit: "contain",
      position: "center",
    },
    gallery: [tvPic, tfs],
    badge: null,
    featured: true,
    offer: null,
  },
  {
    slug: "music",
    category: "streaming",
    icon: Music,
    title: { ar: "ريفو ميوزك", en: "Rivo Music", de: "Rivo Musik" },
    description: {
      ar: "YouTube Premium — موسيقى بجودة عالية بدون إعلانات",
      en: "YouTube Premium — music in high quality with no ads.",
      de: "YouTube Premium — Musik in hoher Qualität ohne Werbung.",
    },
    longDescription: {
      ar: "استمع بلا حدود: تشغيل بدون إعلانات، قوائم تشغيل ذكية، وتنزيل للاستماع دون إنترنت.",
      en: "Listen without limits: ad‑free playback, smart playlists, and offline downloads.",
      de: "Hören ohne Limits: werbefreie Wiedergabe, smarte Playlists und Offline-Downloads.",
    },
    highlights: {
      ar: ["بدون إعلانات", "تنزيل دون إنترنت", "قوائم تشغيل", "جودة عالية"],
      en: ["No ads", "Offline downloads", "Playlists", "High quality"],
      de: ["Ohne Werbung", "Offline-Downloads", "Playlists", "Hohe Qualität"],
    },
    heroImage: ytPic,
    heroImageAr: ytPicAr,
    showcaseImage: ytPic,
    showcaseImageAr: ytPicAr,
    gallery: [ytPic, tfs],
    badge: null,
    featured: false,
    offer: null,
  },
  {
    slug: "crunchyroll",
    category: "streaming",
    icon: Clapperboard,
    title: { ar: "كرانشي رول", en: "Crunchyroll", de: "Crunchyroll" },
    description: {
      ar: "أنمي ومسلسلات يابانية بجودة عالية وبدون تعقيد.",
      en: "Anime and Japanese series in high quality with fast activation.",
      de: "Anime und japanische Serien in hoher Qualität mit schneller Aktivierung.",
    },
    longDescription: {
      ar: "اشتراك Crunchyroll مناسب لمحبي الأنمي: مشاهدة سلسة، مكتبة كبيرة، وتفعيل سريع بعد الطلب. أضفه إلى السلة وسنرسل لك تفاصيل التفعيل.",
      en: "Crunchyroll is built for anime fans: smooth streaming, a large catalog, and quick activation after ordering. Add it to cart and we will send activation details.",
      de: "Crunchyroll ist ideal für Anime-Fans: flüssiges Streaming, große Bibliothek und schnelle Aktivierung nach der Bestellung. In den Warenkorb legen und wir senden die Aktivierungsdaten.",
    },
    highlights: {
      ar: ["أنمي بجودة عالية", "مكتبة كبيرة", "تفعيل سريع", "مناسب للهاتف والتلفاز"],
      en: ["High quality anime", "Large catalog", "Fast activation", "Mobile and TV ready"],
      de: ["Anime in hoher Qualität", "Große Bibliothek", "Schnelle Aktivierung", "Für Handy und TV"],
    },
    heroImage: crunchyrollService,
    showcaseImage: crunchyrollService,
    gallery: [crunchyrollService, tfs],
    badge: { ar: "أنمي", en: "Anime", de: "Anime" },
    featured: false,
    offer: null,
  },
  {
    slug: "adobe",
    category: "creative",
    icon: Palette,
    title: { ar: "Adobe Creative Cloud", en: "Adobe Creative Cloud", de: "Adobe Creative Cloud" },
    description: {
      ar: "Adobe Creative Cloud — أدوات احترافية للتصميم والمونتاج.",
      en: "Adobe Creative Cloud — professional design, photo, and video tools.",
      de: "Adobe Creative Cloud — professionelle Tools für Design, Foto und Video.",
    },
    longDescription: {
      ar: "اشتراك Adobe Creative Cloud مناسب للمصممين وصناع المحتوى: Photoshop وIllustrator وPremiere Pro والمزيد مع تفعيل سريع بعد الطلب.",
      en: "Adobe Creative Cloud is ideal for designers and creators: Photoshop, Illustrator, Premiere Pro, and more with quick activation after ordering.",
      de: "Adobe Creative Cloud ist ideal für Designer und Creator: Photoshop, Illustrator, Premiere Pro und mehr mit schneller Aktivierung nach der Bestellung.",
    },
    highlights: {
      ar: ["Photoshop", "Premiere Pro", "Illustrator", "تفعيل سريع"],
      en: ["Photoshop", "Premiere Pro", "Illustrator", "Fast activation"],
      de: ["Photoshop", "Premiere Pro", "Illustrator", "Schnelle Aktivierung"],
    },
    heroImage: adobePic,
    heroImageAr: adobePicAr,
    showcaseImage: adobePic,
    showcaseImageAr: adobePicAr,
    gallery: [adobePic, tfs],
    badge: null,
    featured: false,
    offer: null,
  },
  {
    slug: "canva",
    category: "creative",
    icon: Sparkles,
    title: { ar: "Canva Pro", en: "Canva Pro", de: "Canva Pro" },
    description: {
      ar: "Canva Pro — تصميم سريع وقوالب جاهزة للمحتوى اليومي.",
      en: "Canva Pro — quick design with ready templates for daily content.",
      de: "Canva Pro — schnelles Design mit fertigen Vorlagen für täglichen Content.",
    },
    longDescription: {
      ar: "Canva Pro مناسب للتصميم السريع: قوالب جاهزة، أدوات تحرير سهلة، وميزات احترافية للمنشورات والعروض والمحتوى التسويقي.",
      en: "Canva Pro is made for fast design: ready templates, simple editing tools, and pro features for posts, presentations, and marketing content.",
      de: "Canva Pro ist für schnelles Design gemacht: fertige Vorlagen, einfache Bearbeitung und Pro-Funktionen für Posts, Präsentationen und Marketing.",
    },
    highlights: {
      ar: ["قوالب جاهزة", "تصميم سريع", "محتوى سوشيال", "تفعيل سريع"],
      en: ["Ready templates", "Fast design", "Social content", "Fast activation"],
      de: ["Fertige Vorlagen", "Schnelles Design", "Social Content", "Schnelle Aktivierung"],
    },
    heroImage: canvaPic,
    heroImageAr: canvaPicAr,
    showcaseImage: canvaPic,
    showcaseImageAr: canvaPicAr,
    gallery: [canvaPic, tfs],
    badge: null,
    featured: false,
    offer: null,
  },
  {
    slug: "chatgpt",
    category: "services",
    icon: Bot,
    title: { ar: "ChatGPT", en: "ChatGPT", de: "ChatGPT" },
    description: {
      ar: "خدمة ذكاء اصطناعي للكتابة، الدراسة، البرمجة والعمل.",
      en: "AI service for writing, study, coding, and work.",
      de: "KI-Service für Schreiben, Lernen, Coding und Arbeit.",
    },
    longDescription: {
      ar: "ChatGPT يساعدك في الكتابة والترجمة والبرمجة وتنظيم الأفكار. أضفه إلى السلة وسنرسل لك خيارات الاشتراك والتفعيل.",
      en: "ChatGPT helps with writing, translation, coding, and planning. Add it to cart and we will send the available subscription and activation options.",
      de: "ChatGPT hilft beim Schreiben, Übersetzen, Programmieren und Planen. In den Warenkorb legen und wir senden dir die verfügbaren Abo- und Aktivierungsoptionen.",
    },
    highlights: {
      ar: ["كتابة وترجمة", "مساعدة برمجية", "للدراسة والعمل", "خيارات حسب الطلب"],
      en: ["Writing and translation", "Coding help", "Study and work", "Options on request"],
      de: ["Schreiben und Übersetzen", "Coding-Hilfe", "Lernen und Arbeit", "Optionen auf Anfrage"],
    },
    heroImage: chatgptService,
    showcaseImage: chatgptService,
    gallery: [chatgptService, tfs],
    badge: { ar: "AI", en: "AI", de: "AI" },
    featured: false,
    offer: null,
  },
  {
    slug: "gemini",
    category: "services",
    icon: BrainCircuit,
    title: { ar: "Gemini", en: "Gemini", de: "Gemini" },
    description: {
      ar: "خدمة AI من Google للأفكار، النصوص، البحث والإنتاجية.",
      en: "Google AI service for ideas, writing, research, and productivity.",
      de: "Google AI-Service für Ideen, Texte, Recherche und Produktivität.",
    },
    longDescription: {
      ar: "Gemini مناسب للبحث السريع وتوليد الأفكار وكتابة النصوص وتنظيم المهام. أضفه إلى السلة وسنرسل لك خيارات الاشتراك المتاحة.",
      en: "Gemini is useful for quick research, idea generation, writing, and task organization. Add it to cart and we will send the available subscription options.",
      de: "Gemini eignet sich für schnelle Recherche, Ideenfindung, Texte und Aufgabenorganisation. In den Warenkorb legen und wir senden dir die verfügbaren Abo-Optionen.",
    },
    highlights: {
      ar: ["بحث وأفكار", "كتابة نصوص", "إنتاجية", "خيارات حسب الطلب"],
      en: ["Research and ideas", "Text writing", "Productivity", "Options on request"],
      de: ["Recherche und Ideen", "Texte schreiben", "Produktivität", "Optionen auf Anfrage"],
    },
    heroImage: geminiService,
    showcaseImage: geminiService,
    gallery: [geminiService, tfs],
    badge: { ar: "AI", en: "AI", de: "AI" },
    featured: false,
    offer: null,
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
      subtitle: "بث، موسيقى، تصميم، وخدمات AI — اكتشف منتجاتنا الرقمية المصممة لك",
      cta: "استكشف الآن",
    },
    products: {
      title: "منتجاتنا",
      subtitle: "اختر ما يناسبك من خدماتنا الرقمية المتنوعة",
      viewDetails: "عرض التفاصيل",
      quickView: "عرض سريع",
      openDetails: "فتح صفحة التفاصيل",
      paymentTitle: "طرق الدفع",
      paymentSubtitle: "يمكنك الدفع عبر PayPal أو بطاقة ائتمان (Visa / Mastercard).",
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
          a: "نعم، تعمل على الهاتف، التلفاز الذكي، أجهزة Android TV، والكمبيوتر.",
        },
        {
          q: "هل يوجد دعم فني؟",
          a: "نعم، دعم سريع لمساعدتك في التفعيل وأي استفسار تقني.",
        },
        {
          q: "هل يمكنني تغيير الخطة لاحقاً؟",
          a: "نعم، يمكنك الترقية أو تغيير الخدمة في أي وقت.",
        },
      ],
    },
    contact: {
      title: "تواصل معنا",
      subtitle: "نحن جاهزون للمساعدة — اختر وسيلة التواصل المفضلة لديك",
      whatsapp: "واتساب",
      telegram: "تيليجرام",
    },
    footer: "© 2026 Rivo Plus — جميع الحقوق محفوظة",
    theme: { switchAria: "تغيير المظهر", light: "فاتح", dark: "داكن" },
    language: { ar: "العربية", en: "English", de: "Deutsch", switchAria: "تغيير اللغة" },
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
      subtitle: "Streaming, music, design, and AI services — explore our digital products built for you.",
      cta: "Explore now",
    },
    products: {
      title: "Our Products",
      subtitle: "Pick the service that matches your lifestyle.",
      viewDetails: "View details",
      quickView: "Quick view",
      openDetails: "Open details page",
      paymentTitle: "Payment methods",
      paymentSubtitle: "Pay securely via PayPal or credit card (Visa / Mastercard).",
    },
    faq: {
      title: "FAQ",
      subtitle: "Answers to common questions",
      items: [
        {
          q: "How does activation work?",
          a: "Activation is confirmed right after your order, and you’ll receive details via WhatsApp or Telegram.",
        },
        {
          q: "Does it work on all devices?",
          a: "Yes — phone, Smart TV, Android TV devices, and computers.",
        },
        {
          q: "Do you offer support?",
          a: "Yes, fast support for activation and technical questions.",
        },
        {
          q: "Can I change later?",
          a: "Yes, you can upgrade or change anytime.",
        },
      ],
    },
    contact: {
      title: "Contact",
      subtitle: "We’re happy to help — choose your preferred channel",
      whatsapp: "WhatsApp",
      telegram: "Telegram",
    },
    footer: "© 2026 Rivo Plus — All rights reserved",
    theme: { switchAria: "Toggle theme", light: "Light", dark: "Dark" },
    language: { ar: "العربية", en: "English", de: "Deutsch", switchAria: "Change language" },
  },
  de: {
    dir: "ltr" as const,
    nav: {
      products: "Produkte",
      faq: "FAQ",
      contact: "Kontakt",
    },
    hero: {
      title: "Alles, was du brauchst an",
      titleHighlight: "einem Ort",
      subtitle: "Streaming, Musik, Design und AI Services — entdecke unsere digitalen Produkte.",
      cta: "Jetzt entdecken",
    },
    products: {
      title: "Unsere Produkte",
      subtitle: "Wähle den Service, der zu dir passt.",
      viewDetails: "Details ansehen",
      quickView: "Schnellansicht",
      openDetails: "Detailseite öffnen",
      paymentTitle: "Zahlungsmethoden",
      paymentSubtitle: "Sicher bezahlen mit PayPal oder Kreditkarte (Visa / Mastercard).",
    },
    faq: {
      title: "FAQ",
      subtitle: "Häufige Fragen",
      items: [
        {
          q: "Wie läuft die Aktivierung?",
          a: "Direkt nach deiner Bestellung — du bekommst die Details per WhatsApp oder Telegram.",
        },
        {
          q: "Funktioniert es auf allen Geräten?",
          a: "Ja — Handy, Smart TV, Android TV und PC.",
        },
        {
          q: "Gibt es Support?",
          a: "Ja, schneller Support bei Aktivierung und Fragen.",
        },
        {
          q: "Kann ich später wechseln?",
          a: "Ja, Upgrade oder Wechsel jederzeit möglich.",
        },
      ],
    },
    contact: {
      title: "Kontakt",
      subtitle: "Wir helfen dir gerne — wähle deinen Kanal",
      whatsapp: "WhatsApp",
      telegram: "Telegram",
    },
    footer: "© 2026 Rivo Plus — Alle Rechte vorbehalten",
    theme: { switchAria: "Theme wechseln", light: "Hell", dark: "Dunkel" },
    language: { ar: "العربية", en: "English", de: "Deutsch", switchAria: "Sprache wechseln" },
  },
};
