/**
 * Content utility functions for blog posts and articles
 */

/**
 * Calculate estimated reading time for content
 * @param content - The content text to analyze
 * @returns Estimated reading time in minutes
 */
export function calculateReadTime(content: string | undefined): number {
  if (!content) return 0;
  const wordsPerMinute = 200;
  const wordCount = content.trim().split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

export type ReadTimeResult = number;
