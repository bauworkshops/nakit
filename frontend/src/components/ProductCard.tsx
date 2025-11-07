import Link from 'next/link';
import Image from 'next/image';
import { Product, getImageUrl } from '@/lib/pocketbase';

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
    <Link href={`/product/${product.id}`}>
      <div className="product-card">
        <div className="product-image-wrapper">
          <Image
            src={imageUrl}
            alt={product.title}
            fill
            className="product-image"
            sizes="(max-width: 768px) 50vw, 33vw"
          />
        </div>
        <div className="product-info">
          <h3 className="product-title">{product.title}</h3>
          <p className="product-price">{product.price.toLocaleString(LOCALE)} ₽</p>
        </div>
      </div>
    </Link>
  );
}

