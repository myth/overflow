all : lint deploy dev
.PHONY : all
.DEFAULT_GOAL := deploy

dev :
	uv run --no-sync python src/manage.py runserver

css :
	@test -x .tools/tailwindcss || $(MAKE) tailwind
	./.tools/tailwindcss -i src/overflow/static_src/input.css -o src/overflow/static/overflow/site.css --minify

css-watch :
	./.tools/tailwindcss -i src/overflow/static_src/input.css -o src/overflow/static/overflow/site.css --watch

tailwind :
	mkdir -p .tools
	curl -sL -o .tools/tailwindcss https://github.com/tailwindlabs/tailwindcss/releases/latest/download/tailwindcss-linux-x64
	chmod +x .tools/tailwindcss

lint :
	uv run --no-sync ruff check src/
	uv run --no-sync ruff format src/

deploy : css lint
	./deploy.sh
