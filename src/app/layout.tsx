import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { WhatsAppButton } from "@/components/layout/whatsapp-button";
import { JsonLd } from "@/components/common/json-ld";
import { RouteJsonLd } from "@/components/common/route-json-ld";
import { RevealObserver } from "@/components/common/reveal-observer";
import { siteConfig } from "@/config/site";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Software development, Pune`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  alternates: { canonical: "/" },
  icons: { icon: [{ url: "/images/branding/Samarth-Ops-symbol.svg", type: "image/svg+xml" }] },
};

const orgLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteConfig.url}/#org`,
      name: siteConfig.name,
      url: siteConfig.url,
      logo: `${siteConfig.url}/images/branding/Samarth-Ops-symbol-512.png`,
      email: siteConfig.supportEmail,
    },
    {
      "@type": "WebSite",
      url: siteConfig.url,
      name: siteConfig.name,
      publisher: { "@id": `${siteConfig.url}/#org` },
    },
  ],
};

export const viewport: Viewport = { themeColor: "#0070FF" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="flex min-h-dvh flex-col bg-white text-ink antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:bg-white focus:px-4 focus:py-2"
        >
          Skip to content
        </a>
        <JsonLd data={orgLd} />
        <RouteJsonLd />
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <WhatsAppButton />
        <RevealObserver />
      </body>
    </html>
  );
}
