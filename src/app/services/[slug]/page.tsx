import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/common/section";
import { JsonLd } from "@/components/common/json-ld";
import { approach, getServicePage, servicePages } from "@/data/services";
import { whatsappMessages } from "@/data/enquiry";
import { siteConfig } from "@/config/site";
import { whatsappUrl } from "@/lib/whatsapp";
import { pageMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return servicePages.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = getServicePage(slug);
  if (!page) return {};
  return pageMetadata({ title: page.seoTitle, description: page.seoDescription, path: `/services/${page.slug}` });
}

export default async function ServicePageRoute({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = getServicePage(slug);
  if (!page) notFound();

  const wa = whatsappUrl(whatsappMessages[page.formService]);
  const contactHref = `/contact?service=${page.formService}`;

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: page.headline,
          description: page.seoDescription,
          url: `${siteConfig.url}/services/${page.slug}`,
          areaServed: "India",
          provider: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
        }}
      />

      <section className="bg-gradient-to-b from-[#EAF3FF] to-white">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
          <nav aria-label="Breadcrumb" className="mb-4 text-sm text-ink">
            <Link href="/services" className="inline-block py-2 underline">
              Services
            </Link>{" "}
            / {page.title}
          </nav>
          <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-navy sm:text-5xl">{page.headline}</h1>
          <p className="mt-5 max-w-2xl text-lg text-ink">{page.intro}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="xl">
              <Link href={contactHref}>
                Discuss Your Project <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </Button>
            {wa && (
              <Button asChild size="xl" variant="outline">
                <a href={wa} rel="noopener noreferrer">
                  <MessageCircle className="size-4" aria-hidden="true" /> Chat on WhatsApp
                </a>
              </Button>
            )}
          </div>
        </div>
      </section>

      <Section title="Problems we solve">
        <ul className="grid gap-3 sm:grid-cols-2">
          {page.problems.map((p) => (
            <li key={p} className="rounded-xl border border-line p-4 text-ink">
              {p}
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="soft" title="Features and benefits">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {page.features.map((f) => (
            <li key={f.title} className="rounded-xl border border-line bg-white p-5">
              <h3 className="flex items-start gap-2 text-lg font-semibold text-navy">
                <Check className="mt-1 size-4 shrink-0 text-[#0b7a5b]" aria-hidden="true" /> {f.title}
              </h3>
              <p className="mt-2 text-sm text-ink">{f.text}</p>
            </li>
          ))}
        </ul>
        {page.proof && (
          <div className="mt-8 rounded-xl border border-line bg-white p-5">
            <p className="text-ink">{page.proof.text}</p>
            <p className="mt-3">
              <Link href={page.proof.href} className="inline-flex items-center gap-1 font-medium text-brand-dark underline">
                {page.proof.label} <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </p>
          </div>
        )}
      </Section>

      <Section title="Example use cases">
        <ul className="grid gap-3 sm:grid-cols-2">
          {page.useCases.map((u) => (
            <li key={u} className="rounded-xl border border-line p-4 text-ink">
              {u}
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="soft" title="How we work" intro="Six steps from first conversation to ongoing support.">
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

      <Section title="Frequently asked questions">
        <div className="max-w-3xl divide-y divide-line rounded-xl border border-line">
          {page.faqs.map((f) => (
            <details key={f.q} className="group p-4">
              <summary className="min-h-11 cursor-pointer py-2 font-medium text-navy">{f.q}</summary>
              <p className="mt-2 text-ink">{f.a}</p>
            </details>
          ))}
        </div>
      </Section>

      <Section tone="soft">
        <p className="text-ink">
          Not sure this is the right fit?{" "}
          <Link href={contactHref} className="inline-block py-2 font-medium text-brand-dark underline">
            Send an enquiry
          </Link>{" "}
          or{" "}
          <Link href="/services" className="inline-block py-2 font-medium text-brand-dark underline">
            see all services
          </Link>
          .
        </p>
      </Section>
    </>
  );
}
