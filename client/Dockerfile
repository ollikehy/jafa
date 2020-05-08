FROM node:8.16 AS development

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

# CMD ["npm", "run", "build"] for production
CMD ["npm", "start"]