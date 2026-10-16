import type { Metadata } from "next";
import { cookies } from "next/headers";
import { SiteHeader } from "@/components/layout/site-header";
import { Breadcrumb } from "@/components/shared/breadcrumb";
import { DiagramsClient } from "./diagrams-client";

export const metadata: Metadata = {
  title: "Sơ Đồ Kiến Trúc Hệ Thống UML 2.5 | STAR Travels",
  description:
    "Bộ 8 sơ đồ thiết kế kiến trúc chuẩn OMG UML 2.5.1 của nền tảng du lịch STAR Travels: Use Case, Domain Class, Sequence, Component, State Machine, Deployment.",
};

export default async function DiagramsPage() {
  const cookieStore = await cookies();
  const isEn = cookieStore.get("star_travels_locale")?.value === "en";

  return (
    <>
      <SiteHeader overlay={false} />

      <main className="template-page-bg min-h-screen text-[#282828] pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-8 sm:pt-12 md:px-8">
          <div className="mb-6 sm:mb-8">
            <Breadcrumb
              items={[
                { label: isEn ? "Home" : "Trang Chủ", href: "/" },
                { label: isEn ? "System Architecture (UML)" : "Kiến Trúc Hệ Thống (UML)" },
              ]}
            />
          </div>

          {/* Page Hero Banner */}
          <div className="rounded-[4px] bg-white/95 backdrop-blur-md p-6 sm:p-10 shadow-sm border border-slate-200/80 mb-8">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="inline-block px-3 py-1 rounded-[2px] bg-[#da251d]/10 text-[#da251d] border border-[#da251d]/20 text-[11px] font-bold uppercase tracking-[0.2em]">
                {isEn ? "OMG UML 2.5.1 Specification" : "Đặc Tả Kỹ Thuật OMG UML 2.5.1"}
              </span>
              <span className="inline-block px-3 py-1 rounded-[2px] bg-slate-100 text-slate-700 text-[11px] font-semibold">
                Modular Monolith · Clean Architecture
              </span>
            </div>

            <h1 className="script-title text-3xl sm:text-4xl md:text-5xl text-[#0f172a] leading-tight">
              {isEn ? "STAR Travels System Architecture Suite" : "Hồ Sơ Thiết Kế & Sơ Đồ Kiến Trúc UML"}
            </h1>

            <p className="mt-3 text-xs sm:text-sm text-slate-600 max-w-3xl leading-relaxed font-light">
              {isEn
                ? "Interactive UML design suite covering all 8 enterprise perspectives: Use Cases, Domain Class Model, Payment Transactions, Affiliate Referral Tracking, GPS Haversine Engine, Component Layers, State Transitions, and Docker Deployment."
                : "Bộ tài liệu và biểu đồ kiến trúc phần mềm chuẩn hóa 8 góc nhìn chuyên sâu: Use Case, Lớp miền nghiệp vụ, Giao dịch thanh toán, Tiếp thị liên kết đối tác, Định vị GPS Haversine, Phân tầng thành phần, Máy trạng thái và Hạ tầng triển khai Docker."}
            </p>
          </div>

          {/* Interactive Client Component */}
          <DiagramsClient isEnglish={isEn} />
        </div>
      </main>
    </>
  );
}
