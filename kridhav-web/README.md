# Kridhav — Premium Ghee Demo (Next.js)

Pitch-ready D2C demo for Indian ghee manufacturers. Golden Hour design, bilona storytelling, cart + WhatsApp checkout.

## Run

```bash
cd kridhav-web
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Edit products

Product data lives in `src/data/products.ts` — names, prices, sizes, images.

## Stack

- Next.js 15 (App Router) + TypeScript
- GSAP + ScrollTrigger (pinned “Pasture to Jar” story)
- Cart state in React context (no localStorage)
- Images in `public/assets/`
