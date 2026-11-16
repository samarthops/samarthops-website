import Link from "next/link";
import { ArrowRight, Check, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/common/section";
import { Reveal } from "@/components/common/reveal";
import { BrowserMockup, PhoneMockup } from "@/components/common/mockups";
import { hrmsHighlights } from "@/data/hrms";
import { demoProjects } from "@/data/portfolio";
import { services, whySamarth } from "@/data/services";
import { whatsappMessages } from "@/data/enquiry";
import { whatsappUrl } from "@/lib/whatsapp";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Samarth Ops | Android apps, websites and business software from Pune",
  description:
    "Samarth Ops builds customised Android apps, websites and business software, and makes SamarthOps HRMS, an employee and workforce management app.",
  path: "/",
  absoluteTitle: true,
});

const strip = [
  { big: "8+", small: "years of experience" },
  { big: "100+", small: "customised Android apps and websites" },
  { big: "Business", small: "focused development" },
  { big: "Affordable", small: "solutions" },
];

export default function HomePage() {
  const wa = whatsappUrl(whatsappMessages.other);

  return (
    <>
      <section className="bg-gradient-to-b from-[#EAF3FF] to-white">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-navy sm:text-5xl">
              Transform Your Business Ideas Into Powerful Digital Solutions
            </h1>
            <p className="mt-5 max-w-xl text-lg text-ink">
              From customised Android applications to professional websites and business management solutions, Samarth
              Ops helps businesses simplify operations and grow digitally.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="xl">
                <Link href="/contact">
                  Discuss Your Project <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </Button>
              <Button asChild size="xl" variant="outline">
                <Link href="/products/hrms">See SamarthOps HRMS</Link>
              </Button>
            </div>
          </div>
          <div className="relative mx-auto flex max-w-sm items-end justify-center gap-4 lg:max-w-none">
            <PhoneMockup className="shrink-0" />
            <BrowserMockup className="hidden w-48 sm:block" />
          </div>
        </div>
      </section>

      <section aria-label="Experience" className="border-y border-line bg-white">
        <ul className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-4 py-8 sm:px-6 lg:grid-cols-4">
          {strip.map((s) => (
            <li key={s.big}>
              <p className="text-2xl font-bold text-navy">{s.big}</p>
              <p className="text-sm text-ink">{s.small}</p>
            </li>
          ))}
        </ul>
      </section>

      <Section
        id="services"
        title="What we build"
        intro="Customised digital solutions for businesses, designed around how you work."
      >
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <li key={s.title}>
              <Reveal className="h-full rounded-xl border border-line bg-white p-5">
                <h3 className="text-lg font-semibold text-navy">
                  <Link href={s.href} className="hover:text-brand-dark">
                    {s.title}
                  </Link>
                </h3>
                <p className="mt-2 text-sm text-ink">{s.text}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="soft">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-dark">Our product</p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-navy sm:text-3xl">SamarthOps HRMS</h2>
            <p className="mt-3 text-ink">
              An employee and workforce management app for attendance, shifts, leave, overtime and employee documents.
              Android app available, iOS coming soon.
            </p>
            <ul className="mt-5 space-y-2">
              {hrmsHighlights.map((h) => (
                <li key={h} className="flex items-start gap-2 text-ink">
                  <Check className="mt-0.5 size-4 shrink-0 text-[#0b7a5b]" aria-hidden="true" />
                  {h}
                </li>
              ))}
            </ul>
            <Button asChild size="xl" className="mt-7">
              <Link href="/products/hrms#demo">Request HRMS demo</Link>
            </Button>
          </div>
          <PhoneMockup />
        </div>
      </Section>

      <Section
        id="portfolio"
        title="See what we can build"
        intro="Concept demos you can try right now, each with its own design."
      >
        <ul className="grid gap-4 sm:grid-cols-2">
          {demoProjects.map((d) => (
            <li key={d.slug} className="rounded-xl border border-line bg-white p-5">
              <p className="text-xs font-semibold tracking-wide text-brand-dark uppercase">{d.industry}</p>
              <h3 className="mt-1 text-lg font-semibold text-navy">
                <Link href={`/portfolio/${d.slug}`} className="hover:text-brand-dark">
                  {d.name}
                </Link>
              </h3>
              <p className="mt-2 text-sm text-ink">{d.summary}</p>
            </li>
          ))}
        </ul>
        <Button asChild variant="outline" size="xl" className="mt-6">
          <Link href="/portfolio">View all demos</Link>
        </Button>
      </Section>

      <Section id="why" tone="soft" title="Why Samarth Ops">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {whySamarth.map((w) => (
            <li key={w.title}>
              <Reveal className="h-full rounded-xl border border-line p-5">
                <h3 className="font-semibold text-navy">{w.title}</h3>
                <p className="mt-2 text-sm text-ink">{w.text}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </Section>

      <section className="bg-navy py-14 text-white sm:py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Have an Idea? Let&apos;s Build It Together.</h2>
          <p className="mt-3 text-white/90">Tell us what you need. We will get back to you.</p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Button asChild size="xl" variant="secondary">
              <Link href="/contact">Send an enquiry</Link>
            </Button>
            {wa && (
              <Button asChild size="xl" className="bg-[#0b7a5b] text-white hover:bg-[#09664b]">
                <a href={wa} rel="noopener noreferrer">
                  <MessageCircle className="size-4" aria-hidden="true" /> Chat on WhatsApp
                </a>
              </Button>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
