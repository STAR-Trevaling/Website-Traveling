import Image from "next/image";
import Link from "next/link";
import { VIETNAM_TOURS } from "@/lib/tours-data";

export function FeaturedTours() {
  const topTours = VIETNAM_TOURS.slice(0, 4);

  return (
    <section className="w-full px-6 py-16 md:px-12 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-10">
          <h2 className="script-title text-5xl md:text-6xl text-[#1e293b]">
            Featured Tours
          </h2>
          <p className="mt-2 text-sm md:text-base text-[#64748b] font-light max-w-xl mx-auto">
            Hành trình trọn gói tuyển chọn đặc sắc với dịch vụ cao cấp và giá ưu đãi nhất
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {topTours.map((tour) => {
            const shortDest = tour.destination.split(",")[0].trim();
            return (
              <Link
                key={tour.id}
                href={`/tours/${tour.slug}`}
                className="group flex flex-col overflow-hidden rounded-[2px] bg-white shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                  <Image
                    src={tour.image}
                    alt={tour.title}
                    fill
                    unoptimized
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 bg-black/50 text-white text-[11px] font-medium px-2 py-0.5 rounded-[2px] backdrop-blur-sm">
                    {tour.duration}
                  </div>
                </div>

                <div className="p-4 flex items-start justify-between gap-3 bg-white">
                  <div className="flex-1 min-w-0 pr-1">
                    <h3 className="script-title text-2xl font-bold text-[#1e293b] leading-tight truncate group-hover:text-[#0098a2] transition-colors">
                      {shortDest}
                    </h3>
                    <p className="mt-1 text-[11px] font-light text-[#64748b] leading-snug line-clamp-2">
                      {tour.title}
                    </p>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="script-title text-2xl font-bold text-[#1e293b] block leading-tight">
                      {tour.price.toLocaleString("vi-VN")}đ
                    </span>
                    <span className="text-[10px] text-[#94a3b8] font-light block">
                      / người
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/tours"
            className="inline-block bg-[#0098a2] hover:bg-[#087c86] text-white px-8 py-2.5 text-xs md:text-sm font-semibold tracking-widest uppercase transition rounded-[2px] shadow-sm"
          >
            XEM TẤT CẢ TOUR
          </Link>
        </div>
      </div>
    </section>
  );
}

