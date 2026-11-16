/** PrimeEstate concept demo: fictional listings in fictional localities. Prices are made up. */

export const locations = ["Rivergate", "Maple Bay", "Hillcrest"] as const;
export type Location = (typeof locations)[number];

export type Listing = {
  id: string;
  title: string;
  locality: string;
  location: Location;
  type: "Apartment" | "Villa" | "Penthouse";
  beds: number;
  baths: number;
  areaSqft: number;
  /** Price in lakh rupees (100 lakh = 1 crore). */
  priceLakh: number;
  blurb: string;
  features: string[];
  tone: string;
};

export type PriceBand = { id: string; label: string; min: number; max: number };

export const priceBands: PriceBand[] = [
  { id: "any", label: "Any price", min: 0, max: Infinity },
  { id: "under-75", label: "Under ₹75 lakh", min: 0, max: 74.99 },
  { id: "75-150", label: "₹75 lakh to ₹1.5 crore", min: 75, max: 150 },
  { id: "above-150", label: "Above ₹1.5 crore", min: 150.01, max: Infinity },
];

export function priceLabel(lakh: number): string {
  if (lakh >= 100) {
    const crore = lakh / 100;
    return `₹${Number.isInteger(crore) ? crore : crore.toFixed(2).replace(/0$/, "")} crore`;
  }
  return `₹${lakh} lakh`;
}

export const listings: Listing[] = [
  {
    id: "riverside-2bhk",
    title: "Riverside 2 BHK",
    locality: "Willow Walk",
    location: "Rivergate",
    type: "Apartment",
    beds: 2,
    baths: 2,
    areaSqft: 980,
    priceLakh: 62,
    blurb: "A bright two-bedroom home a short walk from the river promenade.",
    features: ["River-facing balcony", "Covered parking", "Gym and play area", "24-hour security"],
    tone: "#DBEAFE",
  },
  {
    id: "garden-3bhk",
    title: "Garden Court 3 BHK",
    locality: "Lotus Lane",
    location: "Rivergate",
    type: "Apartment",
    beds: 3,
    baths: 3,
    areaSqft: 1450,
    priceLakh: 98,
    blurb: "A spacious family flat on a quiet, tree-lined lane with a shared garden.",
    features: ["Shared garden", "Two parking spots", "Clubhouse", "Power backup"],
    tone: "#DCFCE7",
  },
  {
    id: "skyline-penthouse",
    title: "Skyline Penthouse",
    locality: "Crown Tower",
    location: "Rivergate",
    type: "Penthouse",
    beds: 4,
    baths: 4,
    areaSqft: 3100,
    priceLakh: 285,
    blurb: "A top-floor home with a private terrace and wide views of the city.",
    features: ["Private terrace", "Home office room", "Three parking spots", "Concierge"],
    tone: "#FEF3C7",
  },
  {
    id: "bayview-2bhk",
    title: "Bayview 2 BHK",
    locality: "Pearl Bay Road",
    location: "Maple Bay",
    type: "Apartment",
    beds: 2,
    baths: 2,
    areaSqft: 1050,
    priceLakh: 74,
    blurb: "A calm two-bedroom home near the bay, with cross ventilation in every room.",
    features: ["Sea-breeze balcony", "Covered parking", "Swimming pool", "Jogging track"],
    tone: "#CFFAFE",
  },
  {
    id: "cove-villa",
    title: "The Cove Villa",
    locality: "Coral Close",
    location: "Maple Bay",
    type: "Villa",
    beds: 4,
    baths: 4,
    areaSqft: 2800,
    priceLakh: 240,
    blurb: "A four-bedroom villa with a private garden, in a gated community by the bay.",
    features: ["Private garden", "Two-car garage", "Gated community", "Maid's room"],
    tone: "#E0E7FF",
  },
  {
    id: "marina-1bhk",
    title: "Marina 1 BHK",
    locality: "Harbour Street",
    location: "Maple Bay",
    type: "Apartment",
    beds: 1,
    baths: 1,
    areaSqft: 640,
    priceLakh: 48,
    blurb: "A compact, well-planned first home close to cafes and the harbour walk.",
    features: ["Modular kitchen", "Reserved parking", "Lift and security", "Rooftop deck"],
    tone: "#FCE7F3",
  },
  {
    id: "ridge-villa",
    title: "Ridge Villa",
    locality: "Pine Ridge",
    location: "Hillcrest",
    type: "Villa",
    beds: 3,
    baths: 3,
    areaSqft: 2200,
    priceLakh: 135,
    blurb: "A three-bedroom villa on the ridge with hill views and cool evenings.",
    features: ["Hill-view deck", "Small lawn", "Two parking spots", "Rainwater harvesting"],
    tone: "#D1FAE5",
  },
  {
    id: "terrace-3bhk",
    title: "Terrace Hills 3 BHK",
    locality: "Terrace Hills",
    location: "Hillcrest",
    type: "Apartment",
    beds: 3,
    baths: 2,
    areaSqft: 1380,
    priceLakh: 89,
    blurb: "A three-bedroom apartment with a large terrace garden and open skies.",
    features: ["Terrace garden", "Covered parking", "Community hall", "Solar water heating"],
    tone: "#FEE2E2",
  },
  {
    id: "summit-penthouse",
    title: "Summit Penthouse",
    locality: "Summit Heights",
    location: "Hillcrest",
    type: "Penthouse",
    beds: 4,
    baths: 5,
    areaSqft: 3400,
    priceLakh: 325,
    blurb: "A duplex penthouse with a double-height living room and a rooftop sit-out.",
    features: ["Double-height living room", "Rooftop sit-out", "Three parking spots", "Private lift"],
    tone: "#EDE9FE",
  },
];

export const galleryViews = [
  { id: "living", label: "Living room", icon: "sofa" },
  { id: "bedroom", label: "Master bedroom", icon: "bed" },
  { id: "kitchen", label: "Kitchen", icon: "kitchen" },
  { id: "outdoor", label: "Balcony and outdoors", icon: "tree" },
] as const;

export const visitDays = ["Saturday", "Sunday", "Monday"] as const;
export const visitTimes = ["10:00 to 12:00", "12:00 to 14:00", "16:00 to 18:00"] as const;
