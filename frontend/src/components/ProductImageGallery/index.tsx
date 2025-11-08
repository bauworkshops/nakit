import Image from 'next/image';
import { getImageUrl } from '@/lib/pocketbase';
import styles from './index.module.scss';

interface ProductImageGalleryProps {
  productId: string;
  productTitle: string;
  images: string[];
}

export function ProductImageGallery({ productId, productTitle, images }: ProductImageGalleryProps) {
  if (images.length === 0) {
    return <div className={styles.mainImageWrapper} style={{ background: '#e0e0e0' }} />;
  }

  return (
    <div className={styles.gallery}>
      <div className={styles.mainImageWrapper}>
        <Image
          src={getImageUrl('products', productId, images[0], '800x800')}
          alt={productTitle}
          fill
          className={styles.image}
          priority
        />
      </div>
      {images.length > 1 && (
        <div className={styles.thumbnailGrid}>
          {images.map((img, idx) => (
            <div key={idx} className={styles.thumbnail}>
              <Image
                src={getImageUrl('products', productId, img, '200x200')}
                alt={`${productTitle} ${idx + 1}`}
                fill
                className={styles.image}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

