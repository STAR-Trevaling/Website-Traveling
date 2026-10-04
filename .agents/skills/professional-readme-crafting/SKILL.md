---
name: professional-readme-crafting
description: |
  Expert guide and standards for creating world-class, visually stunning, and highly professional GitHub READMEs.
  Enforces Shields.io badges, modern hero layouts, system architecture diagrams (Mermaid),
  interactive route matrices, clean tables, copy-pastable CLI blocks, and developer-first documentation ergonomics.

  Relevant when:
    - Writing, rewriting, or polishing project README.md files.
    - Designing GitHub repository showcases that impress recruiters, clients, and open-source developers.
    - Documenting full-stack monorepos, microservices, or APIs.
---

# Professional README Crafting: World-Class Repository Documentation

A repository's `README.md` is its digital storefront. A truly elite README balances visual excellence, concise technical clarity, and rapid onboarding for developers.

---

## 1. Core Anatomy of an Elite README

Every production-grade README must feature these essential sections in order:

```text
1. Header / Hero Block (Project Name + Tagline + Modern Shields.io Badges)
2. Interactive Navigation Anchor Bar (Quick Links)
3. Product Overview & Key Engineering Highlights (Feature Grid with Icons)
4. System Architecture & Topology (ASCII or Mermaid Diagram)
5. Monorepo Directory Tree (Clean Annotated Layout)
6. Quickstart: Docker Compose (Zero-to-Running in < 3 minutes)
7. Local Development Guide (Independent Polyglot Workflows)
8. REST API Reference (Tabular endpoint breakdown by bounded context)
9. Environment Configuration Matrix (Table of .env parameters)
10. Quality Assurance & Verification (Lint, Typecheck, Test, CI Status)
11. License, Authors & Acknowledgments
```

---

## 2. Visual Design & Markdown Ergonomics

### A. Modern Badges (Shields.io Flat-Square)
Use high-contrast, modern badges using the `flat-square` style with matching brand colors:
```markdown
[![Next.js 15](https://img.shields.io/badge/Next.js-15.5-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Django](https://img.shields.io/badge/Django-5.2_LTS-092E20?style=flat-square&logo=django&logoColor=white)](https://www.djangoproject.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-17-4169E1?style=flat-square&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![PostGIS](https://img.shields.io/badge/PostGIS-3.5-336791?style=flat-square&logo=postgis&logoColor=white)](https://postgis.net/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=flat-square&logo=docker&logoColor=white)](https://www.docker.com/)
```

### B. Interactive Anchor Bar
Place a clean jump-bar right below badges:
```markdown
[Overview](#-overview) • [Architecture](#-architecture) • [Quickstart](#-quickstart-docker) • [API Specs](#-rest-api-reference) • [Monorepo Layout](#-repository-layout) • [Quality](#-testing--quality)
```

### C. Visual Architecture Diagrams (Mermaid)
Provide clear, high-contrast architecture diagrams illustrating the flow between client, BFF, backend services, PostGIS, and Redis/Celery.

### D. Clean Tables with Consistent Alignment
- Bold header cells.
- Clean code formatting for paths, methods, and variables.
- Badges or status pills for HTTP methods (`GET`, `POST`, `PATCH`, `DELETE`).

### E. Developer Tone (Humanizer Integration)
- Speak engineer-to-engineer.
- Eliminate filler words and robotic superlatives.
- Provide explicit, copy-pastable commands that work on both POSIX shells and Windows PowerShell.
