"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, MapPin, ExternalLink, Phone, Sparkles } from "lucide-react";
import type { Restaurant } from "@/lib/types";
import { publicApi } from "@/lib/api";
import { ReferralAdvisoryModal, type ReferralAdvisoryTarget } from "@/components/shared/referral-advisory-modal";
import { formatDistance } from "@/lib/geo-utils";

interface RestaurantCardProps {
  restaurant: Restaurant;
  isRecommended?: boolean;
  recommendationReason?: string;
  distanceKm?: number;
}

export function RestaurantCard({
  restaurant,
  isRecommended = false,
  recommendationReason,
  distanceKm,
}: RestaurantCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);

  const isPhone = restaurant.contact_type === "phone";

  const handleActionClick = async (e: React.MouseEvent) => {
    // If phone link, still record referral tracking
    setIsRedirecting(true);

    const fallbackUrl = restaurant.contact_value;
    let targetUrl = fallbackUrl;

    try {
      // 1-Click tracking: timeout at 1.5s max
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
      // Proceed even on failure
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
    ? `Liên hệ đặt bàn: ${restaurant.contact_value.replace("tel:", "")}`
    : "Đặt bàn trực tuyến ngay";

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
                <span>GỢI Ý ẨM THỰC STAR</span>
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
              src={restaurant.image_url}
              alt={restaurant.name}
              fill
              unoptimized
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

            {/* Cuisine Badge */}
            <div className="absolute top-3 left-3 rounded-[2px] bg-[#1e293b]/90 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur-md uppercase tracking-wider shadow-sm">
              <span>{restaurant.cuisine_type}</span>
            </div>

            {/* Price Range Badge */}
            <div className="absolute top-3 right-3 flex items-center gap-1 rounded-[2px] bg-emerald-700/90 px-2 py-0.5 text-[11px] font-bold text-white tracking-wider shadow-sm">
              <span>{restaurant.price_range}</span>
            </div>

            {/* Address & Distance */}
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-1 text-xs font-medium text-white/95 drop-shadow-sm">
              <div className="flex items-center gap-1 min-w-0 truncate">
                <MapPin className="size-3.5 shrink-0 text-white" />
                <span className="truncate">{restaurant.address}</span>
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
            {/* Rating */}
            <div className="flex items-center justify-between text-xs mb-2">
              <div className="flex items-center gap-1 text-amber-500 font-bold">
                <Star className="size-3.5 fill-amber-400" />
                <span>{Number(restaurant.rating_average).toFixed(1)}</span>
                <span className="text-slate-400 font-normal">
                  ({restaurant.rating_count} đánh giá)
                </span>
              </div>
              <div className="text-[11px] text-slate-500 font-medium">
                <span>Mở cửa hôm nay</span>
              </div>
            </div>

            <Link href={`/restaurants/${restaurant.slug}`}>
              <h3 className="script-title text-xl font-bold leading-snug text-slate-900 group-hover:text-[#da251d] transition-colors line-clamp-2">
                {restaurant.name}
              </h3>
            </Link>

            <p className="mt-2 text-xs text-slate-600 line-clamp-2 leading-relaxed">
              {restaurant.description}
            </p>

            {/* Signature Dishes snippet */}
            {restaurant.signature_dishes && restaurant.signature_dishes.length > 0 && (
              <div className="mt-3">
                <div className="text-[11px] font-semibold text-slate-700 mb-1.5">
                  <span>Món đặc trưng:</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {restaurant.signature_dishes.slice(0, 3).map((dish, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center rounded-[2px] bg-amber-50/80 border border-amber-100 px-2 py-0.5 text-[10px] text-amber-900"
                    >
                      {dish}
                    </span>
                  ))}
                  {restaurant.signature_dishes.length > 3 && (
                    <span className="text-[10px] text-slate-400 py-0.5">
                      +{restaurant.signature_dishes.length - 3} món khác
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Card Footer & Action */}
        <div className="border-t border-slate-100 bg-slate-50/50 p-5 pt-3">
          {/* Primary 1-Click CTA */}
          <button
            type="button"
            onClick={handleActionClick}
            disabled={isRedirecting}
            className={`w-full rounded-[2px] py-2.5 px-4 text-xs font-bold uppercase tracking-wider text-white transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75 ${
              isPhone
                ? "bg-[#0098a2] hover:bg-[#007f87]"
                : "bg-[#da251d] hover:bg-[#b01b14]"
            }`}
          >
            {isPhone ? <Phone className="size-3.5" /> : <ExternalLink className="size-3.5" />}
            <span className="truncate">{ctaLabel}</span>
          </button>

          {/* Secondary Option: Ask STAR Consultation */}
          <div className="mt-2 flex items-center justify-center">
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="text-[11px] font-semibold text-amber-700 hover:text-amber-900 transition-colors inline-flex items-center cursor-pointer py-1"
            >
              <span>Để STAR tư vấn đặt bàn & ưu đãi?</span>
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
