import { prefersReducedMotion } from "./format";

export function flyJarToCart(fromEl: HTMLElement | null, cartBtn: HTMLElement | null) {
  if (prefersReducedMotion() || !fromEl || !cartBtn) return;
  const a = fromEl.getBoundingClientRect();
  const b = cartBtn.getBoundingClientRect();
  const gid = "jg" + Math.random().toString(36).slice(2, 7);
  const el = document.createElement("div");
  el.className = "fly-jar";
  el.innerHTML = `<svg class="jar-svg" viewBox="0 0 120 160" aria-hidden="true">
    <defs>
      <linearGradient id="${gid}" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#F8E08A"/><stop offset="1" stop-color="#C98A12"/></linearGradient>
    </defs>
    <rect x="35" y="12" width="50" height="14" rx="3" fill="#C98A12"/>
    <rect x="38" y="8" width="44" height="6" rx="2" fill="#E8B13A"/>
    <path d="M28 32 h64 v10 H28z" fill="rgba(251,244,228,0.25)"/>
    <path d="M30 42 q0 100 30 110 q30-10 30-110z" fill="rgba(251,244,228,0.12)" stroke="rgba(251,244,228,0.4)" stroke-width="2"/>
    <path d="M36 70 q0 70 24 78 q24-8 24-78z" fill="url(#${gid})" opacity="0.95"/>
    <rect x="40" y="55" width="40" height="28" rx="2" fill="#FBF4E4" opacity="0.9"/>
    <text x="60" y="72" text-anchor="middle" font-size="6" fill="#0F1A14" font-family="Georgia,serif">KRIDHAV</text>
  </svg>`;
  el.style.left = `${a.left + a.width / 2 - 24}px`;
  el.style.top = `${a.top}px`;
  document.body.appendChild(el);
  requestAnimationFrame(() => {
    el.style.transform = `translate(${b.left - a.left}px, ${b.top - a.top}px) scale(0.3)`;
    el.style.opacity = "0";
  });
  setTimeout(() => el.remove(), 750);
}
