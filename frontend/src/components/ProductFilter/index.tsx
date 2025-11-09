'use client';

import { useState, useEffect } from 'react';
import styles from './index.module.scss';

const FILTER_TITLE = 'Filter Products';
const COLLECTION_LABEL = 'Collection';
const TYPE_LABEL = 'Type';
const COLOR_LABEL = 'Color';
const PRICE_LABEL = 'Price Range';
const TRANSFORMORABLE_LABEL = 'Transformable';
const ALL_OPTION = 'All';
const YES_OPTION = 'Yes';
const NO_OPTION = 'No';
const MIN_PRICE_PLACEHOLDER = 'Min';
const MAX_PRICE_PLACEHOLDER = 'Max';
const RESET_FILTERS = 'Reset Filters';
const SORT_LABEL = 'Sort By';

const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'title-asc', label: 'Name: A-Z' },
  { value: 'title-desc', label: 'Name: Z-A' },
];

export interface FilterState {
  collectionId: string;
  typeId: string;
  colorId: string;
  minPrice: string;
  maxPrice: string;
  isTransformorable: string;
  sortBy: string;
}

interface FilterOption {
  id: string;
  name: string;
  disabled?: boolean;
}

interface ProductFilterProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  collections: FilterOption[];
  types: FilterOption[];
  colors: FilterOption[];
}

export function ProductFilter({ 
  filters, 
  onFilterChange,
  collections,
  types,
  colors,
}: ProductFilterProps) {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleChange = (key: keyof FilterState, value: string) => {
    onFilterChange({ ...filters, [key]: value });
  };

  const handleReset = () => {
    onFilterChange({
      collectionId: '',
      typeId: '',
      colorId: '',
      minPrice: '',
      maxPrice: '',
      isTransformorable: '',
      sortBy: 'newest',
    });
  };

  const hasActiveFilters = 
    filters.collectionId || 
    filters.typeId || 
    filters.colorId || 
    filters.minPrice || 
    filters.maxPrice || 
    filters.isTransformorable;

  return (
    <div className={`${styles.filterContainer} ${isSticky ? styles.sticky : ''}`}>
      <div className={styles.filterWrapper}>
        <div className={styles.header}>
          <h2 className={styles.title}>{FILTER_TITLE}</h2>
          {hasActiveFilters && (
            <button onClick={handleReset} className={styles.resetButton}>
              {RESET_FILTERS}
            </button>
          )}
        </div>

        <div className={styles.filtersGrid}>
          {/* Collection Filter */}
          <div className={styles.filterGroup}>
            <label className={styles.label}>{COLLECTION_LABEL}</label>
            <select
              value={filters.collectionId}
              onChange={(e) => handleChange('collectionId', e.target.value)}
              className={styles.select}
            >
              <option value="">{ALL_OPTION}</option>
              {collections.map((collection) => (
                <option 
                  key={collection.id} 
                  value={collection.id}
                  disabled={collection.disabled}
                >
                  {collection.name}
                </option>
              ))}
            </select>
          </div>

          {/* Type Filter */}
          <div className={styles.filterGroup}>
            <label className={styles.label}>{TYPE_LABEL}</label>
            <select
              value={filters.typeId}
              onChange={(e) => handleChange('typeId', e.target.value)}
              className={styles.select}
            >
              <option value="">{ALL_OPTION}</option>
              {types.map((type) => (
                <option 
                  key={type.id} 
                  value={type.id}
                  disabled={type.disabled}
                >
                  {type.name}
                </option>
              ))}
            </select>
          </div>

          {/* Color Filter */}
          <div className={styles.filterGroup}>
            <label className={styles.label}>{COLOR_LABEL}</label>
            <select
              value={filters.colorId}
              onChange={(e) => handleChange('colorId', e.target.value)}
              className={styles.select}
            >
              <option value="">{ALL_OPTION}</option>
              {colors.map((color) => (
                <option 
                  key={color.id} 
                  value={color.id}
                  disabled={color.disabled}
                >
                  {color.name}
                </option>
              ))}
            </select>
          </div>

          {/* Price Range */}
          <div className={styles.filterGroup}>
            <label className={styles.label}>{PRICE_LABEL}</label>
            <div className={styles.priceRange}>
              <input
                type="number"
                placeholder={MIN_PRICE_PLACEHOLDER}
                value={filters.minPrice}
                onChange={(e) => handleChange('minPrice', e.target.value)}
                className={styles.priceInput}
                min="0"
              />
              <span className={styles.priceSeparator}>—</span>
              <input
                type="number"
                placeholder={MAX_PRICE_PLACEHOLDER}
                value={filters.maxPrice}
                onChange={(e) => handleChange('maxPrice', e.target.value)}
                className={styles.priceInput}
                min="0"
              />
            </div>
          </div>

          {/* Transformorable */}
          <div className={styles.filterGroup}>
            <label className={styles.label}>{TRANSFORMORABLE_LABEL}</label>
            <select
              value={filters.isTransformorable}
              onChange={(e) => handleChange('isTransformorable', e.target.value)}
              className={styles.select}
            >
              <option value="">{ALL_OPTION}</option>
              <option value="true">{YES_OPTION}</option>
              <option value="false">{NO_OPTION}</option>
            </select>
          </div>

          {/* Sort */}
          <div className={styles.filterGroup}>
            <label className={styles.label}>{SORT_LABEL}</label>
            <select
              value={filters.sortBy}
              onChange={(e) => handleChange('sortBy', e.target.value)}
              className={`${styles.select} ${styles.sortSelect}`}
            >
              {SORT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

