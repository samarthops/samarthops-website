import { readFileSync } from "node:fs";
import path from "node:path";
import { expect, test } from "@playwright/test";

const LEGAL = ["privacy", "support", "delete-data"] as const;

test("home renders header, footer and no console errors", async ({ page }) => {
  const errors: string[] = [];
  // Next prefetches route payloads (__next.*.txt). A local Windows export lays them out differently from
  // the Linux build Cloudflare runs, so those prefetch misses are ignored; any other failed load is an error.
  page.on("console", (m) => m.type() === "error" && !m.text().startsWith("Failed to load resource") && errors.push(m.text()));
  page.on("response", (r) => r.status() >= 400 && !/__next\..*\.txt/.test(r.url()) && errors.push(`${r.status()} ${r.url()}`));
  page.on("pageerror", (e) => errors.push(e.message));

  const res = await page.goto("/");
  expect(res?.status()).toBe(200);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.getByRole("banner")).toBeVisible();
  await expect(page.getByRole("contentinfo")).toBeVisible();
  expect(errors).toEqual([]);
});

for (const slug of LEGAL) {
  test(`/${slug} answers 200 without redirect`, async ({ request }) => {
    const res = await request.get(`/${slug}`, { maxRedirects: 0 });
    expect(res.status()).toBe(200);
    expect(res.headers()["content-type"]).toContain("text/html");
  });
}

test("footer links the three Play-listing pages", async ({ page }) => {
  await page.goto("/");
  const footer = page.getByRole("contentinfo");
  for (const slug of LEGAL) {
    await expect(footer.locator(`a[href="/${slug}"]`)).toHaveCount(1);
  }
});

test("unknown URL shows the 404 page", async ({ page }) => {
  await page.goto("/does-not-exist");
  await expect(page.getByRole("heading", { name: "Page not found" })).toBeVisible();
});

test("no /privacy-policy and no .html URL in the navigation", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator('a[href*="privacy-policy"], a[href$=".html"]')).toHaveCount(0);
});

test("WhatsApp button shows once a number is configured", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByTestId("whatsapp-button")).toBeVisible();
});

test("mobile menu opens", async ({ page, isMobile }) => {
  test.skip(!isMobile, "mobile only");
  await page.goto("/");
  await page.getByRole("button", { name: "Open menu" }).click();
  await expect(page.getByRole("navigation", { name: "Mobile" })).toBeVisible();
});

test("/privacy has the same notice text as the HRMS file", async () => {
  const source = path.resolve(__dirname, "../../../samarthops/deployment/site", "privacy.html");
  let expected: string;
  try {
    expected = readFileSync(source, "utf8");
  } catch {
    test.skip(true, "HRMS repository not checked out next to this one");
    return;
  }
  const lf = (t: string) => t.split("\r\n").join("\n");
  // Body of the notice: everything after the version line up to </main>.
  const hrms = lf(expected).match(/<p>Version [^<]*<\/p>\n([\s\S]*?)\n<\/main>/)?.[1].trim();
  const mine = lf(readFileSync(path.resolve(__dirname, "../../src/content/privacy-notice.ts"), "utf8"));
  const mineBody = mine.match(/privacyNoticeHtml = `\n([\s\S]*?)\n`;/)?.[1].trim();
  expect(mineBody).toBeTruthy();
  // Compare the wording only: paragraph markup may differ (a <br> in the HRMS file became separate paragraphs here).
  const words = (h?: string) => h?.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
  expect(words(mineBody)).toBe(words(hrms));
});
