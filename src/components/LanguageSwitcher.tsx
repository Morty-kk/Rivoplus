import { type Language } from "@/pages/index-content";

type LanguageSwitcherProps = {
  language: Language;
  onChange: (language: Language) => void;
  ariaLabel: string;
};

const languageButtons: Record<Language, { flag: string; label: string }> = {
  ar: { flag: "🇸🇦", label: "العربية" },
  en: { flag: "🇺🇸", label: "English" },
  de: { flag: "🇩🇪", label: "Deutsch" },
};

const LanguageSwitcher = ({ language, onChange, ariaLabel }: LanguageSwitcherProps) => {
  return (
    <div
      className="fixed left-4 top-4 z-[60] inline-flex items-center gap-2 rounded-xl border border-border bg-background/85 p-2 text-foreground shadow-lg"
      role="group"
      aria-label={ariaLabel}
    >
      {(["ar", "en", "de"] as const).map((lang) => (
        <button
          key={lang}
          type="button"
          onClick={() => onChange(lang)}
          aria-pressed={language === lang}
          title={languageButtons[lang].label}
          className={`relative flex h-8 w-8 items-center justify-center rounded-full text-lg transition-colors focus:outline-none focus:ring-2 focus:ring-ring ${
            language === lang
              ? "bg-primary text-primary-foreground"
              : "bg-transparent hover:bg-muted"
          }`}
        >
          <span aria-hidden="true">{languageButtons[lang].flag}</span>
          <span className="sr-only">{languageButtons[lang].label}</span>
        </button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
