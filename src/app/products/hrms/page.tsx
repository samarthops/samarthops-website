import Link from "next/link";
import { Check, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/common/section";
import { Reveal } from "@/components/common/reveal";
import { PhoneMockup } from "@/components/common/mockups";
import { JsonLd } from "@/components/common/json-ld";
import { ContactForm } from "@/components/forms/contact-form";
import { hrmsBenefits, hrmsFaq, hrmsFeatures, hrmsIndustries, hrmsSteps } from "@/data/hrms";
import { whatsappMessages } from "@/data/enquiry";
import { whatsappUrl } from "@/lib/whatsapp";
import { pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site";

export const metadata = pageMetadata({
  title: "SamarthOps HRMS: attendance, shifts, leave and employee management app",
  description:
    "SamarthOps HRMS is an employee and workforce management app for attendance with selfie and live location, shifts, leave, overtime and employee documents. Android available, iOS coming soon.",
  path: "/products/hrms",
});

const appLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: siteConfig.productName,
  applicationCategory: "BusinessApplication",
  operatingSystem: "Android",
  description:
    "Employee and workforce management app for attendance, employee tracking, shifts, leave, overtime and employee documents.",
  url: `${siteConfig.url}/products/hrms`,
  publisher: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
};

export default function HrmsPage() {
  const wa = whatsappUrl(whatsappMessages.hrms);

  return (
    <>
      <JsonLd data={appLd} />

      <section className="bg-gradient-to-b from-[#EAF3FF] to-white">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-navy sm:text-5xl">
              Manage Your Workforce. Simplify Your HR Operations.
            </h1>
            <p className="mt-5 max-w-xl text-lg text-ink">
              SamarthOps HRMS is an employee and workforce management app that simplifies attendance, employee tracking,
              shifts, leave, overtime and employee documents.
            </p>
            <p className="mt-3 font-semibold text-navy">Android app available. iOS coming soon.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="xl">
                <a href="#demo">Request HRMS demo</a>
              </Button>
              {wa && (
                <Button asChild size="xl" variant="outline">
                  <a href={wa} rel="noopener noreferrer">
                    <MessageCircle className="size-4" aria-hidden="true" /> WhatsApp us
                  </a>
                </Button>
              )}
            </div>
          </div>
          <PhoneMockup />
        </div>
      </section>

      <Section
        id="overview"
        title="One app for your people and your sites"
        intro="Employees check in from their phone. Admins see who is where, approve requests and download reports."
      >
        <ul className="grid gap-4 sm:grid-cols-3">
          {hrmsSteps.map((s, i) => (
            <li key={s.title} className="rounded-xl border border-line p-5">
              <span className="flex size-8 items-center justify-center rounded-full bg-brand-dark text-sm font-bold text-white">
                {i + 1}
              </span>
              <h3 className="mt-3 font-semibold text-navy">{s.title}</h3>
              <p className="mt-1 text-sm text-ink">{s.text}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="features" tone="soft" title="Key features">
        <ul className="grid gap-3 sm:grid-cols-2">
          {hrmsFeatures.map((f) => (
            <li key={f}>
              <Reveal className="flex h-full items-start gap-3 rounded-xl border border-line bg-white p-4">
                <Check className="mt-0.5 size-5 shrink-0 text-[#0b7a5b]" aria-hidden="true" />
                <span className="text-ink">{f}</span>
              </Reveal>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="benefits" title="Why teams use it">
        <ul className="grid gap-3 sm:grid-cols-2">
          {hrmsBenefits.map((b) => (
            <li key={b} className="flex items-start gap-3 text-ink">
              <Check className="mt-0.5 size-5 shrink-0 text-[#0b7a5b]" aria-hidden="true" />
              {b}
            </li>
          ))}
        </ul>
      </Section>

      <Section id="industries" tone="soft" title="Built for teams that work across places">
        <ul className="flex flex-wrap gap-2">
          {hrmsIndustries.map((i) => (
            <li key={i} className="rounded-full border border-line bg-white px-4 py-1.5 text-sm text-ink">
              {i}
            </li>
          ))}
        </ul>
      </Section>

      <Section
        id="demo"
        title="Request HRMS demo"
        intro="Tell us about your team and we will get back to you to arrange a demo."
        className="max-w-3xl"
      >
        <ContactForm defaultService="hrms" idPrefix="demo" />
      </Section>

      <Section id="faq" tone="soft" title="Frequently asked questions" className="max-w-3xl">
        <dl className="space-y-5">
          {hrmsFaq.map((f) => (
            <div key={f.q}>
              <dt className="font-semibold text-navy">{f.q}</dt>
              <dd className="mt-1 text-ink">
                {f.a}
              </dd>
            </div>
          ))}
        </dl>
        <p className="mt-6 text-sm text-ink">
          <Link href="/contact" className="font-medium text-brand-dark underline">
            Other questions? Contact us.
          </Link>
        </p>
      </Section>
    </>
  );
}
