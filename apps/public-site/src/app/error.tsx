"use client";

import { useEffect } from "react";
import Link from "next/link";
import * as Sentry from "@sentry/nextjs";
import { AlertCircle, RotateCcw, Home } from "lucide-react";
import { useLanguage } from "@/lib/i18n/context";
import { logger } from "@/lib/logger";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { isEnglish } = useLanguage();

  useEffect(() => {
    // 1. Log unexpected runtime errors for observability and remote telemetry
    logger.error("Global application runtime error caught by error boundary", error);

    // 2. Transmit directly to Sentry with error digest tag
    try {
      Sentry.captureException(error, {
        tags: {
          digest: error.digest || "unknown",
        },
      });
    } catch {
      // Sentry capture failure should never impede UI rendering
    }
  }, [error]);


  return (
    <main className="template-page-bg flex min-h-screen items-center justify-center px-6 py-12 text-center text-[#282828]">
      <div className="mx-auto max-w-md bg-white/95 p-8 sm:p-12 rounded-[2px] shadow-lg border border-slate-200/80 backdrop-blur-md">
        <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-red-50 text-[#da251d] ring-4 ring-red-100">
          <AlertCircle className="size-8" />
        </div>

        <p className="mt-4 text-xs font-bold uppercase tracking-[0.25em] text-[#da251d]">
          {isEnglish ? "SYSTEM NOTICE" : "THÔNG BÁO HỆ THỐNG"}
        </p>

        <h1 className="script-title mt-2 text-4xl sm:text-5xl text-[#0f172a]">
          {isEnglish ? "Something Went Wrong" : "Đã Có Lỗi Xảy Ra"}
        </h1>

        <p className="mt-3 text-sm font-light text-slate-600 leading-relaxed">
          {isEnglish
            ? "We encountered an unexpected technical issue. Our engineering team has been alerted. Please try again or return home."
            : "Hệ thống gặp sự cố kỹ thuật tạm thời. Đội ngũ kỹ thuật STAR đã ghi nhận nhật ký lỗi. Quý khách vui lòng thử tải lại trang."}
        </p>

        {error.digest && (
          <p className="mt-2 text-[10px] text-slate-400 font-mono">
            Error Code: {error.digest}
          </p>
        )}

        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <button
            type="button"
            onClick={() => reset()}
            className="inline-flex items-center justify-center gap-2 bg-[#da251d] text-white px-6 py-3 text-xs font-semibold uppercase tracking-wider rounded-[2px] shadow-sm transition-all duration-200 hover:bg-[#c92018] hover:shadow-[0px_8px_25px_rgba(218,37,29,0.35)] hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
          >
            <RotateCcw className="size-4" />
            <span>{isEnglish ? "TRY AGAIN" : "THỬ LẠI"}</span>
          </button>

          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 bg-white text-slate-800 border border-slate-300 px-6 py-3 text-xs font-semibold uppercase tracking-wider rounded-[2px] shadow-sm transition-all duration-200 hover:bg-white hover:border-slate-400 hover:shadow-[0px_6px_20px_rgba(0,0,0,0.10)] hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
          >
            <Home className="size-4" />
            <span>{isEnglish ? "GO HOME" : "VỀ TRANG CHỦ"}</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
