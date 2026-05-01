import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { Language } from "@/pages/index-content";

type LanguageSelectorProps = {
  value: Language;
  onChange: (language: Language) => void;
  ariaLabel: string;
  compact?: boolean;
  className?: string;
};

const languages: { code: Language; shortLabel: string; label: string }[] = [
  { code: "ar", shortLabel: "AR", label: "العربية" },
  { code: "en", shortLabel: "EN", label: "English" },
  { code: "de", shortLabel: "DE", label: "Deutsch" },
];

export default function LanguageSelector({
  value,
  onChange,
  ariaLabel,
  compact = false,
  className,
}: LanguageSelectorProps) {
  return (
    <div
      role="radiogroup"
      aria-label={ariaLabel}
      className={cn(
        "relative inline-flex items-center gap-1 rounded-xl border border-border bg-background/80 p-1 backdrop-blur-md",
        compact ? "w-full" : "w-auto",
        className,
      )}
    >
      {languages.map((language) => {
        const selected = language.code === value;

        return (
          <button
            key={language.code}
            type="button"
            role="radio"
            aria-checked={selected}
            title={language.label}
            onClick={() => onChange(language.code)}
            className={cn(
              "relative h-9 min-w-12 flex-1 rounded-lg px-3 text-sm font-black transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              selected ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground",
              compact ? "min-w-0" : "",
            )}
          >
            {selected ? (
              <motion.span
                layoutId="language-selector-bg"
                className="absolute inset-0 rounded-lg bg-primary shadow-sm"
                transition={{ type: "spring", stiffness: 520, damping: 38 }}
              />
            ) : null}
            <span className="relative z-10">{language.shortLabel}</span>
          </button>
        );
      })}
    </div>
  );
}
