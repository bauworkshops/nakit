import { FilterState } from '@/components/ProductFilter';
import { nameToSlug } from './slugUtils';

const DEFAULT_FILTERS: FilterState = {
  collectionId: '',
  typeId: '',
  colorId: '',
  minPrice: '',
  maxPrice: '',
  isTransformorable: '',
  sortBy: 'newest',
};

export interface FilterOption {
  id: string;
  name: string;
}

/**
 * Finds an option by slug (case-insensitive, fuzzy match)
 */
function findOptionBySlug(slug: string, options: FilterOption[]): string {
  if (!slug || !options.length) return '';
  
  const normalizedSlug = slug.toLowerCase();
  
  // Try exact slug match first
  const exactMatch = options.find(opt => nameToSlug(opt.name) === normalizedSlug);
  if (exactMatch) return exactMatch.id;
  
  // Try partial match (for backwards compatibility)
  const partialMatch = options.find(opt => 
    nameToSlug(opt.name).includes(normalizedSlug) || 
    normalizedSlug.includes(nameToSlug(opt.name))
  );
  if (partialMatch) return partialMatch.id;
  
  return '';
}

/**
 * Finds an option name by ID
 */
function findOptionNameById(id: string, options: FilterOption[]): string {
  if (!id || !options.length) return '';
  const option = options.find(opt => opt.id === id);
  return option ? nameToSlug(option.name) : '';
}

/**
 * Converts FilterState to URL search params string using human-readable names
 * Only includes non-default values
 */
export function filtersToSearchParams(
  filters: FilterState,
  collections: FilterOption[],
  types: FilterOption[],
  colors: FilterOption[]
): string {
  const params = new URLSearchParams();

  // Convert IDs to names for URL
  if (filters.collectionId && filters.collectionId !== DEFAULT_FILTERS.collectionId) {
    const slug = findOptionNameById(filters.collectionId, collections);
    if (slug) params.set('collection', slug);
  }

  if (filters.typeId && filters.typeId !== DEFAULT_FILTERS.typeId) {
    const slug = findOptionNameById(filters.typeId, types);
    if (slug) params.set('type', slug);
  }

  if (filters.colorId && filters.colorId !== DEFAULT_FILTERS.colorId) {
    const slug = findOptionNameById(filters.colorId, colors);
    if (slug) params.set('color', slug);
  }

  if (filters.minPrice && filters.minPrice !== DEFAULT_FILTERS.minPrice) {
    params.set('minPrice', filters.minPrice);
  }

  if (filters.maxPrice && filters.maxPrice !== DEFAULT_FILTERS.maxPrice) {
    params.set('maxPrice', filters.maxPrice);
  }

  if (filters.isTransformorable && filters.isTransformorable !== DEFAULT_FILTERS.isTransformorable) {
    params.set('transformable', filters.isTransformorable);
  }

  if (filters.sortBy && filters.sortBy !== DEFAULT_FILTERS.sortBy) {
    params.set('sort', filters.sortBy);
  }

  return params.toString();
}

/**
 * Parses URL search params into FilterState, converting names back to IDs
 * Falls back to defaults for missing values
 */
export function searchParamsToFilters(
  searchParams: URLSearchParams,
  collections: FilterOption[],
  types: FilterOption[],
  colors: FilterOption[]
): FilterState {
  return {
    collectionId: findOptionBySlug(searchParams.get('collection') || '', collections),
    typeId: findOptionBySlug(searchParams.get('type') || '', types),
    colorId: findOptionBySlug(searchParams.get('color') || '', colors),
    minPrice: searchParams.get('minPrice') || DEFAULT_FILTERS.minPrice,
    maxPrice: searchParams.get('maxPrice') || DEFAULT_FILTERS.maxPrice,
    isTransformorable: searchParams.get('transformable') || DEFAULT_FILTERS.isTransformorable,
    sortBy: searchParams.get('sort') || DEFAULT_FILTERS.sortBy,
  };
}

/**
 * Gets default filter state
 */
export function getDefaultFilters(): FilterState {
  return { ...DEFAULT_FILTERS };
}

