import Image from "next/image";
import Link from "next/link";
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
      className="group block overflow-hidden rounded-md bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
        <Image
          src={imageUrl}
          alt={destination.name}
          fill
          unoptimized
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="script-title text-2xl font-bold text-slate-900 group-hover:text-[#0098a2] transition-colors">
              {destination.name}
            </h3>
            <p className="mt-0.5 text-xs font-medium uppercase tracking-[0.18em] text-slate-400">
              {destination.country || "Việt Nam"}
            </p>
          </div>
          <span className="text-sm font-semibold text-[#0098a2] opacity-0 group-hover:opacity-100 transition-opacity">
            Chi tiết →
          </span>
        </div>

        <p className="mt-3 line-clamp-2 text-sm font-normal leading-6 text-slate-600">
          {destination.summary}
        </p>
      </div>
    </Link>
  );
}
