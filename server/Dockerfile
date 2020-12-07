FROM node:alpine AS development

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 8000

CMD ["npm", "run", "watch"]