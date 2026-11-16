import { expect, test, type Page } from "@playwright/test";

const LABEL = "Concept demonstration developed by Samarth Ops.";

const DEMOS = [
  { path: "/portfolio/voltcare", slug: "voltcare", name: "VoltCare Services", h1: /Electrical and electronics repair/, font: /Sora/ },
  { path: "/portfolio/torquetech", slug: "torquetech", name: "TorqueTech Components", h1: /Precision parts, made to your drawing/i, font: /Oswald/ },
] as const;

/** Demos must send nothing: record any write request. */
function watchWrites(page: Page) {
  const writes: string[] = [];
  page.on("request", (r) => {
    if (["POST", "PUT", "PATCH", "DELETE"].includes(r.method())) writes.push(`${r.method()} ${r.url()}`);
  });
  return writes;
}

for (const d of DEMOS) {
  test.describe(d.name, () => {
    test(`${d.path}: 200, one h1, metadata, concept label, nav, footer, own font, no console errors`, async ({ page }) => {
      const errors: string[] = [];
      page.on("pageerror", (e) => errors.push(e.message));
      const res = await page.goto(d.path);
      expect(res?.status()).toBe(200);
      await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
      await expect(page.getByRole("heading", { level: 1 })).toHaveText(d.h1);
      await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", /.{40,}/);
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", `https://samarthops.in${d.path}`);
      await expect(page.getByTestId("concept-label").first()).toContainText(LABEL);
      await expect(page.getByRole("navigation", { name: d.name })).toBeVisible();
      await expect(page.locator("footer").filter({ hasText: "fictional" }).last()).toContainText(LABEL);
      const family = await page.getByRole("heading", { level: 1 }).evaluate((el) => getComputedStyle(el).fontFamily);
      expect(family).toMatch(d.font);
      expect(errors).toEqual([]);
    });

    test("Build something similar opens the contact form prefilled", async ({ page }) => {
      await page.goto(d.path);
      await page.getByRole("link", { name: "Build something similar" }).click();
      await expect(page).toHaveURL(new RegExp(`/contact\\?service=website&demo=${d.slug}`));
      await expect(page.getByLabel("What do you need?")).toHaveValue("website");
      await expect(page.getByLabel("Tell us about your project")).toHaveValue(new RegExp(d.name));
    });
  });
}

test("home, portfolio and sitemap list seven demos including the two new ones", async ({ page, request }) => {
  await page.goto("/");
  for (const d of DEMOS) await expect(page.locator(`#portfolio a[href="${d.path}"]`)).toHaveCount(1);

  await page.goto("/portfolio");
  const cards = page.getByTestId("portfolio-cards").locator("> li");
  await expect(cards).toHaveCount(7);
  for (const [industry, name] of [
    ["Electronics services", "VoltCare Services"],
    ["Manufacturing", "TorqueTech Components"],
  ]) {
    await page.getByRole("button", { name: industry, exact: true }).click();
    await expect(cards).toHaveCount(1);
    await expect(cards.first()).toContainText(name);
  }
  await page.getByRole("button", { name: "All", exact: true }).click();
  await expect(cards).toHaveCount(7);
  await page.getByRole("link", { name: "View demo: VoltCare Services" }).click();
  await expect(page).toHaveURL(/\/portfolio\/voltcare$/);

  const xml = await (await request.get("/sitemap.xml")).text();
  for (const d of DEMOS) expect(xml).toContain(`https://samarthops.in${d.path}`);
});

test("every link on the two new demo pages resolves", async ({ page, request }) => {
  const hrefs = new Set<string>();
  for (const d of DEMOS) {
    await page.goto(d.path);
    const found = await page.$$eval('a[href^="/"]', (as) => as.map((a) => a.getAttribute("href") ?? ""));
    found.forEach((h) => hrefs.add(h.split("#")[0].split("?")[0] || "/"));
  }
  for (const href of hrefs) {
    const res = await request.get(href, { maxRedirects: 0 });
    expect(res.status(), href).toBe(200);
  }
});

test.describe("VoltCare Services", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/portfolio/voltcare");
  });

  test("services filter by category and search, with a count and an empty state", async ({ page }) => {
    const count = page.getByTestId("vc-count");
    await expect(page.getByTestId("vc-service")).toHaveCount(10);
    for (const [cat, n] of [
      ["Cooling", 2],
      ["Power backup", 2],
      ["Wiring", 2],
      ["Appliances", 3],
      ["Security", 1],
    ] as const) {
      await page.getByRole("button", { name: cat, exact: true }).click();
      await expect(page.getByTestId("vc-service")).toHaveCount(n);
      await expect(count).toHaveText(n === 1 ? "1 service" : `${n} services`);
    }
    await page.getByRole("button", { name: "All", exact: true }).click();
    await page.getByRole("searchbox", { name: "Search services" }).fill("rewiring");
    await expect(page.getByTestId("vc-service")).toHaveCount(1);
    await page.getByRole("searchbox", { name: "Search services" }).fill("zzzz");
    await expect(page.getByTestId("vc-service")).toHaveCount(0);
    await expect(page.getByTestId("vc-empty")).toBeVisible();
  });

  test("Book this preselects the service and the booking confirms on screen, sending nothing", async ({ page }) => {
    const writes = watchWrites(page);
    await page.getByRole("button", { name: "Appliances", exact: true }).click();
    await page.getByRole("link", { name: "Book this: Refrigerator repair" }).click();
    const form = page.getByRole("form", { name: "Book a visit" });
    await expect(form.getByLabel("Service")).toHaveValue("fridge");

    await form.getByLabel("Your name").fill("Test Person");
    await form.getByRole("button", { name: "Confirm demo booking" }).click();
    await expect(page.getByTestId("vc-confirmation")).toHaveCount(0);

    await form.getByLabel("Phone number").fill("9000000000");
    await form.getByLabel("Area").selectOption("Riverside");
    await form.getByLabel("Day").selectOption("Tomorrow");
    await form.getByLabel("Time slot").selectOption("Evening, 3 to 6");
    await form.getByRole("button", { name: "Confirm demo booking" }).click();
    const done = page.getByTestId("vc-confirmation");
    await expect(done).toContainText("Demo visit booked");
    await expect(done).toContainText("Test Person, Refrigerator repair, Riverside, Tomorrow, Evening, 3 to 6");
    await expect(done).toContainText("Nothing was sent or booked");
    expect(writes).toEqual([]);

    await done.getByRole("button", { name: "Book another visit" }).click();
    await expect(page.getByRole("form", { name: "Book a visit" })).toBeVisible();
  });

  test("ticket tracker shows the right step, and an error for an unknown number", async ({ page }) => {
    const form = page.getByRole("form", { name: "Track a ticket" });
    await form.getByLabel("Ticket number").fill("vc-1002");
    await form.getByRole("button", { name: "Track" }).click();
    const steps = page.getByTestId("vc-steps").locator("> li");
    await expect(steps).toHaveCount(5);
    await expect(steps.nth(1)).toHaveAttribute("aria-current", "step");
    await expect(steps.nth(1)).toContainText("Technician assigned");
    await expect(page.getByTestId("vc-ticket-note")).toContainText("Technician Ravi");

    await form.getByLabel("Ticket number").fill("VC-1004");
    await form.getByRole("button", { name: "Track" }).click();
    await expect(steps.nth(4)).toHaveAttribute("aria-current", "step");

    await form.getByLabel("Ticket number").fill("VC-9999");
    await form.getByRole("button", { name: "Track" }).click();
    await expect(page.getByTestId("vc-not-found")).toContainText("No ticket found for VC-9999");
    await expect(page.getByTestId("vc-ticket")).toHaveCount(0);
  });

  test("nav links reach every section", async ({ page }) => {
    const nav = page.getByRole("navigation", { name: "VoltCare Services" });
    for (const id of ["services", "book", "track", "why"]) {
      await expect(nav.locator(`a[href="#vc-${id}"]`)).toHaveCount(1);
      await expect(page.locator(`#vc-${id}`)).toHaveCount(1);
    }
    await expect(page.getByTestId("vc-reasons").locator("> li")).toHaveCount(3);
  });
});

test.describe("TorqueTech Components", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/portfolio/torquetech");
    await page.evaluate(() => window.localStorage.removeItem("torquetech-rfq"));
    await page.reload();
  });

  test("parts filter by category, material and search", async ({ page }) => {
    const parts = page.getByTestId("tt-part");
    await expect(parts).toHaveCount(12);
    for (const [cat, n] of [
      ["Shafts", 2],
      ["Gears", 2],
      ["Fasteners", 3],
      ["Flanges and housings", 3],
      ["Bushings", 2],
    ] as const) {
      await page.getByRole("button", { name: cat, exact: true }).click();
      await expect(parts).toHaveCount(n);
      await expect(page.getByTestId("tt-count")).toHaveText(`${n} parts`);
    }
    await page.getByRole("button", { name: "All", exact: true }).click();
    await page.getByLabel("Material").selectOption("Stainless steel 304");
    await expect(parts).toHaveCount(3);
    await page.getByRole("button", { name: "Fasteners", exact: true }).click();
    await expect(parts).toHaveCount(1);
    await expect(parts.first()).toContainText("Hex bolt M10 x 50");

    await page.getByRole("button", { name: "All", exact: true }).click();
    await page.getByLabel("Material").selectOption("All");
    await page.getByRole("searchbox", { name: "Search parts" }).fill("TT-GR-202");
    await expect(parts).toHaveCount(1);
    await page.getByRole("searchbox", { name: "Search parts" }).fill("zzzz");
    await expect(parts).toHaveCount(0);
    await expect(page.getByTestId("tt-empty")).toBeVisible();
  });

  test("part dialog shows the specification and enforces the minimum order", async ({ page }) => {
    await page.getByRole("button", { name: "View specification: Stepped drive shaft" }).click();
    const dialog = page.getByRole("dialog", { name: "Stepped drive shaft" });
    await expect(dialog.getByTestId("tt-specs")).toContainText("EN8 steel");
    await expect(dialog.getByTestId("tt-specs")).toContainText("50 pieces");
    await expect(dialog.getByLabel("Quantity (pieces)")).toHaveValue("50");

    await dialog.getByLabel("Quantity (pieces)").fill("10");
    await dialog.getByRole("button", { name: "Add to quote request" }).click();
    await expect(dialog.getByRole("alert")).toContainText("minimum order for this part is 50 pieces");
    await expect(page.getByTestId("tt-quote-items")).toHaveCount(0);

    await dialog.getByRole("button", { name: "Close" }).click();
    await expect(page.getByRole("dialog")).toHaveCount(0);
  });

  test("quote list adds, updates, removes, survives a reload, and submits on screen only", async ({ page }) => {
    const writes = watchWrites(page);
    await expect(page.getByTestId("tt-quote-empty")).toBeVisible();
    await expect(page.getByRole("button", { name: "Send demo quote request" })).toBeDisabled();

    await page.getByRole("button", { name: "View specification: Stepped drive shaft" }).click();
    await page.getByRole("dialog").getByLabel("Quantity (pieces)").fill("120");
    await page.getByRole("dialog").getByRole("button", { name: "Add to quote request" }).click();
    await expect(page.getByRole("dialog")).toHaveCount(0);

    await page.getByRole("button", { name: "View specification: Hex bolt M10 x 50" }).click();
    await page.getByRole("dialog").getByRole("button", { name: "Add to quote request" }).click();

    const items = page.getByTestId("tt-quote-items").locator("> li");
    await expect(items).toHaveCount(2);
    await expect(items.first()).toContainText("120 pieces");
    await expect(items.nth(1)).toContainText("500 pieces");
    await expect(page.getByRole("navigation", { name: "TorqueTech Components" })).toContainText("Quote request (2)");

    // Adding the same part again updates the quantity instead of duplicating it.
    await page.getByRole("button", { name: "View specification: Stepped drive shaft" }).click();
    await page.getByRole("dialog").getByLabel("Quantity (pieces)").fill("200");
    await page.getByRole("dialog").getByRole("button", { name: "Add to quote request" }).click();
    await expect(items).toHaveCount(2);
    await expect(items.first()).toContainText("200 pieces");

    await page.reload();
    await expect(page.getByTestId("tt-quote-items").locator("> li")).toHaveCount(2);

    await page.getByRole("button", { name: "Remove Hex bolt M10 x 50" }).click();
    await expect(page.getByTestId("tt-quote-items").locator("> li")).toHaveCount(1);

    const form = page.getByRole("form", { name: "Request a quote" });
    await form.getByLabel("Company name").fill("Test Works");
    await form.getByLabel("Contact person").fill("Test Person");
    await form.getByLabel("Phone number").fill("9000000000");
    await form.getByLabel("Delivery needed").selectOption("2 to 4 weeks");
    await form.getByRole("button", { name: "Send demo quote request" }).click();
    const done = page.getByTestId("tt-confirmation");
    await expect(done).toContainText("Demo quote request submitted");
    await expect(done).toContainText("Test Works");
    await expect(done).toContainText("1 part");
    await expect(done).toContainText("Nothing was sent or saved");
    expect(writes).toEqual([]);

    await done.getByRole("button", { name: "Start another request" }).click();
    await expect(page.getByTestId("tt-quote-empty")).toBeVisible();
  });

  test("nav links reach every section", async ({ page }) => {
    const nav = page.getByRole("navigation", { name: "TorqueTech Components" });
    for (const id of ["parts", "capabilities", "process", "quote"]) {
      await expect(nav.locator(`a[href="#tt-${id}"]`)).toHaveCount(1);
      await expect(page.locator(`#tt-${id}`)).toHaveCount(1);
    }
    await expect(page.getByTestId("tt-capabilities").locator("> li")).toHaveCount(6);
    await expect(page.getByTestId("tt-steps").locator("> li")).toHaveCount(4);
  });
});
