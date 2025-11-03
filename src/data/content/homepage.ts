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
    badge: 'Unlock Insights. Drive Decisions.',
    title: 'Turn Information Into',
    titleHighlight: 'Actionable Intelligence',
    subtitle: 'Empowering UAE businesses with advanced analytics and AI solutions',
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
      'Globally Compliant',
      'Measurable Impact',
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
        description: 'We assess your current state, understand your business goals, and identify key opportunities for impact',
      },
      {
        number: 2,
        icon: 'mdi:lightbulb',
        title: 'Design',
        description: 'We create a tailored analytics roadmap with clear milestones, technology choices, and success metrics',
      },
      {
        number: 3,
        icon: 'mdi:check-circle',
        title: 'Deploy',
        description: 'We implement solutions using agile sprints, ensuring rapid delivery and continuous feedback loops',
      },
      {
        number: 4,
        icon: 'mdi:chart-line',
        title: 'Optimize',
        description: 'We monitor performance, refine models, and continuously improve to maximize your ROI and business value',
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
    subtitle: 'Your trusted analytics partner in the UAE',
    items: [
      {
        icon: 'mdi:map-marker',
        title: 'Dubai-Based Expertise',
        description: 'Local team with deep understanding of UAE market dynamics and regulatory requirements',
      },
      {
        icon: 'mdi:certificate',
        title: 'Proven Track Record',
        description: 'Delivering measurable results through strategic insights and cutting-edge analytics',
      },
      {
        icon: 'mdi:security',
        title: 'Security & Compliance',
        description: 'Full compliance with UAE PDPL, GDPR, and enterprise-grade security standards',
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
    subtitle: "As a new consultancy, we're offering exclusive benefits to our founding clients who trust us to transform their analytics capabilities",
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
      title: 'Limited Time Offer',
      message: 'Only',
      count: '7 spots remaining',
      highlight: 'for founding clients',
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

