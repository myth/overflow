default: install

install:
	@echo "Installing python dependencies ..."
	pip3 install --upgrade pip
	pip3 install -r requirements.txt
	@echo "Applying migrations ..."
	python src/manage.py migrate

env:
	@echo "Ensuring Python 3 environment ..."
	python3 -m venv env

run:
	@echo "Starting development server ..."
	python src/manage.py runserver 0.0.0.0:8000

test:
	@echo "Checking imports ..."
	isort -c -rc src

	@echo "Checking code style (PEP 8) ..."
	pycodestyle src

.PHONY: install run test
