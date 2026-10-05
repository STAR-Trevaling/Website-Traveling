"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MapPin, BookOpen, Compass, ChevronDown, Search, Users } from "lucide-react";
import { useLanguage } from "@/lib/i18n/context";

type TabType = "destinations" | "experiences" | "stories";

interface BilingualOption {
  vi: string;
  en: string;
}

const VIETNAM_DESTINATIONS: BilingualOption[] = [
  { vi: "Hà Nội", en: "Hanoi" },
  { vi: "TP. Hồ Chí Minh", en: "Ho Chi Minh City" },
  { vi: "Đà Nẵng", en: "Da Nang" },
  { vi: "Hội An", en: "Hoi An" },
  { vi: "Đà Lạt", en: "Da Lat" },
  { vi: "Phú Quốc", en: "Phu Quoc" },
  { vi: "Nha Trang", en: "Nha Trang" },
  { vi: "Huế", en: "Hue" },
  { vi: "Sa Pa", en: "Sa Pa" },
  { vi: "Hạ Long", en: "Ha Long" },
  { vi: "Ninh Bình", en: "Ninh Binh" },
  { vi: "Mũi Né", en: "Mui Ne" },
];

const EXPERIENCE_TYPES: BilingualOption[] = [
  { vi: "Văn hóa & Lịch sử", en: "Culture & History" },
  { vi: "Phiêu lưu & Thiên nhiên", en: "Adventure & Nature" },
  { vi: "Ẩm thực & Khám phá", en: "Cuisine & Exploration" },
  { vi: "Nghỉ dưỡng & Biển", en: "Resorts & Beaches" },
  { vi: "Trekking & Leo núi", en: "Trekking & Mountains" },
  { vi: "Làng nghề & Thủ công", en: "Craft Villages" },
  { vi: "Lễ hội & Sự kiện", en: "Festivals & Events" },
  { vi: "Chụp ảnh & Sáng tạo", en: "Photography & Scenery" },
];

const STORY_TOPICS: BilingualOption[] = [
  { vi: "Bí quyết du lịch tiết kiệm", en: "Budget Travel Tips" },
  { vi: "Hành trình một mình", en: "Solo Expeditions" },
  { vi: "Du lịch cùng gia đình", en: "Family Holidays" },
  { vi: "Ẩm thực đường phố Việt Nam", en: "Vietnamese Street Food" },
  { vi: "Khám phá làng bản miền núi", en: "Highland Village Trails" },
  { vi: "Biển đảo hoang sơ", en: "Untouched Tropical Islands" },
  { vi: "Di sản văn hóa UNESCO", en: "UNESCO World Heritage" },
  { vi: "Mùa lúa chín Tây Bắc", en: "Northwest Golden Harvest" },
];

const TRAVELLER_OPTIONS: BilingualOption[] = [
  { vi: "1 Du khách", en: "1 Traveller" },
  { vi: "2 Du khách", en: "2 Travellers" },
  { vi: "Cặp đôi", en: "Couple" },
  { vi: "Gia đình (2+2)", en: "Family (2+2)" },
  { vi: "Nhóm (5+)", en: "Group (5+)" },
];

export function DiscoverySearch() {
  const router = useRouter();
  const { locale } = useLanguage();
  const isEn = locale === "en";

  const [activeTab, setActiveTab] = useState<TabType>("destinations");
  const [col1Index, setCol1Index] = useState(0); // Hanoi
  const [col2Index, setCol2Index] = useState(6); // Nha Trang
  const [travellerIndex, setTravellerIndex] = useState(0); // 1 Du khach

  const [openCol1, setOpenCol1] = useState(false);
  const [openCol2, setOpenCol2] = useState(false);
  const [openTravellers, setOpenTravellers] = useState(false);

  // Tab definitions
  const tabs = [
    { key: "destinations" as TabType, labelVi: "ĐIỂM ĐẾN", labelEn: "DESTINATIONS", route: "/destinations" },
    { key: "experiences" as TabType, labelVi: "TRẢI NGHIỆM", labelEn: "EXPERIENCES", route: "/experiences" },
    { key: "stories" as TabType, labelVi: "CÂU CHUYỆN", labelEn: "STORIES", route: "/stories" },
  ];

  // Column options per tab
  const getCol2Options = (): BilingualOption[] => {
    if (activeTab === "destinations") return VIETNAM_DESTINATIONS;
    if (activeTab === "experiences") return EXPERIENCE_TYPES;
    return STORY_TOPICS;
  };

  const col1Label = isEn
    ? activeTab === "destinations"
      ? "Origin"
      : "Location"
    : activeTab === "destinations"
    ? "Xuất phát"
    : "Địa điểm";

  const col2Label = isEn
    ? activeTab === "destinations"
      ? "Destination"
      : activeTab === "experiences"
      ? "Experience"
      : "Topic"
    : activeTab === "destinations"
    ? "Điểm đến"
    : activeTab === "experiences"
    ? "Loại trải nghiệm"
    : "Chủ đề";

  const col1Options = VIETNAM_DESTINATIONS;
  const col2Options = getCol2Options();

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    setOpenCol1(false);
    setOpenCol2(false);
    setOpenTravellers(false);
    setCol1Index(0);
    setCol2Index(0);
  };

  const handleSearch = () => {
    const col1Text = isEn ? col1Options[col1Index]?.en : col1Options[col1Index]?.vi;
    const col2Text = isEn ? col2Options[col2Index]?.en : col2Options[col2Index]?.vi;
    const travellersText = isEn ? TRAVELLER_OPTIONS[travellerIndex]?.en : TRAVELLER_OPTIONS[travellerIndex]?.vi;
    const currentTab = tabs.find((t) => t.key === activeTab);

    const params = new URLSearchParams({
      from: col1Text || "",
      q: col2Text || "",
      travellers: travellersText || "",
    });
    router.push(`${currentTab?.route || "/destinations"}?${params.toString()}`);
  };

  return (
    <div className="w-full">
      {/* 1. Teal Tab Ribbon */}
      <div className="flex justify-center">
        <div className="flex h-11 items-center justify-center gap-10 bg-[#0098a2] px-8 sm:px-12 text-white shadow-md">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => handleTabChange(tab.key)}
              className={`text-xs sm:text-sm font-semibold tracking-widest transition-all cursor-pointer ${
                activeTab === tab.key
                  ? "border-b-2 border-white pb-0.5 text-white"
                  : "text-white/80 hover:text-white"
              }`}
            >
              {isEn ? tab.labelEn : tab.labelVi}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Main 5-Column Search Bar */}
      <div className="relative flex flex-col md:flex-row min-h-[68px] items-stretch bg-[#e5ecea]/95 text-slate-700 shadow-2xl backdrop-blur-md border border-white/40">
        {/* Column 1: Origin / Location */}
        <div className="relative flex-1 border-b md:border-b-0 md:border-r border-[#c5d2cf]">
          <button
            type="button"
            onClick={() => {
              setOpenCol1(!openCol1);
              setOpenCol2(false);
              setOpenTravellers(false);
            }}
            className="flex h-14 md:h-full w-full items-center justify-between px-4 sm:px-5 transition hover:bg-white/40 text-left cursor-pointer"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <MapPin className="size-4 shrink-0 text-[#475569]" />
              <div className="truncate">
                <span className="block text-[11px] text-slate-500 font-normal leading-none mb-0.5">
                  {col1Label}
                </span>
                <span className="text-sm font-medium text-slate-800 truncate">
                  {isEn ? col1Options[col1Index]?.en : col1Options[col1Index]?.vi}
                </span>
              </div>
            </div>
            <ChevronDown className="size-4 shrink-0 text-slate-400" />
          </button>
          {openCol1 && (
            <div className="absolute left-0 top-full z-50 mt-1 max-h-56 w-56 overflow-auto rounded-lg bg-white p-2 shadow-xl border border-slate-100">
              {col1Options.map((opt, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setCol1Index(idx);
                    setOpenCol1(false);
                  }}
                  className="w-full rounded px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900 cursor-pointer"
                >
                  {isEn ? opt.en : opt.vi}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Column 2: Destination / Experience / Topic */}
        <div className="relative flex-1 border-b md:border-b-0 md:border-r border-[#c5d2cf]">
          <button
            type="button"
            onClick={() => {
              setOpenCol2(!openCol2);
              setOpenCol1(false);
              setOpenTravellers(false);
            }}
            className="flex h-14 md:h-full w-full items-center justify-between px-4 sm:px-5 transition hover:bg-white/40 text-left cursor-pointer"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              {activeTab === "stories" ? (
                <BookOpen className="size-4 shrink-0 text-[#475569]" />
              ) : activeTab === "experiences" ? (
                <Compass className="size-4 shrink-0 text-[#475569]" />
              ) : (
                <MapPin className="size-4 shrink-0 text-[#475569]" />
              )}
              <div className="truncate">
                <span className="block text-[11px] text-slate-500 font-normal leading-none mb-0.5">
                  {col2Label}
                </span>
                <span className="text-sm font-medium text-slate-800 truncate">
                  {isEn ? col2Options[col2Index]?.en : col2Options[col2Index]?.vi}
                </span>
              </div>
            </div>
            <ChevronDown className="size-4 shrink-0 text-slate-400" />
          </button>
          {openCol2 && (
            <div className="absolute left-0 top-full z-50 mt-1 max-h-56 w-64 overflow-auto rounded-lg bg-white p-2 shadow-xl border border-slate-100">
              {col2Options.map((opt, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setCol2Index(idx);
                    setOpenCol2(false);
                  }}
                  className="w-full rounded px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900 cursor-pointer"
                >
                  {isEn ? opt.en : opt.vi}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Column 3: Start Date */}
        <div className="relative flex-1 border-b md:border-b-0 md:border-r border-[#c5d2cf]">
          <label className="flex h-14 md:h-full w-full items-center justify-between px-4 sm:px-5 transition hover:bg-white/40 cursor-pointer">
            <div className="min-w-0 flex-1">
              <span className="block text-[11px] text-slate-500 font-normal leading-none mb-0.5">
                {isEn ? "Start date" : "Ngày bắt đầu"}
              </span>
              <input
                type="date"
                className="w-full bg-transparent text-sm font-medium text-slate-800 outline-none cursor-pointer"
                aria-label={isEn ? "Trip start date" : "Ngày bắt đầu chuyến đi"}
              />
            </div>
          </label>
        </div>

        {/* Column 4: End Date */}
        <div className="relative flex-1 border-b md:border-b-0 md:border-r border-[#c5d2cf]">
          <label className="flex h-14 md:h-full w-full items-center justify-between px-4 sm:px-5 transition hover:bg-white/40 cursor-pointer">
            <div className="min-w-0 flex-1">
              <span className="block text-[11px] text-slate-500 font-normal leading-none mb-0.5">
                {isEn ? "End date" : "Ngày kết thúc"}
              </span>
              <input
                type="date"
                className="w-full bg-transparent text-sm font-medium text-slate-800 outline-none cursor-pointer"
                aria-label={isEn ? "Trip end date" : "Ngày kết thúc chuyến đi"}
              />
            </div>
          </label>
        </div>

        {/* Column 5: Travellers */}
        <div className="relative flex-1">
          <button
            type="button"
            onClick={() => {
              setOpenTravellers(!openTravellers);
              setOpenCol1(false);
              setOpenCol2(false);
            }}
            className="flex h-14 md:h-full w-full items-center justify-between px-4 sm:px-5 transition hover:bg-white/40 text-left cursor-pointer"
          >
            <div className="flex items-center gap-2.5 min-w-0 truncate">
              <Users className="size-4 shrink-0 text-[#475569]" />
              <div className="min-w-0 truncate">
                <span className="block text-[11px] text-slate-500 font-normal leading-none mb-0.5">
                  {isEn ? "Travellers" : "Du khách"}
                </span>
                <span className="text-sm font-medium text-slate-800 truncate">
                  {isEn ? TRAVELLER_OPTIONS[travellerIndex]?.en : TRAVELLER_OPTIONS[travellerIndex]?.vi}
                </span>
              </div>
            </div>
            <ChevronDown className="size-4 shrink-0 text-slate-400" />
          </button>
          {openTravellers && (
            <div className="absolute right-0 top-full z-50 mt-1 w-52 rounded-lg bg-white p-2 shadow-xl border border-slate-100">
              {TRAVELLER_OPTIONS.map((opt, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setTravellerIndex(idx);
                    setOpenTravellers(false);
                  }}
                  className="w-full rounded px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900 cursor-pointer"
                >
                  {isEn ? opt.en : opt.vi}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Search Submit Button */}
        <button
          type="button"
          onClick={handleSearch}
          aria-label={isEn ? "Search" : "Tìm kiếm"}
          className="flex h-14 md:h-auto items-center justify-center bg-[#0098a2] px-6 text-white transition-all duration-200 hover:shadow-[0px_8px_25px_rgba(0,152,162,0.40)] hover:scale-105 active:scale-95 shrink-0 cursor-pointer"
        >
          <Search className="size-5" />
        </button>
      </div>
    </div>
  );
}
