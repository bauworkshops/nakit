import Image from 'next/image';
import { pb, Packaging, getImageUrl } from '@/lib/pocketbase';
import { Navbar } from '@/components/Navbar';
import ReactMarkdown from 'react-markdown';
import styles from './page.module.scss';
import utilStyles from '@/styles/utilities.module.scss';

// Revalidate every 30 minutes (1800 seconds)
export const revalidate = 1800;

// Text constants
const PAGE_TITLE = 'Packaging';
const ERROR_LOADING_PACKAGING = 'Error loading packaging';
const NO_ITEMS_FOUND = 'No packaging items found';
const ADD_ITEMS_MESSAGE = 'Add packaging through Pocketbase admin panel';

// Get packaging items on server side
async function getPackaging(): Promise<Packaging[]> {
  try {
    const records = await pb.collection('packaging').getFullList<Packaging>({
      sort: '-created',
    });
    
    return records;
  } catch (error) {
    console.error(`[ERROR] ${ERROR_LOADING_PACKAGING}:`, error);
    return [];
  }
}

export default async function PackagingPage() {
  const items = await getPackaging();

  return (
    <div>
      <Navbar />

      <main className={styles.main}>
        <h1 className={styles.pageTitle}>{PAGE_TITLE}</h1>

        {items.length === 0 ? (
          <div className={utilStyles.emptyState}>
            <h2>{NO_ITEMS_FOUND}</h2>
            <p>{ADD_ITEMS_MESSAGE}</p>
          </div>
        ) : (
          <div className={styles.packagingList}>
            {items.map((item) => (
              <article key={item.id} className={styles.packagingItem}>
                <div className={styles.itemHeader}>
                  <h2 className={styles.itemTitle}>{item.title}</h2>
                </div>

                {item.preview && (
                  <div className={styles.previewImage}>
                    <Image
                      src={getImageUrl('packaging', item.id, item.preview)}
                      alt={item.title}
                      width={1200}
                      height={500}
                      className={styles.previewImg}
                    />
                  </div>
                )}

                {item.description && (
                  <div className={styles.itemDescription}>
                    <ReactMarkdown>{item.description}</ReactMarkdown>
                  </div>
                )}

                {item.images && item.images.length > 0 && (
                  <div className={styles.itemGallery}>
                    {item.images.map((image, index) => (
                      <div key={index} className={styles.galleryItem}>
                        <Image
                          src={getImageUrl('packaging', item.id, image)}
                          alt={`${item.title} - ${index + 1}`}
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

// Disable caching for dynamic content
export const dynamic = 'force-dynamic';

