"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  QrCode,
  CreditCard,
  Copy,
  Check,
  Clock,
  AlertCircle,
  ShieldCheck,
  RotateCcw,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import { publicApi } from "@/lib/api";

interface PaymentClientProps {
  bookingId: string;
  initialBookingCode?: string;
  initialAmount?: string;
  isEn?: boolean;
}

interface VietQRData {
  payment_id: string;
  transaction_code: string;
  booking_code: string;
  amount: string;
  currency: string;
  status: string;
  expires_at: string;
  qr_code_url: string;
  emvco_payload: string;
  bank_info: {
    bank_name: string;
    bank_bin: string;
    account_number: string;
    account_name: string;
    amount: number;
    transfer_content: string;
  };
}

export function PaymentClient({
  bookingId,
  initialBookingCode,
  initialAmount,
  isEn = false,
}: PaymentClientProps) {
  const router = useRouter();
  const [gateway, setGateway] = useState<"vietqr" | "vnpay">("vietqr");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // VietQR state
  const [vietQrData, setVietQrData] = useState<VietQRData | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(15 * 60); // 15 mins in seconds
  const [isExpired, setIsExpired] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const bookingCode = vietQrData?.booking_code || initialBookingCode || bookingId;

  // 1. Initialize VietQR payment transaction
  const initVietQRPayment = useCallback(async () => {
    setLoading(true);
    setError(null);
    setIsExpired(false);
    try {
      const res = await publicApi.createPayment({
        booking_code: bookingCode,
        gateway: "vietqr",
      });

      if (res && res.qr_code_url && res.bank_info) {
        setVietQrData(res as unknown as VietQRData);
        // Calculate remaining seconds based on expires_at
        const expireTime = new Date(res.expires_at).getTime();
        const now = Date.now();
        const diffSecs = Math.max(0, Math.floor((expireTime - now) / 1000));
        setTimeLeft(diffSecs > 0 ? diffSecs : 15 * 60);
      } else {
        setError(
          isEn
            ? "Could not generate VietQR payload. Please try again."
            : "Không thể tạo mã VietQR. Vui lòng thử lại."
        );
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setError(msg || (isEn ? "Failed to initialize payment" : "Không thể khởi tạo thanh toán"));
    } finally {
      setLoading(false);
    }
  }, [bookingCode, isEn]);

  // Initial load when gateway is vietqr
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

  // 3. Polling status every 5 seconds
  useEffect(() => {
    if (!vietQrData || isConfirmed || isExpired) return;

    const paymentId = vietQrData.payment_id || vietQrData.transaction_code;

    const interval = setInterval(async () => {
      try {
        const res = await publicApi.getPaymentStatus(paymentId);
        if (res && (res.state === "success" || res.status === "success" || res.is_paid)) {
          setIsConfirmed(true);
          clearInterval(interval);
          // Redirect to success page
          router.push(`/booking/${encodeURIComponent(bookingCode)}/success`);
        } else if (res && (res.state === "expired" || res.status === "expired")) {
          setIsExpired(true);
          clearInterval(interval);
        }
      } catch {
        // Polling silent error catch
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [vietQrData, isConfirmed, isExpired, router, bookingCode]);

  // Copy to clipboard helper
  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  // VNPay Checkout handler
  const handleVNPayCheckout = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await publicApi.createPayment({
        booking_code: bookingCode,
        gateway: "vnpay",
        locale: isEn ? "en" : "vn",
      });

      if (res.payment_url) {
        window.location.href = res.payment_url;
      } else {
        setError(
          isEn
            ? "Could not obtain VNPay payment URL."
            : "Không nhận được liên kết thanh toán VNPay."
        );
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setError(msg || (isEn ? "Failed to redirect to VNPay" : "Không thể chuyển sang VNPay"));
    } finally {
      setLoading(false);
    }
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTimer = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      {/* HEADER SUMMARY */}
      <div className="bg-white/90 p-6 sm:p-8 rounded-[2px] shadow-sm border border-slate-100 backdrop-blur-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#0098a2] font-bold">
              {isEn ? "Checkout & Payment" : "Thanh Toán Đặt Chỗ"}
            </span>
            <h1 className="display-title text-2xl sm:text-3xl font-black text-[#1e293b] mt-1">
              {isEn ? "Choose Payment Method" : "Chọn Phương Thức Thanh Toán"}
            </h1>
          </div>
          <div className="text-left sm:text-right">
            <span className="text-xs text-slate-500 font-light block">
              {isEn ? "Booking Code" : "Mã đơn hàng"}
            </span>
            <span className="font-mono font-bold text-slate-800 text-lg">
              {bookingCode}
            </span>
          </div>
        </div>

        {/* GATEWAY SELECTOR TABS */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => setGateway("vietqr")}
            className={`p-4 rounded-[2px] border text-left transition flex items-start gap-4 ${
              gateway === "vietqr"
                ? "border-[#0098a2] bg-[#0098a2]/5 ring-1 ring-[#0098a2]"
                : "border-slate-200 hover:border-slate-300 bg-white"
            }`}
          >
            <div
              className={`p-2 rounded ${
                gateway === "vietqr" ? "bg-[#0098a2] text-white" : "bg-slate-100 text-slate-600"
              }`}
            >
              <QrCode className="size-6" />
            </div>
            <div>
              <div className="font-bold text-slate-900 text-sm sm:text-base flex items-center gap-2">
                VietQR (NAPAS 247)
                <span className="text-[10px] bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded">
                  {isEn ? "Direct Bank Transfer" : "Khuyên dùng"}
                </span>
              </div>
              <p className="text-xs text-slate-500 font-light mt-1">
                {isEn
                  ? "Scan QR via any Vietnam banking app (Vietcombank, MB, Techcombank...)"
                  : "Quét mã QR qua app ngân hàng bất kỳ, tiền vào thẳng tài khoản công ty."}
              </p>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setGateway("vnpay")}
            className={`p-4 rounded-[2px] border text-left transition flex items-start gap-4 ${
              gateway === "vnpay"
                ? "border-[#0098a2] bg-[#0098a2]/5 ring-1 ring-[#0098a2]"
                : "border-slate-200 hover:border-slate-300 bg-white"
            }`}
          >
            <div
              className={`p-2 rounded ${
                gateway === "vnpay" ? "bg-[#0098a2] text-white" : "bg-slate-100 text-slate-600"
              }`}
            >
              <CreditCard className="size-6" />
            </div>
            <div>
              <div className="font-bold text-slate-900 text-sm sm:text-base flex items-center gap-2">
                VNPay Gateway
                <span className="text-[10px] bg-blue-100 text-blue-800 font-semibold px-2 py-0.5 rounded">
                  ATM / Visa / VNPAY-QR
                </span>
              </div>
              <p className="text-xs text-slate-500 font-light mt-1">
                {isEn
                  ? "Pay with domestic ATM card, Visa/Mastercard, or VNPAY E-Wallet."
                  : "Thanh toán bằng thẻ ATM nội địa, thẻ quốc tế hoặc ví điện tử VNPAY."}
              </p>
            </div>
          </button>
        </div>
      </div>

      {/* ERROR ALERT */}
      {error && (
        <div className="p-4 rounded-[2px] bg-red-50 border border-red-200 text-red-700 flex items-center gap-3 text-sm">
          <AlertCircle className="size-5 shrink-0 text-red-500" />
          <span>{error}</span>
        </div>
      )}

      {/* TAB 1: VIETQR PAYMENT DISPLAY */}
      {gateway === "vietqr" && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* QR CODE DISPLAY (5 COLS) */}
          <div className="md:col-span-5 bg-white/90 p-6 sm:p-8 rounded-[2px] shadow-sm border border-slate-100 backdrop-blur-md flex flex-col items-center justify-between text-center">
            <div className="w-full">
              <div className="flex items-center justify-between w-full mb-4">
                <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
                  <QrCode className="size-4 text-[#0098a2]" />
                  {isEn ? "Scan to Pay" : "Quét mã để trả"}
                </span>

                {/* TIMER BADGE */}
                <span
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-mono font-bold ${
                    isExpired
                      ? "bg-red-100 text-red-700"
                      : timeLeft < 180
                      ? "bg-amber-100 text-amber-800 animate-pulse"
                      : "bg-slate-100 text-slate-700"
                  }`}
                >
                  <Clock className="size-3.5" />
                  {isExpired ? (isEn ? "Expired" : "Hết hạn") : formattedTimer}
                </span>
              </div>

              {/* QR IMAGE CONTAINER */}
              <div className="relative mx-auto size-64 sm:size-72 p-3 bg-white border border-slate-200 rounded-[2px] shadow-inner flex items-center justify-center">
                {loading ? (
                  <div className="text-xs text-slate-400 animate-pulse">
                    {isEn ? "Generating QR..." : "Đang tạo mã VietQR..."}
                  </div>
                ) : isExpired ? (
                  <div className="p-4 text-center space-y-3">
                    <AlertCircle className="size-10 text-red-500 mx-auto" />
                    <p className="text-xs text-red-600 font-semibold">
                      {isEn ? "QR code expired" : "Mã QR đã hết thời gian"}
                    </p>
                    <button
                      type="button"
                      onClick={initVietQRPayment}
                      className="px-3 py-1.5 bg-[#0098a2] text-white text-xs font-bold rounded flex items-center gap-1.5 mx-auto hover:bg-[#00828a] transition"
                    >
                      <RotateCcw className="size-3.5" />
                      {isEn ? "Regenerate QR" : "Tạo lại mã QR"}
                    </button>
                  </div>
                ) : vietQrData?.qr_code_url ? (
                  <Image
                    src={vietQrData.qr_code_url}
                    alt="VietQR NAPAS 247"
                    width={280}
                    height={280}
                    className="size-full object-contain"
                    unoptimized
                  />
                ) : (
                  <div className="text-xs text-slate-400">
                    {isEn ? "QR not available" : "Chưa có mã QR"}
                  </div>
                )}
              </div>
            </div>

            <p className="text-xs text-slate-500 font-light mt-4 leading-relaxed">
              {isEn
                ? "Open any banking app (VCB, MB, TCB, VPB, BIDV...) and scan this QR code."
                : "Mở ứng dụng ngân hàng bất kỳ để quét mã QR chuyển nhanh Napas 247."}
            </p>
          </div>

          {/* BANK ACCOUNT TEXT DETAILS (7 COLS) */}
          <div className="md:col-span-7 bg-white/90 p-6 sm:p-8 rounded-[2px] shadow-sm border border-slate-100 backdrop-blur-md flex flex-col justify-between">
            <div className="space-y-4">
              <div>
                <h3 className="display-title text-lg font-bold text-slate-900">
                  {isEn ? "Manual Bank Transfer Details" : "Thông Tin Chuyển Khoản Thủ Công"}
                </h3>
                <p className="text-xs text-slate-500 font-light mt-0.5">
                  {isEn
                    ? "In case you cannot scan the QR code, please transfer manually with exact info:"
                    : "Trường hợp không quét được QR, vui lòng chuyển khoản chính xác thông tin sau:"}
                </p>
              </div>

              {/* DETAILS TABLE */}
              <div className="space-y-3 pt-2">
                {/* BANK NAME */}
                <div className="p-3 bg-slate-50 border border-slate-200/80 rounded flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-slate-500 block">
                      {isEn ? "Beneficiary Bank" : "Ngân hàng thụ hưởng"}
                    </span>
                    <span className="font-semibold text-slate-900 text-sm">
                      {vietQrData?.bank_info.bank_name || "MBBank"} (
                      {vietQrData?.bank_info.bank_bin || "970422"})
                    </span>
                  </div>
                </div>

                {/* ACCOUNT NUMBER */}
                <div className="p-3 bg-slate-50 border border-slate-200/80 rounded flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-slate-500 block">
                      {isEn ? "Account Number" : "Số tài khoản"}
                    </span>
                    <span className="font-mono font-bold text-slate-900 text-base sm:text-lg">
                      {vietQrData?.bank_info.account_number || "0987654321"}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      handleCopy(
                        vietQrData?.bank_info.account_number || "0987654321",
                        "account_number"
                      )
                    }
                    className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-200 rounded transition flex items-center gap-1 text-xs"
                    title={isEn ? "Copy" : "Sao chép"}
                  >
                    {copiedField === "account_number" ? (
                      <Check className="size-4 text-emerald-600" />
                    ) : (
                      <Copy className="size-4" />
                    )}
                    <span className="hidden sm:inline">
                      {copiedField === "account_number"
                        ? isEn
                          ? "Copied"
                          : "Đã chép"
                        : isEn
                        ? "Copy"
                        : "Sao chép"}
                    </span>
                  </button>
                </div>

                {/* ACCOUNT NAME */}
                <div className="p-3 bg-slate-50 border border-slate-200/80 rounded flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-slate-500 block">
                      {isEn ? "Account Holder" : "Chủ tài khoản"}
                    </span>
                    <span className="font-semibold text-slate-900 text-sm">
                      {vietQrData?.bank_info.account_name ||
                        "CONG TY TNHH STAR TRAVELS VIET NAM"}
                    </span>
                  </div>
                </div>

                {/* AMOUNT */}
                <div className="p-3 bg-slate-50 border border-slate-200/80 rounded flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-slate-500 block">
                      {isEn ? "Amount to Transfer" : "Số tiền thanh toán"}
                    </span>
                    <span className="font-mono font-black text-amber-700 text-lg sm:text-xl">
                      {vietQrData?.bank_info.amount
                        ? Number(vietQrData.bank_info.amount).toLocaleString("vi-VN") + " VND"
                        : initialAmount || "0 VND"}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      handleCopy(
                        String(vietQrData?.bank_info.amount || ""),
                        "amount"
                      )
                    }
                    className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-200 rounded transition flex items-center gap-1 text-xs"
                  >
                    {copiedField === "amount" ? (
                      <Check className="size-4 text-emerald-600" />
                    ) : (
                      <Copy className="size-4" />
                    )}
                    <span className="hidden sm:inline">
                      {copiedField === "amount"
                        ? isEn
                          ? "Copied"
                          : "Đã chép"
                        : isEn
                        ? "Copy"
                        : "Sao chép"}
                    </span>
                  </button>
                </div>

                {/* TRANSFER CONTENT (CRITICAL) */}
                <div className="p-3 bg-amber-50/70 border border-amber-300 rounded flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-amber-800 font-bold block">
                      {isEn
                        ? "Transfer Content (DO NOT MODIFY)"
                        : "Nội dung chuyển khoản (BẮT BUỘC CHÍNH XÁC)"}
                    </span>
                    <span className="font-mono font-black text-amber-950 text-base sm:text-lg">
                      {bookingCode}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy(bookingCode, "transfer_content")}
                    className="p-2 text-amber-900 hover:bg-amber-200/80 rounded transition flex items-center gap-1 text-xs font-bold"
                  >
                    {copiedField === "transfer_content" ? (
                      <Check className="size-4 text-emerald-600" />
                    ) : (
                      <Copy className="size-4" />
                    )}
                    <span className="hidden sm:inline">
                      {copiedField === "transfer_content"
                        ? isEn
                          ? "Copied"
                          : "Đã chép"
                        : isEn
                        ? "Copy"
                        : "Sao chép"}
                    </span>
                  </button>
                </div>
              </div>

              {/* WAITING NOTIFICATION BANNER */}
              <div className="p-3.5 bg-blue-50 border border-blue-200 rounded text-blue-900 text-xs leading-relaxed flex items-start gap-2.5">
                <Clock className="size-4 text-blue-600 shrink-0 mt-0.5" />
                <span>
                  {isEn
                    ? "Your booking will be automatically confirmed within a few minutes once our accounting system confirms receipt. You do not need to refresh this page."
                    : "Đơn hàng sẽ được xác nhận tự động trong vài phút sau khi kế toán chúng tôi nhận được chuyển khoản. Hệ thống tự cập nhật, quý khách không cần tải lại trang."}
                </span>
              </div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-100">
              <Link
                href="/account/bookings"
                className="text-xs text-slate-600 hover:text-slate-900 font-medium"
              >
                {isEn ? "← View my bookings" : "← Xem danh sách đơn hàng"}
              </Link>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <ShieldCheck className="size-4 text-emerald-600" />
                <span>{isEn ? "Protected by STAR Security" : "Bảo mật chuẩn STAR Travels"}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: VNPAY GATEWAY REDIRECT */}
      {gateway === "vnpay" && (
        <div className="bg-white/90 p-8 sm:p-10 rounded-[2px] shadow-sm border border-slate-100 backdrop-blur-md max-w-2xl mx-auto text-center space-y-6">
          <div className="flex size-16 items-center justify-center rounded-full bg-blue-50 text-blue-600 mx-auto">
            <CreditCard className="size-8" />
          </div>

          <div>
            <h3 className="display-title text-xl font-bold text-slate-900">
              {isEn ? "Pay Online via VNPay" : "Thanh Toán Trực Tuyến Qua VNPay"}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 font-light mt-2 max-w-md mx-auto">
              {isEn
                ? "You will be securely redirected to the VNPay payment gateway to complete your transaction with domestic card, Visa/Mastercard, or VNPay QR."
                : "Quý khách sẽ được chuyển hướng an toàn sang cổng VNPay để hoàn tất thanh toán bằng thẻ ATM, thẻ quốc tế hoặc VNPAY-QR."}
            </p>
          </div>

          <div className="pt-2">
            <button
              type="button"
              disabled={loading}
              onClick={handleVNPayCheckout}
              className="px-6 py-3 bg-[#0098a2] hover:bg-[#00828a] text-white font-bold rounded-[2px] transition flex items-center justify-center gap-2 mx-auto disabled:opacity-50"
            >
              <span>{loading ? (isEn ? "Connecting..." : "Đang kết nối...") : (isEn ? "Proceed to VNPay" : "Chuyển Sang Cổng VNPay")}</span>
              <ExternalLink className="size-4" />
            </button>
          </div>

          <p className="text-[11px] text-slate-400">
            {isEn
              ? "Transactions are encrypted with 256-bit SSL standard."
              : "Giao dịch được mã hóa chuẩn bảo mật SSL 256-bit."}
          </p>
        </div>
      )}
    </div>
  );
}
