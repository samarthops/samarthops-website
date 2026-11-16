import { readFileSync } from "node:fs";
import path from "node:path";
import { expect, test } from "@playwright/test";

const LEGAL = ["privacy", "support", "delete-data"] as const;

test("home renders header, footer and no console errors", async ({ page }) => {
  const errors: string[] = [];
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
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

  test(`/${slug} is an unchanged copy of the HRMS file`, async () => {
    const source = path.resolve(__dirname, "../../../samarthops/deployment/site", `${slug}.html`);
    let expected: Buffer;
    try {
      expected = readFileSync(source);
    } catch {
      test.skip(true, "HRMS repository not checked out next to this one");
      return;
    }
    const actual = readFileSync(path.resolve(__dirname, "../../public", `${slug}.html`));
    expect(actual.equals(expected)).toBe(true);
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

test("WhatsApp button is hidden while no number is configured", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByTestId("whatsapp-button")).toHaveCount(0);
});

test("mobile menu opens", async ({ page, isMobile }) => {
  test.skip(!isMobile, "mobile only");
  await page.goto("/");
  await page.getByRole("button", { name: "Open menu" }).click();
  await expect(page.getByRole("navigation", { name: "Mobile" })).toBeVisible();
});
