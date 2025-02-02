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

RUN mkdir -p /app/ssl && \
    openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
    -keyout /app/ssl/selfsigned.key -out /app/ssl/selfsigned.crt \
    -subj "/C=US/ST=State/L=City/O=Organization/CN=localhost"

# Копируем SSL-сертификаты в контейнер
COPY ssl /app/ssl

# Собираем TypeScript-код
RUN npm run build

# Открываем порты для HTTP и HTTPS
EXPOSE 3002
EXPOSE 3443

# Команда запуска приложения
CMD ["npm", "run", "start:prod"]
