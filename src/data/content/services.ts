export interface ProcessStep {
  number: number;
  icon: string;
  title: string;
  description: string;
}

export interface ServicesPageContent {
  hero: {
    badge: string;
    title: string;
    titleHighlight: string;
    subtitle: string;
  };
  servicesGrid: {
    title: string;
    titleHighlight: string;
    subtitle: string;
  };
  businessImpact: {
    title: string;
    titleHighlight: string;
    subtitle: string;
  };
  industries: {
    title: string;
    titleHighlight: string;
    subtitle: string;
  };
  process: {
    badge: string;
    title: string;
    titleHighlight: string;
    subtitle: string;
    steps: ProcessStep[];
  };
  faq: {
    title: string;
    titleHighlight: string;
    subtitle: string;
    viewAllText: string;
  };
  cta: {
    title: string;
    titleHighlight: string;
    subtitle: string;
    benefitsTitle: string;
    benefits: string[];
    trustBadge: string;
    primaryCta: {
      text: string;
      href: string;
    };
    secondaryCta: {
      text: string;
      href: string;
    };
  };
}

export const servicesPageContent: ServicesPageContent = {
  hero: {
    badge: 'What We Do',
    title: 'End-to-End Data',
    titleHighlight: 'Analytics Services',
    subtitle: 'Our systematic approach to delivering measurable analytics outcomes. Each service is designed to address specific business challenges and drive strategic value.',
  },
  servicesGrid: {
    title: 'Our',
    titleHighlight: 'Services',
    subtitle: 'Explore our comprehensive data analytics services—each designed to transform your business with actionable insights',
  },
  businessImpact: {
    title: 'Business Outcomes',
    titleHighlight: 'You Can Expect',
    subtitle: 'What our services mean for your business—executive-focused outcomes, not just technical features',
  },
  industries: {
    title: 'Industries We',
    titleHighlight: 'Serve',
    subtitle: 'Our data analytics solutions are tailored to meet the unique challenges and requirements of different industries',
  },
  process: {
    badge: 'How We Work',
    title: 'Our Engagement',
    titleHighlight: 'Framework',
    subtitle: 'Each engagement, regardless of scope, follows our core framework. We begin with a deep-dive discovery to align on objectives, followed by agile development sprints with regular check-ins, and conclude with a comprehensive handover and performance review to ensure long-term success.',
    steps: [
      {
        number: 1,
        icon: 'mdi:magnify',
        title: 'Discovery & Strategy',
        description: 'Deep-dive analysis of your business challenges and data landscape to understand your objectives and constraints',
      },
      {
        number: 2,
        icon: 'mdi:lightbulb',
        title: 'Design & Planning',
        description: 'Design tailored solutions aligned with your strategic objectives and industry requirements',
      },
      {
        number: 3,
        icon: 'mdi:cogs',
        title: 'Implementation & Delivery',
        description: 'Build and deploy robust analytics solutions through agile sprints with regular check-ins',
      },
      {
        number: 4,
        icon: 'mdi:trending-up',
        title: 'Handover & Optimization',
        description: 'Comprehensive knowledge transfer, performance review, and ongoing optimization to ensure long-term success',
      },
    ] as ProcessStep[],
  },
  faq: {
    title: 'Frequently Asked',
    titleHighlight: 'Questions',
    subtitle: 'Common questions about our services—get answers before reaching out',
    viewAllText: 'View all FAQs',
  },
  cta: {
    title: 'Ready to Enhance',
    titleHighlight: 'Your Capabilities?',
    subtitle: 'Schedule a discovery call to discuss your analytics objectives and explore how we can help you achieve measurable business outcomes.',
    benefitsTitle: 'What You\'ll Get',
    benefits: [
      'Strategic consultation with an analytics expert',
      'Custom assessment of your needs',
      'Professional assessment with clear, actionable recommendations',
      'Direct access to senior professionals',
    ],
    trustBadge: 'Join leading organizations we\'ve helped',
    primaryCta: {
      text: 'Schedule a Discovery Call',
      href: 'contact',
    },
    secondaryCta: {
      text: 'Assess Your Maturity',
      href: 'tools/maturity-calculator',
    },
  },
};

