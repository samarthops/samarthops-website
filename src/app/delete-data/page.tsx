import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site";

export const metadata = pageMetadata({
  title: "Delete my data",
  description:
    "How to ask for your SamarthOps HRMS attendance data to be deleted or corrected.",
  path: "/delete-data",
});

const link = "inline-block py-2 font-medium text-brand-dark underline";

export default function DeleteDataPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-20 [&_h2]:mt-8 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-navy [&_p]:mt-3 [&_p]:text-ink [&_li]:mt-2 [&_li]:text-ink [&_ol]:mt-3 [&_ol]:list-decimal [&_ol]:pl-5 [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:pl-5">
      <h1 className="text-3xl font-bold tracking-tight text-navy sm:text-4xl">
        Delete my data
      </h1>
      <p>
        Your attendance data belongs to your company. To ask for your data to be
        deleted or corrected:
      </p>
      <ol>
        <li>
          Ask your company&apos;s administrator, who can act on it in the app;
          or
        </li>
        <li>
          write to{" "}
          <a href={`mailto:${siteConfig.supportEmail}`} className={link}>
            {siteConfig.supportEmail}
          </a>{" "}
          with your name, your company and the e-mail address you sign in with.
        </li>
      </ol>
      <p>
        The company decides, because it may have a duty to keep some records.
        Backups age out after 56 days. See the{" "}
        <Link href="/privacy" className={link}>
          privacy notice
        </Link>
        , section &quot;Your rights and choices&quot;.
      </p>

      <h2>What to include in your e-mail</h2>
      <ul>
        <li>Your name and your company</li>
        <li>The e-mail address you sign in with</li>
        <li>
          Whether you want your data deleted or corrected, and what is wrong if
          corrected
        </li>
      </ul>
      <p>
        We reply within 24 working hours. We may ask you to confirm who you are
        before we act. Never send passwords, PINs or sign-in codes.
      </p>
      <p>
        Need help with something else? See{" "}
        <Link href="/support" className={link}>
          Support
        </Link>
        .
      </p>
    </article>
  );
}
