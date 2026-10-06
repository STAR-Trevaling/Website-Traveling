import Image from "next/image";
import { cookies } from "next/headers";
import { SiteHeader } from "@/components/layout/site-header";

interface PageHeroProps {
  title: string;
  titleEn?: string;
  subtitle?: string;
  subtitleEn?: string;
  image: string;
}

export async function PageHero({ title, titleEn, subtitle, subtitleEn, image }: PageHeroProps) {
  const cookieStore = await cookies();
  const isEn = cookieStore.get("star_travels_locale")?.value === "en";
  const displayTitle = isEn && titleEn ? titleEn : title;
  const displaySubtitle = isEn && subtitleEn ? subtitleEn : subtitle;

  return (
    <section className="relative min-h-[320px] sm:min-h-[420px] md:min-h-[500px] overflow-hidden text-white flex items-end">
      <Image
        src={image}
        alt={displayTitle}
        fill
        priority
        unoptimized
        className="object-cover"
      />
      {/* High-contrast gradient overlay ensuring crystal-clear text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/40" />
      <SiteHeader overlay />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-12 pb-8 sm:pb-14 pt-20 sm:pt-28">
        <div className="max-w-4xl">
          <h1 className="display-title text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-tight text-white drop-shadow-[0_2px_14px_rgba(0,0,0,0.95)]">
            {displayTitle}
          </h1>
          {displaySubtitle && (
            <p className="mt-2 sm:mt-3.5 max-w-3xl text-xs sm:text-base md:text-lg lg:text-xl font-normal leading-relaxed text-white/95 drop-shadow-[0_1px_8px_rgba(0,0,0,0.9)]">
              {displaySubtitle}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
