# README

Download the whole project (recursive with submodules):

```
git clone git@github.com:mastrogiovanni/caritas-store.git
```

## Development Guidelines

# Run in Watch mode

Enter in the caritas-store-web and run:

```
API_ENDPOINT=http://localhost:3000/api PORT=4000 npm run dev
```

Enter in the `caritas-store-api` and start the database MongoDB:

```
docker-compose up
```

Then start the backend:

```
DATABASE_NAME=caritas-store MONGO_URL=mongodb://admin:admin@localhost:27017 npm run start:dev
```

Now you can modify both backend and frontend to fix bugs or add features without rebuild the whole code.
Database is accessible on your localhost (port 27017) with the following URI: `mongodb://admin:admin@localhost:27017/`

Access the app at `http://localhost:4000`

# Run in Dev mode

Once the frontend/backend are stable enough you can run them locally in containerized way:

```
docker-compose --profile dev up --build
```

Access the app at `http://localhost`

The previous command will build application and provide a containerized stack with traefik as load balancer
and the two microservices (frontend and backend) with proper routing.

# Run in Prod mode

Once the code is tested in staging you can release it tagging the github repo:

```
git tag -a vX.Y.Z -m "Release X.Y.Z"
git push origin vX.Y.Z
```

This action triggers the creation of docker container (one for the API and another for UI).
Those containers will be pushed on docker hub:
- mastrogiovanni/caritas-store-web:vX.Y.Z
- mastrogiovanni/caritas-store-api:vX.Y.Z

Create a `.env` file with the following:

```
DATABASE_NAME=caritas-store
MONGO_URL=<Mongo Db Url (e.g. Mongo Atlas)>
ACME_EMAIL=<Your email>
NODE_HOST=<Host were platform is exposed>
```

Run the application (prod mode) with the following:

```
docker-compose --env-file .env --profile prod up
```

Access the app at `https://${NODE_HOST}`

where `NODE_HOST` is the domain specified in the `.env` file
