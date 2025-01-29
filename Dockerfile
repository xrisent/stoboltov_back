# Используем официальное Node.js-образ
FROM node:20-alpine

# Устанавливаем рабочую директорию в контейнере
WORKDIR /app

# Копируем package.json и package-lock.json перед установкой зависимостей
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем все файлы проекта
COPY . .

# Собираем TypeScript-код
RUN npm run build

# Открываем порт, который используется NestJS (обычно 3000)
EXPOSE 3002

# Команда запуска приложения
CMD ["npm", "run", "start:prod"]
