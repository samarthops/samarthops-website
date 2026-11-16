export type NavItem = { label: string; href: string };

/** Header navigation. Entries are added as each page ships (no dead links). */
export const mainNav: NavItem[] = [{ label: "Home", href: "/" }];

/** Footer links to the Play-linked pages, served as static HTML (see public/). */
export const legalNav: NavItem[] = [
  { label: "Privacy notice", href: "/privacy" },
  { label: "Support", href: "/support" },
  { label: "Delete my data", href: "/delete-data" },
];
