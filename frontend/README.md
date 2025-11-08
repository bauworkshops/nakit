# Frontend - Next.js

Фронтенд приложение на Next.js 14 с TypeScript и Server Components.

## 🚀 Установка

```bash
npm install
```

## ⚙️ Переменные окружения

Создайте файл `.env.local`:

```bash
NEXT_PUBLIC_POCKETBASE_URL=http://127.0.0.1:8090
```

Для продакшена создайте `.env.production`:
```bash
NEXT_PUBLIC_POCKETBASE_URL=https://your-api-domain.com
```

## 💻 Запуск

### Development

```bash
npm run dev
```

Откройте http://localhost:3000

### Production

```bash
npm run build
npm run start
```

## 📁 Структура проекта

```
src/
├── app/                    # Страницы (App Router)
│   ├── layout.tsx         # Корневой layout
│   ├── page.tsx           # Главная страница
│   ├── loading.tsx        # Loading UI
│   ├── error.tsx          # Error boundary
│   ├── not-found.tsx      # 404 страница
│   ├── globals.css        # Глобальные стили
│   └── product/           # Раздел товаров
│       └── [id]/
│           ├── page.tsx   # Детальная страница товара
│           └── loading.tsx
│
├── components/            # React компоненты
│   ├── Navbar.tsx        # Навигация
│   └── ProductCard.tsx   # Карточка товара
│
└── lib/                   # Утилиты
    └── pocketbase.ts     # API клиент + TypeScript типы
```

## 🛠 Технологии

- **Next.js 14** - React фреймворк с App Router
- **React 18** - UI библиотека
- **TypeScript 5.5** - типизация
- **Pocketbase SDK** - клиент для API
- **CSS3** - стилизация

## 📦 API Integration

### Инициализация клиента

```typescript
import { pb } from '@/lib/pocketbase';
```

### Получение данных

```typescript
import { pb, Product } from '@/lib/pocketbase';

// Получить все товары
const products = await pb.collection('products').getFullList<Product>({
  sort: '-created',
});

// Получить один товар
const product = await pb.collection('products').getOne<Product>(id);

// Получить с expand (связи)
const product = await pb.collection('products').getOne<Product>(id, {
  expand: 'collection_id,color_id,type_id,shop_ids',
});

// Фильтрация
const filtered = await pb.collection('products').getList<Product>(1, 20, {
  filter: 'price > 10000 && hidden = false',
});
```

### Работа с изображениями

```typescript
import { getImageUrl } from '@/lib/pocketbase';

// Основное использование
const url = getImageUrl(
  'products',        // название коллекции
  product.id,        // ID записи
  product.preview_image,  // имя файла
  '400x400'         // размер превью (опционально)
);

// В компоненте Image
<Image
  src={getImageUrl('products', product.id, product.preview_image, '800x800')}
  alt={product.title}
  width={800}
  height={800}
/>
```

## 🎨 Компоненты

### ProductCard

Карточка товара для отображения в сетке.

**Props:**
```typescript
interface ProductCardProps {
  product: Product;
}
```

**Использование:**
```tsx
import { ProductCard } from '@/components/ProductCard';

<ProductCard product={product} />
```

### Navbar

Навигационная панель приложения.

**Использование:**
```tsx
import { Navbar } from '@/components/Navbar';

<Navbar />
```

## 📝 TypeScript типы

Все типы описаны в `src/lib/pocketbase.ts`:

### Product
```typescript
export interface Product {
  id: string;
  title: string;
  description?: string;
  price: number;
  hidden?: boolean;
  preview_image?: string;
  images?: string[];
  collection_id?: string;
  shop_ids?: string[];
  type_id?: string;
  color_id?: string;
  is_transformorable?: boolean;
  created: string;
  updated: string;
}
```

### ProductColor
```typescript
export interface ProductColor {
  id: string;
  name: string;
  created: string;
  updated: string;
}
```

### ProductType
```typescript
export interface ProductType {
  id: string;
  name: string;
  created: string;
  updated: string;
}
```

### ProductCollection
```typescript
export interface ProductCollection {
  id: string;
  name: string;
  preview_image?: string;
  created: string;
  updated: string;
}
```

### Shop
```typescript
export interface Shop {
  id: string;
  name: string;
  address?: string;
  phone?: string;
  coordinates?: string;
  hidden?: boolean;
  created: string;
  updated: string;
}
```

## 🎨 Стили

Глобальные стили в `src/app/globals.css`.

### Готовые классы

```css
.container       /* Контейнер с max-width */
.navbar          /* Навигационная панель */
.products-grid   /* Сетка товаров */
.product-card    /* Карточка товара */
.loading         /* Состояние загрузки */
.error           /* Состояние ошибки */
```

### Цветовая схема

```css
:root {
  --color-primary: #c1a549;    /* Primary gold */
  --color-accent: #c0a448;     /* Accent gold */
  --color-bg: #fafafa;         /* Background */
  --color-white: #ffffff;      /* White */
  --color-text: #6d6c6c;       /* Primary text */
  --color-text-light: #999999; /* Light text/secondary */
  --color-text-dark: #222222;  /* Dark text/headings */
  --color-error: #e74c3c;      /* Error state */
  --color-link: #0066cc;       /* Links */
  --color-link-hover: #0052a3; /* Link hover */
  --color-border: #f5f5f5;     /* Borders/dividers */
}
```

### Адаптивность

Breakpoints:
- Mobile: до 768px
- Tablet: 768px - 1024px
- Desktop: 1024px+

## 📄 Создание страниц

### Базовая страница

```tsx
// app/mypage/page.tsx
export default function MyPage() {
  return (
    <div className="container">
      <h1>Моя страница</h1>
    </div>
  );
}
```

### Страница с данными (Server Component)

```tsx
// app/products/page.tsx
import { pb, Product } from '@/lib/pocketbase';

export default async function ProductsPage() {
  const products = await pb.collection('products').getFullList<Product>();
  
  return (
    <div className="container">
      <h1>Товары</h1>
      <div className="products-grid">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
```

### Динамическая страница

```tsx
// app/product/[id]/page.tsx
import { pb, Product } from '@/lib/pocketbase';

interface Props {
  params: { id: string };
}

export default async function ProductPage({ params }: Props) {
  const product = await pb.collection('products').getOne<Product>(params.id);
  
  return (
    <div className="container">
      <h1>{product.title}</h1>
      <p>{product.description}</p>
    </div>
  );
}
```

### Loading состояние

```tsx
// app/product/[id]/loading.tsx
export default function Loading() {
  return (
    <div className="loading">
      <p>Загрузка...</p>
    </div>
  );
}
```

### Error boundary

```tsx
// app/product/[id]/error.tsx
'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="error">
      <h2>Что-то пошло не так!</h2>
      <button onClick={() => reset()}>Попробовать снова</button>
    </div>
  );
}
```

## 🔧 Разработка

### Добавление нового компонента

1. Создайте файл в `src/components/`:
```tsx
// src/components/MyComponent.tsx
export function MyComponent() {
  return <div>Мой компонент</div>;
}
```

2. Используйте в страницах:
```tsx
import { MyComponent } from '@/components/MyComponent';

<MyComponent />
```

### Добавление новых типов

В `src/lib/pocketbase.ts`:
```typescript
export interface MyNewType {
  id: string;
  name: string;
  created: string;
  updated: string;
}
```

### Работа с формами (Client Component)

```tsx
'use client';

import { useState } from 'react';

export function MyForm() {
  const [value, setValue] = useState('');
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Ваша логика
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input 
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button type="submit">Отправить</button>
    </form>
  );
}
```

## 🚀 Деплой

### Vercel (рекомендуется)

1. Установите Vercel CLI:
```bash
npm i -g vercel
```

2. Деплой:
```bash
cd frontend
vercel --prod
```

3. Добавьте environment variables в Vercel Dashboard:
```
NEXT_PUBLIC_POCKETBASE_URL=https://your-api-domain.com
```

### Netlify

1. Установите Netlify CLI:
```bash
npm i -g netlify-cli
```

2. Деплой:
```bash
cd frontend
npm run build
netlify deploy --prod
```

### Custom VPS

1. Соберите приложение:
```bash
npm run build
```

2. Запустите:
```bash
npm run start
```

3. Используйте PM2 для автозапуска:
```bash
npm i -g pm2
pm2 start npm --name "nakit-frontend" -- start
pm2 save
pm2 startup
```

### Docker

Dockerfile уже настроен:
```bash
docker build -t nakit-frontend .
docker run -p 3000:3000 nakit-frontend
```

## 🐛 Troubleshooting

### Ошибки подключения к API

**Проблема:** Cannot connect to Pocketbase

**Решение:**
1. Проверьте `.env.local`
2. Убедитесь что Pocketbase запущен
3. Проверьте URL в переменной окружения

### Изображения не загружаются

**Проблема:** Images return 404

**Решение:**
1. Проверьте `next.config.mjs` - должен быть домен Pocketbase в `remotePatterns`
2. Убедитесь что файлы загружены в Pocketbase
3. Проверьте API rules коллекции

### TypeScript ошибки

**Проблема:** Type errors

**Решение:**
```bash
rm -rf node_modules
rm package-lock.json
npm install
```

### Build ошибки

**Проблема:** Build fails

**Решение:**
1. Проверьте все environment variables
2. Выполните `npm run lint`
3. Проверьте что все типы корректны

## 🧪 Линтинг

```bash
# Проверка
npm run lint

# Автофикс
npm run lint -- --fix
```

## 📚 Полезные ссылки

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Pocketbase JS SDK](https://github.com/pocketbase/js-sdk)
