from decimal import Decimal

from django.contrib.gis.geos import Point
from django.core.management.base import BaseCommand
from django.utils import timezone

from accounts.models import User
from assistant.models import AssistantKnowledgeChunk
from bookings.models import Booking
from content.models import Article
from destinations.models import Destination
from partners.models import PartnerApplication
from places.models import Category, Place
from tours.models import Tour

VIETNAM_PHOTO_MAP = {
    "ha-long": "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=80",
    "hoi-an": "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=1200&q=80",
    "phu-quoc": "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1200&q=80",
    "sa-pa": "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=80",
    "da-lat": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
    "ninh-binh": "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=80",
    "hue": "https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=1200&q=80",
    "ha-giang": "https://images.unsplash.com/photo-1570366583862-f91883984fde?auto=format&fit=crop&w=1200&q=80",
    "da-nang": "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=1200&q=80",
    "nha-trang": "https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?auto=format&fit=crop&w=1200&q=80",
    "mui-ne": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
    "can-tho": "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=1200&q=80",
    "cruise": "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=1200&q=80",
    "kayak": "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80",
    "camping": "https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=1200&q=80",
    "hiking": "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=1200&q=80",
    "diving": "https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?auto=format&fit=crop&w=1200&q=80",
    "canal-cruise": "/assets/adventures/canal-cruise.jpg",
    "sailing": "/assets/adventures/sailing.jpg",
}


class Command(BaseCommand):
    help = "Seed comprehensive demo data for Star Travels Vietnam platform"

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

        # 2. Seed 12 Vietnam Destinations
        destination_rows = [
            (
                "ha-long",
                "Vịnh Hạ Long",
                "Ha Long Bay",
                "Quảng Ninh, Việt Nam",
                "Quang Ninh, Vietnam",
                "1800000",
                VIETNAM_PHOTO_MAP["ha-long"],
                "Kỳ quan thiên nhiên thế giới UNESCO với hàng ngàn đảo đá vôi kỳ vĩ và làn nước xanh ngọc bích.",
                "UNESCO World Natural Heritage featuring emerald waters and thousands of towering limestone karsts.",
                "Vịnh Hạ Long là niềm tự hào của du lịch Việt Nam, nơi du khách đắm mình giữa khung cảnh non nước ngoạn mục.",
                "Ha Long Bay is the pride of Vietnam's tourism, offering breathtaking emerald waters and limestone islets.",
                107.0844,
                20.9101,
            ),
            (
                "hoi-an",
                "Phố cổ Hội An",
                "Hoi An Ancient Town",
                "Quảng Nam, Việt Nam",
                "Quang Nam, Vietnam",
                "1200000",
                VIETNAM_PHOTO_MAP["hoi-an"],
                "Phố cổ di sản rực rỡ sắc màu đèn lồng, những mái ngói rêu phong và con thuyền hoa đăng trên sông Hoài thơ mộng.",
                "Historic lantern-lit heritage town with timeless mossy rooftops and boat lanterns on the poetic Hoai River.",
                "Khám phá nét văn hóa giao thương thế kỷ 17 với kiến trúc cổ kính và ẩm thực phong phú.",
                "Discover 17th-century trading culture, timber architecture, and celebrated heritage gastronomy.",
                108.3272,
                15.8801,
            ),
            (
                "phu-quoc",
                "Đảo Ngọc Phú Quốc",
                "Phu Quoc Pearl Island",
                "Kiên Giang, Việt Nam",
                "Kien Giang, Vietnam",
                "2200000",
                VIETNAM_PHOTO_MAP["phu-quoc"],
                "Thiên đường biển nhiệt đới với bờ cát trắng mịn Bãi Khem, hoàng hôn rực rỡ và làn nước trong vắt.",
                "Tropical beach sanctuary with powdery white sands, radiant sunsets, and crystal-clear azure waters.",
                "Trải nghiệm lặn biển ngắm san hô, ẩm thực hải sản và nghỉ dưỡng cao cấp bên bờ biển.",
                "Experience coral reef diving, freshly caught coastal seafood, and luxury seaside sanctuaries.",
                103.9840,
                10.2899,
            ),
            (
                "sa-pa",
                "Sa Pa & Fansipan",
                "Sa Pa & Fansipan",
                "Lào Cai, Việt Nam",
                "Lao Cai, Vietnam",
                "1500000",
                VIETNAM_PHOTO_MAP["sa-pa"],
                "Thành phố trong sương với những thửa ruộng bậc thang kỳ vĩ uốn lượn và đỉnh Fansipan nóc nhà Đông Dương.",
                "Highland misty haven with awe-inspiring terraced paddies and the mighty Fansipan peak.",
                "Chinh phục nóc nhà Đông Dương Fansipan 3.143m và ghé thăm các bản làng mộc mạc của đồng bào H'Mông.",
                "Conquer Indochina's 3,143m summit and explore authentic indigenous highland villages.",
                103.8438,
                22.3364,
            ),
            (
                "da-lat",
                "Đà Lạt — Ngàn Hoa",
                "Da Lat — City of Flowers",
                "Lâm Đồng, Việt Nam",
                "Lam Dong, Vietnam",
                "1400000",
                VIETNAM_PHOTO_MAP["da-lat"],
                "Xứ sở sương mù mộng mơ với đồi thông xanh ngát, hồ Tuyền Lâm phẳng lặng và khí hậu mát lạnh bốn mùa.",
                "Romantic mountain plateau embraced by pine hills, misty valleys, and year-round springtime climate.",
                "Đà Lạt là điểm đến lãng mạn bậc nhất Việt Nam với những thung lũng hoa ngập tràn sắc hương.",
                "Vietnam's most poetic plateau with blooming floral valleys and historic French villas.",
                108.4583,
                11.9404,
            ),
            (
                "ninh-binh",
                "Quần thể Tràng An",
                "Trang An Landscape Complex",
                "Ninh Bình, Việt Nam",
                "Ninh Binh, Vietnam",
                "1100000",
                VIETNAM_PHOTO_MAP["ninh-binh"],
                "Non nước Tràng An hữu tình, Tam Cốc Bích Động và quần thể danh thắng di sản thế giới hỗn hợp đầu tiên.",
                "UNESCO dual World Heritage with limestone karst towers rising above serene emerald waterways.",
                "Chèo thuyền vãn cảnh qua các hang động kỳ thú và chiêm bái Cố đô Hoa Lư ngàn năm lịch sử.",
                "Row traditional sampans through submerged caverns and explore the ancient royal capital.",
                105.9745,
                20.2506,
            ),
            (
                "hue",
                "Cố đô Huế",
                "Hue Imperial Citadel",
                "Thừa Thiên Huế, Việt Nam",
                "Thua Thien Hue, Vietnam",
                "1300000",
                VIETNAM_PHOTO_MAP["hue"],
                "Kinh thành triều Nguyễn cổ kính, dòng sông Hương thơ mộng, chùa Thiên Mụ và lăng tẩm trầm mặc uy nghiêm.",
                "Ancient royal capital of the Nguyen Dynasty by the poetic Perfume River with storied royal tombs.",
                "Khám phá nét đẹp cung đình xưa, thưởng thức nhã nhạc cung đình và ẩm thực xứ thần kinh thanh nhã.",
                "Discover imperial palaces, royal court music, and quintessential central Vietnamese cuisine.",
                107.5909,
                16.4637,
            ),
            (
                "ha-giang",
                "Hà Giang & Mã Pí Lèng",
                "Ha Giang & Ma Pi Leng",
                "Hà Giang, Việt Nam",
                "Ha Giang, Vietnam",
                "1600000",
                VIETNAM_PHOTO_MAP["ha-giang"],
                "Thiên đường hùng vĩ nơi địa đầu Tổ quốc với đèo Mã Pí Lèng hiểm trở và dòng sông Nho Quế xanh như ngọc.",
                "Frontier alpine frontier renowned for the dramatic Ma Pi Leng Pass and turquoise Nho Que River.",
                "Chinh phục những cung đường đèo uốn lượn bên sườn núi đá tai mèo và ngắm mùa hoa tam giác mạch rực rỡ.",
                "Navigate dramatic mountain zigzags and witness seasonal buckwheat blossom meadows.",
                104.9839,
                22.8233,
            ),
            (
                "da-nang",
                "Đà Nẵng — Thành Phố Đáng Sống",
                "Da Nang — Coastal Metropolis",
                "Đà Nẵng, Việt Nam",
                "Da Nang, Vietnam",
                "1500000",
                VIETNAM_PHOTO_MAP["da-nang"],
                "Thành phố biển hiện đại bên bờ biển Mỹ Khê tuyệt đẹp, Cầu Vàng Bà Nà Hills và bán đảo Sơn Trà hoang sơ.",
                "Dynamic seaside metropolis with world-class beaches, the Golden Bridge, and Son Tra Peninsula.",
                "Trải nghiệm nhịp sống đô thị văn minh, bãi biển quyến rũ và ẩm thực miền Trung độc đáo.",
                "Enjoy pristine coastal shores, futuristic bridges, and diverse central culinary traditions.",
                108.2022,
                16.0544,
            ),
            (
                "nha-trang",
                "Vịnh Biển Nha Trang",
                "Nha Trang Bay Sanctuary",
                "Khánh Hòa, Việt Nam",
                "Khanh Hoa, Vietnam",
                "1750000",
                VIETNAM_PHOTO_MAP["nha-trang"],
                "Một trong những vịnh biển đẹp nhất thế giới với bãi cát vàng trải dài, các hòn đảo san hô và khu nghỉ dưỡng 5 sao.",
                "One of the world's most scenic ocean bays featuring golden beaches and vibrant coral reserves.",
                "Lặn ngắm san hô Hòn Mun, tắm bùn khoáng thiên nhiên và thưởng thức hải sản tươi sống.",
                "Snorkel at marine reserves, indulge in therapeutic mud baths, and taste oceanic delicacies.",
                109.1967,
                12.2388,
            ),
            (
                "mui-ne",
                "Mũi Né — Phan Thiết",
                "Mui Ne — Desert & Coast",
                "Bình Thuận, Việt Nam",
                "Binh Thuan, Vietnam",
                "1250000",
                VIETNAM_PHOTO_MAP["mui-ne"],
                "Thủ phủ nghỉ dưỡng với những đồi cát bay đỏ rực, Suối Tiên kỳ ảo và bờ biển lộng gió lý tưởng cho lướt ván diều.",
                "Coastal resort playground famous for majestic red sand dunes and premier kitesurfing winds.",
                "Trải nghiệm xe địa hình trên đồi cát trắng và thưởng thức nước mắm truyền thống Phan Thiết.",
                "Ride ATVs across desert dunes and uncover traditional coastal fishing cultures.",
                108.2872,
                10.9333,
            ),
            (
                "can-tho",
                "Cần Thơ — Thủ Phủ Miền Tây",
                "Can Tho — Mekong River Heart",
                "Cần Thơ, Việt Nam",
                "Can Tho, Vietnam",
                "1100000",
                VIETNAM_PHOTO_MAP["can-tho"],
                "Trung tâm đồng bằng sông Cửu Long với chợ nổi Cái Răng tấp nập, vườn cây ăn trái trĩu quả và người dân đôn hậu.",
                "Cultural heartbeat of the Mekong Delta famous for bustling floating markets and lush orchards.",
                "Đón bình minh trên sông nước miền Tây và thưởng thức hủ tiếu nóng hổi ngay trên thuyền.",
                "Greet sunrise over vibrant waterways and enjoy freshly prepared riverboat breakfast noodles.",
                105.7469,
                10.0452,
            ),
        ]

        destinations = {}
        for (
            slug,
            name,
            name_en,
            country,
            country_en,
            price,
            image,
            summary,
            summary_en,
            desc,
            desc_en,
            lng,
            lat,
        ) in destination_rows:
            d, _ = Destination.objects.update_or_create(
                slug=slug,
                defaults={
                    "name": name,
                    "name_en": name_en,
                    "country": country,
                    "country_en": country_en,
                    "summary": summary,
                    "summary_en": summary_en,
                    "description": desc,
                    "description_en": desc_en,
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
            ("du-thuyen", "Du thuyền & Thuyền nan", "Cruises & Sampans"),
            ("kayak-the-thao-nuoc", "Chèo Kayak & Thể thao nước", "Kayaking & Watersports"),
            ("cam-trai-da-ngoai", "Cắm trại & Dã ngoại", "Camping & Wilderness"),
            ("trekking-leo-nui", "Trekking & Leo núi", "Trekking & Mountaineering"),
            ("lan-bien-san-ho", "Lặn biển ngắm san hô", "Scuba Diving & Coral"),
            ("van-hoa-di-san", "Văn hóa & Di sản bản địa", "Culture & Heritage"),
        ]

        categories = {}
        for slug, name, name_en in category_rows:
            cat, _ = Category.objects.update_or_create(
                slug=slug,
                defaults={"name": name, "name_en": name_en},
            )
            categories[slug] = cat

        # 4. Seed 10 Vietnam Places & Experiences (including home adventures)
        place_rows = [
            (
                "canal-cruise",
                "Canal Cruise — Du Ngoạn Kênh Rạch Miền Tây & Hạ Long",
                "Canal Cruise — Riverway Journey",
                "du-thuyen",
                "ha-long",
                VIETNAM_PHOTO_MAP["canal-cruise"],
                "Lướt nhẹ trên con thuyền gỗ khám phá những dòng kênh xanh ngát rợp bóng dừa nước.",
                "Glide on wooden sampans along emerald waterways shaded by water coconut palms.",
                "Trải nghiệm du ngoạn kênh rạch truyền thống đưa du khách tách biệt khỏi phố thị ồn ào.",
                "Traditional riverway excursion taking travelers away from bustling city sounds.",
                "Bến thuyền du lịch sông Tiền, Bến Tre & Cảng tàu khách quốc tế Hạ Long",
                "Tien River Tourist Wharf, Ben Tre & Ha Long International Cruise Port",
                10.24,
                106.375,
                Decimal("4.9"),
                168,
            ),
            (
                "sailing",
                "Sailing — Du Thuyền Buồm Lướt Sóng Vịnh Biển",
                "Sailing — Catamaran Ocean Voyage",
                "kayak-the-thao-nuoc",
                "ha-long",
                VIETNAM_PHOTO_MAP["sailing"],
                "Cảm nhận sức gió biển Đông và tự tay căng buồm lướt trên làn nước ngọc bích phẳng lặng.",
                "Catch sea breezes and navigate catamarans across tranquil emerald waters.",
                "Một trải nghiệm thể thao đẳng cấp dành cho những ai khao khát tự do giữa biển khơi.",
                "Premium watersports journey for travelers seeking maritime freedom and fresh sea air.",
                "Câu lạc bộ Thuyền buồm Vịnh Lan Hạ, Đảo Cát Bà, Hải Phòng",
                "Lan Ha Bay Sailing Club, Cat Ba Island, Hai Phong",
                20.85,
                107.05,
                Decimal("4.8"),
                142,
            ),
            (
                "trekking-leo-nui",
                "Trekking — Chinh Phục Rừng Nguyên Sinh & Thác Nước",
                "Trekking — Rainforest Trails & Waterfalls",
                "trekking-leo-nui",
                "sa-pa",
                VIETNAM_PHOTO_MAP["hiking"],
                "Hòa mình vào thiên nhiên hoang dã, băng qua những thung lũng xanh ngát và cánh rừng già.",
                "Immerse in untamed highlands crossing verdant valleys and ancient canopy forests.",
                "Thử thách thể lực và tái tạo năng lượng với những cung đường trekking tuyệt mỹ vùng cao.",
                "Test endurance and recharge energy along scenic mountainous walking paths.",
                "Vườn quốc gia Hoàng Liên Sơn, Sa Pa, Lào Cai",
                "Hoang Lien Son National Park, Sa Pa, Lao Cai",
                22.3364,
                103.8438,
                Decimal("4.9"),
                210,
            ),
            (
                "ha-long-cruise",
                "Du thuyền 5 sao Vịnh Hạ Long",
                "Ha Long 5-Star Luxury Cruise",
                "du-thuyen",
                "ha-long",
                VIETNAM_PHOTO_MAP["cruise"],
                "Nghỉ dưỡng thượng lưu và ngắm trọn vẹn cảnh sắc hoàng hôn kỳ vĩ trên vịnh di sản.",
                "Luxury stay gazing upon sublime sunsets across UNESCO heritage waters.",
                "Hành trình 2 ngày 1 đêm trên du thuyền sang trọng với tiệc hải sản tươi ngon và câu mực đêm.",
                "Two-day journey on elite cruises with seafood dining and night squid fishing.",
                "Cảng tàu khách quốc tế Hạ Long, Bãi Cháy, Quảng Ninh",
                "Ha Long International Cruise Port, Bai Chay, Quang Ninh",
                20.9101,
                107.0844,
                Decimal("5.0"),
                254,
            ),
            (
                "kayak-lan-ha",
                "Chèo Kayak Hang Sáng Tối - Vịnh Lan Hạ",
                "Kayaking Bright & Dark Cave - Lan Ha Bay",
                "kayak-the-thao-nuoc",
                "ha-long",
                VIETNAM_PHOTO_MAP["kayak"],
                "Lướt nhẹ mái chèo xuyên qua vòm hang nước ngầm kỳ ảo và làn nước ngọc bích nguyên sơ.",
                "Paddle through limestone tunnel grottos into pristine tranquil karst lagoons.",
                "Trải nghiệm tự tay chèo thuyền kayak tiến sâu vào các hồ nước phẳng lặng được bao bọc bởi vách đá.",
                "Hands-on kayaking deep into enclosed turquoise waters encircled by limestone karsts.",
                "Khu bảo tồn Vịnh Lan Hạ, Cát Bà, Hải Phòng",
                "Lan Ha Bay Marine Reserve, Cat Ba, Hai Phong",
                20.8500,
                107.0500,
                Decimal("4.8"),
                195,
            ),
            (
                "camping-ta-xua",
                "Cắm trại đón bình minh biển mây Tà Xùa",
                "Ta Xua Cloud Hunting Camping",
                "cam-trai-da-ngoai",
                "sa-pa",
                VIETNAM_PHOTO_MAP["camping"],
                "Thức giấc giữa biển mây trắng ngút ngàn và tận hưởng khí trời trong lành vùng cao.",
                "Awaken surrounded by vast cloud oceans and breathe pure mountain air.",
                "Trải nghiệm cắm trại qua đêm bên đống lửa ấm và đón những tia nắng đầu tiên của ngày mới.",
                "Overnight wilderness camping around campfires welcoming the dawn.",
                "Sống lưng khủng long, Tà Xùa, Bắc Yên, Sơn La",
                "Dinosaur Backbone Ridge, Ta Xua, Bac Yen, Son La",
                21.2800,
                104.3500,
                Decimal("4.9"),
                178,
            ),
            (
                "trekking-fansipan",
                "Trekking chinh phục nóc nhà Đông Dương Fansipan",
                "Conquering Fansipan Peak 3,143m Trek",
                "trekking-leo-nui",
                "sa-pa",
                VIETNAM_PHOTO_MAP["hiking"],
                "Hành trình thử thách sức bền vượt rừng trúc nguyên sinh chạm mốc đỉnh cao 3.143m.",
                "Endurance alpine journey ascending bamboo forests to touch 3,143m altitude.",
                "Cung đường leo núi mạo hiểm dành cho những trái tim đam mê khám phá thiên nhiên hoang sơ.",
                "Demanding alpine trek designed for adventurous spirits exploring pristine flora.",
                "Vườn quốc gia Hoàng Liên, Sa Pa, Lào Cai",
                "Hoang Lien National Park, Sa Pa, Lao Cai",
                22.3033,
                103.7750,
                Decimal("4.9"),
                224,
            ),
            (
                "scuba-diving-phu-quoc",
                "Lặn biển ngắm rạn san hô Hòn Thơm Phú Quốc",
                "Hon Thom Coral Reef Scuba Diving",
                "lan-bien-san-ho",
                "phu-quoc",
                VIETNAM_PHOTO_MAP["diving"],
                "Khám phá lòng đại dương và hệ sinh thái san hô rực rỡ nhất Nam đảo.",
                "Discover underwater marine life and vibrant coral reefs in South Phu Quoc.",
                "Trang bị đồ lặn chuyên nghiệp cùng huấn luyện viên bản địa tận tình hướng dẫn.",
                "Professional scuba gear and certified instructors guiding your oceanic exploration.",
                "Quần đảo An Thới, Nam Phú Quốc, Kiên Giang",
                "An Thoi Archipelago, South Phu Quoc, Kien Giang",
                10.0150,
                104.0150,
                Decimal("4.9"),
                162,
            ),
            (
                "hoi-an-lantern-boat",
                "Dạo thuyền hoa đăng sông Hoài phố cổ Hội An",
                "Hoai River Lantern Boat Cruise Hoi An",
                "van-hoa-di-san",
                "hoi-an",
                VIETNAM_PHOTO_MAP["hoi-an"],
                "Thả hoa đăng ước nguyện và ngắm nhìn phố cổ Hội An lung linh dưới ánh đèn lồng.",
                "Release glowing paper lanterns wishing good fortune over poetic canals.",
                "Khi màn đêm buông xuống, ngồi trên con thuyền gỗ mộc mạc ngắm nhìn dãy nhà cổ soi bóng.",
                "At twilight, sit upon wooden boats watching ancient heritage roofs mirror on water.",
                "Bến thuyền sông Hoài, Phố cổ Hội An, Quảng Nam",
                "Hoai River Boat Dock, Hoi An Ancient Town, Quang Nam",
                15.8801,
                108.3272,
                Decimal("4.9"),
                320,
            ),
            (
                "trang-an-boat-tour",
                "Thuyền nan khám phá quần thể hang động Tràng An",
                "Trang An Traditional Sampan Cave Exploration",
                "van-hoa-di-san",
                "ninh-binh",
                VIETNAM_PHOTO_MAP["ninh-binh"],
                "Xuôi dòng nước trong vắt lướt qua những thung lũng đá vôi ngập nước kỳ ảo.",
                "Glide on crystal waters through mystical karst caverns in UNESCO heritage valleys.",
                "Các cô lái đò bản địa sẽ đưa du khách đi xuyên qua chuỗi hang động tự nhiên huyền bí.",
                "Local boatwomen row through labyrinthine natural grottos and historic royal pavilions.",
                "Khu du lịch sinh thái Tràng An, Hoa Lư, Ninh Bình",
                "Trang An Ecotourism Complex, Hoa Lu, Ninh Binh",
                20.2550,
                105.9050,
                Decimal("4.9"),
                285,
            ),
        ]

        for (
            slug,
            name,
            name_en,
            cat,
            dest,
            image,
            short_desc,
            short_desc_en,
            desc,
            desc_en,
            address,
            address_en,
            lat,
            lng,
            rating,
            review_count,
        ) in place_rows:
            Place.objects.update_or_create(
                slug=slug,
                defaults={
                    "name": name,
                    "name_en": name_en,
                    "destination": destinations[dest],
                    "category": categories[cat],
                    "short_description": short_desc,
                    "short_description_en": short_desc_en,
                    "description": desc,
                    "description_en": desc_en,
                    "image_url": image,
                    "overlay_image_url": image,
                    "address": address,
                    "address_en": address_en,
                    "location": Point(lng, lat, srid=4326),
                    "average_rating": rating,
                    "review_count": review_count,
                    "is_published": True,
                },
            )

        # 5. Seed 8 Curated Tours
        tour_rows = [
            (
                "tour-ha-long-cruise-2n1d",
                "Du Thuyền 5 Sao Vịnh Hạ Long & Lan Hạ — Kỳ Quan Biển Ngọc",
                "5-Star Ha Long & Lan Ha Bay Cruise — Emerald Sea Wonder",
                "ha-long",
                "Vịnh Hạ Long, Quảng Ninh",
                "Ha Long Bay, Quang Ninh",
                "north",
                "2 Ngày 1 Đêm",
                "2 Days 1 Night",
                "Hà Nội / Quảng Ninh",
                "Hanoi / Quang Ninh",
                "Tối đa 20 khách",
                Decimal("1850000"),
                Decimal("2300000"),
                Decimal("5.0"),
                254,
                VIETNAM_PHOTO_MAP["cruise"],
                "Hải trình 2 ngày 1 đêm trên du thuyền sang trọng tiêu chuẩn 5 sao quốc tế, chiêm ngưỡng hàng ngàn đảo đá vôi kỳ vĩ.",
                "Two-day five-star luxury cruise journey discovering sublime limestone karsts and secluded emerald coves.",
                [
                    "Check-in du thuyền 5 sao đẳng cấp",
                    "Chèo kayak khám phá Hang Sáng Tối",
                    "Tiệc hoàng hôn Sunset Party trên sundeck",
                    "Bữa tối hải sản tươi sống thịnh soạn",
                ],
                [
                    {
                        "day": 1,
                        "title": "Hà Nội — Vịnh Hạ Long — Du Thuyền",
                        "morning": "Xe đón tại phố cổ Hà Nội",
                        "afternoon": "Nhận phòng, ăn trưa buffet, chèo kayak",
                        "evening": "Tiệc trà chiều, gala dinner hải sản",
                    },
                    {
                        "day": 2,
                        "title": "Hang Sửng Sốt — Bến Cảng — Hà Nội",
                        "morning": "Tập Thái Cực Quyền, thăm Hang Sửng Sốt",
                        "afternoon": "Thưởng thức bữa trưa sớm, cập bến",
                        "evening": "Xe đưa về điểm đón Hà Nội",
                    },
                ],
                [
                    "Phòng nghỉ cao cấp view biển",
                    "Tất cả các bữa ăn trong lịch trình",
                    "Vé tham quan các thắng cảnh",
                    "Xe đưa đón limousine",
                ],
                ["Đồ uống cá nhân", "Dịch vụ spa massage trên tàu", "Tiền tip hướng dẫn viên"],
                True,
            ),
            (
                "tour-sa-pa-fansipan-3n2d",
                "Chinh Phục Fansipan 3.143m & Bản Cát Cát — Sa Pa",
                "Conquering Fansipan 3,143m & Cat Cat Village — Sa Pa",
                "sa-pa",
                "Sa Pa, Lào Cai",
                "Sa Pa, Lao Cai",
                "north",
                "3 Ngày 2 Đêm",
                "3 Days 2 Nights",
                "Hà Nội / Sa Pa",
                "Hanoi / Sa Pa",
                "Tối đa 15 khách",
                Decimal("2450000"),
                Decimal("2900000"),
                Decimal("4.9"),
                188,
                VIETNAM_PHOTO_MAP["sa-pa"],
                "Khám phá thị trấn trong sương, chạm tay vào cột mốc 3.143m trên nóc nhà Đông Dương Fansipan và trải nghiệm văn hóa H'Mông.",
                "Journey through misty high alpine valleys, conquer Indochina's 3,143m apex, and experience H'Mong culture.",
                [
                    "Chinh phục đỉnh Fansipan bằng cáp treo 3 dây kỷ lục",
                    "Bản Cát Cát cổ kính với guồng nước và suối Tiên Sa",
                    "Khách sạn 4 sao trung tâm view núi Mường Hoa",
                ],
                [
                    {
                        "day": 1,
                        "title": "Hà Nội — Sa Pa — Bản Cát Cát",
                        "morning": "Xe giường nằm khởi hành đi Sa Pa",
                        "afternoon": "Check-in khách sạn, tản bộ Bản Cát Cát",
                        "evening": "Thưởng thức lẩu cá tầm nóng hổi",
                    },
                    {
                        "day": 2,
                        "title": "Chinh Phục Đỉnh Fansipan 3.143m",
                        "morning": "Đi cáp treo lên quần thể Fansipan",
                        "afternoon": "Tự do dạo phố Sa Pa, nhà thờ Đá",
                        "evening": "Chợ đêm Sa Pa, tắm lá thuốc Dao Đỏ",
                    },
                    {
                        "day": 3,
                        "title": "Thung Lũng Mường Hoa — Hà Nội",
                        "morning": "Ngắm ruộng bậc thang Mường Hoa",
                        "afternoon": "Mua quà lưu niệm, lên xe về Hà Nội",
                        "evening": "Về đến Hà Nội an toàn",
                    },
                ],
                [
                    "Xe limousine khứ hồi",
                    "Khách sạn 4 sao 2 đêm",
                    "Vé cáp treo Fansipan khứ hồi",
                    "Ăn uống theo chương trình",
                ],
                ["Chi phí cá nhân", "Vé tàu hỏa leo núi Mường Hoa", "Thuế VAT"],
                True,
            ),
            (
                "tour-ninh-binh-trang-an-1n",
                "Di Sản Thế Giới Tràng An & Đỉnh Hang Múa — Ninh Bình",
                "Trang An UNESCO Heritage & Mua Cave — Ninh Binh",
                "ninh-binh",
                "Ninh Bình",
                "Ninh Binh",
                "north",
                "1 Ngày",
                "1 Day",
                "Hà Nội",
                "Hanoi",
                "Tối đa 18 khách",
                Decimal("890000"),
                Decimal("1100000"),
                Decimal("4.8"),
                312,
                VIETNAM_PHOTO_MAP["ninh-binh"],
                "Chuyến đi trọn vẹn trong ngày khám phá quần thể danh thắng Tràng An di sản thế giới kép đầu tiên tại Đông Nam Á.",
                "Full-day exploration through Trang An UNESCO dual heritage waters and panoramic Mua Cave summits.",
                [
                    "Thuyền nan 3 giờ len lỏi qua 4 hang động Tràng An",
                    "Leo 500 bậc đá Hang Múa ngắm toàn cảnh Tam Cốc",
                    "Bữa trưa đặc sản dê núi cơm cháy Ninh Bình",
                ],
                [
                    {
                        "day": 1,
                        "title": "Hà Nội — Cố Đô Hoa Lư — Tràng An — Hang Múa",
                        "morning": "Đón khách, thăm Cố đô Hoa Lư ngàn năm",
                        "afternoon": "Đi thuyền Tràng An, leo đỉnh Hang Múa",
                        "evening": "Khởi hành về Hà Nội",
                    },
                ],
                [
                    "Xe đưa đón đời mới",
                    "Vé thuyền Tràng An và Hang Múa",
                    "Bữa trưa buffet đặc sản",
                    "Hướng dẫn viên song ngữ",
                ],
                ["Đồ uống ngoài thực đơn", "Chi phí mua sắm cá nhân"],
                False,
            ),
            (
                "tour-ha-giang-loop-3n2d",
                "Cung Đường Hạnh Phúc — Đèo Mã Pí Lèng & Sông Nho Quế",
                "Happiness Road Loop — Ma Pi Leng & Nho Que River",
                "ha-giang",
                "Hà Giang",
                "Ha Giang",
                "north",
                "3 Ngày 2 Đêm",
                "3 Days 2 Nights",
                "Hà Giang / Hà Nội",
                "Ha Giang / Hanoi",
                "Tối đa 12 khách",
                Decimal("2650000"),
                Decimal("3200000"),
                Decimal("5.0"),
                142,
                VIETNAM_PHOTO_MAP["ha-giang"],
                "Hành trình huyền thoại nơi địa đầu Tổ quốc, chinh phục một trong tứ đại đỉnh đèo hiểm trở bậc nhất Việt Nam.",
                "Legendary frontier motorbike expedition conquering Vietnam's most iconic mountain passes.",
                [
                    "Đi thuyền hẻm vực Tu Sản sâu nhất Đông Nam Á",
                    "Check-in cột cờ Lũng Cú cực Bắc Tổ quốc",
                    "Đêm nghỉ homestay nhà trình tường người H'Mông",
                ],
                [
                    {
                        "day": 1,
                        "title": "Hà Giang — Quản Bạ — Đồng Văn",
                        "morning": "Cổng trời Quản Bạ, núi đôi Cô Tiên",
                        "afternoon": "Dốc Thẩm Mã, Nhà của Pao",
                        "evening": "Check-in phố cổ Đồng Văn",
                    },
                    {
                        "day": 2,
                        "title": "Đèo Mã Pí Lèng — Sông Nho Quế — Mèo Vạc",
                        "morning": "Đi thuyền sông Nho Quế màu ngọc bích",
                        "afternoon": "Chinh phục đỉnh đèo Mã Pí Lèng",
                        "evening": "Lửa trại và ẩm thực dân tộc bản địa",
                    },
                    {
                        "day": 3,
                        "title": "Mèo Vạc — Cột Cờ Lũng Cú — Hà Giang",
                        "morning": "Thăm Cột cờ Lũng Cú",
                        "afternoon": "Xuôi đèo về thành phố Hà Giang",
                        "evening": "Lên xe giường nằm về Hà Nội",
                    },
                ],
                [
                    "Xe máy + xăng hoặc xe ô tô đưa đón",
                    "Homestay và khách sạn cao cấp",
                    "Các bữa ăn đặc sản núi rừng",
                    "Vé thuyền Tu Sản",
                ],
                ["Bảo hiểm du lịch tự túc", "Chi phí đồ uống cá nhân"],
                True,
            ),
            (
                "tour-hoi-an-da-nang-3n2d",
                "Bà Nà Hills Cầu Vàng & Phố Cổ Hội An Lung Linh",
                "Golden Bridge Ba Na Hills & Sparkling Hoi An Lanterns",
                "hoi-an",
                "Đà Nẵng & Hội An",
                "Da Nang & Hoi An",
                "central",
                "3 Ngày 2 Đêm",
                "3 Days 2 Nights",
                "Đà Nẵng",
                "Da Nang",
                "Tối đa 16 khách",
                Decimal("2350000"),
                Decimal("2800000"),
                Decimal("4.9"),
                275,
                VIETNAM_PHOTO_MAP["hoi-an"],
                "Kết hợp hoàn hảo giữa thành phố biển đáng sống, Cầu Vàng kỳ ảo giữa mây trời và phố cổ đèn lồng rêu phong.",
                "Perfect union of coastal modern charm, Ba Na Hills surreal bridges, and historic lantern-lit alleys.",
                [
                    "Check-in Cầu Vàng nổi tiếng toàn cầu tại Bà Nà Hills",
                    "Thả hoa đăng ước nguyện trên dòng sông Hoài Hội An",
                    "Thưởng thức mì Quảng và cao lầu chuẩn vị xứ Quảng",
                ],
                [
                    {
                        "day": 1,
                        "title": "Đà Nẵng — Bán Đảo Sơn Trà — Phố Cổ Hội An",
                        "morning": "Đón sân bay Đà Nẵng, viếng chùa Linh Ứng",
                        "afternoon": "Về Hội An, đi thuyền hoa đăng",
                        "evening": "Tự do ngắm phố cổ về đêm",
                    },
                    {
                        "day": 2,
                        "title": "Khu Du Lịch Bà Nà Hills — Cầu Vàng",
                        "morning": "Cáp treo Bà Nà Hills, check-in Cầu Vàng",
                        "afternoon": "Làng Pháp, hầm rượu Debay",
                        "evening": "Ngắm Cầu Rồng phun lửa tại Đà Nẵng",
                    },
                    {
                        "day": 3,
                        "title": "Biển Mỹ Khê — Chợ Hàn — Tiễn Bay",
                        "morning": "Tắm biển Mỹ Khê cát trắng",
                        "afternoon": "Mua sắm đặc sản chợ Hàn, tiễn sân bay",
                        "evening": "Kết thúc chuyến đi tốt đẹp",
                    },
                ],
                [
                    "Khách sạn 4 sao tiện nghi",
                    "Vé cáp treo Bà Nà Hills",
                    "Tất cả các bữa ăn tiêu chuẩn",
                    "Xe du lịch đời mới máy lạnh",
                ],
                ["Chi phí trò chơi tính phí tại Fantasy Park", "Tiền tip tài xế và HDV"],
                True,
            ),
            (
                "tour-hue-di-san-2n1d",
                "Cố Đô Huế — Dòng Sông Hương & Nhã Nhạc Cung Đình",
                "Hue Imperial Heritage — Perfume River & Royal Music",
                "hue",
                "Huế",
                "Hue",
                "central",
                "2 Ngày 1 Đêm",
                "2 Days 1 Night",
                "Huế / Đà Nẵng",
                "Hue / Da Nang",
                "Tối đa 15 khách",
                Decimal("1650000"),
                Decimal("1950000"),
                Decimal("4.8"),
                120,
                VIETNAM_PHOTO_MAP["hue"],
                "Lắng đọng cùng vẻ đẹp trầm mặc của Đại Nội kinh thành xưa, các lăng tẩm hoàng gia và nghe ca Huế trên sông Hương.",
                "Serene exploration of royal citadels, poetic river boat excursions, and imperial gastronomy.",
                [
                    "Khám phá Đại Nội Kinh Thành triều Nguyễn",
                    "Đi thuyền rồng ngắm hoàng hôn sông Hương và nghe ca Huế",
                    "Viếng Chùa Thiên Mụ cổ kính linh thiêng",
                ],
                [
                    {
                        "day": 1,
                        "title": "Huế — Đại Nội — Thuyền Rồng Sông Hương",
                        "morning": "Đón khách, thăm Đại Nội và Ngọ Môn",
                        "afternoon": "Lăng Khải Định với kiến trúc tinh xảo",
                        "evening": "Nghe ca Huế trên thuyền rồng",
                    },
                    {
                        "day": 2,
                        "title": "Chùa Thiên Mụ — Lăng Tự Đức — Chợ Đông Ba",
                        "morning": "Viếng chùa Thiên Mụ, thăm lăng Tự Đức",
                        "afternoon": "Mua sắm tại chợ Đông Ba, tiễn khách",
                        "evening": "Kết thúc chương trình",
                    },
                ],
                [
                    "Khách sạn 4 sao trung tâm",
                    "Vé thuyền rồng sông Hương",
                    "Vé tham quan các lăng tẩm",
                    "Các bữa ăn đặc sản Huế",
                ],
                ["Chi phí cá nhân ngoài chương trình", "Vé máy bay đến/đi từ Huế"],
                False,
            ),
            (
                "tour-da-lat-thanh-pho-ngan-hoa-3n2d",
                "Đà Lạt — Săn Mây Đồi Chè & Hồ Tuyền Lâm Lãng Mạn",
                "Da Lat — Cloud Hunting & Romantic Tuyen Lam Lake",
                "da-lat",
                "Đà Lạt",
                "Da Lat",
                "central",
                "3 Ngày 2 Đêm",
                "3 Days 2 Nights",
                "Đà Lạt",
                "Da Lat",
                "Tối đa 14 khách",
                Decimal("2150000"),
                Decimal("2600000"),
                Decimal("4.9"),
                204,
                VIETNAM_PHOTO_MAP["da-lat"],
                "Hòa mình vào không khí se lạnh, những đồi thông thơ mộng và thung lũng hoa ngát hương xứ ngàn hoa.",
                "Cool highland retreat nestled among whispering pines, flower gardens, and calm mountain lakes.",
                [
                    "Săn mây bình minh tại đồi chè Cầu Đất",
                    "Chèo SUP ngắm rừng lá phong Hồ Tuyền Lâm",
                    "Check-in các quán cà phê ngắm hoàng hôn thung lũng",
                ],
                [
                    {
                        "day": 1,
                        "title": "Đón Sân Bay — Quảng Trường Lâm Viên — Hồ Xuân Hương",
                        "morning": "Đón sân bay Liên Khương, check-in khách sạn",
                        "afternoon": "Dạo quanh Hồ Xuân Hương thơ mộng",
                        "evening": "Khám phá chợ đêm ẩm thực Đà Lạt",
                    },
                    {
                        "day": 2,
                        "title": "Săn Mây Cầu Đất — Chèo SUP Hồ Tuyền Lâm",
                        "morning": "Đón bình minh săn mây đồi chè",
                        "afternoon": "Chèo SUP thư thái trên Hồ Tuyền Lâm",
                        "evening": "Tiệc BBQ giữa đồi thông se lạnh",
                    },
                    {
                        "day": 3,
                        "title": "Dinh Bảo Đại — Thác Datanla — Tiễn Bay",
                        "morning": "Thăm Dinh III, trải nghiệm máng trượt Datanla",
                        "afternoon": "Mua mứt và hoa tươi, tiễn sân bay",
                        "evening": "Kết thúc tour trọn vẹn",
                    },
                ],
                [
                    "Khách sạn 3-4 sao phong cách Pháp",
                    "Hoạt động chèo SUP + áo phao",
                    "Xe ô tô đưa đón tham quan",
                    "Các bữa ăn theo lịch trình",
                ],
                ["Vé trò chơi mạo hiểm tại Datanla", "Đồ uống cá nhân"],
                True,
            ),
            (
                "tour-phu-quoc-thien-duong-dao-ngoc-3n2d",
                "Đảo Ngọc Phú Quốc — Lặn San Hô & Cáp Treo Hòn Thơm",
                "Phu Quoc Island Sanctuary — Coral Diving & Hon Thom Cable Car",
                "phu-quoc",
                "Phú Quốc",
                "Phu Quoc",
                "south",
                "3 Ngày 2 Đêm",
                "3 Days 2 Nights",
                "Phú Quốc",
                "Phu Quoc",
                "Tối đa 18 khách",
                Decimal("2950000"),
                Decimal("3600000"),
                Decimal("5.0"),
                290,
                VIETNAM_PHOTO_MAP["phu-quoc"],
                "Kỳ nghỉ biển đảo trọn vẹn tại Nam đảo Ngọc, trải nghiệm cáp treo vượt biển dài nhất thế giới và lặn ngắm san hô tự nhiên.",
                "Ultimate tropical island getaway with world-record sea cable cars and coral reef adventures.",
                [
                    "Trải nghiệm cáp treo vượt biển Hòn Thơm kỷ lục Guinness",
                    "Cano 4 đảo: Móng Tay, Gầm Ghì, Mây Rút, Hòn Thơm",
                    "Tiệc hải sản tươi sống và ngắm hoàng hôn Sunset Sanato",
                ],
                [
                    {
                        "day": 1,
                        "title": "Đón Sân Bay — Sunset Town Thị Trấn Hoàng Hôn",
                        "morning": "Đón sân bay Phú Quốc, nhận phòng resort",
                        "afternoon": "Dạo chơi Thị trấn Hoàng Hôn Địa Trung Hải",
                        "evening": "Ngắm Cầu Hôn, chợ đêm Vui-Phết",
                    },
                    {
                        "day": 2,
                        "title": "Cano 4 Đảo Nam Phú Quốc & Lặn Ngắm San Hô",
                        "morning": "Cano cao tốc đi Hòn Móng Tay, Hòn Gầm Ghì",
                        "afternoon": "Lặn biển bình khí, vui chơi công viên nước Hòn Thơm",
                        "evening": "Tiệc BBQ hải sản tại Bãi Sao",
                    },
                    {
                        "day": 3,
                        "title": "Vườn Tiêu — Nhà Thùng Nước Mắm — Tiễn Bay",
                        "morning": "Thăm cơ sở ngọc trai và nước mắm truyền thống",
                        "afternoon": "Mua sắm đặc sản đảo, tiễn sân bay",
                        "evening": "Tạm biệt Phú Quốc xinh đẹp",
                    },
                ],
                [
                    "Resort 4 sao sát biển 2 đêm",
                    "Vé cáp treo Hòn Thơm 2 chiều",
                    "Cano cao tốc riêng tham quan 4 đảo",
                    "Flycam chụp ảnh và quay video kỷ niệm",
                ],
                ["Dịch vụ lặn bình khí sâu (Scuba diving chuyên nghiệp)", "Chi phí cá nhân"],
                True,
            ),
        ]

        for (
            slug,
            title,
            title_en,
            dest_slug,
            dest_name,
            dest_name_en,
            region,
            duration,
            duration_en,
            departure,
            departure_en,
            group_size,
            price,
            orig_price,
            rating,
            review_count,
            image,
            overview,
            overview_en,
            highlights,
            itinerary,
            included,
            excluded,
            is_featured,
        ) in tour_rows:
            Tour.objects.update_or_create(
                slug=slug,
                defaults={
                    "title": title,
                    "title_en": title_en,
                    "destination": destinations.get(dest_slug),
                    "destination_name": dest_name,
                    "destination_name_en": dest_name_en,
                    "region": region,
                    "duration": duration,
                    "duration_en": duration_en,
                    "departure": departure,
                    "departure_en": departure_en,
                    "group_size": group_size,
                    "group_size_en": group_size.replace("Tối đa", "Max").replace("khách", "guests"),
                    "price": price,
                    "original_price": orig_price,
                    "rating": rating,
                    "review_count": review_count,
                    "image_url": image,
                    "gallery_urls": [image],
                    "overview": overview,
                    "overview_en": overview_en,
                    "highlights": highlights,
                    "itinerary": itinerary,
                    "included": included,
                    "excluded": excluded,
                    "is_published": True,
                    "is_featured": is_featured,
                },
            )

        # 6. Seed 4 Travel Stories
        story_rows = [
            (
                "hanh-trinh-xuyen-viet",
                "Hành trình xuyên Việt: Chạm vào vẻ đẹp kỳ quan và chiều sâu di sản",
                "Hành trình khám phá văn hóa, ẩm thực và cảnh sắc tuyệt mỹ từ Bắc vào Nam trên dải đất hình chữ S.",
                (
                    "Việt Nam không chỉ là một điểm đến du lịch, mà là một bản giao hưởng tuyệt sắc của thiên nhiên "
                    "và lịch sử ngàn năm văn hiến. Bắt đầu từ những dãy núi trùng điệp mù sương của vùng cao Tây Bắc, "
                    "xuôi về kỳ quan vịnh Hạ Long kỳ vĩ, rồi dừng chân bên những mái ngói rêu phong của phố cổ Hội An, "
                    "mỗi bước chân đều mở ra một trải nghiệm độc bản.\n\n"
                    "Hãy đi chậm lại, trò chuyện cùng người dân bản địa, thưởng thức một bát phở nóng hổi hay ly cà phê "
                    "sữa đá vỉa hè. Đó chính là cách bạn cảm nhận trọn vẹn nhịp đập tâm hồn của đất nước này."
                ),
                VIETNAM_PHOTO_MAP["ha-long"],
                destinations["ha-long"],
                "7 phút đọc",
                "Hành Trình Di Sản",
                "Nguyễn Nhật Huy",
                "Chuyên gia khám phá văn hóa bản địa",
                ["Xuyên Việt", "Di sản UNESCO", "Văn hóa", "Khám phá"],
            ),
            (
                "cam-nang-am-thuc-hoi-an",
                "Cẩm nang ẩm thực phố cổ: Những hương vị bản địa không thể bỏ lỡ",
                "Khám phá thế giới ẩm thực phong phú của Hội An: cao lầu, mì Quảng, cơm gà và bánh mì nức tiếng.",
                (
                    "Ẩm thực Hội An là sự kết tinh tinh tế giữa các nền văn hóa Việt - Hoa - Nhật qua nhiều thế kỷ giao thương. "
                    "Mỗi món ăn nơi đây không chỉ mang hương vị đậm đà khó quên mà còn chứa đựng cả một câu chuyện lịch sử.\n\n"
                    "Đừng quên ghé chợ Hội An vào sáng sớm để thưởng thức tô cao lầu với sợi mì dai vàng óng làm từ nước giếng Bá Lễ, "
                    "hay ổ bánh mì giòn rụm với pate thơm nức lòng du khách gần xa."
                ),
                VIETNAM_PHOTO_MAP["hoi-an"],
                destinations["hoi-an"],
                "5 phút đọc",
                "Ẩm Thực Bản Địa",
                "Trần Mai Linh",
                "Blogger Ẩm thực & Du lịch",
                ["Hội An", "Ẩm thực", "Món ngon phố cổ", "Di sản"],
            ),
            (
                "kinh-nghiem-du-thuyen-ha-long",
                "Kinh nghiệm chọn du thuyền 5 sao vịnh Hạ Long và Lan Hạ trọn vẹn nhất",
                "Tất cả những gì bạn cần biết để chọn cabin, hải trình và tận hưởng chuyến nghỉ dưỡng sang trọng giữa kỳ quan.",
                (
                    "Nghỉ đêm trên du thuyền 5 sao giữa lòng vịnh di sản UNESCO là trải nghiệm du lịch thượng lưu không thể bỏ lỡ. "
                    "Với hàng trăm đội tàu đang hoạt động, việc lựa chọn hải trình phù hợp sẽ quyết định toàn bộ kỳ nghỉ của bạn.\n\n"
                    "Vịnh Hạ Long truyền thống thích hợp cho ai lần đầu đến vịnh muốn ngắm hang Sửng Sốt và đảo Ti Tốp; "
                    "trong khi vịnh Lan Hạ nguyên sơ hơn, lý tưởng cho chèo kayak và tắm biển tại những bãi tắm hoang sơ."
                ),
                VIETNAM_PHOTO_MAP["cruise"],
                destinations["ha-long"],
                "6 phút đọc",
                "Kinh Nghiệm Du Lịch",
                "Đặng Thu Thảo",
                "Biên tập viên Du lịch cao cấp",
                ["Hạ Long", "Lan Hạ", "Du thuyền 5 sao", "Nghỉ dưỡng"],
            ),
            (
                "lan-ngam-san-ho-phu-quoc",
                "Hướng dẫn lặn biển ngắm rạn san hô nguyên sinh tại Nam đảo Phú Quốc",
                "Khám phá vẻ đẹp thủy cung rực rỡ tại quần đảo An Thới với các rạn san hô được bảo tồn tự nhiên tuyệt đẹp.",
                (
                    "Quần đảo An Thới phía Nam đảo Phú Quốc sở hữu một trong những hệ sinh thái rạn san hô tự nhiên đa dạng nhất Việt Nam. "
                    "Với hơn 360 loài san hô cứng và hàng chục loài san hô mềm rực rỡ, nơi đây chính là thiên đường cho các tín đồ mê biển.\n\n"
                    "Bạn có thể lựa chọn Snorkeling với ống thở đơn giản hoặc Scuba diving lặn bình khí sâu 6-12m cùng huấn luyện viên PADI chuyên nghiệp."
                ),
                VIETNAM_PHOTO_MAP["diving"],
                destinations["phu-quoc"],
                "5 phút đọc",
                "Phiêu Lưu & Đại Dương",
                "Vũ Tuấn Kiệt",
                "Huấn luyện viên lặn biển PADI",
                ["Phú Quốc", "Lặn biển", "San hô", "An Thới"],
            ),
        ]

        for (
            slug,
            title,
            excerpt,
            body,
            cover,
            dest,
            read_time,
            cat,
            author,
            role,
            tags,
        ) in story_rows:
            Article.objects.update_or_create(
                slug=slug,
                defaults={
                    "title": title,
                    "excerpt": excerpt,
                    "body": body,
                    "cover_image": cover,
                    "destination": dest,
                    "read_time": read_time,
                    "category": cat,
                    "author_name": author,
                    "author_role": role,
                    "tags": tags,
                    "status": Article.Status.PUBLISHED,
                    "published_at": timezone.now(),
                },
            )

        # 7. Seed Partner Application
        PartnerApplication.objects.get_or_create(
            applicant=traveler,
            business_name="Vietnam Heritage Adventures",
            defaults={
                "email": traveler.email,
                "phone": "0987654321",
                "website": "https://heritage-vietnam.vn",
                "message": "Đăng ký cung cấp các tour du lịch sinh thái và trải nghiệm văn hóa bản địa chất lượng cao tại Việt Nam.",
            },
        )

        # 8. Seed Demo Booking
        sample_tour = Tour.objects.filter(slug="tour-ha-long-cruise-2n1d").first()
        Booking.objects.get_or_create(
            booking_code="STAR-2026-HL01",
            defaults={
                "customer": traveler,
                "tour": sample_tour,
                "contact_name": "Nguyễn Văn An",
                "contact_email": traveler.email,
                "contact_phone": "0912345678",
                "departure_date": timezone.now().date() + timezone.timedelta(days=14),
                "pax_adults": 2,
                "pax_children": 0,
                "unit_price": Decimal("3200000.00"),
                "total_amount": Decimal("6400000.00"),
                "status": Booking.Status.CONFIRMED,
                "special_requests": "Phòng đôi view ngắm hoàng hôn vịnh Lan Hạ, không ăn hải sản có vỏ.",
            },
        )

        # 9. Seed Clean Knowledge Chunks for AI Trip Assistant
        # 9a. Index all Destinations
        for dest in Destination.objects.all():
            AssistantKnowledgeChunk.objects.update_or_create(
                entity_type=AssistantKnowledgeChunk.EntityType.DESTINATION,
                entity_slug=dest.slug,
                defaults={
                    "entity_id": dest.id,
                    "title": dest.name,
                    "content_vi": f"{dest.name} ({dest.country}). {dest.summary}\n\n{dest.description}",
                    "content_en": f"{dest.name_en or dest.name} ({dest.country_en or dest.country}). {dest.summary_en or dest.summary}\n\n{dest.description_en or dest.description}",
                    "metadata": {
                        "slug": dest.slug,
                        "starting_price": str(dest.starting_price) if dest.starting_price else None,
                        "type": "destination",
                    },
                },
            )

        # 9b. Index all Tours
        for tour in Tour.objects.all():
            itinerary_text_vi = "\n".join(
                [
                    f"Ngày {d.get('day')}: {d.get('title')} — Sáng: {d.get('morning')} | Chiều: {d.get('afternoon')} | Tối: {d.get('evening')}"
                    for d in tour.itinerary
                ]
            )
            highlights_text = ", ".join(tour.highlights or [])
            inclusions_text = ", ".join(tour.included or [])
            exclusions_text = ", ".join(tour.excluded or [])

            chunk_body = (
                f"Tour: {tour.title} ({tour.duration})\n"
                f"Điểm đến: {tour.destination_name} (Vùng: {tour.region})\n"
                f"Khởi hành: {tour.departure} | Giá vé: {int(tour.price):,} VNĐ/khách\n"
                f"Tổng quan: {tour.overview}\n"
                f"Điểm nổi bật: {highlights_text}\n"
                f"Lịch trình chi tiết:\n{itinerary_text_vi}\n"
                f"Bao gồm: {inclusions_text}\n"
                f"Không bao gồm: {exclusions_text}"
            )

            AssistantKnowledgeChunk.objects.update_or_create(
                entity_type=AssistantKnowledgeChunk.EntityType.TOUR,
                entity_slug=tour.slug,
                defaults={
                    "entity_id": tour.id,
                    "title": tour.title,
                    "content_vi": chunk_body,
                    "content_en": f"Tour: {tour.title_en or tour.title} ({tour.duration_en or tour.duration}). Price: {int(tour.price):,} VND. Destination: {tour.destination_name_en or tour.destination_name}. Overview: {tour.overview_en or tour.overview}",
                    "metadata": {
                        "slug": tour.slug,
                        "price": float(tour.price),
                        "region": tour.region,
                        "duration": tour.duration,
                        "departure": tour.departure,
                        "type": "tour",
                    },
                },
            )

        # 9c. Index Policies & Concierge FAQs
        policy_items = [
            (
                "chinh-sach-dat-tour-va-hoan-huy",
                "Chính sách Đặt tour, Thanh toán và Hoàn hủy",
                "STAR Travels hỗ trợ đặt cọc 50% khi đăng ký tour và thanh toán số còn lại trước ngày khởi hành 03 ngày. Hủy tour trước 07 ngày miễn phí 100%. Hủy tour từ 03-06 ngày phạt 30%. Hủy tour trong vòng 48 giờ phạt 100% chi phí.",
                "STAR Travels requires 50% deposit upon booking, balance paid 3 days prior to departure. Free cancellation up to 7 days before departure.",
            ),
            (
                "chinh-sach-tre-em-va-phu-thu",
                "Chính sách Trẻ em & Phụ thu phòng đơn",
                "Trẻ em dưới 5 tuổi: Miễn phí (ngồi chung ghế xe và ngủ cùng bố mẹ). Trẻ em từ 5 đến 9 tuổi: 75% giá tour người lớn (có ghế riêng, ăn riêng, ngủ cùng bố mẹ). Trẻ em từ 10 tuổi trở lên: Tính 100% giá tour người lớn. Phụ thu phòng đơn áp dụng khi khách đi 1 mình.",
                "Children under 5: Free of charge. Children 5-9: 75% adult price. Children 10+: Full adult price.",
            ),
        ]
        for p_slug, p_title, p_vi, p_en in policy_items:
            AssistantKnowledgeChunk.objects.update_or_create(
                entity_type=AssistantKnowledgeChunk.EntityType.POLICY,
                entity_slug=p_slug,
                defaults={
                    "title": p_title,
                    "content_vi": p_vi,
                    "content_en": p_en,
                    "metadata": {"type": "policy", "slug": p_slug},
                },
            )

        # 9d. Index Curated Historical & Cultural Heritage Dataset
        from assistant.data.vietnam_heritage_history import VIETNAM_HERITAGE_HISTORY

        for item in VIETNAM_HERITAGE_HISTORY:
            dest_slug = str(item.get("destination_slug") or "")
            dest = destinations.get(dest_slug)
            AssistantKnowledgeChunk.objects.update_or_create(
                entity_type=AssistantKnowledgeChunk.EntityType.PLACE,
                entity_slug=str(item["slug"]),
                defaults={
                    "entity_id": dest.id if dest else None,
                    "title": str(item["landmark_name"]),
                    "content_vi": str(item["content_vi"]),
                    "content_en": str(item.get("content_en", "")),
                    "metadata": {
                        "destination_slug": dest_slug,
                        "historical_period": item.get("historical_period", ""),
                        "unesco_status": item.get("unesco_status", ""),
                        "tags": item.get("tags", []),
                        "category": "heritage_history",
                        "type": "place",
                        "best_time_to_visit": item.get("best_time_to_visit", ""),
                        "signature_cuisine": item.get("signature_cuisine", []),
                        "must_try_activities": item.get("must_try_activities", []),
                        "insider_tips": item.get("insider_tips", []),
                        "ideal_duration": item.get("ideal_duration", ""),
                        "target_travelers": item.get("target_travelers", []),
                        "recommended_tour_slugs": item.get("recommended_tour_slugs", []),
                    },
                },
            )

        self.stdout.write(
            self.style.SUCCESS(
                "Đã nạp toàn bộ 12 Điểm đến, 10 Trải nghiệm, 8 Tour, 4 Bài viết, 1 Booking và Tri thức Lịch sử & Di sản AI RAG vào hệ thống thành công!"
            )
        )
