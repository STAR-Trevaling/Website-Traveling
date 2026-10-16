"use client";

import { useState, useTransition } from "react";
import { submitReview } from "@/app/actions";
import { useLanguage } from "@/lib/i18n/context";

export function ReviewForm({ placeId }: { placeId: string }) {
  const { t, isEnglish } = useLanguage();
  const [rating, setRating] = useState(5);
  const [body, setBody] = useState("");
  const [msg, setMsg] = useState("");
  const [pending, start] = useTransition();

  const ed = t.experienceDetailPage;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        start(async () => {
          const r = await submitReview(placeId, rating, body);
          setMsg(r.message || ed.submitSuccess);
          if (r.ok) setBody("");
        });
      }}
      className="space-y-4"
    >
      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
        {ed.ratingScore}
        <select
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="mt-1.5 block h-10 w-32 rounded-[2px] border border-slate-200 bg-white px-3 text-sm text-slate-800 outline-none focus:border-[#da251d]"
        >
          {[5, 4, 3, 2, 1].map((v) => (
            <option key={v} value={v}>
              {v} {isEnglish ? "Stars" : "Sao"} {v === 5 ? "⭐⭐⭐⭐⭐" : ""}
            </option>
          ))}
        </select>
      </label>

      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
        {ed.reviewComment}
        <textarea
          value={body}
          required
          onChange={(e) => setBody(e.target.value)}
          className="mt-1.5 min-h-28 w-full rounded-[2px] border border-slate-200 bg-white p-3 text-sm text-slate-800 outline-none focus:border-[#da251d]"
          placeholder={ed.reviewCommentPlaceholder}
        />
      </label>

      <button
        type="submit"
        disabled={pending}
        className="bg-[#da251d] text-white px-6 py-3 text-xs md:text-sm font-bold uppercase tracking-wider rounded-[2px] shadow-sm transition-all duration-200 hover:bg-[#c92018] hover:shadow-[0px_8px_25px_rgba(218,37,29,0.35)] hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 cursor-pointer"
      >
        {pending
          ? isEnglish
            ? "SUBMITTING REVIEW…"
            : "ĐANG GỬI ĐÁNH GIÁ…"
          : ed.submitReview}
      </button>

      {msg && <p className="text-xs text-slate-600 font-medium">{msg}</p>}
    </form>
  );
}
