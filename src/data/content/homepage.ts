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
}

export interface ValueProp {
  icon: string;
  title: string;
  description: string;
}

export interface WhyChooseItem {
  icon: string;
  title: string;
  description: string;
}

export const homepageContent = {
  hero: {
    badge: 'Rethink Data. Rethink Decisions.',
    title: 'Every Organization has data.',
    titleHighlight: 'Few understand it',
    subtitle: 'Empowering confident, data-driven decisions at speed and scale.',
    primaryCta: {
      text: 'Schedule Free Consultation',
      href: 'contact',
    },
    secondaryCta: {
      text: 'Explore Services',
      href: '#services',
    },
    features: [
      'Precision Analytics',
      'Build Competitive Edge',
      'Navigate Uncertainty',
    ],
    scrollIndicator: 'Scroll to explore',
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
  methodology: {
    title: 'Our',
    titleHighlight: 'Proven Methodology',
    subtitle: 'A structured approach to turn your analytics vision into reality',
    steps: [
      {
        number: 1,
        icon: 'mdi:eye',
        title: 'Discover',
        description: 'Assess your current analytics state and identify strategic opportunities for growth',
      },
      {
        number: 2,
        icon: 'mdi:lightbulb',
        title: 'Design',
        description: 'Create a tailored analytics roadmap with clear milestones and success metrics',
      },
      {
        number: 3,
        icon: 'mdi:check-circle',
        title: 'Deploy',
        description: 'Implement solutions using agile sprints with rapid delivery and continuous feedback',
      },
      {
        number: 4,
        icon: 'mdi:chart-line',
        title: 'Optimize',
        description: 'Monitor performance, refine models, and continuously improve to maximize ROI',
      },
    ] as ProcessStep[],
    valueProps: [
      { label: '2-4 Weeks', description: 'Time to First Insights' },
      { label: 'Agile', description: 'Iterative Approach' },
      { label: '100%', description: 'Transparent Process' },
    ],
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
    badge: 'Free Assessment Tool',
    title: 'Discover Your Analytics',
    titleHighlight: 'Maturity Level',
    subtitle: 'Take our 5-minute assessment to understand where your organization stands and get personalized recommendations.',
    benefits: [
      {
        title: 'Evaluate 5 Key Dimensions',
        description: 'Infrastructure, Analytics, People, Culture, and Governance',
      },
      {
        title: 'Get Instant Results',
        description: 'Receive your maturity score and actionable recommendations',
      },
      {
        title: '100% Free & Anonymous',
        description: 'No registration required, completely confidential',
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
    titleHighlight: 'Insights',
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
    title: 'Ready to Transform Your Business?',
    subtitle: 'Schedule a free consultation to discuss your analytics needs',
    ctaText: 'Get Started Today',
    ctaHref: 'contact',
  },
};

