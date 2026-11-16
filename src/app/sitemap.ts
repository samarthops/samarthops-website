import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { servicePages } from "@/data/services";

export const dynamic = "force-static";

const paths = [
  "/",
  "/services",
  ...servicePages.map((s) => `/services/${s.slug}`),
  "/products/hrms",
  "/about",
  "/contact",
  "/website-privacy",
  "/terms",
  "/privacy",
  "/support",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.map((p) => ({ url: `${siteConfig.url}${p === "/" ? "" : p}` }));
}
