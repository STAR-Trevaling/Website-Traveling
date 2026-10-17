"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  QrCode,
  Banknote,
  Building2,
  MapPin,
  Phone,
  Printer,
  CheckCircle2,
  UserCheck,
  Copy,
  Check,
  Clock,
  AlertCircle,
  ShieldCheck,
  RotateCcw,
  ArrowRight,
  ExternalLink,
  Download,
  Sparkles,
  ChevronRight,
  Calendar,
  Users,
  Compass,
  FileText,
  CheckCheck,
  RefreshCw,
  Lock,
  ArrowLeft,
  Info,
} from "lucide-react";
import { publicApi } from "@/lib/api";
import { VIETNAM_TOURS } from "@/data/seed/tours";
import { VIETNAM_IMAGES } from "@/lib/assets";

export interface PaymentClientProps {
  bookingId: string;
  initialBookingCode?: string;
  initialAmount?: string;
  initialGateway?: "vietqr" | "cash";
  tourTitle?: string;
  tourSlug?: string;
  tourImage?: string;
  departureDate?: string;
  guests?: string;
  travelerName?: string;
  travelerEmail?: string;
  travelerPhone?: string;
  isEn?: boolean;
}

interface VietQRData {
  payment_id: string;
  transaction_code: string;
  booking_code: string;
  amount: string;
  currency: string;
  gateway: string;
  status: string;
  expires_at: string;
  qr_code_url?: string;
  emvco_payload?: string;
  bank_info: {
    bank_name: string;
    bank_bin: string;
    account_number: string;
    account_name: string;
    amount: number;
    transfer_content: string;
  };
}

// Cấu hình tài khoản ngân hàng thụ hưởng (Single source of truth từ .env)
export const DEFAULT_BANK_CONFIG = {
  bin: process.env.NEXT_PUBLIC_VIETQR_BANK_BIN || "970422",
  name: process.env.NEXT_PUBLIC_VIETQR_BANK_NAME || "MBBank",
  accountNo: process.env.NEXT_PUBLIC_VIETQR_ACCOUNT_NO || "0000000000",
  accountName:
    process.env.NEXT_PUBLIC_VIETQR_ACCOUNT_NAME ||
    "CONG TY TNHH STAR TRAVELS VIET NAM",
};

export function PaymentClient({
  bookingId,
  initialBookingCode,
  initialAmount,
  initialGateway = "vietqr",
  tourTitle,
  tourSlug,
  tourImage,
  departureDate,
  guests,
  travelerName = "Quý Khách Hàng",
  travelerEmail,
  travelerPhone,
  isEn = false,
}: PaymentClientProps) {
  const router = useRouter();
  const [gateway, setGateway] = useState<"vietqr" | "cash">(initialGateway);
  const [loading, setLoading] = useState(false);
  const [manualChecking, setManualChecking] = useState(false);
  const [cashSubmitting, setCashSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // VietQR state
  const [vietQrData, setVietQrData] = useState<VietQRData | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(15 * 60); // 15 phút đếm ngược
  const [isExpired, setIsExpired] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const bookingCode = vietQrData?.booking_code || initialBookingCode || bookingId;

  // Resolve matching tour for luxurious summary card preview
  const matchedTour = useMemo(() => {
    if (tourSlug) {
      const found = VIETNAM_TOURS.find((t) => t.slug === tourSlug);
      if (found) return found;
    }
    // Fallback to flagship Ha Long cruise
    return VIETNAM_TOURS[0];
  }, [tourSlug]);

  const displayTourTitle =
    tourTitle ||
    (isEn && matchedTour?.title_en ? matchedTour.title_en : matchedTour?.title) ||
    "Tour Du Lịch Trọn Gói STAR Travels";

  const displayTourImage =
    tourImage ||
    matchedTour?.image ||
    VIETNAM_IMAGES.cruise ||
    "/images/hero/ha-long-bay.jpg";

  const displayDuration =
    isEn && matchedTour?.duration_en
      ? matchedTour.duration_en
      : matchedTour?.duration || "Trọn gói";

  const displayDestination =
    isEn && matchedTour?.destination_en
      ? matchedTour.destination_en
      : matchedTour?.destination || "Việt Nam";

  // Parse numeric amount for accurate calculation
  const numericAmount = useMemo(() => {
    if (vietQrData?.bank_info.amount) return Number(vietQrData.bank_info.amount);
    if (initialAmount) {
      const clean = Number(initialAmount.replace(/[^\d]/g, ""));
      if (!isNaN(clean) && clean > 0) return clean;
    }
    return matchedTour?.price ? matchedTour.price * 2 : 3700000;
  }, [vietQrData, initialAmount, matchedTour]);

  const formattedAmount = useMemo(() => {
    return (
      numericAmount.toLocaleString(isEn ? "en-US" : "vi-VN") +
      (isEn ? " VND" : "đ")
    );
  }, [numericAmount, isEn]);

  // 1. Khởi tạo giao dịch VietQR
  const initVietQRPayment = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await publicApi.createPayment({
        booking_code: bookingCode,
        gateway: "vietqr",
      });

      if (res && res.qr_code_url && res.bank_info) {
        setVietQrData(res as VietQRData);
        setTimeLeft(15 * 60);
        setIsExpired(false);
      } else {
        throw new Error("Invalid VietQR payload from server");
      }
    } catch {
      // Offline fallback: Tạo mã QR hợp chuẩn Napas 247 QuickLink
      const bankBin = DEFAULT_BANK_CONFIG.bin;
      const bankName = DEFAULT_BANK_CONFIG.name;
      const accountNumber = DEFAULT_BANK_CONFIG.accountNo;
      const accountName = DEFAULT_BANK_CONFIG.accountName;
      const numAmount = numericAmount;

      const qrUrl = `https://img.vietqr.io/image/${bankBin}-${accountNumber}-compact2.png?amount=${numAmount}&addInfo=${encodeURIComponent(
        bookingCode
      )}&accountName=${encodeURIComponent(accountName)}`;

      const fallbackData: VietQRData = {
        payment_id: `PAY-FALLBACK-${Date.now()}`,
        transaction_code: `TXN-${Date.now()}`,
        booking_code: bookingCode,
        amount: String(numAmount),
        currency: "VND",
        gateway: "vietqr",
        status: "pending",
        expires_at: new Date(Date.now() + 15 * 60 * 1000).toISOString(),
        qr_code_url: qrUrl,
        emvco_payload: "",
        bank_info: {
          bank_name: bankName,
          bank_bin: bankBin,
          account_number: accountNumber,
          account_name: accountName,
          amount: numAmount,
          transfer_content: bookingCode,
        },
      };

      setVietQrData(fallbackData);
      setTimeLeft(15 * 60);
      setIsExpired(false);
      setError(null);
    } finally {
      setLoading(false);
    }
  }, [bookingCode, numericAmount]);

  useEffect(() => {
    if (gateway === "vietqr" && !vietQrData) {
      initVietQRPayment();
    }
  }, [gateway, vietQrData, initVietQRPayment]);

  // 2. Countdown Timer
  useEffect(() => {
    if (!vietQrData || isConfirmed || isExpired) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsExpired(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [vietQrData, isConfirmed, isExpired]);

  // 3. Polling đối soát tự động mỗi 4 giây
  useEffect(() => {
    if (!vietQrData || isConfirmed || isExpired) return;

    const paymentId = vietQrData.payment_id || vietQrData.transaction_code;

    const interval = setInterval(async () => {
      try {
        const res = await publicApi.getPaymentStatus(paymentId);
        if (
          res &&
          (res.state === "success" || res.status === "success" || res.is_paid)
        ) {
          setIsConfirmed(true);
          clearInterval(interval);
          router.push(
            `/booking/${encodeURIComponent(bookingCode)}/success?gateway=vietqr&amount=${encodeURIComponent(
              String(numericAmount)
            )}`
          );
        } else if (res && (res.state === "expired" || res.status === "expired")) {
          setIsExpired(true);
          clearInterval(interval);
        }
      } catch {
        // Polling im lặng
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [vietQrData, isConfirmed, isExpired, router, bookingCode, numericAmount]);

  // Kiểm tra trạng thái thủ công bằng nút bấm
  const handleManualCheck = async () => {
    if (!vietQrData) return;
    setManualChecking(true);
    try {
      const paymentId = vietQrData.payment_id || vietQrData.transaction_code;
      const res = await publicApi.getPaymentStatus(paymentId);
      if (
        res &&
        (res.state === "success" || res.status === "success" || res.is_paid)
      ) {
        setIsConfirmed(true);
        router.push(
          `/booking/${encodeURIComponent(bookingCode)}/success?gateway=vietqr&amount=${encodeURIComponent(
            String(numericAmount)
          )}`
        );
      } else {
        // Thông báo nhẹ nhàng chưa nhận được tín hiệu
        setError(
          isEn
            ? "Payment not yet detected. If you just transferred, please allow 10-30 seconds for banking networks to reconcile."
            : "Chưa ghi nhận tiền vào tài khoản. Quý khách vui lòng đợi 10-30 giây để mạng lưới liên ngân hàng Napas 247 cập nhật."
        );
        setTimeout(() => setError(null), 6000);
      }
    } catch {
      setError(
        isEn
          ? "System is actively checking. Please allow a few moments."
          : "Hệ thống đang tích cực kiểm tra lệnh chuyển khoản. Quý khách vui lòng giữ màn hình."
      );
      setTimeout(() => setError(null), 5000);
    } finally {
      setManualChecking(false);
    }
  };

  // Sao chép giá trị vào clipboard
  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2500);
  };

  // Sao chép toàn bộ thông tin chuyển khoản trong 1 click
  const handleCopyAll = () => {
    const fullText = `[STAR TRAVELS - THÔNG TIN CHUYỂN KHOẢN]
Ngân hàng: ${vietQrData?.bank_info.bank_name || DEFAULT_BANK_CONFIG.name} (BIN: ${
      vietQrData?.bank_info.bank_bin || DEFAULT_BANK_CONFIG.bin
    })
Số tài khoản: ${vietQrData?.bank_info.account_number || DEFAULT_BANK_CONFIG.accountNo}
Tên người thụ hưởng: ${
      vietQrData?.bank_info.account_name || DEFAULT_BANK_CONFIG.accountName
    }
Số tiền: ${numericAmount.toLocaleString("vi-VN")} VND
Nội dung chuyển khoản (Bắt buộc): ${bookingCode}`;

    handleCopy(fullText, "all");
  };

  // Tải mã QR về điện thoại
  const handleDownloadQR = () => {
    if (!vietQrData?.qr_code_url) return;
    const a = document.createElement("a");
    a.href = vietQrData.qr_code_url;
    a.download = `VietQR-STAR-Travels-${bookingCode}.png`;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // Xác nhận thanh toán tiền mặt
  const handleCashConfirm = async () => {
    setCashSubmitting(true);
    try {
      await publicApi.createPayment({
        booking_code: bookingCode,
        gateway: "cash",
      });
    } catch {
      // Tiếp tục chuyển tiếp
    } finally {
      setCashSubmitting(false);
      router.push(
        `/booking/${encodeURIComponent(bookingCode)}/success?gateway=cash&amount=${encodeURIComponent(
          String(numericAmount)
        )}`
      );
    }
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTimer = `${String(minutes).padStart(2, "0")}:${String(
    seconds
  ).padStart(2, "0")}`;

  return (
    <div className="max-w-7xl mx-auto py-4 sm:py-6 lg:py-10 space-y-8">
      {/* ── BREADCRUMB & STEP PROGRESS BAR ── */}
      <div className="space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <Link
            href={`/tours/${tourSlug || "tour-ha-long-cruise-2n1d"}`}
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-[#0098a2] transition-colors group"
          >
            <ArrowLeft className="size-3.5 group-hover:-translate-x-1 transition-transform" />
            <span>{isEn ? "Back to Tour Details" : "Quay lại chi tiết tour"}</span>
          </Link>

          {/* BADGE BẢO MẬT SSL */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-[11px] font-medium shadow-2xs">
            <ShieldCheck className="size-3.5 text-emerald-600" />
            <span>{isEn ? "Bank-Grade 256-Bit SSL Encrypted" : "Mã hóa bảo mật ngân hàng SSL 256-Bit"}</span>
          </div>
        </div>

        {/* STEP PROGRESS INDICATOR */}
        <div className="bg-white/80 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-slate-200/70 shadow-xs">
          <div className="grid grid-cols-4 gap-2 sm:gap-4 text-center">
            {/* STEP 1 */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-xs font-semibold text-emerald-700">
              <span className="size-6 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                <Check className="size-3.5 text-emerald-700" />
              </span>
              <span className="hidden sm:inline">{isEn ? "1. Select Tour" : "1. Chọn Tour"}</span>
            </div>

            {/* STEP 2 */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-xs font-semibold text-emerald-700">
              <span className="size-6 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                <Check className="size-3.5 text-emerald-700" />
              </span>
              <span className="hidden sm:inline">{isEn ? "2. Passenger Info" : "2. Thông Tin Khách"}</span>
            </div>

            {/* STEP 3 - ACTIVE */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-xs font-bold text-[#0098a2]">
              <span className="size-6 rounded-full bg-[#0098a2] text-white flex items-center justify-center shrink-0 shadow-sm shadow-[#0098a2]/30 ring-4 ring-[#0098a2]/15 animate-pulse">
                <Lock className="size-3" />
              </span>
              <span className="text-[#0098a2] font-black">{isEn ? "3. Secure Payment" : "3. Thanh Toán An Toàn"}</span>
            </div>

            {/* STEP 4 */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-xs font-medium text-slate-400">
              <span className="size-6 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center shrink-0">
                4
              </span>
              <span className="hidden sm:inline">{isEn ? "4. E-Ticket & Departure" : "4. Nhận Vé & Khởi Hành"}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── HEADER TITLE ── */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2 border-b border-slate-200/60">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#0098a2] mb-1">
            <Sparkles className="size-3.5 text-amber-500 fill-amber-500" />
            <span>{isEn ? "STAR Travels Official Booking Portal" : "Cổng Đặt Chỗ Trực Tuyến STAR Travels"}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            {isEn ? "Complete Your Reservation" : "Hoàn Tất Thanh Toán Đặt Tour"}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {isEn
              ? "Reconciled instantly via Vietnam National Payment Network (NAPAS 247)."
              : "Hệ thống tự động khớp lệnh chuyển khoản và gửi vé điện tử tức thì qua mạng lưới Napas 247."}
          </p>
        </div>

        {/* BOOKING CODE CALLOUT PILL */}
        <div className="flex items-center gap-2 self-start md:self-auto bg-slate-900 text-white px-4 py-2 rounded-xl shadow-xs">
          <div className="text-right">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-semibold">
              {isEn ? "Booking Reference" : "Mã đơn hàng"}
            </span>
            <span className="font-mono text-xs sm:text-sm font-bold text-amber-400">
              {bookingCode}
            </span>
          </div>
          <button
            type="button"
            onClick={() => handleCopy(bookingCode, "header_code")}
            title={isEn ? "Copy Booking Code" : "Sao chép mã đơn hàng"}
            className="p-1.5 hover:bg-slate-800 rounded-lg transition-colors text-slate-300 hover:text-white"
          >
            {copiedField === "header_code" ? (
              <Check className="size-4 text-emerald-400" />
            ) : (
              <Copy className="size-4" />
            )}
          </button>
        </div>
      </div>

      {/* ERROR ALERT NOTIFICATION */}
      {error && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200/80 text-red-800 flex items-start gap-3 text-xs sm:text-sm shadow-xs animate-in fade-in duration-200">
          <AlertCircle className="size-5 shrink-0 text-red-500 mt-0.5" />
          <div className="flex-1 leading-relaxed">{error}</div>
        </div>
      )}

      {/* ── MASTER SPLIT-SCREEN LAYOUT ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* ════════════════════════════════════════════════════════════
            LEFT COLUMN (7 COLS): INTERACTIVE PAYMENT STATION
        ════════════════════════════════════════════════════════════ */}
        <div className="lg:col-span-7 space-y-6">
          {/* 1. PAYMENT METHOD SELECTOR (SEGMENTED PILL CARDS) */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
              {isEn ? "Select Payment Method" : "Chọn Phương Thức Thanh Toán"}
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {/* METHOD 1: VIETQR */}
              <button
                type="button"
                onClick={() => {
                  setGateway("vietqr");
                  setError(null);
                }}
                className={`relative p-4 sm:p-5 rounded-2xl border text-left transition-all duration-200 cursor-pointer overflow-hidden ${
                  gateway === "vietqr"
                    ? "border-[#0098a2] bg-gradient-to-br from-white via-[#0098a2]/5 to-[#0098a2]/10 ring-2 ring-[#0098a2] shadow-md shadow-[#0098a2]/10"
                    : "border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50/60 shadow-2xs"
                }`}
              >
                {/* ACTIVE TOP ACCENT */}
                {gateway === "vietqr" && (
                  <span className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0098a2] via-teal-400 to-emerald-400" />
                )}

                <div className="flex items-start gap-3.5">
                  <div
                    className={`size-11 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                      gateway === "vietqr"
                        ? "bg-[#0098a2] text-white shadow-sm shadow-[#0098a2]/30"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    <QrCode className="size-5 sm:size-6" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="font-extrabold text-slate-900 text-sm sm:text-base">
                        {isEn ? "VietQR Instant Transfer" : "Chuyển Khoản VietQR"}
                      </span>
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full inline-flex items-center gap-1">
                        <span className="size-1.5 rounded-full bg-emerald-500 animate-ping" />
                        {isEn ? "Fast 24/7" : "Khuyên Dùng"}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1 leading-snug">
                      {isEn
                        ? "Scan via any Vietnam banking app (VCB, MB, TCB, ACB, BIDV...). Auto-confirmed."
                        : "Quét mã bằng app mọi ngân hàng. Tự động đối soát và xác nhận sau vài giây."}
                    </p>
                  </div>
                </div>
              </button>

              {/* METHOD 2: CASH */}
              <button
                type="button"
                onClick={() => {
                  setGateway("cash");
                  setError(null);
                }}
                className={`relative p-4 sm:p-5 rounded-2xl border text-left transition-all duration-200 cursor-pointer overflow-hidden ${
                  gateway === "cash"
                    ? "border-[#0098a2] bg-gradient-to-br from-white via-[#0098a2]/5 to-[#0098a2]/10 ring-2 ring-[#0098a2] shadow-md shadow-[#0098a2]/10"
                    : "border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50/60 shadow-2xs"
                }`}
              >
                {/* ACTIVE TOP ACCENT */}
                {gateway === "cash" && (
                  <span className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600" />
                )}

                <div className="flex items-start gap-3.5">
                  <div
                    className={`size-11 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                      gateway === "cash"
                        ? "bg-amber-600 text-white shadow-sm shadow-amber-600/30"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    <Banknote className="size-5 sm:size-6" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="font-extrabold text-slate-900 text-sm sm:text-base">
                        {isEn ? "Cash on Departure / Office" : "Tiền Mặt Trực Tiếp"}
                      </span>
                      <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded-full">
                        {isEn ? "Hold Spot" : "Tại Quầy / Cho HDV"}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1 leading-snug">
                      {isEn
                        ? "Pay at STAR Travels branch offices or directly to tour guide on departure date."
                        : "Nộp tại văn phòng STAR Travels hoặc thanh toán trực tiếp cho HDV khi lên xe."}
                    </p>
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* ════════════════════════════════════════════════════════════
              ACTIVE TAB 1: VIETQR SMART STATION
          ════════════════════════════════════════════════════════════ */}
          {gateway === "vietqr" && (
            <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xl shadow-slate-200/40 space-y-6">
              {/* TOP STATUS BAR: COUNTDOWN & PING */}
              <div className="flex items-center justify-between flex-wrap gap-3 pb-5 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="relative flex size-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full size-3 bg-emerald-500" />
                  </span>
                  <span className="text-xs font-bold text-slate-700">
                    {isEn ? "Waiting for transfer" : "Đang chờ chuyển khoản"}
                  </span>
                  <span className="hidden sm:inline text-xs text-slate-400">
                    · {isEn ? "Auto-detecting every 4s" : "Tự động phát hiện mỗi 4s"}
                  </span>
                </div>

                {/* COUNTDOWN TIMER BADGE */}
                <div
                  className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl font-mono text-xs font-black shadow-2xs ${
                    isExpired
                      ? "bg-red-100 text-red-700 border border-red-200"
                      : timeLeft < 180
                      ? "bg-amber-100 text-amber-800 border border-amber-200 animate-pulse"
                      : "bg-slate-100 text-slate-700 border border-slate-200"
                  }`}
                >
                  <Clock className="size-3.5" />
                  <span>
                    {isExpired
                      ? isEn
                        ? "Expired"
                        : "Đã hết hạn"
                      : `${isEn ? "Expires in" : "Hiệu lực"}: ${formattedTimer}`}
                  </span>
                </div>
              </div>

              {/* CENTER QR HERO STAGE */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                {/* QR CODE DISPLAY (5 COLS) */}
                <div className="md:col-span-5 flex flex-col items-center text-center">
                  <div className="relative p-4 bg-gradient-to-b from-white to-slate-50 border-2 border-[#0098a2]/25 rounded-2xl shadow-inner group">
                    {/* CORNER BRACKETS DECORATION */}
                    <span className="absolute -top-1 -left-1 size-3 border-t-2 border-l-2 border-[#0098a2]" />
                    <span className="absolute -top-1 -right-1 size-3 border-t-2 border-r-2 border-[#0098a2]" />
                    <span className="absolute -bottom-1 -left-1 size-3 border-b-2 border-l-2 border-[#0098a2]" />
                    <span className="absolute -bottom-1 -right-1 size-3 border-b-2 border-r-2 border-[#0098a2]" />

                    {loading ? (
                      <div className="size-56 sm:size-60 flex flex-col items-center justify-center gap-2 text-slate-400">
                        <RefreshCw className="size-7 animate-spin text-[#0098a2]" />
                        <span className="text-xs font-semibold">
                          {isEn ? "Generating QR..." : "Đang tạo mã VietQR..."}
                        </span>
                      </div>
                    ) : isExpired ? (
                      <div className="size-56 sm:size-60 flex flex-col items-center justify-center gap-3 p-4">
                        <AlertCircle className="size-10 text-red-500" />
                        <p className="text-xs text-red-600 font-bold">
                          {isEn ? "QR expired for security" : "Mã QR đã hết thời gian"}
                        </p>
                        <button
                          type="button"
                          onClick={initVietQRPayment}
                          className="px-3.5 py-1.5 bg-[#0098a2] hover:bg-[#00828a] text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 shadow-2xs"
                        >
                          <RotateCcw className="size-3.5" />
                          <span>{isEn ? "Regenerate QR" : "Tạo lại mã"}</span>
                        </button>
                      </div>
                    ) : vietQrData?.qr_code_url ? (
                      <div className="relative size-56 sm:size-60">
                        <Image
                          src={vietQrData.qr_code_url}
                          alt="VietQR NAPAS 247 STAR Travels"
                          fill
                          className="object-contain rounded-lg"
                          unoptimized
                        />
                      </div>
                    ) : (
                      <div className="size-56 sm:size-60 flex items-center justify-center text-xs text-slate-400">
                        {isEn ? "QR Unavailable" : "Chưa có mã QR"}
                      </div>
                    )}
                  </div>

                  {/* QUICK QR ACTIONS */}
                  <div className="flex items-center gap-2 mt-3 w-full">
                    <button
                      type="button"
                      onClick={handleDownloadQR}
                      disabled={!vietQrData?.qr_code_url}
                      className="flex-1 py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-slate-700 text-[11px] font-bold transition flex items-center justify-center gap-1.5 disabled:opacity-50"
                    >
                      <Download className="size-3.5" />
                      <span>{isEn ? "Save QR" : "Lưu mã QR"}</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleCopyAll}
                      className="flex-1 py-2 px-3 rounded-xl bg-teal-50 hover:bg-teal-100 text-[#007E87] text-[11px] font-bold transition flex items-center justify-center gap-1.5"
                    >
                      {copiedField === "all" ? (
                        <CheckCheck className="size-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="size-3.5" />
                      )}
                      <span>
                        {copiedField === "all"
                          ? isEn
                            ? "Copied All!"
                            : "Đã chép tất cả!"
                          : isEn
                          ? "Copy All"
                          : "Sao chép hết"}
                      </span>
                    </button>
                  </div>
                </div>

                {/* BANK DETAILS SPECIMEN POD (7 COLS) */}
                <div className="md:col-span-7 space-y-3">
                  {/* 1. NGÂN HÀNG */}
                  <div className="p-3 bg-slate-50/80 rounded-xl border border-slate-200/60 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                        {isEn ? "Beneficiary Bank" : "Ngân hàng thụ hưởng"}
                      </span>
                      <span className="font-extrabold text-slate-900 text-xs sm:text-sm">
                        {vietQrData?.bank_info.bank_name || DEFAULT_BANK_CONFIG.name}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono font-bold bg-blue-100 text-blue-900 px-2 py-0.5 rounded-md">
                      BIN: {vietQrData?.bank_info.bank_bin || DEFAULT_BANK_CONFIG.bin}
                    </span>
                  </div>

                  {/* 2. SỐ TÀI KHOẢN (PROMINENT) */}
                  <div className="p-3.5 bg-gradient-to-r from-blue-50/60 to-slate-50 rounded-xl border border-blue-200/60 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-blue-700 block tracking-wider">
                        {isEn ? "Account Number" : "Số tài khoản nhận tiền"}
                      </span>
                      <span className="font-mono text-base sm:text-lg font-black text-slate-900 tracking-wider">
                        {vietQrData?.bank_info.account_number || DEFAULT_BANK_CONFIG.accountNo}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        handleCopy(
                          vietQrData?.bank_info.account_number ||
                            DEFAULT_BANK_CONFIG.accountNo,
                          "acc_no"
                        )
                      }
                      className="px-2.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition flex items-center gap-1 shadow-2xs"
                    >
                      {copiedField === "acc_no" ? (
                        <>
                          <Check className="size-3.5" />
                          <span>{isEn ? "Copied" : "Đã chép"}</span>
                        </>
                      ) : (
                        <>
                          <Copy className="size-3.5" />
                          <span>{isEn ? "Copy" : "Sao chép"}</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* 3. TÊN CHỦ TÀI KHOẢN */}
                  <div className="p-3 bg-slate-50/80 rounded-xl border border-slate-200/60 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                        {isEn ? "Account Holder Name" : "Chủ tài khoản"}
                      </span>
                      <span className="font-bold text-slate-900 text-xs sm:text-sm">
                        {vietQrData?.bank_info.account_name || DEFAULT_BANK_CONFIG.accountName}
                      </span>
                    </div>
                    <ShieldCheck className="size-4 text-emerald-600 shrink-0" />
                  </div>

                  {/* 4. SỐ TIỀN CHÍNH XÁC */}
                  <div className="p-3 bg-slate-50/80 rounded-xl border border-slate-200/60 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                        {isEn ? "Exact Amount" : "Số tiền chính xác"}
                      </span>
                      <span className="font-extrabold text-[#da251d] text-base sm:text-lg">
                        {formattedAmount}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopy(String(numericAmount), "amount")}
                      className="p-1.5 hover:bg-slate-200 text-slate-500 rounded-lg transition"
                      title={isEn ? "Copy Amount" : "Sao chép số tiền"}
                    >
                      {copiedField === "amount" ? (
                        <Check className="size-4 text-emerald-600" />
                      ) : (
                        <Copy className="size-4" />
                      )}
                    </button>
                  </div>

                  {/* 5. NỘI DUNG CHUYỂN KHOẢN (BẮT BUỘC CHÍNH XÁC) */}
                  <div className="p-3.5 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border-2 border-amber-300 shadow-2xs flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-extrabold text-amber-800 block tracking-wider">
                        {isEn
                          ? "Transfer Content (DO NOT MODIFY)"
                          : "Nội dung chuyển khoản (BẮT BUỘC CHÍNH XÁC)"}
                      </span>
                      <span className="font-mono text-base sm:text-lg font-black text-amber-950 tracking-wider">
                        {bookingCode}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopy(bookingCode, "content")}
                      className="px-2.5 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition flex items-center gap-1 shadow-2xs"
                    >
                      {copiedField === "content" ? (
                        <>
                          <Check className="size-3.5" />
                          <span>{isEn ? "Copied" : "Đã chép"}</span>
                        </>
                      ) : (
                        <>
                          <Copy className="size-3.5" />
                          <span>{isEn ? "Copy" : "Sao chép"}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* RECONCILIATION NOTIFICATION & MANUAL CHECK BUTTON */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <Info className="size-4 text-[#0098a2] shrink-0" />
                  <span>
                    {isEn
                      ? "Keep this window open. E-voucher will be dispatched immediately once confirmed."
                      : "Quý khách giữ nguyên màn hình. Vé điện tử và xác nhận hành trình sẽ xuất hiện ngay."}
                  </span>
                </div>

                <button
                  type="button"
                  disabled={manualChecking || isConfirmed}
                  onClick={handleManualCheck}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition flex items-center justify-center gap-2 shadow-xs cursor-pointer disabled:opacity-50"
                >
                  <RefreshCw
                    className={`size-3.5 ${manualChecking ? "animate-spin text-teal-400" : ""}`}
                  />
                  <span>
                    {manualChecking
                      ? isEn
                        ? "Checking..."
                        : "Đang kiểm tra..."
                      : isEn
                      ? "I Have Paid — Check Now"
                      : "Đã chuyển khoản xong — Kiểm tra ngay"}
                  </span>
                </button>
              </div>
            </div>
          )}

          {/* ════════════════════════════════════════════════════════════
              ACTIVE TAB 2: CASH PAYMENT STATION
          ════════════════════════════════════════════════════════════ */}
          {gateway === "cash" && (
            <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xl shadow-slate-200/40 space-y-6">
              <div>
                <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                  <Banknote className="size-5 text-amber-600" />
                  <span>{isEn ? "Cash Payment Instructions" : "Hướng Dẫn Thanh Toán Tiền Mặt"}</span>
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  {isEn
                    ? "STAR Travels guarantees 100% price lock. Settle at our offices or upon departure."
                    : "STAR Travels cam kết giữ chỗ 100% nguyên giá. Quý khách thanh toán bằng tiền mặt theo 2 cách:"}
                </p>
              </div>

              {/* 2 LỰA CHỌN TIỀN MẶT */}
              <div className="space-y-4">
                {/* CÁCH 1: TẠI VĂN PHÒNG */}
                <div className="p-4 sm:p-5 rounded-2xl bg-slate-50/80 border border-slate-200/80 space-y-3">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <span className="text-xs font-black uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                      <Building2 className="size-4 text-[#0098a2]" />
                      {isEn
                        ? "Option 1: Pay at STAR Travels Offices"
                        : "Cách 1: Nộp trực tiếp tại Văn phòng STAR Travels"}
                    </span>
                    <span className="text-[10px] bg-blue-100 text-blue-900 font-bold px-2 py-0.5 rounded-full">
                      {isEn ? "Before departure" : "Trước ngày khởi hành"}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-light">
                    {isEn
                      ? "Visit our official headquarters to settle in cash and receive an official stamp-certified travel itinerary voucher."
                      : "Quý khách đến quầy giao dịch, đọc mã đơn hàng để nộp tiền và nhận phiếu thu mộc đỏ cùng hợp đồng du lịch."}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs space-y-1">
                      <p className="font-bold text-slate-900 flex items-center gap-1.5">
                        <MapPin className="size-3.5 text-[#da251d]" />
                        {isEn ? "Hanoi Headquarter" : "Trụ sở Hà Nội"}
                      </p>
                      <p className="text-[11px] text-slate-500">Tầng 6, STAR Tower, 68 Cầu Giấy</p>
                      <p className="text-[11px] text-emerald-700 font-semibold">📞 024 3988 6688 (08:00 - 18:00)</p>
                    </div>

                    <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs space-y-1">
                      <p className="font-bold text-slate-900 flex items-center gap-1.5">
                        <MapPin className="size-3.5 text-[#da251d]" />
                        {isEn ? "HCMC Branch Office" : "Chi nhánh TP.HCM"}
                      </p>
                      <p className="text-[11px] text-slate-500">Tầng 3, 120 Nguyễn Huệ, Quận 1</p>
                      <p className="text-[11px] text-emerald-700 font-semibold">📞 028 3822 9988 (08:00 - 18:00)</p>
                    </div>
                  </div>
                </div>

                {/* CÁCH 2: NỘP CHO HDV */}
                <div className="p-4 sm:p-5 rounded-2xl bg-slate-50/80 border border-slate-200/80 space-y-2">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <span className="text-xs font-black uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                      <UserCheck className="size-4 text-amber-600" />
                      {isEn
                        ? "Option 2: Pay to Tour Guide on Departure"
                        : "Cách 2: Thanh toán cho Hướng Dẫn Viên khi khởi hành"}
                    </span>
                    <span className="text-[10px] bg-amber-100 text-amber-900 font-bold px-2 py-0.5 rounded-full">
                      {isEn ? "Most Convenient" : "Rất tiện lợi"}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-light">
                    {isEn
                      ? "Pay 100% in cash directly to your designated Tour Leader / Guide at the meeting point or airport prior to departure."
                      : "Quý khách thanh toán tiền mặt trực tiếp cho Trưởng đoàn / HDV của STAR Travels tại sân bay hoặc điểm đón vào ngày khởi hành."}
                  </p>
                  <p className="text-[11px] text-emerald-700 font-medium">
                    ✦ {isEn ? "Guide verifies booking code and signs physical receipt on spot." : "HDV sẽ đối chiếu mã đơn hàng và ký phiếu thu mộc đỏ ngay tại chỗ."}
                  </p>
                </div>
              </div>

              {/* ACTION BUTTONS CHO TIỀN MẶT */}
              <div className="pt-2 space-y-3">
                <button
                  type="button"
                  disabled={cashSubmitting}
                  onClick={handleCashConfirm}
                  className="w-full py-4 bg-[#0098a2] hover:bg-[#00828a] text-white text-xs sm:text-sm font-extrabold uppercase tracking-wider rounded-2xl shadow-lg shadow-[#0098a2]/25 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <CheckCircle2 className="size-4" />
                  <span>
                    {cashSubmitting
                      ? isEn
                        ? "Confirming Reservation..."
                        : "Đang xác nhận giữ chỗ..."
                      : isEn
                      ? "Confirm Reservation & Pay Cash"
                      : "Xác Nhận Giữ Chỗ & Trả Tiền Mặt"}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => window.print()}
                  className="w-full py-2.5 bg-white border border-slate-200 text-slate-700 text-xs font-semibold rounded-xl hover:bg-slate-50 transition flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
                >
                  <Printer className="size-3.5" />
                  <span>{isEn ? "Print Booking Voucher" : "In Phiếu Hẹn Giữ Chỗ"}</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ════════════════════════════════════════════════════════════
            RIGHT COLUMN (5 COLS): LUXURY ORDER SUMMARY RECEIPT
        ════════════════════════════════════════════════════════════ */}
        <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xl shadow-slate-200/30 space-y-5">
            {/* CARD TITLE */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h2 className="text-sm font-black uppercase tracking-wider text-slate-900 flex items-center gap-2">
                <FileText className="size-4 text-[#0098a2]" />
                <span>{isEn ? "Booking Summary" : "Tóm Tắt Đặt Chỗ"}</span>
              </h2>
              <span className="text-[10px] bg-amber-50 text-amber-700 font-bold px-2 py-0.5 rounded-full border border-amber-200">
                ★ 5.0 (250+ reviews)
              </span>
            </div>

            {/* TOUR HERO PREVIEW POD */}
            <div className="flex gap-3.5 items-start">
              <div className="relative size-20 sm:size-24 rounded-2xl overflow-hidden shrink-0 border border-slate-200 shadow-2xs">
                <Image
                  src={displayTourImage}
                  alt={displayTourTitle}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="min-w-0 space-y-1">
                <span className="text-[10px] font-bold text-[#0098a2] uppercase tracking-wider block">
                  {displayDestination}
                </span>
                <h3 className="font-bold text-slate-900 text-xs sm:text-sm line-clamp-2 leading-snug">
                  {displayTourTitle}
                </h3>
                <div className="flex items-center gap-2 text-[11px] text-slate-500 pt-1">
                  <span className="inline-flex items-center gap-1 font-medium">
                    <Clock className="size-3 text-slate-400" />
                    {displayDuration}
                  </span>
                  <span>·</span>
                  <span className="inline-flex items-center gap-1 font-medium">
                    <Users className="size-3 text-slate-400" />
                    {guests || (isEn ? "2 Passengers" : "2 Khách")}
                  </span>
                </div>
              </div>
            </div>

            {/* ITINERARY KEY DETAILS */}
            <div className="p-3.5 bg-slate-50/80 rounded-2xl border border-slate-200/60 space-y-2 text-xs">
              <div className="flex justify-between items-center text-slate-600">
                <span className="flex items-center gap-1.5 text-slate-400">
                  <Calendar className="size-3.5" />
                  {isEn ? "Departure Date" : "Ngày khởi hành"}
                </span>
                <span className="font-bold text-slate-900">
                  {departureDate || "Khởi hành hàng ngày"}
                </span>
              </div>
              <div className="flex justify-between items-center text-slate-600">
                <span className="flex items-center gap-1.5 text-slate-400">
                  <Compass className="size-3.5" />
                  {isEn ? "Departure Point" : "Điểm xuất phát"}
                </span>
                <span className="font-bold text-slate-900">
                  {matchedTour?.departure || "Hà Nội / TP.HCM"}
                </span>
              </div>
              <div className="flex justify-between items-center text-slate-600">
                <span className="flex items-center gap-1.5 text-slate-400">
                  <Users className="size-3.5" />
                  {isEn ? "Traveler Contact" : "Người đại diện"}
                </span>
                <span className="font-bold text-slate-900 truncate max-w-[150px]">
                  {travelerName}
                </span>
              </div>
            </div>

            {/* FARE BREAKDOWN (TRANSPARENT PRICING) */}
            <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
              <div className="flex justify-between text-slate-500">
                <span>{isEn ? "Tour Package Fare" : "Giá tour trọn gói"}</span>
                <span className="font-semibold text-slate-800">{formattedAmount}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>{isEn ? "International Travel Insurance" : "Bảo hiểm du lịch 100tr/vụ"}</span>
                <span className="text-emerald-600 font-semibold">
                  {isEn ? "Included (Free)" : "Đã bao gồm (0đ)"}
                </span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>{isEn ? "VAT & Service Charge" : "Thuế VAT & Phí dịch vụ"}</span>
                <span className="text-emerald-600 font-semibold">
                  {isEn ? "Included (0 VND)" : "Đã bao gồm (0đ)"}
                </span>
              </div>

              {/* GRAND TOTAL */}
              <div className="pt-3 border-t border-slate-200/80 flex items-baseline justify-between">
                <div>
                  <span className="text-xs uppercase font-extrabold text-slate-900 block tracking-wider">
                    {isEn ? "Total Amount" : "Tổng Thanh Toán"}
                  </span>
                  <span className="text-[10px] text-slate-400 font-light">
                    {isEn ? "All taxes & fees included" : "Đã bao gồm toàn bộ thuế & phí"}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xl sm:text-2xl font-black text-[#da251d] tracking-tight">
                    {formattedAmount}
                  </span>
                </div>
              </div>
            </div>

            {/* TRUST & PROTECTION SEALS */}
            <div className="pt-4 border-t border-slate-100 space-y-2 text-[11px] text-slate-500">
              <div className="flex items-center gap-2">
                <ShieldCheck className="size-4 text-emerald-600 shrink-0" />
                <span>{isEn ? "100% Refund guarantee for force majeure cancellations" : "Cam kết hoàn tiền 100% nếu phát sinh sự cố bất khả kháng"}</span>
              </div>
              <div className="flex items-center gap-2">
                <Lock className="size-4 text-blue-600 shrink-0" />
                <span>{isEn ? "Certified by Vietnam Ministry of Industry & Trade" : "Được chứng nhận bởi Cục Du Lịch Quốc Gia & Bộ Công Thương"}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="size-4 text-amber-600 shrink-0" />
                <span>
                  {isEn ? "24/7 VIP Concierge Hotline: " : "Hotline Hỗ Trợ Khẩn Cấp 24/7: "}
                  <strong className="text-slate-800">1900 6868</strong>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
