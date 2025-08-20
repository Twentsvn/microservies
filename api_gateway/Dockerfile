FROM node:18-alpine AS build

WORKDIR /usr/src/api_gateway
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# --- PRODUCTION image ---
FROM node:18-alpine
WORKDIR /usr/src/api_gateway

#install deps
COPY package*.json ./
RUN npm install --production
COPY --from=build /usr/src/api_gateway/dist ./dist
COPY .env .env

#run compiled code
EXPOSE 8080
CMD ["node", "dist/index.js"]
