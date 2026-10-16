import type { Metadata } from "next";
import { cookies } from "next/headers";
import {
  ShieldAlert,
  PhoneCall,
  Waves,
  Mountain,
  Bike,
  ShieldCheck,
  AlertTriangle,
  HeartPulse,
  Flame,
  LifeBuoy,
  FileCheck2,
  CheckCircle2,
} from "lucide-react";
import { SiteHeader } from "@/components/layout/site-header";
import { Breadcrumb } from "@/components/shared/breadcrumb";
import {
  EMERGENCY_CONTACTS,
  ACTIVITY_SAFETY_GUIDES,
  INSURANCE_ADVISORY,
} from "@/data/seed/guide";
import { VIETNAM_IMAGES } from "@/lib/assets";

export const metadata: Metadata = {
  title: "An Toàn & Sức Khỏe Du Lịch Việt Nam: Số Khẩn Cấp 113-114-115 & Bảo Hiểm | STAR Travels",
  description:
    "Số điện thoại cấp cứu khẩn cấp 113, 114, 115, 112 tại Việt Nam. Quy tắc an toàn khi tắm biển, leo núi Fansipan, lái xe máy đường đèo và tư vấn mua bảo hiểm du lịch quốc tế.",
  keywords: [
    "số điện thoại khẩn cấp việt nam",
    "cấp cứu 115 việt nam",
    "công an 113 việt nam",
    "an toàn khi đi du lịch việt nam",
    "bảo hiểm du lịch việt nam",
    "vietnam emergency numbers",
    "vietnam travel safety tips",
  ],
  openGraph: {
    title: "An Toàn & Sức Khỏe Du Lịch Việt Nam: Số Khẩn Cấp 113-114-115 & Bảo Hiểm | STAR Travels",
    description:
      "Hotline khẩn cấp quốc gia 113, 114, 115, hướng dẫn an toàn hoạt động thể thao mạo hiểm và tư vấn bảo hiểm du lịch.",
    images: [{ url: VIETNAM_IMAGES.hero, width: 1200, height: 630, alt: "An Toàn Du Lịch Việt Nam" }],
  },
};

const ACTIVITY_ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Waves,
  Mountain,
  Bike,
};

export default async function SafetyGuidePage() {
  const cookieStore = await cookies();
  const isEn = cookieStore.get("star_travels_locale")?.value === "en";

  const breadcrumbs = [
    { label: isEn ? "Home" : "Trang Chủ", href: "/" },
    { label: isEn ? "Travel Info Hub" : "Thông Tin Cần Biết", href: "/guide" },
    { label: isEn ? "Safety & Health" : "An Toàn & Sức Khoẻ" },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: isEn
      ? "Vietnam Travel Safety & Health Guide: Emergency Numbers 113/114/115 & Activity Rules"
      : "Cẩm Nang An Toàn & Sức Khỏe Du Lịch Việt Nam: Số Khẩn Cấp 113, 114, 115 và Bảo Hiểm",
    description: isEn
      ? "Official emergency hotlines in Vietnam and safety guidelines for swimming, trekking, motorbiking, and international insurance."
      : "Hotline cứu hộ cứu nạn khẩn cấp và quy tắc an toàn các hoạt động trải nghiệm tại Việt Nam.",
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

          {/* Section 1: Prominent SOS Emergency Hotline Cards */}
          <section className="mb-14">
            <div className="rounded-[2px] bg-gradient-to-r from-red-700 via-[#da251d] to-red-800 text-white p-6 sm:p-10 shadow-lg">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                  <div className="flex items-center gap-2 text-amber-300 font-bold text-xs uppercase tracking-wider mb-2">
                    <ShieldAlert className="size-4" />
                    <span>{isEn ? "24/7 NATIONWIDE EMERGENCY SERVICES" : "ĐƯỜNG DÂY NÓNG CỨU HỘ QUỐC GIA 24/7"}</span>
                  </div>
                  <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-black text-white">
                    {isEn ? "Vietnam National Emergency Hotlines" : "Các Số Điện Thoại Khẩn Cấp Tại Việt Nam"}
                  </h2>
                  <p className="text-xs sm:text-sm text-red-100 mt-2 max-w-2xl leading-relaxed">
                    {isEn
                      ? "Direct toll-free emergency hotlines reachable from any mobile phone or landline in Vietnam without needing country code (+84)."
                      : "Các số điện thoại khẩn cấp quốc gia hoạt động 24/7, có thể gọi miễn phí từ mọi thuê bao di động hoặc điện thoại cố định tại Việt Nam không cần bấm mã vùng."}
                  </p>
                </div>
              </div>

              {/* Emergency Contacts Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {EMERGENCY_CONTACTS.map((contact) => (
                  <div
                    key={contact.number}
                    className="rounded-[2px] bg-white/10 backdrop-blur-md border border-white/20 p-5 flex flex-col justify-between hover:bg-white/15 transition"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-[2px] bg-white/20 text-white">
                          {contact.badge}
                        </span>
                        <PhoneCall className="size-4 text-amber-300" />
                      </div>
                      <p className="font-mono text-3xl sm:text-4xl font-black tracking-tight text-white my-2">
                        {contact.number}
                      </p>
                      <h3 className="font-bold text-sm sm:text-base text-amber-200 mb-1">
                        {isEn ? contact.serviceEn : contact.service}
                      </h3>
                      <p className="text-xs text-red-100 leading-relaxed">
                        {isEn ? contact.descriptionEn : contact.description}
                      </p>
                    </div>

                    <a
                      href={`tel:${contact.number}`}
                      className="mt-4 inline-flex items-center justify-center gap-2 py-2 px-3 rounded-[2px] bg-white text-[#da251d] font-bold text-xs hover:bg-amber-50 transition shadow-xs"
                    >
                      <PhoneCall className="size-3.5" />
                      <span>{isEn ? `Call ${contact.number}` : `Gọi Ngay ${contact.number}`}</span>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Section 2: Activity-Based Safety Guidelines */}
          <section className="mb-16">
            <div className="flex items-center gap-2 mb-4">
              <ShieldCheck className="size-5 text-[#da251d]" />
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-900">
                {isEn ? "Activity Safety Guidelines" : "Nguyên Tắc An Toàn Theo Loại Hình Hoạt Động"}
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 mb-8 max-w-3xl leading-relaxed">
              {isEn
                ? "Whether diving tropical coral reefs in Phu Quoc, trekking misty alpine ridges in Sa Pa, or conquering the Ha Giang Loop on two wheels, always adhere to verified safety protocols."
                : "Dù lặn ngắm san hô tại Phú Quốc, trekking rừng núi Fansipan hay lái xe máy qua các con đèo hiểm trở ở Hà Giang, hãy luôn tuân thủ các quy tắc an toàn đã được kiểm chứng dưới đây."}
            </p>

            <div className="space-y-8">
              {ACTIVITY_SAFETY_GUIDES.map((act) => {
                const Icon = ACTIVITY_ICON_MAP[act.icon] || ShieldAlert;
                return (
                  <div
                    key={act.id}
                    className="rounded-[2px] bg-white border border-slate-200/90 shadow-sm p-6 sm:p-8"
                  >
                    {/* Header */}
                    <div className="flex items-start sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100 flex-col sm:flex-row">
                      <div className="flex items-center gap-3">
                        <div className="size-11 rounded-[2px] bg-slate-50 border border-slate-200 flex items-center justify-center text-[#da251d]">
                          <Icon className="size-6" />
                        </div>
                        <div>
                          <h4 className="font-serif text-lg sm:text-xl font-bold text-slate-900">
                            {isEn ? act.activityNameEn : act.activityName}
                          </h4>
                          <p className="text-xs text-slate-500 mt-0.5">
                            {isEn ? "Applicable destinations:" : "Áp dụng tại:"}{" "}
                            <span className="font-semibold text-slate-700">
                              {act.applicableDestinations.join(", ")}
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Safety Rules Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      {act.rules.map((rule, idx) => (
                        <div
                          key={idx}
                          className="rounded-[2px] bg-slate-50 border border-slate-100 p-4 space-y-2 text-xs"
                        >
                          <div className="flex items-center gap-1.5 font-bold text-slate-900">
                            <CheckCircle2 className="size-4 text-emerald-600 shrink-0" />
                            <span>{isEn ? rule.ruleEn : rule.rule}</span>
                          </div>
                          <p className="text-slate-600 text-[11px] leading-relaxed">
                            {isEn ? rule.explanationEn : rule.explanation}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Essential Gear & Emergency Advice */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-100 text-xs">
                      <div>
                        <p className="font-bold text-slate-700 uppercase tracking-wider text-[11px] mb-2">
                          {isEn ? "Essential Gear to Pack:" : "Trang bị thiết yếu cần có:"}
                        </p>
                        <ul className="space-y-1 text-slate-600">
                          {(isEn ? act.essentialGearEn : act.essentialGear).map((gear, i) => (
                            <li key={i} className="flex items-center gap-1.5">
                              <span className="text-[#da251d] font-bold">•</span>
                              <span>{gear}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="rounded-[2px] bg-amber-50/70 border border-amber-200/80 p-3.5 text-amber-950">
                        <p className="font-bold text-amber-900 mb-1 flex items-center gap-1 text-[11px]">
                          <AlertTriangle className="size-3.5 text-amber-600" />
                          <span>{isEn ? "Emergency Action:" : "Ứng phó sự cố:"}</span>
                        </p>
                        <p className="text-[11px] leading-relaxed">
                          {isEn ? act.emergencyAdviceEn : act.emergencyAdvice}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Section 3: Travel Insurance Advisory */}
          <section className="mb-14">
            <div className="rounded-[2px] bg-white border border-slate-200 p-6 sm:p-10 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <FileCheck2 className="size-5 text-emerald-600" />
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                  {isEn ? "PEACE OF MIND" : "AN TÂM TRỌN VẸN"}
                </span>
              </div>

              <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 mb-3">
                {isEn ? INSURANCE_ADVISORY.titleEn : INSURANCE_ADVISORY.title}
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6 max-w-3xl">
                {isEn ? INSURANCE_ADVISORY.recommendationEn : INSURANCE_ADVISORY.recommendation}
              </p>

              {/* Key Coverages Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {INSURANCE_ADVISORY.keyCoverages.map((cov, idx) => (
                  <div
                    key={idx}
                    className="rounded-[2px] bg-slate-50 border border-slate-100 p-4 space-y-1.5 text-xs"
                  >
                    <p className="font-bold text-slate-900">
                      {isEn ? cov.itemEn : cov.item}
                    </p>
                    <p className="text-slate-600 text-[11px] leading-relaxed">
                      {isEn ? cov.whyNeededEn : cov.whyNeeded}
                    </p>
                  </div>
                ))}
              </div>

              {/* Tips */}
              <div className="space-y-2 mb-6">
                <p className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  {isEn ? "Helpful Insurance Tips:" : "Lời khuyên khi dùng bảo hiểm:"}
                </p>
                <ul className="space-y-1.5 text-xs text-slate-600">
                  {(isEn ? INSURANCE_ADVISORY.tipsEn : INSURANCE_ADVISORY.tips).map((tip, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <CheckCircle2 className="size-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Legal Disclaimer */}
              <div className="p-4 rounded-[2px] bg-slate-100 text-slate-600 text-[11px] leading-relaxed border border-slate-200">
                <strong>{isEn ? "Note:" : "Lưu ý:"}</strong>{" "}
                {isEn ? INSURANCE_ADVISORY.disclaimerEn : INSURANCE_ADVISORY.disclaimer}
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
