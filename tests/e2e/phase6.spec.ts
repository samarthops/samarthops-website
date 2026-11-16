import { expect, test, type Page } from "@playwright/test";

const LABEL = "Concept demonstration developed by Samarth Ops.";

const DEMOS = [
  { path: "/portfolio/medicare-plus", slug: "medicare-plus", name: "MediCare Plus", h1: /Caring for the whole family/, font: /Nunito Sans/, similar: "website" },
  { path: "/portfolio/primeestate", slug: "primeestate", name: "PrimeEstate", h1: /Find a home worth coming back to/, font: /Playfair/, similar: "website" },
  { path: "/portfolio/brightfuture", slug: "brightfuture", name: "BrightFuture Academy", h1: /Where every child learns to shine/, font: /Fredoka/, similar: "website" },
] as const;

for (const d of DEMOS) {
  test.describe(d.name, () => {
    test(`${d.path}: 200, one h1, metadata, concept label, header, footer, own font, no console errors`, async ({ page }) => {
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
      await expect(page).toHaveURL(new RegExp(`/contact\\?service=${d.similar}&demo=${d.slug}`));
      await expect(page.getByLabel("What do you need?")).toHaveValue(d.similar);
      await expect(page.getByLabel("Tell us about your project")).toHaveValue(new RegExp(d.name));
    });
  });
}

test("every link on the three demo pages resolves", async ({ page, request }) => {
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

test("home and sitemap link to the new demos", async ({ page, request }) => {
  await page.goto("/");
  for (const d of DEMOS) await expect(page.locator(`#portfolio a[href="${d.path}"]`)).toHaveCount(1);
  const xml = await (await request.get("/sitemap.xml")).text();
  for (const d of DEMOS) expect(xml).toContain(`https://samarthops.in${d.path}`);
});

test("portfolio: five cards, industry filters and links for the new demos", async ({ page }) => {
  await page.goto("/portfolio");
  const cards = page.getByTestId("portfolio-cards").locator("> li");
  await expect(cards).toHaveCount(5);

  for (const [industry, name] of [
    ["Clinic", "MediCare Plus"],
    ["Real estate", "PrimeEstate"],
    ["School", "BrightFuture Academy"],
  ]) {
    await page.getByRole("button", { name: industry, exact: true }).click();
    await expect(cards).toHaveCount(1);
    await expect(cards.first()).toContainText(name);
  }
  await page.getByRole("button", { name: "All", exact: true }).click();
  await expect(cards).toHaveCount(5);

  await page.getByRole("link", { name: "View demo: PrimeEstate" }).click();
  await expect(page).toHaveURL(/\/portfolio\/primeestate$/);
});

/** Demos must send nothing: fail the test on any write request. */
function watchWrites(page: Page) {
  const writes: string[] = [];
  page.on("request", (r) => {
    if (["POST", "PUT", "PATCH", "DELETE"].includes(r.method())) writes.push(`${r.method()} ${r.url()}`);
  });
  return writes;
}

test.describe("MediCare Plus", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/portfolio/medicare-plus");
  });

  test("departments are listed with doctor counts", async ({ page }) => {
    const list = page.getByTestId("mc-departments").locator("> li");
    await expect(list).toHaveCount(5);
    await expect(list.filter({ hasText: "Cardiology" })).toContainText("2 doctors");
    await expect(list.filter({ hasText: "General Medicine" })).toContainText("1 doctor");
  });

  test("doctors can be filtered by department", async ({ page }) => {
    const filter = page.getByRole("group", { name: "Filter doctors by department" });
    await expect(page.getByTestId("mc-doctor")).toHaveCount(8);
    await expect(page.getByTestId("mc-doctor-count")).toHaveText("8 doctors");

    await filter.getByRole("button", { name: "Cardiology" }).click();
    await expect(page.getByTestId("mc-doctor")).toHaveCount(2);
    await expect(page.getByRole("heading", { name: "Dr. Anaya Verma" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Dr. Kabir Nair" })).toHaveCount(0);

    await filter.getByRole("button", { name: "General Medicine" }).click();
    await expect(page.getByTestId("mc-doctor")).toHaveCount(1);
    await expect(page.getByTestId("mc-doctor-count")).toHaveText("1 doctor");

    await filter.getByRole("button", { name: "All departments" }).click();
    await expect(page.getByTestId("mc-doctor")).toHaveCount(8);
  });

  test("a department card filters the doctors", async ({ page }) => {
    await page.getByRole("button", { name: "2 doctors in Paediatrics" }).click();
    await expect(page.getByTestId("mc-doctor")).toHaveCount(2);
    await expect(page.getByRole("button", { name: "Paediatrics", exact: true })).toHaveAttribute("aria-pressed", "true");
  });

  test("doctor profile opens, shows details and closes", async ({ page }) => {
    await page.getByRole("button", { name: "Profile and slots for Dr. Kabir Nair" }).click();
    const dialog = page.getByRole("dialog", { name: "Dr. Kabir Nair" });
    await expect(dialog).toBeVisible();
    await expect(dialog).toContainText("Orthopaedic Surgeon");
    await expect(dialog).toContainText("Languages:");
    await page.keyboard.press("Escape");
    await expect(page.getByRole("dialog")).toHaveCount(0);
  });

  test("slot picker: booked slots are disabled and a chosen slot carries to the enquiry", async ({ page }) => {
    await page.getByRole("button", { name: "Profile and slots for Dr. Anaya Verma" }).click();
    const dialog = page.getByRole("dialog", { name: "Dr. Anaya Verma" });
    const choose = dialog.getByRole("button", { name: /^(Choose a time to continue|Request )/ });

    await expect(dialog.getByRole("button", { name: "09:30 (booked)" })).toBeDisabled();
    await expect(choose).toBeDisabled();

    await dialog.getByRole("button", { name: "Tuesday" }).click();
    await expect(dialog.getByRole("button", { name: "11:30 (booked)" })).toBeDisabled();
    await dialog.getByRole("button", { name: "Monday" }).click();
    await dialog.getByRole("button", { name: "10:30", exact: true }).click();
    await expect(dialog.getByRole("button", { name: "10:30", exact: true })).toHaveAttribute("aria-pressed", "true");
    await expect(choose).toHaveText("Request Monday 10:30");
    await choose.click();

    await expect(page.getByRole("dialog")).toHaveCount(0);
    await expect(page.getByTestId("mc-chosen")).toContainText("Dr. Anaya Verma");
    await expect(page.getByTestId("mc-chosen")).toContainText("Monday at 10:30");
    await expect(page.getByRole("combobox", { name: "Department", exact: true })).toHaveValue("cardiology");

    await page.getByRole("button", { name: "Clear slot" }).click();
    await expect(page.getByTestId("mc-chosen")).toHaveCount(0);
  });

  test("demo enquiry: validates, then shows an on-screen confirmation and sends nothing", async ({ page }) => {
    const writes = watchWrites(page);
    await page.getByRole("button", { name: "Profile and slots for Dr. Anaya Verma" }).click();
    const dialog = page.getByRole("dialog", { name: "Dr. Anaya Verma" });
    await dialog.getByRole("button", { name: "10:30", exact: true }).click();
    await dialog.getByRole("button", { name: "Request Monday 10:30" }).click();

    const form = page.getByRole("form", { name: "Appointment enquiry" });
    await form.getByLabel("Your name").fill("Test Person");
    await form.getByLabel("Phone number").fill("12345");
    await form.getByRole("button", { name: "Send demo enquiry" }).click();
    await expect(page.getByTestId("mc-confirmation")).toHaveCount(0);

    await form.getByLabel("Phone number").fill("9000000000");
    await form.getByRole("button", { name: "Send demo enquiry" }).click();
    const done = page.getByTestId("mc-confirmation");
    await expect(done).toContainText("Demo enquiry submitted");
    await expect(done).toContainText("Test Person");
    await expect(done).toContainText("Dr. Anaya Verma, Monday at 10:30");
    await expect(done).toContainText("Nothing was sent, saved or booked");

    await done.getByRole("button", { name: "Make another enquiry" }).click();
    await expect(page.getByRole("form", { name: "Appointment enquiry" })).toBeVisible();
    expect(await page.evaluate(() => window.localStorage.length)).toBe(0);
    expect(writes).toEqual([]);
  });
});

test.describe("PrimeEstate", () => {
  const listings = (page: Page) => page.getByTestId("pe-listing");

  test.beforeEach(async ({ page }) => {
    await page.goto("/portfolio/primeestate");
  });

  test("all listings are shown", async ({ page }) => {
    await expect(listings(page)).toHaveCount(9);
    await expect(page.getByTestId("pe-count")).toHaveText("9 properties");
  });

  test("search, location and price filters, and clearing them", async ({ page }) => {
    await page.getByLabel("Search listings").fill("villa");
    await expect(listings(page)).toHaveCount(2);
    await page.getByLabel("Search listings").fill("pine");
    await expect(listings(page)).toHaveCount(1);
    await expect(page.getByTestId("pe-count")).toHaveText("1 property");
    await page.getByLabel("Search listings").fill("");

    await page.getByLabel("Location").selectOption("Maple Bay");
    await expect(listings(page)).toHaveCount(3);

    await page.getByLabel("Location").selectOption("all");
    await page.getByLabel("Price").selectOption({ label: "Under ₹75 lakh" });
    await expect(listings(page)).toHaveCount(3);
    await page.getByLabel("Price").selectOption({ label: "₹75 lakh to ₹1.5 crore" });
    await expect(listings(page)).toHaveCount(3);
    await page.getByLabel("Price").selectOption({ label: "Above ₹1.5 crore" });
    await expect(listings(page)).toHaveCount(3);

    await page.getByLabel("Location").selectOption("Rivergate");
    await expect(listings(page)).toHaveCount(1);
    await expect(page.getByRole("heading", { name: "Skyline Penthouse" })).toBeVisible();

    await page.getByLabel("Location").selectOption("Maple Bay");
    await page.getByLabel("Price").selectOption({ label: "₹75 lakh to ₹1.5 crore" });
    await expect(listings(page)).toHaveCount(0);
    await expect(page.getByText("No properties match your search.")).toBeVisible();
    await page.getByRole("button", { name: "Clear filters" }).click();
    await expect(listings(page)).toHaveCount(9);
  });

  test("detail dialog shows price, features and a working photo gallery", async ({ page }) => {
    await page.getByRole("button", { name: "View details of The Cove Villa" }).click();
    const dialog = page.getByRole("dialog", { name: "The Cove Villa" });
    await expect(dialog).toBeVisible();
    await expect(dialog).toContainText("₹2.4 crore");
    await expect(dialog).toContainText("Private garden");

    const caption = page.getByTestId("pe-gallery-caption");
    await expect(caption).toHaveText("Living room (1 of 4)");
    await dialog.getByRole("button", { name: "Next photo" }).click();
    await expect(caption).toHaveText("Master bedroom (2 of 4)");
    await dialog.getByRole("button", { name: "Previous photo" }).click();
    await dialog.getByRole("button", { name: "Previous photo" }).click();
    await expect(caption).toHaveText("Balcony and outdoors (4 of 4)");
    await dialog.getByRole("button", { name: "Next photo" }).click();
    await expect(caption).toHaveText("Living room (1 of 4)");
    await dialog.getByRole("button", { name: "Show Kitchen" }).click();
    await expect(caption).toHaveText("Kitchen (3 of 4)");

    await page.keyboard.press("Escape");
    await expect(page.getByRole("dialog")).toHaveCount(0);
  });

  test("wishlist: save, list, persist across reload, remove", async ({ page }) => {
    const nav = page.getByRole("navigation", { name: "PrimeEstate" });
    await expect(page.getByTestId("pe-saved-count")).toHaveText("(0)");

    await page.getByRole("button", { name: "Save Riverside 2 BHK to wishlist" }).click();
    await expect(page.getByRole("button", { name: "Save Riverside 2 BHK to wishlist" })).toHaveAttribute("aria-pressed", "true");
    await expect(page.getByTestId("pe-saved-count")).toHaveText("(1)");

    // Saving from inside the detail dialog works too.
    await page.getByRole("button", { name: "View details of Ridge Villa" }).click();
    const dialog = page.getByRole("dialog", { name: "Ridge Villa" });
    await dialog.getByRole("button", { name: "Save to wishlist" }).click();
    await expect(dialog.getByRole("button", { name: "Saved to wishlist" })).toBeVisible();
    await expect(page.getByTestId("pe-saved-count")).toHaveText("(2)");
    await page.keyboard.press("Escape");

    await page.reload();
    await expect(page.getByTestId("pe-saved-count")).toHaveText("(2)");
    await nav.getByRole("button", { name: /Wishlist/ }).click();
    const saved = page.getByTestId("pe-wishlist").locator("> li");
    await expect(saved).toHaveCount(2);
    await expect(saved.first()).toContainText("Riverside 2 BHK");

    await page.getByRole("button", { name: "Save Riverside 2 BHK to wishlist" }).click();
    await page.getByRole("button", { name: "Save Ridge Villa to wishlist" }).click();
    await expect(page.getByText("You have not saved any properties yet.")).toBeVisible();
    await expect(page.getByTestId("pe-saved-count")).toHaveText("(0)");
  });

  test("schedule a visit shows an on-screen confirmation and sends nothing", async ({ page }) => {
    const writes = watchWrites(page);
    await page.getByRole("button", { name: "View details of Marina 1 BHK" }).click();
    const dialog = page.getByRole("dialog", { name: "Marina 1 BHK" });
    const form = dialog.getByRole("form", { name: "Schedule a visit" });

    await form.getByLabel("Your name").fill("Test Person");
    await form.getByLabel("Phone number").fill("abc");
    await form.getByRole("button", { name: "Schedule demo visit" }).click();
    await expect(page.getByTestId("pe-visit-confirmation")).toHaveCount(0);

    await form.getByLabel("Phone number").fill("9000000000");
    await form.getByLabel("Day").selectOption("Sunday");
    await form.getByLabel("Time").selectOption("16:00 to 18:00");
    await form.getByRole("button", { name: "Schedule demo visit" }).click();
    const done = page.getByTestId("pe-visit-confirmation");
    await expect(done).toContainText("Demo visit scheduled");
    await expect(done).toContainText("Test Person, Sunday, 16:00 to 18:00, Marina 1 BHK");
    await expect(done).toContainText("Nothing was sent or booked");
    expect(writes).toEqual([]);
  });
});

test.describe("BrightFuture Academy", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/portfolio/brightfuture");
  });

  test("courses can be filtered by level", async ({ page }) => {
    await expect(page.getByTestId("bf-course")).toHaveCount(6);
    for (const level of ["Primary", "Middle school", "Senior school"]) {
      await page.getByRole("button", { name: level, exact: true }).click();
      await expect(page.getByTestId("bf-course")).toHaveCount(2);
      await expect(page.getByTestId("bf-course-count")).toHaveText("2 courses");
    }
    await expect(page.getByRole("heading", { name: "Coding Basics" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Number Fun" })).toHaveCount(0);
    await page.getByRole("button", { name: "All", exact: true }).click();
    await expect(page.getByTestId("bf-course")).toHaveCount(6);
  });

  test("faculty and admission steps are listed, and the nav links to every section", async ({ page }) => {
    await expect(page.getByTestId("bf-faculty").locator("> li")).toHaveCount(6);
    await expect(page.getByRole("heading", { name: "Mrs. Sunita Rane" })).toBeVisible();
    await expect(page.getByTestId("bf-steps").locator("> li")).toHaveCount(4);
    const nav = page.getByRole("navigation", { name: "BrightFuture Academy" });
    for (const id of ["courses", "faculty", "admissions", "news", "gallery"]) {
      await expect(nav.locator(`a[href="#bf-${id}"]`)).toHaveCount(1);
      await expect(page.locator(`#bf-${id}`)).toHaveCount(1);
    }
  });

  test("events and announcements switch", async ({ page }) => {
    await expect(page.getByTestId("bf-events").locator("> li")).toHaveCount(4);
    await expect(page.getByRole("heading", { name: "Annual Science Fair" })).toBeVisible();

    await page.getByRole("button", { name: "Announcements" }).click();
    await expect(page.getByTestId("bf-announcements").locator("> li")).toHaveCount(3);
    await expect(page.getByTestId("bf-events")).toHaveCount(0);
    await expect(page.getByRole("heading", { name: "New computer lab" })).toBeVisible();

    await page.getByRole("button", { name: "Events" }).click();
    await expect(page.getByTestId("bf-events")).toBeVisible();
  });

  test("gallery opens a viewer that steps through the photos", async ({ page }) => {
    await expect(page.getByTestId("bf-gallery").locator("> li")).toHaveCount(6);
    await page.getByRole("button", { name: /Morning assembly/ }).click();
    const dialog = page.getByRole("dialog", { name: "Gallery" });
    const caption = page.getByTestId("bf-photo-caption");
    await expect(caption).toHaveText("Morning assembly on the school ground (1 of 6)");

    await dialog.getByRole("button", { name: "Next photo" }).click();
    await expect(caption).toHaveText("A chemistry experiment in the lab (2 of 6)");
    await dialog.getByRole("button", { name: "Previous photo" }).click();
    await dialog.getByRole("button", { name: "Previous photo" }).click();
    await expect(caption).toHaveText("Story hour in the library (6 of 6)");

    await dialog.getByRole("button", { name: "Close" }).click();
    await expect(page.getByRole("dialog")).toHaveCount(0);
  });

  test("demo admission enquiry validates, then confirms on screen and sends nothing", async ({ page }) => {
    const writes = watchWrites(page);
    const form = page.getByRole("form", { name: "Admission enquiry" });

    await form.getByLabel("Child's name").fill("Test Child");
    await form.getByLabel("Parent or guardian name").fill("Test Parent");
    await form.getByLabel("Seeking admission to").selectOption("Grade 4");
    await form.getByRole("button", { name: "Send demo enquiry" }).click();
    await expect(page.getByTestId("bf-confirmation")).toHaveCount(0);

    await form.getByLabel("Phone number").fill("9000000000");
    await form.getByRole("button", { name: "Send demo enquiry" }).click();
    const done = page.getByTestId("bf-confirmation");
    await expect(done).toContainText("Demo enquiry submitted");
    await expect(done).toContainText("Test Parent");
    await expect(done).toContainText("Test Child, Grade 4");
    await expect(done).toContainText("Nothing was sent or saved");

    await done.getByRole("button", { name: "Send another enquiry" }).click();
    await expect(page.getByRole("form", { name: "Admission enquiry" })).toBeVisible();
    expect(await page.evaluate(() => window.localStorage.length)).toBe(0);
    expect(writes).toEqual([]);
  });
});
