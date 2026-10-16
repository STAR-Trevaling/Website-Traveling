"""
Curated Travel Info Hub (Cẩm Nang Thông Tin Du Lịch) Knowledge Chunks for RAG Assistant.
Structured and verified dataset covering Weather, Visa, Transport, Safety, Culture, Currency, and Festivals.
"""

VIETNAM_TRAVEL_GUIDES = [
    # ─── 1. VISA & ENTRY ────────────────────────────────────────────────────────
    {
        "slug": "guide-visa-entry-policy",
        "title": "Chính Sách Thị Thực & Nhập Cảnh Việt Nam 2026",
        "title_en": "Vietnam Visa Policies, E-Visa & Entry Guidelines 2026",
        "category": "visa",
        "content_vi": (
            "Việt Nam hiện áp dụng chính sách thị thực cởi mở và linh hoạt cho du khách quốc tế:\n"
            "1. Miễn thị thực đơn phương 45 ngày: Áp dụng cho công dân 25 quốc gia gồm Đức, Pháp, Ý, "
            "Tây Ban Nha, Anh, Nhật Bản, Hàn Quốc, Nga, Thụy Điển, Na Uy, Đan Mạch, Phần Lan, Belarus, "
            "Bỉ, Bulgaria, Croatia, Séc, Hungary, Luxembourg, Hà Lan, Ba Lan, Romania, Slovakia, Slovenia, Thụy Sĩ. "
            "Hộ chiếu cần còn hạn tối thiểu 6 tháng và có vé máy bay khứ hồi.\n"
            "2. Miễn thị thực song phương ASEAN: 30 ngày cho Singapore, Malaysia, Thái Lan, Indonesia, "
            "Campuchia, Lào; 21 ngày cho Philippines; 14 ngày cho Brunei và Myanmar.\n"
            "3. Miễn thị thực 30 ngày Đặc khu Phú Quốc: Áp dụng cho người nước ngoài nhập cảnh trực tiếp Phú Quốc "
            "bằng đường hàng không/đường biển hoặc quá cảnh qua sân bay quốc tế Việt Nam mà không rời khu vực cách ly.\n"
            "4. Thị thực điện tử (E-visa 90 ngày): Cấp cho công dân tất cả quốc gia và vùng lãnh thổ trên thế giới. "
            "Có giá trị nhập cảnh một lần (lệ phí 25 USD) hoặc nhiều lần (lệ phí 50 USD). Thời gian xử lý từ 3-5 ngày làm việc. "
            "Cổng thông tin cấp e-visa chính thức duy nhất của Chính phủ Việt Nam: https://evisa.gov.vn (hoặc thithucdientu.gov.vn).\n"
            "Lưu ý: Du khách nên nộp hồ sơ e-visa tối thiểu 2 tuần trước chuyến đi và cảnh giác với các website dịch vụ giả mạo."
        ),
        "content_en": (
            "Vietnam provides progressive and flexible visa regulations for global travelers:\n"
            "1. 45-Day Unilateral Visa Exemption: Granted to passport holders of 25 nations including Germany, France, Italy, "
            "Spain, United Kingdom, Japan, South Korea, Russia, Sweden, Norway, Denmark, Finland, Belarus, Belgium, Bulgaria, "
            "Croatia, Czech Republic, Hungary, Luxembourg, Netherlands, Poland, Romania, Slovakia, Slovenia, Switzerland. "
            "Passports must be valid for at least 6 months with proof of onward/return travel.\n"
            "2. Bilateral Exemption: 30 days for ASEAN member states (Singapore, Malaysia, Thailand, Indonesia, Cambodia, Laos), "
            "21 days for Philippines, 14 days for Brunei & Myanmar.\n"
            "3. 30-Day Phu Quoc Special Exemption: Available for foreign visitors flying directly or transiting to Phu Quoc Island.\n"
            "4. 90-Day Universal E-Visa: Available to citizens of all countries. Single-entry (25 USD) or multiple-entry (50 USD). "
            "Processing time takes 3-5 business days via the official national portal: https://evisa.gov.vn.\n"
            "Advice: Apply at least two weeks before travel and beware of third-party fraudulent websites."
        ),
        "metadata": {
            "category": "guide_visa",
            "guide_route": "/guide/visa",
            "official_portal": "https://evisa.gov.vn",
            "exemption_days": 45,
            "evisa_validity": "90 days (Single or Multiple)",
            "evisa_fees": "25 USD (single), 50 USD (multiple)",
            "processing_time": "3-5 business days",
            "keywords": [
                "visa",
                "e-visa",
                "thị thực",
                "nhập cảnh",
                "miễn thị thực",
                "hộ chiếu",
                "passport",
                "evisa.gov.vn",
            ],
        },
    },
    # ─── 2. WEATHER & TRAVEL SEASONS ──────────────────────────────────────────
    {
        "slug": "guide-weather-seasons",
        "title": "Thời Tiết 3 Miền & Mùa Du Lịch Lý Tưởng 12 Điểm Đến",
        "title_en": "Vietnam Climate Patterns & Ideal Travel Seasons for 12 Destinations",
        "category": "weather",
        "content_vi": (
            "Khí hậu Việt Nam trải dài qua nhiều vĩ độ, phân chia rõ rệt giữa 3 miền:\n"
            "- Miền Bắc (Hà Nội, Sa Pa, Hạ Long, Ninh Bình, Hà Giang): Có 4 mùa rõ rệt. Mùa xuân (tháng 2-4) se lạnh, mưa phùn; "
            "Mùa hè (tháng 5-8) nóng ẩm; Mùa thu (tháng 9-11) là thời điểm vàng đẹp nhất với nắng vàng, gió heo may; "
            "Mùa đông (tháng 12-1) rét đậm, vùng cao Sa Pa/Mẫu Sơn có thể xuất hiện băng tuyết.\n"
            "- Miền Trung (Đà Nẵng, Hội An, Huế, Nha Trang, Quy Nhơn): Mùa khô từ tháng 1 đến tháng 8, biển xanh cát trắng nắng đẹp; "
            "Mùa mưa bão tập trung từ tháng 9 đến tháng 11, đặc biệt Hội An và Huế thường ngập lụt cục bộ vào tháng 10-11.\n"
            "- Miền Nam & Tây Nguyên (TP.HCM, Cần Thơ, Phú Quốc, Đà Lạt): Chỉ có 2 mùa mưa và khô. Mùa khô (tháng 11 đến tháng 4) "
            "nắng ráo, biển Phú Quốc êm như mặt gương; Mùa mưa (tháng 5 đến tháng 10) có những cơn mưa rào nhanh vào buổi chiều rồi tạnh ngay.\n"
            "Khuyến nghị thời điểm vàng theo điểm đến:\n"
            "+ Sa Pa: Tháng 9-10 (lúa chín ruộng bậc thang), tháng 12-2 (săn mây & hoa mận đào).\n"
            "+ Vịnh Hạ Long: Tháng 3-5 & tháng 9-11 (trời trong xanh, biển lặng lý tưởng đi du thuyền).\n"
            "+ Hà Giang: Tháng 9-10 (lúa Hoàng Su Phì), tháng 10-12 (hoa tam giác mạch).\n"
            "+ Hội An & Đà Nẵng: Tháng 2-7 (nắng rực rỡ, lễ hội pháo hoa DIFF).\n"
            "+ Phú Quốc: Tháng 11-4 (biển êm, lặn ngắm san hô đẹp nhất năm)."
        ),
        "content_en": (
            "Vietnam features distinct regional climate zones across its elongated geography:\n"
            "- Northern Vietnam (Hanoi, Sa Pa, Ha Long, Ninh Binh, Ha Giang): Four distinct seasons. Autumn (Sep-Nov) is the golden window "
            "with crisp air and sunny skies. Winter (Dec-Jan) is chilly and foggy with occasional snow/frost in Sa Pa peaks. "
            "Summer (May-Aug) brings tropical warmth and brief showers.\n"
            "- Central Vietnam (Da Nang, Hoi An, Hue, Nha Trang): Dry and sunny from Jan to Aug. Rainy and storm season spans "
            "Sep to Nov, when Hoi An ancient town may experience localized tidal flooding in October.\n"
            "- Southern Vietnam & Islands (Phu Quoc, Ho Chi Minh City, Mekong Delta): Two seasons. Dry season (Nov to Apr) offers "
            "calm turquoise seas in Phu Quoc. Wet season (May to Oct) sees brief afternoon showers without spoiling whole days.\n"
            "Key Destination Highlights:\n"
            "+ Sa Pa: Golden rice terraces in Sep-Oct, peak cloud hunting from Dec-Feb.\n"
            "+ Ha Long Bay: Optimal cruising in Mar-May & Sep-Nov.\n"
            "+ Da Nang & Hoi An: Prime beach weather from Feb to Jul.\n"
            "+ Phu Quoc: Peak paradise conditions from Nov to Apr."
        ),
        "metadata": {
            "category": "guide_weather",
            "guide_route": "/guide/weather",
            "north_golden_months": [9, 10, 11],
            "central_golden_months": [2, 3, 4, 5, 6, 7],
            "south_golden_months": [11, 12, 1, 2, 3, 4],
            "keywords": [
                "thời tiết",
                "mùa du lịch",
                "khí hậu",
                "weather",
                "best time to visit",
                "sa pa",
                "hạ long",
                "phú quốc",
                "mùa mưa",
                "mùa bão",
            ],
        },
    },
    # ─── 3. TRANSPORTATION & TRANSFERS ────────────────────────────────────────
    {
        "slug": "guide-domestic-transport",
        "title": "Di Chuyển Nội Địa & Chuyển Tiếp Sân Bay 12 Điểm Đến",
        "title_en": "Vietnam Domestic Transportation & Airport Transfer Guide",
        "category": "transport",
        "content_vi": (
            "Hệ thống giao thông du lịch nội địa tại Việt Nam rất đa dạng và thuận tiện:\n"
            "1. Hàng không: Các hãng Vietnam Airlines, Vietjet Air, Bamboo Airways kết nối hơn 22 sân bay nội địa. "
            "Chặng bay trục vàng Hà Nội - Đà Nẵng - TP.HCM có hàng chục chuyến mỗi ngày, thời gian bay chỉ 1h15 - 2h.\n"
            "2. Tàu hỏa Bắc - Nam (Đường sắt Thống Nhất): Trải nghiệm toa giường nằm cao cấp SE1/SE3 ngắm đèo Hải Vân "
            "tuyệt đẹp ven biển miền Trung.\n"
            "3. Limousine Dcar & Xe khách cao cấp: Phù hợp các cung đường cao tốc 2-4 tiếng như Hà Nội - Hạ Long (2h), "
            "Hà Nội - Sa Pa (5h cao tốc Nội Bài - Lào Cai), Sài Gòn - Vũng Tàu (2h), Sài Gòn - Mũi Né (2.5h cao tốc Phan Thiết).\n"
            "4. Đón tiễn sân bay về trung tâm:\n"
            "+ Sân bay Nội Bài -> Trung tâm Hà Nội (28 km): Taxi/Grab khoảng 250.000 - 350.000 VNĐ (40 phút), Xe bus 86 chất lượng cao (45.000 VNĐ).\n"
            "+ Sân bay Đà Nẵng -> Phố Cổ Hội An (30 km): Xe riêng/Grab khoảng 280.000 - 380.000 VNĐ (45 phút).\n"
            "+ Sân bay Cam Ranh -> Trung tâm Nha Trang (35 km): Xe buýt Đất Mới (60.000 VNĐ), Taxi khoảng 300.000 - 400.000 VNĐ.\n"
            "+ Sân bay Liên Khương -> Trung tâm Đà Lạt (30 km): Taxi khoảng 250.000 - 300.000 VNĐ.\n"
            "+ Sân bay Tân Sơn Nhất -> Quận 1 TP.HCM (8 km): Grab/Taxi khoảng 120.000 - 180.000 VNĐ.\n"
            "5. Mẹo đặt xe an toàn: Khuyên dùng ứng dụng gọi xe công nghệ (Grab, Xanh SM) có hiển thị sẵn lộ trình và giá tiền minh bạch."
        ),
        "content_en": (
            "Getting around Vietnam is efficient, affordable, and scenic:\n"
            "1. Domestic Flights: Vietnam Airlines, Vietjet Air, and Bamboo Airways link 22+ airports. "
            "The key trunk route Hanoi - Da Nang - Ho Chi Minh City operates multiple flights per hour (1h15m - 2h).\n"
            "2. North-South Railway (Reunification Express): Renowned train routes like SE1/SE3 feature soft sleepers "
            "and pass through the breathtaking Hai Van Pass overlooking the East Sea.\n"
            "3. VIP Limousines: 9-seater luxury Dcar limousines run on modern expressways: Hanoi - Ha Long (2h), "
            "Hanoi - Sa Pa (5h), Saigon - Mui Ne (2.5h).\n"
            "4. Key Airport Transfers:\n"
            "+ Noi Bai (HAN) to Hanoi Old Quarter (28 km): 250k-350k VND by Grab/Taxi (40 mins), or Bus 86 (45k VND).\n"
            "+ Da Nang (DAD) to Hoi An Ancient Town (30 km): 280k-380k VND by private transfer/Grab (45 mins).\n"
            "+ Cam Ranh (CXR) to Nha Trang (35 km): Shuttle bus (60k VND) or Taxi (300k-400k VND).\n"
            "+ Lien Khuong (DLI) to Da Lat (30 km): Taxi 250k-300k VND (35 mins).\n"
            "+ Tan Son Nhat (SGN) to District 1 (8 km): Grab/Taxi 120k-180k VND.\n"
            "5. Tip: Use Grab or Xanh SM electric ride-hailing apps for transparent upfront fares."
        ),
        "metadata": {
            "category": "guide_transport",
            "guide_route": "/guide/transport",
            "modes": ["flights", "trains", "limousines", "ride_hailing"],
            "apps": ["Grab", "Xanh SM"],
            "keywords": [
                "di chuyển",
                "máy bay",
                "tàu hỏa",
                "limousine",
                "xe khách",
                "đón sân bay",
                "grab",
                "xanh sm",
                "transport",
                "airport transfer",
            ],
        },
    },
    # ─── 4. SAFETY & EMERGENCY ────────────────────────────────────────────────
    {
        "slug": "guide-safety-emergency",
        "title": "An Toàn Du Lịch, Số Khẩn Cấp Quốc Gia & Bảo Hiểm",
        "title_en": "Vietnam Travel Safety, National Emergency Hotlines & Health Guidelines",
        "category": "safety",
        "content_vi": (
            "Việt Nam là một trong những quốc gia an toàn hàng đầu châu Á cho du khách. Tuy nhiên, du khách cần lưu ý các quy tắc an toàn cơ bản:\n"
            "1. Các số điện thoại khẩn cấp quốc gia (Miễn phí cước cuộc gọi 24/7):\n"
            "- 113: Cảnh sát / Công an phản ứng nhanh (xử lý an ninh trật tự, mất cắp, gây rối).\n"
            "- 114: Cảnh sát Phòng cháy Chữa cháy & Cứu nạn cứu hộ.\n"
            "- 115: Cấp cứu y tế & vận chuyển bệnh nhân khẩn cấp.\n"
            "- 112: Tìm kiếm cứu nạn cứu hộ thiên tai quốc gia trên phạm vi toàn quốc.\n"
            "2. An toàn tắm biển: Quan sát kỹ cờ hiệu cảnh báo tại bãi tắm. Tuyệt đối không bơi khi có cờ đỏ. "
            "Biết cách nhận biết và thoát khỏi dòng chảy xa bờ (Rip Current) bằng cách bơi song song với bờ biển, không cố bơi ngược dòng.\n"
            "3. An toàn leo núi & trekking (Fansipan, Bạch Mộc Lương Tử, Tà Xùa): Bắt buộc đi cùng hướng dẫn viên/porter bản địa, "
            "chuẩn bị giày leo núi chuyên dụng có độ bám, áo mưa bộ, thuốc men cá nhân và đăng ký trước với ban quản lý rừng quốc gia.\n"
            "4. An toàn lái xe máy (Hà Giang Loop, đèo Hải Vân): Chỉ lái xe khi có bằng lái quốc tế (IDP) hợp lệ, đội mũ bảo hiểm chuẩn, "
            "kiểm tra hệ thống phanh trước khi khởi hành, về số thấp khi xuống đèo dốc và tuyệt đối không tắt máy thả trôi xe.\n"
            "5. Khuyến nghị bảo hiểm: Luôn trang bị bảo hiểm du lịch quốc tế chi trả viện phí khẩn cấp và bảo hiểm tai nạn cá nhân."
        ),
        "content_en": (
            "Vietnam is widely recognized as one of Southeast Asia's safest travel destinations. Keep these essential guidelines in mind:\n"
            "1. National Emergency Hotlines (Toll-Free, 24/7):\n"
            "- 113: Police / Emergency Public Security.\n"
            "- 114: Fire Department & Rescue Operations.\n"
            "- 115: Medical Ambulance & Health Emergency.\n"
            "- 112: National Disaster Search & Rescue Operations.\n"
            "2. Beach Safety & Rip Currents: Observe lifeguard flags. Never swim near red flags. If caught in a rip current, "
            "remain calm and swim parallel to the shoreline until free of the current.\n"
            "3. Mountain Trekking Safety: Trekking peaks like Fansipan or Ta Xua requires licensed local Hmong guides/porters, "
            "sturdy trail footwear, rain layers, and proper registration with National Park authorities.\n"
            "4. Motorbike Riding (Ha Giang Loop, mountain passes): Carry a valid International Driving Permit (IDP), "
            "wear certified helmets, test brakes, use low gears downhill, and never coast in neutral.\n"
            "5. Travel Insurance: Highly recommended to carry comprehensive medical evacuation and travel insurance."
        ),
        "metadata": {
            "category": "guide_safety",
            "guide_route": "/guide/safety",
            "emergency_numbers": {
                "police": "113",
                "fire": "114",
                "ambulance": "115",
                "rescue": "112",
            },
            "keywords": [
                "an toàn",
                "khẩn cấp",
                "công an 113",
                "cứu hỏa 114",
                "cấp cứu 115",
                "bảo hiểm",
                "safety",
                "emergency",
                "rip current",
                "trekking",
            ],
        },
    },
    # ─── 5. CULTURE & ETIQUETTE ───────────────────────────────────────────────
    {
        "slug": "guide-culture-etiquette",
        "title": "Văn Hóa Ứng Xử, Trang Phục Đền Chùa & Phép Tắc Giao Tiếp",
        "title_en": "Vietnamese Cultural Etiquette, Temple Dress Codes & Social Norms",
        "category": "culture",
        "content_vi": (
            "Văn hóa Việt Nam coi trọng sự tôn trọng, lòng hiếu khách và nét đẹp truyền thống:\n"
            "1. Trang phục khi viếng thăm Đền, Chùa, Di tích lịch sử (Đại Nội Huế, Văn Miếu, Chùa Trấn Quốc, v.v.):\n"
            "- Bắt buộc che kín vai và đầu gối (quần dài hoặc váy qua gối, áo có tay).\n"
            "- Tháo bỏ mũ nón, kính râm và cởi giày dép khi bước vào chánh điện hoặc khu vực thờ tự linh thiêng.\n"
            "- Không chạm vào tượng Phật, không quay lưng chỉ tay trực tiếp vào bàn thờ.\n"
            "2. Giao tiếp xã hội cơ bản:\n"
            "- Người Việt Nam chào đón nụ cười thân thiện. Khi chào hỏi người lớn tuổi, hãy cúi đầu nhẹ để thể hiện sự lễ phép.\n"
            "- Dùng cả hai tay khi đưa hoặc nhận đồ vật từ người khác (đặc biệt là danh thiếp, tiền bạc hoặc đồ cúng tế).\n"
            "3. Văn hóa mặc cả khi mua sắm:\n"
            "- Nên mặc cả nhẹ nhàng tại các chợ truyền thống (Chợ Bến Thành, Chợ Đồng Xuân, Chợ đêm Phố Cổ). Mức trả hợp lý khoảng 70-80% giá ban đầu.\n"
            "- Không nên mặc cả tại các siêu thị, cửa hàng tiện lợi, trung tâm thương mại hoặc các nhà hàng có niêm yết menu rõ ràng.\n"
            "- Tránh mặc cả quá gay gắt vào buổi sáng sớm khi người bán hàng đang làm lễ mở hàng (vía may mắn).\n"
            "4. Văn hóa tiền Tip (tiền boa):\n"
            "- Không bắt buộc tại Việt Nam. Tuy nhiên, việc gửi tiền tip nhỏ (50.000 - 100.000 VNĐ) cho hướng dẫn viên, lái xe tour "
            "hoặc nhân viên phục vụ chu đáo luôn được đón nhận với lòng biết ơn chân thành.\n"
            "5. Những điều nên tránh (Taboos):\n"
            "- Tuyệt đối không cắm thẳng đứng đôi đũa vào bát cơm (gợi liên tưởng đến bát hương thờ cúng người đã khuất).\n"
            "- Tránh chạm vào đầu người khác vì theo quan niệm truyền thống, phần đầu là nơi linh thiêng của cơ thể."
        ),
        "content_en": (
            "Vietnamese culture values modesty, hospitality, and communal harmony:\n"
            "1. Temple & Pagoda Dress Code (Van Mieu, Hue Citadel, Tran Quoc Pagoda):\n"
            "- Cover shoulders and knees (trousers, long skirts, short-sleeved shirts with sleeves).\n"
            "- Remove hats, sunglasses, and footwear before stepping onto altar mats or inner sanctuaries.\n"
            "- Never touch Buddha statues or point your feet toward altars.\n"
            "2. Social Communication:\n"
            "- A warm smile opens every conversation. A slight nod shows polite respect when greeting elders.\n"
            "- Use both hands when receiving or giving items (business cards, cash, gifts).\n"
            "3. Bargaining in Markets:\n"
            "- Polite bargaining is customary in local street markets (Ben Thanh, Dong Xuan). Aim for 70-80% of opening quotes with good humor.\n"
            "- Do not bargain in fixed-price supermarkets, boutiques, or restaurants with menus.\n"
            "- Avoid harsh bargaining early in the morning when vendors conduct their 'opening sale' ritual.\n"
            "4. Tipping Culture:\n"
            "- Not mandatory. However, leaving 50,000 - 100,000 VND for private tour guides, boat rowers, or spa therapists is deeply appreciated.\n"
            "5. Cultural Taboos:\n"
            "- Never stick chopsticks vertically into a bowl of rice (resembles incense sticks at funerary altars).\n"
            "- Avoid touching someone's head, which is spiritually considered the highest, sacred point of the body."
        ),
        "metadata": {
            "category": "guide_culture",
            "guide_route": "/guide/culture",
            "rules": [
                "temple_modesty",
                "two_hands_receiving",
                "chopsticks_taboo",
                "respect_elders",
            ],
            "keywords": [
                "văn hóa",
                "trang phục đền chùa",
                "mặc cả",
                "tiền tip",
                "chùa chiền",
                "culture",
                "etiquette",
                "dress code",
                "bargaining",
                "tipping",
            ],
        },
    },
    # ─── 6. CURRENCY & DAILY COSTS ───────────────────────────────────────────
    {
        "slug": "guide-currency-budget",
        "title": "Tiền Tệ VNĐ, Nơi Đổi Tiền, Thẻ Quốc Tế & Dự Toán Chi Phí",
        "title_en": "Vietnam Dong (VND), Currency Exchange, Payments & Daily Budgets",
        "category": "currency",
        "content_vi": (
            "Tiền tệ chính thức của Việt Nam là Đồng Việt Nam (VND, ký hiệu ₫):\n"
            "1. Nhận diện tiền Polymer: Các mệnh giá phổ biến gồm 10.000₫, 20.000₫, 50.000₫, 100.000₫, 200.000₫, 500.000₫.\n"
            "CẢNH BÁO QUAN TRỌNG: Tờ 20.000₫ (xanh dương đậm) và tờ 500.000₫ (xanh lơ nhạt) có tông màu khá tương đồng. "
            "Du khách nước ngoài rất dễ nhầm lẫn hai tờ tiền này khi thanh toán lúc trời tối hoặc trong xe taxi. Luôn kiểm tra kỹ các chữ số 0!\n"
            "2. Địa điểm đổi ngoại tệ uy tín:\n"
            "- Ngân hàng thương mại (Vietcombank, BIDV, Techcombank): An toàn tuyệt đối, tỷ giá niêm yết chuẩn, yêu cầu hộ chiếu.\n"
            "- Tiệm vàng được cấp phép (Phố Hà Trung ở Hà Nội, Chợ Bến Thành ở TP.HCM): Thủ tục nhanh chóng, tỷ giá hấp dẫn cho USD/EUR.\n"
            "- Quầy đổi tiền sân bay: Phù hợp đổi một khoản nhỏ tiền mặt 1-2 triệu để trả taxi lúc vừa hạ cánh, tỷ giá thường thấp hơn ngân hàng.\n"
            "3. Thanh toán Thẻ & VietQR:\n"
            "- Thẻ quốc tế Visa/Mastercard được chấp nhận rộng rãi tại khách sạn, nhà hàng, siêu thị lớn (phí quẹt thẻ thường từ 0-3%).\n"
            "- Quét mã QR ngân hàng (VietQR / Napas) phổ biến khắp mọi nơi, từ quán cà phê cao cấp đến quầy nước mía vỉa hè.\n"
            "- Tiền mặt vẫn rất cần thiết khi mua sắm tại chợ truyền thống, đi xe ôm vỉa hè hoặc du lịch vùng sâu vùng xa.\n"
            "4. Ước tính chi phí sinh hoạt trung bình mỗi ngày:\n"
            "+ Tiết kiệm (Backpacker): 500.000 - 800.000 VNĐ/ngày (~20 - 32 USD) gồm hostel, ẩm thực đường phố, xe buýt/xe máy.\n"
            "+ Tiêu chuẩn (Mid-range): 1.500.000 - 2.500.000 VNĐ/ngày (~60 - 100 USD) gồm khách sạn 3-4 sao, nhà hàng đặc sản, Grab car, vé tham quan.\n"
            "+ Cao cấp (Luxury): Từ 4.000.000 VNĐ/ngày (~160+ USD) gồm resort 5 sao, ẩm thực Michelin/Fine dining, xe riêng đưa đón."
        ),
        "content_en": (
            "The official currency of Vietnam is the Vietnamese Dong (VND, ₫):\n"
            "1. Polymer Banknotes: Common denominations are 10k, 20k, 50k, 100k, 200k, and 500k VND.\n"
            "CRITICAL WARNING: The 20,000 VND note (deep blue) and 500,000 VND note (cyan-blue) look surprisingly similar in low light. "
            "Always inspect the zeroes carefully to avoid overpaying by 25 times!\n"
            "2. Trusted Currency Exchange Venues:\n"
            "- Commercial Banks (Vietcombank, BIDV): 100% legal, official published exchange rates, passport required.\n"
            "- Licensed Gold Shops (Ha Trung Street in Hanoi, near Ben Thanh Market in Saigon): Fast service with competitive rates for clean banknotes.\n"
            "- International Airport Counters: Convenient for exchanging 50-100 USD for immediate taxi fares upon arrival.\n"
            "3. Card & VietQR Payments:\n"
            "- Visa and Mastercard are accepted at hotels, modern cafes, and supermarkets.\n"
            "- Mobile QR banking (VietQR) is omnipresent across Vietnam.\n"
            "- Cash is still indispensable for street food vendors, local fruit stalls, and remote villages.\n"
            "4. Daily Spending Budget Guidelines:\n"
            "+ Budget / Backpacker: 500k - 800k VND/day (~20-32 USD) for hostels, street gastronomy, and scooter rentals.\n"
            "+ Mid-range: 1.5M - 2.5M VND/day (~60-100 USD) for 3-4 star boutique hotels, casual dining, and Grab rides.\n"
            "+ Luxury: 4M+ VND/day (~160+ USD) for 5-star beachfront resorts, Michelin-starred tasting menus, and private chauffeurs."
        ),
        "metadata": {
            "category": "guide_currency",
            "guide_route": "/guide/currency",
            "warning": "20,000 VND vs 500,000 VND color confusion",
            "budget_tiers": {"budget": "500k-800k", "midrange": "1.5M-2.5M", "luxury": "4M+"},
            "keywords": [
                "tiền tệ",
                "đổi tiền",
                "vietcombank",
                "tiệm vàng",
                "chi phí du lịch",
                "500k",
                "20k",
                "vietqr",
                "currency",
                "money exchange",
                "budget",
            ],
        },
    },
    # ─── 7. FESTIVALS & SEASONAL EVENTS ──────────────────────────────────────
    {
        "slug": "guide-festivals-events",
        "title": "Lịch 12 Tháng Lễ Hội Truyền Thống & Sự Kiện Theo Mùa",
        "title_en": "Vietnam 12-Month Festival Calendar & Cultural Celebrations",
        "category": "festivals",
        "content_vi": (
            "Việt Nam có nền văn hóa lễ hội rực rỡ quanh năm gắn liền với đời sống tâm linh và văn hóa mùa vụ:\n"
            "- Tháng 1 - 2: Tết Nguyên Đán (Lễ hội cổ truyền thiêng liêng nhất cả nước, đường phố rực rỡ hoa đào hoa mai; "
            "lưu ý nhiều nhà hàng quán ăn đóng cửa từ 30 Tết đến mùng 3 Tết). Lễ hội Chùa Hương (Hà Nội) kéo dài 3 tháng mùa xuân.\n"
            "- Tháng 3 - 4: Lễ hội Đền Hùng (Phú Thọ - Mùng 10 tháng 3 Âm lịch); Festival Huế (mùa xuân/hè với nhã nhạc cung đình).\n"
            "- Tháng 5 - 7: Lễ hội Pháo hoa Quốc tế Đà Nẵng (DIFF - thu hút hàng vạn du khách mỗi tối thứ Bảy ven sông Hàn); "
            "Mùa du lịch biển Nha Trang, Hạ Long, Phú Quốc.\n"
            "- Tháng 8 - 9: Tết Trung Thu (Phố lồng đèn Lương Nhữ Học TP.HCM và Phố cổ Hội An lung linh hoa đăng trên sông Hoài); "
            "Mùa lúa chín Mù Cang Chải và Hoàng Su Phì.\n"
            "- Tháng 10 - 11: Lễ hội Đua Bò Bảy Núi (An Giang - nét văn hóa Khmer độc đáo); Lễ hội Hoa Tam Giác Mạch (Hà Giang).\n"
            "- Tháng 12: Festival Hoa Đà Lạt (trưng bày hàng triệu đóa hoa ôn đới rực rỡ khắp thành phố sương mù); Giáng sinh và Countdown đón năm mới.\n"
            "Mẹo thực tế: Các lễ hội lớn như Tết Nguyên Đán, Pháo hoa Đà Nẵng, Festival Hoa Đà Lạt rất đông đúc, du khách nên đặt vé máy bay và phòng khách sạn trước tối thiểu 1 - 2 tháng."
        ),
        "content_en": (
            "Vietnam celebrates an extraordinary calendar of spiritual and vibrant seasonal festivals:\n"
            "- Jan - Feb: Tet Lunar New Year (The most sacred national celebration with blooming peach and ochna blossoms; note that businesses pause for several days). Huong Pagoda Pilgrimage Festival (Hanoi).\n"
            "- Mar - Apr: Hung Kings Temple Festival (Phu Tho - 10th day of 3rd lunar month); Hue Cultural Festival with royal court ceremonies.\n"
            "- May - Jul: Da Nang International Fireworks Festival (DIFF - premier spectacle along the Han River every Saturday night); Peak summer coastal seasons.\n"
            "- Aug - Sep: Mid-Autumn Festival (Hoi An lantern releases and Saigon lantern street); Golden harvest terraces in Mu Cang Chai & Hoang Su Phi.\n"
            "- Oct - Nov: Bay Nui Cow Racing Festival (An Giang Khmer heritage); Ha Giang Buckwheat Flower Festival across stone plateaus.\n"
            "- Dec: Da Lat Flower Festival (Spectacular floral installations across the misty highlands); New Year countdowns.\n"
            "Practical Tip: Major events like DIFF in Da Nang or Da Lat Flower Festival see high accommodation demand; reserve hotels 1-2 months in advance."
        ),
        "metadata": {
            "category": "guide_festivals",
            "guide_route": "/guide/festivals",
            "major_events": [
                "Tet",
                "Chua Huong",
                "DIFF Da Nang",
                "Mid-Autumn",
                "Da Lat Flower Festival",
            ],
            "keywords": [
                "lễ hội",
                "sự kiện",
                "tết",
                "pháo hoa đà nẵng",
                "chùa hương",
                "trung thu",
                "festival hoa",
                "festivals",
                "events",
                "calendar",
            ],
        },
    },
]
