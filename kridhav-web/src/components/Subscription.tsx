"use client";

import { FormEvent, useState } from "react";
import Image from "next/image";

export default function Subscription() {
  const [msg, setMsg] = useState("");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setMsg(
      "Subscription preference saved (demo). Connect your billing later."
    );
  };

  return (
    <section className="section section-cream" aria-labelledby="subTitle">
      <div className="sub-banner">
        <div>
          <p className="eyebrow">Subscribe</p>
          <h2 id="subTitle">Ghee on repeat — save 10%</h2>
          <p style={{ opacity: 0.75, maxWidth: "40ch" }}>
            Never run out mid-tadka. Choose your jar, set a rhythm, pause anytime.
            Demo pricing only.
          </p>
          <form className="sub-form" id="subForm" onSubmit={onSubmit}>
            <label className="sr-only" htmlFor="subProduct">
              Product
            </label>
            <select id="subProduct" required defaultValue="a2-500">
              <option value="a2-500">A2 Desi Cow · 500 ml</option>
              <option value="a2-1l">A2 Desi Cow · 1 L</option>
              <option value="buffalo-500">Buffalo Ghee · 500 ml</option>
              <option value="cultured-500">Organic Cultured · 500 ml</option>
            </select>
            <label className="sr-only" htmlFor="subFreq">
              Frequency
            </label>
            <select id="subFreq" defaultValue="30">
              <option value="30">Every 30 days</option>
              <option value="45">Every 45 days</option>
              <option value="60">Every 60 days</option>
            </select>
            <button type="submit" className="btn btn-gold">
              Start subscription
            </button>
          </form>
          <p className={`form-msg${msg ? " show" : ""}`} role="status">
            {msg}
          </p>
        </div>
        <div
          style={{
            position: "relative",
            zIndex: 1,
            borderRadius: 16,
            overflow: "hidden",
            aspectRatio: "4/3",
          }}
        >
          <Image
            src="/assets/hero-pasture-jar.jpg"
            alt="Kridhav ghee jar ready for subscription delivery"
            fill
            sizes="(max-width: 800px) 100vw, 40vw"
            style={{ objectFit: "cover", objectPosition: "center" }}
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
