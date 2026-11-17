"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useForm, useWatch, type Resolver } from "react-hook-form";
import { CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Turnstile } from "@/components/forms/turnstile";
import { whatsappMessages } from "@/data/enquiry";
import { siteConfig } from "@/config/site";
import { whatsappUrl } from "@/lib/whatsapp";
import { SERVICES, type ServiceValue } from "@/lib/services";
import { getDemo, similarMessage } from "@/data/portfolio";
import type { ContactInput } from "@/lib/contact-schema";

const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";

/** Loads zod and the schema on first validation, so they stay out of the initial page JS. */
const lazyZodResolver: Resolver<ContactInput> = async (values, context, options) => {
  const [{ zodResolver }, { contactSchema }] = await Promise.all([
    import("@hookform/resolvers/zod"),
    import("@/lib/contact-schema"),
  ]);
  return zodResolver(contactSchema)(values, context, options) as ReturnType<Resolver<ContactInput>>;
};

type Status = "idle" | "sending" | "success" | "error" | "verification";

const field =
  "block w-full rounded-lg border border-line bg-white px-3 py-2.5 text-base text-ink placeholder:text-subtle focus-visible:border-brand-dark focus-visible:ring-2 focus-visible:ring-brand-dark/30 focus-visible:outline-none aria-[invalid=true]:border-error";

function Label({ htmlFor, children, optional }: { htmlFor: string; children: React.ReactNode; optional?: boolean }) {
  return (
    <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium text-ink">
      {children}
      {optional && <span className="font-normal text-ink"> (optional)</span>}
    </label>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="mt-1 text-sm text-[#b91c1c]">
      {message}
    </p>
  );
}

export function ContactForm({
  defaultService,
  idPrefix = "contact",
}: {
  defaultService?: ServiceValue;
  idPrefix?: string;
}) {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    reset,
    formState: { errors, isSubmitted },
  } = useForm<ContactInput>({
    resolver: lazyZodResolver,
    defaultValues: {
      name: "",
      business: "",
      phone: "",
      email: "",
      service: defaultService,
      message: "",
      website: "",
      turnstileToken: "",
    },
  });

  const [status, setStatus] = useState<Status>("idle");
  const [resetKey, setResetKey] = useState(0);
  const [captchaBroken, setCaptchaBroken] = useState(false);
  const service = useWatch({ control, name: "service" });
  const token = useWatch({ control, name: "turnstileToken" });
  const id = (name: string) => `${idPrefix}-${name}`;

  // Preselect from ?service=... on the contact page (static export: read it in the browser).
  useEffect(() => {
    if (defaultService) return;
    const params = new URLSearchParams(window.location.search);
    const param = params.get("service");
    if (param && SERVICES.some((s) => s.value === param)) {
      setValue("service", param as ServiceValue);
    }
    // "Build something similar" from a portfolio demo: start the message for the visitor.
    const demo = getDemo(params.get("demo") ?? "");
    if (demo) setValue("message", similarMessage(demo));
  }, [defaultService, setValue]);

  const disabled = !SITE_KEY || captchaBroken;
  const waLink = whatsappUrl(whatsappMessages[service ?? "other"]);

  async function onSubmit(values: ContactInput) {
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const body = (await res.json().catch(() => null)) as { ok?: boolean; error?: string } | null;
      if (res.ok && body?.ok === true) {
        setStatus("success");
        reset();
        return;
      }
      setStatus(body?.error === "verification" ? "verification" : "error");
    } catch {
      setStatus("error");
    }
    setResetKey((k) => k + 1);
  }

  if (status === "success") {
    return (
      <div role="status" className="rounded-xl border border-line bg-soft p-6">
        <CheckCircle2 className="mb-3 size-8 text-[#0b7a5b]" aria-hidden="true" />
        <h3 className="text-xl font-bold text-navy">Thank you, we have received your enquiry</h3>
        <p className="mt-2 text-ink">We will get back to you on the mobile number you gave.</p>
        <Button className="mt-5" variant="outline" onClick={() => setStatus("idle")}>
          Send another enquiry
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5" aria-label="Enquiry form">
      {disabled && (
        <div role="status" className="rounded-lg border border-warning bg-[#FFF8EB] p-4 text-sm text-ink">
          The enquiry form is not available right now.{" "}
          {waLink ? (
            <>
              Please{" "}
              <a href={waLink} className="inline-block py-2 font-semibold text-brand-dark underline" rel="noopener noreferrer">
                message us on WhatsApp
              </a>{" "}
              or{" "}
            </>
          ) : (
            "Please "
          )}
          email{" "}
          <a href={`mailto:${siteConfig.enquiryEmail}`} className="inline-block py-2 font-semibold text-brand-dark underline">
            {siteConfig.enquiryEmail}
          </a>
          .
        </div>
      )}

      <fieldset disabled={disabled || status === "sending"} className="space-y-5">
        <div>
          <Label htmlFor={id("name")}>Your name</Label>
          <input
            id={id("name")}
            autoComplete="name"
            className={field}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? id("name-err") : undefined}
            {...register("name")}
          />
          <FieldError id={id("name-err")} message={errors.name?.message} />
        </div>

        <div>
          <Label htmlFor={id("business")} optional>
            Business name
          </Label>
          <input
            id={id("business")}
            autoComplete="organization"
            className={field}
            aria-invalid={!!errors.business}
            aria-describedby={errors.business ? id("business-err") : undefined}
            {...register("business")}
          />
          <FieldError id={id("business-err")} message={errors.business?.message} />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <Label htmlFor={id("phone")}>Mobile number</Label>
            <input
              id={id("phone")}
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              className={field}
              aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? id("phone-err") : undefined}
              {...register("phone")}
            />
            <FieldError id={id("phone-err")} message={errors.phone?.message} />
          </div>
          <div>
            <Label htmlFor={id("email")} optional>
              E-mail
            </Label>
            <input
              id={id("email")}
              type="email"
              autoComplete="email"
              className={field}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? id("email-err") : undefined}
              {...register("email")}
            />
            <FieldError id={id("email-err")} message={errors.email?.message} />
          </div>
        </div>

        <div>
          <Label htmlFor={id("service")}>What do you need?</Label>
          <select
            id={id("service")}
            className={field}
            aria-invalid={!!errors.service}
            aria-describedby={errors.service ? id("service-err") : undefined}
            defaultValue={defaultService ?? ""}
            {...register("service")}
          >
            <option value="" disabled>
              Choose one
            </option>
            {SERVICES.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
          <FieldError id={id("service-err")} message={errors.service?.message} />
        </div>

        <div>
          <Label htmlFor={id("message")}>Tell us about your project</Label>
          <textarea
            id={id("message")}
            rows={5}
            className={field}
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? id("message-err") : undefined}
            {...register("message")}
          />
          <FieldError id={id("message-err")} message={errors.message?.message} />
        </div>

        {/* Honeypot: hidden from people and assistive tech; bots fill it. */}
        <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
          <label htmlFor={id("website")}>Leave this empty</label>
          <input id={id("website")} tabIndex={-1} autoComplete="off" {...register("website")} />
        </div>

        <div>
          <label className="flex items-start gap-2.5 text-sm text-ink">
            <input
              type="checkbox"
              className="mt-0.5 size-4 shrink-0 accent-[#0057D9]"
              aria-invalid={!!errors.consent}
              aria-describedby={errors.consent ? id("consent-err") : undefined}
              {...register("consent")}
            />
            <span>
              I agree that Samarth Ops may use these details to reply to my enquiry, as described in the{" "}
              <Link href="/website-privacy" className="inline-block py-2 font-medium text-brand-dark underline">
                website privacy notice
              </Link>
              .
            </span>
          </label>
          <FieldError id={id("consent-err")} message={errors.consent?.message} />
        </div>

        {SITE_KEY && (
          <div>
            <Turnstile
              siteKey={SITE_KEY}
              resetKey={resetKey}
              onToken={(t) => setValue("turnstileToken", t, { shouldValidate: isSubmitted })}
              onUnavailable={() => setCaptchaBroken(true)}
            />
            {errors.turnstileToken && !token && (
              <FieldError id={id("captcha-err")} message="Please complete the check above" />
            )}
          </div>
        )}
      </fieldset>

      {status === "verification" && (
        <p role="alert" className="rounded-lg border border-error bg-[#FEF2F2] p-3 text-sm text-ink">
          The security check did not pass. Please try again.
        </p>
      )}

      {status === "error" && (
        <div role="alert" className="rounded-lg border border-error bg-[#FEF2F2] p-4 text-sm text-ink">
          <p className="font-semibold">We could not send your enquiry.</p>
          <p className="mt-1">
            Your details are still in the form, so you can try again.{" "}
            {waLink && (
              <>
                You can also{" "}
                <a href={waLink} className="inline-block py-2 font-semibold text-brand-dark underline" rel="noopener noreferrer">
                  message us on WhatsApp
                </a>{" "}
                or{" "}
              </>
            )}
            email{" "}
            <a href={`mailto:${siteConfig.enquiryEmail}`} className="inline-block py-2 font-semibold text-brand-dark underline">
              {siteConfig.enquiryEmail}
            </a>
            .
          </p>
        </div>
      )}

      <Button type="submit" size="xl" disabled={disabled || status === "sending"}>
        {status === "sending" ? (
          <>
            <Loader2 className="size-4 animate-spin" aria-hidden="true" />
            Sending…
          </>
        ) : (
          "Send enquiry"
        )}
      </Button>
    </form>
  );
}
