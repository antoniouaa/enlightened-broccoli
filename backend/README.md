## Backend for the calorie and macro tracking app

### Installation

You will need to install [poetry](https://python-poetry.org/)

After that,

```sh
poetry install
```

### Run locally

```sh
poetry run uvicorn brocolli:app
```

### Testing

```sh
poetry run pytest -vvv
```

## Endpoints

The API currently offers a number of endpoints

### Items

| Request                   | Response                                          | On success |
| ------------------------- | ------------------------------------------------- | ---------: |
| `GET /items/`             | returns a list of all the items in the database   |        200 |
| `POST /items/`            | adds the item to the database and returns it      |        201 |
| `DELETE /items/{item_id}` | deletes the item with the corresponding `item_id` |        204 |

### Users

| Request                   | Response                                          | On success |
| ------------------------- | ------------------------------------------------- | ---------: |
| `GET /users/`             | returns a list of all the users in the database   |        200 |
| `GET /users/{user_id}`    | returns the user with the corresponding `user_id` |        200 |
| `POST /users/`            | adds the user to the database and returns them    |        201 |
| `DELETE /users/{user_id}` | deletes the user with the corresponding `user_id` |        204 |

To see live documentation and try it yourself, run the server and navigate to http://localhost:8000/docs
