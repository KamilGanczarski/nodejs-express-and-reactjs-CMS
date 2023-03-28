FROM node:16-alpine
WORKDIR /usr/src/app
COPY package.json .
COPY . .
RUN npm install
RUN mkdir node_modules/.cache && chmod -R 777 node_modules/.cache
RUN npm rebuild node-sass
