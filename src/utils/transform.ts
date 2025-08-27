/**
 * @brief Capitalizes the first letter of each word in a string.
 * @description This function takes a string as input and returns a new string
 * with the first letter of each word capitalized.
 * @param text - The input string to be transformed.
 * @returns A new string with the first letter of each word capitalized.
 */
export function capitalize(text: string): string {
  const words = text.split(' ');
  for (let i = 0; i < words.length; i++) {
    words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1).toLowerCase();
  }
  return words.join(' ');
}

/**
 * @brief Converts a string to uppercase.
 * @description This function takes a string as input and returns a new string
 * with all characters converted to uppercase.
 * @param text - The input string to be transformed.
 * @returns A new string with all characters converted to uppercase.
 */
export function uppercase(text: string): string {
  return text.toUpperCase();
}

/**
 * @brief Converts a string to lowercase.
 * @description This function takes a string as input and returns a new string
 * with all characters converted to lowercase.
 * @param text - The input string to be transformed.
 * @returns A new string with all characters converted to lowercase.
 */
export function lowercase(text: string): string {
  return text.toLowerCase();
}

/**
 * @brief Strips the domain from a URL.
 * @description This function takes a URL as input and returns a new string
 * with the domain removed.
 * @param url - The input URL to be transformed.
 * @returns A new string with the domain removed.
 */
export function stripDomain(url: string): string {
  return url.replace(/https:\/\/www\./, '').replace(/\/.*$/, '');
}

/**
 * @brief Converts a string to kebab-case
 * @description This function takes a string as input and returns a new string
 * with all spaces replaced by hyphens and all characters converted to lowercase.
 * @param text The input string
 * @returns Kebab-cased string
 */
export function kebabcase(text: string): string {
  return text
    .normalize('NFD') // Decompose accented characters
    .replace(/[\u0300-\u036f]/g, '') // Remove accents
    .toLowerCase() // Convert to lowercase
    .trim() // Remove leading/trailing spaces
    .replace(/[^a-z0-9\s-]/g, '') // Remove invalid chars
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-'); // Collapse multiple hyphens
}
