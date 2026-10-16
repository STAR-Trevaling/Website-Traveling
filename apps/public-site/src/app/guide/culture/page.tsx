import type { Metadata } from "next";
import { cookies } from "next/headers";
import {
  HeartHandshake,
  Landmark,
  MessageCircle,
  ShoppingBag,
  Coins,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Sparkles,
} from "lucide-react";
import { SiteHeader } from "@/components/layout/site-header";
import { Breadcrumb } from "@/components/shared/breadcrumb";
import {
  ETIQUETTE_CATEGORIES,
  CULTURAL_TABOOS,
} from "@/data/seed/guide";
import { VIETNAM_IMAGES } from "@/lib/assets";

export const metadata: Metadata = {
  title: "Văn Hoá & Phép Tắc Du Lịch Việt Nam: Trang Phục Đền Chùa, Mặc Cả & Tiền Tip | STAR Travels",
  description:
    "Cẩm nang phép tắc ứng xử văn hóa tại Việt Nam: quy định trang phục đền chùa lăng tẩm, nghệ thuật mặc cả ở chợ, văn hóa tiền tip và những điều kiêng kỵ tuyệt đối nên tránh.",
  keywords: [
    "văn hóa du lịch việt nam",
    "quy định trang phục đi chùa việt nam",
    "cách mặc cả khi đi du lịch",
    "tiền tip ở việt nam",
    "những điều cấm kỵ ở việt nam",
    "vietnam travel etiquette",
    "cultural taboos in vietnam",
  ],
  openGraph: {
    title: "Văn Hoá & Phép Tắc Du Lịch Việt Nam: Trang Phục Đền Chùa, Mặc Cả & Tiền Tip | STAR Travels",
    description:
      "Quy chuẩn trang phục đền chùa di tích, giao tiếp lịch sự, kinh nghiệm mặc cả, văn hóa tiền tip và các điều kiêng kỵ.",
    images: [{ url: VIETNAM_IMAGES.hue, width: 1200, height: 630, alt: "Văn Hóa Du Lịch Việt Nam" }],
  },
};

const CATEGORY_ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Landmark,
  MessageCircle,
  ShoppingBag,
  Coins,
};

export default async function CultureGuidePage() {
  const cookieStore = await cookies();
  const isEn = cookieStore.get("star_travels_locale")?.value === "en";

  const breadcrumbs = [
    { label: isEn ? "Home" : "Trang Chủ", href: "/" },
    { label: isEn ? "Travel Info Hub" : "Thông Tin Cần Biết", href: "/guide" },
    { label: isEn ? "Culture & Etiquette" : "Văn Hoá & Phép Tắc" },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: isEn
      ? "Vietnam Cultural Etiquette, Temple Dress Codes, Bargaining & Taboos"
      : "Cẩm Nang Văn Hóa & Phép Tắc Ứng Xử Du Lịch Việt Nam",
    description: isEn
      ? "Essential social customs, dress standards at sacred pagodas, respectful bargaining, and taboos to avoid in Vietnam."
      : "Quy chuẩn ứng xử, trang phục đền chùa, mặc cả văn minh và những điều kiêng kỵ tại Việt Nam.",
    image: VIETNAM_IMAGES.hue,
    author: {
      "@type": "Organization",
      name: "STAR Travels Vietnam",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <SiteHeader overlay={false} />

      <main className="template-page-bg min-h-screen px-4 sm:px-6 py-8 sm:py-12 md:px-12 lg:px-16">
        <div className="mx-auto max-w-7xl">
          {/* Breadcrumb Pill */}
          <div className="mb-8">
            <Breadcrumb items={breadcrumbs} />
          </div>

          {/* Section Intro */}
          <section className="mb-12 max-w-3xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[2px] bg-purple-50 text-purple-900 border border-purple-200 text-xs font-bold uppercase tracking-wider mb-3">
              <HeartHandshake className="size-3.5 text-purple-600" />
              <span>{isEn ? "RESPECT & HARMONY" : "ỨNG XỬ & TÔN TRỌNG BẢN ĐỊA"}</span>
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 leading-tight">
              {isEn
                ? "Connecting Authentically with Vietnamese People & Traditions"
                : "Hòa Nhập Bản Sắc & Giao Tiếp Chân Tình Cùng Người Việt"}
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
              {isEn
                ? "Vietnamese people are universally recognized for their warmth, friendliness, and hospitality. Showing respect for local sacred spaces, social modesty, and ancestral customs will open hearts and build unforgettable friendships."
                : "Người Việt Nam nổi tiếng với sự hiếu khách, nụ cười chân thành và lòng nhân ái. Việc nắm rõ các phép tắc văn hóa, tôn trọng không gian thờ tự và thấu hiểu phong tục tập quán sẽ giúp chuyến hành trình của bạn ngập tràn những kết nối đẹp."}
            </p>
          </section>

          {/* Section 1: Core Etiquette Themes */}
          <section className="mb-16 space-y-8">
            {ETIQUETTE_CATEGORIES.map((cat) => {
              const Icon = CATEGORY_ICON_MAP[cat.icon] || Landmark;
              return (
                <div
                  key={cat.id}
                  className="rounded-[2px] bg-white border border-slate-200 shadow-sm p-6 sm:p-8"
                >
                  {/* Category Header */}
                  <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
                    <div className="size-11 rounded-[2px] bg-slate-50 border border-slate-200 flex items-center justify-center text-[#da251d]">
                      <Icon className="size-6" />
                    </div>
                    <div>
                      <h3 className="font-serif text-lg sm:text-xl font-bold text-slate-900">
                        {isEn ? cat.titleEn : cat.title}
                      </h3>
                    </div>
                  </div>

                  {/* Do vs Don't Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    {cat.rules.map((rule, idx) => (
                      <div
                        key={idx}
                        className="rounded-[2px] bg-slate-50 border border-slate-100 p-4 sm:p-5 space-y-3 text-xs"
                      >
                        {/* DO */}
                        <div className="flex items-start gap-2 text-emerald-900">
                          <CheckCircle2 className="size-4 text-emerald-600 shrink-0 mt-0.5" />
                          <div>
                            <span className="font-bold text-[11px] uppercase tracking-wider text-emerald-700 block mb-0.5">
                              {isEn ? "DO:" : "NÊN LÀM:"}
                            </span>
                            <p className="leading-relaxed font-medium">
                              {isEn ? rule.doEn : rule.do}
                            </p>
                          </div>
                        </div>

                        {/* DONT */}
                        <div className="flex items-start gap-2 text-rose-900 pt-2 border-t border-slate-200/60">
                          <XCircle className="size-4 text-rose-600 shrink-0 mt-0.5" />
                          <div>
                            <span className="font-bold text-[11px] uppercase tracking-wider text-rose-700 block mb-0.5">
                              {isEn ? "DON'T:" : "KHÔNG NÊN:"}
                            </span>
                            <p className="leading-relaxed">
                              {isEn ? rule.dontEn : rule.dont}
                            </p>
                          </div>
                        </div>

                        {/* Context Note */}
                        <div className="pt-2 text-[11px] text-slate-500 italic">
                          ℹ️ {isEn ? rule.contextEn : rule.context}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Practical Advice */}
                  <div className="rounded-[2px] bg-purple-50/60 border border-purple-200/80 p-4 text-xs text-purple-950">
                    <p className="font-bold text-purple-900 uppercase tracking-wider text-[11px] mb-2 flex items-center gap-1.5">
                      <Sparkles className="size-3.5 text-purple-600" />
                      <span>{isEn ? "Practical Advice:" : "Lời khuyên thực tế:"}</span>
                    </p>
                    <ul className="space-y-1 text-slate-700 text-xs">
                      {(isEn ? cat.practicalAdviceEn : cat.practicalAdvice).map((adv, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-[#da251d] font-bold">•</span>
                          <span>{adv}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </section>

          {/* Section 2: Cultural Taboos to Avoid */}
          <section className="mb-14">
            <div className="rounded-[2px] bg-white border border-slate-200 p-6 sm:p-8 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className="size-5 text-rose-600" />
                <span className="text-xs font-bold uppercase tracking-wider text-rose-800">
                  {isEn ? "TABOOS & CULTURAL SENSITIVITIES" : "ĐIỀU KIÊNG KỴ NÊN TRÁNH"}
                </span>
              </div>

              <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 mb-2">
                {isEn ? "Cultural Taboos & How to Handle Awkward Moments" : "Những Điều Kiêng Kỵ Tuyệt Đối Không Nên Làm"}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mb-6 max-w-2xl leading-relaxed">
                {isEn
                  ? "Avoid unintentionally causing offense by keeping these everyday spiritual and interpersonal taboos in mind:"
                  : "Tránh gây hiểu lầm hoặc làm phật lòng người dân bản địa bằng cách ghi nhớ những điều kiêng kỵ thường gặp sau:"}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {CULTURAL_TABOOS.map((taboo, idx) => (
                  <div
                    key={idx}
                    className="rounded-[2px] bg-rose-50/50 border border-rose-200/80 p-5 space-y-2 text-xs"
                  >
                    <div className="flex items-center gap-2 text-rose-950 font-bold text-sm">
                      <XCircle className="size-4 text-rose-600 shrink-0" />
                      <span>{isEn ? taboo.tabooEn : taboo.taboo}</span>
                    </div>

                    <p className="text-slate-700 text-[11px] leading-relaxed">
                      <strong>{isEn ? "Cultural Reason:" : "Lý do văn hóa:"}</strong>{" "}
                      {isEn ? taboo.reasonEn : taboo.reason}
                    </p>

                    <div className="p-2.5 rounded-[2px] bg-white border border-rose-100 text-[11px] text-slate-600">
                      <strong className="text-emerald-800">
                        {isEn ? "How to remedy:" : "Cách xử lý khéo léo:"}
                      </strong>{" "}
                      {isEn ? taboo.howToRemedyEn : taboo.howToRemedy}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
