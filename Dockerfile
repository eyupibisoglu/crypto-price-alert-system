FROM node:22.13-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm i -g @nestjs/cli jest

RUN npm install --production

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["node", "dist/main.js"]
