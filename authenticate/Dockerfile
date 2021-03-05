FROM node:14.15.3-alpine

RUN npm i -g npm

RUN npm g

WORKDIR /usr/src/app


COPY ./app.js ./app.js

COPY package*.json ./

RUN npm install

CMD [ "node", "app.js" ]