'use client';

import { useEffect, useState } from 'react';
import { pb, ProductCollection } from '@/lib/pocketbase';
import { CollectionCard } from '@/components/CollectionCard';
import { Navbar } from '@/components/Navbar';
import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/lib/translations';
import { t } from '@/lib/i18nUtils';
import styles from './page.module.scss';
import utilStyles from '@/styles/utilities.module.scss';

export default function CollectionsPage() {
  const { language } = useLanguage();
  const [collections, setCollections] = useState<ProductCollection[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const records = await pb.collection('product_collections').getFullList<ProductCollection>({
          sort: '-created',
        });
        setCollections(records);
      } catch (error) {
        console.error('Error loading collections:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCollections();
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
        <h1 className={styles.pageTitle}>{t(translations.collections.title, language)}</h1>
        
        {collections.length === 0 ? (
          <div className={utilStyles.emptyState}>
            <h2>{t(translations.collections.noCollections, language)}</h2>
          </div>
        ) : (
          <div className={styles.collectionsGrid}>
            {collections.map((collection) => (
              <CollectionCard key={collection.id} collection={collection} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

