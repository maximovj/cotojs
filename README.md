# CotoJS

Este repositorio es un proyecto de red social de sala (grupo de conversaciones) en tiempo real.

Desarrollado con una arquitectura "BackEnd y FrontEnd desacoplado", se usó para el lado FrontEnd: ReactJS + Axios + Tailwind CSS, y se usó para el lado BackEnd: Express + Mongoose + Socket.io + JWT + CORS + Multer + etc

Conjunto de tecnologías y características para este aplicación web:

- Proyecto con infraestructura virtualizada o proyecto Vagrantizado.
- Proyecto dockerizado.
- Proyecto de RectJS + Axios (FrontEnd).
- Proyecto de NodeJS + Express + Moongose (BackEnd).
- Base de datos usando MongoDB
- Mapeador de Documentos a Objetos (ODM con Mongoose).
- Notificaciones de sistema (con Toastify y SweetAlert2).
- CRUD para usuarios (crear, leer, eliminar, actualizar).
- CRUD para salas (crear, leer, eliminar, actualizar).
- CRUD para mensajes (crear, leer, eliminar, actualizar).
- Sistema de Login (con express-session).
- Encriptación de contraseña (con bicrytjs).
- CORS solo origines permitidos (con cors).
- Chat en tiempo real (con socket.io)
- Sistema de token usando JSON Web Token (con jsonwebtoken)
- Sistema de inactividad de 30 minutos (en FrontEnd y BackEnd).

# Requisitos

* Mongo v7.0.14 o mongo:4.4 (docker)
* Node v18.20
* pnpm v9.9.0
* docker-compose v2.29.2 _(Opcional)_
* docker _(Opcional)_
    - node:18.20-slim
    - mongo:4.4

# Configurar variables de entorno (Obligatorio)

* __Para BackEnd__ 

Acceder a la carpeta de `/express-api` y crear un copia de `.env.example` con nombre de `.env`.

* __Para FrontEnd__ 

Acceder a la carpeta de `/react-vite` y crear un copia de `.env.example` con nombre de `.env`.

``NOTA:``

En caso de que prefiera usar docker o docker-compose para arrancar el proyecto es necesario modificar `localhost` por el IP de la máquina host, por ejemplo: ``192.168.63.80``, para la máquina de Vagrant + Ubuntu20.04.

Las variables de entorno en este caso sería lo siguiente:

### Archivo `.env` para BackEnd

```text
# Ambiente de desarrollo
APP_PORT=5880
APP_URL=http://192.168.63.80
APP_ENV=local
NODE_ENV=development

# MongoDB URI
APP_MONGODB_URI=mongodb://root:secret@service_db/db-cotojs?authSource=admin

# Clave secreta
APP_SECRET_KEY=ssh

# CORS
APP_CORS_1=http://192.168.63.80:5880
APP_CORS_2=http://192.168.63.80:5173
APP_CORS_3=http://192.168.63.80:5173/api/v1

# API Socket.io
APP_CLIENT_SOCKET_IO=http://192.168.63.80:5173
```

### Archivo `.env` para FrontEnd
 
```text
# API Express
VITE_API_URL=http://192.168.63.80:5880/api/v1

# API Socket.io
VITE_SOCKET_IO_DOMAIN=http://192.168.63.80:5880
VITE_SOCKET_IO_PATH=/api/v1/socket.io
```

# Usando pnpm (BackEnd y FrontEnd)

* __Paso 1)__

Ejecuta el siguiente comando desde el directorio `/express-api` para  instalar las dependencias.

```shell
$ pnpm install
```

* __Paso 2)__

Ejecuta el siguiente comando desde el directorio `/express-api` para correr el servicio API RestFul.

```shell
$ pnpm run dev
```

* __Paso 3)__

Ejecuta el siguiente comando desde el directorio `/react-vite` para instalar las dependencias.

```shell
$ pnpm install
```

* __Paso 4)__


Ejecuta el siguiente comando desde el directorio `/react-vite` para correr el servicio React + Vite.

```shell
$ pnpm run dev
```

# Usando docker (BackEnd y FrontEnd)

* __Paso 1)__

Ejecuta el siguiente comando desde el directorio `/express-api` para crear una red y correr el servidor mongodb

```shell
$ docker network create cotojs-network
$ docker run --network cotojs-network --name cotojs-mongodb-run -p 27017:27017 -d mongo:4.4`
```

* __Paso 2)__

Ejecuta el siguiente comando desde el directorio `/express-api`, para crear una imagen y crear un contenedor docker con: Express + Mongoose + Socket.io + JWT + CORS + Multer + etc

```shell
$ docker build -t cotojs-api-build -f api.Dockerfile .
$ docker run --network cotojs-network --name cotojs-api-run -p 5880:5880 -d cotojs-api-build
```

* __Paso 3)__

Ejecuta el siguiente comando desde el directorio `/react-vite`, para crear una imagen y crear un contenedor docker con: React + Vite

```shell
$ docker build -t cotojs-react-build -f react.Dockerfile .
$ docker run --network cotojs-network --name cotojs-react-run -p 5173:3000 -d cotojs-react-build
```

# Usando docker-compose (BackEnd y FrontEnd)

* __Paso 1)__

Ejecuta el siguiente comando desde el directorio raíz `/`, para crear servicios, volumenes y redes de docker-compose 

```shell
$ docker-compose up --build -d
```

* __Paso 2)__

Ejecuta el siguiente comando desde el directorio raíz `/`, para eliminar servicios, volumenes y redes de docker-compose 

```shell
$ docker-compose down
```

# Previews

![preview01.jpg](/screenshots/preview01.jpg)
![preview02.jpg](/screenshots/preview02.jpg)
![preview03.jpg](/screenshots/preview03.jpg)
![preview04.jpg](/screenshots/preview04.jpg)
![preview05.jpg](/screenshots/preview05.jpg)
![preview06.jpg](/screenshots/preview06.jpg)
![preview07.jpg](/screenshots/preview07.jpg)
