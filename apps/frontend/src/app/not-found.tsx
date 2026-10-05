import Link from "next/link";
import { ArrowLeft, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <main className="template-page-bg flex min-h-screen items-center justify-center px-6 text-center text-[#282828]">
      <div className="mx-auto max-w-md bg-white/90 p-10 md:p-14 rounded-[2px] shadow-sm border border-slate-100 backdrop-blur-md">
        <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-[#0098a2]/10 text-[#0098a2]">
          <Compass className="size-8" />
        </div>
        <p className="mt-4 text-xs font-bold uppercase tracking-[0.25em] text-[#0098a2]">
          Mã Lỗi 404
        </p>
        <h1 className="script-title mt-2 text-5xl md:text-6xl text-[#1e293b]">
          Lạc Bước Hành Trình
        </h1>
        <p className="mt-3 text-sm font-light text-slate-600 leading-relaxed">
          Trang hoặc điểm đến bạn đang tìm kiếm không tồn tại hoặc đã được chuyển sang hành trình mới.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 bg-[#0098a2] hover:bg-[#087c86] text-white px-6 py-3 text-xs font-semibold uppercase tracking-wider rounded-[2px] shadow-sm transition"
          >
            <ArrowLeft className="size-4" />
            <span>Về Trang Chủ</span>
          </Link>
          <Link
            href="/tours"
            className="inline-flex items-center justify-center bg-slate-100 hover:bg-slate-200 text-slate-700 px-6 py-3 text-xs font-semibold uppercase tracking-wider rounded-[2px] transition"
          >
            Khám Phá Tour
          </Link>
        </div>
      </div>
    </main>
  );
}
