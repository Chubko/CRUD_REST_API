#створити образ node версія 15
FROM node:15
#власник образа
MAINTAINER luda

#створити папку
RUN mkdir /app
#позначити папку як робочу
WORKDIR /app
#скопіювати папку back-end в папку app
COPY ./back-end /app
RUN npm install
#скопіювати файл wait-for-it.sh в кореневу папку
COPY wait-for-it.sh /wait-for-it.sh
#можливість запускатись
RUN chmod +x /wait-for-it.sh
