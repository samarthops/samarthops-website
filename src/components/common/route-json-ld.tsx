"use client";

import { usePathname } from "next/navigation";
import { JsonLd } from "@/components/common/json-ld";
import { siteConfig } from "@/config/site";
import { demoProjects } from "@/data/portfolio";
import { servicePages } from "@/data/services";

const STATIC_NAMES: Record<string, string> = {
  "/services": "Services",
  "/products": "Products",
  "/products/hrms": "SamarthOps HRMS",
  "/portfolio": "Concept demos",
  "/about": "About",
  "/contact": "Contact",
  "/website-privacy": "Website privacy",
  "/terms": "Terms",
};

const NAMES: Record<string, string> = {
  ...STATIC_NAMES,
  ...Object.fromEntries(servicePages.map((s) => [`/services/${s.slug}`, s.title])),
  ...Object.fromEntries(demoProjects.map((d) => [`/portfolio/${d.slug}`, d.name])),
};

/** Parent crumbs that have no page of their own (`/products` is not a route). */
const SKIP = new Set(["/products"]);

const CONCEPT_NOTE =
  "Concept demonstration developed by Samarth Ops. Not a completed client engagement.";

/** BreadcrumbList for every inner page, and WebPage markup for the concept demos. */
export function RouteJsonLd() {
  const pathname = (usePathname() ?? "/").replace(/\/$/, "") || "/";
  if (pathname === "/" || !NAMES[pathname]) return null;

  const parts = pathname.split("/").filter(Boolean);
  const trail = parts
    .map((_, i) => "/" + parts.slice(0, i + 1).join("/"))
    .filter((p) => NAMES[p] && !SKIP.has(p));

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
      ...trail.map((p, i) => ({
        "@type": "ListItem",
        position: i + 2,
        name: NAMES[p],
        item: `${siteConfig.url}${p}`,
      })),
    ],
  };

  const demo = demoProjects.find((d) => pathname === `/portfolio/${d.slug}`);

  return (
    <>
      <JsonLd data={breadcrumb} />
      {demo ? (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: `${demo.name}: ${demo.industry.toLowerCase()} concept demo`,
            description: `${demo.summary} ${CONCEPT_NOTE}`,
            url: `${siteConfig.url}${pathname}`,
            isPartOf: { "@type": "WebSite", name: siteConfig.name, url: siteConfig.url },
            publisher: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
          }}
        />
      ) : null}
    </>
  );
}
