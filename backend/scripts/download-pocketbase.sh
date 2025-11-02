#!/bin/bash

# Скрипт для автоматической загрузки Pocketbase

VERSION="0.22.0"
PLATFORM=""

# Определение платформы
if [[ "$OSTYPE" == "linux-gnu"* ]]; then
    ARCH=$(uname -m)
    if [[ "$ARCH" == "x86_64" ]]; then
        PLATFORM="linux_amd64"
    elif [[ "$ARCH" == "aarch64" ]]; then
        PLATFORM="linux_arm64"
    fi
elif [[ "$OSTYPE" == "darwin"* ]]; then
    ARCH=$(uname -m)
    if [[ "$ARCH" == "x86_64" ]]; then
        PLATFORM="darwin_amd64"
    elif [[ "$ARCH" == "arm64" ]]; then
        PLATFORM="darwin_arm64"
    fi
fi

if [ -z "$PLATFORM" ]; then
    echo "❌ Неподдерживаемая платформа: $OSTYPE"
    echo "📥 Скачайте вручную с: https://github.com/pocketbase/pocketbase/releases"
    exit 1
fi

FILENAME="pocketbase_${VERSION}_${PLATFORM}.zip"
URL="https://github.com/pocketbase/pocketbase/releases/download/v${VERSION}/${FILENAME}"

echo "🔍 Платформа: $PLATFORM"
echo "📦 Версия: $VERSION"
echo "⬇️  Загрузка Pocketbase..."

cd "$(dirname "$0")/.." || exit

if [ -f "pocketbase" ]; then
    echo "⚠️  Pocketbase уже существует"
    read -p "Перезаписать? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 0
    fi
fi

wget -q --show-progress "$URL" || {
    echo "❌ Ошибка загрузки"
    exit 1
}

echo "📂 Распаковка..."
unzip -q "$FILENAME"
rm "$FILENAME"

chmod +x pocketbase

echo "✅ Pocketbase установлен!"
echo "🚀 Запустите: ./pocketbase serve"

