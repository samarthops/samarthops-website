# samarthops.in

Public website of Samarth Ops: company site, SamarthOps HRMS product page and five concept demos.
Next.js (static export) on Cloudflare Pages. Plan: `docs/MASTER_PLAN.md`. Rules for AI agents: `CLAUDE.md`.

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
- `public/privacy.html`, `support.html`, `delete-data.html`, `style.css`: unchanged copies from the HRMS repository (`deployment/site/`). They are linked from the Google Play listing and must keep the paths `/privacy`, `/support`, `/delete-data` (200, no redirect). Do not edit them here; copy them again when the HRMS notice changes.
- `public/_headers`: Cloudflare Pages security and cache headers.
- `public/images/branding/`: logo files, never modified.
