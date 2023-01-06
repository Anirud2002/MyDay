# Stage 1
FROM node:18-alpine as node
WORKDIR /app
COPY ./package.json .
RUN npm install
COPY . .
RUN npm run build

# Stage 2
FROM nginx:alpine
EXPOSE 80
COPY --from=node /app/dist/my-day.client /usr/share/nginx/html