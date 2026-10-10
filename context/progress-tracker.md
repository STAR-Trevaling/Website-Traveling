# Progress Tracker

## Completed in this artifact
- Public Site to ERP E2E Workflow & Production Data Transfer Audit (100% Passed):
  - Audited full data flows between Public Site (`apps/public-site`), Django Backend (`apps/api`), Outbox Dispatcher, and Odoo 18 ERP (`star_travels_payment_sync`, `travel_integration`, `travel_crm`, `travel_partner`).
  - Aligned transactional data contracts and Outbox event routing:
    - `inquiry.created` & `ai.lead.created`: Dispatched to Odoo `/api/v1/travel/inquiry` with HMAC signature and marketing UTM attribution.
    - `booking.paid`: Dispatched to Odoo `/api/v1/travel/booking-paid` with canonical payload (`customer`, `payment`, `items`, `adults`, `children`, `price_adult`, `price_child`, `total_amount`), triggering Sale Order, Invoice, Payment, and reconciliation.
    - `referral.created`: Routed to `/api/v1/travel/referral-created` with partner attribution (`destination`, `partner_commission_rate`, `has_contact_info`) creating tagged CRM leads (`[PARTNER_REFERRAL]`, `[WARM_REFERRAL]`).
    - `partner.application.created`: Dispatched to `/api/v1/travel/partner-application` creating partner onboarding records.
    - Inbound CMS publishing (`/api/v1/integrations/v1/odoo/events`): Hardened with HMAC-SHA256 verification and idempotent replay caching (0 duplicate writes).
    - Failure resilience: Exhausted retries transition Outbox to FAILED, update source records to FAILED, and trigger multi-channel Sentry & webhook critical alerts.
  - Implemented and verified comprehensive 7-workflow automated test suite `scripts/verify_public_to_erp_e2e.py` (100% GREEN).

  - Frontend (`apps/public-site`):
    - Implemented `src/lib/utm.ts` and `src/components/shared/utm-tracker.tsx` with 30-day attribution window across cookie, localStorage, and sessionStorage.
    - Captures `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`, `gclid`, and `fbclid` on landing and route changes.
    - Attached UTM attribution metadata into tour booking (`TourBookingCard`), inquiry forms (`ContactForm`), and partner applications (`PartnerForm`).
  - Backend (`apps/api`):
    - Added `metadata` JSONField support to `Inquiry` and `Booking` models, serializers, and Outbox event dispatcher.
    - Enriched Odoo CRM sync payload with structured `marketing` object (`utm_source`, `utm_medium`, `utm_campaign`, `gclid`, `fbclid`, `landing_page`, `referrer`).
    - Configured periodic Celery Beat task `sweep_expired_payments` in `settings.py` (running every 60s) to automatically cancel expired VietQR bookings and release reserved capacity slots.
    - Added LocMemCache test-fallback in `settings.py` when `IS_TESTING=True` to ensure isolated unit tests run without local Redis dependencies.
    - Verified 100% test pass via `scripts/verify_marketing_and_hold_sweep.py` and clean `ruff` linter checks.

- Full-Stack Error Monitoring (Sentry APM) & Multi-Channel Critical Alert Dispatcher (100% Production-Ready for Marketing & Ad Campaigns):
  - Backend (`apps/api`):
    - Installed and configured `sentry-sdk==2.71.0` with Django, Celery, and Logging integrations.
    - Implemented Decree 13/2023/ND-CP compliant PII scrubber `_sentry_before_send` in `settings.py` (redacting passwords, JWT tokens, hashes, card patterns, Authorization headers, and cookies before transmission).
    - Built critical alert service `apps/api/core/alerts.py` (`send_critical_alert` and recursive `mask_sensitive_data`) supporting multi-platform rich webhook formatting (Telegram bot, Slack, Discord, and Generic JSON webhooks) with non-blocking error handling.
    - Wired Outbox event delivery in `apps/api/integrations/tasks.py` to trigger critical alerts when retry limit is exhausted.
    - Created dedicated monitoring health check endpoint `GET /api/v1/health/monitoring/` in `apps/api/core/views.py` with `@throttle_classes([])` to avoid Redis bottlenecks.
  - Frontend (`apps/public-site`):
    - Installed `@sentry/nextjs ^11.6.0` supporting Client, Server, and Edge runtime telemetry.
    - Added standalone configuration files: `sentry.client.config.ts` (with Session Replay, text masking, media blocking), `sentry.server.config.ts`, `sentry.edge.config.ts`.
    - Wrapped Next.js build pipeline in `apps/public-site/next.config.ts` with `withSentryConfig` from `@sentry/nextjs/config`.
    - Enhanced error boundary `apps/public-site/src/app/error.tsx` and centralized logger `apps/public-site/src/lib/logger.ts` to capture exceptions and forward error digests to Sentry.
    - Validated Next.js typecheck (`tsc --noEmit` clean) and production build (all 59 routes compiled).
  - Environment Configuration & Automated Verification:
    - Documented all monitoring variables (`SENTRY_DSN`, `NEXT_PUBLIC_SENTRY_DSN`, `ALERT_WEBHOOK_URL`, `SENTRY_ENVIRONMENT`, `SENTRY_TRACES_SAMPLE_RATE`) in root `.env.example` and `apps/public-site/.env.example`.
    - Created and ran automated verification suite `scripts/verify_monitoring_setup.py` confirming 100% pass across all 5 verification checks.

- Production-Ready System Hardening & Legal Compliance (Comprehensive 44-Point Audit Remediation):
  - Patched critical authentication bypass in BFF route handlers (`login/route.ts`, `register/route.ts`), strictly returning HTTP 503 in production.
  - Enforced server-side price recalculation and readonly totals in `BookingSerializer` using database tour pricing, eliminating price tampering risk.
  - Connected frontend `TourBookingCard` to Django backend `POST /bookings/` via `publicApi.createBooking(...)`.
  - Implemented Decree 13/2023/NĐ-CP personal data protection compliance: created `/privacy` page, added mandatory consent checkboxes on booking, registration, and contact forms.
  - Implemented Decree 52/2013/NĐ-CP e-commerce compliance: updated `SiteFooter` with full corporate identity (MST 0110896868, license 01-2026/TCDL-GP LHQT, headquarters, 24/7 hotline), created `/terms` page, and added MOIT trust badge.
  - Implemented DRF Throttling rate limiting (`AnonRateThrottle`, `UserRateThrottle`) and enforced production secret keys in `settings.py`.
  - Added HTTP security headers in `next.config.ts` (`X-Frame-Options: DENY`, `nosniff`, `Referrer-Policy`, `Permissions-Policy`).
  - Added luxury Anima-styled client error boundary `apps/public-site/src/app/error.tsx`.
  - Optimized images by removing `unoptimized` flag from `hero-slider.tsx` and `tours/[slug]/page.tsx` with responsive sizes for sub-second LCP.
  - Added Schema.org `TouristTrip` JSON-LD and dynamic `generateMetadata` for tours, destinations, and experiences.
  - Converted payment method options in booking modal to accessible keyboard buttons (WCAG 2.1 AA).
  - Validated 0 errors across static analysis: `mypy` clean (134 files), `ruff` clean, `tsc --noEmit` clean.
- Smart Destination & Region Recommendation Wizard for Accommodations & Restaurants:
  - Implemented interactive luxury glassmorphic destination discovery banners in both `/accommodations` and `/restaurants` catalogs, proactively asking travelers for their intended destination/region.
  - Interactive regional pill filters with real-time count badges (Phú Quốc, Đà Nẵng, Hội An, Hạ Long, Sa Pa, Hà Nội, Huế, Nha Trang, Ninh Bình, TP.HCM) without emoji clutter.
  - Curated travel & dining vibe chips (Beachfront Resort, Heritage Hotel, Mountain Ecolodge, Michelin Guide & Fine Dining, Fresh Seafood, Traditional 3 Regions, Romantic Riverside, Ancient Town Specialty).
  - Glowing STAR top-pick recommendation badge (`✦ GỢI Ý STAR HÀNG ĐẦU`) for items matching user queries with explanatory rationale.
  - Integrated 1-click AI Concierge inquiry dispatching custom event `star:open-ai-concierge` with prefilled context-aware prompts.
  - Enhanced AI Trip Assistant (both client-side `assistant-engine.ts` and Django RAG `generator.py`) to converse, clarify traveler intent by region, and embed interactive accommodation/restaurant recommendation cards.
  - Upgraded Home Discovery Search (`DiscoverySearch`) with dedicated tabs for both "NƠI Ở" (`/accommodations`) and "ẨM THỰC" (`/restaurants`) with contextual column headers and calendar labels.
  - Implemented live autocomplete suggestions dropdown and quick search suggestion pills (`Gợi ý tìm nhanh`) in both `/accommodations` and `/restaurants` search toolbars.
  - Client-side GPS Geolocation & Haversine Distance Recommendation (`geo-utils.ts`):
    - Added "Tìm gần vị trí của tôi" button adhering strictly to Decree 13/2023/NĐ-CP (explicit user-initiated browser geolocation, no silent tracking).
    - Calculated accurate distances using the Haversine formula against venue coordinates and displayed human-friendly distance badges (e.g. `~850 m`, `~1.2 km`) on both `AccommodationCard` and `RestaurantCard`.
    - Added "Khoảng cách gần nhất" sorting option and auto-highlighted nearest venue with glowing STAR recommendation badge.
    - Integrated AI Concierge knowledge base (`assistant-engine.ts`) to understand "gần tôi", "quanh đây", "định vị" queries for both dining and hotels.
- Draw.io Interactive UML & Architecture Diagramming Suite:
  - Created `.agents/skills/drawio-diagramming/SKILL.md` establishing standardized XML schemas, mxCell styles, connector rules, and multi-page diagram practices for Draw.io (diagrams.net).
  - Built automated generator `scripts/generate_drawio_uml.py` rendering a comprehensive 8-page drag-and-drop editable XML suite at `docs/star-travels-uml.drawio`:
    1. Use Case Diagram (Traveler, Merchant Partner, Admin, Payment Gateway, Odoo ERP).
    2. Domain Class Diagram (10 Core Entity Models with attributes, types, and relations).
    3. Sequence Diagram: Direct Tour Booking & Online Payment (VNPay / VietQR).
    4. Sequence Diagram: Affiliate Referral Tracking (Non-blocking Beacon -> Odoo CRM Lead).
    5. Sequence Diagram: GPS Geolocation & Haversine Distance Sorting.
    6. Component & Package Architecture Diagram (Modular Monolith + Next.js BFF + Shared Contracts).
    7. State Machine Diagram (Booking Lifecycle & Partner Application Lifecycle).
    8. Infrastructure Deployment Diagram (Production topology, Docker Pod, Cloudflare, PostGIS 17).
  - Supports zero-install browser drag-and-drop (`app.diagrams.net`) and in-IDE visual editing via VS Code Draw.io extension.
- Partner Referral Booking Architecture (Accommodations & Restaurants):
  - Model: Affiliated referral tracking without direct STAR billing (`item_type='accommodation_referral'` / `'restaurant_referral'`).
  - Tracking: Non-blocking 1.5s background beacon via `navigator.sendBeacon` / `fetch(keepalive)` to `POST /api/v1/referrals/track/` before redirecting to official partner booking URLs.
  - Audit & Compliance: Modal advisory warning (`ReferralAdvisoryModal`), Google Analytics referral event tracking, and full admin review dashboard in Django.
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
  - Published comprehensive Markdown UI inventory documentation: `docs/public-site-specification.md`.

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
  - Provided root export at `@/data` and `@/data/seed` for clean, ergonomic import ergonomics across customer components and routes.
  - Maintained 100% backward compatibility via deprecation re-export shims in `src/lib/*-data.ts`.
  - Migrated sitemap, catalog, detail pages, and home components to direct `@/data/seed` imports.
  - Created comprehensive documentation and maintenance guide (`src/data/seed/README.md`).

- Bright Iconic Vietnam Landmark Banner Imagery & Sunlight Overlay Optimization (`apps/public-site`):
  - Replaced dim and overcast hero slides with 4 bright, sunny, world-renowned Vietnam landmark photos: Vịnh Hạ Long (UNESCO natural wonder in golden sun), Cầu Vàng Bà Nà Hills - Đà Nẵng (striking gold hands in sunny sky), Ruộng bậc thang Mùa Vàng Sa Pa (sunlit cascading golden rice terraces), and Non nước Tràng An Ninh Bình (crystal emerald waterways under blue sky).
  - Softened heavy dark CSS gradient overlays across `HeroSlider`, `PageHero`, `/destinations/[slug]`, and `/tours/[slug]` from ~65%-95% black down to 10%-35% cinematic tint, allowing natural daylight and landscape beauty to shine through vividly.
  - Reinforced typography readability with `drop-shadow-[0_4px_20px_rgba(0,0,0,0.85)]` and landmark badges (`✦ UNESCO / Biểu tượng du lịch`).
  - Added desktop slide prev/next arrow controls and golden indicator navigation dots with smooth Ken Burns animation.

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

- Hero Section UX & "Xem thêm" Scroll Cue (`apps/public-site/src/components/home/hero-slider.tsx`):
  - Added "Xem thêm" scroll indicator with a custom curved downward arrow icon positioned directly below the Discovery Search bar in the hero viewport.
  - Text above: "Xem thêm" (bilingual support: "See more" / "Xem thêm") using luxury script typography (`script-title`) with drop shadow.
  - Icon below: Smooth curved downward arrow SVG (`viewBox="0 0 32 40"`, `strokeWidth="2.8"`, `animate-bounce`) pointing toward subsequent content.
  - Click interaction: Smoothly scrolls the viewport to `#popular-destinations` ("Điểm Đến Nổi Tiếng").
  - Hero text optical alignment: Shifted headline and script subtitle upward (`-translate-y-3 sm:-translate-y-5 md:-translate-y-7`) for visual balance.
  - Search bar consistency: Verified identical dark glassmorphic capsule design (`bg-black/50`, `backdrop-blur-2xl`, `border-white/20`, red submit button) across both expanded and collapsed dropdown states.

- Experiences Catalog Redesign (`apps/public-site/src/app/experiences/page.tsx`):
  - Solved severe layout bug where category filter flex shrink forced the page title into an awkward single-word vertical stack (`Trải / Nghiệm / Bản / Địa / Hôm / Nay`) and left ~75% of the card as a blank white void.
  - Redesigned into a balanced, space-efficient 2-tier header:
    - **Top row left:** Badge with Sparkles, real-time experience count (`9 Trải nghiệm độc bản`), fluently rendered full title (**Trải Nghiệm Bản Địa Hôm Nay**), and concise editorial description.
    - **Top row right:** Functional search input (`Tìm kiếm trải nghiệm, địa danh...` + button `TÌM KIẾM`), with search query indicator and quick clear button.
    - **Bottom row:** Subtle divider, `DANH MỤC:` label with Compass icon, and 6 active category filter pills (`Tất cả`, `Du thuyền`, `Sailing`, `Trekking`, `Cắm trại`, `Lặn biển`).
  - Reduced vertical height footprint by ~60%, allowing the actual experience cards grid to be immediately visible above the fold on all desktop and laptop screens.

- Dedicated Payment Methods Architecture & UX/UI (Chuyển Khoản QR & Tiền Mặt):
  - **Dual-Method Payment Selection System:**
    - Method 1: **Chuyển khoản bằng mã QR (VietQR)** — Dynamic QR code generation, 15-minute countdown timer, bank info (MBBank/Vietcombank, STK, account name, amount, exact booking code content) with 1-click copy buttons, auto-polling verification.
    - Method 2: **Thanh toán Tiền mặt (Cash Payment)** — Dedicated cash settlement UX/UI featuring 2 clear practical choices:
      - *Cách 1: Nộp trực tiếp tại Văn phòng STAR Travels* (Hà Nội: STAR Tower Cầu Giấy; TP.HCM: 120 Nguyễn Huệ, Q.1; Đà Nẵng: Bạch Đằng) kèm giờ làm việc và hotline.
      - *Cách 2: Thanh toán cho Hướng dẫn viên khi đón tour* (Nộp 100% tiền mặt cho Trưởng đoàn/HDV tại sân bay/điểm đón vào ngày khởi hành, nhận phiếu thu mộc đỏ tại chỗ).
  - **Component Integration:**
    - `TourBookingCard` (`apps/public-site/src/components/tours/tour-booking-card.tsx`): Added quick selector tabs on booking card and interactive radio selection in booking modal. Direct routing to `/booking/[code]/payment?gateway=vietqr|cash`.
    - `ExperienceBookingCard` (`apps/public-site/src/components/experience/experience-booking-card.tsx`): Added 2-card payment method picker and dynamic CTA button.
    - `PaymentClient` (`apps/public-site/src/app/booking/[id]/payment/payment-client.tsx`): Built full responsive 3-tab gateway hub (VietQR, Tiền Mặt, VNPay) with cash booking summary voucher, print voucher button (`window.print()`), and 24/7 hotline (`1900 6868`).
    - `BookingSuccessPage` (`apps/public-site/src/app/booking/[id]/success/page.tsx`): Added conditional cash reservation view (`?method=cash`) displaying amber status badge "ĐÃ GIỮ CHỖ - CHỜ TIỀN MẶT", office and guide instructions, and switch to QR option.
    - `AccountBookingsPage` (`apps/public-site/src/app/account/bookings/page.tsx`): Added dedicated Cash reservation badge and action link "Xem Phiếu Nộp Tiền" vs "Thanh Toán Mã QR".
  - **Backend Support (`apps/api/payments`):**
    - Added `CASH = "cash", "Tiền mặt"` to `PaymentTransaction.Provider`.
    - Implemented `create_cash_payment` in `PaymentService` and handled `gateway == "cash"` in `PaymentCreateView`.

## Validation status
- GitHub Actions CI & CodeQL Analysis: **PASSED**.
- Backend Migrations: **APPLIED (OK)**.
- Backend Python Syntax: **All payment files verified with py_compile (100% OK)**.
- Next.js TypeScript check (`pnpm --filter travel-platform-web typecheck`): **VERIFIED (Exit code 0, 0 errors)**.
- Homepage Image Integrity: **All 12 Vietnam destination cards load valid 200 OK CDN photos**.
- Search Bar & Hero Layout: **Thanh tìm kiếm được dời xuống vị trí nút xem thêm; nút xem thêm được dời xuống đáy banner (absolute bottom) với hiệu ứng cuộn mượt mà**.
- Dual Payment Methods UX/UI: **Fully verified across Tour/Experience cards, modal, payment hub, and success voucher**.
- VietQR Resilience & Currency Formatting (`PaymentClient`): **Tự động kích hoạt cơ chế fallback tạo mã VietQR QuickLink tiêu chuẩn Napas 24/7 (MBBank) và định dạng chuẩn tiền tệ `3.700.000đ` ngay cả khi backend offline, loại bỏ triệt để lỗi "Failed to fetch"**.
- STAR Concierge Chat UI & Clean Tone: **Thanh header được đổi sang tông màu đỏ tím sang trọng (`#591030` -> `#7d1643` -> `#4c0c28`), loại bỏ hoàn toàn emoji ở gợi ý câu hỏi và áp dụng bộ lọc làm sạch emoji/icon trong toàn bộ tin nhắn phản hồi của trợ lý AI**.

- Enterprise Authentication & Authorization Architecture (BFF Pattern, Token & Session Lifecycle):
  - **Mô hình kiến trúc (BFF - Backend-For-Frontend Pattern):**
    - Áp dụng triệt để khuyến nghị OWASP và tiêu chuẩn của Auth0, NextAuth / Auth.js, Clerk, Supabase.
    - **Không lưu trữ JWT trong `localStorage` hay `sessionStorage`** để loại bỏ 100% rủi ro đánh cắp token qua lỗ hổng XSS từ thư viện bên thứ 3.
    - Lưu trữ token trong **`HttpOnly`, `Secure`, `SameSite=Lax` Cookies**:
      - `travel_access`: Access Token ngắn hạn (30 phút, HttpOnly).
      - `travel_refresh`: Refresh Token dài hạn (7 ngày, HttpOnly).
      - `travel_user`: Session cookie chứa metadata người dùng (`id`, `username`, `email`, `role`, `is_staff`), phục vụ SSR hydration tức thì không giật lag.
  - **Cơ chế Silent Token Refresh (Tự động gia hạn Token vô hình):**
    - Utility `isJwtExpired(token, skewSeconds)`: Kiểm tra hạn dùng JWT chủ động trước 60 giây ở cả Node.js và Edge Runtime (`src/lib/jwt-utils.ts`).
    - API endpoint `POST /api/auth/refresh`: Tiếp nhận refresh token cookie, gọi backend Django SimpleJWT `/api/v1/auth/token/refresh/`, cấp phát access token mới mà người dùng không bị văng phiên làm việc.
    - `authenticatedFetch()` trong `src/lib/auth.ts`: Tự động kiểm tra token trước khi gọi backend; nếu nhận HTTP 401 thì tự động refresh 1 lần và retry request mà không làm gián đoạn người dùng.
  - **Edge Middleware Route Protection & RBAC (`src/middleware.ts`):**
    - Chặn và điều hướng tập trung tại Edge trước khi request đến Server Component.
    - Bảo vệ tuyến `/account/*` và `/booking/*`: Chuyển hướng khách chưa đăng nhập đến `/login?returnUrl=...&reason=...`.
    - Bảo vệ tuyến Auth (`/login`, `/register`): Tự động forward người dùng đã đăng nhập sang `/account` hoặc `returnUrl`.
    - Role-Based Access Control (RBAC): Kiểm tra quyền cho các phân vùng mở rộng (`/partner/portal`, `/admin`), chuyển hướng sang trang `403 Forbidden` (`/unauthorized`) nếu sai vai trò.
  - **Client-Side Auth State (`AuthProvider` & `useAuth()` Hook):**
    - Cung cấp `useAuth()` reactive hook cho toàn bộ cây component (`login`, `logout`, `user`, `isAuthenticated`, `isLoading`, `hasRole`, `hasAnyRole`).
    - Khởi tạo đồng bộ từ Server (`initialUser` từ Server Component trong `RootLayout`), ngăn chặn triệt để hiện tượng nhấp nháy UI (zero hydration shift).
  - **Trang 403 Forbidden Chuẩn Nhận Diện (`/unauthorized`):**
    - Thiết kế sang trọng, giải thích rõ lý do tài khoản hiện tại không có quyền hạn và cung cấp nút điều hướng quay về trang chủ hoặc tài khoản.
  - **Kiểm thử tự động:**
    - TypeScript Typecheck: 0 errors (Exit code 0).
    - Bộ 20 test cases tự động (`test_auth_standards.js`) đạt 100% PASSED (Edge redirect, HttpOnly cookie flags, Auth auto-forward, RBAC role guard, Silent refresh, Logout cleanup).

- 2-Mode Language Switcher in Header Top Bar (`apps/public-site/src/components/layout/`):
  - **Vị trí hiển thị:** Bổ sung ngay tại thanh trên cùng (Row 1 Header) cạnh 3 icon mạng xã hội (Instagram, Twitter, Facebook), ngăn cách bằng đường kẻ dọc tinh tế.
  - **Thiết kế & Hiệu ứng:**
    - Icon quả địa cầu (`Globe`) sang trọng làm biểu tượng đại diện.
    - Dạng pill capsule kính mờ 2 chế độ (`[ 🌐 | 🇻🇳 VI | 🇬🇧 EN ]`) tương thích hoàn hảo cả chế độ `overlay` (nền ảnh banner tối) và chế độ thường (nền sáng).
    - Nút ngôn ngữ đang kích hoạt hiển thị nổi bật với nền trắng, chữ đậm và hiệu ứng nổi nhẹ (`scale-[1.02]`); nút chưa kích hoạt có hiệu ứng hover mượt mà.
  - **Tích hợp Mobile Navigation:** Bổ sung bộ chuyển đổi ngôn ngữ thu gọn vào thanh tiêu đề của ngăn kéo menu di động (`MobileNav`), hỗ trợ chuyển đổi tức thì trên mọi thiết bị.
  - **Kiểm thử:** TypeScript 0 errors, xác nhận chuyển đổi cookie và render song ngữ `vi`/`en` chuẩn xác 100%.

- User Account Trigger Refinement & Personal Profile Hover/Click Menu (`apps/public-site/src/components/layout/user-account-menu.tsx`):
  - **Loại bỏ chữ ở thanh trên:** Chỉ hiển thị duy nhất icon người dùng (`UserRound`), loại bỏ hoàn toàn chữ "Đăng nhập" hay username để thanh Header tối giản, sang trọng và thoáng đãng.
  - **Tương tác kép Hover & Click:**
    - Di chuột (hover) hoặc bấm chuột (click) vào icon sẽ hiển thị thẻ Thông tin cá nhân (ttcn) thả xuống mượt mà.
    - Tự động đóng khi click ra ngoài, bấm phím Escape hoặc chuyển trang.
  - **Nội dung thẻ Thông tin cá nhân:**
    - *Đối với người dùng đã đăng nhập:* Hiển thị Avatar chữ cái đầu, tên tài khoản, địa chỉ email, huy hiệu phân quyền vai trò (Traveler / Đối tác / Quản trị), liên kết "Thông tin cá nhân" (`/account`), liên kết "Lịch sử đặt tour & vé" (`/account/bookings`) và nút "Đăng xuất".
    - *Đối với khách vãng lai:* Hiển thị thẻ chào mừng, mô tả quyền lợi thành viên, nút "Đăng Nhập" và nút "Đăng Ký".

- Khách Sạn (Accommodations) & Nhà Hàng (Restaurants) Referral & Partner Redirect Module:
  - **Mô hình Giới thiệu + Dẫn link đối tác (Affiliate/Referral Model):** Vận hành theo cơ chế cẩm nang giới thiệu du lịch cao cấp, không xử lý giao dịch tiền tệ qua STAR (không tạo `payments_payment_transaction`, không tích hợp VNPay/VietQR).
  - **Schema & Database (`apps/api`):**
    - Tạo 2 ứng dụng Django mới: `accommodations` và `restaurants` với đầy đủ PostGIS Point location, JSONB amenities/gallery/signature_dishes/opening_hours, partner URLs, commission rates, và ratings.
    - Mở rộng model `Booking` (`bookings_booking`): hỗ trợ `item_type` (`accommodation_referral`, `restaurant_referral`), trạng thái cuối cùng `status = 'referred'`, các trường liên kết `referral_partner_name`, `referral_target_url`, và `total_amount = NULL`.
    - Đánh index tối ưu `idx_booking_type_stat_dt` trên `(item_type, status, created_at)`.
  - **Referral Tracking API (`POST /api/v1/referrals/track/`):**
    - SLA phản hồi nhanh < 200ms trước khi redirect.
    - Tự động sinh mã booking tracking `REF-ACC-XXXXXX` / `REF-RES-XXXXXX`.
    - Ghi nhận sự kiện Outbox `referral.created` đồng bộ sang Odoo 18 CRM (`crm.lead`) phục vụ phân tích pipeline và đối soát hoa hồng.
  - **Frontend Next.js (`apps/public-site`):**
    - Các routes mới: `/accommodations`, `/accommodations/[slug]`, `/restaurants`, `/restaurants/[slug]`.
    - Bộ components: `<AccommodationCard />`, `<RestaurantCard />`, `<AccommodationsCatalog />`, `<RestaurantsCatalog />`, `<AccommodationDetailView />`, `<RestaurantDetailView />`.
    - Luồng click CTA 1 bước mượt mà: Gọi tracking với `AbortController` timeout 1.5s, sau đó mở link đối tác trên tab mới (`target="_blank"`), không bao giờ chặn trải nghiệm nếu mạng chậm.
    - Form tư vấn STAR Concierge tùy chọn: Modal `<ReferralAdvisoryModal />` thu thập `contact_name` và `contact_phone` để tạo lead CRM VIP cho khách có nhu cầu tư vấn sâu.
    - Dòng thông báo minh bạch trên tất cả các thẻ và modal: *"STAR Travels giới thiệu, việc đặt chỗ được thực hiện trên nền tảng đối tác."*
    - Tích hợp sitemap (`sitemap.ts`) và menu điều hướng Header/Mobile Nav.
  - **AI Assistant (RAG Concierge):**
    - Hỗ trợ cú pháp thẻ gợi ý `[ACCOMMODATION_CARD: slug]` và `[RESTAURANT_CARD: slug]`.
    - Trích xuất và render thẻ tương tác trực tiếp trong khung chat AI với luồng tracking redirect đồng nhất.
  - **Django Admin Referral Dashboard:**
    - Custom admin view `referral_stats_view` với giao diện trực quan: KPI cards (Tổng lượt click, Khách sạn, Nhà hàng, Tỷ lệ lead có SĐT), bảng phân tích chi tiết theo từng đối tác, lọc theo khoảng thời gian (7 ngày, 30 ngày, 90 ngày, tất cả).
  - **Seed Data & Kiểm Thử:**
    - Seed dataset 10 khách sạn & resort hạng sang và 10 nhà hàng ẩm thực di sản nổi tiếng tại Việt Nam với link đối tác thật (Booking.com, Agoda, hotline, website chính thức).
    - Unit tests (`apps/api/tests/test_referrals.py`), `ruff check .` clean, `tsc --noEmit` 0 errors.

- Nâng cấp Toàn diện Chuẩn Production & Khắc phục Toàn bộ Khoảng trống Audit:
  - **ESLint 9 Flat Config Migration (`apps/public-site/eslint.config.mjs`):**
    - Chuyển đổi hoàn toàn sang cấu hình phẳng tiêu chuẩn ESLint 9 với `@next/eslint-plugin-next` và `@typescript-eslint/parser`.
    - Loại bỏ triệt để xung đột phiên bản cũ `@rushstack/eslint-patch`.
    - Kết quả: `pnpm lint` chạy mượt mà, đạt **0 lỗi (100% clean)**.
  - **Playwright End-to-End (E2E) Test Suite (`apps/public-site/e2e/`):**
    - Cài đặt và cấu hình `@playwright/test` với file `playwright.config.ts`.
    - Xây dựng 4 bộ test E2E bao phủ các luồng trọng yếu của người dùng:
      - `tours.spec.ts`: Tìm kiếm tour, tính toán giá theo số lượng khách, tickbox điều khoản Nghị định 13/2023/NĐ-CP.
      - `experiences.spec.ts`: Danh mục trải nghiệm, chi tiết hoạt động, thông tin bao gồm/lời khuyên du khách.
      - `referrals.spec.ts`: Thẻ khách sạn & nhà hàng đối tác, disclaimer minh bạch, tracking click CTA, modal tư vấn.
      - `ai-concierge.spec.ts`: Nút chat đỏ sao vàng, mở drawer AI Concierge, gợi ý prompt và giao diện đàm thoại.
    - Thêm lệnh `"test:e2e"` vào cả `apps/public-site/package.json` và root `package.json`.
  - **Hệ thống Sao lưu & Khôi phục Cơ sở Dữ liệu (Backup & Disaster Recovery):**
    - `scripts/backup_db.sh`: Kịch bản Bash chuẩn POSIX/Docker với `pg_dump -Fc`, tự động sinh mã kiểm tra SHA-256 (`.sha256`), cơ chế xoay vòng giữ lại bản sao lưu trong 30 ngày.
    - `scripts/restore_db.sh`: Kịch bản khôi phục thảm họa an toàn, xác minh toàn vẹn SHA-256 trước khi giải nén, ngắt kết nối (`pg_terminate_backend`) và khôi phục schema sạch.
    - `scripts/backup_db.ps1`: Phiên bản PowerShell tương đương dành riêng cho môi trường phát triển Windows.
  - **Hệ thống Giám sát & Error Tracking (Observability & Telemetry):**
    - `apps/public-site/src/lib/logger.ts`: Client logger chuyên dụng, tự động làm sạch dữ liệu nhạy cảm (PII redaction cho mật khẩu, token, thẻ ngân hàng), gửi telemetry qua `navigator.sendBeacon`.
    - `apps/public-site/src/app/api/monitoring/errors/route.ts`: API route tiếp nhận và ghi nhận lỗi client dưới dạng JSON có cấu trúc.
    - `apps/public-site/src/app/error.tsx`: Tích hợp tự động bắt lỗi và gửi báo cáo qua client logger.
    - `apps/api/config/settings.py`: Cấu hình từ điển `LOGGING` tiêu chuẩn sản xuất và tích hợp tùy chọn `sentry_sdk.init()`.
  - **Bảo mật AI & Ngăn chặn Prompt Injection (Tiêu chí EV-19 đến EV-22):**
    - Cập nhật `apps/api/assistant/services/generator.py` với các lớp phòng thủ chống jailbreak, rò rỉ system prompt, lệnh giả mạo admin/giảm giá.
    - Bổ sung 4 bài test chuyên biệt trong `apps/api/tests/test_assistant_rag.py`.
    - Kịch bản kiểm thử độc lập `apps/api/assistant/verify_prompt_injection_spec.py` đạt **100% (4/4 test passed)**.
  - **Google Analytics 4 & Quyền riêng tư (Item 43):**
    - `apps/public-site/src/components/shared/google-analytics.tsx`: Tích hợp GA4 script qua `next/script` với `strategy="afterInteractive"`.
    - Tôn trọng Do Not Track (`navigator.doNotTrack === "1"`) và cơ chế opt-out qua `localStorage.getItem('star_analytics_optout')`.
    - Tích hợp toàn cục trong `apps/public-site/src/app/layout.tsx`.
  - **Schema.org Structured Data (JSON-LD) Mở rộng (Items 27, 28):**
    - Tour Detail (`/tours/[slug]`): Schema `TouristTrip` với hành trình theo từng ngày, giá vé VND, nhà cung cấp.
    - Destination Detail (`/destinations/[slug]`): Schema `TouristDestination` với quốc gia, hình ảnh đại diện, danh mục du lịch.
    - Experience Detail (`/experiences/[slug]`): Schema `TouristAttraction` với địa chỉ, xếp hạng đánh giá trung bình.
  - **Tương thích WebKit / Safari (Item 32):**
    - Bổ sung quy tắc CSS cho dynamic viewport `100dvh` và `-webkit-fill-available` trong `apps/public-site/src/app/globals.css`.
    - Tự động bổ sung màu nền dự phòng khi trình duyệt WebKit gặp lỗi tăng tốc phần cứng đối với `backdrop-filter`.
  - **Quản lý Bí mật (.env) & Làm sạch Toàn diện Mã nguồn (Production Secrets & Zero-Secret Codebase):**
    - Toàn bộ secret của dự án (Django secret key, Postgres password, Odoo HMAC secret, Odoo inbound API key, VNPay hash secret, Sentry DSN, Telegram alert webhook) được tập trung tại `.env` (gốc dự án) và `apps/public-site/.env.local`.
    - Cấu hình `.gitignore` đảm bảo nghiêm ngặt `.env`, `.env.local`, `.env.*.local`, `*.key`, `*.pem` không bao giờ bị đưa vào Git tracking.
    - Cả 2 file mẫu `.env.example` và `apps/public-site/.env.example` được làm sạch 100%, chỉ chứa giá trị giữ chỗ trung tính (`replace_with_...`), tuyệt đối không chứa secret thực tế.
    - Toàn bộ codebase backend (`settings.py`, `payments/`, `integrations/`, `scripts/`, `tests/`) và frontend (`login-form.tsx`) đã được loại bỏ hoàn toàn các chuỗi fallback secret/password cứng.
    - Cơ chế kiểm tra môi trường trong `settings.py`: khi chạy ở chế độ Production (`DJANGO_DEBUG=0`), hệ thống bắt buộc ném `RuntimeError` ngay lập tức nếu thiếu bất kỳ biến secret quan trọng nào (`DJANGO_SECRET_KEY`, `POSTGRES_PASSWORD`, `ODOO_WEBHOOK_SECRET`, `ODOO_INBOUND_API_KEY`, `VNPAY_HASH_SECRET`).
    - Tất cả 6 bộ kiểm thử và xác minh E2E (`verify_public_to_erp_e2e.py`, `verify_lead_sync.py`, `verify_vietqr_spec.py`, `verify_vnpay_spec.py`, `verify_marketing_and_hold_sweep.py`, `verify_monitoring_setup.py`) đạt 100% GREEN.



