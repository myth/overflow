all : lint deploy dev
.PHONY : all
.DEFAULT_GOAL := deploy

dev :
	uv run python src/manage.py runserver

lint :
	uv run ruff check src/
	uv run ruff format src/

deploy : lint
	./deploy.sh
