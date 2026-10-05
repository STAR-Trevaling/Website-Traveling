"use client"; import {useState,useTransition} from "react"; import {Heart} from "lucide-react"; import {toggleFavorite} from "@/app/actions";
export function FavoriteButton({ placeId }: { placeId: string }) {
  const [pending, start] = useTransition();
  const [msg, setMsg] = useState("");
  return (
    <div>
      <button
        disabled={pending}
        onClick={() =>
          start(async () => {
            const r = await toggleFavorite(placeId);
            setMsg(r.message);
          })
        }
        className="inline-flex items-center gap-2 border border-slate-300 bg-white text-slate-800 px-5 py-3 text-xs md:text-sm font-semibold tracking-wider uppercase rounded-[2px] shadow-sm transition-all duration-200 hover:bg-white hover:border-slate-400 hover:shadow-[0px_6px_20px_rgba(0,0,0,0.10)] hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 cursor-pointer"
      >
        <Heart className="size-4 text-rose-500" />
        <span>LƯU TRẢI NGHIỆM</span>
      </button>
      {msg && <p className="mt-2 text-xs text-slate-500">{msg}</p>}
    </div>
  );
}
