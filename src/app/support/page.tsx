import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site";
import { whatsappUrl } from "@/lib/whatsapp";

export const metadata = pageMetadata({
  title: "Support",
  description:
    "Get help with the SamarthOps HRMS app: sign-in codes, PIN, new phone and attendance questions.",
  path: "/support",
});

const link = "inline-block py-2 font-medium text-brand-dark underline";

export default function SupportPage() {
  const wa = whatsappUrl(
    "Hello Samarth Ops, I need help with the SamarthOps HRMS app.",
  );

  return (
    <article className="mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-20 [&_h2]:mt-10 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-navy [&_p]:mt-3 [&_p]:text-ink [&_li]:mt-2 [&_li]:text-ink [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:pl-5">
      <h1 className="text-3xl font-bold tracking-tight text-navy sm:text-4xl">
        Support
      </h1>
      <p>We reply within 24 working hours.</p>

      <h2>Contact us</h2>
      <p>
        Write to{" "}
        <a href={`mailto:${siteConfig.supportEmail}`} className={link}>
          {siteConfig.supportEmail}
        </a>
        .
      </p>
      <p>
        Please include your name, your company, the e-mail address you sign in
        with, the phone model, and what happened (a screenshot helps). Do not
        send passwords, PINs or sign-in codes.
      </p>
      <p>
        For questions about your own attendance record, your company&apos;s
        administrator can usually answer faster.
      </p>
      {wa && (
        <p>
          <Button asChild variant="outline">
            <a href={wa} rel="noopener noreferrer">
              <MessageCircle className="size-4" aria-hidden="true" /> Chat on
              WhatsApp
            </a>
          </Button>
        </p>
      )}

      <h2>Common questions</h2>
      <div className="mt-3 divide-y divide-line rounded-xl border border-line">
        {faqs.map((f) => (
          <details key={f.q} className="group p-4">
            <summary className="min-h-11 cursor-pointer py-2 font-medium text-navy">
              {f.q}
            </summary>
            <p className="mt-2 text-ink">{f.a}</p>
          </details>
        ))}
      </div>
    </article>
  );
}

const faqs = [
  {
    q: "I did not get my sign-in code.",
    a: "Check your spam folder. The code is valid for 15 minutes, and a new one can be requested only after that. If it still does not arrive, ask your company's administrator to clear the sign-in wait on your employee screen, or write to support.",
  },
  {
    q: "I forgot my PIN.",
    a: "Tap Forgot PIN. You are signed out. Sign in again with a code and choose a new PIN.",
  },
  {
    q: "I got a new phone.",
    a: "Ask your company's administrator to reset your device, then sign in again with a code.",
  },
  {
    q: "My attendance or check-in looks wrong.",
    a: "Your company's administrator manages attendance records and corrections. Write to support if they cannot resolve it.",
  },
  {
    q: "How do I delete or correct my data?",
    a: "Ask your company's administrator, or write to support. The Delete my data page explains the steps.",
  },
  {
    q: "How is my data used?",
    a: "The privacy notice explains what the app collects, why, who can see it and how long it is kept.",
  },
];
