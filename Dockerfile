FROM node:20-alpine

ENV TZ Asia/Bangkok

WORKDIR /usr/src/app

COPY package.json yarn.lock /usr/src/app/

RUN yarn

COPY . /usr/src/app/

RUN npx prisma generate

RUN yarn build

EXPOSE 8080

CMD ["yarn", "start:prod"]