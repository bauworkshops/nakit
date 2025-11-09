'use client';

import { useEffect, useState } from 'react';
import { pb, Product } from '@/lib/pocketbase';
import { ProductCard } from '@/components/ProductCard';
import { Navbar } from '@/components/Navbar';
import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/lib/translations';
import { t } from '@/lib/i18nUtils';
import styles from './page.module.scss';
import utilStyles from '@/styles/utilities.module.scss';

// Determine grid layout based on item count
function getGridLayout(count: number): string {
  if (count <= 15) return 'compact';
  if (count <= 30) return 'balanced';
  if (count <= 50) return 'dense';
  return 'mosaic';
}

export default function Home() {
  const { language } = useLanguage();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isCancelled = false;
    const abortController = new AbortController();

    const fetchProducts = async () => {
      try {
        const records = await pb.collection('products').getFullList<Product>({
          expand: 'collection_id,type_id,color_id',
          sort: '-mainpage_order,-created',
          requestKey: 'home-products',
          signal: abortController.signal,
        });
        
        if (isCancelled) return;
        
        setProducts(records);
      } catch (error: any) {
        if (isCancelled || error?.isAbort) return;
        console.error('Error loading products:', error);
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    };

    fetchProducts();

    return () => {
      isCancelled = true;
      abortController.abort();
    };
  }, []);

  if (loading) {
    return (
      <div>
        <Navbar />
        <main>
          <div className={utilStyles.emptyState}>
            <p>{t(translations.common.loading, language)}</p>
          </div>
        </main>
      </div>
    );
  }

  const layoutType = getGridLayout(products.length);

  return (
    <div>
      <Navbar />

      <main>
        {products.length === 0 ? (
          <div className={utilStyles.emptyState}>
            <h2>{t(translations.home.noProducts, language)}</h2>
            <p>{t(translations.home.addProducts, language)}</p>
          </div>
        ) : (
          <div 
            className={`${styles.productsGrid} ${styles[layoutType]}`}
            data-count={products.length}
          >
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

