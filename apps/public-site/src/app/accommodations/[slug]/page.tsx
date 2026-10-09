import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { AccommodationDetailView } from "@/components/accommodations/accommodation-detail-view";
import { publicApi, safe } from "@/lib/api";
import { VIETNAM_ACCOMMODATIONS, getAccommodationBySlug } from "@/data/seed/accommodations";

interface AccommodationPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return VIETNAM_ACCOMMODATIONS.map((a) => ({
    slug: a.slug,
  }));
}

export async function generateMetadata({
  params,
}: AccommodationPageProps): Promise<Metadata> {
  const { slug } = await params;
  const remote = await safe(publicApi.accommodation(slug), null);
  const accommodation = remote || getAccommodationBySlug(slug);

  if (!accommodation) {
    return {
      title: "Không tìm thấy khách sạn | STAR Travels",
    };
  }

  return {
    title: `${accommodation.name} | Đặt phòng qua STAR Travels`,
    description: accommodation.description || `Thông tin và liên kết đặt phòng ${accommodation.name}`,
    openGraph: {
      title: `${accommodation.name} — STAR Travels`,
      description: accommodation.description,
      images: [{ url: accommodation.image_url }],
    },
  };
}

export default async function AccommodationDetailPage({
  params,
}: AccommodationPageProps) {
  const { slug } = await params;
  const cookieStore = await cookies();
  const isEn = cookieStore.get("star_travels_locale")?.value === "en";

  const remote = await safe(publicApi.accommodation(slug), null);
  const accommodation = remote || getAccommodationBySlug(slug);

  if (!accommodation) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
      <SiteHeader />
      <main className="flex-1">
        <AccommodationDetailView accommodation={accommodation} />
      </main>
      <SiteFooter />
    </div>
  );
}
