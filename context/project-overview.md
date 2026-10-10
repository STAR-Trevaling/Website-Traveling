# Project Overview

## Product
An enterprise-grade, location-based **Travel Discovery, Booking, Hospitality Referral & AI Concierge Platform** (`STAR Travels`) for exploring destinations, cultural experiences, curated tours, luxury accommodations, and gourmet dining across Vietnam.

## Actors
- **Traveler**: Browse destinations/places/tours/stories, use GPS geolocation to find nearby dining & stays, book tours with online payment (VNPay/VietQR), track affiliate bookings, converse with AI Concierge, and review/favorite places.
- **Partner applicant / partner**: Submit B2B partnership applications and, after review, own partner merchant profiles.
- **Admin / Content operator**: Review partner applications, manage all catalog entities, audit booking transactions, moderate reviews, and inspect audit logs.

## Core Journeys
1. **Discovery & Smart Search**: Traveler explores destinations, experiences, curated tours, stories, and uses the dark glassmorphic capsule search toolbar.
2. **Accommodations & Dining Discovery**: Traveler selects regions/vibes or activates GPS geolocation ("Tìm gần vị trí của tôi") to see nearby hotels and restaurants sorted by Haversine distance (`~850 m`, `~1.2 km`).
3. **Direct Tour Booking & Payment**: Traveler reserves curated tours, enters traveler details, and pays via VNPay Sandbox, VietQR (NAPAS 247), or Cash on Arrival with server-enforced pricing.
4. **Partner Referral Booking**: Traveler clicks partner booking links (Booking.com, Agoda, TableCheck, etc.) on hotels/restaurants; a non-blocking 1.5s background beacon creates a referral booking record before redirecting.
5. **AI Travel Concierge**: Traveler consults STAR Concierge for tailored itineraries, regional recommendations, or nearby suggestions powered by RAG and prompt-injection-safe retrieval.
6. **Social Proof & Bookmarks**: Authenticated traveler submits verified reviews and manages saved favorites.
7. **Partner Onboarding Workflow**: Applicant submits B2B registration; admin reviews and approves/rejects atomically with row-level locks and audit logging.
8. **Operations & Compliance**: Admin oversees content, bookings, referrals, and audit trails via Django Admin; platform operates under Decree 13/2023/NĐ-CP and Decree 52/2013/NĐ-CP.

## Scope Accomplished
- **Architecture**: Modular monolith backend (Django 5.2 + PostGIS + Redis + Celery) and customer frontend (Next.js 15.5 App Router + React 19 + Tailwind CSS) with shared contracts (`@travel/contracts`).
- **Security & Auth**: JWT authentication with Next.js BFF HttpOnly cookies, DRF throttling, server-side price recalculation, and HTTP security headers (`CSP`, `HSTS`, `X-Frame-Options`).
- **Catalogs & Seed Data**: 12 Destinations, 8 Curated Tours, 9 Experiences, 5 Editorial Stories, 10 Luxury Accommodations, and 10 Gourmet Restaurants (100% Vietnam verified data).
- **Geospatial & GPS Geolocation**: PostGIS `ST_DWithin` queries and client-side GPS Geolocation with Haversine distance calculation and nearest-venue recommendations.
- **Tour Booking & Payment Engine**: Full booking lifecycle, immutable ledger transactions, and VNPay / VietQR integration.
- **Affiliate Referral Engine**: `item_type` expansion (`accommodation_referral`, `restaurant_referral`), non-blocking beacon tracking, and Odoo CRM sync readiness.
- **AI Concierge with RAG**: Dual-tier AI assistant (Django pgvector/embeddings RAG + client-side deterministic knowledge engine) with prompt-injection defense.
- **Bilingual i18n**: Seamless Vietnamese (`vi`) and English (`en`) support with zero mixed-language UI bleeding.
- **Legal Compliance**: Mandatory consent checkboxes, privacy policy (`/privacy`), terms of service (`/terms`), and full MOIT corporate disclosure.
- **Quality Assurance**: 100% pass across TypeScript `tsc --noEmit`, ESLint, Pytest, MyPy, Bandit SAST, and GitHub Actions CI.

## Out of Scope
- Dedicated Odoo 18 ERP instance (maintained in a separate standalone repository/deployment).
- Microservices / Kafka / Kubernetes (modular monolith topology intentionally maintained per architecture contract).
- In-house hotel/dining PMS or table reservation billing (intentionally utilizing partner referral model).

## Success Criteria
A reviewer can clone the repository, boot Docker Compose or run locally, explore all 25 customer routes, use GPS geolocation to find nearby stays and restaurants, book a tour or referral item, interact with the AI Concierge, sign in, submit a review or partner application, and manage all workflows from Django Admin with zero errors.
