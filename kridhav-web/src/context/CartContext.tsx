"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { FREE_SHIP, WA_NUMBER } from "@/data/products";
import { formatINR } from "@/lib/format";

export type CartItem = {
  key: string;
  id: string;
  name: string;
  size: string;
  price: number;
  qty: number;
  image: string;
};

type CartContextValue = {
  cart: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (item: Omit<CartItem, "qty"> & { qty?: number }) => void;
  changeQty: (index: number, delta: number) => void;
  cartQty: number;
  cartTotal: number;
  shipProgress: number;
  shipRemain: number;
  whatsappHref: string;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const addItem = useCallback(
    (item: Omit<CartItem, "qty"> & { qty?: number }) => {
      setCart((prev) => {
        const existing = prev.find((i) => i.key === item.key);
        if (existing) {
          return prev.map((i) =>
            i.key === item.key ? { ...i, qty: i.qty + (item.qty ?? 1) } : i
          );
        }
        return [...prev, { ...item, qty: item.qty ?? 1 }];
      });
      setIsOpen(true);
    },
    []
  );

  const changeQty = useCallback((index: number, delta: number) => {
    setCart((prev) => {
      const next = [...prev];
      const item = next[index];
      if (!item) return prev;
      const qty = item.qty + delta;
      if (qty <= 0) {
        next.splice(index, 1);
        return next;
      }
      next[index] = { ...item, qty };
      return next;
    });
  }, []);

  const cartQty = useMemo(
    () => cart.reduce((s, i) => s + i.qty, 0),
    [cart]
  );
  const cartTotal = useMemo(
    () => cart.reduce((s, i) => s + i.price * i.qty, 0),
    [cart]
  );
  const shipRemain = Math.max(0, FREE_SHIP - cartTotal);
  const shipProgress = Math.min(100, (cartTotal / FREE_SHIP) * 100);

  const whatsappHref = useMemo(() => {
    const lines = cart
      .map(
        (i) =>
          `• ${i.name} (${i.size}) × ${i.qty} — ${formatINR(i.price * i.qty)}`
      )
      .join("\n");
    const msg = cart.length
      ? `Hi Kridhav,\nI'd like to order:\n${lines}\n\nSubtotal: ${formatINR(cartTotal)}`
      : `Hi Kridhav, I'd like to place an order.`;
    return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
  }, [cart, cartTotal]);

  const value = useMemo(
    () => ({
      cart,
      isOpen,
      openCart,
      closeCart,
      addItem,
      changeQty,
      cartQty,
      cartTotal,
      shipProgress,
      shipRemain,
      whatsappHref,
    }),
    [
      cart,
      isOpen,
      openCart,
      closeCart,
      addItem,
      changeQty,
      cartQty,
      cartTotal,
      shipProgress,
      shipRemain,
      whatsappHref,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
