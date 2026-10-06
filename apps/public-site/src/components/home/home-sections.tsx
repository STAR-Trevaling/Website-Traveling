"use client";

import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, HeartHandshake, Compass, ChevronRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n/context";
import { DestinationsCarousel } from "./destinations-carousel";

// ─── Popular Destinations Section ──────────────────────────────────
export function PopularDestinationsSection() {
  const { t } = useLanguage();

  return (
    <section id="popular-destinations" className="relative w-full px-4 sm:px-6 md:px-12 lg:px-16 py-10 sm:py-14 md:py-20 scroll-mt-6">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-6 sm:mb-10 md:mb-12">
          <h2 className="script-title text-3xl sm:text-5xl md:text-6xl text-[#1e293b]">
            {t.destinations.heading}
          </h2>
          <p className="mt-2 text-xs sm:text-sm md:text-base text-[#64748b] font-light max-w-xl mx-auto">
            {t.destinations.subheading}
          </p>
        </div>

        <DestinationsCarousel />
      </div>
    </section>
  );
}

// ─── Why Us & Adventures Section ───────────────────────────────────
export function WhyUsAndAdventuresSection() {
  const { t } = useLanguage();

  const reasonIcons = [ShieldCheck, HeartHandshake, Compass];

  return (
    <section className="w-full px-4 sm:px-6 md:px-12 lg:px-16 py-10 sm:py-14 md:py-20">
      <div className="mx-auto max-w-7xl">
        {/* Why Us? */}
        <div className="text-center">
          <h2 className="script-title text-3xl sm:text-5xl md:text-6xl text-[#1e293b]">
            {t.whyUs.heading}
          </h2>
        </div>

        <div className="mt-6 sm:mt-10 md:mt-12 grid gap-4 sm:gap-6 md:gap-8 grid-cols-1 md:grid-cols-3">
          {t.whyUs.items.map((item, idx) => {
            const IconComponent = reasonIcons[idx] || Compass;
            return (
              <div
                key={item.title}
                className="bg-white/85 p-5 sm:p-8 md:p-10 text-center backdrop-blur-sm shadow-sm border border-white/60 transition-all hover:bg-white rounded-[2px] flex flex-col items-center justify-center min-h-[200px] sm:min-h-[260px]"
              >
                <div className="mx-auto flex size-12 items-center justify-center text-[#1e293b]">
                  <IconComponent className="size-8 stroke-[1.5]" />
                </div>
                <h3 className="display-title mt-4 sm:mt-5 text-base sm:text-lg md:text-xl font-bold tracking-wider text-[#1e293b] uppercase">
                  {item.title}
                </h3>
                <p className="mt-2 sm:mt-3 text-xs sm:text-sm font-light leading-relaxed text-[#555]">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Have an Adventure Today — Tuyển tập thám hiểm bản địa Việt Nam */}
        <div className="mt-12 sm:mt-16 md:mt-24 text-center">
          <h2 className="script-title text-3xl sm:text-5xl md:text-6xl text-[#1e293b]">
            {t.adventures.heading}
          </h2>
        </div>

        <div className="mt-8 sm:mt-12 grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 md:gap-7">
          {/* Column 1: Canal Cruise (Tall Card) */}
          <Link
            href="/experiences/canal-cruise"
            className="group relative overflow-hidden shadow-md hover:shadow-xl transition-all rounded-[2px] h-[360px] sm:h-[440px] md:h-[530px]"
          >
            <Image
              src="/assets/adventures/canal-cruise.jpg"
              alt={t.adventures.items.canalCruise.title}
              fill
              unoptimized
              className="object-cover transition duration-500 group-hover:scale-105"
            />
            {/* Frosted white box on bottom-left */}
            <div className="absolute bottom-0 left-0 w-[82%] sm:w-[80%] max-w-[calc(100%-48px)] bg-white/85 backdrop-blur-md p-3.5 sm:p-5 flex flex-col justify-center border-t border-r border-white/60 transition-all duration-500 ease-out group-hover:opacity-0 group-hover:translate-y-4 group-hover:pointer-events-none">
              <h3 className="script-title text-xl sm:text-2xl font-bold text-[#1e293b] leading-tight">
                {t.adventures.items.canalCruise.title}
              </h3>
              <p className="mt-1 text-[10px] sm:text-[11px] font-normal text-[#64748b] leading-tight line-clamp-2">
                {t.adventures.items.canalCruise.desc}
              </p>
            </div>
            {/* White circular arrow button on right over uncovered photo */}
            <div className="absolute bottom-3.5 right-3.5 sm:bottom-4 sm:right-5 flex size-8 sm:size-9 items-center justify-center rounded-full border border-white/90 text-white transition-transform duration-300 group-hover:scale-110 group-hover:bg-white/20 shadow-sm">
              <ChevronRight className="size-4 stroke-[1.75]" />
            </div>
          </Link>

          {/* Column 2: Sailing (Tall Card) */}
          <Link
            href="/experiences/sailing"
            className="group relative overflow-hidden shadow-md hover:shadow-xl transition-all rounded-[2px] h-[360px] sm:h-[440px] md:h-[530px]"
          >
            <Image
              src="/assets/adventures/sailing.jpg"
              alt={t.adventures.items.sailing.title}
              fill
              unoptimized
              className="object-cover transition duration-500 group-hover:scale-105"
            />
            <div className="absolute bottom-0 left-0 w-[82%] sm:w-[80%] max-w-[calc(100%-48px)] bg-white/85 backdrop-blur-md p-3.5 sm:p-5 flex flex-col justify-center border-t border-r border-white/60 transition-all duration-500 ease-out group-hover:opacity-0 group-hover:translate-y-4 group-hover:pointer-events-none">
              <h3 className="script-title text-xl sm:text-2xl font-bold text-[#1e293b] leading-tight">
                {t.adventures.items.sailing.title}
              </h3>
              <p className="mt-1 text-[10px] sm:text-[11px] font-normal text-[#64748b] leading-tight line-clamp-2">
                {t.adventures.items.sailing.desc}
              </p>
            </div>
            <div className="absolute bottom-3.5 right-3.5 sm:bottom-4 sm:right-5 flex size-8 sm:size-9 items-center justify-center rounded-full border border-white/90 text-white transition-transform duration-300 group-hover:scale-110 group-hover:bg-white/20 shadow-sm">
              <ChevronRight className="size-4 stroke-[1.75]" />
            </div>
          </Link>

          {/* Column 3: Stacked 2 Cards (Camping & Scuba Diving) */}
          <div className="flex flex-col gap-5 sm:gap-6 h-[360px] sm:h-[440px] md:h-[530px]">
            {/* Camping */}
            <Link
              href="/experiences/camping"
              className="group relative overflow-hidden shadow-md hover:shadow-xl transition-all rounded-[2px] flex-1 min-h-[160px] sm:min-h-[200px]"
            >
              <Image
                src="/assets/adventures/camping.jpg"
                alt={t.adventures.items.camping.title}
                fill
                unoptimized
                className="object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 w-[82%] sm:w-[80%] max-w-[calc(100%-48px)] bg-white/85 backdrop-blur-md p-3 sm:p-4 flex flex-col justify-center border-t border-r border-white/60 transition-all duration-500 ease-out group-hover:opacity-0 group-hover:translate-y-4 group-hover:pointer-events-none">
                <h3 className="script-title text-lg sm:text-2xl font-bold text-[#1e293b] leading-tight">
                  {t.adventures.items.camping.title}
                </h3>
                <p className="mt-0.5 text-[9px] sm:text-[11px] font-normal text-[#64748b] leading-tight line-clamp-2">
                  {t.adventures.items.camping.desc}
                </p>
              </div>
              <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 flex size-7 sm:size-8 items-center justify-center rounded-full border border-white/90 text-white transition-transform duration-300 group-hover:scale-110 group-hover:bg-white/20 shadow-sm">
                <ChevronRight className="size-3.5 stroke-[1.75]" />
              </div>
            </Link>

            {/* Scuba Diving */}
            <Link
              href="/experiences/scuba-diving"
              className="group relative overflow-hidden shadow-md hover:shadow-xl transition-all rounded-[2px] flex-1 min-h-[160px] sm:min-h-[200px]"
            >
              <Image
                src="/assets/adventures/scuba-diving.jpg"
                alt={t.adventures.items.scubaDiving.title}
                fill
                unoptimized
                className="object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 w-[82%] sm:w-[80%] max-w-[calc(100%-48px)] bg-white/85 backdrop-blur-md p-3 sm:p-4 flex flex-col justify-center border-t border-r border-white/60 transition-all duration-500 ease-out group-hover:opacity-0 group-hover:translate-y-4 group-hover:pointer-events-none">
                <h3 className="script-title text-lg sm:text-2xl font-bold text-[#1e293b] leading-tight">
                  {t.adventures.items.scubaDiving.title}
                </h3>
                <p className="mt-0.5 text-[9px] sm:text-[11px] font-normal text-[#64748b] leading-tight line-clamp-2">
                  {t.adventures.items.scubaDiving.desc}
                </p>
              </div>
              <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 flex size-7 sm:size-8 items-center justify-center rounded-full border border-white/90 text-white transition-transform duration-300 group-hover:scale-110 group-hover:bg-white/20 shadow-sm">
                <ChevronRight className="size-3.5 stroke-[1.75]" />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Looking For An Experience Section ─────────────────────────────
export function LookingForSection() {
  const { t } = useLanguage();

  return (
    <section className="w-full bg-white/80 backdrop-blur-md py-12 sm:py-16 md:py-20 text-center border-y border-white/40 px-4 sm:px-6">
      <div className="mx-auto max-w-4xl">
        <h2 className="script-title text-3xl sm:text-5xl md:text-6xl text-[#1e293b] text-balance">
          {t.lookingFor.heading}
        </h2>
        <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm md:text-base text-[#4b5563] font-light max-w-xl mx-auto text-balance">
          {t.lookingFor.subheading}
        </p>
        <div className="mt-6">
          <Link
            href="/experiences"
            className="inline-block border border-slate-700/70 bg-white px-7 sm:px-8 py-3 text-xs md:text-sm font-bold tracking-[0.18em] uppercase text-[#1e293b] rounded-[2px] template-shadow-text shadow-sm transition-all duration-200 hover:border-black hover:text-black hover:bg-slate-50 hover:shadow-[0px_8px_25px_rgba(0,0,0,0.15)] hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
          >
            {t.lookingFor.button}
          </Link>
        </div>
      </div>
    </section>
  );
}
