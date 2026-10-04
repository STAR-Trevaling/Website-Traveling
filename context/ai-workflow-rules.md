# AI Workflow Rules

- Read `AGENTS.md` and all canonical context before non-trivial changes.
- Repository state overrides assumptions; verify code, tests, migrations and API contracts.
- Keep changes scoped and reversible.
- Do not weaken authorization, tests or validation to make a task appear complete.
- External integrations belong behind explicit adapters.
- Do not deploy automatically.
- Report commands actually run and checks that could not be run.
