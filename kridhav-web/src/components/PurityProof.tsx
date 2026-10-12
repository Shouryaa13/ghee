"use client";

import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/lib/format";

const counters = [
  { count: 48, suffix: " hrs", label: "From milk to jar (typical batch)" },
  { count: 100, suffix: "%", label: "Glass packaging — no plastic tubs" },
  { count: 0, suffix: "", label: "Preservatives · flavouring · colours" },
  { count: 3, suffix: " sizes", label: "250 ml · 500 ml · 1 L" },
];

export default function PurityProof() {
  const refs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const els = refs.current.filter(Boolean) as HTMLSpanElement[];
    const reduce = prefersReducedMotion();
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLSpanElement;
          const target = Number(el.dataset.count);
          if (reduce) {
            el.textContent = String(target);
            io.unobserve(el);
            return;
          }
          const start = performance.now();
          const dur = 1400;
          const tick = (t: number) => {
            const p = Math.min(1, (t - start) / dur);
            const eased = 1 - Math.pow(1 - p, 3);
            el.textContent = String(Math.round(target * eased));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          io.unobserve(el);
        });
      },
      { threshold: 0.4 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section className="section section-soft" id="purity" aria-labelledby="purityTitle">
      <div className="section-head">
        <p className="eyebrow">Transparency</p>
        <h2 className="section-title" id="purityTitle">
          Purity Proof
        </h2>
        <p className="section-lead">
          Numbers you can verify. No invented licenses. No miracle claims — just
          honest process.
        </p>
      </div>
      <div className="purity-grid">
        <div className="counters">
          {counters.map((c, i) => (
            <div className="counter" key={c.label}>
              <div className="num">
                <span
                  ref={(el) => {
                    refs.current[i] = el;
                  }}
                  data-count={c.count}
                >
                  0
                </span>
                {c.suffix}
              </div>
              <div className="label">{c.label}</div>
            </div>
          ))}
        </div>
        <aside className="lab-card">
          <h3>Lab &amp; licence card</h3>
          <div className="lab-row">
            <span>FSSAI License</span>
            <span>[FSSAI License No. – add yours]</span>
          </div>
          <div className="lab-row">
            <span>Batch testing</span>
            <span>[Lab report link]</span>
          </div>
          <div className="lab-row">
            <span>Moisture / RM / BR</span>
            <span>[Values from your lab]</span>
          </div>
          <div className="lab-row">
            <span>Source dairy</span>
            <span>[Farm / co-op name]</span>
          </div>
          <p className="lab-note">
            Placeholders only — replace with your real documents before go-live.
            Kridhav demo makes no medical or therapeutic claims.
          </p>
        </aside>
      </div>
    </section>
  );
}
