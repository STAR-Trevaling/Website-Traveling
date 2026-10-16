import type { Metadata } from "next";
import { cookies } from "next/headers";
import {
  Coins,
  CreditCard,
  QrCode,
  DollarSign,
  AlertTriangle,
  CheckCircle2,
  Building,
  Landmark,
  Plane,
  Sparkles,
} from "lucide-react";
import { SiteHeader } from "@/components/layout/site-header";
import { Breadcrumb } from "@/components/shared/breadcrumb";
import {
  CURRENCY_DENOMINATIONS,
  EXCHANGE_LOCATIONS,
  DAILY_BUDGET_TIERS,
  PAYMENT_METHODS,
} from "@/data/seed/guide";
import { VIETNAM_IMAGES } from "@/lib/assets";

export const metadata: Metadata = {
  title: "Tiền Tệ & Chi Phí Du Lịch Việt Nam: Mệnh Giá VNĐ, Đổi Tiền & Ngân Sách | STAR Travels",
  description:
    "Cẩm nang tiền tệ Việt Nam (VNĐ): phân biệt tờ 20k và 500k, địa chỉ đổi tiền uy tín ở Hà Nội & TP.HCM, bảng ước tính chi phí 3 mức/ngày và lưu ý thanh toán thẻ, VietQR.",
  keywords: [
    "tiền tệ việt nam",
    "đổi tiền ở đâu việt nam",
    "phân biệt tiền polymer việt nam",
    "chi phí du lịch việt nam 1 ngày",
    "thanh toán thẻ ở việt nam",
    "vietnam currency guide",
    "vietnam dong denominations and exchange",
  ],
  openGraph: {
    title: "Tiền Tệ & Chi Phí Du Lịch Việt Nam: Mệnh Giá VNĐ, Đổi Tiền & Ngân Sách | STAR Travels",
    description:
      "Bảng mệnh giá tiền polymer VNĐ, địa điểm đổi tiền tốt nhất, ước tính chi phí theo 3 mức ngân sách và kinh nghiệm thanh toán.",
    images: [{ url: VIETNAM_IMAGES.hero, width: 1200, height: 630, alt: "Tiền Tệ Du Lịch Việt Nam" }],
  },
};

export default async function CurrencyGuidePage() {
  const cookieStore = await cookies();
  const isEn = cookieStore.get("star_travels_locale")?.value === "en";

  const breadcrumbs = [
    { label: isEn ? "Home" : "Trang Chủ", href: "/" },
    { label: isEn ? "Travel Info Hub" : "Thông Tin Cần Biết", href: "/guide" },
    { label: isEn ? "Currency & Costs" : "Tiền Tệ & Chi Phí" },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: isEn
      ? "Vietnam Currency & Travel Budget Guide: Banknotes, Exchanging Money & Daily Costs"
      : "Cẩm Nang Tiền Tệ & Chi Phí Du Lịch Việt Nam: Tiền Polymer, Đổi Ngoại Tệ và Ngân Sách",
    description: isEn
      ? "Comprehensive breakdown of Vietnamese Dong (VND), reputable money changers, 3-tier daily spending estimates, and card/QR payments."
      : "Chi tiết mệnh giá tiền polymer VNĐ, nơi đổi ngoại tệ uy tín, ước tính chi phí 3 mức và phương thức thanh toán tại Việt Nam.",
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
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[2px] bg-emerald-50 text-emerald-900 border border-emerald-200 text-xs font-bold uppercase tracking-wider mb-3">
              <Coins className="size-3.5 text-emerald-600" />
              <span>{isEn ? "PRACTICAL MONEY ADVICE" : "TIỀN TỆ & CHI TIÊU"}</span>
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 leading-tight">
              {isEn
                ? "Navigating Money, Cash & Costs in Vietnam"
                : "Sử Dụng Tiền Tệ & Quản Lý Chi Phí Tại Việt Nam"}
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
              {isEn
                ? "The official currency is the Vietnamese Dong (VND / ₫). Because denomination numbers run high (tens and hundreds of thousands), getting familiar with banknote colors and zero-counts is key to avoiding mistakes."
                : "Đơn vị tiền tệ chính thức là Việt Nam Đồng (VNĐ / ₫). Do các mệnh giá thường có nhiều số không (hàng chục nghìn, hàng trăm nghìn), việc làm quen với màu sắc các tờ polymer và chú ý số lượng số 0 sẽ giúp du khách chi tiêu an tâm và chính xác."}
            </p>
          </section>

          {/* Warning Banner: 20k vs 500k Confusion */}
          <section className="mb-12">
            <div className="rounded-[2px] bg-amber-50/90 border border-amber-300 p-5 sm:p-6 text-amber-950 flex items-start gap-4">
              <AlertTriangle className="size-6 text-amber-600 shrink-0 mt-0.5" />
              <div className="space-y-1.5 text-xs sm:text-sm">
                <span className="font-bold text-amber-900 uppercase tracking-wider text-xs block">
                  ⚠️ {isEn ? "CRITICAL CASH TIP: AVOID THE 20K VS 500K TRAP" : "CẢNH BÁO QUAN TRỌNG: TRÁNH NHẦM TỜ 20.000đ VÀ 500.000đ"}
                </span>
                <p className="leading-relaxed">
                  {isEn
                    ? "Both the 20,000 VND and 500,000 VND polymer bills share a similar bluish-cyan tone! In low-light restaurants or evening markets, tourists frequently hand over a 500k note (worth ~$20 USD) instead of a 20k note (worth ~$0.80 USD). Always count the zeros: 500,000 has FIVE zeros; 20,000 has FOUR."
                    : "Cả hai tờ tiền polymer 20.000đ và 500.000đ đều có tông màu xanh lam gần giống nhau! Vào buổi tối trong ánh đèn mờ, du khách rất dễ đưa nhầm tờ 500.000đ (khoảng $20) thay vì tờ 20.000đ (khoảng $0.80). Hãy luôn nhìn kỹ số lượng số không trước khi trả tiền."}
                </p>
              </div>
            </div>
          </section>

          {/* Section 1: Polymer Denominations Grid */}
          <section className="mb-16">
            <div className="flex items-center gap-2 mb-6">
              <Coins className="size-5 text-[#da251d]" />
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-900">
                {isEn ? "Common Vietnamese Polymer Banknotes" : "Các Mệnh Giá Tiền Polymer Phổ Biến"}
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {CURRENCY_DENOMINATIONS.map((note) => (
                <div
                  key={note.value}
                  className="rounded-[2px] bg-white border border-slate-200 shadow-sm p-6 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100">
                      <span className="font-mono text-xl sm:text-2xl font-black text-[#da251d]">
                        {note.formatted}
                      </span>
                      <span className="px-2 py-0.5 rounded-[2px] bg-slate-100 text-slate-700 text-[11px] font-bold">
                        {note.material}
                      </span>
                    </div>

                    <div className="space-y-2 text-xs mb-4">
                      <p className="text-slate-600">
                        <strong className="text-slate-800">{isEn ? "Color tone:" : "Màu sắc:"}</strong>{" "}
                        {note.color}
                      </p>
                      <p className="text-slate-600">
                        <strong className="text-slate-800">{isEn ? "Back illustration:" : "Hình mặt sau:"}</strong>{" "}
                        {isEn ? note.backImageFeatureEn : note.backImageFeature}
                      </p>
                    </div>

                    <div className="p-3 rounded-[2px] bg-slate-50 border border-slate-100 text-[11px] text-slate-700">
                      <strong className="block text-slate-900 mb-0.5">
                        {isEn ? "Typical usage:" : "Sử dụng phổ biến:"}
                      </strong>
                      {isEn ? note.commonUsageEn : note.commonUsage}
                    </div>
                  </div>

                  {note.warning && (
                    <div className="mt-3 p-2.5 rounded-[2px] bg-rose-50 border border-rose-200 text-[11px] text-rose-900 font-medium">
                      ⚠️ {isEn ? note.warningEn : note.warning}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Section 2: Where to Exchange Money */}
          <section className="mb-16">
            <div className="flex items-center gap-2 mb-6">
              <Building className="size-5 text-[#da251d]" />
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-900">
                {isEn ? "Where to Exchange Foreign Currency in Vietnam" : "Địa Điểm Đổi Ngoại Tệ Uy Tín Tại Việt Nam"}
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {EXCHANGE_LOCATIONS.map((loc, idx) => (
                <div
                  key={idx}
                  className="rounded-[2px] bg-white border border-slate-200 shadow-sm p-6 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span
                        className={`px-2 py-0.5 rounded-[2px] text-[11px] font-bold uppercase tracking-wider ${
                          loc.exchangeRateRating === "best"
                            ? "bg-emerald-100 text-emerald-900"
                            : loc.exchangeRateRating === "moderate"
                            ? "bg-blue-100 text-blue-900"
                            : "bg-slate-100 text-slate-800"
                        }`}
                      >
                        {loc.exchangeRateRating === "best"
                          ? isEn ? "Best Rate" : "Tỷ Giá Tốt Nhất"
                          : loc.exchangeRateRating === "moderate"
                          ? isEn ? "Official Bank" : "Ngân Hàng Chuẩn"
                          : isEn ? "Convenience" : "Tiện Lợi Sân Bay"}
                      </span>
                    </div>

                    <h4 className="font-serif text-lg font-bold text-slate-900 mb-1">
                      {isEn ? loc.typeEn : loc.type}
                    </h4>

                    <p className="text-xs text-[#da251d] font-medium mb-4">
                      📍 {isEn ? loc.locationsEn : loc.locations}
                    </p>

                    {/* Pros */}
                    <div className="space-y-1.5 mb-4 text-xs">
                      <p className="font-bold text-slate-700 uppercase tracking-wider text-[11px]">
                        {isEn ? "Advantages:" : "Ưu điểm:"}
                      </p>
                      <ul className="space-y-1 text-slate-600">
                        {(isEn ? loc.prosEn : loc.pros).map((p, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <CheckCircle2 className="size-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            <span className="text-[11px]">{p}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Cons */}
                    <div className="space-y-1.5 mb-4 text-xs">
                      <p className="font-bold text-slate-700 uppercase tracking-wider text-[11px]">
                        {isEn ? "Considerations:" : "Lưu ý:"}
                      </p>
                      <ul className="space-y-1 text-slate-600">
                        {(isEn ? loc.consEn : loc.cons).map((c, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="text-slate-400 font-bold">•</span>
                            <span className="text-[11px]">{c}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Tips */}
                  <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-500">
                    💡 <strong>{isEn ? "Tip:" : "Mẹo:"}</strong>{" "}
                    {(isEn ? loc.tipsEn : loc.tips)[0]}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 3: Daily Budget Tiers */}
          <section className="mb-16">
            <div className="flex items-center gap-2 mb-6">
              <DollarSign className="size-5 text-[#da251d]" />
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-900">
                {isEn ? "Daily Spending Estimates by 3 Budget Tiers" : "Ước Tính Chi Phí Du Lịch 1 Ngày Theo 3 Mức Ngân Sách"}
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {DAILY_BUDGET_TIERS.map((tier) => (
                <div
                  key={tier.tier}
                  className="rounded-[2px] bg-white border border-slate-200/90 shadow-sm p-6 sm:p-7 flex flex-col justify-between"
                >
                  <div>
                    <span className="px-2.5 py-0.5 rounded-[2px] bg-slate-100 text-slate-800 text-xs font-bold uppercase tracking-wider">
                      {isEn ? tier.titleEn : tier.title}
                    </span>

                    <div className="my-4 pb-3 border-b border-slate-100">
                      <p className="font-mono text-xl sm:text-2xl font-black text-slate-900">
                        {tier.rangeVnd}
                      </p>
                      <span className="text-xs text-slate-500 font-medium">
                        ≈ {tier.rangeUsd}
                      </span>
                    </div>

                    <div className="space-y-3 text-xs mb-5">
                      <div>
                        <span className="font-bold text-slate-800 block mb-0.5">
                          🍜 {isEn ? "Food & Dining:" : "Ăn uống:"}
                        </span>
                        <p className="text-slate-600 text-[11px]">
                          {isEn ? tier.breakdown.foodEn : tier.breakdown.food}
                        </p>
                      </div>

                      <div>
                        <span className="font-bold text-slate-800 block mb-0.5">
                          🚗 {isEn ? "Transport:" : "Di chuyển:"}
                        </span>
                        <p className="text-slate-600 text-[11px]">
                          {isEn ? tier.breakdown.transportEn : tier.breakdown.transport}
                        </p>
                      </div>

                      <div>
                        <span className="font-bold text-slate-800 block mb-0.5">
                          🏨 {isEn ? "Accommodation:" : "Lưu trú:"}
                        </span>
                        <p className="text-slate-600 text-[11px]">
                          {isEn ? tier.breakdown.stayEn : tier.breakdown.stay}
                        </p>
                      </div>

                      <div>
                        <span className="font-bold text-slate-800 block mb-0.5">
                          🎟 {isEn ? "Activities & Tickets:" : "Vé tham quan & Tour:"}
                        </span>
                        <p className="text-slate-600 text-[11px]">
                          {isEn ? tier.breakdown.activitiesEn : tier.breakdown.activities}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-500">
                    👥 <strong>{isEn ? "Recommended for:" : "Phù hợp:"}</strong>{" "}
                    {isEn ? tier.recommendedForEn : tier.recommendedFor}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 4: Cash vs Cards vs VietQR Payment Advice */}
          <section className="mb-14">
            <div className="rounded-[2px] bg-white border border-slate-200 p-6 sm:p-8 shadow-xs">
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 mb-4">
                {isEn ? "How to Pay: Cash, Cards & Mobile QR Codes" : "Hướng Dẫn Thanh Toán: Tiền Mặt, Thẻ & Quét Mã QR"}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mb-6 leading-relaxed max-w-3xl">
                {isEn
                  ? "Vietnam is advancing rapidly toward a cashless society via banking QR codes, yet cash remains indispensable for small vendors."
                  : "Việt Nam đang chuyển mình mạnh mẽ sang thanh toán không dùng tiền mặt thông qua mã VietQR, tuy nhiên tiền mặt vẫn là phương tiện không thể thiếu khi khám phá ẩm thực đường phố và chợ truyền thống."}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {PAYMENT_METHODS.map((method, idx) => (
                  <div key={idx} className="rounded-[2px] bg-slate-50 border border-slate-100 p-5 space-y-3 text-xs">
                    <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                      {idx === 0 ? <Coins className="size-4 text-amber-500" /> : idx === 1 ? <CreditCard className="size-4 text-blue-500" /> : <QrCode className="size-4 text-emerald-500" />}
                      <span>{isEn ? method.methodEn : method.method}</span>
                    </h4>

                    <div>
                      <p className="font-bold text-slate-700 text-[11px] uppercase tracking-wider mb-1">
                        {isEn ? "Where it works:" : "Nơi sử dụng:"}
                      </p>
                      <ul className="space-y-1 text-slate-600 text-[11px]">
                        {(isEn ? method.whereToUseEn : method.whereToUse).map((w, i) => (
                          <li key={i} className="flex items-start gap-1">
                            <span className="text-[#da251d]">•</span>
                            <span>{w}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-2 border-t border-slate-200/60 text-[11px] text-slate-500 italic">
                      💡 {(isEn ? method.tipsEn : method.tips)[0]}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
