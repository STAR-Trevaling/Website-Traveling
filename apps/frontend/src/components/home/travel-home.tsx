import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, HeartHandshake, Compass, ChevronRight } from "lucide-react";
import { HeroSlider } from "./hero-slider";
import { DestinationsCarousel } from "./destinations-carousel";
import { FeaturedTours } from "./featured-tours";
import { VIETNAM_IMAGES } from "@/lib/assets";
import { publicApi, safe } from "@/lib/api";
import type { Place } from "@/lib/types";
import { SiteHeader } from "@/components/layout/site-header";
import { NewsletterAwards } from "./newsletter-awards";

// Fallback Adventures matching Vietnam scenic destinations
const adventureFallback: Partial<Place>[] = [
  {
    slug: "canal-cruise",
    name: "Du Thuyền Kênh Rạch Miền Tây",
    image_url: VIETNAM_IMAGES.cruise,
    short_description: "Xuôi mái chèo len lỏi qua rặng dừa nước Bến Tre rợp bóng và vịnh biển Hạ Long nguyên sơ.",
  },
  {
    slug: "sailing",
    name: "Thuyền Buồm Vịnh Lan Hạ",
    image_url: VIETNAM_IMAGES.kayak,
    short_description: "Cảm nhận sức gió biển khơi và lướt êm ái qua những vách núi đá vôi kỳ vĩ.",
  },
  {
    slug: "camping",
    name: "Cắm Trại Đêm Săn Mây Tà Xùa",
    image_url: VIETNAM_IMAGES.camping,
    short_description: "Thức giấc giữa ngàn vì sao, đón bình minh dát vàng thung lũng mây và rừng thông Đà Lạt.",
  },
  {
    slug: "hiking",
    name: "Trekking Chinh Phục Đỉnh Fansipan",
    image_url: VIETNAM_IMAGES.hiking,
    short_description: "Cung đường vượt rừng trúc nguyên sinh và chạm nóc nhà Đông Dương 3.143m linh thiêng Sa Pa.",
  },
  {
    slug: "scuba-diving",
    name: "Lặn Ngắm San Hô Biển Phú Quốc",
    image_url: VIETNAM_IMAGES.scubaDiving,
    short_description: "Đắm chìm vào thế giới thủy cung huyền ảo và ngắm nhìn rạn san hô nguyên sinh quý hiếm.",
  },
];

const reasons = [
  {
    title: "CAM KẾT CHẤT LƯỢNG",
    desc: "Bảo đảm dịch vụ trọn gói tiêu chuẩn cao nhất, minh bạch chi phí và hoàn tiền nếu không đúng cam kết.",
    icon: ShieldCheck,
  },
  {
    title: "DỊCH VỤ TẬN TÂM",
    desc: "Đội ngũ chuyên viên tư vấn am hiểu sâu sắc du lịch bản địa, hỗ trợ khách hàng chu đáo 24/7.",
    icon: HeartHandshake,
  },
  {
    title: "TRẢI NGHIỆM ĐỘC BẢN",
    desc: "Lịch trình thiết kế chuyên sâu, đưa du khách chạm vào chiều sâu văn hóa và ẩm thực Việt Nam.",
    icon: Compass,
  },
];

export async function TravelHome() {
  const places = await safe(publicApi.places("?page_size=5"), []);
  const adventures = adventureFallback.map((fallback, i) => ({
    ...fallback,
    ...places[i],
  }));

  return (
    <main className="w-full template-page-bg text-[#282828] overflow-x-hidden">
      {/* 1. HERO SLIDER BANNER (image(20261004-085822).png) */}
      <section className="relative w-full overflow-hidden">
        <SiteHeader overlay />
        <HeroSlider />
      </section>

      {/* 2. POPULAR DESTINATIONS (image(20261004-085822).png & image(20261004-085838).png) */}
      <section className="relative w-full px-6 py-20 md:px-12 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="script-title text-5xl md:text-6xl text-[#1e293b]">
              Popular Destinations
            </h2>
          </div>

          <DestinationsCarousel />
        </div>
      </section>

      {/* 3. VIDEO BANNER (image(20261004-085838).png) - Play Button Only */}
      <section className="relative h-[480px] md:h-[600px] w-full overflow-hidden">
        <Image
          src={VIETNAM_IMAGES.oceanBanner}
          alt="Travel Video Banner"
          fill
          unoptimized
          className="object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <Link
            href="/stories"
            className="flex size-24 md:size-28 items-center justify-center rounded-full border-2 border-white text-white transition-all duration-300 hover:scale-110 hover:bg-white/20"
            aria-label="Play video"
          >
            <svg
              className="size-10 md:size-12 translate-x-1 fill-white"
              viewBox="0 0 24 24"
            >
              <polygon points="6 4 20 12 6 20 6 4" />
            </svg>
          </Link>
        </div>
      </section>

      {/* 4. FEATURED TOURS (image(20261004-085838).png style) */}
      <FeaturedTours />

      {/* 5. WHY US & ADVENTURES (image(20261004-085849).png) */}
      <section className="w-full px-6 py-20 md:px-12 lg:px-16">
        <div className="mx-auto max-w-7xl">
          {/* Why Us? */}
          <div className="text-center">
            <h2 className="script-title text-5xl md:text-6xl text-[#1e293b]">
              Why Us?
            </h2>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {reasons.map((item) => {
              const IconComponent = item.icon;
              return (
                <div
                  key={item.title}
                  className="bg-white/80 p-8 md:p-10 text-center backdrop-blur-sm shadow-sm border border-white/50 transition-all hover:bg-white min-h-[260px] flex flex-col items-center justify-center rounded-[2px]"
                >
                  <div className="mx-auto flex size-12 items-center justify-center text-[#1e293b]">
                    <IconComponent className="size-8 stroke-[1.5]" />
                  </div>
                  <h3 className="display-title mt-5 text-xl font-bold tracking-wider text-[#1e293b] uppercase">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-xs md:text-sm font-light leading-relaxed text-[#555]">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Have an Adventure Today — Tuyển tập thám hiểm bản địa Việt Nam */}
          <div className="mt-28 text-center">
            <h2 className="script-title text-5xl md:text-6xl text-[#1e293b]">
              Have an Adventure Today
            </h2>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-7">
            {/* Column 1: Canal Cruise (Tall Card) */}
            <Link
              href="/experiences/canal-cruise"
              className="group relative overflow-hidden shadow-md hover:shadow-xl transition-all rounded-[2px] h-[480px] md:h-[530px]"
            >
              <Image
                src="/assets/adventures/canal-cruise.jpg"
                alt="Du Thuyền Kênh Rạch"
                fill
                unoptimized
                className="object-cover transition duration-500 group-hover:scale-105"
              />
              {/* Frosted white box on bottom-left */}
              <div className="absolute bottom-0 left-0 w-[74%] sm:w-[76%] bg-white/85 backdrop-blur-md p-4 sm:p-5 flex flex-col justify-center border-t border-r border-white/60">
                <h3 className="script-title text-2xl font-bold text-[#1e293b] leading-tight">
                  Canal Cruise
                </h3>
                <p className="mt-1 text-[11px] font-normal text-[#64748b] leading-tight line-clamp-2">
                  Xuôi mái chèo len lỏi qua rặng dừa nước Bến Tre rợp bóng và kỳ quan Vịnh Hạ Long ngọc bích
                </p>
              </div>
              {/* White circular arrow button on right over uncovered photo */}
              <div className="absolute bottom-4 right-4 sm:right-5 flex size-8 sm:size-9 items-center justify-center rounded-full border border-white/90 text-white transition-transform duration-300 group-hover:scale-110 group-hover:bg-white/20 shadow-sm">
                <ChevronRight className="size-4 stroke-[1.75]" />
              </div>
            </Link>

            {/* Column 2: Sailing (top) & Hiking (bottom) */}
            <div className="flex flex-col gap-6 md:gap-7 h-[480px] md:h-[530px]">
              {/* Sailing */}
              <Link
                href="/experiences/sailing"
                className="group relative overflow-hidden shadow-md hover:shadow-xl transition-all rounded-[2px] flex-1 min-h-[220px]"
              >
                <Image
                  src="/assets/adventures/sailing.jpg"
                  alt="Thuyền Buồm Vịnh Biển"
                  fill
                  unoptimized
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 w-[74%] sm:w-[76%] bg-white/85 backdrop-blur-md p-3.5 sm:p-4 flex flex-col justify-center border-t border-r border-white/60">
                  <h3 className="script-title text-xl sm:text-2xl font-bold text-[#1e293b] leading-tight">
                    Sailing
                  </h3>
                  <p className="mt-0.5 text-[10px] sm:text-[11px] font-normal text-[#64748b] leading-tight line-clamp-2">
                    Căng buồm đón gió biển khơi và lướt nhẹ qua những hòn đảo đá vôi kỳ vĩ Vịnh Lan Hạ
                  </p>
                </div>
                <div className="absolute bottom-3.5 right-3.5 sm:bottom-4 sm:right-4 flex size-7 sm:size-8 items-center justify-center rounded-full border border-white/90 text-white transition-transform duration-300 group-hover:scale-110 group-hover:bg-white/20 shadow-sm">
                  <ChevronRight className="size-3.5 stroke-[1.75]" />
                </div>
              </Link>

              {/* Hiking */}
              <Link
                href="/experiences/hiking"
                className="group relative overflow-hidden shadow-md hover:shadow-xl transition-all rounded-[2px] flex-1 min-h-[220px]"
              >
                <Image
                  src="/assets/adventures/hiking.jpg"
                  alt="Trekking Fansipan Sa Pa"
                  fill
                  unoptimized
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 w-[74%] sm:w-[76%] bg-white/85 backdrop-blur-md p-3.5 sm:p-4 flex flex-col justify-center border-t border-r border-white/60">
                  <h3 className="script-title text-xl sm:text-2xl font-bold text-[#1e293b] leading-tight">
                    Hiking
                  </h3>
                  <p className="mt-0.5 text-[10px] sm:text-[11px] font-normal text-[#64748b] leading-tight line-clamp-2">
                    Băng qua những thung lũng ruộng bậc thang uốn lượn và chạm nóc nhà Đông Dương Fansipan
                  </p>
                </div>
                <div className="absolute bottom-3.5 right-3.5 sm:bottom-4 sm:right-4 flex size-7 sm:size-8 items-center justify-center rounded-full border border-white/90 text-white transition-transform duration-300 group-hover:scale-110 group-hover:bg-white/20 shadow-sm">
                  <ChevronRight className="size-3.5 stroke-[1.75]" />
                </div>
              </Link>
            </div>

            {/* Column 3: Camping (top) & Scuba Diving (bottom) */}
            <div className="flex flex-col gap-6 md:gap-7 h-[480px] md:h-[530px]">
              {/* Camping */}
              <Link
                href="/experiences/camping"
                className="group relative overflow-hidden shadow-md hover:shadow-xl transition-all rounded-[2px] flex-1 min-h-[220px]"
              >
                <Image
                  src="/assets/adventures/camping.jpg"
                  alt="Cắm Trại Săn Mây Tà Xùa"
                  fill
                  unoptimized
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 w-[74%] sm:w-[76%] bg-white/85 backdrop-blur-md p-3.5 sm:p-4 flex flex-col justify-center border-t border-r border-white/60">
                  <h3 className="script-title text-xl sm:text-2xl font-bold text-[#1e293b] leading-tight">
                    Camping
                  </h3>
                  <p className="mt-0.5 text-[10px] sm:text-[11px] font-normal text-[#64748b] leading-tight line-clamp-2">
                    Đón bình minh rực rỡ trên đỉnh đồi lộng gió Tà Xùa và hòa mình giữa rừng thông Đà Lạt
                  </p>
                </div>
                <div className="absolute bottom-3.5 right-3.5 sm:bottom-4 sm:right-4 flex size-7 sm:size-8 items-center justify-center rounded-full border border-white/90 text-white transition-transform duration-300 group-hover:scale-110 group-hover:bg-white/20 shadow-sm">
                  <ChevronRight className="size-3.5 stroke-[1.75]" />
                </div>
              </Link>

              {/* Scuba Diving */}
              <Link
                href="/experiences/scuba-diving"
                className="group relative overflow-hidden shadow-md hover:shadow-xl transition-all rounded-[2px] flex-1 min-h-[220px]"
              >
                <Image
                  src="/assets/adventures/scuba-diving.jpg"
                  alt="Lặn San Hô Phú Quốc"
                  fill
                  unoptimized
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 w-[74%] sm:w-[76%] bg-white/85 backdrop-blur-md p-3.5 sm:p-4 flex flex-col justify-center border-t border-r border-white/60">
                  <h3 className="script-title text-xl sm:text-2xl font-bold text-[#1e293b] leading-tight">
                    Scuba Diving
                  </h3>
                  <p className="mt-0.5 text-[10px] sm:text-[11px] font-normal text-[#64748b] leading-tight line-clamp-2">
                    Khám phá thủy cung rực rỡ sắc màu với những rạn san hô nguyên sinh tại quần đảo An Thới
                  </p>
                </div>
                <div className="absolute bottom-3.5 right-3.5 sm:bottom-4 sm:right-4 flex size-7 sm:size-8 items-center justify-center rounded-full border border-white/90 text-white transition-transform duration-300 group-hover:scale-110 group-hover:bg-white/20 shadow-sm">
                  <ChevronRight className="size-3.5 stroke-[1.75]" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. NEWSLETTER & AWARD WINNING (image(20261004-085901).png) */}
      <NewsletterAwards />

      {/* 6. LOOKING FOR AN EXPERIENCE? — Bản địa Việt Nam */}
      <section className="w-full bg-white/75 backdrop-blur-md py-16 md:py-20 text-center border-y border-white/40">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="script-title text-4xl sm:text-5xl md:text-6xl text-[#1e293b]">
            Looking for an experience?
          </h2>
          <p className="mt-3 text-sm md:text-base text-[#4b5563] font-light max-w-xl mx-auto">
            Khám phá danh lam thắng cảnh tuyệt mỹ và văn hóa bản địa độc bản của non sông Việt Nam cùng Star Travels.
          </p>
          <div className="mt-6">
            <Link
              href="/experiences"
              className="inline-block border border-slate-700/70 bg-white px-8 py-3 text-xs md:text-sm font-bold tracking-[0.2em] uppercase text-[#1e293b] rounded-[2px] template-shadow-text shadow-sm transition-all duration-200 hover:border-black hover:text-black hover:bg-slate-50 hover:shadow-[0px_8px_25px_rgba(0,0,0,0.15)] hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              XEM TẤT CẢ GÓI TRẢI NGHIỆM
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
