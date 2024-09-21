FROM node:18.20-slim

RUN mkdir -p /home/max98/workspace/vite-react

WORKDIR /home/max98/workspace/vite-react

COPY package.json /home/max98/workspace/vite-react

RUN npm install

RUN npm install -g serve

COPY . .

RUN npm run build

EXPOSE 5173 3000

CMD ["serve","-s","dist"]
