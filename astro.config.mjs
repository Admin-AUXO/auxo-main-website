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
    mdx({
      syntaxHighlight: 'shiki',
      shikiConfig: {
        // Use dual themes for light/dark mode support
        themes: {
          light: 'github-light',
          dark: 'github-dark',
        },
        wrap: true,
        // Add transformers for better code block features (optional)
        // transformers: [],
      },
    }),
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
        // Comprehensive icon set for AUXO Data Labs website
        // Includes all icons currently used + additional useful icons for future enhancements
        mdi: [
          // User & Account
          'account', 'account-group', 'account-circle', 'account-outline', 'account-supervisor',
          
          // Alerts & Status
          'alert', 'alert-circle', 'alert-outline', 'check', 'check-circle', 'check-circle-outline', 
          'close', 'close-circle', 'information', 'information-outline', 'warning', 'error',
          
          // Arrows & Navigation
          'arrow-left', 'arrow-right', 'arrow-up', 'arrow-down', 'arrow-left-bold', 'arrow-right-bold',
          'chevron-down', 'chevron-left', 'chevron-right', 'chevron-up', 'menu', 'menu-open',
          
          // Business & Analytics
          'briefcase', 'briefcase-outline', 'chart-bar', 'chart-line', 'chart-scatter-plot', 
          'chart-box', 'chart-pie', 'chart-timeline-variant', 'trending-up', 'trending-down',
          'target', 'strategy', 'trophy', 'certificate', 'award',
          
          // Communication
          'email', 'email-outline', 'email-newsletter', 'message', 'message-outline', 'chat', 
          'chat-outline', 'phone', 'phone-outline', 'handshake', 'share-variant', 'share',
          
          // Data & Technology
          'database', 'database-cog', 'database-outline', 'server', 'cloud', 'cloud-upload',
          'code', 'code-braces', 'robot', 'robot-outline', 'artificial-intelligence',
          
          // Documents & Files
          'file-document', 'file-document-outline', 'file-pdf', 'book-open', 'book-open-variant',
          'post', 'download', 'upload', 'file-export', 'file-import',
          
          // Time & Calendar
          'clock', 'clock-outline', 'clock-time-four', 'calendar', 'calendar-check', 
          'calendar-clock', 'calendar-outline', 'calendar-range',
          
          // UI Elements
          'home', 'search', 'magnify', 'filter', 'filter-outline', 'settings', 'cog', 'cogs',
          'eye', 'eye-outline', 'lock', 'lock-outline', 'shield-check', 'security',
          'refresh', 'sync', 'play', 'pause', 'stop', 'plus', 'minus',
          
          // Location & Maps
          'map-marker', 'map-marker-outline', 'map', 'earth', 'globe-model',
          
          // Social Media
          'linkedin', 'twitter', 'facebook', 'instagram', 'youtube', 'github',
          
          // Business Categories
          'factory', 'hospital', 'store', 'office-building', 'school', 'bank',
          'truck-fast', 'package-variant', 'shopping', 'cart',
          
          // Features & Actions
          'calculator', 'lightbulb', 'lightbulb-outline', 'lightning-bolt', 'rocket',
          'sparkles', 'star', 'star-outline', 'heart', 'heart-outline', 'bookmark',
          'help-circle', 'help-circle-outline', 'question-circle', 'information-circle',
          
          // Tools & Utilities
          'tools', 'wrench', 'hammer-wrench', 'screwdriver', 'pencil', 'pencil-outline',
          'brush', 'palette', 'layers', 'format-paint',
          
          // Finance
          'currency-usd', 'currency-eur', 'currency-gbp', 'credit-card', 'wallet',
          'cash', 'cash-multiple', 'trending-up', 'chart-line-variant',
          
          // Theme & Display
          'white-balance-sunny', 'moon-waning-crescent', 'theme-light-dark', 'brightness-6',
          'contrast', 'palette-outline',
          
          // Additional Useful Icons
          'check-all', 'check-bold', 'check-circle-multiple-outline', 'checkbox-marked-circle',
          'arrow-right-circle', 'arrow-left-circle', 'chevron-double-left', 'chevron-double-right',
          'chart-box-outline', 'chart-line-variant', 'chart-arc', 'chart-bell-curve',
          'database-search', 'database-sync', 'database-edit', 'database-lock',
          'email-send', 'email-multiple', 'email-mark-as-unread', 'message-text',
          'phone-in-talk', 'phone-forward', 'phone-missed', 'phone-ring',
          'file-chart', 'file-chart-outline', 'file-document-edit', 'file-document-multiple',
          'calendar-multiple', 'calendar-multiple-check', 'calendar-star', 'calendar-text',
          'map-search', 'map-marker-radius', 'map-marker-multiple', 'map-marker-check',
          'account-multiple', 'account-supervisor-circle', 'account-tie', 'account-cog',
          'shield-account', 'shield-lock', 'shield-check-outline', 'shield-alert',
          'lightning-bolt-outline', 'rocket-launch', 'rocket-outline', 'sparkles-outline',
          'star-circle', 'star-four-points', 'star-four-points-outline', 'star-shooting',
          'handshake-outline', 'handshake', 'account-group-outline', 'account-network',
          'briefcase-check', 'briefcase-edit', 'briefcase-plus', 'briefcase-search',
          'factory-outline', 'hospital-building', 'store-outline', 'office-building-outline',
          'truck-delivery', 'package-variant-closed', 'package', 'package-up',
          'shopping-outline', 'cart-outline', 'cart-plus', 'cart-arrow-down',
          'code-json', 'code-tags', 'code-brackets', 'code-string', 'code-array',
          'artificial-intelligence', 'robot-industrial', 'robot-mower', 'robot-vacuum',
          'chart-gantt', 'chart-waterfall', 'chart-sankey', 'chart-tree',
          'database-arrow-right', 'database-arrow-left', 'database-export', 'database-import',
          'cloud-sync', 'cloud-download', 'cloud-upload-outline', 'cloud-check',
          'server-network', 'server-security', 'server-off', 'server-remove',
          'email-open', 'email-lock', 'email-alert', 'email-remove',
          'message-processing', 'message-reply', 'message-reply-text', 'message-alert',
          'phone-settings', 'phone-alert', 'phone-cancel', 'phone-check',
          'calendar-arrow-right', 'calendar-arrow-left', 'calendar-remove', 'calendar-plus',
          'clock-alert', 'clock-start', 'clock-end', 'clock-fast',
          'file-search', 'file-find', 'file-remove', 'file-plus',
          'book-open-page-variant', 'book-edit', 'book-remove', 'book-plus',
          'download-multiple', 'download-outline', 'upload-outline', 'download-off',
          'share-circle', 'share-all', 'share-variant-outline', 'share-off',
          'settings-outline', 'settings-helper', 'cog-outline', 'cog-sync',
          'eye-off', 'eye-off-outline', 'eye-check', 'eye-check-outline',
          'lock-open', 'lock-open-outline', 'lock-reset', 'lock-alert',
          'shield-outline', 'shield-half-full', 'shield-home', 'shield-cross',
          'refresh-circle', 'sync-alert', 'sync-off', 'sync-circle',
          'play-circle', 'pause-circle', 'stop-circle', 'play-pause',
          'plus-circle', 'plus-circle-outline', 'minus-circle', 'minus-circle-outline',
          'magnify-plus', 'magnify-minus', 'magnify-remove', 'magnify-close',
          'filter-remove', 'filter-variant', 'filter-variant-remove', 'filter-check',
          'map-plus', 'map-minus', 'map-legend', 'map-remove',
          'earth-box', 'earth-box-off', 'earth-plus', 'earth-minus',
          'linkedin-box', 'twitter-box', 'facebook-box', 'instagram',
          'factory', 'hospital-box', 'storefront', 'store-24-hour',
          'truck-delivery-outline', 'truck-fast-outline', 'package-variant-add',
          'shopping', 'cart-outline', 'cart-arrow-up', 'cart-remove',
          'calculator-variant', 'calculator-outline', 'abacus', 'calculator',
          'lightbulb-on', 'lightbulb-off', 'lightbulb-group', 'lightbulb-multiple',
          'rocket-launch-outline', 'rocket-outline',
          'star-circle-outline', 'star-four-points-outline', 'star-shooting-outline',
          'account-supervisor-circle-outline', 'account-network-outline',
          'briefcase-account', 'briefcase-account-outline',
          'chart-pie', 'chart-scatter-plot-hexbin',
          'database-arrow-right-outline',
          'email-multiple-outline',
          'message-text-outline',
          'phone-in-talk-outline',
          'calendar-clock-outline',
          'clock-time-four-outline',
          'file-document-edit-outline',
          'book-open-variant-outline',
          'download-multiple-outline',
          'share-outline', 'share-circle-outline',
          'cog-outline',
          'eye-off-outline',
          'lock-open-outline',
          'shield-half-full-outline',
          'sync-alert-outline',
          'map-marker-radius-outline'
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
    build: {
      cssCodeSplit: true, // Split CSS per page for better caching
      rollupOptions: {
        output: {
          manualChunks: {
            // Split vendor chunks for better caching
            'router': ['astro:transitions/client'],
          },
        },
      },
    },
    esbuild: {
      // Suppress CSS syntax warnings from minification (these are false positives)
      logOverride: {
        'css-syntax-error': 'silent',
      },
      // Enable tree-shaking and minification
      treeShaking: true,
      minifyIdentifiers: true,
      minifySyntax: true,
      minifyWhitespace: true,
      drop: ['console', 'debugger'], // Remove console.log and debugger statements in production
    },
  },
});
