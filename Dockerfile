FROM node:18-alpine

ENV TZ Asia/Bangkok

WORKDIR /usr/src/app

COPY package.json yarn.lock /usr/src/app/

RUN yarn

COPY . .

RUN npx prisma generate

RUN yarn build

EXPOSE 8080

CMD ["yarn", "start:prod"]