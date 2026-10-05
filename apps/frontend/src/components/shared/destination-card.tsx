import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import type { Destination } from "@/lib/types";
import { VIETNAM_IMAGES } from "@/lib/assets";

interface DestinationCardProps {
  destination: Destination;
}

export function DestinationCard({ destination }: DestinationCardProps) {
  const imageUrl = destination.image_url || VIETNAM_IMAGES.haLong;

  return (
    <Link
      href={`/destinations/${destination.slug}`}
      className="group block overflow-hidden rounded-[2px] bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg border border-slate-100 flex flex-col justify-between"
    >
      <div>
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
          <Image
            src={imageUrl}
            alt={destination.name}
            fill
            unoptimized
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          
          <div className="absolute top-3 left-3 bg-[#1e293b]/85 backdrop-blur-sm px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white rounded-[2px] flex items-center gap-1">
            <MapPin className="size-3 text-[#00c2cb]" />
            <span>{destination.country || "Việt Nam"}</span>
          </div>
        </div>

        <div className="p-5">
          <h3 className="script-title text-2xl font-bold text-slate-900 group-hover:text-[#0098a2] transition-colors leading-tight">
            {destination.name}
          </h3>

          <p className="mt-2 line-clamp-2 text-xs md:text-sm font-light leading-relaxed text-slate-600">
            {destination.summary}
          </p>
        </div>
      </div>

      <div className="p-5 pt-0 border-t border-slate-100 mt-2 flex items-center justify-between">
        <div>
          {destination.starting_price ? (
            <div>
              <span className="text-[10px] text-slate-400 font-light block uppercase tracking-wider">Từ</span>
              <strong className="text-xs sm:text-sm font-bold text-[#0098a2]">
                {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(Number(destination.starting_price))}
              </strong>
            </div>
          ) : (
            <span className="text-xs text-slate-400 font-light">Điểm đến nổi bật</span>
          )}
        </div>

        <span className="text-xs font-semibold uppercase tracking-wider text-slate-700 group-hover:text-[#0098a2] flex items-center gap-1">
          Khám phá <ArrowRight className="size-3" />
        </span>
      </div>
    </Link>
  );
}
