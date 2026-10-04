"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Clock, MapPin, Star, CheckCircle2, ShieldCheck, Bus, Hotel, Tag } from "lucide-react";
import { VIETNAM_TOURS, TourItem } from "@/lib/tours-data";

export function ToursCatalog() {
  const [selectedRegion, setSelectedRegion] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc">("featured");

  const filteredTours = useMemo(() => {
    let result = [...VIETNAM_TOURS];

    if (selectedRegion !== "all") {
      result = result.filter((t) => t.region === selectedRegion);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          t.destination.toLowerCase().includes(q) ||
          t.highlights.some((h) => h.toLowerCase().includes(q))
      );
    }

    if (sortBy === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [selectedRegion, searchQuery, sortBy]);

  return (
    <div className="w-full">
      {/* Search & Filter Bar */}
      <div className="mb-12 rounded-2xl bg-white p-6 shadow-md md:p-8">
        <div className="grid gap-6 md:grid-cols-[1fr_auto_auto]">
          {/* Search Input */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
              Tìm tour theo địa điểm, tên tour
            </label>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Nhập Đà Lạt, Hạ Long, Sa Pa, Tràng An..."
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-[#0098a2] focus:outline-none focus:ring-2 focus:ring-[#0098a2]/20"
            />
          </div>

          {/* Region Tabs */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
              Vùng miền
            </label>
            <div className="flex flex-wrap gap-2">
              {[
                { key: "all", label: "Tất cả" },
                { key: "north", label: "Miền Bắc" },
                { key: "central", label: "Miền Trung" },
                { key: "south", label: "Miền Nam" },
              ].map((r) => (
                <button
                  key={r.key}
                  type="button"
                  onClick={() => setSelectedRegion(r.key)}
                  className={`rounded-xl px-4 py-3 text-xs md:text-sm font-semibold transition ${
                    selectedRegion === r.key
                      ? "bg-[#0098a2] text-white shadow-sm"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>

          {/* Sort By */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
              Sắp xếp theo
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="h-[46px] rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 focus:border-[#0098a2] focus:outline-none"
            >
              <option value="featured">Tour nổi bật</option>
              <option value="price-asc">Giá: Thấp đến Cao</option>
              <option value="price-desc">Giá: Cao đến Thấp</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-6 flex items-center justify-between">
        <p className="text-sm font-medium text-slate-600">
          Tìm thấy <span className="font-bold text-[#0098a2]">{filteredTours.length}</span> tour du lịch phù hợp
        </p>
      </div>

      {/* Tour Cards Grid */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {filteredTours.map((tour) => (
          <article
            key={tour.id}
            className="group flex flex-col justify-between overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
          >
            <div>
              {/* Photo & Badge */}
              <div className="relative h-[240px] w-full overflow-hidden bg-slate-100">
                <Image
                  src={tour.image}
                  alt={tour.title}
                  fill
                  unoptimized
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Duration Badge */}
                <div className="absolute top-4 left-4 flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1 text-xs font-semibold text-white backdrop-blur-md">
                  <Clock className="size-3.5 text-[#00c2cb]" />
                  <span>{tour.duration}</span>
                </div>

                {/* Location Badge */}
                <div className="absolute bottom-4 left-4 flex items-center gap-1 text-xs font-medium text-white/90">
                  <MapPin className="size-3.5 text-[#00c2cb]" />
                  <span>{tour.destination}</span>
                </div>
              </div>

              {/* Body */}
              <div className="p-6">
                <div className="flex items-center gap-2 text-xs">
                  <div className="flex items-center gap-1 text-amber-500 font-bold">
                    <Star className="size-4 fill-amber-400" />
                    <span>{tour.rating.toFixed(1)}</span>
                  </div>
                  <span className="text-slate-400">({tour.reviewCount} đánh giá)</span>
                </div>

                <h3 className="mt-2 text-lg font-bold leading-snug text-slate-900 group-hover:text-[#0098a2] transition-colors line-clamp-2">
                  {tour.title}
                </h3>

                {/* Inclusions */}
                <div className="mt-3 flex flex-wrap gap-2 text-[11px] text-slate-500 font-medium">
                  <span className="flex items-center gap-1 rounded bg-slate-100 px-2 py-0.5">
                    <Bus className="size-3 text-[#0098a2]" />
                    {tour.transport}
                  </span>
                  <span className="flex items-center gap-1 rounded bg-slate-100 px-2 py-0.5">
                    <Hotel className="size-3 text-[#0098a2]" />
                    {tour.hotel}
                  </span>
                </div>

                {/* Highlights List */}
                <ul className="mt-4 space-y-1.5 border-t border-slate-100 pt-3 text-xs text-slate-600">
                  {tour.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="size-3.5 shrink-0 text-[#0098a2] mt-0.5" />
                      <span className="line-clamp-1">{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Price & Action Footer */}
            <div className="border-t border-slate-100 bg-slate-50/60 p-6 flex items-center justify-between">
              <div>
                <span className="block text-[11px] text-slate-400">Giá trọn gói từ</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-black text-[#0098a2]">
                    {tour.price.toLocaleString("vi-VN")}đ
                  </span>
                  {tour.originalPrice && (
                    <span className="text-xs text-slate-400 line-through">
                      {tour.originalPrice.toLocaleString("vi-VN")}đ
                    </span>
                  )}
                </div>
              </div>

              <Link
                href="/contact"
                className="rounded-xl bg-[#0098a2] px-4 py-2.5 text-xs font-bold text-white shadow-md transition hover:bg-[#007f88] hover:scale-105"
              >
                Đặt tour
              </Link>
            </div>
          </article>
        ))}
      </div>

      {filteredTours.length === 0 && (
        <div className="py-20 text-center rounded-2xl bg-white p-8">
          <p className="text-base text-slate-500">
            Không tìm thấy tour phù hợp với điều kiện tìm kiếm. Hãy thử đổi từ khóa khác!
          </p>
        </div>
      )}
    </div>
  );
}
