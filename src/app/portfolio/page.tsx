import { Section } from "@/components/common/section";
import { PortfolioGrid } from "@/components/demo/portfolio-grid";
import { conceptLabel } from "@/data/portfolio";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Portfolio: concept demos",
  description:
    "Concept demonstrations by Samarth Ops: seven working examples you can try: food ordering, an online store, a clinic, real estate, a school, electronics repair and parts manufacturing, built to show our design and development work.",
  path: "/portfolio",
});

export default function PortfolioPage() {
  return (
    <>
      <section className="bg-gradient-to-b from-[#EAF3FF] to-white">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
          <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-navy sm:text-5xl">Our Work: Concept Demos</h1>
          <p className="mt-5 max-w-2xl text-lg text-ink">
            Try working examples of the kind of websites and apps we build. Each demo has its own design, and every
            interaction works in your browser.
          </p>
          <p className="mt-4 max-w-2xl rounded-lg border border-line bg-white p-4 text-sm text-ink" data-testid="concept-label">
            {conceptLabel} All names, people, products, prices and places in the demos are fictional.
          </p>
        </div>
      </section>

      <Section>
        <PortfolioGrid />
      </Section>
    </>
  );
}
