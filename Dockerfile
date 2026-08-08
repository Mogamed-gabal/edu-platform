FROM node:20-alpine AS base
WORKDIR /app
COPY package*.json ./

FROM base AS development 
RUN npm ci 
COPY  . .
CMD [ "npm", "run", "start:dev"]

FROM base AS build
RUN npm ci
COPY . .
RUN npm run build
RUN npm prune --production

FROM node:20-alpine AS production
WORKDIR /app
COPY package*.json ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist

EXPOSE 3000
CMD ["node", "dist/main.js"]