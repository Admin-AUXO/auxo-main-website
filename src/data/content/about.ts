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
    badge: 'Our Story',
    title: 'Built to Transform',
    titleHighlight: 'Data Into Decisions',
    subtitle: "We're a new analytics consultancy launched in 2025, founded by experienced data professionals who saw a gap: UAE businesses need enterprise-grade analytics solutions delivered with startup speed and personal attention.",
  },
  mission: {
    icon: 'mdi:target',
    title: 'Our Mission',
    description: 'To make enterprise-grade data analytics accessible to every UAE business. We believe that powerful insights shouldn\'t be limited to large corporations with massive budgets. Every organization, from startups to enterprises, deserves access to world-class analytics that drive real business value.',
  },
  vision: {
    icon: 'mdi:eye',
    title: 'Our Vision',
    description: "To become the most trusted analytics partner in the UAE by combining deep technical expertise with genuine understanding of local business needs. We're building something different: a consultancy that moves fast, thinks differently, and puts client success above everything else.",
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
    title: 'Why We Started AUXO',
    subtitle: 'The story behind our launch and what drives us',
    stats: [
      {
        value: '15+',
        title: 'Years Combined Experience',
        description: 'Our founding team brings deep expertise from leading organizations',
      },
      {
        value: '2025',
        title: 'Launch Year',
        description: 'Fresh perspective, latest methodologies, unburdened by legacy',
      },
      {
        value: '100%',
        title: 'Client-Focused',
        description: 'Every decision is made with your success in mind, not bureaucracy',
      },
    ] as Stat[],
  },
  team: {
    title: 'Meet the Founders',
    subtitle: 'Experienced data professionals building something new for the UAE',
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

