/**
 * Simple in-memory rate limiter for API endpoints
 *
 * Note: This is a basic implementation suitable for serverless environments.
 * For production with high traffic, consider using:
 * - Upstash Redis (@upstash/ratelimit)
 * - Cloudflare Rate Limiting
 * - API Gateway rate limiting
 */

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const rateLimitMap = new Map<string, RateLimitEntry>();

// Clean up old entries every hour to prevent memory leaks
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now();
    for (const [ip, entry] of rateLimitMap.entries()) {
      if (now > entry.resetTime) {
        rateLimitMap.delete(ip);
      }
    }
  }, 3600000); // 1 hour
}

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetTime: number;
  retryAfter?: number;
}

/**
 * Check if a request from an IP address is within rate limits
 *
 * @param ip - Client IP address
 * @param maxRequests - Maximum number of requests allowed in the time window (default: 5)
 * @param windowMs - Time window in milliseconds (default: 15 minutes)
 * @returns Rate limit result with allowed status and remaining requests
 */
export function checkRateLimit(
  ip: string,
  maxRequests: number = 5,
  windowMs: number = 15 * 60 * 1000 // 15 minutes
): RateLimitResult {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  // First request or window expired
  if (!entry || now > entry.resetTime) {
    const resetTime = now + windowMs;
    rateLimitMap.set(ip, { count: 1, resetTime });
    return {
      allowed: true,
      remaining: maxRequests - 1,
      resetTime
    };
  }

  // Rate limit exceeded
  if (entry.count >= maxRequests) {
    return {
      allowed: false,
      remaining: 0,
      resetTime: entry.resetTime,
      retryAfter: Math.ceil((entry.resetTime - now) / 1000) // seconds
    };
  }

  // Increment counter
  entry.count++;
  return {
    allowed: true,
    remaining: maxRequests - entry.count,
    resetTime: entry.resetTime
  };
}

/**
 * Get a safe client IP address from the request
 * Checks common headers set by proxies and CDNs
 *
 * @param request - The incoming request object
 * @returns Client IP address or 'unknown'
 */
export function getClientIP(request: Request): string {
  // Check common headers in order of reliability
  const headers = request.headers;

  return (
    headers.get('cf-connecting-ip') || // Cloudflare
    headers.get('x-real-ip') || // Nginx
    headers.get('x-forwarded-for')?.split(',')[0].trim() || // Most proxies
    headers.get('x-client-ip') ||
    'unknown'
  );
}

/**
 * Rate limit configuration presets
 */
export const RateLimitPresets = {
  // Very strict - for sensitive operations
  STRICT: { maxRequests: 3, windowMs: 15 * 60 * 1000 }, // 3 per 15 min

  // Standard - for forms and APIs
  STANDARD: { maxRequests: 5, windowMs: 15 * 60 * 1000 }, // 5 per 15 min

  // Relaxed - for general content
  RELAXED: { maxRequests: 10, windowMs: 15 * 60 * 1000 }, // 10 per 15 min

  // Newsletter - prevent spam signups
  NEWSLETTER: { maxRequests: 2, windowMs: 60 * 60 * 1000 }, // 2 per hour

  // Contact form - prevent spam
  CONTACT: { maxRequests: 3, windowMs: 30 * 60 * 1000 }, // 3 per 30 min
} as const;
