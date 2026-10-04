import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/layout/page-hero";
import { publicApi, safe } from "@/lib/api";
import { VIETNAM_IMAGES } from "@/lib/assets";

export const metadata: Metadata = {
  title: "Câu chuyện du lịch Việt Nam",
  description: "Cảm hứng và cẩm nang khám phá các miền di sản, văn hóa và ẩm thực Việt Nam.",
};

export default async function StoriesPage() {
  const items = await safe(publicApi.articles(), []);

  return (
    <>
      <PageHero
        title="Góc Nhìn Du Lịch"
        subtitle="Những câu chuyện truyền cảm hứng, cẩm nang trải nghiệm và chiều sâu văn hóa bản địa."
        image={VIETNAM_IMAGES.hero}
      />

      <main className="template-page-bg min-h-screen px-6 py-20 md:px-12">
        <div className="mx-auto max-w-7xl space-y-10">
          {items.length > 0 ? (
            items.map((article) => (
              <Link
                href={`/stories/${article.slug}`}
                key={article.id}
                className="group grid overflow-hidden rounded-md bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg md:grid-cols-[380px_1fr]"
              >
                <div className="relative min-h-[260px] w-full overflow-hidden bg-slate-100">
                  <Image
                    src={article.cover_image || VIETNAM_IMAGES.hero}
                    alt={article.title}
                    fill
                    unoptimized
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="flex flex-col justify-between p-8 md:p-10">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#0098a2]">
                      Góc nhìn khám phá
                    </span>
                    <h2 className="display-title mt-2 text-2xl md:text-3xl text-slate-900 group-hover:text-[#0098a2] transition-colors">
                      {article.title}
                    </h2>
                    <p className="mt-4 text-base font-normal leading-relaxed text-slate-600">
                      {article.excerpt}
                    </p>
                  </div>

                  <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-[#0098a2]">
                    Đọc tiếp câu chuyện →
                  </span>
                </div>
              </Link>
            ))
          ) : (
            <div className="py-24 text-center">
              <p className="text-lg text-slate-500 font-light">
                Hiện tại chưa có bài viết nào được xuất bản.
              </p>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
