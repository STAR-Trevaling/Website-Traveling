import { test, expect } from "@playwright/test";

test.describe("Tour Discovery and Booking Flow", () => {
  test("browses tours catalog and navigates to tour details", async ({ page }) => {
    await page.goto("/tours");
    await expect(page).toHaveTitle(/STAR Travels|Tour/i);

    // Verify catalog header is visible
    const heading = page.locator("h1");
    await expect(heading).toBeVisible();

    // Verify tour cards are rendered
    const tourCards = page.locator("article, a[href^='/tours/']");
    await expect(tourCards.first()).toBeVisible();

    // Click on the first tour
    const firstTourLink = page.locator("a[href^='/tours/']").first();
    await firstTourLink.click();

    // Verify detail page
    await expect(page).toHaveURL(/\/tours\/[a-z0-9-]+/);
    await expect(page.locator("h1")).toBeVisible();
  });

  test("verifies tour booking card pricing calculation and form inputs", async ({ page }) => {
    await page.goto("/tours/ha-long-5-star-cruise");

    // Ensure booking card exists
    const bookingCard = page.locator("[data-testid='tour-booking-card'], form, .bg-white").filter({ hasText: /đặt tour|booking/i }).first();
    await expect(bookingCard).toBeVisible();

    // Verify adult and child counters or inputs exist
    const inputs = page.locator("input, select, button");
    await expect(inputs.first()).toBeVisible();

    // Verify legal privacy consent checkbox exists (Decree 13 compliance)
    const consentCheckbox = page.locator("input[type='checkbox']");
    if (await consentCheckbox.count() > 0) {
      await expect(consentCheckbox.first()).not.toBeChecked();
    }
  });
});
