# Backend-first MVP: Phase & Sub-agent Plan

This plan is intentionally backend/database heavy. The frontend is a consumer of stable API contracts and can be replaced later without rewriting domain logic.

## Global sub-agent contract
Every sub-agent MUST:
1. Read `AGENTS.md`.
2. Read all six canonical context files.
3. Inspect the target module, nearby tests, migrations, API routes and configuration.
4. Let Jev select the minimum useful skill chain.
5. Work only inside the assigned phase scope unless a blocking cross-scope defect is proven.
6. Add/adjust tests before declaring the scope complete.
7. Run applicable quality gates.
8. Update `context/progress-tracker.md` only after verified progress.
9. Report changed files, tests/checks run, data/security impact and unresolved risk.

A phase may start only when its declared dependencies are stable enough to consume.

---

## Phase 0 - Platform Baseline
**Sub-agent:** `platform-foundation-agent`
**Depends on:** none
**Primary context:** architecture, workflow rules, code standards
**Skill route:** `Jev -> Caveman -> Brainstorming (only unresolved choices) -> Superpowers`

### Tasks
- `P0-T01` Create Python/Django project and domain-oriented package layout.
- `P0-T02` Configure environment-only secrets and PostgreSQL/PostGIS connection.
- `P0-T03` Configure DRF pagination/filter/schema defaults.
- `P0-T04` Add Redis/Celery foundation without coupling domain logic to them.
- `P0-T05` Add health endpoint and OpenAPI/Swagger endpoint.
- `P0-T06` Add Dockerfile + Compose for PostGIS/Redis/web/worker.
- `P0-T07` Add Ruff, mypy, pytest and CI gates.
- `P0-T08` Add agent-context validation scripts.

### Exit criteria
- Project boots with required configuration.
- Health/schema endpoints are defined.
- PostGIS is part of DB provisioning/migrations.
- CI has migration/lint/type/test/deploy-check stages.

---

## Phase 1 - Identity & Authorization
**Sub-agent:** `identity-agent`
**Depends on:** Phase 0
**Primary context:** project overview, architecture, code standards
**Skill route:** `Jev -> Caveman -> TDD -> Superpowers`

### Tasks
- `P1-T01` Add UUID custom user before first production migration.
- `P1-T02` Define platform-role primitive and centralized admin predicate.
- `P1-T03` Add current-user API contract.
- `P1-T04` Register user model in Django Admin.
- `P1-T05` Verify anonymous/authenticated/admin permission boundaries.

### Exit criteria
- No feature trusts client-supplied owner/admin fields.
- Authentication and authorization remain distinct.
- User model migration is committed and stable.

---

## Phase 2 - Destination & Place Discovery
**Sub-agent:** `discovery-agent`
**Depends on:** Phases 0-1
**Primary context:** project overview, architecture, code standards
**Skill route:** `Jev -> Caveman -> TDD -> Superpowers`

### Tasks
- `P2-T01` Model destinations with publish flag and optional geographic center.
- `P2-T02` Model place categories and places with UUID IDs and publish lifecycle.
- `P2-T03` Store place coordinates in PostGIS `PointField(geography=True, SRID 4326)`.
- `P2-T04` Add uniqueness/check/index constraints.
- `P2-T05` Add public destination/category/place read APIs.
- `P2-T06` Add search/filter/order support.
- `P2-T07` Add nearby query with coordinate validation and max radius.
- `P2-T08` Prevent draft destinations/places from leaking publicly.

### Exit criteria
- Public collections are paginated where unbounded.
- Nearby search delegates spatial filtering to PostGIS, not Python loops.
- Querysets explicitly select related data used by serializers.

---

## Phase 3 - Partner Lifecycle
**Sub-agent:** `partner-workflow-agent`
**Depends on:** Phases 0-2
**Primary context:** project overview, architecture, workflow rules
**Skill route:** `Jev -> Caveman -> TDD -> Superpowers`

### Tasks
- `P3-T01` Model partner application, organization and membership.
- `P3-T02` Restrict user-visible applications to the authenticated applicant; admins see all.
- `P3-T03` Implement explicit `submitted -> under_review -> approved/rejected` transitions.
- `P3-T04` Use `transaction.atomic` + `select_for_update` for review transitions.
- `P3-T05` On approval create organization + owner membership and promote applicant role atomically.
- `P3-T06` Record privileged review actions in immutable audit log.
- `P3-T07` Block repeated/terminal invalid transitions.
- `P3-T08` Expose admin-only action endpoints.

### Exit criteria
- Direct API writes cannot set `status`, `reviewed_by`, or membership ownership.
- Approval cannot partially create organization/membership/application state.
- Rejection requires a reason.

---

## Phase 4 - Editorial Content
**Sub-agent:** `content-agent`
**Depends on:** Phases 0-2
**Primary context:** project overview, UI context for future API needs
**Skill route:** `Jev -> Caveman -> TDD -> Superpowers`; `Humanizer` only for polished demo/editorial docs.

### Tasks
- `P4-T01` Model travel article linked optionally to destination/place.
- `P4-T02` Add editorial lifecycle and publication timestamp.
- `P4-T03` Add public read API that exposes only published articles.
- `P4-T04` Register editorial management in Django Admin.
- `P4-T05` Add search/filter/order fields required by future frontend.

### Exit criteria
- Draft/review content never appears in public API.
- API contract is stable enough for Next.js rendering later.

---

## Phase 5 - Reviews & Favorites
**Sub-agent:** `community-agent`
**Depends on:** Phases 1-2
**Primary context:** project overview, security rules, code standards
**Skill route:** `Jev -> Caveman -> TDD -> Superpowers`

### Tasks
- `P5-T01` Add one-review-per-user/place DB invariant.
- `P5-T02` Enforce rating range at DB layer.
- `P5-T03` Require auth for writes; anonymous users may read published reviews.
- `P5-T04` Enforce owner-or-admin mutation permissions.
- `P5-T05` Maintain denormalized place rating/count after review mutation.
- `P5-T06` Add one-favorite-per-user/place DB invariant.
- `P5-T07` Restrict favorites queries to current user.

### Exit criteria
- Ownership checks exist server-side.
- Duplicate writes fail predictably without corrupting state.
- Reviews/favorites reject unpublished places.

---

## Phase 6 - Operations & Demoability
**Sub-agent:** `demo-ops-agent`
**Depends on:** Phases 1-5
**Primary context:** progress tracker, code standards
**Skill route:** `Jev -> Caveman -> TDD -> Humanizer`

### Tasks
- `P6-T01` Register operational models in Django Admin.
- `P6-T02` Keep audit records read-only in Admin.
- `P6-T03` Add idempotent `seed_demo` command.
- `P6-T04` Seed traveler/admin/destination/place/article/application data.
- `P6-T05` Document a deterministic demo walkthrough and API endpoints.

### Exit criteria
- Reviewer can demonstrate the full partner flow without manual DB edits.
- Seed can be rerun without creating uncontrolled duplicates.

---

## Phase 7 - Release Quality Gate
**Sub-agent:** `quality-release-agent`
**Depends on:** all backend phases
**Primary context:** all six context files
**Skill route:** `Jev -> Caveman -> TDD -> Superpowers`

### Tasks
- `P7-T01` Validate every migration is committed (`makemigrations --check`).
- `P7-T02` Apply migrations on clean PostGIS DB.
- `P7-T03` Run Ruff format/lint.
- `P7-T04` Run mypy.
- `P7-T05` Run unit/API/integration tests and collect coverage baseline.
- `P7-T06` Run Django deployment checks.
- `P7-T07` Review auth/input/ownership/state-transition security boundaries.
- `P7-T08` Review N+1/query/index concerns for list/search flows.
- `P7-T09` Review final diff for unrelated changes and stale context.

### Exit criteria
CI is green on a clean environment. A failure is fixed, not skipped or weakened.

---

## Deferred Phase 8 - External Capabilities
Not required for MVP. Add one integration at a time through ports/adapters:
- geocoding/map provider;
- R2/S3 media storage;
- transactional email;
- Turnstile;
- routing/weather.

Each integration requires timeout, error mapping, retry/idempotency analysis and fake provider/test double for tests.

---

## Deferred Phase 9 - Frontend
**Sub-agent:** `frontend-agent`
**Skill route:** `Jev -> UI/UX Pro Max -> Matt Pocock Skills -> TDD -> Web Quality`.

Next.js/TypeScript consumes the versioned REST API. Public SEO pages and operational dashboards can evolve independently of backend domain logic. `Deploy to Vercel` is used only after frontend build and quality checks pass. Excalidraw is optional for diagrams; Remotion remains out of scope unless a real motion/video feature is requested.

---

## Current explicit scope update — Phase 9 activated
The original backend-first plan deferred the frontend. The current product requirement explicitly activates Phase 9. The repository now includes a Next.js/TypeScript/Tailwind/shadcn-style customer frontend, BFF authentication routes, public discovery pages, review/favorite interaction, and partner-application UI while preserving Django as the business/data authority.
