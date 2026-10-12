"use client";

import { useEffect, useState } from "react";
import { REVIEWS } from "@/data/products";
import { prefersReducedMotion } from "@/lib/format";

export default function Testimonials() {
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    setReduce(prefersReducedMotion());
  }, []);

  const cards = [...REVIEWS, ...REVIEWS];

  return (
    <section className="section section-soft" aria-labelledby="reviewsTitle">
      <div className="section-head">
        <p className="eyebrow">From kitchens like yours</p>
        <h2 className="section-title" id="reviewsTitle">
          Words, not marketing
        </h2>
      </div>
      <div className="marquee-wrap">
        <div
          className="marquee-track"
          id="marqueeTrack"
          style={reduce ? { animation: "none" } : undefined}
        >
          {cards.map((r, i) => (
            <blockquote className="review-card" key={`${r.name}-${i}`}>
              <div className="stars" aria-label="5 stars">
                ★★★★★
              </div>
              <p>“{r.text}”</p>
              <cite>— {r.name}</cite>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
