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
  process: {
    title: string;
    subtitle: string;
    steps: ProcessStep[];
  };
  cta: {
    title: string;
    subtitle: string;
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
    subtitle: 'Enterprise-grade solutions delivered with startup speed and personal attention. Every project gets direct access to our senior team.',
  },
  process: {
    title: 'Our Proven Process',
    subtitle: 'A systematic approach to delivering data analytics excellence',
    steps: [
      {
        number: 1,
        icon: 'mdi:magnify',
        title: 'Discovery',
        description: 'Understand your business challenges and data landscape',
      },
      {
        number: 2,
        icon: 'mdi:lightbulb',
        title: 'Strategy',
        description: 'Design tailored solutions aligned with your goals',
      },
      {
        number: 3,
        icon: 'mdi:cogs',
        title: 'Implementation',
        description: 'Build and deploy robust analytics solutions',
      },
      {
        number: 4,
        icon: 'mdi:trending-up',
        title: 'Support',
        description: 'Ongoing optimization and knowledge transfer',
      },
    ] as ProcessStep[],
  },
  cta: {
    title: 'Ready to Get Started?',
    subtitle: "Let's discuss how we can help transform your data into actionable insights and competitive advantage",
    primaryCta: {
      text: 'Schedule Consultation',
      href: 'contact',
    },
    secondaryCta: {
      text: 'Assess Your Maturity',
      href: 'tools/maturity-calculator',
    },
  },
};

