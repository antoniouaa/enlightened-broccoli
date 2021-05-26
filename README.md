# A calorie and macro tracking app

[![pre-commit](https://img.shields.io/badge/pre--commit-enabled-brightgreen?logo=pre-commit&logoColor=white)](https://github.com/pre-commit/pre-commit) [![Code style: black](https://img.shields.io/badge/code%20style-black-000000.svg)](https://github.com/psf/black) [![Coverage Status](https://coveralls.io/repos/github/antoniouaa/enlightened-broccoli/badge.svg?branch=master)](https://coveralls.io/github/antoniouaa/enlightened-broccoli?branch=master) [![Build Status](https://travis-ci.com/antoniouaa/enlightened-broccoli.svg?branch=master)](https://travis-ci.com/antoniouaa/enlightened-broccoli)

Full stack calorie tracking app built on FastAPI, PostgreSQL and Vue.js

## Installation

This repository contains both the API and the website.
The backend uses [FastAPI](https://fastapi.tiangolo.com/) and [PostgreSQL](https://www.postgresql.org/).

To install:

```sh
git clone https://github.com/antoniouaa/enlightened-broccoli.git
cd enlightened-broccoli
```

## FastAPI

To run the API locally you will need [poetry](https://python-poetry.org/).
Once installed:

```sh
cd backend
poetry install
poetry run pytest -vvv
poetry run uvicorn broccoli:create_app --factory
```
