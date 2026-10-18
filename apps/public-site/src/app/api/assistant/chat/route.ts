import { NextResponse } from "next/server";
import { queryAssistantKnowledge } from "@/lib/assistant-engine";

const BASE_URL = process.env.BACKEND_URL ?? "http://localhost:8000/api/v1";

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const userMessage = payload?.message || "";
    const locale = payload?.locale === "en" ? "en" : "vi";
    const history = Array.isArray(payload?.history) ? payload.history : [];

    // Attempt backend fetch with configurable timeout (default 25s) to support Jev RAG v2, planning & synthesis
    try {
      const controller = new AbortController();
      const timeoutMs = parseInt(process.env.BFF_ASSISTANT_TIMEOUT_MS || "25000", 10);
      const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

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
        const localKnowledge = queryAssistantKnowledge(userMessage, locale, history);
        const contactRequired =
          Boolean(data.contact_required) ||
          Boolean(localKnowledge.contactRequired) ||
          ((!data.recommended_tours || data.recommended_tours.length === 0) &&
            (!localKnowledge.recommended_tours || localKnowledge.recommended_tours.length === 0));

        return NextResponse.json({
          message: data.message || localKnowledge.message,
          recommended_tours: data.recommended_tours?.length ? data.recommended_tours : (localKnowledge.recommended_tours || []),
          recommended_accommodations: data.recommended_accommodations || localKnowledge.recommended_accommodations || [],
          recommended_restaurants: data.recommended_restaurants || localKnowledge.recommended_restaurants || [],
          recommended_stories: localKnowledge.recommended_stories || [],
          recommended_destinations: localKnowledge.recommended_destinations || [],
          recommended_guides: data.recommended_guides?.length ? data.recommended_guides : (localKnowledge.recommended_guides || []),
          itinerary_plan: data.itinerary_plan || null,
          sources: data.sources || [],
          route: data.route || "knowledge",
          contactRequired: Boolean(data.contact_required),
          lead_captured: data.lead_captured || false,
          is_offline_fallback: false,
        });
      }
    } catch {
      // Backend is offline or timed out; seamlessly fallback to local verified knowledge
    }

    // High-performance intelligent concierge response from centralized verified seed repository
    const localData = queryAssistantKnowledge(userMessage, locale, history);
    const offlineNotice = locale === "en"
      ? "\n\n*Notice: Concierge is operating in verified offline reference mode. Real-time availability and exact seasonal rates require direct verification with our advisors.*"
      : "\n\n*Lưu ý: Hệ thống đang phản hồi từ cẩm nang tham khảo ngoại tuyến. Tình trạng chỗ trống và giá thực tế có thể thay đổi theo thời điểm khởi hành; Quý khách vui lòng kết nối tư vấn viên để có thông tin chính xác nhất.*";

    return NextResponse.json({
      ...localData,
      message: (localData.message || "") + offlineNotice,
      is_offline_fallback: true,
      contactRequired: true,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Assistant error";
    return NextResponse.json(
      {
        ...queryAssistantKnowledge("", "vi"),
        is_offline_fallback: true,
        contactRequired: true,
      },
      { status: 200 }
    );
  }
}
