import type { Metadata } from "next";
import { PageHero } from "@/components/layout/page-hero";
import { PartnerForm } from "@/components/partner/partner-form";
import { VIETNAM_IMAGES } from "@/lib/assets";

export const metadata: Metadata = {
  title: "Đăng ký đối tác du lịch bản địa | Star Travels Vietnam",
  description: "Trở thành đối tác cung cấp dịch vụ du lịch, tour trải nghiệm uy tín tại Việt Nam.",
};

export default function PartnerPage() {
  return (
    <>
      <PageHero
        title="Hợp Tác Đối Tác Du Lịch Bản Địa"
        subtitle="Quy trình thẩm định minh bạch, chuyên nghiệp nhằm xây dựng hệ sinh thái du lịch tin cậy tại Việt Nam."
        image={VIETNAM_IMAGES.hero}
      />

      <main className="template-page-bg min-h-screen px-6 py-20 md:px-12">
        <div className="mx-auto grid max-w-5xl gap-12 rounded-xl bg-white p-8 md:p-12 shadow-sm md:grid-cols-[0.9fr_1.1fr]">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0098a2]">
              Dành cho doanh nghiệp du lịch
            </span>
            <h2 className="script-title mt-2 text-4xl md:text-5xl text-slate-900 leading-tight">
              Đồng hành cùng Star Travels kiến tạo giá trị du lịch bền vững.
            </h2>
            <p className="mt-6 text-base font-light leading-relaxed text-slate-600">
              Gửi thông tin doanh nghiệp hoặc mô hình trải nghiệm của bạn. Ban quản trị sẽ thẩm định
              hồ sơ và phê duyệt tổ chức đối tác chính thức trên hệ sinh thái Star Travels.
            </p>

            <div className="mt-8 space-y-4 text-sm text-slate-600">
              <div className="flex items-center gap-3">
                <div className="size-2 rounded-full bg-[#0098a2]" />
                <span>Tiếp cận hàng triệu du khách yêu chuộng trải nghiệm bản địa.</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="size-2 rounded-full bg-[#0098a2]" />
                <span>Bảo chứng uy tín và chất lượng dịch vụ minh bạch.</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="size-2 rounded-full bg-[#0098a2]" />
                <span>Hỗ trợ quảng bá nội dung và câu chuyện văn hóa địa phương.</span>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-slate-50 p-6 md:p-8 border border-slate-100">
            <PartnerForm />
          </div>
        </div>
      </main>
    </>
  );
}
