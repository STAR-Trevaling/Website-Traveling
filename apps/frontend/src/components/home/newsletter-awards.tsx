"use client";

import { useState } from "react";
import Image from "next/image";

interface AwardItem {
  title: string;
  subtitle: string;
  image: string;
}

const AWARD_ITEMS: AwardItem[] = [
  {
    title: "Attractions",
    subtitle: "Top 10 Attractions",
    image: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=400&q=80",
  },
  {
    title: "Hotels",
    subtitle: "Top 10 Hotels",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=400&q=80",
  },
  {
    title: "Resorts",
    subtitle: "Top 5 Resorts",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=400&q=80",
  },
  {
    title: "Landmarks",
    subtitle: "Top 10 Landmarks",
    image: "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=400&q=80",
  },
  {
    title: "Beaches",
    subtitle: "Top 10 Beaches",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80",
  },
  {
    title: "Islands",
    subtitle: "Top 10 Islands",
    image: "https://images.unsplash.com/photo-1512100356356-de1b84283e18?auto=format&fit=crop&w=400&q=80",
  },
];

export function NewsletterAwards() {
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
        <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-20 items-center">
          
          {/* LEFT: NEWSLETTER CARD (Pixel-perfect template replication) */}
          <div className="mx-auto w-full max-w-[500px] bg-[#dceee9]/85 p-10 md:p-14 shadow-2xl backdrop-blur-md">
            <h2 className="display-title text-center text-3xl sm:text-4xl md:text-[42px] font-black tracking-wider text-[#1e293b]">
              NEWSLETTER
            </h2>
            <p className="mx-auto mt-4 max-w-[340px] text-center text-sm md:text-base font-light leading-relaxed text-[#4b5563]">
              Lorem ipsum dolor sit amet, consec adipiscing elit. Nunc vulputate
            </p>

            {subscribed ? (
              <div className="mt-12 rounded bg-white/90 p-6 text-center text-sm font-bold text-emerald-800">
                Cảm ơn bạn đã đăng ký nhận bản tin từ Star Travels!
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-10 space-y-6">
                <div>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Họ và tên của bạn..."
                    className="h-13 w-full bg-white px-5 text-sm md:text-base text-slate-800 placeholder:text-slate-400 outline-none shadow-sm transition focus:ring-2 focus:ring-slate-400"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Địa chỉ email..."
                    className="h-13 w-full bg-white px-5 text-sm md:text-base text-slate-800 placeholder:text-slate-400 outline-none shadow-sm transition focus:ring-2 focus:ring-slate-400"
                  />
                </div>

                <div className="pt-8 text-center">
                  <button
                    type="submit"
                    className="text-xs md:text-sm font-bold tracking-[0.25em] text-[#334155] transition hover:text-black hover:underline uppercase cursor-pointer"
                  >
                    SUBSCRIBE
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* RIGHT: AWARD WINNING & 6 ITEMS GRID (Pixel-perfect template replication) */}
          <div>
            <h2 className="script-title text-5xl md:text-6xl text-[#1e293b]">
              Award Winning
            </h2>
            <p className="mt-3 max-w-lg text-sm md:text-base font-light leading-relaxed text-[#4b5563]">
              Lorem ipsum dolor sit amet, consec adipiscing elit. Nunc vulputate
            </p>

            {/* 2 Columns x 3 Rows Layout */}
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-7">
              {AWARD_ITEMS.map((item, idx) => (
                <div
                  key={idx}
                  className="group flex items-center gap-4 transition hover:-translate-y-0.5"
                >
                  {/* Photo thumbnail */}
                  <div className="relative h-[85px] w-[120px] shrink-0 overflow-hidden shadow-sm bg-slate-200">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      unoptimized
                      className="object-cover transition duration-300 group-hover:scale-105"
                    />
                  </div>

                  {/* Text details */}
                  <div>
                    <h3 className="text-sm md:text-base font-bold text-[#1e293b] group-hover:text-amber-700 transition-colors">
                      {item.title}
                    </h3>
                    <p className="mt-0.5 text-xs text-[#64748b] font-light">
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
