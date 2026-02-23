import { type Language } from "@/pages/index-content";

type LanguageSwitcherProps = {
  language: Language;
  onChange: (language: Language) => void;
  ariaLabel: string;
};

const languageButtons: Record<Language, string> = {
  ar: "🇸🇦 العربية",
  en: "🇺🇸 English",
  de: "🇩🇪 Deutsch",
};

const LanguageSwitcher = ({ language, onChange, ariaLabel }: LanguageSwitcherProps) => {
  return (
    <div
      className="fixed left-4 top-4 z-[60] inline-flex items-center gap-1 rounded-xl border border-border bg-background/85 p-1 text-foreground shadow-lg backdrop-blur"
      role="group"
      aria-label={ariaLabel}
    >
      {(["ar", "en", "de"] as const).map((lang) => (
        <button
          key={lang}
          type="button"
          onClick={() => onChange(lang)}
          className={`rounded-md px-2 py-1 text-xs font-semibold transition-colors ${
            language === lang ? "bg-primary text-primary-foreground" : "hover:bg-muted"
          }`}
        >
          {languageButtons[lang]}
        </button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
