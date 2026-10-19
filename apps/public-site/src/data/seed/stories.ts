import { VIETNAM_IMAGES } from "@/lib/assets";
import type { Article, Destination } from "@/lib/types";

export interface StoryItem extends Omit<Article, "destination_slug" | "place_slug"> {
  destination_slug?: string | null;
  place_slug?: string | null;
  readTime: string;
  category: string;
  authorName: string;
  authorRole: string;
  authorAvatar?: string;
  tags: string[];
  destination?: Destination;
}

export const VIETNAM_STORIES: StoryItem[] = [
  {
    id: "story-hanh-trinh-xuyen-viet",
    slug: "hanh-trinh-xuyen-viet",
    title: "Hành trình xuyên Việt: Chạm vào vẻ đẹp kỳ quan và chiều sâu di sản",
    excerpt: "Hành trình khám phá văn hóa, ẩm thực và cảnh sắc tuyệt mỹ từ Bắc vào Nam trên dải đất hình chữ S.",
    body: `Việt Nam không chỉ là một điểm đến du lịch trên bản đồ thế giới, mà là một bản giao hưởng tuyệt sắc của thiên nhiên và bề dày lịch sử ngàn năm văn hiến. Bắt đầu từ những dãy núi trùng điệp mù sương của vùng cao Tây Bắc, xuôi về kỳ quan vịnh Hạ Long kỳ vĩ, rồi dừng chân bên những mái ngói rêu phong của phố cổ Hội An, mỗi bước chân đều mở ra một trải nghiệm độc bản không thể trộn lẫn.

### Chiều sâu của những miền di sản

Hành trình đưa chúng tôi qua những cung đường đèo hùng vĩ nhất Đông Bắc. Tại Hà Giang, con đèo Mã Pí Lèng uốn lượn bên hẻm vực Tu Sản sâu nhất Đông Nam Á, nơi dòng sông Nho Quế màu xanh ngọc bích êm đềm chảy qua hàng ngàn năm. Đứng giữa mây trời lộng gió, con người bỗng thấy mình thật nhỏ bé trước sự kiến tạo vĩ đại của đất trời.

Xuôi về đồng bằng Bắc Bộ, quần thể danh thắng Tràng An (Ninh Bình) mở ra một bức tranh thủy mặc sống động. Ngồi trên chiếc thuyền nan do những người mẹ, người chị địa phương khéo léo chèo lái, du khách như lạc vào mê cung đá vôi ngập nước với hàng chục hang động tự nhiên huyền bí.

### Những đêm hội hoa đăng và ẩm thực nức tiếng

Miền Trung đón chào du khách bằng sự lắng đọng và hoài cổ. Phố cổ Hội An bên bờ sông Hoài lung linh hàng ngàn ánh đèn lồng khi màn đêm buông xuống. Mùi thơm của những tô mì Quảng đậm đà, bát cao lầu sợi vàng óng và bánh mì kẹp thịt thơm nức mũi mời gọi bước chân khám phá.

Hãy đi chậm lại, trò chuyện cùng người dân bản địa, thưởng thức một tách trà sen thơm ngát hay ly cà phê sữa đá vỉa hè. Đó chính là cách bạn cảm nhận trọn vẹn nhịp đập tâm hồn của đất nước này.`,
    cover_image: VIETNAM_IMAGES.hero,
    destination: {
      id: "ha-long",
      slug: "ha-long",
      name: "Việt Nam — Miền Di Sản",
      country: "Việt Nam",
      summary: "Kỳ quan thiên nhiên và chiều sâu văn hóa bản địa.",
      description: "Hành trình xuyên Việt khám phá trọn vẹn dải đất hình chữ S.",
      image_url: VIETNAM_IMAGES.hero,
      hero_image_url: VIETNAM_IMAGES.hero,
      starting_price: "1800000",
      center: { lat: 20.9101, lng: 107.0844 },
    },
    published_at: "2026-10-01T08:00:00Z",
    readTime: "7 phút đọc",
    category: "Hành Trình Di Sản",
    authorName: "Nguyễn Nhật Huy",
    authorRole: "Chuyên gia khám phá văn hóa bản địa",
    tags: ["Xuyên Việt", "Di sản UNESCO", "Văn hóa", "Khám phá"],
  },
  {
    id: "story-cam-nang-am-thuc-hoi-an",
    slug: "cam-nang-am-thuc-hoi-an",
    title: "Cẩm nang ẩm thực phố cổ: Những hương vị bản địa không thể bỏ lỡ",
    excerpt: "Khám phá thế giới ẩm thực phong phú của Hội An: cao lầu, mì Quảng, cơm gà và bánh mì nức tiếng thế giới.",
    body: `Ẩm thực Hội An là sự kết tinh tinh tế giữa các nền văn hóa Việt - Hoa - Nhật qua nhiều thế kỷ giao thương thương cảng quốc tế sầm uất bậc nhất châu Á thế kỷ 16-17. Mỗi món ăn nơi đây không chỉ mang hương vị đậm đà khó quên mà còn chứa đựng cả một câu chuyện lịch sử, sự gắn bó máu thịt của người dân xứ Quảng với mảnh đất quê hương.

### Cao lầu — Món ăn huyền thoại chỉ có ở Hội An

Nhắc đến Hội An, không thể không nhắc tới Cao Lầu. Điều làm nên sự độc nhất của món ăn này chính là nước dùng để nhào bột phải lấy từ giếng cổ Bá Lễ ngàn năm tuổi, tro củi ngâm gạo phải lấy từ củi củi Cù Lao Chàm. Sợi cao lầu màu vàng ngà, dai sần sật ăn kèm thịt xá xíu thơm lừng, tóp mỡ giòn rụm và đĩa rau sống Trà Quế thơm cay nồng nàn.

### Mì Quảng và Bánh Mì Phượng trứ danh

Bên cạnh cao lầu, một tô Mì Quảng tôm thịt với nước nhưn đậm đà, rắc thêm đậu phộng rang giòn và bánh tráng mè nướng là bữa sáng quen thuộc của mọi người dân nơi đây. Và dĩ nhiên, không một du khách nào có thể bỏ qua cơ hội xếp hàng thưởng thức chiếc bánh mì Hội An giòn tan với hàng chục loại nhân pate, chả lụa, thịt nướng và sốt bơ trứng béo ngậy từng được các đầu bếp quốc tế ca ngợi là "bánh mì ngon nhất thế giới".`,
    cover_image: VIETNAM_IMAGES.hoiAn,
    destination: {
      id: "hoi-an",
      slug: "hoi-an",
      name: "Phố Cổ Hội An",
      country: "Quảng Nam, Việt Nam",
      summary: "Di sản văn hóa thế giới UNESCO bên dòng sông Hoài.",
      description: "Thủ phủ ẩm thực và văn hóa miền Trung.",
      image_url: VIETNAM_IMAGES.hoiAn,
      hero_image_url: VIETNAM_IMAGES.hoiAn,
      starting_price: "1200000",
      center: { lat: 15.8801, lng: 108.3272 },
    },
    published_at: "2026-10-02T10:30:00Z",
    readTime: "5 phút đọc",
    category: "Ẩm Thực Bản Địa",
    authorName: "Trần Mai Anh",
    authorRole: "Cố vấn ẩm thực truyền thống",
    tags: ["Hội An", "Ẩm thực", "Cao lầu", "Bánh mì"],
  },
  {
    id: "story-bi-quyet-san-may-ta-xua",
    slug: "bi-quyet-san-may-ta-xua",
    title: "Bí quyết săn mây Tà Xùa và đón bình minh trên đỉnh Gió",
    excerpt: "Kinh nghiệm cắm trại, chọn thời điểm và cung đường săn biển mây hoàn hảo nhất trên sống lưng khủng long.",
    body: `Tà Xùa (huyện Bắc Yên, tỉnh Sơn La) từ lâu đã trở thành "thánh địa săn mây" của những tâm hồn xê dịch. Nằm ở độ cao hơn 1.800m so với mực nước biển, Tà Xùa sở hữu thung lũng lòng chảo lý tưởng giúp những biển mây dày đặc ngưng tụ và bồng bềnh cuồn cuộn suốt từ sáng sớm đến tận giữa trưa.

### Thời điểm vàng để săn mây

Mùa mây đẹp nhất ở Tà Xùa kéo dài từ tháng 10 đến tháng 4 năm sau. Để săn được biển mây trắng muốt, bạn cần theo dõi thời tiết: ngày hôm trước có mưa nhẹ hoặc độ ẩm cao, đêm lạnh và sáng hôm sau trời hửng nắng ấm. Sự chênh lệch nhiệt độ ngày và đêm chính là "phép thuật" tạo nên biển mây cuồn cuộn như sóng đại dương.

### Những tọa độ check-in không thể bỏ qua

- **Sống lưng khủng long Háng Đồng**: Cung đường mòn nhỏ nằm chênh vênh giữa hai bên vực sâu thăm thẳm, nơi bạn ngắm trọn biển mây 360 độ quanh mình.
- **Mỏm cá heo & Cây táo mèo cô đơn**: Những góc chụp ảnh kinh điển mang tính biểu tượng của vùng cao Tây Bắc.
- **Đỉnh Gió**: Điểm cắm trại ngắm hoàng hôn rực lửa và thưởng thức tiệc nướng BBQ ấm cúng bên ánh lửa bập bùng giữa khí trời se lạnh 12 độ C.`,
    cover_image: VIETNAM_IMAGES.camping,
    destination: {
      id: "ta-xua",
      slug: "ta-xua",
      name: "Tà Xùa — Thiên Đường Mây",
      country: "Sơn La, Việt Nam",
      summary: "Thiên đường săn mây kỳ vĩ bậc nhất vùng Tây Bắc.",
      description: "Điểm cắm trại và dã ngoại được yêu thích bởi giới trẻ.",
      image_url: VIETNAM_IMAGES.camping,
      hero_image_url: VIETNAM_IMAGES.camping,
      starting_price: "1200000",
      center: { lat: 21.28, lng: 104.35 },
    },
    published_at: "2026-10-03T14:15:00Z",
    readTime: "6 phút đọc",
    category: "Cẩm Nang Phượt",
    authorName: "Lê Hoàng Long",
    authorRole: "Nhiếp ảnh gia phong cảnh",
    tags: ["Tà Xùa", "Săn mây", "Cắm trại", "Tây Bắc"],
  },
  {
    id: "story-kinh-nghiem-du-thuyen-ha-long",
    slug: "kinh-nghiem-du-thuyen-ha-long",
    title: "Kinh nghiệm chọn du thuyền 5 sao vịnh Hạ Long và Lan Hạ trọn vẹn nhất",
    excerpt: "Tất cả những gì bạn cần biết để chọn cabin, hải trình và tận hưởng chuyến nghỉ dưỡng sang trọng giữa kỳ quan.",
    body: `Nghỉ đêm trên du thuyền 5 sao giữa lòng vịnh di sản UNESCO là trải nghiệm du lịch thượng lưu không thể bỏ lỡ khi đến Việt Nam. Với hàng trăm đội tàu đang hoạt động, việc lựa chọn hải trình và du thuyền phù hợp sẽ quyết định toàn bộ chất lượng chuyến đi của bạn.

### Nên chọn hải trình Vịnh Hạ Long hay Vịnh Lan Hạ?

- **Hải trình Vịnh Hạ Long truyền thống**: Đi qua các điểm tham quan nổi tiếng như đảo Ti Tốp, hang Sửng Sốt, động Thiên Cung. Thích hợp cho những du khách lần đầu đến vịnh muốn chiêm ngưỡng những hang động thạch nhũ kỳ vĩ nhất.
- **Hải trình Vịnh Lan Hạ (Cát Bà)**: Yên bình và hoang sơ hơn, với hàng trăm bãi tắm tự nhiên nhỏ xinh nép mình dưới chân vách đá vôi, hang Sáng Tối lý tưởng để chèo kayak và làn nước trong xanh ngọc bích.

### Tiêu chuẩn một du thuyền 5 sao chuẩn mực

Một du thuyền đẳng cấp luôn đảm bảo 100% phòng nghỉ có ban công riêng và bồn tắm hướng vịnh, sundeck rộng rãi phục vụ tiệc trà chiều hoàng hôn, bể sục Jacuzzi bốn mùa trên boong tàu và thực đơn buffet hải sản phong phú từ tôm hùm, cua biển đến cá hồi Na Uy tươi sống.`,
    cover_image: VIETNAM_IMAGES.cruise,
    destination: {
      id: "ha-long",
      slug: "ha-long",
      name: "Vịnh Hạ Long",
      country: "Quảng Ninh, Việt Nam",
      summary: "Kỳ quan thiên nhiên thế giới UNESCO.",
      description: "Vịnh Hạ Long là niềm tự hào của du lịch Việt Nam.",
      image_url: VIETNAM_IMAGES.haLong,
      hero_image_url: VIETNAM_IMAGES.haLong,
      starting_price: "1800000",
      center: { lat: 20.9101, lng: 107.0844 },
    },
    published_at: "2026-10-04T09:00:00Z",
    readTime: "6 phút đọc",
    category: "Kinh Nghiệm Du Lịch",
    authorName: "Đặng Thu Thảo",
    authorRole: "Biên tập viên Du lịch cao cấp",
    tags: ["Hạ Long", "Lan Hạ", "Du thuyền 5 sao", "Nghỉ dưỡng"],
  },
  {
    id: "story-lan-ngam-san-ho-phu-quoc",
    slug: "lan-ngam-san-ho-phu-quoc",
    title: "Hướng dẫn lặn biển ngắm rạn san hô nguyên sinh tại Nam đảo Phú Quốc",
    excerpt: "Khám phá vẻ đẹp thủy cung rực rỡ tại quần đảo An Thới với các rạn san hô được bảo tồn tự nhiên tuyệt đẹp.",
    body: `Quần đảo An Thới phía Nam đảo Phú Quốc sở hữu một trong những hệ sinh thái rạn san hô tự nhiên đa dạng và trù phú bậc nhất vùng biển Tây Nam Việt Nam. Với hơn 360 loài san hô cứng và hàng chục loài san hô mềm rực rỡ, nơi đây chính là thiên đường cho các tín đồ mê đại dương.

### Các hình thức lặn biển tại Phú Quốc

1. **Snorkeling (Lặn với ống thở và kính lặn)**: Thích hợp cho mọi lứa tuổi, kể cả những người không biết bơi. Chỉ cần mặc áo phao, úp mặt xuống làn nước trong vắt tại Hòn Móng Tay hay Hòn Gầm Ghì là bạn đã có thể ngắm nhìn thế giới san hô ở độ sâu 1-3m.
2. **Scuba Diving (Lặn với bình khí chuyên nghiệp)**: Lặn sâu từ 6 đến 12m cùng huấn luyện viên PADI kèm 1-1, chạm tay vào những rạn san hô bắp cải khổng lồ và chiêm ngưỡng đàn cá bướm, cá hề bơi lội tung tăng.
3. **Seawalker (Đi bộ dưới đáy biển)**: Đội mũ dưỡng khí đặc dụng và sải bước nhẹ nhàng trên nền cát trắng dưới đáy đại dương như các nhà thám hiểm thực thụ.`,
    cover_image: VIETNAM_IMAGES.scubaDiving,
    destination: {
      id: "phu-quoc",
      slug: "phu-quoc",
      name: "Đảo Ngọc Phú Quốc",
      country: "Kiên Giang, Việt Nam",
      summary: "Thiên đường biển đảo nhiệt đới với bờ cát trắng mịn.",
      description: "Thủ phủ lặn biển và nghỉ dưỡng biển cao cấp.",
      image_url: VIETNAM_IMAGES.phuQuoc,
      hero_image_url: VIETNAM_IMAGES.phuQuoc,
      starting_price: "2200000",
      center: { lat: 10.2899, lng: 103.984 },
    },
    published_at: "2026-10-04T16:00:00Z",
    readTime: "5 phút đọc",
    category: "Phiêu Lưu & Đại Dương",
    authorName: "Vũ Tuấn Kiệt",
    authorRole: "Huấn luyện viên lặn biển PADI",
    tags: ["Phú Quốc", "Lặn biển", "San hô", "An Thới"],
  },
  {
    id: "story-cam-nang-du-lich-mui-ne-phan-thiet",
    slug: "cam-nang-du-lich-mui-ne-phan-thiet",
    title: "Cẩm nang du lịch Mũi Né — Phan Thiết: Đồi Cát Bay, Bàu Trắng và hải sản làng chài",
    excerpt: "Bí quyết chinh phục tiểu sa mạc cát nhiệt đới, trải nghiệm xe Jeep Safari đón bình minh và thưởng thức lẩu thả Phan Thiết.",
    body: `Mũi Né — Phan Thiết (tỉnh Bình Thuận) từ lâu đã khẳng định vị thế là 'thủ phủ resort' và thiên đường biển sa mạc độc nhất vô nhị của Việt Nam. Nơi đây sở hữu khí hậu nắng ấm quanh năm, những đồi cát trắng và cát đỏ đổi màu theo từng cơn gió biển, cùng cung đường ven biển lộng gió đẹp như tranh vẽ.

### Thời điểm vàng du lịch Mũi Né

Thời tiết Mũi Né phân hóa thành hai mùa rõ rệt. Mùa khô kéo dài từ tháng 11 đến tháng 4 năm sau với bầu trời trong xanh ngắt, gió lộng và biển êm, đặc biệt lý tưởng cho các bộ môn thể thao mạo hiểm như lướt ván diều, lướt sóng và trượt cát.

### Những trải nghiệm đỉnh cao không thể bỏ lỡ

1. **Jeep Safari đón bình minh tại Đồi Cát Trắng (Bàu Trắng)**: Thức dậy từ 4h30 sáng, vi vu trên những chiếc xe Jeep địa hình rực rỡ sắc màu lao dốc vượt qua những cồn cát trắng uốn lượn ngoạn mục. Đứng giữa hồ sen nước ngọt phẳng lặng giữa lòng sa mạc ngắm mặt trời nhô lên từ chân trời biển Đông là khoảnh khắc kỳ diệu khó quên.
2. **Lội chân trần khám phá Suối Tiên (Fairy Stream)**: Dòng suối cạn nước đỏ au len lỏi giữa những vách nhũ cát phong hóa hàng ngàn năm tạo nên hẻm núi mini Grand Canyon kỳ vĩ.
3. **Thăm làng chài Mũi Né lúc sáng sớm**: Chiêm ngưỡng bức tranh sinh hoạt nhộn nhịp của ngư dân khi hàng trăm chiếc thuyền thúng cập bờ đầy ắp tôm cá tươi rói.
4. **Viếng quần thể Tháp Chàm Poshanư**: Cụm tháp cổ xây dựng từ thế kỷ thứ 8 thờ thần Shiva và công chúa Poshanu, mang đậm dấu ấn kiến trúc Hòa Lai Champa huyền bí.

### Ẩm thực tinh hoa xứ biển Phan Thiết

Đến Mũi Né, bạn nhất định phải thưởng thức món **Lẩu Thả Phan Thiết** — món ăn được bài trí công phu trên các bẹ hoa chuối đại diện cho ngũ hành Kim, Mộc, Thủy, Hỏa, Thổ. Ngoài ra, bánh căn xíu mại cá nục, răng mực nướng bơ tỏi và mực một nắng nướng sa tế tại bờ kè Hàm Tiến sẽ khiến chuyến đi của bạn thêm phần trọn vẹn.`,
    cover_image: VIETNAM_IMAGES.oceanBanner,
    destination: {
      id: "mui-ne",
      slug: "mui-ne",
      name: "Mũi Né — Đồi Cát Bay",
      country: "Bình Thuận, Việt Nam",
      summary: "Tiểu sa mạc cát nhiệt đới và thủ phủ nghỉ dưỡng biển.",
      description: "Thiên đường đồi cát kỳ thú và cung đường biển lộng gió.",
      image_url: VIETNAM_IMAGES.oceanBanner,
      hero_image_url: VIETNAM_IMAGES.oceanBanner,
      starting_price: "1850000",
      center: { lat: 10.9333, lng: 108.2833 },
    },
    published_at: "2026-10-05T08:00:00Z",
    readTime: "6 phút đọc",
    category: "Cẩm Nang Điểm Đến",
    authorName: "Lê Nhật Quang",
    authorRole: "Chuyên gia khám phá duyên hải miền Trung",
    tags: ["Mũi Né", "Phan Thiết", "Bàu Trắng", "Đồi cát", "Jeep Safari", "Lẩu thả"],
  },
  {
    id: "story-kham-pha-36-pho-phuong-ha-noi",
    slug: "kham-pha-36-pho-phuong-ha-noi",
    title: "Hà Nội 36 phố phường: Cẩm nang dạo bước nghìn năm văn hiến và ẩm thực vỉa hè",
    excerpt: "Khám phá nét duyên thầm Thăng Long qua những con ngõ cổ, cà phê trứng Giảng nức tiếng và bát phở bò gia truyền.",
    body: `Hà Nội — trái tim của non sông Việt Nam, là nơi hội tụ tinh hoa văn hóa nghìn năm Thăng Long - Đông Đô. Dù thời gian trôi qua với nhịp sống hiện đại hối hả, thủ đô vẫn giữ trọn vẹn nét thanh lịch, cổ kính qua những mái ngói rêu phong của 36 phố phường, mặt nước Hồ Gươm xanh biếc và tiếng rao đêm trầm ấm len lỏi qua từng ngõ nhỏ.

### Dạo bước 36 phố phường phố cổ

Mỗi con phố Hà Nội xưa gắn liền với một nghề thủ công truyền thống: Hàng Gai lụa tơ tằm óng ả, Hàng Bạc kim hoàn tinh xảo, Hàng Mã rực rỡ sắc màu giấy lồng đèn. Hãy bách bộ quanh Hồ Hoàn Kiếm, ghé thăm Đền Ngọc Sơn qua cầu Thê Húc son đỏ, hoặc ngồi xe điện dạo quanh khu phố cổ để lắng nghe nhịp thở đời thường của người Tràng An.

### Tinh hoa ẩm thực Hà Thành

Ẩm thực Hà Nội không chỉ là ăn uống mà là một nét nghệ thuật thưởng thức:
- **Phở Hà Nội**: Nước dùng trong veo, ngọt thanh từ xương ống ninh kỹ nhiều giờ, ăn kèm thịt bò tái lăn và chút quẩy giòn tan.
- **Cà phê trứng**: Sáng tạo độc đáo của cụ Giảng từ thập niên 1940, với lớp kem trứng béo ngậy đánh bông phủ trên lớp cà phê phin đậm đặc thơm lừng.
- **Bún chả Hà Nội**: Thịt ba chỉ và chả viên nướng xém cạnh trên than hoa, chấm cùng bát nước mắm chua ngọt pha tỏi ớt và đu đủ giòn.`,
    cover_image: VIETNAM_IMAGES.hero,
    destination: {
      id: "ha-noi",
      slug: "ha-noi",
      name: "Thủ đô Hà Nội",
      country: "Việt Nam",
      summary: "Trái tim nghìn năm văn hiến và tinh hoa ẩm thực đất kinh kỳ.",
      description: "Thủ đô thanh lịch với 36 phố phường và nét đẹp di sản.",
      image_url: VIETNAM_IMAGES.hero,
      hero_image_url: VIETNAM_IMAGES.hero,
      starting_price: "1200000",
      center: { lat: 21.0285, lng: 105.8542 },
    },
    published_at: "2026-10-06T09:30:00Z",
    readTime: "7 phút đọc",
    category: "Văn Hóa & Di Sản",
    authorName: "Nguyễn Thu An",
    authorRole: "Nhà nghiên cứu văn hóa Hà Nội",
    tags: ["Hà Nội", "Phố cổ", "36 phố phường", "Hồ Gươm", "Ẩm thực"],
  },
  {
    id: "story-kinh-nghiem-du-lich-da-lat-tu-tuc",
    slug: "kinh-nghiem-du-lich-da-lat-tu-tuc",
    title: "Kinh nghiệm du lịch Đà Lạt tự túc: Săn mây đồi chè Cầu Đất và top quán cà phê chill",
    excerpt: "Hành trình khám phá thành phố sương mù, mẹo săn biển mây bình minh Cầu Đất và các tọa độ check-in rừng thông lãng mạn.",
    body: `Đà Lạt (Lâm Đồng) nằm trên cao nguyên Lâm Viên với độ cao 1.500m so với mực nước biển, được mệnh danh là 'Thành phố ngàn hoa' hay 'Tiểu Paris' của Việt Nam. Khí hậu mát lạnh quanh năm cùng rừng thông bạt ngàn tạo nên một không gian nghỉ dưỡng tái tạo năng lượng hoàn hảo cho mọi lứa tuổi.

### Cẩm nang săn mây Cầu Đất Panorama

Để săn trọn biển mây bồng bềnh tại đồi chè Cầu Đất, thời điểm lý tưởng nhất là từ 4h30 đến 6h00 sáng vào những tháng cuối năm (tháng 10 đến tháng 3). Đứng trên thảm gỗ cầu mây ngắm ánh bình minh vàng cam rực rỡ xuyên qua lớp sương sớm cuồn cuộn là một trải nghiệm thị giác ngoạn mục.

### Top điểm đến không thể bỏ qua tại Đà Lạt

1. **Hồ Tuyền Lâm & Thiền Viện Trúc Lâm**: Mặt hồ xanh biếc phẳng lặng bao bọc bởi đồi thông, rất lý tưởng để chèo SUP hoặc dã ngoại cắm trại.
2. **Dinh III Bảo Đại**: Biệt điện nghỉ dưỡng cổ kính của vị hoàng đế cuối cùng triều Nguyễn, lưu giữ nguyên vẹn đồ dùng hoàng gia và kiến trúc Art Deco sang trọng.
3. **Thác Datanla**: Trải nghiệm hệ thống máng trượt xuyên rừng thông dài nhất Đông Nam Á cho những ai yêu thích cảm giác mạnh.
4. **Lẩu gà lá é & Bánh tráng nướng chợ đêm**: Thưởng thức nồi lẩu gà lá é chua thanh cay nồng trong đêm lạnh 16 độ C là trải nghiệm ẩm thực đặc sắc nhất phố núi.`,
    cover_image: VIETNAM_IMAGES.daLat,
    destination: {
      id: "da-lat",
      slug: "da-lat",
      name: "Đà Lạt — Ngàn Hoa",
      country: "Lâm Đồng, Việt Nam",
      summary: "Xứ sở sương mù mộng mơ và đồi thông xanh ngát.",
      description: "Thành phố tình yêu và nghỉ dưỡng cao nguyên lãng mạn.",
      image_url: VIETNAM_IMAGES.daLat,
      hero_image_url: VIETNAM_IMAGES.daLat,
      starting_price: "1400000",
      center: { lat: 11.9404, lng: 108.4583 },
    },
    published_at: "2026-10-07T11:00:00Z",
    readTime: "6 phút đọc",
    category: "Cẩm Nang Du Lịch",
    authorName: "Đỗ Minh Quân",
    authorRole: "Nhiếp ảnh gia & Travel Blogger",
    tags: ["Đà Lạt", "Săn mây", "Cầu Đất", "Hồ Tuyền Lâm", "Cà phê"],
  },
];

export function getStoryBySlug(slug: string): StoryItem | undefined {
  return VIETNAM_STORIES.find((s) => s.slug === slug);
}
