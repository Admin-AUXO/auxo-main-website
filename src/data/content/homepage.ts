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
    closing?: string;
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
    badge: 'Hello World!',
    title: 'Every organization has data.',
    titleHighlight: 'Few understand it!',
    subtitle: 'We turn your data into competitive advantage. Fast, agile, and built for startups who think bigger.',
    primaryCta: {
      text: 'Start Your Journey',
      href: 'contact',
    },
    secondaryCta: {
      text: 'Assess Your Data Maturity',
      href: 'tools/maturity-calculator',
    },
    features: [],
    scrollIndicator: 'Scroll More',
    startupAdvantage: {
      text: 'Why choose a startup consultancy? See the difference',
      href: '#startup-advantages',
    },
  },
  problems: {
    title: 'What Sets Us',
    titleHighlight: 'Apart',
    subtitle: 'We deliver real results through proven methods and modern tech—tailored to your business, not cookie-cutter solutions',
    challenges: [
      {
        icon: 'mdi:chart-line',
        title: 'Data-Driven Decisions',
        description: 'Transform complex data into clear, actionable insights that guide strategic business decisions',
      },
      {
        icon: 'mdi:rocket',
        title: 'Rapid Implementation',
        description: 'See results in weeks with our sprint-based approach that prioritizes quick wins and continuous improvement',
      },
      {
        icon: 'mdi:shield-check',
        title: 'Compliance Built-In',
        description: 'UAE PDPL and GDPR compliance integrated from the start—no retrofitting or compliance debt',
      },
      {
        icon: 'mdi:lightbulb',
        title: 'Custom Solutions',
        description: 'Tailored analytics frameworks designed specifically for your industry, size, and growth stage',
      },
      {
        icon: 'mdi:chart-bar',
        title: 'Enterprise Scalability',
        description: 'Architecture that grows with you—from startup dashboards to enterprise-wide analytics platforms',
      },
      {
        icon: 'mdi:code-tags',
        title: 'Modern Tech Stack',
        description: 'Latest cloud technologies, open-source tools, and best-in-class platforms—no legacy baggage',
      },
    ] as ProblemCard[],
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
    badge: 'Free Assessment',
    title: 'Discover Your Data',
    titleHighlight: 'Maturity Level',
    subtitle: 'Take our free assessment to understand where your organization stands and identify opportunities for growth.',
    benefits: [
      {
        title: 'Evaluate Key Dimensions',
        description: 'Assess Infrastructure, Analytics, People, Culture, and Governance',
      },
      {
        title: 'Get Actionable Insights',
        description: 'Receive personalized recommendations tailored to your organization',
      },
    ],
    cta: {
      text: 'Start Free Assessment',
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
    badge: 'Building Together',
    title: 'Join Us as We',
    titleHighlight: 'Shape the Future',
    subtitle: "We're building something new—a consultancy that combines enterprise expertise with startup agility. Join us as we reshape data analytics in the UAE.",
    benefits: [
      {
        icon: 'mdi:account-group',
        title: 'Direct Founder Access',
        description: 'Skip account managers and junior consultants—work directly with founders on every project',
      },
      {
        icon: 'mdi:rocket',
        title: 'Rapid Iteration',
        description: 'Get results in weeks, not months. Our sprint-based approach delivers value continuously',
      },
      {
        icon: 'mdi:lightbulb',
        title: 'Modern Stack',
        description: 'Latest tools and methodologies without legacy constraints',
      },
      {
        icon: 'mdi:handshake',
        title: 'Flexible Engagement',
        description: 'No long-term contracts. Transparent pricing. Cancel anytime',
      },
    ],
    limitedTime: {
      title: 'Early Partnership',
      message: 'We\'re building',
      count: 'something new',
      highlight: 'in the UAE',
    },
    cta: {
      text: 'Start Partnership',
      href: 'contact',
    },
    disclaimer: 'Free consultation • No obligation • Transparent process',
  },
  finalCta: {
    title: "Ready to Transform Your Data Into Decisions?",
    subtitle: "Let's chat about your analytics challenges and see how AUXO can help. Free consultation, no obligation—just a real conversation about your data.",
    ctaText: 'Schedule Free Consultation',
    ctaHref: 'contact',
  },
  methodology: {
    title: 'Our Proven Process',
    titleHighlight: '',
    subtitle: 'A systematic approach to delivering data analytics excellence',
    steps: [
      {
        number: 1,
        icon: 'mdi:magnify',
        title: 'Discovery',
        description: 'Understand your business challenges and data landscape',
        details: [],
      },
      {
        number: 2,
        icon: 'mdi:lightbulb',
        title: 'Strategy',
        description: 'Design tailored solutions aligned with your goals',
        details: [],
      },
      {
        number: 3,
        icon: 'mdi:cogs',
        title: 'Implementation',
        description: 'Build and deploy robust analytics solutions',
        details: [],
      },
      {
        number: 4,
        icon: 'mdi:trending-up',
        title: 'Support',
        description: 'Ongoing optimization and knowledge transfer',
        details: [],
      },
    ],
  },
  startupAdvantages: {
    advantages: [
      {
        icon: 'mdi:account-group',
        title: 'Direct Access to Founders',
        description: 'Work directly with founders and senior team members on every project. No account managers. No junior consultants.',
      },
      {
        icon: 'mdi:rocket',
        title: 'Agile Methodology',
        description: 'Fast results through iterative sprints. No lengthy planning phases. Quick wins, continuous improvement.',
      },
      {
        icon: 'mdi:lightning-bolt',
        title: 'No Bureaucracy',
        description: 'Fast decisions. Quick responses. No layers of approval. We move at startup speed.',
      },
      {
        icon: 'mdi:heart',
        title: 'Personal Attention',
        description: "You're not just a number. We care about your success. Every client gets dedicated attention from day one.",
      },
    ],
  },
};

