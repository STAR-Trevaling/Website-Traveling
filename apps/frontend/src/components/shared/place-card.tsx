import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
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
      className="group block overflow-hidden rounded-md bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
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
      </div>

      <div className="p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#0098a2]">
          {place.category?.name || "Trải nghiệm"}
        </p>

        <h3 className="script-title mt-1.5 text-2xl font-bold text-slate-900 group-hover:text-[#0098a2] transition-colors">
          {place.name}
        </h3>

        <p className="mt-2 line-clamp-2 text-sm font-normal leading-6 text-slate-600">
          {place.short_description}
        </p>

        <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 text-xs text-slate-500">
          <div className="flex items-center gap-1.5 font-medium text-amber-600">
            <Star className="size-3.5 fill-current text-amber-500" />
            <span>{Number(place.average_rating || 5.0).toFixed(1)}</span>
            <span className="text-slate-400">({place.review_count || 12} đánh giá)</span>
          </div>

          <span className="text-[#0098a2] font-medium group-hover:underline">
            Chi tiết →
          </span>
        </div>
      </div>
    </Link>
  );
}
