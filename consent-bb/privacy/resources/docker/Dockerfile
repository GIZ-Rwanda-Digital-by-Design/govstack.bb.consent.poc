# Stage 1 - the build process
FROM node:8.15.0-jessie as build-deps
WORKDIR /usr/src/app
COPY package.json ./
COPY package-lock.json ./
RUN npm ci
COPY . ./
CMD npm run start

# # Stage 2 - the production environment
# FROM nginx:1.15.12-alpine
# COPY --from=build-deps /usr/src/app/build /usr/share/nginx/html
# COPY resources/config/nginx.conf /etc/nginx/conf.d/default.conf
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]
