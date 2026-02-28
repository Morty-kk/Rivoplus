import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export type PillOption = {
  key: string;
  label: React.ReactNode;
  disabled?: boolean;
};

type Props = {
  value: string;
  options: PillOption[];
  onChange: (key: string) => void;
  ariaLabel: string;
  className?: string;
  buttonClassName?: string;
  /**
   * Allow pills to wrap to multiple rows instead of forcing a single
   * horizontal line with scrolling. When `true` overflow-x-auto is
   * removed and flex-wrap is applied.
   */
  wrap?: boolean;
};

/**
 * iOS-like "glass swipe" segmented control using Framer Motion layout animations.
 */
export default function AnimatedPillGroup({
  value,
  options,
  onChange,
  ariaLabel,
  className,
  buttonClassName,
  wrap = false,
}: Props) {
  const selectedIndex = Math.max(
    0,
    options.findIndex((o) => o.key === value),
  );

  return (
    <div
      role="radiogroup"
      aria-label={ariaLabel}
      className={cn(
        "relative inline-flex w-full gap-2 rounded-2xl border border-border bg-background/40 p-2 backdrop-blur-md",
        wrap
          ? "flex-wrap"
          : "flex-nowrap overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none]",
        className,
      )}
    >
      {options.map((o, idx) => {
        const selected = idx == selectedIndex;
        return (
          <button
            key={o.key}
            type="button"
            role="radio"
            aria-checked={selected}
            disabled={o.disabled}
            onClick={() => onChange(o.key)}
            className={cn(
              "relative flex-1 select-none rounded-2xl px-4 py-2.5 text-sm font-semibold outline-none transition",
              "min-w-[120px] touch-manipulation active:scale-[0.98]",
              o.disabled ? "opacity-50" : "hover:bg-muted/30",
              buttonClassName,
            )}
          >
            {selected ? (
              <motion.span
                layoutId="pill-bg"
                className="absolute inset-0 rounded-2xl border border-border bg-background/70 shadow-sm backdrop-blur-xl"
                transition={{ type: "spring", stiffness: 520, damping: 40 }}
              />
            ) : null}
            <span className={cn("relative z-10", selected ? "text-foreground" : "text-muted-foreground")}>
              {o.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
