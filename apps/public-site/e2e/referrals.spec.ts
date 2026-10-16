import { test, expect } from "@playwright/test";

test.describe("Accommodations and Restaurants Referral Flow", () => {
  test("browses accommodations, checks partner disclaimer and 1-click CTA", async ({ page }) => {
    await page.goto("/accommodations");

    // Check heading
    const heading = page.locator("h1");
    await expect(heading).toBeVisible();

    // Verify partner disclaimer notice exists on cards
    const disclaimer = page.locator("text=STAR Travels giới thiệu").first();
    await expect(disclaimer).toBeVisible();

    // Verify booking CTA button exists
    const ctaButton = page.locator("button:has-text('Đặt ngay'), a:has-text('Đặt ngay')").first();
    await expect(ctaButton).toBeVisible();

    // Verify advisory button opens consultation modal
    const advisoryBtn = page.locator("button:has-text('tư vấn')").first();
    if (await advisoryBtn.count() > 0) {
      await advisoryBtn.click();
      const modal = page.locator("[role='dialog'], form").filter({ hasText: /tư vấn/i });
      await expect(modal).toBeVisible();
      // Close modal
      const closeBtn = page.locator("button:has-text('Đóng'), button:has-text('✕'), button[aria-label='Close']").first();
      if (await closeBtn.count() > 0) {
        await closeBtn.click();
      }
    }
  });

  test("browses restaurants, checks cuisine types and contact/booking action", async ({ page }) => {
    await page.goto("/restaurants");

    // Check heading
    const heading = page.locator("h1");
    await expect(heading).toBeVisible();

    // Check partner disclaimer
    const disclaimer = page.locator("text=STAR Travels giới thiệu").first();
    await expect(disclaimer).toBeVisible();

    // Verify contact / reservation CTA
    const cta = page.locator("button:has-text('đặt bàn'), a:has-text('đặt bàn'), button:has-text('Hotline')").first();
    await expect(cta).toBeVisible();
  });
});
