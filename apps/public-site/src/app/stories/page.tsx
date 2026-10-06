import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { cookies } from "next/headers";
import { Clock, User, ChevronRight, ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { publicApi, safe } from "@/lib/api";
import { VIETNAM_IMAGES } from "@/lib/assets";
import { VIETNAM_STORIES } from "@/lib/stories-data";
import { DICTIONARY } from "@/lib/i18n/dictionary";

export const metadata: Metadata = {
  title: "Góc Nhìn Du Lịch & Cẩm Nang Khám Phá | Star Travels Vietnam",
  description: "Cảm hứng và cẩm nang khám phá các miền di sản, văn hóa và ẩm thực Việt Nam.",
};

export default async function StoriesPage() {
  const cookieStore = await cookies();
  const isEn = cookieStore.get("star_travels_locale")?.value === "en";
  const dict = DICTIONARY[isEn ? "en" : "vi"];
  const t = dict.storiesPage;
  const nl = dict.newsletter;

  const backendArticles = await safe(publicApi.articles(), []);
  const allStories = backendArticles.length > 0 ? backendArticles : VIETNAM_STORIES;
  const featuredStory = VIETNAM_STORIES[0];
  const remainingStories = VIETNAM_STORIES.slice(1);

  const formatReadTime = (rt: string) =>
    isEn ? rt.replace(/phút đọc/gi, "min read") : rt;

  return (
    <>
      <PageHero
        title="Góc Nhìn Du Lịch"
        titleEn="Stories & Travel Insights"
        subtitle="Những câu chuyện truyền cảm hứng, cẩm nang trải nghiệm và chiều sâu văn hóa bản địa."
        subtitleEn="Inspiring narratives, insider guides, and authentic cultural journeys across Vietnam."
        image={VIETNAM_IMAGES.hero}
      />

      <main className="template-page-bg min-h-screen px-6 py-16 md:px-12 lg:px-16">
        <div className="mx-auto max-w-7xl">
          {/* 1. FEATURED HERO STORY */}
          <section className="mb-16">
            <Link
              href={`/stories/${featuredStory.slug}`}
              className="group grid overflow-hidden rounded-[2px] bg-white shadow-md transition-all duration-300 hover:shadow-xl lg:grid-cols-[1.1fr_0.9fr]"
            >
              <div className="relative aspect-[16/10] lg:aspect-auto min-h-[320px] w-full overflow-hidden bg-slate-100">
                <Image
                  src={featuredStory.cover_image || VIETNAM_IMAGES.hero}
                  alt={featuredStory.title}
                  fill
                  priority
                  unoptimized
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 rounded-[2px] bg-[#0098a2] px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white shadow-sm">
                  {featuredStory.category}
                </div>
              </div>

              <div className="flex flex-col justify-between p-8 sm:p-10 lg:p-12">
                <div>
                  <div className="flex items-center gap-3 text-xs text-slate-400 font-light">
                    <span className="flex items-center gap-1">
                      <User className="size-3 text-slate-500" />
                      {featuredStory.authorName}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="size-3 text-slate-500" />
                      {formatReadTime(featuredStory.readTime)}
                    </span>
                  </div>

                  <h2 className="display-title mt-4 text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight text-[#1e293b] group-hover:text-amber-700 transition-colors">
                    {featuredStory.title}
                  </h2>

                  <p className="mt-4 text-sm sm:text-base font-light leading-relaxed text-[#64748b] line-clamp-3">
                    {featuredStory.excerpt}
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5 group-hover:translate-x-1 transition">
                    {isEn ? "READ FULL STORY" : "ĐỌC TIẾP CÂU CHUYỆN"} <ArrowUpRight className="size-4" />
                  </span>
                  <span className="text-xs text-slate-400 font-light">
                    {featuredStory.destination?.name}
                  </span>
                </div>
              </div>
            </Link>
          </section>

          {/* 2. STORIES MAGAZINE GRID */}
          <div className="mb-10 text-center">
            <h2 className="script-title text-4xl md:text-5xl text-[#1e293b]">
              {isEn ? "Latest Articles" : "Bài Viết Mới Nhất"}
            </h2>
            <p className="mt-2 text-xs md:text-sm text-[#64748b] font-light">
              {isEn
                ? "A curated collection of insightful articles on travel experiences, cuisine, and local culture."
                : "Tuyển tập những bài viết chất lượng cao về trải nghiệm, ẩm thực và văn hóa"}
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {remainingStories.map((story) => (
              <Link
                key={story.id}
                href={`/stories/${story.slug}`}
                className="group flex flex-col justify-between overflow-hidden rounded-[2px] bg-white shadow-sm border border-slate-100 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                <div>
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                    <Image
                      src={story.cover_image || VIETNAM_IMAGES.hero}
                      alt={story.title}
                      fill
                      unoptimized
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3 rounded-[2px] bg-black/60 backdrop-blur-md px-2.5 py-0.5 text-[11px] font-medium text-white">
                      {story.category}
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-2 text-[11px] text-slate-400 font-light">
                      <span>{story.authorName}</span>
                      <span>•</span>
                      <span>{formatReadTime(story.readTime)}</span>
                    </div>

                    <h3 className="display-title mt-2 text-xl font-bold leading-snug text-[#1e293b] group-hover:text-amber-700 transition-colors line-clamp-2">
                      {story.title}
                    </h3>

                    <p className="mt-2.5 text-xs sm:text-sm font-light leading-relaxed text-[#64748b] line-clamp-3">
                      {story.excerpt}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-slate-50 flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-900 flex items-center gap-1 group-hover:translate-x-1 transition">
                    {isEn ? "Discover" : "Khám phá"} <ChevronRight className="size-3.5" />
                  </span>
                  <span className="text-[11px] text-slate-400 font-light">
                    {story.destination?.name}
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* 3. NEWSLETTER BANNER MATCHING TEMPLATE */}
          <div className="mt-20 rounded-[2px] bg-[#1e293b] p-8 md:p-14 text-center text-white shadow-xl relative overflow-hidden">
            <div className="relative z-10 max-w-2xl mx-auto">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-amber-400">
                {isEn ? "HERITAGE NEWSLETTER" : "ĐĂNG KÝ BẢN TIN DI SẢN"}
              </span>
              <h3 className="script-title text-4xl md:text-5xl mt-3 text-white">
                {nl.heading}
              </h3>
              <p className="mt-4 text-xs md:text-sm text-slate-300 font-light leading-relaxed">
                {nl.subheading}
              </p>

              <form className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder={nl.emailPlaceholder}
                  className="flex-1 rounded-[2px] bg-white/10 border border-white/20 px-4 py-3 text-xs md:text-sm text-white placeholder-slate-400 focus:outline-none focus:border-[#00c2cb]"
                />
                <button
                  type="button"
                  className="rounded-[2px] bg-[#0098a2] text-white px-6 py-3 text-xs md:text-sm font-bold uppercase tracking-wider shadow-sm transition-all duration-200 hover:bg-[#008f99] hover:shadow-[0px_8px_25px_rgba(0,152,162,0.35)] hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                >
                  {nl.submitBtn}
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
