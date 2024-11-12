all : lint deploy dev
.PHONY : all
.DEFAULT_GOAL := deploy

dev :
	uv run --no-sync python src/manage.py runserver

lint :
	uv run --no-sync ruff check src/
	uv run --no-sync ruff format src/

deploy : lint
	./deploy.sh
