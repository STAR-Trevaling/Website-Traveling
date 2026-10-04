import type { Metadata } from "next";
import { PageHero } from "@/components/layout/page-hero";
import { PlaceCard } from "@/components/shared/place-card";
import { publicApi, safe } from "@/lib/api";
import { VIETNAM_IMAGES } from "@/lib/assets";
import { VIETNAM_EXPERIENCES } from "@/lib/experiences-data";

export const metadata: Metadata = {
  title: "Trải nghiệm & Phiêu lưu tại Việt Nam",
  description: "Khám phá các tour trải nghiệm địa phương, lặn biển, trekking và du thuyền.",
};

interface ExperiencesPageProps {
  searchParams: Promise<Record<string, string | undefined>>;
}

export default async function ExperiencesPage({ searchParams }: ExperiencesPageProps) {
  const params = await searchParams;
  let items = [];

  if (params.lat && params.lng) {
    items = await safe(
      publicApi.nearby(
        Number(params.lat),
        Number(params.lng),
        Number(params.radius || 10)
      ),
      []
    );
  } else {
    const qs = new URLSearchParams();
    if (params.search) qs.set("search", params.search);
    if (params.destination) qs.set("destination__slug", params.destination);
    if (params.category) qs.set("category__slug", params.category);

    const query = qs.size ? `?${qs.toString()}` : "";
    items = await safe(publicApi.places(query), []);
  }

  if (items.length === 0) {
    items = VIETNAM_EXPERIENCES;
  }

  return (
    <>
      <PageHero
        title="Trải Nghiệm Độc Bản"
        subtitle="Khám phá các hoạt động du lịch bản địa, từ du thuyền ngắm vịnh, trekking săn mây đến lặn ngắm san hô."
        image={VIETNAM_IMAGES.oceanBanner}
      />

      <main className="template-page-bg min-h-screen px-6 py-20 md:px-12">
        <div className="mx-auto max-w-7xl">
          {items.length > 0 ? (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((place) => (
                <PlaceCard key={place.id} place={place} />
              ))}
            </div>
          ) : (
            <div className="py-24 text-center">
              <p className="text-lg text-slate-500 font-light">
                {params.search
                  ? `Không tìm thấy trải nghiệm nào phù hợp với "${params.search}".`
                  : "Chưa có trải nghiệm nào phù hợp với bộ lọc hiện tại."}
              </p>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
