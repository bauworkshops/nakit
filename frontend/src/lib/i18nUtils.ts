import { Language } from '@/contexts/LanguageContext';

/**
 * Get localized field from PocketBase record
 * @param record - PocketBase record
 * @param fieldName - Base field name (e.g., 'title', 'description', 'name')
 * @param language - Current language
 * @returns Localized value or default value
 */
export function getLocalizedField<T extends Record<string, any>>(
  record: T,
  fieldName: keyof T,
  language: Language
): string {
  const baseValue = record[fieldName];
  
  // If language is not English, try to get the localized field
  if (language !== 'eng') {
    const localizedFieldName = `${String(fieldName)}_${language}` as keyof T;
    const localizedValue = record[localizedFieldName];
    
    // Return localized value if it exists and is not empty
    if (localizedValue && String(localizedValue).trim()) {
      return String(localizedValue);
    }
  }
  
  // Fall back to base value
  return String(baseValue || '');
}

/**
 * Get translation from translations object
 * @param translations - Translation object with eng, rus, srb keys
 * @param language - Current language
 * @returns Translated string
 */
export function t(
  translations: Record<Language, string>,
  language: Language
): string {
  return translations[language] || translations.eng;
}

