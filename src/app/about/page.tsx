import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/common/section";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About Samarth Ops",
  description:
    "Samarth Ops is a software development firm in Pune with 8+ years of experience building customised Android apps, websites and business software.",
  path: "/about",
});

const offers = ["Customised Android applications", "Professional websites", "Business software", "Affordable, practical solutions"];

export default function AboutPage() {
  return (
    <>
      <section className="bg-gradient-to-b from-[#EAF3FF] to-white">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
          <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-navy sm:text-5xl">
            Your Technology Partner for Business Growth
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-ink">
            Samarth Ops is a software development firm in Pune. We build customised digital solutions that help
            businesses simplify operations and grow.
          </p>
        </div>
      </section>

      <Section title="What we do">
        <p className="max-w-2xl text-ink">
          With 8+ years of experience and 100+ customised Android apps and websites delivered, we focus on solutions
          that fit how a business actually works, at a sensible cost.
        </p>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {offers.map((o) => (
            <li key={o} className="rounded-xl border border-line p-4 text-ink">
              {o}
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="soft" title="Our product">
        <p className="max-w-2xl text-ink">
          Alongside client work we make SamarthOps HRMS, an employee and workforce management app for attendance,
          shifts, leave, overtime and employee documents.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button asChild size="xl">
            <Link href="/products/hrms">See SamarthOps HRMS</Link>
          </Button>
          <Button asChild size="xl" variant="outline">
            <Link href="/contact">Discuss Your Project</Link>
          </Button>
        </div>
      </Section>
    </>
  );
}
