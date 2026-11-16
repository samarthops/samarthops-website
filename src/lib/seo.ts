import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

/** Temporary share image (Play banner); a dedicated one comes later. */
const SHARE_IMAGE = "/images/branding/Samarth-Ops-Play-Listing-Banner-1024x500.png";

export function pageMetadata({
  title,
  description,
  path,
  absoluteTitle,
}: {
  title: string;
  description: string;
  path: string;
  /** Use for the home page, where the title template must not append the name again. */
  absoluteTitle?: boolean;
}): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} | ${siteConfig.name}`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      title: fullTitle,
      description,
      url: path,
      locale: "en_IN",
      images: [{ url: SHARE_IMAGE, width: 1024, height: 500, alt: siteConfig.name }],
    },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: [SHARE_IMAGE] },
  };
}
