# Stage 1
FROM node:latest as node
WORKDIR /app
COPY ./package.json .
RUN npm install
COPY . .
RUN npm run build

# Stage 2
FROM nginx:alpine
COPY --from=node /app/dist/my-day.client /usr/share/nginx/html