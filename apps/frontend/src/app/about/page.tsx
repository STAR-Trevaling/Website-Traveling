import type { Metadata } from "next";
import { PageHero } from "@/components/layout/page-hero";
import { VIETNAM_IMAGES } from "@/lib/assets";

export const metadata: Metadata = {
  title: "Về chúng tôi | Star Travels Vietnam",
  description: "Sứ mệnh kết nối du khách với những giá trị du lịch nguyên bản và bền vững tại Việt Nam.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="Về Star Travels Vietnam"
        subtitle="Nền tảng khám phá du lịch bản địa, kết nối du khách với những điểm đến độc bản và đối tác uy tín."
        image={VIETNAM_IMAGES.hero}
      />

      <main className="template-page-bg min-h-screen px-6 py-20 md:px-12">
        <div className="mx-auto max-w-4xl rounded-xl bg-white p-8 md:p-14 shadow-sm text-lg font-light leading-9 text-slate-700 space-y-6">
          <p>
            <strong>Star Travels</strong> ra đời với sứ mệnh mang đến cho du khách những góc nhìn sâu sắc,
            chân thực và giàu cảm xúc về vẻ đẹp đất nước và con người Việt Nam. Chúng tôi tin rằng du lịch
            không chỉ là những bức ảnh check-in vội vã, mà là hành trình thấu hiểu văn hóa, trân trọng tự nhiên
            và hòa mình vào đời sống bản địa.
          </p>

          <p>
            Mỗi điểm đến và trải nghiệm trên hệ thống đều được tuyển chọn kỹ lưỡng, từ những hòn đảo hoang sơ
            của Phú Quốc, biển mây bồng bềnh tại Sa Pa - Tà Xùa, những con ngõ cổ rực rỡ đèn lồng Hội An
            cho đến kỳ quan thiên nhiên thế giới Vịnh Hạ Long.
          </p>

          <p>
            Các doanh nghiệp và đơn vị cung cấp dịch vụ địa phương có thể gửi hồ sơ đăng ký hợp tác.
            Mọi hồ sơ đều trải qua quy trình thẩm định minh bạch để đảm bảo du khách luôn nhận được dịch vụ
            an toàn, tin cậy và chuẩn mực cao nhất.
          </p>

          <div className="pt-6 border-t border-slate-100">
            <h2 className="script-title text-4xl md:text-5xl text-[#0098a2]">
              Khám phá sâu sắc hơn. Gìn giữ bản sắc Việt Nam.
            </h2>
          </div>
        </div>
      </main>
    </>
  );
}
