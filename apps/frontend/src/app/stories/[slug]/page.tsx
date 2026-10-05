import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock, User, ArrowLeft, Bookmark, Share2, MapPin, ChevronRight } from "lucide-react";
import { SiteHeader } from "@/components/layout/site-header";
import { publicApi } from "@/lib/api";
import { VIETNAM_IMAGES } from "@/lib/assets";
import { getStoryBySlug, VIETNAM_STORIES } from "@/lib/stories-data";

interface StoryDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: StoryDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const story = getStoryBySlug(slug);

  if (!story) {
    return { title: "Không tìm thấy bài viết | Star Travels Vietnam" };
  }

  return {
    title: `${story.title} | Góc Nhìn Du Lịch Star Travels`,
    description: story.excerpt,
    openGraph: {
      title: story.title,
      description: story.excerpt,
      images: [{ url: story.cover_image || VIETNAM_IMAGES.hero }],
    },
  };
}

export default async function StoryDetailPage({ params }: StoryDetailPageProps) {
  const { slug } = await params;

  let story = getStoryBySlug(slug);

  if (!story) {
    try {
      const backendArticle = await publicApi.article(slug);
      story = {
        ...backendArticle,
        readTime: "5 phút đọc",
        category: "Góc Nhìn Khám Phá",
        authorName: "Ban Biên Tập Star Travels",
        authorRole: "Đội ngũ chuyên gia du lịch bản địa",
        tags: ["Du lịch Việt Nam", "Khám phá", "Văn hóa"],
      };
    } catch {
      notFound();
    }
  }

  if (!story) {
    notFound();
  }

  const relatedStories = VIETNAM_STORIES.filter((s) => s.slug !== slug).slice(0, 3);

  return (
    <>
      {/* 1. HERO HEADER WITH TEMPLATE VIBE */}
      <section className="relative min-h-[620px] w-full text-white overflow-hidden">
        <Image
          src={story.cover_image || VIETNAM_IMAGES.hero}
          alt={story.title}
          fill
          priority
          unoptimized
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/55 to-black/35" />
        <SiteHeader overlay />

        <div className="relative z-10 mx-auto flex min-h-[620px] max-w-7xl items-end px-6 pb-16 md:px-12">
          <div className="max-w-4xl">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-[2px] bg-[#0098a2] px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white shadow-sm">
                {story.category}
              </span>
              <span className="flex items-center gap-1 text-xs font-light text-white/80">
                <Clock className="size-3.5 text-[#7de1df]" />
                {story.readTime}
              </span>
            </div>

            <h1 className="display-title template-shadow-text mt-4 text-3xl sm:text-5xl md:text-6xl font-bold leading-tight text-white">
              {story.title}
            </h1>

            <p className="mt-5 text-base sm:text-lg md:text-xl font-light leading-relaxed text-white/90">
              {story.excerpt}
            </p>

            {/* Author bar */}
            <div className="mt-8 flex items-center gap-4 pt-6 border-t border-white/20">
              <div className="flex size-11 items-center justify-center rounded-full bg-[#0098a2] text-sm font-bold text-white shadow-sm">
                {story.authorName.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-semibold text-white">{story.authorName}</p>
                <p className="text-xs text-slate-300 font-light">{story.authorRole}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. ARTICLE CONTENT */}
      <main className="template-page-bg min-h-screen px-6 py-16 md:px-12">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_340px]">
          {/* Main Editorial Text */}
          <article className="rounded-[2px] bg-white p-8 md:p-14 shadow-sm border border-slate-100">
            <div className="mb-8">
              <Link
                href="/stories"
                className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#0098a2] hover:underline"
              >
                <ArrowLeft className="size-3.5" /> Quay lại danh sách câu chuyện
              </Link>
            </div>

            <div className="prose prose-slate max-w-none space-y-6 text-base md:text-lg font-light leading-9 text-slate-700">
              {story.body.split("\n\n").map((para, i) => {
                if (para.startsWith("### ")) {
                  return (
                    <h2
                      key={i}
                      className="display-title mt-10 mb-4 text-2xl md:text-3xl font-bold text-[#1e293b]"
                    >
                      {para.replace("### ", "")}
                    </h2>
                  );
                }
                if (para.startsWith("- ")) {
                  const items = para.split("\n- ").map((item) => item.replace("- ", ""));
                  return (
                    <ul key={i} className="my-6 space-y-2.5 list-disc list-inside">
                      {items.map((it, idx) => (
                        <li key={idx} className="text-slate-700">
                          {it}
                        </li>
                      ))}
                    </ul>
                  );
                }
                return (
                  <p key={i} className="text-slate-700">
                    {para}
                  </p>
                );
              })}
            </div>

            {/* Tags */}
            {story.tags && story.tags.length > 0 && (
              <div className="mt-12 pt-8 border-t border-slate-100 flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mr-2">
                  Chủ đề:
                </span>
                {story.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-[2px] bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600"
                  >
                    #{t}
                  </span>
                ))}
              </div>
            )}
          </article>

          {/* Sidebar */}
          <aside className="space-y-8">
            {/* Author Profile Card */}
            <div className="rounded-[2px] bg-white p-7 shadow-sm border border-slate-100 text-center">
              <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-[#0098a2] text-xl font-bold text-white shadow-sm mb-4">
                {story.authorName.charAt(0)}
              </div>
              <h3 className="display-title text-lg font-bold text-slate-900">
                {story.authorName}
              </h3>
              <p className="text-xs text-[#0098a2] font-medium mt-1">
                {story.authorRole}
              </p>
              <p className="mt-3 text-xs font-light text-slate-500 leading-relaxed">
                Đam mê xê dịch, ghi lại những thước phim và câu chuyện sâu sắc nhất về con người và văn hóa Việt Nam.
              </p>
            </div>

            {/* Destination Spotlight */}
            {story.destination && (
              <div className="rounded-[2px] bg-white p-7 shadow-sm border border-slate-100">
                <span className="text-[11px] font-semibold text-[#0098a2] uppercase tracking-wider block mb-2">
                  Điểm Đến Trong Bài
                </span>
                <h4 className="display-title text-xl font-bold text-slate-900">
                  {story.destination.name}
                </h4>
                <p className="mt-2 text-xs font-light text-slate-600 line-clamp-3">
                  {story.destination.summary}
                </p>
                <Link
                  href={`/destinations/${story.destination.slug}`}
                  className="mt-4 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-[#0098a2] hover:underline"
                >
                  Xem hướng dẫn điểm đến <ChevronRight className="size-3.5" />
                </Link>
              </div>
            )}
          </aside>
        </div>

        {/* RELATED STORIES */}
        <section className="mx-auto max-w-7xl mt-24">
          <div className="text-center mb-10">
            <h2 className="script-title text-4xl md:text-5xl text-[#1e293b]">
              Câu Chuyện Liên Quan
            </h2>
            <p className="mt-2 text-sm text-[#64748b] font-light">
              Tiếp tục hành trình khám phá những góc nhìn độc bản khác
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {relatedStories.map((rStory) => (
              <Link
                key={rStory.id}
                href={`/stories/${rStory.slug}`}
                className="group flex flex-col justify-between overflow-hidden rounded-[2px] bg-white shadow-sm border border-slate-100 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                <div>
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                    <Image
                      src={rStory.cover_image || VIETNAM_IMAGES.hero}
                      alt={rStory.title}
                      fill
                      unoptimized
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3 rounded-[2px] bg-black/60 backdrop-blur-md px-2.5 py-0.5 text-[11px] font-medium text-white">
                      {rStory.category}
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="display-title text-lg font-bold text-[#1e293b] group-hover:text-[#0098a2] transition line-clamp-2">
                      {rStory.title}
                    </h3>
                    <p className="mt-2 text-xs font-light text-slate-500 line-clamp-2">
                      {rStory.excerpt}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-slate-50 flex items-center justify-between text-xs">
                  <span className="font-semibold text-[#0098a2] flex items-center gap-1 group-hover:translate-x-1 transition">
                    Đọc tiếp <ChevronRight className="size-3.5" />
                  </span>
                  <span className="text-[11px] text-slate-400 font-light">
                    {rStory.readTime}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
