import type { Metadata } from "next";
import Image from "next/image";
import { ShieldCheck, TrendingUp, Sparkles, Award, FileCheck2, Search, CheckCircle, Handshake } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { PartnerForm } from "@/components/partner/partner-form";
import { VIETNAM_IMAGES } from "@/lib/assets";

export const metadata: Metadata = {
  title: "Đăng Ký Đối Tác Lữ Hành & Bản Địa | Star Travels Vietnam",
  description: "Trở thành đối tác cung cấp dịch vụ du lịch, du thuyền, trekking và trải nghiệm độc bản tại Việt Nam.",
};

const BENEFITS = [
  {
    icon: TrendingUp,
    title: "Tiếp Cận Khách Hàng Cao Cấp",
    desc: "Mạng lưới du khách trong nước và quốc tế tìm kiếm những trải nghiệm chất lượng, tôn trọng văn hóa bản địa và có mức chi tiêu cao.",
  },
  {
    icon: Sparkles,
    title: "Sản Xuất Nội Dung & Visual Chuẩn Mực",
    desc: "Đội ngũ nhiếp ảnh và biên tập viên của Star Travels đồng hành chụp hình, viết bài PR và định vị hình ảnh thương hiệu của bạn.",
  },
  {
    icon: ShieldCheck,
    title: "Thanh Toán Minh Bạch & An Toàn",
    desc: "Hệ thống quyết toán tự động, đối soát công khai và chính sách giữ chỗ rõ ràng, loại bỏ rủi ro hủy phòng phút chót.",
  },
  {
    icon: Award,
    title: "Chứng Nhận Uy Tín Star Travels",
    desc: "Gia nhập cộng đồng nhà cung cấp được gắn huy hiệu kiểm định chất lượng, gia tăng lòng tin và tỷ lệ đặt dịch vụ vượt trội.",
  },
];

const STEPS = [
  {
    num: "01",
    title: "Nộp Hồ Sơ Năng Lực",
    desc: "Điền thông tin pháp lý doanh nghiệp, giấy phép kinh doanh lữ hành và danh mục sản phẩm qua biểu mẫu.",
    icon: FileCheck2,
  },
  {
    num: "02",
    title: "Thẩm Định Thực Địa",
    desc: "Ban kiểm định Star Travels tiến hành đánh giá quy chuẩn an toàn, độ vệ sinh và trải nghiệm thực tế.",
    icon: Search,
  },
  {
    num: "03",
    title: "Ký Kết Thỏa Thuận",
    desc: "Thống nhất chính sách giá ưu đãi, hạn mức dịch vụ và các cam kết bảo hiểm du khách theo chuẩn Star Travels.",
    icon: Handshake,
  },
  {
    num: "04",
    title: "Xuất Bản & Khởi Chạy",
    desc: "Sản phẩm được tối ưu hình ảnh, tích hợp vào hệ thống đặt chỗ trực tuyến và tiếp cận du khách ngay trong ngày.",
    icon: CheckCircle,
  },
];

export default function PartnerPage() {
  return (
    <>
      <PageHero
        title="Đồng Hành Cùng Star Travels"
        subtitle="Hệ sinh thái đối tác lữ hành, resort và nghệ nhân bản địa kiến tạo chuẩn mực du lịch mới tại Việt Nam."
        image={VIETNAM_IMAGES.hero}
      />

      <main className="template-page-bg min-h-screen text-[#282828] overflow-x-hidden">
        {/* SECTION 1: VALUE PROPOSITION */}
        <section className="relative w-full px-6 py-20 md:px-12 lg:px-16">
          <div className="mx-auto max-w-7xl">
            <div className="text-center max-w-3xl mx-auto">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#0098a2]">
                Quyền Lợi Đối Tác
              </span>
              <h2 className="script-title mt-2 text-5xl md:text-6xl text-[#1e293b]">
                Hợp Tác Bền Vững & Thịnh Vượng
              </h2>
              <p className="mt-4 text-sm md:text-base text-[#4b5563] font-light leading-relaxed">
                Chúng tôi không chỉ là kênh phân phối tour, mà là người bạn đồng hành nâng tầm giá trị thương hiệu và đưa vẻ đẹp di sản Việt Nam ra thế giới.
              </p>
            </div>

            <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {BENEFITS.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="bg-white/90 p-8 rounded-[2px] shadow-sm border border-slate-100 flex flex-col justify-between transition hover:shadow-md hover:-translate-y-1"
                  >
                    <div>
                      <div className="flex size-12 items-center justify-center rounded-full bg-[#0098a2]/10 text-[#0098a2]">
                        <Icon className="size-6 stroke-[1.75]" />
                      </div>
                      <h3 className="display-title mt-6 text-lg font-bold text-[#1e293b]">
                        {item.title}
                      </h3>
                      <p className="mt-3 text-xs md:text-sm font-light leading-relaxed text-[#555]">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* SECTION 2: 4-STEP ONBOARDING WORKFLOW */}
        <section className="w-full bg-white/70 py-20 md:py-28 border-y border-slate-200/60">
          <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
            <div className="text-center max-w-3xl mx-auto">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#0098a2]">
                Quy Trình Gia Nhập
              </span>
              <h2 className="script-title mt-2 text-5xl md:text-6xl text-[#1e293b]">
                4 Bước Trở Thành Đối Tác
              </h2>
              <p className="mt-3 text-sm md:text-base text-[#4b5563] font-light">
                Quy trình thẩm định minh bạch nhằm bảo đảm quyền lợi và an toàn tuyệt đối cho du khách.
              </p>
            </div>

            <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {STEPS.map((step) => {
                const Icon = step.icon;
                return (
                  <div
                    key={step.num}
                    className="relative bg-white p-7 rounded-[2px] shadow-sm border border-slate-100"
                  >
                    <div className="text-3xl font-black text-slate-200 display-title">
                      {step.num}
                    </div>
                    <div className="mt-3 flex size-10 items-center justify-center rounded-full bg-[#0098a2]/10 text-[#0098a2]">
                      <Icon className="size-5" />
                    </div>
                    <h3 className="display-title mt-4 text-base font-bold text-[#1e293b]">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-xs md:text-sm font-light leading-relaxed text-[#555]">
                      {step.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* SECTION 3: APPLICATION FORM */}
        <section className="w-full px-6 py-20 md:px-12 lg:px-16">
          <div className="mx-auto max-w-5xl">
            <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] items-start bg-white/90 p-8 md:p-12 rounded-[2px] shadow-sm border border-slate-100">
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#0098a2]">
                  Nộp Đơn Trực Tuyến
                </span>
                <h2 className="script-title mt-2 text-4xl md:text-5xl text-[#1e293b] leading-tight">
                  Đăng Ký Hồ Sơ Đối Tác
                </h2>
                <p className="mt-4 text-sm md:text-base font-light text-slate-600 leading-relaxed">
                  Hãy điền các thông tin cơ bản về doanh nghiệp hoặc mô hình trải nghiệm của bạn. Hội đồng thẩm định Star Travels sẽ liên hệ trực tiếp trong vòng 24 giờ.
                </p>

                <div className="mt-8 space-y-4 pt-6 border-t border-slate-100">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 size-2 rounded-full bg-[#0098a2] shrink-0" />
                    <p className="text-xs md:text-sm text-slate-600 font-light">
                      Ưu tiên các đơn vị sở hữu sản phẩm nguyên bản tại Vịnh Hạ Long, Sa Pa, Đà Nẵng, Hội An, Phú Quốc và Đồng bằng Sông Cửu Long.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-1 size-2 rounded-full bg-[#0098a2] shrink-0" />
                    <p className="text-xs md:text-sm text-slate-600 font-light">
                      Cam kết tôn trọng quy chuẩn an toàn, sinh thái và bảo tồn giá trị văn hóa địa phương.
                    </p>
                  </div>
                </div>

                <div className="mt-10 rounded-[2px] bg-slate-50 p-5 border border-slate-200 text-xs text-slate-500 font-light">
                  <strong>Cần giải đáp gấp?</strong> Liên hệ trực tiếp bộ phận Phát Triển Đối Tác:{" "}
                  <span className="text-[#0098a2] font-semibold">partner@startravels.vn</span> hoặc hotline{" "}
                  <span className="text-[#0098a2] font-semibold">+84 912 345 678</span>.
                </div>
              </div>

              {/* Form Container */}
              <div className="bg-slate-50/80 p-6 md:p-8 rounded-[2px] border border-slate-200">
                <PartnerForm />
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
