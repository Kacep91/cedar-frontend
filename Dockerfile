# Используйте официальный образ Node.js для сборки приложения
FROM node:14

# Установите рабочую директорию в контейнере
WORKDIR /app

# Копируйте файл package.json и package-lock.json (если есть)
COPY package*.json ./

# Установите зависимости приложения
RUN npm install

# Копируйте исходный код приложения в контейнер
COPY . .

# Соберите приложение для production
RUN npm run build:prod

# Используйте официальный образ nginx для запуска приложения
FROM nginx:stable-alpine

# Копируйте сборку приложения из предыдущего этапа в папку nginx
COPY --from=0 /app/build /usr/share/nginx/html

# Откройте порт 80 для прослушивания
EXPOSE 80

# Запустите nginx
CMD ["nginx", "-g", "daemon off;"]