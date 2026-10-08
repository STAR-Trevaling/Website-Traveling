"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  MapPin,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Search,
  Users,
  Calendar,
  X,
  EyeOff,
} from "lucide-react";
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

interface CalendarPopoverProps {
  selectedDate: string;
  minDate?: string;
  onSelectDate: (dateStr: string) => void;
  onClose: () => void;
  isEn: boolean;
  title: string;
  align?: "left" | "right";
}

function CalendarPopover({
  selectedDate,
  minDate,
  onSelectDate,
  onClose,
  isEn,
  title,
  align = "left",
}: CalendarPopoverProps) {
  const initial = selectedDate ? new Date(selectedDate) : new Date();
  const [viewYear, setViewYear] = useState(initial.getFullYear());
  const [viewMonth, setViewMonth] = useState(initial.getMonth());
  const popoverRef = useRef<HTMLDivElement>(null);
  const [openUpward, setOpenUpward] = useState(false);

  // Auto-flip upward if there isn't enough vertical space below
  useEffect(() => {
    if (popoverRef.current) {
      const rect = popoverRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      if (rect.bottom > viewportHeight - 16) {
        setOpenUpward(true);
      }
    }
  }, []);

  const prevMonth = () => {
    if (viewMonth === 0) {
      setViewYear(viewYear - 1);
      setViewMonth(11);
    } else {
      setViewMonth(viewMonth - 1);
    }
  };

  const nextMonth = () => {
    if (viewMonth === 11) {
      setViewYear(viewYear + 1);
      setViewMonth(0);
    } else {
      setViewMonth(viewMonth + 1);
    }
  };

  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const firstDayOfWeek = (new Date(viewYear, viewMonth, 1).getDay() + 6) % 7; // Monday = 0

  const today = new Date();
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

  const monthNamesVi = [
    "Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6",
    "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"
  ];
  const monthNamesEn = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const weekHeadersVi = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];
  const weekHeadersEn = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

  const placementClass = openUpward
    ? "bottom-full mb-1.5 slide-in-from-bottom-1"
    : "top-full mt-1.5 slide-in-from-top-1";

  const alignClass =
    align === "right"
      ? "left-1/2 -translate-x-1/2 sm:translate-x-0 sm:left-auto sm:right-0"
      : "left-1/2 -translate-x-1/2 sm:translate-x-0 sm:left-0 sm:right-auto";

  return (
    <div
      ref={popoverRef}
      onClick={(e) => e.stopPropagation()}
      className={`absolute ${placementClass} ${alignClass} z-50 w-[270px] sm:w-[285px] rounded-2xl bg-slate-950/95 backdrop-blur-2xl p-3 shadow-[0_20px_50px_rgba(0,0,0,0.65)] border border-white/20 text-white animate-in fade-in duration-150`}
    >
      {/* Header: Title and Month navigation */}
      <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10">
        <span className="text-[10px] font-bold text-white/60 uppercase tracking-wider">
          {title}
        </span>
        <div className="flex items-center gap-0.5">
          <button
            type="button"
            onClick={prevMonth}
            aria-label="Previous month"
            className="p-1 rounded-lg hover:bg-white/10 text-white/70 hover:text-white transition cursor-pointer"
          >
            <ChevronLeft className="size-3.5" />
          </button>
          <span className="text-xs font-bold text-white min-w-[95px] text-center">
            {isEn ? `${monthNamesEn[viewMonth]} ${viewYear}` : `${monthNamesVi[viewMonth]}, ${viewYear}`}
          </span>
          <button
            type="button"
            onClick={nextMonth}
            aria-label="Next month"
            className="p-1 rounded-lg hover:bg-white/10 text-white/70 hover:text-white transition cursor-pointer"
          >
            <ChevronRight className="size-3.5" />
          </button>
        </div>
      </div>

      {/* Weekday headers */}
      <div className="grid grid-cols-7 gap-0.5 text-center mb-1">
        {(isEn ? weekHeadersEn : weekHeadersVi).map((day, i) => (
          <span key={i} className="text-[10px] font-semibold text-white/40 py-0.5">
            {day}
          </span>
        ))}
      </div>

      {/* Days grid */}
      <div className="grid grid-cols-7 gap-0.5 text-center">
        {/* Leading empty days */}
        {Array.from({ length: firstDayOfWeek }).map((_, i) => (
          <div key={`empty-${i}`} className="size-7" />
        ))}

        {/* Days in month */}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const dayNum = i + 1;
          const dateStr = `${viewYear}-${String(viewMonth + 1).padStart(2, "0")}-${String(dayNum).padStart(2, "0")}`;
          const isSelected = selectedDate === dateStr;
          const isToday = todayStr === dateStr;
          const isPast = minDate ? dateStr < minDate : dateStr < todayStr;

          return (
            <button
              key={dateStr}
              type="button"
              disabled={isPast}
              onClick={() => onSelectDate(dateStr)}
              className={`size-7 text-[11px] font-medium rounded-full flex items-center justify-center transition cursor-pointer ${
                isSelected
                  ? "bg-[#da251d] text-white font-bold shadow-md shadow-[#da251d]/40"
                  : isPast
                  ? "text-white/20 cursor-not-allowed"
                  : isToday
                  ? "border border-[#da251d] text-[#da251d] font-semibold hover:bg-white/10"
                  : "text-white/90 hover:bg-white/15 hover:text-white"
              }`}
            >
              {dayNum}
            </button>
          );
        })}
      </div>

      {/* Quick actions footer */}
      <div className="flex items-center justify-between pt-2 mt-2 border-t border-white/10 text-[11px]">
        <button
          type="button"
          onClick={() => onSelectDate(todayStr)}
          className="text-[#da251d] hover:text-red-400 font-semibold cursor-pointer"
        >
          {isEn ? "Today" : "Hôm nay"}
        </button>
        <div className="flex items-center gap-2.5">
          {selectedDate && (
            <button
              type="button"
              onClick={() => onSelectDate("")}
              className="text-white/40 hover:text-white transition cursor-pointer"
            >
              {isEn ? "Clear" : "Xoá"}
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="text-white/80 hover:text-white font-semibold cursor-pointer"
          >
            {isEn ? "Done" : "Xong"}
          </button>
        </div>
      </div>
    </div>
  );
}

export function DiscoverySearch() {
  const router = useRouter();
  const { locale } = useLanguage();
  const isEn = locale === "en";

  // Default to collapsed immediately when entering the page (no flash/jump)
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>("flights");
  const [col1Index, setCol1Index] = useState(0); // Hanoi
  const [col2Index, setCol2Index] = useState(6); // Nha Trang
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [travellerIndex, setTravellerIndex] = useState(0);

  const [openCol1, setOpenCol1] = useState(false);
  const [openCol2, setOpenCol2] = useState(false);
  const [openTravellers, setOpenTravellers] = useState(false);
  const [openDate, setOpenDate] = useState<"start" | "end" | null>(null);

  const toggleSearch = (open: boolean) => {
    setIsSearchOpen(open);
  };

  // Click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest("#discovery-search-container")) {
        setOpenCol1(false);
        setOpenCol2(false);
        setOpenTravellers(false);
        setOpenDate(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

  // Collapsed Mode (Mode OFF): Ultra-sleek, luxury minimal pill matching exact screenshot
  if (!isSearchOpen) {
    return (
      <div id="discovery-search-container" className="w-full select-none flex justify-center animate-fade-in-scale">
        <button
          type="button"
          onClick={() => toggleSearch(true)}
          className="group relative flex items-center gap-3 sm:gap-4 bg-black/45 hover:bg-black/60 backdrop-blur-2xl border border-white/25 hover:border-white/45 shadow-[0_8px_32px_rgba(0,0,0,0.4)] rounded-full px-5 sm:px-6 py-2.5 sm:py-3 text-white transition-all duration-300 hover:scale-[1.02] cursor-pointer"
        >
          <Search className="size-4 text-white group-hover:scale-110 transition-transform duration-300" />
          <span className="text-xs sm:text-sm font-semibold tracking-wide text-white">
            {isEn ? "Search journeys" : "Tìm kiếm hành trình"}
          </span>
          <span className="text-white/30 text-xs sm:text-sm select-none">|</span>
          <span className="text-xs sm:text-sm text-white/80 font-normal truncate max-w-[160px] sm:max-w-none">
            {isEn
              ? `${VIETNAM_DESTINATIONS[col1Index]?.en} → ${VIETNAM_DESTINATIONS[col2Index]?.en}`
              : `${VIETNAM_DESTINATIONS[col1Index]?.vi} → ${VIETNAM_DESTINATIONS[col2Index]?.vi}`}
          </span>
          <ChevronDown className="size-4 text-white/70 transition-transform duration-300 group-hover:text-white group-hover:translate-y-0.5 ml-0.5" />
        </button>
      </div>
    );
  }

  // Expanded Mode (Mode ON): Full 5 columns in matching dark glassmorphic rounded pill style
  return (
    <div id="discovery-search-container" className="w-full select-none animate-fade-in-scale">
      {/* 1. Top Controls Bar: Tabs (Dark Glass Pill with Red Active Pill) + Right-side Toggle */}
      <div className="flex items-center justify-between w-full max-w-[1100px] mx-auto px-2 sm:px-4 mb-3">
        {/* Left spacer for optical center alignment on desktop */}
        <div className="hidden md:block w-32" />

        {/* Center: Tabs in Sleek Dark Glass Capsule */}
        <div className="inline-flex items-center gap-1 bg-black/45 backdrop-blur-2xl border border-white/20 rounded-full p-1 shadow-lg">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => {
                  setActiveTab(tab.key);
                  setOpenCol1(false);
                  setOpenCol2(false);
                  setOpenTravellers(false);
                }}
                className={`px-4 sm:px-6 md:px-8 py-2 sm:py-2.5 text-[11px] sm:text-xs tracking-[0.14em] rounded-full transition-all duration-200 cursor-pointer text-center whitespace-nowrap ${
                  isActive
                    ? "bg-[#da251d] text-white font-bold shadow-md shadow-[#da251d]/40"
                    : "text-white/70 hover:text-white hover:bg-white/10 font-medium"
                }`}
              >
                {isEn ? tab.labelEn : tab.labelVi}
              </button>
            );
          })}
        </div>

        {/* Right: Smart Mode Toggle Button (Thu gọn) */}
        <div className="flex items-center justify-end md:w-32">
          <button
            type="button"
            onClick={() => toggleSearch(false)}
            className="group flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-black/45 hover:bg-black/65 text-white/80 hover:text-white backdrop-blur-2xl border border-white/20 hover:border-white/40 text-[11px] font-medium transition-all shadow-sm cursor-pointer select-none"
            title={isEn ? "Collapse search" : "Thu gọn"}
          >
            <EyeOff className="size-3 text-white/70 group-hover:text-white" />
            <span className="whitespace-nowrap">{isEn ? "Collapse" : "Thu gọn"}</span>
          </button>
        </div>
      </div>

      {/* 2. Main Search Bar (Dark Glassmorphic Rounded Pill with 5 Columns matching the Collapsed Style) */}
      <div className="relative flex flex-col md:flex-row items-stretch bg-black/50 hover:bg-black/55 backdrop-blur-2xl text-white shadow-[0_12px_45px_rgba(0,0,0,0.5)] border border-white/25 hover:border-white/35 rounded-3xl md:rounded-full md:h-16 w-full max-w-[1100px] mx-auto p-1.5 md:p-1 md:pr-2 transition-all duration-300">
        {/* Column 1: From (Origin) */}
        <div className="relative flex-1 border-b md:border-b-0 md:border-r border-white/15">
          <button
            type="button"
            onClick={() => {
              setOpenCol1(!openCol1);
              setOpenCol2(false);
              setOpenTravellers(false);
            }}
            className="flex h-13 sm:h-14 md:h-full w-full items-center justify-between px-4 sm:px-5 transition hover:bg-white/10 rounded-2xl md:rounded-l-full text-left cursor-pointer"
          >
            <div className="flex items-center gap-2.5 min-w-0 truncate">
              <MapPin className="size-4 shrink-0 text-white/70" />
              <div className="flex items-center gap-1.5 min-w-0 truncate text-xs sm:text-[13px]">
                <span className="text-white/50 font-normal">{isEn ? "From" : "Từ"}</span>
                <span className="font-semibold text-white truncate">
                  {isEn ? VIETNAM_DESTINATIONS[col1Index]?.en : VIETNAM_DESTINATIONS[col1Index]?.vi}
                </span>
              </div>
            </div>
            <ChevronDown className="size-3.5 shrink-0 text-white/50 ml-1" />
          </button>
          {openCol1 && (
            <div className="absolute left-0 right-0 sm:right-auto top-full z-50 mt-2 max-h-60 sm:w-64 overflow-auto rounded-2xl bg-slate-950/95 backdrop-blur-2xl p-2 shadow-[0_20px_50px_rgba(0,0,0,0.65)] border border-white/20 text-white">
              {VIETNAM_DESTINATIONS.map((opt, idx) => {
                const isSelected = col1Index === idx;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setCol1Index(idx);
                      setOpenCol1(false);
                    }}
                    className={`w-full rounded-xl px-3.5 py-2.5 text-left text-xs sm:text-[13px] transition-colors cursor-pointer ${
                      isSelected
                        ? "bg-[#da251d]/25 text-white font-semibold border border-[#da251d]/50"
                        : "text-white/85 hover:bg-white/10 hover:text-white font-normal"
                    }`}
                  >
                    {isEn ? opt.en : opt.vi}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Column 2: To (Destination) */}
        <div className="relative flex-1 border-b md:border-b-0 md:border-r border-white/15">
          <button
            type="button"
            onClick={() => {
              setOpenCol2(!openCol2);
              setOpenCol1(false);
              setOpenTravellers(false);
            }}
            className="flex h-13 sm:h-14 md:h-full w-full items-center justify-between px-4 sm:px-5 transition hover:bg-white/10 rounded-2xl text-left cursor-pointer"
          >
            <div className="flex items-center gap-2.5 min-w-0 truncate">
              <MapPin className="size-4 shrink-0 text-white/70" />
              <div className="flex items-center gap-1.5 min-w-0 truncate text-xs sm:text-[13px]">
                <span className="text-white/50 font-normal">{isEn ? "To" : "Đến"}</span>
                <span className="font-semibold text-white truncate">
                  {isEn ? VIETNAM_DESTINATIONS[col2Index]?.en : VIETNAM_DESTINATIONS[col2Index]?.vi}
                </span>
              </div>
            </div>
            <ChevronDown className="size-3.5 shrink-0 text-white/50 ml-1" />
          </button>
          {openCol2 && (
            <div className="absolute left-0 right-0 sm:right-auto top-full z-50 mt-2 max-h-60 sm:w-64 overflow-auto rounded-2xl bg-slate-950/95 backdrop-blur-2xl p-2 shadow-[0_20px_50px_rgba(0,0,0,0.65)] border border-white/20 text-white">
              {VIETNAM_DESTINATIONS.map((opt, idx) => {
                const isSelected = col2Index === idx;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setCol2Index(idx);
                      setOpenCol2(false);
                    }}
                    className={`w-full rounded-xl px-3.5 py-2.5 text-left text-xs sm:text-[13px] transition-colors cursor-pointer ${
                      isSelected
                        ? "bg-[#da251d]/25 text-white font-semibold border border-[#da251d]/50"
                        : "text-white/85 hover:bg-white/10 hover:text-white font-normal"
                    }`}
                  >
                    {isEn ? opt.en : opt.vi}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Column 3: Departure Date (Chọn ngày đi) */}
        <div className="relative flex-1 border-b md:border-b-0 md:border-r border-white/15">
          <button
            type="button"
            onClick={() => {
              setOpenDate(openDate === "start" ? null : "start");
              setOpenCol1(false);
              setOpenCol2(false);
              setOpenTravellers(false);
            }}
            className="flex h-13 sm:h-14 md:h-full w-full items-center justify-between px-4 sm:px-5 transition hover:bg-white/10 rounded-2xl text-left cursor-pointer"
          >
            <div className="flex items-center gap-2.5 min-w-0 truncate">
              <Calendar className="size-4 shrink-0 text-white/70" />
              <div className="flex items-center gap-1.5 min-w-0 truncate text-xs sm:text-[13px]">
                <span className={`truncate ${startDate ? "font-semibold text-white" : "font-normal text-white/75"}`}>
                  {startDate ? formatDateDisplay(startDate) : (isEn ? "Departure" : "Ngày đi")}
                </span>
              </div>
            </div>
            {startDate ? (
              <span
                role="button"
                tabIndex={0}
                onClick={(e) => {
                  e.stopPropagation();
                  setStartDate("");
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.stopPropagation();
                    setStartDate("");
                  }
                }}
                className="text-white/40 hover:text-white p-0.5 rounded cursor-pointer"
                title={isEn ? "Clear date" : "Xoá ngày"}
              >
                <X className="size-3" />
              </span>
            ) : (
              <ChevronDown className="size-3.5 shrink-0 text-white/50 ml-1" />
            )}
          </button>

          {openDate === "start" && (
            <CalendarPopover
              selectedDate={startDate}
              onSelectDate={(date) => {
                setStartDate(date);
                if (endDate && date && date > endDate) {
                  setEndDate("");
                }
                if (!endDate && date) {
                  setOpenDate("end");
                } else {
                  setOpenDate(null);
                }
              }}
              onClose={() => setOpenDate(null)}
              isEn={isEn}
              title={isEn ? "Departure Date" : "Chọn Ngày Đi"}
              align="left"
            />
          )}
        </div>

        {/* Column 4: Return Date (Chọn ngày về) */}
        <div className="relative flex-1 border-b md:border-b-0 md:border-r border-white/15">
          <button
            type="button"
            onClick={() => {
              setOpenDate(openDate === "end" ? null : "end");
              setOpenCol1(false);
              setOpenCol2(false);
              setOpenTravellers(false);
            }}
            className="flex h-13 sm:h-14 md:h-full w-full items-center justify-between px-4 sm:px-5 transition hover:bg-white/10 rounded-2xl text-left cursor-pointer"
          >
            <div className="flex items-center gap-2.5 min-w-0 truncate">
              <Calendar className="size-4 shrink-0 text-white/70" />
              <div className="flex items-center gap-1.5 min-w-0 truncate text-xs sm:text-[13px]">
                <span className={`truncate ${endDate ? "font-semibold text-white" : "font-normal text-white/75"}`}>
                  {endDate ? formatDateDisplay(endDate) : (isEn ? "Return" : "Ngày về")}
                </span>
              </div>
            </div>
            {endDate ? (
              <span
                role="button"
                tabIndex={0}
                onClick={(e) => {
                  e.stopPropagation();
                  setEndDate("");
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.stopPropagation();
                    setEndDate("");
                  }
                }}
                className="text-white/40 hover:text-white p-0.5 rounded cursor-pointer"
                title={isEn ? "Clear date" : "Xoá ngày"}
              >
                <X className="size-3" />
              </span>
            ) : (
              <ChevronDown className="size-3.5 shrink-0 text-white/50 ml-1" />
            )}
          </button>

          {openDate === "end" && (
            <CalendarPopover
              selectedDate={endDate}
              minDate={startDate}
              onSelectDate={(date) => {
                setEndDate(date);
                setOpenDate(null);
              }}
              onClose={() => setOpenDate(null)}
              isEn={isEn}
              title={isEn ? "Return Date" : "Chọn Ngày Về"}
              align="right"
            />
          )}
        </div>

        {/* Column 5: Traveller(s), Class */}
        <div className="relative flex-[1.1] border-b md:border-b-0 md:border-r border-white/15">
          <button
            type="button"
            onClick={() => {
              setOpenTravellers(!openTravellers);
              setOpenCol1(false);
              setOpenCol2(false);
            }}
            className="flex h-13 sm:h-14 md:h-full w-full items-center justify-between px-4 sm:px-5 transition hover:bg-white/10 rounded-2xl text-left cursor-pointer"
          >
            <div className="flex items-center gap-2.5 min-w-0 truncate">
              <Users className="size-4 shrink-0 text-white/70" />
              <span className="text-xs sm:text-[13px] font-medium text-white truncate">
                {isEn ? TRAVELLER_OPTIONS[travellerIndex]?.en : TRAVELLER_OPTIONS[travellerIndex]?.vi}
              </span>
            </div>
            <ChevronDown className="size-3.5 shrink-0 text-white/50 ml-1" />
          </button>
          {openTravellers && (
            <div className="absolute left-0 right-0 sm:left-auto sm:right-0 top-full z-50 mt-2 sm:w-64 rounded-2xl bg-slate-950/95 backdrop-blur-2xl p-2 shadow-[0_20px_50px_rgba(0,0,0,0.65)] border border-white/20 text-white">
              {TRAVELLER_OPTIONS.map((opt, idx) => {
                const isSelected = travellerIndex === idx;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setTravellerIndex(idx);
                      setOpenTravellers(false);
                    }}
                    className={`w-full rounded-xl px-3.5 py-2.5 text-left text-xs sm:text-[13px] transition-colors cursor-pointer ${
                      isSelected
                        ? "bg-[#da251d]/25 text-white font-semibold border border-[#da251d]/50"
                        : "text-white/85 hover:bg-white/10 hover:text-white font-normal"
                    }`}
                  >
                    {isEn ? opt.en : opt.vi}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* 6. Clean Search Button in Rounded Pill */}
        <div className="flex items-center justify-center p-1 sm:p-1.5 shrink-0 self-center">
          <button
            type="button"
            onClick={handleSearch}
            aria-label={isEn ? "Search journeys" : "Tìm kiếm chuyến đi"}
            className="group size-11 sm:size-12 rounded-full flex items-center justify-center bg-[#da251d] hover:bg-[#c92018] text-white active:scale-95 transition-all duration-200 shadow-lg shadow-[#da251d]/40 shrink-0 cursor-pointer hover:scale-105"
          >
            <Search className="size-5 sm:size-5.5 text-white transition-transform duration-200 group-hover:scale-110" />
          </button>
        </div>
      </div>
    </div>
  );
}
