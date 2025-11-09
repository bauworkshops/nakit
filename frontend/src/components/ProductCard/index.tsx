import Link from 'next/link';
import Image from 'next/image';
import { Product, getImageUrl } from '@/lib/pocketbase';
import { nameToSlug } from '@/lib/slugUtils';
import styles from './index.module.scss';

// Text constants
const LOCALE = 'en-US';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const imageUrl = product.preview_image
    ? getImageUrl('products', product.id, product.preview_image, '400x400')
    : '/placeholder.svg';

  const productSlug = nameToSlug(product.title);

  // Determine what info to display
  const displayInfo = 
    product.expand?.collection_id?.name || 
    product.expand?.type_id?.name ||
    (product.is_transformorable ? 'Transformable' : null);

  return (
    <Link href={`/product/${productSlug}`} className={`product-card ${styles.card}`}>
      <div className={styles.imageWrapper}>
        <Image
          src={imageUrl}
          alt={product.title}
          fill
          className={styles.image}
          sizes="(max-width: 768px) 50vw, 33vw"
        />
        <div className={styles.overlay}>
          <h3 className={styles.title}>{product.title}</h3>
          {displayInfo && <p className={styles.info}>{displayInfo}</p>}
        </div>
      </div>
    </Link>
  );
}

