export interface ContactAction {
  text: string;
  type: 'button' | 'link';
  id?: string;
  href?: string;
}

export interface ContactAdditionalOption {
  icon: string;
  title: string;
  description: string;
  action: ContactAction;
}

export interface ContactContent {
  hero: {
    title: string;
    titleHighlight: string;
    subtitle: string;
    consultation: {
      title: string;
      benefits: string[];
    };
  };
  sidebar: {
    quickLinks: {
      title: string;
      links: Array<{
        icon: string;
        text: string;
        href: string;
      }>;
    };
  };
  whatHappensNext: {
    title: string;
    steps: Array<{
      number: number;
      title: string;
      timeframe: string;
      description: string;
    }>;
    prepare: {
      title: string;
      items: string[];
    };
  };
  additionalOptions: {
    title: string;
    subtitle: string;
    options: ContactAdditionalOption[];
  };
  trustIndicators: Array<{
    icon: string;
    title: string;
    description: string;
  }>;
  privacy: {
    text: string;
  };
}

export const contactContent: ContactContent = {
  hero: {
    title: "Let's Discuss Your",
    titleHighlight: 'Analytics Strategy',
    subtitle: 'Start a strategic conversation. Share your analytics objectives, and a senior member of our team will respond within 24 hours. No sales pitches, just professional dialogue focused on your goals.',
    consultation: {
      title: 'Your Strategic Consultation Includes:',
      benefits: [
        'Custom assessment of your data needs and objectives',
        'Strategic recommendations tailored to your business goals',
        'Clear action plan with prioritized next steps',
      ],
    },
  },
  sidebar: {
    quickLinks: {
      title: 'Before you reach out, you might want to:',
      links: [
        {
          icon: 'mdi:account-group',
          text: 'See how we work',
          href: 'about',
        },
        {
          icon: 'mdi:briefcase',
          text: 'Explore our services',
          href: 'services',
        },
        {
          icon: 'mdi:help-circle',
          text: 'Check our FAQ',
          href: 'faq',
        },
      ],
    },
  },
  whatHappensNext: {
    title: 'What Happens Next',
    steps: [
      {
        number: 1,
        title: 'We review',
        timeframe: 'Within 24 hours',
        description: 'A senior member of our team personally reviews your inquiry',
      },
      {
        number: 2,
        title: 'We connect',
        timeframe: 'Same day or next',
        description: 'Via email, phone, or video call—your choice',
      },
      {
        number: 3,
        title: 'Strategic consultation',
        timeframe: '30-45 minutes',
        description: 'We discuss your objectives, explore solutions, and provide strategic guidance',
      },
      {
        number: 4,
        title: 'Your plan',
        timeframe: 'Actionable steps',
        description: 'Clear next steps based on your objectives',
      },
    ],
    prepare: {
      title: 'What to Prepare (Optional):',
      items: [
        'Current data challenges or goals',
        'Existing analytics tools (if any)',
        'Key business questions you want answered',
      ],
    },
  },
  additionalOptions: {
    title: 'Other Ways to Connect',
    subtitle: 'Choose the method that works best for you',
    options: [
      {
        icon: 'mdi:calendar-clock',
        title: 'Schedule a Call',
        description: 'Book a strategic consultation',
        action: {
          text: 'Book Now →',
          type: 'button',
          id: 'schedule-btn',
        },
      },
      {
        icon: 'mdi:file-document',
        title: 'Download Brochure',
        description: 'Learn more about our services',
        action: {
          text: 'Download PDF →',
          type: 'link',
          href: 'brochure.pdf',
        },
      },
      {
        icon: 'mdi:calculator',
        title: 'Maturity Assessment',
        description: 'Assess your data analytics maturity',
        action: {
          text: 'Take Assessment →',
          type: 'link',
          href: 'tools/maturity-calculator',
        },
      },
    ],
  },
  trustIndicators: [
    {
      icon: 'mdi:handshake',
      title: 'No Sales Pressure',
      description: 'Get honest advice tailored to your needs. If we can\'t help, we\'ll tell you upfront—no pushy sales tactics.',
    },
    {
      icon: 'mdi:clock-fast',
      title: 'Rapid Response',
      description: 'Get a response from a senior team member within 24 hours. No automated replies or long wait times—just direct, professional communication.',
    },
  ],
  privacy: {
    text: 'Your information is confidential. We never share details. PDPL compliant.',
  },
};

