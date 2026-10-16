import Link from "next/link";
import { cookies } from "next/headers";
import { ArrowLeft, Compass } from "lucide-react";
import { DICTIONARY } from "@/lib/i18n/dictionary";

export default async function NotFound() {
  const cookieStore = await cookies();
  const isEn = cookieStore.get("star_travels_locale")?.value === "en";
  const dict = DICTIONARY[isEn ? "en" : "vi"];
  const nf = dict.notFoundPage;

  return (
    <main className="template-page-bg flex min-h-screen items-center justify-center px-6 text-center text-[#282828]">
      <div className="mx-auto max-w-md bg-white/90 p-10 md:p-14 rounded-[2px] shadow-sm border border-slate-100 backdrop-blur-md">
        <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-slate-100 text-slate-800">
          <Compass className="size-8" />
        </div>
        <p className="mt-4 text-xs font-bold uppercase tracking-[0.25em] text-slate-900">
          {nf.errorCode}
        </p>
        <h1 className="script-title mt-2 text-5xl md:text-6xl text-[#1e293b]">
          {nf.title}
        </h1>
        <p className="mt-3 text-sm font-light text-slate-600 leading-relaxed">
          {nf.description}
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 bg-[#da251d] text-white px-6 py-3 text-xs font-semibold uppercase tracking-wider rounded-[2px] shadow-sm transition-all duration-200 hover:bg-[#c92018] hover:shadow-[0px_8px_25px_rgba(218,37,29,0.35)] hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
          >
            <ArrowLeft className="size-4" />
            <span>{nf.backHomeBtn}</span>
          </Link>
          <Link
            href="/tours"
            className="inline-flex items-center justify-center bg-white text-slate-800 border border-slate-300 px-6 py-3 text-xs font-semibold uppercase tracking-wider rounded-[2px] shadow-sm transition-all duration-200 hover:bg-white hover:border-slate-400 hover:shadow-[0px_6px_20px_rgba(0,0,0,0.10)] hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
          >
            {nf.exploreToursBtn}
          </Link>
        </div>
      </div>
    </main>
  );
}
