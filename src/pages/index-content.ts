import { Gamepad2, Music, Sparkles, Tv } from "lucide-react";

export type Language = "ar" | "en" | "de";

export type ProductOffer = {
  label: Record<Language, string>;
  discountPercent: number;
  endsAtISO: string; // yyyy-mm-dd
};

export type Product = {
  slug: string;
  icon: typeof Tv;
  title: Record<Language, string>;
  description: Record<Language, string>;
  longDescription: Record<Language, string>;
  highlights: Record<Language, string[]>;
  /** Place image files in /public/products and reference them like /products/your-image.webp */
  heroImage: string;
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
    heroImage: "/products/stream-1.svg",
    heroImageLayout: {
      mobileHeightPx: 420,
      desktopHeightPx: 520,
      fit: "contain",
      position: "center",
    },
    gallery: ["/products/stream-1.svg", "/products/stream-2.svg"],
    badge: null,
    featured: true,
    offer: {
      label: { ar: "عرض رمضان", en: "Ramadan Offer", de: "Ramadan-Angebot" },
      discountPercent: 25,
      endsAtISO: "2026-03-31",
    },
  },
  {
    slug: "music",
    icon: Music,
    title: { ar: "ريفو ميوزك", en: "Rivo Music", de: "Rivo Musik" },
    description: {
      ar: "Spotify و YouTube Premium — موسيقى بجودة عالية بدون إعلانات",
      en: "Spotify + YouTube Premium — music in high quality with no ads.",
      de: "Spotify + YouTube Premium — Musik in hoher Qualität ohne Werbung.",
    },
    longDescription: {
      ar: "استمع بلا حدود: تشغيل بدون إعلانات، قوائم تشغيل ذكية، وتنزيل للاستماع دون إنترنت. اختر Spotify أو YouTube Premium حسب احتياجك.",
      en: "Listen without limits: ad‑free playback, smart playlists, and offline downloads. Choose Spotify or YouTube Premium based on your needs.",
      de: "Hören ohne Limits: werbefreie Wiedergabe, smarte Playlists und Offline-Downloads. Wähle Spotify oder YouTube Premium passend zu deinem Bedarf.",
    },
    highlights: {
      ar: ["بدون إعلانات", "تنزيل دون إنترنت", "قوائم تشغيل", "جودة عالية"],
      en: ["No ads", "Offline downloads", "Playlists", "High quality"],
      de: ["Ohne Werbung", "Offline-Downloads", "Playlists", "Hohe Qualität"],
    },
    heroImage: "/products/music-1.svg",
    gallery: ["/products/music-1.svg", "/products/music-2.svg"],
    badge: null,
    featured: false,
    offer: {
      label: { ar: "عرض رمضان", en: "Ramadan Offer", de: "Ramadan-Angebot" },
      discountPercent: 20,
      endsAtISO: "2026-03-31",
    },
  },
  {
    slug: "creativity",
    icon: Sparkles,
    title: { ar: "ريفو كرييتيفيتي", en: "Rivo Creativity", de: "Rivo Creativity" },
    description: {
      ar: "Adobe Creative Cloud و Canva Pro — أدوات تصميم وإبداع",
      en: "Adobe Creative Cloud + Canva Pro — design & creativity tools.",
      de: "Adobe Creative Cloud + Canva Pro — Design- & Kreativ-Tools.",
    },
    longDescription: {
      ar: "حل واحد للإبداع: اشتراكات احترافية للتصميم والمونتاج وصناعة المحتوى. اختر Adobe Creative Cloud أو Canva Pro حسب عملك.",
      en: "One hub for creativity: professional subscriptions for design, editing, and content creation. Choose Adobe Creative Cloud or Canva Pro based on your workflow.",
      de: "Ein Hub für Kreativität: professionelle Abos für Design, Editing und Content Creation. Wähle Adobe Creative Cloud oder Canva Pro passend zu deinem Workflow.",
    },
    highlights: {
      ar: ["تصميم احترافي", "قوالب جاهزة", "للعمل والدراسة", "تفعيل سريع"],
      en: ["Pro design", "Ready templates", "Work & study", "Fast activation"],
      de: ["Pro-Design", "Vorlagen", "Arbeit & Studium", "Schnelle Aktivierung"],
    },
    heroImage: "/products/creative-1.svg",
    gallery: ["/products/creative-1.svg", "/products/creative-2.svg"],
    badge: null,
    featured: false,
    offer: null,
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
    longDescription: {
      ar: "الألعاب في أي مكان: تشغيل سحابي سريع، مكتبة متجددة، ودعم يد التحكم. مناسب للاعبين الذين يريدون الأداء بدون تعقيد.",
      en: "Games everywhere: fast cloud play, a growing library, and controller support. Perfect for players who want performance without hassle.",
      de: "Gaming überall: schnelles Cloud-Play, wachsende Bibliothek und Controller-Support. Perfekt für alle, die Leistung ohne Aufwand möchten.",
    },
    highlights: {
      ar: ["زمن استجابة منخفض", "يدعم يد التحكم", "عناوين جديدة", "تشغيل على الأجهزة"],
      en: ["Low latency", "Controller support", "New titles", "Play on devices"],
      de: ["Niedrige Latenz", "Controller-Support", "Neue Titel", "Auf Geräten spielen"],
    },
    heroImage: "/products/games-1.svg",
    gallery: ["/products/games-1.svg", "/products/games-2.svg"],
    badge: null,
    featured: false,
    offer: {
      label: { ar: "عرض رمضان", en: "Ramadan Offer", de: "Ramadan-Angebot" },
      discountPercent: 30,
      endsAtISO: "2026-03-31",
    },
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
    },
    products: {
      title: "منتجاتنا",
      subtitle: "اختر ما يناسبك من خدماتنا الرقمية المتنوعة",
      viewDetails: "عرض التفاصيل",
      quickView: "عرض سريع",
      openDetails: "فتح صفحة التفاصيل",
      ramadanTitle: "عرض رمضان",
      ramadanSubtitle: "خصومات لفترة محدودة — سارع قبل انتهاء العرض",
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
      subtitle: "Streaming, music, games, and more — explore our digital products built for you.",
      cta: "Explore now",
    },
    products: {
      title: "Our Products",
      subtitle: "Pick the service that matches your lifestyle.",
      viewDetails: "View details",
      quickView: "Quick view",
      openDetails: "Open details page",
      ramadanTitle: "Ramadan Offer",
      ramadanSubtitle: "Limited-time discounts — don’t miss out.",
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
      subtitle: "Streaming, Musik, Games & mehr — entdecke unsere digitalen Produkte.",
      cta: "Jetzt entdecken",
    },
    products: {
      title: "Unsere Produkte",
      subtitle: "Wähle den Service, der zu dir passt.",
      viewDetails: "Details ansehen",
      quickView: "Schnellansicht",
      openDetails: "Detailseite öffnen",
      ramadanTitle: "Ramadan-Angebot",
      ramadanSubtitle: "Zeitlich begrenzte Rabatte — nicht verpassen.",
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
