import { pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site";

export const metadata = pageMetadata({
  title: "Website privacy notice",
  description:
    "How the Samarth Ops website handles the details you send through the enquiry form. This is separate from the SamarthOps HRMS app privacy notice.",
  path: "/website-privacy",
});

export default function WebsitePrivacyPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-20 [&_h2]:mt-8 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-navy [&_p]:mt-3 [&_p]:text-ink [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:text-ink [&_li]:mt-1">
      <h1 className="text-3xl font-bold tracking-tight text-navy sm:text-4xl">Website privacy notice</h1>
      <p>
        This notice covers the {siteConfig.name} website only. How the SamarthOps HRMS app handles personal data is
        explained in the{" "}
        <a href="/privacy" className="font-medium text-brand-dark underline">
          app privacy notice
        </a>
        .
      </p>

      <h2>What the enquiry form collects</h2>
      <ul>
        <li>Your name, and your business name if you give it</li>
        <li>Your mobile number, and your e-mail if you give it</li>
        <li>The service you are interested in and the project description you write</li>
      </ul>

      <h2>Why we use it</h2>
      <p>Only to reply to your enquiry and to discuss your project or demo request with you.</p>

      <h2>How it is sent and kept</h2>
      <p>
        The form sends your details by e-mail, through our e-mail provider Brevo, to the {siteConfig.name} mailbox.
        The website itself does not store enquiries in a database. Copies exist in that mailbox and in your
        correspondence with us until we delete them.
      </p>
      <p>
        The form uses Cloudflare Turnstile to tell people from automated bots. Turnstile may process technical
        information from your browser for that purpose. The website is hosted on Cloudflare.
      </p>

      <h2>Cookies</h2>
      <p>The website does not set cookies of its own and does not use advertising trackers.</p>

      <h2>Your choices</h2>
      <p>
        To ask what we hold about you, to correct it, or to have it deleted, write to{" "}
        <a href={`mailto:${siteConfig.supportEmail}`} className="font-medium text-brand-dark underline">
          {siteConfig.supportEmail}
        </a>
        .
      </p>
    </article>
  );
}
