import Image from "next/image";
import { SiteHeader } from "@/components/layout/site-header";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  image: string;
}

export function PageHero({ title, subtitle, image }: PageHeroProps) {
  return (
    <section className="relative min-h-[460px] md:min-h-[500px] overflow-hidden text-white flex items-end">
      <Image
        src={image}
        alt={title}
        fill
        priority
        unoptimized
        className="object-cover"
      />
      {/* High-contrast gradient overlay ensuring crystal-clear text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/40" />
      <SiteHeader overlay />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-16 md:px-12 pt-28">
        <div className="max-w-4xl">
          <h1 className="display-title text-4xl sm:text-6xl md:text-7xl font-black leading-tight text-white drop-shadow-[0_2px_14px_rgba(0,0,0,0.95)]">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-4 max-w-3xl text-base sm:text-lg md:text-xl font-normal leading-relaxed text-white/95 drop-shadow-[0_1px_8px_rgba(0,0,0,0.9)]">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
