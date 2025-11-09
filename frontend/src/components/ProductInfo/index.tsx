'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { getLocalizedField } from '@/lib/i18nUtils';
import styles from './index.module.scss';

const LOCALE = 'en-US';

interface ProductInfoProps {
  title: string;
  price: number;
  description?: string;
  product?: any; // Full product object for localization
}

export function ProductInfo({ title, price, description, product }: ProductInfoProps) {
  const { language } = useLanguage();
  
  // Use localized fields if product object is provided
  const localizedTitle = product ? getLocalizedField(product, 'title', language) : title;
  const localizedDescription = product ? getLocalizedField(product, 'description', language) : description;
  
  return (
    <div className={styles.info}>
      <h1 className={styles.title}>{localizedTitle}</h1>
      <p className={styles.price}>{price.toLocaleString(LOCALE)} ₽</p>
      {localizedDescription && (
        <div>
          <p className={styles.description}>{localizedDescription}</p>
        </div>
      )}
    </div>
  );
}

