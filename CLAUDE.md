# samarthops.in website: context for Claude Code

Keep this file under 150 lines: rules and decisions only. The full build plan is `docs/MASTER_PLAN.md`; read the section for the phase you are working on.

## What this is

The public website of **Samarth Ops** (software development firm, Pune) at `https://samarthops.in` (`www` redirects to the apex). It has two jobs:
1. Sell the firm's real product, the **SamarthOps HRMS** app (built in the separate repository `samarthops/samarthops`), through a "Request demo" flow.
2. Win custom Android app, website and software work, shown through five clearly labelled concept demos.

Stack: Next.js (App Router, `output: 'export'`, static) + TypeScript strict + Tailwind CSS + shadcn/ui + Lucide + Motion; React Hook Form + Zod; Playwright, ESLint, `tsc --noEmit`. Hosting: **Cloudflare Pages**; the contact form is one Pages Function (`functions/api/contact.ts`) that verifies Cloudflare Turnstile and sends mail through **Brevo**. No database, no server, no other backend.

## Owner decisions (16 Nov 2026, do not reopen)

- Hosting is Cloudflare Pages, not Vercel (Vercel's free plan is non-commercial; DNS is already on Cloudflare).
- Mail: Brevo sends (sender `noreply@samarthops.in`, already verified); mailboxes are Zoho (`support@samarthops.in`). No Resend, no new mail vendor.
- The WhatsApp number is published on the site (floating button, contact page, footer). It is set once in `src/config/site.ts`; never repeat it in docs, commits or chat.
- Business claims allowed on the site: **8+ years of experience** and **100+ customised Android apps and websites**. No other numbers, no client names, logos, testimonials, ratings, awards, team size or address.
- HRMS page: pricing is never shown; every CTA is "Request HRMS demo" or WhatsApp.
- HRMS platforms: **Android available**, **iOS coming soon**. A Google Play badge links only once the production listing is public (check before adding it).
- HRMS feature list: the full catalogue list in `docs/MASTER_PLAN.md` section 4 is approved for publishing as is. Some items are built on demand when a customer asks (internal table in that section); never mark them on the site as "coming soon" unless the owner says so.
- The five demos are **concept demos** with the label: "Concept demonstration developed by Samarth Ops. This project showcases our design and development capabilities and is not presented as a completed client engagement."

## URLs that must never break

`/privacy`, `/support` and `/delete-data` are linked from the Google Play listing of the HRMS app and are served today by the HRMS server. They keep exactly these paths, answer **200** (no redirect), and keep their content:
- `/privacy` is the app's privacy notice, copied from the HRMS repository (`deployment/site/privacy.html`, which is rendered from `backend/app/content/privacy_notice.md`). Never rewrite it here; when the notice version changes there, copy it again.
- `/support` and `/delete-data`: same, from `deployment/site/`.
- The website's own data handling (enquiry form) is a separate page, `/website-privacy`.

No `/privacy-policy`, no `.html` URLs, `trailingSlash: false`.

## Working rules (follow exactly)

1. **Never push to `main`.** One branch per phase (`phase/N-name`, `fix/...`, `docs/...`), push it, open a pull request; the owner reviews the preview deployment and merges.
2. **Stage explicit paths only**; never `git add -A` or `git add .`.
3. **No secrets in the repository, chat or logs.** Keys live in Cloudflare Pages environment variables; `.env.example` lists names only. Never read or print `.env*` files other than `.env.example`.
4. **Do not invent business information.** If a fact is not in this file or `docs/MASTER_PLAN.md`, ask the owner.
5. **Never use real people's data.** HRMS screenshots come from the review server's demo company or a demo setup, never from the live server or a real employee. Demo sites use fictional people, prices and places.
6. **No fake success.** The form shows success only after Brevo accepted the mail; on failure it offers WhatsApp.
7. **Before reporting a phase done:** `npm run lint`, `npm run typecheck`, `npm run build`, `npx playwright test` all pass; list files changed; say plainly what is incomplete. Wait for the owner's approval before the next phase.
8. **DNS changes only on the owner's explicit "go"** in the current conversation, and only the apex and `www` records. Never touch MX, SPF, DKIM, DMARC or other TXT records (Zoho and Brevo), nor `api.samarthops.in` and `review.samarthops.in` (the HRMS servers).
9. Confirm before anything destructive or outward-facing (deleting, force push, publishing, sending mail to real addresses).
10. Pronouns: they/them for people unless told otherwise.
11. Do not modify the logo; use the files in `public/images/branding/` (copied from the HRMS repository `branding/assets/`).

## Brand

Colours (same as the HRMS app, `branding/Samarth-Ops-brand-colors.txt` in the HRMS repository): primary blue `#0070FF`, primary dark `#0057D9`, navy `#082878`, teal green `#10B981`, light blue `#EAF3FF`, white `#FFFFFF`, text `#0F172A`, muted `#64748B`, border `#DCE6F3`, warning `#F59E0B`, error `#EF4444`. Blue dominant, green as accent. Name in text: "Samarth Ops" for the firm, "SamarthOps HRMS" for the product.

## Environment variables (names only)

`BREVO_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`, `TURNSTILE_SECRET_KEY`, `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `NEXT_PUBLIC_SITE_URL`.

## Related repository

`samarthops/samarthops` (HRMS backend and app, separate process and rules). Facts about the app come from its `docs/SPEC.md` and `docs/upcoming-features.md`; changes there are not made from this repository. After the DNS cut-over that repository must drop its apex site block and the apex certificate renewal (tracked there).
