import Link from "next/link";
import { legalNav, mainNav } from "@/config/navigation";
import { siteConfig } from "@/config/site";

const linkClass = "inline-block py-2 hover:text-brand-dark hover:underline";

export function Footer() {
  return (
    <footer className="border-t border-line bg-soft">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 text-sm text-ink sm:px-6">
        {/* The header already shows these links from md up; the footer repeats them only where the header collapses into a menu. */}
        <nav
          aria-label="Footer"
          className="flex flex-wrap gap-x-5 gap-y-0 font-medium md:hidden"
        >
          {mainNav.map((item) => (
            <Link key={item.href} href={item.href} className={linkClass}>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {siteConfig.name}, Pune.{" "}
            <a
              href={`mailto:${siteConfig.supportEmail}`}
              className="underline hover:text-brand-dark"
            >
              {siteConfig.supportEmail}
            </a>
          </p>
          <nav
            aria-label="Legal"
            className="flex flex-wrap gap-x-5 gap-y-0 md:flex-nowrap md:whitespace-nowrap"
          >
            {legalNav.map((item) => (
              <Link key={item.href} href={item.href} className={linkClass}>
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
