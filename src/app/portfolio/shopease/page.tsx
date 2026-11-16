import { Manrope } from "next/font/google";
import { ConceptBanner } from "@/components/demo/concept-banner";
import { ShopEaseApp } from "@/components/demo/shopease-app";
import { getDemo } from "@/data/portfolio";
import { pageMetadata } from "@/lib/seo";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-se-body", display: "swap" });

export const metadata = pageMetadata({
  title: "ShopEase: online store concept demo",
  description:
    "ShopEase is a concept demo by Samarth Ops: an online store with search, filters, a wishlist, a cart and a simulated checkout.",
  path: "/portfolio/shopease",
});

export default function ShopEasePage() {
  const demo = getDemo("shopease")!;
  return (
    <>
      <ConceptBanner demo={demo} />
      <div className={`${manrope.variable} font-[family-name:var(--font-se-body)]`}>
        <ShopEaseApp />
      </div>
    </>
  );
}
