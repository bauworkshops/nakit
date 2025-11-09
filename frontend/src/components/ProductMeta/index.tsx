import Link from 'next/link';
import { nameToSlug } from '@/lib/slugUtils';
import styles from './index.module.scss';

// Text constants
const COLLECTION_LABEL = 'Collection:';
const TYPE_LABEL = 'Type:';
const COLOR_LABEL = 'Color:';
const FEATURES_LABEL = 'Features:';
const TRANSFORMABLE = 'Transformable';
const STORES_LABEL = 'Stores:';

interface ProductMetaProps {
  collection?: { name: string };
  type?: { name: string };
  color?: { name: string };
  isTransformable?: boolean;
  shops?: { id: string; name: string }[];
}

export function ProductMeta({ collection, type, color, isTransformable, shops }: ProductMetaProps) {
  return (
    <div className={styles.meta}>
      {collection && (
        <div className={styles.metaItem}>
          <span className={styles.metaLabel}>{COLLECTION_LABEL}</span>
          <Link 
            href={`/catalogue?collection=${nameToSlug(collection.name)}`}
            className={styles.metaValueLink}
          >
            {collection.name}
          </Link>
        </div>
      )}

      {type && (
        <div className={styles.metaItem}>
          <span className={styles.metaLabel}>{TYPE_LABEL}</span>
          <Link 
            href={`/catalogue?type=${nameToSlug(type.name)}`}
            className={styles.metaValueLink}
          >
            {type.name}
          </Link>
        </div>
      )}

      {color && (
        <div className={styles.metaItem}>
          <span className={styles.metaLabel}>{COLOR_LABEL}</span>
          <Link 
            href={`/catalogue?color=${nameToSlug(color.name)}`}
            className={styles.metaValueLink}
          >
            {color.name}
          </Link>
        </div>
      )}

      {isTransformable && (
        <div className={styles.metaItem}>
          <span className={styles.metaLabel}>{FEATURES_LABEL}</span>
          <span className={styles.metaValue}>{TRANSFORMABLE}</span>
        </div>
      )}

      {shops && shops.length > 0 && (
        <div className={styles.metaItem}>
          <span className={styles.metaLabel}>{STORES_LABEL}</span>
          <span className={styles.metaValue}>
            {shops.map((shop, index) => (
              <span key={shop.id}>
                <Link 
                  href={`/shop/${nameToSlug(shop.name)}`}
                  className={styles.metaValueLink}
                >
                  {shop.name}
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

