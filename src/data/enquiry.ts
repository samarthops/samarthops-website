import type { ServiceValue } from "@/lib/services";

/** Prefilled WhatsApp text per service (contact page). */
export const whatsappMessages: Record<ServiceValue, string> = {
  android: "Hello Samarth Ops, I am interested in a customised Android app for my business. Please share more details.",
  website: "Hello Samarth Ops, I am interested in a customised website for my business. Please share more details.",
  ecommerce: "Hello Samarth Ops, I am interested in an e-commerce store for my business. Please share more details.",
  "custom-software": "Hello Samarth Ops, I am interested in custom software for my business. Please share more details.",
  hrms: "Hello Samarth Ops, I would like a demo of SamarthOps HRMS.",
  other: "Hello Samarth Ops, I would like to discuss a project. Please get in touch.",
};
