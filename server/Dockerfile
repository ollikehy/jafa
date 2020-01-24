FROM node:latest AS development

WORKDIR /app

COPY . .

EXPOSE 8000

RUN npm install

CMD ["npm", "start"]