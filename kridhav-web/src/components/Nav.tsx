"use client";

import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";

const links = [
  { href: "#story", label: "Our story" },
  { href: "#shop", label: "Shop" },
  { href: "#gifting", label: "Gifting" },
  { href: "#recipes", label: "Recipes" },
  { href: "#wholesale", label: "Wholesale" },
];

export default function Nav() {
  const { cartQty, openCart } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header className={`nav${scrolled ? " scrolled" : ""}`} id="nav">
        <a className="nav-logo" href="#top">
          Kridhav <em>गhee</em>
        </a>
        <nav className="nav-links" aria-label="Primary">
          {links.map((l) => (
            <a key={l.href} href={l.href}>
              {l.label}
            </a>
          ))}
        </nav>
        <div className="nav-actions">
          <button
            className="icon-btn"
            id="cartToggle"
            aria-label="Open cart"
            aria-controls="cartDrawer"
            aria-expanded={false}
            type="button"
            onClick={openCart}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M6 7h12l-1.2 11H7.2L6 7z" />
              <path d="M9 7V5a3 3 0 0 1 6 0v2" />
            </svg>
            <span className={`cart-count${cartQty > 0 ? " is-on" : ""}`} id="cartCount">
              {cartQty}
            </span>
          </button>
          <button
            className="icon-btn menu-toggle"
            type="button"
            aria-label="Open menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </button>
        </div>
      </header>

      <div className={`mobile-menu${menuOpen ? " open" : ""}`} id="mobileMenu" hidden={!menuOpen}>
        {links.map((l) => (
          <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}>
            {l.label}
          </a>
        ))}
      </div>
    </>
  );
}
