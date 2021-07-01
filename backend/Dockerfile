FROM python:3.6

RUN pip install -U poetry
WORKDIR /app/backend
COPY pyproject.toml poetry.lock ./
RUN poetry install
COPY . .

EXPOSE 5000
EXPOSE 5432
ENTRYPOINT ["poetry"]
CMD ["run", "task", "run", "--reload"]
