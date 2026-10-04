import type { Metadata } from "next";
import { Mail, Phone, MapPin } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { VIETNAM_IMAGES } from "@/lib/assets";

export const metadata: Metadata = {
  title: "Liên hệ | Star Travels Vietnam",
  description: "Liên hệ với đội ngũ Star Travels Vietnam để được tư vấn và hỗ trợ dịch vụ.",
};

const CONTACT_CHANNELS = [
  {
    icon: Phone,
    title: "Hotline Hỗ Trợ",
    value: "+84 912 345 678",
    desc: "Hỗ trợ 24/7 từ thứ 2 đến Chủ nhật",
  },
  {
    icon: Mail,
    title: "Hộp Thư Điện Tử",
    value: "contact@startravels.vn",
    desc: "Phản hồi trong vòng 2 giờ làm việc",
  },
  {
    icon: MapPin,
    title: "Văn Phòng Chính",
    value: "Hà Nội & TP. Hồ Chí Minh",
    desc: "Việt Nam · Nền tảng du lịch trực tuyến",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="Liên Hệ Chúng Tôi"
        subtitle="Mọi câu hỏi về điểm đến, trải nghiệm bản địa hay hợp tác đối tác, đội ngũ luôn sẵn sàng hỗ trợ bạn."
        image={VIETNAM_IMAGES.ctaBanner}
      />

      <main className="template-page-bg min-h-screen px-6 py-20 md:px-12">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-8 md:grid-cols-3">
            {CONTACT_CHANNELS.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="rounded-xl bg-white p-8 text-center shadow-sm border border-slate-100 transition hover:shadow-md"
                >
                  <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-[#0098a2]/10 text-[#0098a2]">
                    <Icon className="size-6" />
                  </div>
                  <h2 className="display-title mt-6 text-xl text-slate-900">
                    {item.title}
                  </h2>
                  <p className="mt-2 text-base font-semibold text-[#0098a2]">
                    {item.value}
                  </p>
                  <p className="mt-1 text-xs text-slate-400">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </>
  );
}
