"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  MapPin,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Search,
  Users,
  Calendar,
  X,
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
}

function CalendarPopover({
  selectedDate,
  minDate,
  onSelectDate,
  onClose,
  isEn,
  title,
}: CalendarPopoverProps) {
  const initial = selectedDate ? new Date(selectedDate) : new Date();
  const [viewYear, setViewYear] = useState(initial.getFullYear());
  const [viewMonth, setViewMonth] = useState(initial.getMonth());

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

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="absolute left-0 sm:left-auto sm:right-0 md:left-0 top-full z-50 mt-1.5 w-[295px] sm:w-[315px] rounded-[6px] bg-white p-3.5 shadow-2xl border border-slate-200 text-slate-800"
    >
      {/* Header: Title and Month navigation */}
      <div className="flex items-center justify-between pb-2.5 mb-2 border-b border-slate-100">
        <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
          {title}
        </span>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={prevMonth}
            aria-label="Previous month"
            className="p-1 rounded hover:bg-slate-100 text-slate-600 transition cursor-pointer"
          >
            <ChevronLeft className="size-4" />
          </button>
          <span className="text-xs font-bold text-slate-800 min-w-[105px] text-center">
            {isEn ? `${monthNamesEn[viewMonth]} ${viewYear}` : `${monthNamesVi[viewMonth]}, ${viewYear}`}
          </span>
          <button
            type="button"
            onClick={nextMonth}
            aria-label="Next month"
            className="p-1 rounded hover:bg-slate-100 text-slate-600 transition cursor-pointer"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
      </div>

      {/* Weekday headers */}
      <div className="grid grid-cols-7 gap-1 text-center mb-1">
        {(isEn ? weekHeadersEn : weekHeadersVi).map((day, i) => (
          <span key={i} className="text-[11px] font-semibold text-slate-400 py-1">
            {day}
          </span>
        ))}
      </div>

      {/* Days grid */}
      <div className="grid grid-cols-7 gap-1 text-center">
        {/* Leading empty days */}
        {Array.from({ length: firstDayOfWeek }).map((_, i) => (
          <div key={`empty-${i}`} className="size-8" />
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
              className={`size-8 text-xs font-medium rounded-full flex items-center justify-center transition cursor-pointer ${
                isSelected
                  ? "bg-[#0098a2] text-white font-bold shadow-sm"
                  : isPast
                  ? "text-slate-300 cursor-not-allowed"
                  : isToday
                  ? "border border-[#0098a2] text-[#0098a2] font-semibold hover:bg-slate-100"
                  : "text-slate-700 hover:bg-slate-100"
              }`}
            >
              {dayNum}
            </button>
          );
        })}
      </div>

      {/* Quick actions footer */}
      <div className="flex items-center justify-between pt-2.5 mt-2 border-t border-slate-100 text-xs">
        <button
          type="button"
          onClick={() => onSelectDate(todayStr)}
          className="text-[#0098a2] hover:underline font-semibold cursor-pointer"
        >
          {isEn ? "Today" : "Hôm nay"}
        </button>
        <div className="flex items-center gap-3">
          {selectedDate && (
            <button
              type="button"
              onClick={() => onSelectDate("")}
              className="text-slate-400 hover:text-slate-700 transition cursor-pointer"
            >
              {isEn ? "Clear" : "Xoá"}
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="text-slate-700 hover:text-black font-semibold cursor-pointer"
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

  return (
    <div id="discovery-search-container" className="w-full select-none">
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

        {/* Column 3: Departure Date (Chọn ngày đi) */}
        <div className="relative flex-1 border-b md:border-b-0 md:border-r border-slate-200/80">
          <button
            type="button"
            onClick={() => {
              setOpenDate(openDate === "start" ? null : "start");
              setOpenCol1(false);
              setOpenCol2(false);
              setOpenTravellers(false);
            }}
            className="flex h-13 sm:h-14 md:h-full w-full items-center justify-between px-3.5 sm:px-4.5 transition hover:bg-slate-50/60 text-left cursor-pointer"
          >
            <div className="flex items-center gap-2 min-w-0 truncate">
              <Calendar className="size-4 shrink-0 text-slate-500" />
              <div className="flex items-center gap-1 min-w-0 truncate text-xs sm:text-[13px]">
                <span className={`truncate ${startDate ? "font-semibold text-slate-800" : "font-normal text-slate-700"}`}>
                  {startDate ? formatDateDisplay(startDate) : (isEn ? "Departure Date" : "Ngày đi")}
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
                className="text-slate-400 hover:text-slate-700 p-0.5 rounded cursor-pointer"
                title={isEn ? "Clear date" : "Xoá ngày"}
              >
                <X className="size-3" />
              </span>
            ) : (
              <ChevronDown className="size-3.5 shrink-0 text-slate-400 ml-1" />
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
                // Automatically suggest selecting return date if not yet chosen
                if (!endDate && date) {
                  setOpenDate("end");
                } else {
                  setOpenDate(null);
                }
              }}
              onClose={() => setOpenDate(null)}
              isEn={isEn}
              title={isEn ? "Departure Date" : "Chọn Ngày Đi"}
            />
          )}
        </div>

        {/* Column 4: Return Date (Chọn ngày về) */}
        <div className="relative flex-1 border-b md:border-b-0 md:border-r border-slate-200/80">
          <button
            type="button"
            onClick={() => {
              setOpenDate(openDate === "end" ? null : "end");
              setOpenCol1(false);
              setOpenCol2(false);
              setOpenTravellers(false);
            }}
            className="flex h-13 sm:h-14 md:h-full w-full items-center justify-between px-3.5 sm:px-4.5 transition hover:bg-slate-50/60 text-left cursor-pointer"
          >
            <div className="flex items-center gap-2 min-w-0 truncate">
              <Calendar className="size-4 shrink-0 text-slate-500" />
              <div className="flex items-center gap-1 min-w-0 truncate text-xs sm:text-[13px]">
                <span className={`truncate ${endDate ? "font-semibold text-slate-800" : "font-normal text-slate-700"}`}>
                  {endDate ? formatDateDisplay(endDate) : (isEn ? "Return Date" : "Ngày về")}
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
                className="text-slate-400 hover:text-slate-700 p-0.5 rounded cursor-pointer"
                title={isEn ? "Clear date" : "Xoá ngày"}
              >
                <X className="size-3" />
              </span>
            ) : (
              <ChevronDown className="size-3.5 shrink-0 text-slate-400 ml-1" />
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
            />
          )}
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
