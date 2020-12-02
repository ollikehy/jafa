FROM node:latest AS production
#FROM node:latest AS development

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 8000

CMD ["npm", "start"]
#CMD ["npm", "run", "watch"]