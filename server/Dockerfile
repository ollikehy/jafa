FROM node:latest AS development

WORKDIR /backend

COPY . .

EXPOSE 8000

RUN npm install

CMD ["npm", "start"]