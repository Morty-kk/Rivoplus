import * as React from "react";
import { cn } from "@/lib/utils";

type PaymentMethodsProps = {
  className?: string;
  size?: "sm" | "md";
};

const sizeToHeight: Record<NonNullable<PaymentMethodsProps["size"]>, string> = {
  sm: "h-8",
  md: "h-10",
};

function LogoWrap({
  children,
  title,
  className,
}: {
  children: React.ReactNode;
  title: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-xl border border-border bg-background/70 px-3 py-2 shadow-sm",
        className,
      )}
      aria-label={title}
      title={title}
    >
      {children}
    </div>
  );
}

export default function PaymentMethods({ className, size = "md" }: PaymentMethodsProps) {
  const h = sizeToHeight[size];

  return (
    <div className={cn("flex flex-wrap items-center gap-3", className)}>
      <LogoWrap title="PayPal" className={cn("min-w-[120px]", h)}>
        <svg
          className={cn("w-[92px]", size === "sm" ? "h-6" : "h-7")}
          viewBox="0 0 128 32"
          role="img"
          aria-label="PayPal logo"
        >
          <title>PayPal</title>
          <rect x="0" y="0" width="128" height="32" rx="8" fill="#ffffff" />
          <path
            d="M23.3 7.2c2.8 0 5.1 0.8 6.6 2.2 1.5 1.5 2.1 3.5 1.7 6-0.8 5.4-4.9 8.2-10.4 8.2h-3.5l-1.2 7.2H12L16.2 7.2h7.1z"
            fill="#003087"
          />
          <path
            d="M23.6 9.8h-3.4l-1 6h3.1c3 0 4.8-1.2 5.2-3.6 0.2-1.2-0.1-1.9-0.6-2.4-0.6-0.5-1.6-0.8-3.3-0.8z"
            fill="#009cde"
          />
          <text
            x="48"
            y="21.5"
            fontFamily="Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial"
            fontSize="14"
            fontWeight="800"
            fill="#003087"
          >
            PayPal
          </text>
        </svg>
      </LogoWrap>

      <LogoWrap title="VISA" className={cn("min-w-[120px]", h)}>
        <svg
          className={cn("w-[92px]", size === "sm" ? "h-6" : "h-7")}
          viewBox="0 0 128 32"
          role="img"
          aria-label="VISA logo"
        >
          <title>VISA</title>
          <rect x="0" y="0" width="128" height="32" rx="8" fill="#ffffff" />
          <text
            x="36"
            y="22"
            fontFamily="Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial"
            fontSize="18"
            fontWeight="900"
            letterSpacing="1"
            fill="#1a1f71"
          >
            VISA
          </text>
          <path d="M18 26h92" stroke="#f7b600" strokeWidth="3" opacity="0.85" />
        </svg>
      </LogoWrap>

      <LogoWrap title="Mastercard" className={cn("min-w-[150px]", h)}>
        <svg
          className={cn("w-[120px]", size === "sm" ? "h-6" : "h-7")}
          viewBox="0 0 160 32"
          role="img"
          aria-label="Mastercard logo"
        >
          <title>Mastercard</title>
          <rect x="0" y="0" width="160" height="32" rx="8" fill="#ffffff" />
          <circle cx="70" cy="16" r="9" fill="#eb001b" />
          <circle cx="84" cy="16" r="9" fill="#f79e1b" />
          <path
            d="M77 8.5a9 9 0 0 0 0 15c2.3-1.7 3.8-4.5 3.8-7.5S79.3 10.2 77 8.5z"
            fill="#ff5f00"
          />
          <text
            x="100"
            y="21.5"
            fontFamily="Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial"
            fontSize="12"
            fontWeight="800"
            fill="#111827"
          >
            mastercard
          </text>
        </svg>
      </LogoWrap>
    </div>
  );
}
