import { DM_Sans, Sora } from "next/font/google";
import { ConceptBanner } from "@/components/demo/concept-banner";
import { VoltCareApp } from "@/components/demo/voltcare-app";
import { getDemo } from "@/data/portfolio";
import { pageMetadata } from "@/lib/seo";

const sora = Sora({ subsets: ["latin"], variable: "--font-vc-head", display: "swap" });
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-vc-body", display: "swap" });

export const metadata = pageMetadata({
  title: "VoltCare Services: electronics services concept demo",
  description:
    "VoltCare Services is a concept demo by Samarth Ops: an electrical and electronics repair website with a filterable service catalogue, a visit booking form and a ticket tracker.",
  path: "/portfolio/voltcare",
});

export default function VoltCarePage() {
  const demo = getDemo("voltcare")!;
  return (
    <>
      <ConceptBanner demo={demo} />
      <div className={`${sora.variable} ${dmSans.variable} font-[family-name:var(--font-vc-body)]`}>
        <VoltCareApp />
      </div>
    </>
  );
}
