import Link from 'next/link';
import Image from 'next/image';
import { Product, getImageUrl } from '@/lib/pocketbase';
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

  return (
    <Link href={`/product/${product.id}`} className={styles.card}>
      <div className={`product-card ${styles.imageWrapper}`}>
        <Image
          src={imageUrl}
          alt={product.title}
          fill
          className={styles.image}
          sizes="(max-width: 768px) 50vw, 33vw"
        />
        <div className={styles.overlay}>
          <h3 className={styles.title}>{product.title}</h3>
          <p className={styles.price}>{product.price.toLocaleString(LOCALE)} ₽</p>
        </div>
      </div>
    </Link>
  );
}

