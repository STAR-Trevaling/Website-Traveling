"use client";

import { useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/lib/i18n/context";

const AWARD_IMAGES = [
  "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=400&q=80",
  "https://upload.wikimedia.org/wikipedia/commons/3/33/Kem_Beach_aerial_view_Phu_Quoc_Island_Vietnam.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/f/fd/Terraced_fields_Sa_Pa_Vietnam.JPG",
  "https://upload.wikimedia.org/wikipedia/commons/e/e2/Da_Lat_-_Viet_Nam.jpg",
  "/assets/adventures/canal-cruise.jpg",
];

export function NewsletterAwards() {
  const { t, isVietnamese } = useLanguage();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
    }
  };

  return (
    <section className="relative w-full py-12 sm:py-16 md:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-12 lg:px-16">
        <div className="grid gap-8 sm:gap-10 lg:grid-cols-[390px_1fr] xl:grid-cols-[430px_1fr] lg:gap-12 xl:gap-16 items-stretch">
          
          {/* LEFT: NEWSLETTER CARD (Balanced height, perfectly aligned with right side) */}
          <div className="mx-auto w-full max-w-[440px] bg-[#dceee9]/95 p-6 sm:p-8 md:p-10 lg:p-9 xl:p-10 shadow-xl border border-white/70 rounded-[2px] flex flex-col justify-between">
            <div>
              {/* Symmetrical, elegant 2-line title without single orphan words */}
              <h2 className="display-title text-center text-2xl sm:text-3xl lg:text-[34px] font-black tracking-wider text-[#1e293b] leading-tight text-balance">
                {isVietnamese ? (
                  <>
                    <span className="block">BẢN TIN</span>
                    <span className="block mt-0.5">DU LỊCH</span>
                  </>
                ) : (
                  <span className="block">NEWSLETTER</span>
                )}
              </h2>
              <p className="mx-auto mt-2.5 sm:mt-3 max-w-[320px] text-center text-xs sm:text-sm font-light leading-relaxed text-[#4b5563] text-balance">
                {t.newsletter.subheading}
              </p>
            </div>

            {subscribed ? (
              <div className="my-auto rounded bg-white/90 p-5 sm:p-6 text-center text-xs sm:text-sm font-bold text-emerald-800 shadow-sm">
                {t.newsletter.successMessage}
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-5 sm:mt-7 space-y-3.5 sm:space-y-4">
                <div>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t.newsletter.namePlaceholder}
                    className="h-11 sm:h-12 w-full bg-white px-4 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 outline-none shadow-sm transition focus:ring-2 focus:ring-[#da251d]"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t.newsletter.emailPlaceholder}
                    className="h-11 sm:h-12 w-full bg-white px-4 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 outline-none shadow-sm transition focus:ring-2 focus:ring-[#da251d]"
                  />
                </div>

                <div className="pt-2 sm:pt-3 text-center">
                  <button
                    type="submit"
                    className="w-full inline-block px-7 py-3 sm:py-3.5 bg-slate-900 text-white text-xs md:text-sm font-bold tracking-[0.2em] sm:tracking-[0.25em] transition-all duration-200 hover:bg-slate-800 hover:shadow-[0px_8px_25px_rgba(15,23,42,0.30)] hover:-translate-y-0.5 active:translate-y-0 uppercase cursor-pointer"
                  >
                    {t.newsletter.submitBtn}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* RIGHT: AWARD WINNING & 6 ITEMS GRID (Aligned baseline & equal stretch) */}
          <div className="flex flex-col justify-between">
            <div>
              {/* Elegant title with non-breaking '& Di Sản' to prevent single-word orphan wrap */}
              <h2 className="script-title text-3xl sm:text-4xl md:text-[46px] lg:text-[52px] xl:text-[56px] text-[#1e293b] leading-[1.2] text-balance">
                {isVietnamese ? (
                  <>
                    <span className="inline">Vinh Danh Kỳ Quan</span>{" "}
                    <span className="inline-block whitespace-nowrap">& Di Sản</span>
                  </>
                ) : (
                  <span className="inline">Award Winning & Heritage</span>
                )}
              </h2>
              <p className="mt-2 sm:mt-2.5 max-w-xl text-xs sm:text-sm md:text-base font-light leading-relaxed text-[#4b5563] text-balance">
                {t.awards.subheading}
              </p>
            </div>

            {/* 2 Columns x 3 Rows Layout with Stagger Delay */}
            <div className="mt-6 sm:mt-7 grid grid-cols-1 sm:grid-cols-2 gap-x-5 sm:gap-x-6 lg:gap-x-8 gap-y-3 sm:gap-y-4">
              {t.awards.items.map((item, idx) => {
                const delayClass = idx === 0 ? "" : idx === 1 ? "animation-delay-100" : idx === 2 ? "animation-delay-200" : idx === 3 ? "animation-delay-300" : idx === 4 ? "animation-delay-400" : "animation-delay-500";
                return (
                  <div
                    key={idx}
                    className={`group flex items-center gap-3 sm:gap-3.5 p-2 rounded-[2px] transition-all duration-300 hover:bg-white/80 hover:shadow-sm hover:-translate-y-0.5 cursor-pointer border border-transparent hover:border-slate-200/60 transform-gpu ${delayClass}`}
                  >
                    {/* Photo thumbnail */}
                    <div className="relative h-[68px] w-[94px] sm:h-[76px] sm:w-[106px] md:h-[80px] md:w-[114px] shrink-0 overflow-hidden shadow-sm rounded-[2px] bg-slate-200">
                      <Image
                        src={AWARD_IMAGES[idx] || AWARD_IMAGES[0]}
                        alt={item.title}
                        fill
                        unoptimized
                        className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />
                    </div>

                    {/* Text details */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xs sm:text-[13px] md:text-sm font-bold text-[#1e293b] leading-snug group-hover:text-[#0098a2] transition-colors duration-200">
                        {item.title}
                      </h3>
                      <p className="mt-0.5 text-[11px] sm:text-xs text-[#64748b] font-light leading-relaxed line-clamp-2">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
