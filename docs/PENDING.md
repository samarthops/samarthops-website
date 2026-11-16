# Pending items

Open work that is not part of the current phase. Remove an item when it is done.

## Content and config
- **enquiry@ mailbox:** the website now shows `enquiry@samarthops.in` (footer, Contact, form, /terms, /website-privacy, JSON-LD; `siteConfig.enquiryEmail`). Confirm the mailbox exists in Zoho before the DNS cut-over.
  - `public/privacy.html`, `public/support.html`, `public/delete-data.html` still show `support@`. They are Play-linked and come from the HRMS repository, so any change starts there.
- **Audit items not done yet** (from the duplicate-content audit; each is a content decision):
  - Closing CTA block ("Have an Idea?") repeats on home and every service page; "How we work" and the "why" proof repeat between /services and the service pages.
  - The "What do you need from me to get started?" FAQ is identical on all four service pages (`startFaq` in `src/data/services.ts`).
  - "Affordable" and "Technical support" are each said twice on /services/custom-software-development and the home page.
  - `/products` has no page or redirect (MASTER_PLAN lists a redirect to `/products/hrms`).
  - Service pages show a text breadcrumb without BreadcrumbList markup; the 404 page inherits the root canonical.
- `siteConfig.whatsappNumber` is empty, so WhatsApp buttons are hidden until the owner fills it in.
- Share image is the Play banner (temporary).
- Home hero secondary CTA points to HRMS; no featured-work section until phases 4-6.


## Assets
- HRMS screenshots are CSS mockups; replace with demo-data screenshots from the review server's demo company.

## Checks
- Phase 2 exit: real mail on the preview, Lighthouse 90+ mobile on Home, HRMS and Contact. Local run on the static export (plain `serve`, no compression or cache headers) on 16 Nov 2026: accessibility 100, SEO 100, best practices 96 to 100, performance 79 (Home), 84 (HRMS), 81 (Contact). Re-measure on the Cloudflare preview; performance needs 90+ there.
- Confirm the `__next.*.txt` 404s seen on the local Windows export do not appear on the preview.

## DNS (owner's explicit "go" only)
- Phase 3b: redirect `samarthops.com` and `www.samarthops.com` to `https://samarthops.in` (301, keep path and query). No email on `.com`.
