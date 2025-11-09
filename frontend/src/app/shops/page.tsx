'use client';

import { useEffect, useState } from 'react';
import { pb, Shop } from '@/lib/pocketbase';
import { ShopCard } from '@/components/ShopCard';
import { Navbar } from '@/components/Navbar';
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
    const fetchShops = async () => {
      try {
        const records = await pb.collection('shops').getFullList<Shop>({
          sort: '-created',
        });
        setShops(records);
      } catch (error) {
        console.error('Error loading shops:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchShops();
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
    </div>
  );
}

