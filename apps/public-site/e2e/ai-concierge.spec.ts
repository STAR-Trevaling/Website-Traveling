import { test, expect } from "@playwright/test";

test.describe("AI Travel Concierge RAG Flow", () => {
  test("opens AI assistant modal and verifies chat interaction interface", async ({ page }) => {
    await page.goto("/");

    // Locate the floating AI Concierge trigger button
    const assistantBtn = page.locator("button[aria-label*='AI'], button:has-text('STAR Concierge'), button:has-text('AI')").first();
    await expect(assistantBtn).toBeVisible();

    // Click to open AI chat window
    await assistantBtn.click();

    // Verify chat drawer/modal is opened
    const chatInput = page.locator("input[placeholder*='Hỏi'], textarea[placeholder*='Hỏi'], input[type='text']").last();
    await expect(chatInput).toBeVisible();

    // Verify greeting or quick prompt buttons exist
    const quickPrompts = page.locator("button:has-text('Hạ Long'), button:has-text('Hội An'), button:has-text('tour')");
    if (await quickPrompts.count() > 0) {
      await expect(quickPrompts.first()).toBeVisible();
    }
  });
});
