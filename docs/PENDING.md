# Pending items

Open work that is not part of the current phase. Remove an item when it is done.

## Content and config
- **Contact page email:** change the displayed address from `support@samarthops.in` to `enquiry@samarthops.in`.
  - Where it shows today: `src/app/contact/page.tsx`, `src/components/forms/contact-form.tsx` (two places), all read `siteConfig.supportEmail` in `src/config/site.ts`.
  - Decide first: footer, `/terms`, `/website-privacy` and the JSON-LD also use `supportEmail`. Add a separate `enquiryEmail` for the Contact page only, or change them all.
  - Do not touch `public/privacy.html`, `public/support.html`, `public/delete-data.html` (Play-linked, keep `support@`).
  - Update the assertion in `tests/e2e/phase2.spec.ts` (line ~78) to match.
- `siteConfig.whatsappNumber` is empty, so WhatsApp buttons are hidden until the owner fills it in.
- Share image is the Play banner (temporary).
- Home hero secondary CTA points to HRMS; no featured-work section until phases 4-6.

- **Play-linked pages styling:** `/privacy`, `/support` and `/delete-data` (static `public/*.html`) do not use the site's CSS and formatting (header, footer, fonts, colours), so they look different from the rest of the site. Update the look only.
  - Constraints: keep the exact paths, status 200 (no redirect), and the wording word for word (the notice is copied from the HRMS repository and never rewritten here).
  - Decide first: keep them as static HTML with the brand stylesheet added, or render them inside the Next.js layout. The second must still output the same text and the same paths with `trailingSlash: false`.
  - Re-run the word-for-word test in `tests/e2e/` after the change.

## Assets
- HRMS screenshots are CSS mockups; replace with demo-data screenshots from the review server's demo company.

## Checks
- Phase 2 exit: real mail on the preview, Lighthouse 90+ mobile on Home, HRMS and Contact. Local run on the static export (plain `serve`, no compression or cache headers) on 16 Nov 2026: accessibility 100, SEO 100, best practices 96 to 100, performance 79 (Home), 84 (HRMS), 81 (Contact). Re-measure on the Cloudflare preview; performance needs 90+ there.
- Confirm the `__next.*.txt` 404s seen on the local Windows export do not appear on the preview.

## DNS (owner's explicit "go" only)
- Phase 3b: redirect `samarthops.com` and `www.samarthops.com` to `https://samarthops.in` (301, keep path and query). No email on `.com`.
