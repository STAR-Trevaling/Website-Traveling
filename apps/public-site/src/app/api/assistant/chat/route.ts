import { NextResponse } from "next/server";
import { queryAssistantKnowledge } from "@/lib/assistant-engine";
import {
  ALL_VIETNAM_DESTINATIONS,
  VIETNAM_TOURS,
  VIETNAM_STORIES,
} from "@/data/seed";

const BASE_URL = process.env.BACKEND_URL ?? "http://localhost:8000/api/v1";

const ADVENTURE_EXPERIENCE_SLUGS = new Set([
  "canal-cruise",
  "sailing",
  "hiking",
  "camping",
  "scuba-diving",
  "kayaking",
  "rock-climbing",
  "paragliding",
]);

interface RawSource {
  entity_type?: string;
  entity_id?: string | null;
  slug?: string;
  title?: string;
  url?: string;
}

function sanitizeSources(rawSources: unknown): RawSource[] {
  if (!Array.isArray(rawSources)) return [];
  return rawSources.map((src: RawSource) => {
    let url = typeof src.url === "string" ? src.url : "";
    let entityType = src.entity_type || "destination";
    const slug = typeof src.slug === "string" ? src.slug : "";

    if (url.startsWith("/experiences/")) {
      const expSlug = url.replace("/experiences/", "").split("/")[0].split("?")[0];
      if (!ADVENTURE_EXPERIENCE_SLUGS.has(expSlug)) {
        const dest = ALL_VIETNAM_DESTINATIONS.find(
          (d) =>
            expSlug.includes(d.slug) ||
            Boolean(d.aliases?.some((a: string) => expSlug.includes(a)))
        );
        if (dest) {
          url = `/destinations/${dest.slug}`;
          entityType = "destination";
        } else {
          url = "/destinations";
        }
      }
    } else if (url.startsWith("/tours/")) {
      const tourSlug = url.replace("/tours/", "").split("/")[0].split("?")[0];
      const tour = VIETNAM_TOURS.find(
        (t) => t.slug === tourSlug || t.aliases?.includes(tourSlug)
      );
      if (tour) {
        url = `/tours/${tour.slug}`;
      }
    }

    return {
      ...src,
      entity_type: entityType,
      url,
    };
  });
}

function sanitizeTours(backendTours: any[], localTours: any[] = []): any[] {
  const validTours: any[] = [];
  const addedSlugs = new Set<string>();

  if (Array.isArray(backendTours)) {
    for (const bt of backendTours) {
      const t = VIETNAM_TOURS.find(
        (vt) => vt.slug === bt.slug || vt.aliases?.includes(bt.slug)
      );
      if (t && !addedSlugs.has(t.slug)) {
        addedSlugs.add(t.slug);
        validTours.push({
          ...bt,
          slug: t.slug,
          image: t.image || bt.image,
          title: bt.title || t.title,
        });
      }
    }
  }

  // If backend returned no valid tours or localTours has high confidence matches
  if (validTours.length === 0 && Array.isArray(localTours)) {
    for (const lt of localTours) {
      if (!addedSlugs.has(lt.slug)) {
        addedSlugs.add(lt.slug);
        validTours.push(lt);
      }
    }
  }

  return validTours;
}

function sanitizeDestinations(dests: any[], localDests: any[] = []): any[] {
  const list =
    Array.isArray(dests) && dests.length > 0 ? dests : localDests || [];
  return list.map((d) => {
    const seedDest = ALL_VIETNAM_DESTINATIONS.find((sd) => sd.slug === d.slug);
    return {
      ...d,
      image: seedDest?.image_url || d.image,
    };
  });
}

function sanitizeStories(stories: any[], localStories: any[] = []): any[] {
  const list =
    Array.isArray(stories) && stories.length > 0 ? stories : localStories || [];
  return list.filter((s) => VIETNAM_STORIES.some((vs) => vs.slug === s.slug));
}

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const userMessage = payload?.message || "";
    const locale = payload?.locale === "en" ? "en" : "vi";
    const history = Array.isArray(payload?.history) ? payload.history : [];

    // Attempt backend fetch with configurable timeout (default 25s) to support Jev RAG v2, planning & synthesis
    try {
      const controller = new AbortController();
      const timeoutMs = parseInt(
        process.env.BFF_ASSISTANT_TIMEOUT_MS || "25000",
        10
      );
      const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

      const backendRes = await fetch(
        `${BASE_URL}/assistant/conversations/chat/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
          cache: "no-store",
          signal: controller.signal,
        }
      );

      clearTimeout(timeoutId);

      if (backendRes.ok) {
        const data = await backendRes.json();
        // Enrich backend response if stories/destinations are not yet included
        const localKnowledge = queryAssistantKnowledge(
          userMessage,
          locale,
          history
        );

        const sanitizedTours = sanitizeTours(
          data.recommended_tours,
          localKnowledge.recommended_tours
        );
        const sanitizedDestinations = sanitizeDestinations(
          data.recommended_destinations,
          localKnowledge.recommended_destinations
        );
        const sanitizedStories = sanitizeStories(
          data.recommended_stories,
          localKnowledge.recommended_stories
        );
        const sanitizedSrcs = sanitizeSources(data.sources);

        const contactRequired =
          Boolean(data.contact_required) ||
          Boolean(localKnowledge.contactRequired) ||
          sanitizedTours.length === 0;

        return NextResponse.json({
          message: data.message || localKnowledge.message,
          recommended_tours: sanitizedTours,
          recommended_accommodations:
            data.recommended_accommodations ||
            localKnowledge.recommended_accommodations ||
            [],
          recommended_restaurants:
            data.recommended_restaurants ||
            localKnowledge.recommended_restaurants ||
            [],
          recommended_stories: sanitizedStories,
          recommended_destinations: sanitizedDestinations,
          recommended_guides: data.recommended_guides?.length
            ? data.recommended_guides
            : localKnowledge.recommended_guides || [],
          itinerary_plan: data.itinerary_plan || null,
          sources: sanitizedSrcs,
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
