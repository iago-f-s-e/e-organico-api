FROM node:18-alpine

RUN npm install -g @nestjs/cli

USER root

WORKDIR /home/api