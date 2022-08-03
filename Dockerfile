FROM ubuntu:22.04

RUN apt-get update && apt-get upgrade -y
RUN apt-get install -y curl 
RUN curl -fsSL https://deb.nodesource.com/setup_18.x -o nodesource_setup.sh && bash nodesource_setup.sh
RUN apt-get install -y nodejs

RUN apt-get install -y git
RUN git config --global --add safe.directory /home/node/api

RUN npm install -g @nestjs/cli && npm install -g yarn 
RUN npm config set unsafe-perm true

WORKDIR /home/node/api