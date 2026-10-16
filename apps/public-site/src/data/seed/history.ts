/**
 * ─────────────────────────────────────────────────────────────────────────────
 * STAR TRAVELS VIETNAM — HERITAGE & HISTORICAL LEGENDS SEED DATA
 * ─────────────────────────────────────────────────────────────────────────────
 * Dữ liệu lịch sử, huyền tích, thời điểm vàng & ẩm thực các danh lam thắng cảnh Việt Nam.
 * Đồng bộ hóa tuyệt đối với RAG Knowledge Store của backend (AssistantKnowledgeChunk).
 * ─────────────────────────────────────────────────────────────────────────────
 */

export interface HeritageHistoryItem {
  id: string;
  slug: string;
  name: string;
  nameEn: string;
  destinationSlug: string;
  historicalPeriod: string;
  unescoStatus?: string;
  historicalEra: string;
  keyFigures: string[];
  bestTimeToVisit: string;
  signatureCuisine: string[];
  mustTryActivities: string[];
  insiderTips: string[];
  idealDuration: string;
  targetTravelers: string[];
  historicalSummaryVi: string;
  historicalSummaryEn: string;
  legendStoryVi: string;
  legendStoryEn: string;
  recommendedTourSlugs: string[];
}

export const VIETNAM_HERITAGE_HISTORY: HeritageHistoryItem[] = [
  {
    id: "hist-01",
    slug: "ha-long-heritage-history",
    name: "Vịnh Hạ Long & Vịnh Lan Hạ",
    nameEn: "Ha Long Bay & Lan Ha Bay",
    destinationSlug: "ha-long",
    historicalPeriod: "Thời kỳ Hồng Bàng, Chiến tranh Đại Việt - Nguyên Mông (1288) & Di chỉ Cái Bèo (7.000 năm)",
    unescoStatus: "Di sản Thiên nhiên Thế giới UNESCO (1994, 2000, 2023)",
    historicalEra: "Huyền sử & Triều Trần (Thế kỷ 13)",
    keyFigures: ["Rồng Mẹ & Đàn Rồng Con", "Trần Hưng Đạo", "Cư dân Tiền sử Hạ Long - Cái Bèo"],
    bestTimeToVisit: "Tháng 4 - 6 và Tháng 9 - 11 (Tiết trời mát mẻ, nắng vàng êm ả, biển ngọc trong xanh)",
    signatureCuisine: ["Chả mực giã tay Hạ Long", "Sá sùng Quan Lạn", "Bún bề bề", "Sam biển 7 món"],
    mustTryActivities: ["Du thuyền ngủ đêm ngắm hoàng hôn vịnh ngọc", "Chèo kayak luồn qua Hang Luồn", "Thăm di chỉ Cái Bèo 7.000 năm"],
    insiderTips: ["Nên chọn du thuyền 5 sao ngủ đêm trên vịnh để chiêm ngưỡng bình minh lúc 5h30 sáng", "Tránh đi vào tháng 7-8 vì dễ có bão nhiệt đới"],
    idealDuration: "2N1Đ hoặc 3N2Đ",
    targetTravelers: ["Gia đình", "Cặp đôi nghỉ dưỡng trăng mật", "Khách quốc tế"],
    historicalSummaryVi:
      "Vịnh Hạ Long gắn liền với di chỉ khảo cổ học Soi Nhụ, Cái Bèo niên đại 7.000 năm trước. Trong lịch sử quân sự Đại Việt, vùng vịnh và sông Bạch Đằng kế cận là nơi Quốc công Tiết chế Hưng Đạo Đại vương Trần Quốc Tuấn lập trận địa cọc gỗ đánh tan đoàn thuyền lương quân Nguyên Mông năm 1288.",
    historicalSummaryEn:
      "Ha Long Bay preserves prehistoric archaeological remains dating back 7,000 years (Cai Beo culture). Historically, its waters connected to the Bach Dang River where General Tran Hung Dao defeated the Mongol fleet in 1288.",
    legendStoryVi:
      "Tương truyền thuở mới lập nước, giặc ngoại xâm phương Bắc ồ ạt kéo sang cướp bóc. Ngọc Hoàng phái Rồng Mẹ mang theo đàn Rồng Con giáng trần giúp người Việt đánh giặc. Khi thuyền giặc ồ ạt tiến vào bờ, đàn Rồng phun vô số ngọc châu và châu báu. Những viên ngọc vừa chạm mặt nước liền biến thành hàng nghìn hòn đảo đá vôi kỳ vĩ sừng sững, đâm thủng thuyền giặc, tạo nên bức thành lũy chở che đất nước. Sau chiến thắng, đàn Rồng quyết định ở lại trần gian: nơi Rồng Mẹ đáp xuống gọi là Hạ Long, nơi Rồng Con quây quần gọi là Bái Tử Long, và nơi đuôi rồng quạt bọt trắng xóa là Bạch Long Vĩ.",
    legendStoryEn:
      "According to ancient myth, the Jade Emperor sent the Mother Dragon and her offspring to protect ancient Vietnam. The dragons spat emeralds and pearls into the sea, which transformed into thousands of limestone karst pillars, shattering the invading armada. The dragons chose to remain on Earth: where the Mother Dragon descended is called Ha Long ('Descending Dragon').",
    recommendedTourSlugs: ["tour-ha-long-cruise-2n1d"],
  },
  {
    id: "hist-02",
    slug: "hoi-an-heritage-history",
    name: "Đô Thị Cổ Hội An & Chùa Cầu (Lai Viễn Kiều)",
    nameEn: "Hoi An Ancient Town & Japanese Covered Bridge",
    destinationSlug: "hoi-an",
    historicalPeriod: "Thế kỷ 16 - 17 (Thời kỳ Thương cảng Quốc tế Faifo - Chúa Nguyễn)",
    unescoStatus: "Di sản Văn hóa Thế giới UNESCO (1999)",
    historicalEra: "Thời Chúa Nguyễn Hoàng & Nguyễn Phúc Chu (Thế kỷ 17 - 18)",
    keyFigures: ["Chúa Nguyễn Hoàng", "Chúa Nguyễn Phúc Chu", "Thương nhân Nhật Bản Shuin-sen", "Thương nhân Hoa Kiều"],
    bestTimeToVisit: "Tháng 2 - 7 (Mùa khô ráo, nắng ấm, bầu trời trong vắt, đêm rằm 14 âm lịch phố cổ tắt đèn hoa đăng)",
    signatureCuisine: ["Cao lầu Hội An", "Mì Quảng gà ta", "Cơm gà bà Buội", "Bánh mì Phượng / Madam Khánh", "Nước Mót sen"],
    mustTryActivities: ["Dạo phố cổ thả hoa đăng trên sông Hoài", "Chiêm bái Chùa Cầu", "Xem show thực cảnh Ký Ức Hội An", "Chèo thuyền thúng Rừng dừa Bảy Mẫu"],
    insiderTips: ["Dậy lúc 6h sáng để ngắm Hội An thanh bình khi chưa đông khách", "Đến vào đêm rằm 14 âm lịch để ngắm hàng ngàn đèn lồng thắp sáng"],
    idealDuration: "2N1Đ hoặc 3N2Đ",
    targetTravelers: ["Cặp đôi lãng mạn", "Người yêu kiến trúc hoài niệm", "Gia đình yêu văn hóa"],
    historicalSummaryVi:
      "Dưới thời các Chúa Nguyễn ở Đàng Trong, Hội An mang tên Faifo phát triển thành thương cảng mậu dịch phồn thịnh bậc nhất Đông Nam Á. Nơi đây từng là điểm giao thương giữa thuyền buôn Bồ Đào Nha, Nhật Bản (thời kỳ Châu Ấn thuyền), Trung Hoa, Hà Lan và Anh.",
    historicalSummaryEn:
      "During the reign of the Nguyen Lords, Hoi An (Faifo) became the premier international trading port of Southeast Asia, connecting Portuguese, Japanese, Chinese, and Dutch merchants along maritime silk and ceramic routes.",
    legendStoryVi:
      "Người Nhật thời xưa tin rằng dưới đáy đại dương có một con thủy quái khổng lồ tên là Mamazu (người Việt gọi là con Cù). Đầu của con quái vật nằm ở tận xứ Phù Tang (Nhật Bản), thân mình vắt qua bờ biển Hội An (Việt Nam), và đuôi thì vươn tận Ấn Độ. Mỗi lần con Mamazu trở mình quẫy đuôi, đất nước Nhật Bản sẽ hứng chịu động đất sóng thần kinh hoàng, còn Hội An sẽ bị lũ lụt tàn phá. Đầu thế kỷ 17, các thương nhân Nhật Bản tại Hội An đã chung tay xây dựng chiếc Cầu Mái Ngói bắc ngang qua lạch nước nhỏ để cắm thẳng một thanh kiếm thiêng vào lưng con quái vật, yểm phục không cho nó cựa mình.",
    legendStoryEn:
      "Japanese traders believed a subterranean leviathan named Mamazu (the Cu monster) lay across Asia: head in Japan, torso in Hoi An, tail in India. Its movements triggered earthquakes and tidal waves. In the early 1600s, Japanese merchants erected the Covered Bridge as a sacred sword pinned into Mamazu's back to keep peace and fortune across the port.",
    recommendedTourSlugs: ["tour-hoi-an-memories-show"],
  },
  {
    id: "hist-03",
    slug: "ninh-binh-trang-an-hoa-lu-history",
    name: "Quần Thể Danh Thắng Tràng An & Cố Đô Hoa Lư",
    nameEn: "Trang An Scenic Landscape Complex & Ancient Capital Hoa Lu",
    destinationSlug: "ninh-binh",
    historicalPeriod: "Kinh đô Đại Cồ Việt (968 - 1010) & Hành cung Vũ Lâm thời Trần",
    unescoStatus: "Di sản Kép Văn hóa và Thiên nhiên Thế giới UNESCO (2014)",
    historicalEra: "Nhà Đinh, Tiền Lê, đầu Nhà Lý & Kháng chiến chống Nguyên Mông Nhà Trần",
    keyFigures: ["Đinh Tiên Hoàng (Đinh Bộ Lĩnh)", "Lê Đại Hành (Lê Hoàn)", "Thái hậu Dương Vân Nga", "Lý Thái Tổ", "Trần Thái Tông"],
    bestTimeToVisit: "Tháng 1 - 3 âm lịch (Mùa lễ hội chùa Bái Đính) và Tháng 5 - 6 (Mùa lúa chín vàng Tam Cốc)",
    signatureCuisine: ["Thịt dê núi Ninh Bình", "Cơm cháy giòn rụm", "Ốc núi hấp sả", "Xôi trứng kiến Nho Quan"],
    mustTryActivities: ["Ngồi thuyền nan chèo tay xuyên thủy động Tràng An", "Leo 500 bậc đá Hang Múa ngắm toàn cảnh Tam Cốc", "Dâng hương Cố đô Hoa Lư"],
    insiderTips: ["Tuyến thuyền Tràng An số 2 hoặc 3 có cảnh quan đẹp nhất", "Leo Hang Múa lúc 16h30 để đón hoàng hôn"],
    idealDuration: "1 ngày hoặc 2N1Đ",
    targetTravelers: ["Gia đình", "Du khách yêu tâm linh & lịch sử dựng nước", "Cặp đôi"],
    historicalSummaryVi:
      "Năm 968, Đinh Bộ Lĩnh dẹp yên 12 sứ quân, xưng Hoàng đế (Đinh Tiên Hoàng), đặt quốc hiệu Đại Cồ Việt và chọn Hoa Lư làm kinh đô. Nơi đây có địa thế non hiểm 'thành lũy thiên nhiên' với núi đá vôi trùng điệp bao bọc, sông Hoàng Long bảo vệ lũy ngoài. Đến năm 1010, Lý Thái Tổ viết Chiếu dời đô từ Hoa Lư về Thăng Long.",
    historicalSummaryEn:
      "In 968 AD, Emperor Dinh Tien Hoang unified Vietnam and chose Hoa Lu as the first centralized capital of Dai Co Viet. In 1010, King Ly Thai To issued the Edict of Relocating the Capital from Hoa Lu to Thang Long (Hanoi). In the 13th century, Kings Tran Thai Tong and Tran Nhan Tong built Vu Lam Palace here as a military headquarters against the Mongol invasions.",
    legendStoryVi:
      "Huyền tích kể về thuở ấu thơ của Đinh Bộ Lĩnh chăn trâu ở thung lũng Gia Viễn. Cậu bé thông minh đã tập hợp trẻ mục đồng chia phe đánh trận giả, bẻ bông lau làm cờ xuất quân. Khi thắng trận, đám bạn mục đồng đan tay làm kiệu rước cậu bé như một vị thiên tử. Lớn lên, dựa vào dãy núi đá vôi Tràng An 'thành thông cắt lối', ông dùng chiến thuật khép mở dòng nước để dẹp tan 12 sứ quân cát cứ, mở ra thời kỳ độc lập tự chủ vàng son cho dân tộc.",
    legendStoryEn:
      "Legend tells of young Dinh Bo Linh herding water buffalo in the karst valleys, organizing mock battles with reed flowers as imperial flags. His innate charisma led him to rally the people, conquer the 12 feuding warlords, and crown himself the first emperor of independent feudal Vietnam.",
    recommendedTourSlugs: ["tour-ninh-binh-trang-an-1d"],
  },
  {
    id: "hist-04",
    slug: "hue-heritage-history",
    name: "Quần Thể Di Tích Cố Đô Huế & Sông Hương",
    nameEn: "Complex of Hue Monuments & Perfume River",
    destinationSlug: "hue",
    historicalPeriod: "Kinh đô Triều Nguyễn (1802 - 1945)",
    unescoStatus: "Di sản Văn hóa Thế giới UNESCO (1993)",
    historicalEra: "Triều Nguyễn (13 đời vua, từ Gia Long đến Bảo Đại)",
    keyFigures: ["Vua Gia Long", "Vua Minh Mạng", "Vua Tự Đức", "Vua Khải Định", "Vua Bảo Đại"],
    bestTimeToVisit: "Tháng 1 - 4 (Thời tiết mùa xuân mát mẻ, hoa sen nở rộ, tránh nắng gắt tháng 6-7 và mưa dầm tháng 10-11)",
    signatureCuisine: ["Bún bò Huế giò heo", "Cơm hến & Bún hến cồn Hến", "Bánh bèo, nậm, lọc", "Chè bột lọc bọc heo quay"],
    mustTryActivities: ["Tham quan Đại Nội Huế", "Đi thuyền rồng ngắm hoàng hôn sông Hương nghe Nhã nhạc", "Viếng Lăng Tự Đức, Khải Định, Minh Mạng", "Chiêm bái Chùa Thiên Mụ"],
    insiderTips: ["Nên thuê hướng dẫn viên thuyết minh tại Đại Nội để thấu hiểu câu chuyện lịch sử triều Nguyễn", "Mặc trang phục lịch sự qua đầu gối khi vào lăng tẩm"],
    idealDuration: "2N1Đ hoặc 3N2Đ",
    targetTravelers: ["Người yêu lịch sử & văn hóa truyền thống", "Du khách trung niên & gia đình"],
    historicalSummaryVi:
      "Năm 1802, Nguyễn Ánh thống nhất giang sơn từ Nam chí Bắc, lên ngôi Hoàng đế lấy niên hiệu Gia Long và chọn Phú Xuân (Huế) làm quốc đô. Kinh thành Huế được khởi công xây dựng năm 1805, kết hợp giữa nguyên lý dịch lý phương Đông, thuyết Ngũ hành và kỹ thuật thành lũy quân sự Vauban của phương Tây.",
    historicalSummaryEn:
      "Hue served as the imperial capital of unified Vietnam from 1802 to 1945 under 13 emperors of the Nguyen Dynasty. The Citadel masterfully synthesizes Oriental feng-shui with French Vauban military fortification geometry.",
    legendStoryVi:
      "Dòng Sông Hương mang huyền tích về hương thơm kỳ lạ của cỏ Thạch bồn mọc hai bên bờ đầu nguồn trôi xuôi về cố đô. Nhưng nổi tiếng nhất là truyền thuyết lập Chùa Thiên Mụ: Năm 1601, Chúa Tiên Nguyễn Hoàng đi kinh lý vùng đất Thuận Hóa, đến bên đồi Hà Khê thấy sông Hương uốn lượn như dải lụa. Dân làng kể rằng ban đêm thường có một bà lão áo đỏ quần lục tóc bạc phơ hiện ra trên đồi, báo trước rằng sẽ có vị chân chúa đến đây dựng chùa tụ khí linh thiêng cho nước nhà bền vững.",
    legendStoryEn:
      "Legend states that in 1601, Lord Nguyen Hoang met local villagers on Ha Khe hill by the Perfume River who spoke of a celestial lady dressed in red who prophesied that a true ruler would build a pagoda on this hill to channel divine energy for the nation's eternal peace.",
    recommendedTourSlugs: ["tour-hue-heritage-1d"],
  },
  {
    id: "hist-05",
    slug: "ha-giang-dong-van-heritage-history",
    name: "Cao Nguyên Đá Đồng Văn & Đèo Mã Pí Lèng",
    nameEn: "Dong Van Karst Plateau & Ma Pi Leng Pass",
    destinationSlug: "ha-giang",
    historicalPeriod: "Kiến tạo địa chất 500 triệu năm, Lịch sử Vua Mèo & Kỳ tích mở đường Hạnh Phúc (1959 - 1965)",
    unescoStatus: "Công viên Địa chất Toàn cầu UNESCO (2010)",
    historicalEra: "Kỷ Cambri - Cacbon và Thời kỳ hiện đại (Thanh niên xung phong 1959-1965)",
    keyFigures: ["Vương Chính Đức (Vua Mèo)", "Vương Chí Sình", "Hơn 1.200 Thanh niên xung phong mở đường Hạnh Phúc"],
    bestTimeToVisit: "Tháng 9 - 10 (Mùa lúa chín vàng) và Tháng 10 - 12 (Mùa hoa tam giác mạch phủ hồng cao nguyên đá)",
    signatureCuisine: ["Cháo ấu tẩu giải cảm", "Thắng cố ngựa chợ phiên", "Thịt lợn đen gác bếp", "Bánh tam giác mạch nướng", "Rượu ngô men lá"],
    mustTryActivities: ["Chinh phục đèo Mã Pí Lèng", "Đi thuyền máy hẻm vực Tu Sản sông Nho Quế", "Thăm Dinh thự Vua Mèo", "Chạm tay vào Cột cờ Lũng Cú"],
    insiderTips: ["Nên thuê xe riêng kèm tài xế bản địa nếu chưa quen lái đèo dốc hiểm trở", "Mang theo áo ấm chắn gió vì ban đêm nhiệt độ xuống rất thấp"],
    idealDuration: "3N2Đ hoặc 4N3Đ",
    targetTravelers: ["Phượt thủ & tín đồ mê xê dịch", "Nhiếp ảnh gia phong cảnh", "Người yêu văn hóa vùng cao"],
    historicalSummaryVi:
      "Đồng Văn lưu giữ các trang sử tiến hóa của vỏ Trái Đất qua các kỷ địa chất Cambri, Devon, Cacbon từ 500 triệu năm trước. Về mặt nhân văn, nơi đây là thủ phủ của người H'Mông và dinh thự Vua Mèo họ Vương. Đèo Mã Pí Lèng được mệnh danh là 'Đệ nhất hùng quan' với kỳ tích mở đường Hạnh Phúc gian lao hiểm trở kéo dài 6 năm.",
    historicalSummaryEn:
      "Dong Van preserves 500 million years of planetary history across limestone layers. Culturally, it is home to the H'Mong royalty palace of Vuong Chinh Duc. The dramatic Ma Pi Leng Pass was carved by over 1,200 volunteers between 1959 and 1965 hanging suspended on cliffs above the emerald Nho Que River.",
    legendStoryVi:
      "Tên gọi 'Mã Pí Lèng' trong tiếng Quan Hỏa có nghĩa là 'sống mũi con ngựa' — tượng trưng cho đỉnh núi dốc đứng đến mức ngựa leo lên phải tắt thở. Để đục mở đoạn đèo 20km treo leo qua hẻm vực Tu Sản sâu ngút ngàn, đội 'cảm tử quân' gồm 17 chàng thanh niên đã tình nguyện đeo dây thừng lơ lửng trên vách đá ròng rã suốt 11 tháng trời, dùng búa tạ và xà beng đục từng tấc đá mở đường.",
    legendStoryEn:
      "Ma Pi Leng means 'horse's bridge of the nose' in Chinese Mandarin dialect, describing an ascent so sheer that horses died of exhaustion. The 20-kilometer pass over Tu San Canyon was conquered by a suicide-volunteer squad of 17 young men who hung from ropes over the abyss for 11 straight months chisel by chisel.",
    recommendedTourSlugs: ["tour-ha-giang-loop-3n2d"],
  },
  {
    id: "hist-06",
    slug: "sa-pa-fansipan-heritage-history",
    name: "Sa Pa, Thung Lũng Mường Hoa & Fansipan",
    nameEn: "Sa Pa, Muong Hoa Valley & Mount Fansipan",
    destinationSlug: "sa-pa",
    historicalPeriod: "Văn hóa bản địa H'Mông - Dao, Bãi đá cổ Mường Hoa & Trạm nghỉ dưỡng Pháp cổ 1903",
    unescoStatus: "Ruộng bậc thang Sa Pa lọt top Di sản ruộng bậc thang kỳ vĩ nhất thế giới",
    historicalEra: "Thời tiền sử (Bãi đá cổ) & Thời Pháp thuộc (Đầu thế kỷ 20)",
    keyFigures: ["Nhà khảo cổ học Victor Goloubew (EFEO)", "Các thủ lĩnh bộ tộc H'Mông, Dao đỏ"],
    bestTimeToVisit: "Tháng 9 - 10 (Mùa lúa chín vàng thung lũng Mường Hoa) và Tháng 12 - 2 (Mùa đông săn mây, săn tuyết trắng và hoa đào rừng)",
    signatureCuisine: ["Cá hồi & cá tầm lẩu măng chua", "Lợn cắp nách nướng than hoa", "Thịt trâu gác bếp", "Cơm lam nướng ống tre"],
    mustTryActivities: ["Chinh phục đỉnh Fansipan 3.143m bằng cáp treo 3 dây", "Trekking bản Tả Van ngắm ruộng bậc thang", "Tắm lá thuốc người Dao Đỏ cổ truyền"],
    insiderTips: ["Lên đỉnh Fansipan vào khoảng 10h00 sáng khi nắng lên xua tan sương mù", "Chuẩn bị áo khoác dày vì đỉnh Fansipan nhiệt độ thấp hơn thị xã 8-10°C"],
    idealDuration: "2N1Đ hoặc 3N2Đ",
    targetTravelers: ["Cặp đôi săn mây", "Gia đình nghỉ dưỡng", "Du khách yêu leo núi"],
    historicalSummaryVi:
      "Sa Pa được người Pháp phát hiện năm 1903 và quy hoạch thành trạm nghỉ dưỡng trên cao cho sĩ quan và công chức thời thuộc địa. Nơi đây sở hữu Đỉnh Fansipan cao 3.143m — Nóc nhà Đông Dương. Thung lũng Mường Hoa trải rộng những dải ruộng bậc thang hàng trăm năm tuổi cùng Bãi đá cổ Sa Pa với hơn 200 khối đá khắc hình họa bí ẩn.",
    historicalSummaryEn:
      "Sa Pa was discovered by French surveyors in 1903 and developed into an Alpine hill station. It hosts Fansipan (3,143m), the highest peak in Indochina, and the Muong Hoa Valley ancient rock field with un-deciphered petroglyphs discovered in 1925 by archaeologist Victor Goloubew.",
    legendStoryVi:
      "Đỉnh Fansipan trong tiếng H'Mông gọi là 'Hủa Xi Pan' có nghĩa là 'phiến đá khổng lồ chênh vênh'. Người bản địa lưu truyền rằng những khối đá cổ tại Mường Hoa chính là bản đồ sao thiên văn và lời nhắn nhủ của các vị thần cổ xưa về dòng giống sinh tồn của con người giữa trần thế.",
    legendStoryEn:
      "Fansipan is known locally as 'Hua Xi Pan', meaning 'the giant swaying rock slab'. Indigenous hill tribes believe the carved rocks of Muong Hoa are celestial star maps and spiritual chronicles left by celestial guardians before the Great Flood.",
    recommendedTourSlugs: ["tour-sapa-fansipan-2n1d"],
  },
  {
    id: "hist-07",
    slug: "da-lat-langbiang-heritage-history",
    name: "Đà Lạt, Langbiang & Di Sản Kiến Trúc Biệt Điện",
    nameEn: "Da Lat, Mount Langbiang & French Architectural Heritage",
    destinationSlug: "da-lat",
    historicalPeriod: "Bác sĩ Alexandre Yersin phát hiện 1893, Dinh Bảo Đại & Ga xe lửa bánh răng cưa 1932",
    unescoStatus: "Khu dự trữ sinh quyển thế giới Langbiang UNESCO (2015)",
    historicalEra: "Thời Pháp thuộc (1893 - 1945) & Triều Hoàng đế Bảo Đại",
    keyFigures: ["Bác sĩ Alexandre Yersin", "Toàn quyền Paul Doumer", "Hoàng đế Bảo Đại & Hoàng hậu Nam Phương"],
    bestTimeToVisit: "Tháng 11 - 3 (Mùa hoa dã quỳ, hoa mai anh đào nở hồng khắp phố, thời tiết se lạnh khô ráo)",
    signatureCuisine: ["Lẩu gà lá é Tao Ngộ", "Bánh tráng nướng Đà Lạt", "Bánh căn xíu mại nước béo", "Lẩu bò Ba Toa", "Kem bơ sáp"],
    mustTryActivities: ["Săn mây bình minh đồi chè Cầu Đất lúc 5h00 sáng", "Chinh phục đỉnh Radar Langbiang bằng xe Jeep", "Thăm Dinh III Bảo Đại", "Đi tàu cổ Đà Lạt - Trại Mát"],
    insiderTips: ["Nhiệt độ Đà Lạt ban đêm hạ xuống 13 - 15°C, luôn mang áo len hoặc cardigan", "Tránh hái dâu tây ở các vườn 'cò mồi' ven đường đèo"],
    idealDuration: "3N2Đ hoặc 4N3Đ",
    targetTravelers: ["Cặp đôi trăng mật", "Người yêu kiến trúc hoài niệm", "Nhóm bạn trẻ yêu thích cafe săn mây"],
    historicalSummaryVi:
      "Vào ngày 21/6/1893, bác sĩ vi trùng học Alexandre Yersin đặt chân lên cao nguyên Lang Biang sau chuyến thám hiểm gian khổ. Nhận thấy khí hậu ôn đới quanh năm mát mẻ, Toàn quyền Paul Doumer quyết định xây dựng nơi đây thành thủ đô mùa hè của Liên bang Đông Dương với hơn 1.500 biệt thự Pháp cổ, Dinh I, II, III của vua Bảo Đại và Ga Đà Lạt.",
    historicalSummaryEn:
      "On June 21, 1893, French-Swiss bacteriologist Dr. Alexandre Yersin reached the Lang Biang plateau. Governor-General Paul Doumer transformed it into a European temperate hill station with over 1,500 Art Deco and Belle Époque villas, the Cog Railway station, and Emperor Bao Dai's palaces.",
    legendStoryVi:
      "Chuyện tình huyền thoại Langbiang: Chàng K'Lang (tộc Lát) và nàng H'Biang (tộc Chil) yêu nhau tha thiết nhưng vấp phải luật tục cấm kỵ giữa hai bộ tộc thù địch. Hai người trốn lên đỉnh núi sinh sống. Khi quân làng đuổi theo truy sát bắn tên độc vào chàng K'Lang, nàng H'Biang đã lấy thân mình đỡ tên và hy sinh. Chàng K'Lang khóc cạn nước mắt rồi chết theo nàng. Nước mắt chàng hóa thành dòng suối Vàng (Đạ Đằng), còn thi hài hai người hóa thành hai ngọn núi đôi sừng sững gối đầu vào nhau — đỉnh Langbiang vĩnh hằng.",
    legendStoryEn:
      "The legend of Langbiang: Chieftain son K'Lang and maiden H'Biang fell deeply in love despite ancient tribal blood feuds. Banished together onto the mountains, when warriors fired a poisoned arrow at K'Lang, H'Biang shielded him with her chest and died in his arms. His grief formed the Golden Stream, and their entwined bodies formed the twin peaks of Mount Langbiang.",
    recommendedTourSlugs: ["tour-da-lat-healing-retreat-3n2d"],
  },
  {
    id: "hist-08",
    slug: "phu-quoc-dao-ngoc-heritage-history",
    name: "Đảo Ngọc Phú Quốc & Dấu Ấn Khai Hoang Mạc Cửu",
    nameEn: "Phu Quoc Pearl Island & Mac Cuu Settlement Legacy",
    destinationSlug: "phu-quoc",
    historicalPeriod: "Khai hoang mở đất thời Mạc Cửu (1708), Nhà tù Phú Quốc thời chiến & Nghề làm nước mắm truyền thống",
    unescoStatus: "Khu dự trữ sinh quyển thế giới Kiên Giang UNESCO (2006)",
    historicalEra: "Thời Chúa Nguyễn Phúc Chu & Thời kỳ hiện đại",
    keyFigures: ["Mạc Cửu (Tổng binh Hà Tiên)", "Chúa Nguyễn Phúc Chu", "Các chiến sĩ cách mạng nhà tù Phú Quốc"],
    bestTimeToVisit: "Tháng 11 - 4 (Mùa khô, biển êm như gương, nước trong vắt màu ngọc bích, nắng vàng rực rỡ)",
    signatureCuisine: ["Gỏi cá trích tươi cuốn rau rừng", "Bún quậy Kiến Xây", "Còi biên mai nướng muối ớt", "Nhum biển nướng mỡ hành", "Ghẹ Hàm Ninh"],
    mustTryActivities: ["Cano 4 đảo ngắm san hô (Mây Rút, Gầm Ghì, Móng Tay)", "Cáp treo vượt biển Hòn Thơm", "Thăm Di tích Lịch sử Nhà tù Phú Quốc", "Thăm nhà thùng nước mắm 200 năm"],
    insiderTips: ["Tránh đi vào tháng 7 - 9 tại Bãi Trường vì có sóng lớn; nếu đi thời gian này hãy chọn Bãi Sao hoặc Bãi Khem ở phía Nam biển rất êm", "Nước mắm mang lên máy bay phải đóng thùng xốp ký gửi riêng"],
    idealDuration: "3N2Đ hoặc 4N3Đ",
    targetTravelers: ["Cặp đôi nghỉ dưỡng biển", "Gia đình yêu thích resort 5 sao", "Du khách quốc tế"],
    historicalSummaryVi:
      "Năm 1708, nhà buôn Mạc Cửu sau khi quy phục Chúa Nguyễn Phúc Chu đã dâng toàn bộ vùng đất Mang Khảm (Hà Tiên và đảo Koh Tral - Phú Quốc) sáp nhập vào bản đồ xứ Đàng Trong của Đại Việt. Phú Quốc nổi tiếng với nghề làm nước mắm truyền thống trong thùng gỗ bời lời hơn 200 năm cùng Di tích Lịch sử Trại giam Tù binh Chiến tranh Phú Quốc.",
    historicalSummaryEn:
      "In 1708, merchant Mac Cuu submitted his domain (including Phu Quoc island) to Lord Nguyen Phuc Chu, officially incorporating it into Vietnamese territory. The island is renowned for its 200-year artisanal fish sauce fermentation craft and the Phu Quoc Prison historical monument.",
    legendStoryVi:
      "Tương truyền trong những ngày bôn tẩu trốn chạy quân Tây Sơn, Chúa Nguyễn Ánh (sau này là Vua Gia Long) cùng tùy tùng đã dạt vào đảo Phú Quốc trong cảnh thiếu lương thực và nước ngọt trầm trọng. Chúa bèn rút thanh gươm báu cắm sâu vào tảng đá hoa cương và ngửa mặt lên trời khấn nguyện: 'Nếu trời cho ta làm vua, hãy ban nước ngọt cho quân ta sống sót'. Khi rút kiếm ra, một dòng nước ngọt mát lành tuôn trào không bao giờ cạn — đó chính là Giếng Ngự (Giếng Tiên) tại An Thới ngày nay.",
    legendStoryEn:
      "When fleeing pursuing forces, Lord Nguyen Anh (later Emperor Gia Long) landed on Phu Quoc without fresh water. Thrusting his royal sword into the solid rock, he prayed to heaven for salvation. As he drew the sword back, sweet spring water gushed forth from the bedrock—known today as the Sacred Well of An Thoi.",
    recommendedTourSlugs: ["tour-phu-quoc-sunset-san-ho-4n3d"],
  },
  {
    id: "hist-09",
    slug: "da-nang-ngu-hanh-son-cham-heritage-history",
    name: "Đà Nẵng, Danh Thắng Ngũ Hành Sơn & Bảo Tàng Điêu Khắc Chăm",
    nameEn: "Da Nang, Marble Mountains & Museum of Cham Sculpture",
    destinationSlug: "da-nang",
    historicalPeriod: "Văn hóa Champa (thế kỷ 5-15) & Vua Minh Mạng đặt tên Ngũ Hành Sơn 1825",
    unescoStatus: "Văn bia Ma Nhai Ngũ Hành Sơn là Di sản Tư liệu Ký ức Thế giới UNESCO (2022)",
    historicalEra: "Vương quốc Champa & Triều Nguyễn (Thế kỷ 19)",
    keyFigures: ["Vua Minh Mạng", "Nhà khảo cổ Henri Parmentier (EFEO)"],
    bestTimeToVisit: "Tháng 3 - 8 (Thời tiết mùa khô, biển Mỹ Khê trong xanh, nắng đẹp lý tưởng tắm biển và vui chơi Bà Nà Hills)",
    signatureCuisine: ["Mì Quảng ếch / tôm thịt", "Bánh tráng thịt heo hai đầu da chấm mắm nêm", "Bún chả cá Đà Nẵng", "Gỏi cá Nam Ô"],
    mustTryActivities: ["Dạo bước trên Cầu Vàng Bà Nà Hills", "Khám phá động Huyền Không Ngũ Hành Sơn", "Chiêm ngưỡng cổ vật Chăm Pa tại Bảo tàng EFEO", "Xem Cầu Rồng phun lửa lúc 21h00 cuối tuần"],
    insiderTips: ["Động Huyền Không đẹp nhất vào 11h30 - 12h30 trưa khi ánh nắng rọi thẳng qua vòm hang tạo hào quang", "Đi Bà Nà Hills trước 8h00 sáng để tránh xếp hàng cáp treo"],
    idealDuration: "3N2Đ hoặc 4N3Đ",
    targetTravelers: ["Gia đình", "Nhóm bạn trẻ", "Khách MICE"],
    historicalSummaryVi:
      "Năm 1825, Vua Minh Mạng vi hành phương Nam, say đắm trước vẻ đẹp kỳ vĩ của 5 ngọn núi đá vôi ven biển Đà Nẵng đã dựa vào thuyết Ngũ hành đặt tên: Kim Sơn, Mộc Sơn, Thủy Sơn, Hỏa Sơn và Thổ Sơn. Tại trung tâm thành phố, Bảo tàng Điêu khắc Chăm khánh thành năm 1915 bởi Trường Viễn Đông Bác Cổ (EFEO) là bảo tàng lưu giữ hiện vật Chăm Pa quy mô nhất thế giới.",
    historicalSummaryEn:
      "In 1825, Emperor Minh Mang named the 5 seaside marble peaks after the cosmic elements: Kim (Metal), Moc (Wood), Thuy (Water), Hoa (Fire), and Tho (Earth). The Museum of Cham Sculpture, founded in 1915 by the French EFEO and Henri Parmentier, houses the world's most comprehensive collection of Hindu-Buddhist Cham artworks.",
    legendStoryVi:
      "Truyền thuyết xưa kể rằng, một buổi sáng sớm có một cụ già ngư dân thấy một con Giao Long (rồng biển khổng lồ) từ ngoài khơi bơi vào đẻ một quả trứng lớn trên bãi cát ven biển. Thần Kim Quy (Rùa Vàng) liền hiện lên, đào một lỗ chôn quả trứng và trao cho ông lão một chiếc móng rùa để bảo vệ trứng khỏi diều hâu hung dữ. Qua năm tháng, quả trứng lớn dần rồi nứt ra một nàng tiên nữ xinh đẹp tuyệt trần bước ra, còn 5 mảnh vỏ trứng vỡ hóa thành 5 ngọn núi Ngũ Hành Sơn sừng sững che chở cho ngư dân.",
    legendStoryEn:
      "A golden turtle deity buried a dragon's celestial egg on the shore of Da Nang. When the egg hatched, a radiant princess stepped forth into the light, and the five remaining eggshells transformed into the sacred Marble Mountains guarding the coast against storms.",
    recommendedTourSlugs: ["tour-ba-na-hills-golden-bridge-1d"],
  },
  {
    id: "hist-10",
    slug: "nha-trang-thap-ba-ponagar-heritage-history",
    name: "Nha Trang & Tháp Bà Ponagar",
    nameEn: "Nha Trang & Po Nagar Cham Towers",
    destinationSlug: "nha-trang",
    historicalPeriod: "Vương quốc Champa cổ đại (Thế kỷ 8 - 13)",
    unescoStatus: "Lễ hội Tháp Bà Ponagar là Di sản Văn hóa Phi vật thể Quốc gia",
    historicalEra: "Tiểu quốc Kauthara Champa & Tín ngưỡng Thờ Mẫu Thiên Y A Na của người Việt",
    keyFigures: ["Nữ thần Po Nagar (Thiên Y A Na Thánh Mẫu)", "Vua Satyavarman", "Vua Harivarman I"],
    bestTimeToVisit: "Tháng 1 - 8 (Mùa khô đầy nắng ấm, biển xanh ngọc bích, lý tưởng để lặn biển ngắm san hô tại Hòn Mun)",
    signatureCuisine: ["Bún sứa & bún chả cá Nha Trang", "Bánh căn hải sản", "Nem nướng Ninh Hòa", "Gỏi cá mai", "Bò nướng Lạc Cảnh"],
    mustTryActivities: ["Chiêm bái Tháp Bà Ponagar và xem múa Chăm", "Tắm bùn khoáng nóng thư giãn tại I-Resort", "Lặn biển bình khí rạn san hô Hòn Mun", "Du thuyền hoàng hôn ngắm vịnh"],
    insiderTips: ["Tháp Bà yêu cầu mặc áo choàng lam kín đáo do ban quản lý cấp miễn phí", "Nên đi tắm bùn vào buổi chiều từ 15h30 để tránh nắng"],
    idealDuration: "3N2Đ hoặc 4N3Đ",
    targetTravelers: ["Gia đình nghỉ dưỡng", "Cặp đôi thích biển", "Du khách tắm khoáng phục hồi sức khỏe"],
    historicalSummaryVi:
      "Tháp Bà Ponagar được xây dựng từ thế kỷ 8 đến thế kỷ 13 tại vương triều Champa Kauthara cổ đại. Quần thể là đỉnh cao kiến trúc gạch nung Chăm Pa với kỹ thuật ghép nối không dùng mạch vữa đến nay vẫn là bí ẩn khoa học. Khi người Việt di cư vào phương Nam, tín ngưỡng thờ Mẹ Xứ Sở Po Nagar được giao thoa và suy tôn thành Thiên Y A Na Thánh Mẫu.",
    historicalSummaryEn:
      "Built between the 8th and 13th centuries in the ancient Cham principality of Kauthara, the Po Nagar Towers honor Yan Po Nagar, the Mother of the Realm. The brick masonry, assembled without discernible mortar joints, remains a marvel of ancient civil engineering.",
    legendStoryVi:
      "Huyền tích Thiên Y A Na: Xưa kia tại núi Đại An có vợ chồng tiều phu già trồng dưa hấu. Nàng tiên nữ giáng trần ngụ trong trái dưa được ông bà nhận làm con nuôi. Khi xảy ra thiên tai lũ lớn, nàng hóa thân vào một khúc gỗ kỳ nam quý trôi dạt sang phương Bắc và nên duyên cùng Thái tử nước bạn. Sau đó nàng cưỡi khúc gỗ kỳ nam vượt biển trở về quê hương, dạy cho dân làng cách cày cấy, dệt vải, gieo hạt, xua đuổi thú dữ. Sau khi hoàn thành sứ mệnh chở che nhân gian, bà cùng hai con cưỡi hạc bay về trời.",
    legendStoryEn:
      "Po Nagar (Thien Y A Na) descended to Earth, adopted by an elderly melon farming couple. She taught the villagers farming, silkworm weaving, and herbal medicine. Upon fulfilling her divine calling, she ascended back to heaven on the back of a sacred crane from the summit of the tower hill.",
    recommendedTourSlugs: ["tour-da-lat-healing-retreat-3n2d"],
  },
  {
    id: "hist-11",
    slug: "mui-ne-poshanu-heritage-history",
    name: "Mũi Né & Tháp Chàm Poshanư",
    nameEn: "Mui Ne & Poshanu Cham Towers",
    destinationSlug: "mui-ne",
    historicalPeriod: "Phong cách kiến trúc Hòa Lai Champa (Thế kỷ 8 - 9)",
    unescoStatus: "Di tích Kiến trúc Nghệ thuật Cấp Quốc gia",
    historicalEra: "Vương quốc Panduranga Champa",
    keyFigures: ["Thần Shiva", "Công chúa Poshanu"],
    bestTimeToVisit: "Tháng 11 - 4 (Thời tiết khô ráo, nắng vàng chan hòa, gió biển lý tưởng cho lướt ván diều và trượt cát)",
    signatureCuisine: ["Lẩu thả Phan Thiết 5 màu", "Bánh căn xíu mại cá nục", "Răng mực nướng bơ tỏi", "Gỏi cá mai"],
    mustTryActivities: ["Xe Jeep địa hình vượt đồi cát Bàu Trắng đón bình minh", "Thăm Tháp Chàm Poshanư trên đồi Bà Nài", "Lội Suối Tiên ngắm hẻm cát đỏ", "Lướt ván diều tại biển Hàm Tiến"],
    insiderTips: ["Ngắm đồi cát đẹp nhất vào 5h30 - 7h00 sáng để cát không bị nóng chân", "Thuê xe Jeep địa hình để được tài xế chở lên đỉnh đồi cát cao nhất"],
    idealDuration: "2N1Đ hoặc 3N2Đ",
    targetTravelers: ["Cặp đôi thích chụp ảnh sa mạc biển", "Khách thể thao lướt ván", "Gia đình nghỉ dưỡng biển"],
    historicalSummaryVi:
      "Cụm tháp Chàm Poshanư nằm trên đồi Bà Nài được xây dựng vào cuối thế kỷ thứ 8 đầu thế kỷ thứ 9 theo phong cách kiến trúc nghệ thuật Hòa Lai. Tháp thờ thần tối cao Shiva và sau này tưởng nhớ Công chúa Poshanu — người con gái tài sắc vẹn toàn có công dạy dân Panduranga trồng lúa nước, dệt thổ cẩm và đánh cá.",
    historicalSummaryEn:
      "The Poshanu Cham Towers on Ba Nai hill were constructed in the late 8th century under the Hoa Lai architectural style to venerate Lord Shiva and Princess Poshanu, who taught the local population irrigated rice farming, pottery, and textile weaving.",
    legendStoryVi:
      "Nguồn gốc tên gọi 'Mũi Né': Xưa kia khi bão biển tràn vào biển Nam Trung Bộ, các đoàn thuyền chài của ngư dân thường tìm đến dải đất nhô ra biển có bãi cát thoai thoải để 'né bão', lâu dần thành tên gọi Mũi Né. Tại đây, Công chúa Poshanu yêu chàng công tử Po Sah Bian nhưng bị người em trai ganh ghét bày mưu ly gián. Nàng đã nén đau thương, một lòng ở lại vùng đồi biển dạy dỗ chở che cho thần dân cho đến hơi thở cuối cùng.",
    legendStoryEn:
      "The name 'Mui Ne' originates from fishermen steering their boats into this protected cape to 'avoid' ('Né' in Vietnamese) sudden sea typhoons. Legend also commemorates Princess Poshanu's enduring benevolence, who stayed on the coastal hills dedicating her life to welfare and peace for her people.",
    recommendedTourSlugs: ["tour-phu-quoc-sunset-san-ho-4n3d"],
  },
  {
    id: "hist-12",
    slug: "can-tho-mekong-cai-rang-heritage-history",
    name: "Cần Thơ & Chợ Nổi Cái Răng",
    nameEn: "Can Tho & Cai Rang Floating Market",
    destinationSlug: "can-tho",
    historicalPeriod: "Khai khẩn đất phương Nam (Thế kỷ 18), Thời Tây Đô Pháp thuộc, Nhà cổ Bình Thủy 1870",
    unescoStatus: "Văn hóa Chợ nổi Cái Răng là Di sản Văn hóa Phi vật thể Quốc gia",
    historicalEra: "Thời khẩn hoang Nam Bộ & Thời cận đại",
    keyFigures: ["Dòng họ Dương (Nhà cổ Bình Thủy)", "Bà con thương hồ miệt vườn"],
    bestTimeToVisit: "Tháng 9 - 11 (Mùa nước nổi tôm cá đầy ắp, hoa súng bung nở) và Tháng 5 - 8 (Mùa trái cây chín rộ miệt vườn)",
    signatureCuisine: ["Lẩu mắm miền Tây cá linh bông điên điển", "Vịt nấu chao Cần Thơ", "Bánh xèo củ hủ dừa", "Hủ tiếu Cái Răng", "Bánh tét lá cẩm"],
    mustTryActivities: ["Đi thuyền máy khám phá Chợ nổi Cái Răng lúc 5h30 sáng", "Thưởng thức tô hủ tiếu nóng hổi ngay trên thuyền", "Thăm Nhà cổ Bình Thủy (bối cảnh phim Người Tình)", "Đạp xe dạo cồn Sơn xem cá lóc bay"],
    insiderTips: ["Chợ nổi Cái Răng nhộn nhịp nhất từ 5h00 đến 7h30 sáng", "Nhìn lên cây bẹo ở đầu mũi thuyền để biết thuyền đó bán nông sản gì"],
    idealDuration: "2N1Đ hoặc 3N2Đ",
    targetTravelers: ["Gia đình", "Du khách quốc tế yêu văn hóa sông nước", "Tín đồ ẩm thực miệt vườn"],
    historicalSummaryVi:
      "Nằm ở hạ lưu sông Hậu, Cần Thơ là trung tâm kinh tế phồn thịnh bậc nhất miền Tây Nam Bộ với tên gọi 'Tây Đô'. Chợ nổi Cái Răng là biểu tượng văn hóa giao thương đường thủy của cư dân đồng bằng sông Cửu Long với nét độc đáo 'Cây Bẹo' treo nông sản đầu mũi ghe.",
    historicalSummaryEn:
      "Can Tho ('Western Capital') is the heartbeat of the Mekong Delta. Cai Rang Floating Market preserves centuries-old river trade traditions where vendors advertise produce on tall bamboo poles called 'Beo sticks'.",
    legendStoryVi:
      "Truyền thuyết tên gọi 'Cái Răng': Xưa kia có một con cá sấu khổng lồ dạt vào đây, răng của nó cắm sâu vào bờ đất tạo thành khúc sông sầm uất, sau này người dân gọi trại thành Cái Răng. Nơi đây lưu giữ sự hòa hợp tuyệt vời giữa con người và dòng nước Cửu Long hiền hòa.",
    legendStoryEn:
      "Legend says a mythical giant crocodile washed ashore, its tooth embedded in the riverbank giving rise to the name 'Cai Rang'. The waterways reflect centuries of peaceful harmony between pioneers and the Mekong.",
    recommendedTourSlugs: ["tour-phu-quoc-sunset-san-ho-4n3d"],
  },
  {
    id: "hist-13",
    slug: "phong-nha-ke-bang-son-doong-heritage-history",
    name: "Phong Nha — Kẻ Bàng & Hang Sơn Đoòng",
    nameEn: "Phong Nha — Ke Bang & Son Doong Cave",
    destinationSlug: "quang-binh",
    historicalPeriod: "Địa chất Karst 400 triệu năm tuổi, Đường mòn Hồ Chí Minh trong chiến tranh",
    unescoStatus: "Di sản Thiên nhiên Thế giới UNESCO (2003, 2015)",
    historicalEra: "Kỷ Cổ sinh (Paleozoic) & Kháng chiến chống Mỹ",
    keyFigures: ["Hồ Khanh (Người phát hiện Sơn Đoòng)", "Hiệp hội Hang động Hoàng gia Anh (BCRA)"],
    bestTimeToVisit: "Tháng 3 - 8 (Mùa khô, nước sông Son trong xanh vắt, khí hậu trong hang mát mẻ 22 - 25°C, an toàn thám hiểm)",
    signatureCuisine: ["Cá trắm sông Son nướng mè", "Cháo canh Quảng Bình", "Gà đồi nướng muối cheo", "Khoai dẻo Quảng Bình"],
    mustTryActivities: ["Thám hiểm Động Thiên Đường dài 31km", "Thuyền ngược sông Son vào Động Phong Nha", "Zipline tắm bùn Hang Tối", "Thám hiểm Hang Sơn Đoòng (hang lớn nhất hành tinh)"],
    insiderTips: ["Tháng 9-11 mùa mưa lũ các hang ngập nước sẽ tạm dừng đón khách", "Chuẩn bị giày bám đá tốt và túi chống nước cho điện thoại"],
    idealDuration: "3N2Đ hoặc 4N3Đ",
    targetTravelers: ["Người đam mê thám hiểm mạo hiểm", "Du khách yêu thiên nhiên nguyên sinh", "Gia đình"],
    historicalSummaryVi:
      "Phong Nha - Kẻ Bàng là một trong những vùng đá vôi nhiệt đới cổ nhất châu Á với hơn 300 hang động kỳ vĩ. Nơi đây sở hữu Hang Sơn Đoòng — hang động tự nhiên lớn nhất hành tinh với thể tích 38,5 triệu m³, đủ sức chứa cả một tòa nhà chọc trời 40 tầng cùng hệ sinh thái rừng nguyên sinh độc lập bên trong.",
    historicalSummaryEn:
      "Phong Nha-Ke Bang hosts Asia's oldest karst formation and over 300 immense caverns, including Hang Son Doong—the largest cave on Earth, hosting its own enclosed rainforest, cloud system, and river.",
    legendStoryVi:
      "Người bản địa lưu truyền rằng những hang động ngầm sâu thẳm trong lòng dãy Trường Sơn chính là nơi ngự trị của các vị thần canh giữ mạch nguồn của non sông Đại Việt, che chở cho đoàn quân ra trận trên tuyến đường Trường Sơn huyền thoại.",
    legendStoryEn:
      "Indigenous folklore tells of subterranean mountain spirits guarding the vital lifeblood of the Truong Son range, shielding heroes traversing the Ho Chi Minh Trail.",
    recommendedTourSlugs: ["tour-hue-heritage-1d"],
  },
  {
    id: "hist-14",
    slug: "my-son-sanctuary-heritage-history",
    name: "Thánh Địa Mỹ Sơn",
    nameEn: "My Son Sanctuary",
    destinationSlug: "hoi-an",
    historicalPeriod: "Thế kỷ 4 - 13 (Vương triều Champa cổ đại), Thờ Thần Shiva Bhadresvara",
    unescoStatus: "Di sản Văn hóa Thế giới UNESCO (1999)",
    historicalEra: "Vương quốc Champa cổ đại",
    keyFigures: ["Vua Bhadravarman I", "Vua Sambhuvarman"],
    bestTimeToVisit: "Tháng 2 - 8 (Thời tiết mùa khô ráo, thích hợp dạo bộ giữa thung lũng núi Chúa thanh tịnh)",
    signatureCuisine: ["Bê thui Cầu Mống chấm mắm nêm", "Mì Quảng Phú Chiêm", "Bánh tổ Quảng Nam"],
    mustTryActivities: ["Xem múa Apsara và nghe kèn Saranai", "Khám phá cụm tháp gạch nung không mạch vữa", "Tìm hiểu linga - yoni"],
    insiderTips: ["Ghé thăm lúc 7h30 sáng trước khi đông khách và nắng gắt", "Kết hợp nửa ngày Mỹ Sơn và chiều về phố cổ Hội An"],
    idealDuration: "Nửa ngày (Excursion từ Hội An / Đà Nẵng)",
    targetTravelers: ["Người yêu khảo cổ học", "Khách du lịch văn hóa quốc tế"],
    historicalSummaryVi:
      "Ẩn mình trong thung lũng núi Chúa, Mỹ Sơn là trung tâm cúng tế và mai táng các vị vua Champa từ thế kỷ 4 đến 13. Hơn 70 đền tháp gạch đỏ thờ thần Shiva được xây dựng với kỹ thuật ghép nối không lộ mạch vữa huyền bí.",
    historicalSummaryEn:
      "Encircled by sacred mountain ridges, My Son served as the spiritual and royal funerary capital of Champa from the 4th to 13th centuries, dedicated to Shiva Bhadresvara with mortarless red-brick shrines.",
    legendStoryVi:
      "Đỉnh núi Chúa nhìn từ xa giống như một ngọn măng đá khổng lồ vươn lên bầu trời, được xem là đỉnh núi thiêng Meru nơi các vị thần Hindu ngự trị và ban phước lành cho vương quốc trường tồn.",
    legendStoryEn:
      "The sacred summit of Mount Cat's Tooth resembles Mount Meru of Hindu cosmology, home to deities bestowing protection upon the realm.",
    recommendedTourSlugs: ["tour-hoi-an-memories-show"],
  },
  {
    id: "hist-15",
    slug: "cao-bang-ban-gioc-heritage-history",
    name: "Thác Bản Giốc & Động Ngườm Ngao",
    nameEn: "Ban Gioc Waterfall & Nguom Ngao Cave",
    destinationSlug: "ha-giang",
    historicalPeriod: "Địa chất Karst Non nước Cao Bằng, Di tích Pác Bó cội nguồn cách mạng 1941",
    unescoStatus: "Công viên Địa chất Toàn cầu UNESCO Non nước Cao Bằng (2018)",
    historicalEra: "Thời tiền sử & Cách mạng Việt Nam thế kỷ 20",
    keyFigures: ["Chủ tịch Hồ Chí Minh", "Đồng bào Tày - Nùng"],
    bestTimeToVisit: "Tháng 8 - 10 (Mùa thác Bản Giốc đẹp nhất, dòng sông Quây Sơn xanh ngọc bích chảy giữa lúa chín vàng)",
    signatureCuisine: ["Vịt quay 7 vị Cao Bằng", "Bánh cuốn canh nước xương", "Hạt dẻ Trùng Khánh nướng", "Phở chua Cao Bằng"],
    mustTryActivities: ["Đi bè tre ngắm cận cảnh dòng thác Bản Giốc", "Khám phá thạch nhũ vàng Động Ngườm Ngao", "Viếng Khu di tích Pác Bó (Suối Lê Nin, Núi Các Mác)"],
    insiderTips: ["Mang CCCD/Hộ chiếu vì đây là khu vực giáp ranh biên giới", "Mùa thu tháng 9-10 nước trong xanh biếc và đẹp nhất"],
    idealDuration: "3N2Đ kết hợp Hà Giang",
    targetTravelers: ["Người yêu thiên nhiên biên cương", "Du khách về nguồn lịch sử"],
    historicalSummaryVi:
      "Thác Bản Giốc nằm trên dòng sông Quây Sơn là thác nước tự nhiên xuyên biên giới lớn thứ 4 thế giới. Động Ngườm Ngao lưu giữ những thạch nhũ hình búp sen úp ngược kỳ ảo. Suối Lê Nin tại Pác Bó là nơi Chủ tịch Hồ Chí Minh trở về đất mẹ năm 1941 sau 30 năm bôn ba.",
    historicalSummaryEn:
      "Ban Gioc Waterfall on the Quay Son River is the 4th largest transnational waterfall globally. Nearby Pac Bo marks where President Ho Chi Minh returned to Vietnam in 1941 beside emerald Lenin Stream.",
    legendStoryVi:
      "Truyền thuyết người Tày kể về mối tình thủy chung của nàng tiên giáng trần yêu chàng trai bản nghèo. Dòng nước thác trắng xóa chính là nước mắt hạnh phúc của nàng tiên hóa thân thành dòng sông chở che cho bản làng no ấm.",
    legendStoryEn:
      "Tay ethnic folklore celebrates a celestial maiden who fell in love with a mortal village youth; her tears formed the cascading white falls nourishing the harvest valley.",
    recommendedTourSlugs: ["tour-ha-giang-loop-3n2d"],
  },
  {
    id: "hist-16",
    slug: "yen-tu-tuyen-lam-heritage-history",
    name: "Non Thiêng Yên Tử — Kinh Đô Phật Giáo Trúc Lâm",
    nameEn: "Mount Yen Tu — Sacred Capital of Truc Lam Zen",
    destinationSlug: "ha-long",
    historicalPeriod: "Thế kỷ 13 (Nhà Trần), Phật hoàng Trần Nhân Tông sáng lập Thiền phái Trúc Lâm (1299)",
    unescoStatus: "Hồ sơ đệ trình Di sản Thế giới UNESCO Quần thể Di tích Yên Tử",
    historicalEra: "Triều đại Nhà Trần (Thế kỷ 13)",
    keyFigures: ["Phật hoàng Trần Nhân Tông", "Pháp Loa", "Huyền Quang"],
    bestTimeToVisit: "Tháng 1 - 3 âm lịch (Lễ hội xuân Yên Tử) và Tháng 9 - 11 (Tiết thu hanh vàng, ngắm hoàng hôn Chùa Đồng)",
    signatureCuisine: ["Măng trúc Yên Tử", "Rau dớn rừng", "Chè lam Yên Tử", "Bánh gật gù Tiên Yên", "Rượu mơ Yên Tử"],
    mustTryActivities: ["Chinh phục đỉnh Chùa Đồng 1.068m bằng đồng nguyên khối", "Viếng tháp Huệ Quang chứa xá lị Phật hoàng", "Nghỉ dưỡng thiền định tại Legacy Yên Tử"],
    insiderTips: ["Chuẩn bị giày thể thao bám dốc vì bậc đá đoạn cuối khá dốc", "Đỉnh núi gió mạnh và sương mù nên mang theo áo ấm"],
    idealDuration: "1 ngày hoặc 2N1Đ kết hợp Hạ Long",
    targetTravelers: ["Du khách hành hương tâm linh", "Người tìm kiếm sự tĩnh tại", "Gia đình yêu lịch sử Đại Việt"],
    historicalSummaryVi:
      "Sau chiến thắng chống quân Nguyên Mông, năm 1299 Vua Trần Nhân Tông từ bỏ ngai vàng lên núi Yên Tử xuất gia, sáng lập Thiền phái Trúc Lâm Yên Tử đậm đà tinh thần nhập thế của dân tộc. Chùa Đồng đúc bằng 70 tấn đồng sừng sững trên đỉnh Phù Vân 1.068m.",
    historicalSummaryEn:
      "Emperor Tran Nhan Tong abdicated his throne in 1299 after defeating Mongol invasions to found indigenous Truc Lam Zen on Mount Yen Tu. The 70-ton solid bronze Dong Pagoda rests 1,068m above the clouds.",
    legendStoryVi:
      "Đỉnh Phù Vân mây phủ quanh năm được xem là chiếc cầu nối giữa trời và đất. Phật hoàng ngồi thiền định dưới cội tùng cổ thụ đã giác ngộ chân lý giải thoát và hòa nhập đạo Phật vào đời sống an dân của người Việt.",
    legendStoryEn:
      "Enveloped in year-round mists, Mount Yen Tu served as a spiritual bridge between heaven and earth where the King-Monk attained enlightenment beneath sacred ancient pine groves.",
    recommendedTourSlugs: ["tour-ha-long-cruise-2n1d"],
  },
  {
    id: "hist-17",
    slug: "pu-luong-mai-chau-heritage-history",
    name: "Pù Luông & Mai Châu — Thung Lũng Mây Xứ Thái",
    nameEn: "Pu Luong & Mai Chau — Highland Thai Valley",
    destinationSlug: "ninh-binh",
    historicalPeriod: "Văn hóa dân tộc Thái trắng & Mường, Dấu ấn đoàn quân Tây Tiến (1947)",
    unescoStatus: "Khu Bảo tồn Thiên nhiên Pù Luông",
    historicalEra: "Văn hóa bản địa & Kháng chiến chống Pháp",
    keyFigures: ["Đoàn quân Tây Tiến (Nhà thơ Quang Dũng)", "Đồng bào Thái trắng"],
    bestTimeToVisit: "Tháng 5 - 6 (Mùa lúa chín đầu năm) và Tháng 9 - 10 (Mùa vàng rực rỡ nhất tại Bản Đôn)",
    signatureCuisine: ["Vịt Cổ Lũng nướng than hoa", "Cơm lam Mai Châu", "Cá suối nướng pa pỉnh tộp", "Rượu cần Mường"],
    mustTryActivities: ["Ngắm guồng cọn nước tre khổng lồ bên suối Chàm", "Trekking bản Đôn, bản Kho Mường", "Tắm hồ bơi vô cực view ruộng bậc thang Pù Luông"],
    insiderTips: ["Pù Luông có 2 vụ lúa chín trong năm (tháng 5-6 và tháng 9-10)", "Nên đặt trước ecolodge view thung lũng từ sớm nếu đi vào mùa lúa"],
    idealDuration: "2N1Đ hoặc 3N2Đ",
    targetTravelers: ["Người tìm kiếm kỳ nghỉ xanh gần gũi thiên nhiên", "Cặp đôi", "Khách quốc tế"],
    historicalSummaryVi:
      "Pù Luông (nghĩa là 'Đỉnh núi cao nhất' trong tiếng Thái) cùng thung lũng Mai Châu là cái nôi cư trú của người Thái trắng và người Mường với kiệt tác cọn nước tre tự động quay đưa nước suối lên tưới tiêu cho các sườn ruộng bậc thang.",
    historicalSummaryEn:
      "Pu Luong ('Highest Peak') and Mai Chau preserve pristine Thai and Muong ethnic stilt-house villages with giant hand-woven bamboo waterwheels irrigating layered mountain terraces.",
    legendStoryVi:
      "Địa danh đi vào thi ca kháng chiến hào hùng của nhà thơ Quang Dũng: 'Mai Châu mùa em thơm nếp xôi', biểu tượng của tình quân dân keo sơn giữa non ngàn.",
    legendStoryEn:
      "Immortalized in wartime poetry, the fragrant sticky rice of Mai Chau symbolizes the timeless hospitality of highland valley tribes.",
    recommendedTourSlugs: ["tour-ninh-binh-trang-an-1d"],
  },
  {
    id: "hist-18",
    slug: "sai-gon-cu-chi-dinh-doc-lap-heritage-history",
    name: "TP. Hồ Chí Minh — Dinh Độc Lập & Địa Đạo Củ Chi",
    nameEn: "Ho Chi Minh City — Independence Palace & Cu Chi Tunnels",
    destinationSlug: "ho-chi-minh",
    historicalPeriod: "Nguyễn Hữu Cảnh mở cõi 1698, Thời Pháp thuộc Hòn ngọc Viễn Đông, Đại thắng 1975",
    unescoStatus: "Địa đạo Củ Chi đang lập hồ sơ đề nghị công nhận Di sản Thế giới UNESCO",
    historicalEra: "Thời mở đất phương Nam & Lịch sử cận hiện đại",
    keyFigures: ["Lễ Thành Hầu Nguyễn Hữu Cảnh", "KTS Ngô Viết Thụ", "Quân dân đất thép Củ Chi"],
    bestTimeToVisit: "Tháng 12 - 4 (Mùa khô ráo, nắng ấm rực rỡ, trời trong xanh, không mưa rào)",
    signatureCuisine: ["Cơm tấm sườn bì chả mỡ hành", "Bánh mì pate Sài Gòn", "Hủ tiếu Nam Vang", "Cà phê sữa đá vỉa hè"],
    mustTryActivities: ["Thăm Dinh Độc Lập — chứng tích trưa 30/4/1975", "Thám hiểm hầm ngầm Củ Chi dài 250km", "Check-in Bưu điện Trung tâm & Nhà thờ Đức Bà"],
    insiderTips: ["Người có bệnh tim mạch nên chọn các đoạn hầm Củ Chi đã mở rộng", "Trải nghiệm cà phê bệt sáng sớm ngắm nhịp sống Sài Gòn"],
    idealDuration: "2N1Đ hoặc 3N2Đ",
    targetTravelers: ["Khách quốc tế tìm hiểu lịch sử", "Gia đình", "Khách MICE"],
    historicalSummaryVi:
      "Được thành lập năm 1698 bởi Lễ Thành Hầu Nguyễn Hữu Cảnh, Sài Gòn phát triển thành đô thị phồn hoa bậc nhất. Địa đạo Củ Chi dài hơn 250km là kỳ tích công sự ngầm trong chiến tranh, và Dinh Độc Lập là biểu tượng của ngày thống nhất đất nước 30/4/1975.",
    historicalSummaryEn:
      "Established in 1698, Saigon flourished as the Pearl of the Far East. The 250km Cu Chi underground network and Independence Palace stand as iconic landmarks of 20th-century history.",
    legendStoryVi:
      "Địa đạo Củ Chi được đào hoàn toàn bằng tay và lưỡi cuốc thô sơ của người dân, trở thành một 'thành phố ngầm' huyền thoại kiên cường che chở cho cuộc sống và chiến đấu dưới làn bom đạn khốc liệt.",
    legendStoryEn:
      "Carved entirely by hand, the Cu Chi underground network served as a living subterranean city enduring intense aerial bombardments.",
    recommendedTourSlugs: ["tour-phu-quoc-sunset-san-ho-4n3d"],
  },
  {
    id: "hist-19",
    slug: "con-dao-hang-duong-heritage-history",
    name: "Côn Đảo & Nghĩa Trang Hàng Dương",
    nameEn: "Con Dao & Hang Duong Cemetery",
    destinationSlug: "phu-quoc",
    historicalPeriod: "Chúa Nguyễn Ánh bôn tẩu 1783, Nhà tù Côn Đảo 113 năm (1862 - 1975)",
    unescoStatus: "Vườn Quốc gia Côn Đảo (Khu Ramsar Thế giới)",
    historicalEra: "Thời Chúa Nguyễn & Kháng chiến giành độc lập",
    keyFigures: ["Nữ anh hùng Võ Thị Sáu", "Thứ phi Phi Yến & Hoàng tử Cải"],
    bestTimeToVisit: "Tháng 3 - 9 (Biển êm ả, sóng lặng, mùa rùa biển lên bờ đẻ trứng thiêng liêng)",
    signatureCuisine: ["Cháo hàu Côn Đảo", "Cá thu một nắng", "Mứt hạt bàng Côn Đảo", "Ốc vú nàng nướng"],
    mustTryActivities: ["Viếng mộ Nữ Anh hùng Võ Thị Sáu ban đêm", "Thăm Di tích Nhà tù Côn Đảo (Chuồng Cọp)", "Xem rùa biển đẻ trứng tại Hòn Bảy Cạnh"],
    insiderTips: ["Trang phục kín đáo khi viếng Nghĩa trang Hàng Dương", "Đăng ký trước với Vườn Quốc gia nếu muốn xem rùa đẻ trứng"],
    idealDuration: "3N2Đ",
    targetTravelers: ["Du khách hành hương tâm linh", "Người yêu thiên nhiên biển đảo nguyên sơ", "Cặp đôi"],
    historicalSummaryVi:
      "Trong 113 năm (1862–1975), Côn Đảo từng là 'Địa ngục trần gian' giam giữ các chiến sĩ yêu nước kiên trung. Nghĩa trang Hàng Dương là nơi yên nghỉ của hơn 2.000 liệt sĩ cách mạng cùng phần mộ nữ anh hùng Võ Thị Sáu.",
    historicalSummaryEn:
      "Known as 'Hell on Earth' for 113 years, Con Dao incarcerated thousands of freedom fighters. Hang Duong Cemetery preserves the sacred resting place of 19-year-old national heroine Vo Thi Sau.",
    legendStoryVi:
      "Truyền thuyết Thứ phi Phi Yến và Hoàng tử Cải gắn với câu ca dao: 'Gió đưa cây cải về trời / Rau răm ở lại chịu lời đắng cay', nhắc nhớ tấm lòng kiên trinh vì nước vì dân.",
    legendStoryEn:
      "The tragic folk legend of Lady Phi Yen and Prince Cai lives on in timeless Vietnamese verses commemorating enduring loyalty.",
    recommendedTourSlugs: ["tour-phu-quoc-sunset-san-ho-4n3d"],
  },
  {
    id: "hist-20",
    slug: "quy-nhon-ky-co-eo-gio-heritage-history",
    name: "Quy Nhơn — Đất Võ Tây Sơn & Kỳ Co — Eo Gió",
    nameEn: "Quy Nhon — Tay Son Heritage & Ky Co — Eo Gio",
    destinationSlug: "da-nang",
    historicalPeriod: "Champa Đồ Bàn (thế kỷ 11 - 15), Triều đại Tây Sơn Quang Trung (thế kỷ 18)",
    unescoStatus: "Võ cổ truyền Bình Định là Di sản Văn hóa Phi vật thể Quốc gia",
    historicalEra: "Vương quốc Champa & Khởi nghĩa Tây Sơn",
    keyFigures: ["Hoàng đế Quang Trung (Nguyễn Huệ)", "Thi sĩ Hàn Mặc Tử"],
    bestTimeToVisit: "Tháng 3 - 9 (Mùa khô ráo, biển Kỳ Co xanh ngắt hai màu nước, sóng êm đi cano)",
    signatureCuisine: ["Bánh xèo tôm nhảy", "Bún chả cá Quy Nhơn", "Bánh ít lá gai", "Chả ram tôm đất", "Rượu Bàu Đá"],
    mustTryActivities: ["Cano Kỳ Co lặn ngắm san hô Bãi Dứa", "Dạo bước đường ven biển Eo Gió đón hoàng hôn", "Thăm Tháp Đôi Champa", "Viếng mộ Hàn Mặc Tử tại Ghềnh Ráng Tiên Sa"],
    insiderTips: ["Eo Gió lộng gió quanh năm, hãy giữ mũ nón cẩn thận", "Nên đi cano Kỳ Co buổi sáng lúc 8h00 - 11h00 khi nước trong nhất"],
    idealDuration: "3N2Đ hoặc 4N3Đ",
    targetTravelers: ["Cặp đôi yêu biển xanh hoang sơ", "Gia đình yêu lịch sử hào hùng", "Nhóm bạn trẻ"],
    historicalSummaryVi:
      "Bình Định là cội nguồn phát tích triều đại Tây Sơn của anh hùng áo vải Quang Trung - Nguyễn Huệ và kinh đô Vijaya Champa với những tháp gạch nung cổ kính: Tháp Đôi, Tháp Bánh Ít.",
    historicalSummaryEn:
      "Birthplace of Emperor Quang Trung and former Vijaya capital of Champa, Quy Nhon pairs ancient brick architecture with the poetic cliffs of Eo Gió and Han Mac Tu's resting place.",
    legendStoryVi:
      "Tiếng trống trận Tây Sơn giục giã và đường quyền võ cổ truyền đã hun đúc nên khí phách quật cường 'nơi ngựa hí quân reo, đạn lửa rền vang phá tan giặc ngoại xâm'.",
    legendStoryEn:
      "The thunderous battle drums of Tay Son and traditional martial arts embody the fearless spirit of central Vietnam's warrior heritage.",
    recommendedTourSlugs: ["tour-ba-na-hills-golden-bridge-1d"],
  },
  {
    id: "hist-21",
    slug: "phu-yen-ganh-da-dia-heritage-history",
    name: "Phú Yên — Gành Đá Đĩa Kỳ Vĩ & Mũi Điện Đón Bình Minh",
    nameEn: "Phu Yen — Ganh Da Dia Basalt & Mui Dien Sunrise",
    destinationSlug: "nha-trang",
    historicalPeriod: "Núi lửa phun trào hàng triệu năm trước, Hải đăng Đại Lãnh 1890, Bến Tàu Không Số Vũng Rô",
    unescoStatus: "Gành Đá Đĩa là Di tích Thắng cảnh Quốc gia Đặc biệt (2020)",
    historicalEra: "Kiến tạo địa chất tiền sử & Kháng chiến cứu nước",
    keyFigures: ["Đoàn tàu Không Số cảm tử 759", "Ngư dân đầm Ô Loan"],
    bestTimeToVisit: "Tháng 2 - 8 (Mùa khô, biển trong xanh màu ngọc, nắng ấm rực rỡ đón bình minh Mũi Điện)",
    signatureCuisine: ["Mắt cá ngừ đại dương hầm thuốc bắc", "Bánh canh hẹ Phú Yên", "Sò huyết đầm Ô Loan nướng mọi", "Cơm gà Phú Yên"],
    mustTryActivities: ["Chiêm ngưỡng kỳ quan tổ ong đá bazan Gành Đá Đĩa", "Chinh phục Hải đăng Đại Lãnh đón bình minh đầu tiên", "Thăm Bến Tàu Không Số Vũng Rô", "Check-in Bãi Xép 'Hoa vàng trên cỏ xanh'"],
    insiderTips: ["Dậy lúc 4h00 sáng để đón ánh bình minh sớm nhất tại Mũi Điện", "Đi giày đế bám khi đi trên Gành Đá Đĩa vì đá gần mép sóng có thể trơn"],
    idealDuration: "2N1Đ hoặc 3N2Đ",
    targetTravelers: ["Người yêu kỳ quan địa chất độc đáo", "Khách du lịch yêu phong cảnh lãng mạn", "Nhiếp ảnh gia bình minh"],
    historicalSummaryVi:
      "Hình thành từ nham thạch núi lửa phun trào gặp nước biển đông cứng thành hàng vạn cột đá bazan hình lục giác như tổ ong khổng lồ. Mũi Điện (Đại Lãnh) là một trong những điểm đón bình minh sớm nhất trên đất liền Việt Nam.",
    historicalSummaryEn:
      "Formed millions of years ago when volcanic lava cooled in the sea, Ganh Da Dia's basalt prisms resemble an immense coastal honeycomb, while nearby Mui Dien welcomes Vietnam's earliest mainland dawn.",
    legendStoryVi:
      "Vịnh Vũng Rô là bến đỗ lịch sử của những chuyến Tàu Không Số cảm tử chi viện vũ khí cho chiến trường miền Nam, một biểu tượng của lòng dũng cảm bất tử.",
    legendStoryEn:
      "Vung Ro Cove honors the heroic clandestine 'Unnumbered Ships' naval squadron that transported supplies during wartime.",
    recommendedTourSlugs: ["tour-da-lat-healing-retreat-3n2d"],
  },
];

export function getHeritageBySlug(slug: string): HeritageHistoryItem | undefined {
  return VIETNAM_HERITAGE_HISTORY.find((item) => item.slug === slug);
}

export function getHeritageByDestination(destinationSlug: string): HeritageHistoryItem[] {
  return VIETNAM_HERITAGE_HISTORY.filter((item) => item.destinationSlug === destinationSlug);
}
