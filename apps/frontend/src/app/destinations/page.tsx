import type { Metadata } from "next";
import { PageHero } from "@/components/layout/page-hero";
import { DestinationCard } from "@/components/shared/destination-card";
import { publicApi, safe } from "@/lib/api";
import { VIETNAM_IMAGES } from "@/lib/assets";
import { ALL_VIETNAM_DESTINATIONS } from "@/lib/destinations-data";

export const metadata: Metadata = {
  title: "Điểm đến nổi tiếng tại Việt Nam",
  description: "Khám phá danh thắng, vịnh biển và di sản văn hóa khắp dải đất hình chữ S.",
};

interface DestinationsPageProps {
  searchParams: Promise<{ search?: string }>;
}

export default async function DestinationsPage({ searchParams }: DestinationsPageProps) {
  const { search } = await searchParams;
  const queryString = search ? `?search=${encodeURIComponent(search)}` : "";
  const backendItems = await safe(publicApi.destinations(queryString), []);
  
  // Use backend items if available, otherwise use curated Vietnam destinations
  let items = backendItems.length > 0 ? backendItems : ALL_VIETNAM_DESTINATIONS;
  if (search) {
    const s = search.toLowerCase();
    items = items.filter(
      (d) =>
        d.name.toLowerCase().includes(s) ||
        d.country.toLowerCase().includes(s) ||
        d.summary.toLowerCase().includes(s)
    );
  }

  return (
    <>
      <PageHero
        title="Điểm Đến Việt Nam"
        subtitle="Hành trình khám phá những danh thắng thiên nhiên kỳ vĩ và di sản văn hóa trường tồn."
        image={VIETNAM_IMAGES.hero}
      />

      <main className="template-page-bg min-h-screen px-6 py-20 md:px-12">
        <div className="mx-auto max-w-7xl">
          {items.length > 0 ? (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((destination) => (
                <DestinationCard key={destination.id} destination={destination} />
              ))}
            </div>
          ) : (
            <div className="py-24 text-center">
              <p className="text-lg text-slate-500 font-light">
                {search
                  ? `Không tìm thấy điểm đến nào phù hợp với từ khóa "${search}".`
                  : "Chưa có điểm đến nào được xuất bản."}
              </p>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
