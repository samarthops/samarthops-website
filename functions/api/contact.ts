/**
 * Cloudflare Pages Function: POST /api/contact
 * Verifies Cloudflare Turnstile, validates with the shared Zod schema and sends
 * one mail through the Brevo transactional API. Nothing is stored. Form contents
 * are never logged and errors are generic.
 */
import { MAX_BODY_BYTES, contactSchema, serviceLabel } from "../../src/lib/contact-schema";

interface Env {
  BREVO_API_KEY?: string;
  CONTACT_TO_EMAIL?: string;
  CONTACT_FROM_EMAIL?: string;
  TURNSTILE_SECRET_KEY?: string;
}

type Ctx = { request: Request; env: Env };

const JSON_HEADERS = { "Content-Type": "application/json", "Cache-Control": "no-store" };

function reply(status: number, error?: "invalid" | "verification" | "unavailable"): Response {
  const body = error ? { ok: false, error } : { ok: true };
  return new Response(JSON.stringify(body), { status, headers: JSON_HEADERS });
}

const oneLine = (s: string) => s.replace(/[\r\n]+/g, " ").trim();

async function verifyTurnstile(token: string, secret: string, ip: string | null): Promise<boolean> {
  const body = new URLSearchParams({ secret, response: token });
  if (ip) body.set("remoteip", ip);
  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body,
  });
  if (!res.ok) return false;
  const data = (await res.json()) as { success?: boolean };
  return data.success === true;
}

export const onRequestPost = async ({ request, env }: Ctx): Promise<Response> => {
  if (!env.BREVO_API_KEY || !env.CONTACT_TO_EMAIL || !env.CONTACT_FROM_EMAIL || !env.TURNSTILE_SECRET_KEY) {
    return reply(503, "unavailable");
  }
  if (!(request.headers.get("Content-Type") ?? "").toLowerCase().includes("application/json")) {
    return reply(415, "invalid");
  }
  const declared = Number(request.headers.get("Content-Length") ?? "0");
  if (declared > MAX_BODY_BYTES) return reply(413, "invalid");

  const raw = await request.text();
  if (new TextEncoder().encode(raw).length > MAX_BODY_BYTES) return reply(413, "invalid");

  let json: unknown;
  try {
    json = JSON.parse(raw);
  } catch {
    return reply(400, "invalid");
  }
  const parsed = contactSchema.safeParse(json);
  if (!parsed.success) return reply(400, "invalid");
  const d = parsed.data;

  let human = false;
  try {
    human = await verifyTurnstile(d.turnstileToken, env.TURNSTILE_SECRET_KEY, request.headers.get("CF-Connecting-IP"));
  } catch {
    return reply(502, "unavailable");
  }
  if (!human) return reply(400, "verification");

  const text = [
    `Service: ${serviceLabel(d.service)}`,
    `Name: ${d.name}`,
    `Business: ${d.business || "-"}`,
    `Mobile: ${d.phone}`,
    `E-mail: ${d.email || "-"}`,
    "",
    d.message,
    "",
    "Sent from the samarthops.in enquiry form.",
  ].join("\n");

  try {
    const res = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: { "api-key": env.BREVO_API_KEY, "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        sender: { name: "Samarth Ops website", email: env.CONTACT_FROM_EMAIL },
        to: [{ email: env.CONTACT_TO_EMAIL }],
        ...(d.email ? { replyTo: { email: d.email, name: oneLine(d.name) } } : {}),
        subject: oneLine(`New enquiry: ${serviceLabel(d.service)} from ${d.name}`).slice(0, 150),
        textContent: text,
      }),
    });
    // Success only when Brevo accepted the mail (201 Created).
    return res.status === 201 ? reply(200) : reply(502, "unavailable");
  } catch {
    return reply(502, "unavailable");
  }
};

export const onRequest = async (): Promise<Response> =>
  new Response(JSON.stringify({ ok: false, error: "invalid" }), {
    status: 405,
    headers: { ...JSON_HEADERS, Allow: "POST" },
  });
