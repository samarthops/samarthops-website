/**
 * Concept demos shown in the portfolio. All people, products, prices and places in the demos are fictional.
 * Demos are added here as each one ships.
 */
import type { ServiceValue } from "@/lib/services";

/** Label required on every demo (see CLAUDE.md). */
export const conceptLabel =
  "Concept demonstration developed by Samarth Ops. This project showcases our design and development capabilities and is not presented as a completed client engagement.";

export type DemoProject = {
  slug: "foodnest" | "shopease" | "medicare-plus" | "primeestate" | "brightfuture";
  name: string;
  /** Short industry label used by the portfolio filter. */
  industry: string;
  summary: string;
  /** Service preselected in the contact form from "Build something similar". */
  formService: ServiceValue;
  /** Preview tile colours on the portfolio card. */
  preview: { from: string; to: string; ink: string };
};

export const demoProjects: DemoProject[] = [
  {
    slug: "foodnest",
    name: "FoodNest",
    industry: "Restaurant",
    summary:
      "A food ordering site: browse the menu by category, open a dish, build an order with quantities and see the total with tax and delivery.",
    formService: "website",
    preview: { from: "#FDE7D3", to: "#F4A261", ink: "#7A2E0E" },
  },
  {
    slug: "shopease",
    name: "ShopEase",
    industry: "E-commerce",
    summary:
      "An online store: search and filter the catalogue, save favourites to a wishlist, fill a cart and complete a simulated checkout.",
    formService: "ecommerce",
    preview: { from: "#E5E7EB", to: "#FCD34D", ink: "#111827" },
  },
  {
    slug: "medicare-plus",
    name: "MediCare Plus",
    industry: "Clinic",
    summary:
      "A clinic website: browse departments, filter doctors, read profiles, pick an appointment slot and send a demo enquiry.",
    formService: "website",
    preview: { from: "#CCFBF1", to: "#14B8A6", ink: "#0B4F4A" },
  },
  {
    slug: "primeestate",
    name: "PrimeEstate",
    industry: "Real estate",
    summary:
      "A property site: search listings, filter by price and location, flip through a photo gallery, save favourites and schedule a visit.",
    formService: "website",
    preview: { from: "#FAF7F0", to: "#C9A227", ink: "#14213D" },
  },
  {
    slug: "brightfuture",
    name: "BrightFuture Academy",
    industry: "School",
    summary:
      "A school website: courses, faculty, admissions steps, events and announcements, a photo gallery and a demo admission enquiry.",
    formService: "website",
    preview: { from: "#EDE9FE", to: "#FACC15", ink: "#3B0764" },
  },
];

export function getDemo(slug: string): DemoProject | undefined {
  return demoProjects.find((d) => d.slug === slug);
}

/** Contact page link for "Build something similar". */
export function similarHref(demo: DemoProject): string {
  return `/contact?service=${demo.formService}&demo=${demo.slug}`;
}

/** Text prefilled into the enquiry message from the link above. */
export function similarMessage(demo: DemoProject): string {
  return `I would like something similar to the ${demo.name} concept demo.`;
}
