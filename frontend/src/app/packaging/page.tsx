'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { pb, Packaging, getImageUrl } from '@/lib/pocketbase';
import { Navbar } from '@/components/Navbar';
import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/lib/translations';
import { t, getLocalizedField } from '@/lib/i18nUtils';
import ReactMarkdown from 'react-markdown';
import styles from './page.module.scss';
import utilStyles from '@/styles/utilities.module.scss';

export default function PackagingPage() {
  const { language } = useLanguage();
  const [items, setItems] = useState<Packaging[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isCancelled = false;
    const abortController = new AbortController();

    const fetchPackaging = async () => {
      try {
        const records = await pb.collection('packaging').getFullList<Packaging>({
          sort: '-created',
          requestKey: 'packaging-list',
          signal: abortController.signal,
        });
        
        if (isCancelled) return;
        
        setItems(records);
      } catch (error: any) {
        if (isCancelled || error?.isAbort) return;
        console.error('Error loading packaging:', error);
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    };

    fetchPackaging();

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
      </div>
    );
  }

  return (
    <div>
      <Navbar />

      <main className={styles.main}>
        <h1 className={styles.pageTitle}>{t(translations.packaging.title, language)}</h1>

        {items.length === 0 ? (
          <div className={utilStyles.emptyState}>
            <h2>{t(translations.packaging.noItems, language)}</h2>
          </div>
        ) : (
          <div className={styles.packagingList}>
            {items.map((item) => (
              <article key={item.id} className={styles.packagingItem}>
                <div className={styles.itemHeader}>
                  <h2 className={styles.itemTitle}>{getLocalizedField(item, 'title', language)}</h2>
                </div>

                {item.preview && (
                  <div className={styles.previewImage}>
                    <Image
                      src={getImageUrl('packaging', item.id, item.preview)}
                      alt={getLocalizedField(item, 'title', language)}
                      width={1200}
                      height={500}
                      className={styles.previewImg}
                    />
                  </div>
                )}

                {item.description && (
                  <div className={styles.itemDescription}>
                    <ReactMarkdown>{getLocalizedField(item, 'description', language)}</ReactMarkdown>
                  </div>
                )}

                {item.images && item.images.length > 0 && (
                  <div className={styles.itemGallery}>
                    {item.images.map((image, index) => (
                      <div key={index} className={styles.galleryItem}>
                        <Image
                          src={getImageUrl('packaging', item.id, image)}
                          alt={`${getLocalizedField(item, 'title', language)} - ${index + 1}`}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className={styles.galleryImg}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

