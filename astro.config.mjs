// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import partytown from '@astrojs/partytown';
import tailwind from '@astrojs/tailwind';
import compress from 'astro-compress';
import icon from 'astro-icon';

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
          item.changefreq = 'daily';
        } else if (item.url.includes('/services/')) {
          // Service pages - high priority
          item.priority = 0.9;
          item.changefreq = 'weekly';
        } else if (item.url.includes('/contact') || item.url.includes('/maturity-calculator')) {
          // Important pages
          item.priority = 0.8;
          item.changefreq = 'monthly';
        } else if (item.url.includes('/blog/')) {
          // Blog posts
          item.priority = 0.7;
          item.changefreq = 'monthly';
        } else if (item.url.includes('/privacy-policy') || item.url.includes('/terms') || item.url.includes('/cookie-policy') || item.url.includes('/dpa')) {
          // Legal pages - lower priority
          item.priority = 0.3;
          item.changefreq = 'yearly';
        } else {
          // Default for other pages
          item.priority = 0.6;
          item.changefreq = 'monthly';
        }
        item.lastmod = new Date();
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
        // Only include icons actually used in the project to reduce bundle size
        // Run `npm run build` and check warnings for unused icons
        mdi: [
          // UI & Navigation Icons
          'account', 'account-group', 'alert-circle', 'arrow-left', 'arrow-right', 'book-open',
          'briefcase', 'calculator', 'calendar', 'calendar-clock', 'clock',
          'certificate', 'chart-bar', 'chart-line', 'check', 'check-circle',
          'chevron-down', 'database', 'download', 'email', 'email-newsletter',
          'email-outline', 'eye', 'file-document', 'handshake', 'home',
          'information', 'lightbulb', 'linkedin', 'lock', 'map-marker',
          'package-variant', 'phone', 'post', 'security', 'share-variant',
          'shield-check', 'star', 'target', 'trophy', 'twitter',
          // Technology Icons (About page)
          'language-python', 'aws', 'microsoft-azure', 'snowflake',
          'lightning-bolt', 'brain', 'docker', 'air-filter', 'graph',
          // Industry Icons (Case Studies page)
          'store', 'hospital', 'truck-fast', 'factory', 'office-building',
          // Service Icons (Services data)
          'chart-scatter-plot', 'strategy', 'database-cog', 'robot'
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
      HTML: {
        removeAttributeQuotes: false, // Prevents breaking attribute values
        minifyCSS: true,
        minifyJS: true,
      },
      Image: process.env.NODE_ENV === 'production', // Only compress images in production
      JavaScript: true,
      SVG: true,
      Logger: process.env.NODE_ENV === 'development' ? 1 : 0, // Verbose in dev, silent in prod
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
