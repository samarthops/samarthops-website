import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

/** The three app pages linked from the Google Play listing. They must keep these paths and answer 200 with no redirect. */
const PAGES = [
  { path: "/privacy", h1: "Privacy notice", text: "What we collect" },
  { path: "/support", h1: "Support", text: "We reply within 24 working hours" },
  {
    path: "/delete-data",
    h1: "Delete my data",
    text: "Backups age out after 56 days",
  },
] as const;

for (const p of PAGES) {
  test.describe(p.path, () => {
    test("answers 200 with no redirect and keeps its key content", async ({
      request,
    }) => {
      const res = await request.get(p.path, { maxRedirects: 0 });
      expect(res.status()).toBe(200);
      expect(await res.text()).toContain(p.text);
    });

    test("uses the site header, footer and shared app-pages navigation", async ({
      page,
    }) => {
      await page.goto(p.path);
      await expect(page.getByRole("heading", { level: 1 })).toHaveText(p.h1);
      await expect(page.getByRole("banner")).toBeVisible();
      const footer = page.getByRole("contentinfo");
      for (const name of [
        "Privacy notice",
        "Support",
        "Delete my data",
        "Website privacy",
        "Terms",
      ]) {
        await expect(
          footer.getByRole("link", { name, exact: true }),
        ).toBeVisible();
      }
      const nav = page.getByRole("navigation", { name: "App help and legal" });
      await expect(nav.getByText(p.h1, { exact: true })).toHaveAttribute(
        "aria-current",
        "page",
      );
    });

    test("has no horizontal scroll and no axe violations", async ({ page }) => {
      await page.goto(p.path);
      await page.waitForLoadState("networkidle");
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - window.innerWidth,
      );
      expect(overflow).toBeLessThanOrEqual(0);
      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
        .analyze();
      expect(results.violations.map((v) => v.id)).toEqual([]);
    });
  });
}

test("support page shows the contact email and the FAQ", async ({ page }) => {
  await page.goto("/support");
  await expect(
    page.getByRole("main").getByRole("link", { name: "support@samarthops.in" }),
  ).toBeVisible();
  await expect(page.getByText("I forgot my PIN.")).toBeVisible();
});

test("the header on the app pages reaches live site pages", async ({ page, isMobile }) => {
  test.skip(isMobile, "Header links sit behind the menu button on mobile");
  await page.goto("/support");
  await page
    .getByRole("banner")
    .getByRole("link", { name: "Services", exact: true })
    .click();
  await expect(page).toHaveURL(/\/services$/);
});
