import { pb, Product } from '@/lib/pocketbase';
import { ProductCard } from '@/components/ProductCard';
import { Navbar } from '@/components/Navbar';

// Получение товаров на сервере
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
    console.error('[ERROR] Ошибка загрузки товаров:', error);
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
            <h2>Товары не найдены</h2>
            <p>Добавьте товары через админ-панель Pocketbase</p>
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

// Отключаем кеширование для динамического контента
export const dynamic = 'force-dynamic';

