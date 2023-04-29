all : lint deploy
.PHONY : all
.DEFAULT_GOAL := deploy

lint :
	poetry run isort src/
	poetry run black src/

deploy : lint
	./deploy.sh
