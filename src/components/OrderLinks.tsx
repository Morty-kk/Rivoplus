import * as React from "react";
import { MessageCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Language } from "@/pages/index-content";

const i18n = {
  whatsapp: {
    ar: "أكمل طلبك عبر واتساب",
    en: "Complete order via WhatsApp",
    de: "Bestellung via WhatsApp",
  },
  telegram: {
    ar: "أكمل طلبك عبر تيليجرام",
    en: "Complete order via Telegram",
    de: "Bestellung via Telegram",
  },
};

export type OrderLinksProps = {
  whatsappPhoneE164: string; // digits only, e.g. 963...
  whatsappMessage: string;
  telegramUsername: string; // without @
  language?: Language;
  className?: string;
};

function buildWhatsAppUrl(phone: string, message: string): string {
  const text = encodeURIComponent(message);
  return `https://wa.me/${phone}?text=${text}`;
}

function buildTelegramUrl(username: string): string {
  return `https://t.me/${username}`;
}

export default function OrderLinks({
  whatsappPhoneE164,
  whatsappMessage,
  telegramUsername,
  language = "ar",
  className,
}: OrderLinksProps) {
  const waUrl = React.useMemo(
    () => buildWhatsAppUrl(whatsappPhoneE164, whatsappMessage),
    [whatsappPhoneE164, whatsappMessage],
  );
  const tgUrl = React.useMemo(() => buildTelegramUrl(telegramUsername), [telegramUsername]);

  return (
    <div className={className ?? "flex flex-wrap gap-3"}>
      <Button asChild className="gap-2">
        <a href={waUrl} target="_blank" rel="noreferrer">
          <MessageCircle className="h-4 w-4" />
          {i18n.whatsapp[language]}
        </a>
      </Button>

      <Button asChild variant="secondary" className="gap-2">
        <a href={tgUrl} target="_blank" rel="noreferrer">
          <Send className="h-4 w-4" />
          {i18n.telegram[language]}
        </a>
      </Button>
    </div>
  );
}
