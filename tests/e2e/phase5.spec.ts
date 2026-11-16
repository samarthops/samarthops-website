import { expect, test, type Page } from "@playwright/test";

const LABEL = "Concept demonstration developed by Samarth Ops.";

const PAGES = [
  { path: "/portfolio", h1: /Concept Demos/ },
  { path: "/portfolio/foodnest", h1: /Home-style food/ },
  { path: "/portfolio/shopease", h1: /Everyday essentials/ },
] as const;

for (const p of PAGES) {
  test(`${p.path}: 200, one h1, metadata, concept label, no console errors`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(e.message));
    const res = await page.goto(p.path);
    expect(res?.status()).toBe(200);
    await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(p.h1);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", /.{40,}/);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", `https://samarthops.in${p.path}`);
    await expect(page.getByTestId("concept-label").first()).toContainText(LABEL);
    expect(errors).toEqual([]);
  });
}

test("every link on the portfolio pages resolves", async ({ page, request }) => {
  const hrefs = new Set<string>();
  for (const p of PAGES) {
    await page.goto(p.path);
    const found = await page.$$eval('a[href^="/"]', (as) => as.map((a) => a.getAttribute("href") ?? ""));
    found.forEach((h) => hrefs.add(h.split("#")[0].split("?")[0] || "/"));
  }
  for (const href of hrefs) {
    const res = await request.get(href, { maxRedirects: 0 });
    expect(res.status(), href).toBe(200);
  }
});

test("site navigation, footer, home and sitemap link to the portfolio", async ({ page, request }) => {
  await page.goto("/");
  await expect(page.locator('header a[href="/portfolio"]')).not.toHaveCount(0);
  await expect(page.locator('footer a[href="/portfolio"]')).toHaveCount(1);
  await expect(page.locator('#portfolio a[href="/portfolio/foodnest"]')).toHaveCount(1);
  await expect(page.locator('#portfolio a[href="/portfolio/shopease"]')).toHaveCount(1);
  const xml = await (await request.get("/sitemap.xml")).text();
  for (const p of PAGES) expect(xml).toContain(`https://samarthops.in${p.path}`);
});

test("portfolio: cards, industry filter and links", async ({ page }) => {
  await page.goto("/portfolio");
  const cards = page.getByTestId("portfolio-cards").locator("> li");
  await expect(cards).toHaveCount(2);

  await page.getByRole("button", { name: "Restaurant" }).click();
  await expect(cards).toHaveCount(1);
  await expect(cards.first()).toContainText("FoodNest");

  await page.getByRole("button", { name: "E-commerce" }).click();
  await expect(cards).toHaveCount(1);
  await expect(cards.first()).toContainText("ShopEase");

  await page.getByRole("button", { name: "All" }).click();
  await expect(cards).toHaveCount(2);

  await page.getByRole("link", { name: /View demo: FoodNest/ }).click();
  await expect(page).toHaveURL(/\/portfolio\/foodnest$/);
});

test("portfolio: Build something similar opens the contact form prefilled", async ({ page }) => {
  await page.goto("/portfolio");
  await page.getByRole("link", { name: /Build something similar to ShopEase/ }).click();
  await expect(page).toHaveURL(/\/contact\?service=ecommerce&demo=shopease/);
  await expect(page.getByLabel("What do you need?")).toHaveValue("ecommerce");
  await expect(page.getByLabel("Tell us about your project")).toHaveValue(/ShopEase/);
});

test("FoodNest: Build something similar preselects website and starts the message", async ({ page }) => {
  await page.goto("/portfolio/foodnest");
  await page.getByRole("link", { name: "Build something similar" }).click();
  await expect(page).toHaveURL(/\/contact\?service=website&demo=foodnest/);
  await expect(page.getByLabel("What do you need?")).toHaveValue("website");
  await expect(page.getByLabel("Tell us about your project")).toHaveValue(/FoodNest/);
});

test.describe("FoodNest", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/portfolio/foodnest");
  });

  test("menu is shown by category", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Crispy Corn Bhel" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Butter Paneer Masala" })).toHaveCount(0);
    await page.getByRole("button", { name: "Mains" }).click();
    await expect(page.getByRole("heading", { name: "Butter Paneer Masala" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Crispy Corn Bhel" })).toHaveCount(0);
    await page.getByRole("button", { name: "Drinks" }).click();
    await expect(page.getByRole("heading", { name: "Masala Chai" })).toBeVisible();
  });

  test("item detail opens, adds with a quantity and closes", async ({ page }) => {
    await page.getByRole("button", { name: "Mains" }).click();
    await page.getByRole("button", { name: "Details of Butter Paneer Masala" }).click();
    const dialog = page.getByRole("dialog", { name: "Butter Paneer Masala" });
    await expect(dialog).toBeVisible();
    await expect(dialog).toContainText("Contains:");
    await dialog.getByRole("button", { name: "Increase quantity of Butter Paneer Masala" }).click();
    await dialog.getByRole("button", { name: /^Add to order/ }).click();
    await expect(dialog).toBeHidden();
    await expect(page.getByTestId("fn-count")).toHaveText("(2)");
    await expect(page.getByTestId("fn-subtotal")).toHaveText("₹560");

    await page.getByRole("button", { name: "Details of Home-style Dal Tadka" }).click();
    await page.keyboard.press("Escape");
    await expect(page.getByRole("dialog")).toHaveCount(0);
  });

  test("add, change quantity, remove, and the total with tax and delivery", async ({ page }) => {
    await page.getByRole("button", { name: "Mains" }).click();
    const cart = page.locator("#fn-cart");
    await expect(cart).toContainText("Your order is empty");
    await expect(cart.getByRole("button", { name: "Place demo order" })).toBeDisabled();

    await page.getByRole("button", { name: "Add Butter Paneer Masala to order" }).click();
    await page.getByRole("button", { name: "Add Home-style Dal Tadka to order" }).click();
    await expect(page.getByTestId("fn-count")).toHaveText("(2)");

    // 280 + 200 = 480; GST 5% = 24; delivery 40; total 544
    await expect(page.getByTestId("fn-subtotal")).toHaveText("₹480");
    await expect(page.getByTestId("fn-tax")).toHaveText("₹24");
    await expect(page.getByTestId("fn-delivery")).toHaveText("₹40");
    await expect(page.getByTestId("fn-total")).toHaveText("₹544");

    await cart.getByRole("button", { name: "Increase quantity of Butter Paneer Masala" }).click();
    // 760; GST 38; delivery 40; total 838
    await expect(page.getByTestId("fn-subtotal")).toHaveText("₹760");
    await expect(page.getByTestId("fn-tax")).toHaveText("₹38");
    await expect(page.getByTestId("fn-total")).toHaveText("₹838");

    await cart.getByRole("button", { name: "Decrease quantity of Butter Paneer Masala" }).click();
    await expect(page.getByTestId("fn-total")).toHaveText("₹544");

    await cart.getByRole("button", { name: "Remove Home-style Dal Tadka" }).click();
    await expect(page.getByTestId("fn-count")).toHaveText("(1)");
    // 280; GST 14; delivery 40; total 334
    await expect(page.getByTestId("fn-total")).toHaveText("₹334");

    await cart.getByRole("button", { name: "Remove Butter Paneer Masala" }).click();
    await expect(cart).toContainText("Your order is empty");
    await expect(page.getByTestId("fn-count")).toHaveText("(0)");
  });

  test("the order survives a reload (localStorage)", async ({ page }) => {
    await page.getByRole("button", { name: "Add Crispy Corn Bhel to order" }).click();
    await expect(page.getByTestId("fn-count")).toHaveText("(1)");
    await page.reload();
    await expect(page.getByTestId("fn-count")).toHaveText("(1)");
    await expect(page.getByTestId("fn-lines")).toContainText("Crispy Corn Bhel");
  });

  test("simulated order shows a confirmation and clears the cart", async ({ page }) => {
    await page.getByRole("button", { name: "Add Crispy Corn Bhel to order" }).click();
    await page.getByRole("button", { name: "Place demo order" }).click();
    const done = page.getByTestId("fn-confirmation");
    await expect(done).toContainText("Demo order placed");
    await expect(page.getByTestId("fn-order-number")).toHaveText(/^FN-\d+$/);
    await expect(done).toContainText("No payment was taken");
    // 120; GST 6; delivery 40; total 166
    await expect(page.getByTestId("fn-total")).toHaveText("₹166");
    await expect(page.getByTestId("fn-count")).toHaveText("(0)");
    await done.getByRole("button", { name: "Start a new order" }).click();
    await expect(page.locator("#fn-cart")).toContainText("Your order is empty");
  });

  test("the demo sends no network requests when ordering", async ({ page }) => {
    const posts: string[] = [];
    page.on("request", (r) => {
      if (["POST", "PUT", "PATCH", "DELETE"].includes(r.method())) posts.push(r.method() + " " + r.url());
    });
    await page.getByRole("button", { name: "Add Crispy Corn Bhel to order" }).click();
    await page.getByRole("button", { name: "Place demo order" }).click();
    await expect(page.getByTestId("fn-confirmation")).toBeVisible();
    expect(posts.map((u) => u + "").join(", ")).toBe("");
  });
});

async function products(page: Page) {
  return page.getByTestId("se-product");
}

test.describe("ShopEase", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/portfolio/shopease");
  });

  test("catalogue lists all products", async ({ page }) => {
    await expect(await products(page)).toHaveCount(15);
    await expect(page.getByTestId("se-result-count")).toHaveText("15 products");
  });

  test("search, category and price filters", async ({ page }) => {
    const list = await products(page);
    await page.getByLabel("Search products").fill("bottle");
    await expect(list).toHaveCount(1);
    await expect(list.first()).toContainText("Insulated Steel Bottle");

    await page.getByLabel("Search products").fill("zzzz");
    await expect(page.getByText("No products match your search.")).toBeVisible();
    await page.getByRole("button", { name: "Clear filters" }).click();
    await expect(list).toHaveCount(15);

    await page.getByRole("button", { name: "Audio" }).click();
    await expect(list).toHaveCount(3);
    await page.getByLabel("Price").selectOption({ label: "₹3,000 and above" });
    await expect(list).toHaveCount(1);
    await expect(list.first()).toContainText("Over-ear Headphones");

    await page.getByRole("button", { name: "All", exact: true }).click();
    await page.getByLabel("Price").selectOption({ label: "Under ₹1,000" });
    await expect(list).toHaveCount(5);
  });

  test("product detail opens, shows specs and closes", async ({ page }) => {
    await page.getByRole("button", { name: "Details of Yoga Mat" }).click();
    const dialog = page.getByRole("dialog", { name: "Yoga Mat" });
    await expect(dialog).toBeVisible();
    await expect(dialog).toContainText("Non-slip surface");
    await dialog.getByRole("button", { name: "Close" }).click();
    await expect(page.getByRole("dialog")).toHaveCount(0);
  });

  test("wishlist: add, view, persist and remove", async ({ page }) => {
    await page.getByRole("button", { name: "Wishlist Yoga Mat" }).click();
    await page.getByRole("button", { name: "Wishlist Wireless Earbuds" }).click();
    await expect(page.getByRole("button", { name: "Wishlist Yoga Mat" })).toHaveAttribute("aria-pressed", "true");
    await expect(page.getByTestId("se-badge-wishlist")).toHaveText("(2)");

    await page.reload();
    await expect(page.getByTestId("se-badge-wishlist")).toHaveText("(2)");
    await page.getByRole("button", { name: /^Wishlist \(2\)/ }).click();
    const list = page.getByTestId("se-wishlist").locator("> li");
    await expect(list).toHaveCount(2);

    await page.getByTestId("se-wishlist").getByRole("button", { name: "Wishlist Yoga Mat" }).click();
    await expect(list).toHaveCount(1);
    await page.getByTestId("se-wishlist").getByRole("button", { name: "Wishlist Wireless Earbuds" }).click();
    await expect(page.getByText("Your wishlist is empty.")).toBeVisible();
  });

  test("cart: add, change quantity, remove, totals with tax and delivery", async ({ page }) => {
    await page.getByRole("button", { name: "Add Insulated Steel Bottle to cart" }).click();
    await expect(page.getByTestId("se-badge-cart")).toHaveText("(1)");
    await page.getByRole("button", { name: /^Cart \(1\)/ }).click();

    // 699; GST 18% = 126 (125.82 rounded); delivery 49 (below 999); total 874
    await expect(page.getByTestId("se-subtotal")).toHaveText("₹699");
    await expect(page.getByTestId("se-tax")).toHaveText("₹126");
    await expect(page.getByTestId("se-delivery")).toHaveText("₹49");
    await expect(page.getByTestId("se-total")).toHaveText("₹874");

    await page.getByRole("button", { name: "Increase quantity of Insulated Steel Bottle" }).click();
    // 1398; GST 252 (251.64); delivery free; total 1650
    await expect(page.getByTestId("se-subtotal")).toHaveText("₹1,398");
    await expect(page.getByTestId("se-tax")).toHaveText("₹252");
    await expect(page.getByTestId("se-delivery")).toHaveText("Free");
    await expect(page.getByTestId("se-total")).toHaveText("₹1,650");

    await page.getByRole("button", { name: "Remove Insulated Steel Bottle" }).click();
    await expect(page.getByText("Your cart is empty.")).toBeVisible();
  });

  test("the cart survives a reload (localStorage)", async ({ page }) => {
    await page.getByRole("button", { name: "Add Yoga Mat to cart" }).click();
    await page.reload();
    await expect(page.getByTestId("se-badge-cart")).toHaveText("(1)");
  });

  test("simulated checkout ends in an order summary and sends nothing", async ({ page }) => {
    const sent: string[] = [];
    page.on("request", (r) => {
      if (["POST", "PUT", "PATCH", "DELETE"].includes(r.method())) sent.push(r.method() + " " + r.url());
    });

    await page.getByRole("button", { name: "Details of Resistance Band Set" }).click();
    await page.getByRole("dialog").getByRole("button", { name: /^Add to cart/ }).click();
    await page.getByRole("button", { name: /^Cart \(1\)/ }).click();
    await page.getByRole("button", { name: "Proceed to checkout" }).click();

    const form = page.getByRole("form", { name: "Checkout form" });
    await form.getByRole("button", { name: "Place demo order" }).click();
    // Required fields block an empty submit.
    await expect(page.getByTestId("se-confirmation")).toHaveCount(0);

    await form.getByLabel("Full name").fill("Demo Person");
    await form.getByLabel("Delivery address").fill("12 Sample Street");
    await form.getByLabel("City").fill("Sampletown");
    await form.getByLabel("PIN code").fill("123456");
    await form.getByLabel("UPI (demo)").check();
    await form.getByRole("button", { name: "Place demo order" }).click();

    const done = page.getByTestId("se-confirmation");
    await expect(done).toContainText("Demo order placed");
    await expect(page.getByTestId("se-order-number")).toHaveText(/^SE-\d+$/);
    await expect(done).toContainText("Demo Person, Sampletown");
    await expect(done).toContainText("UPI (demo)");
    await expect(done).toContainText("Resistance Band Set");
    // 599; GST 108 (107.82); delivery 49; total 756
    await expect(page.getByTestId("se-total")).toHaveText("₹756");
    await expect(page.getByTestId("se-badge-cart")).toHaveText("(0)");
    expect(sent.join(", ")).toBe("");

    await done.getByRole("button", { name: "Continue shopping" }).click();
    await expect(page.getByTestId("se-result-count")).toHaveText("15 products");
  });
});
