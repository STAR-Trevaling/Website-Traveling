from decimal import Decimal
from django.contrib.gis.geos import Point
from django.core.management.base import BaseCommand
from django.utils import timezone

from accounts.models import User
from content.models import Article
from destinations.models import Destination
from partners.models import PartnerApplication
from places.models import Category, Place

# High-resolution, reliable Vietnam travel photography
VIETNAM_PHOTO_MAP = {
    "ha-long": "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=80",
    "hoi-an": "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=1200&q=80",
    "phu-quoc": "https://upload.wikimedia.org/wikipedia/commons/3/33/Kem_Beach_aerial_view_Phu_Quoc_Island_Vietnam.jpg",
    "sa-pa": "https://upload.wikimedia.org/wikipedia/commons/f/fd/Terraced_fields_Sa_Pa_Vietnam.JPG",
    "da-lat": "https://upload.wikimedia.org/wikipedia/commons/e/e2/Da_Lat_-_Viet_Nam.jpg",
    "ninh-binh": "https://upload.wikimedia.org/wikipedia/commons/5/5b/Vietnam%2C_Ninh_Binh%2C_Limestone_peaks.jpg",
    "hue": "https://upload.wikimedia.org/wikipedia/commons/0/0e/Ngo_Mon.jpg",
    "ha-giang": "https://upload.wikimedia.org/wikipedia/commons/0/0f/Mountain_road_at_M%C3%A3_P%C3%AD_L%C3%A8ng_Pass%2C_H%C3%A0_Giang_Province%2C_Vietnam.jpg",
    "cruise": "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=1200&q=80",
    "kayak": "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80",
    "camping": "https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=1200&q=80",
    "hiking": "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=1200&q=80",
    "diving": "https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?auto=format&fit=crop&w=1200&q=80",
    "ocean": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
}


class Command(BaseCommand):
    help = "Seed deterministic demo data for Star Travels Vietnam platform"

    def handle(self, *args, **options):
        # 1. Seed Demo Users
        admin, _ = User.objects.get_or_create(
            username="admin_demo",
            defaults={"email": "admin@startravels.vn", "is_staff": True, "is_superuser": True},
        )
        admin.is_staff = True
        admin.is_superuser = True
        admin.set_password("AdminDemo123!")
        admin.save()

        traveler, _ = User.objects.get_or_create(
            username="traveler_demo",
            defaults={"email": "traveler@startravels.vn"},
        )
        traveler.set_password("TravelerDemo123!")
        traveler.save()

        # 2. Seed Vietnam Destinations
        destination_rows = [
            (
                "ha-long",
                "Vịnh Hạ Long",
                "Quảng Ninh, Việt Nam",
                "1800000",
                VIETNAM_PHOTO_MAP["ha-long"],
                "Kỳ quan thiên nhiên thế giới UNESCO với hàng ngàn hòn đảo đá vôi kỳ vĩ và làn nước xanh ngọc bích.",
                "Vịnh Hạ Long là niềm tự hào của du lịch Việt Nam, nơi du khách đắm mình giữa khung cảnh non nước ngoạn mục, khám phá các hang động thạch nhũ hàng triệu năm tuổi và trải nghiệm nghỉ dưỡng trên du thuyền sang trọng.",
                107.0844,
                20.9101,
            ),
            (
                "hoi-an",
                "Phố cổ Hội An",
                "Quảng Nam, Việt Nam",
                "1200000",
                VIETNAM_PHOTO_MAP["hoi-an"],
                "Giao thoa giữa nét cổ kính rực rỡ đèn lồng của phố cổ di sản và bờ biển nhiệt đới hiền hòa.",
                "Khám phá quần thể phố cổ Hội An với những mái ngói rêu phong, con thuyền hoa đăng trên sông Hoài thơ mộng, cùng bãi biển An Bàng và văn hóa ẩm thực xứ Quảng nức tiếng.",
                108.3272,
                15.8801,
            ),
            (
                "phu-quoc",
                "Đảo Ngọc Phú Quốc",
                "Kiên Giang, Việt Nam",
                "2200000",
                VIETNAM_PHOTO_MAP["phu-quoc"],
                "Thiên đường biển nhiệt đới với bờ cát trắng mịn Bãi Khem, hoàng hôn rực rỡ và làn nước trong vắt.",
                "Trải nghiệm lặn biển ngắm san hô, ẩm thực hải sản và nghỉ dưỡng cao cấp bên bờ biển.",
                103.9840,
                10.2899,
            ),
            (
                "sa-pa",
                "Sa Pa & Fansipan",
                "Lào Cai, Việt Nam",
                "1500000",
                VIETNAM_PHOTO_MAP["sa-pa"],
                "Thành phố trong sương với những thửa ruộng bậc thang kỳ vĩ uốn lượn và đỉnh Fansipan nóc nhà Đông Dương.",
                "Chinh phục nóc nhà Đông Dương Fansipan 3.143m, ngắm nhìn biển mây bồng bềnh, ghé thăm các bản làng mộc mạc của đồng bào H'Mông, Dao Đỏ và tận hưởng khí hậu bốn mùa trong một ngày.",
                103.8438,
                22.3364,
            ),
            (
                "da-lat",
                "Đà Lạt — Ngàn Hoa",
                "Lâm Đồng, Việt Nam",
                "1400000",
                VIETNAM_PHOTO_MAP["da-lat"],
                "Xứ sở sương mù mộng mơ với đồi thông xanh ngát, hồ Tuyền Lâm phẳng lặng và khí hậu mát lạnh bốn mùa.",
                "Đà Lạt là điểm đến lãng mạn bậc nhất Việt Nam với những thung lũng hoa ngập tràn sắc hương, biệt thự kiểu Pháp cổ kính và vườn thông reo bạt ngàn.",
                108.4583,
                11.9404,
            ),
            (
                "ninh-binh",
                "Quần thể Tràng An",
                "Ninh Bình, Việt Nam",
                "1100000",
                VIETNAM_PHOTO_MAP["ninh-binh"],
                "Non nước Tràng An hữu tình, Tam Cốc Bích Động và quần thể danh thắng di sản thế giới hỗn hợp đầu tiên của Đông Nam Á.",
                "Chèo thuyền vãn cảnh qua các hang động kỳ thú, leo đỉnh Hang Múa ngắm toàn cảnh sông núi Tam Cốc trập trùng, chiêm bái Cố đô Hoa Lư ngàn năm lịch sử.",
                105.9745,
                20.2506,
            ),
            (
                "hue",
                "Cố đô Huế",
                "Thừa Thiên Huế, Việt Nam",
                "1300000",
                VIETNAM_PHOTO_MAP["hue"],
                "Kinh thành triều Nguyễn cổ kính, dòng sông Hương thơ mộng, chùa Thiên Mụ và lăng tẩm trầm mặc uy nghiêm.",
                "Khám phá nét đẹp cung đình xưa, thưởng thức nhã nhạc cung đình Huế và nét ẩm thực xứ thần kinh thanh nhã.",
                107.5909,
                16.4637,
            ),
            (
                "ha-giang",
                "Hà Giang & Mã Pí Lèng",
                "Hà Giang, Việt Nam",
                "1600000",
                VIETNAM_PHOTO_MAP["ha-giang"],
                "Thiên đường hùng vĩ nơi địa đầu Tổ quốc với đèo Mã Pí Lèng hiểm trở và dòng sông Nho Quế xanh như ngọc.",
                "Chinh phục những cung đường đèo uốn lượn bên sườn núi đá tai mèo và ngắm mùa hoa tam giác mạch rực rỡ.",
                104.9839,
                22.8233,
            ),
        ]

        destinations = {}
        for slug, name, country, price, image, summary, desc, lng, lat in destination_rows:
            d, _ = Destination.objects.update_or_create(
                slug=slug,
                defaults={
                    "name": name,
                    "country": country,
                    "summary": summary,
                    "description": desc,
                    "image_url": image,
                    "hero_image_url": image,
                    "starting_price": Decimal(price),
                    "center": Point(lng, lat, srid=4326),
                    "is_published": True,
                },
            )
            destinations[slug] = d

        # 3. Seed Experience Categories
        category_rows = [
            ("du-thuyen", "Du thuyền & Nghỉ dưỡng"),
            ("kayak-the-thao-nuoc", "Chèo Kayak & Thể thao nước"),
            ("cam-trai-da-ngoai", "Cắm trại & Dã ngoại"),
            ("trekking-leo-nui", "Trekking & Leo núi"),
            ("lan-bien-san-ho", "Lặn biển ngắm san hô"),
            ("van-hoa-di-san", "Văn hóa & Di sản bản địa"),
        ]

        categories = {}
        for slug, name in category_rows:
            cat, _ = Category.objects.get_or_create(slug=slug, defaults={"name": name})
            categories[slug] = cat

        # 4. Seed Vietnam Places & Experiences
        place_rows = [
            (
                "ha-long-cruise",
                "Du thuyền 5 sao Vịnh Hạ Long",
                "du-thuyen",
                "ha-long",
                VIETNAM_PHOTO_MAP["cruise"],
                "Nghỉ dưỡng thượng lưu và ngắm trọn vẹn cảnh sắc hoàng hôn kỳ vĩ trên vịnh di sản.",
                "Hành trình 2 ngày 1 đêm trên du thuyền sang trọng, thưởng thức tiệc hải sản tươi ngon, câu mực đêm và chiêm ngưỡng những đảo đá vôi ngàn năm tuổi.",
                "Cảng tàu khách quốc tế Hạ Long, Bãi Cháy, Quảng Ninh",
                107.0844,
                20.9101,
            ),
            (
                "kayak-lan-ha",
                "Chèo Kayak Hang Sáng Tối - Vịnh Lan Hạ",
                "kayak-the-thao-nuoc",
                "ha-long",
                VIETNAM_PHOTO_MAP["kayak"],
                "Lướt nhẹ mái chèo xuyên qua vòm hang nước ngầm kỳ ảo và làn nước ngọc bích nguyên sơ.",
                "Trải nghiệm tự tay chèo thuyền kayak tiến sâu vào các hồ nước phẳng lặng được bao bọc bởi vách núi đá dựng đứng kỳ vĩ.",
                "Khu bảo tồn Vịnh Lan Hạ, Cát Bà, Hải Phòng",
                107.0500,
                20.8500,
            ),
            (
                "camping-ta-xua",
                "Cắm trại đón bình minh biển mây Tà Xùa",
                "cam-trai-da-ngoai",
                "sa-pa",
                VIETNAM_PHOTO_MAP["camping"],
                "Thức giấc giữa biển mây trắng ngút ngàn và tận hưởng khí trời trong lành vùng cao.",
                "Trải nghiệm cắm trại qua đêm, quây quần bên đống lửa ấm, thưởng thức thịt nướng bản địa và đón những tia nắng đầu tiên xuyên qua thung lũng mây.",
                "Sống lưng khủng long, Tà Xùa, Bắc Yên, Sơn La",
                104.3500,
                21.2800,
            ),
            (
                "trekking-fansipan",
                "Trekking chinh phục nóc nhà Đông Dương Fansipan",
                "trekking-leo-nui",
                "sa-pa",
                VIETNAM_PHOTO_MAP["hiking"],
                "Hành trình thử thách sức bền vượt rừng trúc nguyên sinh chạm mốc đỉnh cao 3.143m.",
                "Cung đường leo núi mạo hiểm dành cho những trái tim đam mê khám phá thiên nhiên hoang sơ và thảm thực vật đặc hữu của dãy Hoàng Liên Sơn.",
                "Vườn quốc gia Hoàng Liên, Sa Pa, Lào Cai",
                103.7750,
                22.3033,
            ),
            (
                "scuba-diving-phu-quoc",
                "Lặn biển ngắm rạn san hô Hòn Thơm Phú Quốc",
                "lan-bien-san-ho",
                "phu-quoc",
                VIETNAM_PHOTO_MAP["diving"],
                "Khám phá lòng đại dương và hệ sinh thái san hô rực rỡ nhất Nam đảo.",
                "Trang bị đồ lặn chuyên nghiệp cùng huấn luyện viên bản địa tận tình hướng dẫn khám phá những cụm san hô bàn, san hô cành nhiều màu sắc.",
                "Quần đảo An Thới, Nam Phú Quốc, Kiên Giang",
                104.0150,
                10.0150,
            ),
            (
                "hoi-an-lantern-boat",
                "Dạo thuyền hoa đăng sông Hoài phố cổ Hội An",
                "van-hoa-di-san",
                "hoi-an",
                VIETNAM_PHOTO_MAP["hoi-an"],
                "Thả hoa đăng ước nguyện và ngắm nhìn phố cổ Hội An lung linh dưới ánh đèn lồng.",
                "Khi màn đêm buông xuống, ngồi trên con thuyền gỗ mộc mạc ngắm nhìn dãy nhà cổ soi bóng xuống mặt nước lấp lánh hoa đăng là trải nghiệm đậm chất thơ.",
                "Bến thuyền sông Hoài, Phố cổ Hội An, Quảng Nam",
                108.3272,
                15.8801,
            ),
            (
                "trang-an-boat-tour",
                "Thuyền nan khám phá quần thể hang động Tràng An",
                "van-hoa-di-san",
                "ninh-binh",
                VIETNAM_PHOTO_MAP["ninh-binh"],
                "Xuôi dòng nước trong vắt lướt qua những thung lũng đá vôi ngập nước kỳ ảo.",
                "Các cô lái đò bản địa sẽ đưa du khách đi xuyên qua chuỗi hang động tự nhiên huyền bí, ghé thăm Hành cung Vũ Lâm và phim trường Kong Skull Island nổi tiếng.",
                "Khu du lịch sinh thái Tràng An, Hoa Lư, Ninh Bình",
                105.9050,
                20.2550,
            ),
        ]

        for slug, name, cat, dest, image, short_desc, desc, address, lng, lat in place_rows:
            Place.objects.update_or_create(
                slug=slug,
                defaults={
                    "name": name,
                    "destination": destinations[dest],
                    "category": categories[cat],
                    "short_description": short_desc,
                    "description": desc,
                    "image_url": image,
                    "overlay_image_url": "",
                    "address": address,
                    "location": Point(lng, lat, srid=4326),
                    "is_published": True,
                },
            )

        # 5. Seed Travel Stories
        Article.objects.update_or_create(
            slug="hanh-trinh-xuyen-viet",
            defaults={
                "title": "Hành trình xuyên Việt: Chạm vào vẻ đẹp kỳ quan và chiều sâu di sản",
                "excerpt": "Hành trình khám phá văn hóa, ẩm thực và cảnh sắc tuyệt mỹ từ Bắc vào Nam trên dải đất hình chữ S.",
                "body": (
                    "Việt Nam không chỉ là một điểm đến du lịch, mà là một bản giao hưởng tuyệt sắc của thiên nhiên "
                    "và lịch sử ngàn năm văn hiến. Bắt đầu từ những dãy núi trùng điệp mù sương của vùng cao Tây Bắc, "
                    "xuôi về kỳ quan vịnh Hạ Long kỳ vĩ, rồi dừng chân bên những mái ngói rêu phong của phố cổ Hội An, "
                    "mỗi bước chân đều mở ra một trải nghiệm độc bản.\n\n"
                    "Hãy đi chậm lại, trò chuyện cùng người dân bản địa, thưởng thức một bát phở nóng hổi hay ly cà phê "
                    "sữa đá vỉa hè. Đó chính là cách bạn cảm nhận trọn vẹn nhịp đập tâm hồn của đất nước này."
                ),
                "cover_image": VIETNAM_PHOTO_MAP["ha-long"],
                "destination": destinations["ha-long"],
                "status": Article.Status.PUBLISHED,
                "published_at": timezone.now(),
            },
        )

        Article.objects.update_or_create(
            slug="cam-nang-am-thuc-hoi-an",
            defaults={
                "title": "Cẩm nang ẩm thực phố cổ: Những hương vị bản địa không thể bỏ lỡ",
                "excerpt": "Khám phá thế giới ẩm thực phong phú của Hội An: cao lầu, mì Quảng, cơm gà và bánh mì nức tiếng.",
                "body": (
                    "Ẩm thực Hội An là sự kết tinh tinh tế giữa các nền văn hóa Việt - Hoa - Nhật qua nhiều thế kỷ giao thương. "
                    "Mỗi món ăn nơi đây không chỉ mang hương vị đậm đà khó quên mà còn chứa đựng cả một câu chuyện lịch sử.\n\n"
                    "Đừng quên ghé chợ Hội An vào sáng sớm để thưởng thức tô cao lầu với sợi mì dai vàng óng làm từ nước giếng Bá Lễ, "
                    "hay ổ bánh mì giòn rụm với pate thơm nức lòng du khách gần xa."
                ),
                "cover_image": VIETNAM_PHOTO_MAP["hoi-an"],
                "destination": destinations["hoi-an"],
                "status": Article.Status.PUBLISHED,
                "published_at": timezone.now(),
            },
        )

        # 6. Seed Partner Application
        PartnerApplication.objects.get_or_create(
            applicant=traveler,
            business_name="Vietnam Heritage Adventures",
            defaults={
                "email": traveler.email,
                "message": "Đăng ký cung cấp các tour du lịch sinh thái và trải nghiệm văn hóa bản địa chất lượng cao tại Việt Nam.",
            },
        )

        self.stdout.write(self.style.SUCCESS("Dữ liệu demo Việt Nam đã được khởi tạo thành công!"))
