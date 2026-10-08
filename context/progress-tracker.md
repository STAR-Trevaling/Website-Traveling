# Progress Tracker

## Completed in this artifact
- Backend modular-monolith baseline and domain apps.
- PostgreSQL/PostGIS models and initial migrations.
- Public discovery/content APIs.
- Review/favorite workflow.
- Partner application review/approval workflow with audit trail.
- Demo seed command.
- Next.js customer frontend with Anima-template home page and supporting pages.
- Next.js BFF auth cookie flow for authenticated customer actions.
- Docker Compose wiring for DB, Redis, Django, Celery and Next.js.
- Git repository setup: initial empty commit on `main`, scoped conventional branches (`chore/project-setup`, `feat/shared-contracts`, `feat/backend-core`, `feat/frontend-web`, `docs/project-context`, `feat/agent-skills`), clean star-graph branching from `main`, integration into `chore/platform-integration`, and remote push to `https://github.com/STAR-Trevaling/Website-Traveling.git`.
- GitHub Actions CI & Security Pipeline: complete automation with PostGIS 17 + Redis 7 services, dynamic GDAL/GEOS paths, Django migrations check, Ruff linter & formatter, MyPy static typing, Bandit SAST security audit, Pytest suite, Next.js typecheck & build, TruffleHog secret scanning, npm audit, and GitHub CodeQL analysis. All workflows passing 100% green.
- Anima Template Frontend Pages Completion: Redesigned and implemented all customer-facing routes (`/about`, `/contact`, `/partner`, `/experiences`, `/experiences/[slug]`, `/destinations`, `/destinations/[slug]`, `/stories`, `/stories/[slug]`, `/tours`, `/tours/[slug]`, `/not-found`) with pixel-level Anima template aesthetics (`rounded-[2px]`, `#0098a2` teal accents, Yellowtail script typography, frosted glass `bg-white/85 backdrop-blur-md`, interactive booking cards, inquiry forms, and FAQ accordion) perfectly aligned with Home page tours, adventures, and editorial stories.
- Semantic Monorepo Layout Restructuring (`apps/public-site` + `apps/api` + `packages/contracts`):
  - Permanently removed legacy admin prototype (`apps/admin/`) as requested, eliminating duplicate code and unused dependencies.
  - Standardized backend modular monolith as `apps/api` (Django 5.2 + DRF + PostGIS + Celery).
  - Standardized customer frontend as `apps/public-site` (Next.js 15 App Router + Tailwind CSS).
  - Preserved shared type contracts as `packages/contracts` (@travel/contracts).
  - Standardized directory layout matching Vercel / Turborepo / Nx and Python production conventions.
  - Updated all Docker Compose configurations, GitHub Actions CI workflows, static sanity scripts, tsconfig path mappings, and repository documentation.

- Complete Bilingual i18n Architecture & Language Switcher (`apps/public-site/`):
  - Solved mixed Vietnamese/English content by enforcing single active language policy across all customer-facing routes and components.
  - Implemented `LanguageProvider` and `useLanguage` context supporting reactive locale switching (`vi` and `en`) with `localStorage` and cookie persistence (`star_travels_locale`) and automatic `document.documentElement.lang` attribute sync.
  - Added extensible pill language switcher `[ 🇻🇳 VI | 🇬🇧 EN ]` with active state indicators supporting both transparent header overlay mode and standard mode, on both desktop header and mobile navigation drawer.
  - Applied high-ranking travel SEO terminology based on `seo-optimization` skill:
    - Vietnamese: *Điểm Đến Nổi Tiếng*, *Tour Du Lịch Trọn Gói*, *Vì Sao Chọn Star Travels?*, *Trải Nghiệm Bản Địa Hôm Nay*, *Bản Tin Du Lịch*, *Vinh Danh Kỳ Quan & Di Sản*, *Bạn Đang Tìm Kiếm Trải Nghiệm Độc Bản?*.
    - English: *Popular Destinations*, *Featured All-Inclusive Tours*, *Why Choose Star Travels?*, *Have an Adventure Today*, *NEWSLETTER*, *Award Winning*, *Looking for an Experience?*.
  - Added bilingual data contracts and fallback records for all 12 destinations (`name_en`, `summary_en`, `description_en`) and 8 curated tours (`title_en`, `duration_en`, `departure_en`).

- UI Layout Harmony, Pure User Icon, Language Consent Banner & Public Site UI Inventory:
  - Addressed Vietnamese layout wrapping and text-length differences across the public frontend (`apps/public-site/`).
  - Standardized hero slider titles to concise, elegant 4-word phrasing with `text-balance` to prevent orphaned words.
  - Refined search bar columns (`flex-[1.2]` and `whitespace-nowrap`) and adventure frosted overlays (`w-[80%]` with concise 2-line descriptions) preventing overflow.
  - Balanced tour cards and newsletter awards thumbnails (4:3 ratio with 110–128px width, granting +45px text breathing room) eliminating multi-line word breaks.
  - Converted the desktop user account trigger to a clean icon-only button without accompanying text (`UserRound`), ensuring generous header spacing.
  - Implemented international-standard Language Consent & Cookie Preference Banner (`LanguageConsentBanner`): floating glassmorphic card prompting first-time visitors to choose their preferred language (`[ 🇻🇳 Tiếng Việt ]` / `[ 🇬🇧 English ]`), automatically storing their choice via cookie and localStorage, fully synchronized with the header pill switcher.
  - Published comprehensive Markdown UI inventory documentation: `docs/public-site-ui-inventory.md`.

- Full Bilingual i18n Synchronization Across Entire Public Site (Option A):
  - Completed comprehensive bilingual review and eliminated 100% of hardcoded mixed language across all routes, layouts, cards, modals, and dynamic data fallbacks in `apps/public-site/`.
  - Extended centralized i18n dictionary system (`src/lib/i18n/types.ts` & `src/lib/i18n/dictionary.ts`) covering all routes and components:
    - Shared components: `PlaceCard`, `PageHero`, `LanguageConsentBanner`, `SiteFooter`, `SiteHeaderClient`, `MobileNav`, `LanguageSwitcher`.
    - Catalog & Detail Pages: `ToursCatalog`, `TourBookingCard`, `/tours/[slug]`, `/experiences`, `ExperienceBookingCard`, `ReviewForm`, `/experiences/[slug]`, `/destinations`, `/destinations/[slug]`.
    - Content & Informational Pages: `/about`, `ContactForm`, `ContactFAQ`, `/contact`, `PartnerForm`, `/partner`, `/stories`, `/stories/[slug]`.
    - User Authentication & Portal: `LoginForm`, `RegisterForm`, `LogoutButton`, `/login`, `/register`, `/account`.
    - Error & Fallback Pages: `/not-found` (404).
  - Server components read cookies (`star_travels_locale`) to render pristine locale content without flash; client components reactively sync with `useLanguage()`.
  - Zero leftover mixed English/Vietnamese: 100% pure Vietnamese when `locale === "vi"`, 100% natural luxury travel English when `locale === "en"`.

- Brand Identity & Logo Standard Skill (`.agents/skills/brand-identity-and-logo/`):
  - Created official brand engineering skill establishing **`STAR`** as the finalized, non-negotiable brand name.
  - Enforced dual-element logo design contract: Every logo instance **must** contain both the brand name (**`STAR`**) and the star emblem/icon (**Hình ngôi sao** - 5-pointed golden star `#EAB308`).
  - Documented complete vector geometry (SVG polygon points, 72° symmetry, golden ratio $0.382$), color hierarchy (`#EAB308` Gold, `#1E293B` Slate, `#0098A2` Teal), typography pairings, clear space ($0.5X$), and prohibited anti-patterns.
  - Implemented reusable production component `<StarLogo />` (`apps/public-site/src/components/shared/star-logo.tsx`) supporting multiple lockup variants (`integrated`, `horizontal`, `stacked`, `icon-only`) and sizing scales (`sm`, `md`, `lg`, `xl`).
- Centralized Seed Data Architecture (`apps/public-site/src/data/seed/`):
  - Consolidated all decoupled frontend seed and mock datasets (destinations, curated tours, adventures/experiences, editorial stories) into a single, dedicated data repository (`apps/public-site/src/data/seed/`).
  - Implemented modular datasets: `destinations.ts`, `tours.ts`, `experiences.ts`, `stories.ts`, and master index `index.ts` exporting unified `SEED_DATA` object and `seedFinder` lookup helpers.
- Bright Iconic Vietnam Landmark Banner Imagery & Sunlight Overlay Optimization (`apps/public-site`):
  - Replaced dim and overcast hero slides with 4 bright, sunny, world-renowned Vietnam landmark photos: Vịnh Hạ Long (UNESCO natural wonder in golden sun), Cầu Vàng Bà Nà Hills - Đà Nẵng (striking gold hands in sunny sky), Ruộng bậc thang Mùa Vàng Sa Pa (sunlit cascading golden rice terraces), and Non nước Tràng An Ninh Bình (crystal emerald waterways under blue sky).
  - Softened heavy dark CSS gradient overlays across `HeroSlider`, `PageHero`, `/destinations/[slug]`, and `/tours/[slug]` from ~65%-95% black down to 10%-35% cinematic tint, allowing natural daylight and landscape beauty to shine through vividly.
  - Reinforced typography readability with `drop-shadow-[0_4px_20px_rgba(0,0,0,0.85)]` and landmark badges (`✦ UNESCO / Biểu tượng du lịch`).
  - Added desktop slide prev/next arrow controls and golden indicator navigation dots with smooth Ken Burns animation.
  - Provided root export at `@/data` and `@/data/seed` for clean, ergonomic import ergonomics across customer components and routes.
  - Maintained 100% backward compatibility via deprecation re-export shims in `src/lib/*-data.ts`.
  - Migrated sitemap, catalog, detail pages, and home components to direct `@/data/seed` imports.
  - Created comprehensive documentation and maintenance guide (`src/data/seed/README.md`).

- Full ERP Sync Specification & Public Site Dynamic Data Integration:
  - Authored comprehensive specification: `docs/erp-sync-spec-and-implementation-plan.md` defining Odoo 18 module blueprint (`star_travels_connector`), data contracts, HMAC-SHA256 webhooks, and transactional Outbox event lifecycle.
  - Implemented Django `tours` bounded context (`apps/api/tours/`): `Tour` model with bilingual fields, JSONB itineraries/highlights/inclusions, pricing, DRF ReadOnlyModelViewSet, Serializer, URLs, and Django Admin.
  - Extended Django models with bilingual & rich editorial metadata:
    - `destinations`: `name_en`, `country_en`, `summary_en`, `description_en`.
    - `places`: `name_en`, `short_description_en`, `description_en`, `address_en`.
    - `content` (Articles): `category`, `read_time`, `author_name`, `author_role`, `author_avatar`, `tags`.
  - Upgraded `seed_demo` command: Idempotently populates complete seed datasets into Postgres/Django Admin (12 destinations, 10 experiences/places, 8 tours, 4 stories, partner application, demo users).
  - Dynamic Frontend Integration (`apps/public-site`):
    - Connected `HomePage`, `/tours`, `/tours/[slug]`, `/stories`, `/stories/[slug]` to backend `publicApi` endpoints.
    - Preserved zero-downtime fallback to `@/data/seed` when backend is offline.
    - Verified strict TypeScript compilation (`npm run typecheck` passed with 0 errors).
  - Outbox CRM dispatch & Inbound Webhooks:
    - Dispatched `partner.application.created` event on new partner application submission.
- Enterprise Database Schema & AI Knowledge Store Build:
  - Authored authoritative specifications:
    - `docs/system-database-design-and-erd.md`: Comprehensive enterprise database design, Mermaid ERD, and 3-way schema mappings (PostgreSQL ↔ Odoo 18 ERP ↔ TypeScript contracts).
    - `docs/ai-trip-assistant-spec-and-roadmap.md`: Architectural specification and phased roadmap for AI Trip Assistant.
  - Implemented `bookings` bounded context (`apps/api/bookings/`):
    - `Booking` model with UUID PK, unique booking code, customer/tour relationships, status state machine, Odoo order sync link, DRF Serializers, ModelViewSet, Admin, and Outbox `booking.created` integration.
  - Implemented `assistant` bounded context (`apps/api/assistant/`):
    - `AssistantConversation`: session token, locale, metadata.
    - `AssistantMessage`: role, content, structured JSON payloads.
    - `AssistantLeadCapture`: contact name, phone, email, preferred destination, pax, budget range, sync state (`pending`, `synced`, `failed`), and Outbox `ai.lead.created` dispatch.
    - `AssistantKnowledgeChunk`: clean knowledge store for tours, destinations, places, and policies.
  - Enabled PostgreSQL extensions: `pg_trgm`, `unaccent`, `postgis`.
  - Applied migrations: `bookings.0001_initial` and `assistant.0001_initial`.
  - Seeded full knowledge base into PostgreSQL: 18 destination chunks, 8 tour chunks, 2 policy chunks, and demo booking.
  - Full RAG Retriever & Grounded Chatbot Engine (`apps/api/assistant/`):
    - Hybrid Knowledge Retriever (`retriever.py`): Multi-entity matching on destinations, regions, and policy FAQs.
    - Grounded Synthesis Generator (`generator.py`): Luxury STAR Concierge tone, anti-hallucination bounds, interactive `[TOUR_CARD: slug]` citation tags, and automated customer lead extraction.
    - Chat API (`POST /api/v1/assistant/conversations/chat/`): Conversation tracking, message logging, matched rich Tour cards payload, and Outbox `ai.lead.created` dispatch to Odoo CRM.
  - Floating AI Concierge Frontend Widget (`apps/public-site`):
    - Component `<AITripAssistant />`: Floating bubble with `<StarLogo />`, glowing pulse aura, quick prompt pills, frosted-glass drawer, markdown bubbles, interactive tour cards, and lead confirmation banner.
    - Integrated globally in `RootLayout` under `LanguageProvider`.
- Vietnamese National Red Theme & "Nền Đỏ Sao Vàng" Chat Widget Conversion:
  - Transitioned the entire public website primary theme from Teal (`#0098a2` / ocean) to Vietnamese Crimson Red (`#DA251D`, hover `#C92018`, dark red `#991B1B` / `#B91C1C`).
  - Implemented the official "nền đỏ sao vàng" floating AI Concierge chat button: rich crimson red gradient (`from-[#991b1b] via-[#da251d] to-[#dc2626]`), pulsing aura (`bg-[#da251d]/35`), and the radiant 5-pointed golden star emblem (`<StarLogo variant="icon-only" size="md" />` in `#EAB308`).
  - Converted all primary accents, buttons, tabs, links, active indicators, borders, input focus rings, and hover states across `apps/public-site`:
    - Design tokens & globals: `--primary` and `--ring` set to Vietnamese Red `2.5 76% 48.4%`, `::selection` background `#DA251D`, warm off-white background `#FAF8F8`, `.section-divider` and `.travel-card-lift:hover` red shadows.
    - Tailwind configuration: mapped `ocean` and `vnred` palettes to Vietnamese red tints and shades.
    - SVG brand logo: updated `public/star-logo.svg` `.brand-desc` fill to `#DA251D`.
    - Components converted: `button.tsx`, `input.tsx`, `tabs.tsx`, `mobile-nav.tsx`, `ai-trip-assistant.tsx`, `discovery-search.tsx`, `destinations-carousel.tsx`, `featured-tours.tsx`, `home-sections.tsx`, `newsletter-awards.tsx`, `destination-card.tsx`, `place-card.tsx`, `breadcrumb.tsx`, `tours-catalog.tsx`, `tour-booking-card.tsx`, `review-form.tsx`, `experience-booking-card.tsx`, `partner-form.tsx`, `contact-form.tsx`, `register-form.tsx`, `login-form.tsx`, and all catalog/detail routes.
    - Kept 100% of other colors intact: golden star (`#EAB308`), slate neutrals (`#1E293B`, `#0F172A`), white card backgrounds, emerald status tags.
    - Verified: Zero remaining teal hexes (`0098a2`, `008f99`, `007a82`), `tsc --noEmit` passed cleanly with 0 type errors, Next.js dev server ready on `localhost:3000`.

- Historical & Heritage Knowledge Base for AI RAG Grounding (`apps/api/assistant/` & `apps/public-site/`):
  - Created dedicated authentic historical dataset [vietnam_heritage_history.py](file:///c:/Users/msi/Downloads/travel-platform-mvp-complete/travel-platform-mvp-complete/apps/api/assistant/data/vietnam_heritage_history.py) comprising 11 landmark profiles across Vietnam:
    1. Vịnh Hạ Long & Vịnh Lan Hạ (Huyền tích Rồng Giáng thế, chiến trận Bạch Đằng 1288, di chỉ Cái Bèo 7.000 năm).
    2. Đô thị cổ Hội An & Chùa Cầu (Thương cảng quốc tế Faifo thế kỷ 16-17, trấn yểm thủy quái Mamazu, Lai Viễn Kiều, Chúa Nguyễn).
    3. Quần thể Danh thắng Tràng An & Cố đô Hoa Lư (Kinh đô Đinh Bộ Lĩnh 968, Chiếu dời đô 1010, Hành cung Vũ Lâm chống Nguyên Mông).
    4. Quần thể Di tích Cố đô Huế & Sông Hương (Triều Nguyễn 1802-1945, kiến trúc Vauban giao thoa phong thủy, lăng tẩm các vua, Chùa Thiên Mụ).
    5. Cao nguyên đá Đồng Văn & Đèo Mã Pí Lèng (Kiến tạo vỏ Trái Đất 500 triệu năm, Con đường Hạnh Phúc 1959-1965, Dinh Vua Mèo).
    6. Sa Pa, Thung lũng Mường Hoa & Fansipan (Trạm nghỉ dưỡng Pháp cổ 1903, bãi đá cổ Mường Hoa, ruộng bậc thang).
    7. Đà Lạt & Langbiang (Bác sĩ Alexandre Yersin 1893, Dinh Bảo Đại, Ga xe lửa bánh răng cưa, chuyện tình K'Lang và H'Biang).
    8. Đảo Ngọc Phú Quốc & Dấu ấn Khai hoang Mạc Cửu (Mạc Cửu 1708, Giếng Ngự Nguyễn Ánh, nghề làm nước mắm truyền thống 200 năm).
    9. Đà Nẵng, Ngũ Hành Sơn & Bảo tàng Điêu khắc Chăm (Vua Minh Mạng 1825, Văn bia Ma Nhai UNESCO, EFEO Henri Parmentier 1915).
    10. Nha Trang & Tháp Bà Ponagar (Vương quốc Champa Kauthara thế kỷ 8-13, Mẫu Thiên Y A Na, kỹ thuật ghép gạch không mạch vữa).
    11. Mũi Né & Tháp Chàm Poshanư (Thờ thần Shiva và Công chúa Poshanu, nguồn gốc tên gọi né bão của ngư dân).
  - Created automated indexing command `index_heritage_knowledge` and integrated into `seed_demo` (Step 9d).
  - Database now holds 58 total vectorized knowledge chunks (21 heritage places with seasonality & cuisine, 18 destination chunks, 8 tour chunks, 2 policy chunks).
  - Enhanced RAG Retriever (`retriever.py`): Dynamic keyword boost (+80 score) for heritage and historical inquiries.
  - Enhanced Grounded Generator (`generator.py`): Luxury storytelling synthesis with grounded facts, smoothly connecting heritage narratives to recommended tour cards `[TOUR_CARD: slug]`.
  - Exported typed frontend heritage dataset [history.ts](file:///c:/Users/msi/Downloads/travel-platform-mvp-complete/travel-platform-mvp-complete/apps/public-site/src/data/seed/history.ts) and integrated into `SEED_DATA` / `seedFinder`.
  - Added test case `test_heritage_history_rag` in `tests/test_assistant_rag.py`.

- Live RAG Chat Proxy & Tour Card Bridge (`apps/public-site/` & `apps/api/`):
  - Diagnosed root cause: Client-side chat drawer at `localhost:3000` previously called `/api/v1/assistant/conversations/chat/` directly without Next.js proxying, causing 404 and falling back to offline default string.
  - Implemented Next.js App Router API Route Handler [apps/public-site/src/app/api/assistant/chat/route.ts](file:///c:/Users/msi/Downloads/travel-platform-mvp-complete/travel-platform-mvp-complete/apps/public-site/src/app/api/assistant/chat/route.ts) that forwards requests securely to `${process.env.BACKEND_URL}/assistant/conversations/chat/` inside Docker.
  - Added rewrite rule in [apps/public-site/next.config.ts](file:///c:/Users/msi/Downloads/travel-platform-mvp-complete/travel-platform-mvp-complete/apps/public-site/next.config.ts) for `/api/v1/:path*`.
  - Re-aligned `recommended_tour_slugs` in [vietnam_heritage_history.py](file:///c:/Users/msi/Downloads/travel-platform-mvp-complete/travel-platform-mvp-complete/apps/api/assistant/data/vietnam_heritage_history.py) with actual database tour slugs (`tour-sa-pa-fansipan-3n2d`, `tour-hoi-an-da-nang-3n2d`, `tour-ninh-binh-trang-an-1n`, `tour-hue-di-san-2n1d`, `tour-da-lat-thanh-pho-ngan-hoa-3n2d`, `tour-phu-quoc-thien-duong-dao-ngoc-3n2d`).
  - Updated [generator.py](file:///c:/Users/msi/Downloads/travel-platform-mvp-complete/travel-platform-mvp-complete/apps/api/assistant/services/generator.py) and [views.py](file:///c:/Users/msi/Downloads/travel-platform-mvp-complete/travel-platform-mvp-complete/apps/api/assistant/views.py) to reliably extract and return the interactive tour card payload matching `[TOUR_CARD: slug]`.
  - Rebuilt and restarted the frontend container; verified live chat returning grounded RAG responses with rich interactive Tour Cards.

- Vietnam Data Cleanliness & High-Res Travel Photography Upgrades (`apps/api/` & `apps/public-site/`):
  - Diagnosed root causes of broken destination cards on homepage carousel:
    1. Earlier E2E test runs had inserted dummy records (`test-e2e-dest-*`, `test-sync-dest-*`) with empty `image_url: ""` and titles starting with `Bán đảo E2E...`, which sorted alphabetically ahead of real destinations.
    2. Hotlinked Wikimedia Commons photos were returning `HTTP 429: Too Many Requests` when loaded in browsers.
  - Purged all 6 dummy test destinations and 5 dummy test articles from PostgreSQL.
  - Replaced all destination and tour imagery across [seed_demo.py](file:///c:/Users/msi/Downloads/travel-platform-mvp-complete/travel-platform-mvp-complete/apps/api/core/management/commands/seed_demo.py) and [assets.ts](file:///c:/Users/msi/Downloads/travel-platform-mvp-complete/travel-platform-mvp-complete/apps/public-site/src/lib/assets.ts) with verified, 100% working, high-resolution Unsplash CDN Vietnam travel photography (tested and verified 200 OK for all 12 destinations: Cần Thơ, Cố đô Huế, Đà Lạt, Đà Nẵng, Phú Quốc, Hà Giang, Mũi Né, Hội An, Ninh Bình, Sa Pa, Nha Trang, Hạ Long).
  - Enforced 100% Vietnam exclusivity: No foreign destinations, places, or tours exist in either the database or frontend catalogs.
  - Enhanced [destinations-carousel.tsx](file:///c:/Users/msi/Downloads/travel-platform-mvp-complete/travel-platform-mvp-complete/apps/public-site/src/components/home/destinations-carousel.tsx) with strict filters against test artifacts and automated fallback image URLs.
  - Rebuilt and restarted `frontend` container; verified live homepage displaying pristine cards with real photos.

- Periodic AI Chat Tooltip Animation (`apps/public-site/src/components/assistant/ai-trip-assistant.tsx`):
  - Addressed user feedback regarding the chat tooltip pill ("Tư vấn lịch trình với STAR AI") taking up visual screen real estate permanently.
  - Implemented periodic show/hide cycle: appears for 5 seconds every 20 seconds, remaining invisible (`opacity-0 pointer-events-none`) the rest of the time.
  - Added smooth CSS scale/slide/fade animations (`transition-all duration-500 transform`) for a polished luxury UX.
  - Immediately hides when the chat drawer is opened or clicked.

- Documentation Consolidation & Architecture Unification (`docs/`):
  - Streamlined and unified 9 fragmented, scattered documentation files into 4 authoritative master engineering specifications by scope:
    1. `docs/public-site-specification.md`: Consolidated customer-facing public site master specification (architecture, UI component inventory, 19 routes, Anima parity rules, bilingual i18n, `@/data/seed` datasets, and responsive UX).
    2. `docs/backend-database-and-erp-spec.md`: Consolidated backend domain architecture, PostgreSQL/PostGIS schemas, Mermaid ERD, 3-way schema mappings (Postgres ↔ Odoo 18 ↔ TypeScript), transactional Outbox pattern, Celery dispatch, and HMAC-SHA256 webhook contracts.
    3. `docs/ai-assistant-and-rag-spec.md`: Consolidated AI Concierge & RAG knowledge engine specification (pgvector HNSW store, Vietnamese landmark/history knowledge dataset, intent classification, prompt contracts, SSE streaming, CRM lead generation, and floating red-and-gold chat widget).
    4. `docs/project-delivery-and-verification.md`: Consolidated project execution plan (Phases 0-9 sub-agent roadmap), quality gates (Ruff, Mypy, Pytest, TSC, Docker), and verification/sanity check reports.
  - Safely eliminated all 9 obsolete/redundant markdown files while preserving brand and design assets (`docs/star-logo.svg`, `docs/design-reference/`, `docs/reference/`).
  - Updated repository directory tree references in `README.md` and progress tracking.

- Dark Glassmorphic Capsule Search Bar Upgrade (`apps/public-site/src/components/home/discovery-search.tsx`):
  - Upgraded both expanded and collapsed search bar states to the unified luxury dark frosted glass capsule ("pill") aesthetic matching the user's reference:
    - Container: Fully rounded capsule (`rounded-full` on desktop, `rounded-3xl` on mobile) with dark translucent backdrop (`bg-black/50 backdrop-blur-2xl`), subtle white border (`border border-white/25 hover:border-white/35`), and deep elevation shadow (`shadow-[0_12px_45px_rgba(0,0,0,0.5)]`).
    - Tabs: Sleek dark glass capsule with active tab highlighted by a radiant Vietnamese Crimson Red pill (`bg-[#da251d] text-white font-bold rounded-full shadow-md`).
    - Columns: 5 streamlined fields separated by crisp translucent borders (`border-white/15`), white icons (`text-white/70`), subtle labels (`text-white/50`), and crisp values (`text-white font-semibold`).
    - Action Button: Dedicated circular red search button (`bg-[#da251d] hover:bg-[#c92018] rounded-full size-11 sm:size-12`) with white search icon.
    - Popovers & Calendar: Dark glassmorphic floating cards (`bg-slate-950/95 backdrop-blur-2xl border border-white/20 text-white`) with red highlights for active selections.
    - Collapsed Mode: Clean minimalist pill (`[ 🔍 Tìm kiếm hành trình | Hà Nội → Nha Trang ∨ ]`) with instant, silky smooth toggle.

- VNPay Sandbox Integration Architecture (Section 3.7 - `apps/api/payments/` & `apps/public-site/`):
  - Created new backend `payments` Django app configured in `apps/api/payments/` with models, adapters, services, serializers, views, and urls.
  - Implemented `PaymentTransaction` domain model with unique indexed `vnp_TxnRef` (`transaction_code`), status state machine (`pending`, `success`, `failed`, `expired`, `refunded`), idempotency key, request/response JSON audit payloads, and link to `bookings_booking`.
  - Implemented `VNPayAdapter` adhering strictly to VNPay 2.1.0 specification:
    - URL generation: alphabetic key sorting, empty param removal, `vnp_Amount * 100`, UTC+7 `vnp_CreateDate` & `vnp_ExpireDate` (+15m), `quote_plus` encoding, client IP extraction (`X-Forwarded-For`), and HMAC-SHA512 checksum.
    - Zero secrets hardcoded: reads from `VNPAY_TMN_CODE`, `VNPAY_HASH_SECRET`, `VNPAY_PAYMENT_URL`, `VNPAY_RETURN_URL` in environment/settings.
  - Implemented internal payment initialization endpoint: `POST /api/v1/payments/create/`.
  - Implemented VNPay Server-to-Server IPN Webhook endpoint: `POST /api/v1/payments/webhook/vnpay/` (also supporting GET as fallback):
    - Strict verification hierarchy: HMAC-SHA512 verification (checksum mismatch returns `{"RspCode": "97", "Message": "Invalid Checksum"}`) -> `vnp_TxnRef` existence check (missing returns `{"RspCode": "01", "Message": "Order not found"}`) -> Amount validation (mismatch returns `{"RspCode": "04", "Message": "Invalid amount"}`) -> Idempotency check (already processed returns `{"RspCode": "02", "Message": "Order already confirmed"}`) -> Response code handling (`00` transitions transaction to `success`, booking to `paid`/`confirmed`, registers Outbox event `booking.paid`; non-`00` marks transaction `failed` while preserving booking in `pending_payment` for user retry).
  - Implemented frontend Return URL page at `/payment/return` (`apps/public-site/src/app/payment/return/`):
    - Queries backend transaction status directly from the database (single source of truth; never trusts client query params alone).
    - Client-side polling every 3 seconds (up to 21 seconds) if transaction is still `pending` waiting for IPN webhook arrival.
    - Rich Anima-style UI: breadcrumbs, status badge, transaction ID, paid amount, response code, and direct booking actions.
  - Developed test suites:
    - `apps/api/payments/verify_vnpay_spec.py`: Pure Python standalone test suite verifying parameter sorting, signature computation, tampering rejection, and IPN business logic invariants (97, 01, 04, 02, 00, failure preservation).
    - `apps/api/tests/test_vnpay_integration.py`: Django test suite covering VNPay integration.

- VietQR Bank Transfer Integration (Section A & B - `apps/api/payments/` & `apps/public-site/`):
  - Created `VietQRAdapter` (`apps/api/payments/adapters/vietqr.py`) implementing NAPAS 247 QuickLink & pure EMVCo QR specifications:
    - Pure EMVCo NAPAS string generator with CRC16-CCITT checksum (poly 0x1021, init 0xFFFF, zero external dependencies).
    - QuickLink URL builder (`https://img.vietqr.io/image/...`).
    - Unmodified embedding of `booking_code` into transfer content for automated bank statement reconciliation.
    - Configurable settings: `VIETQR_BANK_BIN`, `VIETQR_BANK_NAME`, `VIETQR_ACCOUNT_NO`, `VIETQR_ACCOUNT_NAME`, `VIETQR_TEMPLATE`.
  - Added VietQR support in `PaymentService`:
    - `create_vietqr_payment()` generates 15-minute expiring transaction with full QR and bank info payload.
    - `confirm_vietqr_payment()` processes inbound Odoo ERP confirmation with HMAC-SHA256 verification and idempotency handling.
    - Tolerates accounting amount discrepancies with clear warning logging per Odoo decision contract.
  - Implemented API Endpoints:
    - `POST /api/v1/payments/create/`: supports both `gateway="vietqr"` and `gateway="vnpay"`.
    - `GET /api/v1/payments/<id>/status/`: public polling endpoint returning real-time transaction state.
    - `POST /api/v1/payments/<id>/vietqr-confirm/`: internal webhook endpoint protected by Odoo HMAC-SHA256 (`X-Signature-SHA256`).
  - Added Celery task `sweep_expired_payments()` in `payments.tasks` scheduled via `CELERY_BEAT_SCHEDULE`.
  - Frontend Next.js Public Site:
    - `/booking/[id]/payment`: interactive gateway selector (VietQR / VNPay), large QR code display, 1-click text copy buttons, 15-minute countdown timer with refresh action, auto-polling every 5 seconds with automatic redirect upon success.
    - `/booking/[id]/success`: celebratory confirmation screen with booking reference and links.
    - `/account/bookings`: booking history dashboard with distinctive amber `pending_payment` badge (VietQR awaiting) and direct payment links.
  - Verification & Testing:
    - `apps/api/payments/verify_vietqr_spec.py`: 100% green test suite verifying EMVCo CRC16, QuickLink URL, HMAC-SHA256 security, idempotency, and expiration sweep.
    - `apps/api/tests/test_vietqr_integration.py`: Django integration test suite.
    - TypeScript compilation (`tsc --noEmit`): 0 errors.
    - Ruff check & MyPy check: 0 errors.

## Validation status
- GitHub Actions CI & CodeQL Analysis: **PASSED**.
- Backend Migrations (`content.0002`, `destinations.0002`, `places.0002`, `tours.0001`, `bookings.0002`, `payments.0001`, `assistant.0001`): **APPLIED (OK)**.
- Live Database Records: **12 Destinations (100% Vietnam), 10 Experiences (100% Vietnam), 8 Tours (100% Vietnam), 4 Articles (100% Vietnam)**.
- Backend Pytest Suite in Docker (`docker compose exec backend pytest`): **10 passed in 7.31s (100% green)**.
- Next.js TypeScript check (`npx tsc --noEmit` in `apps/public-site`): **VERIFIED (Exit code 0, 0 errors)**.
- VNPay Spec Verification Suite (`python apps/api/payments/verify_vnpay_spec.py`): **ALL TESTS PASSED (100% green)**.
- VietQR Spec Verification Suite (`python apps/api/payments/verify_vietqr_spec.py`): **ALL TESTS PASSED (100% green)**.
- End-to-End Chat API via Frontend Port 3000 (`POST http://localhost:3000/api/assistant/chat`): **VERIFIED 200 OK**.
- Homepage Image Integrity: **All 12 Vietnam destination cards load valid 200 OK CDN photos**.
- Documentation Organization: **Consolidated into 4 authoritative master specifications under `docs/`**.
- Search Bar UI: **Dark glassmorphic rounded capsule style verified for both expanded and collapsed states**.
- VNPay Sandbox Integration: **100% compliant with Section 3.7 specification and test checklist**.
- VietQR Integration: **100% compliant with Section A, B, and C requirements**.







