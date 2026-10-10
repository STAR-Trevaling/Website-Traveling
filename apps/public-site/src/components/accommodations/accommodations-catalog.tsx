"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Search, Building2, Sparkles, X, MapPin, Navigation } from "lucide-react";
import type { Accommodation } from "@/lib/types";
import {
  requestUserCoordinates,
  calculateDistanceKm,
  findNearestDestination,
  formatDistance,
  type UserCoordinates,
} from "@/lib/geo-utils";
import { AccommodationCard } from "./accommodation-card";

interface RegionOption {
  slug: string;
  name: string;
  destSlug: string;
  count?: number;
}

const REGION_LIST: RegionOption[] = [
  { slug: "all", name: "Tất cả khu vực", destSlug: "all" },
  { slug: "phu-quoc", name: "Phú Quốc", destSlug: "phu-quoc" },
  { slug: "da-nang", name: "Đà Nẵng", destSlug: "da-nang" },
  { slug: "hoi-an", name: "Hội An", destSlug: "hoi-an" },
  { slug: "ha-long", name: "Hạ Long", destSlug: "ha-long" },
  { slug: "sa-pa", name: "Sa Pa", destSlug: "sa-pa" },
  { slug: "ha-noi", name: "Hà Nội", destSlug: "ha-noi" },
  { slug: "hue", name: "Huế", destSlug: "hue" },
  { slug: "nha-trang", name: "Nha Trang", destSlug: "nha-trang" },
  { slug: "ninh-binh", name: "Ninh Bình", destSlug: "ninh-binh" },
];

const VIBE_OPTIONS = [
  { key: "all", label: "Tất cả phong cách" },
  { key: "beach", label: "Resort ven biển & Bãi riêng" },
  { key: "heritage", label: "Khách sạn di sản & Cổ điển" },
  { key: "nature", label: "Ecolodge & Núi rừng" },
  { key: "boutique", label: "Boutique sang trọng" },
  { key: "top-rated", label: "Đánh giá xuất sắc (4.9+)" },
];

const POPULAR_ACCOMMODATION_TAGS = [
  "Phú Quốc",
  "Đà Nẵng",
  "Resort ven biển",
  "Khách sạn di sản",
  "Hồ bơi vô cực",
  "Boutique",
  "Sa Pa",
  "Hạ Long",
];

interface AccommodationsCatalogProps {
  initialAccommodations: Accommodation[];
}

function AccommodationsCatalogContent({
  initialAccommodations,
}: AccommodationsCatalogProps) {
  const searchParams = useSearchParams();
  const destQuery = searchParams.get("destination") || searchParams.get("q") || "";

  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [selectedVibe, setSelectedVibe] = useState("all");
  const [sortBy, setSortBy] = useState<"rating" | "price-asc" | "price-desc" | "distance">("rating");
  const [userCoords, setUserCoords] = useState<UserCoordinates | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const [detectedCity, setDetectedCity] = useState<string | null>(null);
  const [geoNotice, setGeoNotice] = useState<string | null>(null);

  const handleLocateMe = async () => {
    setIsLocating(true);
    setGeoNotice(null);
    try {
      const coords = await requestUserCoordinates();
      setUserCoords(coords);
      const { destination } = findNearestDestination(coords.lat, coords.lng);
      setDetectedCity(destination.name);
      setSortBy("distance");
      const reg = REGION_LIST.find((r) => r.slug === destination.slug);
      if (reg) {
        setSelectedRegion(reg.slug);
      }
      setGeoNotice(`Đã định vị thành công! Đang ưu tiên các điểm dừng chân gần khu vực ${destination.name}.`);
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : "Không thể lấy vị trí hiện tại.";
      setGeoNotice(errorMsg);
    } finally {
      setIsLocating(false);
    }
  };

  const handleClearLocation = () => {
    setUserCoords(null);
    setDetectedCity(null);
    setGeoNotice(null);
    if (sortBy === "distance") setSortBy("rating");
  };

  // Sync initial destination query from URL param if present
  useEffect(() => {
    if (destQuery) {
      const q = destQuery.toLowerCase().replace(/-/g, " ");
      const found = REGION_LIST.find(
        (r) =>
          r.slug !== "all" &&
          (r.destSlug.includes(destQuery.toLowerCase()) ||
            r.name.toLowerCase().includes(q) ||
            q.includes(r.destSlug))
      );
      if (found) {
        setSelectedRegion(found.slug);
      } else {
        setSearchQuery(destQuery);
      }
    }
  }, [destQuery]);

  // Compute count per region
  const regionOptionsWithCount = useMemo(() => {
    return REGION_LIST.map((r) => {
      if (r.slug === "all") return { ...r, count: initialAccommodations.length };
      const c = initialAccommodations.filter(
        (item) =>
          item.destination_slug === r.destSlug ||
          item.destination_name?.toLowerCase().includes(r.destSlug.replace(/-/g, " ")) ||
          item.address?.toLowerCase().includes(r.destSlug.replace(/-/g, " "))
      ).length;
      return { ...r, count: c };
    });
  }, [initialAccommodations]);

  const filteredItems = useMemo(() => {
    let result = initialAccommodations.map((item) => {
      let distanceKm: number | undefined = undefined;
      if (userCoords && item.location) {
        distanceKm = calculateDistanceKm(
          userCoords.lat,
          userCoords.lng,
          item.location.lat,
          item.location.lng
        );
      }
      return { ...item, distanceKm };
    });

    // Filter by Region
    if (selectedRegion !== "all") {
      const reg = REGION_LIST.find((r) => r.slug === selectedRegion);
      if (reg) {
        const destKey = reg.destSlug.replace(/-/g, " ");
        result = result.filter(
          (item) =>
            item.destination_slug === reg.destSlug ||
            (item.destination_name && item.destination_name.toLowerCase().includes(destKey)) ||
            (item.address && item.address.toLowerCase().includes(destKey))
        );
      }
    }

    // Filter by Vibe / Style
    if (selectedVibe === "beach") {
      result = result.filter(
        (item) =>
          item.category.toLowerCase().includes("biển") ||
          item.category.toLowerCase().includes("vịnh") ||
          (item.description?.toLowerCase().includes("biển") ?? false) ||
          item.amenities.some((a) => a.toLowerCase().includes("biển") || a.toLowerCase().includes("bãi"))
      );
    } else if (selectedVibe === "heritage") {
      result = result.filter(
        (item) =>
          item.category.toLowerCase().includes("di sản") ||
          (item.description?.toLowerCase().includes("di sản") ?? false) ||
          (item.description?.toLowerCase().includes("cổ") ?? false)
      );
    } else if (selectedVibe === "nature") {
      result = result.filter(
        (item) =>
          item.category.toLowerCase().includes("ecolodge") ||
          item.category.toLowerCase().includes("sinh thái") ||
          item.category.toLowerCase().includes("núi") ||
          (item.description?.toLowerCase().includes("núi") ?? false) ||
          (item.description?.toLowerCase().includes("ruộng bậc thang") ?? false)
      );
    } else if (selectedVibe === "boutique") {
      result = result.filter(
        (item) =>
          item.category.toLowerCase().includes("boutique") ||
          (item.description?.toLowerCase().includes("boutique") ?? false)
      );
    } else if (selectedVibe === "top-rated") {
      result = result.filter((item) => Number(item.rating_average) >= 4.9);
    }

    // Filter by Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          (item.name_en && item.name_en.toLowerCase().includes(q)) ||
          item.address.toLowerCase().includes(q) ||
          (item.destination_name && item.destination_name.toLowerCase().includes(q)) ||
          (item.description && item.description.toLowerCase().includes(q)) ||
          item.amenities.some((a) => a.toLowerCase().includes(q))
      );
    }

    // Sort
    if (sortBy === "distance") {
      result.sort((a, b) => (a.distanceKm ?? 9999) - (b.distanceKm ?? 9999));
    } else if (sortBy === "rating") {
      result.sort((a, b) => Number(b.rating_average) - Number(a.rating_average));
    } else if (sortBy === "price-asc") {
      result.sort((a, b) => Number(a.price_from || 0) - Number(b.price_from || 0));
    } else if (sortBy === "price-desc") {
      result.sort((a, b) => Number(b.price_from || 0) - Number(a.price_from || 0));
    }

    return result;
  }, [initialAccommodations, userCoords, selectedRegion, selectedVibe, searchQuery, sortBy]);

  const activeRegionObj = REGION_LIST.find((r) => r.slug === selectedRegion);

  const openAiAssistant = (regionName?: string) => {
    const prompt = regionName && regionName !== "Tất cả khu vực"
      ? `Gợi ý cho tôi khách sạn và resort 5 sao tốt nhất tại ${regionName.replace(/^[^\w\s]+/, "").trim()}`
      : "Gợi ý cho tôi khách sạn và resort 5 sao đẹp nhất theo khu vực";
    window.dispatchEvent(
      new CustomEvent("star:open-ai-concierge", {
        detail: { prompt },
      })
    );
  };

  const handleResetFilters = () => {
    setSelectedRegion("all");
    setSelectedVibe("all");
    setSearchQuery("");
  };

  const hasActiveFilters = selectedRegion !== "all" || selectedVibe !== "all" || Boolean(searchQuery.trim());

  return (
    <div className="w-full">
      {/* ─── 1. SMART RECOMMENDATION CONCIERGE WIZARD ─── */}
      <div className="mb-8 rounded-[2px] bg-gradient-to-br from-slate-900 via-[#1e293b] to-slate-900 p-6 sm:p-8 text-white shadow-xl border border-amber-500/30 relative overflow-hidden">
        {/* Decorative lighting */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-60 h-60 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header Title & AI Action */}
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/15 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-amber-300 border border-amber-400/25">
              <Sparkles className="size-3 text-amber-400" />
              <span>Gợi ý thông minh STAR</span>
            </div>
            <h2 className="script-title text-2xl sm:text-4xl font-extrabold mt-2 text-white">
              Quý khách muốn tìm kiếm điểm dừng chân tại khu vực nào?
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1.5 max-w-2xl leading-relaxed">
              Chọn nhanh khu vực hoặc phong cách nghỉ dưỡng bên dưới để STAR gợi ý những khách sạn 5 sao, resort biệt lập và dinh thự di sản phù hợp nhất cho kỳ nghỉ của bạn.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={handleLocateMe}
              disabled={isLocating}
              className="inline-flex items-center gap-1.5 rounded-[2px] bg-white/10 hover:bg-white/20 px-3.5 py-2.5 text-xs font-semibold text-white border border-white/20 transition cursor-pointer disabled:opacity-50"
            >
              <Navigation className="size-3.5 text-amber-300" />
              <span>{isLocating ? "Đang định vị..." : "Tìm gần vị trí của tôi"}</span>
            </button>

            <button
              type="button"
              onClick={() => openAiAssistant(activeRegionObj?.name)}
              className="inline-flex items-center gap-2 rounded-[2px] bg-gradient-to-r from-[#da251d] to-[#b01b14] px-4 py-2.5 text-xs font-bold text-white shadow-lg hover:from-[#b01b14] hover:to-[#8a140f] hover:scale-105 transition-all duration-200 cursor-pointer border border-red-400/30"
            >
              <Sparkles className="size-3.5 text-amber-300" />
              <span>Hỏi Trợ Lý AI Tư Vấn Riêng</span>
            </button>
          </div>
        </div>

        {/* Location Notification Banner */}
        {geoNotice && (
          <div className="relative z-10 mb-4 rounded-[2px] bg-amber-400/10 border border-amber-400/30 px-3.5 py-2 text-xs text-amber-200 flex items-center justify-between">
            <span className="flex items-center gap-2">
              <MapPin className="size-3.5 text-amber-400 shrink-0" />
              <span>{geoNotice}</span>
            </span>
            {userCoords && (
              <button
                type="button"
                onClick={handleClearLocation}
                className="text-[11px] text-amber-300 hover:text-white underline ml-2 cursor-pointer shrink-0"
              >
                Hủy định vị
              </button>
            )}
          </div>
        )}

        {/* 1. Regional Selection Pills */}
        <div className="relative z-10 mb-5">
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-200/90 flex items-center gap-1.5">
              <MapPin className="size-3.5 text-amber-400" />
              <span>Khu vực điểm đến:</span>
            </span>
            {selectedRegion !== "all" && (
              <button
                type="button"
                onClick={() => setSelectedRegion("all")}
                className="text-[11px] text-slate-400 hover:text-white underline cursor-pointer"
              >
                Xem tất cả khu vực
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {regionOptionsWithCount.map((r) => {
              const isSelected = selectedRegion === r.slug;
              return (
                <button
                  key={r.slug}
                  type="button"
                  onClick={() => setSelectedRegion(r.slug)}
                  className={`rounded-[2px] px-3.5 py-1.5 text-xs font-semibold tracking-wide transition-all cursor-pointer flex items-center gap-1.5 ${
                    isSelected
                      ? "bg-[#da251d] text-white shadow-md border border-red-400 ring-2 ring-red-400/40"
                      : "bg-white/10 text-slate-200 hover:bg-white/20 hover:text-white border border-white/10"
                  }`}
                >
                  <span>{r.name}</span>
                  {r.count !== undefined && r.count > 0 && (
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                        isSelected ? "bg-white/25 text-white" : "bg-black/40 text-slate-300"
                      }`}
                    >
                      {r.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Vibe & Style Filter Chips */}
        <div className="relative z-10">
          <span className="text-[11px] font-bold uppercase tracking-wider text-amber-200/90 block mb-2.5">
            Phong cách nghỉ dưỡng:
          </span>
          <div className="flex flex-wrap gap-2">
            {VIBE_OPTIONS.map((v) => {
              const isSelected = selectedVibe === v.key;
              return (
                <button
                  key={v.key}
                  type="button"
                  onClick={() => setSelectedVibe(v.key)}
                  className={`rounded-full px-3.5 py-1 text-[11px] font-medium transition-all cursor-pointer ${
                    isSelected
                      ? "bg-amber-400 text-slate-950 font-bold shadow-md ring-2 ring-amber-300/40"
                      : "bg-white/5 text-slate-300 hover:bg-white/15 hover:text-white border border-white/10"
                  }`}
                >
                  {v.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ─── 2. SEARCH & SORT TOOLBAR ─── */}
      <div className="mb-6 rounded-[2px] bg-white p-4 sm:p-5 shadow-sm border border-slate-100 flex flex-col gap-3">
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Search input with live suggestion dropdown */}
          <div className="relative flex-1 min-w-[240px] max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm theo tên khách sạn, tiện ích (hồ bơi, spa...)..."
              className="w-full rounded-[2px] border border-slate-200 bg-slate-50 pl-10 pr-8 py-2 text-xs sm:text-sm focus:border-[#da251d] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#da251d]"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="size-3.5" />
              </button>
            )}

            {/* Smart Autocomplete Dropdown */}
            {isSearchFocused && searchQuery.trim().length >= 1 && (
              <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-slate-200 rounded-[2px] shadow-xl z-30 p-2 max-h-64 overflow-y-auto">
                <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400 px-2 py-1">
                  Gợi ý kết quả ({filteredItems.length}):
                </div>
                {filteredItems.length > 0 ? (
                  filteredItems.slice(0, 5).map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onMouseDown={() => {
                        setSearchQuery(item.name);
                        setIsSearchFocused(false);
                      }}
                      className="w-full text-left px-2.5 py-2 hover:bg-slate-50 rounded-[2px] text-xs flex justify-between items-center transition cursor-pointer"
                    >
                      <span className="font-semibold text-slate-900 truncate">{item.name}</span>
                      <span className="text-[10px] text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded shrink-0 ml-2">
                        {item.destination_name || item.address}
                      </span>
                    </button>
                  ))
                ) : (
                  <div className="px-2.5 py-2 text-xs text-slate-400 italic">
                    Không tìm thấy khách sạn phù hợp với từ khóa
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Sort select */}
          <div className="flex items-center gap-3">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 whitespace-nowrap">
              Sắp xếp:
            </label>
            <select
              value={sortBy}
              onChange={(e) =>
                setSortBy(e.target.value as "rating" | "price-asc" | "price-desc" | "distance")
              }
              className="rounded-[2px] border border-slate-200 bg-slate-50 px-3 py-2 text-xs sm:text-sm font-medium focus:border-[#da251d] focus:bg-white focus:outline-none"
            >
              {userCoords && <option value="distance">Khoảng cách gần nhất</option>}
              <option value="rating">Đánh giá cao nhất</option>
              <option value="price-asc">Giá từ thấp đến cao</option>
              <option value="price-desc">Giá từ cao đến thấp</option>
            </select>
          </div>
        </div>

        {/* Quick Suggestion Chips */}
        <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-100 text-xs">
          <span className="text-slate-400 text-[11px] font-medium mr-1">Gợi ý tìm nhanh:</span>
          {POPULAR_ACCOMMODATION_TAGS.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => {
                const reg = REGION_LIST.find((r) => r.slug !== "all" && r.name.toLowerCase() === tag.toLowerCase());
                if (reg) {
                  setSelectedRegion(reg.slug);
                  setSearchQuery("");
                } else {
                  setSearchQuery(tag);
                }
              }}
              className="rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 px-2.5 py-0.5 text-[11px] font-medium transition-colors cursor-pointer"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* ─── 3. ACTIVE FILTERS SUMMARY BAR ─── */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600 font-medium">
        <div className="flex flex-wrap items-center gap-2">
          <span>Tìm thấy <strong>{filteredItems.length}</strong> khách sạn & khu nghỉ dưỡng</span>
          {selectedRegion !== "all" && (
            <span className="inline-flex items-center gap-1 rounded-[2px] bg-red-50 border border-red-200 px-2 py-0.5 text-xs font-semibold text-[#da251d]">
              <span>Khu vực: {activeRegionObj?.name}</span>
              <button
                type="button"
                onClick={() => setSelectedRegion("all")}
                className="hover:text-black ml-0.5"
              >
                ✕
              </button>
            </span>
          )}
          {selectedVibe !== "all" && (
            <span className="inline-flex items-center gap-1 rounded-[2px] bg-amber-50 border border-amber-200 px-2 py-0.5 text-xs font-semibold text-amber-800">
              <span>{VIBE_OPTIONS.find((v) => v.key === selectedVibe)?.label}</span>
              <button
                type="button"
                onClick={() => setSelectedVibe("all")}
                className="hover:text-black ml-0.5"
              >
                ✕
              </button>
            </span>
          )}
          {hasActiveFilters && (
            <button
              type="button"
              onClick={handleResetFilters}
              className="text-xs text-slate-400 hover:text-slate-800 underline ml-1 cursor-pointer"
            >
              Xóa tất cả bộ lọc
            </button>
          )}
        </div>

        <span className="text-[11px] text-amber-700 italic">
          Đối tác phân phối chính hãng: Booking.com, Agoda, Traveloka
        </span>
      </div>

      {/* ─── 4. ACCOMMODATION CARDS GRID ─── */}
      {filteredItems.length > 0 ? (
        <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredItems.map((item, index) => {
            // Highlight the closest card if location detected, or top card of selected region / top rated
            const isTopMatch =
              (userCoords && index === 0) ||
              (selectedRegion !== "all" && index === 0) ||
              (selectedVibe === "top-rated" && index === 0);
            const reason =
              userCoords && item.distanceKm !== undefined
                ? `Gần vị trí của bạn nhất (~${formatDistance(item.distanceKm)})`
                : selectedRegion !== "all"
                  ? `Được đánh giá cao nhất tại ${activeRegionObj?.name}`
                  : undefined;

            return (
              <AccommodationCard
                key={item.id}
                accommodation={item}
                distanceKm={item.distanceKm}
                isRecommended={isTopMatch}
                recommendationReason={reason}
              />
            );
          })}
        </div>
      ) : (
        <div className="rounded-[2px] bg-white p-12 text-center border border-slate-100 shadow-sm">
          <Building2 className="mx-auto size-12 text-slate-300 mb-3" />
          <h3 className="text-base font-bold text-slate-800">
            Không tìm thấy khách sạn phù hợp với tiêu chí đã chọn
          </h3>
          <p className="mt-1 text-xs text-slate-500 max-w-md mx-auto">
            Quý khách có thể thử chọn khu vực khác, mở rộng phong cách nghỉ dưỡng hoặc bấm vào nút tư vấn để được hỗ trợ tìm phòng riêng.
          </p>
          <div className="mt-4 flex justify-center gap-3">
            <button
              type="button"
              onClick={handleResetFilters}
              className="rounded-[2px] bg-slate-900 px-4 py-2 text-xs font-bold text-white hover:bg-slate-800 transition"
            >
              Xem tất cả khách sạn
            </button>
            <button
              type="button"
              onClick={() => openAiAssistant(activeRegionObj?.name)}
              className="rounded-[2px] bg-[#da251d] px-4 py-2 text-xs font-bold text-white hover:bg-[#b01b14] transition"
            >
              Nhờ STAR AI tìm giúp
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export function AccommodationsCatalog(props: AccommodationsCatalogProps) {
  return (
    <Suspense fallback={<div className="py-12 text-center text-sm text-slate-400">Đang tải bộ sưu tập khách sạn...</div>}>
      <AccommodationsCatalogContent {...props} />
    </Suspense>
  );
}
