"use client";

import { useState } from "react";
import Image from "next/image";
import { GIFT_BOXES, GIFT_JAR_OPTIONS } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { formatINR } from "@/lib/format";
import { flyJarToCart } from "@/lib/flyToCart";

const CARDS = ["Diwali", "Wedding", "Corporate"] as const;

export default function GiftBuilder() {
  const { addItem } = useCart();
  const [jarId, setJarId] = useState(GIFT_JAR_OPTIONS[0].id);
  const [boxIdx, setBoxIdx] = useState(0);
  const [card, setCard] = useState<(typeof CARDS)[number]>("Diwali");

  const jar = GIFT_JAR_OPTIONS.find((j) => j.id === jarId)!;
  const box = GIFT_BOXES[boxIdx];
  const total = jar.price + box.price;

  return (
    <section
      className="section section-soft"
      id="gifting"
      aria-labelledby="giftTitle"
    >
      <div className="section-head">
        <p className="eyebrow">Hampers</p>
        <h2 className="section-title" id="giftTitle">
          Build a Diwali hamper
        </h2>
        <p className="section-lead">
          Pick jar sizes and a box style. Watch the summary update live — ready
          for weddings, corporate desks, or festival doors.
        </p>
      </div>
      <div className="gift-builder">
        <div className="gift-options">
          <div className="option-group">
            <h4>Jar selection</h4>
            <div className="chip-row" role="group" aria-label="Jar sizes">
              {GIFT_JAR_OPTIONS.map((o) => (
                <button
                  type="button"
                  key={o.id}
                  className={`chip${jarId === o.id ? " active" : ""}`}
                  onClick={() => setJarId(o.id)}
                >
                  {o.label} · {formatINR(o.price)}
                </button>
              ))}
            </div>
          </div>
          <div className="option-group">
            <h4>Box style</h4>
            <div className="chip-row" role="group" aria-label="Box styles">
              {GIFT_BOXES.map((b, i) => (
                <button
                  type="button"
                  key={b.name}
                  className={`chip${boxIdx === i ? " active" : ""}`}
                  onClick={() => setBoxIdx(i)}
                >
                  {b.name} · {formatINR(b.price)}
                </button>
              ))}
            </div>
          </div>
          <div className="option-group">
            <h4>Occasion card</h4>
            <div className="chip-row">
              {CARDS.map((c) => (
                <button
                  type="button"
                  key={c}
                  className={`chip${card === c ? " active" : ""}`}
                  onClick={() => setCard(c)}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>
        <aside className="gift-summary" aria-live="polite">
          <h3>Your hamper</h3>
          <div className="gift-preview">
            <Image
              src="/assets/swing-top-jars.jpg"
              alt="Gift-ready ghee jars"
              fill
              sizes="400px"
              style={{ objectFit: "cover", objectPosition: "center" }}
            />
          </div>
          <div className="line">
            <span>{jar.label}</span>
            <span>{formatINR(jar.price)}</span>
          </div>
          <div className="line">
            <span>{box.name}</span>
            <span>{formatINR(box.price)}</span>
          </div>
          <div className="line">
            <span>Card</span>
            <span>{card}</span>
          </div>
          <div className="gift-total">
            <span>Total</span>
            <span>{formatINR(total)}</span>
          </div>
          <button
            type="button"
            className="btn btn-gold"
            style={{ width: "100%", marginTop: "1.25rem" }}
            onClick={(e) => {
              addItem({
                key: `hamper-${jar.id}-${box.name}-${card}`,
                id: "hamper",
                name: `Hamper · ${card}`,
                size: `${jar.label} + ${box.name}`,
                price: total,
                image: "/assets/swing-top-jars.jpg",
              });
              flyJarToCart(e.currentTarget, document.getElementById("cartToggle"));
            }}
          >
            Add hamper to cart
          </button>
        </aside>
      </div>
    </section>
  );
}
