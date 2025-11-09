'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Product, getImageUrl } from '@/lib/pocketbase';
import { useLanguage } from '@/contexts/LanguageContext';
import { getLocalizedField } from '@/lib/i18nUtils';
import { nameToSlug } from '@/lib/slugUtils';
import styles from './index.module.scss';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { language } = useLanguage();
  
  const imageUrl = product.preview_image
    ? getImageUrl('products', product.id, product.preview_image, '400x400')
    : '/placeholder.svg';

  const title = getLocalizedField(product, 'title', language);
  const productSlug = nameToSlug(product.title);

  return (
    <Link href={`/product/${productSlug}`} className={`product-card ${styles.card}`}>
      <div className={styles.imageWrapper}>
        <Image
          src={imageUrl}
          alt={title}
          fill
          className={styles.image}
          sizes="(max-width: 768px) 50vw, 33vw"
        />
        <div className={styles.overlay}>
          <h3 className={styles.title}>{title}</h3>
        </div>
      </div>
    </Link>
  );
}

