FROM node:12.9.0-alpine as build
WORKDIR '/app'
COPY package.json .
RUN npm install
COPY . .
RUN npm -- run build --output-path=./dist/out

FROM nginx:1.17.1-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist/out /usr/share/nginx/html

