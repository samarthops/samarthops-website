export type NavItem = { label: string; href: string; /** Static HTML file outside the Next router (plain anchor). */ static?: boolean };

/** Header navigation. Entries are added as each page ships (no dead links). */
export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "SamarthOps HRMS", href: "/products/hrms" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

/** Footer legal links. The first three are the Play-linked static pages (see public/). */
export const legalNav: NavItem[] = [
  { label: "Privacy notice", href: "/privacy", static: true },
  { label: "Support", href: "/support", static: true },
  { label: "Delete my data", href: "/delete-data", static: true },
  { label: "Website privacy", href: "/website-privacy" },
  { label: "Terms", href: "/terms" },
];
