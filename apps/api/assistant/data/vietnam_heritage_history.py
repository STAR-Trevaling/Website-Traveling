"""
STAR Travels Vietnam — Curated Historical & Cultural Heritage Dataset
Bộ dữ liệu tri thức lịch sử, huyền tích, cảnh quan & ẩm thực các danh lam thắng cảnh Việt Nam
dành riêng cho AI Trip Assistant & RAG Knowledge Store.
"""

VIETNAM_HERITAGE_HISTORY = [
    {
        "slug": "ha-long-heritage-history",
        "destination_slug": "ha-long",
        "landmark_name": "Vịnh Hạ Long & Vịnh Lan Hạ — Huyền Tích Rồng Giáng & Thủy Chiến Bạch Đằng",
        "historical_period": "Thời Tiền sử (Văn hóa Soi Nhụ, Cái Bèo 7.000 năm), Thế kỷ 13 (Nhà Trần)",
        "unesco_status": "Di sản Thiên nhiên Thế giới UNESCO (1994, 2000, 2023 mở rộng quần thể Cát Bà)",
        "best_time_to_visit": "Tháng 4 - 6 và Tháng 9 - 11 (Tiết trời thu mát mẻ, nắng vàng dịu, biển êm, không mưa bão)",
        "signature_cuisine": [
            "Chả mực giã tay Hạ Long",
            "Sá sùng Quan Lạn",
            "Bún bề bề",
            "Sam biển 7 món",
            "Rượu nếp ngâm hoành bồ",
        ],
        "must_try_activities": [
            "Du thuyền ngủ đêm ngắm hoàng hôn vịnh ngọc",
            "Chèo thuyền kayak luồn qua Hang Luồn & Hang Sáng Tối",
            "Thăm di chỉ Cái Bèo 7.000 năm",
            "Khám phá hang Sửng Sốt & Đỉnh Ti Tốp",
        ],
        "insider_tips": [
            "Nên chọn du thuyền từ 4-5 sao ngủ đêm trên vịnh để chiêm ngưỡng trọn vẹn bình minh tĩnh lặng lúc 5h30 sáng",
            "Tránh đi vào tháng 7-8 vì dễ có bão nhiệt đới gây hoãn lệnh xuất bến",
            "Mang giày thể thao chống trơn khi leo bậc đá hang Sửng Sốt",
        ],
        "ideal_duration": "2N1Đ hoặc 3N2Đ",
        "target_travelers": [
            "Gia đình nhiều thế hệ",
            "Cặp đôi nghỉ dưỡng trăng mật",
            "Khách quốc tế yêu thiên nhiên kỳ quan",
        ],
        "recommended_tour_slugs": ["tour-ha-long-cruise-2n1d"],
        "content_vi": (
            "1. Huyền tích Rồng Giáng thế: Tên gọi 'Hạ Long' có nghĩa là 'Nơi Rồng đáp xuống'. Truyền thuyết kể rằng "
            "vào thuở sơ khai lập nước, giặc ngoại xâm từ biển tràn vào cướp bóc. Ngọc Hoàng phái Rồng Mẹ mang theo đàn Rồng Con "
            "giáng trần giúp người Việt đánh giặc. Khi thuyền giặc ồ ạt tiến vào bờ, đàn Rồng phun vô số ngọc châu và báu vật. "
            "Những viên ngọc chạm mặt nước liền biến thành hàng nghìn hòn đảo đá vôi kỳ vĩ sừng sững, đâm thủng thuyền giặc, tạo thành lũy che chở đất nước. "
            "Sau chiến thắng, đàn Rồng quyết định ở lại trần gian: nơi Rồng Mẹ đáp xuống là Hạ Long, nơi đàn Rồng Con quây quần là Bái Tử Long, "
            "và nơi đuôi rồng quạt bọt trắng xóa là Bạch Long Vĩ.\n\n"
            "2. Dấu ấn Lịch sử & Khảo cổ học: Vịnh Hạ Long sở hữu quá trình kiến tạo địa chất Karst hơn 500 triệu năm. "
            "Nơi đây lưu giữ cái nôi người Việt cổ với nền văn hóa Soi Nhụ (18.000 – 7.000 năm trước) và di chỉ Cái Bèo (Cát Bà) 7.000 năm — "
            "làng chài ven biển cổ xưa nhất Đông Nam Á. Về quân sự, vùng vịnh liền kề cửa sông Bạch Đằng là nơi Hưng Đạo Đại Vương Trần Quốc Tuấn "
            "lập trận địa cọc gỗ chôn vùi toàn bộ đạo thủy binh Nguyên Mông năm 1288.\n\n"
            "3. Thời điểm vàng & Khí hậu: Thời gian lý tưởng nhất để du lịch Hạ Long là tháng 4 đến tháng 6 (chớm hè trời trong) và tháng 9 đến tháng 11 (tiết thu mát mẻ, trời trong vắt, hoàng hôn tím biếc). Tháng 7-8 có thể gặp mưa bão nhiệt đới.\n\n"
            "4. Ẩm thực trứ danh: Không thể bỏ qua Chả mực giã tay nóng hổi ăn kèm bánh cuốn hoặc xôi trắng, sá sùng xào tỏi, bún bề bề tươi ngọt và các món sam biển độc đáo.\n\n"
            "5. Lời khuyên Concierge: Nên lựa chọn hải trình du thuyền 2N1Đ hoặc 3N2Đ có bao gồm chèo kayak tại Vịnh Lan Hạ và Hang Sáng Tối để tận hưởng sự thanh bình tuyệt đối."
        ),
        "content_en": (
            "1. Legend of the Descending Dragon: 'Ha Long' translates to 'Where the Dragon Descends'. Legend holds that the Jade Emperor "
            "sent a Mother Dragon and her offspring to shield ancient Vietnam against naval invaders. The dragons spat pearls that turned into "
            "thousands of limestone karsts, devastating the enemy fleet. The dragons chose to stay: where the Mother Dragon landed became Ha Long.\n\n"
            "2. Deep History: Home to prehistoric cultures dating back 7,000 years (Cai Beo, Cat Ba), and neighboring the Bach Dang River "
            "where General Tran Hung Dao routed the Mongol armada in 1288.\n\n"
            "3. Best Season: April to June and September to November offer clear skies, calm emerald waters, and gentle breezes.\n\n"
            "4. Cuisine: Hand-pounded squid patties (Cha muc), steamed peanut worms (Sa sung), and fresh mantis shrimp noodles.\n\n"
            "5. Concierge Advice: Opt for an overnight 5-star cruise (2D1N or 3D2N) to experience dawn kayaking in Lan Ha Bay."
        ),
        "tags": [
            "Hạ Long",
            "Huyền tích Rồng",
            "Trần Hưng Đạo",
            "Bạch Đằng",
            "Cái Bèo",
            "UNESCO",
            "Chả mực",
            "Du thuyền",
            "Lan Hạ",
        ],
    },
    {
        "slug": "hoi-an-heritage-history",
        "destination_slug": "hoi-an",
        "landmark_name": "Đô Thị Cổ Hội An & Chùa Cầu — Thương Cảng Quốc Tế Faifo Thế Kỷ 16–17",
        "historical_period": "Văn hóa Sa Huỳnh (thế kỷ 1 TCN), Champa, Thời Chúa Nguyễn (Thế kỷ 16–18)",
        "unesco_status": "Di sản Văn hóa Thế giới UNESCO (1999)",
        "best_time_to_visit": "Tháng 2 - 7 (Mùa khô ráo, nắng ấm, bầu trời trong vắt, đặc biệt vào đêm rằm 14 âm lịch phố cổ tắt đèn hoa đăng)",
        "signature_cuisine": [
            "Cao lầu Hội An",
            "Mì Quảng gà ta",
            "Cơm gà bà Buội",
            "Bánh mì Phượng / Madam Khánh",
            "Bánh bao bánh vạc (White Rose)",
            "Nước Mót thảo mộc",
        ],
        "must_try_activities": [
            "Đi dạo phố cổ đêm hoa đăng thả đèn trên sông Hoài",
            "Chiêm bái Chùa Cầu (Lai Viễn Kiều)",
            "Thưởng thức show diễn thực cảnh Ký Ức Hội An",
            "Trải nghiệm chèo thuyền thúng Rừng dừa Bảy Mẫu",
            "Đạp xe ngắm hoàng hôn cánh đồng lúa Cẩm Châu",
        ],
        "insider_tips": [
            "Hãy dậy thật sớm lúc 6h sáng để ngắm Hội An thanh bình, tĩnh mịch khi chưa có dòng khách đông đúc",
            "Nếu đến vào đêm Rằm 14 âm lịch, toàn bộ phố cổ tắt đèn điện và thắp sáng hàng ngàn đèn lồng lung linh huyền ảo",
            "Trang phục màu vàng mustard, trắng, hoặc áo dài truyền thống chụp ảnh cực kỳ tôn dáng",
        ],
        "ideal_duration": "2N1Đ hoặc 3N2Đ",
        "target_travelers": [
            "Cặp đôi lãng mạn",
            "Người yêu kiến trúc cổ xưa",
            "Gia đình yêu văn hóa & ẩm thực",
        ],
        "recommended_tour_slugs": ["tour-hoi-an-da-nang-3n2d"],
        "content_vi": (
            "1. Lịch sử Thương cảng Faifo: Tọa lạc bên hạ lưu sông Thu Bồn, Hội An từng là một trong những thương cảng mậu dịch quốc tế "
            "sầm uất bậc nhất châu Á thế kỷ 16–18 dưới thời các Chúa Nguyễn. Nơi đây từng quy tụ các đoàn Châu Ấn thuyền từ Nhật Bản, "
            "tàu buôn Bồ Đào Nha, Hà Lan, Anh quốc và Trung Hoa để giao thương tơ lụa, gốm sứ, trầm hương và yến sào.\n\n"
            "2. Huyền tích Chùa Cầu (Lai Viễn Kiều): Chiếc cầu ngói do các thương nhân Nhật Bản dựng vào đầu thế kỷ 17. "
            "Người xưa quan niệm có một con thủy quái tên Mamazu (con Cù) nằm vắt ngang châu Á, đầu ở Nhật, đuôi ở Ấn Độ, lưng vắt qua Hội An; "
            "mỗi khi quái vật cựa mình sẽ gây động đất kinh hoàng. Chùa Cầu dựng lên như một thanh kiếm báu phong ấn lưng thủy quái để giữ vững hòa bình. "
            "Năm 1719, Chúa Nguyễn Phúc Chu ghé thăm đã ban tặng biển vàng 'Lai Viễn Kiều' (Cầu đón khách từ phương xa).\n\n"
            "3. Thời điểm vàng: Đẹp nhất từ tháng 2 đến tháng 7 hàng năm khi tiết trời khô ráo, nắng chan hòa. Tháng 10-11 là mùa mưa lũ sông Thu Bồn dâng cao.\n\n"
            "4. Ẩm thực di sản: Món Cao lầu trứ danh chỉ có thể nấu bằng tro củi Cù Lao Chàm và nước giếng Bá Lễ nghìn năm; cơm gà Hội An hạt vàng óng thơm mùi mỡ gà, nước Mót sen thơm ngát.\n\n"
            "5. Lời khuyên Concierge: Đừng bỏ lỡ show thực cảnh 'Ký Ức Hội An' với hơn 500 diễn viên tái hiện 400 năm lịch sử trên cồn bãi sông Hoài."
        ),
        "content_en": (
            "1. Faifo Maritime Trading Port: Located along the Thu Bon River, Hoi An was a thriving 16th-18th century Asian entrepot where Japanese, "
            "Portuguese, Dutch, and Chinese merchant vessels traded fine silk, ceramics, and agarwood under the patronage of the Nguyen Lords.\n\n"
            "2. Japanese Covered Bridge Legend: Built in the early 1600s, the bridge was believed to act as a sacred sword pinning down the mythological "
            "subterranean monster Mamazu, preventing catastrophic earthquakes. In 1719, Lord Nguyen Phuc Chu bestowed the name 'Lai Vien Kieu' (Bridge for Welcoming Distant Friends).\n\n"
            "3. Best Season: February to July brings dry, sunny days and magical lantern festivals on the 14th of each lunar month.\n\n"
            "4. Iconic Food: Cao Lau noodles, Mi Quang, Ba Buoi chicken rice, and White Rose dumplings.\n\n"
            "5. Concierge Advice: Watch the Hoi An Memories live outdoor spectacle and stroll the lantern-lit streets at dusk."
        ),
        "tags": [
            "Hội An",
            "Chùa Cầu",
            "Faifo",
            "Mamazu",
            "Chúa Nguyễn",
            "Cao lầu",
            "Ký ức Hội An",
            "Đèn lồng",
            "Thu Bồn",
        ],
    },
    {
        "slug": "ninh-binh-trang-an-hoa-lu-history",
        "destination_slug": "ninh-binh",
        "landmark_name": "Quần Thể Danh Thắng Tràng An & Cố Đô Hoa Lư — Kinh Đô Đá Đầu Tiên Của Đại Cồ Việt",
        "historical_period": "Kinh đô Đại Cồ Việt (968 - 1010, Triều Đinh - Tiền Lê), Triều Trần (Hành cung Vũ Lâm)",
        "unesco_status": "Di sản Kép Văn hóa và Thiên nhiên Thế giới UNESCO (2014, duy nhất tại Đông Nam Á)",
        "best_time_to_visit": "Tháng 1 - 3 âm lịch (Mùa lễ hội chùa Bái Đính, tiết xuân thanh tịnh) và Tháng 5 - 6 (Mùa lúa chín vàng Tam Cốc uốn quanh dòng sông Ngô Đồng)",
        "signature_cuisine": [
            "Thịt dê núi Ninh Bình tái chanh",
            "Cơm cháy giòn rụm chấm sốt dê",
            "Ốc núi Ninh Bình hấp sả",
            "Xôi trứng kiến Nho Quan",
            "Rượu cần Nho Quan",
        ],
        "must_try_activities": [
            "Ngồi thuyền nan chèo tay xuyên thủy động Tràng An",
            "Leo 500 bậc đá Hang Múa ngắm toàn cảnh Tam Cốc ngoạn mục",
            "Dâng hương Đền Vua Đinh - Đền Vua Lê tại Cố đô Hoa Lư",
            "Tham quan Hành cung Vũ Lâm nơi các vua Trần xuất gia",
        ],
        "insider_tips": [
            "Tuyến thuyền số 2 và số 3 tại Tràng An có hành trình đẹp nhất, vừa đi qua các hang dài vừa ghé Hành cung Vũ Lâm",
            "Nên leo Hang Múa vào lúc 16h30 chiều để đón hoàng hôn buông xuống thung lũng lúa",
            "Chuẩn bị nón lá hoặc ô che nắng vì thời gian ngồi thuyền nan kéo dài khoảng 2,5 - 3 tiếng",
        ],
        "ideal_duration": "1 ngày (Day Trip từ Hà Nội) hoặc 2N1Đ",
        "target_travelers": [
            "Gia đình",
            "Du khách yêu tâm linh & lịch sử dựng nước",
            "Cặp đôi thích chụp ảnh phong cảnh sơn thủy",
        ],
        "recommended_tour_slugs": ["tour-ninh-binh-trang-an-1n"],
        "content_vi": (
            "1. Cố đô Hoa Lư — Kinh đô đá đầu tiên: Năm 968, Đinh Bộ Lĩnh dẹp loạn 12 sứ quân, xưng Hoàng đế (Đinh Tiên Hoàng), "
            "đặt quốc hiệu Đại Cồ Việt và chọn Hoa Lư làm kinh đô. Nơi đây có địa thế non hiểm 'thành lũy tự nhiên' được bao bọc bởi hàng ngàn "
            "ngọn núi đá vôi dựng đứng, nối liền bằng hào sâu sông Hoàng Long. Hoa Lư là kinh đô trải qua 2 triều đại Đinh và Tiền Lê, "
            "cho đến khi Lý Thái Tổ ban Chiếu dời đô về Thăng Long năm 1010.\n\n"
            "2. Hành cung Vũ Lâm thời Trần: Ẩn sâu giữa thung lũng Tràng An, Hành cung Vũ Lâm là căn cứ quân sự bí mật nơi vua tôi nhà Trần "
            "(Trần Thái Tông, Trần Nhân Tông) rút về củng cố lực lượng, tổ chức phản công quét sạch quân xâm lược Nguyên Mông lần thứ 2 năm 1285, "
            "đồng thời là nơi Phật hoàng Trần Nhân Tông bắt đầu con đường tu hành giải thoát.\n\n"
            "3. Thời điểm vàng: Tháng 1-3 xuân về trẩy hội chiêm bái tâm linh; tháng 5-6 mùa lúa chín vàng rực hai bên bờ sông Ngô Đồng (Tam Cốc).\n\n"
            "4. Ẩm thực trứ danh: Dê núi thả tự nhiên trên vách đá vôi thịt săn chắc, ngọt mềm; cơm cháy giòn rụm rưới nước sốt tim cật đậm đà.\n\n"
            "5. Lời khuyên Concierge: Tuyến thuyền Tràng An số 2 hoặc số 3 kết hợp viếng Cố đô Hoa Lư và check-in đỉnh Ngọa Long Hang Múa là lịch trình trọn vẹn nhất."
        ),
        "content_en": (
            "1. Ancient Capital Hoa Lu: In 968 AD, Emperor Dinh Tien Hoang unified Vietnam, establishing Hoa Lu as the first centralized imperial capital. "
            "Protected by towering karst mountains and rivers, it served as capital under the Dinh and Early Le dynasties until King Ly Thai To relocated to Hanoi in 1010.\n\n"
            "2. Vu Lam Imperial Redoubt: Tucked inside Trang An, this military redoubt saw Tran Dynasty emperors command the victorious resistance "
            "against Mongol invaders in 1285 before King Tran Nhan Tong renounced his throne to embrace Zen Buddhism.\n\n"
            "3. Best Season: Jan-March for festive spiritual retreats; May-June for Tam Cốc golden harvest along the Ngo Dong River.\n\n"
            "4. Cuisine: Mountain goat specialties and crispy scorched rice (Com chay).\n\n"
            "5. Concierge Advice: Take Trang An boat route 2 or 3, paired with Mua Cave dragon peak hike at sunset."
        ),
        "tags": [
            "Ninh Bình",
            "Tràng An",
            "Hoa Lư",
            "Đinh Tiên Hoàng",
            "Hành cung Vũ Lâm",
            "Tam Cốc",
            "UNESCO",
            "Dê núi",
            "Hang Múa",
        ],
    },
    {
        "slug": "hue-heritage-history",
        "destination_slug": "hue",
        "landmark_name": "Quần Thể Di Tích Cố Đô Huế & Sông Hương — Di Sản Triều Nguyễn 1802–1945",
        "historical_period": "Kinh đô Triều Nguyễn (1802 - 1945, 13 đời vua)",
        "unesco_status": "Di sản Văn hóa Thế giới UNESCO (1993) & Nhã nhạc Cung đình Huế (2003)",
        "best_time_to_visit": "Tháng 1 - 4 (Thời tiết mùa xuân mát mẻ, hoa sen hồ Tịnh Tâm nở rộ, tránh được cái nắng gắt tháng 6-7 và mùa mưa dầm tháng 10-11)",
        "signature_cuisine": [
            "Bún bò Huế giò heo chả cua",
            "Cơm hến & Bún hến cồn Hến",
            "Bánh bèo, nậm, lọc, ram ít",
            "Chè bột lọc bọc heo quay",
            "Ẩm thực chay Cung đình",
        ],
        "must_try_activities": [
            "Tham quan Đại Nội Huế (Ngọ Môn, Điện Thái Hòa, Tử Cấm Thành)",
            "Đi thuyền rồng ngắm hoàng hôn sông Hương nghe Nhã nhạc",
            "Viếng Lăng Tự Đức, Lăng Khải Định, Lăng Minh Mạng",
            "Chiêm bái Chùa Thiên Mụ và ngắm tháp Phước Duyên",
            "Dạo chợ Đông Ba thưởng thức tinh hoa chè Huế",
        ],
        "insider_tips": [
            "Nên thuê hướng dẫn viên thuyết minh tại Đại Nội để thấu hiểu câu chuyện thâm cung bí sử và kiến trúc phong thủy triều Nguyễn",
            "Khi vào điện thờ và lăng tẩm hoàng gia, bắt buộc mặc trang phục kín đáo (áo có tay, quần/váy quá đầu gối)",
            "Thuê áo dài Cổ phục Việt Nam (Nhật Bình, Ngũ Thân) chụp ảnh tại lăng Tự Đức và Đại Nội vô cùng quý phái",
        ],
        "ideal_duration": "2N1Đ hoặc 3N2Đ",
        "target_travelers": [
            "Người yêu lịch sử & văn hóa truyền thống",
            "Du khách trung niên & gia đình",
            "Nhiếp ảnh gia cổ phục",
        ],
        "recommended_tour_slugs": ["tour-hue-di-san-2n1d"],
        "content_vi": (
            "1. Kinh thành Huế & Triều Nguyễn: Năm 1802, Vua Gia Long thống nhất đất nước, chọn Phú Xuân (Huế) làm kinh đô. "
            "Kinh thành khởi công năm 1805 kết hợp dịch lý phương Đông, ngũ hành tương sinh và kỹ thuật thành lũy Vauban phương Tây. "
            "Trước mặt lấy núi Ngự Bình làm tiền án, cồn Hến và cồn Dã Viên làm tả thanh long hữu bạch hổ, dòng sông Hương uốn lượn làm minh đường.\n\n"
            "2. Huyền tích Chùa Thiên Mụ: Năm 1601, Chúa Tiên Nguyễn Hoàng đi kinh lý Thuận Hóa, đến bên đồi Hà Khê thấy thế đất như rồng quay đầu. "
            "Dân làng kể ban đêm thường có bà lão áo đỏ quần lục tóc bạc phơ hiện ra trên đồi và tiên tri: 'Sẽ có vị chân chúa đến đây dựng chùa tụ linh khí'. "
            "Chúa Nguyễn Hoàng liền cho dựng chùa, đặt tên là Thiên Mụ (Bà Trời), khai mở cơ nghiệp Đàng Trong rực rỡ.\n\n"
            "3. Lăng tẩm các bậc đế vương: Lăng Minh Mạng uy nghiêm chuẩn mực Nho giáo; Lăng Tự Đức thơ mộng như bài thơ trữ tình; Lăng Khải Định đỉnh cao nghệ thuật khảm sành sứ giao thoa Á - Âu.\n\n"
            "4. Thời điểm vàng: Tháng 1 đến tháng 4 thời tiết thanh nhã, nắng ấm dễ chịu. Tháng 10-11 là mùa mưa dầm xứ Huế.\n\n"
            "5. Ẩm thực thần kinh: Cơm hến cồn Hến cay xè đậm đà, bún bò Huế thơm lừng mắm ruốc sả ớt, chè bột lọc bọc heo quay độc nhất vô nhị."
        ),
        "content_en": (
            "1. Imperial Citadel of Hue: Founded in 1802 by Emperor Gia Long, Hue synthesized oriental cosmology with Western Vauban military geometry, "
            "anchored by Ngu Binh Mountain as a royal screen and the poetic Perfume River as the sacred central axis.\n\n"
            "2. Thien Mu Pagoda Legend: In 1601, Lord Nguyen Hoang met locals who shared a vision of an elderly celestial lady prophesying "
            "a virtuous lord would construct a temple to channel divine prosperity. Lord Nguyen built the pagoda, naming it Thien Mu (Heavenly Lady).\n\n"
            "3. Royal Mausoleums: The classical symmetry of Minh Mang Tomb, poetic romanticism of Tu Duc Tomb, and East-meets-West porcelain mosaics of Khai Dinh Tomb.\n\n"
            "4. Best Season: January to April for gentle spring weather; avoid heavy autumn rains in Oct-Nov.\n\n"
            "5. Royal Gastronomy: Spicy Hue beef noodles, Com Hen (baby basket-clam rice), and delicate royal court tea cakes."
        ),
        "tags": [
            "Huế",
            "Đại Nội",
            "Chùa Thiên Mụ",
            "Sông Hương",
            "Gia Long",
            "Minh Mạng",
            "Tự Đức",
            "Khải Định",
            "UNESCO",
            "Bún bò Huế",
        ],
    },
    {
        "slug": "ha-giang-dong-van-heritage-history",
        "destination_slug": "ha-giang",
        "landmark_name": "Cao Nguyên Đá Đồng Văn & Đèo Mã Pí Lèng — Kỳ Tích Địa Chất 500 Triệu Năm & Con Đường Hạnh Phúc",
        "historical_period": "Kiến tạo địa chất kỷ Cambri (500 triệu năm), Dinh Vua Mèo (đầu thế kỷ 20), Đường Hạnh Phúc (1959 - 1965)",
        "unesco_status": "Công viên Địa chất Toàn cầu UNESCO (2010)",
        "best_time_to_visit": "Tháng 9 - 10 (Mùa lúa chín vàng Hoàng Su Phì) và Tháng 10 - 12 (Mùa hoa tam giác mạch phủ hồng cao nguyên đá)",
        "signature_cuisine": [
            "Cháo ấu tẩu giải cảm đêm lạnh",
            "Thắng cố ngựa chợ phiên Đồng Văn",
            "Thịt lợn đen gác bếp",
            "Bánh tam giác mạch nướng than hồng",
            "Rượu ngô men lá Quản Bạ",
        ],
        "must_try_activities": [
            "Chinh phục đèo Mã Pí Lèng - một trong Tứ đại đỉnh đèo miền Bắc",
            "Đi thuyền máy xuôi dòng sông Nho Quế ngắm hẻm vực Tu Sản sâu nhất Đông Nam Á",
            "Thăm Dinh thự Vua Mèo họ Vương (Vương Chính Đức)",
            "Chạm tay vào Cột cờ Lũng Cú - Điểm cực Bắc thiêng liêng của Tổ quốc",
            "Tham gia chợ phiên Mèo Vạc sáng Chủ Nhật",
        ],
        "insider_tips": [
            "Đường đèo dốc uốn lượn quanh co, nếu tự lái xe máy cần có tay lái rất vững và kiểm tra phanh kỹ; phương án an toàn nhất là thuê xe riêng kèm tài xế bản địa",
            "Nhiệt độ vùng cao ban đêm xuống rất thấp (có thể dưới 10°C vào mùa đông), hãy chuẩn bị áo ấm chắn gió",
            "Tôn trọng phong tục đồng bào H'Mông, không xoa đầu trẻ em vùng cao",
        ],
        "ideal_duration": "3N2Đ hoặc 4N3Đ",
        "target_travelers": [
            "Phượt thủ & tín đồ mê xê dịch",
            "Nhiếp ảnh gia phong cảnh",
            "Du khách thích khám phá văn hóa bản địa vùng cao",
        ],
        "recommended_tour_slugs": ["tour-ha-giang-loop-3n2d"],
        "content_vi": (
            "1. Kỳ quan địa chất 500 triệu năm: Cao nguyên đá Đồng Văn trải rộng trên 4 huyện Quản Bạ, Yên Minh, Đồng Văn, Mèo Vạc. "
            "Nơi đây bảo tồn các trang sử tiến hóa địa chất từ kỷ Cambri đến kỷ Pecmi với các hóa thạch cổ sinh vật biển trên độ cao 1.400m.\n\n"
            "2. Huyền thoại Đèo Mã Pí Lèng & Con đường Hạnh Phúc: 'Mã Pí Lèng' trong tiếng H'Mông và Quan Hỏa có nghĩa là 'Sống mũi ngựa' — "
            "dốc đứng hiểm trở đến mức ngựa đi qua cũng phải bạt vía thở dốc. Để mở con đường dài 20km qua hẻm Tu Sản, hơn 1.200 thanh niên xung phong "
            "từ 16 dân tộc đã ròng rã đục đá suốt 6 năm (1959–1965), trong đó đội cảm tử 17 người phải đeo dây thừng lơ lửng trên vách đá 11 tháng.\n\n"
            "3. Dinh Vua Mèo Vương Chính Đức: Tọa lạc tại thung lũng Sà Phìn, kiệt tác kiến trúc kết hợp giữa nghệ thuật người H'Mông, kiến trúc Mãn Thanh "
            "và ảnh hưởng Pháp cổ trị giá hàng vạn đồng bạc trắng Đông Dương thuở xưa.\n\n"
            "4. Thời điểm vàng: Tháng 9-10 ngắm mùa vàng bậc thang; tháng 10-12 chìm đắm trong bạt ngàn hoa tam giác mạch hồng tím.\n\n"
            "5. Ẩm thực vùng cao: Thắng cố ngựa nghi ngút khói thơm mùi thảo quả, cháo ấu tẩu bùi ngậy khử phong giải độc, rượu ngô men lá ấm nồng đêm sương."
        ),
        "content_en": (
            "1. 500-Million-Year Geological Marvel: Dong Van Karst Plateau preserves marine fossils and limestone formations dating from the Cambrian period.\n\n"
            "2. Legend of Ma Pi Leng Pass: Translating to 'Horse's Nose Bridge', this sheer cliffside pass was conquered through 6 years of heroic manual labor "
            "(1959–1965) by 1,200 volunteer youths hanging on ropes above the turquoise Nho Que River.\n\n"
            "3. H'Mong King's Palace: Built by Chieftain Vuong Chinh Duc in Sa Phin Valley, fusing Qing Dynasty, H'Mong woodwork, and French colonial motifs.\n\n"
            "4. Best Season: Sept-Oct for golden rice terraces; Oct-Dec for blooming pink buckwheat flowers.\n\n"
            "5. Highland Cuisine: Warm Au Tau herbal porridge, Thang Co horse stew, and corn wine."
        ),
        "tags": [
            "Hà Giang",
            "Mã Pí Lèng",
            "Đồng Văn",
            "Vua Mèo",
            "Nho Quế",
            "Tu Sản",
            "UNESCO",
            "Tam giác mạch",
            "Lũng Cú",
        ],
    },
    {
        "slug": "sa-pa-fansipan-heritage-history",
        "destination_slug": "sa-pa",
        "landmark_name": "Sa Pa, Thung Lũng Mường Hoa & Đỉnh Fansipan — Nóc Nhà Đông Dương & Trạm Nghỉ Dưỡng Pháp Cổ 1903",
        "historical_period": "Tiền sử (Bãi đá cổ Mường Hoa), Trạm nghỉ dưỡng Pháp cổ (1903), Văn hóa H'Mông - Dao Đỏ",
        "unesco_status": "Ruộng bậc thang Sa Pa lọt top Di sản ruộng bậc thang kỳ vĩ nhất thế giới",
        "best_time_to_visit": "Tháng 9 - 10 (Mùa lúa chín vàng thung lũng Mường Hoa) và Tháng 12 - 2 (Mùa đông săn mây, săn tuyết trắng và hoa đào rừng Tây Bắc)",
        "signature_cuisine": [
            "Cá hồi & cá tầm Thác Bạc nấu lẩu măng chua",
            "Lợn cắp nách nướng than hoa",
            "Thịt trâu gác bếp xào rau cải ngồng",
            "Cơm lam nướng ống tre chấm muối vừng",
            "Thắng cố A Quỳnh",
        ],
        "must_try_activities": [
            "Chinh phục đỉnh Fansipan 3.143m bằng cáp treo 3 dây đạt kỷ lục Guiness",
            "Đi tàu hỏa leo núi Mường Hoa băng qua thung lũng mây",
            "Trekking bản Tả Van, Lao Chải ngắm ruộng bậc thang",
            "Tắm lá thuốc người Dao Đỏ cổ truyền tại bản Tả Phìn",
            "Ghé thăm Nhà thờ Đá Sa Pa xây dựng năm 1895",
        ],
        "insider_tips": [
            "Để săn mây đỉnh Fansipan, nên lên đỉnh vào khoảng 9h30 - 11h sáng khi nắng lên xua tan sương mù dày",
            "Mang theo áo khoác dày, khăn ấm và găng tay vì nhiệt độ trên đỉnh Fansipan thường thấp hơn thị xã từ 8 - 10°C",
            "Khi mua sắm đồ thổ cẩm tại chợ, hãy phân biệt thổ cẩm dệt tay truyền thống của đồng bào với hàng may công nghiệp",
        ],
        "ideal_duration": "2N1Đ hoặc 3N2Đ",
        "target_travelers": [
            "Cặp đôi săn mây",
            "Gia đình nghỉ dưỡng",
            "Du khách yêu leo núi & văn hóa Tây Bắc",
        ],
        "recommended_tour_slugs": ["tour-sa-pa-fansipan-3n2d"],
        "content_vi": (
            "1. Lịch sử Trạm nghỉ dưỡng Pháp cổ: Năm 1903, đoàn thám hiểm người Pháp phát hiện ra cao nguyên Sa Pa với khí hậu mát mẻ "
            "tương tự vùng núi Alps của Thụy Sĩ. Người Pháp nhanh chóng quy hoạch nơi đây thành 'Thủ đô mùa hè' của miền Bắc, xây dựng hơn 200 biệt thự cổ, "
            "sanatorium chữa bệnh, và công trình Nhà thờ Đá Sa Pa bằng đá đẽo năm 1895.\n\n"
            "2. Bí ẩn Bãi đá cổ Mường Hoa: Trải rộng trên diện tích 8km² tại thung lũng Mường Hoa, bãi đá cổ gồm hơn 200 khối đá sa thạch "
            "khắc các hình vẽ người, nhà sàn, ruộng bậc thang và ký tự thiên văn học bí ẩn được nhà khảo cổ học Victor Goloubew (Viện EFEO) "
            "phát hiện năm 1925 mà đến nay khoa học vẫn chưa giải mã hết.\n\n"
            "3. Đỉnh Fansipan — Nóc nhà Đông Dương: Với độ cao 3.143m, đỉnh Fansipan trong tiếng H'Mông là 'Hủa Xi Pan' (Phiến đá khổng lồ chênh vênh). "
            "Nơi đây hiện tọa lạc quần thể tâm linh Đại tượng Phật A Di Đà bằng đồng lớn nhất Việt Nam sừng sững giữa biển mây bồng bềnh.\n\n"
            "4. Thời điểm vàng: Tháng 9-10 mùa vàng bội thu; tháng 12-2 mùa săn tuyết và đào rừng khoe sắc.\n\n"
            "5. Ẩm thực vùng cao: Cá hồi, cá tầm Thác Bạc tươi ngon giòn ngọt; lợn cắp nách quay bì giòn rụm; tắm lá thuốc Dao Đỏ hồi phục năng lượng tuyệt vời."
        ),
        "content_en": (
            "1. French Alpine Station (1903): Discovered by French topographers, Sa Pa was developed into a colonial highland sanitarium with over 200 alpine villas "
            "and the 1895 Stone Church built from chiseled granite.\n\n"
            "2. Enigmatic Muong Hoa Petroglyphs: Discovered in 1925 by French archaeologist Victor Goloubew, the valley preserves 200 prehistoric carved boulders "
            "depicting ancient star maps and spiritual symbols.\n\n"
            "3. Mount Fansipan (3,143m): 'Roof of Indochina', crowned by a monumental bronze Great Buddha statue surrounded by a sea of floating clouds.\n\n"
            "4. Best Season: Sept-Oct for golden terraced paddies; Dec-Feb for winter frost and sea-of-clouds photography.\n\n"
            "5. Gastronomy & Wellness: Fresh Thac Bac sturgeon and salmon hotpot, paired with therapeutic Red Dao herbal bath rituals."
        ),
        "tags": [
            "Sa Pa",
            "Fansipan",
            "Mường Hoa",
            "Nhà thờ Đá",
            "Pháp cổ",
            "Dao Đỏ",
            "H'Mông",
            "Ruộng bậc thang",
            "Cá hồi",
        ],
    },
    {
        "slug": "da-lat-langbiang-heritage-history",
        "destination_slug": "da-lat",
        "landmark_name": "Đà Lạt, Langbiang & Di Sản Kiến Trúc Biệt Điện — Giấc Mơ Thành Phố Mùa Xuân 1893",
        "historical_period": "BS Alexandre Yersin khám phá 1893, Dinh Bảo Đại, Ga xe lửa bánh răng cưa 1932",
        "unesco_status": "Khu dự trữ sinh quyển thế giới Langbiang UNESCO (2015)",
        "best_time_to_visit": "Tháng 11 - 3 (Mùa hoa dã quỳ vàng rực, hoa mai anh đào nở hồng khắp phố, thời tiết khô ráo, se lạnh lãng mạn)",
        "signature_cuisine": [
            "Lẩu gà lá é Tao Ngộ",
            "Bánh tráng nướng Đà Lạt (Pizza Việt Nam)",
            "Bánh căn xíu mại nước chấm hành béo ngậy",
            "Lẩu bò Ba Toa quán gỗ",
            "Kem bơ sáp béo ngậy",
            "Dâu tây New Zealand hái tại vườn",
        ],
        "must_try_activities": [
            "Săn mây bình minh đồi chè Cầu Đất lúc 5h00 sáng",
            "Chinh phục đỉnh Radar Langbiang bằng xe Jeep ngắm toàn cảnh Suối Vàng",
            "Đi thuyền kayak trên hồ Tuyền Lâm phẳng lặng",
            "Thăm Dinh III Bảo Đại bảo tồn nguyên vẹn phòng làm việc của vị vua cuối cùng",
            "Đi chuyến tàu cổ Đà Lạt - Trại Mát bằng đầu máy hơi nước",
        ],
        "insider_tips": [
            "Nhiệt độ Đà Lạt chênh lệch lớn giữa ngày và đêm: trưa nắng ấm nhưng tối hạ xuống 13 - 15°C, luôn mang theo áo len hoặc cardigan",
            "Tránh hái dâu tây ở các vườn 'cò mồi' ven đường đèo, nên đến các nông trại công nghệ cao uy tín tại Đa Quý hoặc Tuyền Lâm",
            "Đường dốc quanh co nên khi thuê xe máy hãy chọn xe số hoặc tay ga khỏe",
        ],
        "ideal_duration": "3N2Đ hoặc 4N3Đ",
        "target_travelers": [
            "Cặp đôi trăng mật",
            "Người yêu nghệ thuật & kiến trúc hoài niệm",
            "Nhóm bạn trẻ yêu thích cafe săn mây",
        ],
        "recommended_tour_slugs": ["tour-da-lat-thanh-pho-ngan-hoa-3n2d"],
        "content_vi": (
            "1. Dấu ấn Bác sĩ Alexandre Yersin: Ngày 21/6/1893, nhà bác học Alexandre Yersin đặt chân lên cao nguyên Lang Biang sau chuyến thám hiểm gian nan. "
            "Nhận thấy khí hậu nơi đây mát mẻ quanh năm như trời Âu, Toàn quyền Paul Doumer đã quyết định xây dựng Đà Lạt thành thủ đô nghỉ dưỡng Đông Dương. "
            "Đà Lạt sở hữu bộ sưu tập hơn 1.500 biệt thự Pháp cổ, Ga Đà Lạt 1932 với đường ray răng cưa vượt đèo Ngoạn Mục độc nhất vô nhị.\n\n"
            "2. Chuyện tình huyền thoại Chàng K'Lang và Nàng H'Biang: Chàng K'Lang (tộc Lát) và nàng H'Biang (tộc Chil) yêu nhau tha thiết "
            "nhưng bị ngăn cấm bởi lời nguyền hận thù giữa hai bộ tộc. Đôi uyên ương cùng trốn lên đỉnh núi sinh sống. "
            "Khi quân làng đuổi theo bắn tên độc vào K'Lang, H'Biang đã lấy thân mình đỡ tên và hy sinh. Chàng K'Lang khóc than đến chết, "
            "nước mắt chàng hóa thành dòng Đạ Đằng (Suối Vàng), và thi thể hai người hóa thành hai ngọn núi đôi sừng sững ôm lấy nhau — đỉnh Langbiang vĩnh cửu.\n\n"
            "3. Di sản Hoàng triều Cương thổ: Dinh I, Dinh II và Dinh III Bảo Đại lưu giữ dấu ấn cuối cùng của triều đại phong kiến Việt Nam, "
            "nơi Vua Bảo Đại và Nam Phương Hoàng hậu từng sinh sống và làm việc.\n\n"
            "4. Thời điểm vàng: Tháng 11-3 mùa hoa mai anh đào nhuộm hồng thung lũng, tiết trời se lạnh trong lành.\n\n"
            "5. Ẩm thực thi vị: Bánh tráng nướng thơm nức chợ đêm, lẩu gà lá é thanh nồng, bánh căn chấm xíu mại và ly sữa đậu nành nóng hổi giữa đêm lạnh."
        ),
        "content_en": (
            "1. Dr. Alexandre Yersin's Discovery: On June 21, 1893, Dr. Alexandre Yersin reached Lang Biang plateau. Governor-General Paul Doumer transformed "
            "it into an Alpine sanctuary boasting 1,500 French villas and the 1932 Art Deco railway station with unique cog-wheel tracks.\n\n"
            "2. Legend of Langbiang: Chieftain K'Lang and maiden H'Biang sacrificed themselves for forbidden love across rival tribes. "
            "Their tears formed the Golden Stream and their bodies rose into the iconic twin peaks of Mount Langbiang.\n\n"
            "3. Imperial Heritage: The three palaces of Emperor Bao Dai and Empress Nam Phuong preserve the final chapter of Vietnam's monarchy.\n\n"
            "4. Best Season: Nov-March for blooming pink wild cherry blossoms and golden wild sunflowers.\n\n"
            "5. Romantic Gastronomy: Vietnamese street pizza (Banh trang nuong), chicken hotpot with e leaves, and fresh artisan avocado ice cream."
        ),
        "tags": [
            "Đà Lạt",
            "Langbiang",
            "Yersin",
            "Bảo Đại",
            "Ga Đà Lạt",
            "Hồ Tuyền Lâm",
            "Hồ Xuân Hương",
            "Mai anh đào",
            "Lẩu gà lá é",
        ],
    },
    {
        "slug": "phu-quoc-dao-ngoc-heritage-history",
        "destination_slug": "phu-quoc",
        "landmark_name": "Đảo Ngọc Phú Quốc & Dấu Ấn Khai Hoang Mạc Cửu — Huyền Thoại Giếng Ngự & Nghề Nước Mắm 200 Năm",
        "historical_period": "Khai hoang mở đất thời Mạc Cửu (1708), Chúa Nguyễn Ánh bôn tẩu lánh nạn, Trại giam Tù binh Phú Quốc",
        "unesco_status": "Khu dự trữ sinh quyển thế giới Kiên Giang UNESCO (2006)",
        "best_time_to_visit": "Tháng 11 - 4 năm sau (Mùa khô, biển êm như mặt gương, nước biển trong vắt như ngọc bích, nắng vàng rực rỡ)",
        "signature_cuisine": [
            "Gỏi cá trích tươi cuốn bánh tráng rau rừng",
            "Bún quậy Kiến Xây tự pha nước chấm",
            "Còi biên mai nướng muối ớt",
            "Nhum biển (Cầu gai) nướng mỡ hành",
            "Ghẹ Hàm Ninh hấp chấm tiêu Phú Quốc",
        ],
        "must_try_activities": [
            "Đi cano 4 đảo ngắm san hô (Hòn Mây Rút, Hòn Gầm Ghì, Hòn Móng Tay)",
            "Trải nghiệm cáp treo vượt biển Hòn Thơm dài nhất thế giới",
            "Thăm Di tích Lịch sử Nhà tù Phú Quốc tưởng niệm các chiến sĩ cách mạng",
            "Khám phá nhà thùng nước mắm truyền thống 200 năm",
            "Ngắm hoàng hôn Sunset Sanato / Bãi Trường",
        ],
        "insider_tips": [
            "Tránh đi vào tháng 7 - 9 vì là mùa mưa bão Tây Nam, sóng biển mạnh tại Bãi Trường và Bãi Dài; nếu đi vào thời gian này hãy chọn Bãi Sao hoặc Bãi Khem ở phía Nam vì biển vẫn rất êm",
            "Khi mua nước mắm truyền thống mang lên máy bay, các hãng hàng không yêu cầu đóng thùng xốp tiêu chuẩn và ký gửi riêng",
            "Bún quậy là món ăn trải nghiệm độc đáo, hãy tự tay quậy chén nước chấm muối ớt quất thơm nồng",
        ],
        "ideal_duration": "3N2Đ hoặc 4N3Đ",
        "target_travelers": [
            "Cặp đôi nghỉ dưỡng biển",
            "Gia đình yêu thích biển đảo & resort 5 sao",
            "Du khách quốc tế",
        ],
        "recommended_tour_slugs": ["tour-phu-quoc-thien-duong-dao-ngoc-3n2d"],
        "content_vi": (
            "1. Lịch sử Khai phá thời Mạc Cửu: Năm 1708, nhà buôn Mạc Cửu sau khi khai phá vùng đất Hà Tiên và đảo Koh Tral (Phú Quốc) "
            "đã quyết định quy phục Chúa Nguyễn Phúc Chu, chính thức sáp nhập toàn bộ hòn đảo ngọc rộng lớn vào bản đồ cương vực Đại Việt.\n\n"
            "2. Huyền tích Giếng Ngự (Giếng Tiên An Thới): Trong những ngày bôn tẩu trốn chạy quân Tây Sơn, Chúa Nguyễn Ánh cùng binh lính "
            "dạt vào đảo Phú Quốc trong cơn khát kiệt sức vì không tìm thấy nước ngọt. Chúa bèn rút thanh gươm báu cắm sâu vào tảng đá hoa cương "
            "ngửa mặt lên trời khấn: 'Nếu trời cho ta làm vua, hãy ban nước ngọt cho quân ta sống sót'. Khi rút kiếm ra, một mạch nước ngọt lành tuôn trào "
            "không bao giờ cạn giữa lòng biển mặn — chính là Giếng Ngự thiêng liêng tại Mũi Ông Đội ngày nay.\n\n"
            "3. Làng nghề Nước mắm truyền thống 200 năm: Phú Quốc nổi danh với nghề ủ chượp cá cơm than tươi nguyên chất trong thùng gỗ bời lời khổng lồ, "
            "tạo ra dòng nước mắm cốt cá màu cánh gián đậm đà được Liên minh Châu Âu (EU) bảo hộ Chỉ dẫn địa lý (PGI).\n\n"
            "4. Thời điểm vàng: Tháng 11 đến tháng 4 mùa nắng vàng biển lặng tuyệt đẹp.\n\n"
            "5. Ẩm thực biển đảo: Gỏi cá trích ăn kèm dừa nạo và nước chấm đậu phộng, bún quậy tươi ngon, nhum biển nướng béo ngậy."
        ),
        "content_en": (
            "1. Settlement History: In 1708, merchant leader Mac Cuu formally integrated Phu Quoc into Vietnamese territory under Lord Nguyen Phuc Chu.\n\n"
            "2. Sacred Spring of An Thoi: Fleeing enemy forces, Lord Nguyen Anh (later Emperor Gia Long) plunged his royal sword into seaside rock, "
            "praying for water. A freshwater spring burst through solid bedrock, nourishing his army.\n\n"
            "3. 200-Year Fish Sauce Craft: Anchovies fermented in aged timber vats produce Vietnam's first EU-protected geographical indication (PGI) artisanal fish sauce.\n\n"
            "4. Best Season: November to April brings glassy turquoise seas and dry sunny days.\n\n"
            "5. Island Cuisine: Fresh herring salad (Goi ca trich), custom-whipped Kien Xay noodles (Bun quay), and charcoal-grilled sea urchins."
        ),
        "tags": [
            "Phú Quốc",
            "Mạc Cửu",
            "Giếng Ngự",
            "Gia Long",
            "Nhà tù Phú Quốc",
            "Nước mắm",
            "Bãi Sao",
            "Hòn Thơm",
            "Gỏi cá trích",
        ],
    },
    {
        "slug": "da-nang-ngu-hanh-son-cham-heritage-history",
        "destination_slug": "da-nang",
        "landmark_name": "Đà Nẵng, Danh Thắng Ngũ Hành Sơn & Bảo Tàng Điêu Khắc Chăm — Thành Phố Đáng Sống & Di Sản Giao Thoa",
        "historical_period": "Vương quốc Champa (thế kỷ 5 - 15), Vua Minh Mạng đặt tên Ngũ Hành Sơn 1825, Viện EFEO 1915",
        "unesco_status": "Văn bia Ma Nhai Ngũ Hành Sơn là Di sản Tư liệu Ký ức Thế giới UNESCO (2022)",
        "best_time_to_visit": "Tháng 3 - 8 (Thời tiết mùa khô, biển Mỹ Khê trong xanh cát trắng, nắng đẹp lý tưởng để tắm biển và vui chơi Bà Nà Hills)",
        "signature_cuisine": [
            "Mì Quảng ếch / tôm thịt",
            "Bánh tráng cuốn thịt heo hai đầu da chấm mắm nêm",
            "Bún chả cá Đà Nẵng",
            "Gỏi cá Nam Ô trứ danh",
            "Chè sầu Liên béo ngậy",
        ],
        "must_try_activities": [
            "Dạo bước trên Cầu Vàng Bà Nà Hills nâng đỡ bởi đôi bàn tay khổng lồ",
            "Chinh phục đỉnh Thủy Sơn và khám phá động Huyền Không kỳ ảo",
            "Chiêm ngưỡng bộ sưu tập cổ vật Chăm Pa tại Bảo tàng Điêu khắc Chăm",
            "Xem Cầu Rồng phun lửa và phun nước vào 21h00 tối thứ Bảy và Chủ Nhật",
            "Tắm biển Mỹ Khê - một trong những bãi biển quyến rũ nhất hành tinh",
        ],
        "insider_tips": [
            "Động Huyền Không tại Ngũ Hành Sơn đẹp nhất vào khoảng 11h30 - 12h30 trưa khi ánh nắng mặt trời chiếu thẳng qua vòm hang tạo nên luồng hào quang thần thánh",
            "Nên đi Bà Nà Hills sớm trước 8h00 sáng để tránh xếp hàng cáp treo và check-in Cầu Vàng khi chưa quá đông",
            "Thưởng thức bánh tráng thịt heo nên chọn quán có chén mắm nêm chuẩn vị pha dứa và ớt cay",
        ],
        "ideal_duration": "3N2Đ hoặc 4N3Đ",
        "target_travelers": ["Gia đình", "Nhóm bạn trẻ", "Khách MICE & hội nghị"],
        "recommended_tour_slugs": ["tour-hoi-an-da-nang-3n2d"],
        "content_vi": (
            "1. Lịch sử Ngũ Hành Sơn: Năm 1825, Vua Minh Mạng vi hành phương Nam, say đắm trước vẻ đẹp 5 ngọn núi đá vôi ven biển đã dựa vào thuyết Ngũ hành "
            "đặt tên: Kim Sơn, Mộc Sơn, Thủy Sơn, Hỏa Sơn và Thổ Sơn. Năm 2022, 78 bia ma nhai bằng chữ Hán Nôm khắc trên vách đá động Huyền Không "
            "được UNESCO vinh danh là Di sản Tư liệu Ký ức Thế giới.\n\n"
            "2. Truyền thuyết Trứng Rồng Kim Quy: Xưa kia có một cụ già ngư dân thấy rồng biển khổng lồ đẻ một quả trứng lớn trên bãi cát. "
            "Thần Kim Quy (Rùa Vàng) liền hiện lên trao chiếc móng rùa để bảo vệ trứng. Khi quả trứng nở ra một nàng tiên nữ xinh đẹp, "
            "5 mảnh vỏ trứng vỡ hóa thành 5 ngọn núi Ngũ Hành Sơn kỳ vĩ che chắn bão giông cho người dân đất Quảng.\n\n"
            "3. Bảo tàng Điêu khắc Chăm (EFEO 1915): Thành lập năm 1915 bởi nhà khảo cổ Henri Parmentier, đây là bảo tàng lưu giữ hiện vật "
            "và kiệt tác điêu khắc sa thạch Champa quy mô nhất thế giới (tượng Bồ tát Tara, Đài thờ Mỹ Sơn E1, Phù điêu Shiva).\n\n"
            "4. Thời điểm vàng: Tháng 3 đến tháng 8 trời trong biển êm nắng ấm.\n\n"
            "5. Ẩm thực miền Trung: Bánh tráng thịt heo hai đầu da giòn mềm chấm mắm nêm thơm lừng cay xé, mì Quảng đậm đà sợi vàng nghệ."
        ),
        "content_en": (
            "1. Marble Mountains & UNESCO Memory of the World: In 1825, Emperor Minh Mang named the five marble peaks after the eastern elemental cosmos. "
            "In 2022, 78 ancient stone inscriptions (Ma Nhai) inside the caves were inscribed as UNESCO Memory of the World.\n\n"
            "2. Golden Turtle Deity Legend: An ancient myth tells of a sea dragon's divine egg guarded by the Golden Turtle; its five hatched shells "
            "rose into the sacred Marble Mountains guarding Da Nang's shores.\n\n"
            "3. Museum of Cham Sculpture (1915): Established by the French EFEO and Henri Parmentier, preserving the world's most magnificent collection "
            "of sandstone Cham religious masterpieces.\n\n"
            "4. Best Season: March to August offers sunny blue skies and calm waters at My Khe Beach.\n\n"
            "5. Cuisine: Two-ended pork belly wrapped in rice paper with spicy mam nem dipping sauce, and turmeric Mi Quang noodles."
        ),
        "tags": [
            "Đà Nẵng",
            "Ngũ Hành Sơn",
            "Bà Nà Hills",
            "Cầu Vàng",
            "Bảo tàng Chăm",
            "UNESCO",
            "Minh Mạng",
            "Cầu Rồng",
            "Biển Mỹ Khê",
        ],
    },
    {
        "slug": "nha-trang-thap-ba-ponagar-heritage-history",
        "destination_slug": "nha-trang",
        "landmark_name": "Nha Trang & Tháp Bà Ponagar — Đền Thờ Mẹ Xứ Sở Kauthara & Vịnh Biển San Hô Kỳ Ảo",
        "historical_period": "Vương quốc Champa cổ đại (Thế kỷ 8 - 13), Tín ngưỡng Thờ Mẫu Thiên Y A Na của người Việt",
        "unesco_status": "Lễ hội Tháp Bà Ponagar được công nhận là Di sản Văn hóa Phi vật thể Quốc gia",
        "best_time_to_visit": "Tháng 1 - 8 (Mùa khô chan hòa ánh nắng, biển trong xanh màu ngọc bích, lý tưởng để lặn biển ngắm san hô tại Hòn Mun)",
        "signature_cuisine": [
            "Bún sứa & bún chả cá Nha Trang",
            "Bánh căn hải sản tôm mực chấm mắm nêm / mắm ngọt",
            "Nem nướng Ninh Hòa cuốn bánh tráng",
            "Gỏi cá mai tươi rói",
            "Bò nướng Lạc Cảnh sốt bí truyền",
        ],
        "must_try_activities": [
            "Chiêm bái Tháp Bà Ponagar và xem múa Chăm với tiếng trống Paranưng",
            "Tắm bùn khoáng nóng tự nhiên thư giãn tại I-Resort / Tháp Bà",
            "Tour du thuyền ngắm hoàng hôn vịnh biển Nha Trang",
            "Lặn biển bình khí ngắm rạn san hô nguyên sinh tại Hòn Mun",
            "Vui chơi công viên giải trí VinWonders Hòn Tre",
        ],
        "insider_tips": [
            "Tháp Bà Ponagar yêu cầu mặc áo choàng lam kín đáo do ban quản lý cấp miễn phí nếu du khách mặc váy ngắn hoặc áo sát nách",
            "Nên đi tắm bùn vào buổi chiều muộn từ 15h30 để vừa ngâm khoáng ấm vừa tránh nắng gắt",
            "Mua yến sào Khánh Hòa nên chọn showroom chính hãng của Công ty Yến sào Khánh Hòa để đảm bảo nguồn gốc",
        ],
        "ideal_duration": "3N2Đ hoặc 4N3Đ",
        "target_travelers": [
            "Gia đình nghỉ dưỡng",
            "Cặp đôi thích biển & ẩm thực",
            "Du khách chăm sóc sức khỏe & tắm khoáng",
        ],
        "recommended_tour_slugs": ["tour-da-lat-thanh-pho-ngan-hoa-3n2d"],
        "content_vi": (
            "1. Lịch sử Tháp Bà Ponagar: Được xây dựng từ thế kỷ 8 đến thế kỷ 13 trên đồi Cù Lao nhìn ra cửa sông Cái, "
            "quần thể đền tháp Champa Kauthara thờ Nữ thần Po Ino Nagar (Mẹ Xứ Sở). Kiến trúc tháp gạch nung đỏ rực "
            "được gắn kết bằng nhựa cây bí truyền không lộ mạch vữa, thách thức hơn 1.200 năm mưa gió nhiệt đới.\n\n"
            "2. Huyền tích Thiên Y A Na Thánh Mẫu: Tiên nữ giáng trần ngụ trong trái dưa hấu được đôi vợ chồng tiều phu già nhận nuôi. "
            "Khi thiên tai lũ lụt, nàng hóa thân vào khúc gỗ kỳ nam quý trôi dạt sang phương Bắc, nên duyên cùng Thái tử. "
            "Sau đó nàng cưỡi kỳ nam trở về dạy dân quê hương cách trồng lúa, dệt vải, làm gốm và xua đuổi thú dữ trước khi cưỡi hạc bay về trời.\n\n"
            "3. Vịnh biển thiên đường: Nha Trang là một trong những vịnh biển đẹp nhất thế giới với khu bảo tồn biển Hòn Mun bảo tồn hơn 350 loài san hô cứng.\n\n"
            "4. Thời điểm vàng: Tháng 1 đến tháng 8 thời tiết khô ráo, biển xanh êm ả.\n\n"
            "5. Ẩm thực đại dương: Bún sứa giòn sần sật chan nước dùng ngọt thanh cá thu, nem nướng Ninh Hòa chấm sốt tương nếp béo bùi."
        ),
        "content_en": (
            "1. Po Nagar Cham Sanctuary: Constructed between the 8th and 13th centuries, this brick temple complex honors Goddess Po Ino Nagar (Mother of the Realm). "
            "The mortarless brick architecture remains an enduring ancient engineering wonder.\n\n"
            "2. Legend of Thien Y A Na: The goddess manifested inside a humble melon, adopted by an elderly couple. She imparted agriculture, silkworm farming, "
            "and herbal healing to villagers before ascending to the heavens on the back of a celestial crane.\n\n"
            "3. Marine Sanctuary: Nha Trang Bay hosts Hon Mun Marine Protected Area with over 350 hard coral varieties.\n\n"
            "4. Best Season: January to August offers azure sunny skies and mirror-calm diving waters.\n\n"
            "5. Gastronomy: Crunchy jellyfish noodles (Bun sua), grilled Nem Ninh Hoa, and Lac Canh marinated grilled beef."
        ),
        "tags": [
            "Nha Trang",
            "Tháp Bà Ponagar",
            "Champa",
            "Thiên Y A Na",
            "Hòn Mun",
            "Tắm bùn",
            "Bún sứa",
            "Nem nướng",
        ],
    },
    {
        "slug": "mui-ne-poshanu-heritage-history",
        "destination_slug": "mui-ne",
        "landmark_name": "Mũi Né — Di Tích Tháp Chàm Poshanư & Huyền Thoại Sa Mạc Đồi Cát Bay",
        "historical_period": "Vương quốc Champa (Thế kỷ 8 – 9), Làng chài Mũi Né truyền thống thế kỷ 19",
        "unesco_status": "Di tích Kiến trúc Nghệ thuật Cấp Quốc gia",
        "best_time_to_visit": "Tháng 11 - 4 (Thời tiết khô ráo, nắng vàng chan hòa, gió biển lộng gió, cực kỳ lý tưởng cho lướt ván diều và trượt cát)",
        "signature_cuisine": [
            "Lẩu thả Phan Thiết tinh hoa 5 màu",
            "Bánh căn Phan Thiết ăn kèm xíu mại cá nục kho",
            "Răng mực nướng bơ tỏi",
            "Gỏi cá mai Phan Thiết",
            "Bánh quai vạc đồi cát",
        ],
        "must_try_activities": [
            "Trải nghiệm xe Jeep địa hình vượt đồi cát trắng Bàu Trắng đón bình minh",
            "Thăm cụm Tháp Chàm Poshanư cổ kính trên đồi Bà Nài",
            "Lội suối Tiên ngắm hẻm cát đất sét đỏ kỳ vĩ",
            "Khám phá Làng chài Mũi Né lúc bình minh khi thuyền thúng cập bờ",
            "Thử thách lướt ván diều (Kitesurfing) tại bãi biển Hàm Tiến",
        ],
        "insider_tips": [
            "Thời điểm ngắm Đồi Cát Bay và Bàu Trắng đẹp nhất là 5h30 - 7h00 sáng hoặc 16h30 - 18h00 chiều khi cát không bị bỏng chân và ánh sáng mềm mại",
            "Nên thuê xe Jeep địa hình tại Bàu Trắng để được tài xế chở lên đỉnh đồi cát cao nhất và chụp ảnh chuyên nghiệp",
            "Nước mắm cá cơm truyền thống Phan Thiết có độ đạm tự nhiên cao, là món quà biếu rất quý",
        ],
        "ideal_duration": "2N1Đ hoặc 3N2Đ",
        "target_travelers": [
            "Cặp đôi yêu thích chụp ảnh sa mạc biển",
            "Khách thể thao lướt ván mạo hiểm",
            "Gia đình nghỉ dưỡng biển",
        ],
        "recommended_tour_slugs": ["tour-phu-quoc-thien-duong-dao-ngoc-3n2d"],
        "content_vi": (
            "1. Lịch sử Tháp Chàm Poshanư: Tọa lạc trên đồi Bà Nài nhìn ra biển Phan Thiết, tháp Poshanư được xây dựng từ cuối thế kỷ 8 đầu thế kỷ 9 "
            "theo phong cách nghệ thuật Hòa Lai Champa để tôn thờ thần tối cao Shiva. Thế kỷ 15, người Chăm dựng thêm đền thờ tưởng nhớ "
            "Công chúa Po Sah Inư — người phụ nữ tài sắc có công lớn truyền dạy nghề dệt vải, làm gốm và trồng lúa nước cho thần dân Panduranga.\n\n"
            "2. Huyền thoại Đồi Cát Bay & Tên gọi Mũi Né: 'Mũi Né' bắt nguồn từ việc các thuyền chài của ngư dân xưa khi gặp bão biển thường cho thuyền "
            "chạy vào mũi đất nhô ra biển che chắn để 'né bão'. Đồi Cát Bay với hơn 18 màu sắc thay đổi hình dáng theo từng cơn gió là tuyệt tác sa mạc biển nhiệt đới độc nhất vô nhị.\n\n"
            "3. Thời điểm vàng: Tháng 11 đến tháng 4 mùa nắng vàng lộng gió.\n\n"
            "4. Ẩm thực bản địa: Lẩu thả Phan Thiết trình bày trong bẹ hoa chuối đại diện cho Ngũ hành (Kim - Mộc - Thủy - Hỏa - Thổ), bánh căn cá nục đậm đà.\n\n"
            "5. Lời khuyên Concierge: Hãy đón bình minh trên đồi cát trắng Bàu Trắng và dạo bước chân trần dọc Suối Tiên."
        ),
        "content_en": (
            "1. Poshanu Cham Towers: Constructed in the late 8th century atop Ba Nai Hill, this Hoa Lai architectural temple venerates Lord Shiva and Princess Po Sah Inu.\n\n"
            "2. Sahara of Vietnam & Mui Ne Origins: 'Mui Ne' derives from fishermen navigating behind the cape to evade ('Ne') ferocious oceanic squalls. "
            "The coastal dunes shift across 18 distinct mineral shades with changing coastal winds.\n\n"
            "3. Best Season: November to April brings golden desert sunshine and ideal kitesurfing winds.\n\n"
            "4. Iconic Cuisine: Lau Tha (Hotpot of the 5 Elements served in banana flower petals) and grilled squid teeth.\n\n"
            "5. Concierge Advice: Ride ATVs across the white dunes of Bau Trang at sunrise and stroll barefoot through the red canyons of Fairy Stream."
        ),
        "tags": [
            "Mũi Né",
            "Phan Thiết",
            "Tháp Chàm Poshanư",
            "Bàu Trắng",
            "Đồi cát bay",
            "Suối Tiên",
            "Lẩu thả",
            "Lướt ván diều",
        ],
    },
    {
        "slug": "can-tho-mekong-cai-rang-heritage-history",
        "destination_slug": "can-tho",
        "landmark_name": "Cần Thơ & Chợ Nổi Cái Răng — Văn Hóa Sông Nước Miệt Vườn Tây Đô & Đất Phương Nam",
        "historical_period": "Khai khẩn đất phương Nam (Thế kỷ 18), Thời Tây Đô thời Pháp thuộc, Nhà cổ Bình Thủy 1870",
        "unesco_status": "Văn hóa Chợ nổi Cái Răng là Di sản Văn hóa Phi vật thể Quốc gia",
        "best_time_to_visit": "Tháng 9 - 11 (Mùa nước nổi đặc trưng miền Tây, tôm cá đầy ắp, đồng hoa súng bung nở) và Tháng 5 - 8 (Mùa trái cây chín rộ tại các miệt vườn Phong Điền, Cái Răng)",
        "signature_cuisine": [
            "Lẩu mắm miền Tây cá linh bông điên điển",
            "Vịt nấu chao Cần Thơ",
            "Bánh xèo củ hủ dừa giòn rụm",
            "Hủ tiếu khô Sa Đéc / Hủ tiếu Cái Răng",
            "Nem nướng Cái Răng",
            "Bánh tét lá cẩm Cần Thơ",
        ],
        "must_try_activities": [
            "Đi thuyền máy khám phá Chợ nổi Cái Răng lúc 5h30 sáng ngắm cây 'bẹo' chào hàng",
            "Thưởng thức tô hủ tiếu nóng hổi và ly cà phê bọt trên thuyền tròng trành",
            "Thăm Nhà cổ Bình Thủy 1870 — bối cảnh phim điện ảnh Người Tình (The Lover)",
            "Đạp xe dạo quanh cồn Sơn trải nghiệm làm bánh dân gian và xem cá lóc bay",
            "Ghé thăm Chợ đêm Ninh Kiều bên bến sông",
        ],
        "insider_tips": [
            "Chợ nổi Cái Răng họp đông đúc và nhộn nhịp nhất từ 5h00 đến 7h30 sáng; nếu đi sau 8h00 chợ sẽ bắt đầu tan dần",
            "Nhìn lên cây tre ('cây bẹo') dựng trên đầu mỗi mũi thuyền để biết thuyền đó bán loại nông sản gì (treo gì bán nấy)",
            "Khi ghé nhà vườn ăn trái cây, hãy ủng hộ các sản phẩm đặc sản mộc mạc do bà con nông dân tự tay làm",
        ],
        "ideal_duration": "2N1Đ hoặc 3N2Đ",
        "target_travelers": [
            "Gia đình",
            "Du khách quốc tế muốn trải nghiệm văn hóa bản địa chân thực",
            "Những ai yêu thích ẩm thực miệt vườn",
        ],
        "recommended_tour_slugs": ["tour-phu-quoc-thien-duong-dao-ngoc-3n2d"],
        "content_vi": (
            "1. Lịch sử Cần Thơ — Đô thị Tây Đô: Nằm ở hạ lưu sông Hậu, Cần Thơ được hình thành từ công cuộc khai khẩn đất phương Nam "
            "của các bậc tiền nhân thế kỷ 18. Đến thời thuộc địa Pháp, Cần Thơ được mệnh danh là 'Tây Đô' — trung tâm kinh tế, văn hóa sầm uất bậc nhất miền Tây Nam Bộ.\n\n"
            "2. Văn hóa Chợ nổi Cái Răng & Cây Bẹo: Chợ nổi hình thành từ nhu cầu giao thương đường thủy khi đường bộ chưa phát triển. "
            "Nét độc đáo nhất là 'Cây Bẹo' — cây sào tre dựng ở đầu mũi thuyền treo củ khoai, trái dưa, chùm chôm chôm... để khách từ xa nhìn thấy "
            "với quy tắc ngầm thú vị: 'Treo gì bán nấy; Treo mà không bán (quần áo phơi); Không treo mà bán (thức ăn nước uống); Treo cái này bán cái khác (treo lá dừa bán thuyền)'.\n\n"
            "3. Nhà cổ Bình Thủy (1870): Kiệt tác kiến trúc Đông - Tây kết hợp của dòng họ Dương, bảo tồn trọn vẹn đồ gỗ khảm ốc xà cừ và là bối cảnh bộ phim nổi tiếng 'L'Amant' (Người Tình).\n\n"
            "4. Thời điểm vàng: Tháng 9-11 mùa nước nổi tôm cá trù phú; tháng 5-8 mùa trái cây trĩu cành.\n\n"
            "5. Ẩm thực miệt vườn: Lẩu mắm cá linh đậm đà hương vị đồng nội, vịt nấu chao béo bùi, bánh xèo giòn rụm ngập rau rừng sông nước."
        ),
        "content_en": (
            "1. Capital of the Mekong Delta: Formed during 18th-century southern pioneer expansion, Can Tho ('Tay Do') became the economic heart of the Mekong basin.\n\n"
            "2. Cai Rang Floating Market Culture: Originating as a waterway trading hub, boats signal their merchandise via 'Beo sticks' (bamboo poles displaying fruits or vegetables).\n\n"
            "3. Binh Thuy Ancient House (1870): A 5-bay French-colonial and traditional Vietnamese mansion famous as the filming set of Jean-Jacques Annaud's film 'The Lover'.\n\n"
            "4. Best Season: Sept-Nov for the fertile floating season; May-Aug for lush fruit harvest orchards.\n\n"
            "5. Mekong Delicacies: Fermented fish hotpot with water lily blooms, duck with fermented tofu (Vit nau chao), and crispy giant river pancakes."
        ),
        "tags": [
            "Cần Thơ",
            "Chợ nổi Cái Răng",
            "Bến Ninh Kiều",
            "Nhà cổ Bình Thủy",
            "Miền Tây",
            "Mùa nước nổi",
            "Cây bẹo",
            "Lẩu mắm",
        ],
    },
    {
        "slug": "phong-nha-ke-bang-son-doong-heritage-history",
        "destination_slug": "quang-binh",
        "landmark_name": "Vườn Quốc Gia Phong Nha — Kẻ Bàng & Hang Sơn Đoòng — Vương Quốc Hang Động Cổ Nhất Châu Á",
        "historical_period": "Địa chất Karst 400 triệu năm tuổi (Kỷ Cổ sinh), Căn cứ địa Đường mòn Hồ Chí Minh trong chiến tranh",
        "unesco_status": "Di sản Thiên nhiên Thế giới UNESCO (2003, 2015 tiêu chí đa dạng sinh học)",
        "best_time_to_visit": "Tháng 3 - 8 (Mùa khô, nước sông Son trong xanh vắt, khí hậu trong hang mát mẻ 22 - 25°C, an toàn tuyệt đối để thám hiểm)",
        "signature_cuisine": [
            "Cá trắm sông Son nướng mè / kho tiêu",
            "Cháo canh Quảng Bình cá lóc đồng",
            "Gà đồi nướng chấm muối cheo thảo mộc",
            "Khoai dẻo Quảng Bình",
            "Đọt mây xào tôm",
        ],
        "must_try_activities": [
            "Thám hiểm Động Thiên Đường — Hoàng cung trong lòng đất dài 31km",
            "Ngồi thuyền ngược dòng sông Son vào khám phá Động Phong Nha",
            "Chèo thuyền kayak và đu zipline tắm bùn tại Hang Tối",
            "Thám hiểm Hang Sơn Đoòng (Hang động tự nhiên lớn nhất hành tinh) hoặc Hang Én",
            "Khám phá thung lũng sinh thái Suối Nước Moọc",
        ],
        "insider_tips": [
            "Tháng 9 đến tháng 11 là mùa mưa lũ tại miền Trung, các hang động ngập nước sẽ tạm dừng đón khách tham quan",
            "Khi thám hiểm hang động, chuẩn bị giày bám đá tốt, quần áo mau khô và túi chống nước cho điện thoại/máy ảnh",
            "Để đi tour thám hiểm Sơn Đoòng, du khách cần đặt trước từ 6 tháng đến 1 năm và đảm bảo bài kiểm tra thể lực",
        ],
        "ideal_duration": "3N2Đ hoặc 4N3Đ",
        "target_travelers": [
            "Những người đam mê thám hiểm mạo hiểm",
            "Du khách yêu thiên nhiên nguyên sinh kỳ vĩ",
            "Gia đình yêu thích cảnh sắc hang động",
        ],
        "recommended_tour_slugs": ["tour-hue-di-san-2n1d"],
        "content_vi": (
            "1. Lịch sử Địa chất 400 triệu năm: Phong Nha - Kẻ Bàng là một trong những vùng đá vôi nhiệt đới cổ nhất và rộng lớn nhất châu Á "
            "với hơn 300 hang động kỳ vĩ. Nơi đây sở hữu Hang Sơn Đoòng — hang động tự nhiên lớn nhất thế giới với thể tích 38,5 triệu m³, "
            "đủ sức chứa cả một khu phố Manhattan của New York hay tòa nhà chọc trời 40 tầng, với hệ sinh thái rừng nguyên sinh và vi khí hậu độc lập bên trong.\n\n"
            "2. Dấu ấn Lịch sử Đường mòn Hồ Chí Minh: Trong chiến tranh, vùng núi đá vôi hiểm trở Phong Nha là trọng điểm giao thông huyết mạch, "
            "nơi che chở cho các đoàn quân, kho vũ khí và bến phà Xuân Sơn, phà Nguyễn Văn Trỗi huyền thoại trên đường Trường Sơn.\n\n"
            "3. Thời điểm vàng: Tháng 3 đến tháng 8 mùa khô nắng ráo, làn nước sông Son xanh màu ngọc bích.\n\n"
            "4. Ẩm thực vùng di sản: Cá trắm sông Son nuôi bằng rong biển tự nhiên thơm ngọt, gà đồi nướng than chấm muối cheo cay nồng vị lá rừng.\n\n"
            "5. Lời khuyên Concierge: Khám phá Động Thiên Đường vào sáng sớm và trải nghiệm đu zipline tắm bùn Hang Tối buổi chiều là lộ trình hoàn hảo."
        ),
        "content_en": (
            "1. 400-Million-Year Geological Kingdom: Phong Nha-Ke Bang hosts Asia's oldest karst formation and over 300 immense caverns, "
            "including Hang Son Doong—the largest cave on Earth (38.5 million cubic meters), hosting its own enclosed rainforest, cloud system, and river.\n\n"
            "2. Wartime Legacy: A strategic crossroads along the historic Ho Chi Minh Trail where natural karst chambers protected troops and supply convoys.\n\n"
            "3. Best Season: March to August offers dry sunny weather, crystal emerald waters along Son River, and safe cavern trekking conditions.\n\n"
            "4. Cuisine: Son River grass carp, charcoal-grilled highland chicken with indigenous 'cheo' salt, and Quang Binh cassava.\n\n"
            "5. Concierge Advice: Trek through Paradise Cave (31km) and experience ziplining mud baths inside Dark Cave."
        ),
        "tags": [
            "Phong Nha",
            "Sơn Đoòng",
            "Động Thiên Đường",
            "Quảng Bình",
            "UNESCO",
            "Sông Son",
            "Hang Tối",
            "Thám hiểm",
        ],
    },
    {
        "slug": "my-son-sanctuary-heritage-history",
        "destination_slug": "hoi-an",
        "landmark_name": "Thánh Địa Mỹ Sơn — Trung Tâm Tôn Giáo Đền Tháp Vương Triều Champa Cổ Đại",
        "historical_period": "Thế kỷ 4 - 13 (Vương triều Champa), Thờ Thần Shiva Bhadresvara",
        "unesco_status": "Di sản Văn hóa Thế giới UNESCO (1999)",
        "best_time_to_visit": "Tháng 2 - 8 (Thời tiết mùa khô ráo, thích hợp dạo bộ giữa thung lũng núi Chúa thanh tịnh)",
        "signature_cuisine": [
            "Bê thui Cầu Mống chấm mắm nêm",
            "Mì Quảng Phú Chiêm",
            "Bánh tổ Quảng Nam",
            "Gà than đèo Le",
        ],
        "must_try_activities": [
            "Thưởng thức điệu múa Apsara uyển chuyển và tiếng kèn Saranai tại sân khấu nhà bia",
            "Khám phá cụm tháp A, B, C, D với kiến trúc gạch nung không mạch vữa",
            "Tìm hiểu linga - yoni biểu tượng của sự sinh sôi nảy nở",
            "Ngắm bình minh thanh tịnh chiếu rọi các đền tháp rêu phong",
        ],
        "insider_tips": [
            "Nên ghé thăm Mỹ Sơn vào sáng sớm lúc 7h30 sáng trước khi các đoàn khách đông tràn về và trước khi ánh nắng trưa trở nên oi ả",
            "Thánh địa nằm giữa thung lũng lòng chảo nên nhiệt độ mùa hè có thể khá nóng, hãy mang theo mũ nón và nước uống",
            "Kết hợp chuyến đi Mỹ Sơn nửa ngày buổi sáng và buổi chiều về phố cổ Hội An là một ngày di sản trọn vẹn",
        ],
        "ideal_duration": "Nửa ngày (Half-day excursion từ Hội An hoặc Đà Nẵng)",
        "target_travelers": [
            "Người say mê khảo cổ học & tôn giáo cổ đại",
            "Khách du lịch văn hóa quốc tế",
            "Nhiếp ảnh gia di sản",
        ],
        "recommended_tour_slugs": ["tour-hoi-an-da-nang-3n2d"],
        "content_vi": (
            "1. Lịch sử Thánh địa Hoàng gia Champa: Nằm trong một thung lũng kín được bao bọc bởi núi Chúa hùng vĩ, Mỹ Sơn là trung tâm cúng tế, "
            "hành lễ và mai táng các vị vua, hoàng thân quốc thích của Vương triều Champa từ thế kỷ 4 đến thế kỷ 13. "
            "Quần thể gồm hơn 70 công trình đền tháp bằng gạch đỏ thờ thần tối cao Shiva Bhadresvara.\n\n"
            "2. Kỹ thuật Gạch nung Huyền bí: Những viên gạch Chăm Pa được ghép nối khít khao đến mức một sợi tóc cũng không lọt qua, "
            "hoàn toàn không thấy mạch vữa, thách thức sự bào mòn của thời gian nghìn năm giữa rừng thiêng nhiệt đới.\n\n"
            "3. Thời điểm vàng: Tháng 2 đến tháng 8 mùa khô ráo.\n\n"
            "4. Ẩm thực kết nối: Bê thui Cầu Mống thơm lừng da giòn chấm mắm nêm cá cơm nguyên chất.\n\n"
            "5. Lời khuyên Concierge: Đi vào khung giờ 8h00 - 10h00 sáng để xem biểu diễn múa Chăm Apsara và nghe thuyết minh về nghệ thuật điêu khắc phù điêu."
        ),
        "content_en": (
            "1. Royal Spiritual Capital of Champa: Hidden in a lush valley encircled by sacred peaks, My Son served as the premier religious and burial center "
            "for Cham monarchs from the 4th to 13th centuries, dedicated to Shiva Bhadresvara.\n\n"
            "2. Mortarless Brick Ingenuity: Over 70 red-brick shrines assembled with unseen natural resin bonding that has endured over 1,000 years.\n\n"
            "3. Best Season: February to August for clear, dry skies.\n\n"
            "4. Cuisine: Cau Mong roasted veal with savory fermented anchovy dip.\n\n"
            "5. Concierge Advice: Arrive early at 8:00 AM to enjoy Cham Apsara dances and intimate morning light on moss-covered ruins."
        ),
        "tags": [
            "Mỹ Sơn",
            "Thánh địa Mỹ Sơn",
            "Champa",
            "Shiva",
            "Apsara",
            "UNESCO",
            "Quảng Nam",
            "Hội An",
        ],
    },
    {
        "slug": "cao-bang-ban-gioc-heritage-history",
        "destination_slug": "ha-giang",
        "landmark_name": "Thác Bản Giốc & Động Ngườm Ngao — Đệ Nhất Thác Nước Biên Cương & Di Chỉ Hang Động Kỳ Ảo",
        "historical_period": "Địa chất Karst miền Đông Bắc, Văn hóa dân tộc Tày - Nùng, Di tích Cội nguồn Cách mạng Pác Bó",
        "unesco_status": "Công viên Địa chất Toàn cầu UNESCO Non nước Cao Bằng (2018)",
        "best_time_to_visit": "Tháng 8 - 10 (Mùa thác Bản Giốc đẹp nhất, dòng nước sông Quây Sơn xanh ngọc bích chảy cuồn cuộn giữa những thung lũng lúa chín vàng)",
        "signature_cuisine": [
            "Vịt quay 7 vị Cao Bằng",
            "Bánh cuốn canh nước xương Cao Bằng",
            "Hạt dẻ Trùng Khánh nướng thơm bùi",
            "Phở chua Cao Bằng",
            "Rau dạ hiến xào thịt bò",
        ],
        "must_try_activities": [
            "Đi bè tre ngắm cận cảnh dòng thác Bản Giốc hùng vĩ xuyên biên giới",
            "Khám phá Động Ngườm Ngao — kiệt tác thạch nhũ vàng hình búp sen úp ngược",
            "Viếng Khu di tích Quốc gia đặc biệt Pác Bó (Suối Lê Nin, Núi Các Mác)",
            "Thăm làng rèn dao cổ truyền Phúc Sen của người Nùng An",
        ],
        "insider_tips": [
            "Nhớ mang theo CCCD/Hộ chiếu khi đến Thác Bản Giốc vì đây là khu vực giáp ranh biên giới Việt - Trung",
            "Mùa mưa (tháng 6-7) thác chảy rất mạnh nhưng nước có thể hơi đục ngầu phù sa; mùa thu (tháng 9-10) là lúc nước trong xanh biếc và đẹp nhất",
            "Thưởng thức hạt dẻ Trùng Khánh chính vụ vào tháng 9-10 hương vị thơm béo khác biệt",
        ],
        "ideal_duration": "3N2Đ kết hợp Hà Giang hoặc 2N1Đ từ Hà Nội",
        "target_travelers": [
            "Những người yêu danh lam thắng cảnh thiên nhiên",
            "Khách du lịch về nguồn lịch sử",
            "Nhiếp ảnh gia mùa vàng",
        ],
        "recommended_tour_slugs": ["tour-ha-giang-loop-3n2d"],
        "content_vi": (
            "1. Tuyệt tác Thác Bản Giốc: Nằm trên dòng sông Quây Sơn, Thác Bản Giốc là thác nước tự nhiên xuyên biên giới lớn thứ 4 thế giới "
            "với chiều rộng hơn 200m chia làm 3 tầng bậc thác nước đổ bọt tung trắng xóa kỳ vĩ như dải lụa tiên buông xuống núi rừng biên cương.\n\n"
            "2. Động Ngườm Ngao & Huyền tích Dân gian: Theo tiếng Tày, 'Ngườm Ngao' có nghĩa là 'Hang Hổ'. Truyền thuyết kể xưa kia trong hang "
            "có rất nhiều hổ dữ ẩn náu, sau được dân làng hợp sức dẹp yên. Động dài hơn 2.100m lưu giữ những khối thạch nhũ vàng hình búp sen úp ngược, "
            "cây san hô đá vôi và cây đàn đá phát ra âm thanh trong trẻo.\n\n"
            "3. Cội nguồn Cách mạng Pác Bó: Mùa xuân năm 1941, sau 30 năm bôn ba tìm đường cứu nước, Chủ tịch Hồ Chí Minh đã vượt qua cột mốc 108 "
            "trở về đất mẹ, sống và làm việc tại hang Cốc Bó bên dòng suối Lê Nin trong vắt như ngọc bích và ngọn núi Các Mác uy nghiêm.\n\n"
            "4. Thời điểm vàng: Tháng 8 đến tháng 10 mùa nước đầy trong xanh bên lúa chín vàng.\n\n"
            "5. Ẩm thực Đông Bắc: Vịt quay 7 vị ướp thảo mộc lá mắc mật, hạt dẻ Trùng Khánh nướng béo bùi, bánh cuốn chan canh xương thanh ngọt."
        ),
        "content_en": (
            "1. Ban Gioc Waterfall: Straddling the Vietnam-China border on the emerald Quay Son River, Ban Gioc is the 4th largest transnational waterfall "
            "on the planet, cascading over 3 limestone terraces enveloped in mist.\n\n"
            "2. Nguom Ngao Cave: Translating to 'Tiger Cave' in indigenous Tay language, this 2.1km subterranean wonder features inverted lotus stone stalactites.\n\n"
            "3. Pac Bo Historic Cradle: Where President Ho Chi Minh returned to Vietnam in 1941 after 30 years abroad, establishing revolutionary headquarters "
            "beside emerald Lenin Stream.\n\n"
            "4. Best Season: August to October for turquoise waters contrasted against golden harvest paddies.\n\n"
            "5. Cuisine: 7-spice roasted duck, Trung Khanh chestnuts, and warm broth rolled pancakes (Banh cuon canh)."
        ),
        "tags": [
            "Cao Bằng",
            "Thác Bản Giốc",
            "Động Ngườm Ngao",
            "Pác Bó",
            "Suối Lê Nin",
            "UNESCO",
            "Sông Quây Sơn",
            "Hạt dẻ",
        ],
    },
    {
        "slug": "yen-tu-tuyen-lam-heritage-history",
        "destination_slug": "ha-long",
        "landmark_name": "Non Thiêng Yên Tử — Kinh Đô Phật Giáo Trúc Lâm Đại Việt & Chùa Đồng Đỉnh Phù Vân",
        "historical_period": "Thế kỷ 13 (Nhà Trần), Phật hoàng Trần Nhân Tông sáng lập Thiền phái Trúc Lâm (1299)",
        "unesco_status": "Quần thể Di tích và Danh thắng Yên Tử - Vĩnh Nghiêm - Côn Sơn, Kiếp Bạc (Hồ sơ đệ trình Di sản Thế giới UNESCO)",
        "best_time_to_visit": "Tháng 1 - 3 âm lịch (Mùa lễ hội xuân Yên Tử linh thiêng) và Tháng 9 - 11 (Tiết thu hanh vàng, ít mây mù, ngắm hoàng hôn đỉnh Chùa Đồng tuyệt mỹ)",
        "signature_cuisine": [
            "Măng trúc Yên Tử xào thịt bò",
            "Canh rau dớn rừng",
            "Chè lam Yên Tử",
            "Bánh gật gù Tiên Yên",
            "Rượu mơ Yên Tử êm dịu",
        ],
        "must_try_activities": [
            "Chinh phục đỉnh Chùa Đồng trên độ cao 1.068m đúc hoàn toàn bằng đồng nguyên khối",
            "Viếng tháp Huệ Quang nơi lưu giữ xá lị Phật hoàng Trần Nhân Tông",
            "Đi cáp treo lướt qua rừng trúc và rừng xích tùng cổ thụ 700 năm tuổi",
            "Nghỉ dưỡng tĩnh tại và trải nghiệm thiền định tại Legacy Yên Tử MGallery",
        ],
        "insider_tips": [
            "Để leo lên Chùa Đồng, hãy chuẩn bị giày thể thao có độ bám dốc cao vì những bậc đá đoạn cuối khá dốc và trơn trượt",
            "Nếu đi vào mùa đông hoặc sáng sớm, hãy mang áo ấm vì đỉnh núi gió rất mạnh và sương mù dày đặc",
            "Trải nghiệm lưu trú tại Legacy Yên Tử được thiết kế theo cảm hứng kiến trúc thời Trần thế kỷ 13 là một trải nghiệm nghỉ dưỡng văn hóa đỉnh cao",
        ],
        "ideal_duration": "1 ngày hoặc 2N1Đ kết hợp Hạ Long",
        "target_travelers": [
            "Du khách hành hương tâm linh",
            "Những ai tìm kiếm sự tĩnh tại thiền định",
            "Gia đình và người yêu lịch sử Đại Việt",
        ],
        "recommended_tour_slugs": ["tour-ha-long-cruise-2n1d"],
        "content_vi": (
            "1. Lịch sử Phật hoàng Trần Nhân Tông: Sau hai lần trực tiếp lãnh đạo quân dân Đại Việt đánh tan đế quốc Nguyên Mông hùng mạnh (1285, 1288), "
            "vào năm 1299, Vua Trần Nhân Tông đã từ bỏ ngai vàng vàng son, nhường ngôi cho con trai để lên non thiêng Yên Tử xuất gia tu hành. "
            "Ngài thống nhất các dòng thiền để sáng lập nên Thiền phái Trúc Lâm Yên Tử — dòng thiền mang đậm bản sắc văn hóa và tinh thần nhập thế của dân tộc Việt Nam.\n\n"
            "2. Non thiêng Chùa Đồng trên đỉnh Phù Vân: Tọa lạc trên đỉnh núi cao 1.068m quanh năm mây phủ, Chùa Đồng là ngôi chùa bằng đồng "
            "nguyên khối trên đỉnh núi lớn nhất châu Á nặng hơn 70 tấn, ví như một đài sen báu giữa chốn bồng lai tiên cảnh.\n\n"
            "3. Hàng xích tùng cổ thụ 700 năm tuổi: Đường lên tháp Huệ Quang được chở che bởi hàng xích tùng cổ thụ do chính Phật hoàng và các bậc tiền nhân "
            "trồng từ thế kỷ 13, là chứng nhân lịch sử sống nghìn năm tuổi.\n\n"
            "4. Thời điểm vàng: Mùa xuân trẩy hội cầu bình an; mùa thu ngắm biển mây tĩnh lặng.\n\n"
            "5. Ẩm thực thanh tịnh: Măng trúc tự nhiên giòn ngọt, cơm chay dưỡng sinh, chén rượu mơ Yên Tử ấm lòng du khách."
        ),
        "content_en": (
            "1. King-Monk Tran Nhan Tong & Truc Lam Zen: After leading Dai Viet to decisive victories over the Mongol invasions in 1285 and 1288, "
            "Emperor Tran Nhan Tong abdicated his throne in 1299 to ascend Mount Yen Tu, founding the indigenous Truc Lam Zen Buddhist tradition.\n\n"
            "2. Dong Pagoda (Bronze Temple): Perched 1,068 meters above sea level amidst swirling mist, this 70-ton solid bronze temple "
            "is the highest bronze shrine in Asia, resembling a sacred lotus atop the clouds.\n\n"
            "3. 700-Year-Old Sacred Pine Groves: The path to Hue Quang Stupa is lined with ancient pine trees hand-planted by monks in the 13th century.\n\n"
            "4. Best Season: Spring (Jan-March) for spiritual pilgrimages; Autumn (Sept-Nov) for tranquil meditation and clear skies.\n\n"
            "5. Cuisine: Yen Tu mountain bamboo shoots, nourishing monastic vegetarian banquets, and sweet apricot wine."
        ),
        "tags": [
            "Yên Tử",
            "Trần Nhân Tông",
            "Trúc Lâm",
            "Chùa Đồng",
            "Quảng Ninh",
            "Tâm linh",
            "Di sản",
            "Legacy Yên Tử",
        ],
    },
    {
        "slug": "pu-luong-mai-chau-heritage-history",
        "destination_slug": "ninh-binh",
        "landmark_name": "Pù Luông & Mai Châu — Thung Lũng Mây Xứ Thái & Kiệt Tác Cọn Nước Khổng Lồ",
        "historical_period": "Văn hóa dân tộc Thái trắng & Mường, Dấu ấn đoàn quân Tây Tiến (1947)",
        "unesco_status": "Khu Bảo tồn Thiên nhiên Pù Luông",
        "best_time_to_visit": "Tháng 5 - 6 (Mùa lúa chín đầu tiên trong năm) và Tháng 9 - 10 (Mùa vàng rực rỡ nhất của ruộng bậc thang Bản Đôn, Pù Luông)",
        "signature_cuisine": [
            "Vịt Cổ Lũng nướng than hoa da giòn thịt ngọt lịm",
            "Cơm lam Mai Châu dẻo thơm hạt ngọc",
            "Cá suối nướng pa pỉnh tộp",
            "Măng đắng xào mẻ",
            "Rượu cần Mường xông men lá",
        ],
        "must_try_activities": [
            "Ngắm guồng cọn nước tre khổng lồ quay đều bên dòng suối Chàm",
            "Trekking xuyên các bản làng người Thái: Bản Đôn, Bản Kho Mường, Bản Lác",
            "Khám phá Hang Dơi (Hang Kho Mường) kỳ bí giữa lòng núi đá",
            "Tắm hồ bơi vô cực view thung lũng ruộng bậc thang tại Pù Luông",
            "Xem múa xòe Thái và uống rượu cần quanh đống lửa",
        ],
        "insider_tips": [
            "Pù Luông có 2 vụ lúa chín trong năm (tháng 5-6 và tháng 9-10), đây là điểm khác biệt lớn so với Mù Cang Chải hay Sa Pa chỉ có 1 vụ lúa chín",
            "Nên đặt trước phòng nghỉ dạng ecolodge hoặc homestay view thung lũng Bản Đôn từ sớm nếu đi vào mùa lúa",
            "Đường từ Mai Châu sang Pù Luông qua đèo Thung Khe (Đèo Đá Trắng) có sương mù quanh năm, chụp ảnh đèo rất đẹp",
        ],
        "ideal_duration": "2N1Đ hoặc 3N2Đ",
        "target_travelers": [
            "Những người tìm kiếm kỳ nghỉ dưỡng xanh gần gũi thiên nhiên",
            "Cặp đôi",
            "Khách quốc tế yêu văn hóa làng bản",
        ],
        "recommended_tour_slugs": ["tour-ninh-binh-trang-an-1n"],
        "content_vi": (
            "1. Miền thung lũng văn hóa Thái - Mường: Pù Luông (theo tiếng Thái nghĩa là 'Đỉnh núi cao nhất') và Mai Châu là cái nôi cư trú "
            "lâu đời của đồng bào người Thái trắng và người Mường. Nếp nhà sàn truyền thống mái cọ, khung cửi dệt thổ cẩm lách cách và những nương lúa "
            "uốn lượn đã tạo nên một không gian sinh thái hoang sơ, thanh bình bậc nhất Bắc Bộ.\n\n"
            "2. Kiệt tác Cọn nước & Bẫy dòng nước cổ xưa: Người Thái bản địa đã phát minh ra những chiếc cọn nước khổng lồ đan bằng tre rừng và nứa, "
            "tự động quay suốt ngày đêm nhờ sức nước suối để đưa dòng nước mát lành lên tưới tiêu cho các sườn ruộng bậc thang trên cao.\n\n"
            "3. Dấu ấn Đoàn quân Tây Tiến: Vùng đất hiểm trở này gắn liền với bước chân hào hùng của trung đoàn Tây Tiến năm 1947: "
            "'Mai Châu mùa em thơm nếp xôi', 'Mường Lát hoa về trong đêm hơi' trong bài thơ bất hủ của nhà thơ chiến sĩ Quang Dũng.\n\n"
            "4. Thời điểm vàng: Độc đáo với 2 mùa lúa chín trong năm: tháng 5-6 và tháng 9-10.\n\n"
            "5. Ẩm thực sơn dã: Vịt Cổ Lũng xương nhỏ thịt nạc thơm nức tiếng, cơm lam chấm muối vừng, cá suối nướng lá dong thơm lừng."
        ),
        "content_en": (
            "1. Thai & Muong Highland Culture: Pu Luong (meaning 'Highest Peak' in Thai) and Mai Chau valley preserve pristine indigenous stilt-house hamlets "
            "and time-honored handloom weaving traditions.\n\n"
            "2. Giant Bamboo Waterwheels: Ingenious hand-crafted bamboo waterwheels harness mountain stream currents to elevate irrigation water onto stepped paddies.\n\n"
            "3. Tay Tien Regiment Legend: immortalized in Vietnamese wartime poetry honoring young soldiers traversing misty peaks in 1947.\n\n"
            "4. Best Season: Dual harvest seasons per year: May-June and September-October for golden terrace vistas.\n\n"
            "5. Rustic Gastronomy: Famous Co Lung roasted duck, fragrant bamboo-tube sticky rice (Com lam), and stream fish marinated in wild herbs."
        ),
        "tags": [
            "Pù Luông",
            "Mai Châu",
            "Ruộng bậc thang",
            "Người Thái",
            "Vịt Cổ Lũng",
            "Cọn nước",
            "Thanh Hóa",
            "Hòa Bình",
        ],
    },
    {
        "slug": "sai-gon-cu-chi-dinh-doc-lap-heritage-history",
        "destination_slug": "ho-chi-minh",
        "landmark_name": "TP. Hồ Chí Minh — Dinh Độc Lập, Địa Đạo Củ Chi & 300 Năm Đất Sài Gòn — Gia Định",
        "historical_period": "Lễ Thành Hầu Nguyễn Hữu Cảnh mở cõi 1698, Thời Pháp thuộc (Hòn ngọc Viễn Đông), Đại thắng mùa Xuân 1975",
        "unesco_status": "Địa đạo Củ Chi đang trong quá trình lập hồ sơ đề nghị công nhận Di sản Thế giới UNESCO",
        "best_time_to_visit": "Tháng 12 - 4 (Mùa khô ráo, nắng ấm rực rỡ, trời trong xanh, không lo những cơn mưa rào bất chợt lúc chiều muộn)",
        "signature_cuisine": [
            "Cơm tấm sườn bì chả mỡ hành Sài Gòn",
            "Bánh mì Sài Gòn kẹp thịt chả pate",
            "Hủ tiếu Nam Vang thập cẩm",
            "Ốc đêm chợ Bến Thành / hẻm quận 4",
            "Cà phê sữa đá vỉa hè",
        ],
        "must_try_activities": [
            "Tham quan Dinh Độc Lập — chứng tích lịch sử thời khắc trưa ngày 30/4/1975",
            "Thám hiểm mê cung công sự ngầm Địa đạo Củ Chi dài hơn 250km",
            "Check-in Bưu điện Trung tâm Sài Gòn và Nhà thờ Đức Bà kiến trúc Pháp cổ",
            "Ngắm toàn cảnh thành phố rực rỡ từ đài quan sát Landmark 81",
            "Du ngoạn du thuyền ngắm hoàng hôn và bữa tối lãng mạn trên sông Sài Gòn",
        ],
        "insider_tips": [
            "Khi đi thám hiểm hầm ngầm Củ Chi, những người có tiền sử bệnh tim mạch hoặc hội chứng sợ không gian kín (claustrophobia) nên chọn các đoạn hầm đã được mở rộng",
            "Trải nghiệm cà phê bệt nhà thờ Đức Bà vào buổi sáng sớm là nét văn hóa đô thị chân thực nhất của người Sài Gòn",
            "Hãy cẩn thận bảo quản tư trang điện thoại khi đứng chụp ảnh trên vỉa hè",
        ],
        "ideal_duration": "2N1Đ hoặc 3N2Đ",
        "target_travelers": [
            "Khách du lịch quốc tế tìm hiểu lịch sử hiện đại",
            "Gia đình",
            "Doanh nhân & khách MICE",
        ],
        "recommended_tour_slugs": ["tour-phu-quoc-thien-duong-dao-ngoc-3n2d"],
        "content_vi": (
            "1. Lịch sử 300 năm mở cõi đất Sài Gòn: Năm 1698, Kinh lược sứ Lễ Thành Hầu Nguyễn Hữu Cảnh vâng lệnh Chúa Nguyễn kinh lý phương Nam, "
            "thành lập phủ Gia Định, chính thức đặt nền móng hành chính vững chắc cho mảnh đất Sài Gòn - TP. Hồ Chí Minh hôm nay.\n\n"
            "2. Địa đạo Củ Chi — Thành phố ngầm trong lòng đất: Được mệnh danh là 'Vùng đất thép', hệ thống địa đạo Củ Chi dài hơn 250km "
            "được đào hoàn toàn bằng tay và công cụ thô sơ. Đây là một hệ thống công sự quân sự kỳ vĩ gồm nhiều tầng sâu từ 3 đến 12m, "
            "có đầy đủ bệnh viện dã chiến, phòng họp, bếp Hoàng Cầm không khói, kho vũ khí giúp quân dân miền Nam trụ vững qua bom đạn khốc liệt.\n\n"
            "3. Dinh Độc Lập & Thời khắc Lịch sử 1975: Công trình kiến trúc biểu tượng do kiến trúc sư Ngô Viết Thụ thiết kế kết hợp triết lý phong thủy "
            "phương Đông và hiện đại. Trưa ngày 30/4/1975, chiếc xe tăng 390 húc đổ cổng chính của Dinh, đánh dấu thời khắc thống nhất non sông vẹn toàn.\n\n"
            "4. Thời điểm vàng: Tháng 12 đến tháng 4 mùa khô nắng đẹp.\n\n"
            "5. Ẩm thực sôi động: Cơm tấm sườn nướng mật ong thơm lừng ngõ phố, bánh mì giòn rụm kẹp pate béo ngậy, nhâm nhi ly cà phê sữa đá ven đường."
        ),
        "content_en": (
            "1. 300 Years of Saigon - Gia Dinh: Founded in 1698 by Lord Nguyen Envoy Nguyen Huu Canh, Saigon rapidly blossomed into the 'Pearl of the Far East'.\n\n"
            "2. Cu Chi Underground Tunnels: Known as the 'Iron Land', this 250-kilometer subterranean labyrinth was hand-carved during wartime, featuring hidden clinics, "
            "meeting halls, and smokeless Hoang Cam kitchens beneath carpet bombing.\n\n"
            "3. Independence Palace: Masterpiece of architect Ngo Viet Thu combining modernism and oriental philosophy. On April 30, 1975, tanks entered the gates, "
            "marking the reunification of Vietnam.\n\n"
            "4. Best Season: December to April for warm, dry weather.\n\n"
            "5. Dynamic Gastronomy: Broken rice with honey-glazed pork ribs (Com tam), crispy banh mi baguettes, and iconic sidewalk iced milk coffee."
        ),
        "tags": [
            "Sài Gòn",
            "Dinh Độc Lập",
            "Địa đạo Củ Chi",
            "Nguyễn Hữu Cảnh",
            "Bưu điện Trung tâm",
            "Cơm tấm",
            "Hồ Chí Minh",
        ],
    },
    {
        "slug": "con-dao-hang-duong-heritage-history",
        "destination_slug": "phu-quoc",
        "landmark_name": "Côn Đảo & Nghĩa Trang Hàng Dương — Quần Đảo Nguyên Sinh & Bản Hùng Ca Bất Tử",
        "historical_period": "Chúa Nguyễn Ánh bôn tẩu (1783, Truyền thuyết Bà Phi Yến), Hệ thống Nhà tù Côn Đảo 113 năm (1862 - 1975)",
        "unesco_status": "Vườn Quốc gia Côn Đảo (Khu Ramsar Thế giới & Khu bảo tồn rùa biển số 1 Việt Nam)",
        "best_time_to_visit": "Tháng 3 - 9 (Biển êm ả, sóng lặng, gió nhẹ, mùa rùa biển lên bờ đẻ trứng thiêng liêng; mặc dù có mưa rào nhưng thường chỉ kéo dài 30 phút rồi hửng nắng)",
        "signature_cuisine": [
            "Cháo hàu Côn Đảo béo ngậy",
            "Cá thu một nắng Côn Đảo chiên sốt tỏi ớt",
            "Mứt hạt bàng Côn Đảo giòn bùi mặn ngọt",
            "Ốc vú nàng nướng mỡ hành",
            "Tôm mũ ni hấp sả",
        ],
        "must_try_activities": [
            "Viếng mộ Nữ Anh hùng Võ Thị Sáu tại Nghĩa trang Hàng Dương vào lúc nửa đêm",
            "Thăm Di tích Lịch sử Nhà tù Côn Đảo (Trại Phú Hải, Chuồng Cọp Pháp, Chuồng Cọp Mỹ)",
            "Xem rùa biển đẻ trứng vào ban đêm tại Hòn Bảy Cạnh",
            "Lặn ngắm rạn san hô nguyên sinh tại Hòn Cau và Vịnh Đầm Tre",
            "Tắm biển Bãi Đầm Trầu ngắm máy bay hạ cánh sát mặt biển",
        ],
        "insider_tips": [
            "Lễ viếng Nghĩa trang Hàng Dương thường diễn ra trang trọng vào ban đêm từ 21h00 đến 23h30; trang phục bắt buộc phải lịch sự, kín đáo",
            "Nếu muốn trải nghiệm xem rùa đẻ trứng, cần đăng ký trước với Ban quản lý Vườn Quốc gia Côn Đảo",
            "Mứt hạt bàng rang muối hoặc tẩm đường là món quà đặc sản ý nghĩa nhất mang về từ đảo",
        ],
        "ideal_duration": "3N2Đ",
        "target_travelers": [
            "Du khách hành hương tâm linh & tưởng niệm lịch sử",
            "Người yêu thiên nhiên biển đảo nguyên sơ",
            "Cặp đôi thích sự yên tĩnh",
        ],
        "recommended_tour_slugs": ["tour-phu-quoc-thien-duong-dao-ngoc-3n2d"],
        "content_vi": (
            "1. Lịch sử Bi tráng Nhà tù Côn Đảo 113 năm: Trong suốt hơn 1 thế kỷ (1862–1975), Côn Đảo từng bị biến thành 'Địa ngục trần gian' "
            "với hệ thống Chuồng Cọp Pháp, Chuồng Cọp Mỹ và hầm phân bò tàn khốc giam giữ hàng vạn chiến sĩ yêu nước, nhà cách mạng kiên trung. "
            "Nơi đây đã trở thành trường học cách mạng tôi luyện ý chí bất khuất của dân tộc Việt Nam.\n\n"
            "2. Nghĩa trang Hàng Dương & Liệt nữ Võ Thị Sáu: Nơi yên nghỉ của hơn 2.000 liệt sĩ cách mạng, trong đó có phần mộ nữ anh hùng "
            "Võ Thị Sáu — người con gái Đất Đỏ kiên cường ngẩng cao đầu trước họng súng quân thù ở tuổi 19, trở thành biểu tượng tâm linh thiêng liêng che chở hòn đảo.\n\n"
            "3. Huyền tích Bà Phi Yến & Hoàng tử Cải: Tương truyền khi Nguyễn Ánh lánh nạn ra đảo đã định cầu viện quân Pháp. Thứ phi Phi Yến "
            "khuyên can không nên cõng rắn cắn gà nhà, bèn bị chúa giam vào hang đá. Hoàng tử Cải khóc đòi mẹ liền bị ném xuống biển. Câu hát dân gian: "
            "'Gió đưa cây cải về trời / Rau răm ở lại chịu lời đắng cay' bắt nguồn từ chuyện tình bi thương này.\n\n"
            "4. Thiên đường Bảo tồn Rùa biển: Côn Đảo là nơi bảo tồn rùa biển lớn nhất Việt Nam, nơi du khách có thể tận mắt chứng kiến rùa đẻ trứng lúc nửa đêm.\n\n"
            "5. Thời điểm vàng: Tháng 3 đến tháng 9 biển êm lặng sóng."
        ),
        "content_en": (
            "1. Historic Con Dao Prison Sanctuary (1862–1975): Known historically as 'Hell on Earth' across French and American regimes, "
            "its notorious 'Tiger Cages' incarcerated tens of thousands of Vietnamese freedom fighters.\n\n"
            "2. Hang Duong Cemetery & Heroine Vo Thi Sau: Sacred memorial grounds honoring over 2,000 martyrs, centered around the revered grave "
            "of 19-year-old national heroine Vo Thi Sau.\n\n"
            "3. Legend of Lady Phi Yen: Lord Nguyen Anh's consort who pleaded against foreign military intervention; local folk verses commemorate her timeless loyalty.\n\n"
            "4. Marine Turtle Sanctuary: Vietnam's paramount ecological haven for sea turtle nesting and untouched coral reefs.\n\n"
            "5. Best Season: March to September brings calm, glass-like seas and turtle nesting encounters."
        ),
        "tags": [
            "Côn Đảo",
            "Hàng Dương",
            "Võ Thị Sáu",
            "Nhà tù Côn Đảo",
            "Bà Phi Yến",
            "Rùa biển",
            "Bãi Đầm Trầu",
            "Bảo tồn",
        ],
    },
    {
        "slug": "quy-nhon-ky-co-eo-gio-heritage-history",
        "destination_slug": "da-nang",
        "landmark_name": "Quy Nhơn — Đất Võ Tây Sơn, Kỳ Co — Eo Gió & Dấu Ấn Vương Triều Đồ Bàn Champa",
        "historical_period": "Vương triều Champa Đồ Bàn (Thế kỷ 11 - 15), Triều đại Tây Sơn Quang Trung (Thế kỷ 18), Thi sĩ Hàn Mặc Tử",
        "unesco_status": "Võ cổ truyền Bình Định là Di sản Văn hóa Phi vật thể Quốc gia",
        "best_time_to_visit": "Tháng 3 - 9 (Mùa khô ráo, nắng vàng chan hòa, biển Kỳ Co xanh ngắt hai màu nước, sóng êm thuận lợi đi cano ra đảo)",
        "signature_cuisine": [
            "Bánh xèo tôm nhảy rau mầm giòn rụm",
            "Bún chả cá Quy Nhơn nước dùng ngọt thanh",
            "Bánh ít lá gai dẻo thơm nhân dừa đậu xanh",
            "Chả ram tôm đất giòn tan",
            "Rượu Bàu Đá trứ danh",
        ],
        "must_try_activities": [
            "Đi cano ra bãi tắm Kỳ Co lặn ngắm san hô Bãi Dứa",
            "Dạo bước trên con đường ven biển Eo Gió — nơi ngắm hoàng hôn đẹp nhất Việt Nam",
            "Chiêm ngưỡng Tháp Đôi Champa xây bằng gạch nung ngay giữa lòng thành phố",
            "Thăm Bảo tàng Quang Trung viếng đền thờ Tây Sơn Tam Kiệt và cây me cổ thụ 300 năm",
            "Viếng mộ thi sĩ Hàn Mặc Tử tại Ghềnh Ráng Tiên Sa",
        ],
        "insider_tips": [
            "Eo Gió lộng gió quanh năm, khi đi dạo trên các bậc thang ven biển hãy chú ý giữ mũ nón cẩn thận",
            "Nên đi cano Kỳ Co vào buổi sáng khoảng 8h00 - 11h00 khi thủy triều êm và nước biển trong vắt nhất",
            "Mua quà mang về: Bánh ít lá gai và chả ram tôm đất là hai đặc sản được yêu thích nhất",
        ],
        "ideal_duration": "3N2Đ hoặc 4N3Đ",
        "target_travelers": [
            "Cặp đôi yêu biển xanh hoang sơ",
            "Gia đình yêu lịch sử hào hùng",
            "Nhóm bạn trẻ yêu thích chụp ảnh thiên nhiên",
        ],
        "recommended_tour_slugs": ["tour-hoi-an-da-nang-3n2d"],
        "content_vi": (
            "1. Miền Đất Võ & Vương triều Tây Sơn: Bình Định là cội nguồn phát tích của phong trào khởi nghĩa Tây Sơn hào hùng thế kỷ 18 "
            "với anh hùng áo vải cờ đào Quang Trung - Nguyễn Huệ, vị hoàng đế bách chiến bách thắng đã chỉ huy chiến dịch thần tốc đại phá 29 vạn quân Mãn Thanh năm 1789.\n\n"
            "2. Di sản Đô thành Champa Đồ Bàn: Từng là kinh đô Vijaya phồn thịnh của Champa hơn 5 thế kỷ (thế kỷ 11–15), Quy Nhơn lưu giữ hệ thống "
            "tháp Chăm đồ sộ bậc nhất Việt Nam: Tháp Đôi, Tháp Bánh Ít, Tháp Dương Long với nghệ thuật điêu khắc hoa văn đá tinh xảo.\n\n"
            "3. Kỳ Co — Eo Gió & Ghềnh Ráng Tiên Sa: Eo Gió với những rặng núi đá uốn lượn ôm trọn bờ biển lộng gió, Kỳ Co trong vắt hai màu nước xanh ngọc, "
            "và Ghềnh Ráng Tiên Sa nơi thi sĩ tài hoa Hàn Mặc Tử gửi gắm những vần thơ bất hủ trăng sao.\n\n"
            "4. Thời điểm vàng: Tháng 3 đến tháng 9 biển êm nắng ấm chan hòa.\n\n"
            "5. Ẩm thực xứ Nẫu: Bánh xèo tôm nhảy tươi rói nhảy tanh tách trên chảo dầu, chả ram tôm đất giòn rụm, rượu Bàu Đá đậm đà men say."
        ),
        "content_en": (
            "1. Martial Arts Cradle & Tay Son Monarchy: Birthplace of Emperor Quang Trung (Nguyen Hue), who led the lightning 1789 campaign defeating 290,000 Qing troops.\n\n"
            "2. Vijaya Champa Imperial Legacy: Capital of Champa from the 11th to 15th centuries, preserving monumental brick shrines: Thap Doi and Banh It towers.\n\n"
            "3. Ky Co - Eo Gió & Ghenh Rang: Eo Gió's dramatic coastal windswept cliffs, Ky Co's turquoise lagoon, and the poetic resting sanctuary of poet Han Mac Tu.\n\n"
            "4. Best Season: March to September offers tranquil waters and vivid sunshine.\n\n"
            "5. Binh Dinh Cuisine: Jumping shrimp sizzling pancakes (Banh xeo tom nhay), crispy earth shrimp spring rolls, and Bau Da traditional rice liquor."
        ),
        "tags": [
            "Quy Nhơn",
            "Kỳ Co",
            "Eo Gió",
            "Quang Trung",
            "Tây Sơn",
            "Tháp Đôi",
            "Hàn Mặc Tử",
            "Bình Định",
        ],
    },
    {
        "slug": "phu-yen-ganh-da-dia-heritage-history",
        "destination_slug": "nha-trang",
        "landmark_name": "Phú Yên — Gành Đá Đĩa Kỳ Vĩ, Mũi Điện Đón Bình Minh & Dấu Ấn Tàu Không Số Vũng Rô",
        "historical_period": "Núi lửa phun trào hàng triệu năm trước, Hải đăng Đại Lãnh 1890, Bến Tàu Không Số Vũng Rô (1964 - 1965)",
        "unesco_status": "Gành Đá Đĩa được xếp hạng Di tích Thắng cảnh Quốc gia Đặc biệt (2020)",
        "best_time_to_visit": "Tháng 2 - 8 (Mùa khô xứ Nẫu, biển trong xanh màu ngọc, nắng ấm rực rỡ, thích hợp để đón bình minh Mũi Điện và check-in cánh đồng rêu xanh)",
        "signature_cuisine": [
            "Mắt cá ngừ đại dương hầm thuốc bắc béo ngậy",
            "Bánh canh hẹ chả cá Phú Yên xanh mướt",
            "Gỏi cá mai đầm Ô Loan",
            "Sò huyết đầm Ô Loan nướng mọi",
            "Cơm gà Phú Yên vàng ươm",
        ],
        "must_try_activities": [
            "Chiêm ngưỡng kỳ quan tổ ong đá bazan đen óng tại Gành Đá Đĩa",
            "Chinh phục ngọn hải đăng Đại Lãnh (Mũi Điện) — nơi đón ánh bình minh đầu tiên trên đất liền Việt Nam",
            "Thăm Di tích Lịch sử Vịnh Vũng Rô và bến tàu Không Số huyền thoại",
            "Check-in Bãi Xép — 'Tôi thấy hoa vàng trên cỏ xanh'",
            "Thưởng thức hải sản tươi sống trên bè nổi đầm Ô Loan",
        ],
        "insider_tips": [
            "Để đón được khoảnh khắc mặt trời mọc đầu tiên tại Mũi Điện, du khách nên thức dậy từ 4h00 sáng và bắt đầu đi bộ lên ngọn hải đăng lúc 4h45",
            "Tại Gành Đá Đĩa, đá ven biển có thể trơn do rêu biển ướt, hãy đi giày đế bám và tránh bước quá sát mép sóng lớn",
            "Mắt cá ngừ đại dương hầm thố đất giữ nhiệt rất nóng, hãy thưởng thức từ từ cùng rau tía tô thái sợi",
        ],
        "ideal_duration": "2N1Đ hoặc 3N2Đ kết hợp Quy Nhơn",
        "target_travelers": [
            "Những người yêu thích kỳ quan địa chất độc nhất vô nhị",
            "Khách du lịch yêu phong cảnh lãng mạn",
            "Nhiếp ảnh gia bình minh",
        ],
        "recommended_tour_slugs": ["tour-da-lat-thanh-pho-ngan-hoa-3n2d"],
        "content_vi": (
            "1. Tuyệt tác Địa chất Gành Đá Đĩa: Được hình thành từ quá trình dung nham núi lửa phun trào cách đây hàng triệu năm gặp nước biển lạnh "
            "đông cứng lại và rạn nứt thành hàng vạn cột đá bazan hình lục lăng, ngũ lăng xếp chồng khít khao lên nhau như một tổ ong khổng lồ vươn ra biển khơi, "
            "là một trong những kỳ quan cột đá bazan hiếm hoi bậc nhất hành tinh.\n\n"
            "2. Mũi Điện (Mũi Đại Lãnh) — Đón ánh bình minh đầu tiên: Ngọn hải đăng do người Pháp xây dựng năm 1890 sừng sững trên vách đá 110m. "
            "Nơi đây được xác định là một trong những điểm đón ánh bình minh sớm nhất trên đất liền Việt Nam, nơi đất trời giao hòa trong rạng đông hồng rực.\n\n"
            "3. Huyền thoại Tàu Không Số Vũng Rô: Vịnh Vũng Rô kín gió là bến đỗ lịch sử của những chuyến Tàu Không Số thuộc đoàn tàu cảm tử 759 "
            "vận chuyển vũ khí tiếp tế cho chiến trường miền Nam trong cuộc kháng chiến chống Mỹ cứu nước.\n\n"
            "4. Thời điểm vàng: Tháng 2 đến tháng 8 mùa khô trong lành.\n\n"
            "5. Ẩm thực nức tiếng: Mắt cá ngừ đại dương hầm thuốc bắc bùi béo bổ dưỡng, sò huyết đầm Ô Loan đỏ au nướng mỡ hành đậm đà vị biển."
        ),
        "content_en": (
            "1. Ganh Da Dia Basalt Phenomenon: Formed millions of years ago when volcanic lava met ocean waters, fracturing into tens of thousands "
            "of interlocking hexagonal basalt prisms resembling a giant mythological honeycomb.\n\n"
            "2. Dai Lanh Lighthouse (Mui Dien): Constructed by the French in 1890, this eastern headland greets the very first rays of dawn across mainland Vietnam.\n\n"
            "3. Vung Ro Unnumbered Ships Heritage: A sheltered deep-water cove serving as the clandestine naval terminal for the legendary maritime Ho Chi Minh trail.\n\n"
            "4. Best Season: February to August for radiant sunshine and sapphire coastal vistas.\n\n"
            "5. Unique Gastronomy: Ocean tuna eyeball herbal stew, O Loan lagoon blood cockles, and green chive fishcake noodle soup."
        ),
        "tags": [
            "Phú Yên",
            "Gành Đá Đĩa",
            "Mũi Điện",
            "Vũng Rô",
            "Tàu Không Số",
            "Hải đăng",
            "Đầm Ô Loan",
            "Mắt cá ngừ",
        ],
    },
]
