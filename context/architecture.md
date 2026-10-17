# Architecture

## Baseline
- Python 3.13
- Django 5.2 LTS
- Django REST Framework
- PostgreSQL 17 + PostGIS
- Redis 7
- Celery 5 background-task foundation
- drf-spectacular for OpenAPI
- Next.js App Router + TypeScript
- Tailwind CSS + shadcn-style Radix UI primitives
- pytest / pytest-django
- Ruff + mypy
- Docker Compose

## Topology
A single deployable **Django modular monolith** owns transactional state and business invariants. PostgreSQL/PostGIS is the source of truth. Redis/Celery provide infrastructure capabilities only. A separate Next.js customer application consumes the versioned REST API and may use server-side BFF route handlers for browser auth-cookie safety.

```text
Browser
  |
  v
Next.js customer web (SSR/RSC + BFF auth actions)
  |
  v
Django + DRF modular monolith
  |---------------------|
  v                     v
PostgreSQL + PostGIS    Redis <-> Celery worker
(source of truth)      (ephemeral/async)
```

## Bounded contexts
- `accounts`: identity, RBAC roles (Traveler, Partner, Staff), and JWT authentication.
- `destinations`: destination editorial entities and regional groupings.
- `places`: local attractions, categories, and PostGIS geospatial discovery.
- `tours`: curated tour packages, daily itinerary timelines, and pricing invariants.
- `experiences`: localized activities, adventure slots, and booking metadata.
- `bookings`: transactional tour reservations and affiliate referral bookings (`item_type='tour'|'accommodation_referral'|'restaurant_referral'`).
- `payments`: payment ledger and gateway integrations (VNPay Sandbox, VietQR NAPAS 247, Cash on Arrival) with price tampering protection.
- `assistant`: AI Concierge RAG engine (Jev RAG v2 post-retrieval evidence evaluation, pgvector exact cosine + PostgreSQL FTS via RRF, prompt injection defense, lead extraction).
- `accommodations`: luxury hotel/resort catalog, amenities, and affiliate referral partner mapping.
- `restaurants`: dining venues, Michelin Guide spotlights, culinary styles, and table reservation referral mapping.
- `partners`: B2B partner application state machine (`submitted` -> `under_review` -> `approved`/`rejected`) with row-level locks.
- `content`: editorial travel stories and cultural cẩm nang.
- `guides`: practical travel directory models (`GuideCategory`, `GuideArticle`), verified handbook data, and structured JSON entities for RAG.
- `reviews`: verified traveler ratings and saved favorites.
- `audit`: immutable privileged operational logs.

## Dependency rules
- API views/serializers orchestrate HTTP concerns; they do not own privileged workflow invariants.
- Transactional workflow rules belong in application/domain services.
- Django ORM is used directly where sufficient; repositories are not created mechanically.
- Cross-context writes occur through an owning service where business invariants exist.
- External providers are introduced behind explicit adapters/ports.
- Frontend never becomes the authority for permissions, ownership or state transitions.

## Data ownership
PostgreSQL/PostGIS is the source of truth. Redis is cache/ephemeral state only. Media binaries should move to S3-compatible object storage when media upload integration is introduced; the MVP demo may reference remote template assets by URL.

## Security boundaries
- All public input is untrusted.
- Write endpoints require authentication unless explicitly public.
- Admin transitions require staff authorization.
- State transitions are validated server-side and wrapped in transactions.
- Browser access/refresh tokens are kept in HttpOnly cookies by Next.js BFF routes.
- Secrets come from environment variables.
- AI Assistant PII scrubbing: all customer phone numbers and emails are masked before dispatching retrieval passages to external evaluation/inference providers.

## Search strategy & Jev RAG v2 Pipeline
- **Vector + Full-Text Search**: In-database `assistant_rag_vector_chunk` table using `pgvector` (`vector(1536)`) for exact cosine distance combined with PostgreSQL GIN indexed `tsvector` via Reciprocal Rank Fusion (RRF, k=60).
- **Post-Retrieval Evidence Evaluation**:
  - `HybridRetriever`: Fetches Top-K candidate passages matching the query.
  - `JevPassageEvaluator`: Calls TypeSafe System One `/v1/questions` with PII-redacted query/passage pairs, computing passage score (0..100) and noul alignment.
  - `GatePolicy` (`travel-evidence-v1`): Deterministic evidence gate partitioning candidates into `INCLUDE`, `CONFLICT`, or `EXCLUDE` based on score thresholds (default: min 70.0, conflict delta 15.0).
  - `ChatGenerator`: OpenAI-compatible LLM generating factual Vietnamese/English responses grounded exclusively on gated evidence, with mandatory `[S1]`, `[S2]` citation validation.
  - Honest Abstention: Emits deterministic polite refusal when no passages meet evidence gates or conflicting data is detected.
- **Transactional Ingestion**: Ingestion service computes SHA256 chunk hashes (`chunk_hash`) for idempotent upsert, pruning deleted or unpublished content without full table wipes.
- **Graceful Isolation**: Controlled via `JEV_EVIDENCE_ENABLED` feature flag; transparent fallback to existing lexical/catalog RAG if disabled or credentials are unconfigured.

## Scaling path
Scale Next.js and the Django modular monolith horizontally first. Extract services only when independent scaling, ownership, failure isolation or deployment cadence provides measurable value.

## Monorepo Layout
Structured as a clean polyglot monorepo with independent dependency domains:
- `apps/public-site`: Next.js 15 customer web application.
- `apps/api`: Django 5.2 + DRF modular monolith.
- `packages/contracts`: Shared TypeScript data models and OpenAPI specifications (@travel/contracts).
- `docs/`: Product architecture, design reference and template archives.
- `scripts/`: Environment validation and sanity checks.
