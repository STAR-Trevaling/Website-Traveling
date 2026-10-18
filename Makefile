.PHONY: up down migrate seed api-check public-site-check backend-check frontend-check
up:
	docker compose up --build

down:
	docker compose down

migrate:
	docker compose run --rm api python manage.py migrate

seed:
	docker compose run --rm api python manage.py seed_demo

api-check:
	docker compose run --rm api python manage.py makemigrations --check --dry-run
	docker compose run --rm api ruff check .
	docker compose run --rm api mypy .
	docker compose run --rm api pytest

backend-check: api-check

public-site-check:
	docker compose run --rm public-site npm run typecheck
	docker compose run --rm public-site npm run build

frontend-check: public-site-check
