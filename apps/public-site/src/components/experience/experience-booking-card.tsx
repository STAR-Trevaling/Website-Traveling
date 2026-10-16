"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Calendar, ShieldCheck, Check, Clock, Sparkles, QrCode, Banknote, ArrowRight } from "lucide-react";
import type { Place, CurrentUser } from "@/lib/types";
import { useLanguage } from "@/lib/i18n/context";

interface ExperienceBookingCardProps {
  place: Place;
  user?: CurrentUser | null;
}

export function ExperienceBookingCard({ place, user }: ExperienceBookingCardProps) {
  const router = useRouter();
  const { t, isEnglish } = useLanguage();
  const [guests, setGuests] = useState(2);
  const [date, setDate] = useState("2026-10-15");
  const [session, setSession] = useState("morning");
  const [paymentMethod, setPaymentMethod] = useState<"vietqr" | "cash">("vietqr");
  const [submitting, setSubmitting] = useState(false);
  const [booked, setBooked] = useState(false);

  const basePrice = Number(place.destination?.starting_price || 650000);
  const totalPrice = basePrice * guests;
  const b = t.experienceDetailPage.bookingCard;

  const formatPrice = (amount: number) => {
    return isEnglish
      ? `${amount.toLocaleString("en-US")} VND`
      : `${amount.toLocaleString("vi-VN")}đ`;
  };

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      const currentUrl = `/experiences/${encodeURIComponent(place.slug || String(place.id))}`;
      router.push(`/login?returnUrl=${encodeURIComponent(currentUrl)}&reason=booking`);
      return;
    }
    setSubmitting(true);
    const bookingCode = `STAR-EXP-${String(place.id || "ACT").slice(0, 4).toUpperCase()}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;
    router.push(`/booking/${encodeURIComponent(bookingCode)}/payment?gateway=${paymentMethod}&amount=${totalPrice}`);
  };

  return (
    <div className="rounded-[2px] bg-white p-7 shadow-lg border border-slate-100">
      <div className="flex items-baseline justify-between border-b border-slate-100 pb-5">
        <div>
          <span className="text-xs uppercase tracking-wider text-slate-500 font-medium">
            {b.priceFrom}
          </span>
          <div className="text-2xl font-black text-slate-900">
            {formatPrice(basePrice)}
            <span className="text-xs font-normal text-slate-500"> {b.perPerson}</span>
          </div>
        </div>
        <div className="flex items-center gap-1 text-xs font-semibold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-[2px]">
          <span>★</span>
          <span>{Number(place.average_rating || 5.0).toFixed(1)}</span>
        </div>
      </div>

      {booked ? (
        <div className="py-6 text-center space-y-4">
          <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
            <Check className="size-6 stroke-[2.5]" />
          </div>
          <h3 className="display-title text-xl font-bold text-slate-900">
            {b.successMsg}
          </h3>
          <p className="text-xs text-slate-600 font-light leading-relaxed">
            {isEnglish
              ? `We have received your reservation for ${guests} guests on ${date}. Our local host will contact you before 18:00 on the prior day.`
              : `Chúng tôi đã tiếp nhận yêu cầu đặt chỗ cho ${guests} khách vào ngày ${date}. Hướng dẫn viên bản địa sẽ gọi xác nhận đón bạn trước 18:00 ngày hôm trước.`}
          </p>
          <button
            onClick={() => setBooked(false)}
            className="w-full bg-[#1e293b] text-white py-3 text-xs font-semibold uppercase tracking-widest rounded-[2px] shadow-sm transition-all duration-200 hover:bg-slate-800 hover:shadow-[0px_8px_25px_rgba(15,23,42,0.30)] hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
          >
            {isEnglish ? "Make Another Booking" : "Đặt Thêm Suất Khác"}
          </button>
        </div>
      ) : (
        <form onSubmit={handleBooking} className="mt-5 space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
              {b.selectDate}
            </label>
            <div className="relative">
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full rounded-[2px] border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs text-slate-800 outline-none focus:border-[#da251d] focus:bg-white"
              />
              <Calendar className="pointer-events-none absolute right-3 top-2.5 size-4 text-slate-400" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
              {isEnglish ? "Experience Session" : "Khung giờ trải nghiệm"}
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setSession("morning")}
                className={`py-2 px-3 text-xs font-medium rounded-[2px] border transition cursor-pointer ${
                  session === "morning"
                    ? "border-slate-900 bg-slate-900 text-white"
                    : "border-slate-200 text-slate-600 hover:bg-slate-50"
                }`}
              >
                {isEnglish ? "Morning (08:00 - 12:00)" : "Buổi Sáng (08:00 - 12:00)"}
              </button>
              <button
                type="button"
                onClick={() => setSession("afternoon")}
                className={`py-2 px-3 text-xs font-medium rounded-[2px] border transition cursor-pointer ${
                  session === "afternoon"
                    ? "border-slate-900 bg-slate-900 text-white"
                    : "border-slate-200 text-slate-600 hover:bg-slate-50"
                }`}
              >
                {isEnglish ? "Sunset (14:30 - 18:30)" : "Hoàng Hôn (14:30 - 18:30)"}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
              {b.guests}
            </label>
            <div className="flex items-center justify-between rounded-[2px] border border-slate-200 bg-slate-50 px-3 py-2">
              <span className="text-xs text-slate-700 font-medium">
                {isEnglish ? "Participants" : "Khách tham gia"}
              </span>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setGuests(Math.max(1, guests - 1))}
                  className="flex size-7 items-center justify-center rounded border border-slate-300 bg-white text-slate-700 hover:bg-slate-100 cursor-pointer"
                >
                  -
                </button>
                <span className="w-5 text-center text-xs font-bold text-slate-800">
                  {guests}
                </span>
                <button
                  type="button"
                  onClick={() => setGuests(Math.min(20, guests + 1))}
                  className="flex size-7 items-center justify-center rounded border border-slate-300 bg-white text-slate-700 hover:bg-slate-100 cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* PHƯƠNG THỨC THANH TOÁN (2 TRƯỜNG HỢP: QR HOẶC TIỀN MẶT) */}
          <div className="pt-3 border-t border-slate-100">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-800 mb-2">
              {isEnglish ? "Payment Method *" : "Phương Thức Thanh Toán *"}
            </label>
            <div className="grid grid-cols-2 gap-2">
              {/* TRƯỜNG HỢP 1: CHUYỂN KHOẢN QR */}
              <button
                type="button"
                onClick={() => setPaymentMethod("vietqr")}
                className={`p-2.5 rounded-[2px] border text-left transition cursor-pointer flex items-center gap-2 ${
                  paymentMethod === "vietqr"
                    ? "border-[#0098a2] bg-[#0098a2]/5 ring-1 ring-[#0098a2] shadow-sm"
                    : "border-slate-200 bg-white hover:border-slate-300"
                }`}
              >
                <div
                  className={`p-1.5 rounded shrink-0 ${
                    paymentMethod === "vietqr" ? "bg-[#0098a2] text-white" : "bg-slate-100 text-slate-600"
                  }`}
                >
                  <QrCode className="size-4" />
                </div>
                <div className="min-w-0">
                  <span className="text-xs font-bold text-slate-900 block truncate">
                    {isEnglish ? "QR Transfer" : "Chuyển khoản QR"}
                  </span>
                  <span className="text-[10px] text-emerald-700 block">
                    {isEnglish ? "Auto 24/7" : "Tự động 24/7"}
                  </span>
                </div>
              </button>

              {/* TRƯỜNG HỢP 2: TIỀN MẶT */}
              <button
                type="button"
                onClick={() => setPaymentMethod("cash")}
                className={`p-2.5 rounded-[2px] border text-left transition cursor-pointer flex items-center gap-2 ${
                  paymentMethod === "cash"
                    ? "border-[#0098a2] bg-[#0098a2]/5 ring-1 ring-[#0098a2] shadow-sm"
                    : "border-slate-200 bg-white hover:border-slate-300"
                }`}
              >
                <div
                  className={`p-1.5 rounded shrink-0 ${
                    paymentMethod === "cash" ? "bg-amber-600 text-white" : "bg-slate-100 text-slate-600"
                  }`}
                >
                  <Banknote className="size-4" />
                </div>
                <div className="min-w-0">
                  <span className="text-xs font-bold text-slate-900 block truncate">
                    {isEnglish ? "Cash Payment" : "Tiền mặt"}
                  </span>
                  <span className="text-[10px] text-amber-700 block">
                    {isEnglish ? "Office / Guide" : "Tại quầy / HDV"}
                  </span>
                </div>
              </button>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between text-xs text-slate-600 mb-1">
              <span>
                {formatPrice(basePrice)} x {guests} {isEnglish ? "guests" : "khách"}
              </span>
              <span>{formatPrice(totalPrice)}</span>
            </div>
            <div className="flex items-center justify-between text-xs text-emerald-600 mb-3">
              <span>{isEnglish ? "Insurance & local guide" : "Bảo hiểm & hướng dẫn viên"}</span>
              <span>{isEnglish ? "Included" : "Miễn phí"}</span>
            </div>
            <div className="flex items-center justify-between text-sm font-bold text-slate-900 pt-2 border-t border-slate-200">
              <span>{b.total}:</span>
              <span className="text-lg font-black text-slate-900">{formatPrice(totalPrice)}</span>
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-[#da251d] text-white py-3.5 text-xs font-bold tracking-widest uppercase rounded-[2px] shadow-sm transition-all duration-200 hover:bg-[#c92018] hover:shadow-[0px_8px_25px_rgba(218,37,29,0.35)] hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
          >
            <span>
              {submitting
                ? (isEnglish ? "PROCESSING..." : "ĐANG XỬ LÝ...")
                : !user
                ? (isEnglish ? "SIGN IN TO RESERVE" : "ĐĂNG NHẬP ĐỂ ĐẶT CHỖ")
                : paymentMethod === "vietqr"
                ? (isEnglish ? "PAY WITH QR CODE" : "TIẾN HÀNH THANH TOÁN QR")
                : (isEnglish ? "CONFIRM CASH RESERVATION" : "GIỮ CHỖ & NỘP TIỀN MẶT")}
            </span>
            <ArrowRight className="size-4" />
          </button>

          {!user && (
            <p className="mt-2 text-center text-[11px] text-slate-500 font-light">
              {isEnglish
                ? "Browsing as guest. Sign in required to complete reservation."
                : "Đang xem với tư cách khách vãng lai. Vui lòng đăng nhập để đặt chỗ."}
            </p>
          )}
        </form>
      )}

      <div className="mt-6 space-y-2.5 pt-4 border-t border-slate-100 text-[11px] text-slate-500">
        <div className="flex items-center gap-2">
          <ShieldCheck className="size-3.5 text-emerald-600 shrink-0" />
          <span>
            {isEnglish
              ? "Instant reservation & confirmation email"
              : "Cam kết giữ chỗ tức thì & xác nhận qua email"}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="size-3.5 text-slate-400 shrink-0" />
          <span>
            {isEnglish ? "Free cancellation 48h prior" : "Hủy miễn phí trước 48 giờ"}
          </span>
        </div>
      </div>
    </div>
  );
}
