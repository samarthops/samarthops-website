import { Fredoka, Nunito } from "next/font/google";
import { BrightFutureApp } from "@/components/demo/brightfuture-app";
import { ConceptBanner } from "@/components/demo/concept-banner";
import { getDemo } from "@/data/portfolio";
import { pageMetadata } from "@/lib/seo";

const fredoka = Fredoka({ subsets: ["latin"], variable: "--font-bf-head", display: "swap" });
const nunito = Nunito({ subsets: ["latin"], variable: "--font-bf-body", display: "swap" });

export const metadata = pageMetadata({
  title: "BrightFuture Academy: school concept demo",
  description:
    "BrightFuture Academy is a concept demo by Samarth Ops: a school website with courses, faculty, admissions, events, announcements, a photo gallery and a demo enquiry form.",
  path: "/portfolio/brightfuture",
});

export default function BrightFuturePage() {
  const demo = getDemo("brightfuture")!;
  return (
    <>
      <ConceptBanner demo={demo} />
      <div className={`${fredoka.variable} ${nunito.variable} font-[family-name:var(--font-bf-body)]`}>
        <BrightFutureApp />
      </div>
    </>
  );
}
