FROM node:20.11.1-alpine

COPY . /app
WORKDIR /app

RUN apk add --no-cache rename
RUN find . -depth -exec rename 's/(.*)\/([^\/]*)/$1\/\L$2/' {} \;

RUN npm install

RUN npm run build

EXPOSE 3000

CMD [ "npm", "start" ]