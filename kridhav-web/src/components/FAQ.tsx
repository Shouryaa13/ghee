"use client";

import { useState } from "react";
import { FAQS } from "@/data/products";

export default function FAQ() {
  const [open, setOpen] = useState(0);

  return (
    <section className="section section-cream" id="faq" aria-labelledby="faqTitle">
      <div className="section-head">
        <p className="eyebrow">Good questions</p>
        <h2 className="section-title" id="faqTitle">
          FAQ
        </h2>
      </div>
      <div className="faq-list" id="faqList">
        {FAQS.map((f, i) => {
          const isOpen = open === i;
          return (
            <div className={`faq-item${isOpen ? " open" : ""}`} key={f.q}>
              <button
                type="button"
                className="faq-q"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? -1 : i)}
              >
                {f.q}
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </button>
              <div className="faq-a">
                <p>{f.a}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
