export type SizeOption = { size: string; price: number };

export type Product = {
  id: string;
  name: string;
  tagline: string;
  image: string;
  sizes: SizeOption[];
};

export const PRODUCTS: Product[] = [
  {
    id: "a2-desi",
    name: "A2 Desi Cow Ghee",
    tagline: "Bilona method · Grass-fed",
    image: "/assets/field-jar.jpg",
    sizes: [
      { size: "250 ml", price: 449 },
      { size: "500 ml", price: 799 },
      { size: "1 L", price: 1499 },
    ],
  },
  {
    id: "buffalo",
    name: "Buffalo Ghee",
    tagline: "Rich · Ideal for sweets",
    image: "/assets/burlap-jar.jpg",
    sizes: [
      { size: "250 ml", price: 399 },
      { size: "500 ml", price: 729 },
      { size: "1 L", price: 1349 },
    ],
  },
  {
    id: "cultured",
    name: "Organic Cultured Ghee",
    tagline: "Cultured cream · Delicate aroma",
    image: "/assets/spoon-scoop.jpg",
    sizes: [
      { size: "250 ml", price: 499 },
      { size: "500 ml", price: 899 },
      { size: "1 L", price: 1699 },
    ],
  },
];

export const GIFT_JAR_OPTIONS = [
  { id: "g-a2-500", label: "A2 · 500 ml", price: 799 },
  { id: "g-a2-1l", label: "A2 · 1 L", price: 1499 },
  { id: "g-buff-500", label: "Buffalo · 500 ml", price: 729 },
  { id: "g-pair", label: "Duo · A2 + Buffalo 500 ml", price: 1499 },
];

export const GIFT_BOXES = [
  { name: "Heritage Wood", price: 499 },
  { name: "Festive Gold Sleeve", price: 349 },
  { name: "Corporate Linen", price: 599 },
];

export const REVIEWS = [
  {
    name: "Ananya Mehra, Pune",
    text: "The aroma when it hits the tadka — that alone sold my entire family.",
  },
  {
    name: "Rohit Deshpande, Indore",
    text: "We switched for the glass jars. Stayed for the danedaar texture.",
  },
  {
    name: "Sana Qureshi, Hyderabad",
    text: "Sent the Diwali hamper to clients. Three asked for the brand name.",
  },
  {
    name: "Vikram Iyer, Chennai",
    text: "Feels like the ghee my grandmother strained on the chulha — cleaner packaging.",
  },
  {
    name: "Neha Kapoor, Delhi",
    text: "Subscription means I stop rationing the last spoon before the next order.",
  },
];

export const FAQS = [
  {
    q: "What is bilona ghee?",
    a: "Curd is set from milk, hand-churned into butter (makkhan), then slow-simmered into ghee. Longer process, fuller aroma — the Kridhav way.",
  },
  {
    q: "How should I store it?",
    a: "Cool, dry cupboard away from sunlight. No refrigeration needed in most Indian climates. Always use a dry spoon.",
  },
  {
    q: "Do you ship pan-India?",
    a: "Yes — demo checker accepts most 6-digit pincodes. Free shipping above ₹999.",
  },
  {
    q: "Is this medical or Ayurvedic advice?",
    a: "No. Kridhav is a food brand. We do not make health, therapeutic, or medicinal claims.",
  },
  {
    q: "Can I white-label for my brand?",
    a: "This page is a manufacturer pitch demo. Use the wholesale form — custom branding is available on request.",
  },
];

export const STORY_STEPS = [
  {
    title: "Grass-fed cows",
    copy: "Open pastures. Desi breeds. Milk that tastes of the land.",
    image: "/assets/pasture-pitcher.jpg",
    alt: "Cows grazing behind golden ghee in glassware",
  },
  {
    title: "Fresh A2 milk",
    copy: "Collected cool, within hours — never reconstituted.",
    image: "/assets/lifestyle-kitchen.jpg",
    alt: "Fresh ghee jar in a bright kitchen",
  },
  {
    title: "Set into curd",
    copy: "Overnight culture. The bilona journey begins here.",
    image: "/assets/spoon-scoop.jpg",
    alt: "Curd-like scoop of ghee on a wooden spoon",
  },
  {
    title: "Hand-churned bilona",
    copy: "Wooden churn. Slow rhythm. Butter that earns its gold.",
    image: "/assets/swing-top-jars.jpg",
    alt: "Handcrafted jars of bilona ghee",
  },
  {
    title: "Slow-simmered on wood fire",
    copy: "Patience turns makkhan into liquid sunlight.",
    image: "/assets/burlap-jar.jpg",
    alt: "Ghee jar on rustic wood by wood-fire warmth",
  },
  {
    title: "Golden ghee",
    copy: "Poured into glass. Sealed. Ready for your kitchen.",
    image: "/assets/hero-pasture-jar.jpg",
    alt: "Finished jar of organic cow ghee",
  },
];

export const RECIPES = [
  {
    title: "Dal tadka",
    copy: "Finish with a hiss of cumin in molten ghee.",
    image: "/assets/spoon-scoop.jpg",
  },
  {
    title: "Halwa",
    copy: "Slow-roast sooji until it smells like festivals.",
    image: "/assets/texture-closeup.jpg",
  },
  {
    title: "Parathas",
    copy: "Layer, fold, kiss the tawa with gold.",
    image: "/assets/burlap-jar.jpg",
  },
  {
    title: "Khichdi",
    copy: "Comfort in a bowl — drizzle at the end.",
    image: "/assets/lifestyle-kitchen.jpg",
  },
  {
    title: "Laddoo",
    copy: "Bind besan with warm ghee. Shape. Share.",
    image: "/assets/field-jar.jpg",
  },
];

export const FREE_SHIP = 999;
export const WA_NUMBER = "919999999999";
