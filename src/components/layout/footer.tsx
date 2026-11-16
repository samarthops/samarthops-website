import { legalNav } from "@/config/navigation";
import { siteConfig } from "@/config/site";

export function Footer() {
  return (
    <footer className="border-t border-line bg-soft">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 text-sm text-subtle sm:px-6 md:flex-row md:items-center md:justify-between">
        <p>
          &copy; {new Date().getFullYear()} {siteConfig.name}, Pune.{" "}
          <a href={`mailto:${siteConfig.supportEmail}`} className="underline hover:text-brand">
            {siteConfig.supportEmail}
          </a>
        </p>
        <nav aria-label="Legal" className="flex flex-wrap gap-x-5 gap-y-2">
          {legalNav.map((item) => (
            // Plain anchors: these are static HTML files outside the Next router.
            <a key={item.href} href={item.href} className="hover:text-brand">
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
