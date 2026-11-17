# Deployment

How samarthops.in is built, hosted and released. The plan and decisions are in `docs/MASTER_PLAN.md` and `CLAUDE.md`. This file holds no secrets: variable names only.

## Overview

- Static Next.js export (`output: 'export'`, `trailingSlash: false`) served by **Cloudflare Pages**.
- One backend piece: the Pages Function `functions/api/contact.ts` (routed by `public/_routes.json` to `/api/*` only). It verifies Cloudflare Turnstile and sends one mail through Brevo.
- `main` deploys to production. Every other branch gets a preview URL. Nobody pushes to `main`; work goes through pull requests that the owner merges.

## Pages project settings

| Setting | Value |
| --- | --- |
| Git repository | `samarthops/samarthops-website` |
| Production branch | `main` |
| Build command | `npm run build` |
| Build output directory | `out` |
| Root directory | repository root |
| Node version | set `NODE_VERSION` to a current LTS in the project variables if the default is older than the one used locally |
| Functions | `functions/` is picked up automatically |

## Environment variables

Set in Cloudflare Pages > Settings > Variables and Secrets, for both **Production** and **Preview**. Names only here; `.env.example` lists the same names.

| Name | Kind | Purpose |
| --- | --- | --- |
| `BREVO_API_KEY` | secret | Brevo transactional mail API |
| `CONTACT_TO_EMAIL` | variable | mailbox that receives enquiries |
| `CONTACT_FROM_EMAIL` | variable | the verified Brevo sender |
| `TURNSTILE_SECRET_KEY` | secret | Turnstile server-side verification |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | variable | Turnstile widget key, embedded in the page at build time |
| `NEXT_PUBLIC_SITE_URL` | variable | canonical origin, no trailing slash (default `https://samarthops.in`) |

`NEXT_PUBLIC_*` values are read at **build** time, so changing one needs a new deployment. Without `NEXT_PUBLIC_TURNSTILE_SITE_KEY` the contact form is disabled and says so. Never commit real values; for local function tests use a git-ignored `.dev.vars`.

## Services outside this repository

- **Turnstile:** create a widget for `samarthops.in` and the preview hostnames (`*.pages.dev`), then copy the two keys into the variables above.
- **Brevo:** the sender `noreply@samarthops.in` is verified. Mailboxes are on Zoho (`support@samarthops.in` for the app, `enquiry@samarthops.in` for website enquiries), so never change MX, SPF, DKIM, DMARC or other TXT records from this project.
- **Analytics:** Cloudflare Web Analytics (cookie-free, so no cookie banner). Enable it in the Pages project; it needs no code change.
- **WhatsApp:** the number is set once in `src/config/site.ts` (`whatsappNumber`). While it is empty the floating button and WhatsApp links stay hidden.

## Release routine

1. Work on a branch (`phase/N-name`, `fix/...`, `docs/...`).
2. Before opening a pull request, all four pass locally:
   ```bash
   npm run lint
   npm run typecheck
   npm run build
   npx playwright test
   ```
3. Push the branch and open a pull request. Cloudflare builds a preview.
4. The owner reviews the preview and merges. The merge to `main` deploys production.
5. Run the production checks below.

## Production checks

After a production deploy:

- `https://samarthops.in/` answers 200 and shows the home page.
- `/privacy`, `/support` and `/delete-data` answer **200 with no redirect** and the expected text. They are linked from the Google Play listing of the HRMS app.
- `https://samarthops.in/sitemap.xml` and `/robots.txt` answer 200 and use the canonical origin.
- Response headers on a page include CSP, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy` and frame denial; HSTS is `max-age=86400` without `includeSubDomains` or `preload`.
- The contact form delivers a mail to `CONTACT_TO_EMAIL`, and shows the WhatsApp fallback when delivery fails.
- A test mail from another address reaches `enquiry@samarthops.in`.
- Lighthouse on mobile for Home, HRMS and Contact: 90+ for performance, accessibility, best practices and SEO.

## DNS cut-over (owner present, only on the owner's explicit "go")

Only the apex and `www` records change. MX, TXT, `api.samarthops.in` and `review.samarthops.in` are never touched.

1. **Backup:** export the Cloudflare DNS records of `samarthops.in` and note the current apex and `www` records (they point to the HRMS server).
2. **Attach domains:** add `samarthops.in` and `www.samarthops.in` as custom domains of the Pages project. Let Cloudflare replace only those two records.
3. **Redirect:** `www` to apex with a Cloudflare redirect rule (301, keep path and query).
4. **Check:**
   - `https://samarthops.in/`, `/privacy`, `/support`, `/delete-data` answer 200 with the expected text.
   - `https://www.samarthops.in/privacy` answers 301 to the apex.
   - `https://api.samarthops.in/` still answers as before.
   - A test mail to `enquiry@samarthops.in` arrives.
   - The contact form delivers.
5. **Rollback:** restore the two records from the backup. The HRMS server keeps serving the old pages until its apex site block is removed.
6. **Cleanup:** after a week without problems the HRMS repository (`samarthops/samarthops`) removes its apex site block and apex certificate renewal, in its own pull request.

Later (also on the owner's "go"): redirect `samarthops.com` and `www.samarthops.com` to `https://samarthops.in` (301, keep path and query). No email on `.com`.

## Updating the Play-linked pages

`/privacy`, `/support` and `/delete-data` are native pages (`src/app/<name>/page.tsx`), linked from the Google Play listing; keep their paths, 200 and no redirect. Only the privacy notice comes from the HRMS repository: when its version changes there, paste the new notice body into `src/content/privacy-notice.ts`, update the version, and run `tests/e2e/foundation.spec.ts` (compares the text with the HRMS checkout). Support and delete-data wording is owned here.

## Troubleshooting

- **Form says it is disabled:** `NEXT_PUBLIC_TURNSTILE_SITE_KEY` was missing at build time. Set it and redeploy.
- **Form fails after Turnstile passes:** check `BREVO_API_KEY`, `CONTACT_FROM_EMAIL` (must be a verified sender) and `CONTACT_TO_EMAIL` in the Pages variables. The function returns generic errors and never logs form contents.
- **`__next.*.txt` 404s in a local Windows export:** known, local only; confirm they do not appear on the preview.
- **Wrong canonical or sitemap URLs on a preview:** `NEXT_PUBLIC_SITE_URL` is set for Preview too, to the value you want in the markup.
