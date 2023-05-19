FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

RUN npm ci --only=production

COPY config.json config.json
COPY *.yaml .
COPY matchurl.js matchurl.js
COPY index.js index.js

CMD [ "node", "index.js" ]