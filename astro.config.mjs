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
  base: '/auxo-main-website/',
  integrations: [
    mdx(),
    sitemap({
      filter: (page) => !page.includes('/api/'), // Exclude API routes from sitemap
      customPages: [
        'https://admin-auxo.github.io/auxo-main-website/',
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
      },
    }),
    tailwind({
      applyBaseStyles: false,
    }),
    icon({
      include: {
        mdi: [
          // UI & Navigation Icons
          'account-group', 'alert-circle', 'arrow-right', 'book-open',
          'briefcase', 'calculator', 'calendar', 'calendar-clock',
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
        removeAttributeQuotes: false,
        minifyCSS: true,
        minifyJS: true,
      },
      Image: true, // Enable image compression for production
      JavaScript: true,
      SVG: true,
      Logger: 1,
    }),
  ],
  experimental: {
    clientPrerender: true, // Enable client-side prerendering for faster navigation
  },
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
    },
  },
  vite: {
    optimizeDeps: {
      exclude: ['astro:assets'],
    },
  },
});
