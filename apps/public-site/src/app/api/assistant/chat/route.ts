import { NextResponse } from "next/server";
import { queryAssistantKnowledge } from "@/lib/assistant-engine";

const BASE_URL = process.env.BACKEND_URL ?? "http://localhost:8000/api/v1";

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const userMessage = payload?.message || "";
    const locale = payload?.locale === "en" ? "en" : "vi";

    // Attempt backend fetch with 2s timeout
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2000);

      const backendRes = await fetch(`${BASE_URL}/assistant/conversations/chat/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        cache: "no-store",
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (backendRes.ok) {
        const data = await backendRes.json();
        // Enrich backend response if stories/destinations are not yet included
        const localKnowledge = queryAssistantKnowledge(userMessage, locale);
        const contactRequired =
          Boolean(data.contact_required) ||
          Boolean(localKnowledge.contactRequired) ||
          ((!data.recommended_tours || data.recommended_tours.length === 0) &&
            (!localKnowledge.recommended_tours || localKnowledge.recommended_tours.length === 0));

        return NextResponse.json({
          message: data.message || localKnowledge.message,
          recommended_tours: contactRequired
            ? []
            : (data.recommended_tours?.length ? data.recommended_tours : localKnowledge.recommended_tours),
          recommended_stories: contactRequired ? [] : localKnowledge.recommended_stories,
          recommended_destinations: contactRequired ? [] : localKnowledge.recommended_destinations,
          contactRequired,
          lead_captured: data.lead_captured || false,
        });
      }
    } catch {
      // Backend is offline or timed out; seamlessly fallback to local engine
    }

    // High-performance intelligent concierge response from centralized seed repository
    const localData = queryAssistantKnowledge(userMessage, locale);
    return NextResponse.json(localData);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Assistant error";
    return NextResponse.json(
      queryAssistantKnowledge("", "vi"),
      { status: 200 }
    );
  }
}
