import Link from "next/link";
import { cookies } from "next/headers";
import { CheckCircle2, ArrowRight, Home, CalendarCheck } from "lucide-react";
import { SiteHeader } from "@/components/layout/site-header";

interface SuccessPageProps {
  params: Promise<{ id: string }>;
}

export default async function BookingSuccessPage({ params }: SuccessPageProps) {
  const resolvedParams = await params;
  const bookingCode = decodeURIComponent(resolvedParams.id);

  const cookieStore = await cookies();
  const isEn = cookieStore.get("star_travels_locale")?.value === "en";

  return (
    <>
      <SiteHeader overlay={false} />
      <main className="template-page-bg min-h-screen text-[#282828] px-4 sm:px-6 py-12 sm:py-20 md:px-12 lg:px-16 flex items-center justify-center">
        <div className="mx-auto max-w-xl w-full bg-white/95 p-8 sm:p-12 rounded-[2px] shadow-sm border border-slate-100 backdrop-blur-md text-center space-y-6">
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
        </div>
      </main>
    </>
  );
}
