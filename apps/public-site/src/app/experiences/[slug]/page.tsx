import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import { MapPin, Star, Clock, Users, ShieldCheck, Compass, CheckCircle2 } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { Breadcrumb } from "@/components/shared/breadcrumb";
import { FavoriteButton } from "@/components/experience/favorite-button";
import { ReviewForm } from "@/components/experience/review-form";
import { ExperienceBookingCard } from "@/components/experience/experience-booking-card";
import { PlaceCard } from "@/components/shared/place-card";
import { getCurrentUser } from "@/lib/auth";
import { publicApi, safe } from "@/lib/api";
import { VIETNAM_IMAGES } from "@/lib/assets";
import { VIETNAM_EXPERIENCES } from "@/data/seed";
import { DICTIONARY } from "@/lib/i18n/dictionary";
import type { Locale } from "@/lib/i18n/types";

interface ExperienceDetailProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ExperienceDetailProps): Promise<Metadata> {
  const { slug } = await params;
  const experience = VIETNAM_EXPERIENCES.find((e) => e.slug === slug);
  const title = experience?.name ? `${experience.name} - Trải Nghiệm Độc Bản | STAR Travels` : "Trải Nghiệm | STAR Travels";
  const description = experience?.description || "Khám phá các hoạt động và trải nghiệm văn hóa, ẩm thực, nghỉ dưỡng tại Việt Nam.";
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: (experience?.image_url || (experience as any)?.image)
        ? [{ url: experience?.image_url || (experience as any)?.image }]
        : [],
    },
  };
}

export default async function ExperienceDetail({ params }: ExperienceDetailProps) {
  const user = await getCurrentUser();
  const cookieStore = await cookies();
  const isEn = cookieStore.get("star_travels_locale")?.value === "en";
  const locale: Locale = isEn ? "en" : "vi";
  const dict = DICTIONARY[locale];
  const ed = dict.experienceDetailPage;

  const { slug } = await params;
  let place;

  try {
    place = await publicApi.place(slug);
  } catch {
    place = VIETNAM_EXPERIENCES.find((e) => e.slug === slug);
    if (!place) {
      notFound();
    }
  }

  const reviews = await safe(publicApi.reviews(slug), []);

  // Related experiences from same destination or category, excluding current
  const related = VIETNAM_EXPERIENCES.filter((e) => e.slug !== slug).slice(0, 3);

  const displayName = isEn && place.name_en ? place.name_en : place.name;
  const displayCategory =
    isEn && place.category?.name_en
      ? place.category.name_en
      : place.category?.name || (isEn ? "Bespoke Experience" : "Trải nghiệm độc bản");
  const displayDestination =
    isEn && place.destination?.name_en
      ? place.destination.name_en
      : place.destination?.name || (isEn ? "Vietnam" : "Việt Nam");
  const displayDesc = isEn && place.description_en ? place.description_en : place.description;
  const displayAddress = isEn && place.address_en ? place.address_en : place.address;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    name: displayName,
    description: displayDesc,
    image: place.image_url || VIETNAM_IMAGES.cruise,
    address: {
      "@type": "PostalAddress",
      streetAddress: displayAddress,
      addressCountry: "VN",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: Number(place.average_rating || 5.0).toFixed(1),
      reviewCount: place.review_count || 1,
    },
    url: `https://startravels.vn/experiences/${slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageHero
        title={displayName}
        subtitle={`${displayCategory} · ${displayDestination}`}
        image={place.image_url || VIETNAM_IMAGES.cruise}
      />

      <main className="template-page-bg min-h-screen text-[#282828] px-6 py-16 md:px-12 lg:px-16">
        <div className="mx-auto max-w-7xl">
          {/* Breadcrumb Bar */}
          <div className="mb-8">
            <Breadcrumb
              items={[
                { label: ed.breadcrumbHome, href: "/" },
                { label: ed.breadcrumbExp, href: "/experiences" },
                { label: displayName },
              ]}
            />
          </div>

          <div className="grid gap-12 lg:grid-cols-[1fr_380px] items-start">
            {/* LEFT COLUMN: MAIN CONTENT */}
            <article className="space-y-12">
              {/* SPECS BAR */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-white/90 p-6 rounded-[2px] shadow-sm border border-slate-100">
                <div className="flex items-center gap-3">
                  <Clock className="size-5 text-slate-700" />
                  <div>
                    <span className="text-[11px] text-slate-400 uppercase tracking-wider block">
                      {ed.duration}
                    </span>
                    <strong className="text-xs sm:text-sm font-semibold text-slate-800">
                      {ed.durationValue}
                    </strong>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="size-5 text-slate-700" />
                  <div>
                    <span className="text-[11px] text-slate-400 uppercase tracking-wider block">
                      {ed.groupSize}
                    </span>
                    <strong className="text-xs sm:text-sm font-semibold text-slate-800">
                      {ed.groupSizeValue}
                    </strong>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Compass className="size-5 text-slate-700" />
                  <div>
                    <span className="text-[11px] text-slate-400 uppercase tracking-wider block">
                      {isEn ? "Languages" : "Ngôn ngữ"}
                    </span>
                    <strong className="text-xs sm:text-sm font-semibold text-slate-800">
                      {isEn ? "English & Vietnamese" : "Tiếng Việt & Anh"}
                    </strong>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <ShieldCheck className="size-5 text-slate-700" />
                  <div>
                    <span className="text-[11px] text-slate-400 uppercase tracking-wider block">
                      {ed.safety}
                    </span>
                    <strong className="text-xs sm:text-sm font-semibold text-slate-800">
                      {ed.safetyValue}
                    </strong>
                  </div>
                </div>
              </div>

              {/* OVERVIEW & HIGHLIGHTS */}
              <div className="bg-white/90 p-8 sm:p-10 rounded-[2px] shadow-sm border border-slate-100">
                <span className="text-xs font-bold uppercase tracking-[0.25em] text-slate-900">
                  {ed.overviewTitle}
                </span>
                <h2 className="script-title mt-2 text-4xl sm:text-5xl text-[#1e293b]">
                  {isEn ? "Authentic Cultural Journey" : "Hành Trình Chạm Vào Bản Sắc"}
                </h2>

                <div className="mt-4 flex flex-wrap items-center gap-6 text-sm text-slate-600 pb-6 border-b border-slate-100">
                  <span className="flex items-center gap-1.5 font-light">
                    <MapPin className="size-4 text-slate-600" />
                    {displayAddress}
                  </span>
                  <span className="flex items-center gap-1.5 font-medium text-amber-600">
                    <Star className="size-4 fill-amber-400 text-amber-400" />
                    {Number(place.average_rating || 5.0).toFixed(1)} ({place.review_count || 0}{" "}
                    {dict.common.reviews})
                  </span>
                </div>

                <div className="mt-6 text-base sm:text-lg font-light leading-relaxed text-[#4b5563] space-y-4">
                  <p>{displayDesc}</p>
                </div>

                {/* Highlights List */}
                <div className="mt-8 pt-6 border-t border-slate-100">
                  <h3 className="display-title text-lg font-bold text-[#1e293b] uppercase tracking-wider mb-4">
                    {ed.highlightsTitle}
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-3.5">
                    <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 font-light">
                      <CheckCircle2 className="size-4 text-slate-800 shrink-0 mt-0.5" />
                      <span>
                        {isEn
                          ? "Experienced local hosts with deep cultural storytelling."
                          : "Hướng dẫn viên bản địa am hiểu sâu sắc địa hình và câu chuyện di sản."}
                      </span>
                    </div>
                    <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 font-light">
                      <CheckCircle2 className="size-4 text-slate-800 shrink-0 mt-0.5" />
                      <span>
                        {isEn
                          ? "International-standard safety gear and sanitized equipment."
                          : "Trang thiết bị chuyên dụng tiêu chuẩn quốc tế an toàn tuyệt đối."}
                      </span>
                    </div>
                    <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 font-light">
                      <CheckCircle2 className="size-4 text-slate-800 shrink-0 mt-0.5" />
                      <span>
                        {isEn
                          ? "Authentic local refreshments and regional specialties included."
                          : "Thưởng thức ẩm thực và đồ uống giải khát đặc sản miệt vườn/vùng cao."}
                      </span>
                    </div>
                    <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 font-light">
                      <CheckCircle2 className="size-4 text-slate-800 shrink-0 mt-0.5" />
                      <span>
                        {isEn
                          ? "Complimentary high-resolution commemorative photography support."
                          : "Hỗ trợ chụp hình kỷ niệm chất lượng cao trong suốt hành trình."}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* INCLUSIONS & ADVICE */}
              <div className="grid sm:grid-cols-2 gap-6 bg-white/90 p-8 sm:p-10 rounded-[2px] shadow-sm border border-slate-100">
                <div>
                  <h3 className="display-title text-base font-bold text-slate-900 uppercase tracking-wider mb-4">
                    {isEn ? "What's Included" : "Bao Gồm Trong Giá"}
                  </h3>
                  <ul className="space-y-2.5 text-xs sm:text-sm font-light text-slate-600">
                    <li className="flex items-center gap-2">
                      <span className="text-slate-800 font-bold">✓</span>
                      <span>
                        {isEn
                          ? "All entrance fees and environmental sanitation fees"
                          : "Toàn bộ vé tham quan và phí môi trường"}
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-slate-800 font-bold">✓</span>
                      <span>
                        {isEn
                          ? "Certified English & Vietnamese speaking local host"
                          : "Hướng dẫn viên chuyên nghiệp theo sát đoàn"}
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-slate-800 font-bold">✓</span>
                      <span>
                        {isEn
                          ? "Fresh bottled water and local tea / refreshments"
                          : "Nước suối và đồ uống nhẹ trên hành trình"}
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-slate-800 font-bold">✓</span>
                      <span>
                        {isEn
                          ? "Standard comprehensive travel insurance coverage"
                          : "Bảo hiểm tai nạn du lịch tiêu chuẩn"}
                      </span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="display-title text-base font-bold text-slate-900 uppercase tracking-wider mb-4">
                    {isEn ? "Traveler Tips & Preparation" : "Lời Khuyên Du Khách Chuẩn Bị"}
                  </h3>
                  <ul className="space-y-2.5 text-xs sm:text-sm font-light text-slate-600">
                    <li className="flex items-center gap-2">
                      <span className="text-amber-500 font-bold">•</span>
                      <span>
                        {isEn
                          ? "Comfortable outdoor sportswear and non-slip walking shoes"
                          : "Trang phục thể thao thoải mái, giày bám chống trơn trượt"}
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-amber-500 font-bold">•</span>
                      <span>
                        {isEn
                          ? "Eco-friendly mineral sunscreen and wide-brim hat"
                          : "Kem chống nắng thân thiện môi trường, mũ rộng vành"}
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-amber-500 font-bold">•</span>
                      <span>
                        {isEn
                          ? "Waterproof bag for smartphones and cameras"
                          : "Túi chống nước bảo vệ điện thoại và máy ảnh"}
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-amber-500 font-bold">•</span>
                      <span>
                        {isEn
                          ? "Personal motion sickness remedies if boating"
                          : "Thuốc cá nhân phòng trường hợp say sóng/say xe"}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* REVIEWS & SUBMIT SECTION */}
              <div className="bg-white/90 p-8 sm:p-10 rounded-[2px] shadow-sm border border-slate-100">
                <span className="text-xs font-bold uppercase tracking-[0.25em] text-slate-900">
                  {isEn ? "Verified Feedback" : "Cảm Nhận Thực Tế"}
                </span>
                <h2 className="script-title mt-2 text-4xl sm:text-5xl text-[#1e293b]">
                  {ed.reviewsTitle}
                </h2>

                <div className="mt-8 space-y-6">
                  {reviews.length > 0 ? (
                    reviews.map((r) => (
                      <div key={r.id} className="border-b border-slate-100 pb-5 last:border-0">
                        <div className="flex items-center justify-between">
                          <strong className="text-sm font-semibold text-slate-800">{r.author}</strong>
                          <span className="text-xs font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-[2px]">
                            ★ {r.rating} / 5
                          </span>
                        </div>
                        <p className="mt-2 text-sm font-light leading-relaxed text-slate-600">
                          {r.body}
                        </p>
                      </div>
                    ))
                  ) : (
                    <div className="rounded-[2px] bg-slate-50 p-6 text-center text-sm font-light text-slate-500 italic border border-slate-200">
                      {isEn
                        ? "No reviews for this experience yet. Be the first explorer to share your impressions!"
                        : "Trải nghiệm này chưa có đánh giá nào. Hãy là du khách đầu tiên chia sẻ cảm xúc của bạn!"}
                    </div>
                  )}
                </div>

                <div className="mt-10 pt-8 border-t border-slate-100">
                  <h3 className="display-title text-xl font-bold text-[#1e293b] mb-4">
                    {ed.writeReviewTitle}
                  </h3>
                  <ReviewForm placeId={place.id} />
                </div>
              </div>
            </article>

            {/* RIGHT SIDEBAR: BOOKING & FAVORITE */}
            <aside className="space-y-6 sticky top-24">
              <ExperienceBookingCard place={place} user={user} />

              <div className="rounded-[2px] bg-white p-6 shadow-sm border border-slate-100 text-center">
                <h4 className="display-title text-base font-bold text-[#1e293b]">
                  {isEn ? "Save to Favorites" : "Lưu Vào Yêu Thích"}
                </h4>
                <p className="mt-1.5 text-xs font-light text-slate-600 mb-4">
                  {isEn
                    ? "Bookmark this experience to build your personalized Vietnam itinerary."
                    : "Lưu lại trải nghiệm này để dễ dàng theo dõi và lên lịch trình cho kỳ nghỉ."}
                </p>
                <div className="flex justify-center">
                  <FavoriteButton placeId={place.id} />
                </div>
              </div>
            </aside>
          </div>

          {/* RELATED EXPERIENCES */}
          {related.length > 0 && (
            <section className="mt-24 pt-16 border-t border-slate-200">
              <div className="text-center mb-12">
                <span className="text-xs font-bold uppercase tracking-[0.25em] text-slate-900">
                  {isEn ? "Discover More" : "Khám Phá Thêm"}
                </span>
                <h2 className="script-title mt-2 text-4xl sm:text-5xl text-[#1e293b]">
                  {ed.relatedTitle}
                </h2>
              </div>
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((relPlace) => (
                  <PlaceCard key={relPlace.id} place={relPlace} />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
    </>
  );
}
