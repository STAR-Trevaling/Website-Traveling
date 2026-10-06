import type { Metadata } from "next";
import { cookies } from "next/headers";
import { ShieldCheck, TrendingUp, Sparkles, Award, FileCheck2, Search, CheckCircle, Handshake } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { PartnerForm } from "@/components/partner/partner-form";
import { VIETNAM_IMAGES } from "@/lib/assets";
import { DICTIONARY } from "@/lib/i18n/dictionary";

export const metadata: Metadata = {
  title: "Đăng Ký Đối Tác Lữ Hành & Bản Địa | Star Travels Vietnam",
  description: "Trở thành đối tác cung cấp dịch vụ du lịch, du thuyền, trekking và trải nghiệm độc bản tại Việt Nam.",
};

const BENEFIT_ICONS = [TrendingUp, Sparkles, ShieldCheck, Award];
const STEP_ICONS = [FileCheck2, Search, Handshake, CheckCircle];

export default async function PartnerPage() {
  const cookieStore = await cookies();
  const isEn = cookieStore.get("star_travels_locale")?.value === "en";
  const dict = DICTIONARY[isEn ? "en" : "vi"];
  const t = dict.partnerPage;

  return (
    <>
      <PageHero
        title="Đồng Hành Cùng Star Travels"
        titleEn="Partner with Star Travels"
        subtitle="Hệ sinh thái đối tác lữ hành, resort và nghệ nhân bản địa kiến tạo chuẩn mực du lịch mới tại Việt Nam."
        subtitleEn="Join an exclusive ecosystem of local operators, boutique resorts, and cultural artisans."
        image={VIETNAM_IMAGES.hero}
      />

      <main className="template-page-bg min-h-screen text-[#282828] overflow-x-hidden">
        {/* SECTION 1: VALUE PROPOSITION */}
        <section className="relative w-full px-4 sm:px-6 py-10 sm:py-16 md:py-20 md:px-12 lg:px-16">
          <div className="mx-auto max-w-7xl">
            <div className="text-center max-w-3xl mx-auto">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-slate-900">
                {t.benefitsBadge}
              </span>
              <h2 className="script-title mt-2 text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#1e293b]">
                {t.benefitsHeading}
              </h2>
              <p className="mt-3 sm:mt-4 text-xs sm:text-sm md:text-base text-[#4b5563] font-light leading-relaxed">
                {isEn
                  ? "We are not just a tour distribution channel, but a trusted partner elevating your brand and introducing Vietnam's heritage to the world."
                  : "Chúng tôi không chỉ là kênh phân phối tour, mà là người bạn đồng hành nâng tầm giá trị thương hiệu và đưa vẻ đẹp di sản Việt Nam ra thế giới."}
              </p>
            </div>

            <div className="mt-8 sm:mt-14 grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-4">
              {t.benefits.map((item, idx) => {
                const Icon = BENEFIT_ICONS[idx] || Sparkles;
                return (
                  <div
                    key={item.title}
                    className="bg-white/90 p-5 sm:p-8 rounded-[2px] shadow-sm border border-slate-100 flex flex-col justify-between transition hover:shadow-md hover:-translate-y-1"
                  >
                    <div>
                      <div className="flex size-11 sm:size-12 items-center justify-center rounded-full bg-slate-100 text-slate-800">
                        <Icon className="size-5 sm:size-6 stroke-[1.75]" />
                      </div>
                      <h3 className="display-title mt-4 sm:mt-6 text-base sm:text-lg font-bold text-[#1e293b]">
                        {item.title}
                      </h3>
                      <p className="mt-2 sm:mt-3 text-xs md:text-sm font-light leading-relaxed text-[#555]">
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
        <section className="w-full bg-white/70 py-12 sm:py-20 md:py-28 border-y border-slate-200/60">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-12 lg:px-16">
            <div className="text-center max-w-3xl mx-auto">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-slate-900">
                {t.stepsBadge}
              </span>
              <h2 className="script-title mt-2 text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#1e293b]">
                {t.stepsHeading}
              </h2>
              <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm md:text-base text-[#4b5563] font-light">
                {isEn
                  ? "A structured, transparent onboarding procedure ensuring uncompromising quality and guest satisfaction."
                  : "Quy trình thẩm định minh bạch nhằm bảo đảm quyền lợi và an toàn tuyệt đối cho du khách."}
              </p>
            </div>

            <div className="mt-8 sm:mt-16 grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {t.steps.map((step, idx) => {
                const Icon = STEP_ICONS[idx] || CheckCircle;
                return (
                  <div
                    key={step.num}
                    className="relative bg-white p-5 sm:p-7 rounded-[2px] shadow-sm border border-slate-100"
                  >
                    <div className="text-2xl sm:text-3xl font-black text-slate-200 display-title">
                      {step.num}
                    </div>
                    <div className="mt-2.5 sm:mt-3 flex size-9 sm:size-10 items-center justify-center rounded-full bg-slate-100 text-slate-800">
                      <Icon className="size-4 sm:size-5" />
                    </div>
                    <h3 className="display-title mt-3 sm:mt-4 text-sm sm:text-base font-bold text-[#1e293b]">
                      {step.title}
                    </h3>
                    <p className="mt-1.5 sm:mt-2 text-xs md:text-sm font-light leading-relaxed text-[#555]">
                      {step.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* SECTION 3: APPLICATION FORM */}
        <section className="w-full px-4 sm:px-6 py-12 sm:py-20 md:px-12 lg:px-16">
          <div className="mx-auto max-w-5xl">
            <div className="grid gap-8 sm:gap-12 lg:grid-cols-[0.9fr_1.1fr] items-start bg-white/90 p-5 sm:p-8 md:p-12 rounded-[2px] shadow-sm border border-slate-100">
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.25em] text-slate-900">
                  {t.formBadge}
                </span>
                <h2 className="script-title mt-1.5 sm:mt-2 text-3xl sm:text-4xl md:text-5xl text-[#1e293b] leading-tight">
                  {t.formTitle}
                </h2>
                <p className="mt-3 sm:mt-4 text-xs sm:text-sm md:text-base font-light text-slate-600 leading-relaxed">
                  {t.formDesc}
                </p>

                <div className="mt-6 sm:mt-8 space-y-3 sm:space-y-4 pt-5 sm:pt-6 border-t border-slate-100">
                  <div className="flex items-start gap-2.5 sm:gap-3">
                    <div className="mt-1 size-2 rounded-full bg-slate-800 shrink-0" />
                    <p className="text-xs md:text-sm text-slate-600 font-light">
                      {isEn
                        ? "Priority for operators with authentic products in Ha Long, Sa Pa, Da Nang, Hoi An, Phu Quoc, and Mekong Delta."
                        : "Ưu tiên các đơn vị sở hữu sản phẩm nguyên bản tại Vịnh Hạ Long, Sa Pa, Đà Nẵng, Hội An, Phú Quốc và Đồng bằng Sông Cửu Long."}
                    </p>
                  </div>
                  <div className="flex items-start gap-2.5 sm:gap-3">
                    <div className="mt-1 size-2 rounded-full bg-slate-800 shrink-0" />
                    <p className="text-xs md:text-sm text-slate-600 font-light">
                      {isEn
                        ? "Commitment to international safety standards, eco-responsibility, and cultural preservation."
                        : "Cam kết tôn trọng quy chuẩn an toàn, sinh thái và bảo tồn giá trị văn hóa địa phương."}
                    </p>
                  </div>
                </div>

                <div className="mt-6 sm:mt-10 rounded-[2px] bg-slate-50 p-4 sm:p-5 border border-slate-200 text-xs text-slate-500 font-light">
                  <strong>{isEn ? "Need immediate assistance?" : "Cần giải đáp gấp?"}</strong>{" "}
                  {isEn ? "Directly contact our Partnership Division:" : "Liên hệ trực tiếp bộ phận Phát Triển Đối Tác:"}{" "}
                  <span className="text-slate-900 font-bold">partner@startravels.vn</span>{" "}
                  {isEn ? "or hotline" : "hoặc hotline"}{" "}
                  <span className="text-slate-900 font-bold">+84 912 345 678</span>.
                </div>
              </div>

              {/* Form Container */}
              <div className="bg-slate-50/80 p-4 sm:p-6 md:p-8 rounded-[2px] border border-slate-200">
                <PartnerForm />
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
