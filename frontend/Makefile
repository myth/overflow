default: dev

install:
	@echo "Installing javascript dependencies ..."
	yarn install

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
	@echo "Checking imports ..."
	yarn run test

.PHONY: dev install prod run test
