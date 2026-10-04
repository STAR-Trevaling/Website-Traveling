# Code Standards

## Backend
- Domain invariants live in services when transitions/transactions matter.
- Serializers/views own HTTP validation and orchestration, not privileged state mutation.
- PostgreSQL constraints protect uniqueness/range invariants.
- Querysets used by list/detail APIs must avoid avoidable N+1 queries.
- Authorization is server-side and explicit.

## Frontend
- Next.js Server Components by default; Client Components only for interaction.
- TypeScript strict mode.
- Use semantic HTML, keyboard-visible focus states and accessible labels.
- Customer pages fetch stable API contracts rather than duplicating domain logic.
- Preserve the supplied travel template design language while making layout responsive.
