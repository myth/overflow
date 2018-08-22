default: dev

install:
	@echo "Installing javascript dependencies ..."
	yarn install --ignore-optional

dev:
	@echo "Building bundle for DEVELOPMENT ..."
	yarn run build:dev

prod:
	@echo "Building bundle for PRODUCTION ..."
	yarn run build:prod

run:
	@echo "Starting development server ..."
	yarn run dev

test:
	@echo "Running tests ..."
	yarn run test

clean:
	@echo "Cleaning build folder ..."
	rm -rf dist/*

.PHONY: clean dev install prod run test
