FROM node:20 as build

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:alpine

COPY --from=build /usr/src/app /usr/share/nginx/html

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]