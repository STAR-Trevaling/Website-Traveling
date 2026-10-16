import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { RestaurantDetailView } from "@/components/restaurants/restaurant-detail-view";
import { publicApi, safe } from "@/lib/api";
import { VIETNAM_RESTAURANTS, getRestaurantBySlug } from "@/data/seed/restaurants";

interface RestaurantPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return VIETNAM_RESTAURANTS.map((r) => ({
    slug: r.slug,
  }));
}

export async function generateMetadata({
  params,
}: RestaurantPageProps): Promise<Metadata> {
  const { slug } = await params;
  const remote = await safe(publicApi.restaurant(slug), null);
  const restaurant = remote || getRestaurantBySlug(slug);

  if (!restaurant) {
    return {
      title: "Không tìm thấy nhà hàng | STAR Travels",
    };
  }

  return {
    title: `${restaurant.name} | Đặt bàn & Ẩm thực STAR Travels`,
    description: restaurant.description || `Thông tin và liên kết đặt bàn ${restaurant.name}`,
    openGraph: {
      title: `${restaurant.name} — STAR Travels`,
      description: restaurant.description,
      images: [{ url: restaurant.image_url }],
    },
  };
}

export default async function RestaurantDetailPage({
  params,
}: RestaurantPageProps) {
  const { slug } = await params;
  const cookieStore = await cookies();
  const isEn = cookieStore.get("star_travels_locale")?.value === "en";

  const remote = await safe(publicApi.restaurant(slug), null);
  const restaurant = remote || getRestaurantBySlug(slug);

  if (!restaurant) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
      <SiteHeader />
      <main className="flex-1">
        <RestaurantDetailView restaurant={restaurant} />
      </main>
      <SiteFooter />
    </div>
  );
}
