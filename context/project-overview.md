# Project Overview

## Product
A location-based **Travel Discovery, Partner & Content Platform** with a public customer website. The MVP helps travelers discover trustworthy destinations and local places, lets travelers review/favorite places, lets local businesses apply to become partners, and gives administrators a controlled workflow to approve partners and manage published content.

## Actors
- **Traveler**: browse destinations/places/articles, search/filter/nearby discovery, review and favorite places.
- **Partner applicant / partner**: submit a partnership application and, after approval, own a partner organization through controlled workflows.
- **Admin/content operator**: review partner applications, manage destinations/places/articles, moderate reviews, audit changes.

## MVP journeys
1. Traveler opens the customer website and browses published destinations, experiences and stories.
2. Traveler searches/filters places and can request nearby places.
3. Authenticated traveler creates one review per place or favorites a place.
4. Authenticated user submits a partner application.
5. Admin reviews and approves/rejects the application.
6. Approval creates the partner organization and owner membership atomically and records an audit event.
7. Admin publishes destination/place/article content through Django Admin.

## MVP scope
- Identity foundation, registration/login and role-aware permissions.
- Destination/content catalog.
- Place catalog with geospatial coordinates and nearby search.
- Partner application approval workflow.
- Reviews and favorites.
- Public REST API + admin site + OpenAPI schema.
- PostgreSQL/PostGIS, Redis cache foundation, Celery background-processing foundation.
- Audit log for privileged state changes.
- Next.js customer frontend using TypeScript, Tailwind CSS and shadcn-style primitives.
- Customer UI follows the supplied Anima travel template visual language.
- Docker Compose, CI, tests and deterministic demo seed data.

## Out of scope for MVP
- Booking engine and payments.
- Live chat.
- Full AI itinerary generation.
- OpenSearch/Elasticsearch.
- Microservices/Kafka/Kubernetes.
- Production-grade recommendation ML.
- Custom staff/admin dashboard replacing Django Admin.

## Success criteria
A reviewer can clone the repository, start the stack, seed demo data, browse the customer website, discover destinations/places/stories, create an account, sign in, submit a review/favorite and partner application, then approve/reject the partner flow from the controlled backend/admin surface without editing the database manually.
