import { pb, Product } from '@/lib/pocketbase';
import { ProductCard } from '@/components/ProductCard';
import { Navbar } from '@/components/Navbar';
import styles from './page.module.scss';
import utilStyles from '@/styles/utilities.module.scss';

// Revalidate every 30 minutes (1800 seconds)
export const revalidate = 1800;

// Text constants
const PAGE_TITLE = 'Catalogue';
const ERROR_LOADING_PRODUCTS = 'Error loading products';
const NO_PRODUCTS_FOUND = 'No products found';
const ADD_PRODUCTS_MESSAGE = 'Add products through Pocketbase admin panel';

// Get products on server side
async function getProducts(): Promise<Product[]> {
  try {
    const records = await pb.collection('products').getFullList<Product>({
      expand: 'collection_id,type_id,color_id',
    });
    
    return records;
  } catch (error) {
    return [];
  }
}

export default async function CataloguePage() {
  const products = await getProducts();

  return (
    <div>
      <Navbar />

      <main className={styles.main}>
        <h1 className={styles.pageTitle}>{PAGE_TITLE}</h1>
        
        {products.length === 0 ? (
          <div className={utilStyles.emptyState}>
            <h2>{NO_PRODUCTS_FOUND}</h2>
            <p>{ADD_PRODUCTS_MESSAGE}</p>
          </div>
        ) : (
          <div className={styles.productsGrid}>
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

// Disable caching for dynamic content
export const dynamic = 'force-dynamic';

