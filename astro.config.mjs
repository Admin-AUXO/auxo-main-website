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
  integrations: [
    mdx(),
    sitemap({
      filter: (page) => !page.includes('/api/'), // Exclude API routes from sitemap
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
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
        mdi: ['*'], // Material Design Icons
        lucide: ['*'], // Lucide icons
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
      Image: false,
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
