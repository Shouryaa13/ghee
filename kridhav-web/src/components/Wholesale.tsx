"use client";

import { FormEvent, useState } from "react";

export default function Wholesale() {
  const [msg, setMsg] = useState("");

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMsg(
      "Enquiry received (demo). We'll be in touch within one business day."
    );
    e.currentTarget.reset();
  };

  return (
    <section
      className="section section-soft"
      id="wholesale"
      aria-labelledby="wholesaleTitle"
    >
      <div className="wholesale-grid">
        <div>
          <p className="eyebrow">B2B</p>
          <h2 className="section-title" id="wholesaleTitle">
            Wholesale &amp; bulk
          </h2>
          <p className="section-lead">
            Restaurants, sweet shops, retailers — tell us your monthly need. We
            reply within one business day (demo form).
          </p>
          <ul
            style={{
              display: "grid",
              gap: "0.6rem",
              color: "var(--muted)",
              fontSize: "0.95rem",
              marginTop: "1rem",
            }}
          >
            <li>— Consistent bilona supply</li>
            <li>— Custom jar branding available</li>
            <li>— Pan-India dispatch partners</li>
          </ul>
        </div>
        <form className="form-grid" id="wholesaleForm" onSubmit={onSubmit}>
          <label>
            Business name
            <input
              type="text"
              name="business"
              required
              placeholder="Your kitchen / shop"
            />
          </label>
          <label>
            Type
            <select name="type" required defaultValue="">
              <option value="" disabled>
                Select
              </option>
              <option>Restaurant</option>
              <option>Sweet shop</option>
              <option>Retailer</option>
              <option>Hotel / cloud kitchen</option>
              <option>Other</option>
            </select>
          </label>
          <label>
            Phone / WhatsApp
            <input type="tel" name="phone" required placeholder="+91" />
          </label>
          <label>
            Monthly volume (approx.)
            <select name="volume" defaultValue="Under 20 L">
              <option>Under 20 L</option>
              <option>20–50 L</option>
              <option>50–200 L</option>
              <option>200 L+</option>
            </select>
          </label>
          <label>
            Message
            <textarea
              name="message"
              placeholder="Tell us about your use case"
            />
          </label>
          <button type="submit" className="btn btn-ink">
            Send enquiry
          </button>
          <p className={`form-msg${msg ? " show" : ""}`} role="status">
            {msg}
          </p>
        </form>
      </div>
    </section>
  );
}
