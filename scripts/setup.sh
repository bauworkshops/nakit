#!/bin/bash

echo "🎨 Nakit - Setup Script"
echo "======================="
echo ""

# Проверка npm
if ! command -v npm &> /dev/null; then
    echo "❌ npm не установлен. Установите Node.js и npm."
    exit 1
fi

echo "📦 Установка зависимостей..."
npm install

echo ""
echo "🔧 Настройка Backend..."

# Создание директории backend если нет
mkdir -p backend

# Проверка наличия Pocketbase
if [ ! -f "backend/pocketbase" ]; then
    echo "⚠️  Pocketbase не найден"
    read -p "Скачать автоматически? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        cd backend/scripts
        ./download-pocketbase.sh
        cd ../..
    else
        echo "📥 Скачайте вручную: https://pocketbase.io/docs/"
        echo "📁 Поместите в: backend/pocketbase"
    fi
fi

echo ""
echo "🔧 Настройка Frontend..."

# Создание .env.local если его нет
if [ ! -f "frontend/.env.local" ]; then
    echo "NEXT_PUBLIC_POCKETBASE_URL=http://127.0.0.1:8090" > frontend/.env.local
    echo "✅ Создан frontend/.env.local"
else
    echo "✓ frontend/.env.local уже существует"
fi

echo ""
echo "✅ Установка завершена!"
echo ""
echo "📋 Следующие шаги:"
echo "1. Запустите Pocketbase: cd backend && ./pocketbase serve"
echo "2. Создайте админ аккаунт: http://127.0.0.1:8090/_/"
echo "3. Импортируйте схему из backend/pb_schema.json"
echo "4. Запустите фронтенд: npm run dev:frontend"
echo ""
echo "Или запустите все сразу: npm run dev"
echo ""

