# Используем официальный Node.js-образ
FROM node:20-alpine

# Устанавливаем рабочую директорию в контейнере
WORKDIR /app

# Копируем package.json и package-lock.json перед установкой зависимостей
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем все файлы проекта
COPY . .

# Устанавливаем OpenSSL и создаем SSL-сертификат
RUN apk update && apk add --no-cache openssl

RUN apk add --no-cache openssl && \
    mkdir -p /ssl && \
    openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
    -keyout /ssl/selfsigned.key -out /ssl/selfsigned.crt \
    -subj "/C=US/ST=State/L=City/O=Organization/CN=localhost" && \
    ls -la /ssl

# Собираем TypeScript-код
RUN npm run build

# Открываем порты для HTTP и HTTPS
EXPOSE 3002
EXPOSE 3443

# Команда запуска приложения
CMD ["npm", "run", "start:prod"]
