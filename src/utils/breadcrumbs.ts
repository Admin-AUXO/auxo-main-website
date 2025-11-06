/**
 * Breadcrumb formatting utilities
 * Formats breadcrumb labels for better readability
 */

export interface BreadcrumbItem {
  text: string;
  href: string;
}

/**
 * Format a breadcrumb label from a URL segment
 */
function formatBreadcrumbLabel(segment: string): string {
  // Remove trailing slashes and empty segments
  segment = segment.replace(/\/$/, '').trim();
  if (!segment) return '';

  // Custom label mappings
  const labelMap: Record<string, string> = {
    'services': 'All Services',
    'blog': 'Blog',
    'about': 'About',
    'contact': 'Contact',
    'tools': 'Tools',
    'case-studies': 'Case Studies',
    'legal': 'Legal',
    'privacy-policy': 'Privacy Policy',
    'terms': 'Terms of Service',
    'cookie-policy': 'Cookie Policy',
    'dpa': 'Data Processing Agreement',
    'faq': 'FAQ',
    'maturity-calculator': 'Maturity Calculator',
  };

  // Check if we have a custom mapping
  if (labelMap[segment]) {
    return labelMap[segment];
  }

  // Format: Convert kebab-case to Title Case
  // e.g., "ml-ai" -> "ML & AI" or keep as-is if it's a service ID
  return segment
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Generate breadcrumbs from current URL path
 */
import { getBaseUrl } from './url';

export function generateBreadcrumbs(
  pathname: string,
  customLabels?: Record<string, string>,
  currentPageLabel?: string
): BreadcrumbItem[] {
  const base = getBaseUrl();
  
  // Normalize base URL - ensure it ends with / for consistency
  const normalizedBase = base.endsWith('/') ? base : base + '/';
  
  // Remove base URL from pathname if present
  let cleanPath = pathname;
  if (normalizedBase !== '/') {
    cleanPath = pathname.replace(normalizedBase, '/');
  }
  
  // Ensure path starts with /
  if (!cleanPath.startsWith('/')) {
    cleanPath = '/' + cleanPath;
  }
  
  // Remove trailing slash for processing
  cleanPath = cleanPath.replace(/\/$/, '');

  // Split path into segments
  const segments = cleanPath
    .split('/')
    .filter(segment => segment && segment !== '');

  // Build breadcrumbs
  const breadcrumbs: BreadcrumbItem[] = [
    {
      text: 'Home',
      href: normalizedBase === '/' ? '/' : normalizedBase,
    },
  ];

  // Add intermediate breadcrumbs
  let currentPath = normalizedBase === '/' ? '' : normalizedBase.replace(/\/$/, '');
  
  segments.forEach((segment, index) => {
    currentPath += '/' + segment;
    
    // Use custom label for current page if provided
    const isLast = index === segments.length - 1;
    const label = isLast && currentPageLabel
      ? currentPageLabel
      : customLabels?.[segment] || formatBreadcrumbLabel(segment);

    // Add trailing slash for consistency with Astro's trailingSlash config
    const href = currentPath + '/';

    breadcrumbs.push({
      text: label,
      href: href,
    });
  });

  return breadcrumbs;
}

/**
 * Format service breadcrumbs with proper service title
 */
export function generateServiceBreadcrumbs(
  pathname: string,
  serviceTitle: string
): BreadcrumbItem[] {
  return generateBreadcrumbs(pathname, { 'services': 'All Services' }, serviceTitle);
}

/**
 * Format blog breadcrumbs with proper post title
 */
export function generateBlogBreadcrumbs(
  pathname: string,
  postTitle: string
): BreadcrumbItem[] {
  return generateBreadcrumbs(pathname, { 'blog': 'Blog' }, postTitle);
}

