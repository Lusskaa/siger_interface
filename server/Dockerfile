FROM node:14.18

LABEL maintainer="siger"

WORKDIR /var/opt/siger
COPY . .

RUN npm i

EXPOSE 8000

CMD npm run dev