"use client";

import { Customer } from "./types";
import { X, Building2, Phone, Mail, MapPin, Calendar, CreditCard, Luggage } from "lucide-react";

interface CustomerModalProps {
  customer: Customer | null;
  onClose: () => void;
  onToggleStatus?: (customerId: string) => void;
}

export function CustomerModal({ customer, onClose, onToggleStatus }: CustomerModalProps) {
  if (!customer) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="customer-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs font-poppins"
    >
      <div
        className="w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-black hover:bg-slate-100 transition cursor-pointer"
          aria-label="Đóng chi tiết"
        >
          <X className="size-5" />
        </button>

        {/* Customer Header */}
        <div className="flex items-start justify-between gap-4 mb-6 pr-8">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h3 id="customer-modal-title" className="text-xl sm:text-2xl font-bold text-slate-900">
                {customer.name}
              </h3>
              <span
                className={`text-xs font-semibold px-3 py-0.5 rounded-md border ${
                  customer.status === "Active"
                    ? "bg-[#16C098]/20 border-[#00B087] text-[#008767]"
                    : "bg-[#FFC5C5] border-[#DF0404] text-[#DF0404]"
                }`}
              >
                {customer.status}
              </span>
            </div>
            <p className="text-sm text-slate-500 flex items-center gap-1.5">
              <Building2 className="size-3.5 text-slate-400" />
              <span>{customer.company}</span>
              <span className="text-slate-300">•</span>
              <MapPin className="size-3.5 text-slate-400" />
              <span>{customer.country}</span>
            </p>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 p-4 rounded-2xl bg-[#F9FBFF] border border-slate-100 text-sm">
          <div className="flex items-center gap-2.5 text-slate-700">
            <Phone className="size-4 text-[#5932EA] shrink-0" />
            <div>
              <span className="text-xs text-slate-400 block">Số điện thoại</span>
              <span className="font-medium">{customer.phone}</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 text-slate-700">
            <Mail className="size-4 text-[#5932EA] shrink-0" />
            <div>
              <span className="text-xs text-slate-400 block">Email liên hệ</span>
              <span className="font-medium truncate max-w-[180px]">{customer.email}</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 text-slate-700">
            <Calendar className="size-4 text-[#5932EA] shrink-0" />
            <div>
              <span className="text-xs text-slate-400 block">Ngày tham gia</span>
              <span className="font-medium">{customer.joinDate || "Gần đây"}</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 text-slate-700">
            <CreditCard className="size-4 text-[#5932EA] shrink-0" />
            <div>
              <span className="text-xs text-slate-400 block">Tổng chi tiêu</span>
              <span className="font-semibold text-emerald-600">{customer.totalSpent || "0 ₫"}</span>
            </div>
          </div>
        </div>

        {/* Tour / Service Info */}
        {customer.tourPackage && (
          <div className="mb-6">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              <Luggage className="size-3.5 text-[#5932EA]" />
              <span>Gói Tour / Dịch vụ đăng ký</span>
            </div>
            <div className="p-3.5 rounded-xl bg-indigo-50/60 border border-indigo-100 text-sm font-medium text-slate-800">
              {customer.tourPackage}
            </div>
          </div>
        )}

        {/* Notes */}
        {customer.notes && (
          <div className="mb-6">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1.5">
              Ghi chú & Yêu cầu đặc biệt
            </span>
            <p className="text-sm text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
              {customer.notes}
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-100">
          {onToggleStatus && (
            <button
              type="button"
              onClick={() => onToggleStatus(customer.id)}
              className={`px-4 py-2 text-xs font-semibold rounded-xl transition cursor-pointer ${
                customer.status === "Active"
                  ? "bg-rose-50 text-rose-600 hover:bg-rose-100"
                  : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
              }`}
            >
              {customer.status === "Active" ? "Chuyển thành Inactive" : "Kích hoạt Active"}
            </button>
          )}

          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold rounded-xl bg-[#5932EA] text-white hover:bg-[#4a26d4] transition cursor-pointer"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}
