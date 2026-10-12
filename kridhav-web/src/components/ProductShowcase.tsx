"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { PRODUCTS, WA_NUMBER } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { formatINR, prefersReducedMotion } from "@/lib/format";
import { flyJarToCart } from "@/lib/flyToCart";

export default function ProductShowcase() {
  const { addItem } = useCart();
  const [selections, setSelections] = useState<Record<string, number>>(() =>
    Object.fromEntries(PRODUCTS.map((p) => [p.id, 0]))
  );
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion() || window.matchMedia("(pointer: coarse)").matches)
      return;
    const cards = gridRef.current?.querySelectorAll<HTMLElement>("[data-tilt]");
    if (!cards) return;
    const cleanups: Array<() => void> = [];
    cards.forEach((card) => {
      const onMove = (e: MouseEvent) => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = `perspective(900px) rotateY(${x * 4}deg) rotateX(${-y * 4}deg) translateY(-2px)`;
      };
      const onLeave = () => {
        card.style.transform = "perspective(900px) rotateY(0) rotateX(0) translateY(0)";
      };
      card.addEventListener("mousemove", onMove);
      card.addEventListener("mouseleave", onLeave);
      cleanups.push(() => {
        card.removeEventListener("mousemove", onMove);
        card.removeEventListener("mouseleave", onLeave);
      });
    });
    return () => cleanups.forEach((fn) => fn());
  }, []);

  const addProduct = (productId: string, btn: HTMLElement) => {
    const p = PRODUCTS.find((x) => x.id === productId);
    if (!p) return;
    const sz = p.sizes[selections[productId] ?? 0];
    addItem({
      key: `${p.id}-${sz.size}`,
      id: p.id,
      name: p.name,
      size: sz.size,
      price: sz.price,
      image: p.image,
    });
    const cartBtn = document.getElementById("cartToggle");
    flyJarToCart(btn, cartBtn);
  };

  return (
    <section className="section section-cream" id="shop" aria-labelledby="shopTitle">
      <div className="section-head">
        <p className="eyebrow">The collection</p>
        <h2 className="section-title" id="shopTitle">
          Choose your gold
        </h2>
        <p className="section-lead">
          Three signatures. Three sizes. Every jar batch-dated and filled by hand.
        </p>
      </div>
      <div className="products-grid" id="productsGrid" ref={gridRef}>
        {PRODUCTS.map((p) => {
          const idx = selections[p.id] ?? 0;
          const s = p.sizes[idx];
          return (
            <article className="product-card" data-product={p.id} data-tilt key={p.id}>
              <div className="product-media">
                <Image
                  src={p.image}
                  alt={`${p.name} in glass jar`}
                  fill
                  loading="lazy"
                  sizes="(max-width: 700px) 100vw, 33vw"
                  style={{ objectFit: "cover", objectPosition: "center" }}
                />
              </div>
              <p className="eyebrow" style={{ marginBottom: "0.35rem" }}>
                Small batch
              </p>
              <h3>{p.name}</h3>
              <p className="desc">{p.tagline}</p>
              <div className="size-row" role="group" aria-label={`Sizes for ${p.name}`}>
                {p.sizes.map((sz, i) => (
                  <button
                    type="button"
                    key={sz.size}
                    className={`size-btn${i === idx ? " active" : ""}`}
                    onClick={() =>
                      setSelections((prev) => ({ ...prev, [p.id]: i }))
                    }
                  >
                    {sz.size}
                  </button>
                ))}
              </div>
              <div className="price-row">
                <div className="price" data-price key={`${p.id}-${idx}`}>
                  {formatINR(s.price)}
                  <small>incl. demo GST</small>
                </div>
              </div>
              <div className="product-actions">
                <button
                  type="button"
                  className="btn btn-ink add-cart"
                  onClick={(e) => addProduct(p.id, e.currentTarget)}
                >
                  Add to cart
                </button>
                <button
                  type="button"
                  className="btn btn-outline buy-wa"
                  onClick={() => {
                    const msg = encodeURIComponent(
                      `Hi Kridhav, I'd like to order:\n• ${p.name} — ${s.size} (${formatINR(s.price)})\nPlease confirm availability.`
                    );
                    window.open(`https://wa.me/${WA_NUMBER}?text=${msg}`, "_blank");
                  }}
                >
                  WhatsApp
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
