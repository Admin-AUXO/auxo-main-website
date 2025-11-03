export interface Value {
  icon: string;
  title: string;
  description: string;
}

export interface Stat {
  value: string;
  title: string;
  description: string;
}

export const aboutContent = {
  hero: {
    badge: 'About AUXO Data Labs',
    title: 'Turning Information Into',
    titleHighlight: 'Competitive Advantage',
    subtitle: "We're a fresh team of data scientists, engineers, and strategists on a mission to make enterprise-grade analytics accessible to UAE businesses.",
  },
  mission: {
    icon: 'mdi:target',
    title: 'Our Mission',
    description: 'To democratize data analytics by making enterprise-grade solutions accessible to organizations of all sizes, empowering them to make data-driven decisions that drive growth and innovation.',
  },
  vision: {
    icon: 'mdi:eye',
    title: 'Our Vision',
    description: "To be the Middle East's leading data analytics partner, recognized for delivering transformative insights that enable organizations to thrive in an increasingly data-driven world.",
  },
  values: {
    title: 'Our Core Values',
    subtitle: 'The principles that guide everything we do',
    items: [
      {
        icon: 'mdi:lightbulb',
        title: 'Innovation',
        description: 'We embrace cutting-edge technologies and continuously evolve our solutions',
      },
      {
        icon: 'mdi:handshake',
        title: 'Partnership',
        description: 'Your success is our success. We work as an extension of your team',
      },
      {
        icon: 'mdi:shield-check',
        title: 'Integrity',
        description: 'We maintain the highest standards of data security and ethical practices',
      },
      {
        icon: 'mdi:trophy',
        title: 'Excellence',
        description: 'We deliver exceptional quality in every project, no matter the size',
      },
    ] as Value[],
  },
  whyChoose: {
    title: 'Why Choose AUXO?',
    subtitle: 'What sets us apart in the data analytics landscape',
    stats: [
      {
        value: '15+',
        title: 'Technologies Mastered',
        description: 'From cloud platforms to ML frameworks',
      },
      {
        value: '20+',
        title: 'Years Combined Experience',
        description: 'Deep expertise across data analytics domains',
      },
      {
        value: '100%',
        title: 'UAE Compliant',
        description: 'PDPL, GDPR, and data sovereignty standards',
      },
    ] as Stat[],
  },
  team: {
    title: 'Meet Our Team',
    subtitle: 'Data experts passionate about your success',
    hiring: {
      text: 'Interested in joining our team?',
      ctaText: "We're Hiring",
      ctaHref: 'contact',
    },
  },
  finalCta: {
    title: "Let's Work Together",
    subtitle: "Ready to transform your data into insights? We'd love to hear about your challenges and explore how we can help.",
    primaryCta: {
      text: 'Get in Touch',
      href: 'contact',
    },
    secondaryCta: {
      text: 'View Our Services',
      href: 'services',
    },
  },
};

