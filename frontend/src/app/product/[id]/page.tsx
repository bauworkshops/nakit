import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { pb, Product, getImageUrl } from '@/lib/pocketbase';
import { Navbar } from '@/components/Navbar';

// Text constants
const BACK_TO_CATALOG = '← Back to catalog';
const COLLECTION_LABEL = 'Collection:';
const TYPE_LABEL = 'Type:';
const COLOR_LABEL = 'Color:';
const FEATURES_LABEL = 'Features:';
const TRANSFORMABLE = 'Transformable';
const STORES_LABEL = 'Stores:';
const ERROR_LOADING_PRODUCT = 'Error loading product';
const LOCALE = 'en-US';

// Get product by ID
async function getProduct(id: string): Promise<Product | null> {
  try {
    const product = await pb.collection('products').getOne<Product>(id, {
      expand: 'collection_id,shop_ids,type_id,color_id',
    });
    
    return product;
  } catch (error) {
    console.error(`${ERROR_LOADING_PRODUCT}:`, error);
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
          {BACK_TO_CATALOG}
        </Link>

        <div className="product-detail-grid">
          {/* Image gallery */}
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

          {/* Product information */}
          <div className="product-details">
            <h1 className="product-detail-title">{product.title}</h1>
            <p className="product-detail-price">{product.price.toLocaleString(LOCALE)} ₽</p>

            {product.description && (
              <div>
                <p className="product-description">{product.description}</p>
              </div>
            )}

            {/* Meta information */}
            <div className="product-meta">
              {product.expand?.collection_id && (
                <div className="meta-item">
                  <span className="meta-label">{COLLECTION_LABEL}</span>
                  <span className="meta-value">{product.expand.collection_id.name}</span>
                </div>
              )}

              {product.expand?.type_id && (
                <div className="meta-item">
                  <span className="meta-label">{TYPE_LABEL}</span>
                  <span className="meta-value">{product.expand.type_id.name}</span>
                </div>
              )}

              {product.expand?.color_id && (
                <div className="meta-item">
                  <span className="meta-label">{COLOR_LABEL}</span>
                  <span className="meta-value">{product.expand.color_id.name}</span>
                </div>
              )}

              {product.is_transformorable && (
                <div className="meta-item">
                  <span className="meta-label">{FEATURES_LABEL}</span>
                  <span className="meta-value">{TRANSFORMABLE}</span>
                </div>
              )}

              {product.expand?.shop_ids && product.expand.shop_ids.length > 0 && (
                <div className="meta-item">
                  <span className="meta-label">{STORES_LABEL}</span>
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

// Disable caching for dynamic content
export const dynamic = 'force-dynamic';

