FROM node:alpine

WORKDIR /app/nginx

COPY package*.json ./

RUN npm install

ENV PORT=8000

EXPOSE 8000:8000

COPY . ./

ENTRYPOINT ["npm", "start"]

