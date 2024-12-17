FROM node:18-alpine

RUN npm config set strict-ssl false
RUN apk add --no-cache bash
RUN npm install -g typescript
RUN npm install -g ts-node
RUN npm install -g @nestjs/cli

WORKDIR /usr/src/app
CMD ["npm","start"]
