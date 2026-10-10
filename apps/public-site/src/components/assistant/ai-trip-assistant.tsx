"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  X,
  Send,
  Sparkles,
  Compass,
  CheckCircle2,
  ChevronRight,
  BookOpen,
  MapPin,
  ExternalLink,
  PhoneCall,
  ArrowRight,
  Building2,
  Utensils,
  Phone,
  Star,
} from "lucide-react";
import { StarLogo } from "@/components/shared/star-logo";
import { useLanguage } from "@/lib/i18n/context";
import {
  queryAssistantKnowledge,
  TourCardData,
  StoryCardData,
  DestinationCardData,
} from "@/lib/assistant-engine";
import { VIETNAM_ACCOMMODATIONS, getAccommodationBySlug } from "@/data/seed/accommodations";
import { VIETNAM_RESTAURANTS, getRestaurantBySlug } from "@/data/seed/restaurants";
import { publicApi } from "@/lib/api";
import type { Accommodation, Restaurant } from "@/lib/types";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  userText?: string;
  assistantContent?: string;
  tours?: TourCardData[];
  stories?: StoryCardData[];
  destinations?: DestinationCardData[];
  accommodations?: Accommodation[];
  restaurants?: Restaurant[];
  contactRequired?: boolean;
  leadCaptured?: boolean;
}

/**
 * Parses markdown bold **text** and [Link Label](url) into interactive Next.js Link components
 */
function getSafeHref(url: string): string {
  if (!url || typeof url !== "string") return "#";
  const trimmed = url.trim();
  if (trimmed.startsWith("/") && !trimmed.startsWith("//") && !trimmed.startsWith("/\\")) {
    return encodeURI(trimmed);
  }
  try {
    const parsed = new URL(trimmed);
    if (parsed.protocol === "http:" || parsed.protocol === "https:") {
      return parsed.href;
    }
  } catch {
    // Invalid URL fallback
  }
  return "#";
}

function cleanAssistantReply(text: string): string {
  if (!text) return "";
  return text
    // Strip emojis and miscellaneous pictorial symbols
    .replace(/[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F1E0}-\u{1F1FF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}]/gu, "")
    // Strip specific decorative icons
    .replace(/[✨🌟⭐✈️🛳️🏝️🏔️🏮🤿👨‍👩‍👧‍👦👨‍👩‍👧📝📞📍👉✦]/gu, "")
    .replace(/\s{2,}/g, " ")
    .trim();
}

function renderFormattedMessage(text: string, onLinkClick: () => void) {
  const deEmoji = cleanAssistantReply(text);
  const cleaned = deEmoji
    .replace(/\[TOUR_CARD:\s*[\w-]+\]/g, "")
    .replace(/\[ACCOMMODATION_CARD:\s*[\w-]+\]/g, "")
    .replace(/\[RESTAURANT_CARD:\s*[\w-]+\]/g, "")
    .replace(/\*\*\[([^\]]+)\]\(([^)]+)\)\*\*/g, "[$1]($2)");
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = linkRegex.exec(cleaned)) !== null) {
    if (match.index > lastIndex) {
      parts.push(renderBoldText(cleaned.substring(lastIndex, match.index)));
    }
    const label = match[1];
    const rawHref = match[2];
    const href = getSafeHref(rawHref);
    parts.push(
      <Link
        key={`link-part-${parts.length}`}
        href={href}
        onClick={onLinkClick}
        className="inline-flex items-center gap-0.5 font-bold text-[#da251d] underline underline-offset-2 hover:text-[#991b1b] transition mx-0.5"
      >
        <span>{label}</span>
        <ExternalLink className="size-3 inline opacity-70" />
      </Link>
    );
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < cleaned.length) {
    parts.push(renderBoldText(cleaned.substring(lastIndex)));
  }

  return parts;
}

function renderBoldText(text: string) {
  const boldRegex = /\*\*([^*]+)\*\*/g;
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = boldRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }
    parts.push(
      <strong key={`bold-${match.index}`} className="font-bold text-slate-900">
        {match[1]}
      </strong>
    );
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return parts;
}

export function AITripAssistant() {
  const { isEnglish } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [sessionToken, setSessionToken] = useState<string>("");
  const [showTooltip, setShowTooltip] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Periodic tooltip pill: visible for 5s every 20s to conserve screen space
  useEffect(() => {
    if (isOpen) {
      setShowTooltip(false);
      return;
    }

    const initialShow = setTimeout(() => {
      setShowTooltip(true);
    }, 3000);

    const initialHide = setTimeout(() => {
      setShowTooltip(false);
    }, 8000);

    let hideTimer: NodeJS.Timeout | null = null;
    const interval = setInterval(() => {
      setShowTooltip(true);
      hideTimer = setTimeout(() => {
        setShowTooltip(false);
      }, 5000);
    }, 20000);

    return () => {
      clearTimeout(initialShow);
      clearTimeout(initialHide);
      if (hideTimer) clearTimeout(hideTimer);
      clearInterval(interval);
    };
  }, [isOpen]);

  // Initialize or load session token and welcome message
  useEffect(() => {
    let token = "";
    if (typeof window !== "undefined") {
      token = localStorage.getItem("star_ai_session_token") || "";
      if (!token) {
        token = `sess_${Math.random().toString(36).substring(2, 11)}`;
        localStorage.setItem("star_ai_session_token", token);
      }
      setSessionToken(token);
    }

    const greetingVi =
      "Dạ chào Quý khách! Em là **STAR Concierge** — Trợ lý tư vấn du lịch thông minh của STAR Travels Vietnam.\n\n" +
      "Em có thể gợi ý các tour hot nhất, cẩm nang du lịch và điểm đến tuyệt đẹp kèm đường dẫn xem trực tiếp. Quý khách đang lên kế hoạch khám phá nơi nào ạ?";

    const greetingEn =
      "Welcome to STAR Travels! I am **STAR Concierge**, your private AI travel advisor.\n\n" +
      "I can recommend handcrafted itineraries, luxury packages matching your budget, and provide direct links to tours and articles. Where would you like to explore?";

    setMessages([
      {
        id: "welcome",
        role: "assistant",
        assistantContent: isEnglish ? greetingEn : greetingVi,
      },
    ]);
  }, [isEnglish]);

  // Support opening AI Concierge from external buttons or widgets
  useEffect(() => {
    const handleCustomOpen = (e: Event) => {
      const customEvent = e as CustomEvent<{ prompt?: string }>;
      setIsOpen(true);
      setShowTooltip(false);
      if (customEvent.detail?.prompt) {
        handleSendMessage(customEvent.detail.prompt);
      }
    };
    window.addEventListener("star:open-ai-concierge", handleCustomOpen);
    return () => {
      window.removeEventListener("star:open-ai-concierge", handleCustomOpen);
    };
  }, []);

  // Scroll to bottom on new message
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen, isLoading]);

  const handleReferralClick = async (
    itemType: "accommodation_referral" | "restaurant_referral",
    itemId: string,
    targetUrl: string,
    isPhone = false
  ) => {
    try {
      await publicApi.trackReferral(
        {
          item_type: itemType,
          item_id: itemId,
        },
        1500
      );
    } catch {
      // proceed non-blocking
    } finally {
      if (isPhone) {
        window.location.href = targetUrl;
      } else {
        window.open(targetUrl, "_blank", "noopener,noreferrer");
      }
    }
  };

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user_${Date.now()}`,
      role: "user",
      userText: text,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/assistant/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          session_token: sessionToken,
          message: text,
          locale: isEnglish ? "en" : "vi",
        }),
      });

      if (!response.ok) {
        throw new Error(`Chat request returned status ${response.status}`);
      }

      const data = await response.json();

      const rawText = data.message || "";
      const accMatches = Array.from(rawText.matchAll(/\[ACCOMMODATION_CARD:\s*([\w-]+)\]/g)) as RegExpMatchArray[];
      const resMatches = Array.from(rawText.matchAll(/\[RESTAURANT_CARD:\s*([\w-]+)\]/g)) as RegExpMatchArray[];

      const extractedAccs: Accommodation[] = [
        ...(data.recommended_accommodations || []),
        ...accMatches
          .map((m) => getAccommodationBySlug(m[1]))
          .filter((x): x is Accommodation => Boolean(x)),
      ];
      const uniqueAccs = Array.from(new Map(extractedAccs.map((a) => [a.slug, a])).values());

      const extractedRess: Restaurant[] = [
        ...(data.recommended_restaurants || []),
        ...resMatches
          .map((m) => getRestaurantBySlug(m[1]))
          .filter((x): x is Restaurant => Boolean(x)),
      ];
      const uniqueRess = Array.from(new Map(extractedRess.map((r) => [r.slug, r])).values());

      const assistantMsg: ChatMessage = {
        id: `assistant_${Date.now()}`,
        role: "assistant",
        assistantContent: cleanAssistantReply(data.message),
        tours: data.recommended_tours || [],
        stories: data.recommended_stories || [],
        destinations: data.recommended_destinations || [],
        accommodations: uniqueAccs,
        restaurants: uniqueRess,
        leadCaptured: data.lead_captured || false,
        contactRequired: Boolean(data.contactRequired),
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch {
      // Offline fallback: intelligent local concierge engine guarantees tour & article links
      const localData = queryAssistantKnowledge(text, isEnglish ? "en" : "vi");

      const localRaw = localData.message || "";
      const localAccMatches = Array.from(localRaw.matchAll(/\[ACCOMMODATION_CARD:\s*([\w-]+)\]/g)) as RegExpMatchArray[];
      const localResMatches = Array.from(localRaw.matchAll(/\[RESTAURANT_CARD:\s*([\w-]+)\]/g)) as RegExpMatchArray[];

      const fallbackAccs = localAccMatches
        .map((m) => getAccommodationBySlug(m[1]))
        .filter((x): x is Accommodation => Boolean(x));
      const fallbackRess = localResMatches
        .map((m) => getRestaurantBySlug(m[1]))
        .filter((x): x is Restaurant => Boolean(x));

      setMessages((prev) => [
        ...prev,
        {
          id: `fallback_${Date.now()}`,
          role: "assistant",
          assistantContent: cleanAssistantReply(localData.message),
          tours: localData.recommended_tours,
          stories: localData.recommended_stories,
          destinations: localData.recommended_destinations,
          accommodations: fallbackAccs,
          restaurants: fallbackRess,
          contactRequired: Boolean(localData.contactRequired),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const quickPrompts = isEnglish
    ? [
        "Hotels & Resorts by Region",
        "Dining & Restaurants by Region",
        "Sa Pa & Fansipan Cloud Hunting",
        "Ha Long Bay 5-Star Cruise",
        "Da Nang — Hoi An Ancient Town",
        "Phu Quoc Coral Diving Tour",
        "Family Vacation Packages",
      ]
    : [
        "Gợi ý Khách sạn & Resort theo khu vực",
        "Nhà hàng & Ẩm thực theo khu vực",
        "Săn mây Sa Pa & Fansipan",
        "Du thuyền 5 sao Hạ Long",
        "Đà Nẵng — Phố cổ Hội An",
        "Tour lặn san hô Phú Quốc",
        "Lịch trình gia đình 4 người",
      ];

  return (
    <>
      {/* ─── FLOATING TRIGGER BUTTON ────────────────────────────────── */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
        {/* Tooltip Pill - Only visible for 5s every 20s to preserve screen space */}
        {!isOpen && (
          <div
            className={`transition-all duration-500 ease-in-out transform ${
              showTooltip
                ? "opacity-100 translate-x-0 scale-100 pointer-events-auto"
                : "opacity-0 translate-x-3 scale-95 pointer-events-none"
            }`}
          >
            <button
              onClick={() => {
                setShowTooltip(false);
                setIsOpen(true);
              }}
              className="hidden md:flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 text-xs font-semibold text-slate-800 shadow-[0_4px_20px_rgba(218,37,29,0.18)] border border-red-100 hover:border-red-200 hover:scale-105 transition-all duration-300"
            >
              <Sparkles
                className="size-3.5 text-amber-500 animate-spin"
                style={{ animationDuration: "3s" }}
              />
              <span>{isEnglish ? "Plan with STAR AI" : "Tư vấn lịch trình với STAR AI"}</span>
            </button>
          </div>
        )}

        {/* Bubble Trigger - Nền đỏ sao vàng Việt Nam */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Open AI Assistant"
          className="relative flex size-14 items-center justify-center rounded-full bg-gradient-to-tr from-[#991b1b] via-[#da251d] to-[#dc2626] text-white shadow-[0_6px_28px_rgba(218,37,29,0.45)] transition-all duration-300 hover:scale-110 active:scale-95 focus:outline-none"
        >
          {isOpen ? (
            <X className="size-6 text-white" />
          ) : (
            <>
              {/* Pulsing ring đỏ tím */}
              <span className="absolute -inset-1 rounded-full bg-[#7d1643]/35 animate-ping opacity-75" />
              <StarLogo variant="icon-only" size="md" />
            </>
          )}
        </button>
      </div>

      {/* ─── CHAT DRAWER / POP-UP ──────────────────────────────────── */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 sm:right-6 z-50 w-[94vw] sm:w-[440px] h-[640px] max-h-[84vh] rounded-2xl bg-white/95 backdrop-blur-xl border border-slate-200/90 shadow-[0_16px_56px_rgba(0,0,0,0.22)] flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-6 duration-300">
          {/* Header - Nền đỏ tím sang trọng (Red-Purple / Bordeaux-Wine) */}
          <div className="bg-gradient-to-r from-[#591030] via-[#7d1643] to-[#4c0c28] p-4 text-white flex items-center justify-between border-b border-[#961c50]/50 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-[#8c1d48] backdrop-blur-md border border-amber-400/40 shadow-sm">
                <StarLogo variant="icon-only" size="sm" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold tracking-tight text-white">
                    STAR Concierge
                  </h3>
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-semibold text-emerald-300 border border-emerald-500/30">
                    <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Online
                  </span>
                </div>
                <p className="text-[11px] text-white/80 font-light">
                  {isEnglish
                    ? "AI Travel Concierge & Real-time Booking Guide"
                    : "Trợ lý du lịch thông minh STAR Travels"}
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="rounded-lg p-1.5 text-white/70 hover:text-white hover:bg-white/10 transition cursor-pointer"
            >
              <X className="size-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs sm:text-sm">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}
              >
                {/* Bubble Container */}
                <div
                  className={`max-w-[92%] rounded-2xl px-4 py-3 leading-relaxed shadow-sm ${
                    msg.role === "user"
                      ? "bg-slate-900 text-white rounded-br-none"
                      : "bg-slate-100/90 text-slate-800 rounded-bl-none border border-slate-200/60"
                  }`}
                >
                  <div className="whitespace-pre-line">
                    {msg.role === "user" ? (
                      <span>{msg.userText}</span>
                    ) : (
                      renderFormattedMessage(msg.assistantContent || "", () => setIsOpen(false))
                    )}
                  </div>
                </div>

                {/* 🎯 Direct Tour Recommendation Cards */}
                {msg.tours && msg.tours.length > 0 && (
                  <div className="mt-2.5 w-full space-y-2">
                    <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                      <Compass className="size-3.5 text-[#da251d]" />
                      <span>{isEnglish ? "Recommended Tours" : "Tour Gợi Ý Trực Tiếp"}</span>
                    </div>
                    {msg.tours.map((tour) => (
                      <Link
                        key={tour.slug}
                        href={`/tours/${tour.slug}`}
                        onClick={() => setIsOpen(false)}
                        className="group flex items-center gap-3 rounded-xl bg-white p-2.5 shadow-sm border border-slate-200/80 hover:border-[#da251d] hover:shadow-md transition-all"
                      >
                        <div className="relative size-16 shrink-0 overflow-hidden rounded-lg bg-slate-100">
                          <Image
                            src={tour.image}
                            alt={tour.title}
                            fill
                            unoptimized
                            className="object-cover group-hover:scale-105 transition duration-300"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-bold text-slate-900 line-clamp-2 group-hover:text-[#da251d] transition">
                            {tour.title}
                          </h4>
                          <div className="mt-1 flex items-center gap-2 text-[11px] text-slate-500">
                            <span>{tour.duration}</span>
                            <span>•</span>
                            <span className="font-semibold text-amber-700">
                              {tour.price.toLocaleString("vi-VN")} đ
                            </span>
                          </div>
                        </div>
                        <ChevronRight className="size-4 text-slate-400 group-hover:text-[#da251d] transition shrink-0" />
                      </Link>
                    ))}
                  </div>
                )}

                {/* 📖 Direct Story & Guide Cards */}
                {msg.stories && msg.stories.length > 0 && (
                  <div className="mt-2.5 w-full space-y-2">
                    <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                      <BookOpen className="size-3.5 text-blue-600" />
                      <span>{isEnglish ? "Related Travel Guides" : "Bài Viết & Cẩm Nang Du Lịch"}</span>
                    </div>
                    {msg.stories.map((story) => (
                      <Link
                        key={story.slug}
                        href={`/stories/${story.slug}`}
                        onClick={() => setIsOpen(false)}
                        className="group flex items-center gap-3 rounded-xl bg-white p-2.5 shadow-sm border border-slate-200/80 hover:border-blue-600 hover:shadow-md transition-all"
                      >
                        <div className="relative size-16 shrink-0 overflow-hidden rounded-lg bg-slate-100">
                          <Image
                            src={story.image}
                            alt={story.title}
                            fill
                            unoptimized
                            className="object-cover group-hover:scale-105 transition duration-300"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="inline-block px-1.5 py-0.5 rounded text-[10px] font-semibold bg-blue-50 text-blue-700 border border-blue-200 mb-1">
                            {story.category}
                          </span>
                          <h4 className="text-xs font-bold text-slate-900 line-clamp-1 group-hover:text-blue-600 transition">
                            {story.title}
                          </h4>
                          <div className="mt-0.5 text-[11px] text-slate-500">
                            <span>{story.readTime}</span>
                          </div>
                        </div>
                        <ChevronRight className="size-4 text-slate-400 group-hover:text-blue-600 transition shrink-0" />
                      </Link>
                    ))}
                  </div>
                )}

                {/* 📍 Direct Destination Cards */}
                {msg.destinations && msg.destinations.length > 0 && (
                  <div className="mt-2.5 w-full space-y-1.5">
                    <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                      <MapPin className="size-3.5 text-emerald-600" />
                      <span>{isEnglish ? "Featured Destinations" : "Điểm Đến Liên Quan"}</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {msg.destinations.map((dest) => (
                        <Link
                          key={dest.slug}
                          href={`/destinations/${dest.slug}`}
                          onClick={() => setIsOpen(false)}
                          className="group flex items-center gap-2 rounded-xl bg-white p-2 shadow-sm border border-slate-200/80 hover:border-emerald-600 hover:shadow transition"
                        >
                          <div className="relative size-10 shrink-0 overflow-hidden rounded-lg bg-slate-100">
                            <Image
                              src={dest.image}
                              alt={dest.name}
                              fill
                              unoptimized
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h5 className="text-[11px] font-bold text-slate-900 truncate group-hover:text-emerald-600 transition">
                              {dest.name}
                            </h5>
                            <span className="text-[10px] text-slate-500 block truncate">
                              {isEnglish ? "Explore destination" : "Xem điểm đến"}
                            </span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* 🏨 Direct Accommodation Referral Cards */}
                {msg.accommodations && msg.accommodations.length > 0 && (
                  <div className="mt-2.5 w-full space-y-2">
                    <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                      <Building2 className="size-3.5 text-amber-600" />
                      <span>{isEnglish ? "Recommended Luxury Stays" : "Khách Sạn & Resort Gợi Ý"}</span>
                    </div>
                    {msg.accommodations.map((acc) => (
                      <div
                        key={acc.slug}
                        className="group flex flex-col rounded-xl bg-white p-3 shadow-sm border border-slate-200/80 hover:border-amber-400 hover:shadow-md transition-all"
                      >
                        <div className="flex items-center gap-3">
                          <div className="relative size-16 shrink-0 overflow-hidden rounded-lg bg-slate-100">
                            <Image
                              src={acc.image_url}
                              alt={acc.name}
                              fill
                              unoptimized
                              className="object-cover group-hover:scale-105 transition duration-300"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1 text-[10px] text-amber-600 font-bold mb-0.5">
                              <Star className="size-3 fill-amber-400 text-amber-400" />
                              <span>{Number(acc.rating_average || 5).toFixed(1)}</span>
                              <span className="text-slate-400 font-normal">• {acc.category}</span>
                            </div>
                            <Link
                              href={`/accommodations/${acc.slug}`}
                              onClick={() => setIsOpen(false)}
                              className="text-xs font-bold text-slate-900 line-clamp-1 hover:text-[#da251d] transition"
                            >
                              {acc.name}
                            </Link>
                            <p className="text-[10px] text-slate-500 truncate mt-0.5">
                              {acc.address}
                            </p>
                          </div>
                        </div>

                        {/* 1-Click Referral CTA */}
                        <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                          <span className="text-[11px] font-bold text-[#da251d]">
                            {acc.price_from
                              ? `${Number(acc.price_from).toLocaleString("vi-VN")} đ/đêm`
                              : "Liên hệ giá"}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              handleReferralClick(
                                "accommodation_referral",
                                acc.id,
                                acc.partner_booking_url
                              )
                            }
                            className="inline-flex items-center gap-1 rounded-[2px] bg-[#da251d] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white hover:bg-[#b01b14] transition shadow-sm cursor-pointer"
                          >
                            <span>Đặt trên {acc.partner_name || "Đối tác"}</span>
                            <ExternalLink className="size-3" />
                          </button>
                        </div>
                        <span className="mt-1 text-[9px] text-slate-400 italic text-center">
                          STAR Travels giới thiệu, việc đặt phòng thực hiện qua đối tác
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {/* 🍽️ Direct Restaurant Referral Cards */}
                {msg.restaurants && msg.restaurants.length > 0 && (
                  <div className="mt-2.5 w-full space-y-2">
                    <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                      <Utensils className="size-3.5 text-emerald-600" />
                      <span>{isEnglish ? "Recommended Dining" : "Nhà Hàng & Ẩm Thực Gợi Ý"}</span>
                    </div>
                    {msg.restaurants.map((resItem) => {
                      const isPhone = resItem.contact_type === "phone";
                      return (
                        <div
                          key={resItem.slug}
                          className="group flex flex-col rounded-xl bg-white p-3 shadow-sm border border-slate-200/80 hover:border-emerald-400 hover:shadow-md transition-all"
                        >
                          <div className="flex items-center gap-3">
                            <div className="relative size-16 shrink-0 overflow-hidden rounded-lg bg-slate-100">
                              <Image
                                src={resItem.image_url}
                                alt={resItem.name}
                                fill
                                unoptimized
                                className="object-cover group-hover:scale-105 transition duration-300"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-1 text-[10px] text-emerald-700 font-bold mb-0.5">
                                <span className="rounded bg-emerald-50 px-1 py-0.2 border border-emerald-200">
                                  {resItem.price_range}
                                </span>
                                <span className="text-slate-400 font-normal">• {resItem.cuisine_type}</span>
                              </div>
                              <Link
                                href={`/restaurants/${resItem.slug}`}
                                onClick={() => setIsOpen(false)}
                                className="text-xs font-bold text-slate-900 line-clamp-1 hover:text-[#da251d] transition"
                              >
                                {resItem.name}
                              </Link>
                              <p className="text-[10px] text-slate-500 truncate mt-0.5">
                                {resItem.address}
                              </p>
                            </div>
                          </div>

                          {/* 1-Click Referral CTA */}
                          <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                            <span className="text-[10px] text-slate-500 font-medium">
                              Đánh giá: ⭐ {Number(resItem.rating_average || 5).toFixed(1)}
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                handleReferralClick(
                                  "restaurant_referral",
                                  resItem.id,
                                  resItem.contact_value,
                                  isPhone
                                )
                              }
                              className={`inline-flex items-center gap-1 rounded-[2px] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white transition shadow-sm cursor-pointer ${
                                isPhone
                                  ? "bg-[#0098a2] hover:bg-[#007f87]"
                                  : "bg-[#da251d] hover:bg-[#b01b14]"
                              }`}
                            >
                              {isPhone ? <Phone className="size-3" /> : <ExternalLink className="size-3" />}
                              <span>{isPhone ? "Gọi Đặt Bàn" : "Đặt Bàn Ngay"}</span>
                            </button>
                          </div>
                          <span className="mt-1 text-[9px] text-slate-400 italic text-center">
                            STAR Travels giới thiệu, việc đặt chỗ thực hiện trực tiếp cùng đối tác
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Lead Captured Success Banner */}
                {msg.leadCaptured && (
                  <div className="mt-2.5 flex items-center gap-2 rounded-xl bg-emerald-50 px-3 py-2 text-xs text-emerald-800 border border-emerald-200">
                    <CheckCircle2 className="size-4 shrink-0 text-emerald-600" />
                    <span>
                      {isEnglish
                        ? "Contact info received! Our private travel concierge will reach out in 15 mins."
                        : "Đã ghi nhận thông tin! Chuyên viên tư vấn STAR sẽ liên hệ lại trong 15 phút."}
                    </span>
                  </div>
                )}

                {/* 📞 Contact Required Action Card (Không tìm thấy trong dataset) */}
                {msg.contactRequired && (
                  <div className="mt-2.5 w-full rounded-2xl bg-gradient-to-br from-amber-50 via-white to-red-50/40 p-3.5 border border-amber-200 shadow-sm animate-in fade-in duration-300">
                    <div className="flex items-start gap-2.5">
                      <div className="size-8 rounded-xl bg-[#da251d] text-white flex items-center justify-center shrink-0 shadow-sm">
                        <PhoneCall className="size-4 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-slate-900">
                          {isEnglish
                            ? "Custom Itinerary & Private Concierge"
                            : "Tư Vấn Thiết Kế Lịch Trình Riêng"}
                        </h4>
                        <p className="mt-0.5 text-[11px] text-slate-600 leading-relaxed">
                          {isEnglish
                            ? "Our travel specialists are on standby to craft your bespoke Vietnam itinerary."
                            : "Yêu cầu của Quý khách cần thiết kế riêng. Đội ngũ chuyên viên STAR sẵn sàng hỗ trợ 24/7."}
                        </p>
                        <div className="mt-2.5 flex flex-wrap items-center gap-2">
                          <Link
                            href="/contact"
                            onClick={() => setIsOpen(false)}
                            className="inline-flex items-center gap-1 rounded-lg bg-[#da251d] px-3 py-1.5 text-xs font-bold text-white shadow-sm hover:bg-[#991b1b] transition"
                          >
                            <span>{isEnglish ? "Open Contact Page" : "Chuyển Đến Trang Liên Hệ"}</span>
                            <ArrowRight className="size-3" />
                          </Link>
                          <a
                            href="tel:+842439998888"
                            className="inline-flex items-center gap-1 rounded-lg bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-800 border border-slate-200 hover:border-slate-300 shadow-sm transition"
                          >
                            <span>📞 +84 (0) 24 3999 8888</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex items-center gap-2 text-slate-400 text-xs py-2">
                <div className="flex items-center gap-1 rounded-full bg-slate-100 px-3 py-2">
                  <span className="size-1.5 rounded-full bg-[#da251d] animate-bounce" />
                  <span
                    className="size-1.5 rounded-full bg-[#da251d] animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  />
                  <span
                    className="size-1.5 rounded-full bg-[#da251d] animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  />
                </div>
                <span>
                  {isEnglish
                    ? "STAR Concierge is searching packages & guides..."
                    : "STAR Concierge đang tra cứu tour & cẩm nang..."}
                </span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts Suggestions */}
          {messages.length <= 2 && (
            <div className="px-4 py-2 border-t border-slate-100 bg-slate-50/50 flex flex-wrap gap-1.5 max-h-24 overflow-y-auto">
              {quickPrompts.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(p)}
                  className="rounded-full bg-white px-2.5 py-1 text-[11px] font-medium text-slate-700 border border-slate-200/80 hover:border-[#da251d] hover:text-[#da251d] transition"
                >
                  {p}
                </button>
              ))}
            </div>
          )}

          {/* Input Box */}
          <div className="p-3 bg-white border-t border-slate-200/80">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder={
                  isEnglish
                    ? "Ask about tours, itineraries, price..."
                    : "Hỏi về tour, lịch trình, cẩm nang, giá vé..."
                }
                className="flex-1 rounded-xl bg-slate-100/80 px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 border border-slate-200/60 focus:bg-white focus:border-[#da251d] focus:outline-none transition"
              />
              <button
                type="submit"
                disabled={isLoading || !inputMessage.trim()}
                className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-slate-900 text-white hover:bg-[#da251d] disabled:opacity-40 disabled:hover:bg-slate-900 transition"
              >
                <Send className="size-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
