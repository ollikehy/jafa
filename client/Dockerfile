FROM node:12 AS development

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .
COPY ./public/* ./build

EXPOSE 3000

CMD ["npm", "start"]