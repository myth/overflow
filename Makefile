all : lint deploy dev
.PHONY : all
.DEFAULT_GOAL := deploy

dev :
	poetry run python src/manage.py runserver

lint :
	poetry run ruff check src/
	poetry run ruff format src/

deploy : lint
	./deploy.sh
