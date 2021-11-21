FROM node:14

WORKDIR /usr/app

COPY package.json .

COPY src/infra/database/prisma/schema.prisma ./dist/infra/database/prisma/schema.prisma

RUN npm install

COPY . .

RUN npm run build && npm run prisma:generate