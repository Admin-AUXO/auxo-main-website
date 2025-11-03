export const contactContent = {
  hero: {
    title: "Let's Start Your Analytics",
    titleHighlight: 'Journey Together',
    subtitle: "As a startup, we move fast. Share your challenges and we'll respond within 24 hours with a personalized approach—no automated replies, no sales funnels. Just real conversations.",
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
        type: 'button' as const,
        id: 'schedule-btn',
      },
    },
    {
      icon: 'mdi:file-document',
      title: 'Download Brochure',
      description: 'Learn more about our services',
      action: {
        text: 'Download PDF →',
        type: 'link' as const,
        href: 'brochure.pdf',
      },
    },
    {
      icon: 'mdi:calculator',
      title: 'Maturity Assessment',
      description: 'Assess your data analytics maturity',
      action: {
        text: 'Take Assessment →',
        type: 'link' as const,
        href: 'tools/maturity-calculator',
      },
    },
  ],
};

