import Image from "next/image";
import { notFound } from "next/navigation";
import { MapPin, Star } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { FavoriteButton } from "@/components/experience/favorite-button";
import { ReviewForm } from "@/components/experience/review-form";
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

  return (
    <>
      <PageHero
        title={place.name}
        subtitle={`${place.category?.name || "Trải nghiệm"} · ${place.destination?.name || "Việt Nam"}`}
        image={place.image_url || VIETNAM_IMAGES.cruise}
      />

      <main className="template-page-bg px-6 py-16">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_360px]">
          <article>
            <div className="flex items-center gap-6 text-sm text-slate-600">
              <span className="flex items-center gap-1.5">
                <MapPin className="size-4 text-[#0098a2]" />
                {place.address}
              </span>
              <span className="flex items-center gap-1.5">
                <Star className="size-4 fill-amber-400 text-amber-400" />
                {Number(place.average_rating || 5.0).toFixed(1)} ({place.review_count || 0} đánh giá)
              </span>
            </div>

            <p className="mt-8 text-lg font-light leading-relaxed text-slate-700">
              {place.description}
            </p>

            <h2 className="script-title mt-16 text-4xl text-slate-900">
              Đánh Giá Của Du Khách
            </h2>

            <div className="mt-7 space-y-5">
              {reviews.map((r) => (
                <div key={r.id} className="border-b border-black/10 pb-5">
                  <div className="flex items-center justify-between">
                    <strong className="text-sm font-semibold text-slate-800">{r.author}</strong>
                    <span className="text-xs font-medium text-amber-600">
                      ★ {r.rating} / 5
                    </span>
                  </div>
                  <p className="mt-2 text-sm font-light leading-6 text-slate-600">
                    {r.body}
                  </p>
                </div>
              ))}

              {!reviews.length && (
                <p className="text-sm text-slate-500 italic">
                  Chưa có đánh giá nào cho trải nghiệm này. Hãy là người đầu tiên chia sẻ cảm nhận!
                </p>
              )}
            </div>
          </article>

          <aside className="space-y-8">
            <div className="rounded-xl bg-white/80 p-7 shadow-md">
              <h2 className="display-title text-2xl text-slate-900">
                Lưu Trải Nghiệm Này
              </h2>
              <p className="mt-3 text-sm font-light leading-6 text-slate-600">
                Đăng nhập để lưu vào danh sách yêu thích và lên kế hoạch cho chuyến đi.
              </p>
              <div className="mt-5">
                <FavoriteButton placeId={place.id} />
              </div>
            </div>

            <div className="rounded-xl bg-white/80 p-7 shadow-md">
              <h2 className="display-title text-2xl text-slate-900">
                Gửi Đánh Giá Của Bạn
              </h2>
              <div className="mt-5">
                <ReviewForm placeId={place.id} />
              </div>
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
