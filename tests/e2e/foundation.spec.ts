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

  test(`/${slug} has the same text as the HRMS file (header, footer and styling may differ)`, async () => {
    const source = path.resolve(__dirname, "../../../samarthops/deployment/site", `${slug}.html`);
    let expected: Buffer;
    try {
      expected = readFileSync(source);
    } catch {
      test.skip(true, "HRMS repository not checked out next to this one");
      return;
    }
    const actual = readFileSync(path.resolve(__dirname, "../../public", `${slug}.html`));
    // Git on Windows may check the file out with CRLF; the committed blob is LF like the source.
    const lf = (b: Buffer) => b.toString("utf8").split("\r\n").join("\n");
    // Only the page chrome (header, footer, stylesheet) is restyled here; the <main> text must match the source.
    const main = (b: Buffer) => lf(b).match(/<main>[\s\S]*?<\/main>/)?.[0];
    expect(main(actual)).toBeTruthy();
    expect(main(actual)).toBe(main(expected));
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
