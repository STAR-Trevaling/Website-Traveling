import type { Metadata } from "next";
import { cookies } from "next/headers";
import Link from "next/link";
import {
  Plane,
  Train,
  Car,
  Bus,
  MapPin,
  Clock,
  DollarSign,
  ArrowRight,
  Compass,
  CheckCircle2,
  AlertCircle,
  Smartphone,
} from "lucide-react";
import { SiteHeader } from "@/components/layout/site-header";
import { Breadcrumb } from "@/components/shared/breadcrumb";
import {
  TRANSPORT_MODES,
  DESTINATIONS_TRANSPORT_DATA,
} from "@/data/seed/guide";
import { VIETNAM_IMAGES } from "@/lib/assets";

export const metadata: Metadata = {
  title: "Di Chuyển Nội Địa Việt Nam: Hướng Dẫn Máy Bay, Tàu Hoả, Limousine & Sân Bay | STAR Travels",
  description:
    "Cẩm nang phương tiện giao thông tại Việt Nam: so sánh máy bay, tàu hỏa Bắc - Nam, xe limousine VIP, xe cabin giường nằm và hướng dẫn chi tiết từ sân bay vào trung tâm 12 danh thắng.",
  keywords: [
    "di chuyển nội địa việt nam",
    "tàu hỏa bắc nam việt nam",
    "xe limousine từ hà nội đi hạ long",
    "taxi sân bay đà nẵng đi hội an",
    "xe buýt sân bay liên khương đà lạt",
    "domestic flights vietnam",
    "vietnam trains and buses guide",
  ],
  openGraph: {
    title: "Di Chuyển Nội Địa Việt Nam: Hướng Dẫn Máy Bay, Tàu Hoả, Limousine & Sân Bay | STAR Travels",
    description:
      "So sánh chi phí và thời gian máy bay, tàu hỏa SE, xe limousine, cùng hướng dẫn step-by-step từ sân bay vào trung tâm 12 điểm đến.",
    images: [{ url: VIETNAM_IMAGES.hero, width: 1200, height: 630, alt: "Di chuyển du lịch Việt Nam" }],
  },
};

const MODE_ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Plane,
  Train,
  Car,
  Bus,
};

export default async function TransportGuidePage() {
  const cookieStore = await cookies();
  const isEn = cookieStore.get("star_travels_locale")?.value === "en";

  const breadcrumbs = [
    { label: isEn ? "Home" : "Trang Chủ", href: "/" },
    { label: isEn ? "Travel Info Hub" : "Thông Tin Cần Biết", href: "/guide" },
    { label: isEn ? "Domestic Transport" : "Di Chuyển Nội Địa" },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: isEn
      ? "Vietnam Domestic Transportation Guide: Flights, Trains, Limousines & Airport Transfers"
      : "Cẩm Nang Di Chuyển Nội Địa Việt Nam: Máy Bay, Tàu Hoả, Limousine và Sân Bay",
    description: isEn
      ? "Comprehensive comparison of intercity travel options and step-by-step airport transfers to 12 iconic Vietnam destinations."
      : "So sánh phương tiện di chuyển liên tỉnh và hướng dẫn từng bước từ sân bay, nhà ga vào trung tâm 12 điểm đến.",
    image: VIETNAM_IMAGES.hero,
    author: {
      "@type": "Organization",
      name: "STAR Travels Vietnam",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <SiteHeader overlay={false} />

      <main className="template-page-bg min-h-screen px-4 sm:px-6 py-8 sm:py-12 md:px-12 lg:px-16">
        <div className="mx-auto max-w-7xl">
          {/* Breadcrumb Pill */}
          <div className="mb-8">
            <Breadcrumb items={breadcrumbs} />
          </div>

          {/* Section Intro */}
          <section className="mb-12 max-w-3xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[2px] bg-amber-50 text-amber-900 border border-amber-200 text-xs font-bold uppercase tracking-wider mb-3">
              <Compass className="size-3.5 text-amber-600" />
              <span>{isEn ? "TRANSIT OPTIONS" : "PHƯƠNG TIỆN LIÊN TỈNH"}</span>
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 leading-tight">
              {isEn
                ? "How to Get Around Vietnam Smoothly & Affordably"
                : "Cách Di Chuyển Thuận Lợi & Tối Ưu Chi Phí Tại Việt Nam"}
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
              {isEn
                ? "Vietnam's modern transport network combines domestic budget aviation, the legendary North-South scenic rail corridor, expressway-linked luxury limousine vans, and private transfers."
                : "Hệ thống giao thông Việt Nam hiện nay rất phát triển với mạng lưới bay nội địa dày đặc, tuyến đường sắt Thống Nhất hoài niệm, các cung đường cao tốc mới rút ngắn thời gian và dịch vụ xe limousine đón trả tận nơi."}
            </p>
          </section>

          {/* Section 1: Comparison of 4 Transport Modes */}
          <section className="mb-16">
            <div className="flex items-center gap-2 mb-6">
              <Compass className="size-5 text-[#da251d]" />
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-900">
                {isEn ? "Comparison of 4 Core Intercity Transit Modes" : "So Sánh 4 Phương Tiện Di Chuyển Liên Tỉnh"}
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {TRANSPORT_MODES.map((mode) => {
                const Icon = MODE_ICON_MAP[mode.icon] || Plane;
                return (
                  <div
                    key={mode.id}
                    className="rounded-[2px] bg-white border border-slate-200/90 shadow-sm p-6 flex flex-col justify-between hover:shadow-md transition-shadow"
                  >
                    <div>
                      {/* Icon & Title */}
                      <div className="size-11 rounded-[2px] bg-slate-100 flex items-center justify-center text-[#da251d] mb-4">
                        <Icon className="size-6" />
                      </div>

                      <h4 className="font-serif text-lg font-bold text-slate-900 mb-2">
                        {isEn ? mode.nameEn : mode.name}
                      </h4>

                      <div className="space-y-1.5 mb-4 text-xs">
                        <div className="flex items-center gap-1.5 text-slate-700">
                          <Clock className="size-3.5 text-slate-400 shrink-0" />
                          <span className="font-medium">{isEn ? mode.speedEn : mode.speed}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-emerald-800 font-bold">
                          <DollarSign className="size-3.5 text-emerald-600 shrink-0" />
                          <span>{isEn ? mode.costRangeEn : mode.costRange}</span>
                        </div>
                      </div>

                      <div className="p-3 rounded-[2px] bg-slate-50 border border-slate-100 mb-4 text-[11px] text-slate-600">
                        <strong className="text-slate-800 block mb-0.5">
                          {isEn ? "Best for:" : "Phù hợp nhất:"}
                        </strong>
                        {isEn ? mode.bestForEn : mode.bestFor}
                      </div>

                      {/* Pros */}
                      <div className="space-y-2 mb-4 text-xs">
                        <p className="font-bold text-slate-700 uppercase tracking-wider text-[11px]">
                          {isEn ? "Pros:" : "Ưu điểm:"}
                        </p>
                        <ul className="space-y-1 text-slate-600">
                          {(isEn ? mode.prosEn : mode.pros).map((p, idx) => (
                            <li key={idx} className="flex items-start gap-1.5">
                              <CheckCircle2 className="size-3.5 text-emerald-600 shrink-0 mt-0.5" />
                              <span className="text-[11px] leading-tight">{p}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Booking tips */}
                    <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-500">
                      💡 <strong>{isEn ? "Tip:" : "Mẹo:"}</strong>{" "}
                      {(isEn ? mode.bookingTipsEn : mode.bookingTips)[0]}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Smart Travel Tip: Ride-Hailing Apps */}
            <div className="mt-8 rounded-[2px] bg-gradient-to-r from-emerald-900 to-teal-900 text-white p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-2 max-w-2xl">
                <div className="flex items-center gap-2 text-emerald-300 font-bold text-xs uppercase tracking-wider">
                  <Smartphone className="size-4" />
                  <span>{isEn ? "ESSENTIAL MOBILE APPS" : "ỨNG DỤNG CẦN CÀI ĐẶT"}</span>
                </div>
                <h4 className="font-serif text-xl sm:text-2xl font-bold text-white">
                  {isEn
                    ? "Download Grab and Xanh SM for Transparent Local Rides"
                    : "Cài Đặt Grab & Xanh SM Để Tránh Taxi Dù & Biết Trước Giá"}
                </h4>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  {isEn
                    ? "Grab (car & motorbike taxi) and Xanh SM (pure electric taxi fleet) are accepted nationwide. Link your international Visa/Mastercard to pay seamlessly without needing local currency exchange."
                    : "Grab (xe ôm & taxi) và Xanh SM (taxi điện thông minh) hoạt động phổ biến tại hầu hết các tỉnh thành. Du khách có thể liên kết thẻ quốc tế để thanh toán tự động không cần tiền mặt."}
                </p>
              </div>
            </div>
          </section>

          {/* Section 2: Step-by-Step Transport for 12 Destinations */}
          <section className="mb-16">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-serif text-xl sm:text-2xl md:text-3xl font-bold text-slate-900">
                  {isEn
                    ? "From Nearest Airport / Hub into 12 Destinations"
                    : "Hướng Dẫn Di Chuyển Từ Sân Bay / Ga Vào 12 Điểm Đến"}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  {isEn
                    ? "Step-by-step transfer vehicles, travel times, and fair price benchmarks for every destination."
                    : "Chi tiết phương tiện, thời gian di chuyển và mức giá chuẩn để du khách không bị trả giá cao."}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {DESTINATIONS_TRANSPORT_DATA.map((dest) => (
                <div
                  key={dest.destinationSlug}
                  id={`transport-${dest.destinationSlug}`}
                  className="rounded-[2px] bg-white border border-slate-200 p-6 sm:p-7 shadow-sm flex flex-col justify-between"
                >
                  <div>
                    {/* Header: Destination & Hub */}
                    <div className="flex items-start justify-between gap-3 mb-4 pb-3 border-b border-slate-100">
                      <div>
                        <div className="flex items-center gap-2">
                          <MapPin className="size-4 text-[#da251d]" />
                          <h4 className="font-serif text-lg sm:text-xl font-bold text-slate-900">
                            {isEn ? dest.destinationNameEn : dest.destinationName}
                          </h4>
                        </div>
                        <p className="text-xs text-slate-500 mt-1">
                          {isEn ? "Nearest Gateway:" : "Cửa ngõ / Ga gần nhất:"}{" "}
                          <strong className="text-slate-800">
                            {isEn ? dest.nearestHub.nameEn : dest.nearestHub.name}
                          </strong>{" "}
                          ({dest.nearestHub.distanceKm} km)
                        </p>
                      </div>
                    </div>

                    {/* Step-by-Step From Hub to Center */}
                    <div className="space-y-3 mb-6">
                      <p className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                        {isEn ? "Airport / Station to Downtown Center:" : "Từ Sân Bay / Ga Vào Trung Tâm:"}
                      </p>
                      {dest.fromHubToCenter.map((step, idx) => (
                        <div
                          key={idx}
                          className="rounded-[2px] bg-slate-50 border border-slate-100 p-3.5 text-xs space-y-1.5"
                        >
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <span className="font-bold text-slate-900">
                              {isEn ? step.methodEn : step.method}
                            </span>
                            <div className="flex items-center gap-2 text-[11px]">
                              <span className="text-slate-500">⏱ {isEn ? step.durationEn : step.duration}</span>
                              <span className="px-2 py-0.5 rounded-[2px] bg-emerald-50 text-emerald-800 font-bold border border-emerald-200">
                                {isEn ? step.estimatedCostEn : step.estimatedCost}
                              </span>
                            </div>
                          </div>
                          <p className="text-slate-600 text-[11px] leading-relaxed">
                            {isEn ? step.instructionsEn : step.instructions}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Intercity Connections */}
                    {dest.intercityConnections.length > 0 && (
                      <div className="space-y-2 mb-4">
                        <p className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                          {isEn ? "Connections to Neighboring Destinations:" : "Kết Nối Các Điểm Lân Cận:"}
                        </p>
                        {dest.intercityConnections.map((conn, idx) => (
                          <div
                            key={idx}
                            className="p-3 rounded-[2px] bg-amber-50/60 border border-amber-200/70 text-xs space-y-1 text-slate-800"
                          >
                            <div className="flex items-center justify-between font-bold">
                              <span>
                                {isEn ? dest.destinationNameEn : dest.destinationName} ⟷ {isEn ? conn.toDestinationEn : conn.toDestination}
                              </span>
                              <span className="text-amber-800 text-[11px]">
                                {isEn ? conn.travelTimeEn : conn.travelTime}
                              </span>
                            </div>
                            <div className="text-[11px] text-slate-600 flex flex-wrap gap-x-3">
                              <span>🚗 {isEn ? conn.recommendedVehicleEn : conn.recommendedVehicle}</span>
                              <span>💰 {isEn ? conn.costEstimateEn : conn.costEstimate}</span>
                            </div>
                            <p className="text-[11px] text-slate-500 italic mt-0.5">
                              {isEn ? conn.notesEn : conn.notes}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Destination Page Link */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <Link
                      href={`/destinations/${dest.destinationSlug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#da251d] hover:text-[#c92018] group"
                    >
                      <span>
                        {isEn
                          ? `Explore ${dest.destinationNameEn} Tours`
                          : `Xem tour & trải nghiệm tại ${dest.destinationName}`}
                      </span>
                      <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
