FROM node:alpine as builder

WORKDIR /app

RUN apk update && apk add --no-cache git

COPY package.json tsconfig.json webpack.config.js .yarnrc yarn.lock ./
RUN yarn install --ignore-optional

COPY src/ src/
RUN yarn build:prod


FROM nginx:alpine as runner

COPY --from=builder /app/dist/ /usr/share/nginx/html/
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
