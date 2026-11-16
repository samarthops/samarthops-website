import { Jost, Playfair_Display } from "next/font/google";
import { ConceptBanner } from "@/components/demo/concept-banner";
import { PrimeEstateApp } from "@/components/demo/primeestate-app";
import { getDemo } from "@/data/portfolio";
import { pageMetadata } from "@/lib/seo";

const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-pe-head", display: "swap" });
const jost = Jost({ subsets: ["latin"], variable: "--font-pe-body", display: "swap" });

export const metadata = pageMetadata({
  title: "PrimeEstate: real estate concept demo",
  description:
    "PrimeEstate is a concept demo by Samarth Ops: a property website with search, price and location filters, photo galleries, a wishlist and a schedule-a-visit form.",
  path: "/portfolio/primeestate",
});

export default function PrimeEstatePage() {
  const demo = getDemo("primeestate")!;
  return (
    <>
      <ConceptBanner demo={demo} />
      <div className={`${playfair.variable} ${jost.variable} font-[family-name:var(--font-pe-body)]`}>
        <PrimeEstateApp />
      </div>
    </>
  );
}
