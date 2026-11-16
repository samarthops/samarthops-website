import { Mail, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContactForm } from "@/components/forms/contact-form";
import { whatsappMessages } from "@/data/enquiry";
import { whatsappUrl } from "@/lib/whatsapp";
import { pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site";

export const metadata = pageMetadata({
  title: "Contact Samarth Ops",
  description:
    "Tell Samarth Ops about your Android app, website or software project, or ask for a SamarthOps HRMS demo. Send an enquiry, message on WhatsApp or email.",
  path: "/contact",
});

export default function ContactPage() {
  const wa = whatsappUrl(whatsappMessages.other);

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
      <h1 className="text-3xl font-bold tracking-tight text-navy sm:text-4xl">Tell us about your project</h1>
      <p className="mt-3 max-w-2xl text-ink">
        Share a few details and we will get back to you. You can also reach us on WhatsApp or by e-mail.
      </p>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
        <ContactForm />

        <aside className="h-fit space-y-4 rounded-xl border border-line bg-soft p-6">
          <h2 className="text-lg font-semibold text-navy">Prefer to talk?</h2>
          {wa && (
            <Button asChild size="xl" className="w-full bg-[#0b7a5b] text-white hover:bg-[#09664b]">
              <a href={wa} rel="noopener noreferrer">
                <MessageCircle className="size-4" aria-hidden="true" /> Chat on WhatsApp
              </a>
            </Button>
          )}
          <p className="flex items-center gap-2 text-ink">
            <Mail className="size-4 shrink-0" aria-hidden="true" />
            <a href={`mailto:${siteConfig.enquiryEmail}`} className="font-medium text-brand-dark underline">
              {siteConfig.enquiryEmail}
            </a>
          </p>
          <p className="text-sm text-ink">
            Looking for help with the SamarthOps HRMS app? Visit the{" "}
            <a href="/support" className="font-medium text-brand-dark underline">
              support page
            </a>
            .
          </p>
        </aside>
      </div>
    </div>
  );
}
