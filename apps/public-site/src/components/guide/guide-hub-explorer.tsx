"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  CloudSun,
  FileCheck,
  Plane,
  ShieldAlert,
  HeartHandshake,
  Coins,
  Calendar,
  ArrowRight,
  Sparkles,
  Info,
  CheckCircle2,
  X,
} from "lucide-react";
import type { GuideCategoryHubItem } from "@/data/seed/guide";

interface GuideHubExplorerProps {
  categories: GuideCategoryHubItem[];
  isEn: boolean;
}

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  CloudSun,
  FileCheck,
  Plane,
  ShieldAlert,
  HeartHandshake,
  Coins,
  Calendar,
};

export function GuideHubExplorer({ categories, isEn }: GuideHubExplorerProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState<string>("all");

  const filterChips = useMemo(
    () => [
      { id: "all", label: isEn ? "All Topics" : "Tất Cả Chủ Đề" },
      { id: "weather", label: isEn ? "Weather & Seasons" : "Thời Tiết & Khí Hậu" },
      { id: "visa", label: isEn ? "Visa & Entry" : "Thị Thực & E-Visa" },
      { id: "transport", label: isEn ? "Transport" : "Di Chuyển Nội Địa" },
      { id: "safety", label: isEn ? "Safety & SOS" : "An Toàn & Khẩn Cấp" },
      { id: "culture", label: isEn ? "Culture" : "Văn Hóa & Phép Tắc" },
      { id: "currency", label: isEn ? "Currency & Costs" : "Tiền Tệ & Chi Phí" },
      { id: "festivals", label: isEn ? "Festivals" : "Lễ Hội Theo Mùa" },
    ],
    [isEn]
  );

  const filteredCategories = useMemo(() => {
    return categories.filter((cat) => {
      const matchesTag = selectedTag === "all" || cat.slug === selectedTag;
      if (!matchesTag) return false;

      if (!searchTerm.trim()) return true;

      const q = searchTerm.toLowerCase();
      const title = (isEn ? cat.titleEn : cat.title).toLowerCase();
      const desc = (isEn ? cat.shortDescEn : cat.shortDesc).toLowerCase();
      const topics = (isEn ? cat.featuredTopicsEn : cat.featuredTopics).join(" ").toLowerCase();

      return title.includes(q) || desc.includes(q) || topics.includes(q) || cat.slug.includes(q);
    });
  }, [categories, isEn, searchTerm, selectedTag]);

  return (
    <div className="space-y-10 sm:space-y-12">
      {/* Search & Filter Toolbar */}
      <div className="rounded-[2px] bg-white/90 backdrop-blur-md p-4 sm:p-6 shadow-sm border border-slate-200/80">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={
                isEn
                  ? "Search travel guides (e.g. visa, weather, Grab, tip, 113)..."
                  : "Tìm kiếm cẩm nang (ví dụ: visa 45 ngày, thời tiết, taxi, tiền tip, 113)..."
              }
              className="w-full pl-10 pr-10 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-[2px] focus:outline-none focus:ring-1 focus:ring-[#da251d] focus:border-[#da251d] text-slate-800 placeholder-slate-400 transition"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
                aria-label="Clear search"
              >
                <X className="size-4" />
              </button>
            )}
          </div>

          {/* Quick Stats */}
          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium self-start md:self-auto">
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-[2px] bg-slate-100 text-slate-700">
              <Sparkles className="size-3 text-[#eab308]" />
              {isEn ? `${filteredCategories.length} / 7 Guide Hubs` : `${filteredCategories.length} / 7 Nhóm Cẩm Nang`}
            </span>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="mt-4 flex flex-wrap items-center gap-1.5 sm:gap-2 pt-3 border-t border-slate-100">
          {filterChips.map((chip) => {
            const isActive = selectedTag === chip.id;
            return (
              <button
                key={chip.id}
                type="button"
                onClick={() => setSelectedTag(chip.id)}
                className={`px-3 py-1 text-xs font-semibold rounded-[2px] transition ${
                  isActive
                    ? "bg-[#da251d] text-white shadow-sm"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {chip.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 7 Hub Cards Grid */}
      {filteredCategories.length === 0 ? (
        <div className="rounded-[2px] bg-white p-12 text-center border border-slate-200 shadow-sm">
          <Info className="size-8 text-slate-400 mx-auto mb-3" />
          <p className="text-slate-800 font-semibold text-base">
            {isEn ? "No matching guides found" : "Không tìm thấy nội dung phù hợp"}
          </p>
          <p className="text-slate-500 text-xs mt-1">
            {isEn
              ? "Try searching with broader terms like 'weather', 'visa', or 'transport'."
              : "Thử tìm với từ khóa chung hơn như 'thời tiết', 'visa', hoặc 'di chuyển'."}
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchTerm("");
              setSelectedTag("all");
            }}
            className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 bg-[#da251d] text-white text-xs font-semibold rounded-[2px] hover:bg-[#c92018] transition"
          >
            {isEn ? "Reset Search" : "Xem Tất Cả Cẩm Nang"}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredCategories.map((item, index) => {
            const Icon = ICON_MAP[item.iconName] || Info;
            return (
              <Link
                key={item.slug}
                href={item.href}
                className="group flex flex-col justify-between rounded-[2px] bg-white border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-slate-300 transition-all duration-300 overflow-hidden"
              >
                {/* Top Banner Accent */}
                <div className={`h-1.5 w-full bg-gradient-to-r ${item.accentColor}`} />

                <div className="p-6 sm:p-7 flex flex-col flex-1 justify-between">
                  <div>
                    {/* Header: Icon + Badge */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center justify-center size-12 rounded-[2px] bg-slate-50 border border-slate-200 text-slate-800 group-hover:bg-[#da251d] group-hover:text-white group-hover:border-[#da251d] transition-colors duration-300 shadow-xs">
                        <Icon className="size-6 transition-transform duration-300 group-hover:scale-110" />
                      </div>
                      <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-[2px] bg-amber-50 text-amber-900 border border-amber-200/80">
                        {isEn ? item.badgeEn : item.badge}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-serif text-lg sm:text-xl font-bold text-slate-900 group-hover:text-[#da251d] transition-colors line-clamp-1">
                      {isEn ? item.titleEn : item.title}
                    </h3>

                    {/* Short Description */}
                    <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-2">
                      {isEn ? item.shortDescEn : item.shortDesc}
                    </p>

                    {/* Topic Tags */}
                    <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap gap-1.5">
                      {(isEn ? item.featuredTopicsEn : item.featuredTopics).map((topic, i) => (
                        <span
                          key={i}
                          className="text-[11px] font-medium px-2 py-0.5 rounded-[2px] bg-slate-50 text-slate-600 border border-slate-100"
                        >
                          • {topic}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Footer Action */}
                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#da251d] group-hover:translate-x-0.5 transition-transform">
                    <span>{isEn ? "Explore Guide" : "Xem Chi Tiết Cẩm Nang"}</span>
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}

      {/* Quick Essential Tips Box ("4 Điều Cần Biết Trước Khi Hạ Cánh") */}
      <section className="rounded-[2px] bg-gradient-to-br from-slate-900 to-slate-800 text-white p-6 sm:p-10 shadow-lg border border-slate-700/80">
        <div className="flex items-center gap-2 mb-3">
          <span className="px-2.5 py-0.5 rounded-[2px] bg-[#da251d] text-white text-[11px] font-bold uppercase tracking-wider">
            ✦ {isEn ? "Pre-Arrival Checklist" : "Mẹo Cần Biết"}
          </span>
          <span className="text-xs text-amber-400 font-semibold">
            {isEn ? "Essential Tips for Vietnam" : "4 Điều Cần Biết Trước Khi Hạ Cánh"}
          </span>
        </div>

        <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mb-6">
          {isEn
            ? "Four Things to Know Before Touching Down in Vietnam"
            : "Hành Trang Thực Tế Cho Chuyến Du Lịch Việt Nam Trọn Vẹn"}
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="rounded-[2px] bg-white/5 border border-white/10 p-4 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-xs mb-2">
              <CheckCircle2 className="size-4 shrink-0" />
              <span>{isEn ? "1. Connectivity & SIM" : "1. SIM 4G/5G Sân Bay"}</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {isEn
                ? "Buy local Viettel or Vinaphone eSIM/physical SIM right at airport arrivals (~$8 - $12 USD for 30 days unlimited data)."
                : "Mua SIM Viettel hoặc Vinaphone ngay tại sảnh sân bay quốc tế (~150.000 - 250.000đ cho gói data 30 ngày)."}
            </p>
          </div>

          <div className="rounded-[2px] bg-white/5 border border-white/10 p-4 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-xs mb-2">
              <CheckCircle2 className="size-4 shrink-0" />
              <span>{isEn ? "2. Ride-Hailing Apps" : "2. Cài App Grab / Xanh SM"}</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {isEn
                ? "Install Grab and Xanh SM apps before arrival to avoid unauthorized taxi touts and get fixed transparent pricing."
                : "Cài đặt ứng dụng Grab hoặc Xanh SM trước khi đến để tránh taxi dù và luôn biết trước giá cước minh bạch."}
            </p>
          </div>

          <div className="rounded-[2px] bg-white/5 border border-white/10 p-4 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-xs mb-2">
              <CheckCircle2 className="size-4 shrink-0" />
              <span>{isEn ? "3. Power Plugs & Sockets" : "3. Ổ Cắm Điện Type A & C"}</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {isEn
                ? "Vietnam standard voltage is 220V (50Hz) using Type A, C, and two-pin Europlugs. Universal adapters are handy."
                : "Điện áp tiêu chuẩn tại Việt Nam là 220V (50Hz), sử dụng phích cắm 2 chấu tròn (Type C) hoặc dẹt (Type A)."}
            </p>
          </div>

          <div className="rounded-[2px] bg-white/5 border border-white/10 p-4 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-xs mb-2">
              <CheckCircle2 className="size-4 shrink-0" />
              <span>{isEn ? "4. Emergency 113 & Cash" : "4. Tiền Mặt & Hotline 113"}</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {isEn
                ? "Keep small cash notes (20k - 50k VND) for street food stalls. Police hotline is 113 and ambulance is 115."
                : "Luôn mang theo một ít tiền mặt mệnh giá nhỏ (20k - 50k) khi ăn vỉa hè. Số công an là 113, cấp cứu y tế là 115."}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
