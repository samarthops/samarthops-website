import Link from "next/link";

const items = [
  { href: "/support", label: "Support" },
  { href: "/delete-data", label: "Delete my data" },
  { href: "/privacy", label: "Privacy notice" },
] as const;

/** Small section navigation shared by the three SamarthOps HRMS app pages linked from Google Play. */
export function AppPagesNav({
  current,
}: {
  current: (typeof items)[number]["href"];
}) {
  return (
    <nav
      aria-label="App help and legal"
      className="mb-6 flex flex-wrap gap-x-5 text-sm"
    >
      {items.map((i) =>
        i.href === current ? (
          <span
            key={i.href}
            aria-current="page"
            className="inline-block py-2 font-semibold text-navy"
          >
            {i.label}
          </span>
        ) : (
          <Link
            key={i.href}
            href={i.href}
            className="inline-block py-2 font-medium text-brand-dark underline"
          >
            {i.label}
          </Link>
        ),
      )}
    </nav>
  );
}
