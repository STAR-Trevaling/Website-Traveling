"use client";

import { useState } from "react";
import { Users, Calendar, ShieldCheck, Check } from "lucide-react";
import type { TourItem } from "@/lib/tours-data";
import { useLanguage } from "@/lib/i18n/context";

interface TourBookingCardProps {
  tour: TourItem;
}

export function TourBookingCard({ tour }: TourBookingCardProps) {
  const { t, isEnglish } = useLanguage();
  const [adults, setAdults] = useState<number>(2);
  const [children, setChildren] = useState<number>(0);
  const [departureDate, setDepartureDate] = useState<string>("2026-10-15");
  const [isBooked, setIsBooked] = useState<boolean>(false);
  const [fullName, setFullName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);

  const pricePerAdult = tour.price;
  const pricePerChild = Math.round(tour.price * 0.75);
  const totalPrice = adults * pricePerAdult + children * pricePerChild;
  const b = t.tourDetailPage.bookingCard;

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsBooked(true);
    setTimeout(() => {
      setShowModal(false);
    }, 2500);
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
              className="w-full rounded-[2px] border border-slate-200 px-3 py-2 text-xs md:text-sm text-slate-800 focus:border-[#0098a2] focus:outline-none"
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

        {/* CTA Button */}
        <button
          type="button"
          onClick={() => setShowModal(true)}
          className="mt-6 w-full rounded-[2px] bg-[#0098a2] py-3.5 text-xs md:text-sm font-bold uppercase tracking-wider text-white shadow-sm transition-all duration-200 hover:bg-[#008f99] hover:shadow-[0px_8px_25px_rgba(0,152,162,0.35)] hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
        >
          {b.bookNowBtn}
        </button>

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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-lg rounded-[2px] bg-white p-5 sm:p-8 shadow-2xl">
            {isBooked ? (
              <div className="py-8 text-center">
                <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                  <Check className="size-8" />
                </div>
                <h3 className="display-title mt-4 text-2xl font-bold text-slate-900">
                  {b.bookingSuccess}
                </h3>
              </div>
            ) : (
              <>
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
                    className="text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    ✕
                  </button>
                </div>

                <form onSubmit={handleBookingSubmit} className="mt-6 space-y-4">
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
                      className="w-full rounded-[2px] border border-slate-200 px-3 py-2 text-sm focus:border-[#0098a2] focus:outline-none"
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
                        className="w-full rounded-[2px] border border-slate-200 px-3 py-2 text-sm focus:border-[#0098a2] focus:outline-none"
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
                        className="w-full rounded-[2px] border border-slate-200 px-3 py-2 text-sm focus:border-[#0098a2] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="rounded-[2px] bg-slate-50 p-3.5 text-xs text-slate-600 font-light">
                    <p>
                      {isEnglish ? "Departure" : "Khởi hành"}: <strong>{departureDate}</strong>
                    </p>
                    <p>
                      {isEnglish ? "Guests" : "Số lượng"}:{" "}
                      <strong>
                        {adults} {isEnglish ? "adults" : "người lớn"}
                        {children > 0
                          ? `, ${children} ${isEnglish ? "children" : "trẻ em"}`
                          : ""}
                      </strong>
                    </p>
                    <p className="mt-1 font-bold text-slate-900 text-sm">
                      {isEnglish ? "Total" : "Tổng thanh toán"}:{" "}
                      {isEnglish
                        ? `${totalPrice.toLocaleString("en-US")} VND`
                        : `${totalPrice.toLocaleString("vi-VN")}đ`}
                    </p>
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
                      className="flex-1 rounded-[2px] bg-[#0098a2] py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-sm transition-all duration-200 hover:bg-[#008f99] hover:shadow-[0px_8px_25px_rgba(0,152,162,0.35)] hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                    >
                      {b.confirmBookingBtn}
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
