/**
 * Application Constants
 * Centralized constants for animation durations, breakpoints, and other magic numbers
 */

// Animation & Transition Durations (ms)
export const ANIMATION_DURATIONS = {
  FAST: 200,
  NORMAL: 300,
  SLOW: 500,
  VERY_SLOW: 800,
} as const;

// Breakpoints (px) - Match Tailwind breakpoints
export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1536,
} as const;

// Touch Target Sizes (px) - WCAG AA compliant
export const TOUCH_TARGETS = {
  MINIMUM: 44,
  LARGE: 56,
} as const;

// Scroll Thresholds (px)
export const SCROLL_THRESHOLDS = {
  BACK_TO_TOP: 300,
  NAV_SCROLLED: 10,
} as const;

// Z-Index Layers
export const Z_INDEX = {
  BASE: 0,
  CONTENT: 10,
  NAVIGATION: 50,
  DROPDOWN: 60,
  MODAL: 100,
  COOKIE_CONSENT: 100,
  TOOLTIP: 110,
} as const;

// Cookie Consent
export const COOKIE_CONSENT = {
  KEY: 'auxo-cookie-consent',
  EXPIRY_DAYS: 365,
} as const;

// Rate Limiting (seconds)
export const RATE_LIMIT = {
  CONTACT_WINDOW: 30 * 60, // 30 minutes
  CONTACT_MAX_REQUESTS: 3,
  NEWSLETTER_WINDOW: 60 * 60, // 1 hour
  NEWSLETTER_MAX_REQUESTS: 2,
} as const;

// Particle Configuration
export const PARTICLES = {
  MOBILE_MIN: 20,
  MOBILE_MAX: 35,
  TABLET_MIN: 35,
  TABLET_MAX: 60,
  DESKTOP_MIN: 50,
  DESKTOP_MAX: 90,
} as const;

// Image Optimization
export const IMAGE_CONFIG = {
  QUALITY: 80,
  FORMATS: ['webp', 'avif', 'jpg'] as const,
  LAZY_LOAD_THRESHOLD: 200, // pixels from viewport
} as const;

