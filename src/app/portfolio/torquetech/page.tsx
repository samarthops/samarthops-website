import { IBM_Plex_Sans, Oswald } from "next/font/google";
import { ConceptBanner } from "@/components/demo/concept-banner";
import { TorqueTechApp } from "@/components/demo/torquetech-app";
import { getDemo } from "@/data/portfolio";
import { pageMetadata } from "@/lib/seo";

const oswald = Oswald({ subsets: ["latin"], variable: "--font-tt-head", display: "swap" });
const plex = IBM_Plex_Sans({ subsets: ["latin"], weight: ["400", "600", "700"], variable: "--font-tt-body", display: "swap" });

export const metadata = pageMetadata({
  title: "TorqueTech Components: mechanical parts concept demo",
  description:
    "TorqueTech Components is a concept demo by Samarth Ops: a mechanical parts manufacturer website with a filterable catalogue, part specifications and a quote request list.",
  path: "/portfolio/torquetech",
});

export default function TorqueTechPage() {
  const demo = getDemo("torquetech")!;
  return (
    <>
      <ConceptBanner demo={demo} />
      <div className={`${oswald.variable} ${plex.variable} font-[family-name:var(--font-tt-body)]`}>
        <TorqueTechApp />
      </div>
    </>
  );
}
