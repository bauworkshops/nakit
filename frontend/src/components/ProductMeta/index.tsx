'use client';

import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/lib/translations';
import { t, getLocalizedField } from '@/lib/i18nUtils';
import { nameToSlug } from '@/lib/slugUtils';
import styles from './index.module.scss';

interface ProductMetaProps {
  collection?: { name: string };
  type?: { name: string };
  color?: { name: string };
  isTransformable?: boolean;
  shops?: { id: string; name: string }[];
}

export function ProductMeta({ collection, type, color, isTransformable, shops }: ProductMetaProps) {
  const { language } = useLanguage();
  
  return (
    <div className={styles.meta}>
      {collection && (
        <div className={styles.metaItem}>
          <span className={styles.metaLabel}>{t(translations.product.collection, language)}</span>
          <Link 
            href={`/catalogue?collection=${nameToSlug(collection.name)}`}
            className={styles.metaValueLink}
          >
            {getLocalizedField(collection, 'name', language)}
          </Link>
        </div>
      )}

      {type && (
        <div className={styles.metaItem}>
          <span className={styles.metaLabel}>{t(translations.product.type, language)}</span>
          <Link 
            href={`/catalogue?type=${nameToSlug(type.name)}`}
            className={styles.metaValueLink}
          >
            {getLocalizedField(type, 'name', language)}
          </Link>
        </div>
      )}

      {color && (
        <div className={styles.metaItem}>
          <span className={styles.metaLabel}>{t(translations.product.color, language)}</span>
          <Link 
            href={`/catalogue?color=${nameToSlug(color.name)}`}
            className={styles.metaValueLink}
          >
            {getLocalizedField(color, 'name', language)}
          </Link>
        </div>
      )}

      {isTransformable && (
        <div className={styles.metaItem}>
          <span className={styles.metaLabel}>{t(translations.product.features, language)}</span>
          <span className={styles.metaValue}>{t(translations.product.transformable, language)}</span>
        </div>
      )}

      {shops && shops.length > 0 && (
        <div className={styles.metaItem}>
          <span className={styles.metaLabel}>{t(translations.product.stores, language)}</span>
          <span className={styles.metaValue}>
            {shops.map((shop, index) => (
              <span key={shop.id}>
                <Link 
                  href={`/shop/${nameToSlug(shop.name)}`}
                  className={styles.metaValueLink}
                >
                  {getLocalizedField(shop, 'name', language)}
                </Link>
                {index < shops.length - 1 && ', '}
              </span>
            ))}
          </span>
        </div>
      )}
    </div>
  );
}

