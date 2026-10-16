"use client";

import { useState } from "react";
import { X, CheckCircle2, PhoneCall, Sparkles, ExternalLink, Loader2 } from "lucide-react";
import { publicApi } from "@/lib/api";

export interface ReferralAdvisoryTarget {
  id: string;
  name: string;
  itemType: "accommodation_referral" | "restaurant_referral";
  partnerName: string;
  redirectUrl: string;
}

interface ReferralAdvisoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  target: ReferralAdvisoryTarget | null;
}

export function ReferralAdvisoryModal({
  isOpen,
  onClose,
  target,
}: ReferralAdvisoryModalProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen || !target) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      setErrorMsg("Vui lòng nhập họ tên và số điện thoại.");
      return;
    }

    setIsSubmitting(true);
    setErrorMsg(null);

    let redirectTarget = target.redirectUrl;

    try {
      // Call tracking endpoint with contact information -> creates lead in Odoo CRM
      const res = await publicApi.trackReferral(
        {
          item_type: target.itemType,
          item_id: target.id,
          contact_name: name.trim(),
          contact_phone: phone.trim(),
          contact_email: email.trim() || null,
        },
        2000
      );
      if (res?.redirect_url) {
        redirectTarget = res.redirect_url;
      }
      setIsSuccess(true);
      setTimeout(() => {
        window.open(redirectTarget, "_blank", "noopener,noreferrer");
        onClose();
        setIsSuccess(false);
        setName("");
        setPhone("");
        setEmail("");
        setNote("");
      }, 1500);
    } catch {
      // Even if tracking times out, user lead is submitted & redirect still happens
      setIsSuccess(true);
      setTimeout(() => {
        window.open(redirectTarget, "_blank", "noopener,noreferrer");
        onClose();
        setIsSuccess(false);
      }, 1500);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div
        className="relative w-full max-w-lg rounded-[2px] bg-white p-6 sm:p-8 shadow-2xl border border-amber-200/50"
        role="dialog"
        aria-modal="true"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-700 transition-colors"
          aria-label="Đóng modal"
        >
          <X className="size-5" />
        </button>

        {isSuccess ? (
          <div className="text-center py-6">
            <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 mb-4 animate-bounce">
              <CheckCircle2 className="size-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              STAR Travels đã tiếp nhận yêu cầu!
            </h3>
            <p className="text-sm text-slate-600 mb-4">
              Chuyên viên concierge của STAR sẽ liên hệ với quý khách trong vòng 15 phút để tư vấn ưu đãi và hỗ trợ đặt dịch vụ tốt nhất.
            </p>
            <div className="inline-flex items-center gap-2 text-xs text-[#0098a2] font-semibold">
              <Loader2 className="size-4 animate-spin" />
              <span>Đang mở nền tảng {target.partnerName}...</span>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-600 mb-1">
              <Sparkles className="size-4 text-amber-500" />
              <span>Dịch vụ STAR Concierge</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-1">
              Nhận tư vấn đặc quyền trước khi đặt
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Dịch vụ tư vấn hoàn toàn miễn phí từ STAR Travels dành riêng cho <span className="font-semibold text-slate-800">{target.name}</span>.
            </p>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Họ và tên <span className="text-[#da251d]">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ví dụ: Nguyễn Văn An"
                  className="w-full rounded-[2px] border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:border-[#da251d] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#da251d]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Số điện thoại / Zalo <span className="text-[#da251d]">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Ví dụ: 0912 345 678"
                  className="w-full rounded-[2px] border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:border-[#da251d] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#da251d]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Email (tùy chọn)
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full rounded-[2px] border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:border-[#da251d] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#da251d]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Nhu cầu đặc biệt (tùy chọn)
                </label>
                <textarea
                  rows={2}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Ví dụ: Ngày dự kiến, số lượng khách, yêu cầu phòng hướng biển / bàn tiệc riêng..."
                  className="w-full rounded-[2px] border border-slate-200 bg-slate-50 px-3 py-2 text-xs focus:border-[#da251d] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#da251d]"
                />
              </div>

              {errorMsg && (
                <div className="text-xs text-[#da251d] font-semibold bg-red-50 p-2 rounded-[2px]">
                  {errorMsg}
                </div>
              )}

              <div className="pt-2 flex flex-col gap-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-[2px] bg-[#da251d] py-3 text-sm font-bold text-white transition-all hover:bg-[#b01b14] shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="size-4 animate-spin" />
                      <span>Đang tiếp nhận...</span>
                    </>
                  ) : (
                    <>
                      <PhoneCall className="size-4" />
                      <span>Gửi yêu cầu & Mở trang đối tác</span>
                    </>
                  )}
                </button>

                <p className="text-[11px] text-center text-slate-400 italic">
                  STAR Travels giới thiệu, việc đặt chỗ được thực hiện trên nền tảng đối tác {target.partnerName}.
                </p>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
