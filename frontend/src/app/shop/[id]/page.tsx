'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { pb, Shop, getImageUrl } from '@/lib/pocketbase';
import { Navbar } from '@/components/Navbar';
import { GoogleMap } from '@/components/GoogleMap';
import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/lib/translations';
import { t, getLocalizedField } from '@/lib/i18nUtils';
import { nameToSlug } from '@/lib/slugUtils';
import styles from './page.module.scss';

const DEFAULT_LAT = 40.7589;
const DEFAULT_LNG = -73.9851;

export default function ShopDetailPage() {
  const params = useParams();
  const { language } = useLanguage();
  const [shop, setShop] = useState<Shop | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let isCancelled = false;
    const abortController = new AbortController();

    const fetchShop = async () => {
      try {
        const slug = params.id as string;
        const shops = await pb.collection('shops').getFullList<Shop>({
          requestKey: `shop-${slug}`,
          signal: abortController.signal,
        });
        
        if (isCancelled) return;
        
        const foundShop = shops.find(s => nameToSlug(s.name) === slug.toLowerCase());
        
        if (foundShop) {
          setShop(foundShop);
        } else {
          setNotFound(true);
        }
      } catch (error: any) {
        if (isCancelled || error?.isAbort) return;
        console.error('Error loading shop:', error);
        setNotFound(true);
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    };

    fetchShop();

    return () => {
      isCancelled = true;
      abortController.abort();
    };
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

  if (notFound || !shop) {
    return (
      <div>
        <Navbar />
        <main className={styles.detail}>
          <h1>{t(translations.common.notFound, language)}</h1>
          <Link href="/shops">{t(translations.shop.backToShops, language)}</Link>
        </main>
      </div>
    );
  }

  const coords = shop.coordinates ? shop.coordinates.split(',') : [DEFAULT_LAT.toString(), DEFAULT_LNG.toString()];
  const [lat, lng] = coords.length === 2 ? coords : [DEFAULT_LAT.toString(), DEFAULT_LNG.toString()];

  const imageUrl = shop.preview_image
    ? getImageUrl('jkl012shops3456', shop.id, shop.preview_image)
    : null;

  return (
    <div>
      <Navbar />

      <main className={styles.detail}>
        <Link href="/shops" className={styles.backLink}>
          {t(translations.shop.backToShops, language)}
        </Link>

        <div className={styles.content}>
          <div className={styles.info}>
            <h1 className={styles.shopName}>{getLocalizedField(shop, 'name', language)}</h1>

            <div className={styles.detailsGrid}>
              {shop.address && (
                <div className={styles.detailItem}>
                  <h3 className={styles.label}>{t(translations.shop.address, language)}</h3>
                  <p className={styles.value}>{shop.address}</p>
                </div>
              )}

              {shop.phone && (
                <div className={styles.detailItem}>
                  <h3 className={styles.label}>{t(translations.shop.phone, language)}</h3>
                  <p className={styles.value}>
                    <a href={`tel:${shop.phone}`} className={styles.link}>
                      {shop.phone}
                    </a>
                  </p>
                </div>
              )}

              {shop.email && (
                <div className={styles.detailItem}>
                  <h3 className={styles.label}>{t(translations.shop.email, language)}</h3>
                  <p className={styles.value}>
                    <a href={`mailto:${shop.email}`} className={styles.link}>
                      {shop.email}
                    </a>
                  </p>
                </div>
              )}

              {shop.working_hours && (
                <div className={styles.detailItem}>
                  <h3 className={styles.label}>{t(translations.shop.hours, language)}</h3>
                  <p className={styles.value}>{shop.working_hours}</p>
                </div>
              )}

              {imageUrl && (
                <div className={styles.imageWrapper}>
                  <Image
                    src={imageUrl}
                    alt={t(translations.shop.imageAlt, language)}
                    width={600}
                    height={400}
                    className={styles.image}
                    priority
                  />
                </div>
              )}
            </div>
          </div>

          <div className={styles.mapWrapper}>
            <GoogleMap
              lat={parseFloat(lat)}
              lng={parseFloat(lng)}
              title={`${getLocalizedField(shop, 'name', language)} location map`}
              className={styles.map}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

