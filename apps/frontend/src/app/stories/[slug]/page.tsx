import Image from "next/image";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/layout/site-header";
import { publicApi } from "@/lib/api";
import { VIETNAM_IMAGES } from "@/lib/assets";

interface StoryDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default async function StoryDetailPage({ params }: StoryDetailPageProps) {
  const { slug } = await params;
  let article;

  try {
    article = await publicApi.article(slug);
  } catch {
    notFound();
  }

  return (
    <>
      <section className="relative min-h-[580px] w-full text-white overflow-hidden">
        <Image
          src={article.cover_image || VIETNAM_IMAGES.hero}
          alt={article.title}
          fill
          priority
          unoptimized
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/30" />
        <SiteHeader overlay />

        <div className="relative z-10 mx-auto flex min-h-[580px] max-w-7xl items-end px-6 pb-16 md:px-12">
          <div className="max-w-4xl">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#7de1df]">
              Câu chuyện du lịch
            </span>
            <h1 className="display-title template-shadow-text mt-3 text-4xl sm:text-5xl md:text-7xl leading-tight">
              {article.title}
            </h1>
            <p className="mt-5 text-base sm:text-lg md:text-xl font-light leading-relaxed text-white/90">
              {article.excerpt}
            </p>
          </div>
        </div>
      </section>

      <main className="template-page-bg min-h-screen px-6 py-20 md:px-12">
        <article className="mx-auto max-w-3xl rounded-lg bg-white p-8 md:p-14 shadow-sm">
          <div className="whitespace-pre-line text-lg font-light leading-9 text-slate-700">
            {article.body}
          </div>
        </article>
      </main>
    </>
  );
}
