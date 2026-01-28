'use client';

import { useEffect, useState } from 'react';
import { pb, Shop } from '@/lib/pocketbase';
import { ShopCard } from '@/components/ShopCard';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/lib/translations';
import { t } from '@/lib/i18nUtils';
import styles from './page.module.scss';
import utilStyles from '@/styles/utilities.module.scss';

export default function ShopsPage() {
  const { language } = useLanguage();
  const [shops, setShops] = useState<Shop[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isCancelled = false;
    const abortController = new AbortController();

    const fetchShops = async () => {
      try {
        const records = await pb.collection('shops').getFullList<Shop>({
          sort: '-created',
          requestKey: 'shops-list',
          signal: abortController.signal,
        });
        
        if (isCancelled) return;
        
        setShops(records);
      } catch (error: any) {
        if (isCancelled || error?.isAbort) return;
        console.error('Error loading shops:', error);
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    };

    fetchShops();

    return () => {
      isCancelled = true;
      abortController.abort();
    };
  }, []);

  if (loading) {
    return (
      <div>
        <Navbar />
        <main className={styles.main}>
          <div className={utilStyles.emptyState}>
            <p>{t(translations.common.loading, language)}</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Navbar />

      <main className={styles.main}>
        <h1 className={styles.pageTitle}>{t(translations.shops.title, language)}</h1>
        
        {shops.length === 0 ? (
          <div className={utilStyles.emptyState}>
            <h2>{t(translations.shops.noShops, language)}</h2>
          </div>
        ) : (
          <div className={styles.shopsGrid}>
            {shops.map((shop) => (
              <ShopCard key={shop.id} shop={shop} />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

