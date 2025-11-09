import PocketBase from 'pocketbase';

// Инициализация клиента PocketBase
export const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL || 'http://127.0.0.1:8090');

// Типы для наших коллекций
export interface ProductColor {
  id: string;
  name: string;
  name_rus?: string;
  name_srb?: string;
  color?: string; // CSS color value (hex, rgb, etc.)
  created: string;
  updated: string;
}

export interface ProductCollection {
  id: string;
  name: string;
  name_rus?: string;
  name_srb?: string;
  preview_image?: string;
  created: string;
  updated: string;
}

export interface ProductType {
  id: string;
  name: string;
  name_rus?: string;
  name_srb?: string;
  created: string;
  updated: string;
}

export interface Shop {
  id: string;
  name: string;
  name_rus?: string;
  name_srb?: string;
  hidden?: boolean;
  address?: string;
  phone?: string;
  coordinates?: string;
  email?: string;
  preview_image?: string;
  working_hours?: string;
  created: string;
  updated: string;
}

export interface Registry {
  id: string;
  key: string;
  value: string;
  created: string;
  updated: string;
}

export interface Product {
  id: string;
  title: string;
  title_rus?: string;
  title_srb?: string;
  description?: string;
  description_rus?: string;
  description_srb?: string;
  mainpage_order?: number;
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

export interface Packaging {
  id: string;
  title: string;
  title_rus?: string;
  title_srb?: string;
  description?: string;
  description_rus?: string;
  description_srb?: string;
  preview?: string;
  images?: string[];
  created: string;
  updated: string;
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

