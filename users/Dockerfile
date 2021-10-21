FROM node:alpine

WORKDIR /app
COPY package.json ./
RUN npm install
COPY ./dist ./

CMD ["npm", "start"]