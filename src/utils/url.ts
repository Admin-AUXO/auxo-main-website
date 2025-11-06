/**
 * URL Utilities
 * Centralized utilities for handling URLs and base paths
 * Ensures trailing slashes are maintained per astro.config.mjs (trailingSlash: 'always')
 */

/**
 * Get the base URL for the site
 * Uses import.meta.env.BASE_URL which is set in astro.config.mjs
 * @returns Base URL (e.g., '/auxo-main-website/')
 */
export function getBaseUrl(): string {
  const base = import.meta.env.BASE_URL;
  // Ensure base URL ends with trailing slash (per config: trailingSlash: 'always')
  return base.endsWith('/') ? base : `${base}/`;
}

/**
 * Create a full URL path with base URL prefix
 * Ensures trailing slashes are maintained per config
 * @param path - Path to append to base URL (e.g., 'about' or 'about/')
 * @returns Full URL path with base URL and trailing slash
 */
export function createUrl(path: string): string {
  const base = getBaseUrl();
  // Remove leading slash from path if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  // Ensure path ends with trailing slash (per config: trailingSlash: 'always')
  const pathWithSlash = cleanPath.endsWith('/') ? cleanPath : `${cleanPath}/`;
  return `${base}${pathWithSlash}`;
}

/**
 * Create an API URL with base URL prefix
 * API endpoints don't need trailing slashes
 * @param endpoint - API endpoint path (e.g., 'api/contact')
 * @returns Full API URL with base URL (no trailing slash)
 */
export function createApiUrl(endpoint: string): string {
  const base = getBaseUrl();
  // Remove leading slash from endpoint if present
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
  // API endpoints don't need trailing slashes
  return `${base}${cleanEndpoint}`;
}

