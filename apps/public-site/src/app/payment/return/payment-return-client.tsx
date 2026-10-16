"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { CheckCircle2, XCircle, Loader2, ArrowRight, RefreshCw, PhoneCall } from "lucide-react";
import { publicApi } from "@/lib/api";

interface PaymentReturnClientProps {
  txnRef: string;
  responseCode?: string;
  amount?: string;
  bankCode?: string;
  isEn?: boolean;
}

interface PaymentData {
  transaction_code: string;
  booking_code: string;
  status: string;
  amount: string;
  currency: string;
  gateway: string;
  provider_ref?: string;
  created_at: string;
  completed_at?: string;
  is_paid: boolean;
}

export function PaymentReturnClient({
  txnRef,
  responseCode,
  amount,
  bankCode,
  isEn = false,
}: PaymentReturnClientProps) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<PaymentData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pollCount, setPollCount] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const checkStatus = async () => {
    try {
      const res = await publicApi.queryPayment(txnRef);
      setData(res);

      if (res.status === "success") {
        setLoading(false);
        if (intervalRef.current) clearInterval(intervalRef.current);
        return true;
      }

      if (res.status === "failed" || res.status === "expired") {
        setLoading(false);
        if (intervalRef.current) clearInterval(intervalRef.current);
        return true;
      }

      return false;
    } catch {
      // If backend query fails or network delay, keep attempting
      return false;
    }
  };

  useEffect(() => {
    if (!txnRef) {
      setLoading(false);
      setError(
        isEn
          ? "No transaction reference provided in payment callback."
          : "Không tìm thấy mã tham chiếu giao dịch trong phản hồi thanh toán."
      );
      return;
    }

    let attempts = 0;
    const maxAttempts = 7; // 7 attempts * 3s = 21s max polling

    // First immediate check
    checkStatus().then((finished) => {
      if (finished) return;

      intervalRef.current = setInterval(async () => {
        attempts += 1;
        setPollCount(attempts);
        const done = await checkStatus();
        if (done || attempts >= maxAttempts) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          setLoading(false);
        }
      }, 3000);
    });

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [txnRef, isEn]);

  const formatVND = (val?: string | number) => {
    if (!val) return "0 ₫";
    const num = typeof val === "string" ? parseFloat(val) : val;
    return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(num);
  };

  const getFailureReason = (code?: string) => {
    switch (code) {
      case "24":
        return isEn
          ? "Transaction cancelled by customer on VNPay gateway."
          : "Giao dịch đã được hủy bởi khách hàng trên cổng thanh toán VNPay.";
      case "51":
        return isEn
          ? "Insufficient account balance."
          : "Tài khoản của quý khách không đủ số dư để thực hiện giao dịch.";
      case "65":
        return isEn
          ? "Daily transaction limit exceeded."
          : "Tài khoản của quý khách đã vượt quá hạn mức giao dịch trong ngày.";
      case "75":
        return isEn
          ? "Bank is currently under maintenance."
          : "Ngân hàng thanh toán đang bảo trì hệ thống. Vui lòng thử lại sau.";
      case "79":
        return isEn
          ? "Payment authentication (OTP) failed multiple times."
          : "Quý khách đã nhập sai mật khẩu/mã OTP quá số lần quy định.";
      default:
        return isEn
          ? "Payment failed or was declined by issuing bank."
          : "Giao dịch thanh toán không thành công hoặc bị từ chối bởi ngân hàng phát hành.";
    }
  };

  // State 1: Polling / Processing
  if (loading) {
    return (
      <div className="rounded-[2px] bg-white/95 backdrop-blur-md p-8 sm:p-12 shadow-xl border border-white/80 max-w-xl mx-auto text-center">
        <div className="size-16 mx-auto mb-6 flex items-center justify-center rounded-full bg-[#0098a2]/10 text-[#0098a2]">
          <Loader2 className="size-8 animate-spin" />
        </div>
        <span className="inline-block px-3 py-1 rounded-[2px] bg-[#0098a2]/15 text-[#007a82] border border-[#0098a2]/25 text-[11px] font-bold uppercase tracking-[0.2em] mb-3">
          {isEn ? "VERIFYING PAYMENT" : "ĐANG XÁC THỰC THANH TOÁN"}
        </span>
        <h2 className="script-title text-2xl sm:text-3xl text-slate-900 mt-2">
          {isEn ? "Processing with VNPay" : "Đang Đối Soát Với Cổng VNPay"}
        </h2>
        <p className="mt-3 text-xs sm:text-sm text-slate-600 font-light leading-relaxed max-w-md mx-auto">
          {isEn
            ? "We are verifying your transaction with VNPay gateway in real-time. Please do not close or refresh this browser window."
            : "Hệ thống đang đối soát dữ liệu chữ ký số với cổng VNPay. Vui lòng giữ nguyên màn hình trong giây lát."}
        </p>

        <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-center gap-2 text-xs text-slate-400">
          <RefreshCw className="size-3.5 animate-spin text-[#0098a2]" />
          <span>
            {isEn ? `Verifying attempt ${pollCount + 1}/7...` : `Đang kết nối cổng (lần ${pollCount + 1}/7)...`}
          </span>
        </div>
      </div>
    );
  }

  // State 2: Success
  const isSuccess = data?.is_paid || data?.status === "success" || responseCode === "00";
  if (isSuccess) {
    return (
      <div className="rounded-[2px] bg-white/95 backdrop-blur-md p-6 sm:p-10 shadow-2xl border border-white/90 max-w-xl mx-auto text-center">
        <div className="size-16 sm:size-20 mx-auto mb-5 flex items-center justify-center rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100 shadow-sm">
          <CheckCircle2 className="size-10 sm:size-12 stroke-[1.75]" />
        </div>

        <span className="inline-block px-3.5 py-1 rounded-[2px] bg-emerald-100 text-emerald-800 border border-emerald-200 text-[11px] font-bold uppercase tracking-[0.2em] mb-2">
          {isEn ? "PAYMENT CONFIRMED" : "THANH TOÁN THÀNH CÔNG"}
        </span>

        <h1 className="script-title text-3xl sm:text-4xl text-slate-900 mt-1">
          {isEn ? "Booking Confirmed!" : "Đặt Chỗ Đã Được Xác Nhận!"}
        </h1>

        <p className="mt-2 text-xs sm:text-sm text-slate-600 font-light leading-relaxed">
          {isEn
            ? "Thank you! Your payment has been securely verified and your travel itinerary is officially secured."
            : "Cảm ơn Quý khách! Giao dịch thanh toán đã được xác thực an toàn. Lịch trình khám phá của Quý khách đã sẵn sàng."}
        </p>

        {/* Transaction Summary Card */}
        <div className="mt-6 rounded-[2px] bg-slate-50/80 border border-slate-200/70 p-4 sm:p-5 text-left text-xs sm:text-sm space-y-2.5">
          <div className="flex justify-between items-center pb-2 border-b border-slate-200/60">
            <span className="text-slate-500 font-light">{isEn ? "Booking Code" : "Mã Đặt Tour"}</span>
            <span className="font-bold text-slate-900 font-mono text-sm sm:text-base">
              {data?.booking_code || "STAR-BOOKING"}
            </span>
          </div>
          <div className="flex justify-between items-center pb-2 border-b border-slate-200/60">
            <span className="text-slate-500 font-light">{isEn ? "Total Amount" : "Số Tiền Thanh Toán"}</span>
            <span className="font-bold text-[#da251d] text-base sm:text-lg">
              {formatVND(data?.amount || (amount ? parseInt(amount, 10) / 100 : 0))}
            </span>
          </div>
          <div className="flex justify-between items-center pb-2 border-b border-slate-200/60">
            <span className="text-slate-500 font-light">{isEn ? "Transaction Reference" : "Mã Giao Dịch"}</span>
            <span className="font-medium text-slate-800 font-mono text-xs">{txnRef}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-500 font-light">{isEn ? "Payment Gateway" : "Cổng Thanh Toán"}</span>
            <span className="font-medium text-slate-800">VNPay Sandbox {bankCode ? `(${bankCode})` : ""}</span>
          </div>
        </div>

        {/* CTA Actions */}
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/tours"
            className="inline-flex items-center justify-center gap-2 rounded-[2px] bg-[#da251d] text-white px-6 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider shadow-sm transition hover:bg-[#c92018] hover:shadow-[0px_8px_25px_rgba(218,37,29,0.35)] cursor-pointer"
          >
            {isEn ? "Explore More Tours" : "Khám Phá Thêm Tour"}
            <ArrowRight className="size-4" />
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-[2px] bg-white border border-slate-300 text-slate-800 px-6 py-3 text-xs sm:text-sm font-semibold uppercase tracking-wider hover:bg-slate-50 transition cursor-pointer"
          >
            {isEn ? "Return Home" : "Về Trang Chủ"}
          </Link>
        </div>
      </div>
    );
  }

  // State 3: Failure
  return (
    <div className="rounded-[2px] bg-white/95 backdrop-blur-md p-6 sm:p-10 shadow-2xl border border-white/90 max-w-xl mx-auto text-center">
      <div className="size-16 sm:size-20 mx-auto mb-5 flex items-center justify-center rounded-full bg-red-50 text-red-600 border border-red-100 shadow-sm">
        <XCircle className="size-10 sm:size-12 stroke-[1.75]" />
      </div>

      <span className="inline-block px-3.5 py-1 rounded-[2px] bg-red-100 text-red-800 border border-red-200 text-[11px] font-bold uppercase tracking-[0.2em] mb-2">
        {isEn ? "PAYMENT FAILED" : "THANH TOÁN THẤT BẠI"}
      </span>

      <h1 className="script-title text-3xl sm:text-4xl text-slate-900 mt-1">
        {isEn ? "Transaction Unsuccessful" : "Giao Dịch Chưa Hoàn Tất"}
      </h1>

      <p className="mt-2 text-xs sm:text-sm text-slate-600 font-light leading-relaxed">
        {error || getFailureReason(responseCode || data?.status)}
      </p>

      {/* Transaction Summary Card */}
      <div className="mt-6 rounded-[2px] bg-slate-50/80 border border-slate-200/70 p-4 sm:p-5 text-left text-xs sm:text-sm space-y-2.5">
        <div className="flex justify-between items-center pb-2 border-b border-slate-200/60">
          <span className="text-slate-500 font-light">{isEn ? "Transaction Reference" : "Mã Giao Dịch"}</span>
          <span className="font-medium text-slate-800 font-mono text-xs">{txnRef}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-slate-500 font-light">{isEn ? "Response Code" : "Mã Lỗi Phản Hồi"}</span>
          <span className="font-bold text-red-600 font-mono">{responseCode || "FAILED"}</span>
        </div>
      </div>

      {/* CTA Actions */}
      <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
        <Link
          href="/tours"
          className="inline-flex items-center justify-center gap-2 rounded-[2px] bg-[#da251d] text-white px-6 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider shadow-sm transition hover:bg-[#c92018] cursor-pointer"
        >
          {isEn ? "Retry Booking" : "Thử Thanh Toán Lại"}
          <RefreshCw className="size-3.5" />
        </Link>
        <Link
          href="/contact"
          className="inline-flex items-center justify-center gap-2 rounded-[2px] bg-white border border-slate-300 text-slate-800 px-6 py-3 text-xs sm:text-sm font-semibold uppercase tracking-wider hover:bg-slate-50 transition cursor-pointer"
        >
          <PhoneCall className="size-3.5 text-slate-600" />
          {isEn ? "Customer Support" : "Hỗ Trợ 24/7"}
        </Link>
      </div>
    </div>
  );
}
