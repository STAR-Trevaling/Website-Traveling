from decimal import Decimal

from django.core.management.base import BaseCommand
from django.utils import timezone

from content.models import Article
from destinations.models import Destination
from tours.models import Tour


class Command(BaseCommand):
    help = "Seed tours and stories/articles into database bypassing GEOS Point dependencies"

    def handle(self, *args, **options):
        self.stdout.write("Bắt đầu nạp tours và articles...")

        # 1. Map destinations by slug using only id
        dests = {}
        for d in Destination.objects.all().only("id", "slug", "name"):
            dests[d.slug] = d

        # Mũi Né tour
        mui_ne_dest = dests.get("mui-ne")
        t_mn, created = Tour.objects.update_or_create(
            slug="tour-mui-ne-phan-thiet-2n1d",
            defaults={
                "title": "Tour Mũi Né — Đồi Cát Bay & Jeep Safari Bàu Trắng — Phan Thiết",
                "title_en": "Mui Ne Tour — Flying Sand Dunes & Bau Trang Jeep Safari",
                "destination": mui_ne_dest,
                "destination_name": "Mũi Né — Phan Thiết, Bình Thuận",
                "destination_name_en": "Mui Ne — Phan Thiet, Binh Thuan",
                "region": "south",
                "duration": "2 Ngày 1 Đêm",
                "duration_en": "2 Days 1 Night",
                "departure": "TP. Hồ Chí Minh",
                "departure_en": "Ho Chi Minh City",
                "group_size": "Tối đa 16 khách",
                "group_size_en": "Max 16 guests",
                "price": Decimal("1850000"),
                "original_price": Decimal("2250000"),
                "rating": Decimal("4.9"),
                "review_count": 165,
                "image_url": "/images/hero/phan-thiet.jpg",
                "overview": "Hành trình kỳ thú khám phá sa mạc cát nhiệt đới Mũi Né, xe Jeep vượt đồi cát Bàu Trắng đón bình minh và thưởng thức đại tiệc hải sản làng chài.",
                "overview_en": "Exciting desert discovery in Mui Ne with sunrise Bau Trang jeep safaris, fairy streams, and coastal fishing village seafood feasts.",
                "highlights": [
                    "Xe Jeep địa hình lướt trên đồi cát trắng Bàu Trắng đón bình minh",
                    "Lội Suối Tiên chân trần ngắm hẻm núi đất đỏ kỳ vĩ",
                    "Viếng Tháp Chàm Poshanư thế kỷ thứ 8",
                    "Thưởng thức Lẩu thả Phan Thiết 5 màu truyền thống",
                ],
                "itinerary": [
                    {
                        "day": 1,
                        "title": "TP.HCM — Phan Thiết — Tháp Poshanư — Đồi Cát Bay",
                        "morning": "Xe đón tại TP.HCM đi Phan Thiết, thăm Tháp Chàm Poshanư",
                        "afternoon": "Nhận phòng resort, tắm biển, trượt cát Đồi Cát Bay hoàng hôn",
                        "evening": "Bữa tối hải sản bờ kè Hàm Tiến, ngắm rặng dừa lộng gió",
                    },
                    {
                        "day": 2,
                        "title": "Bình Minh Bàu Trắng Jeep Safari — Suối Tiên — TP.HCM",
                        "morning": "Xe Jeep đón đi ngắm mặt trời mọc Đồi Cát Trắng Bàu Sen",
                        "afternoon": "Lội suối Tiên, thăm làng chài Mũi Né, mua nước mắm đặc sản",
                        "evening": "Khởi hành về lại TP.HCM an toàn",
                    },
                ],
                "included": [
                    "Xe ô tô du lịch cao tốc khứ hồi",
                    "Resort 4 sao ven biển 1 đêm",
                    "Tour xe Jeep địa hình Bàu Trắng & Suối Tiên",
                    "Các bữa ăn chính gồm hải sản và lẩu thả",
                ],
                "excluded": ["Xe ATV mô tô địa hình tự lái", "Chi phí cá nhân"],
                "is_featured": True,
            },
        )
        self.stdout.write(f"- {'Tạo mới' if created else 'Cập nhật'}: {t_mn.title}")

        # Mekong Delta Tour
        can_tho_dest = dests.get("can-tho")
        t_mk, created = Tour.objects.update_or_create(
            slug="tour-mekong-delta-floating-market",
            defaults={
                "title": "Mê Kông Sông Nước — Chợ Nổi Cái Răng & Miệt Vườn Cần Thơ",
                "title_en": "Mekong Riverways — Cai Rang Floating Market & Can Tho Orchards",
                "destination": can_tho_dest,
                "destination_name": "Cần Thơ & Bến Tre",
                "destination_name_en": "Can Tho & Ben Tre",
                "region": "south",
                "duration": "2 Ngày 1 Đêm",
                "duration_en": "2 Days 1 Night",
                "departure": "TP. Hồ Chí Minh",
                "departure_en": "Ho Chi Minh City",
                "group_size": "Tối đa 18 khách",
                "group_size_en": "Max 18 guests",
                "price": Decimal("1950000"),
                "original_price": Decimal("2400000"),
                "rating": Decimal("4.8"),
                "review_count": 142,
                "image_url": "/images/destinations/can-tho.jpg",
                "overview": "Hành trình sông nước miệt vườn miền Tây Nam Bộ, xuôi thuyền chèo rợp bóng dừa Bến Tre và ngắm bình minh chợ nổi Cái Răng.",
                "overview_en": "Authentic Mekong Delta journey with sampan rides through shaded coconut canals and vibrant dawn floating markets.",
                "highlights": [
                    "Xuôi thuyền nan ba lá len lỏi giữa rặng dừa nước Bến Tre",
                    "Trải nghiệm chợ nổi Cái Răng Cần Thơ nhộn nhịp lúc bình minh",
                    "Thưởng thức đờn ca tài tử và tự tay làm kẹo dừa",
                    "Đại tiệc ẩm thực miệt vườn: cá tai tượng chiên xù, lẩu mắm",
                ],
                "itinerary": [
                    {
                        "day": 1,
                        "title": "TP.HCM — Bến Tre Xứ Dừa — Cần Thơ",
                        "morning": "Khởi hành đi Bến Tre, đi thuyền du ngoạn sông Tiền",
                        "afternoon": "Nghe đờn ca tài tử, ăn trưa cá tai tượng, về Cần Thơ",
                        "evening": "Du thuyền Cần Thơ ăn tối, ngắm cầu Cần Thơ",
                    },
                    {
                        "day": 2,
                        "title": "Chợ Nổi Cái Răng — Miệt Vườn Trái Cây — Về TP.HCM",
                        "morning": "Đi tàu khám phá Chợ nổi Cái Răng, ăn bún riêu trên sông",
                        "afternoon": "Thăm lò hủ tiếu, miệt vườn hái trái cây, ăn trưa dân dã",
                        "evening": "Khởi hành về TP.HCM",
                    },
                ],
                "included": [
                    "Xe du lịch đời mới máy lạnh khứ hồi",
                    "Khách sạn 4 sao trung tâm Cần Thơ",
                    "Thuyền tham quan cù lao và chợ nổi Cái Răng",
                    "Ăn uống theo chương trình",
                ],
                "excluded": ["Chi phí cá nhân", "Tiền tip hướng dẫn viên"],
                "is_featured": True,
            },
        )
        self.stdout.write(f"- {'Tạo mới' if created else 'Cập nhật'}: {t_mk.title}")

        # Seed 3 Articles / Stories
        now = timezone.now()
        story_items = [
            (
                "cam-nang-du-lich-mui-ne-phan-thiet",
                "Cẩm Nang Du Lịch Mũi Né — Phan Thiết: Jeep Safari Bàu Trắng, Lẩu Thả & Top Điểm Check-in",
                "cam-nang",
                "/images/hero/phan-thiet.jpg",
                "Bí quyết khám phá trọn vẹn Mũi Né: trải nghiệm xe Jeep vượt đồi cát Bàu Trắng, lội Suối Tiên, check-in làng chài rực rỡ và thưởng thức đặc sản lẩu thả.",
                mui_ne_dest,
                "10 phút đọc",
                "Bé Star",
                "Ban Cố Vấn STAR Travels",
            ),
            (
                "kham-pha-36-pho-phuong-ha-noi",
                "Khám Phá 36 Phố Phường Hà Nội — Tinh Hoa Ẩm Thực & Di Sản Nghìn Năm Văn Hiến",
                "van-hoa",
                "/images/hero/ha-noi.jpg",
                "Hành trình tản bộ qua từng con ngõ cổ kính của thủ đô, thưởng thức phở Bát Đàn, cà phê trứng Giảng và lắng nghe hơi thở ngàn năm Thăng Long.",
                dests.get("ha-noi"),
                "8 phút đọc",
                "Bé Star",
                "Chuyên viên Văn Hóa STAR",
            ),
            (
                "kinh-nghiem-du-lich-da-lat-tu-tuc",
                "Kinh Nghiệm Du Lịch Đà Lạt Tự Túc: Săn Mây Cầu Đất, Cà Phê Rừng Thông & Ẩm Thực Phố Núi",
                "kinh-nghiem",
                "/images/hero/da-lat.jpg",
                "Cẩm nang chi tiết từ A-Z cho chuyến du ngoạn xứ sương mù: địa điểm săn mây 5h sáng, các cung đường trekking rừng thông và quán ăn bản địa ấm áp.",
                dests.get("da-lat"),
                "9 phút đọc",
                "Bé Star",
                "Travel Blogger STAR",
            ),
        ]

        for (
            slug,
            title,
            cat,
            img,
            excerpt,
            dest,
            read_time,
            author,
            author_role,
        ) in story_items:
            art_obj, created = Article.objects.update_or_create(
                slug=slug,
                defaults={
                    "title": title,
                    "category": cat,
                    "cover_image": img,
                    "excerpt": excerpt,
                    "body": excerpt,
                    "destination": dest,
                    "read_time": read_time,
                    "author_name": author,
                    "author_role": author_role,
                    "status": Article.Status.PUBLISHED,
                    "published_at": now,
                },
            )
            self.stdout.write(f"- {'Tạo mới' if created else 'Cập nhật'} article: {art_obj.title}")

        self.stdout.write(self.style.SUCCESS("Hoàn tất nạp tours và articles!"))
