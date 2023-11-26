FROM node:16.18.1 AS builder
WORKDIR /app
COPY . ./
RUN rm -rf node modules and package-lock.json
RUN npm install --legacy-peer-deps
RUN npm rebuild node-sass
ARG VALUES="development"
RUN if [ "$VALUES" = "development" ] ; then PUBLIC_URL=https://onthefly-dev.contus.us/ npm run buildDevelop ;elif [ "$VALUES" = "uat" ] ; then PUBLIC_URL=https://onthefly-uat.contus.us/ npm run builduat  ;elif [ "$VALUES" = "qa" ] ; then PUBLIC_URL=https://onthefly-qa.contus.us/ npm run buildQA ;elif [ "$VALUES" = "prod" ] ; then PUBLIC_URL=https://console.onthefly.stream/ npm run buildProduction; fi
# For the production environment COPY to Nginx webserver document root
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
