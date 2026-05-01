import * as React from "react";

export type CartItem = {
  id: string;
  slug: string;
  title: string;
  image: string;
  optionSummary: string[];
  price: number | null;
  currency: string;
  quantity: number;
};

type CartContextValue = {
  items: CartItem[];
  itemCount: number;
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
};

const STORAGE_KEY = "rivo-plus-cart";
const CartContext = React.createContext<CartContextValue | null>(null);

function readCart(): CartItem[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = React.useState<CartItem[]>(readCart);

  React.useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = React.useCallback<CartContextValue["addItem"]>((item, quantity = 1) => {
    setItems((current) => {
      const existing = current.find((cartItem) => cartItem.id === item.id);
      if (existing) {
        return current.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + quantity }
            : cartItem,
        );
      }

      return [...current, { ...item, quantity }];
    });
  }, []);

  const removeItem = React.useCallback((id: string) => {
    setItems((current) => current.filter((item) => item.id !== id));
  }, []);

  const updateQuantity = React.useCallback((id: string, quantity: number) => {
    setItems((current) =>
      current
        .map((item) => (item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item))
        .filter((item) => item.quantity > 0),
    );
  }, []);

  const clearCart = React.useCallback(() => {
    setItems([]);
  }, []);

  const value = React.useMemo<CartContextValue>(
    () => ({
      items,
      itemCount: items.reduce((sum, item) => sum + item.quantity, 0),
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
    }),
    [items, addItem, removeItem, updateQuantity, clearCart],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = React.useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}
