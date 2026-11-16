/**
 * Services shown on the home page. `live` flips to true when the service page
 * ships (phase 4); until then the card has no link, so there are no dead links.
 */
export type Service = { title: string; text: string; href: string; live: boolean };

export const services: Service[] = [
  { title: "Android apps", text: "Customised Android applications built around how your business works.", href: "/services/android-apps", live: false },
  { title: "Websites", text: "Professional, fast websites that present your business well.", href: "/services/websites", live: false },
  { title: "E-commerce", text: "Online stores that make it easy for customers to buy.", href: "/services/ecommerce", live: false },
  { title: "Custom software", text: "Software tailored to your processes, built to scale.", href: "/services/custom-software", live: false },
  { title: "Business automation", text: "Replace repetitive manual work with simple, reliable tools.", href: "/services/business-automation", live: false },
];

export const whySamarth = [
  { title: "Customised solutions", text: "Built for your business, not a one-size-fits-all template." },
  { title: "Practical business understanding", text: "We start from how you operate and what you need to fix." },
  { title: "Modern development", text: "Current tools and clean engineering." },
  { title: "Affordable pricing", text: "Sensible costs for growing businesses." },
  { title: "Scalable architecture", text: "Foundations that grow with you." },
  { title: "Technical support", text: "Help is available after launch." },
];
