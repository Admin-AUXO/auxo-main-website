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
  popularPosts: {
    title: string;
  };
  relatedContent: {
    title: string;
    links: Array<{
      icon: string;
      title: string;
      description: string;
      linkText: string;
      href: string;
    }>;
  };
  empty: {
    title: string;
    description: string;
    whatToExpect: {
      title: string;
      items: string[];
    };
    exploreServices: {
      title: string;
      description: string;
      linkText: string;
      href: string;
    };
    ctaText: string;
    ctaHref: string;
  };
}

export const blogPageContent: BlogPageContent = {
  hero: {
    badge: 'Insights & Resources',
    title: 'Data Analytics',
    titleHighlight: 'Insights',
    subtitle: 'Expert perspectives on data analytics, AI, and digital transformation, with a focus on strategic insights for organizations in the GCC, Europe, and beyond.',
  },
  featured: {
    badge: 'FEATURED',
  },
  recentPosts: {
    title: 'Recent Posts',
  },
  popularPosts: {
    title: 'Popular Posts',
  },
  relatedContent: {
    title: 'Explore Related Content',
    links: [
      {
        icon: 'mdi:chart-bar',
        title: 'Our Services',
        description: 'Explore our data analytics and business intelligence services',
        linkText: 'View Services',
        href: 'services',
      },
      {
        icon: 'mdi:calculator',
        title: 'Maturity Calculator',
        description: 'Assess your data analytics maturity level',
        linkText: 'Try Calculator',
        href: 'tools/maturity-calculator',
      },
      {
        icon: 'mdi:chat',
        title: 'Get in Touch',
        description: 'Have questions? Contact us for a consultation',
        linkText: 'Contact Us',
        href: 'contact',
      },
    ],
  },
  empty: {
    title: 'Coming Soon',
    description: 'Our insights are coming soon. We are developing thought leadership content that will cover regional market trends, international compliance, and technical deep-dives. Check back shortly, or explore our services to learn more about our capabilities.',
    whatToExpect: {
      title: 'What to Expect',
      items: [
        'Data analytics insights and best practices',
        'Industry trends and case studies',
        'Practical guides and tutorials',
      ],
    },
    exploreServices: {
      title: 'Explore Our Services',
      description: 'While you wait for new content, discover how we can help transform your data analytics.',
      linkText: 'View Services',
      href: 'services',
    },
    ctaText: 'Explore Our Services',
    ctaHref: 'services',
  },
};

