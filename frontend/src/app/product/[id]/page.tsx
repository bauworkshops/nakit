import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { pb, Product, getImageUrl } from '@/lib/pocketbase';
import { Navbar } from '@/components/Navbar';

// Получение товара по ID
async function getProduct(id: string): Promise<Product | null> {
  try {
    const product = await pb.collection('products').getOne<Product>(id, {
      expand: 'collection_id,shop_ids,type_id,color_id',
    });
    
    return product;
  } catch (error) {
    console.error('Ошибка загрузки товара:', error);
    return null;
  }
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id);

  if (!product) {
    notFound();
  }

  // Получаем все изображения (preview + images)
  const allImages = [
    product.preview_image,
    ...(Array.isArray(product.images) ? product.images : [])
  ].filter(Boolean) as string[];

  return (
    <div>
      <Navbar />

      <main className="product-detail">
        <Link href="/" className="back-link">
          ← Назад к каталогу
        </Link>

        <div className="product-detail-grid">
          {/* Галерея изображений */}
          <div className="product-images">
            {allImages.length > 0 ? (
              <>
                <div className="main-image-wrapper">
                  <Image
                    src={getImageUrl('products', product.id, allImages[0], '800x800')}
                    alt={product.title}
                    fill
                    className="product-image"
                    priority
                  />
                </div>
                {allImages.length > 1 && (
                  <div className="thumbnail-grid">
                    {allImages.map((img, idx) => (
                      <div key={idx} className="thumbnail">
                        <Image
                          src={getImageUrl('products', product.id, img, '200x200')}
                          alt={`${product.title} ${idx + 1}`}
                          fill
                          className="product-image"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="main-image-wrapper" style={{ background: '#e0e0e0' }} />
            )}
          </div>

          {/* Информация о товаре */}
          <div className="product-details">
            <h1 className="product-detail-title">{product.title}</h1>
            <p className="product-detail-price">{product.price.toLocaleString('ru-RU')} ₽</p>

            {product.description && (
              <div>
                <p className="product-description">{product.description}</p>
              </div>
            )}

            {/* Мета-информация */}
            <div className="product-meta">
              {product.expand?.collection_id && (
                <div className="meta-item">
                  <span className="meta-label">Коллекция:</span>
                  <span className="meta-value">{product.expand.collection_id.name}</span>
                </div>
              )}

              {product.expand?.type_id && (
                <div className="meta-item">
                  <span className="meta-label">Тип:</span>
                  <span className="meta-value">{product.expand.type_id.name}</span>
                </div>
              )}

              {product.expand?.color_id && (
                <div className="meta-item">
                  <span className="meta-label">Цвет:</span>
                  <span className="meta-value">{product.expand.color_id.name}</span>
                </div>
              )}

              {product.is_transformorable && (
                <div className="meta-item">
                  <span className="meta-label">Особенности:</span>
                  <span className="meta-value">Трансформируемое</span>
                </div>
              )}

              {product.expand?.shop_ids && product.expand.shop_ids.length > 0 && (
                <div className="meta-item">
                  <span className="meta-label">Магазины:</span>
                  <span className="meta-value">
                    {product.expand.shop_ids.map(shop => shop.name).join(', ')}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// Отключаем кеширование для динамического контента
export const dynamic = 'force-dynamic';

