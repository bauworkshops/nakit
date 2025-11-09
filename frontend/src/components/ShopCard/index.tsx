'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Shop, getImageUrl } from '@/lib/pocketbase';
import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/lib/translations';
import { t, getLocalizedField } from '@/lib/i18nUtils';
import { nameToSlug } from '@/lib/slugUtils';
import styles from './index.module.scss';

interface ShopCardProps {
  shop: Shop;
}

export function ShopCard({ shop }: ShopCardProps) {
  const { language } = useLanguage();
  
  const imageUrl = shop.preview_image
    ? getImageUrl('jkl012shops3456', shop.id, shop.preview_image)
    : null;

  const shopName = getLocalizedField(shop, 'name', language);
  const shopSlug = nameToSlug(shop.name);

  return (
    <Link href={`/shop/${shopSlug}`} className={styles.card}>
      {imageUrl && (
        <div className={styles.imageWrapper}>
          <Image
            src={imageUrl}
            alt={t(translations.shop.imageAlt, language)}
            width={400}
            height={250}
            className={styles.image}
          />
        </div>
      )}
      
      <div className={styles.content}>
        <h3 className={styles.title}>{shopName}</h3>
        
        {shop.address && (
          <div className={styles.infoRow}>
            <span className={styles.label}>{t(translations.shop.address, language)}:</span>
            <span className={styles.value}>{shop.address}</span>
          </div>
        )}
        
        {shop.phone && (
          <div className={styles.infoRow}>
            <span className={styles.label}>{t(translations.shop.phone, language)}:</span>
            <span className={styles.value}>{shop.phone}</span>
          </div>
        )}
        
        {!shop.address && !shop.phone && (
          <p className={styles.noInfo}>
            {t(translations.shop.noAddress, language)} / {t(translations.shop.noPhone, language)}
          </p>
        )}
      </div>
    </Link>
  );
}

