import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, HeartHandshake, Compass, Award, Users, CheckCircle, ArrowRight } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { VIETNAM_IMAGES } from "@/lib/assets";

export const metadata: Metadata = {
  title: "Về Chúng Tôi | Star Travels Vietnam",
  description: "Sứ mệnh kết nối du khách với những giá trị du lịch nguyên bản, độc bản và bền vững tại Việt Nam.",
};

const PILLARS = [
  {
    icon: ShieldCheck,
    title: "Cam Kết Chất Lượng",
    subtitle: "Chất lượng dịch vụ chuẩn mực",
    desc: "Mọi hành trình và tour trải nghiệm đều trải qua quy trình khảo sát thực địa nghiêm ngặt. Cam kết minh bạch tuyệt đối về chi phí, không phụ phí ẩn và chính sách hoàn tiền rõ ràng.",
  },
  {
    icon: HeartHandshake,
    title: "Dịch Vụ Tận Tâm",
    subtitle: "Đồng hành từng khoảnh khắc",
    desc: "Đội ngũ chuyên viên tư vấn là những người bản địa am hiểu sâu sắc từng nẻo đường, phong tục và ẩm thực, hỗ trợ 24/7 trước, trong và sau mỗi chuyến đi.",
  },
  {
    icon: Compass,
    title: "Trải Nghiệm Độc Bản",
    subtitle: "Khám phá chiều sâu văn hóa",
    desc: "Không chạy theo những điểm check-in đại trà, Star Travels dẫn lối bạn chạm vào linh hồn của điểm đến: chèo kayak ngắm hoàng hôn Hạ Long, đón mây Fansipan hay lắng nghe nhịp thở chợ nổi miền Tây.",
  },
];

const METRICS = [
  { value: "12,000+", label: "Du khách đồng hành", sublabel: "Từ hơn 35 quốc gia toàn cầu" },
  { value: "45+", label: "Đối tác bản địa uy tín", sublabel: "Đạt chứng nhận kiểm định Star Travels" },
  { value: "100%", label: "Khảo sát thực địa", sublabel: "Tự tay trải nghiệm và đánh giá" },
  { value: "4.9 / 5", label: "Điểm hài lòng", sublabel: "Từ hơn 3,200 đánh giá xác thực" },
];

const AWARDS = [
  {
    title: "Top 10 Attractions",
    category: "Di sản & Thắng cảnh",
    image: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=400&q=80",
    desc: "Vinh danh các điểm đến di sản thế giới tại Vịnh Hạ Long và Cố đô Huế.",
  },
  {
    title: "Top 10 Hotels",
    category: "Khách sạn Boutique",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=400&q=80",
    desc: "Tuyển tập không gian nghỉ dưỡng mang đậm dấu ấn kiến trúc Đông Dương.",
  },
  {
    title: "Top 5 Resorts",
    category: "Resort Sinh thái",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=400&q=80",
    desc: "Những khu nghỉ dưỡng bên bờ biển Phú Quốc và đồi chè Sa Pa hòa hợp thiên nhiên.",
  },
  {
    title: "Top 10 Landmarks",
    category: "Biểu tượng Văn hóa",
    image: "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=400&q=80",
    desc: "Những cây cầu lịch sử, phố cổ nghìn năm và thánh địa văn hóa ngàn đời.",
  },
  {
    title: "Top 10 Beaches",
    category: "Vịnh biển Tinh khôi",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80",
    desc: "Bãi cát trắng mịn màng Mỹ Khê - Đà Nẵng và Bãi Sao - Phú Quốc nguyên sơ.",
  },
  {
    title: "Top 10 Islands",
    category: "Quần đảo Kỳ quan",
    image: "https://images.unsplash.com/photo-1512100356356-de1b84283e18?auto=format&fit=crop&w=400&q=80",
    desc: "Những hòn đảo hoang sơ rực rỡ san hô và ngọn hải đăng sừng sững giữa đại dương.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="Về Star Travels Vietnam"
        subtitle="Hành trình kết nối du khách với vẻ đẹp nguyên bản và di sản sống động của Việt Nam."
        image={VIETNAM_IMAGES.hero}
      />

      <main className="template-page-bg min-h-screen text-[#282828] overflow-x-hidden">
        {/* SECTION 1: THE STORY */}
        <section className="relative w-full px-6 py-20 md:px-12 lg:px-16">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#0098a2]">
                  Câu Chuyện Của Chúng Tôi
                </span>
                <h2 className="script-title mt-2 text-5xl md:text-6xl text-[#1e293b] leading-tight">
                  Tình Yêu Bản Sắc Việt
                </h2>
                <div className="mt-8 space-y-5 text-base md:text-lg font-light leading-relaxed text-[#4b5563]">
                  <p>
                    <strong className="font-semibold text-slate-800">Star Travels</strong> được sáng lập từ niềm đam mê cháy bỏng với từng tấc đất quê hương — từ đỉnh Fansipan sương phủ mờ ảo, những vịnh ngọc kỳ quan Hạ Long, cho đến dải lụa sông nước Cửu Long bồi đắp phù sa ngàn đời.
                  </p>
                  <p>
                    Chúng tôi tin rằng một chuyến đi trọn vẹn không đo bằng số lượng bức hình check-in, mà được khắc sâu bởi chiều sâu cảm xúc: là khi ngồi trên chiếc thuyền nan trôi nhẹ giữa dòng Tam Cốc, thưởng thức tách trà Shan Tuyết cổ thụ trên non cao, hay ngắm hoàng hôn buông xuống ngọn hải đăng Phú Quốc.
                  </p>
                  <p>
                    Star Travels đóng vai trò như chiếc cầu nối tin cậy giữa du khách tinh hoa và các đối tác lữ hành, nghệ nhân, chuyên gia bản địa tận tâm nhất trên khắp dải đất hình chữ S.
                  </p>
                </div>

                <div className="mt-8 flex flex-wrap gap-4 pt-4 border-t border-slate-200">
                  <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                    <CheckCircle className="size-4 text-[#0098a2]" />
                    <span>Minh bạch 100% chất lượng</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                    <CheckCircle className="size-4 text-[#0098a2]" />
                    <span>Bảo tồn văn hóa bản địa</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                    <CheckCircle className="size-4 text-[#0098a2]" />
                    <span>Hỗ trợ khẩn cấp 24/7</span>
                  </div>
                </div>
              </div>

              {/* Story Visual with Frosted Glass Badge */}
              <div className="relative h-[420px] md:h-[520px] w-full overflow-hidden rounded-[2px] shadow-xl">
                <Image
                  src={VIETNAM_IMAGES.cruise}
                  alt="Du thuyền Vịnh Hạ Long"
                  fill
                  unoptimized
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md p-6 rounded-[2px] border border-white/60">
                  <p className="text-xs uppercase tracking-[0.2em] font-bold text-[#0098a2]">
                    Giá trị cốt lõi
                  </p>
                  <h3 className="display-title mt-1 text-2xl font-bold text-[#1e293b]">
                    Khám phá sâu sắc hơn. Gìn giữ bản sắc Việt Nam.
                  </h3>
                  <p className="mt-2 text-xs md:text-sm text-slate-600 font-light">
                    Mỗi hành trình đều đóng góp trực tiếp vào quỹ bảo tồn môi trường sinh thái và hỗ trợ sinh kế cho cộng đồng địa phương.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: 3 CORE PILLARS (Matches Home "Why Us?") */}
        <section className="w-full bg-white/60 py-20 md:py-28 border-y border-slate-200/60">
          <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
            <div className="text-center">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#0098a2]">
                Tiêu chuẩn đồng hành
              </span>
              <h2 className="script-title mt-2 text-5xl md:text-6xl text-[#1e293b]">
                Giá Trị Khác Biệt
              </h2>
              <p className="mt-3 text-sm md:text-base text-[#4b5563] font-light max-w-xl mx-auto">
                Ba trụ cột định vị phong cách phục vụ và uy tín thương hiệu của Star Travels trên toàn quốc.
              </p>
            </div>

            <div className="mt-14 grid gap-8 md:grid-cols-3">
              {PILLARS.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="bg-white/85 p-8 md:p-10 text-center backdrop-blur-md shadow-sm border border-white/70 transition-all hover:bg-white min-h-[300px] flex flex-col items-center justify-start rounded-[2px]"
                  >
                    <div className="flex size-14 items-center justify-center rounded-full bg-[#0098a2]/10 text-[#0098a2]">
                      <Icon className="size-7 stroke-[1.75]" />
                    </div>
                    <h3 className="display-title mt-6 text-xl font-bold tracking-wider text-[#1e293b] uppercase">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-xs font-semibold text-[#0098a2] tracking-wide">
                      {item.subtitle}
                    </p>
                    <p className="mt-4 text-xs md:text-sm font-light leading-relaxed text-[#555]">
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* SECTION 3: METRICS COUNTER BAR */}
        <section className="relative w-full py-16 bg-[#1e293b] text-white">
          <div className="mx-auto max-w-7xl px-6 md:px-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center divide-y md:divide-y-0 md:divide-x divide-white/10">
              {METRICS.map((m, idx) => (
                <div key={idx} className="pt-6 md:pt-0 md:px-4">
                  <div className="display-title text-4xl md:text-5xl font-black text-[#00c2cb]">
                    {m.value}
                  </div>
                  <div className="mt-2 text-sm md:text-base font-semibold tracking-wide text-white">
                    {m.label}
                  </div>
                  <div className="mt-1 text-xs text-white/60 font-light">
                    {m.sublabel}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 4: AWARD WINNING (Matches Home Page Section) */}
        <section className="w-full px-6 py-20 md:px-12 lg:px-16">
          <div className="mx-auto max-w-7xl">
            <div className="text-center">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#0098a2]">
                Hệ Sinh Thái Danh Tiếng
              </span>
              <h2 className="script-title mt-2 text-5xl md:text-6xl text-[#1e293b]">
                Award Winning Excellence
              </h2>
              <p className="mt-3 text-sm md:text-base text-[#4b5563] font-light max-w-xl mx-auto">
                Hợp tác cùng những đối tác và điểm đến hàng đầu được vinh danh tại các giải thưởng du lịch quốc tế.
              </p>
            </div>

            <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {AWARDS.map((award, idx) => (
                <div
                  key={idx}
                  className="group bg-white/90 p-5 rounded-[2px] shadow-sm border border-slate-100 transition hover:shadow-md hover:-translate-y-1"
                >
                  <div className="relative h-48 w-full overflow-hidden rounded-[2px] bg-slate-200">
                    <Image
                      src={award.image}
                      alt={award.title}
                      fill
                      unoptimized
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3 bg-[#1e293b]/80 backdrop-blur-sm px-3 py-1 text-[11px] font-semibold tracking-wider text-white uppercase rounded-[2px]">
                      {award.category}
                    </div>
                  </div>
                  <div className="mt-4">
                    <h3 className="display-title text-xl font-bold text-[#1e293b] group-hover:text-[#0098a2] transition-colors">
                      {award.title}
                    </h3>
                    <p className="mt-2 text-xs md:text-sm text-[#64748b] font-light leading-relaxed">
                      {award.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 5: CALL TO ACTION BANNER */}
        <section className="w-full bg-white/80 backdrop-blur-md py-16 md:py-20 text-center border-t border-slate-200">
          <div className="mx-auto max-w-4xl px-6">
            <h2 className="script-title text-4xl sm:text-5xl md:text-6xl text-[#1e293b]">
              Sẵn Sàng Cho Chuyến Đi Độc Bản?
            </h2>
            <p className="mt-4 text-sm md:text-base text-[#4b5563] font-light max-w-xl mx-auto leading-relaxed">
              Khám phá các tour trải nghiệm tuyển chọn hoặc liên hệ với đội ngũ chuyên gia của Star Travels để thiết kế lịch trình riêng biệt.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/tours"
                className="bg-[#0098a2] hover:bg-[#087c86] text-white px-8 py-3 text-xs md:text-sm font-semibold tracking-widest uppercase transition rounded-[2px] shadow-sm flex items-center gap-2"
              >
                <span>Xem Danh Sách Tour</span>
                <ArrowRight className="size-4" />
              </Link>
              <Link
                href="/contact"
                className="bg-white hover:bg-slate-50 text-[#1e293b] border border-slate-300 px-8 py-3 text-xs md:text-sm font-semibold tracking-widest uppercase transition rounded-[2px] shadow-sm"
              >
                Liên Hệ Chuyên Viên
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
