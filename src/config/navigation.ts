export type NavItem = { label: string; href: string };

/** Header navigation. Entries are added as each page ships (no dead links). */
export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "SamarthOps HRMS", href: "/products/hrms" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

/** Footer legal links. The first three are the Play-linked app pages. */
export const legalNav: NavItem[] = [
  { label: "Privacy notice", href: "/privacy" },
  { label: "Support", href: "/support" },
  { label: "Delete my data", href: "/delete-data" },
  { label: "Website privacy", href: "/website-privacy" },
  { label: "Terms", href: "/terms" },
];
