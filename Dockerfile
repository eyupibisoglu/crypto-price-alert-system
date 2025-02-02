FROM node:22.13-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm i -g @nestjs/cli jest@29.7.0

RUN npm install

COPY . .

RUN npm run test

RUN npm run build

EXPOSE 3000

CMD ["node", "dist/main.js"]
