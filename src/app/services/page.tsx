import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/common/section";
import { approach, servicePages, whySamarth } from "@/data/services";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Services: Android apps, websites, e-commerce and custom software",
  description:
    "Samarth Ops builds customised Android apps, business websites, e-commerce stores and custom software for businesses, from Pune.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <section className="bg-gradient-to-b from-[#EAF3FF] to-white">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
          <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-navy sm:text-5xl">
            Software and Digital Services for Your Business
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-ink">
            Customised Android apps, professional websites, online stores and business software, built around how
            your business works.
          </p>
          <div className="mt-8">
            <Button asChild size="xl">
              <Link href="/contact">
                Discuss Your Project <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Section title="What we build">
        <ul className="grid gap-4 sm:grid-cols-2">
          {servicePages.map((s) => (
            <li key={s.slug} className="flex flex-col rounded-xl border border-line bg-white p-6">
              <h2 className="text-xl font-semibold text-navy">{s.title}</h2>
              <p className="mt-2 flex-1 text-ink">{s.summary}</p>
              <p className="mt-4">
                <Link
                  href={`/services/${s.slug}`}
                  className="inline-flex items-center gap-1 font-medium text-brand-dark underline"
                  aria-label={`Learn more about ${s.title}`}
                >
                  Learn more <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </p>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="soft" title="How we work" intro="The same six steps on every project.">
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {approach.map((a, i) => (
            <li key={a.title} className="rounded-xl border border-line bg-white p-5">
              <p className="text-sm font-semibold text-brand-dark">Step {i + 1}</p>
              <h3 className="mt-1 text-lg font-semibold text-navy">{a.title}</h3>
              <p className="mt-2 text-sm text-ink">{a.text}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section title="Why Samarth Ops">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {whySamarth.map((w) => (
            <li key={w.title} className="rounded-xl border border-line p-5">
              <h3 className="font-semibold text-navy">{w.title}</h3>
              <p className="mt-2 text-sm text-ink">{w.text}</p>
            </li>
          ))}
        </ul>
        <p className="mt-8 text-ink">
          Looking for a ready product instead? See{" "}
          <Link href="/products/hrms" className="font-medium text-brand-dark underline">
            SamarthOps HRMS
          </Link>
          .
        </p>
      </Section>
    </>
  );
}
