Overflow
====

[![Build Status](https://ci.ulv.io/api/badges/myth/overflow/status.svg)](https://ci.ulv.io/myth/overflow)

Codebase for [overflow.no](https://overflow.no)

## Backend

Set up the Python environment and install dependencies

#### Install

```
cd backend
apt install python3 python3-pip
make env
source env/bin/activate
make install
```

#### Test

```
make test
```

#### Run

```
make run
```

## Frontend

Setup the Webpack / Typescript / React environment

#### Install

Install Nodejs + Yarn + Webpack + Typescript + React

```
cd frontend
apt install nodejs yarn
make install
```

#### Build

Build a development bundle

```
make dev
```

Build a production bundle

```
make prod
```

#### Test

Run linting and tests

```
make test
```

#### Run

Run webpack development server

```
make run
```
