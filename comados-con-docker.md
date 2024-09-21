# Este es para crear una red y correr mongodb

```shell
$ docker network create cotojs-network
$ docker run --network cotojs-network --name cotojs-mongodb-run -p 27017:27017 -d mongo:4.4`
```

# Este es para Express API con MongoDB

```shell
$ docker build -t cotojs-api-build -f api.Dockerfile .
$ docker run --network cotojs-network --name cotojs-api-run -p 5880:5880 -d cotojs-api-build
```

# Este es para React + Vite

```shell
$ docker build -t cotojs-react-build -f react.Dockerfile .
$ docker run --network cotojs-network --name cotojs-react-run -p 5173:3000 -d cotojs-react-build
```