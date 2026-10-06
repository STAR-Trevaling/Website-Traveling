"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useLanguage } from "@/lib/i18n/context";

export function ContactFAQ() {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  const faqItems = t.contactPage.faqList;

  return (
    <div className="space-y-4">
      {faqItems.map((faq, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div
            key={idx}
            className="border border-slate-200/80 bg-white/90 rounded-[2px] overflow-hidden transition-all duration-200"
          >
            <button
              onClick={() => toggle(idx)}
              className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 transition hover:bg-slate-50/80 cursor-pointer"
            >
              <span className="text-sm md:text-base font-semibold text-[#1e293b]">
                {faq.q}
              </span>
              <ChevronDown
                className={`size-5 text-slate-700 shrink-0 transition-transform duration-300 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {isOpen && (
              <div className="px-6 pb-5 pt-1 text-xs md:text-sm font-light text-[#555] leading-relaxed border-t border-slate-100">
                {faq.a}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
