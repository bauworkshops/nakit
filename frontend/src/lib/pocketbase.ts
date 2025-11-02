import PocketBase from 'pocketbase';

// Инициализация клиента PocketBase
export const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL || 'http://127.0.0.1:8090');

// Типы для наших коллекций
export interface ProductColor {
  id: string;
  name: string;
  created: string;
  updated: string;
}

export interface ProductCollection {
  id: string;
  name: string;
  preview_image?: string;
  created: string;
  updated: string;
}

export interface ProductType {
  id: string;
  name: string;
  created: string;
  updated: string;
}

export interface Shop {
  id: string;
  name: string;
  hidden?: boolean;
  address?: string;
  phone?: string;
  coordinates?: string;
  created: string;
  updated: string;
}

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
  // Расширенные данные из связей
  expand?: {
    collection_id?: ProductCollection;
    shop_ids?: Shop[];
    type_id?: ProductType;
    color_id?: ProductColor;
  };
}

// Утилита для получения URL изображения
export function getImageUrl(
  collectionId: string,
  recordId: string,
  filename: string,
  thumb?: string
): string {
  if (!filename) return '';
  
  const baseUrl = process.env.NEXT_PUBLIC_POCKETBASE_URL || 'http://127.0.0.1:8090';
  const params = thumb ? `?thumb=${thumb}` : '';
  
  return `${baseUrl}/api/files/${collectionId}/${recordId}/${filename}${params}`;
}

