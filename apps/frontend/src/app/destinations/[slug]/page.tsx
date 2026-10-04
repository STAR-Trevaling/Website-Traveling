import Image from "next/image";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/layout/site-header";
import { PlaceCard } from "@/components/shared/place-card";
import { publicApi, safe } from "@/lib/api";
import { VIETNAM_IMAGES } from "@/lib/assets";
import { ALL_VIETNAM_DESTINATIONS } from "@/lib/destinations-data";
import type { Destination, Place } from "@/lib/types";

interface DestinationDetailProps {
  params: Promise<{ slug: string }>;
}

export default async function DestinationDetail({ params }: DestinationDetailProps) {
  const { slug } = await params;

  // Find fallback from curated Vietnam destinations if backend is not seeded
  const fallback = ALL_VIETNAM_DESTINATIONS.find((d) => d.slug === slug);

  let destination: Destination | undefined;
  try {
    destination = await publicApi.destination(slug);
  } catch {
    destination = fallback;
  }

  if (!destination) {
    notFound();
  }

  const places = await safe(publicApi.places(`?destination__slug=${slug}`), []);

  return (
    <>
      <section className="relative min-h-[620px] text-white">
        <Image
          src={destination.hero_image_url || destination.image_url || VIETNAM_IMAGES.hero}
          alt={destination.name}
          fill
          priority
          unoptimized
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/45" />
        <SiteHeader overlay />

        <div className="relative z-10 mx-auto flex min-h-[620px] max-w-7xl items-end px-6 pb-16 md:px-12">
          <div>
            <p className="text-xs uppercase tracking-[.25em] text-[#00c2cb] font-semibold">
              {destination.country}
            </p>
            <h1 className="display-title template-shadow-text mt-2 text-6xl md:text-8xl">
              {destination.name}
            </h1>
            <p className="mt-5 max-w-2xl text-base md:text-lg font-light leading-relaxed text-white/95">
              {destination.summary}
            </p>
          </div>
        </div>
      </section>

      <main className="template-page-bg px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-4xl text-lg font-light leading-8 text-slate-700">
            {destination.description}
          </div>

          <h2 className="script-title mt-16 text-4xl md:text-5xl text-slate-900">
            Trải nghiệm & Khám phá tại {destination.name}
          </h2>

          <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {places.length > 0 ? (
              places.map((p) => <PlaceCard key={p.id} place={p} />)
            ) : (
              <div className="col-span-full rounded-xl bg-white/70 p-10 text-center shadow-sm">
                <p className="text-base text-slate-600 font-light">
                  Đang cập nhật các tour và trải nghiệm độc quyền mới nhất cho {destination.name}.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
