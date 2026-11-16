import { expect, test } from "@playwright/test";

const SERVICE_PAGES = [
  { path: "/services/android-app-development", h1: /Android App Development/, service: "android" },
  { path: "/services/website-development", h1: /Website Development/, service: "website" },
  { path: "/services/ecommerce-development", h1: /E-commerce Website Development/, service: "ecommerce" },
  { path: "/services/custom-software-development", h1: /Custom Software Development/, service: "custom-software" },
] as const;

const ALL = [{ path: "/services", h1: /Software and Digital Services/ }, ...SERVICE_PAGES] as const;

for (const p of ALL) {
  test(`${p.path}: 200, one h1, metadata, no console errors`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(e.message));
    const res = await page.goto(p.path);
    expect(res?.status()).toBe(200);
    await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(p.h1);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", /.{40,}/);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", `https://samarthops.in${p.path}`);
    expect(errors).toEqual([]);
  });
}

test("every link on the services pages resolves", async ({ page, request }) => {
  const hrefs = new Set<string>();
  for (const p of ALL) {
    await page.goto(p.path);
    const found = await page.$$eval('a[href^="/"]', (as) => as.map((a) => a.getAttribute("href") ?? ""));
    found.forEach((h) => hrefs.add(h.split("#")[0].split("?")[0] || "/"));
  }
  for (const href of hrefs) {
    const res = await request.get(href, { maxRedirects: 0 });
    expect(res.status(), href).toBe(200);
  }
});

test("overview lists all four services and links to each page", async ({ page }) => {
  await page.goto("/services");
  for (const s of SERVICE_PAGES) {
    await expect(page.locator(`main a[href="${s.path}"]`)).toHaveCount(1);
  }
  await page.locator(`main a[href="${SERVICE_PAGES[1].path}"]`).click();
  await expect(page).toHaveURL(SERVICE_PAGES[1].path);
});

test("home service cards and header link to the service pages", async ({ page }) => {
  await page.goto("/");
  for (const s of SERVICE_PAGES) {
    await expect(page.locator(`#services a[href="${s.path}"]`)).toHaveCount(1);
  }
  await expect(page.locator('header a[href="/services"]')).not.toHaveCount(0);
  await expect(page.locator('footer a[href="/services"]')).toHaveCount(1);
});

for (const s of SERVICE_PAGES) {
  test(`${s.path}: CTA opens the contact form with the service preselected`, async ({ page }) => {
    await page.goto(s.path);
    await page.getByRole("link", { name: /Discuss Your Project/ }).click();
    await expect(page).toHaveURL(new RegExp(`/contact\\?service=${s.service}`));
    await expect(page.getByLabel("What do you need?")).toHaveValue(s.service);
  });
}

test("FAQ answers expand", async ({ page }) => {
  await page.goto(SERVICE_PAGES[0].path);
  const first = page.locator("details").first();
  await expect(first).not.toHaveAttribute("open", "");
  await first.locator("summary").click();
  await expect(first).toHaveAttribute("open", "");
});

test("Android page links to the HRMS as proof", async ({ page }) => {
  await page.goto(SERVICE_PAGES[0].path);
  await page.getByRole("link", { name: "See SamarthOps HRMS" }).click();
  await expect(page).toHaveURL(/\/products\/hrms$/);
});

test("service pages carry Service JSON-LD and no pricing", async ({ page }) => {
  for (const s of SERVICE_PAGES) {
    await page.goto(s.path);
    const blocks = await page.locator('script[type="application/ld+json"]').allTextContents();
    expect(blocks.map((b) => JSON.parse(b)["@type"])).toContain("Service");
    const text = await page.locator("main").innerText();
    expect(text).not.toMatch(/₹|Rs\.?\s?\d|\bINR\b/);
  }
});

test("sitemap lists the services pages", async ({ request }) => {
  const xml = await (await request.get("/sitemap.xml")).text();
  for (const p of ALL) expect(xml).toContain(`https://samarthops.in${p.path}`);
});
