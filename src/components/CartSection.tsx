import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Mail, MessageCircle, Minus, Plus, Send, ShoppingCart, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/lib/cart";
import { buildCartCheckoutMessage } from "@/lib/productSelection";
import type { Language } from "@/pages/index-content";
import { RIVO_ORDER_EMAIL, RIVO_TELEGRAM_USERNAME, RIVO_WHATSAPP_PHONE } from "@/config/contact";
import { isSafeUrl } from "@/lib/utils";

const text = {
  title: { ar: "السلة", en: "Cart", de: "Warenkorb" },
  empty: { ar: "السلة فارغة حالياً.", en: "Your cart is empty.", de: "Dein Warenkorb ist leer." },
  continue: { ar: "تصفح المنتجات", en: "Browse products", de: "Produkte ansehen" },
  total: { ar: "المجموع", en: "Total", de: "Gesamt" },
  onRequest: { ar: "حسب الطلب", en: "On request", de: "Auf Anfrage" },
  whatsappCta: { ar: "أكمل طلبك عبر واتساب", en: "Complete order via WhatsApp", de: "Bestellung via WhatsApp" },
  copy: { ar: "نسخ الرسالة", en: "Copy message", de: "Nachricht kopieren" },
  copied: { ar: "تم نسخ الرسالة", en: "Message copied", de: "Nachricht kopiert" },
  clear: { ar: "إفراغ السلة", en: "Clear cart", de: "Warenkorb leeren" },
  items: { ar: "منتجات", en: "items", de: "Artikel" },
  telegramHint: {
    ar: "افتح تيليجرام والصق الرسالة المنسوخة.",
    en: "Open Telegram and paste the copied message.",
    de: "Telegram öffnen und die kopierte Nachricht einfügen.",
  },
};

type CartSectionProps = {
  language: Language;
  browseHref?: string;
};

export default function CartSection({ language, browseHref = "/#products" }: CartSectionProps) {
  const safeBrowseHref = isSafeUrl(browseHref) ? browseHref : "/#products";
  const { items, itemCount, updateQuantity, removeItem, clearCart } = useCart();
  const { toast } = useToast();

  const message = React.useMemo(() => buildCartCheckoutMessage(items, language), [items, language]);
  const knownTotal = items.reduce((sum, item) => sum + (item.price ?? 0) * item.quantity, 0);
  const hasUnknownPrice = items.some((item) => item.price === null);
  const currency = items[0]?.currency ?? "€";

  const whatsappUrl = `https://wa.me/${RIVO_WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
  const mailUrl = `mailto:${RIVO_ORDER_EMAIL}?subject=${encodeURIComponent("Rivo Plus Order")}&body=${encodeURIComponent(message)}`;
  const telegramUrl = `https://t.me/${RIVO_TELEGRAM_USERNAME}`;

  const copyMessage = async () => {
    try {
      await navigator.clipboard.writeText(message);
      toast({ title: text.copied[language] });
    } catch {
      toast({ title: message });
    }
  };

  return (
    <section id="cart" className="py-20">
      <div className="container mx-auto max-w-5xl px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.45 }}
          className="mb-6 flex items-center justify-between gap-4"
        >
          <div className="flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-2xl border border-primary/20 bg-primary/10 text-primary">
              <ShoppingCart className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-3xl font-black md:text-4xl">{text.title[language]}</h2>
              <p className="text-sm text-muted-foreground">
                {itemCount} {text.items[language]}
              </p>
            </div>
          </div>

          <Button asChild variant="secondary" className="rounded-xl">
            <a href={safeBrowseHref}>{text.continue[language]}</a>
          </Button>
        </motion.div>

        {items.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: 16 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 170, damping: 20 }}
            className="cart-animated-card rounded-2xl border border-border bg-card/70 p-8 text-center shadow-sm"
          >
            <p className="mb-5 text-muted-foreground">{text.empty[language]}</p>
            <Button asChild className="rounded-xl">
              <a href={safeBrowseHref}>{text.continue[language]}</a>
            </Button>
          </motion.div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
            <motion.div className="space-y-3" layout>
              <AnimatePresence initial={false}>
                {items.map((item, index) => (
                <motion.article
                  key={item.id}
                  layout
                  initial={{ opacity: 0, x: language === "ar" ? -24 : 24, scale: 0.98 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: language === "ar" ? 24 : -24, scale: 0.96 }}
                  transition={{ type: "spring", stiffness: 220, damping: 24, delay: index * 0.03 }}
                  className="cart-animated-card grid gap-4 rounded-2xl border border-border bg-card/70 p-4 shadow-sm sm:grid-cols-[96px_1fr_auto]"
                >
                  <img src={item.image} alt={item.title} className="h-24 w-full rounded-xl object-cover sm:w-24" />
                  <div className="min-w-0">
                    <h3 className="text-lg font-extrabold">{item.title}</h3>
                    <div className="mt-2 grid gap-1 text-sm text-muted-foreground">
                      {item.optionSummary.map((line) => (
                        <span key={line}>{line}</span>
                      ))}
                    </div>
                    <div className="mt-3 font-bold">
                      {item.price === null ? text.onRequest[language] : `${item.price * item.quantity}${item.currency}`}
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-3 sm:flex-col sm:items-end">
                    <div className="inline-flex items-center rounded-xl border border-border bg-background">
                      <button
                        type="button"
                        className="grid h-10 w-10 place-items-center"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        aria-label="Decrease quantity"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="min-w-8 text-center text-sm font-bold">{item.quantity}</span>
                      <button
                        type="button"
                        className="grid h-10 w-10 place-items-center"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        aria-label="Increase quantity"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                    <button
                      type="button"
                      className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border text-muted-foreground hover:bg-muted hover:text-foreground"
                      onClick={() => removeItem(item.id)}
                      aria-label="Remove item"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </motion.article>
              ))}
              </AnimatePresence>
            </motion.div>

            <motion.aside
              initial={{ opacity: 0, y: 18, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ type: "spring", stiffness: 170, damping: 20 }}
              className="cart-summary-kinetic h-fit rounded-2xl border border-border bg-card/80 p-5 shadow-sm backdrop-blur"
            >
              <div className="mb-4 flex items-center justify-between gap-3">
                <span className="font-extrabold">{text.total[language]}</span>
                <span className="text-xl font-black">
                  {knownTotal > 0 ? `${knownTotal}${currency}` : text.onRequest[language]}
                  {hasUnknownPrice ? ` + ${text.onRequest[language]}` : ""}
                </span>
              </div>

              <div className="grid gap-2">
                <Button asChild className="h-12 rounded-xl">
                  <a href={whatsappUrl} target="_blank" rel="noreferrer">
                    <MessageCircle className="h-4 w-4" />
                    {text.whatsappCta[language]}
                  </a>
                </Button>
                <Button asChild variant="secondary" className="h-12 rounded-xl">
                  <a href={mailUrl}>
                    <Mail className="h-4 w-4" />
                    E-Mail
                  </a>
                </Button>
                <Button variant="secondary" className="h-12 rounded-xl" onClick={copyMessage}>
                  {text.copy[language]}
                </Button>
                <Button asChild variant="outline" className="h-12 rounded-xl">
                  <a href={telegramUrl} target="_blank" rel="noreferrer">
                    <Send className="h-4 w-4" />
                    Telegram
                  </a>
                </Button>
              </div>

              <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{text.telegramHint[language]}</p>

              <button
                type="button"
                className="mt-5 text-sm font-semibold text-muted-foreground hover:text-foreground"
                onClick={clearCart}
              >
                {text.clear[language]}
              </button>
            </motion.aside>
          </div>
        )}
      </div>
    </section>
  );
}
