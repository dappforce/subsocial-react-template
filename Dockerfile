FROM node:latest
WORKDIR /app

COPY . .

RUN npm install && npm run build

ENTRYPOINT ["npm", "run", "start"]