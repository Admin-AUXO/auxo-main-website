export interface Value {
  icon: string;
  title: string;
  description: string;
  demonstration?: string;
}

export interface Stat {
  value: string;
  title: string;
  description: string;
}

export interface AboutContent {
  hero: {
    badge: string;
    title: string;
    titleHighlight: string;
    subtitle: string;
    namingStory?: {
      title: string;
      description: string;
    };
    whyStarted?: {
      title: string;
      description: string;
    };
  };
  mission: {
    icon: string;
    title: string;
    description: string;
  };
  vision: {
    icon: string;
    title: string;
    description: string;
  };
  values: {
    title: string;
    subtitle: string;
    items: Value[];
  };
  whyChoose: {
    title: string;
    subtitle: string;
    stats: Stat[];
  };
  team: {
    title: string;
    subtitle: string;
    hiring: {
      text: string;
      ctaText: string;
      ctaHref: string;
    };
  };
  finalCta: {
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

export const aboutContent: AboutContent = {
  hero: {
    badge: 'Our Story',
    title: 'Built to Transform',
    titleHighlight: 'Data Into Decisions',
    subtitle: "Enterprise-grade analytics with startup speed. We're building the consultancy we wish existed—fast decisions, founder access, transparent pricing. No bureaucracy, just results.",
    namingStory: {
      title: 'Why AUXO?',
      description: 'AUXO comes from "auxilium"—Latin for "help" or "support." We\'re here to help you unlock your data\'s potential. Simple name, clear mission: transform data into decisions.',
    },
    whyStarted: {
      title: 'Why We Started AUXO',
      description: 'We saw great insights trapped behind slow processes and high costs. UAE startups and mid-sized companies needed enterprise analytics but couldn\'t access traditional consultancies. So we built AUXO—same quality, startup speed, transparent pricing. Your success drives every decision.',
    },
  },
  mission: {
    icon: 'mdi:target',
    title: 'Our Mission',
    description: 'To make enterprise-grade data analytics accessible to every UAE business. We believe that powerful insights shouldn\'t be limited to large corporations with massive budgets. Every organization, from startups to enterprises, deserves access to world-class analytics that drive real business value.',
  },
  vision: {
    icon: 'mdi:eye',
    title: 'Our Vision',
    description: 'To make intelligence effortless — a world where every decision is clear, confident, and precise',
  },
  values: {
    title: 'Our Core Values',
    subtitle: 'The principles that guide everything we do',
    items: [
      {
        icon: 'mdi:lightbulb',
        title: 'Innovation',
        description: 'We embrace cutting-edge technologies and continuously evolve our solutions',
        demonstration: 'We use the latest tools and methodologies, not legacy systems. Our startup status means we\'re not tied to outdated technology stacks.',
      },
      {
        icon: 'mdi:handshake',
        title: 'Partnership',
        description: 'Your success is our success. We work as an extension of your team',
        demonstration: 'Direct founder access means you get strategic thinking, not just execution. We\'re invested in your long-term success.',
      },
      {
        icon: 'mdi:shield-check',
        title: 'Integrity',
        description: 'We maintain the highest standards of data security and ethical practices',
        demonstration: 'PDPL compliant from day one. Transparent processes. No hidden costs. Your data and trust are our top priorities.',
      },
      {
        icon: 'mdi:trophy',
        title: 'Excellence',
        description: 'We deliver exceptional quality in every project, no matter the size',
        demonstration: 'Every project gets founder attention. No junior consultants learning on your dime. We deliver enterprise quality with startup speed.',
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

