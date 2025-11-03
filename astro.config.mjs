// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { EnumChangefreq } from 'sitemap';
import partytown from '@astrojs/partytown';
import tailwind from '@astrojs/tailwind';
import compress from 'astro-compress';
import icon from 'astro-icon';
import maintenance from 'astro-maintenance';

// https://astro.build/config
export default defineConfig({
  site: 'https://admin-auxo.github.io',
  base: '/auxo-main-website',
  trailingSlash: 'always', // Enforce consistent URL structure with trailing slashes
  integrations: [
    mdx(),
    sitemap({
      filter: (page) => !page.includes('/api/'), // Exclude API routes from sitemap
      customPages: [
        'https://admin-auxo.github.io/auxo-main-website',
        'https://admin-auxo.github.io/auxo-main-website/about',
        'https://admin-auxo.github.io/auxo-main-website/services',
        'https://admin-auxo.github.io/auxo-main-website/contact',
      ],
      serialize(item) {
        // Custom priority based on page type
        if (item.url.endsWith('/') || item.url.endsWith('/index.html')) {
          // Homepage - highest priority
          item.priority = 1.0;
          item.changefreq = EnumChangefreq.DAILY;
        } else if (item.url.includes('/services/')) {
          // Service pages - high priority
          item.priority = 0.9;
          item.changefreq = EnumChangefreq.WEEKLY;
        } else if (item.url.includes('/contact') || item.url.includes('/tools/maturity-calculator')) {
          // Important pages
          item.priority = 0.8;
          item.changefreq = EnumChangefreq.MONTHLY;
        } else if (item.url.includes('/blog/')) {
          // Blog posts
          item.priority = 0.7;
          item.changefreq = EnumChangefreq.MONTHLY;
        } else if (item.url.includes('/legal/')) {
          // Legal pages - lower priority
          item.priority = 0.3;
          item.changefreq = EnumChangefreq.YEARLY;
        } else {
          // Default for other pages
          item.priority = 0.6;
          item.changefreq = EnumChangefreq.MONTHLY;
        }
        item.lastmod = new Date().toISOString();
        return item;
      },
    }),
    partytown({
      config: {
        forward: ['dataLayer.push'],
        // Enable debug mode in development for easier troubleshooting
        debug: process.env.NODE_ENV === 'development',
      },
    }),
    tailwind({
      // Base styles disabled - using custom reset in global.css
      applyBaseStyles: false,
    }),
    icon({
      include: {
        // Optimized: Only icons actually used in the project (audited from codebase)
        mdi: [
          // Alphabetically sorted for easier maintenance
          'account', 'account-group', 'alert-circle', 'arrow-left', 'arrow-right',
          'book-open', 'briefcase', 'calculator', 'calendar', 'calendar-check', 'calendar-clock', 'certificate', 'clock',
          'chart-bar', 'chart-line', 'chart-scatter-plot', 'check', 'check-circle', 'chevron-down',
          'currency-usd', 'database', 'database-cog', 'download', 'email', 'email-newsletter',
          'email-outline', 'eye', 'factory', 'file-document', 'handshake', 'help-circle', 'home',
          'hospital', 'information', 'lightbulb', 'linkedin', 'lock', 'map-marker',
          'office-building', 'package-variant', 'phone', 'post', 'robot', 'rocket',
          'security', 'share-variant', 'shield-check', 'star', 'store', 'strategy',
          'target', 'tools', 'trophy', 'truck-fast', 'twitter'
        ],
      },
      svgoOptions: {
        multipass: true,
        plugins: [
          {
            name: 'preset-default',
            params: {
              overrides: {
                // Preserve viewBox for responsive SVG scaling
                removeViewBox: false,
              },
            },
          },
        ],
      },
    }),
    compress({
      CSS: true,
      HTML: true,
      Image: process.env.NODE_ENV === 'production', // Only compress images in production
      JavaScript: true,
      SVG: true,
      Logger: process.env.NODE_ENV === 'development' ? 1 : 0, // Verbose in dev, silent in prod
    }),
    // Maintenance mode - enabled via MAINTENANCE_MODE environment variable
    maintenance({
      enabled: import.meta.env.MAINTENANCE_MODE === 'true',
      message: 'We are currently performing scheduled maintenance. We will be back shortly.',
    }),
  ],
  // Experimental features removed:
  // - clientPrerender: Not beneficial for static GitHub Pages sites
  //   (requires Speculation Rules API with limited browser support)
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
      config: {
        // Set reasonable limits for image processing
        limitInputPixels: 50000000, // ~7000x7000px limit
      },
    },
  },
  vite: {
    optimizeDeps: {
      exclude: ['astro:assets'],
    },
  },
});
