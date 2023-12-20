# build stage
#FROM node:19.8-alpine as builder

#WORKDIR /home/jp/w0rkspace/farosArgentinos/
#COPY ./package.json /
#RUN npm install
#COPY /farosArgentinos/ .
#RUN npm run build


# production stage
FROM nginx:stable-alpine as production-stage
WORKDIR /
COPY /nginx/default.conf /etc/nginx/conf.d/default.conf
COPY /dist/ /usr/share/nginx/html


CMD ["nginx", "-g", "daemon off;"]  
