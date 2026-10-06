import type { Metadata } from "next";
import Link from "next/link";
import { cookies } from "next/headers";
import { Mail, Phone, MapPin, Clock, ShieldCheck, ArrowRight } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { ContactForm } from "@/components/contact/contact-form";
import { ContactFAQ } from "@/components/contact/contact-faq";
import { VIETNAM_IMAGES } from "@/lib/assets";
import { DICTIONARY } from "@/lib/i18n/dictionary";

export const metadata: Metadata = {
  title: "Liên Hệ & Tư Vấn Tour | Star Travels Vietnam",
  description: "Liên hệ trực tiếp với các chuyên gia du lịch Star Travels để được tư vấn hành trình độc bản và hỗ trợ dịch vụ 24/7.",
};

const CHANNEL_ICONS = [Phone, Mail, Clock];

export default async function ContactPage() {
  const cookieStore = await cookies();
  const isEn = cookieStore.get("star_travels_locale")?.value === "en";
  const dict = DICTIONARY[isEn ? "en" : "vi"];
  const t = dict.contactPage;

  return (
    <>
      <PageHero
        title="Liên Hệ Với Star Travels"
        titleEn="Contact & Concierge Support"
        subtitle="Mọi câu hỏi về điểm đến, trải nghiệm bản địa hay thiết kế lịch trình riêng, đội ngũ chuyên gia luôn sẵn sàng hỗ trợ bạn."
        subtitleEn="Have questions about destinations, experiences, or bespoke journeys? Our team is always here for you."
        image={VIETNAM_IMAGES.ctaBanner}
      />

      <main className="template-page-bg min-h-screen text-[#282828] overflow-x-hidden">
        {/* SECTION 1: QUICK CHANNELS */}
        <section className="relative w-full px-6 py-16 md:px-12 lg:px-16">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-6 md:grid-cols-3">
              {t.channels.map((item, idx) => {
                const Icon = CHANNEL_ICONS[idx] || Phone;
                return (
                  <div
                    key={item.title}
                    className="bg-white/90 p-8 rounded-[2px] shadow-sm border border-slate-100 flex flex-col items-center text-center transition hover:shadow-md"
                  >
                    <div className="flex size-14 items-center justify-center rounded-full bg-slate-100 text-slate-800">
                      <Icon className="size-6 stroke-[1.75]" />
                    </div>
                    <h3 className="display-title mt-5 text-lg font-bold text-[#1e293b] uppercase tracking-wider">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-base font-bold text-slate-900">
                      {item.primary}
                    </p>
                    <p className="mt-1 text-xs text-slate-500 font-light">
                      {item.secondary}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* SECTION 2: INQUIRY FORM & OFFICE DETAILS */}
        <section className="w-full px-6 pb-20 md:px-12 lg:px-16">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-12 lg:grid-cols-[1.25fr_0.75fr] items-start">
              {/* Left Column: Form */}
              <div className="bg-white/90 p-8 md:p-12 rounded-[2px] shadow-sm border border-slate-100">
                <span className="text-xs font-bold uppercase tracking-[0.25em] text-slate-900">
                  {t.formBadge}
                </span>
                <h2 className="script-title mt-2 text-4xl md:text-5xl text-[#1e293b]">
                  {t.formTitle}
                </h2>
                <p className="mt-3 text-sm md:text-base font-light text-slate-600 leading-relaxed mb-8">
                  {t.formDesc}
                </p>

                <ContactForm />
              </div>

              {/* Right Column: Office Locations & Support Commitments */}
              <div className="space-y-8">
                {/* Offices Card */}
                <div className="bg-white/90 p-8 rounded-[2px] shadow-sm border border-slate-100">
                  <h3 className="display-title text-xl font-bold text-[#1e293b] flex items-center gap-2">
                    <MapPin className="size-5 text-slate-700" />
                    <span>{t.officesHeading}</span>
                  </h3>
                  <div className="mt-6 space-y-6">
                    {t.offices.map((off, idx) => (
                      <div key={idx} className="border-b border-slate-100 pb-5 last:border-0 last:pb-0">
                        <strong className="text-sm font-semibold text-slate-900 block">
                          {off.city}
                        </strong>
                        <p className="mt-1 text-xs md:text-sm font-light text-slate-600 leading-relaxed">
                          {off.address}
                        </p>
                        <p className="mt-1.5 text-xs font-semibold text-slate-900">
                          {isEn ? "Phone: " : "Điện thoại: "}{off.phone}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Assurance Card */}
                <div className="bg-[#1e293b] text-white p-8 rounded-[2px] shadow-md">
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="size-8 text-amber-400" />
                    <h3 className="display-title text-xl font-bold">
                      {isEn ? "Star Travels Commitments" : "Cam Kết Từ Star Travels"}
                    </h3>
                  </div>
                  <ul className="mt-5 space-y-3 text-xs md:text-sm font-light text-white/80 leading-relaxed">
                    <li className="flex items-start gap-2">
                      <span className="text-amber-400 font-bold">✓</span>
                      <span>
                        {isEn
                          ? "Absolute confidentiality of guest personal data and travel schedules."
                          : "Bảo mật tuyệt đối thông tin cá nhân và lịch trình du khách."}
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-400 font-bold">✓</span>
                      <span>
                        {isEn
                          ? "100% complimentary itinerary planning with no pressure to deposit."
                          : "Tư vấn hoàn toàn miễn phí, không áp đặt quyết định đặt cọc."}
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-400 font-bold">✓</span>
                      <span>
                        {isEn
                          ? "Comprehensive premium travel insurance included in every departure."
                          : "Bảo hiểm du lịch trọn gói cho mọi tour khởi hành."}
                      </span>
                    </li>
                  </ul>

                  <div className="mt-6 pt-5 border-t border-white/10 text-center">
                    <Link
                      href="/partner"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-amber-400 hover:underline"
                    >
                      <span>
                        {isEn
                          ? "Are you a travel supplier? Join our partner network"
                          : "Bạn là nhà cung cấp du lịch? Đăng ký đối tác"}
                      </span>
                      <ArrowRight className="size-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: FAQ ACCORDION */}
        <section className="w-full bg-white/60 py-20 md:py-28 border-t border-slate-200/60">
          <div className="mx-auto max-w-4xl px-6 md:px-12">
            <div className="text-center mb-12">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-slate-900">
                {t.faqBadge}
              </span>
              <h2 className="script-title mt-2 text-5xl md:text-6xl text-[#1e293b]">
                {t.faqHeading}
              </h2>
              <p className="mt-3 text-sm md:text-base text-[#4b5563] font-light max-w-xl mx-auto">
                {isEn
                  ? "Key information regarding booking procedures, payments, and Star Travels support policies."
                  : "Những thông tin quan trọng về quy trình đặt tour, thanh toán và các chính sách hỗ trợ của Star Travels."}
              </p>
            </div>

            <ContactFAQ />
          </div>
        </section>
      </main>
    </>
  );
}
