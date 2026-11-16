import Link from "next/link";
import { legalNav, mainNav } from "@/config/navigation";
import { siteConfig } from "@/config/site";

const linkClass = "hover:text-brand-dark hover:underline";

export function Footer() {
  return (
    <footer className="border-t border-line bg-soft">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 text-sm text-ink sm:px-6">
        <nav aria-label="Footer" className="flex flex-wrap gap-x-5 gap-y-2 font-medium">
          {mainNav.map((item) => (
            <Link key={item.href} href={item.href} className={linkClass}>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {siteConfig.name}, Pune.{" "}
            <a href={`mailto:${siteConfig.enquiryEmail}`} className="underline hover:text-brand-dark">
              {siteConfig.enquiryEmail}
            </a>
          </p>
          <nav aria-label="Legal" className="flex flex-wrap gap-x-5 gap-y-2">
            {legalNav.map((item) =>
              item.static ? (
                // Plain anchors: these are static HTML files outside the Next router.
                <a key={item.href} href={item.href} className={linkClass}>
                  {item.label}
                </a>
              ) : (
                <Link key={item.href} href={item.href} className={linkClass}>
                  {item.label}
                </Link>
              ),
            )}
          </nav>
        </div>
      </div>
    </footer>
  );
}
