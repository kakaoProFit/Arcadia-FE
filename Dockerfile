FROM node:20.11.1-alpine

COPY . /app
WORKDIR /app

ARG NEXT_PUBLIC_S3_accessKeyId
ARG NEXT_PUBLIC_S3_secretAccessKey
ARG NEXT_PUBLIC_S3_region
ARG NEXT_PUBLIC_S3_bucketName

ENV NEXT_PUBLIC_S3_accessKeyId=$NEXT_PUBLIC_S3_accessKeyId
ENV NEXT_PUBLIC_S3_secretAccessKey=$NEXT_PUBLIC_S3_secretAccessKey
ENV NEXT_PUBLIC_S3_region=$NEXT_PUBLIC_S3_region
ENV NEXT_PUBLIC_S3_bucketName=$NEXT_PUBLIC_S3_bucketName

RUN npm install

RUN npm run build

EXPOSE 3000

CMD [ "npm", "start" ]