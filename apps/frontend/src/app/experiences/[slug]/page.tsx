import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin, Star, Clock, Users, ShieldCheck, Compass, CheckCircle2, ChevronRight } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { FavoriteButton } from "@/components/experience/favorite-button";
import { ReviewForm } from "@/components/experience/review-form";
import { ExperienceBookingCard } from "@/components/experience/experience-booking-card";
import { PlaceCard } from "@/components/shared/place-card";
import { publicApi, safe } from "@/lib/api";
import { VIETNAM_IMAGES } from "@/lib/assets";
import { VIETNAM_EXPERIENCES } from "@/lib/experiences-data";

interface ExperienceDetailProps {
  params: Promise<{ slug: string }>;
}

export default async function ExperienceDetail({ params }: ExperienceDetailProps) {
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

  return (
    <>
      <PageHero
        title={place.name}
        subtitle={`${place.category?.name || "Trải nghiệm độc bản"} · ${place.destination?.name || "Việt Nam"}`}
        image={place.image_url || VIETNAM_IMAGES.cruise}
      />

      <main className="template-page-bg min-h-screen text-[#282828] px-6 py-16 md:px-12 lg:px-16">
        <div className="mx-auto max-w-7xl">
          {/* Breadcrumb Bar */}
          <nav className="flex items-center gap-2 text-xs text-slate-500 mb-8 font-light">
            <Link href="/" className="hover:text-slate-900 transition">Trang chủ</Link>
            <ChevronRight className="size-3 text-slate-400" />
            <Link href="/experiences" className="hover:text-slate-900 transition">Trải nghiệm</Link>
            <ChevronRight className="size-3 text-slate-400" />
            <span className="text-slate-800 font-medium truncate max-w-xs">{place.name}</span>
          </nav>

          <div className="grid gap-12 lg:grid-cols-[1fr_380px] items-start">
            {/* LEFT COLUMN: MAIN CONTENT */}
            <article className="space-y-12">
              {/* SPECS BAR */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-white/90 p-6 rounded-[2px] shadow-sm border border-slate-100">
                <div className="flex items-center gap-3">
                  <Clock className="size-5 text-slate-700" />
                  <div>
                    <span className="text-[11px] text-slate-400 uppercase tracking-wider block">Thời lượng</span>
                    <strong className="text-xs sm:text-sm font-semibold text-slate-800">Nửa ngày / Cả ngày</strong>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="size-5 text-slate-700" />
                  <div>
                    <span className="text-[11px] text-slate-400 uppercase tracking-wider block">Quy mô</span>
                    <strong className="text-xs sm:text-sm font-semibold text-slate-800">Nhóm nhỏ (2 - 12 khách)</strong>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Compass className="size-5 text-slate-700" />
                  <div>
                    <span className="text-[11px] text-slate-400 uppercase tracking-wider block">Ngôn ngữ</span>
                    <strong className="text-xs sm:text-sm font-semibold text-slate-800">Tiếng Việt & Anh</strong>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <ShieldCheck className="size-5 text-slate-700" />
                  <div>
                    <span className="text-[11px] text-slate-400 uppercase tracking-wider block">Bảo hiểm</span>
                    <strong className="text-xs sm:text-sm font-semibold text-slate-800">Bảo hiểm 100tr VNĐ</strong>
                  </div>
                </div>
              </div>

              {/* OVERVIEW & HIGHLIGHTS */}
              <div className="bg-white/90 p-8 sm:p-10 rounded-[2px] shadow-sm border border-slate-100">
                <span className="text-xs font-bold uppercase tracking-[0.25em] text-slate-900">
                  Tổng Quan Hoạt Động
                </span>
                <h2 className="script-title mt-2 text-4xl sm:text-5xl text-[#1e293b]">
                  Hành Trình Chạm Vào Bản Sắc
                </h2>

                <div className="mt-4 flex flex-wrap items-center gap-6 text-sm text-slate-600 pb-6 border-b border-slate-100">
                  <span className="flex items-center gap-1.5 font-light">
                    <MapPin className="size-4 text-slate-600" />
                    {place.address}
                  </span>
                  <span className="flex items-center gap-1.5 font-medium text-amber-600">
                    <Star className="size-4 fill-amber-400 text-amber-400" />
                    {Number(place.average_rating || 5.0).toFixed(1)} ({place.review_count || 0} đánh giá thực tế)
                  </span>
                </div>

                <div className="mt-6 text-base sm:text-lg font-light leading-relaxed text-[#4b5563] space-y-4">
                  <p>{place.description}</p>
                </div>

                {/* Highlights List */}
                <div className="mt-8 pt-6 border-t border-slate-100">
                  <h3 className="display-title text-lg font-bold text-[#1e293b] uppercase tracking-wider mb-4">
                    Điểm Nhấn Nổi Bật Của Trải Nghiệm
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-3.5">
                    <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 font-light">
                      <CheckCircle2 className="size-4 text-slate-800 shrink-0 mt-0.5" />
                      <span>Hướng dẫn viên bản địa am hiểu sâu sắc địa hình và câu chuyện di sản.</span>
                    </div>
                    <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 font-light">
                      <CheckCircle2 className="size-4 text-slate-800 shrink-0 mt-0.5" />
                      <span>Trang thiết bị chuyên dụng tiêu chuẩn quốc tế an toàn tuyệt đối.</span>
                    </div>
                    <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 font-light">
                      <CheckCircle2 className="size-4 text-slate-800 shrink-0 mt-0.5" />
                      <span>Thưởng thức ẩm thực và đồ uống giải khát đặc sản miệt vườn/vùng cao.</span>
                    </div>
                    <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 font-light">
                      <CheckCircle2 className="size-4 text-slate-800 shrink-0 mt-0.5" />
                      <span>Hỗ trợ chụp hình kỷ niệm chất lượng cao trong suốt hành trình.</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* INCLUSIONS & ADVICE */}
              <div className="grid sm:grid-cols-2 gap-6 bg-white/90 p-8 sm:p-10 rounded-[2px] shadow-sm border border-slate-100">
                <div>
                  <h3 className="display-title text-base font-bold text-slate-900 uppercase tracking-wider mb-4">
                    Bao Gồm Trong Giá
                  </h3>
                  <ul className="space-y-2.5 text-xs sm:text-sm font-light text-slate-600">
                    <li className="flex items-center gap-2">
                      <span className="text-slate-800 font-bold">✓</span>
                      <span>Toàn bộ vé tham quan và phí môi trường</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-slate-800 font-bold">✓</span>
                      <span>Hướng dẫn viên chuyên nghiệp theo sát đoàn</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-slate-800 font-bold">✓</span>
                      <span>Nước suối và đồ uống nhẹ trên hành trình</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-slate-800 font-bold">✓</span>
                      <span>Bảo hiểm tai nạn du lịch tiêu chuẩn</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="display-title text-base font-bold text-slate-900 uppercase tracking-wider mb-4">
                    Lời Khuyên Du Khách Chuẩn Bị
                  </h3>
                  <ul className="space-y-2.5 text-xs sm:text-sm font-light text-slate-600">
                    <li className="flex items-center gap-2">
                      <span className="text-amber-500 font-bold">•</span>
                      <span>Trang phục thể thao thoải mái, giày bám chống trơn trượt</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-amber-500 font-bold">•</span>
                      <span>Kem chống nắng thân thiện môi trường, mũ rộng vành</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-amber-500 font-bold">•</span>
                      <span>Túi chống nước bảo vệ điện thoại và máy ảnh</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-amber-500 font-bold">•</span>
                      <span>Thuốc cá nhân phòng trường hợp say sóng/say xe</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* REVIEWS & SUBMIT SECTION */}
              <div className="bg-white/90 p-8 sm:p-10 rounded-[2px] shadow-sm border border-slate-100">
                <span className="text-xs font-bold uppercase tracking-[0.25em] text-slate-900">
                  Cảm Nhận Thực Tế
                </span>
                <h2 className="script-title mt-2 text-4xl sm:text-5xl text-[#1e293b]">
                  Đánh Giá Từ Du Khách
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
                      Trải nghiệm này chưa có đánh giá nào. Hãy là du khách đầu tiên chia sẻ cảm xúc của bạn!
                    </div>
                  )}
                </div>

                <div className="mt-10 pt-8 border-t border-slate-100">
                  <h3 className="display-title text-xl font-bold text-[#1e293b] mb-4">
                    Gửi Đánh Giá Của Bạn
                  </h3>
                  <ReviewForm placeId={place.id} />
                </div>
              </div>
            </article>

            {/* RIGHT SIDEBAR: BOOKING & FAVORITE */}
            <aside className="space-y-6 sticky top-24">
              <ExperienceBookingCard place={place} />

              <div className="rounded-[2px] bg-white p-6 shadow-sm border border-slate-100 text-center">
                <h4 className="display-title text-base font-bold text-[#1e293b]">
                  Lưu Vào Yêu Thích
                </h4>
                <p className="mt-1.5 text-xs font-light text-slate-600 mb-4">
                  Lưu lại trải nghiệm này để dễ dàng theo dõi và lên lịch trình cho kỳ nghỉ.
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
                  Khám Phá Thêm
                </span>
                <h2 className="script-title mt-2 text-4xl sm:text-5xl text-[#1e293b]">
                  Trải Nghiệm Tương Tự
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
