import { siteConfig } from "@/config/site";

/** Returns a wa.me link, or null while the number is not configured. */
export function whatsappUrl(message: string = siteConfig.whatsappGreeting): string | null {
  const number = siteConfig.whatsappNumber.replace(/\D/g, "");
  if (!number) return null;
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
