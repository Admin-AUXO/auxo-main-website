export interface ProblemCard {
  icon: string;
  title: string;
  description: string;
}

export interface ProcessStep {
  number: number;
  icon: string;
  title: string;
  description: string;
  details?: string[];
}

export interface ValueProp {
  label: string;
  description: string;
}

export interface WhyChooseItem {
  icon: string;
  title: string;
  description: string;
}

export interface HomepageContent {
  hero: {
    badge: string;
    title: string;
    titleHighlight: string;
    subtitle: string;
    subheadline?: string;
    primaryCta: {
      text: string;
      href: string;
    };
    secondaryCta: {
      text: string;
      href: string;
    };
    features: string[];
    scrollIndicator: string;
    startupAdvantage?: {
      text: string;
      href: string;
    };
  };
  startupAdvantages: {
    advantages: Array<{
      icon: string;
      title: string;
      description: string;
      metric?: string;
    }>;
  };
  problems: {
    title: string;
    titleHighlight: string;
    subtitle: string;
    challenges: ProblemCard[];
    closing: string;
  };
  whyChoose: {
    title: string;
    titleHighlight: string;
    subtitle: string;
    items: WhyChooseItem[];
  };
  maturityCalculator: {
    badge: string;
    title: string;
    titleHighlight: string;
    subtitle: string;
    benefits: Array<{
      title: string;
      description: string;
    }>;
    cta: {
      text: string;
      href: string;
    };
    dimensions: Array<{
      name: string;
      score: string;
      percentage: number;
    }>;
    resultLabel: string;
    resultSubtext: string;
  };
  blog: {
    title: string;
    titleHighlight: string;
    subtitle: string;
    viewAllText: string;
  };
  launchOffer: {
    badge: string;
    title: string;
    titleHighlight: string;
    subtitle: string;
    benefits: Array<{
      icon: string;
      title: string;
      description: string;
    }>;
    limitedTime: {
      title: string;
      message: string;
      count: string;
      highlight: string;
    };
    cta: {
      text: string;
      href: string;
    };
    disclaimer: string;
  };
  finalCta: {
    title: string;
    subtitle: string;
    ctaText: string;
    ctaHref: string;
  };
  methodology: {
    title: string;
    titleHighlight: string;
    subtitle: string;
    steps: ProcessStep[];
  };
}

export const homepageContent: HomepageContent = {
  hero: {
    badge: '',
    title: 'Every Organization has data. Few understand it',
    titleHighlight: '',
    subtitle: 'Empowering confident, data-driven decisions at speed and scale.',
    primaryCta: {
      text: '',
      href: 'contact',
    },
    secondaryCta: {
      text: "Check your Org's Data Maturity",
      href: 'tools/maturity-calculator',
    },
    features: [
      'Precision Analytics',
      'Build Competitive Edge',
      'Navigate Uncertainty',
    ],
    scrollIndicator: 'Scroll to explore',
    startupAdvantage: {
      text: 'Why work with a startup? Agility. Innovation. Personal attention. See the difference',
      href: '#startup-advantages',
    },
  },
  problems: {
    title: 'Are You Struggling with',
    titleHighlight: 'Analytics Challenges?',
    subtitle: 'Many UAE businesses face similar obstacles when trying to leverage their data effectively',
    challenges: [
      {
        icon: 'mdi:alert-circle',
        title: 'Siloed Data',
        description: 'Information scattered across spreadsheets, databases, and systems with no unified view',
      },
      {
        icon: 'mdi:chart-line',
        title: 'Slow Insights',
        description: 'Weeks or months to get answers to critical business questions when you need them now',
      },
      {
        icon: 'mdi:account-group',
        title: 'Skills Gap',
        description: 'Lack of in-house analytics expertise to turn raw information into strategic decisions',
      },
      {
        icon: 'mdi:chart-bar',
        title: 'Unclear ROI',
        description: 'Investing in tools and platforms without seeing measurable business impact or value',
      },
      {
        icon: 'mdi:shield-check',
        title: 'Compliance Concerns',
        description: 'Uncertainty about UAE PDPL, GDPR compliance and data governance requirements',
      },
      {
        icon: 'mdi:chart-line',
        title: 'Limited Scalability',
        description: "Current analytics setup can't keep pace with your business growth and evolving needs",
      },
    ] as ProblemCard[],
    closing: 'We help you overcome these challenges with proven methodologies and cutting-edge solutions',
  },
  whyChoose: {
    title: 'Why Choose',
    titleHighlight: 'AUXO?',
    subtitle: 'The startup advantage: agility, innovation, and personal attention',
    items: [
      {
        icon: 'mdi:rocket',
        title: 'Startup Agility',
        description: 'Fast decision-making, flexible approaches, and rapid execution without corporate bureaucracy',
      },
      {
        icon: 'mdi:account-group',
        title: 'Direct Access',
        description: 'Work directly with founders and senior team members, not junior consultants or account managers',
      },
      {
        icon: 'mdi:lightbulb',
        title: 'Fresh Perspective',
        description: 'Latest methodologies and cutting-edge tools, unburdened by legacy processes or outdated approaches',
      },
      {
        icon: 'mdi:map-marker',
        title: 'UAE-First',
        description: 'Built in Dubai, designed for UAE businesses with deep understanding of local market and regulations',
      },
    ] as WhyChooseItem[],
  },
  maturityCalculator: {
    badge: '',
    title: 'Get Your Data',
    titleHighlight: 'Maturity Report',
    subtitle: 'Take our assessment to see where your organization stands on data maturity.',
    benefits: [
      {
        title: 'Evaluate 5 Key Dimensions',
        description: 'Infrastructure, Analytics, People, Culture, and Governance',
      },
      {
        title: 'Get Instant Results',
        description: 'Receive your maturity score and actionable recommendations',
      },
    ],
    cta: {
      text: 'Start Data Assessment',
      href: 'tools/maturity-calculator',
    },
    dimensions: [
      { name: 'Infrastructure', score: '4.2/5', percentage: 84 },
      { name: 'Analytics', score: '3.8/5', percentage: 76 },
      { name: 'People & Skills', score: '3.5/5', percentage: 70 },
    ],
    resultLabel: 'Managed Level',
    resultSubtext: 'Example Result Preview',
  },
  blog: {
    title: 'Latest',
    titleHighlight: '',
    subtitle: 'Expert perspectives on analytics, AI, and digital transformation in the UAE',
    viewAllText: 'View All Articles',
  },
  launchOffer: {
    badge: 'Founding Client Offer',
    title: 'Be Among Our',
    titleHighlight: 'First 10 Partners',
    subtitle: "We're a new consultancy with big ambitions. Join us as a founding partner and get enterprise-level expertise at startup-friendly terms.",
    benefits: [
      {
        icon: 'mdi:chart-bar',
        title: '30% Discount',
        description: 'On your first 3-month engagement',
      },
      {
        icon: 'mdi:check-circle',
        title: 'Priority Support',
        description: 'Direct access to our senior team',
      },
      {
        icon: 'mdi:certificate',
        title: 'Free Assessment',
        description: 'Comprehensive maturity evaluation (AED 5,000 value)',
      },
      {
        icon: 'mdi:shield-check',
        title: 'Partner Status',
        description: 'Preferred pricing for 12 months',
      },
    ],
    limitedTime: {
      title: 'Limited Availability',
      message: 'Only',
      count: '10 founding client spots',
      highlight: 'available in 2025',
    },
    cta: {
      text: 'Claim Your Spot Now',
      href: 'contact',
    },
    disclaimer: 'No long-term contracts required • Cancel anytime',
  },
  finalCta: {
    title: "Ready to Unlock Your Data's Potential?",
    subtitle: "Let's build your data-driven future. Schedule a free consultation to discuss your analytics challenges and discover how AUXO can help you achieve your goals.",
    ctaText: 'Schedule a Free Consultation',
    ctaHref: 'contact',
  },
  methodology: {
    title: 'Our Proven 4-Step',
    titleHighlight: 'Methodology',
    subtitle: 'We follow a structured, agile process to deliver actionable insights and measurable results, ensuring transparency and collaboration at every stage.',
    steps: [
      {
        number: 1,
        icon: 'mdi:magnify',
        title: 'Discover & Strategize',
        description: 'We start by understanding your business goals, challenges, and existing data landscape to define a clear analytics strategy.',
        details: [
          'Stakeholder workshops',
          'Data source identification',
          'KPI definition',
          'Technology stack assessment',
        ],
      },
      {
        number: 2,
        icon: 'mdi:cogs',
        title: 'Engineer & Implement',
        description: 'Our team builds robust data pipelines and infrastructure to ensure your data is clean, accessible, and ready for analysis.',
        details: [
          'ETL/ELT pipeline development',
          'Data warehousing setup',
          'Data governance framework',
          'Cloud infrastructure configuration',
        ],
      },
      {
        number: 3,
        icon: 'mdi:chart-bar',
        title: 'Analyze & Visualize',
        description: 'We transform raw data into interactive dashboards and reports, uncovering insights that drive informed decision-making.',
        details: [
          'Business intelligence dashboards',
          'Predictive analytics models',
          'Custom performance reports',
          'Data storytelling and presentation',
        ],
      },
      {
        number: 4,
        icon: 'mdi:trending-up',
        title: 'Optimize & Scale',
        description: 'We continuously refine your analytics solution, providing ongoing support to ensure it evolves with your business needs.',
        details: [
          'Performance monitoring',
          'A/B testing and experimentation',
          'User training and adoption',
          'Scalability planning',
        ],
      },
    ],
  },
  startupAdvantages: {
    advantages: [
      {
        icon: 'mdi:account-group',
        title: 'Direct Access to Founders',
        description: 'Work directly with founders and senior team members. No account managers. No junior consultants.',
      },
      {
        icon: 'mdi:rocket',
        title: 'Agile Methodology',
        description: 'Fast results through iterative sprints. No lengthy planning phases. Quick wins, continuous improvement.',
        metric: '2-4 weeks to first insights vs. 8-12 weeks',
      },
      {
        icon: 'mdi:lightning-bolt',
        title: 'No Bureaucracy',
        description: 'Fast decisions. Quick responses. No layers of approval. We move at startup speed.',
        metric: 'Same-day decisions vs. multi-week approval cycles',
      },
      {
        icon: 'mdi:heart',
        title: 'Personal Attention',
        description: "You're not just a number. We care about your success. Every client gets dedicated attention.",
        metric: '100% founder involvement vs. junior consultant teams',
      },
    ],
  },
};

