# build stage
FROM node:19.8-alpine as builder

WORKDIR /home/jp/nginx/nginx-image/
COPY /farosArgentinos/package.json /
RUN echo npm -v
RUN npm install
COPY /farosArgentinos/ .
RUN npm run buildx


# production stage
FROM nginx:stable-alpine as production-stage
WORKDIR /home/jp/nginx/nginx-image/
COPY farosArgentinos/dist/ /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]  
    