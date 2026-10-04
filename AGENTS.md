# AGENTS.md

Mandatory operating contract for every coding agent working in this repository.

## 1. Bootstrap order
Before any non-trivial change, read in this exact order:
1. `AGENTS.md`
2. `context/project-overview.md`
3. `context/architecture.md`
4. `context/ai-workflow-rules.md`
5. `context/code-standards.md`
6. `context/progress-tracker.md`
7. `context/ui-context.md`
8. Relevant source, tests, migrations, configuration, and API contracts.

Context describes intended state; the repository describes actual state. Verify both.

## 2. Source-of-truth precedence
1. Current explicit user requirement.
2. Security, privacy, legal, and data-integrity constraints.
3. This file and canonical context.
4. Accepted ADRs and repository documentation.
5. Existing code/tests/configuration.
6. Framework conventions.
7. Agent preference.

## 3. Architecture contract
- System topology: **modular monolith**.
- Domain modeling: **pragmatic DDD / DDD-lite** where business rules justify it.
- Dependency direction: **Clean/Hexagonal principles**, not ceremony.
- Code-level design: **SOLID**, composition-first.
- Complex workflows: explicit **state transitions**.
- External providers: **ports/adapters**.
- Async side effects: background jobs/events only where justified.
- CQRS: organizational separation of commands/queries only where useful; no separate stores in MVP.
- Do not introduce microservices, Kafka, Kubernetes, event sourcing, or extra databases without evidence.

## 4. Jev routing rule
`Jev` is the conceptual skill router. It does not code. For every substantial task it must classify:
- task intent;
- affected bounded context;
- architecture layer;
- data/security risk;
- testing needs;
- frontend impact;
- release/deployment impact.

Then choose the **minimum useful skill set**. Never invoke all skills as a ritual.

### 12 skill registry
| Skill | Use when | Do not use as |
|---|---|---|
| Superpowers | broad implementation workflow, decomposition, execution discipline | a substitute for repository context |
| Brainstorming | requirements are broad, architecture/product choices need alternatives | permission to endlessly redesign settled scope |
| TDD | business logic, bug fixes, contracts, high-risk behavior | a reason to test implementation trivia |
| Caveman | repository-specific investigation and verification | permission to guess missing code |
| Find Skills | capability gap requires discovering a specialized skill | routine step for every task |
| Matt Pocock Skills | TypeScript/React/Next.js work | backend Python work |
| UI/UX Pro Max | user-facing interaction/layout/design tasks | backend/domain tasks |
| Web Quality | accessibility, web performance, SEO, browser-quality review | database/backend-only review |
| Humanizer | README, docs, user-facing copy need natural prose | code correctness review |
| Excalidraw | architecture/data-flow diagrams materially improve understanding | mandatory artifact for every change |
| Deploy to Vercel | Next.js deployment workflow | backend/database deployment |
| Remotion | React-based video/motion assets are explicitly in scope | ordinary UI animation |
| Professional README Crafting | GitHub README, project showcase, developer documentation | code implementation |

### Recommended sequences
- Backend feature: `Jev -> Caveman -> Brainstorming (only if ambiguous) -> TDD -> Superpowers`.
- Database/schema change: `Jev -> Caveman -> TDD -> Superpowers`, with migration/data review mandatory.
- Bug fix: `Jev -> Caveman -> TDD -> Superpowers`.
- Frontend later: `Jev -> UI/UX Pro Max -> Matt Pocock Skills -> TDD -> Web Quality`.
- Documentation: `Jev -> Caveman -> Humanizer`.
- Deployment: use deployment skill only after tests/build/config checks pass.

Skill output is advisory. It cannot override this repository's product, architecture, security, or data contracts.

## 5. Task workflow
`UNDERSTAND -> INSPECT -> ROUTE -> PLAN -> IMPLEMENT -> VALIDATE -> REVIEW DIFF -> UPDATE CONTEXT`

Before coding, be able to answer: what problem, which actor, which bounded context owns it, current implementation, invariants, tests, failure modes, and what could break.

## 6. Change discipline
- Keep diffs scoped; no opportunistic rewrites/upgrades.
- Do not fake success or weaken tests to make CI green.
- Do not scatter external API calls through domain logic.
- Do not bypass authorization for convenience.
- Do not commit secrets.
- Database changes require explicit constraints/index/migration review.
- Context files must be updated when architecture, scope, standards, progress, or UI rules materially change.

## 7. Definition of done
A task is done only when requested behavior is implemented, relevant tests/checks pass, failure/security/data cases are considered, migrations are safe, docs/context are current, and the diff contains no unrelated changes. Report any check that could not be run.
