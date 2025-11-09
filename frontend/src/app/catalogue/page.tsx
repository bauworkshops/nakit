'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { pb, Product } from '@/lib/pocketbase';
import { ProductListCard } from '@/components/ProductListCard';
import { ProductFilter, FilterState } from '@/components/ProductFilter';
import { Navbar } from '@/components/Navbar';
import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/lib/translations';
import { t } from '@/lib/i18nUtils';
import { 
  filtersToSearchParams, 
  searchParamsToFilters, 
  getDefaultFilters,
  FilterOption as BaseFilterOption
} from '@/lib/filterUtils';
import styles from './page.module.scss';
import utilStyles from '@/styles/utilities.module.scss';

interface FilterOption extends BaseFilterOption {
  disabled?: boolean;
}

export default function CataloguePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { language } = useLanguage();
  
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [allCollections, setAllCollections] = useState<FilterOption[]>([]);
  const [allTypes, setAllTypes] = useState<FilterOption[]>([]);
  const [allColors, setAllColors] = useState<FilterOption[]>([]);
  const [availableOptions, setAvailableOptions] = useState<{
    collectionIds: Set<string>;
    typeIds: Set<string>;
    colorIds: Set<string>;
  }>({
    collectionIds: new Set(),
    typeIds: new Set(),
    colorIds: new Set(),
  });
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState<FilterState>(getDefaultFilters());

  // Initialize filters from URL on mount
  useEffect(() => {
    // Only parse URL once collections/types/colors are loaded
    if (allCollections.length && allTypes.length && allColors.length) {
      const urlFilters = searchParamsToFilters(searchParams, allCollections, allTypes, allColors);
      setFilters(urlFilters);
    }
  }, [searchParams, allCollections, allTypes, allColors]);

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
        setAllCollections(collectionsData);
        setAllTypes(typesData);
        setAllColors(colorsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Apply filters and sort, calculate available options
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

    // Calculate available options based on current filters
    // For each filter dimension, calculate what's available from products that match OTHER filters
    
    // Available collections (based on type, color, price, transformorable)
    let productsForCollections = [...products];
    if (filters.typeId) productsForCollections = productsForCollections.filter(p => p.type_id === filters.typeId);
    if (filters.colorId) productsForCollections = productsForCollections.filter(p => p.color_id === filters.colorId);
    if (filters.minPrice) productsForCollections = productsForCollections.filter(p => p.price >= parseFloat(filters.minPrice));
    if (filters.maxPrice) productsForCollections = productsForCollections.filter(p => p.price <= parseFloat(filters.maxPrice));
    if (filters.isTransformorable === 'true') productsForCollections = productsForCollections.filter(p => p.is_transformorable === true);
    else if (filters.isTransformorable === 'false') productsForCollections = productsForCollections.filter(p => !p.is_transformorable);

    // Available types (based on collection, color, price, transformorable)
    let productsForTypes = [...products];
    if (filters.collectionId) productsForTypes = productsForTypes.filter(p => p.collection_id === filters.collectionId);
    if (filters.colorId) productsForTypes = productsForTypes.filter(p => p.color_id === filters.colorId);
    if (filters.minPrice) productsForTypes = productsForTypes.filter(p => p.price >= parseFloat(filters.minPrice));
    if (filters.maxPrice) productsForTypes = productsForTypes.filter(p => p.price <= parseFloat(filters.maxPrice));
    if (filters.isTransformorable === 'true') productsForTypes = productsForTypes.filter(p => p.is_transformorable === true);
    else if (filters.isTransformorable === 'false') productsForTypes = productsForTypes.filter(p => !p.is_transformorable);

    // Available colors (based on collection, type, price, transformorable)
    let productsForColors = [...products];
    if (filters.collectionId) productsForColors = productsForColors.filter(p => p.collection_id === filters.collectionId);
    if (filters.typeId) productsForColors = productsForColors.filter(p => p.type_id === filters.typeId);
    if (filters.minPrice) productsForColors = productsForColors.filter(p => p.price >= parseFloat(filters.minPrice));
    if (filters.maxPrice) productsForColors = productsForColors.filter(p => p.price <= parseFloat(filters.maxPrice));
    if (filters.isTransformorable === 'true') productsForColors = productsForColors.filter(p => p.is_transformorable === true);
    else if (filters.isTransformorable === 'false') productsForColors = productsForColors.filter(p => !p.is_transformorable);

    setAvailableOptions({
      collectionIds: new Set(productsForCollections.map(p => p.collection_id).filter((id): id is string => !!id)),
      typeIds: new Set(productsForTypes.map(p => p.type_id).filter((id): id is string => !!id)),
      colorIds: new Set(productsForColors.map(p => p.color_id).filter((id): id is string => !!id)),
    });

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

  // Handle filter changes and update URL
  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
    
    // Update URL with new filters using human-readable names
    const queryString = filtersToSearchParams(newFilters, allCollections, allTypes, allColors);
    const newUrl = queryString ? `/catalogue?${queryString}` : '/catalogue';
    router.push(newUrl, { scroll: false });
  };

  if (loading) {
    return (
      <div>
        <Navbar />
        <main className={styles.main}>
          <div className={utilStyles.emptyState}>
            <p>{t(translations.catalogue.loadingProducts, language)}</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div>
      <Navbar />

      <main className={styles.main}>
        <h1 className={styles.pageTitle}>{t(translations.catalogue.title, language)}</h1>
        
        {products.length === 0 ? (
          <div className={utilStyles.emptyState}>
            <h2>{t(translations.catalogue.noProducts, language)}</h2>
          </div>
        ) : (
          <>
            <ProductFilter
              filters={filters}
              onFilterChange={handleFilterChange}
              collections={allCollections.map(c => ({
                ...c,
                disabled: !availableOptions.collectionIds.has(c.id),
              }))}
              types={allTypes.map(t => ({
                ...t,
                disabled: !availableOptions.typeIds.has(t.id),
              }))}
              colors={allColors.map(c => ({
                ...c,
                disabled: !availableOptions.colorIds.has(c.id),
              }))}
            />

            <div className={styles.resultsCount}>
              {filteredProducts.length} {t(translations.catalogue.resultsCount, language)}
            </div>

            {filteredProducts.length === 0 ? (
              <div className={utilStyles.emptyState}>
                <h2>{t(translations.catalogue.noProducts, language)}</h2>
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

