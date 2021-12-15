FROM node:14

WORKDIR /usr/app

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

COPY ./src/database/prisma/schema.prisma ./dist/database/prisma/schema.prisma

RUN npm run prisma:generate