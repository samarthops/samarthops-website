# samarthops.in

Public website of Samarth Ops: company site, SamarthOps HRMS product page and seven concept demos.
Next.js (static export) on Cloudflare Pages. Plan: `docs/MASTER_PLAN.md`. Deployment and DNS: `docs/DEPLOYMENT.md`. Open items: `docs/PENDING.md`. Rules for AI agents: `CLAUDE.md`.

## Setup

```bash
npm install
npx playwright install chromium   # once, for the e2e tests
```

Copy nothing secret into the repository. `.env.example` lists the variable names; real values go in
Cloudflare Pages (Settings > Variables and Secrets).

## Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Dev server. Note: `/privacy`, `/support` and `/delete-data` are static files in `public/` and only resolve on the built output, not in dev. |
| `npm run build` | Static export into `out/` |
| `npm start` | Serve `out/` locally on port 3000 |
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run test:e2e` | Playwright against `out/` (run `npm run build` first) |

## Where things live

- `src/config/site.ts`: site identity and the WhatsApp number (empty until the owner fills it in; the floating button and WhatsApp links stay hidden while it is empty).
- `src/config/navigation.ts`: header and footer links.
- `public/privacy.html`, `support.html`, `delete-data.html`, `style.css`, `fonts/`: copies of the HRMS repository pages (`deployment/site/`). The `<main>` text is identical to the source; only the header, footer and stylesheet are restyled to match the site (static HTML, self-hosted Inter). They are linked from the Google Play listing and must keep the paths `/privacy`, `/support`, `/delete-data` (200, no redirect). Never edit the `<main>` text here; when the HRMS notice changes, copy the new `<main>` block into these files and update the hashes in `tests/e2e/play-pages.spec.ts`.
- `src/app/`: pages (`/`, `/services` and four service pages, `/products/hrms`, `/portfolio` with seven concept demos, `/about`, `/contact`, `/website-privacy`, `/terms`), `robots.ts`, `sitemap.ts`. Every page sets its metadata through `pageMetadata()` in `src/lib/seo.ts`; add new pages to `sitemap.ts` and to the nav only when they ship (no dead links).
- `src/data/`: page content as data (`hrms.ts` approved feature catalogue, `services.ts`, `portfolio.ts` (the seven demos) and one data file per demo, `enquiry.ts` WhatsApp messages). All demo data is fictional.
- `src/components/common/`: `Section`, `Reveal` (motion, below the fold only), `PhoneMockup`/`BrowserMockup` (CSS mockups, labelled illustrative until real demo-data screenshots exist), `JsonLd`, `RouteJsonLd` (BreadcrumbList on inner pages, WebPage markup on the demos; the Organization, Service and SoftwareApplication blocks live in the layout and the service and HRMS pages).
- `src/components/demo/`: the concept demos and shared pieces (`DemoDialog`, `ArtTile`, `ConceptBanner`, `QtyStepper`). Each demo has its own fonts, colours, header and footer. They send nothing; state lives in React or, where the plan says so, localStorage (`src/lib/use-stored-state.ts`).
- `src/components/forms/`: `ContactForm` and the Cloudflare Turnstile widget. Without `NEXT_PUBLIC_TURNSTILE_SITE_KEY` the form is disabled and says so.
- `functions/api/contact.ts`: the only backend. A Pages Function that verifies Turnstile and sends mail through Brevo; returns `{ok:true}` only when Brevo accepts the mail. Needs `BREVO_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`, `TURNSTILE_SECRET_KEY` (set in Cloudflare Pages, names in `.env.example`). `public/_routes.json` limits Functions to `/api/*`.
- `public/_headers`: Cloudflare Pages security and cache headers.
- `public/images/branding/`: logo files, never modified.
- `tests/e2e/`: Playwright specs per phase. `phase7.spec.ts` checks JSON-LD, image attributes, keyboard skip link and runs axe (WCAG 2 A/AA) on every route.
