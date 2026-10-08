/**
 * ─────────────────────────────────────────────────────────────────────────────
 * STAR TRAVELS VIETNAM — CENTRALIZED SEED DATA REPOSITORY
 * ─────────────────────────────────────────────────────────────────────────────
 * Toàn bộ dữ liệu mẫu (mock / seed data) của website được tập trung tại đây
 * để dễ dàng quản lý, chỉnh sửa, bổ sung mà không cần nhập thủ công qua CMS.
 *
 * Cấu trúc module:
 * - destinations.ts : Danh sách điểm đến, thông tin chi tiết, tọa độ GPS, giá khởi điểm
 * - tours.ts        : Các tour du lịch trọn gói, lịch trình từng ngày, giá vé, dịch vụ
 * - experiences.ts  : Tuyển tập trải nghiệm bản địa & danh lam thắng cảnh đặc sắc
 * - stories.ts      : Các bài viết, câu chuyện hành trình, cẩm nang du lịch
 * ─────────────────────────────────────────────────────────────────────────────
 */

export * from "./destinations";
export * from "./tours";
export * from "./experiences";
export * from "./stories";
export * from "./history";

import { ALL_VIETNAM_DESTINATIONS, VIETNAM_DESTINATIONS_PAGES, getDestinationBySlug } from "./destinations";
import { VIETNAM_TOURS, getTourBySlug } from "./tours";
import { VIETNAM_EXPERIENCES, getExperienceBySlug } from "./experiences";
import { VIETNAM_STORIES, getStoryBySlug } from "./stories";
import { VIETNAM_HERITAGE_HISTORY, getHeritageBySlug, getHeritageByDestination } from "./history";

/**
 * Đối tượng gom toàn bộ seed data về 1 điểm truy cập duy nhất
 */
export const SEED_DATA = {
  destinations: ALL_VIETNAM_DESTINATIONS,
  destinationPages: VIETNAM_DESTINATIONS_PAGES,
  tours: VIETNAM_TOURS,
  experiences: VIETNAM_EXPERIENCES,
  stories: VIETNAM_STORIES,
  heritageHistory: VIETNAM_HERITAGE_HISTORY,
} as const;

/**
 * Bộ helper tra cứu nhanh theo slug
 */
export const seedFinder = {
  destination: getDestinationBySlug,
  tour: getTourBySlug,
  experience: getExperienceBySlug,
  story: getStoryBySlug,
  heritage: getHeritageBySlug,
  heritageByDestination: getHeritageByDestination,
};

export default SEED_DATA;
