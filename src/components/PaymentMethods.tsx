import * as React from "react";
import { cn } from "@/lib/utils";

// payment logo images (placed in src/assets)
import paypalImg from "../assets/paypal_pm_pic.webp";
import visaImg from "../assets/visa_pm_pic.webp";
import mastercardImg from "../assets/mastercard_pm_pic.webp";

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
        "flex items-center justify-center rounded-xl border border-border bg-background/70 shadow-sm overflow-hidden",
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
          className="object-cover h-full w-full rounded-lg"
        />
      </LogoWrap>

      <LogoWrap title="VISA" className={h}>
        <img
          src={visaImg}
          alt="VISA"
          className="object-cover h-full w-full rounded-lg"
        />
      </LogoWrap>

      <LogoWrap title="Mastercard" className={h}>
        <img
          src={mastercardImg}
          alt="Mastercard"
          className="object-cover h-full w-full rounded-lg"
        />
      </LogoWrap>
    </div>
  );
}
