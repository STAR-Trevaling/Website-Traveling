"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Star,
  MapPin,
  ExternalLink,
  PhoneCall,
  Sparkles,
  ShieldCheck,
  Building2,
  CheckCircle2,
  ChevronLeft,
  ArrowRight,
} from "lucide-react";
import type { Accommodation } from "@/lib/types";
import { publicApi } from "@/lib/api";
import {
  ReferralAdvisoryModal,
  type ReferralAdvisoryTarget,
} from "@/components/shared/referral-advisory-modal";

interface AccommodationDetailViewProps {
  accommodation: Accommodation;
}

export function AccommodationDetailView({
  accommodation,
}: AccommodationDetailViewProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [activeImage, setActiveImage] = useState(accommodation.image_url);

  const images = [
    accommodation.image_url,
    ...(accommodation.gallery || []),
  ].filter(Boolean);

  const handlePartnerClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    setIsRedirecting(true);

    const fallbackUrl = accommodation.partner_booking_url;
    let targetUrl = fallbackUrl;

    try {
      const res = await publicApi.trackReferral(
        {
          item_type: "accommodation_referral",
          item_id: accommodation.id,
        },
        1500
      );
      if (res?.redirect_url) {
        targetUrl = res.redirect_url;
      }
    } catch {
      // Proceed even on failure
    } finally {
      window.open(targetUrl, "_blank", "noopener,noreferrer");
      setIsRedirecting(false);
    }
  };

  const advisoryTarget: ReferralAdvisoryTarget = {
    id: accommodation.id,
    name: accommodation.name,
    itemType: "accommodation_referral",
    partnerName: accommodation.partner_name || "Đối tác",
    redirectUrl: accommodation.partner_booking_url,
  };

  const formattedPrice = accommodation.price_from
    ? new Intl.NumberFormat("vi-VN").format(Number(accommodation.price_from)) + " ₫ / đêm"
    : "Liên hệ đối tác";

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Breadcrumb Back */}
        <div className="mb-6">
          <Link
            href="/accommodations"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-[#da251d] transition-colors"
          >
            <ChevronLeft className="size-4" />
            <span>Quay lại danh sách khách sạn & resort</span>
          </Link>
        </div>

        {/* Title Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-4 border-b border-slate-200 pb-6">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="rounded-[2px] bg-[#1e293b] px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-white">
                {accommodation.category}
              </span>
              {accommodation.star_rating && (
                <div className="flex items-center gap-0.5 text-amber-500">
                  {Array.from({ length: accommodation.star_rating }).map((_, i) => (
                    <Star key={i} className="size-3.5 fill-amber-400" />
                  ))}
                  <span className="text-xs font-bold ml-1 text-slate-700">
                    {accommodation.star_rating} Sao
                  </span>
                </div>
              )}
              <span className="text-slate-300">|</span>
              <span className="rounded-[2px] bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 text-[11px] font-semibold">
                Đối tác đặt phòng: {accommodation.partner_name}
              </span>
            </div>

            <h1 className="script-title text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
              {accommodation.name}
            </h1>

            <div className="mt-2 flex items-center gap-2 text-xs sm:text-sm text-slate-600">
              <MapPin className="size-4 shrink-0 text-[#da251d]" />
              <span>{accommodation.address}</span>
            </div>
          </div>

          <div className="text-left md:text-right shrink-0">
            <span className="text-xs text-slate-400 uppercase tracking-wider block">
              Giá tham khảo từ
            </span>
            <span className="text-2xl sm:text-3xl font-extrabold text-[#da251d]">
              {formattedPrice}
            </span>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="grid gap-4 md:grid-cols-12 mb-10">
          <div className="md:col-span-8 relative aspect-[16/10] w-full overflow-hidden rounded-[2px] bg-slate-100 shadow-md">
            <Image
              src={activeImage}
              alt={accommodation.name}
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
                  alt={`${accommodation.name} photo ${idx + 1}`}
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
                <Building2 className="size-5 text-[#da251d]" />
                <span>Giới thiệu tổng quan</span>
              </h2>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed whitespace-pre-line">
                {accommodation.description}
              </p>
              {accommodation.description_en && (
                <p className="mt-4 text-xs sm:text-sm text-slate-500 italic leading-relaxed border-l-2 border-slate-200 pl-4">
                  {accommodation.description_en}
                </p>
              )}
            </div>

            {/* Amenities & Highlights */}
            {accommodation.amenities && accommodation.amenities.length > 0 && (
              <div className="rounded-[2px] bg-white p-6 sm:p-8 shadow-sm border border-slate-100">
                <h2 className="text-xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
                  <Sparkles className="size-5 text-amber-500" />
                  <span>Tiện ích & Dịch vụ nổi bật</span>
                </h2>
                <div className="grid gap-3 sm:grid-cols-2">
                  {accommodation.amenities.map((amenity, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2.5 rounded-[2px] bg-slate-50 p-3 text-xs sm:text-sm font-medium text-slate-800 border border-slate-100"
                    >
                      <CheckCircle2 className="size-4 text-emerald-600 shrink-0" />
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Rating Section */}
            <div className="rounded-[2px] bg-white p-6 sm:p-8 shadow-sm border border-slate-100">
              <h2 className="text-xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
                <Star className="size-5 text-amber-500 fill-amber-400" />
                <span>Đánh giá từ khách hàng</span>
              </h2>
              <div className="flex items-center gap-4">
                <div className="flex flex-col items-center justify-center rounded-[2px] bg-amber-50 border border-amber-200 px-6 py-4">
                  <span className="text-3xl font-extrabold text-amber-800">
                    {Number(accommodation.rating_average).toFixed(1)}
                  </span>
                  <div className="flex items-center gap-0.5 mt-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="size-3 fill-amber-400 text-amber-500" />
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">
                    Điểm số xuất sắc từ {accommodation.rating_count} lượt khách
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Được đánh giá cao về không gian kiến trúc, chất lượng ẩm thực và cung cách phục vụ chuẩn quốc tế.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Booking CTA Box */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 rounded-[2px] bg-white p-6 shadow-md border border-amber-200/60">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
                <div>
                  <span className="text-xs text-slate-400 uppercase tracking-wider block">
                    Đối tác phân phối
                  </span>
                  <span className="text-base font-bold text-slate-900">
                    {accommodation.partner_name}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-400 uppercase tracking-wider block">
                    Khởi điểm
                  </span>
                  <span className="text-lg font-bold text-[#da251d]">
                    {formattedPrice}
                  </span>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <ShieldCheck className="size-4 text-emerald-600 shrink-0" />
                  <span>Xác nhận phòng tức thì & Đảm bảo giá tốt nhất</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <CheckCircle2 className="size-4 text-emerald-600 shrink-0" />
                  <span>Chính sách hủy linh hoạt theo điều khoản đối tác</span>
                </div>
              </div>

              {/* 1-Click Primary Action */}
              <button
                type="button"
                onClick={handlePartnerClick}
                disabled={isRedirecting}
                className="w-full rounded-[2px] bg-[#da251d] py-3.5 px-4 text-sm font-bold uppercase tracking-wider text-white transition-all hover:bg-[#b01b14] shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
              >
                <span>Đặt ngay trên {accommodation.partner_name}</span>
                <ExternalLink className="size-4" />
              </button>

              {/* Secondary Option: STAR Free Consultation */}
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="mt-3 w-full rounded-[2px] border border-amber-300 bg-amber-50/50 py-2.5 px-4 text-xs font-bold text-amber-800 transition-colors hover:bg-amber-100 flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Sparkles className="size-3.5 text-amber-600" />
                <span>Để STAR tư vấn thêm trước khi đặt?</span>
              </button>

              {/* Mandatory Legal Disclaimer */}
              <div className="mt-4 rounded-[2px] bg-slate-50 p-3 border border-slate-100">
                <p className="text-[11px] text-slate-500 text-center italic leading-relaxed">
                  STAR Travels giới thiệu, việc đặt chỗ được thực hiện trên nền tảng đối tác {accommodation.partner_name}.
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
