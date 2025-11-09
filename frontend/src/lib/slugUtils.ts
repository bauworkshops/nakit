/**
 * Slug utilities for converting names to URL-safe strings
 */

/**
 * Converts a name to a URL-safe slug
 * 
 * @param name - The name to convert to a slug
 * @returns URL-safe slug (lowercase, hyphenated, no special chars)
 * 
 * @example
 * nameToSlug("Classic Collection") // "classic-collection"
 * nameToSlug("Premium Box (Large)") // "premium-box-large"
 */
export function nameToSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special chars
    .replace(/[\s_]+/g, '-') // Replace spaces/underscores with hyphens
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}

