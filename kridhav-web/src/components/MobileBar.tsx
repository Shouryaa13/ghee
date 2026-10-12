"use client";

import { PRODUCTS } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { flyJarToCart } from "@/lib/flyToCart";

export default function MobileBar() {
  const { addItem, whatsappHref } = useCart();

  return (
    <div className="mobile-bar" role="region" aria-label="Quick actions">
      <button
        type="button"
        className="btn btn-gold"
        id="mobileAdd"
        onClick={(e) => {
          const first = PRODUCTS[0];
          const sz = first.sizes[0];
          addItem({
            key: `${first.id}-${sz.size}`,
            id: first.id,
            name: first.name,
            size: sz.size,
            price: sz.price,
            image: first.image,
          });
          flyJarToCart(e.currentTarget, document.getElementById("cartToggle"));
        }}
      >
        Add to cart
      </button>
      <a
        className="btn btn-ghost"
        id="mobileWa"
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          borderColor: "rgba(251,244,228,0.35)",
          color: "var(--cream)",
        }}
      >
        WhatsApp
      </a>
    </div>
  );
}
