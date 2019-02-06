FROM node:alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

ENV PORT=3000

EXPOSE 3000:3000

COPY . .

ENTRYPOINT ["npm", "start"]

