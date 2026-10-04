# Validation Report

## Executed successfully in artifact environment
- Canonical context presence/content check: `python scripts/validate_context.py`.
- AST parse of all project Python files: `python scripts/static_sanity.py`.
- Python bytecode syntax compilation: `python -m compileall -q manage.py src scripts`.
- TOML parser validation for `pyproject.toml`.
- Whitespace/error scan: `git diff --check` before packaging.
- Manual review of partner transition, review ownership, geospatial radius validation, secret configuration and Redis degradation boundaries.

## Not executed here
The artifact container has no network access and Django/DRF/PostGIS Python dependencies were not preinstalled. A `pip install` attempt failed on DNS resolution. Therefore the following are configured but **not claimed as passed**:
- `python manage.py makemigrations --check --dry-run`;
- `python manage.py migrate` against PostGIS;
- `ruff check` / `ruff format --check`;
- `mypy`;
- `pytest` and coverage;
- `python manage.py check --deploy`;
- Docker image build / Compose runtime;
- full GitHub Actions run.

These checks are encoded in `.github/workflows/ci.yml` and should be the first gate run in a normal networked environment.
