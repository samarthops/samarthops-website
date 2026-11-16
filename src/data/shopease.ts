/** ShopEase concept demo: fictional catalogue and prices. */

export const TAX_RATE = 0.18;
export const DELIVERY_FEE = 49;
export const FREE_DELIVERY_ABOVE = 999;

export const categories = ["Audio", "Home and kitchen", "Fashion", "Fitness"] as const;
export type Category = (typeof categories)[number];

export type PriceBand = { id: string; label: string; min: number; max: number };

export const priceBands: PriceBand[] = [
  { id: "any", label: "Any price", min: 0, max: Infinity },
  { id: "under-1000", label: "Under ₹1,000", min: 0, max: 999 },
  { id: "1000-2999", label: "₹1,000 to ₹2,999", min: 1000, max: 2999 },
  { id: "3000-plus", label: "₹3,000 and above", min: 3000, max: Infinity },
];

export type Product = {
  id: string;
  name: string;
  category: Category;
  price: number;
  blurb: string;
  detail: string;
  specs: string[];
  icon:
    | "earbuds"
    | "speaker"
    | "headphones"
    | "bottle"
    | "mug"
    | "lamp"
    | "fryer"
    | "backpack"
    | "shirt"
    | "shoe"
    | "wallet"
    | "mat"
    | "dumbbell"
    | "band"
    | "watch";
  tone: string;
};

export const products: Product[] = [
  {
    id: "earbuds",
    name: "Wireless Earbuds",
    category: "Audio",
    price: 2499,
    blurb: "Compact earbuds with a charging case.",
    detail: "Light earbuds with a pocket charging case, made for calls and everyday music.",
    specs: ["Bluetooth connection", "Charging case included", "Touch controls"],
    icon: "earbuds",
    tone: "#DBEAFE",
  },
  {
    id: "speaker",
    name: "Bluetooth Speaker",
    category: "Audio",
    price: 1799,
    blurb: "Portable speaker with a splash-resistant body.",
    detail: "A portable speaker with clear sound for a room or a picnic.",
    specs: ["Splash-resistant body", "Carry strap", "USB charging"],
    icon: "speaker",
    tone: "#E0E7FF",
  },
  {
    id: "headphones",
    name: "Over-ear Headphones",
    category: "Audio",
    price: 3999,
    blurb: "Padded headphones for long listening.",
    detail: "Comfortable over-ear headphones with soft cushions and a foldable frame.",
    specs: ["Padded ear cushions", "Foldable frame", "Wired and wireless use"],
    icon: "headphones",
    tone: "#DDD6FE",
  },
  {
    id: "bottle",
    name: "Insulated Steel Bottle",
    category: "Home and kitchen",
    price: 699,
    blurb: "Keeps drinks hot or cold for hours.",
    detail: "A double-walled stainless steel bottle with a leak-proof cap.",
    specs: ["750 ml", "Double-walled steel", "Leak-proof cap"],
    icon: "bottle",
    tone: "#CFFAFE",
  },
  {
    id: "mugs",
    name: "Ceramic Mug Set",
    category: "Home and kitchen",
    price: 549,
    blurb: "Set of four glazed mugs.",
    detail: "Four glazed ceramic mugs in assorted colours for tea and coffee.",
    specs: ["Set of four", "Glazed ceramic", "Dishwasher safe"],
    icon: "mug",
    tone: "#FDE68A",
  },
  {
    id: "lamp",
    name: "LED Desk Lamp",
    category: "Home and kitchen",
    price: 1299,
    blurb: "Adjustable lamp with three brightness levels.",
    detail: "A slim desk lamp with an adjustable arm and three brightness settings.",
    specs: ["Three brightness levels", "Adjustable arm", "USB powered"],
    icon: "lamp",
    tone: "#FEF3C7",
  },
  {
    id: "air-fryer",
    name: "Air Fryer 4L",
    category: "Home and kitchen",
    price: 5499,
    blurb: "Cook with little oil in a four litre basket.",
    detail: "A countertop air fryer with a four litre basket and simple dial controls.",
    specs: ["4 litre basket", "Temperature dial", "Timer with auto switch-off"],
    icon: "fryer",
    tone: "#E5E7EB",
  },
  {
    id: "backpack",
    name: "Canvas Backpack",
    category: "Fashion",
    price: 1499,
    blurb: "Roomy backpack with a padded laptop sleeve.",
    detail: "A hard-wearing canvas backpack with a padded sleeve and two front pockets.",
    specs: ["Padded laptop sleeve", "Two front pockets", "Adjustable straps"],
    icon: "backpack",
    tone: "#D1FAE5",
  },
  {
    id: "overshirt",
    name: "Cotton Overshirt",
    category: "Fashion",
    price: 1899,
    blurb: "Soft cotton shirt for layering.",
    detail: "A relaxed overshirt in soft washed cotton that works over a tee or on its own.",
    specs: ["100% cotton", "Relaxed fit", "Machine washable"],
    icon: "shirt",
    tone: "#FBCFE8",
  },
  {
    id: "sneakers",
    name: "Everyday Sneakers",
    category: "Fashion",
    price: 2799,
    blurb: "Cushioned sneakers for daily wear.",
    detail: "Lightweight sneakers with a cushioned sole, made for all-day comfort.",
    specs: ["Cushioned sole", "Breathable upper", "Lace-up"],
    icon: "shoe",
    tone: "#FED7AA",
  },
  {
    id: "wallet",
    name: "Faux Leather Wallet",
    category: "Fashion",
    price: 799,
    blurb: "Slim wallet with card slots.",
    detail: "A slim faux leather wallet with six card slots and a note compartment.",
    specs: ["Six card slots", "Note compartment", "Slim profile"],
    icon: "wallet",
    tone: "#E7E5E4",
  },
  {
    id: "yoga-mat",
    name: "Yoga Mat",
    category: "Fitness",
    price: 899,
    blurb: "Non-slip mat with extra cushioning.",
    detail: "A cushioned, non-slip mat for yoga and floor exercise, with a carry strap.",
    specs: ["6 mm thick", "Non-slip surface", "Carry strap"],
    icon: "mat",
    tone: "#BBF7D0",
  },
  {
    id: "dumbbells",
    name: "Adjustable Dumbbell Pair",
    category: "Fitness",
    price: 3499,
    blurb: "Change the weight without changing the set.",
    detail: "A pair of adjustable dumbbells with plates you can add or remove for different workouts.",
    specs: ["Adjustable plates", "Textured grip", "Pair"],
    icon: "dumbbell",
    tone: "#E5E7EB",
  },
  {
    id: "bands",
    name: "Resistance Band Set",
    category: "Fitness",
    price: 599,
    blurb: "Five bands in different strengths.",
    detail: "Five loop bands from light to heavy, with a small carry pouch.",
    specs: ["Five strengths", "Carry pouch", "Latex-free option"],
    icon: "band",
    tone: "#FECACA",
  },
  {
    id: "tracker",
    name: "Fitness Tracker Band",
    category: "Fitness",
    price: 2199,
    blurb: "Tracks steps, sleep and workouts.",
    detail: "A slim band that counts steps and tracks sleep and workouts, with a bright display.",
    specs: ["Step and sleep tracking", "Bright display", "USB charging"],
    icon: "watch",
    tone: "#DBEAFE",
  },
];

export type Totals = { subtotal: number; tax: number; delivery: number; total: number };

export function priceCart(subtotal: number): Totals {
  if (subtotal <= 0) return { subtotal: 0, tax: 0, delivery: 0, total: 0 };
  const tax = Math.round(subtotal * TAX_RATE);
  const delivery = subtotal >= FREE_DELIVERY_ABOVE ? 0 : DELIVERY_FEE;
  return { subtotal, tax, delivery, total: subtotal + tax + delivery };
}
