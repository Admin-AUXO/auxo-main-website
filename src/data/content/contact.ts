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
  };
  sidebar: {
    title: string;
    info: {
      fastResponse: {
        title: string;
        description: string;
      };
    };
  };
  additionalOptions: ContactAdditionalOption[];
}

export const contactContent: ContactContent = {
  hero: {
    title: "Let's Start Your Analytics",
    titleHighlight: 'Journey Together',
    subtitle: "As a startup, we move fast. Share your challenges and we'll respond within 24 hours with a personalized approach—no automated replies, no sales funnels. Just real conversations.",
    benefits: [
      'Free strategy session with founders',
      'Custom assessment of your data needs',
      'Personalized recommendations',
      'No obligation, just honest advice',
    ],
  },
  sidebar: {
    title: 'Get in Touch',
    info: {
      fastResponse: {
        title: 'Startup Advantage',
        description: 'Get direct access to founders and senior team. Quick decisions, no bureaucracy, responses within 24 hours.',
      },
    },
  },
  additionalOptions: [
    {
      icon: 'mdi:calendar-clock',
      title: 'Schedule a Call',
      description: 'Book a free 30-minute consultation',
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
};

