import Link from 'next/link';
import Image from 'next/image';
import { Shop, getImageUrl } from '@/lib/pocketbase';
import styles from './index.module.scss';

// Text constants
const LABEL_ADDRESS = 'Address';
const LABEL_PHONE = 'Phone';
const NO_ADDRESS = 'No address provided';
const NO_PHONE = 'No phone provided';
const SHOP_IMAGE_ALT = 'Shop preview';

interface ShopCardProps {
  shop: Shop;
}

export function ShopCard({ shop }: ShopCardProps) {
  const imageUrl = shop.preview_image
    ? getImageUrl('jkl012shops3456', shop.id, shop.preview_image)
    : null;

  return (
    <Link href={`/shop/${shop.id}`} className={styles.card}>
      {imageUrl && (
        <div className={styles.imageWrapper}>
          <Image
            src={imageUrl}
            alt={SHOP_IMAGE_ALT}
            width={400}
            height={250}
            className={styles.image}
          />
        </div>
      )}
      
      <div className={styles.content}>
        <h3 className={styles.title}>{shop.name}</h3>
        
        {shop.address && (
          <div className={styles.infoRow}>
            <span className={styles.label}>{LABEL_ADDRESS}:</span>
            <span className={styles.value}>{shop.address}</span>
          </div>
        )}
        
        {shop.phone && (
          <div className={styles.infoRow}>
            <span className={styles.label}>{LABEL_PHONE}:</span>
            <span className={styles.value}>{shop.phone}</span>
          </div>
        )}
        
        {!shop.address && !shop.phone && (
          <p className={styles.noInfo}>{NO_ADDRESS} / {NO_PHONE}</p>
        )}
      </div>
    </Link>
  );
}

