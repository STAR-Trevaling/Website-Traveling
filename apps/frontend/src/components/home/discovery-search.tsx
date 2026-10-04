"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MapPin, BookOpen, Compass, ChevronDown, Search, Users } from "lucide-react";

type TabType = "destinations" | "experiences" | "stories";

const VIETNAM_DESTINATIONS = [
  "Hà Nội",
  "TP. Hồ Chí Minh",
  "Đà Nẵng",
  "Hội An",
  "Đà Lạt",
  "Phú Quốc",
  "Nha Trang",
  "Huế",
  "Sa Pa",
  "Hạ Long",
  "Ninh Bình",
  "Mũi Né",
];

const EXPERIENCE_TYPES = [
  "Văn hóa & Lịch sử",
  "Phiêu lưu & Thiên nhiên",
  "Ẩm thực & Khám phá",
  "Nghỉ dưỡng & Biển",
  "Trekking & Leo núi",
  "Làng nghề & Thủ công",
  "Lễ hội & Sự kiện",
  "Chụp ảnh & Sáng tạo",
];

const STORY_TOPICS = [
  "Bí quyết du lịch tiết kiệm",
  "Hành trình một mình",
  "Du lịch cùng gia đình",
  "Ẩm thực đường phố Việt Nam",
  "Khám phá làng bản miền núi",
  "Biển đảo hoang sơ",
  "Di sản văn hóa UNESCO",
  "Mùa lúa chín Tây Bắc",
];

const TRAVELLER_OPTIONS = [
  "1 Du khách",
  "2 Du khách",
  "Cặp đôi",
  "Gia đình (2+2)",
  "Nhóm (5+)",
];

const tabConfig: Record<
  TabType,
  {
    labelVi: string;
    labelEn: string;
    col1Label: string;
    col1Options: string[];
    col2Label: string;
    col2Options: string[];
    col1Icon: React.ReactNode;
    col2Icon: React.ReactNode;
    route: string;
  }
> = {
  destinations: {
    labelVi: "ĐIỂM ĐẾN",
    labelEn: "DESTINATIONS",
    col1Label: "Xuất phát",
    col1Options: VIETNAM_DESTINATIONS,
    col2Label: "Điểm đến",
    col2Options: VIETNAM_DESTINATIONS,
    col1Icon: <MapPin className="size-4 shrink-0 text-[#475569]" />,
    col2Icon: <MapPin className="size-4 shrink-0 text-[#475569]" />,
    route: "/destinations",
  },
  experiences: {
    labelVi: "TRẢI NGHIỆM",
    labelEn: "EXPERIENCES",
    col1Label: "Địa điểm",
    col1Options: VIETNAM_DESTINATIONS,
    col2Label: "Loại trải nghiệm",
    col2Options: EXPERIENCE_TYPES,
    col1Icon: <MapPin className="size-4 shrink-0 text-[#475569]" />,
    col2Icon: <Compass className="size-4 shrink-0 text-[#475569]" />,
    route: "/experiences",
  },
  stories: {
    labelVi: "CÂU CHUYỆN",
    labelEn: "STORIES",
    col1Label: "Địa điểm",
    col1Options: VIETNAM_DESTINATIONS,
    col2Label: "Chủ đề",
    col2Options: STORY_TOPICS,
    col1Icon: <MapPin className="size-4 shrink-0 text-[#475569]" />,
    col2Icon: <BookOpen className="size-4 shrink-0 text-[#475569]" />,
    route: "/stories",
  },
};

export function DiscoverySearch() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>("destinations");
  const [col1Value, setCol1Value] = useState("Hà Nội");
  const [col2Value, setCol2Value] = useState("Nha Trang");
  const [travellers, setTravellers] = useState("1 Du khách");

  const [openCol1, setOpenCol1] = useState(false);
  const [openCol2, setOpenCol2] = useState(false);
  const [openTravellers, setOpenTravellers] = useState(false);

  const cfg = tabConfig[activeTab];

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    setOpenCol1(false);
    setOpenCol2(false);
    setOpenTravellers(false);
    // Reset to sane defaults per tab
    setCol1Value("Hà Nội");
    setCol2Value(tab === "destinations" ? "Nha Trang" : tabConfig[tab].col2Options[0]);
  };

  const handleSearch = () => {
    const params = new URLSearchParams({
      from: col1Value,
      q: col2Value,
      travellers,
    });
    router.push(`${cfg.route}?${params.toString()}`);
  };

  const closeAll = () => {
    setOpenCol1(false);
    setOpenCol2(false);
    setOpenTravellers(false);
  };

  return (
    <div className="w-full">
      {/* 1. Teal Tab Ribbon — platform-aligned tabs */}
      <div className="flex justify-center">
        <div className="flex h-11 items-center justify-center gap-10 bg-[#0098a2] px-8 sm:px-12 text-white shadow-md">
          {(["destinations", "experiences", "stories"] as TabType[]).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => handleTabChange(tab)}
              className={`text-xs sm:text-sm font-semibold tracking-widest transition-all ${
                activeTab === tab
                  ? "border-b-2 border-white pb-0.5 text-white"
                  : "text-white/80 hover:text-white"
              }`}
            >
              {/* Show Vietnamese label */}
              {tabConfig[tab].labelVi}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Main 5-Column Search Bar */}
      <div className="relative flex flex-col md:flex-row min-h-[68px] items-stretch bg-[#e5ecea]/95 text-slate-700 shadow-2xl backdrop-blur-md border border-white/40">

        {/* Column 1: Origin/Location */}
        <div className="relative flex-1 border-b md:border-b-0 md:border-r border-[#c5d2cf]">
          <button
            type="button"
            onClick={() => { setOpenCol1(!openCol1); setOpenCol2(false); setOpenTravellers(false); }}
            className="flex h-14 md:h-full w-full items-center justify-between px-4 sm:px-5 transition hover:bg-white/40 text-left"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              {cfg.col1Icon}
              <div className="truncate">
                <span className="block text-[11px] text-slate-500 font-normal leading-none mb-0.5">
                  {cfg.col1Label}
                </span>
                <span className="text-sm font-medium text-slate-800 truncate">{col1Value}</span>
              </div>
            </div>
            <ChevronDown className="size-4 shrink-0 text-slate-400" />
          </button>
          {openCol1 && (
            <div className="absolute left-0 top-full z-50 mt-1 max-h-56 w-56 overflow-auto rounded-lg bg-white p-2 shadow-xl border border-slate-100">
              {cfg.col1Options.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => { setCol1Value(c); setOpenCol1(false); }}
                  className="w-full rounded px-3 py-2 text-left text-sm text-slate-700 hover:bg-[#0098a2]/10 hover:text-[#0098a2]"
                >
                  {c}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Column 2: Destination/Type/Topic */}
        <div className="relative flex-1 border-b md:border-b-0 md:border-r border-[#c5d2cf]">
          <button
            type="button"
            onClick={() => { setOpenCol2(!openCol2); setOpenCol1(false); setOpenTravellers(false); }}
            className="flex h-14 md:h-full w-full items-center justify-between px-4 sm:px-5 transition hover:bg-white/40 text-left"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              {cfg.col2Icon}
              <div className="truncate">
                <span className="block text-[11px] text-slate-500 font-normal leading-none mb-0.5">
                  {cfg.col2Label}
                </span>
                <span className="text-sm font-medium text-slate-800 truncate">{col2Value}</span>
              </div>
            </div>
            <ChevronDown className="size-4 shrink-0 text-slate-400" />
          </button>
          {openCol2 && (
            <div className="absolute left-0 top-full z-50 mt-1 max-h-56 w-64 overflow-auto rounded-lg bg-white p-2 shadow-xl border border-slate-100">
              {cfg.col2Options.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => { setCol2Value(c); setOpenCol2(false); }}
                  className="w-full rounded px-3 py-2 text-left text-sm text-slate-700 hover:bg-[#0098a2]/10 hover:text-[#0098a2]"
                >
                  {c}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Column 3: Duration / Ngày đi */}
        <div className="relative flex-1 border-b md:border-b-0 md:border-r border-[#c5d2cf]">
          <label className="flex h-14 md:h-full w-full items-center justify-between px-4 sm:px-5 transition hover:bg-white/40 cursor-pointer">
            <div className="min-w-0 flex-1">
              <span className="block text-[11px] text-slate-500 font-normal leading-none mb-0.5">
                Ngày bắt đầu
              </span>
              <input
                type="date"
                className="w-full bg-transparent text-sm font-medium text-slate-800 outline-none cursor-pointer"
                aria-label="Ngày bắt đầu chuyến đi"
              />
            </div>
          </label>
        </div>

        {/* Column 4: End date / Ngày kết thúc */}
        <div className="relative flex-1 border-b md:border-b-0 md:border-r border-[#c5d2cf]">
          <label className="flex h-14 md:h-full w-full items-center justify-between px-4 sm:px-5 transition hover:bg-white/40 cursor-pointer">
            <div className="min-w-0 flex-1">
              <span className="block text-[11px] text-slate-500 font-normal leading-none mb-0.5">
                Ngày kết thúc
              </span>
              <input
                type="date"
                className="w-full bg-transparent text-sm font-medium text-slate-800 outline-none cursor-pointer"
                aria-label="Ngày kết thúc chuyến đi"
              />
            </div>
          </label>
        </div>

        {/* Column 5: Travellers */}
        <div className="relative flex-1">
          <button
            type="button"
            onClick={() => { setOpenTravellers(!openTravellers); setOpenCol1(false); setOpenCol2(false); }}
            className="flex h-14 md:h-full w-full items-center justify-between px-4 sm:px-5 transition hover:bg-white/40 text-left"
          >
            <div className="flex items-center gap-2.5 min-w-0 truncate">
              <Users className="size-4 shrink-0 text-[#475569]" />
              <div className="min-w-0 truncate">
                <span className="block text-[11px] text-slate-500 font-normal leading-none mb-0.5">
                  Du khách
                </span>
                <span className="text-sm font-medium text-slate-800 truncate">{travellers}</span>
              </div>
            </div>
            <ChevronDown className="size-4 shrink-0 text-slate-400" />
          </button>
          {openTravellers && (
            <div className="absolute right-0 top-full z-50 mt-1 w-52 rounded-lg bg-white p-2 shadow-xl border border-slate-100">
              {TRAVELLER_OPTIONS.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => { setTravellers(opt); setOpenTravellers(false); }}
                  className="w-full rounded px-3 py-2 text-left text-sm text-slate-700 hover:bg-[#0098a2]/10 hover:text-[#0098a2]"
                >
                  {opt}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Search Submit */}
        <button
          type="button"
          onClick={handleSearch}
          aria-label="Tìm kiếm"
          className="flex h-14 md:h-auto items-center justify-center bg-[#0098a2] px-6 text-white transition hover:bg-[#007f88] active:scale-95 shrink-0"
        >
          <Search className="size-5" />
        </button>
      </div>
    </div>
  );
}
