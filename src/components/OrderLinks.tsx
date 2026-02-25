import * as React from "react";
import { MessageCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

export type OrderLinksProps = {
  whatsappPhoneE164: string; // digits only, e.g. 963...
  whatsappMessage: string;
  telegramUsername: string; // without @
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
          WhatsApp
        </a>
      </Button>

      <Button asChild variant="secondary" className="gap-2">
        <a href={tgUrl} target="_blank" rel="noreferrer">
          <Send className="h-4 w-4" />
          Telegram
        </a>
      </Button>
    </div>
  );
}
