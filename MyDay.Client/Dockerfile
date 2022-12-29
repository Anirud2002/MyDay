# Stage 1
FROM node:latest as node
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod

# Stage 2
FROM nginx:alpine
EXPOSE 4200
COPY --from=node /app/dist/my-day.client /usr/share/nginx/html