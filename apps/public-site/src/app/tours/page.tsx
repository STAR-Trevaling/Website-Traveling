import type { Metadata } from "next";
import { PageHero } from "@/components/layout/page-hero";
import { ToursCatalog } from "@/components/tours/tours-catalog";
import { VIETNAM_IMAGES } from "@/lib/assets";

export const metadata: Metadata = {
  title: "Tour du lịch trọn gói Việt Nam | Star Travels Vietnam",
  description: "Tuyển tập các tour du lịch trọn gói chất lượng cao tại Đà Lạt, Hạ Long, Sa Pa, Tràng An, Phú Quốc.",
};

export default function ToursPage() {
  return (
    <>
      <PageHero
        title="Tour Du Lịch Trọn Gói"
        titleEn="Curated Vietnam Tours"
        subtitle="Hành trình tuyển chọn đặc sắc với dịch vụ cao cấp, lịch trình minh bạch và giá trọn gói tốt nhất."
        subtitleEn="Handcrafted all-inclusive journeys featuring premium services, transparent itineraries, and best value."
        image={VIETNAM_IMAGES.hero}
      />

      <main className="template-page-bg min-h-screen px-4 sm:px-6 py-10 sm:py-16 md:px-12 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <ToursCatalog />
        </div>
      </main>
    </>
  );
}
