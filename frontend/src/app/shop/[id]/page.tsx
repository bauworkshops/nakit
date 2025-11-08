import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { pb, Shop, getImageUrl } from '@/lib/pocketbase';
import { Navbar } from '@/components/Navbar';
import { GoogleMap } from '@/components/GoogleMap';
import styles from './page.module.scss';

// Revalidate every 30 minutes (1800 seconds)
export const revalidate = 1800;

// Text constants
const BACK_TO_SHOPS = '← To shops';
const ERROR_LOADING_SHOP = 'Error loading shop';
const LABEL_ADDRESS = 'Address';
const LABEL_PHONE = 'Phone';
const LABEL_EMAIL = 'Email';
const LABEL_HOURS = 'Working Hours';
const NO_INFO = 'Not provided';
const SHOP_IMAGE_ALT = 'Shop image';

// Default coordinates (fallback if no coordinates provided)
const DEFAULT_LAT = 40.7589;
const DEFAULT_LNG = -73.9851;

// Get shop by ID
async function getShop(id: string): Promise<Shop | null> {
  try {
    const shop = await pb.collection('shops').getOne<Shop>(id);
    return shop;
  } catch (error) {
    console.error(`${ERROR_LOADING_SHOP}:`, error);
    return null;
  }
}

export default async function ShopDetailPage({ params }: { params: { id: string } }) {
  const shop = await getShop(params.id);

  if (!shop) {
    notFound();
  }

  // Parse coordinates
  const coords = shop.coordinates ? shop.coordinates.split(',') : [DEFAULT_LAT.toString(), DEFAULT_LNG.toString()];
  const [lat, lng] = coords.length === 2 ? coords : [DEFAULT_LAT.toString(), DEFAULT_LNG.toString()];

  // Get image URL if preview_image exists
  const imageUrl = shop.preview_image
    ? getImageUrl('jkl012shops3456', shop.id, shop.preview_image)
    : null;

  return (
    <div>
      <Navbar />

      <main className={styles.detail}>
        <Link href="/shops" className={styles.backLink}>
          {BACK_TO_SHOPS}
        </Link>

        <div className={styles.content}>
          <div className={styles.info}>
            <h1 className={styles.shopName}>{shop.name}</h1>

            {imageUrl && (
              <div className={styles.imageWrapper}>
                <Image
                  src={imageUrl}
                  alt={SHOP_IMAGE_ALT}
                  width={600}
                  height={400}
                  className={styles.image}
                  priority
                />
              </div>
            )}

            <div className={styles.detailsGrid}>
              {shop.address && (
                <div className={styles.detailItem}>
                  <h3 className={styles.label}>{LABEL_ADDRESS}</h3>
                  <p className={styles.value}>{shop.address}</p>
                </div>
              )}

              {shop.phone && (
                <div className={styles.detailItem}>
                  <h3 className={styles.label}>{LABEL_PHONE}</h3>
                  <p className={styles.value}>
                    <a href={`tel:${shop.phone}`} className={styles.link}>
                      {shop.phone}
                    </a>
                  </p>
                </div>
              )}

              {shop.email && (
                <div className={styles.detailItem}>
                  <h3 className={styles.label}>{LABEL_EMAIL}</h3>
                  <p className={styles.value}>
                    <a href={`mailto:${shop.email}`} className={styles.link}>
                      {shop.email}
                    </a>
                  </p>
                </div>
              )}

              {shop.working_hours && (
                <div className={styles.detailItem}>
                  <h3 className={styles.label}>{LABEL_HOURS}</h3>
                  <p className={styles.value}>{shop.working_hours}</p>
                </div>
              )}
            </div>
          </div>

          <div className={styles.mapWrapper}>
            <GoogleMap
              lat={parseFloat(lat)}
              lng={parseFloat(lng)}
              title={`${shop.name} location map`}
              className={styles.map}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

// Disable caching for dynamic content
export const dynamic = 'force-dynamic';

