import * as React from "react";
import { cn } from "@/lib/utils";

// payment logo images (placed in src/assets)
import paypalImg from "../assets/paypal_pm_pic.png";
import visaImg from "../assets/visa_pm_pic.png";
import mastercardImg from "../assets/mastercard_pm_pic.png";

type PaymentMethodsProps = {
  className?: string;
  size?: "sm" | "md";
};

const sizeToHeight: Record<NonNullable<PaymentMethodsProps["size"]>, string> = {
  sm: "h-10",    // small slightly larger than before
  md: "h-12",    // default larger for more prominent logos
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
        "flex items-center justify-center rounded-xl border border-border bg-background/70 px-2 py-1 shadow-sm",
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
      <LogoWrap title="PayPal" className={h}>
        <img
          src={paypalImg}
          alt="PayPal"
          className={cn("object-contain max-w-full max-h-full", size === "sm" ? "h-8" : "h-9")}
        />
      </LogoWrap>

      <LogoWrap title="VISA" className={h}>
        <img
          src={visaImg}
          alt="VISA"
          className={cn("object-contain max-w-full max-h-full", size === "sm" ? "h-8" : "h-9")}
        />
      </LogoWrap>

      <LogoWrap title="Mastercard" className={h}>
        <img
          src={mastercardImg}
          alt="Mastercard"
          className={cn("object-contain max-w-full max-h-full", size === "sm" ? "h-8" : "h-9")}
        />
      </LogoWrap>
    </div>
  );
}
