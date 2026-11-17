import { pageMetadata } from "@/lib/seo";
import {
  privacyNoticeHtml,
  privacyNoticeVersion,
} from "@/content/privacy-notice";

export const metadata = pageMetadata({
  title: "Privacy notice",
  description:
    "How the SamarthOps HRMS app handles attendance, location and profile data.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-20">
      <h1 className="text-3xl font-bold tracking-tight text-navy sm:text-4xl">
        Privacy notice
      </h1>
      <p className="mt-3 text-ink">Version {privacyNoticeVersion}.</p>
      <div
        className="[&_a]:inline-block [&_a]:py-2 [&_a]:font-medium [&_a]:text-brand-dark [&_a]:underline [&_h2]:mt-8 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-navy [&_p]:mt-3 [&_p]:text-ink [&_strong]:font-semibold"
        dangerouslySetInnerHTML={{ __html: privacyNoticeHtml }}
      />
    </article>
  );
}
