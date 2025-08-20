FROM node:18-alpine AS build

WORKDIR /usr/src/orders-service
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:18-alpine 
WORKDIR /usr/src/orders-service
COPY package*.json ./
RUN npm install --production
COPY --from=build /usr/src/orders-service/dist ./dist
EXPOSE 5002
CMD ["node", "dist/index.js"]
