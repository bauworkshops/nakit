import { pb, ProductCollection } from '@/lib/pocketbase';
import { CollectionCard } from '@/components/CollectionCard/CollectionCard';
import { Navbar } from '@/components/Navbar';
import styles from './page.module.scss';
import utilStyles from '@/styles/utilities.module.scss';

// Text constants
const PAGE_TITLE = 'Collections';
const ERROR_LOADING_COLLECTIONS = 'Error loading collections';
const NO_COLLECTIONS_FOUND = 'No collections found';
const ADD_COLLECTIONS_MESSAGE = 'Add collections through Pocketbase admin panel';

// Get collections on server side
async function getCollections(): Promise<ProductCollection[]> {
  try {
    const records = await pb.collection('product_collections').getFullList<ProductCollection>({
      sort: '-created',
    });
    
    return records;
  } catch (error) {
    console.error(`[ERROR] ${ERROR_LOADING_COLLECTIONS}:`, error);
    return [];
  }
}

export default async function CollectionsPage() {
  const collections = await getCollections();

  return (
    <div>
      <Navbar />

      <main className={styles.main}>
        <h1 className={styles.pageTitle}>{PAGE_TITLE}</h1>
        
        {collections.length === 0 ? (
          <div className={utilStyles.emptyState}>
            <h2>{NO_COLLECTIONS_FOUND}</h2>
            <p>{ADD_COLLECTIONS_MESSAGE}</p>
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

// Disable caching for dynamic content
export const dynamic = 'force-dynamic';

