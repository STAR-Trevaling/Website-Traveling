"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, MapPin, ExternalLink, Sparkles } from "lucide-react";
import type { Accommodation } from "@/lib/types";
import { publicApi } from "@/lib/api";
import { ReferralAdvisoryModal, type ReferralAdvisoryTarget } from "@/components/shared/referral-advisory-modal";
import { formatDistance } from "@/lib/geo-utils";

interface AccommodationCardProps {
  accommodation: Accommodation;
  isRecommended?: boolean;
  recommendationReason?: string;
  distanceKm?: number;
}

export function AccommodationCard({
  accommodation,
  isRecommended = false,
  recommendationReason,
  distanceKm,
}: AccommodationCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);

  const handlePartnerClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    setIsRedirecting(true);

    const fallbackUrl = accommodation.partner_booking_url;
    let targetUrl = fallbackUrl;

    try {
      // 1-Click tracking: timeout at 1.5s max so user is never blocked
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
      // Ignore network timeout or errors, always proceed to partner URL
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
    ? new Intl.NumberFormat("vi-VN").format(Number(accommodation.price_from)) + " ₫/đêm"
    : "Liên hệ giá";

  return (
    <>
      <article
        className={`group travel-card-lift flex flex-col justify-between overflow-hidden rounded-[2px] bg-white border shadow-sm transition-all ${
          isRecommended
            ? "border-amber-400 ring-2 ring-amber-400/40 shadow-lg"
            : "border-slate-100 hover:border-amber-300/60"
        }`}
      >
        <div>
          {/* Smart Recommendation Banner */}
          {isRecommended && (
            <div className="bg-gradient-to-r from-[#991b1b] via-[#da251d] to-amber-600 px-3.5 py-1.5 text-white flex items-center justify-between text-[10px] sm:text-[11px] font-bold tracking-wider uppercase">
              <span className="flex items-center gap-1.5">
                <Sparkles className="size-3 text-amber-300 fill-amber-300 animate-pulse" />
                <span>GỢI Ý STAR HÀNG ĐẦU</span>
              </span>
              {recommendationReason && (
                <span className="text-[10px] text-amber-100 font-medium normal-case tracking-normal truncate max-w-[180px]">
                  {recommendationReason}
                </span>
              )}
            </div>
          )}

          {/* Photo & Badges */}
          <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
            <Image
              src={accommodation.image_url}
              alt={accommodation.name}
              fill
              unoptimized
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

            {/* Category Badge */}
            <div className="absolute top-3 left-3 rounded-[2px] bg-[#1e293b]/90 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur-md uppercase tracking-wider shadow-sm">
              <span>{accommodation.category}</span>
            </div>

            {/* Partner Badge */}
            <div className="absolute top-3 right-3 flex items-center gap-1 rounded-[2px] bg-amber-500/90 px-2 py-0.5 text-[10px] font-bold text-white uppercase tracking-wider shadow-sm">
              <span>{accommodation.partner_name}</span>
            </div>

            {/* Address & Distance */}
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-1 text-xs font-medium text-white/95 drop-shadow-sm">
              <div className="flex items-center gap-1 min-w-0 truncate">
                <MapPin className="size-3.5 shrink-0 text-white" />
                <span className="truncate">{accommodation.address}</span>
              </div>
              {distanceKm !== undefined && (
                <span className="shrink-0 rounded-[2px] bg-emerald-600/90 text-white px-1.5 py-0.5 text-[10px] font-bold shadow-sm whitespace-nowrap">
                  ~{formatDistance(distanceKm)}
                </span>
              )}
            </div>
          </div>

          {/* Body */}
          <div className="p-5">
            {/* Rating & Star */}
            <div className="flex items-center justify-between text-xs mb-2">
              <div className="flex items-center gap-1 text-amber-500 font-bold">
                <Star className="size-3.5 fill-amber-400" />
                <span>{Number(accommodation.rating_average).toFixed(1)}</span>
                <span className="text-slate-400 font-normal">
                  ({accommodation.rating_count} đánh giá)
                </span>
              </div>
              {accommodation.star_rating && (
                <div className="flex items-center gap-0.5 text-amber-400">
                  {Array.from({ length: accommodation.star_rating }).map((_, i) => (
                    <Star key={i} className="size-3 fill-amber-400" />
                  ))}
                </div>
              )}
            </div>

            <Link href={`/accommodations/${accommodation.slug}`}>
              <h3 className="script-title text-xl font-bold leading-snug text-slate-900 group-hover:text-[#da251d] transition-colors line-clamp-2">
                {accommodation.name}
              </h3>
            </Link>

            <p className="mt-2 text-xs text-slate-600 line-clamp-2 leading-relaxed">
              {accommodation.description}
            </p>

            {/* Amenities snippet */}
            {accommodation.amenities && accommodation.amenities.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1.5">
                {accommodation.amenities.slice(0, 3).map((amenity, idx) => (
                  <span
                    key={idx}
                    className="rounded-[2px] bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-600"
                  >
                    {amenity}
                  </span>
                ))}
                {accommodation.amenities.length > 3 && (
                  <span className="text-[10px] text-slate-400 py-0.5">
                    +{accommodation.amenities.length - 3} tiện ích khác
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Card Footer & Action */}
        <div className="border-t border-slate-100 bg-slate-50/50 p-5 pt-3">
          <div className="flex items-baseline justify-between mb-3">
            <span className="text-[11px] uppercase tracking-wider text-slate-400 font-medium">
              Giá khởi điểm
            </span>
            <div className="text-right">
              <span className="text-base font-bold text-[#da251d]">
                {formattedPrice}
              </span>
            </div>
          </div>

          {/* Primary 1-Click CTA */}
          <button
            type="button"
            onClick={handlePartnerClick}
            disabled={isRedirecting}
            className="w-full rounded-[2px] bg-[#da251d] py-2.5 px-4 text-xs font-bold uppercase tracking-wider text-white transition-all hover:bg-[#b01b14] shadow-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
          >
            <span>Đặt ngay trên {accommodation.partner_name}</span>
            <ExternalLink className="size-3.5" />
          </button>

          {/* Secondary Option: Ask STAR Consultation */}
          <div className="mt-2 flex items-center justify-center">
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="text-[11px] font-semibold text-amber-700 hover:text-amber-900 transition-colors inline-flex items-center cursor-pointer py-1"
            >
              <span>Để STAR tư vấn thêm trước khi đặt?</span>
            </button>
          </div>

          {/* Disclaimer */}
          <p className="mt-2 text-[10px] text-center text-slate-400 italic leading-tight">
            STAR Travels giới thiệu, việc đặt chỗ được thực hiện trên nền tảng đối tác.
          </p>
        </div>
      </article>

      <ReferralAdvisoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        target={advisoryTarget}
      />
    </>
  );
}
