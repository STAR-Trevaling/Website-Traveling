.PHONY: up down migrate seed backend-check frontend-check
up:
	docker compose up --build

down:
	docker compose down

migrate:
	docker compose run --rm backend python manage.py migrate

seed:
	docker compose run --rm backend python manage.py seed_demo

backend-check:
	docker compose run --rm backend python manage.py makemigrations --check --dry-run
	docker compose run --rm backend ruff check .
	docker compose run --rm backend mypy .
	docker compose run --rm backend pytest

frontend-check:
	docker compose run --rm frontend npm run typecheck
	docker compose run --rm frontend npm run build
