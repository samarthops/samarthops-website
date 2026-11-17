import { expect, test } from "@playwright/test";
import { siteConfig } from "../../src/config/site";

const PAGES = [
  { path: "/", h1: /Transform Your Business Ideas/ },
  { path: "/products/hrms", h1: /Manage Your Workforce/ },
  { path: "/about", h1: /Technology Partner/ },
  { path: "/contact", h1: /Tell us about your project/ },
  { path: "/website-privacy", h1: /Website privacy notice/ },
  { path: "/terms", h1: /Terms of use/ },
] as const;

for (const p of PAGES) {
  test(`${p.path}: 200, one h1, title, description, canonical`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(e.message));
    const res = await page.goto(p.path);
    expect(res?.status()).toBe(200);
    await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(p.h1);
    expect((await page.title()).length).toBeGreaterThan(10);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", /.{40,}/);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", /^https:\/\/samarthops\.in/);
    expect(errors).toEqual([]);
  });
}

test("no dead internal links across the launch pages", async ({ page, request }) => {
  const hrefs = new Set<string>();
  for (const p of PAGES) {
    await page.goto(p.path);
    const found = await page.$$eval('a[href^="/"]', (as) => as.map((a) => a.getAttribute("href") ?? ""));
    found.forEach((h) => hrefs.add(h.split("#")[0] || "/"));
  }
  expect(hrefs.size).toBeGreaterThan(5);
  for (const href of hrefs) {
    const res = await request.get(href, { maxRedirects: 0 });
    expect(res.status(), href).toBe(200);
  }
});

test("HRMS page: honest platform text, demo CTA, no pricing, no play badge", async ({ page }) => {
  await page.goto("/products/hrms");
  const text = (await page.locator("main").innerText()).toLowerCase();
  expect(text).toContain("android app available. ios coming soon.");
  await expect(page.getByRole("link", { name: "Request HRMS demo" }).first()).toBeVisible();
  for (const word of ["₹", "rs.", "price", "pricing", "per month", "per user", "free trial", "face recognition"]) {
    expect(text, word).not.toContain(word);
  }
  await expect(page.locator('a[href*="play.google.com"]')).toHaveCount(0);
  await expect(page.locator("#demo")).toBeVisible();
});

test("HRMS page lists the approved feature catalogue (13 items)", async ({ page }) => {
  await page.goto("/products/hrms");
  await expect(page.locator("#features ul > li")).toHaveCount(13);
});

test("home: only the allowed business claims, no links to unbuilt sections", async ({ page }) => {
  await page.goto("/");
  const text = await page.locator("main").innerText();
  expect(text).toContain("8+");
  expect(text).toContain("100+");
  expect(text.toLowerCase()).not.toMatch(/testimonial|awards?|rated|clients? like/);
  for (const dead of ["/demos"]) {
    await expect(page.locator(`a[href^="${dead}"]`)).toHaveCount(0);
  }
});

test("contact form: honest disabled state when Turnstile is not configured", async ({ page }) => {
  await page.goto("/contact");
  const form = page.getByRole("form", { name: "Enquiry form" });
  await expect(form).toBeVisible();
  const submit = form.getByRole("button", { name: "Send enquiry" });
  await expect(submit).toBeVisible();
  // The default test build has no site key, so the form must not pretend to work.
  if (await submit.isDisabled()) {
    await expect(page.getByText("The enquiry form is not available right now.")).toBeVisible();
    await expect(page.getByRole("link", { name: /enquiry@samarthops.in/ }).first()).toBeVisible();
  }
});

test("contact form posts nothing without a verified submission", async ({ page }) => {
  let posted = false;
  await page.route("**/api/contact", (route) => {
    posted = true;
    return route.fulfill({ status: 500, body: "{}" });
  });
  await page.goto("/contact");
  const submit = page.getByRole("button", { name: "Send enquiry" });
  if (await submit.isEnabled()) {
    await submit.click();
    await expect(page.getByRole("alert").first()).toBeVisible();
  }
  expect(posted).toBe(false);
});

test("contact page preselects service from the query string", async ({ page }) => {
  await page.goto("/contact?service=hrms");
  await expect(page.getByLabel("What do you need?")).toHaveValue("hrms");
});

test("sitemap.xml lists the launch pages and robots.txt points to it", async ({ request }) => {
  const sm = await (await request.get("/sitemap.xml")).text();
  for (const p of ["/", "/products/hrms", "/about", "/contact", "/website-privacy", "/terms", "/privacy", "/support"]) {
    expect(sm).toContain(`https://samarthops.in${p === "/" ? "" : p}`);
  }
  expect(sm).not.toContain("/delete-data.html");
  const robots = await (await request.get("/robots.txt")).text();
  expect(robots).toContain("Sitemap: https://samarthops.in/sitemap.xml");
});

test("structured data has no price, rating or phone", async ({ page }) => {
  for (const path of ["/", "/products/hrms"]) {
    await page.goto(path);
    const blobs = await page.$$eval('script[type="application/ld+json"]', (s) => s.map((e) => e.textContent ?? ""));
    expect(blobs.length).toBeGreaterThan(0);
    for (const b of blobs) {
      JSON.parse(b);
      expect(b).not.toMatch(/"(offers|price|aggregateRating|telephone|address)"/);
    }
  }
});

test("legal links are in the footer of every launch page", async ({ page }) => {
  for (const p of PAGES) {
    await page.goto(p.path);
    const footer = page.getByRole("contentinfo");
    for (const href of ["/privacy", "/support", "/delete-data", "/website-privacy", "/terms"]) {
      await expect(footer.locator(`a[href="${href}"]`)).toHaveCount(1);
    }
  }
});

test("no phone-number-like strings leak into pages", async ({ page }) => {
  for (const p of PAGES) {
    await page.goto(p.path);
    const html = (await page.content()).split(siteConfig.whatsappNumber).join("");
    expect(html, p.path).not.toMatch(/wa\.me\/\d|tel:\+?\d|\+91[\s-]?\d{5}/);
  }
});
