import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { cookies } from "next/headers";
import { ShieldCheck, HeartHandshake, Compass, Award, CheckCircle, ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/layout/site-header";
import { Breadcrumb } from "@/components/shared/breadcrumb";
import { VIETNAM_IMAGES } from "@/lib/assets";
import { DICTIONARY } from "@/lib/i18n/dictionary";
import type { Locale } from "@/lib/i18n/types";

export const metadata: Metadata = {
  title: "Về Chúng Tôi | Star Travels Vietnam",
  description: "Sứ mệnh kết nối du khách với những giá trị du lịch nguyên bản, độc bản và bền vững tại Việt Nam.",
};

const PILLAR_ICONS = [ShieldCheck, HeartHandshake, Compass];

const AWARD_IMAGES = [
  "https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1512100356356-de1b84283e18?auto=format&fit=crop&w=400&q=80",
];

export default async function AboutPage() {
  const cookieStore = await cookies();
  const isEn = cookieStore.get("star_travels_locale")?.value === "en";
  const locale: Locale = isEn ? "en" : "vi";
  const dict = DICTIONARY[locale];
  const ab = dict.aboutPage;

  return (
    <>
      <SiteHeader overlay={false} />

      <main className="template-page-bg min-h-screen text-[#282828]">
        {/* HEADER & INTRO */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-8 sm:pt-12 md:px-12 lg:px-16">
          {/* Breadcrumb Navigation */}
          <div className="mb-6 sm:mb-8">
            <Breadcrumb
              items={[
                { label: isEn ? "Home" : "Trang Chủ", href: "/" },
                { label: isEn ? "About Us" : "Về Chúng Tôi" },
              ]}
            />
          </div>

          {/* Page Title Card */}
          <div className="rounded-[2px] bg-white/85 backdrop-blur-md p-6 sm:p-8 md:p-10 shadow-[0_4px_24px_rgba(0,152,162,0.06)] border border-white/90 mb-8 sm:mb-12">
            <span className="inline-block px-3 py-1 rounded-[2px] bg-[#0098a2]/15 text-[#007a82] border border-[#0098a2]/25 text-[11px] font-bold uppercase tracking-[0.2em] mb-2">
              {isEn ? "About Us" : "Về Chúng Tôi"}
            </span>
            <h1 className="script-title mt-1 text-4xl sm:text-5xl md:text-6xl text-[#0f172a] leading-tight">
              {isEn ? "About Star Travels Vietnam" : ab.heroTitle}
            </h1>
            <p className="mt-2 text-sm sm:text-base md:text-[17px] text-slate-800 font-medium max-w-3xl leading-relaxed">
              {isEn
                ? "Connecting discerning travellers with authentic culture and living heritage across Vietnam."
                : ab.heroSubtitle}
            </p>
          </div>
        </div>

        {/* SECTION 1: THE STORY */}
        <section className="relative w-full px-4 sm:px-6 pb-10 sm:pb-16 md:pb-20 md:px-12 lg:px-16">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-8 sm:gap-12 lg:grid-cols-2 lg:gap-16 items-center">
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.25em] text-slate-900">
                  {ab.storyBadge}
                </span>
                <h2 className="script-title mt-2 text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#1e293b] leading-tight">
                  {ab.storyHeading}
                </h2>
                <div className="mt-5 sm:mt-8 space-y-4 sm:space-y-5 text-sm sm:text-base md:text-lg font-light leading-relaxed text-[#4b5563]">
                  <p>{ab.storyP1}</p>
                  <p>{ab.storyP2}</p>
                  <p>{ab.storyP3}</p>
                </div>

                <div className="mt-6 sm:mt-8 flex flex-wrap gap-3 sm:gap-4 pt-4 border-t border-slate-200">
                  <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-700">
                    <CheckCircle className="size-4 text-emerald-700" />
                    <span>{ab.storyCheck1}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-700">
                    <CheckCircle className="size-4 text-emerald-700" />
                    <span>{ab.storyCheck2}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-700">
                    <CheckCircle className="size-4 text-emerald-700" />
                    <span>{isEn ? "Living Heritage Preservation" : "Bảo tồn văn hóa bản địa"}</span>
                  </div>
                </div>
              </div>

              {/* Story Visual with Frosted Glass Badge */}
              <div className="relative h-[280px] sm:h-[420px] md:h-[520px] w-full overflow-hidden rounded-[2px] shadow-xl">
                <Image
                  src={VIETNAM_IMAGES.cruise}
                  alt={isEn ? "Ha Long Bay Luxury Cruise" : "Du thuyền Vịnh Hạ Long"}
                  fill
                  unoptimized
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 bg-white/90 backdrop-blur-md p-4 sm:p-6 rounded-[2px] border border-white/60">
                  <p className="text-[10px] sm:text-xs uppercase tracking-[0.2em] font-bold text-slate-900">
                    {isEn ? "Core Mission" : "Giá trị cốt lõi"}
                  </p>
                  <h3 className="display-title mt-1 text-lg sm:text-2xl font-bold text-[#1e293b]">
                    {isEn
                      ? "Deeper discovery. Timeless Vietnamese identity."
                      : "Khám phá sâu sắc hơn. Gìn giữ bản sắc Việt Nam."}
                  </h3>
                  <p className="mt-1.5 sm:mt-2 text-[11px] sm:text-xs md:text-sm text-slate-600 font-light">
                    {isEn
                      ? "Every journey directly supports local environmental conservation funds and regional community livelihoods."
                      : "Mỗi hành trình đều đóng góp trực tiếp vào quỹ bảo tồn môi trường sinh thái và hỗ trợ sinh kế cho cộng đồng địa phương."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: 3 CORE PILLARS */}
        <section className="w-full bg-white/60 py-12 sm:py-20 md:py-28 border-y border-slate-200/60">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-12 lg:px-16">
            <div className="text-center">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-slate-900">
                {ab.pillarsBadge}
              </span>
              <h2 className="script-title mt-2 text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#1e293b]">
                {ab.pillarsHeading}
              </h2>
              <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm md:text-base text-[#4b5563] font-light max-w-xl mx-auto">
                {isEn
                  ? "Three foundational pillars shaping our hospitality standards and brand trust across Vietnam."
                  : "Ba trụ cột định vị phong cách phục vụ và uy tín thương hiệu của Star Travels trên toàn quốc."}
              </p>
            </div>

            <div className="mt-8 sm:mt-14 grid gap-6 sm:gap-8 md:grid-cols-3">
              {ab.pillars.map((item, idx) => {
                const Icon = PILLAR_ICONS[idx] || ShieldCheck;
                return (
                  <div
                    key={item.title}
                    className="bg-white/85 p-5 sm:p-8 md:p-10 text-center backdrop-blur-md shadow-sm border border-white/70 transition-all hover:bg-white min-h-[220px] sm:min-h-[300px] flex flex-col items-center justify-start rounded-[2px]"
                  >
                    <div className="flex size-12 sm:size-14 items-center justify-center rounded-full bg-slate-100 text-slate-800">
                      <Icon className="size-6 sm:size-7 stroke-[1.75]" />
                    </div>
                    <h3 className="display-title mt-4 sm:mt-6 text-base sm:text-xl font-bold tracking-wider text-[#1e293b] uppercase">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-xs font-semibold text-slate-800 tracking-wide">
                      {item.subtitle}
                    </p>
                    <p className="mt-3 sm:mt-4 text-xs md:text-sm font-light leading-relaxed text-[#555]">
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* SECTION 4: AWARDS & HONORS */}
        <section className="w-full px-4 sm:px-6 py-12 sm:py-20 md:px-12 lg:px-16">
          <div className="mx-auto max-w-7xl">
            <div className="text-center">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-slate-900">
                {ab.awardsBadge}
              </span>
              <h2 className="script-title mt-2 text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#1e293b]">
                {ab.awardsHeading}
              </h2>
              <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm md:text-base text-[#4b5563] font-light max-w-xl mx-auto">
                {ab.awardsSubheading}
              </p>
            </div>

            <div className="mt-8 sm:mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {ab.awards.map((award, idx) => (
                <div
                  key={idx}
                  className="group bg-white/90 p-4 sm:p-5 rounded-[2px] shadow-sm border border-slate-100 transition hover:shadow-md hover:-translate-y-1"
                >
                  <div className="relative h-40 sm:h-48 w-full overflow-hidden rounded-[2px] bg-slate-200">
                    <Image
                      src={AWARD_IMAGES[idx] || AWARD_IMAGES[0]}
                      alt={award.title}
                      fill
                      unoptimized
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 bg-[#1e293b]/80 backdrop-blur-sm px-2.5 sm:px-3 py-1 text-[10px] sm:text-[11px] font-semibold tracking-wider text-white uppercase rounded-[2px]">
                      {award.category}
                    </div>
                  </div>
                  <div className="mt-3.5 sm:mt-4">
                    <h3 className="display-title text-lg sm:text-xl font-bold text-[#1e293b] group-hover:text-amber-700 transition-colors">
                      {award.title}
                    </h3>
                    <p className="mt-1.5 sm:mt-2 text-xs md:text-sm text-[#64748b] font-light leading-relaxed">
                      {award.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 5: CALL TO ACTION BANNER */}
        <section className="w-full bg-white/80 backdrop-blur-md py-10 sm:py-16 md:py-20 text-center border-t border-slate-200">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <h2 className="script-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#1e293b]">
              {ab.ctaHeading}
            </h2>
            <p className="mt-3 sm:mt-4 text-xs sm:text-sm md:text-base text-[#4b5563] font-light max-w-xl mx-auto leading-relaxed">
              {ab.ctaDesc}
            </p>
            <div className="mt-6 sm:mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              <Link
                href="/tours"
                className="border border-slate-700/70 bg-white text-[#1e293b] px-6 sm:px-8 py-2.5 sm:py-3 text-xs md:text-sm font-bold tracking-[0.18em] sm:tracking-[0.2em] uppercase rounded-[2px] template-shadow-text shadow-sm transition-all duration-200 hover:border-black hover:text-black hover:bg-slate-50 hover:shadow-[0px_8px_25px_rgba(0,0,0,0.15)] hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2 cursor-pointer"
              >
                <span>{ab.ctaExploreBtn}</span>
                <ArrowRight className="size-4" />
              </Link>
              <Link
                href="/contact"
                className="bg-white text-[#1e293b] border border-slate-300 px-6 sm:px-8 py-2.5 sm:py-3 text-xs md:text-sm font-semibold tracking-widest uppercase rounded-[2px] shadow-sm transition-all duration-200 hover:bg-white hover:border-slate-400 hover:shadow-[0px_6px_20px_rgba(0,0,0,0.10)] hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                {ab.ctaContactBtn}
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
