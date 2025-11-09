import Link from 'next/link';
import Image from 'next/image';
import { Product, getImageUrl } from '@/lib/pocketbase';
import { nameToSlug } from '@/lib/slugUtils';
import styles from './index.module.scss';

const LOCALE = 'en-US';
const VIEW_DETAILS = 'View Details';

interface ProductListCardProps {
  product: Product;
}

export function ProductListCard({ product }: ProductListCardProps) {
  const imageUrl = product.preview_image
    ? getImageUrl('products', product.id, product.preview_image, '400x400')
    : '/placeholder.svg';

  const collection = product.expand?.collection_id;
  const type = product.expand?.type_id;
  const color = product.expand?.color_id;
  
  const productSlug = nameToSlug(product.title);

  return (
    <Link href={`/product/${productSlug}`} className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image
          src={imageUrl}
          alt={product.title}
          fill
          className={styles.image}
          sizes="(max-width: 768px) 200px, 250px"
        />
      </div>
      
      <div className={styles.content}>
        <h3 className={styles.title}>{product.title}</h3>
        
        <div className={styles.details}>
          {collection && (
            <span className={styles.detail}>
              <span className={styles.detailLabel}>Collection:</span> {collection.name}
            </span>
          )}
          {type && (
            <span className={styles.detail}>
              <span className={styles.detailLabel}>Type:</span> {type.name}
            </span>
          )}
          {color && (
            <span className={styles.detail}>
              <span className={styles.detailLabel}>Color:</span> {color.name}
            </span>
          )}
        </div>

        <div className={styles.footer}>
          <span className={styles.price}>{product.price.toLocaleString(LOCALE)} ₽</span>
        </div>
      </div>
    </Link>
  );
}

