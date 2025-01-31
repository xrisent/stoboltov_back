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

# Копируем SSL-сертификаты в контейнер
COPY ssl /app/ssl

# Собираем TypeScript-код
RUN npm run build

# Открываем порты для HTTP и HTTPS
EXPOSE 3002
EXPOSE 3443

# Команда запуска приложения
CMD ["npm", "run", "start:prod"]
