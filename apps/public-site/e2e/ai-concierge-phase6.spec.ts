import { test, expect } from "@playwright/test";

test.describe("AI Travel Concierge — Phase 6.1 Quality & Production Hardening", () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to homepage
    await page.goto("/");
    // Wait for the floating mascot or AI trigger button
    const assistantBtn = page.locator(
      "[data-testid='assistant-mascot-trigger'], button[aria-label*='Baby STAR'], button[aria-label*='Bé Star'], button[aria-label*='Bé Sao STAR']"
    ).first();
    await expect(assistantBtn).toBeVisible({ timeout: 10000 });
    await assistantBtn.click();

    // Verify chat drawer is open
    const drawer = page.locator("[data-testid='assistant-chat-drawer']");
    await expect(drawer).toBeVisible({ timeout: 5000 });
  });

  test("1. Interactive Widget, Living Star Mascot & Quick Prompt Dispatch", async ({ page }) => {
    const drawer = page.locator("[data-testid='assistant-chat-drawer']");

    // Verify greeting from Bé Star
    const welcomeBubble = drawer.getByText("Bé Star").or(drawer.getByText("Baby STAR")).or(drawer.getByText("Bé Sao STAR")).first();
    await expect(welcomeBubble).toBeVisible();

    // Verify quick prompt pills are displayed
    const quickPrompt = page.locator("[data-testid='assistant-quick-prompt']").first();
    await expect(quickPrompt).toBeVisible();

    // Click quick prompt and check input auto-fills or dispatches
    await quickPrompt.click();

    // Verify user message bubble is created
    const userMessage = drawer.locator(".bg-slate-900").first();
    await expect(userMessage).toBeVisible({ timeout: 5000 });
  });

  test("2. Knowledge Query & Provenance Sources Citations Bar", async ({ page }) => {
    const chatInput = page.locator("[data-testid='assistant-chat-input']");

    // Send knowledge query about Vietnam Visa policy
    await chatInput.fill("Chính sách e-visa và miễn visa Việt Nam như thế nào?");
    await chatInput.press("Enter");

    const drawer = page.locator("[data-testid='assistant-chat-drawer']");

    // Response message rendered with grounded knowledge or source citations
    const responseEvidence = drawer
      .getByText("Nguồn Dữ Liệu Đối Chiếu")
      .or(drawer.getByText("Verified Sources"))
      .or(drawer.getByText("Thị Thực"))
      .first();
    await expect(responseEvidence).toBeVisible({ timeout: 15000 });
  });

  test("3. Grounded Itinerary Plan Card & Inline Lead Consent Checkbox", async ({ page }) => {
    const chatInput = page.locator("[data-testid='assistant-chat-input']");

    // Send Itinerary planning query
    await chatInput.fill("Gợi ý lịch trình Đà Lạt 3 ngày 2 đêm ngân sách 4 triệu giúp mình");
    await chatInput.press("Enter");

    // Wait for Grounded Itinerary plan card to render
    const scheduleCard = page.locator("[data-testid='assistant-itinerary-card']");
    await expect(scheduleCard).toBeVisible({ timeout: 15000 });

    // Verify consultation CTA button
    const consultBtn = page.locator("[data-testid='assistant-consultation-btn']");
    await expect(consultBtn).toBeVisible();
    await consultBtn.click();

    // Verify phone input and consent checkbox appear
    const phoneInput = page.locator("[data-testid='assistant-phone-input']");
    await expect(phoneInput).toBeVisible();

    const consentCheckbox = page.locator("[data-testid='assistant-consent-checkbox']");
    await expect(consentCheckbox).toBeVisible();

    // Verify submit button is disabled when consent is unchecked
    await phoneInput.fill("0987654321");
    const submitBtn = page.locator("[data-testid='assistant-submit-consultation']");
    await expect(submitBtn).toBeDisabled();

    // Check consent checkbox and verify submit button becomes enabled
    await consentCheckbox.check();
    await expect(submitBtn).toBeEnabled();
  });

  test("4. Error Resilience & Offline Fallback Integrity", async ({ page }) => {
    // Intercept backend API to simulate a 500 server error / network outage
    await page.route("**/api/assistant/chat", async (route) => {
      await route.fulfill({
        status: 500,
        contentType: "application/json",
        body: JSON.stringify({ error: "Backend simulation offline" }),
      });
    });

    const chatInput = page.locator("[data-testid='assistant-chat-input']");
    await chatInput.fill("Tour du thuyền Hạ Long 2 ngày 1 đêm giá bao nhiêu?");
    await chatInput.press("Enter");

    // Verify system falls back gracefully to local verified knowledge without crashing
    const fallbackMessage = page.locator("[data-testid='assistant-chat-drawer'] .bg-slate-100\\/90").last();
    await expect(fallbackMessage).toBeVisible({ timeout: 8000 });

    // Verify UI remains interactive and input is clear for the next message
    await expect(chatInput).toBeEnabled();
  });
});
