import Image from "next/image";
import Link from "next/link";
import { mainNav } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { MobileMenu } from "@/components/layout/mobile-menu";

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2" aria-label={`${siteConfig.name} home`}>
          <Image
            src="/images/branding/Samarth-Ops-symbol.svg"
            alt=""
            width={36}
            height={36}
            priority
          />
          <span className="text-lg font-bold tracking-tight text-navy">{siteConfig.name}</span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-6 md:flex">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-ink hover:text-brand-dark"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <MobileMenu />
      </div>
    </header>
  );
}
