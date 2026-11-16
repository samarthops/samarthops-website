import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

const ROUTES = [
  "/",
  "/services",
  "/services/android-app-development",
  "/services/website-development",
  "/products/hrms",
  "/portfolio",
  "/portfolio/foodnest",
  "/portfolio/shopease",
  "/portfolio/medicare-plus",
  "/portfolio/primeestate",
  "/portfolio/brightfuture",
  "/about",
  "/contact",
  "/website-privacy",
  "/terms",
];

const DEMOS = ["foodnest", "shopease", "medicare-plus", "primeestate", "brightfuture"];

type JsonBlock = { "@type"?: string; [key: string]: unknown };

async function jsonLd(page: Page): Promise<JsonBlock[]> {
  const raw = await page.locator('script[type="application/ld+json"]').allTextContents();
  // Flatten @graph so Organization and WebSite are visible as top-level blocks.
  return raw.flatMap((r) => {
    const block = JSON.parse(r) as JsonBlock;
    return Array.isArray(block["@graph"]) ? (block["@graph"] as JsonBlock[]) : [block];
  });
}

test("home has Organization and WebSite markup and no breadcrumb", async ({ page }) => {
  await page.goto("/");
  const types = (await jsonLd(page)).map((b) => b["@type"]);
  expect(types).toContain("Organization");
  expect(types).toContain("WebSite");
  expect(types).not.toContain("BreadcrumbList");
});

test("every inner page has a valid BreadcrumbList that ends at the page itself", async ({ page }) => {
  for (const route of ROUTES.filter((r) => r !== "/")) {
    await page.goto(route);
    const crumbs = (await jsonLd(page)).filter((b) => b["@type"] === "BreadcrumbList");
    expect(crumbs, route).toHaveLength(1);
    const items = crumbs[0].itemListElement as { position: number; name: string; item: string }[];
    expect(items[0]).toMatchObject({ position: 1, name: "Home", item: "https://samarthops.in" });
    expect(items.map((i) => i.position)).toEqual(items.map((_, i) => i + 1));
    expect(items.at(-1)!.item, route).toBe(`https://samarthops.in${route}`);
    for (const i of items) expect(i.name.length).toBeGreaterThan(0);
  }
});

test("HRMS crumb skips the non-existent /products page", async ({ page }) => {
  await page.goto("/products/hrms");
  const crumb = (await jsonLd(page)).find((b) => b["@type"] === "BreadcrumbList")!;
  expect((crumb.itemListElement as { item: string }[]).map((i) => i.item)).toEqual([
    "https://samarthops.in",
    "https://samarthops.in/products/hrms",
  ]);
});

for (const slug of DEMOS) {
  test(`/portfolio/${slug}: WebPage markup says concept demo, with no ratings or client claims`, async ({ page }) => {
    await page.goto(`/portfolio/${slug}`);
    const blocks = await jsonLd(page);
    const web = blocks.find((b) => b["@type"] === "WebPage")!;
    expect(web).toBeTruthy();
    expect(web.url).toBe(`https://samarthops.in/portfolio/${slug}`);
    expect(web.description).toContain("Concept demonstration developed by Samarth Ops");
    const text = JSON.stringify(blocks);
    expect(text).not.toMatch(/aggregateRating|ratingValue|"review"|testimonial/i);
  });
}

test("service and HRMS markup are still present", async ({ page }) => {
  await page.goto("/services/website-development");
  expect((await jsonLd(page)).map((b) => b["@type"])).toContain("Service");
  await page.goto("/products/hrms");
  expect((await jsonLd(page)).map((b) => b["@type"])).toContain("SoftwareApplication");
});

test("images: every <img> has alt text, dimensions and a real source", async ({ page }) => {
  for (const route of ROUTES) {
    await page.goto(route);
    const imgs = await page.locator("img").evaluateAll((els) =>
      els.map((e) => {
        const i = e as HTMLImageElement;
        return {
          alt: i.getAttribute("alt"),
          width: i.getAttribute("width"),
          height: i.getAttribute("height"),
          src: i.getAttribute("src"),
        };
      }),
    );
    for (const i of imgs) {
      expect(i.alt, `${route} ${i.src}`).not.toBeNull();
      expect(i.width && i.height, `${route} ${i.src}`).toBeTruthy();
      expect(i.src, route).toBeTruthy();
    }
  }
});

for (const route of ROUTES) {
  test(`axe (WCAG 2 A/AA): ${route} has no violations`, async ({ page }) => {
    await page.goto(route);
    await page.waitForLoadState("networkidle");
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();
    const summary = results.violations.map((v) => ({
      id: v.id,
      impact: v.impact,
      nodes: v.nodes.slice(0, 3).map((n) => n.target.join(" ")),
    }));
    expect(summary).toEqual([]);
  });
}

test("keyboard: skip link is first, visible on focus, and moves to main", async ({ page }) => {
  await page.goto("/about");
  await page.keyboard.press("Tab");
  const skip = page.getByRole("link", { name: "Skip to content" });
  await expect(skip).toBeFocused();
  await expect(skip).toBeVisible();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/#main$/);
});
