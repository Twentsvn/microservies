FROM node:18-alpine AS build

WORKDIR /usr/src/users-service
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:18-alpine 
WORKDIR /usr/src/users-service
COPY package*.json ./
RUN npm install --production
COPY --from=build /usr/src/users-service/dist ./dist
EXPOSE 5001
CMD ["node", "dist/index.js"]
