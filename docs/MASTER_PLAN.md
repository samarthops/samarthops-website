# samarthops.in: master plan

Status: approved by the owner on 16 Nov 2026 (decisions in `CLAUDE.md`). Revised from a ChatGPT draft by checking every claim against the HRMS repository. Work phase by phase (section 8); the owner approves each phase on its preview deployment before the next one starts.

## 1. Goal

A business owner who opens `https://samarthops.in` should understand within seconds that Samarth Ops:
1. has a real, working HRMS product they can see and ask a demo of;
2. builds custom Android apps, websites, e-commerce and business software;
3. can be reached at once on WhatsApp or through a short form.

Audience: owners and managers of small and mid-sized Indian businesses (field staff, factories, shops, clinics, schools, agencies). Language: plain English, Indian number and date formats.

## 2. Architecture

| Part | Choice | Notes |
|---|---|---|
| Framework | Next.js latest stable, App Router, TypeScript strict | `output: 'export'`, `trailingSlash: false`; server components by default, client components only for interaction |
| UI | Tailwind CSS, shadcn/ui, Lucide, Motion | design tokens from the brand colours in `CLAUDE.md`; restrained animation |
| Forms | React Hook Form + Zod | the same Zod schema validates in the browser and in the function |
| Contact form | Cloudflare Pages Function `functions/api/contact.ts` | verifies Turnstile, validates, sends one mail through the Brevo transactional API to `CONTACT_TO_EMAIL`, `replyTo` = the visitor; returns 200 only when Brevo accepted it |
| Spam | Cloudflare Turnstile + honeypot field + size limits | no captcha puzzles |
| Images | pre-optimised at build (WebP/AVIF, fixed sizes) | static export has no image server; `images.unoptimized: true` with already-sized files |
| Analytics | Cloudflare Web Analytics | cookie-free, so no cookie banner |
| Hosting | Cloudflare Pages, preview per branch, production from `main` | custom domains `samarthops.in` and `www.samarthops.in` |
| Headers | `public/_headers` | CSP, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, frame denial; HSTS short (`max-age=86400`) **without** `includeSubDomains` or `preload` (the HRMS hosts under `*.samarthops.in` must not be pinned from here) |
| Database | none | add one only for a real need (saved enquiries, customer accounts) and only with the owner's approval |

Keep business content out of components: typed data files in `src/data/` (services, HRMS features, demo projects) and site settings in `src/config/site.ts` (name, e-mail, WhatsApp number, social links).

## 3. Routes

| Route | Page |
|---|---|
| `/` | Home |
| `/services` | Services overview |
| `/services/android-app-development`, `/services/website-development`, `/services/ecommerce-development`, `/services/custom-software-development` | Service pages |
| `/products/hrms` | SamarthOps HRMS (`/products` redirects here while it is the only product) |
| `/portfolio` | Portfolio overview with industry filter |
| `/portfolio/foodnest`, `/portfolio/medicare`, `/portfolio/primeestate`, `/portfolio/shopease`, `/portfolio/brightfuture` | Concept demos, each with its own layout and identity |
| `/about`, `/contact` | About, Contact |
| `/privacy`, `/support`, `/delete-data` | **Existing Play-linked pages, copied unchanged** (see `CLAUDE.md`) |
| `/website-privacy`, `/terms` | Website enquiry privacy note; website terms of use |
| `/sitemap.xml`, `/robots.txt`, `404` | Generated |

## 4. Content

### 4.1 Home
- **Hero.** Headline "Transform Your Business Ideas Into Powerful Digital Solutions". Text: "From customised Android applications to professional websites and business management solutions, Samarth Ops helps businesses simplify operations and grow digitally." CTAs: "Discuss Your Project" (contact) and "Explore Our Work" (portfolio). Visual: phone mockup of the HRMS app plus a website preview. Do not show a web dashboard for the HRMS: its admin tools live inside the app.
- **Experience strip:** 8+ years of experience; 100+ customised apps and websites; business-focused development; affordable solutions.
- **Services:** Android apps, websites, e-commerce, custom software, business automation; each card links to its page.
- **Featured product:** SamarthOps HRMS, phone mockups with real screenshots, five key features, "Request HRMS demo".
- **Featured work:** the five concept demos, labelled "Concept demo", visibly separate from the real product.
- **Why Samarth Ops:** customised solutions, practical business understanding, modern development, affordable pricing, scalable architecture, technical support.
- **Final CTA:** "Have an Idea? Let's Build It Together." with WhatsApp and enquiry buttons.

### 4.2 SamarthOps HRMS (`/products/hrms`)
Headline "Manage Your Workforce. Simplify Your HR Operations." Text: "SamarthOps HRMS is an employee and workforce management app that simplifies attendance, employee tracking, shifts, leave, overtime and employee documents." Platform line: "Android app available. iOS coming soon."

**Published feature list (owner-approved as is):**
- Employee tracking with selfie and live location
- Multiple sites and work locations
- Shift management
- Attendance management and reports (CSV download)
- Overtime management
- Holiday calendar
- Leave requests, approvals and balances
- Attendance correction and overtime requests with approval
- Company announcements
- Salary slip generation
- Offer letter and increment letter generation
- Official employee documents, shared securely in the app
- Registered phones and blocking of lost devices

Sections: overview, key features, real screenshots, how it works (admin sets up sites and shifts, employees check in from their phone, admins approve and download reports), business benefits, suitable industries (manufacturing, construction and site work, security and facility services, retail, agencies, field teams), request a demo (form with "HRMS" preselected), FAQ. No pricing anywhere; "Request HRMS demo" and WhatsApp only.

Screenshots: real app screens with demo data only (review server demo company), phone frame, the same set also fills the missing Google Play listing screenshots. If they are not ready, use clearly labelled mockups and replace them before launch.

**Internal only, never on the site:** state of each item in the HRMS repository on 16 Nov 2026, so the team knows what a customer may ask to see.

| Published item | In the app today | If a customer asks |
|---|---|---|
| Salary slip generation | admins upload salary slips; employees view them in the app after release. Payroll from attendance is not built (upcoming feature 6) | build payroll and slip generation |
| Offer / increment letter generation | letters are uploaded documents; no letter generator | build letter templates |
| Live location | location at check-in and check-out; live location while checked in (company setting, off by default); background tracking built, switched off | enable or finish background tracking |
| Selfie | optional selfie at check-in and check-out (company setting); no face matching | keep wording as "selfie", never "face recognition" |
| iOS | code written, not released | release after Android production |
| Everything else in the list | built and live | demo it |

### 4.3 Services
One page per service: introduction, business problems solved, features and benefits, example use cases, development approach (discover, design, build, test, launch, support), FAQ, CTA. Contents:
- **Android apps:** business apps, employee management, attendance and tracking apps (link to the HRMS as proof), custom apps, integrations, maintenance.
- **Websites:** business, corporate, portfolio, landing pages, educational, service businesses.
- **E-commerce:** catalogue, cart, order management, payment gateway integration, product administration, storefronts.
- **Custom software:** business management systems, workflow automation, reporting dashboards, database-driven applications.

### 4.4 Portfolio and the five concept demos
Portfolio page: grid of five cards (preview image, name, industry, short description, "View demo", "Build something similar"), filter by industry. Every demo shows the concept-demo label from `CLAUDE.md` and a "Build something similar" button to the contact form with the industry preselected. All data fictional and local (TypeScript files); no real payments, no real health or personal data collected; demo forms end in an on-screen "demo submitted" state and send nothing.

| Demo | Industry | Must work |
|---|---|---|
| FoodNest | Restaurant, food ordering | menu by category, item detail, add/remove, quantity, cart total with tax and delivery, simulated order |
| ShopEase | E-commerce | catalogue, search, category and price filters, product detail, wishlist, cart, simulated checkout, order summary |
| MediCare Plus | Clinic, hospital | departments, doctor profiles, filter by department, pick an appointment slot, demo enquiry |
| PrimeEstate | Real estate | listings, search, price and location filters, detail with gallery, wishlist, schedule-a-visit demo |
| BrightFuture Academy | School, institute | courses, faculty, admissions, events and announcements, gallery, demo admission enquiry |

Each demo has its own fonts, colours, header and footer, so they do not look like one template. State (cart, wishlist) lives in the browser only (`localStorage`).

### 4.5 About
Headline "Your Technology Partner for Business Growth". Samarth Ops builds customised digital solutions; 8+ years; Android apps, websites, business software; affordable. Nothing about founders, team size, office or clients.

### 4.6 Contact
Fields: name, business name, mobile number, e-mail (optional), service (Android app, website, e-commerce, custom software, HRMS, other), project description; Turnstile; consent line linking `/website-privacy`. Next to the form: WhatsApp button with a message prefilled from the chosen service (for example "Hello Samarth Ops, I am interested in a customised website for my business. Please share more details."), e-mail `support@samarthops.in`. Floating WhatsApp button on every company page (not on the demos). Loading, error and success states; on any failure show the WhatsApp alternative.

### 4.7 Legal
`/privacy`, `/support`, `/delete-data`: copied unchanged from the HRMS repository. `/website-privacy`: what the form collects, that it is sent by e-mail (Brevo) to the firm's mailbox (Zoho) and not stored on the website, no cookies, how to ask for deletion. `/terms`: plain website terms of use. Footer links all five.

## 5. SEO
Unique title and description per page, canonical URLs on `https://samarthops.in`, Open Graph and Twitter cards with one share image per section, `sitemap.xml`, `robots.txt`, JSON-LD (`Organization`, `WebSite`, `SoftwareApplication` for the HRMS without price or rating, `Service` per service page). Semantic HTML, one `h1` per page, descriptive alt text. Keywords used naturally: software development company, Android app development, website development, custom software development, business website development, e-commerce website development, HRMS software, employee management app, attendance app. No invented address, rating or reviews. Demo pages carry `noindex` so fictional businesses do not appear in search.

## 6. Performance, accessibility, security
Mobile first; Lighthouse 90+ on mobile for performance, accessibility, best practices and SEO on Home, HRMS and Contact. Fonts self-hosted with `next/font`. WCAG AA contrast, keyboard navigation, visible focus, labelled form fields. Security headers as in section 2; the function accepts only POST JSON under 10 KB, validates with Zod, rejects without a valid Turnstile token, never logs form contents, and returns generic errors.

## 7. Folder structure

```
public/            images/{branding,hrms,portfolio,services}, _headers, favicon
src/app/           routes from section 3 (each demo has its own layout.tsx)
src/components/    layout/ common/ sections/ forms/ ui/ (shadcn)
src/features/      hrms/ portfolio/<demo>/ (demo components and state)
src/config/        site.ts, navigation.ts
src/data/          services.ts, hrms.ts, projects.ts, demos/<demo>.ts
src/lib/           validation (shared Zod schemas), whatsapp.ts, seo.ts
functions/api/     contact.ts (Cloudflare Pages Function)
tests/e2e/         Playwright specs per route group
docs/              MASTER_PLAN.md, DEPLOYMENT.md (written in phase 7)
```

## 8. Phases

Each phase is one branch and one pull request; it ends with lint, typecheck, build and Playwright passing on that branch, a preview URL, a list of files changed and anything incomplete.

| Phase | Deliverable | Exit check |
|---|---|---|
| 0. Setup | repository, Cloudflare Pages project connected to GitHub (owner), Turnstile site, Brevo key in Pages env vars (owner) | preview URL builds from a branch |
| 1. Foundation | Next.js app, tokens, shadcn, header, footer, floating WhatsApp, `site.ts`, legal pages copied, `_headers` | `/privacy`, `/support`, `/delete-data` match the live pages word for word |
| 2. Launch set | Home, HRMS page, Contact with working form, About, `/website-privacy`, `/terms`, SEO basics | form delivers a real mail to the owner's mailbox on preview; Lighthouse targets met |
| 3. Cut-over | DNS moves to Pages (section 9) | checks in section 9 pass |
| 4. Services | overview and four service pages | all links and CTAs work |
| 5. Portfolio + first demos | portfolio framework, FoodNest, ShopEase | all interactions in section 4.4 covered by Playwright |
| 6. Other demos | MediCare Plus, PrimeEstate, BrightFuture Academy | same |
| 7. Polish | structured data, image pass, accessibility pass, `docs/DEPLOYMENT.md`, README | acceptance criteria in section 10 |

The site goes live after phase 2 (via phase 3); services and demos follow on the live site.

## 9. DNS cut-over (phase 3, owner present, explicit "go")

1. Before: export the Cloudflare DNS records of `samarthops.in` (backup); note the current apex and `www` records (they point to the HRMS server).
2. Add `samarthops.in` and `www.samarthops.in` as custom domains of the Pages project; let Cloudflare replace **only** those two records. MX, TXT (SPF, DKIM, DMARC), `api` and `review` stay as they are.
3. `www` → apex: a Cloudflare redirect rule (301, keep path and query).
4. Checks: `https://samarthops.in/`, `/privacy`, `/support`, `/delete-data` answer 200 with the expected text; `https://www.samarthops.in/privacy` answers 301 to the apex; `https://api.samarthops.in/` still answers as before; a test mail to `support@samarthops.in` arrives; the contact form delivers.
5. Rollback: restore the two records from the backup (the HRMS server still serves the old pages until its site block is removed).
6. After a week without problems the HRMS repository removes its apex site block and apex certificate renewal (its own pull request and deploy).

## 10. Acceptance criteria
All routes in section 3 load on mobile and desktop with no console errors; no dead links or buttons; the five demos work as in section 4.4; the form delivers or falls back to WhatsApp honestly; the Play-linked pages are unchanged; SEO metadata, sitemap and robots present; Lighthouse targets met; `docs/DEPLOYMENT.md` and README complete; production deployment verified by the checks in section 9.

## 11. Needed from the owner
- Real HRMS screenshots with demo data (6 to 8 screens: Home with check-in, attendance list, report, leave request and approval, sites, shifts, documents, announcements); also used for the Play listing.
- Cloudflare: create the Pages project and the Turnstile site, or allow Claude to do it in the dashboard with the owner watching.
- Brevo API key entered by the owner into the Pages environment variables.
- The Google Play production link once the listing is public.
- Product name: "SamarthOps" is still under trademark clearance (HRMS repository PENDING row 38); the site uses it until told otherwise.
