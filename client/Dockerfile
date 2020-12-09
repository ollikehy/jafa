FROM node:12 AS development

WORKDIR /app

COPY package*.json ./
COPY ./public/* ./build

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]