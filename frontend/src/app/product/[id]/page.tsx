import Link from 'next/link';
import { notFound } from 'next/navigation';
import { pb, Product } from '@/lib/pocketbase';
import { Navbar } from '@/components/Navbar';
import { ProductImageGallery } from '@/components/ProductImageGallery';
import { ProductInfo } from '@/components/ProductInfo';
import { ProductMeta } from '@/components/ProductMeta';
import styles from '../ProductDetail.module.scss';

// Text constants
const BACK_TO_CATALOG = '← To catalogue';
const ERROR_LOADING_PRODUCT = 'Error loading product';

// Get product by ID
async function getProduct(id: string): Promise<Product | null> {
  try {
    const product = await pb.collection('products').getOne<Product>(id, {
      expand: 'collection_id,shop_ids,type_id,color_id',
    });
    
    return product;
  } catch (error) {
    console.error(`${ERROR_LOADING_PRODUCT}:`, error);
    return null;
  }
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id);

  if (!product) {
    notFound();
  }

  // Получаем все изображения (preview + images)
  const allImages = [
    product.preview_image,
    ...(Array.isArray(product.images) ? product.images : [])
  ].filter(Boolean) as string[];

  return (
    <div>
      <Navbar />

      <main className={styles.detail}>
        <Link href="/catalogue" className={styles.backLink}>
          {BACK_TO_CATALOG}
        </Link>

        <div className={styles.grid}>
          <ProductImageGallery
            productId={product.id}
            productTitle={product.title}
            images={allImages}
          />

          <div className={styles.detailsWrapper}>
            <ProductInfo
              title={product.title}
              price={product.price}
              description={product.description}
            />

            <ProductMeta
              collection={product.expand?.collection_id}
              type={product.expand?.type_id}
              color={product.expand?.color_id}
              isTransformable={product.is_transformorable}
              shops={product.expand?.shop_ids}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

// Disable caching for dynamic content
export const dynamic = 'force-dynamic';

