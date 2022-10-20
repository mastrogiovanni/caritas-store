# README

Download the whole project (recursive with submodules):

```
git clone --recurse-submodules git@github.com:mastrogiovanni/caritas-store.git
```

## Development Guidelines

Create a `.env` file with the following:

```
DATABASE_NAME=name
MONGO_INITDB_ROOT_USERNAME=admin
MONGO_INITDB_ROOT_PASSWORD=admin
```

# Run in Dev mode

Run the application (dev mode) with the following:

```
docker-compose --env-file example/.env --profile dev up --build
```

Access the app at `http://localhost`

# Run in Prod mode

Deploy the server in a public place and add DNS information to `.env`:

```
# For example...
NODE_HOST=etaireia.xxx.yyy
```

Run the application (prod mode) with the following:

```
docker-compose --env-file .env --profile prod up --build
```

Access the app at `https://${NODE_HOST}`

where `NODE_HOST` is the domain specified in the `.env` file

