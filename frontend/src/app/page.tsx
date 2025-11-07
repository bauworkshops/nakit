import { pb, Product } from '@/lib/pocketbase';
import { ProductCard } from '@/components/ProductCard';
import { Navbar } from '@/components/Navbar';

// Text constants
const ERROR_LOADING_PRODUCTS = 'Error loading products';
const NO_PRODUCTS_FOUND = 'No products found';
const ADD_PRODUCTS_MESSAGE = 'Add products through Pocketbase admin panel';

// Get products on server side
async function getProducts(): Promise<Product[]> {
  try {
    console.log('[DEBUG] PocketBase URL:', process.env.NEXT_PUBLIC_POCKETBASE_URL || 'http://127.0.0.1:8090');
    console.log('[DEBUG] Fetching products...');
    
    const records = await pb.collection('products').getFullList<Product>({
      expand: 'collection_id,type_id,color_id',
    });
    
    console.log('[DEBUG] Products fetched:', records.length);
    return records;
  } catch (error) {
    console.error(`[ERROR] ${ERROR_LOADING_PRODUCTS}:`, error);
    console.error('[ERROR] Error details:', JSON.stringify(error, null, 2));
    return [];
  }
}

export default async function Home() {
  const products = await getProducts();

  return (
    <div>
      <Navbar />

      <main className="container">
        {products.length === 0 ? (
          <div className="empty-state">
            <h2>{NO_PRODUCTS_FOUND}</h2>
            <p>{ADD_PRODUCTS_MESSAGE}</p>
          </div>
        ) : (
          <div className="products-grid">
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

