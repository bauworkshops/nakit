'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/lib/translations';
import { t, getLocalizedField } from '@/lib/i18nUtils';
import styles from './index.module.scss';

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
  const { language } = useLanguage();
  const [isSticky, setIsSticky] = useState(false);

  const SORT_OPTIONS = [
    { value: 'newest', label: t(translations.filter.sortNewest, language) },
    { value: 'oldest', label: t(translations.filter.sortOldest, language) },
    { value: 'price-asc', label: t(translations.filter.sortPriceAsc, language) },
    { value: 'price-desc', label: t(translations.filter.sortPriceDesc, language) },
    { value: 'title-asc', label: t(translations.filter.sortTitleAsc, language) },
    { value: 'title-desc', label: t(translations.filter.sortTitleDesc, language) },
  ];

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
          <h2 className={styles.title}>{t(translations.filter.title, language)}</h2>
          {hasActiveFilters && (
            <button onClick={handleReset} className={styles.resetButton}>
              {t(translations.filter.resetFilters, language)}
            </button>
          )}
        </div>

        <div className={styles.filtersGrid}>
          {/* Collection Filter */}
          <div className={styles.filterGroup}>
            <label className={styles.label}>{t(translations.filter.collection, language)}</label>
            <select
              value={filters.collectionId}
              onChange={(e) => handleChange('collectionId', e.target.value)}
              className={styles.select}
            >
              <option value="">{t(translations.filter.all, language)}</option>
              {collections.map((collection) => (
                <option 
                  key={collection.id} 
                  value={collection.id}
                  disabled={collection.disabled}
                >
                  {getLocalizedField(collection, 'name', language)}
                </option>
              ))}
            </select>
          </div>

          {/* Type Filter */}
          <div className={styles.filterGroup}>
            <label className={styles.label}>{t(translations.filter.type, language)}</label>
            <select
              value={filters.typeId}
              onChange={(e) => handleChange('typeId', e.target.value)}
              className={styles.select}
            >
              <option value="">{t(translations.filter.all, language)}</option>
              {types.map((type) => (
                <option 
                  key={type.id} 
                  value={type.id}
                  disabled={type.disabled}
                >
                  {getLocalizedField(type, 'name', language)}
                </option>
              ))}
            </select>
          </div>

          {/* Color Filter */}
          <div className={styles.filterGroup}>
            <label className={styles.label}>{t(translations.filter.color, language)}</label>
            <select
              value={filters.colorId}
              onChange={(e) => handleChange('colorId', e.target.value)}
              className={styles.select}
            >
              <option value="">{t(translations.filter.all, language)}</option>
              {colors.map((color) => (
                <option 
                  key={color.id} 
                  value={color.id}
                  disabled={color.disabled}
                >
                  {getLocalizedField(color, 'name', language)}
                </option>
              ))}
            </select>
          </div>

          {/* Price Range */}
          <div className={styles.filterGroup}>
            <label className={styles.label}>{t(translations.filter.priceRange, language)}</label>
            <div className={styles.priceRange}>
              <input
                type="number"
                placeholder={t(translations.filter.minPrice, language)}
                value={filters.minPrice}
                onChange={(e) => handleChange('minPrice', e.target.value)}
                className={styles.priceInput}
                min="0"
              />
              <span className={styles.priceSeparator}>—</span>
              <input
                type="number"
                placeholder={t(translations.filter.maxPrice, language)}
                value={filters.maxPrice}
                onChange={(e) => handleChange('maxPrice', e.target.value)}
                className={styles.priceInput}
                min="0"
              />
            </div>
          </div>

          {/* Transformorable */}
          <div className={styles.filterGroup}>
            <label className={styles.label}>{t(translations.filter.transformable, language)}</label>
            <select
              value={filters.isTransformorable}
              onChange={(e) => handleChange('isTransformorable', e.target.value)}
              className={styles.select}
            >
              <option value="">{t(translations.filter.all, language)}</option>
              <option value="true">{t(translations.filter.yes, language)}</option>
              <option value="false">{t(translations.filter.no, language)}</option>
            </select>
          </div>

          {/* Sort */}
          <div className={styles.filterGroup}>
            <label className={styles.label}>{t(translations.filter.sortBy, language)}</label>
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

