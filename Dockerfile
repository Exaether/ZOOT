FROM node:20-alpine AS build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build


FROM node:20-alpine AS prod

WORKDIR /app
COPY package*.json ./
RUN npm install --omit=dev
COPY --from=build /app/build ./build
EXPOSE 3000
CMD ["node", "build"]
