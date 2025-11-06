import rss from '@astrojs/rss';
import { siteData } from '../data/config/site';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const base = context.site?.href || siteData.url;
  
  // Get all blog posts (excluding drafts)
  const posts = await getCollection('blog', ({ data }) => {
    return data.draft !== true;
  });
  
  // Sort by publish date (newest first)
  const sortedPosts = posts.sort((a, b) =>
    new Date(b.data.publishDate).getTime() - new Date(a.data.publishDate).getTime()
  );

  // Generate RSS items from blog posts
  const items = sortedPosts.map((post) => {
    const slug = post.id.replace(/\.mdx?$/, '');
    const postUrl = `${base}blog/${slug}/`;
    
    return {
      title: post.data.title,
      description: post.data.description,
      link: postUrl,
      pubDate: post.data.publishDate,
      author: post.data.author || siteData.email,
    };
  });

  // If no posts exist, include a default welcome item
  if (items.length === 0) {
    items.push({
      title: 'Welcome to AUXO Data Labs',
      description: 'Transforming data into actionable insights for businesses across the UAE',
      link: `${base}about/`,
      pubDate: new Date('2025-01-01'),
      author: siteData.email,
    });
  }

  return rss({
    title: siteData.name,
    description: siteData.description,
    site: base,
    items,
    customData: `<language>en-us</language>`,
    stylesheet: '/rss-styles.xsl',
  });
}
