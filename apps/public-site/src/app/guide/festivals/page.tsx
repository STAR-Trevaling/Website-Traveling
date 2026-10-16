import type { Metadata } from "next";
import { cookies } from "next/headers";
import Link from "next/link";
import {
  Calendar,
  Sparkles,
  MapPin,
  Clock,
  AlertTriangle,
  ArrowRight,
  Flame,
  CheckCircle2,
  Users,
} from "lucide-react";
import { SiteHeader } from "@/components/layout/site-header";
import { Breadcrumb } from "@/components/shared/breadcrumb";
import { FESTIVAL_CALENDAR } from "@/data/seed/guide";
import { VIETNAM_IMAGES } from "@/lib/assets";

export const metadata: Metadata = {
  title: "Lịch Lễ Hội & Sự Kiện Theo Mùa Việt Nam: 12 Tháng & Kinh Nghiệm | STAR Travels",
  description:
    "Lịch 12 tháng lễ hội truyền thống và sự kiện văn hóa Việt Nam: Tết Nguyên Đán, Lễ hội pháo hoa Đà Nẵng DIFF, Festival Huế, Trung Thu Hội An, Mùa vàng Sa Pa và Tam giác mạch Hà Giang.",
  keywords: [
    "lễ hội việt nam theo tháng",
    "lịch lễ hội truyền thống việt nam",
    "lễ hội pháo hoa đà nẵng 2026",
    "lễ hội chùa hương",
    "mùa lúa chín sa pa tháng mấy",
    "vietnam festival calendar",
    "cultural events in vietnam by month",
  ],
  openGraph: {
    title: "Lịch Lễ Hội & Sự Kiện Theo Mùa Việt Nam: 12 Tháng & Kinh Nghiệm | STAR Travels",
    description:
      "Khám phá 12 tháng lễ hội văn hóa Việt Nam, đánh giá mật độ đông đúc và kinh nghiệm tham gia thực tế.",
    images: [{ url: VIETNAM_IMAGES.hoiAn, width: 1200, height: 630, alt: "Lễ Hội Việt Nam" }],
  },
};

const MONTH_LABELS_VI = [
  "Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6",
  "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"
];

const MONTH_LABELS_EN = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export default async function FestivalsGuidePage() {
  const cookieStore = await cookies();
  const isEn = cookieStore.get("star_travels_locale")?.value === "en";

  const breadcrumbs = [
    { label: isEn ? "Home" : "Trang Chủ", href: "/" },
    { label: isEn ? "Travel Info Hub" : "Thông Tin Cần Biết", href: "/guide" },
    { label: isEn ? "Festivals & Events" : "Lễ Hội & Sự Kiện" },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: isEn
      ? "Vietnam 12-Month Festival & Cultural Event Calendar"
      : "Lịch 12 Tháng Lễ Hội & Sự Kiện Văn Hóa Truyền Thống Việt Nam",
    description: isEn
      ? "Comprehensive calendar of Lunar and Solar festivals across Vietnam with crowd ratings and insider travel tips."
      : "Lịch chi tiết các lễ hội âm lịch và dương lịch tại Việt Nam, đánh giá đông đúc và lưu ý thực tế.",
    image: VIETNAM_IMAGES.hoiAn,
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
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[2px] bg-pink-50 text-pink-900 border border-pink-200 text-xs font-bold uppercase tracking-wider mb-3">
              <Sparkles className="size-3.5 text-pink-600" />
              <span>{isEn ? "12-MONTH CULTURAL CALENDAR" : "LỊCH LỄ HỘI 12 THÁNG"}</span>
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 leading-tight">
              {isEn
                ? "Celebrate Vietnam's Living Traditions & Spectacles"
                : "Hòa Mình Vào Nhịp Sống Lễ Hội Rực Rỡ Sắc Màu"}
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
              {isEn
                ? "Vietnam's cultural calendar blends ancient Lunar traditions with modern international spectacles. Whether you seek vibrant crowd energy or tranquil contemplative ceremonies, here is your month-by-month guide."
                : "Từ những ngày Tết đoàn viên thiêng liêng đến đêm rằm lung linh hoa đăng tại Hội An, hay các sự kiện hiện đại như Lễ hội Pháo hoa Quốc tế Đà Nẵng, lịch lễ hội Việt Nam quanh năm luôn đong đầy sức sống."}
            </p>
          </section>

          {/* Timeline / Calendar of Festivals */}
          <section className="mb-16">
            <div className="space-y-8">
              {FESTIVAL_CALENDAR.map((item, idx) => {
                const monthName = isEn ? MONTH_LABELS_EN[item.solarMonth - 1] : MONTH_LABELS_VI[item.solarMonth - 1];
                const crowdBadge =
                  item.crowdLevel === "high"
                    ? isEn ? "High Crowds" : "Rất Đông Đúc"
                    : item.crowdLevel === "medium"
                    ? isEn ? "Moderate Crowds" : "Đông Vừa Phải"
                    : isEn ? "Pleasant & Calm" : "Thong Thả";

                const crowdColor =
                  item.crowdLevel === "high"
                    ? "bg-rose-100 text-rose-900 border-rose-200"
                    : "bg-amber-100 text-amber-900 border-amber-200";

                return (
                  <div
                    key={item.id}
                    id={`event-${item.id}`}
                    className="relative rounded-[2px] bg-white border border-slate-200 shadow-sm p-6 sm:p-8 hover:shadow-md transition-shadow"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                      {/* Left: Timing Pill & Name */}
                      <div className="flex-1 space-y-3">
                        <div className="flex flex-wrap items-center gap-2 text-xs">
                          <span className="px-3 py-1 rounded-[2px] bg-[#da251d] text-white font-bold uppercase tracking-wider text-[11px]">
                            📅 {monthName} ({isEn ? item.solarTimingDescriptionEn : item.solarTimingDescription})
                          </span>
                          {item.lunarDate && (
                            <span className="px-2.5 py-1 rounded-[2px] bg-slate-100 text-slate-700 font-medium text-[11px]">
                              🌙 {item.lunarDate}
                            </span>
                          )}
                          <span className={`px-2.5 py-1 rounded-[2px] text-[11px] font-bold border ${crowdColor}`}>
                            <Users className="size-3 inline-block mr-1" />
                            {crowdBadge}
                          </span>
                        </div>

                        <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-900">
                          {isEn ? item.nameEn : item.name}
                        </h3>

                        <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                          <MapPin className="size-4 text-[#da251d] shrink-0" />
                          <span>{isEn ? item.locationDetailEn : item.locationDetail}</span>
                        </div>

                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-1">
                          {isEn ? item.culturalSignificanceEn : item.culturalSignificance}
                        </p>
                      </div>

                      {/* Right: Practical Tips & Destination Link */}
                      <div className="lg:w-80 shrink-0 rounded-[2px] bg-slate-50 border border-slate-100 p-4 sm:p-5 flex flex-col justify-between">
                        <div>
                          <p className="font-bold text-slate-800 text-xs uppercase tracking-wider mb-2 flex items-center gap-1.5">
                            <Sparkles className="size-3.5 text-[#eab308]" />
                            <span>{isEn ? "Practical Insider Tips:" : "Kinh nghiệm thực tế:"}</span>
                          </p>
                          <ul className="space-y-1.5 text-[11px] text-slate-600">
                            {(isEn ? item.practicalTipsEn : item.practicalTips).map((tip, i) => (
                              <li key={i} className="flex items-start gap-1.5 leading-relaxed">
                                <span className="text-[#da251d] font-bold">•</span>
                                <span>{tip}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {item.destinationSlug && (
                          <div className="mt-4 pt-3 border-t border-slate-200/80">
                            <Link
                              href={`/destinations/${item.destinationSlug}`}
                              className="inline-flex items-center gap-1 text-xs font-bold text-[#da251d] hover:underline"
                            >
                              <span>
                                {isEn ? `Visit ${item.destinationNameEn}` : `Khám phá ${item.destinationName}`}
                              </span>
                              <ArrowRight className="size-3" />
                            </Link>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
