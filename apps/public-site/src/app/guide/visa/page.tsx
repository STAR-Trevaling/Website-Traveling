import type { Metadata } from "next";
import { cookies } from "next/headers";
import Link from "next/link";
import {
  FileCheck,
  ShieldAlert,
  Globe,
  ExternalLink,
  CheckCircle2,
  Clock,
  DollarSign,
  AlertTriangle,
  HelpCircle,
  FileText,
} from "lucide-react";
import { SiteHeader } from "@/components/layout/site-header";
import { Breadcrumb } from "@/components/shared/breadcrumb";
import { VISA_GUIDE_DATA } from "@/data/seed/guide";
import { VIETNAM_IMAGES } from "@/lib/assets";

export const metadata: Metadata = {
  title: "Chính Sách Miễn Visa & Hướng Dẫn E-Visa Việt Nam 2026 Mới Nhất | STAR Travels",
  description:
    "Cập nhật chính sách miễn thị thực 45 ngày cho 25 nước, 30 ngày cho ASEAN, miễn visa Phú Quốc và hướng dẫn xin e-visa 90 ngày ($25 - $50) qua cổng chính thức evisa.gov.vn.",
  keywords: [
    "miễn visa việt nam 2026",
    "danh sách nước miễn visa việt nam",
    "e-visa việt nam 90 ngày",
    "lệ phí e-visa việt nam",
    "cổng xin e-visa chính thức",
    "vietnam visa exemption 2026",
    "vietnam evisa application guide",
  ],
  openGraph: {
    title: "Chính Sách Miễn Visa & Hướng Dẫn E-Visa Việt Nam 2026 Mới Nhất | STAR Travels",
    description:
      "Hướng dẫn xin e-visa chính thức, danh sách 25+ nước miễn thị thực 45 ngày, lệ phí và quy trình cấp thị thực điện tử.",
    images: [{ url: VIETNAM_IMAGES.hoiAn, width: 1200, height: 630, alt: "Visa Du Lịch Việt Nam" }],
  },
};

export default async function VisaGuidePage() {
  const cookieStore = await cookies();
  const isEn = cookieStore.get("star_travels_locale")?.value === "en";

  const breadcrumbs = [
    { label: isEn ? "Home" : "Trang Chủ", href: "/" },
    { label: isEn ? "Travel Info Hub" : "Thông Tin Cần Biết", href: "/guide" },
    { label: isEn ? "Visa & Entry" : "Thị Thực & Nhập Cảnh" },
  ];

  // Schema.org FAQPage Structured Data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: VISA_GUIDE_DATA.faq.map((item) => ({
      "@type": "Question",
      name: isEn ? item.questionEn : item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: isEn ? item.answerEn : item.answer,
      },
    })),
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

          {/* Verification Badge & Mandatory Legal Disclaimer */}
          <section className="mb-10">
            <div className="rounded-[2px] bg-red-50/80 border border-red-200 p-5 sm:p-6 text-slate-800 shadow-xs">
              <div className="flex items-start gap-3">
                <ShieldAlert className="size-5 text-[#da251d] shrink-0 mt-0.5" />
                <div className="space-y-2 text-xs sm:text-sm">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-bold text-[#da251d] uppercase tracking-wider text-[11px] px-2 py-0.5 rounded-[2px] bg-white border border-red-200">
                      {isEn ? "OFFICIAL DISCLAIMER" : "KHUYẾN CÁO PHÁP LÝ"}
                    </span>
                    <span className="text-slate-500 text-xs">
                      {isEn
                        ? `Last verified: ${VISA_GUIDE_DATA.lastVerifiedDate} (Resolution 128/NQ-CP & Law 23/2023/QH15)`
                        : `Xác minh gần nhất: ${VISA_GUIDE_DATA.lastVerifiedDate} (Nghị quyết 128/NQ-CP & Luật 23/2023/QH15)`}
                    </span>
                  </div>
                  <p className="leading-relaxed text-slate-700">
                    {isEn ? VISA_GUIDE_DATA.disclaimerEn : VISA_GUIDE_DATA.disclaimer}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 1: Visa Exemption Matrix */}
          <section className="mb-14">
            <div className="flex items-center gap-2 mb-4">
              <Globe className="size-5 text-[#da251d]" />
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-900">
                {isEn ? "Countries Eligible for Visa Exemption" : "Danh Sách Quốc Gia Được Miễn Thị Thực"}
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 mb-6 max-w-3xl leading-relaxed">
              {isEn
                ? "Citizens of the following countries can enter Vietnam without an advance visa for tourism, business, or leisure purposes for the indicated period. Passports must have at least 6 months remaining validity."
                : "Công dân các quốc gia dưới đây được miễn thị thực nhập cảnh Việt Nam với thời hạn quy định mà không phân biệt mục đích. Hộ chiếu bắt buộc phải còn giá trị ít nhất 6 tháng kể từ ngày nhập cảnh."}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {VISA_GUIDE_DATA.exemptions.map((group) => (
                <div
                  key={group.durationDays}
                  className="rounded-[2px] bg-white border border-slate-200/90 shadow-sm p-6 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-2.5 py-1 rounded-[2px] bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold uppercase tracking-wider">
                        {isEn ? group.badgeEn : group.badge}
                      </span>
                      <span className="text-xs text-slate-400 font-medium">
                        {group.countries.length} {isEn ? "countries" : "quốc gia"}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                      {isEn ? group.descriptionEn : group.description}
                    </p>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {group.countries.map((c) => (
                        <div
                          key={c.code}
                          className="flex items-center gap-1.5 p-2 rounded-[2px] bg-slate-50 border border-slate-100 text-xs text-slate-800"
                        >
                          <span className="text-base leading-none">{c.flag}</span>
                          <span className="truncate font-medium">{isEn ? c.nameEn : c.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {group.notes && (
                    <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500">
                      ℹ️ {isEn ? group.notesEn : group.notes}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Special Phu Quoc Exemption Card */}
            <div className="mt-6 rounded-[2px] bg-sky-50/70 border border-sky-200 p-5 sm:p-6 text-slate-800">
              <div className="flex items-start gap-3">
                <Globe className="size-5 text-sky-700 shrink-0 mt-0.5" />
                <div className="space-y-2 text-xs sm:text-sm">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sky-900 uppercase tracking-wider text-xs">
                      ✦ {isEn ? VISA_GUIDE_DATA.specialExemptions[0].zoneEn : VISA_GUIDE_DATA.specialExemptions[0].zone}
                    </span>
                    <span className="px-2 py-0.5 rounded-[2px] bg-sky-600 text-white font-bold text-[11px]">
                      {isEn ? "30 Days Exemption" : "Miễn 30 Ngày"}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600">
                    {isEn
                      ? "Special 30-day visa exemption applies to foreign nationals traveling directly to Phu Quoc Island:"
                      : "Chính sách miễn thị thực đặc thù 30 ngày áp dụng cho người nước ngoài nhập cảnh đảo Phú Quốc:"}
                  </p>
                  <ul className="space-y-1 list-disc list-inside text-xs text-slate-700 pl-2">
                    {(isEn
                      ? VISA_GUIDE_DATA.specialExemptions[0].conditionsEn
                      : VISA_GUIDE_DATA.specialExemptions[0].conditions
                    ).map((cond, i) => (
                      <li key={i}>{cond}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Section 2: 90-Day E-Visa Step-by-Step Guide */}
          <section className="mb-14">
            <div className="flex items-center gap-2 mb-4">
              <FileCheck className="size-5 text-[#da251d]" />
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-900">
                {isEn ? "Comprehensive 90-Day Vietnam E-Visa Guide" : "Hướng Dẫn Xin Thị Thực Điện Tử (E-Visa 90 Ngày)"}
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 mb-6 max-w-3xl leading-relaxed">
              {isEn
                ? "Since August 15, 2023, Vietnam issues 90-day electronic visas (single or multiple entry) to citizens of all countries and territories worldwide. The entire process is conducted online."
                : "Từ ngày 15/08/2023, Việt Nam cấp thị thực điện tử (e-visa) thời hạn tối đa 90 ngày (1 lần hoặc nhiều lần) cho công dân TẤT CẢ các quốc gia và vùng lãnh thổ trên thế giới. Toàn bộ thủ tục được thực hiện trực tuyến."}
            </p>

            {/* E-Visa Key Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <div className="rounded-[2px] bg-white border border-slate-200 p-5 shadow-xs">
                <Clock className="size-5 text-amber-500 mb-2" />
                <span className="text-xs text-slate-500 font-medium">
                  {isEn ? "Processing Time:" : "Thời gian xử lý:"}
                </span>
                <p className="text-base sm:text-lg font-bold text-slate-900 mt-1">
                  {isEn ? "3 - 5 Business Days" : "3 - 5 Ngày Làm Việc"}
                </p>
                <span className="text-[11px] text-slate-400">
                  {isEn ? "Excluding weekends & holidays" : "Không tính T7, CN và ngày lễ"}
                </span>
              </div>

              <div className="rounded-[2px] bg-white border border-slate-200 p-5 shadow-xs">
                <DollarSign className="size-5 text-emerald-500 mb-2" />
                <span className="text-xs text-slate-500 font-medium">
                  {isEn ? "Government Visa Fee:" : "Lệ phí nhà nước:"}
                </span>
                <p className="text-base sm:text-lg font-bold text-slate-900 mt-1">
                  $25 USD / $50 USD
                </p>
                <span className="text-[11px] text-slate-400">
                  {isEn ? "$25 single entry / $50 multiple" : "$25 lần đầu / $50 nhiều lần"}
                </span>
              </div>

              <div className="rounded-[2px] bg-white border border-slate-200 p-5 shadow-xs">
                <Globe className="size-5 text-sky-500 mb-2" />
                <span className="text-xs text-slate-500 font-medium">
                  {isEn ? "Eligible Nationalities:" : "Đối tượng áp dụng:"}
                </span>
                <p className="text-base sm:text-lg font-bold text-slate-900 mt-1">
                  {isEn ? "All Countries" : "Tất Cả Quốc Gia"}
                </p>
                <span className="text-[11px] text-slate-400">
                  {isEn ? "Universal global coverage" : "Áp dụng toàn cầu"}
                </span>
              </div>
            </div>

            {/* Official Portals Box */}
            <div className="rounded-[2px] bg-emerald-50/80 border border-emerald-300 p-6 mb-8">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle2 className="size-5 text-emerald-700" />
                <h4 className="font-bold text-emerald-950 text-sm sm:text-base">
                  {isEn ? "Official Government Portals (Only use .gov.vn domains)" : "Cổng Đăng Ký Chính Thức (Chỉ sử dụng tên miền .gov.vn)"}
                </h4>
              </div>
              <p className="text-xs text-emerald-900 mb-4 leading-relaxed">
                {isEn
                  ? "Avoid third-party agency websites charging exorbitant processing markups ($50 - $150). Apply directly on the two official portals managed by the Vietnam Immigration Department:"
                  : "Cảnh báo tránh các trang web đại lý tư nhân thu phí dịch vụ chênh lệch cao. Hãy truy cập trực tiếp 2 cổng chính thức của Cục Quản lý Xuất nhập cảnh:"}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {VISA_GUIDE_DATA.evisa.officialPortals.map((portal, idx) => (
                  <a
                    key={idx}
                    href={portal.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3.5 bg-white rounded-[2px] border border-emerald-200 hover:border-emerald-400 shadow-xs hover:shadow-sm transition"
                  >
                    <div>
                      <p className="font-bold text-xs sm:text-sm text-slate-900">
                        {portal.name}
                      </p>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        {isEn ? portal.noteEn : portal.note}
                      </p>
                      <span className="text-xs font-mono text-[#da251d] underline mt-1 inline-block">
                        {portal.url}
                      </span>
                    </div>
                    <ExternalLink className="size-4 text-slate-400 shrink-0 ml-2" />
                  </a>
                ))}
              </div>
            </div>

            {/* 4 Application Steps */}
            <div className="space-y-4 mb-8">
              <h4 className="font-serif text-lg font-bold text-slate-900">
                {isEn ? "4-Step Online Application Procedure" : "Quy Trình 4 Bước Nộp Đơn Trực Tuyến"}
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {VISA_GUIDE_DATA.evisa.steps.map((st) => (
                  <div
                    key={st.step}
                    className="rounded-[2px] bg-white border border-slate-200 p-5 shadow-xs flex items-start gap-4"
                  >
                    <div className="flex items-center justify-center size-9 rounded-full bg-[#da251d] text-white font-bold text-sm shrink-0">
                      {st.step}
                    </div>
                    <div>
                      <h5 className="font-bold text-slate-900 text-sm mb-1">
                        {isEn ? st.titleEn : st.title}
                      </h5>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {isEn ? st.detailEn : st.detail}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Essential Requirements */}
            <div className="rounded-[2px] bg-slate-50 border border-slate-200 p-5 sm:p-6">
              <h4 className="font-serif text-base font-bold text-slate-900 mb-3">
                {isEn ? "Important E-Visa Requirements & Rules" : "Quy Định & Yêu Cầu Bắt Buộc"}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                {VISA_GUIDE_DATA.evisa.requirements.map((req, i) => (
                  <div key={i} className="p-3 bg-white rounded-[2px] border border-slate-100">
                    <p className="font-bold text-slate-800 mb-1">
                      {isEn ? req.titleEn : req.title}
                    </p>
                    <p className="text-slate-600 leading-relaxed">
                      {isEn ? req.detailEn : req.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Section 3: Frequently Asked Questions (FAQ) */}
          <section className="mb-14">
            <div className="flex items-center gap-2 mb-6">
              <HelpCircle className="size-5 text-[#da251d]" />
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-900">
                {isEn ? "Frequently Asked Questions About Vietnam Visas" : "Câu Hỏi Thường Gặp Về Thị Thực Việt Nam"}
              </h3>
            </div>

            <div className="space-y-4">
              {VISA_GUIDE_DATA.faq.map((q, idx) => (
                <div
                  key={idx}
                  className="rounded-[2px] bg-white border border-slate-200 p-5 sm:p-6 shadow-xs"
                >
                  <h4 className="font-bold text-slate-900 text-sm sm:text-base mb-2">
                    Q: {isEn ? q.questionEn : q.question}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-4 border-l-2 border-[#da251d]">
                    {isEn ? q.answerEn : q.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Section 4: Verified Sources for Government Inspection */}
          <section className="rounded-[2px] bg-white border border-slate-200 p-6 sm:p-8 shadow-xs">
            <h4 className="font-serif text-base sm:text-lg font-bold text-slate-900 mb-2">
              {isEn ? "Verified Official Sources" : "Danh Sách Nguồn Kiểm Chứng Chính Thức"}
            </h4>
            <p className="text-xs text-slate-500 mb-4">
              {isEn
                ? "STAR Travels relies exclusively on published legal documents and official ministerial portals:"
                : "Toàn bộ thông tin visa trên trang được đối chiếu trực tiếp từ các văn bản pháp luật và cổng thông tin bộ ban ngành:"}
            </p>
            <ul className="space-y-2 text-xs">
              {VISA_GUIDE_DATA.officialSources.map((source, idx) => (
                <li key={idx} className="flex items-center justify-between p-2.5 rounded-[2px] bg-slate-50 border border-slate-100">
                  <div>
                    <span className="font-bold text-slate-800">{source.title}</span>
                    <span className="text-slate-400 mx-2">·</span>
                    <span className="text-slate-600">{source.agency}</span>
                  </div>
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#da251d] hover:underline flex items-center gap-1 font-mono text-[11px]"
                  >
                    <span>{source.url}</span>
                    <ExternalLink className="size-3" />
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>
    </>
  );
}
