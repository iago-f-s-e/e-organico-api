FROM node:18-alpine

RUN npm install -g @nestjs/cli

USER node

WORKDIR /home/node/api