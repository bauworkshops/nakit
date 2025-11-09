'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { pb, Product } from '@/lib/pocketbase';
import { Navbar } from '@/components/Navbar';
import { ProductImageGallery } from '@/components/ProductImageGallery';
import { ProductInfo } from '@/components/ProductInfo';
import { ProductMeta } from '@/components/ProductMeta';
import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/lib/translations';
import { t } from '@/lib/i18nUtils';
import { nameToSlug } from '@/lib/slugUtils';
import styles from '../ProductDetail.module.scss';

export default function ProductPage() {
  const params = useParams();
  const { language } = useLanguage();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const slug = params.id as string;
        const products = await pb.collection('products').getFullList<Product>({
          expand: 'collection_id,shop_ids,type_id,color_id',
        });
        const foundProduct = products.find(p => nameToSlug(p.title) === slug.toLowerCase());
        
        if (foundProduct) {
          setProduct(foundProduct);
        } else {
          setNotFound(true);
        }
      } catch (error) {
        console.error('Error loading product:', error);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params.id]);

  if (loading) {
    return (
      <div>
        <Navbar />
        <main className={styles.detail}>
          <p>{t(translations.common.loading, language)}</p>
        </main>
      </div>
    );
  }

  if (notFound || !product) {
    return (
      <div>
        <Navbar />
        <main className={styles.detail}>
          <h1>{t(translations.common.notFound, language)}</h1>
          <Link href="/catalogue">{t(translations.product.backToCatalogue, language)}</Link>
        </main>
      </div>
    );
  }

  const allImages = [
    product.preview_image,
    ...(Array.isArray(product.images) ? product.images : [])
  ].filter(Boolean) as string[];

  return (
    <div>
      <Navbar />

      <main className={styles.detail}>
        <Link href="/catalogue" className={styles.backLink}>
          {t(translations.product.backToCatalogue, language)}
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
              product={product}
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

