# AI Workflow Rules

- Read `AGENTS.md` and all canonical context before non-trivial changes.
- Repository state overrides assumptions; verify code, tests, migrations and API contracts.
- Keep changes scoped and reversible.
- Do not weaken authorization, tests or validation to make a task appear complete.
- External integrations belong behind explicit adapters.
- Do not deploy automatically.
- Report commands actually run and checks that could not be run.
- **Git Branching Contract**:
  - Always branch directly from latest `main` (`git checkout main && git pull origin main && git checkout -b <type>/<scope>`).
  - Never branch off another unmerged feature branch to prevent entangled git commit graphs.
  - Implement atomic commits matching Conventional Commits.
  - Push branch to remote and create Pull Request to `main`.
  - Once PR is merged, switch back to `main`, pull the latest code (`git pull origin main`), and create the next branch strictly from `main`.

