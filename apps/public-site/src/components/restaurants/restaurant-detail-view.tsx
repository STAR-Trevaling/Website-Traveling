"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Star,
  MapPin,
  ExternalLink,
  Phone,
  Sparkles,
  Utensils,
  ChefHat,
  Clock,
  ChevronLeft,
  CalendarCheck,
} from "lucide-react";
import type { Restaurant } from "@/lib/types";
import { publicApi } from "@/lib/api";
import {
  ReferralAdvisoryModal,
  type ReferralAdvisoryTarget,
} from "@/components/shared/referral-advisory-modal";

interface RestaurantDetailViewProps {
  restaurant: Restaurant;
}

export function RestaurantDetailView({
  restaurant,
}: RestaurantDetailViewProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [activeImage, setActiveImage] = useState(restaurant.image_url);

  const images = [
    restaurant.image_url,
    ...(restaurant.gallery || []),
  ].filter(Boolean);

  const isPhone = restaurant.contact_type === "phone";

  const handleActionClick = async (e: React.MouseEvent) => {
    setIsRedirecting(true);

    const fallbackUrl = restaurant.contact_value;
    let targetUrl = fallbackUrl;

    try {
      const res = await publicApi.trackReferral(
        {
          item_type: "restaurant_referral",
          item_id: restaurant.id,
        },
        1500
      );
      if (res?.redirect_url) {
        targetUrl = res.redirect_url;
      }
    } catch {
      // Ignore errors, proceed
    } finally {
      if (isPhone) {
        window.location.href = targetUrl;
      } else {
        window.open(targetUrl, "_blank", "noopener,noreferrer");
      }
      setIsRedirecting(false);
    }
  };

  const advisoryTarget: ReferralAdvisoryTarget = {
    id: restaurant.id,
    name: restaurant.name,
    itemType: "restaurant_referral",
    partnerName: restaurant.name,
    redirectUrl: restaurant.contact_value,
  };

  const ctaLabel = isPhone
    ? `Gọi Hotline đặt bàn (${restaurant.contact_value.replace("tel:", "")})`
    : "Đặt bàn trực tuyến ngay";

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Breadcrumb Back */}
        <div className="mb-6">
          <Link
            href="/restaurants"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-[#da251d] transition-colors"
          >
            <ChevronLeft className="size-4" />
            <span>Quay lại danh sách nhà hàng & ẩm thực</span>
          </Link>
        </div>

        {/* Title Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-4 border-b border-slate-200 pb-6">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="rounded-[2px] bg-[#1e293b] px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-white">
                {restaurant.cuisine_type}
              </span>
              <span className="rounded-[2px] bg-emerald-800 text-white px-2 py-0.5 text-[11px] font-bold">
                Phân khúc {restaurant.price_range}
              </span>
              <span className="text-slate-300">|</span>
              <span className="rounded-[2px] bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 text-[11px] font-semibold">
                Đối tác liên kết STAR
              </span>
            </div>

            <h1 className="script-title text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
              {restaurant.name}
            </h1>

            <div className="mt-2 flex items-center gap-2 text-xs sm:text-sm text-slate-600">
              <MapPin className="size-4 shrink-0 text-[#da251d]" />
              <span>{restaurant.address}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-amber-500 font-bold text-lg">
            <Star className="size-5 fill-amber-400" />
            <span>{Number(restaurant.rating_average).toFixed(1)}</span>
            <span className="text-xs text-slate-400 font-normal">
              ({restaurant.rating_count} đánh giá)
            </span>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="grid gap-4 md:grid-cols-12 mb-10">
          <div className="md:col-span-8 relative aspect-[16/10] w-full overflow-hidden rounded-[2px] bg-slate-100 shadow-md">
            <Image
              src={activeImage}
              alt={restaurant.name}
              fill
              unoptimized
              className="object-cover transition-all duration-300"
            />
          </div>

          <div className="md:col-span-4 flex md:flex-col gap-3 overflow-x-auto md:overflow-visible">
            {images.map((img, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveImage(img)}
                className={`relative aspect-[16/10] w-28 md:w-full shrink-0 overflow-hidden rounded-[2px] border-2 transition-all cursor-pointer ${
                  activeImage === img
                    ? "border-[#da251d] shadow-sm scale-[0.98]"
                    : "border-transparent opacity-75 hover:opacity-100"
                }`}
              >
                <Image
                  src={img}
                  alt={`${restaurant.name} photo ${idx + 1}`}
                  fill
                  unoptimized
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* 2-Column Content Layout */}
        <div className="grid gap-8 lg:grid-cols-12">
          {/* Main Info */}
          <div className="lg:col-span-8 space-y-8">
            {/* Overview */}
            <div className="rounded-[2px] bg-white p-6 sm:p-8 shadow-sm border border-slate-100">
              <h2 className="text-xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
                <Utensils className="size-5 text-[#da251d]" />
                <span>Không gian & Phong vị ẩm thực</span>
              </h2>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed whitespace-pre-line">
                {restaurant.description}
              </p>
              {restaurant.description_en && (
                <p className="mt-4 text-xs sm:text-sm text-slate-500 italic leading-relaxed border-l-2 border-slate-200 pl-4">
                  {restaurant.description_en}
                </p>
              )}
            </div>

            {/* Signature Dishes */}
            {restaurant.signature_dishes && restaurant.signature_dishes.length > 0 && (
              <div className="rounded-[2px] bg-white p-6 sm:p-8 shadow-sm border border-slate-100">
                <h2 className="text-xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
                  <ChefHat className="size-5 text-amber-500" />
                  <span>Món ngon đặc trưng không thể bỏ lỡ</span>
                </h2>
                <div className="grid gap-3 sm:grid-cols-2">
                  {restaurant.signature_dishes.map((dish, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2.5 rounded-[2px] bg-amber-50/50 p-3 text-xs sm:text-sm font-semibold text-slate-800 border border-amber-100"
                    >
                      <Sparkles className="size-4 text-amber-600 shrink-0" />
                      <span>{dish}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Opening Hours */}
            {restaurant.opening_hours && Object.keys(restaurant.opening_hours).length > 0 && (
              <div className="rounded-[2px] bg-white p-6 sm:p-8 shadow-sm border border-slate-100">
                <h2 className="text-xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
                  <Clock className="size-5 text-slate-700" />
                  <span>Giờ mở cửa phục vụ</span>
                </h2>
                <div className="space-y-2">
                  {Object.entries(restaurant.opening_hours).map(([key, val]) => (
                    <div
                      key={key}
                      className="flex items-center justify-between py-1.5 border-b border-slate-100 text-xs sm:text-sm"
                    >
                      <span className="font-medium text-slate-600 capitalize">
                        {key.replace("_", " ")}
                      </span>
                      <span className="font-bold text-slate-900">{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar CTA Box */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 rounded-[2px] bg-white p-6 shadow-md border border-amber-200/60">
              <div className="pb-4 border-b border-slate-100 mb-4">
                <span className="text-xs text-slate-400 uppercase tracking-wider block">
                  Liên hệ đặt bàn
                </span>
                <span className="text-base font-bold text-slate-900">
                  {restaurant.name}
                </span>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <CalendarCheck className="size-4 text-emerald-600 shrink-0" />
                  <span>Hỗ trợ giữ bàn ưu tiên & Thực đơn Tasting Menu</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <Utensils className="size-4 text-emerald-600 shrink-0" />
                  <span>Không tính phí dịch vụ giới thiệu từ STAR Travels</span>
                </div>
              </div>

              {/* 1-Click Primary Action */}
              <button
                type="button"
                onClick={handleActionClick}
                disabled={isRedirecting}
                className={`w-full rounded-[2px] py-3.5 px-4 text-sm font-bold uppercase tracking-wider text-white transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75 ${
                  isPhone
                    ? "bg-[#0098a2] hover:bg-[#007f87]"
                    : "bg-[#da251d] hover:bg-[#b01b14]"
                }`}
              >
                {isPhone ? <Phone className="size-4" /> : <ExternalLink className="size-4" />}
                <span className="truncate">{ctaLabel}</span>
              </button>

              {/* Secondary Option: Consultation / Booking assistance */}
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="mt-3 w-full rounded-[2px] border border-amber-300 bg-amber-50/50 py-2.5 px-4 text-xs font-bold text-amber-800 transition-colors hover:bg-amber-100 flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Sparkles className="size-3.5 text-amber-600" />
                <span>Để STAR tư vấn đặt bàn & ưu đãi?</span>
              </button>

              {/* Disclaimer */}
              <div className="mt-4 rounded-[2px] bg-slate-50 p-3 border border-slate-100">
                <p className="text-[11px] text-slate-500 text-center italic leading-relaxed">
                  STAR Travels giới thiệu, việc đặt chỗ được thực hiện trực tiếp cùng nhà hàng đối tác.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ReferralAdvisoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        target={advisoryTarget}
      />
    </>
  );
}
