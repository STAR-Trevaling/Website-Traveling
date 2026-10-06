"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, MapPin, ArrowRight } from "lucide-react";
import type { Place } from "@/lib/types";
import { VIETNAM_IMAGES } from "@/lib/assets";
import { useLanguage } from "@/lib/i18n/context";

interface PlaceCardProps {
  place: Place;
}

export function PlaceCard({ place }: PlaceCardProps) {
  const { isEnglish, t } = useLanguage();
  const imageUrl = place.image_url || VIETNAM_IMAGES.cruise;

  const displayName = isEnglish && place.name_en ? place.name_en : place.name;
  const displayDesc =
    isEnglish && place.short_description_en
      ? place.short_description_en
      : place.short_description || place.description;
  const displayCategory =
    isEnglish && place.category?.name_en ? place.category.name_en : place.category?.name;
  const displayAddress = isEnglish && place.address_en ? place.address_en : place.address;

  return (
    <Link
      href={`/experiences/${place.slug}`}
      className="group travel-card-lift block overflow-hidden rounded-[2px] bg-white border border-slate-100 flex flex-col justify-between"
    >
      <div>
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
          <Image
            src={imageUrl}
            alt={displayName}
            fill
            unoptimized
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

          {displayCategory && (
            <div className="absolute top-3 left-3 bg-[#1e293b]/85 backdrop-blur-md px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white rounded-[2px] shadow-sm">
              {displayCategory}
            </div>
          )}
        </div>

        <div className="p-5">
          <h3 className="script-title text-2xl font-bold text-slate-900 group-hover:text-[#0098a2] transition-colors leading-tight">
            {displayName}
          </h3>

          {displayAddress && (
            <p className="mt-1 flex items-center gap-1 text-xs text-slate-400 font-light truncate">
              <MapPin className="size-3 text-slate-400 shrink-0" />
              <span>{displayAddress}</span>
            </p>
          )}

          <p className="mt-2.5 line-clamp-2 text-xs md:text-sm font-light leading-relaxed text-slate-600">
            {displayDesc}
          </p>
        </div>
      </div>

      <div className="p-5 pt-0">
        <div className="flex items-center justify-between border-t border-slate-100 pt-3 text-xs text-slate-500">
          <div className="flex items-center gap-1.5 font-medium text-amber-600">
            <Star className="size-3.5 fill-current text-amber-500" />
            <span>{Number(place.average_rating || 5.0).toFixed(1)}</span>
            <span className="text-slate-400 font-light">
              ({place.review_count || 12} {t.common.reviews})
            </span>
          </div>

          <span className="text-slate-900 font-bold text-xs tracking-wider uppercase group-hover:text-[#0098a2] flex items-center gap-1 transition-colors">
            <span>{t.common.details}</span>
            <ArrowRight className="size-3 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </Link>
  );
}
