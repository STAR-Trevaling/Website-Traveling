import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Scale, CreditCard, RotateCcw, AlertTriangle, ShieldCheck } from "lucide-react";
import { SiteHeader } from "@/components/layout/site-header";
import { Breadcrumb } from "@/components/shared/breadcrumb";

export const metadata: Metadata = {
  title: "Điều Khoản Sử Dụng Dịch Vụ | Star Travels Vietnam",
  description:
    "Điều khoản và điều kiện sử dụng dịch vụ lữ hành, đặt tour và thanh toán trực tuyến tại Star Travels Vietnam.",
};

export default async function TermsPage() {
  const cookieStore = await cookies();
  const isEn = cookieStore.get("star_travels_locale")?.value === "en";

  return (
    <>
      <SiteHeader overlay={false} />

      <main className="template-page-bg min-h-screen text-[#282828] pb-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 pt-8 sm:pt-12 md:px-8">
          <div className="mb-6 sm:mb-8">
            <Breadcrumb
              items={[
                { label: isEn ? "Home" : "Trang Chủ", href: "/" },
                { label: isEn ? "Terms of Service" : "Điều Khoản Dịch Vụ" },
              ]}
            />
          </div>

          <div className="rounded-[2px] bg-white/90 backdrop-blur-md p-6 sm:p-10 shadow-sm border border-slate-200/80 mb-8">
            <span className="inline-block px-3 py-1 rounded-[2px] bg-[#0098a2]/15 text-[#007a82] border border-[#0098a2]/25 text-[11px] font-bold uppercase tracking-[0.2em] mb-3">
              {isEn ? "Legal & Policies" : "Pháp Lý & Quy Định"}
            </span>
            <h1 className="script-title text-3xl sm:text-4xl md:text-5xl text-[#0f172a] leading-tight">
              {isEn ? "Terms of Service & Booking Conditions" : "Điều Khoản Sử Dụng Dịch Vụ & Đặt Tour"}
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-slate-500 font-light">
              {isEn
                ? "Applicable to all tour bookings, consulting and payment transactions at STAR Travels Vietnam."
                : "Áp dụng cho mọi giao dịch đặt tour, tư vấn và thanh toán tại Công ty TNHH STAR Travels Việt Nam."}
            </p>
          </div>

          <div className="space-y-6 text-sm text-slate-700 leading-relaxed">
            <section className="rounded-[2px] bg-white p-6 sm:p-8 shadow-sm border border-slate-100">
              <h2 className="flex items-center gap-2 text-base sm:text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
                <Scale className="size-5 text-[#da251d]" />
                {isEn ? "1. General Provisions & Legal Capacity" : "1. Quy Định Chung & Tư Cách Pháp Nhân"}
              </h2>
              <div className="mt-4 space-y-2 text-xs sm:text-sm">
                <p>
                  {isEn
                    ? "STAR Travels Vietnam Co., Ltd. (License 01-2026/TCDL-GP LHQT) provides premium outbound and inbound tour services under Vietnamese Tourism Law 2017."
                    : "CÔNG TY TNHH STAR TRAVELS VIỆT NAM (GPKD Lữ hành Quốc tế số 01-2026/TCDL-GP LHQT, MST 0110896868) cung cấp các dịch vụ du lịch, lữ hành cao cấp theo quy định của Luật Du lịch Việt Nam 2017."}
                </p>
                <p>
                  {isEn
                    ? "By creating an account, submitting an inquiry, or confirming a booking, customers acknowledge that they have read, understood, and agreed to these terms."
                    : "Bằng việc khởi tạo tài khoản, gửi thông tin yêu cầu hoặc xác nhận đặt tour, du khách xác nhận đã đọc, hiểu và đồng ý toàn bộ điều khoản này."}
                </p>
              </div>
            </section>

            <section className="rounded-[2px] bg-white p-6 sm:p-8 shadow-sm border border-slate-100">
              <h2 className="flex items-center gap-2 text-base sm:text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
                <CreditCard className="size-5 text-[#0098a2]" />
                {isEn ? "2. Pricing, Booking & Payment Methods" : "2. Giá Dịch Vụ, Đặt Chỗ & Phương Thức Thanh Toán"}
              </h2>
              <ul className="mt-4 list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
                <li>
                  <strong>{isEn ? "Pricing:" : "Giá niêm yết:"}</strong>{" "}
                  {isEn
                    ? "All prices are quoted in Vietnam Dong (VND), including VAT, service charges, and mandatory travel insurance. Children under 12 receive established discounts."
                    : "Toàn bộ giá hiển thị tính bằng Việt Nam Đồng (VND), đã bao gồm thuế GTGT, phí dịch vụ và bảo hiểm du lịch theo quy định. Trẻ em dưới 12 tuổi áp dụng mức giá chiết khấu theo quy chuẩn."}
                </li>
                <li>
                  <strong>{isEn ? "VietQR Instant Transfer:" : "Chuyển khoản VietQR tự động 24/7:"}</strong>{" "}
                  {isEn
                    ? "Instant dynamic QR code generation. System auto-reconciles payment and sends confirmed e-voucher to customer email within seconds."
                    : "Hệ thống sinh mã QR động kèm mã đặt tour. Giao dịch được đối soát tự động 24/7 và vé điện tử (e-voucher) gửi ngay về email khách hàng."}
                </li>
                <li>
                  <strong>{isEn ? "Cash Payment:" : "Thanh toán tiền mặt:"}</strong>{" "}
                  {isEn
                    ? "Payable at STAR Travels branches (Hanoi, Da Nang, Ho Chi Minh City) or directly to the tour guide upon departure."
                    : "Khách hàng có thể nộp tiền mặt tại văn phòng chi nhánh STAR Travels hoặc thanh toán trực tiếp cho HDV khi tập kết khởi hành."}
                </li>
              </ul>
            </section>

            <section className="rounded-[2px] bg-white p-6 sm:p-8 shadow-sm border border-slate-100">
              <h2 className="flex items-center gap-2 text-base sm:text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
                <RotateCcw className="size-5 text-emerald-600" />
                {isEn ? "3. Cancellation & Refund Policy" : "3. Chính Sách Hoàn Hủy & Đổi Lịch Trình"}
              </h2>
              <div className="mt-4 space-y-2 text-xs sm:text-sm">
                <p><strong>{isEn ? "Cancellation by Customer:" : "Quy định hủy tour từ phía du khách:"}</strong></p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-3 bg-emerald-50 rounded border border-emerald-100">
                    <strong className="text-emerald-900 block mb-0.5">{isEn ? "> 48 Hours Prior" : "Trước 48 Giờ"}</strong>
                    <span className="text-emerald-700 font-medium">{isEn ? "100% Free Refund" : "Miễn phí 100% hoàn tiền"}</span>
                  </div>
                  <div className="p-3 bg-amber-50 rounded border border-amber-100">
                    <strong className="text-amber-900 block mb-0.5">{isEn ? "24 - 48 Hours Prior" : "Từ 24 đến 48 Giờ"}</strong>
                    <span className="text-amber-700 font-medium">{isEn ? "50% Service Fee" : "Phí dịch vụ 50%"}</span>
                  </div>
                  <div className="p-3 bg-red-50 rounded border border-red-100">
                    <strong className="text-red-900 block mb-0.5">{isEn ? "< 24 Hours / No Show" : "Dưới 24 Giờ / Vắng Mặt"}</strong>
                    <span className="text-red-700 font-medium">{isEn ? "100% Tour Fee" : "Thu 100% tiền tour"}</span>
                  </div>
                </div>
                <p className="text-slate-500 text-xs mt-2 font-light">
                  {isEn
                    ? "Refunds are processed to the original bank account within 3 to 5 business days without surcharge."
                    : "Tiền hoàn trả sẽ được chuyển khoản lại tài khoản gốc của du khách trong vòng 3 đến 5 ngày làm việc, không thu thêm phí phụ trội."}
                </p>
              </div>
            </section>

            <section className="rounded-[2px] bg-white p-6 sm:p-8 shadow-sm border border-slate-100">
              <h2 className="flex items-center gap-2 text-base sm:text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
                <AlertTriangle className="size-5 text-amber-600" />
                {isEn ? "4. Force Majeure & Itinerary Modifications" : "4. Trường Hợp Bất Khả Kháng"}
              </h2>
              <p className="mt-3 text-xs sm:text-sm">
                {isEn
                  ? "In events of force majeure (typhoons, natural disasters, epidemics, air traffic control closures, or government travel advisories), STAR Travels will assist travelers in rescheduling or obtaining maximum third-party vendor refunds without penalties."
                  : "Trong các trường hợp bất khả kháng (bão lũ, thiên tai, dịch bệnh, hoãn hủy chuyến bay vì lý do an ninh hàng không, hoặc chỉ thị cấm hoạt động từ cơ quan có thẩm quyền), STAR Travels sẽ hỗ trợ dời lịch trình hoặc bảo lưu giá trị tour tối đa cho du khách mà không áp dụng phạt hủy."}
              </p>
            </section>

            <section className="rounded-[2px] bg-white p-6 sm:p-8 shadow-sm border border-slate-100">
              <h2 className="flex items-center gap-2 text-base sm:text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
                <ShieldCheck className="size-5 text-[#da251d]" />
                {isEn ? "5. Dispute Resolution & Governing Law" : "5. Luật Điều Chỉnh & Giải Quyết Tranh Chấp"}
              </h2>
              <p className="mt-3 text-xs sm:text-sm">
                {isEn
                  ? "These Terms of Service are governed exclusively by the laws of the Socialist Republic of Vietnam. Any disputes that cannot be settled amicably shall be submitted to the competent People's Court in Hanoi City."
                  : "Điều khoản dịch vụ này được điều chỉnh và giải thích hoàn toàn theo pháp luật nước Cộng hòa Xã hội Chủ nghĩa Việt Nam. Mọi tranh chấp không thể hòa giải thương lượng sẽ được đưa ra giải quyết tại Tòa án nhân dân có thẩm quyền tại TP. Hà Nội."}
              </p>
            </section>
          </div>
        </div>
      </main>
    </>
  );
}
