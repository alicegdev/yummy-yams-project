FROM node:20

WORKDIR /usr/src/api

COPY package.json .
COPY tsconfig.json .

RUN npm install\
    && npm install -g typescript

COPY . .

RUN tsc

EXPOSE 3001

CMD [ "node", "dist/app.js" ]

