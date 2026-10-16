import uuid
from decimal import Decimal

from django.contrib.gis.geos import Point
from django.core.management.base import BaseCommand
from django.utils import timezone

from accommodations.models import Accommodation
from bookings.models import Booking
from destinations.models import Destination
from restaurants.models import Restaurant

ACCOMMODATION_SEED = [
    {
        "slug": "sofitel-legend-metropole-hanoi",
        "destination_slug": "ha-noi",
        "name": "Sofitel Legend Metropole Hanoi",
        "name_en": "Sofitel Legend Metropole Hanoi",
        "category": "heritage_hotel",
        "star_rating": 5,
        "address": "15 Ngô Quyền, Phường Tràng Tiền, Quận Hoàn Kiếm, Hà Nội",
        "lat": 21.0253,
        "lng": 105.8562,
        "description": "Khách sạn di sản huyền thoại sang trọng bậc nhất Đông Dương thành lập từ năm 1901, mang phong cách Pháp cổ điển kết hợp nét thanh lịch Hà Nội.",
        "description_en": "Legendary luxury heritage hotel in the heart of Hanoi since 1901, blending neoclassical grandeur with authentic Vietnamese hospitality.",
        "amenities": [
            "Hồ bơi nước ấm",
            "Le Spa du Metropole",
            "Nhà hàng Pháp Le Beaulieu",
            "Hầm trú ẩn lịch sử",
            "Bar Bamboo",
            "Dịch vụ quản gia",
        ],
        "price_from": Decimal("7500000"),
        "image_url": "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
        "gallery": [
            "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80",
        ],
        "partner_name": "Booking.com",
        "partner_booking_url": "https://www.booking.com/hotel/vn/sofitel-legend-metropole-hanoi.vi.html?aid=startravels",
        "partner_commission_rate": Decimal("8.50"),
        "rating_average": Decimal("4.92"),
        "rating_count": 1280,
    },
    {
        "slug": "capella-hanoi",
        "destination_slug": "ha-noi",
        "name": "Capella Hanoi",
        "name_en": "Capella Hanoi Luxury Opera Boutique",
        "category": "boutique_luxury",
        "star_rating": 5,
        "address": "11 Lê Phụng Hiểu, Quận Hoàn Kiếm, Hà Nội",
        "lat": 21.0267,
        "lng": 105.8576,
        "description": "Kiệt tác thiết kế của kiến trúc sư Bill Bensley lấy cảm hứng từ thời kỳ hoàng kim của nghệ thuật Opera những năm 1920.",
        "description_en": "Art-deco masterpiece by Bill Bensley celebrating the roaring 1920s Opera era, located steps away from Hanoi Opera House.",
        "amenities": [
            "Nhà hàng Hibana by Koki Michelin 1*",
            "Auriga Spa",
            "Hồ bơi La Grotta",
            "Quầy bar Diva's Lounge",
        ],
        "price_from": Decimal("9200000"),
        "image_url": "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80",
        "gallery": [
            "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80"
        ],
        "partner_name": "Agoda",
        "partner_booking_url": "https://www.agoda.com/capella-hanoi/hotel/hanoi-vn.html?cid=startravels",
        "partner_commission_rate": Decimal("9.00"),
        "rating_average": Decimal("4.95"),
        "rating_count": 520,
    },
    {
        "slug": "intercontinental-danang-sun-peninsula-resort",
        "destination_slug": "da-nang",
        "name": "InterContinental Danang Sun Peninsula Resort",
        "name_en": "InterContinental Danang Sun Peninsula Resort",
        "category": "beach_resort",
        "star_rating": 5,
        "address": "Bán đảo Sơn Trà, Thọ Quang, Sơn Trà, Đà Nẵng",
        "lat": 16.1219,
        "lng": 108.3075,
        "description": "Khu nghỉ dưỡng sang trọng bậc nhất thế giới nép mình bên sườn đồi bán đảo Sơn Trà với vịnh biển riêng tư tuyệt mỹ.",
        "description_en": "World-acclaimed luxury hillside resort designed by Bill Bensley, sprawling across four levels: Heaven, Sky, Earth and Sea.",
        "amenities": [
            "Nhà hàng La Maison 1888",
            "Bãi biển riêng 700m",
            "Mi Sol Spa",
            "Tàu điện Nam Tram",
            "Hồ bơi LGO",
        ],
        "price_from": Decimal("11500000"),
        "image_url": "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80",
        "gallery": [
            "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80"
        ],
        "partner_name": "Agoda",
        "partner_booking_url": "https://www.agoda.com/intercontinental-danang-sun-peninsula-resort/hotel/da-nang-vn.html?cid=startravels",
        "partner_commission_rate": Decimal("10.00"),
        "rating_average": Decimal("4.96"),
        "rating_count": 2450,
    },
    {
        "slug": "four-seasons-resort-the-nam-hai-hoi-an",
        "destination_slug": "hoi-an",
        "name": "Four Seasons Resort The Nam Hai",
        "name_en": "Four Seasons Resort The Nam Hai, Hoi An",
        "category": "villa_resort",
        "star_rating": 5,
        "address": "Khối Hà My Đông B, Phường Điện Dương, Điện Bàn, Hội An, Quảng Nam",
        "lat": 15.9387,
        "lng": 108.3184,
        "description": "Quần thể biệt thự ven biển tuyệt mỹ lấy cảm hứng từ triết lý phong thủy và kiến trúc nhà vườn truyền thống xứ Quảng.",
        "description_en": "Tranquil beachfront sanctuary of luxurious villas set amidst 35 hectares of tropical coconut palms along pristine Ha My Beach.",
        "amenities": [
            "Biệt thự hồ bơi riêng",
            "The Heart of the Earth Spa",
            "3 hồ bơi vô cực tràn biển",
            "Lớp học nấu ăn Cooking Academy",
        ],
        "price_from": Decimal("16800000"),
        "image_url": "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80",
        "gallery": [
            "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80"
        ],
        "partner_name": "Booking.com",
        "partner_booking_url": "https://www.booking.com/hotel/vn/the-nam-hai.vi.html?aid=startravels",
        "partner_commission_rate": Decimal("8.00"),
        "rating_average": Decimal("4.94"),
        "rating_count": 910,
    },
    {
        "slug": "six-senses-ninh-van-bay",
        "destination_slug": "nha-trang",
        "name": "Six Senses Ninh Van Bay",
        "name_en": "Six Senses Ninh Van Bay Eco Luxury Resort",
        "category": "eco_luxury",
        "star_rating": 5,
        "address": "Vịnh Ninh Vân, Ninh Hòa, Khánh Hòa",
        "lat": 12.3582,
        "lng": 109.2801,
        "description": "Nằm trên bán đảo biệt lập chỉ có thể tiếp cận bằng đường thủy, hòa mình tuyệt đối giữa biển xanh ngọc bích và ghềnh đá nguyên sơ.",
        "description_en": "Iconic secluded sanctuary accessible only by boat, boasting stunning rock villas and organic wellness experiences.",
        "amenities": [
            "Biệt thự ghềnh đá (Rock Villa)",
            "Six Senses Wellness Spa",
            "Chèo thuyền kayak vịnh riêng",
            "Rạp chiếu phim ngoài trời",
        ],
        "price_from": Decimal("18500000"),
        "image_url": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
        "gallery": [
            "https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?auto=format&fit=crop&w=800&q=80"
        ],
        "partner_name": "Traveloka",
        "partner_booking_url": "https://www.traveloka.com/vi-vn/hotel/vietnam/six-senses-ninh-van-bay-100000021345?aid=startravels",
        "partner_commission_rate": Decimal("11.00"),
        "rating_average": Decimal("4.98"),
        "rating_count": 1420,
    },
    {
        "slug": "jw-marriott-phu-quoc-emerald-bay",
        "destination_slug": "phu-quoc",
        "name": "JW Marriott Phu Quoc Emerald Bay Resort & Spa",
        "name_en": "JW Marriott Phu Quoc Emerald Bay",
        "category": "luxury_resort",
        "star_rating": 5,
        "address": "Bãi Khem, An Thới, Phú Quốc, Kiên Giang",
        "lat": 10.0381,
        "lng": 104.0322,
        "description": "Khu nghỉ dưỡng giả tưởng đại học Lamarck University bên bờ cát trắng mịn Bãi Khem, được mệnh danh là kiệt tác kiến trúc của đảo ngọc.",
        "description_en": "Whimsical luxury masterpiece conceptualized around a mythical university academy by designer Bill Bensley on Bai Khem beach.",
        "amenities": [
            "Hồ bơi hình vỏ sò Shell Pool",
            "Chanterelle Spa by JW",
            "Nhà hàng Pink Pearl fine-dining",
            "Bãi biển Bãi Khem riêng",
        ],
        "price_from": Decimal("7800000"),
        "image_url": "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1200&q=80",
        "gallery": [
            "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80"
        ],
        "partner_name": "Agoda",
        "partner_booking_url": "https://www.agoda.com/jw-marriott-phu-quoc-emerald-bay-resort-spa/hotel/phu-quoc-island-vn.html?cid=startravels",
        "partner_commission_rate": Decimal("8.50"),
        "rating_average": Decimal("4.91"),
        "rating_count": 1890,
    },
    {
        "slug": "topas-ecolodge-sapa",
        "destination_slug": "sa-pa",
        "name": "Topas Ecolodge Sapa",
        "name_en": "Topas Ecolodge Sapa Mountain Resort",
        "category": "ecolodge",
        "star_rating": 4,
        "address": "Thôn Lếch Dao, Xã Thanh Bình, Sa Pa, Lào Cai",
        "lat": 22.2858,
        "lng": 103.9015,
        "description": "Khu nghỉ dưỡng sinh thái nằm trên đỉnh đồi hình nón với hồ bơi vô cực hướng trọn thung lũng Mường Hoa và ruộng bậc thang hùng vĩ.",
        "description_en": "Certified National Geographic Unique Lodge perched on a scenic hilltop with iconic infinity pools overlooking Muong Hoa Valley.",
        "amenities": [
            "2 hồ bơi vô cực nước ấm ngắm thung lũng",
            "Tắm lá thuốc người Dao Đỏ",
            "Bungalow đá granite bản địa",
            "Tour trekking bản làng",
        ],
        "price_from": Decimal("5200000"),
        "image_url": "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=80",
        "gallery": [
            "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=800&q=80"
        ],
        "partner_name": "Agoda",
        "partner_booking_url": "https://www.agoda.com/topas-ecolodge/hotel/sapa-vn.html?cid=startravels",
        "partner_commission_rate": Decimal("9.50"),
        "rating_average": Decimal("4.88"),
        "rating_count": 1640,
    },
    {
        "slug": "azerai-la-residence-hue",
        "destination_slug": "hue",
        "name": "Azerai La Residence Hue",
        "name_en": "Azerai La Residence Hue",
        "category": "heritage_hotel",
        "star_rating": 5,
        "address": "5 Lê Lợi, Phường Vĩnh Ninh, TP. Huế, Thừa Thiên Huế",
        "lat": 16.4583,
        "lng": 107.5786,
        "description": "Biệt thự Art Deco lịch sử thời thuộc địa soi bóng bên dòng sông Hương thơ mộng, đối diện Cố đô Huế.",
        "description_en": "Classic 1930s Art Deco mansion set on two and a half hectares along the fabled Perfume River facing the ancient Hue Citadel.",
        "amenities": [
            "Hồ bơi nước mặn hướng sông Hương",
            "Le Spa",
            "Du thuyền riêng ngắm hoàng hôn",
            "Nhà hàng ẩm thực cung đình Le Parfum",
        ],
        "price_from": Decimal("4600000"),
        "image_url": "https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=1200&q=80",
        "gallery": [
            "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80"
        ],
        "partner_name": "Booking.com",
        "partner_booking_url": "https://www.booking.com/hotel/vn/azerai-la-residence-hue.vi.html?aid=startravels",
        "partner_commission_rate": Decimal("8.00"),
        "rating_average": Decimal("4.89"),
        "rating_count": 870,
    },
    {
        "slug": "paradise-vietnam-cruises-halong",
        "destination_slug": "ha-long",
        "name": "Paradise Vietnam Grand Cruise & Hotel",
        "name_en": "Paradise Vietnam Grand Cruise Halong",
        "category": "luxury_cruise_hotel",
        "star_rating": 5,
        "address": "Cảng tàu khách quốc tế Tuần Châu, TP. Hạ Long, Quảng Ninh",
        "lat": 20.9325,
        "lng": 106.9942,
        "description": "Hải trình du thuyền ngủ đêm 5 sao cao cấp khám phá kỳ quan thiên nhiên thế giới Vịnh Hạ Long và Vịnh Lan Hạ.",
        "description_en": "Premier 5-star wooden junk & steel grand cruise fleet exploring the limestone karsts of UNESCO World Heritage Halong Bay.",
        "amenities": [
            "Cabin ban công riêng view vịnh",
            "Bể sục Jacuzzi bốn mùa",
            "Bữa tối hải sản thượng hạng",
            "Chèo thuyền kayak đảo Ti Tốp",
        ],
        "price_from": Decimal("6800000"),
        "image_url": "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=80",
        "gallery": [
            "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=800&q=80"
        ],
        "partner_name": "Booking.com",
        "partner_booking_url": "https://www.booking.com/hotel/vn/paradise-luxury-cruises.vi.html?aid=startravels",
        "partner_commission_rate": Decimal("10.00"),
        "rating_average": Decimal("4.90"),
        "rating_count": 1350,
    },
    {
        "slug": "tam-coc-garden-resort-ninh-binh",
        "destination_slug": "ninh-binh",
        "name": "Tam Coc Garden Resort",
        "name_en": "Tam Coc Garden Resort Ninh Binh",
        "category": "boutique_ecolodge",
        "star_rating": 4,
        "address": "Thôn Hải Nham, Xã Ninh Hải, Hoa Lư, Ninh Bình",
        "lat": 20.2198,
        "lng": 105.9327,
        "description": "Viên ngọc ẩn mình giữa cánh đồng lúa và những rặng núi đá vôi Tam Cốc, kết hợp tinh hoa làng quê Bắc Bộ và tiện nghi sang trọng.",
        "description_en": "Exclusive eco-chic oasis nestled among limestone karsts and emerald rice paddies in the tranquil Ninh Binh countryside.",
        "amenities": [
            "Hồ bơi ngoài trời giữa vườn cây",
            "Xe đạp dạo đồng lúa miễn phí",
            "Vườn rau hữu cơ",
            "Dịch vụ massage chân thảo dược",
        ],
        "price_from": Decimal("3800000"),
        "image_url": "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=80",
        "gallery": [
            "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"
        ],
        "partner_name": "Agoda",
        "partner_booking_url": "https://www.agoda.com/tam-coc-garden-resort/hotel/ninh-binh-vn.html?cid=startravels",
        "partner_commission_rate": Decimal("9.00"),
        "rating_average": Decimal("4.87"),
        "rating_count": 780,
    },
]

RESTAURANT_SEED = [
    {
        "slug": "gia-restaurant-hanoi",
        "destination_slug": "ha-noi",
        "name": "Gia Restaurant (Michelin 1 Star)",
        "name_en": "Gia Restaurant (Michelin 1 Star)",
        "cuisine_type": "contemporary_vietnamese",
        "price_range": "$$$$",
        "address": "61 Văn Miếu, Phường Văn Miếu, Quận Đống Đa, Hà Nội",
        "lat": 21.0289,
        "lng": 105.8364,
        "description": "Nhà hàng đạt 1 sao Michelin lấy cảm hứng từ kiến trúc Văn Miếu, sáng tạo thực đơn Tasting Menu theo mùa tôn vinh ẩm thực Việt Nam đương đại.",
        "description_en": "1-Michelin-starred fine dining culinary gem across from the Temple of Literature, offering seasonal tasting menus celebrating Vietnamese gastronomy.",
        "signature_dishes": [
            "Bò H'Mông sốt tương bần",
            "Bánh tráng cuốn cá tầm Sapa",
            "Kem cốm Làng Vòng & sương sáo",
        ],
        "opening_hours": {"tue_sun": "18:00 - 22:30", "monday": "Đóng cửa"},
        "image_url": "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1200&q=80",
        "gallery": [
            "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=800&q=80"
        ],
        "contact_type": "url",
        "contact_value": "https://gia-hanoi.com/reservation?ref=startravels",
        "partner_commission_rate": Decimal("5.00"),
        "rating_average": Decimal("4.97"),
        "rating_count": 640,
    },
    {
        "slug": "tam-vi-restaurant-hanoi",
        "destination_slug": "ha-noi",
        "name": "Tầm Vị (Michelin 1 Star)",
        "name_en": "Tam Vi Traditional Northern Vietnamese (Michelin 1 Star)",
        "cuisine_type": "traditional_northern",
        "price_range": "$$",
        "address": "4B Yên Thế, Phường Điện Biên, Quận Ba Đình, Hà Nội",
        "lat": 21.0298,
        "lng": 105.8385,
        "description": "Ngôi nhà gỗ cổ kính đậm chất Bắc Bộ xưa, nổi tiếng với những mâm cơm gia đình chuẩn vị Hà Nội truyền thống đạt 1 sao Michelin.",
        "description_en": "Michelin-starred Northern Vietnamese home-cooking served in a charming antique wooden house reminiscent of old Hanoi.",
        "signature_dishes": [
            "Canh cua mồng tơi & cà pháo",
            "Thịt kho tàu nước dừa",
            "Chả ốc chiên giòn lá lốt",
            "Đậu phụ rán chấm mắm tôm",
        ],
        "opening_hours": {"mon_sun": "11:00 - 14:00, 17:30 - 21:30"},
        "image_url": "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80",
        "gallery": [
            "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80"
        ],
        "contact_type": "phone",
        "contact_value": "tel:+84986323123",
        "partner_commission_rate": Decimal("5.00"),
        "rating_average": Decimal("4.90"),
        "rating_count": 1420,
    },
    {
        "slug": "anan-saigon",
        "destination_slug": "can-tho",
        "name": "Ănăn Saigon (Michelin 1 Star)",
        "name_en": "Anan Saigon Fine Dining (Michelin 1 Star)",
        "cuisine_type": "modern_vietnamese",
        "price_range": "$$$$",
        "address": "89 Tôn Thất Đạm, Bến Nghé, Quận 1, TP. Hồ Chí Minh",
        "lat": 10.7718,
        "lng": 106.7032,
        "description": "Nhà hàng tiên phong phong cách Cuisine Échappée của Bếp trưởng Peter Cường Franklin nằm giữa khu chợ ướt Chợ Cũ lịch sử Sài Gòn.",
        "description_en": "Ranked among Asia's 50 Best Restaurants and awarded 1 Michelin Star, Anan transforms Vietnamese street food into haute cuisine.",
        "signature_dishes": [
            "Bánh xèo taco trứng cá tầm",
            "Phở bò Wagyu thố đá",
            "Pizza Đà Lạt nướng than hoa",
            "Bánh mì One-Bite",
        ],
        "opening_hours": {"tue_sun": "17:00 - 23:00", "monday": "Đóng cửa"},
        "image_url": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80",
        "gallery": [
            "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=800&q=80"
        ],
        "contact_type": "url",
        "contact_value": "https://anansaigon.com/booking?ref=startravels",
        "partner_commission_rate": Decimal("6.00"),
        "rating_average": Decimal("4.95"),
        "rating_count": 1850,
    },
    {
        "slug": "madame-lan-danang",
        "destination_slug": "da-nang",
        "name": "Nhà Hàng Madame Lân Đà Nẵng",
        "name_en": "Madame Lan Da Nang Heritage Dining",
        "cuisine_type": "central_vietnamese",
        "price_range": "$$",
        "address": "04 Bạch Đằng, Thạch Thang, Hải Châu, Đà Nẵng",
        "lat": 16.0792,
        "lng": 108.2238,
        "description": "Không gian phố cổ thu nhỏ bên bờ sông Hàn thơ mộng, quy tụ hơn 200 món ăn tinh hoa ẩm thực 3 miền và đặc sản xứ Quảng.",
        "description_en": "Charming riverside restaurant reminiscent of ancient Hoi An streets, serving over 200 traditional delicacies across Vietnam.",
        "signature_dishes": [
            "Bánh xèo tôm nhảy giòn rụm",
            "Mì Quảng gà ta rau Trà Quế",
            "Gỏi cá Nam Ô",
            "Bún chả cá Đà Nẵng",
        ],
        "opening_hours": {"mon_sun": "06:30 - 22:00"},
        "image_url": "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1200&q=80",
        "gallery": [
            "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80"
        ],
        "contact_type": "url",
        "contact_value": "https://madamelan.vn/dat-ban?ref=startravels",
        "partner_commission_rate": Decimal("5.00"),
        "rating_average": Decimal("4.85"),
        "rating_count": 3200,
    },
    {
        "slug": "morning-glory-original-hoi-an",
        "destination_slug": "hoi-an",
        "name": "Morning Glory Original Hội An",
        "name_en": "Morning Glory Original Hoi An",
        "cuisine_type": "hoi_an_specialties",
        "price_range": "$$",
        "address": "106 Nguyễn Thái Học, Phường Minh An, Hội An, Quảng Nam",
        "lat": 15.8771,
        "lng": 108.3283,
        "description": "Điểm hẹn ẩm thực nổi tiếng bậc nhất phố cổ Hội An của đầu bếp Vy, chuyên phục vụ cao lầu, hoành thánh và bánh hoa hồng trắng chính gốc.",
        "description_en": "Celebrated culinary institution by Chef Ms. Vy, famous for authentic Cao Lau noodles, white rose dumplings, and crispy wontons.",
        "signature_dishes": [
            "Cao lầu thịt xíu Hội An",
            "Bánh bao bánh vạc (White Rose)",
            "Hoành thánh chiên sốt tôm thịt",
            "Cơm gà phố Hội",
        ],
        "opening_hours": {"mon_sun": "10:00 - 22:30"},
        "image_url": "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80",
        "gallery": [
            "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80"
        ],
        "contact_type": "phone",
        "contact_value": "tel:+842353241555",
        "partner_commission_rate": Decimal("5.00"),
        "rating_average": Decimal("4.86"),
        "rating_count": 2740,
    },
    {
        "slug": "la-badiane-hanoi",
        "destination_slug": "ha-noi",
        "name": "La Badiane Hanoi (French-Vietnamese Fusion)",
        "name_en": "La Badiane French-Asian Gastronomy",
        "cuisine_type": "french_asian_fusion",
        "price_range": "$$$",
        "address": "10 Nam Ngư, Cửa Nam, Hoàn Kiếm, Hà Nội",
        "lat": 21.0264,
        "lng": 105.8437,
        "description": "Ngôi biệt thự Pháp thanh lịch tràn ngập ánh sáng tự nhiên với giếng trời và cây xanh, giao thoa tinh tế giữa ẩm thực Pháp và gia vị nhiệt đới Á Đông.",
        "description_en": "Sophisticated French colonial villa offering creative fusion gastronomy infused with exotic spices and fine wines.",
        "signature_dishes": [
            "Gan ngỗng áp chảo sốt quả sung",
            "Cá chẽm nướng thảo mộc hồi quế",
            "Bò nướng tảng sốt tiêu đen Phú Quốc",
        ],
        "opening_hours": {"mon_sat": "11:30 - 14:00, 18:00 - 22:00", "sunday": "Đóng cửa"},
        "image_url": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
        "gallery": [
            "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=800&q=80"
        ],
        "contact_type": "url",
        "contact_value": "https://labadiane-hanoi.com/booking?ref=startravels",
        "partner_commission_rate": Decimal("6.50"),
        "rating_average": Decimal("4.88"),
        "rating_count": 890,
    },
    {
        "slug": "the-deck-saigon",
        "destination_slug": "can-tho",
        "name": "The Deck Saigon Riverside",
        "name_en": "The Deck Saigon Pan-Asian Riverside",
        "cuisine_type": "pan_asian_riverside",
        "price_range": "$$$$",
        "address": "38 Nguyễn Ư Dĩ, Thảo Điền, TP. Thủ Đức, TP. Hồ Chí Minh",
        "lat": 10.8062,
        "lng": 106.7351,
        "description": "Nhà hàng ngắm hoàng hôn bên bờ sông Sài Gòn lãng mạn nhất miền Nam, phục vụ ẩm thực Á đương đại và cocktail nhiệt đới tinh tế.",
        "description_en": "Stunning riverside retreat on the banks of Saigon River, renowned for sensational sunsets, pan-Asian flavors and craft cocktails.",
        "signature_dishes": [
            "Hàu Nha Trang sốt ponzu",
            "Cua lột chiên giòn sốt ớt cay",
            "Bò Úc nướng than hoa sốt tương mè",
        ],
        "opening_hours": {"mon_sun": "08:00 - 23:00"},
        "image_url": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
        "gallery": [
            "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=800&q=80"
        ],
        "contact_type": "url",
        "contact_value": "https://thedecksaigon.com/reservation?ref=startravels",
        "partner_commission_rate": Decimal("7.00"),
        "rating_average": Decimal("4.91"),
        "rating_count": 1650,
    },
    {
        "slug": "nha-hang-hai-san-cua-vang-halong",
        "destination_slug": "ha-long",
        "name": "Nhà Hàng Hải Sản Cua Vàng Bãi Cháy",
        "name_en": "Golden Crab Seafood Restaurant Halong",
        "cuisine_type": "fresh_seafood",
        "price_range": "$$$",
        "address": "32 Phan Chu Trinh, Bãi Cháy, TP. Hạ Long, Quảng Ninh",
        "lat": 20.9572,
        "lng": 107.0398,
        "description": "Nhà hàng hải sản tươi sống cao cấp bậc nhất vịnh Hạ Long, nổi danh với lẩu cua biển nấu niêu đất và hải sản đánh bắt trong ngày.",
        "description_en": "Premier premium seafood destination in Halong Bay, famed for claypot golden crab hotpot and fresh ocean delicacies.",
        "signature_dishes": [
            "Lẩu cua vàng niêu đất bí truyền",
            "Tôm hùm bông nướng phô mai",
            "Tu hài nướng mỡ hành",
            "Mực sim xào chua ngọt",
        ],
        "opening_hours": {"mon_sun": "10:00 - 22:30"},
        "image_url": "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1200&q=80",
        "gallery": [
            "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80"
        ],
        "contact_type": "phone",
        "contact_value": "tel:+842033819919",
        "partner_commission_rate": Decimal("5.00"),
        "rating_average": Decimal("4.82"),
        "rating_count": 1410,
    },
    {
        "slug": "ngu-uyen-co-do-hue",
        "destination_slug": "hue",
        "name": "Nhà Hàng Ngự Uyển Cung Đình Huế",
        "name_en": "Ngu Uyen Royal Hue Court Cuisine",
        "cuisine_type": "royal_hue_cuisine",
        "price_range": "$$$",
        "address": "25 Nguyễn Huệ, Vĩnh Ninh, TP. Huế, Thừa Thiên Huế",
        "lat": 16.4601,
        "lng": 107.5852,
        "description": "Trải nghiệm yến tiệc cung đình triều Nguyễn với trang phục hoàng gia, nhã nhạc cung đình và nghệ thuật tỉa củ hoa long phụng tinh xảo.",
        "description_en": "Royal court banquet dining experience showcasing imperial Nguyen Dynasty gastronomy, royal costumes, and UNESCO Court Music.",
        "signature_dishes": [
            "Nem công chả phượng hoàng cung",
            "Cơm cung đình gói lá sen",
            "Bánh bèo chén tôm cháy",
            "Chè hạt sen long nhãn",
        ],
        "opening_hours": {"mon_sun": "10:30 - 14:00, 17:30 - 21:30"},
        "image_url": "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80",
        "gallery": [
            "https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=800&q=80"
        ],
        "contact_type": "phone",
        "contact_value": "tel:+842343888999",
        "partner_commission_rate": Decimal("6.00"),
        "rating_average": Decimal("4.84"),
        "rating_count": 920,
    },
    {
        "slug": "bep-quan-hanoi",
        "destination_slug": "ha-noi",
        "name": "Bếp Quán — Ẩm Thực 3 Miền",
        "name_en": "Bep Quan Vietnamese Heritage Bistro",
        "cuisine_type": "vietnamese_comfort_food",
        "price_range": "$$",
        "address": "10 Thợ Nhuộm, Cửa Nam, Hoàn Kiếm, Hà Nội",
        "lat": 21.0261,
        "lng": 105.8465,
        "description": "Không gian ẩm thực ấm cúng với hơn 80 món ngon tinh túy khắp mọi miền quê Việt Nam, từ cơm niêu đến hải sản xào thơm nức.",
        "description_en": "Cozy heritage bistro celebrated for comforting family feasts, claypot rice and fragrant specialties from all Vietnamese regions.",
        "signature_dishes": [
            "Cơm niêu cá kho tộ",
            "Bắp bò ngâm mắm nhĩ",
            "Lẩu riêu cua bắp bò sườn sụn",
            "Chè bưởi An Giang",
        ],
        "opening_hours": {"mon_sun": "10:00 - 14:30, 17:00 - 22:30"},
        "image_url": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80",
        "gallery": [
            "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=800&q=80"
        ],
        "contact_type": "phone",
        "contact_value": "tel:+841900636932",
        "partner_commission_rate": Decimal("5.00"),
        "rating_average": Decimal("4.80"),
        "rating_count": 1780,
    },
]


class Command(BaseCommand):
    help = "Seed 10 luxury Accommodations and 10 top Restaurants with partner referral links"

    def handle(self, *args, **options):
        self.stdout.write("Seeding Accommodations...")
        created_accs = []
        for data in ACCOMMODATION_SEED:
            dest = Destination.objects.filter(slug=data["destination_slug"]).first()
            if not dest:
                dest = Destination.objects.first()
            if not dest:
                dest = Destination.objects.create(
                    slug=data["destination_slug"],
                    name=data["destination_slug"].replace("-", " ").title(),
                )

            loc = Point(data["lng"], data["lat"], srid=4326)
            acc, created = Accommodation.objects.update_or_create(
                slug=data["slug"],
                defaults={
                    "destination": dest,
                    "name": data["name"],
                    "name_en": data["name_en"],
                    "category": data["category"],
                    "star_rating": data["star_rating"],
                    "address": data["address"],
                    "location": loc,
                    "description": data["description"],
                    "description_en": data["description_en"],
                    "amenities": data["amenities"],
                    "price_from": data["price_from"],
                    "image_url": data["image_url"],
                    "gallery": data["gallery"],
                    "partner_name": data["partner_name"],
                    "partner_booking_url": data["partner_booking_url"],
                    "partner_commission_rate": data["partner_commission_rate"],
                    "rating_average": data["rating_average"],
                    "rating_count": data["rating_count"],
                    "is_active": True,
                },
            )
            created_accs.append(acc)

        self.stdout.write(f"Successfully seeded {len(created_accs)} Accommodations.")

        self.stdout.write("Seeding Restaurants...")
        created_ress = []
        for data in RESTAURANT_SEED:
            dest = Destination.objects.filter(slug=data["destination_slug"]).first()
            if not dest:
                dest = Destination.objects.first()
            if not dest:
                dest = Destination.objects.create(
                    slug=data["destination_slug"],
                    name=data["destination_slug"].replace("-", " ").title(),
                )

            loc = Point(data["lng"], data["lat"], srid=4326)
            res, created = Restaurant.objects.update_or_create(
                slug=data["slug"],
                defaults={
                    "destination": dest,
                    "name": data["name"],
                    "name_en": data["name_en"],
                    "cuisine_type": data["cuisine_type"],
                    "price_range": data["price_range"],
                    "address": data["address"],
                    "location": loc,
                    "description": data["description"],
                    "description_en": data["description_en"],
                    "signature_dishes": data["signature_dishes"],
                    "opening_hours": data["opening_hours"],
                    "image_url": data["image_url"],
                    "gallery": data["gallery"],
                    "contact_type": data["contact_type"],
                    "contact_value": data["contact_value"],
                    "partner_commission_rate": data["partner_commission_rate"],
                    "rating_average": data["rating_average"],
                    "rating_count": data["rating_count"],
                    "is_active": True,
                },
            )
            created_ress.append(res)

        self.stdout.write(f"Successfully seeded {len(created_ress)} Restaurants.")

        # Seed sample referral tracking bookings to populate admin dashboard
        self.stdout.write("Seeding demo referral tracking bookings for analytics dashboard...")
        demo_referrals = [
            # Capella Hanoi
            {
                "acc": created_accs[1],
                "count": 18,
                "has_lead": 6,
                "lead_name": "Trần Hải Đăng",
                "lead_phone": "0912345678",
            },
            # InterContinental Danang
            {
                "acc": created_accs[2],
                "count": 24,
                "has_lead": 8,
                "lead_name": "Nguyễn Mai Phương",
                "lead_phone": "0987654321",
            },
            # Metropole Hanoi
            {
                "acc": created_accs[0],
                "count": 15,
                "has_lead": 4,
                "lead_name": "Lê Hoàng Quân",
                "lead_phone": "0903123456",
            },
            # Gia Restaurant
            {
                "res": created_ress[0],
                "count": 22,
                "has_lead": 9,
                "lead_name": "Vũ Minh Tâm",
                "lead_phone": "0934567890",
            },
            # Anan Saigon
            {
                "res": created_ress[2],
                "count": 30,
                "has_lead": 11,
                "lead_name": "Đỗ Thu Trang",
                "lead_phone": "0978901234",
            },
        ]

        seeded_booking_count = 0
        for item in demo_referrals:
            acc = item.get("acc")
            res = item.get("res")
            for i in range(item["count"]):
                code_prefix = "ACC" if acc else "RES"
                code_suffix = uuid.uuid4().hex[:6].upper()
                booking_code = f"REF-{code_prefix}-{code_suffix}"
                is_lead = i < item.get("has_lead", 0)
                Booking.objects.get_or_create(
                    booking_code=booking_code,
                    defaults={
                        "item_type": Booking.ItemType.ACCOMMODATION_REFERRAL
                        if acc
                        else Booking.ItemType.RESTAURANT_REFERRAL,
                        "accommodation": acc,
                        "restaurant": res,
                        "referral_partner_name": acc.partner_name if acc else res.name,
                        "referral_target_url": acc.partner_booking_url
                        if acc
                        else res.contact_value,
                        "contact_name": item["lead_name"] if is_lead else "",
                        "contact_phone": item["lead_phone"] if is_lead else "",
                        "status": Booking.Status.REFERRED,
                        "total_amount": None,
                        "unit_price": None,
                        "payment_method": "referral",
                        "payment_status": "not_applicable",
                        "created_at": timezone.now(),
                    },
                )
                seeded_booking_count += 1

        self.stdout.write(
            f"Seeded {seeded_booking_count} demo referral bookings for admin analytics."
        )
