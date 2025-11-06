export interface FAQPageContent {
  hero: {
    badge: string;
    title: string;
    titleHighlight: string;
    subtitle: string;
  };
  cta: {
    title: string;
    titleHighlight: string;
    subtitle: string;
  };
}

export const faqPageContent: FAQPageContent = {
  hero: {
    badge: 'FAQ',
    title: 'Frequently Asked',
    titleHighlight: 'Questions',
    subtitle: 'Find answers to common questions about our data analytics services, pricing, and how we can help transform your business.',
  },
  cta: {
    title: 'Still Have Questions?',
    titleHighlight: "Let's Talk",
    subtitle: 'Our team is here to help. Get in touch and we\'ll answer any questions you have about our services.',
  },
};

