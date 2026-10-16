import { test, expect } from "@playwright/test";

test.describe("Cultural Experiences & Adventures Flow", () => {
  test("browses experiences catalog and views experience detail", async ({ page }) => {
    await page.goto("/experiences");
    await expect(page).toHaveTitle(/STAR Travels|Trải Nghiệm|Experience/i);

    // Verify catalog has items
    const expLinks = page.locator("a[href^='/experiences/']");
    await expect(expLinks.first()).toBeVisible();

    // Click on an experience
    await expLinks.first().click();
    await expect(page).toHaveURL(/\/experiences\/[a-z0-9-]+/);
    await expect(page.locator("h1")).toBeVisible();
  });
});
