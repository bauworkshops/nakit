# Backend - Pocketbase

Бэкенд на Pocketbase - готовая база данных с REST API и админ-панелью.

## 🚀 Установка

### Автоматически

```bash
cd backend/scripts
./download-pocketbase.sh
cd ../..
```

### Вручную

1. Скачайте Pocketbase для вашей платформы: https://pocketbase.io/docs/
2. Поместите исполняемый файл `pocketbase` в папку `backend/`
3. Сделайте исполняемым:
```bash
chmod +x backend/pocketbase
```

## 📝 Первый запуск

```bash
cd backend
./pocketbase serve
```

После запуска:
1. Откройте http://127.0.0.1:8090/_/
2. Создайте админ аккаунт (email и пароль)

## 🗄️ Настройка коллекций

### Вариант 1: Импорт схемы (рекомендуется)

1. Settings → Import collections
2. Загрузите файл `backend/pb_schema.json`
3. Нажмите "Import"

### Вариант 2: Ручное создание

Если импорт не работает, создайте коллекции вручную:

#### 1. product_colors

- New collection → Base collection
- Name: `product_colors`
- Fields:
  - **name** (Text, required)
- API Rules:
  - List/View: `` (публичный доступ)
  - Create/Update/Delete: `null` (только админы)

#### 2. product_types

- New collection → Base collection
- Name: `product_types`
- Fields:
  - **name** (Text, required)
- API Rules: аналогично product_colors

#### 3. product_collections

- New collection → Base collection
- Name: `product_collections`
- Fields:
  - **name** (Text, required)
  - **preview_image** (File, max: 1, 5MB, image/*)
- API Rules: аналогично product_colors

#### 4. shops

- New collection → Base collection
- Name: `shops`
- Fields:
  - **name** (Text, required)
  - **hidden** (Bool)
  - **address** (Text)
  - **phone** (Text)
  - **coordinates** (Text)
- API Rules:
  - List/View: `hidden = false || hidden = null`
  - Create/Update/Delete: `null`

#### 5. products

- New collection → Base collection
- Name: `products`
- Fields:
  - **title** (Text, required, min: 1, max: 255)
  - **description** (Text, max: 2000)
  - **price** (Number, required)
  - **hidden** (Bool)
  - **is_transformorable** (Bool)
  - **preview_image** (File, max: 1, 5MB, image/*)
  - **images** (File, max: 10, 5MB, image/*)
  - **collection_id** (Relation → product_collections, single)
  - **type_id** (Relation → product_types, single)
  - **color_id** (Relation → product_colors, single)
  - **shop_ids** (Relation → shops, multiple)
- API Rules:
  - List/View: `hidden = false || hidden = null`
  - Create/Update/Delete: `null`

### Экспорт схемы

После создания коллекций:
1. Settings → Export collections
2. Сохраните JSON
3. Замените `backend/pb_schema.json`

## 🔌 API

API доступен по адресу: http://127.0.0.1:8090/api/

### Эндпоинты коллекций

```
GET /api/collections/products/records
GET /api/collections/products/records/:id
GET /api/collections/product_colors/records
GET /api/collections/product_collections/records
GET /api/collections/product_types/records
GET /api/collections/shops/records
```

### Параметры запросов

**Expand (связи):**
```
GET /api/collections/products/records/:id?expand=collection_id,color_id,type_id,shop_ids
```

**Фильтрация:**
```
GET /api/collections/products/records?filter=(price>10000)
```

**Сортировка:**
```
GET /api/collections/products/records?sort=-created
```

**Пагинация:**
```
GET /api/collections/products/records?page=1&perPage=20
```

### Эндпоинты файлов

```
GET /api/files/:collection/:recordId/:filename
GET /api/files/:collection/:recordId/:filename?thumb=400x400
```

**Примеры:**
```
GET /api/files/products/RECORD_ID/image.jpg
GET /api/files/products/RECORD_ID/image.jpg?thumb=800x800
```

## 🔐 Правила доступа (API Rules)

### Для всех коллекций кроме shops и products

**List Rule:**
```javascript
""  // пусто = публичный доступ
```

**View Rule:**
```javascript
""  // пусто = публичный доступ
```

**Create/Update/Delete Rule:**
```javascript
null  // только админы
```

### Для shops и products

**List Rule:**
```javascript
hidden = false || hidden = null
```

**View Rule:**
```javascript
hidden = false || hidden = null
```

**Create/Update/Delete Rule:**
```javascript
null  // только админы
```

## 🎯 Примеры данных

### Цвета (product_colors)

```
1. Золото 585
2. Золото 750
3. Розовое золото
4. Белое золото
5. Серебро 925
6. Платина
```

### Типы (product_types)

```
1. Кольцо
2. Серьги
3. Браслет
4. Колье
5. Подвеска
6. Цепь
7. Брошь
8. Запонки
```

### Коллекции (product_collections)

```
1. Классика
2. Современность
3. Винтаж
4. Весна 2025
```

### Магазины (shops)

**Центральный:**
- name: "Центральный"
- address: "г. Москва, ул. Тверская, д. 1"
- phone: "+7 (495) 123-45-67"
- coordinates: "55.7558,37.6173"
- hidden: false

**Невский:**
- name: "Невский"
- address: "г. Санкт-Петербург, Невский пр., д. 100"
- phone: "+7 (812) 234-56-78"
- coordinates: "59.9343,30.3351"
- hidden: false

### Товары (products)

**Пример: Золотое кольцо**
```
title: "Кольцо с бриллиантом"
description: "Элегантное золотое кольцо с бриллиантом 0.5 карат. Классический дизайн, идеально для помолвки."
price: 85000
hidden: false
preview_image: (загрузите изображение)
images: (загрузите дополнительные фото)
collection_id: "Классика"
shop_ids: ["Центральный", "Арбатский"]
type_id: "Кольцо"
color_id: "Золото 585"
is_transformorable: false
```

**Пример: Серьги-трансформеры**
```
title: "Серьги-трансформеры с жемчугом"
description: "Уникальные серьги, которые можно носить в двух вариантах: с подвеской или без. Натуральный жемчуг и золото 585 пробы."
price: 45000
hidden: false
preview_image: (загрузите изображение)
images: (загрузите фото разных вариантов)
collection_id: "Современность"
shop_ids: ["Центральный", "Невский"]
type_id: "Серьги"
color_id: "Розовое золото"
is_transformorable: true
```

### Советы по изображениям

Для тестирования:
- Бесплатные стоки: Unsplash, Pexels
- Поиск: "jewelry product photography"
- Размер: минимум 800x800px
- Формат: JPEG или WebP
- Качество: высокое разрешение

## 🔧 Хуки Pocketbase

Файл: `pb_hooks/main.pb.js`

**Примеры использования:**

```javascript
// Перед созданием записи
onRecordBeforeCreateRequest((e) => {
  // Валидация или изменение данных
  e.record.set('someField', 'value');
}, 'products');

// После создания записи
onRecordAfterCreateRequest((e) => {
  // Логирование или триггер других действий
  console.log('Created:', e.record.id);
}, 'products');

// Перед обновлением
onRecordBeforeUpdateRequest((e) => {
  // Логика перед сохранением
}, 'products');

// После удаления
onRecordAfterDeleteRequest((e) => {
  // Очистка связанных данных
}, 'products');
```

## 🚀 Запуск в продакшене

### Базовый запуск

```bash
./pocketbase serve --http="0.0.0.0:8090"
```

### С кастомной директорией данных

```bash
./pocketbase serve --http="0.0.0.0:8090" --dir="/path/to/pb_data"
```

### Systemd сервис

Создайте `/etc/systemd/system/pocketbase.service`:

```ini
[Unit]
Description=Pocketbase Service
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/var/www/nakit/backend
ExecStart=/var/www/nakit/backend/pocketbase serve --http="0.0.0.0:8090"
Restart=on-failure

[Install]
WantedBy=multi-user.target
```

Запуск:
```bash
sudo systemctl enable pocketbase
sudo systemctl start pocketbase
sudo systemctl status pocketbase
```

### Fly.io deployment

Deployment to Fly.io following official guide: https://github.com/pocketbase/pocketbase/discussions/537

### Nginx reverse proxy

```nginx
server {
    listen 80;
    server_name api.yourdomain.com;

    location / {
        proxy_pass http://127.0.0.1:8090;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### Caddy reverse proxy

```
api.yourdomain.com {
    reverse_proxy 127.0.0.1:8090
}
```

## 📂 Структура pb_data

```
pb_data/
├── data.db              # Основная база данных SQLite
├── logs/                # Логи Pocketbase
│   └── requests.log
├── storage/             # Загруженные файлы
│   ├── products/
│   ├── product_collections/
│   └── ...
└── backups/            # Бэкапы (опционально)
```

## 💾 Бэкапы

### Ручной бэкап

```bash
# Остановите Pocketbase
systemctl stop pocketbase

# Скопируйте pb_data
tar -czf backup-$(date +%Y%m%d).tar.gz pb_data/

# Запустите Pocketbase
systemctl start pocketbase
```

### Автоматический бэкап (cron)

```bash
# Добавьте в crontab
0 2 * * * cd /var/www/nakit/backend && tar -czf /backups/pb_data-$(date +\%Y\%m\%d).tar.gz pb_data/
```

## 🐛 Troubleshooting

### Pocketbase не запускается

**Проверьте права:**
```bash
chmod +x backend/pocketbase
```

**Проверьте порт:**
```bash
lsof -i :8090
```

### Ошибки импорта схемы

- Убедитесь что используете последнюю версию Pocketbase
- Проверьте формат `pb_schema.json`
- Создайте коллекции вручную

### Файлы не загружаются

- Проверьте права на `pb_data/storage/`
- Проверьте API rules коллекции
- Проверьте размер файла (макс 5MB)

### CORS ошибки

В настройках Pocketbase добавьте домен фронтенда в allowed origins.

## 📚 Полезные ссылки

- [Официальная документация Pocketbase](https://pocketbase.io/docs/)
- [JavaScript SDK](https://github.com/pocketbase/js-sdk)
- [Go SDK](https://github.com/pocketbase/pocketbase)
- [Community Resources](https://pocketbase.io/community/)
