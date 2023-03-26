FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

RUN npm ci --only=production

COPY index.js index.js

CMD [ "node", "index.js" ]