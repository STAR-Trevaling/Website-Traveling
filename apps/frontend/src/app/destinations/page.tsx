import type { Metadata } from "next";
import Link from "next/link";
import { Search } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { DestinationCard } from "@/components/shared/destination-card";
import { publicApi, safe } from "@/lib/api";
import { VIETNAM_IMAGES } from "@/lib/assets";
import { ALL_VIETNAM_DESTINATIONS } from "@/lib/destinations-data";

export const metadata: Metadata = {
  title: "Điểm Đến Nổi Tiếng Tại Việt Nam | Star Travels Vietnam",
  description: "Khám phá danh thắng, vịnh biển và di sản văn hóa khắp dải đất hình chữ S: Hạ Long, Sa Pa, Đà Nẵng, Phú Quốc, Hội An, Miền Tây.",
};

interface DestinationsPageProps {
  searchParams: Promise<{ search?: string }>;
}

export default async function DestinationsPage({ searchParams }: DestinationsPageProps) {
  const { search } = await searchParams;
  const queryString = search ? `?search=${encodeURIComponent(search)}` : "";
  const backendItems = await safe(publicApi.destinations(queryString), []);

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
        subtitle="Hành trình khám phá những danh thắng thiên nhiên kỳ vĩ và di sản văn hóa trường tồn trên khắp mọi miền đất nước."
        image={VIETNAM_IMAGES.hero}
      />

      <main className="template-page-bg min-h-screen text-[#282828] px-6 py-16 md:px-12 lg:px-16 overflow-x-hidden">
        <div className="mx-auto max-w-7xl">
          {/* Section Header & Search */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-10 border-b border-slate-200">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-slate-900">
                Danh Thắng Di Sản
              </span>
              <h2 className="script-title mt-1 text-4xl md:text-5xl text-[#1e293b]">
                Popular Destinations
              </h2>
              <p className="mt-2 text-xs md:text-sm text-slate-500 font-light">
                Tuyển tập những vùng đất quyến rũ nhất được du khách quốc tế và trong nước yêu chuộng.
              </p>
            </div>

            <form method="GET" className="relative w-full max-w-md">
              <input
                type="text"
                name="search"
                defaultValue={search || ""}
                placeholder="Tìm điểm đến (Hạ Long, Sa Pa, Phú Quốc...)"
                className="w-full bg-white border border-slate-200 px-4 py-3 pr-10 text-xs md:text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-slate-800 focus:ring-1 focus:ring-slate-800 rounded-[2px]"
              />
              <button
                type="submit"
                aria-label="Tìm kiếm"
                className="absolute right-3 top-3 text-slate-400 hover:text-slate-900 transition"
              >
                <Search className="size-4" />
              </button>
            </form>
          </div>

          {/* Destinations Grid */}
          <div className="mt-12">
            {items.length > 0 ? (
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((destination) => (
                  <DestinationCard key={destination.id} destination={destination} />
                ))}
              </div>
            ) : (
              <div className="py-24 text-center rounded-[2px] bg-white/70 p-12 border border-slate-100">
                <p className="text-lg text-slate-500 font-light">
                  {search
                    ? `Không tìm thấy điểm đến nào phù hợp với từ khóa "${search}".`
                    : "Chưa có điểm đến nào được xuất bản."}
                </p>
                <div className="mt-6">
                  <Link
                    href="/destinations"
                    className="inline-block bg-[#0098a2] text-white px-6 py-2.5 text-xs font-semibold uppercase tracking-wider rounded-[2px] shadow-sm transition-all duration-200 hover:bg-[#008f99] hover:shadow-[0px_8px_25px_rgba(0,152,162,0.35)] hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                  >
                    Xem Tất Cả Điểm Đến
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* CALL TO ACTION */}
          <section className="mt-24 w-full bg-white/85 backdrop-blur-md py-16 text-center rounded-[2px] border border-white/60 shadow-sm">
            <div className="mx-auto max-w-3xl px-6">
              <h2 className="script-title text-4xl sm:text-5xl text-[#1e293b]">
                Looking for an experience?
              </h2>
              <p className="mt-3 text-sm md:text-base text-[#4b5563] font-light max-w-xl mx-auto leading-relaxed">
                Khám phá ngay các gói trải nghiệm chèo thuyền, lặn biển và trekking tại những vùng đất di sản tuyệt đẹp này.
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/experiences"
                  className="border border-slate-700/70 bg-white text-[#1e293b] px-8 py-3 text-xs md:text-sm font-bold tracking-[0.2em] uppercase rounded-[2px] template-shadow-text shadow-sm transition-all duration-200 hover:border-black hover:text-black hover:bg-slate-50 hover:shadow-[0px_8px_25px_rgba(0,0,0,0.15)] hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                >
                  Xem Gói Trải Nghiệm
                </Link>
                <Link
                  href="/tours"
                  className="bg-white text-[#1e293b] border border-slate-300 px-8 py-3 text-xs md:text-sm font-semibold tracking-widest uppercase rounded-[2px] shadow-sm transition-all duration-200 hover:bg-white hover:border-slate-400 hover:shadow-[0px_6px_20px_rgba(0,0,0,0.10)] hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                >
                  Xem Tour Trọn Gói
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
