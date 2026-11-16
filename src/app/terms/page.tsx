import { pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site";

export const metadata = pageMetadata({
  title: "Terms of use",
  description: "Terms for using the Samarth Ops website.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-20 [&_h2]:mt-8 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-navy [&_p]:mt-3 [&_p]:text-ink">
      <h1 className="text-3xl font-bold tracking-tight text-navy sm:text-4xl">Terms of use</h1>
      <p>These terms apply to your use of the {siteConfig.name} website. By using the website you accept them.</p>

      <h2>About the content</h2>
      <p>
        The website describes our services and the SamarthOps HRMS app for general information. Descriptions are not an
        offer or a contract. Any work we do for you is agreed separately and in writing.
      </p>

      <h2>Enquiries</h2>
      <p>
        Please give accurate details when you send an enquiry. Sending an enquiry does not create an obligation for
        either side. See the{" "}
        <a href="/website-privacy" className="font-medium text-brand-dark underline">
          website privacy notice
        </a>{" "}
        for how your details are handled.
      </p>

      <h2>Acceptable use</h2>
      <p>
        Do not misuse the website, for example by trying to disrupt it, send automated or harmful submissions through
        the enquiry form, or access parts of it you are not meant to reach.
      </p>

      <h2>Intellectual property</h2>
      <p>
        The content, design and branding of this website belong to {siteConfig.name} unless stated otherwise. Do not
        copy or reuse them without permission.
      </p>

      <h2>Concept demonstrations</h2>
      <p>
        Where the website shows concept demonstrations, they showcase our design and development capabilities and are
        not presented as completed client engagements.
      </p>

      <h2>Liability</h2>
      <p>
        We try to keep the website accurate and available but provide it as is. To the extent the law allows, we are not
        liable for loss arising from its use.
      </p>

      <h2>Changes and contact</h2>
      <p>
        We may update these terms; the version on this page applies. Questions:{" "}
        <a href={`mailto:${siteConfig.supportEmail}`} className="font-medium text-brand-dark underline">
          {siteConfig.supportEmail}
        </a>
        .
      </p>
    </article>
  );
}
