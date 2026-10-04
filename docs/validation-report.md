# Validation Report — Complete Travel MVP Artifact

## Executed successfully in this environment
- `python scripts/validate_context.py`
- `python scripts/static_sanity.py`
- `python -m compileall -q backend scripts`
- JSON parse of all repository `.json` files
- YAML parse of `docker-compose.yml` and `.github/workflows/ci.yml`
- TypeScript parser pass using the globally available `tsc` with dependency resolution disabled; no TS1xxx syntax diagnostics were reported for `frontend/src` or the reconstructed Anima source.
- Repository scan confirms no `Kerno` project references remain.

## Not executable in this environment
The container has no Django/DRF/Celery packages installed and cannot resolve external package/CDN hosts. Node has TypeScript globally but does not have the repository's React/Next dependencies installed. Therefore these are configured but are **not claimed as passed** here:
- Django `makemigrations --check --dry-run`
- PostGIS migration execution
- pytest integration/API tests
- Ruff / mypy
- `npm install`, full frontend typecheck and Next.js production build
- Docker Compose runtime
- pixel-by-pixel browser screenshot comparison against the supplied Anima reference
- downloading the Anima CDN assets into local `public/`

The complete gates are encoded in `.github/workflows/ci.yml`. Run them in a networked environment before deployment.

## UI parity note
The production Next.js home page uses the exact known Anima asset filenames/CDN base, reference typography, 1197px desktop canvas, section dimensions and content structure reconstructed from the supplied screenshots. The five supplied full-page screenshots are stored under `docs/design-reference/`, and `reference/anima-original/` preserves a runnable reconstructed Vite/React source reference. Exact 100% pixel parity cannot be truthfully certified until the page is rendered with the original assets/fonts and compared in a browser.
