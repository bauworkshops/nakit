import Link from 'next/link';
import Image from 'next/image';
import { ProductCollection, getImageUrl } from '@/lib/pocketbase';
import { nameToSlug } from '@/lib/slugUtils';
import styles from './index.module.scss';

interface CollectionCardProps {
  collection: ProductCollection;
}

export function CollectionCard({ collection }: CollectionCardProps) {
  const imageUrl = collection.preview_image
    ? getImageUrl('product_collections', collection.id, collection.preview_image, '400x400')
    : '/placeholder.svg';

  const collectionSlug = nameToSlug(collection.name);
  const catalogueUrl = `/catalogue?collection=${collectionSlug}`;

  return (
    <Link href={catalogueUrl} className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image
          src={imageUrl}
          alt={collection.name}
          fill
          className={styles.image}
          sizes="(max-width: 768px) 50vw, 33vw"
        />
        <div className={styles.overlay}>
          <h3 className={styles.title}>{collection.name}</h3>
        </div>
      </div>
    </Link>
  );
}

