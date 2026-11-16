import { Nunito_Sans } from "next/font/google";
import { ConceptBanner } from "@/components/demo/concept-banner";
import { MediCareApp } from "@/components/demo/medicare-app";
import { getDemo } from "@/data/portfolio";
import { pageMetadata } from "@/lib/seo";

const nunito = Nunito_Sans({ subsets: ["latin"], variable: "--font-mc-body", display: "swap" });

export const metadata = pageMetadata({
  title: "MediCare Plus: clinic concept demo",
  description:
    "MediCare Plus is a concept demo by Samarth Ops: a clinic website with departments, doctor profiles, appointment slots and a demo enquiry form.",
  path: "/portfolio/medicare-plus",
});

export default function MediCarePage() {
  const demo = getDemo("medicare-plus")!;
  return (
    <>
      <ConceptBanner demo={demo} />
      <div className={`${nunito.variable} font-[family-name:var(--font-mc-body)]`}>
        <MediCareApp />
      </div>
    </>
  );
}
