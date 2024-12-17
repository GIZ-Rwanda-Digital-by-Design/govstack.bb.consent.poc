FROM node:20.18.1-alpine

RUN npm config set strict-ssl false
RUN apk add --no-cache bash
WORKDIR /usr/src/app
COPY package.json ./
COPY package-lock.json ./
RUN npm ci
COPY . ./

WORKDIR /usr/src/app
CMD ["npm","start"]
