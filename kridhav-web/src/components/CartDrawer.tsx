"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { formatINR } from "@/lib/format";

export default function CartDrawer() {
  const {
    cart,
    isOpen,
    closeCart,
    changeQty,
    cartTotal,
    shipProgress,
    shipRemain,
    whatsappHref,
  } = useCart();
  const [pin, setPin] = useState("");
  const [pinMsg, setPinMsg] = useState<{ text: string; ok?: boolean } | null>(
    null
  );
  const [overlayHidden, setOverlayHidden] = useState(true);

  useEffect(() => {
    if (isOpen) {
      setOverlayHidden(false);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      const t = setTimeout(() => setOverlayHidden(true), 350);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  const checkPincode = () => {
    const value = pin.trim();
    if (!/^\d{6}$/.test(value)) {
      setPinMsg({ text: "Enter a valid 6-digit pincode", ok: false });
      return;
    }
    const serviceable = !(value.startsWith("000") || value === "111111");
    if (serviceable) {
      setPinMsg({
        text: `Delivering to ${value} in 3–5 days (demo)`,
        ok: true,
      });
    } else {
      setPinMsg({
        text: "Sorry — this pincode isn't in our demo coverage",
        ok: false,
      });
    }
  };

  return (
    <>
      <div
        className={`cart-overlay${isOpen ? " open" : ""}`}
        id="cartOverlay"
        hidden={overlayHidden && !isOpen}
        onClick={closeCart}
      />
      <aside
        className={`cart-drawer${isOpen ? " open" : ""}`}
        id="cartDrawer"
        aria-label="Shopping cart"
        aria-hidden={!isOpen}
      >
        <div className="cart-head">
          <h2>Your cart</h2>
          <button
            type="button"
            className="icon-btn"
            id="cartClose"
            aria-label="Close cart"
            style={{ borderColor: "var(--line)", color: "var(--ink)" }}
            onClick={closeCart}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
        </div>
        <div className="cart-body" id="cartBody">
          {!cart.length ? (
            <div className="cart-empty">
              <p>Your cart is waiting for gold.</p>
            </div>
          ) : (
            cart.map((item, i) => (
              <div className="cart-item" key={item.key}>
                <div className="cart-thumb">
                  <Image
                    src={item.image}
                    alt=""
                    width={64}
                    height={64}
                  />
                </div>
                <div>
                  <h4>{item.name}</h4>
                  <div className="meta">{item.size}</div>
                  <div className="qty-ctrl">
                    <button
                      type="button"
                      aria-label="Decrease"
                      onClick={() => changeQty(i, -1)}
                    >
                      −
                    </button>
                    <span>{item.qty}</span>
                    <button
                      type="button"
                      aria-label="Increase"
                      onClick={() => changeQty(i, 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="cart-item-price">
                  {formatINR(item.price * item.qty)}
                </div>
              </div>
            ))
          )}
        </div>
        <div className="cart-foot">
          <div className="ship-note" id="shipNote">
            {shipRemain > 0
              ? `Add ${formatINR(shipRemain)} more for free shipping`
              : "You've unlocked free shipping"}
          </div>
          <div className="ship-bar" aria-hidden="true">
            <span id="shipFill" style={{ width: `${shipProgress}%` }} />
          </div>
          <div className="subtotal-row">
            <span>Subtotal</span>
            <span id="cartSubtotal">{formatINR(cartTotal)}</span>
          </div>
          <div className="pincode-row">
            <label className="sr-only" htmlFor="pincode">
              Pincode
            </label>
            <input
              type="text"
              id="pincode"
              inputMode="numeric"
              maxLength={6}
              placeholder="Check pincode"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") checkPincode();
              }}
            />
            <button
              type="button"
              className="btn btn-outline"
              id="checkPin"
              style={{ padding: "0.7rem 1rem" }}
              onClick={checkPincode}
            >
              Check
            </button>
          </div>
          <p
            className={`pincode-msg${pinMsg ? (pinMsg.ok ? " ok" : " bad") : ""}`}
            id="pinMsg"
            role="status"
          >
            {pinMsg?.text ?? ""}
          </p>
          <button
            type="button"
            className="btn btn-ink"
            id="checkoutDemo"
            onClick={() =>
              alert(
                cart.length
                  ? "Demo checkout — wire your payment gateway here."
                  : "Add something golden first."
              )
            }
          >
            Checkout (demo)
          </button>
          <a
            className="btn btn-gold"
            id="whatsappOrder"
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
          >
            Order on WhatsApp
          </a>
        </div>
      </aside>
    </>
  );
}
