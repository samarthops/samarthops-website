import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

export const dynamic = "force-static";

const paths = ["/", "/products/hrms", "/about", "/contact", "/website-privacy", "/terms", "/privacy", "/support"];

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.map((p) => ({ url: `${siteConfig.url}${p === "/" ? "" : p}` }));
}
