default: install

install: env
	@echo "Installing python dependencies ..."
	. env/bin/activate && pip3 install --upgrade pip && pip3 install -r requirements.txt

env:
	@echo "Ensuring Python 3 environment ..."
	python3 -m venv env

run: env
	@echo "Starting development server ..."
	. env/bin/activate && python src/manage.py migrate && python src/manage.py runserver 0.0.0.0:8000

test: env
	@echo "Checking imports ..."
	isort -c -rc src

	@echo "Checking code style (PEP 8) ..."
	pycodestyle src

.PHONY: install run test
