
FROM node:14-alpine

WORKDIR /app
COPY package.json .
RUN yarn install
COPY . .
EXPOSE 8080
CMD [ "node", "./bin/www" ]
