import { VIETNAM_IMAGES } from "./assets";
import type { Article, Destination } from "./types";

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
];

export function getStoryBySlug(slug: string): StoryItem | undefined {
  return VIETNAM_STORIES.find((s) => s.slug === slug);
}
