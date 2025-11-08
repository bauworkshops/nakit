import { pb, Shop } from '@/lib/pocketbase';
import { ShopCard } from '@/components/ShopCard/ShopCard';
import { Navbar } from '@/components/Navbar';
import styles from './page.module.scss';
import utilStyles from '@/styles/utilities.module.scss';

// Text constants
const PAGE_TITLE = 'Shops';
const ERROR_LOADING_SHOPS = 'Error loading shops';
const NO_SHOPS_FOUND = 'No shops found';
const ADD_SHOPS_MESSAGE = 'Add shops through Pocketbase admin panel';

// Get shops on server side
async function getShops(): Promise<Shop[]> {
  try {
    const records = await pb.collection('shops').getFullList<Shop>({
      sort: '-created',
    });
    
    return records;
  } catch (error) {
    console.error(`[ERROR] ${ERROR_LOADING_SHOPS}:`, error);
    return [];
  }
}

export default async function ShopsPage() {
  const shops = await getShops();

  return (
    <div>
      <Navbar />

      <main className={styles.main}>
        <h1 className={styles.pageTitle}>{PAGE_TITLE}</h1>
        
        {shops.length === 0 ? (
          <div className={utilStyles.emptyState}>
            <h2>{NO_SHOPS_FOUND}</h2>
            <p>{ADD_SHOPS_MESSAGE}</p>
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

// Disable caching for dynamic content
export const dynamic = 'force-dynamic';

