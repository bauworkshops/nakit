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
  shops?: { name: string }[];
}

export function ProductMeta({ collection, type, color, isTransformable, shops }: ProductMetaProps) {
  return (
    <div className={styles.meta}>
      {collection && (
        <div className={styles.metaItem}>
          <span className={styles.metaLabel}>{COLLECTION_LABEL}</span>
          <span className={styles.metaValue}>{collection.name}</span>
        </div>
      )}

      {type && (
        <div className={styles.metaItem}>
          <span className={styles.metaLabel}>{TYPE_LABEL}</span>
          <span className={styles.metaValue}>{type.name}</span>
        </div>
      )}

      {color && (
        <div className={styles.metaItem}>
          <span className={styles.metaLabel}>{COLOR_LABEL}</span>
          <span className={styles.metaValue}>{color.name}</span>
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
            {shops.map(shop => shop.name).join(', ')}
          </span>
        </div>
      )}
    </div>
  );
}

