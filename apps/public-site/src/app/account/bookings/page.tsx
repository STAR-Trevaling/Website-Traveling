import Link from "next/link";
import { cookies } from "next/headers";
import {
  CalendarCheck,
  Clock,
  CheckCircle2,
  ShieldCheck,
  XCircle,
  QrCode,
  ArrowRight,
  Compass,
  AlertCircle,
} from "lucide-react";
import { SiteHeader } from "@/components/layout/site-header";
import { getCurrentUser } from "@/lib/auth";

interface BookingItem {
  booking_code: string;
  tour_title: string;
  departure_date: string;
  pax_adults: number;
  total_amount: number;
  currency: string;
  status: "pending" | "paid" | "confirmed" | "completed" | "cancelled";
  payment_method?: string;
  created_at: string;
}

const DEMO_BOOKINGS: BookingItem[] = [
  {
    booking_code: "ST-202610-A89F",
    tour_title: "Hành Trình Di Sản Miền Trung: Huế - Hội An - Đà Nẵng",
    departure_date: "2026-10-25",
    pax_adults: 2,
    total_amount: 7200000,
    currency: "VND",
    status: "pending",
    payment_method: "vietqr",
    created_at: "2026-10-08T18:30:00Z",
  },
  {
    booking_code: "ST-202609-B41C",
    tour_title: "Thám Hiểm Vịnh Hạ Long & Lan Hạ Trên Du Thuyền 5 Sao",
    departure_date: "2026-11-05",
    pax_adults: 2,
    total_amount: 11600000,
    currency: "VND",
    status: "paid",
    payment_method: "vnpay",
    created_at: "2026-09-28T14:15:00Z",
  },
  {
    booking_code: "ST-202608-K12D",
    tour_title: "Mùa Vàng Mù Cang Chải & Sapa Hùng Vĩ",
    departure_date: "2026-09-15",
    pax_adults: 1,
    total_amount: 4500000,
    currency: "VND",
    status: "completed",
    payment_method: "vnpay",
    created_at: "2026-08-20T10:00:00Z",
  },
];

export default async function AccountBookingsPage() {
  const user = await getCurrentUser();
  const cookieStore = await cookies();
  const isEn = cookieStore.get("star_travels_locale")?.value === "en";

  return (
    <>
      <SiteHeader overlay={false} />
      <main className="template-page-bg min-h-screen text-[#282828] px-4 sm:px-6 py-8 sm:py-12 md:px-12 lg:px-16">
        <div className="mx-auto max-w-5xl space-y-8">
          {/* TOP BREADCRUMB & HEADER */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                <Link href="/account" className="hover:text-slate-800 transition">
                  {isEn ? "Account" : "Tài khoản"}
                </Link>
                <span>/</span>
                <span className="text-slate-800 font-medium">
                  {isEn ? "Bookings" : "Lịch sử đặt chỗ"}
                </span>
              </div>
              <h1 className="display-title text-2xl sm:text-3xl font-black text-[#1e293b]">
                {isEn ? "My Tour Bookings" : "Đơn Đặt Tour Của Tôi"}
              </h1>
            </div>

            <Link
              href="/tours"
              className="px-4 py-2 bg-[#0098a2] hover:bg-[#00828a] text-white text-xs sm:text-sm font-bold rounded-[2px] transition flex items-center gap-1.5 self-start sm:self-auto"
            >
              <Compass className="size-4" />
              <span>{isEn ? "Explore More Tours" : "Khám Phá Tour Mới"}</span>
            </Link>
          </div>

          {/* BOOKINGS LIST */}
          <div className="space-y-4">
            {DEMO_BOOKINGS.map((b) => {
              const isPending = b.status === "pending";
              const isPaid = b.status === "paid";
              const isConfirmed = b.status === "confirmed";
              const isCompleted = b.status === "completed";
              const isCancelled = b.status === "cancelled";

              return (
                <div
                  key={b.booking_code}
                  className="bg-white/95 p-6 rounded-[2px] shadow-sm border border-slate-100 backdrop-blur-md flex flex-col md:flex-row md:items-center justify-between gap-6 transition hover:shadow-md"
                >
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="font-mono font-bold text-slate-900 text-sm bg-slate-100 px-2.5 py-1 rounded">
                        {b.booking_code}
                      </span>

                      {/* DISTINCT STATUS BADGES */}
                      {isPending && (
                        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-900 bg-amber-100 border border-amber-300 px-2.5 py-0.5 rounded">
                          <Clock className="size-3.5 text-amber-700" />
                          {isEn
                            ? "Pending Payment (VietQR Awaiting)"
                            : "Chờ thanh toán / Đang chờ xác nhận VietQR"}
                        </span>
                      )}

                      {isPaid && (
                        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-900 bg-emerald-100 border border-emerald-300 px-2.5 py-0.5 rounded">
                          <CheckCircle2 className="size-3.5 text-emerald-700" />
                          {isEn ? "Paid (Awaiting Departure)" : "Đã thanh toán"}
                        </span>
                      )}

                      {isConfirmed && (
                        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-900 bg-emerald-100 border border-emerald-300 px-2.5 py-0.5 rounded">
                          <ShieldCheck className="size-3.5 text-emerald-700" />
                          {isEn ? "Confirmed" : "Đã xác nhận"}
                        </span>
                      )}

                      {isCompleted && (
                        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 bg-slate-100 border border-slate-200 px-2.5 py-0.5 rounded">
                          <CalendarCheck className="size-3.5 text-slate-500" />
                          {isEn ? "Completed" : "Hoàn thành"}
                        </span>
                      )}

                      {isCancelled && (
                        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-800 bg-red-100 border border-red-200 px-2.5 py-0.5 rounded">
                          <XCircle className="size-3.5 text-red-600" />
                          {isEn ? "Cancelled" : "Đã hủy"}
                        </span>
                      )}
                    </div>

                    <h3 className="display-title text-base sm:text-lg font-bold text-slate-900">
                      {b.tour_title}
                    </h3>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 font-light">
                      <span>
                        {isEn ? "Departure:" : "Khởi hành:"}{" "}
                        <strong className="font-semibold text-slate-700">
                          {b.departure_date}
                        </strong>
                      </span>
                      <span>•</span>
                      <span>
                        {isEn ? "Guests:" : "Số khách:"}{" "}
                        <strong className="font-semibold text-slate-700">
                          {b.pax_adults} {isEn ? "adults" : "người lớn"}
                        </strong>
                      </span>
                      <span>•</span>
                      <span>
                        {isEn ? "Total:" : "Tổng tiền:"}{" "}
                        <strong className="font-mono font-bold text-amber-700 text-sm">
                          {b.total_amount.toLocaleString("vi-VN")} {b.currency}
                        </strong>
                      </span>
                    </div>
                  </div>

                  {/* ACTION BUTTONS */}
                  <div className="flex items-center gap-3 pt-2 md:pt-0 border-t md:border-t-0 border-slate-100">
                    {isPending ? (
                      <Link
                        href={`/booking/${encodeURIComponent(b.booking_code)}/payment?amount=${b.total_amount}`}
                        className="w-full md:w-auto px-4 py-2 bg-[#0098a2] hover:bg-[#00828a] text-white text-xs font-bold rounded-[2px] transition flex items-center justify-center gap-2 shadow-sm"
                      >
                        <QrCode className="size-4" />
                        <span>{isEn ? "Pay Now (VietQR / VNPay)" : "Thanh Toán Ngay"}</span>
                        <ArrowRight className="size-3.5" />
                      </Link>
                    ) : (
                      <Link
                        href={`/booking/${encodeURIComponent(b.booking_code)}/success`}
                        className="w-full md:w-auto px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-[2px] transition flex items-center justify-center gap-1.5"
                      >
                        <span>{isEn ? "View Receipt" : "Xem Hóa Đơn"}</span>
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </>
  );
}
