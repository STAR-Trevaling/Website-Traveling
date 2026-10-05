import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Search } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { PlaceCard } from "@/components/shared/place-card";
import { publicApi, safe } from "@/lib/api";
import { VIETNAM_IMAGES } from "@/lib/assets";
import { VIETNAM_EXPERIENCES } from "@/lib/experiences-data";

export const metadata: Metadata = {
  title: "Gói Trải Nghiệm & Phiêu Lưu Độc Bản | Star Travels Vietnam",
  description: "Khám phá các tour trải nghiệm địa phương: du thuyền Hạ Long, trekking Fansipan, sailing Cát Bà và lặn san hô Phú Quốc.",
};

interface ExperiencesPageProps {
  searchParams: Promise<Record<string, string | undefined>>;
}

const CATEGORIES = [
  { label: "Tất cả", slug: "" },
  { label: "Du Thuyền & Sông Nước", slug: "du-thuyen" },
  { label: "Thể Thao Biển & Sailing", slug: "the-thao-nuoc" },
  { label: "Trekking & Săn Mây", slug: "trekking-leo-nui" },
  { label: "Cắm Trại Sinh Thái", slug: "cam-trai" },
  { label: "Lặn Biển San Hô", slug: "lan-bien" },
];

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

  // Fallback to rich curated Vietnam experiences if backend empty
  if (items.length === 0) {
    items = VIETNAM_EXPERIENCES;
    if (params.category) {
      items = items.filter((p) => p.category?.slug === params.category);
    }
    if (params.search) {
      const q = params.search.toLowerCase();
      items = items.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.address.toLowerCase().includes(q)
      );
    }
  }

  const currentCategory = params.category || "";

  return (
    <>
      <PageHero
        title="Gói Trải Nghiệm Độc Bản"
        subtitle="Khám phá các hoạt động du lịch bản địa nguyên bản, từ du thuyền ngắm vịnh, trekking săn mây đến lặn ngắm rạn san hô đại dương."
        image={VIETNAM_IMAGES.oceanBanner}
      />

      <main className="template-page-bg min-h-screen text-[#282828] px-6 py-16 md:px-12 lg:px-16 overflow-x-hidden">
        <div className="mx-auto max-w-7xl">
          {/* HEADER & FILTER BAR */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 pb-10 border-b border-slate-200">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-slate-900">
                Tuyển Tập Trải Nghiệm
              </span>
              <h2 className="script-title mt-1 text-4xl md:text-5xl text-[#1e293b]">
                Have an Adventure Today
              </h2>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => {
                const isActive = currentCategory === cat.slug;
                const href = cat.slug ? `/experiences?category=${cat.slug}` : "/experiences";
                return (
                  <Link
                    key={cat.label}
                    href={href}
                    className={`px-4 py-2 text-xs font-medium uppercase tracking-wider rounded-[2px] transition ${
                      isActive
                        ? "bg-[#0098a2] text-white shadow-sm"
                        : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
                    }`}
                  >
                    {cat.label}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* MAIN EXPERIENCES GRID */}
          <div className="mt-12">
            {items.length > 0 ? (
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((place) => (
                  <PlaceCard key={place.id} place={place} />
                ))}
              </div>
            ) : (
              <div className="py-24 text-center rounded-[2px] bg-white/70 p-12 border border-slate-100">
                <p className="text-lg text-slate-500 font-light">
                  {params.search
                    ? `Không tìm thấy trải nghiệm nào phù hợp với từ khóa "${params.search}".`
                    : "Chưa có trải nghiệm nào phù hợp với danh mục này."}
                </p>
                <div className="mt-6">
                  <Link
                    href="/experiences"
                    className="inline-block bg-[#0098a2] hover:bg-[#087c86] text-white px-6 py-2.5 text-xs font-semibold uppercase tracking-wider rounded-[2px]"
                  >
                    Xem Tất Cả Trải Nghiệm
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* CALL TO ACTION SECTION (Matching template Looking for an experience?) */}
          <section className="mt-24 w-full bg-white/85 backdrop-blur-md py-16 text-center rounded-[2px] border border-white/60 shadow-sm">
            <div className="mx-auto max-w-3xl px-6">
              <h2 className="script-title text-4xl sm:text-5xl text-[#1e293b]">
                Looking for an experience?
              </h2>
              <p className="mt-3 text-sm md:text-base text-[#4b5563] font-light max-w-xl mx-auto leading-relaxed">
                Đội ngũ chuyên viên Star Travels sẵn sàng tư vấn thiết kế tour riêng biệt và lịch trình độc bản theo mong muốn của bạn.
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/tours"
                  className="bg-[#0098a2] hover:bg-[#087c86] text-white px-8 py-3 text-xs md:text-sm font-semibold tracking-widest uppercase transition rounded-[2px] shadow-sm"
                >
                  Xem Tour Trọn Gói
                </Link>
                <Link
                  href="/contact"
                  className="bg-white hover:bg-slate-50 text-[#1e293b] border border-slate-300 px-8 py-3 text-xs md:text-sm font-semibold tracking-widest uppercase transition rounded-[2px] shadow-sm"
                >
                  Yêu Cầu Tư Vấn Riêng
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
