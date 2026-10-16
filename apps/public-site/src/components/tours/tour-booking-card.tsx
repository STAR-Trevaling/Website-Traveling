"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Users, Calendar, ShieldCheck, Check, QrCode, Banknote, ArrowRight, Sparkles } from "lucide-react";
import type { TourItem } from "@/data/seed";
import type { CurrentUser } from "@/lib/types";
import { useLanguage } from "@/lib/i18n/context";
import { submitInquiry } from "@/app/actions";
import { publicApi } from "@/lib/api";
import { getStoredUtm } from "@/lib/utm";


interface TourBookingCardProps {
  tour: TourItem;
  user?: CurrentUser | null;
}

export function TourBookingCard({ tour, user }: TourBookingCardProps) {
  const router = useRouter();
  const { t, isEnglish } = useLanguage();
  const [adults, setAdults] = useState<number>(2);
  const [children, setChildren] = useState<number>(0);
  const [departureDate, setDepartureDate] = useState<string>("2026-10-15");
  const [paymentMethod, setPaymentMethod] = useState<"vietqr" | "cash">("vietqr");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [fullName, setFullName] = useState<string>(user?.username || "");
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>(user?.email || "");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [consentAgreed, setConsentAgreed] = useState<boolean>(false);

  const pricePerAdult = tour.price;
  const pricePerChild = Math.round(tour.price * 0.75);
  const totalPrice = adults * pricePerAdult + children * pricePerChild;
  const b = t.tourDetailPage.bookingCard;

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consentAgreed) {
      return;
    }
    if (!user) {
      setShowModal(false);
      const currentUrl = `/tours/${encodeURIComponent(tour.slug)}`;
      router.push(`/login?returnUrl=${encodeURIComponent(currentUrl)}&reason=booking`);
      return;
    }
    setIsSubmitting(true);
    let bookingCode = `STAR-${tour.slug.toUpperCase().slice(0, 4)}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;
    const utmData = getStoredUtm();

    try {
      const created = await publicApi.createBooking({
        tour_slug_input: tour.slug,
        contact_name: fullName,
        contact_email: email,
        contact_phone: phone,
        departure_date: departureDate,
        pax_adults: adults,
        pax_children: children,
        special_requests: `Preferred payment: ${paymentMethod}.`,
        metadata: utmData ? { utm: utmData } : undefined,
      });
      if (created?.booking_code) {
        bookingCode = created.booking_code;
      }
    } catch (err) {
      console.warn("Backend booking API unavailable, falling back to local booking code:", err);
    }

    try {
      await submitInquiry({
        name: fullName,
        email: email,
        phone: phone,
        tour: tour.slug,
        travelDate: departureDate,
        guests: adults + children,
        message: `Booking #${bookingCode} via ${paymentMethod === "vietqr" ? "VietQR (Chuyển khoản QR)" : "Tiền mặt (VP / HDV)"}. ${adults} adults, ${children} children. Total: ${totalPrice.toLocaleString()} VND.`,
        inquiry_type: "tour_booking",
        utm: utmData || undefined,
        metadata: utmData ? { utm: utmData } : undefined,
      });
    } catch {
      // Proceed to checkout even in offline/demo mode
    }


    setShowModal(false);
    setIsSubmitting(false);
    router.push(
      `/booking/${encodeURIComponent(bookingCode)}/payment?gateway=${paymentMethod}&amount=${totalPrice}`
    );
  };

  const displayTitle = isEnglish && tour.title_en ? tour.title_en : tour.title;

  return (
    <>
      <div className="rounded-[2px] bg-white p-5 sm:p-7 shadow-md border border-slate-100">
        <div className="flex items-baseline justify-between border-b border-slate-100 pb-4 sm:pb-5">
          <div>
            <span className="text-[11px] text-slate-400 font-light block">{b.priceFrom}</span>
            <div className="flex items-baseline gap-2">
              <span className="script-title text-3xl md:text-4xl font-bold text-[#1e293b]">
                {isEnglish
                  ? `${tour.price.toLocaleString("en-US")} VND`
                  : `${tour.price.toLocaleString("vi-VN")}đ`}
              </span>
              <span className="text-xs text-slate-400 font-light">{b.perPerson}</span>
            </div>
          </div>

          {tour.originalPrice && (
            <span className="text-xs text-slate-400 line-through">
              {isEnglish
                ? `${tour.originalPrice.toLocaleString("en-US")} VND`
                : `${tour.originalPrice.toLocaleString("vi-VN")}đ`}
            </span>
          )}
        </div>

        {/* Form Options */}
        <div className="mt-6 space-y-4">
          {/* Departure Date */}
          <div>
            <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 mb-1.5">
              <Calendar className="size-3.5 text-slate-700" />
              {b.departureDate}
            </label>
            <input
              type="date"
              value={departureDate}
              onChange={(e) => setDepartureDate(e.target.value)}
              className="w-full rounded-[2px] border border-slate-200 px-3 py-2 text-xs md:text-sm text-slate-800 focus:border-[#da251d] focus:outline-none"
            />
          </div>

          {/* Adults Counter */}
          <div className="flex items-center justify-between border-t border-slate-100 pt-3">
            <div>
              <p className="text-xs font-semibold text-slate-800">{b.adults}</p>
              <p className="text-[11px] text-slate-400 font-light">
                {isEnglish ? "Ages 12+" : "> 11 tuổi"}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setAdults(Math.max(1, adults - 1))}
                className="flex size-7 items-center justify-center rounded-[2px] border border-slate-200 text-sm font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                -
              </button>
              <span className="w-5 text-center text-sm font-semibold">{adults}</span>
              <button
                type="button"
                onClick={() => setAdults(adults + 1)}
                className="flex size-7 items-center justify-center rounded-[2px] border border-slate-200 text-sm font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                +
              </button>
            </div>
          </div>

          {/* Children Counter */}
          <div className="flex items-center justify-between border-t border-slate-100 pt-3">
            <div>
              <p className="text-xs font-semibold text-slate-800">{b.children}</p>
              <p className="text-[11px] text-slate-400 font-light">{b.childDiscountNote}</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setChildren(Math.max(0, children - 1))}
                className="flex size-7 items-center justify-center rounded-[2px] border border-slate-200 text-sm font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                -
              </button>
              <span className="w-5 text-center text-sm font-semibold">{children}</span>
              <button
                type="button"
                onClick={() => setChildren(children + 1)}
                className="flex size-7 items-center justify-center rounded-[2px] border border-slate-200 text-sm font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Total Price Estimation */}
        <div className="mt-6 rounded-[2px] bg-slate-50 p-4 border border-slate-100">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-600">{b.totalPrice}:</span>
            <span className="text-lg font-black text-slate-900">
              {isEnglish
                ? `${totalPrice.toLocaleString("en-US")} VND`
                : `${totalPrice.toLocaleString("vi-VN")}đ`}
            </span>
          </div>
          <p className="mt-1 text-[11px] text-slate-400 font-light">
            {isEnglish
              ? "Includes tax, premium service charges, and travel insurance."
              : "Đã bao gồm thuế, phí dịch vụ và bảo hiểm du lịch."}
          </p>
        </div>

        {/* Quick Payment Preference */}
        <div className="mt-4 pt-3 border-t border-slate-100">
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1.5">
            {isEnglish ? "Payment Method" : "Phương Thức Thanh Toán"}:
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setPaymentMethod("vietqr")}
              className={`p-2 rounded-[2px] border text-left flex items-center gap-2 transition cursor-pointer ${
                paymentMethod === "vietqr"
                  ? "border-[#0098a2] bg-[#0098a2]/5 ring-1 ring-[#0098a2] text-slate-900 shadow-sm"
                  : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
              }`}
            >
              <QrCode className="size-4 text-[#0098a2] shrink-0" />
              <div className="min-w-0">
                <span className="text-[11px] font-bold block truncate">
                  {isEnglish ? "QR Transfer" : "Chuyển khoản QR"}
                </span>
                <span className="text-[9px] text-emerald-700 block">
                  {isEnglish ? "Instant 24/7" : "Tự động 24/7"}
                </span>
              </div>
            </button>
            <button
              type="button"
              onClick={() => setPaymentMethod("cash")}
              className={`p-2 rounded-[2px] border text-left flex items-center gap-2 transition cursor-pointer ${
                paymentMethod === "cash"
                  ? "border-[#0098a2] bg-[#0098a2]/5 ring-1 ring-[#0098a2] text-slate-900 shadow-sm"
                  : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
              }`}
            >
              <Banknote className="size-4 text-amber-600 shrink-0" />
              <div className="min-w-0">
                <span className="text-[11px] font-bold block truncate">
                  {isEnglish ? "Cash" : "Tiền mặt"}
                </span>
                <span className="text-[9px] text-amber-700 block">
                  {isEnglish ? "Office / Guide" : "Tại quầy / HDV"}
                </span>
              </div>
            </button>
          </div>
        </div>

        {/* CTA Button */}
        <button
          type="button"
          onClick={() => {
            if (!user) {
              const currentUrl = `/tours/${encodeURIComponent(tour.slug)}`;
              router.push(`/login?returnUrl=${encodeURIComponent(currentUrl)}&reason=booking`);
              return;
            }
            setShowModal(true);
          }}
          className="mt-6 w-full rounded-[2px] bg-[#da251d] py-3.5 text-xs md:text-sm font-bold uppercase tracking-wider text-white shadow-sm transition-all duration-200 hover:bg-[#c92018] hover:shadow-[0px_8px_25px_rgba(218,37,29,0.35)] hover:-translate-y-0.5 active:translate-y-0 cursor-pointer flex items-center justify-center gap-2"
        >
          <span>{user ? b.bookNowBtn : (isEnglish ? "SIGN IN TO BOOK TOUR" : "ĐĂNG NHẬP ĐỂ ĐẶT TOUR")}</span>
          <ArrowRight className="size-4" />
        </button>

        {!user && (
          <p className="mt-2 text-center text-[11px] text-slate-500 font-light">
            {isEnglish
              ? "Browsing as guest. Please sign in to reserve seats."
              : "Đang xem với tư cách khách vãng lai. Vui lòng đăng nhập để đặt tour."}
          </p>
        )}

        <div className="mt-4 flex items-center justify-center gap-1.5 text-[11px] text-slate-400 font-light">
          <ShieldCheck className="size-3.5 text-emerald-600" />
          <span>
            {isEnglish
              ? "Instant reservation · Free cancellation 48h prior"
              : "Giữ chỗ tức thì · Miễn phí hủy trước 48h"}
          </span>
        </div>
      </div>

      {/* BOOKING MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-lg rounded-[2px] bg-white p-5 sm:p-8 shadow-2xl my-8">
            <div className="flex items-start justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-[11px] font-bold text-slate-900 uppercase tracking-wider">
                  {b.bookingModalTitle}
                </span>
                <h3 className="display-title mt-1 text-xl font-bold text-slate-900">
                  {displayTitle}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer text-lg font-bold p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleBookingSubmit} className="mt-5 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {b.fullNameLabel} *
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder={b.fullNamePlaceholder}
                  className="w-full rounded-[2px] border border-slate-200 px-3 py-2 text-sm focus:border-[#da251d] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {b.phoneLabel} *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder={b.phonePlaceholder}
                    className="w-full rounded-[2px] border border-slate-200 px-3 py-2 text-sm focus:border-[#da251d] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {b.emailLabel} *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={b.emailPlaceholder}
                    className="w-full rounded-[2px] border border-slate-200 px-3 py-2 text-sm focus:border-[#da251d] focus:outline-none"
                  />
                </div>
              </div>

              {/* PHƯƠNG THỨC THANH TOÁN (2 TRƯỜNG HỢP: QR HOẶC TIỀN MẶT) */}
              <div className="pt-2 border-t border-slate-100">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-800 mb-2">
                  {isEnglish ? "Choose Payment Method *" : "Phương Thức Thanh Toán *"}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {/* TRƯỜNG HỢP 1: CHUYỂN KHOẢN BẰNG QR */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("vietqr")}
                    aria-pressed={paymentMethod === "vietqr"}
                    className={`p-3 rounded-[2px] border text-left transition cursor-pointer flex flex-col justify-between focus:outline-none focus:ring-2 focus:ring-[#0098a2] ${
                      paymentMethod === "vietqr"
                        ? "border-[#0098a2] bg-[#0098a2]/5 ring-1 ring-[#0098a2] shadow-sm"
                        : "border-slate-200 bg-white hover:border-slate-300"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-1 mb-1.5">
                        <div className="flex items-center gap-2">
                          <div
                            className={`p-1.5 rounded shrink-0 ${
                              paymentMethod === "vietqr"
                                ? "bg-[#0098a2] text-white"
                                : "bg-slate-100 text-slate-600"
                            }`}
                          >
                            <QrCode className="size-4" />
                          </div>
                          <span className="text-xs font-bold text-slate-900">
                            {isEnglish ? "QR Transfer" : "Chuyển khoản QR"}
                          </span>
                        </div>
                        <span className="text-[9px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded">
                          {isEnglish ? "Recommended" : "Khuyên dùng"}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 font-light leading-snug">
                        {isEnglish
                          ? "Scan VietQR via any Vietnam banking app. Automatic 24/7 confirmation."
                          : "Quét mã VietQR bằng app ngân hàng bất kỳ. Tự động kiểm tra & xác nhận 24/7."}
                      </p>
                    </div>
                  </button>

                  {/* TRƯỜNG HỢP 2: TIỀN MẶT */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("cash")}
                    aria-pressed={paymentMethod === "cash"}
                    className={`p-3 rounded-[2px] border text-left transition cursor-pointer flex flex-col justify-between focus:outline-none focus:ring-2 focus:ring-[#0098a2] ${
                      paymentMethod === "cash"
                        ? "border-[#0098a2] bg-[#0098a2]/5 ring-1 ring-[#0098a2] shadow-sm"
                        : "border-slate-200 bg-white hover:border-slate-300"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-1 mb-1.5">
                        <div className="flex items-center gap-2">
                          <div
                            className={`p-1.5 rounded shrink-0 ${
                              paymentMethod === "cash"
                                ? "bg-amber-600 text-white"
                                : "bg-slate-100 text-slate-600"
                            }`}
                          >
                            <Banknote className="size-4" />
                          </div>
                          <span className="text-xs font-bold text-slate-900">
                            {isEnglish ? "Cash Payment" : "Tiền mặt"}
                          </span>
                        </div>
                        <span className="text-[9px] bg-amber-100 text-amber-800 font-bold px-1.5 py-0.5 rounded">
                          {isEnglish ? "Office / Guide" : "Tại quầy / HDV"}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 font-light leading-snug">
                        {isEnglish
                          ? "Pay at STAR Travels offices (HN/HCM/DN) or directly to tour guide on departure."
                          : "Nộp tại văn phòng STAR (HN/HCM/ĐN) hoặc thanh toán trực tiếp cho HDV khi đón tour."}
                      </p>
                    </div>
                  </button>
                </div>
              </div>

              {/* NGHỊ ĐỊNH 13/2023/NĐ-CP & ĐIỀU KHOẢN DỊCH VỤ */}
              <div className="pt-2">
                <label className="flex items-start gap-2.5 text-xs text-slate-600 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    required
                    checked={consentAgreed}
                    onChange={(e) => setConsentAgreed(e.target.checked)}
                    className="mt-0.5 size-4 rounded-[2px] border-slate-300 text-[#da251d] focus:ring-[#da251d] cursor-pointer"
                  />
                  <span className="leading-snug">
                    {isEnglish ? (
                      <>
                        I have read and agree to the{" "}
                        <a href="/terms" target="_blank" rel="noopener noreferrer" className="font-semibold text-[#da251d] underline hover:text-[#b81d16]">
                          Terms of Service
                        </a>{" "}
                        and consent to personal data processing per{" "}
                        <a href="/privacy" target="_blank" rel="noopener noreferrer" className="font-semibold text-[#da251d] underline hover:text-[#b81d16]">
                          Decree 13/2023/ND-CP
                        </a>
                        . *
                      </>
                    ) : (
                      <>
                        Tôi đã đọc và đồng ý với{" "}
                        <a href="/terms" target="_blank" rel="noopener noreferrer" className="font-semibold text-[#da251d] underline hover:text-[#b81d16]">
                          Điều khoản dịch vụ
                        </a>{" "}
                        và cho phép xử lý dữ liệu cá nhân theo{" "}
                        <a href="/privacy" target="_blank" rel="noopener noreferrer" className="font-semibold text-[#da251d] underline hover:text-[#b81d16]">
                          Nghị định 13/2023/NĐ-CP
                        </a>
                        . *
                      </>
                    )}
                  </span>
                </label>
              </div>

              {/* TÓM TẮT ĐẶT CHỖ */}
              <div className="rounded-[2px] bg-slate-50 p-3.5 text-xs text-slate-600 font-light space-y-1">
                <div className="flex justify-between">
                  <span>{isEnglish ? "Departure" : "Khởi hành"}:</span>
                  <strong className="text-slate-800 font-semibold">{departureDate}</strong>
                </div>
                <div className="flex justify-between">
                  <span>{isEnglish ? "Guests" : "Số lượng"}:</span>
                  <strong className="text-slate-800 font-semibold">
                    {adults} {isEnglish ? "adults" : "người lớn"}
                    {children > 0
                      ? `, ${children} ${isEnglish ? "children" : "trẻ em"}`
                      : ""}
                  </strong>
                </div>
                <div className="flex justify-between pt-1 border-t border-slate-200 text-sm font-bold text-slate-900">
                  <span>{isEnglish ? "Total Amount" : "Tổng thanh toán"}:</span>
                  <span className="text-base font-black text-[#da251d]">
                    {isEnglish
                      ? `${totalPrice.toLocaleString("en-US")} VND`
                      : `${totalPrice.toLocaleString("vi-VN")}đ`}
                  </span>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 rounded-[2px] border border-slate-200 bg-white py-2.5 text-xs font-semibold text-slate-600 transition-all duration-200 hover:border-slate-300 hover:bg-white hover:shadow-[0px_4px_14px_rgba(0,0,0,0.06)] active:translate-y-0 cursor-pointer"
                >
                  {isEnglish ? "CANCEL" : "HỦY BỎ"}
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || !consentAgreed}
                  className="flex-1 rounded-[2px] bg-[#da251d] py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-sm transition-all duration-200 hover:bg-[#c92018] hover:shadow-[0px_8px_25px_rgba(218,37,29,0.35)] hover:-translate-y-0.5 active:translate-y-0 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-1.5"
                >
                  <span>
                    {isSubmitting
                      ? (isEnglish ? "PROCESSING..." : "ĐANG XỬ LÝ...")
                      : paymentMethod === "vietqr"
                      ? (isEnglish ? "PAY WITH QR CODE" : "THANH TOÁN MÃ QR")
                      : (isEnglish ? "CONFIRM CASH BOOKING" : "GIỮ CHỖ & NỘP TIỀN MẶT")}
                  </span>
                  <ArrowRight className="size-3.5" />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
