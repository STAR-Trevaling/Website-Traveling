import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import {
  Clock,
  MapPin,
  Star,
  CheckCircle2,
  XCircle,
  Bus,
  Hotel,
  ShieldCheck,
  PhoneCall,
} from "lucide-react";
import { SiteHeader } from "@/components/layout/site-header";
import { getTourBySlug, VIETNAM_TOURS } from "@/lib/tours-data";
import { TourBookingCard } from "@/components/tours";
import { DICTIONARY } from "@/lib/i18n/dictionary";
import type { Locale } from "@/lib/i18n/types";

interface TourDetailPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return VIETNAM_TOURS.map((tour) => ({
    slug: tour.slug,
  }));
}

export async function generateMetadata({ params }: TourDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tour = getTourBySlug(slug);

  if (!tour) {
    return {
      title: "Không tìm thấy tour | Star Travels Vietnam",
    };
  }

  return {
    title: `${tour.title} | Star Travels Vietnam`,
    description: tour.overview.slice(0, 160),
    openGraph: {
      title: tour.title,
      description: tour.overview.slice(0, 160),
      images: [{ url: tour.image }],
    },
  };
}

export default async function TourDetailPage({ params }: TourDetailPageProps) {
  const cookieStore = await cookies();
  const isEn = cookieStore.get("star_travels_locale")?.value === "en";
  const locale: Locale = isEn ? "en" : "vi";
  const dict = DICTIONARY[locale];
  const td = dict.tourDetailPage;

  const { slug } = await params;
  const tour = getTourBySlug(slug);

  if (!tour) {
    notFound();
  }

  const displayTitle = isEn && tour.title_en ? tour.title_en : tour.title;
  const displayOverview = isEn && tour.overview_en ? tour.overview_en : tour.overview;
  const displayDuration = isEn && tour.duration_en ? tour.duration_en : tour.duration;
  const displayDeparture = isEn && tour.departure_en ? tour.departure_en : tour.departure;
  const displayDestination = isEn && tour.destination_en ? tour.destination_en : tour.destination;

  const relatedTours = VIETNAM_TOURS.filter((t) => t.id !== tour.id).slice(0, 3);

  return (
    <>
      {/* 1. HERO HEADER WITH TEMPLATE VIBE */}
      <section className="relative min-h-[480px] sm:min-h-[560px] md:min-h-[680px] w-full overflow-hidden text-white flex items-end">
        <Image
          src={tour.image}
          alt={displayTitle}
          fill
          priority
          unoptimized
          className="object-cover animate-ken-burns"
        />
        {/* Deep contrast gradient overlay so text is never washed out by background */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/65 to-black/45" />
        <SiteHeader overlay />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 pb-10 sm:pb-16 md:px-12 pt-24 sm:pt-32">
          <div className="max-w-4xl bg-black/40 backdrop-blur-[3px] p-4 sm:p-7 md:p-9 rounded-[2px] border border-white/20 shadow-2xl animate-fade-in-up">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <span className="rounded-[2px] bg-[#0098a2] px-3 py-1 sm:px-3.5 sm:py-1.5 text-[11px] sm:text-xs md:text-sm font-bold uppercase tracking-wider text-white shadow-md">
                {displayDuration}
              </span>
              <span className="flex items-center gap-1.5 rounded-[2px] bg-black/60 px-3 py-1 sm:px-3.5 sm:py-1.5 text-[11px] sm:text-xs md:text-sm font-semibold text-white backdrop-blur-md border border-white/20 shadow-sm">
                <MapPin className="size-3.5 sm:size-4 text-white" />
                {displayDestination}
              </span>
              <span className="flex items-center gap-1.5 rounded-[2px] bg-amber-500/90 px-2.5 py-1 sm:px-3 sm:py-1.5 text-[11px] sm:text-xs md:text-sm font-bold text-white backdrop-blur-md shadow-sm">
                <Star className="size-3.5 sm:size-4 fill-white text-white" />
                {tour.rating.toFixed(1)} ({tour.reviewCount} {td.reviewsText})
              </span>
            </div>

            <h1 className="display-title mt-3 sm:mt-5 text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-tight text-white drop-shadow-[0_2px_14px_rgba(0,0,0,0.95)]">
              {displayTitle}
            </h1>

            <p className="mt-2.5 sm:mt-4 max-w-3xl text-xs sm:text-base md:text-lg lg:text-xl font-normal leading-relaxed text-white/95 drop-shadow-[0_1px_8px_rgba(0,0,0,0.9)]">
              {displayOverview}
            </p>
          </div>
        </div>
      </section>

      {/* 2. SPECIFICATION BAR */}
      <section className="border-b border-slate-200 bg-white py-4 shadow-sm">
        <div className="mx-auto grid grid-cols-2 sm:grid-cols-3 md:flex md:flex-wrap items-center justify-between gap-4 sm:gap-6 px-4 sm:px-6 md:px-12 text-xs md:text-sm">
          <div className="flex items-center gap-3 text-slate-700">
            <Clock className="size-5 text-slate-700" />
            <div>
              <p className="text-[11px] text-slate-400 font-light">{td.durationLabel}</p>
              <p className="font-semibold">{displayDuration}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-slate-700">
            <MapPin className="size-5 text-slate-700" />
            <div>
              <p className="text-[11px] text-slate-400 font-light">{td.departureLabel}</p>
              <p className="font-semibold">{displayDeparture}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-slate-700">
            <Bus className="size-5 text-slate-700" />
            <div>
              <p className="text-[11px] text-slate-400 font-light">
                {isEn ? "Transportation" : "Phương tiện"}
              </p>
              <p className="font-semibold">
                {isEn ? "VIP Limousine / Fast Transit" : tour.transport}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-slate-700">
            <Hotel className="size-5 text-slate-700" />
            <div>
              <p className="text-[11px] text-slate-400 font-light">
                {isEn ? "Accommodation" : "Khách sạn / Lưu trú"}
              </p>
              <p className="font-semibold">
                {isEn ? "4-5 Star Boutique Stay" : tour.hotel}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-slate-700 col-span-2 sm:col-span-1">
            <ShieldCheck className="size-5 text-slate-700" />
            <div>
              <p className="text-[11px] text-slate-400 font-light">
                {isEn ? "Insurance" : "Bảo hiểm"}
              </p>
              <p className="font-semibold">
                {isEn ? "Full Comprehensive Coverage" : "Bảo hiểm trọn gói"}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. MAIN CONTENT & BOOKING SIDEBAR */}
      <main className="template-page-bg min-h-screen px-4 sm:px-6 py-10 sm:py-16 md:px-12">
        <div className="mx-auto grid max-w-7xl gap-8 sm:gap-12 lg:grid-cols-[1fr_380px]">
          {/* LEFT: Detailed Info */}
          <div className="space-y-8 sm:space-y-12">
            {/* Highlights */}
            <div className="rounded-[2px] bg-white p-5 sm:p-8 shadow-sm border border-slate-100">
              <h2 className="script-title text-2xl sm:text-3xl md:text-4xl text-[#1e293b]">
                {td.highlightsTitle}
              </h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {tour.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="size-5 shrink-0 text-slate-800 mt-0.5" />
                    <span className="text-sm font-light leading-relaxed text-slate-700">
                      {h}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Photo Gallery if available */}
            {tour.gallery && tour.gallery.length > 1 && (
              <div className="rounded-[2px] bg-white p-5 sm:p-8 shadow-sm border border-slate-100">
                <h2 className="script-title text-2xl sm:text-3xl md:text-4xl text-[#1e293b] mb-4 sm:mb-6">
                  {isEn ? "Tour Experience Gallery" : "Hình Ảnh Trải Nghiệm"}
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
                  {tour.gallery.map((img, idx) => (
                    <div
                      key={idx}
                      className="group relative aspect-[4/3] overflow-hidden rounded-[2px] bg-slate-100 shadow-sm"
                    >
                      <Image
                        src={img}
                        alt={`${displayTitle} ${idx + 1}`}
                        fill
                        unoptimized
                        className="object-cover transition duration-300 group-hover:scale-105"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Day-by-Day Itinerary */}
            <div className="rounded-[2px] bg-white p-5 sm:p-8 shadow-sm border border-slate-100">
              <h2 className="script-title text-2xl sm:text-3xl md:text-4xl text-[#1e293b]">
                {td.itineraryTitle}
              </h2>
              <p className="mt-2 text-xs md:text-sm text-slate-500 font-light">
                {isEn
                  ? "Carefully designed by local travel concierges, ensuring a seamless balance between discovery and relaxation."
                  : "Hành trình được thiết kế chuẩn mực bởi chuyên gia du lịch địa phương, đảm bảo cân bằng giữa trải nghiệm và nghỉ dưỡng."}
              </p>

              <div className="mt-6 sm:mt-8 space-y-4 sm:space-y-6">
                {tour.itinerary.map((day) => (
                  <div
                    key={day.day}
                    className="relative border-l-2 border-[#0098a2]/30 pl-5 sm:pl-6 pb-5 sm:pb-6 last:pb-0"
                  >
                    {/* Day Marker */}
                    <div className="absolute -left-[11px] top-0 flex size-5 items-center justify-center rounded-full bg-[#0098a2] text-[10px] font-bold text-white shadow-sm">
                      {day.day}
                    </div>

                    <h3 className="display-title text-base sm:text-lg md:text-xl font-bold text-[#1e293b]">
                      {td.dayLabel} {day.day}: {day.title}
                    </h3>

                    <div className="mt-3 sm:mt-4 space-y-2.5 sm:space-y-3 text-xs md:text-sm text-slate-600 font-light leading-relaxed">
                      <div className="rounded-[2px] bg-slate-50 p-3 sm:p-3.5 border border-slate-100">
                        <span className="font-bold text-slate-900 block mb-1">
                          {td.morning}:
                        </span>
                        {day.morning}
                      </div>

                      <div className="rounded-[2px] bg-slate-50 p-3 sm:p-3.5 border border-slate-100">
                        <span className="font-bold text-slate-900 block mb-1">
                          {td.afternoon}:
                        </span>
                        {day.afternoon}
                      </div>

                      <div className="rounded-[2px] bg-slate-50 p-3 sm:p-3.5 border border-slate-100">
                        <span className="font-bold text-slate-900 block mb-1">
                          {td.evening}:
                        </span>
                        {day.evening}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Inclusions & Exclusions */}
            <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
              {/* Inclusions */}
              <div className="rounded-[2px] bg-white p-5 sm:p-7 shadow-sm border border-slate-100">
                <h3 className="display-title text-base sm:text-lg font-bold text-emerald-800 flex items-center gap-2 mb-3 sm:mb-4">
                  <CheckCircle2 className="size-4 sm:size-5 text-emerald-600" />
                  {td.inclusionsTitle}
                </h3>
                <ul className="space-y-2 sm:space-y-2.5 text-xs md:text-sm font-light text-slate-600">
                  {tour.inclusions.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-emerald-500 font-bold">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Exclusions */}
              <div className="rounded-[2px] bg-white p-5 sm:p-7 shadow-sm border border-slate-100">
                <h3 className="display-title text-base sm:text-lg font-bold text-rose-800 flex items-center gap-2 mb-3 sm:mb-4">
                  <XCircle className="size-4 sm:size-5 text-rose-600" />
                  {td.exclusionsTitle}
                </h3>
                <ul className="space-y-2 sm:space-y-2.5 text-xs md:text-sm font-light text-slate-600">
                  {tour.exclusions.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-rose-500 font-bold">✕</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* RIGHT: Booking Sidebar */}
          <aside className="space-y-6">
            <TourBookingCard tour={tour} />

            {/* Direct Support Card */}
            <div className="rounded-[2px] bg-[#1e293b] p-5 sm:p-6 text-white shadow-md">
              <h4 className="display-title text-base sm:text-lg font-bold text-white">
                {isEn ? "Need a Bespoke Itinerary?" : "Cần Tư Vấn Lịch Trình Riêng?"}
              </h4>
              <p className="mt-2 text-xs font-light text-slate-300 leading-relaxed">
                {isEn
                  ? "Our travel specialists are ready to tailor journeys for your family, private group, or corporate retreat."
                  : "Đội ngũ chuyên viên Star Travels sẵn sàng hỗ trợ thiết kế tour theo yêu cầu riêng cho gia đình hoặc đoàn thể."}
              </p>
              <div className="mt-5 flex items-center gap-3 pt-4 border-t border-slate-700">
                <div className="flex size-10 items-center justify-center rounded-full bg-[#0098a2] text-white">
                  <PhoneCall className="size-4" />
                </div>
                <div>
                  <span className="text-[11px] text-slate-400 block">{td.hotlineAssist}</span>
                  <a href="tel:0912345678" className="text-sm font-bold text-amber-400 hover:underline">
                    +84 912 345 678
                  </a>
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* RELATED TOURS */}
        <section className="mx-auto max-w-7xl mt-24">
          <div className="text-center mb-10">
            <h2 className="script-title text-4xl md:text-5xl text-[#1e293b]">
              {td.relatedToursTitle}
            </h2>
            <p className="mt-2 text-sm text-[#64748b] font-light">
              {isEn
                ? "Explore more handcrafted heritage routes across beautiful Vietnam"
                : "Khám phá thêm những cung đường di sản tuyệt đẹp khác tại Việt Nam"}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {relatedTours.map((rTour) => {
              const rTitle = isEn && rTour.title_en ? rTour.title_en : rTour.title;
              const rDuration = isEn && rTour.duration_en ? rTour.duration_en : rTour.duration;
              const rDestination =
                isEn && rTour.destination_en ? rTour.destination_en : rTour.destination;

              return (
                <Link
                  key={rTour.id}
                  href={`/tours/${rTour.slug}`}
                  className="group travel-card-lift flex flex-col overflow-hidden rounded-[2px] bg-white border border-slate-100"
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                    <Image
                      src={rTour.image}
                      alt={rTitle}
                      fill
                      unoptimized
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                    />
                    <div className="absolute top-3 left-3 bg-[#1e293b]/85 text-white text-[11px] font-medium px-2.5 py-1 rounded-[2px] backdrop-blur-md uppercase tracking-wider shadow-sm">
                      {rDuration}
                    </div>
                  </div>

                  <div className="p-6 flex flex-col justify-between flex-1">
                    <div>
                      <span className="text-[11px] font-bold text-slate-900 uppercase tracking-wider block">
                        {rDestination}
                      </span>
                      <h3 className="display-title mt-2 text-lg font-bold text-[#1e293b] group-hover:text-[#0098a2] transition-colors line-clamp-2">
                        {rTitle}
                      </h3>
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                      <div>
                        <span className="text-xs text-slate-400 block font-light">
                          {isEn ? "All-inclusive" : "Giá trọn gói"}
                        </span>
                        <span className="text-lg font-black text-slate-900">
                          {isEn
                            ? `${rTour.price.toLocaleString("en-US")} VND`
                            : `${rTour.price.toLocaleString("vi-VN")}đ`}
                        </span>
                      </div>
                      <span className="text-xs font-semibold text-slate-800 group-hover:text-[#0098a2] transition-colors uppercase tracking-wider">
                        {isEn ? "View tour" : "Xem tour"} →
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      </main>
    </>
  );
}
