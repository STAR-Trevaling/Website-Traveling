"use client"; import {useState,useTransition} from "react"; import {submitReview} from "@/app/actions";
export function ReviewForm({ placeId }: { placeId: string }) {
  const [rating, setRating] = useState(5);
  const [body, setBody] = useState("");
  const [msg, setMsg] = useState("");
  const [pending, start] = useTransition();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        start(async () => {
          const r = await submitReview(placeId, rating, body);
          setMsg(r.message);
          if (r.ok) setBody("");
        });
      }}
      className="space-y-4"
    >
      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
        Đánh giá điểm số
        <select
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="mt-1.5 block h-10 w-28 rounded-[2px] border border-slate-200 bg-white px-3 text-sm text-slate-800 outline-none focus:border-[#0098a2]"
        >
          {[5, 4, 3, 2, 1].map((v) => (
            <option key={v} value={v}>
              {v} Sao {v === 5 ? "⭐⭐⭐⭐⭐" : ""}
            </option>
          ))}
        </select>
      </label>

      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
        Nội dung cảm nhận
        <textarea
          value={body}
          required
          onChange={(e) => setBody(e.target.value)}
          className="mt-1.5 min-h-28 w-full rounded-[2px] border border-slate-200 bg-white p-3 text-sm text-slate-800 outline-none focus:border-[#0098a2]"
          placeholder="Chia sẻ trải nghiệm chân thực của bạn để gợi ý cho cộng đồng du khách..."
        />
      </label>

      <button
        disabled={pending}
        className="bg-[#0098a2] text-white px-6 py-3 text-xs md:text-sm font-bold uppercase tracking-wider rounded-[2px] shadow-sm transition-all duration-200 hover:bg-[#008f99] hover:shadow-[0px_8px_25px_rgba(0,152,162,0.35)] hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 cursor-pointer"
      >
        {pending ? "ĐANG GỬI ĐÁNH GIÁ…" : "GỬI ĐÁNH GIÁ TRẢI NGHIỆM"}
      </button>

      {msg && <p className="text-xs text-slate-600 font-medium">{msg}</p>}
    </form>
  );
}
