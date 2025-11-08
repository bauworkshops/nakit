'use client';

import { useEffect, useState } from 'react';
import { pb, Product } from '@/lib/pocketbase';
import { ProductListCard } from '@/components/ProductListCard';
import { ProductFilter, FilterState } from '@/components/ProductFilter';
import { Navbar } from '@/components/Navbar';
import styles from './page.module.scss';
import utilStyles from '@/styles/utilities.module.scss';

const PAGE_TITLE = 'Catalogue';
const NO_PRODUCTS_FOUND = 'No products found';
const ADD_PRODUCTS_MESSAGE = 'Add products through Pocketbase admin panel';
const LOADING_MESSAGE = 'Loading products...';
const RESULTS_COUNT = 'products found';

interface FilterOption {
  id: string;
  name: string;
}

export default function CataloguePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [collections, setCollections] = useState<FilterOption[]>([]);
  const [types, setTypes] = useState<FilterOption[]>([]);
  const [colors, setColors] = useState<FilterOption[]>([]);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState<FilterState>({
    collectionId: '',
    typeId: '',
    colorId: '',
    minPrice: '',
    maxPrice: '',
    isTransformorable: '',
    sortBy: 'newest',
  });

  // Fetch data on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsData, collectionsData, typesData, colorsData] = await Promise.all([
          pb.collection('products').getFullList<Product>({
            expand: 'collection_id,type_id,color_id',
          }),
          pb.collection('product_collections').getFullList<FilterOption>(),
          pb.collection('product_types').getFullList<FilterOption>(),
          pb.collection('product_colors').getFullList<FilterOption>(),
        ]);

        setProducts(productsData);
        setCollections(collectionsData);
        setTypes(typesData);
        setColors(colorsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Apply filters and sort
  useEffect(() => {
    let result = [...products];

    // Filter by collection
    if (filters.collectionId) {
      result = result.filter(p => p.collection_id === filters.collectionId);
    }

    // Filter by type
    if (filters.typeId) {
      result = result.filter(p => p.type_id === filters.typeId);
    }

    // Filter by color
    if (filters.colorId) {
      result = result.filter(p => p.color_id === filters.colorId);
    }

    // Filter by price range
    if (filters.minPrice) {
      const minPrice = parseFloat(filters.minPrice);
      result = result.filter(p => p.price >= minPrice);
    }
    if (filters.maxPrice) {
      const maxPrice = parseFloat(filters.maxPrice);
      result = result.filter(p => p.price <= maxPrice);
    }

    // Filter by transformorable
    if (filters.isTransformorable === 'true') {
      result = result.filter(p => p.is_transformorable === true);
    } else if (filters.isTransformorable === 'false') {
      result = result.filter(p => !p.is_transformorable);
    }

    // Sort
    switch (filters.sortBy) {
      case 'newest':
        result.sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime());
        break;
      case 'oldest':
        result.sort((a, b) => new Date(a.created).getTime() - new Date(b.created).getTime());
        break;
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'title-asc':
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'title-desc':
        result.sort((a, b) => b.title.localeCompare(a.title));
        break;
    }

    setFilteredProducts(result);
  }, [products, filters]);

  if (loading) {
    return (
      <div>
        <Navbar />
        <main className={styles.main}>
          <div className={utilStyles.emptyState}>
            <p>{LOADING_MESSAGE}</p>
          </div>
        </main>
      </div>
    );
  }

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
          <>
            <ProductFilter
              filters={filters}
              onFilterChange={setFilters}
              collections={collections}
              types={types}
              colors={colors}
            />

            <div className={styles.resultsCount}>
              {filteredProducts.length} {RESULTS_COUNT}
            </div>

            {filteredProducts.length === 0 ? (
              <div className={utilStyles.emptyState}>
                <h2>{NO_PRODUCTS_FOUND}</h2>
              </div>
            ) : (
              <div className={styles.productsList}>
                {filteredProducts.map((product) => (
                  <ProductListCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}

