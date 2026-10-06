"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MapPin, ChevronDown, Search, Users, Calendar } from "lucide-react";
import { useLanguage } from "@/lib/i18n/context";

type TabType = "flights" | "hotels" | "tours";

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

const TRAVELLER_OPTIONS: BilingualOption[] = [
  { vi: "1 Du khách, Phổ thông", en: "1 Traveller, Economy" },
  { vi: "2 Du khách, Phổ thông", en: "2 Travellers, Economy" },
  { vi: "2 Du khách, Thương gia", en: "2 Travellers, Business" },
  { vi: "Gia đình (2+2), Phổ thông", en: "Family (2+2), Economy" },
  { vi: "Nhóm (5+), Phổ thông", en: "Group (5+), Economy" },
];

export function DiscoverySearch() {
  const router = useRouter();
  const { locale } = useLanguage();
  const isEn = locale === "en";

  const [activeTab, setActiveTab] = useState<TabType>("flights");
  const [col1Index, setCol1Index] = useState(0); // Hanoi
  const [col2Index, setCol2Index] = useState(6); // Nha Trang
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [travellerIndex, setTravellerIndex] = useState(0);

  const [openCol1, setOpenCol1] = useState(false);
  const [openCol2, setOpenCol2] = useState(false);
  const [openTravellers, setOpenTravellers] = useState(false);

  // Template-exact 3 tabs
  const tabs = [
    { key: "flights" as TabType, labelVi: "CHUYẾN BAY", labelEn: "FLIGHTS", route: "/destinations" },
    { key: "hotels" as TabType, labelVi: "KHÁCH SẠN", labelEn: "HOTELS", route: "/experiences" },
    { key: "tours" as TabType, labelVi: "GÓI TOUR", labelEn: "TOURS", route: "/tours" },
  ];

  const formatDateDisplay = (dateStr: string) => {
    if (!dateStr) return "";
    try {
      const [year, month, day] = dateStr.split("-");
      return `${day}/${month}/${year}`;
    } catch {
      return dateStr;
    }
  };

  const handleSearch = () => {
    if (activeTab === "tours") {
      const dest = VIETNAM_DESTINATIONS[col2Index];
      const query = isEn ? dest?.en : dest?.vi;
      router.push(`/tours?q=${encodeURIComponent(query || "")}`);
    } else if (activeTab === "hotels") {
      const dest = VIETNAM_DESTINATIONS[col2Index];
      const query = isEn ? dest?.en : dest?.vi;
      router.push(`/experiences?q=${encodeURIComponent(query || "")}`);
    } else {
      const dest = VIETNAM_DESTINATIONS[col2Index];
      const query = isEn ? dest?.en : dest?.vi;
      router.push(`/destinations?q=${encodeURIComponent(query || "")}`);
    }
  };

  return (
    <div className="w-full select-none">
      {/* 1. Top Tabs (Centered, Compact Teal Pill - Exactly like Template) */}
      <div className="flex justify-center w-full">
        <div className="inline-flex bg-[#0098a2] rounded-t-[6px] sm:rounded-t-[8px] overflow-hidden shadow-md">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => {
                setActiveTab(tab.key);
                setOpenCol1(false);
                setOpenCol2(false);
                setOpenTravellers(false);
              }}
              className={`relative px-5 sm:px-7 md:px-9 py-2.5 sm:py-3 text-[11px] sm:text-xs font-bold tracking-[0.14em] sm:tracking-[0.18em] transition-all cursor-pointer text-center whitespace-nowrap ${
                activeTab === tab.key
                  ? "text-white font-black after:absolute after:bottom-0 after:inset-x-3 sm:after:inset-x-5 after:h-[2.5px] after:bg-white"
                  : "text-white/80 hover:text-white hover:bg-white/10"
              }`}
            >
              {isEn ? tab.labelEn : tab.labelVi}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Main Search Bar (Translucent White Frosted Glass with 5 Clean Columns matching Template) */}
      <div className="relative flex flex-col md:flex-row items-stretch bg-white/90 backdrop-blur-md text-slate-700 shadow-2xl border border-white/70 rounded-[6px] sm:rounded-[8px] md:h-16 w-full max-w-[1100px] mx-auto">
        {/* Column 1: From (Origin) */}
        <div className="relative flex-1 border-b md:border-b-0 md:border-r border-slate-200/80">
          <button
            type="button"
            onClick={() => {
              setOpenCol1(!openCol1);
              setOpenCol2(false);
              setOpenTravellers(false);
            }}
            className="flex h-13 sm:h-14 md:h-full w-full items-center justify-between px-3.5 sm:px-4.5 transition hover:bg-slate-50/60 text-left cursor-pointer"
          >
            <div className="flex items-center gap-2 min-w-0 truncate">
              <MapPin className="size-4 shrink-0 text-slate-500" />
              <div className="flex items-center gap-1 min-w-0 truncate text-xs sm:text-[13px] text-slate-700">
                <span className="text-slate-400 font-normal">{isEn ? "From" : "Từ"}</span>
                <span className="font-semibold text-slate-800 truncate">
                  {isEn ? VIETNAM_DESTINATIONS[col1Index]?.en : VIETNAM_DESTINATIONS[col1Index]?.vi}
                </span>
              </div>
            </div>
            <ChevronDown className="size-3.5 shrink-0 text-slate-400 ml-1" />
          </button>
          {openCol1 && (
            <div className="absolute left-0 right-0 sm:right-auto top-full z-50 mt-1 max-h-56 sm:w-60 overflow-auto rounded-[3px] bg-white p-1.5 shadow-2xl border border-slate-100">
              {VIETNAM_DESTINATIONS.map((opt, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setCol1Index(idx);
                    setOpenCol1(false);
                  }}
                  className="w-full rounded-[2px] px-3.5 py-2 text-left text-xs sm:text-[13px] font-normal text-slate-800 hover:bg-slate-50 hover:text-black transition-colors cursor-pointer"
                >
                  {isEn ? opt.en : opt.vi}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Column 2: To (Destination) */}
        <div className="relative flex-1 border-b md:border-b-0 md:border-r border-slate-200/80">
          <button
            type="button"
            onClick={() => {
              setOpenCol2(!openCol2);
              setOpenCol1(false);
              setOpenTravellers(false);
            }}
            className="flex h-13 sm:h-14 md:h-full w-full items-center justify-between px-3.5 sm:px-4.5 transition hover:bg-slate-50/60 text-left cursor-pointer"
          >
            <div className="flex items-center gap-2 min-w-0 truncate">
              <MapPin className="size-4 shrink-0 text-slate-500" />
              <div className="flex items-center gap-1 min-w-0 truncate text-xs sm:text-[13px] text-slate-700">
                <span className="text-slate-400 font-normal">{isEn ? "To" : "Đến"}</span>
                <span className="font-semibold text-slate-800 truncate">
                  {isEn ? VIETNAM_DESTINATIONS[col2Index]?.en : VIETNAM_DESTINATIONS[col2Index]?.vi}
                </span>
              </div>
            </div>
            <ChevronDown className="size-3.5 shrink-0 text-slate-400 ml-1" />
          </button>
          {openCol2 && (
            <div className="absolute left-0 right-0 sm:right-auto top-full z-50 mt-1 max-h-56 sm:w-60 overflow-auto rounded-[3px] bg-white p-1.5 shadow-2xl border border-slate-100">
              {VIETNAM_DESTINATIONS.map((opt, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setCol2Index(idx);
                    setOpenCol2(false);
                  }}
                  className="w-full rounded-[2px] px-3.5 py-2 text-left text-xs sm:text-[13px] font-normal text-slate-800 hover:bg-slate-50 hover:text-black transition-colors cursor-pointer"
                >
                  {isEn ? opt.en : opt.vi}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Column 3: Departure Date */}
        <div className="relative flex-1 border-b md:border-b-0 md:border-r border-slate-200/80">
          <label className="relative flex h-13 sm:h-14 md:h-full w-full items-center px-3.5 sm:px-4.5 transition hover:bg-slate-50/60 cursor-pointer">
            <Calendar className="size-4 shrink-0 text-slate-500 mr-2" />
            <span className="text-xs sm:text-[13px] text-slate-700 font-medium truncate">
              {startDate ? formatDateDisplay(startDate) : (isEn ? "Departure Date" : "Ngày đi")}
            </span>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
              aria-label={isEn ? "Departure Date" : "Ngày khởi hành"}
            />
          </label>
        </div>

        {/* Column 4: Return Date */}
        <div className="relative flex-1 border-b md:border-b-0 md:border-r border-slate-200/80">
          <label className="relative flex h-13 sm:h-14 md:h-full w-full items-center px-3.5 sm:px-4.5 transition hover:bg-slate-50/60 cursor-pointer">
            <Calendar className="size-4 shrink-0 text-slate-500 mr-2" />
            <span className="text-xs sm:text-[13px] text-slate-700 font-medium truncate">
              {endDate ? formatDateDisplay(endDate) : (isEn ? "Return Date" : "Ngày về")}
            </span>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
              aria-label={isEn ? "Return Date" : "Ngày về"}
            />
          </label>
        </div>

        {/* Column 5: Traveller(s), Class */}
        <div className="relative flex-[1.2] border-b md:border-b-0 md:border-r border-slate-200/80">
          <button
            type="button"
            onClick={() => {
              setOpenTravellers(!openTravellers);
              setOpenCol1(false);
              setOpenCol2(false);
            }}
            className="flex h-13 sm:h-14 md:h-full w-full items-center justify-between px-3.5 sm:px-4.5 transition hover:bg-slate-50/60 text-left cursor-pointer"
          >
            <div className="flex items-center gap-2 min-w-0 truncate">
              <Users className="size-4 shrink-0 text-slate-500" />
              <span className="text-xs sm:text-[13px] font-medium text-slate-700 truncate">
                {isEn ? TRAVELLER_OPTIONS[travellerIndex]?.en : TRAVELLER_OPTIONS[travellerIndex]?.vi}
              </span>
            </div>
            <ChevronDown className="size-3.5 shrink-0 text-slate-400 ml-1" />
          </button>
          {openTravellers && (
            <div className="absolute left-0 right-0 sm:left-auto sm:right-0 top-full z-50 mt-1 sm:w-60 rounded-[3px] bg-white p-1.5 shadow-2xl border border-slate-100">
              {TRAVELLER_OPTIONS.map((opt, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setTravellerIndex(idx);
                    setOpenTravellers(false);
                  }}
                  className="w-full rounded-[2px] px-3.5 py-2 text-left text-xs sm:text-[13px] font-normal text-slate-800 hover:bg-slate-50 hover:text-black transition-colors cursor-pointer"
                >
                  {isEn ? opt.en : opt.vi}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* 6. Clean Search Button (Icon without green background) */}
        <div className="flex items-center justify-center px-3 sm:px-4 py-2 shrink-0 self-center">
          <button
            type="button"
            onClick={handleSearch}
            aria-label={isEn ? "Search experiences" : "Tìm kiếm chuyến đi"}
            className="group size-10 sm:size-11 md:size-12 rounded-full flex items-center justify-center text-slate-700 hover:text-black hover:bg-slate-100 active:scale-95 transition-all duration-200 shrink-0 cursor-pointer"
          >
            <Search className="size-5 sm:size-5.5 text-slate-700 transition-transform duration-200 group-hover:scale-110 group-hover:text-black" />
          </button>
        </div>
      </div>
    </div>
  );
}
