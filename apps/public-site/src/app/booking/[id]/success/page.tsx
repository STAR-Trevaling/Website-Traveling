import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { CheckCircle2, ArrowRight, Home, CalendarCheck, Banknote, Building2, UserCheck, QrCode } from "lucide-react";
import { SiteHeader } from "@/components/layout/site-header";

interface SuccessPageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ method?: string; amount?: string }>;
}

export default async function BookingSuccessPage({ params, searchParams }: SuccessPageProps) {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login?returnUrl=/account/bookings&reason=view_booking");
  }

  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const bookingCode = decodeURIComponent(resolvedParams.id);
  const isCash = resolvedSearchParams?.method === "cash";
  const amount = resolvedSearchParams?.amount;

  const cookieStore = await cookies();
  const isEn = cookieStore.get("star_travels_locale")?.value === "en";

  const formattedAmount = amount
    ? Number(amount).toLocaleString(isEn ? "en-US" : "vi-VN") + (isEn ? " VND" : "đ")
    : null;

  return (
    <>
      <SiteHeader overlay={false} />
      <main className="template-page-bg min-h-screen text-[#282828] px-4 sm:px-6 py-12 sm:py-20 md:px-12 lg:px-16 flex items-center justify-center">
        <div className="mx-auto max-w-xl w-full bg-white/95 p-8 sm:p-12 rounded-[2px] shadow-sm border border-slate-100 backdrop-blur-md text-center space-y-6">
          {isCash ? (
            <>
              <div className="flex size-20 items-center justify-center rounded-full bg-amber-50 text-amber-600 mx-auto ring-8 ring-amber-50/50">
                <Banknote className="size-10" />
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-amber-700">
                  {isEn ? "Reservation Held · Cash Payment" : "Đã Giữ Chỗ · Chờ Nộp Tiền Mặt"}
                </span>
                <h1 className="display-title text-2xl sm:text-3xl font-black text-slate-900 mt-1">
                  {isEn ? "Reservation Confirmed!" : "Giữ Chỗ Thành Công!"}
                </h1>
                <p className="mt-2 text-xs sm:text-sm text-slate-500 font-light leading-relaxed max-w-md mx-auto">
                  {isEn
                    ? "Your tour booking is saved for 24 hours. Please complete your cash payment using either option below."
                    : "Đơn đặt tour của quý khách đã được lưu và giữ chỗ trong 24 giờ. Vui lòng thanh toán tiền mặt theo 1 trong 2 hình thức bên dưới."}
                </p>
              </div>

              {/* CASH PAYMENT INSTRUCTIONS CARD */}
              <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-[2px] text-left space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-500 pb-2 border-b border-slate-200">
                  <span>{isEn ? "Booking Reference:" : "Mã đơn hàng:"}</span>
                  <span className="font-mono font-bold text-slate-900 text-sm">{bookingCode}</span>
                </div>
                {formattedAmount && (
                  <div className="flex items-center justify-between text-xs text-slate-500 pb-2 border-b border-slate-200">
                    <span>{isEn ? "Cash Amount:" : "Số tiền mặt cần nộp:"}</span>
                    <span className="font-mono font-black text-[#da251d] text-base">{formattedAmount}</span>
                  </div>
                )}
                <div className="flex items-center justify-between text-xs text-slate-500 pb-2 border-b border-slate-200">
                  <span>{isEn ? "Status:" : "Trạng thái:"}</span>
                  <span className="font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded text-[11px]">
                    {isEn ? "RESERVED - PENDING CASH" : "ĐÃ GIỮ CHỖ - CHỜ TIỀN MẶT"}
                  </span>
                </div>

                <div className="pt-1 space-y-2 text-xs text-slate-700">
                  <div className="p-2.5 bg-white rounded border border-slate-200/70">
                    <p className="font-bold text-slate-900 flex items-center gap-1.5">
                      <Building2 className="size-3.5 text-[#0098a2]" />
                      {isEn ? "Option 1: Pay at STAR Travels Offices" : "Cách 1: Nộp trực tiếp tại Văn phòng STAR"}
                    </p>
                    <p className="text-[11px] text-slate-500 mt-1">
                      {isEn
                        ? "Hanoi: STAR Tower, Cau Giay · HCMC: 120 Nguyen Hue, Q.1 (08:00 - 18:00)"
                        : "Hà Nội: STAR Tower, Cầu Giấy · TP.HCM: 120 Nguyễn Huệ, Q.1 (08:00 - 18:00)"}
                    </p>
                  </div>
                  <div className="p-2.5 bg-white rounded border border-slate-200/70">
                    <p className="font-bold text-slate-900 flex items-center gap-1.5">
                      <UserCheck className="size-3.5 text-amber-600" />
                      {isEn ? "Option 2: Pay to Tour Guide on Departure" : "Cách 2: Thanh toán cho Hướng dẫn viên khi đón tour"}
                    </p>
                    <p className="text-[11px] text-slate-500 mt-1">
                      {isEn
                        ? "Settle 100% in cash directly with the Tour Leader at the airport/meeting point."
                        : "Thanh toán 100% tiền mặt cho HDV tại điểm đón/sân bay vào ngày khởi hành."}
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link
                  href={`/booking/${encodeURIComponent(bookingCode)}/payment?gateway=vietqr`}
                  className="w-full sm:w-auto px-5 py-2.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs sm:text-sm font-semibold rounded-[2px] transition flex items-center justify-center gap-1.5"
                >
                  <QrCode className="size-4 text-[#0098a2]" />
                  <span>{isEn ? "Switch to QR Transfer" : "Đổi Sang Chuyển Khoản QR"}</span>
                </Link>

                <Link
                  href="/account/bookings"
                  className="w-full sm:w-auto px-5 py-2.5 bg-[#0098a2] hover:bg-[#00828a] text-white text-xs sm:text-sm font-bold rounded-[2px] transition flex items-center justify-center gap-1.5"
                >
                  <CalendarCheck className="size-4" />
                  <span>{isEn ? "View My Bookings" : "Xem Danh Sách Đơn"}</span>
                </Link>
              </div>
            </>
          ) : (
            <>
              <div className="flex size-20 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 mx-auto ring-8 ring-emerald-50/50">
                <CheckCircle2 className="size-10" />
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-emerald-700">
                  {isEn ? "Payment Completed" : "Thanh Toán Thành Công"}
                </span>
                <h1 className="display-title text-2xl sm:text-3xl font-black text-slate-900 mt-1">
                  {isEn ? "Your Adventure Awaits!" : "Đơn Đặt Chỗ Đã Được Xác Nhận!"}
                </h1>
                <p className="mt-2 text-xs sm:text-sm text-slate-500 font-light leading-relaxed max-w-md mx-auto">
                  {isEn
                    ? "Thank you for your payment. We have verified your transaction and sent full details to your email."
                    : "Cảm ơn quý khách đã thanh toán. Giao dịch đã được hệ thống kiểm tra và xác nhận. Thông tin chi tiết vé tour đã được gửi tới email của quý khách."}
                </p>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-[2px] inline-block w-full text-left">
                <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                  <span>{isEn ? "Booking Reference:" : "Mã đơn hàng:"}</span>
                  <span className="font-mono font-bold text-slate-900 text-sm">{bookingCode}</span>
                </div>
                {formattedAmount && (
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                    <span>{isEn ? "Paid Amount:" : "Số tiền đã trả:"}</span>
                    <span className="font-mono font-bold text-emerald-700 text-sm">{formattedAmount}</span>
                  </div>
                )}
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>{isEn ? "Status:" : "Trạng thái:"}</span>
                  <span className="font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded text-[11px]">
                    {isEn ? "PAID & CONFIRMED" : "ĐÃ THANH TOÁN & XÁC NHẬN"}
                  </span>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link
                  href="/account/bookings"
                  className="w-full sm:w-auto px-5 py-2.5 bg-[#0098a2] hover:bg-[#00828a] text-white text-xs sm:text-sm font-bold rounded-[2px] transition flex items-center justify-center gap-1.5"
                >
                  <CalendarCheck className="size-4" />
                  <span>{isEn ? "View My Bookings" : "Xem Danh Sách Đơn"}</span>
                </Link>

                <Link
                  href="/"
                  className="w-full sm:w-auto px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs sm:text-sm font-semibold rounded-[2px] transition flex items-center justify-center gap-1.5"
                >
                  <Home className="size-4" />
                  <span>{isEn ? "Return Home" : "Về Trang Chủ"}</span>
                </Link>
              </div>
            </>
          )}
        </div>
      </main>
    </>
  );
}
