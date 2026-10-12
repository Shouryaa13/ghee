"use client";

import { CartProvider } from "@/context/CartContext";
import type { ReactNode } from "react";

export default function Providers({ children }: { children: ReactNode }) {
  return <CartProvider>{children}</CartProvider>;
}
