export interface BlogPageContent {
  hero: {
    badge: string;
    title: string;
    titleHighlight: string;
    subtitle: string;
  };
  featured: {
    badge: string;
  };
  recentPosts: {
    title: string;
  };
  empty: {
    title: string;
    description: string;
    ctaText: string;
    ctaHref: string;
  };
}

export const blogPageContent: BlogPageContent = {
  hero: {
    badge: 'Insights & Resources',
    title: 'Data Analytics',
    titleHighlight: 'Insights',
    subtitle: 'Expert perspectives on data analytics, trends, best practices, and industry insights',
  },
  featured: {
    badge: 'FEATURED',
  },
  recentPosts: {
    title: 'Recent Posts',
  },
  empty: {
    title: 'Coming Soon',
    description: "We're working on creating valuable content for you. Check back soon for the latest insights on data analytics, business intelligence, and data science.",
    ctaText: 'Explore Our Services',
    ctaHref: 'services',
  },
};

