FROM node:10-alpine

EXPOSE 3001

ARG NODE_ENV
ENV NODE_ENV $NODE_ENV

RUN mkdir /app
WORKDIR /app
ADD package.json /app/
RUN yarn --pure-lockfile
ADD . /app

CMD ["yarn", "start"]
