"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import {
  X,
  Compass,
  FileCheck,
  CloudSun,
  Plane,
  Coins,
  ShieldAlert,
  Utensils,
  ArrowRight,
} from "lucide-react";
import { StarCreatureMascot } from "./star-creature-mascot";

export interface StarCapability {
  id: string;
  badgeVi: string;
  badgeEn: string;
  titleVi: string;
  titleEn: string;
  descVi: string;
  descEn: string;
  icon: React.ComponentType<{ className?: string }>;
  promptVi: string;
  promptEn: string;
}

export const STAR_CAPABILITIES: StarCapability[] = [
  {
    id: "itinerary",
    badgeVi: "Lên lịch trình 3N2Đ",
    badgeEn: "3D2N Itinerary",
    titleVi: "Lên lịch trình theo sở thích & ngân sách",
    titleEn: "Plan personalized itineraries by vibe & budget",
    descVi: "Gợi ý tour trọn gói Sa Pa, Đà Lạt, Phú Quốc, Hạ Long tối ưu chi phí.",
    descEn: "Custom itineraries tailored to your dates, group size and budget.",
    icon: Compass,
    promptVi: "Gợi ý lịch trình du lịch 3 ngày 2 đêm tối ưu chi phí giúp mình",
    promptEn: "Help me plan an optimized 3-day 2-night Vietnam itinerary",
  },
  {
    id: "visa",
    badgeVi: "Thị thực & E-visa 2026",
    badgeEn: "Visa & Entry Policy",
    titleVi: "Kiểm tra miễn visa 45 ngày & E-visa 90 ngày",
    titleEn: "Check 45-day exemption & 90-day e-visa guide",
    descVi: "Quy định 2026 cho 25 nước, đặc khu Phú Quốc và cổng evisa.gov.vn.",
    descEn: "Official rules for 25 nations, Phu Quoc zone, and evisa.gov.vn portal.",
    icon: FileCheck,
    promptVi: "Hướng dẫn thủ tục xin e-visa Việt Nam 90 ngày mới nhất",
    promptEn: "Guide me on applying for a 90-day Vietnam e-visa",
  },
  {
    id: "weather",
    badgeVi: "Thời tiết 12 điểm đến",
    badgeEn: "Weather & Seasons",
    titleVi: "Nên đi du lịch vào tháng mấy đẹp nhất?",
    titleEn: "Best months to visit across 12 destinations",
    descVi: "Tháng vàng, tháng tránh bão và nhiệt độ theo mùa cho 12 danh thắng.",
    descEn: "Ideal sunny months, rainy storm alerts, and seasonal temperatures.",
    icon: CloudSun,
    promptVi: "Thời tiết du lịch Việt Nam mùa nào đẹp nhất cho 12 điểm đến?",
    promptEn: "What is the best time to visit Vietnam across the 12 destinations?",
  },
  {
    id: "currency",
    badgeVi: "Đổi tiền & Dự toán",
    badgeEn: "Currency & Budget",
    titleVi: "Đổi tiền VND ở đâu an toàn & dự toán chi phí?",
    titleEn: "Where to exchange VND safely & daily budget tiers",
    descVi: "Cảnh báo tiền 20k vs 500k, 3 kênh đổi tiền và chi tiêu tiết kiệm.",
    descEn: "20k vs 500k confusion warning, licensed gold shops, and daily tiers.",
    icon: Coins,
    promptVi: "Dự toán chi phí du lịch Việt Nam 1 ngày và cách đổi tiền an toàn",
    promptEn: "Daily travel budget in Vietnam and safe currency exchange tips",
  },
  {
    id: "transport",
    badgeVi: "Đón xe & Tàu hỏa",
    badgeEn: "Transit & Transfers",
    titleVi: "Hướng dẫn đón xe sân bay & tàu hỏa Hải Vân",
    titleEn: "Airport transfer guide & scenic SE train passes",
    descVi: "Giá cước Grab taxi, tàu SE ngắm đèo Hải Vân và xe Dcar Limousine.",
    descEn: "Grab taxi fares, Hai Van pass train ride, and airport pickups.",
    icon: Plane,
    promptVi: "Cẩm nang đón xe sân bay và di chuyển nội địa Việt Nam",
    promptEn: "Guide for domestic transport and airport transfers in Vietnam",
  },
  {
    id: "safety",
    badgeVi: "Cứu hộ khẩn cấp 113/115",
    badgeEn: "Emergency SOS Numbers",
    titleVi: "Số cứu hộ 113/115 & an toàn tắm biển, leo núi",
    titleEn: "National 113/115 SOS numbers & activity safety",
    descVi: "Hotline công an 113, y tế 115, kỹ năng thoát sóng rút xa bờ.",
    descEn: "Toll-free police 113, ambulance 115, and rip current survival.",
    icon: ShieldAlert,
    promptVi: "Các số điện thoại khẩn cấp 113/115 và lưu ý an toàn du lịch",
    promptEn: "Emergency hotlines 113, 115 and essential travel safety guidelines",
  },
  {
    id: "michelin",
    badgeVi: "Ẩm thực & Michelin",
    badgeEn: "Dining & Michelin",
    titleVi: "Gợi ý nhà hàng Michelin & quán ngon địa phương",
    titleEn: "Curated Michelin restaurants & local food gems",
    descVi: "Tuyển tập món ngon 3 miền, hải sản tươi sống và đặt bàn ưu đãi.",
    descEn: "3 regions specialties, fresh seafood, and reservation links.",
    icon: Utensils,
    promptVi: "Gợi ý nhà hàng Michelin và các quán ngon địa phương tại Việt Nam",
    promptEn: "Recommend Michelin restaurants and local delicacies in Vietnam",
  },
];

interface InteractiveMotionTriggerProps {
  isOpen: boolean;
  onToggle: () => void;
  onSelectPrompt?: (promptText: string) => void;
  isEn?: boolean;
}

export function InteractiveMotionTrigger({
  isOpen,
  onToggle,
  onSelectPrompt,
  isEn = false,
}: InteractiveMotionTriggerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  // Active Capability Carousel Index
  const [activeCapIndex, setActiveCapIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isSpeechDismissed, setIsSpeechDismissed] = useState(false);

  // Mouse Tracking for Eyes & 3D Tilt
  const [eyeOffset, setEyeOffset] = useState({ x: 0, y: 0 });
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [magnetic, setMagnetic] = useState({ x: 0, y: 0 });

  // Auto-Cycle Rotating Capabilities every 4.2s (pause on user hover)
  useEffect(() => {
    if (isPaused || isOpen || isSpeechDismissed) return;

    const cycleInterval = setInterval(() => {
      setActiveCapIndex((prev) => (prev + 1) % STAR_CAPABILITIES.length);
    }, 4200);

    return () => clearInterval(cycleInterval);
  }, [isPaused, isOpen, isSpeechDismissed]);

  // Pointer tracking for eye follow & 3D tilt
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = (mouseX / width - 0.5) * 2; // -1 to 1
    const yPct = (mouseY / height - 0.5) * 2; // -1 to 1

    setEyeOffset({
      x: Math.max(-2.8, Math.min(2.8, xPct * 2.8)),
      y: Math.max(-2.8, Math.min(2.8, yPct * 2.8)),
    });

    setTilt({
      x: yPct * -12,
      y: xPct * 14,
    });

    setMagnetic({
      x: xPct * 8,
      y: yPct * 8,
    });
  }, []);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsPressed(false);
    setEyeOffset({ x: 0, y: 0 });
    setTilt({ x: 0, y: 0 });
    setMagnetic({ x: 0, y: 0 });
  };

  // When chat drawer is open, Bé Sao is located directly at the top header of the chat box!
  if (isOpen) {
    return null;
  }

  const currentCap = STAR_CAPABILITIES[activeCapIndex];

  const handlePromptClick = (promptText: string) => {
    if (onSelectPrompt) {
      onSelectPrompt(promptText);
    } else {
      onToggle();
    }
  };

  
  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="fixed bottom-6 right-6 z-50 flex flex-col items-center select-none"
      style={{
        transform: `translate3d(${magnetic.x}px, ${magnetic.y}px, 0)`,
        transition: isHovered
          ? "transform 0.12s cubic-bezier(0.16, 1, 0.3, 1)"
          : "transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      {/* ─── 1. SLEEK COMPACT WHISPER PILL (WHEN CHAT IS CLOSED) ─── */}
      {!isSpeechDismissed && (
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="absolute bottom-full mb-3 right-0 transition-all duration-300 ease-out transform pointer-events-auto select-none"
        >
          <div
            onClick={() => handlePromptClick(isEn ? currentCap.promptEn : currentCap.promptVi)}
            className="group relative flex items-center rounded-full bg-white/95 backdrop-blur-md border border-amber-300/80 shadow-[0_4px_16px_rgba(234,179,8,0.22)] px-3.5 py-1.5 cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-[0_6px_22px_rgba(234,179,8,0.32)] hover:border-amber-400 whitespace-nowrap"
            title={isEn ? "Click to ask Baby STAR" : "Nhấn để hỏi Bé Sao STAR ngay"}
          >
            {/* Speech bubble pointer pointing down towards Bé Sao */}
            <div className="absolute -bottom-1.5 right-8 sm:right-10 size-2.5 bg-white rotate-45 border-r border-b border-amber-300/80" />

            {/* Rotating clean utility text without unnecessary icons */}
            <div
              key={currentCap.id}
              className="flex items-center animate-in fade-in slide-in-from-bottom-1 duration-200"
            >
              <span className="text-xs font-semibold text-slate-800 group-hover:text-[#da251d] transition-colors whitespace-nowrap">
                {isEn ? currentCap.badgeEn : currentCap.badgeVi}
              </span>
            </div>

            {/* Minimalist dismiss button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsSpeechDismissed(true);
              }}
              className="ml-2 -mr-1 p-0.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition cursor-pointer shrink-0"
              title={isEn ? "Dismiss" : "Ẩn"}
            >
              <X className="size-3" />
            </button>
          </div>
        </div>
      )}

      {/* ─── 2. THE LIVING STAR CREATURE ENTITY (NO BOX, FREE FLOATING) ─── */}
      <button
        type="button"
        data-testid="assistant-mascot-trigger"
        onClick={onToggle}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        aria-label={isEn ? "Chat with Baby STAR" : "Trò chuyện cùng Bé Sao STAR"}
        className="group relative cursor-pointer focus:outline-none flex flex-col items-center justify-center p-0 bg-transparent border-0 shadow-none transition-transform duration-200"
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${isPressed ? 0.9 : isHovered ? 1.15 : 1})`,
          perspective: 900,
        }}
      >
        <StarCreatureMascot
          size="lg"
          eyeOffset={eyeOffset}
          isHovered={isHovered}
          showOrbit={false}
          showShadow
        />
      </button>

      {/* Global CSS Keyframes for Star Creature Float, Jiggle & Shadow */}
      <style jsx global>{`
        @keyframes creatureBobbing {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-6px) rotate(3deg);
          }
        }

        @keyframes creatureShadow {
          0%, 100% {
            transform: scaleX(1) scaleY(1);
            opacity: 0.35;
          }
          50% {
            transform: scaleX(0.8) scaleY(0.7);
            opacity: 0.18;
          }
        }

        @keyframes creatureJiggle {
          0% {
            transform: translateY(-4px) rotate(-5deg) scale(1.08);
          }
          100% {
            transform: translateY(-9px) rotate(5deg) scale(1.14);
          }
        }
      `}</style>
    </div>
  );
}
