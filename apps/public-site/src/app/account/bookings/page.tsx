import Link from "next/link";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import {
  CalendarCheck,
  Clock,
  CheckCircle2,
  ShieldCheck,
  XCircle,
  QrCode,
  Banknote,
  ArrowRight,
  Compass,
  Building2,
  Receipt,
} from "lucide-react";
import { SiteHeader } from "@/components/layout/site-header";
import { getCurrentUser, authenticatedFetch } from "@/lib/auth";

interface BookingItem {
  id?: string;
  booking_code: string;
  tour_title: string;
  tour_slug?: string;
  departure_date: string;
  pax_adults: number;
  pax_children: number;
  total_amount: number;
  currency: string;
  status: "pending" | "paid" | "confirmed" | "completed" | "cancelled" | string;
  payment_method?: string;
  payment_status?: string;
  created_at: string;
}

export default async function AccountBookingsPage() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login?returnUrl=/account/bookings&reason=view_booking");
  }

  const cookieStore = await cookies();
  const isEn = cookieStore.get("star_travels_locale")?.value === "en";

  // Fetch real synchronized bookings from Django DB via authenticated API
  let bookings: BookingItem[] = [];
  try {
    const res = await authenticatedFetch("/bookings/");
    if (res.ok) {
      const data = await res.json();
      const rows = Array.isArray(data) ? data : data.results || [];
      bookings = rows.map((b: any) => ({
        id: b.id,
        booking_code: b.booking_code,
        tour_title: b.tour_title || b.tour?.title || "Tour Khám Phá STAR Travels",
        tour_slug: b.tour_slug || b.tour?.slug,
        departure_date: b.departure_date || "",
        pax_adults: Number(b.pax_adults || 1),
        pax_children: Number(b.pax_children || 0),
        total_amount: Number(b.total_amount || 0),
        currency: b.currency || "VND",
        status: b.status || "pending",
        payment_method: b.payment_method || "vietqr",
        payment_status: b.payment_status || "unpaid",
        created_at: b.created_at || "",
      }));
    }
  } catch (err) {
    // Graceful offline or unlinked state: zero fake mock data
    bookings = [];
  }

  return (
    <>
      <SiteHeader overlay={false} />
      <main className="min-h-screen bg-[#faf8f5] text-[#282828] px-4 sm:px-6 py-8 sm:py-12 md:px-12 lg:px-16">
        <div className="mx-auto max-w-5xl space-y-8">
          {/* TOP BREADCRUMB & HEADER */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#e5dccb] pb-6">
            <div>
              <div className="flex items-center gap-2 text-xs text-slate-500 mb-1.5 font-medium">
                <Link href="/account" className="hover:text-amber-800 transition">
                  {isEn ? "Account" : "Tài khoản"}
                </Link>
                <span>/</span>
                <span className="text-slate-900 font-semibold">
                  {isEn ? "Bookings" : "Lịch sử đặt chỗ"}
                </span>
              </div>
              <h1 className="script-title text-3xl sm:text-4xl font-extrabold text-[#0f172a] leading-tight">
                {isEn ? "My Tour Bookings" : "Đơn Đặt Tour Của Tôi"}
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 font-normal">
                {isEn
                  ? `Authenticated traveler: ${user.username} (${user.email || "Active Member"})`
                  : `Hồ sơ du khách: ${user.username} (${user.email || "Thành viên STAR"})`}
              </p>
            </div>

            <Link
              href="/tours"
              className="px-4 py-2.5 bg-[#da251d] hover:bg-[#b01b14] text-white text-xs sm:text-sm font-bold rounded-[2px] transition flex items-center gap-2 self-start sm:self-auto shadow-xs hover:scale-[1.02]"
            >
              <Compass className="size-4" />
              <span>{isEn ? "Explore More Tours" : "Khám Phá Thêm Tour"}</span>
            </Link>
          </div>

          {/* REAL BOOKINGS LIST OR LUXURY EMPTY STATE */}
          {bookings.length > 0 ? (
            <div className="space-y-4">
              {bookings.map((b) => {
                const isPending = b.status === "pending";
                const isPaid = b.status === "paid";
                const isConfirmed = b.status === "confirmed";
                const isCompleted = b.status === "completed";
                const isCancelled = b.status === "cancelled";

                return (
                  <div
                    key={b.booking_code}
                    className="bg-white/95 p-6 rounded-[2px] shadow-xs border border-[#e5dccb] backdrop-blur-md flex flex-col md:flex-row md:items-center justify-between gap-6 transition hover:shadow-md hover:border-amber-300"
                  >
                    <div className="space-y-2.5 min-w-0">
                      <div className="flex flex-wrap items-center gap-2.5">
                        <span className="font-mono font-bold text-slate-900 text-xs sm:text-sm bg-[#faf8f5] border border-[#e5dccb] px-2.5 py-1 rounded-[2px]">
                          {b.booking_code}
                        </span>

                        {/* DISTINCT STATUS BADGES */}
                        {isPending && (
                          b.payment_method === "cash" ? (
                            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-900 bg-amber-50 border border-amber-300 px-2.5 py-0.5 rounded-[2px]">
                              <Banknote className="size-3.5 text-amber-700" />
                              <span>{isEn ? "Reserved (Cash Payment)" : "Đã giữ chỗ (Nộp tiền mặt)"}</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-900 bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-[2px]">
                              <Clock className="size-3.5 text-blue-700" />
                              <span>{isEn ? "Pending Payment (VietQR)" : "Chờ thanh toán (Mã QR / VietQR)"}</span>
                            </span>
                          )
                        )}

                        {isPaid && (
                          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-900 bg-emerald-50 border border-emerald-300 px-2.5 py-0.5 rounded-[2px]">
                            <CheckCircle2 className="size-3.5 text-emerald-700" />
                            <span>{isEn ? "Paid (Awaiting Departure)" : "Đã thanh toán"}</span>
                          </span>
                        )}

                        {isConfirmed && (
                          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-900 bg-emerald-50 border border-emerald-300 px-2.5 py-0.5 rounded-[2px]">
                            <ShieldCheck className="size-3.5 text-emerald-700" />
                            <span>{isEn ? "Confirmed" : "Đã xác nhận"}</span>
                          </span>
                        )}

                        {isCompleted && (
                          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 bg-slate-100 border border-slate-200 px-2.5 py-0.5 rounded-[2px]">
                            <CalendarCheck className="size-3.5 text-slate-500" />
                            <span>{isEn ? "Completed" : "Hoàn thành"}</span>
                          </span>
                        )}

                        {isCancelled && (
                          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-800 bg-red-50 border border-red-200 px-2.5 py-0.5 rounded-[2px]">
                            <XCircle className="size-3.5 text-red-600" />
                            <span>{isEn ? "Cancelled" : "Đã hủy"}</span>
                          </span>
                        )}
                      </div>

                      <h3 className="script-title text-xl sm:text-2xl font-bold text-[#0f172a] hover:text-[#da251d] transition-colors">
                        {b.tour_slug ? (
                          <Link href={`/tours/${b.tour_slug}`}>{b.tour_title}</Link>
                        ) : (
                          b.tour_title
                        )}
                      </h3>

                      <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 font-normal">
                        {b.departure_date && (
                          <>
                            <span>
                              {isEn ? "Departure:" : "Khởi hành:"}{" "}
                              <strong className="font-semibold text-slate-800">
                                {b.departure_date}
                              </strong>
                            </span>
                            <span>•</span>
                          </>
                        )}
                        <span>
                          {isEn ? "Guests:" : "Số khách:"}{" "}
                          <strong className="font-semibold text-slate-800">
                            {b.pax_adults} {isEn ? "adults" : "người lớn"}
                            {b.pax_children > 0 && `, ${b.pax_children} ${isEn ? "children" : "trẻ em"}`}
                          </strong>
                        </span>
                        <span>•</span>
                        <span>
                          {isEn ? "Total:" : "Tổng tiền:"}{" "}
                          <strong className="font-bold text-[#da251d] text-sm">
                            {b.total_amount.toLocaleString("vi-VN")} {b.currency}
                          </strong>
                        </span>
                      </div>
                    </div>

                    {/* ACTION BUTTONS */}
                    <div className="flex items-center gap-3 pt-3 md:pt-0 border-t md:border-t-0 border-[#f0ebd9] shrink-0">
                      {isPending ? (
                        b.payment_method === "cash" ? (
                          <Link
                            href={`/booking/${encodeURIComponent(b.booking_code)}/payment?gateway=cash&amount=${b.total_amount}`}
                            className="w-full md:w-auto px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-[2px] transition flex items-center justify-center gap-2 shadow-xs"
                          >
                            <Banknote className="size-4" />
                            <span>{isEn ? "View Cash Voucher" : "Xem Phiếu Nộp Tiền"}</span>
                            <ArrowRight className="size-3.5" />
                          </Link>
                        ) : (
                          <Link
                            href={`/booking/${encodeURIComponent(b.booking_code)}/payment?gateway=vietqr&amount=${b.total_amount}`}
                            className="w-full md:w-auto px-4 py-2 bg-[#da251d] hover:bg-[#b01b14] text-white text-xs font-bold rounded-[2px] transition flex items-center justify-center gap-2 shadow-xs"
                          >
                            <QrCode className="size-4" />
                            <span>{isEn ? "Pay with VietQR" : "Thanh Toán VietQR"}</span>
                            <ArrowRight className="size-3.5" />
                          </Link>
                        )
                      ) : (
                        <Link
                          href={`/booking/${encodeURIComponent(b.booking_code)}/success`}
                          className="w-full md:w-auto px-4 py-2 bg-white hover:bg-slate-50 text-slate-800 text-xs font-semibold rounded-[2px] border border-[#e5dccb] transition flex items-center justify-center gap-1.5 shadow-xs"
                        >
                          <Receipt className="size-3.5 text-slate-600" />
                          <span>{isEn ? "View Receipt" : "Xem Hóa Đơn & Vé"}</span>
                        </Link>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* ── REAL DATABASE EMPTY STATE (NO MOCK DATA) ── */
            <div className="rounded-[2px] bg-white/95 p-10 sm:p-14 text-center border border-[#e5dccb] shadow-xs backdrop-blur-md">
              <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-amber-50 border border-amber-200/80 text-amber-700 mb-4 shadow-xs">
                <CalendarCheck className="size-8 text-amber-600" />
              </div>

              <h2 className="script-title text-2xl sm:text-3xl font-extrabold text-[#0f172a]">
                {isEn ? "No Tour Bookings Yet" : "Quý khách chưa có đơn đặt tour nào"}
              </h2>

              <p className="mt-2 text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                {isEn
                  ? "When you book curated tour packages or bespoke experiences, your reservation codes, VietQR payment invoices, and flight/itinerary vouchers will sync right here."
                  : "Mọi thông tin đơn hàng, mã QR chuyển khoản VietQR và vé hành trình của bạn sẽ được tự động đồng bộ và hiển thị tại đây ngay khi bạn đặt tour."}
              </p>

              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                <Link
                  href="/tours"
                  className="px-5 py-2.5 bg-[#da251d] hover:bg-[#b01b14] text-white text-xs sm:text-sm font-bold uppercase tracking-wider rounded-[2px] transition shadow-xs flex items-center gap-2"
                >
                  <Compass className="size-4" />
                  <span>{isEn ? "Explore Tours" : "Khám Phá Tour Tuyển Chọn"}</span>
                </Link>

                <Link
                  href="/accommodations"
                  className="px-5 py-2.5 bg-white hover:bg-amber-50/60 text-slate-800 text-xs sm:text-sm font-bold uppercase tracking-wider rounded-[2px] border border-[#e5dccb] transition shadow-xs flex items-center gap-2"
                >
                  <Building2 className="size-4 text-amber-600" />
                  <span>{isEn ? "Luxury Stays" : "Khách Sạn & Resort Di Sản"}</span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
