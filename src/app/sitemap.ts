import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { demoProjects } from "@/data/portfolio";
import { servicePages } from "@/data/services";

export const dynamic = "force-static";

const paths = [
  "/",
  "/services",
  ...servicePages.map((s) => `/services/${s.slug}`),
  "/products/hrms",
  "/portfolio",
  ...demoProjects.map((d) => `/portfolio/${d.slug}`),
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
