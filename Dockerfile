FROM node:14.17.0-alpine3.12

WORKDIR /app

COPY package.json ./

RUN yarn

COPY . .

CMD ["node", "src/index.js"]