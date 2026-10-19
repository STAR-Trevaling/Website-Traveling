import Image from "next/image";
import Link from "next/link";
import { cookies } from "next/headers";
import { ArrowRight, MapPin, BookOpen } from "lucide-react";
import type { Destination } from "@/lib/types";
import { VIETNAM_IMAGES } from "@/lib/assets";

interface DestinationCardProps {
  destination: Destination;
}

export async function DestinationCard({ destination }: DestinationCardProps) {
  const cookieStore = await cookies();
  const isEn = cookieStore.get("star_travels_locale")?.value === "en";

  const imageUrl = destination.image_url || VIETNAM_IMAGES.haLong;
  const displayName = isEn && destination.name_en ? destination.name_en : destination.name;
  const displaySummary = isEn && destination.summary_en ? destination.summary_en : destination.summary;
  const displayCountry = isEn && destination.country_en ? destination.country_en : (destination.country || "Việt Nam");

  return (
    <Link
      href={`/destinations/${destination.slug}`}
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
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          
          <div className="absolute top-3 left-3 bg-[#1e293b]/85 backdrop-blur-md px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white rounded-[2px] flex items-center gap-1 shadow-sm">
            <MapPin className="size-3 text-white" />
            <span>{displayCountry}</span>
          </div>
        </div>

        <div className="p-5">
          <h3 className="script-title text-2xl font-bold text-slate-900 group-hover:text-[#da251d] transition-colors leading-tight">
            {displayName}
          </h3>

          <p className="mt-2 line-clamp-2 text-xs md:text-sm font-light leading-relaxed text-slate-600">
            {displaySummary}
          </p>
        </div>
      </div>

      <div className="p-5 pt-0 border-t border-slate-100 mt-2 flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
          <BookOpen className="size-3.5 text-[#0098a2]" />
          <span>{isEn ? "Travel Guide & Heritage" : "Cẩm nang & Di sản"}</span>
        </div>

        <span className="text-xs font-semibold uppercase tracking-wider text-slate-700 group-hover:text-[#da251d] flex items-center gap-1 transition-colors">
          <span>{isEn ? "Explore" : "Khám phá"}</span>
          <ArrowRight className="size-3 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
