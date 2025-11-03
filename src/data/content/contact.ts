export const contactContent = {
  hero: {
    title: "Let's Start Your Analytics",
    titleHighlight: 'Journey Together',
    subtitle: "Share your analytics challenges and goals. We'll respond within 24 hours with a tailored approach for your business.",
  },
  sidebar: {
    title: 'Get in Touch',
    info: {
      fastResponse: {
        title: 'Fast Response Time',
        description: 'We typically respond to all inquiries within 24 hours during business days.',
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

