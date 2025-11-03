import rss from '@astrojs/rss';
import { siteData } from '../data/config/site';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  return rss({
    title: siteData.name,
    description: siteData.description,
    site: context.site || siteData.url,
    items: [
      // Placeholder - add blog posts when content collection is populated
      {
        title: 'Welcome to AUXO Data Labs',
        description: 'Transforming data into actionable insights for businesses across the UAE',
        link: '/about',
        pubDate: new Date('2025-01-01'),
        author: siteData.email,
      }
    ],
    customData: `<language>en-us</language>`,
    stylesheet: '/rss-styles.xsl',
  });
}
