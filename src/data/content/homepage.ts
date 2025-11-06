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
    primaryCta: {
      text: string;
      href: string;
    };
    secondaryCta: {
      text: string;
      href: string;
    };
    scrollIndicator: string;
  };
  startupAdvantages: {
    badge: string;
    title: string;
    titleHighlight: string;
    subtitle: string;
    advantages: Array<{
      icon: string;
      title: string;
      description: string;
      metric?: string;
    }>;
    comparison: {
      them: {
        title: string;
        items: string[];
      };
      us: {
        title: string;
        items: string[];
      };
    };
  };
  problems: {
    badge: string;
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
  servicesPreview: {
    badge: string;
    title: string;
    titleHighlight: string;
    subtitle: string;
    viewAllText: string;
  };
  launchOffer: {
    badge: string;
    sectionBadge: string;
    title: string;
    titleHighlight: string;
    subtitle: string;
    benefits: Array<{
      icon: string;
      title: string;
      description: string;
    }>;
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
    secondaryCtaText: string;
    secondaryCtaHref: string;
    benefits: string[];
  };
  methodology: {
    badge: string;
    title: string;
    titleHighlight: string;
    subtitle: string;
    steps: ProcessStep[];
  };
}

export const homepageContent: HomepageContent = {
  hero: {
    badge: 'HELLO WORLD!',
    title: 'Transform Your Data Into',
    titleHighlight: 'Strategic Advantage',
    subtitle: 'Enterprise analytics expertise, delivered with the efficiency and direct access modern organizations demand. We partner with clients across the GCC, Europe, and global markets from our strategic hub in Dubai.',
    primaryCta: {
      text: 'Start Your Journey',
      href: 'contact',
    },
    secondaryCta: {
      text: 'Assess Your Data Maturity',
      href: 'tools/maturity-calculator',
    },
    scrollIndicator: 'Scroll More',
  },
  problems: {
    badge: 'What We Deliver',
    title: 'Our Core',
    titleHighlight: 'Capabilities',
    subtitle: 'We deliver measurable results through proven methodologies and modern technology, tailored to your industry and strategic goals.',
    challenges: [
      {
        icon: 'mdi:rocket',
        title: 'Speed-to-Value',
        description: 'Rapid implementation through proven sprint-based methodologies that deliver measurable outcomes in weeks, not months',
      },
      {
        icon: 'mdi:shield-check',
        title: 'International Compliance',
        description: 'UAE PDPL and GDPR compliance expertise embedded from day one, ensuring regulatory peace of mind across global markets',
      },
      {
        icon: 'mdi:chart-line',
        title: 'Industry-Specific Frameworks',
        description: 'Tailored analytics solutions designed for your sector, leveraging proven frameworks adapted to your strategic objectives',
      },
      {
        icon: 'mdi:lightbulb',
        title: 'Data-Driven Decisions',
        description: 'Transform complex data into clear, actionable insights that guide strategic business decisions and drive measurable value',
      },
      {
        icon: 'mdi:chart-bar',
        title: 'Enterprise Scalability',
        description: 'Architecture that grows with you, from startup dashboards to enterprise-wide analytics platforms designed for sustainable growth',
      },
      {
        icon: 'mdi:code-tags',
        title: 'Modern Tech Stack',
        description: 'Contemporary cloud technologies and proven platforms, delivering scalable solutions without legacy system constraints',
      },
    ] as ProblemCard[],
  },
  whyChoose: {
    title: 'Why Leading Organizations',
    titleHighlight: 'Partner With Us',
    subtitle: 'Enterprise expertise meets modern efficiency—delivering strategic value with the agility that sophisticated organizations demand',
    items: [
      {
        icon: 'mdi:rocket',
        title: 'Rapid Iteration',
        description: 'Fast decision-making and responsive execution through streamlined processes that prioritize your strategic objectives and deliver measurable outcomes',
      },
      {
        icon: 'mdi:account-group',
        title: 'Senior Team Involvement',
        description: 'Direct collaboration with experienced professionals on every engagement, ensuring strategic guidance and executive-level expertise throughout each project',
      },
      {
        icon: 'mdi:lightbulb',
        title: 'Fresh Perspective',
        description: 'Contemporary methodologies and proven tools, unburdened by legacy processes or outdated approaches, delivering innovative solutions for modern challenges',
      },
      {
        icon: 'mdi:map-marker',
        title: 'Regional & International Expertise',
        description: 'Dubai-based hub serving GCC, European, and global markets with deep understanding of cross-border regulations and strategic business dynamics',
      },
    ] as WhyChooseItem[],
  },
  servicesPreview: {
    badge: 'Our Solutions',
    title: 'Comprehensive',
    titleHighlight: 'Analytics Solutions',
    subtitle: 'Comprehensive analytics solutions from strategic planning to advanced AI implementation. Delivering measurable outcomes for organizations across industries.',
    viewAllText: 'View All Services',
  },
  launchOffer: {
    badge: 'Founding Client Program',
    sectionBadge: 'Working With AUXO',
    title: 'Join Us as We',
    titleHighlight: 'Shape the Future',
    subtitle: 'Partner with us in our founding phase and benefit from preferential terms, priority access, and a collaborative approach to shaping our service frameworks.',
    benefits: [
      {
        icon: 'mdi:account-group',
        title: 'Executive-Level Partnership',
        description: 'Collaborate directly with founding partners on strategic decisions, ensuring your project receives senior expertise and decisive leadership from day one',
      },
      {
        icon: 'mdi:rocket',
        title: 'Rapid Iteration',
        description: 'Deliver measurable results in weeks, not months, through our proven sprint-based approach and continuous value delivery',
      },
      {
        icon: 'mdi:lightbulb',
        title: 'Modern Stack',
        description: 'Leverage contemporary tools and proven methodologies unburdened by legacy systems, ensuring scalable and sustainable solutions for your organization',
      },
      {
        icon: 'mdi:handshake',
        title: 'Flexible Engagement',
        description: 'Transparent pricing with flexible terms and no long-term commitments, designed to align with your strategic objectives',
    },
    ],
    cta: {
      text: 'Explore Partnership',
      href: 'contact',
    },
    disclaimer: 'Strategic consultation • No obligation • Transparent process',
  },
  finalCta: {
    title: "Ready to Unlock Your Data's Potential?",
    subtitle: 'Schedule a consultation to discuss your analytics objectives and explore how we can help you achieve measurable business outcomes.',
    ctaText: 'Schedule Consultation',
    ctaHref: 'contact',
    secondaryCtaText: 'Explore Services',
    secondaryCtaHref: 'services',
    benefits: [
      'Strategic Consultation',
      'No Obligation',
      'Direct Senior Access',
    ],
  },
  methodology: {
    badge: 'How We Work',
    title: 'How We Deliver',
    titleHighlight: 'Results',
    subtitle: 'A systematic approach to delivering data analytics excellence',
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
    ],
  },
  startupAdvantages: {
    badge: 'Why Choose Us',
    title: 'Efficiency Meets',
    titleHighlight: 'Enterprise Expertise',
    subtitle: 'Big consultancies vs. startup agility—here\'s what makes AUXO different.',
    advantages: [
      {
        icon: 'mdi:account-group',
        title: 'No Intermediary Layers',
        description: 'Your project is handled directly by experienced founders and senior professionals from start to finish, ensuring strategic alignment and expertise at every stage',
      },
      {
        icon: 'mdi:rocket',
        title: 'Agile Methodology',
        description: 'Deliver fast results through proven iterative sprints and continuous improvement, prioritizing quick wins and measurable outcomes',
      },
      {
        icon: 'mdi:lightning-bolt',
        title: 'Streamlined Decision-Making',
        description: 'Enable rapid decisions and efficient processes through streamlined structures that move with the speed that drives results',
      },
      {
        icon: 'mdi:heart',
        title: 'Dedicated Focus',
        description: 'Every client receives dedicated attention from day one, ensuring your strategic objectives remain our priority throughout the engagement',
      },
    ],
    comparison: {
      them: {
        title: 'Big Consultancies',
        items: [
          'Slow processes',
          'Junior consultants',
          'High costs',
          'Multiple layers',
        ],
      },
      us: {
        title: 'AUXO Data Labs',
        items: [
          'Fast results',
          'Direct founder access',
          'Transparent pricing',
          'Streamlined processes',
        ],
      },
    },
  },
};

