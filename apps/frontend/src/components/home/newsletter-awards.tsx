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
  const { t } = useLanguage();
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
    <section className="relative w-full py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
        <div className="grid gap-12 lg:grid-cols-[400px_1fr] xl:grid-cols-[440px_1fr] lg:gap-14 xl:gap-16 items-center">
          
          {/* LEFT: NEWSLETTER CARD */}
          <div className="mx-auto w-full max-w-[440px] bg-[#dceee9]/85 p-8 sm:p-10 md:p-12 shadow-2xl backdrop-blur-md rounded-[2px]">
            <h2 className="display-title text-center text-3xl sm:text-4xl md:text-[42px] font-black tracking-wider text-[#1e293b]">
              {t.newsletter.heading}
            </h2>
            <p className="mx-auto mt-4 max-w-[340px] text-center text-sm md:text-base font-light leading-relaxed text-[#4b5563]">
              {t.newsletter.subheading}
            </p>

            {subscribed ? (
              <div className="mt-12 rounded bg-white/90 p-6 text-center text-sm font-bold text-emerald-800">
                {t.newsletter.successMessage}
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-10 space-y-6">
                <div>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t.newsletter.namePlaceholder}
                    className="h-13 w-full bg-white px-5 text-sm md:text-base text-slate-800 placeholder:text-slate-400 outline-none shadow-sm transition focus:ring-2 focus:ring-slate-400"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t.newsletter.emailPlaceholder}
                    className="h-13 w-full bg-white px-5 text-sm md:text-base text-slate-800 placeholder:text-slate-400 outline-none shadow-sm transition focus:ring-2 focus:ring-slate-400"
                  />
                </div>

                <div className="pt-8 text-center">
                  <button
                    type="submit"
                    className="inline-block px-8 py-3.5 bg-slate-900 text-white text-xs md:text-sm font-bold tracking-[0.25em] transition-all duration-200 hover:bg-slate-800 hover:shadow-[0px_8px_25px_rgba(15,23,42,0.30)] hover:-translate-y-0.5 active:translate-y-0 uppercase cursor-pointer"
                  >
                    {t.newsletter.submitBtn}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* RIGHT: AWARD WINNING & 6 ITEMS GRID */}
          <div>
            <h2 className="script-title text-5xl md:text-6xl text-[#1e293b]">
              {t.awards.heading}
            </h2>
            <p className="mt-3 max-w-lg text-sm md:text-base font-light leading-relaxed text-[#4b5563]">
              {t.awards.subheading}
            </p>

            {/* 2 Columns x 3 Rows Layout */}
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-x-6 sm:gap-x-8 gap-y-6 sm:gap-y-7">
              {t.awards.items.map((item, idx) => (
                <div
                  key={idx}
                  className="group flex items-center gap-3.5 sm:gap-4 transition hover:-translate-y-0.5"
                >
                  {/* Photo thumbnail */}
                  <div className="relative h-[80px] w-[110px] sm:h-[88px] sm:w-[120px] md:h-[92px] md:w-[128px] shrink-0 overflow-hidden shadow-sm rounded-[2px] bg-slate-200">
                    <Image
                      src={AWARD_IMAGES[idx] || AWARD_IMAGES[0]}
                      alt={item.title}
                      fill
                      unoptimized
                      className="object-cover transition duration-300 group-hover:scale-105"
                    />
                  </div>

                  {/* Text details */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm sm:text-[15px] font-bold text-[#1e293b] leading-snug group-hover:text-amber-700 transition-colors">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-xs text-[#64748b] font-light leading-relaxed">
                      {item.subtitle}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
