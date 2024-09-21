FROM node:18.20-slim

RUN mkdir -p /home/max98/workspace/express-api

WORKDIR /home/max98/workspace/express-api

COPY package*.json /home/max98/workspace/express-api

RUN npm install -g cross-env pnpm dotenv

RUN npm install 

COPY . .

EXPOSE 5880 5880 

CMD ["pnpm", "start"]


