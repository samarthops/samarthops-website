import { Nunito, Playfair_Display } from "next/font/google";
import { ConceptBanner } from "@/components/demo/concept-banner";
import { FoodNestApp } from "@/components/demo/foodnest-app";
import { getDemo } from "@/data/portfolio";
import { pageMetadata } from "@/lib/seo";

const heading = Playfair_Display({ subsets: ["latin"], variable: "--font-fn-head", display: "swap" });
const body = Nunito({ subsets: ["latin"], variable: "--font-fn-body", display: "swap" });

export const metadata = pageMetadata({
  title: "FoodNest: restaurant ordering concept demo",
  description:
    "FoodNest is a concept demo by Samarth Ops: a food ordering site with a menu by category, dish details, an order cart and a simulated checkout.",
  path: "/portfolio/foodnest",
});

export default function FoodNestPage() {
  const demo = getDemo("foodnest")!;
  return (
    <>
      <ConceptBanner demo={demo} />
      <div className={`${heading.variable} ${body.variable} font-[family-name:var(--font-fn-body)]`}>
        <FoodNestApp />
      </div>
    </>
  );
}
