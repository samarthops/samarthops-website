/**
 * Site-wide settings. Business content lives in src/data/; only identity and
 * contact settings live here.
 */
export const siteConfig = {
  name: "Samarth Ops",
  productName: "SamarthOps HRMS",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://samarthops.in",
  description:
    "Samarth Ops is a software development firm in Pune building custom Android apps, websites and business software, and the SamarthOps HRMS app.",
  supportEmail: "support@samarthops.in",
  /**
   * WhatsApp number in international format, digits only (country code first,
   * no "+", no spaces). OWNER: fill this in yourself. While it is empty the
   * floating button and every WhatsApp link stay hidden, so no broken link ships.
   */
  whatsappNumber: "",
  whatsappGreeting: "Hello Samarth Ops, I would like to know more.",
} as const;
