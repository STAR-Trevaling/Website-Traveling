import Image from "next/image";
import Link from "next/link";
import { Star, MapPin } from "lucide-react";
import type { Place } from "@/lib/types";
import { VIETNAM_IMAGES } from "@/lib/assets";

interface PlaceCardProps {
  place: Place;
}

export function PlaceCard({ place }: PlaceCardProps) {
  const imageUrl = place.image_url || VIETNAM_IMAGES.cruise;

  return (
    <Link
      href={`/experiences/${place.slug}`}
      className="group block overflow-hidden rounded-[2px] bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg border border-slate-100"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
        <Image
          src={imageUrl}
          alt={place.name}
          fill
          unoptimized
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        
        {place.category?.name && (
          <div className="absolute top-3 left-3 bg-[#1e293b]/85 backdrop-blur-sm px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white rounded-[2px]">
            {place.category.name}
          </div>
        )}
      </div>

      <div className="p-5">
        <h3 className="script-title text-2xl font-bold text-slate-900 group-hover:text-[#0098a2] transition-colors leading-tight">
          {place.name}
        </h3>

        {place.address && (
          <p className="mt-1 flex items-center gap-1 text-xs text-slate-400 font-light truncate">
            <MapPin className="size-3 text-[#0098a2] shrink-0" />
            <span>{place.address}</span>
          </p>
        )}

        <p className="mt-2.5 line-clamp-2 text-xs md:text-sm font-light leading-relaxed text-slate-600">
          {place.short_description || place.description}
        </p>

        <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 text-xs text-slate-500">
          <div className="flex items-center gap-1.5 font-medium text-amber-600">
            <Star className="size-3.5 fill-current text-amber-500" />
            <span>{Number(place.average_rating || 5.0).toFixed(1)}</span>
            <span className="text-slate-400 font-light">({place.review_count || 12} đánh giá)</span>
          </div>

          <span className="text-[#0098a2] font-semibold text-xs tracking-wider uppercase group-hover:underline">
            Chi tiết →
          </span>
        </div>
      </div>
    </Link>
  );
}
