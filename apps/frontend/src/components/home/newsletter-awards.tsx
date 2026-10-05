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
    title: "Vịnh Hạ Long & Tràng An",
    subtitle: "Top 10 Thắng Cảnh Di Sản UNESCO",
    image: "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=400&q=80",
  },
  {
    title: "Phố Cổ Hội An & Cố Đô Huế",
    subtitle: "Top 10 Di Tích Lịch Sử & Văn Hóa",
    image: "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=400&q=80",
  },
  {
    title: "Đảo Ngọc Phú Quốc & Côn Đảo",
    subtitle: "Top 10 Bãi Biển Nhiệt Đới Đẹp Nhất",
    image: "https://upload.wikimedia.org/wikipedia/commons/3/33/Kem_Beach_aerial_view_Phu_Quoc_Island_Vietnam.jpg",
  },
  {
    title: "Sa Pa & Mã Pí Lèng Hà Giang",
    subtitle: "Top 5 Tuyệt Tác Kỳ Vĩ Vùng Cao",
    image: "https://upload.wikimedia.org/wikipedia/commons/f/fd/Terraced_fields_Sa_Pa_Vietnam.JPG",
  },
  {
    title: "Đà Lạt — Xứ Sở Ngàn Hoa",
    subtitle: "Top 5 Điểm Đến Nghỉ Dưỡng Lãng Mạn",
    image: "https://upload.wikimedia.org/wikipedia/commons/e/e2/Da_Lat_-_Viet_Nam.jpg",
  },
  {
    title: "Miền Tây & Chợ Nổi Cần Thơ",
    subtitle: "Top 5 Khám Phá Văn Hóa Miệt Vườn",
    image: "/assets/adventures/canal-cruise.jpg",
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
              Đăng ký nhận cẩm nang du lịch độc quyền và ưu đãi sớm nhất từ Star Travels
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
                    ĐĂNG KÝ NGAY
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
              Tự hào tôn vinh những danh lam thắng cảnh rực rỡ và di sản văn hóa trường tồn của Việt Nam
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
