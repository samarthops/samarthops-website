import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { createHash } from "node:crypto";

/** SHA-256 of the <main> block as copied from the HRMS repository. A change here means the wording changed. */
const PAGES = [
  { path: "/privacy", h1: "Privacy notice", main: "de4f05ef788d32428e6fd0db043ef7ce5d44c5b18ce5faaa2ddf3145f0901e20" },
  { path: "/support", h1: "Support", main: "0ef47706c217a8883c81975dbaedaefb869ea3cb390e8edc07071f27907dbe67" },
  { path: "/delete-data", h1: "Delete my data", main: "2af8ff7860804a3e99627d3bb563d7420354acc6dec07688e63121d0d1b515ff" },
] as const;

for (const p of PAGES) {
  test.describe(p.path, () => {
    test("answers 200 with no redirect and the wording is unchanged", async ({ request }) => {
      const res = await request.get(p.path, { maxRedirects: 0 });
      expect(res.status()).toBe(200);
      const html = (await res.text()).replace(/\r\n/g, "\n");
      const main = html.match(/<main>[\s\S]*?<\/main>/)![0];
      expect(createHash("sha256").update(main).digest("hex")).toBe(p.main);
    });

    test("uses the site header, footer and Inter font", async ({ page }) => {
      await page.goto(p.path);
      await expect(page.getByRole("heading", { level: 1 })).toHaveText(p.h1);
      const header = page.locator("header.site-header");
      await expect(header.getByRole("navigation", { name: "Main" })).toBeVisible();
      for (const name of ["Home", "Services", "SamarthOps HRMS", "Portfolio", "About", "Contact"]) {
        await expect(header.getByRole("link", { name, exact: true })).toBeVisible();
      }
      const footer = page.locator("footer.site-footer");
      for (const name of ["Privacy notice", "Support", "Delete my data", "Website privacy", "Terms"]) {
        await expect(footer.getByRole("link", { name, exact: true })).toBeVisible();
      }
      const font = await page.locator("h1").evaluate((e) => getComputedStyle(e).fontFamily);
      expect(font).toMatch(/Inter/);
      await expect.poll(() => page.evaluate(() => document.fonts.check("16px Inter"))).toBe(true);
    });

    test("has no horizontal scroll and no axe violations", async ({ page }) => {
      await page.goto(p.path);
      await page.waitForLoadState("networkidle");
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      expect(overflow).toBeLessThanOrEqual(0);
      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
        .analyze();
      expect(results.violations.map((v) => v.id)).toEqual([]);
    });
  });
}

test("header links from the legal pages reach live site pages", async ({ page }) => {
  await page.goto("/support");
  await page.locator("header.site-header").getByRole("link", { name: "Services", exact: true }).click();
  await expect(page).toHaveURL(/\/services$/);
});
