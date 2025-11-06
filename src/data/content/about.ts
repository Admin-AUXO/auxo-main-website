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

export interface Credential {
  icon: string;
  label: string;
  description: string;
}

export interface Comparison {
  feature: string;
  them: string;
  us: string;
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
  credentials: {
    title: string;
    subtitle: string;
    items: Credential[];
  };
  whyDifferent: {
    title: string;
    subtitle: string;
    comparisons: Comparison[];
    labels: {
      feature: string;
      them: string;
      us: string;
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
    subtitle: "We're experienced analytics professionals who built the consultancy we'd want to hire: expert, efficient, and transparent. We serve sophisticated organizations across the GCC, Europe, and global markets.",
    namingStory: {
      title: 'Why AUXO?',
      description: 'AUXO comes from "auxilium"—Latin for "help" or "support." We\'re here to help you unlock your data\'s potential. Simple name, clear mission: transform data into decisions.',
    },
    whyStarted: {
      title: 'A New Approach to Analytics',
      description: 'The market is filled with traditional consultancies held back by high overhead and slow processes. We saw a clear need for a new model—one that provides the same enterprise-grade expertise but with the efficiency and direct senior involvement that drives faster results. That\'s why we built AUXO.',
    },
  },
  mission: {
    icon: 'mdi:target',
    title: 'Our Mission',
    description: 'To empower organizations with clear, actionable insights that drive strategic growth and measurable value.',
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
        description: 'We leverage contemporary, proven technologies to build solutions that are powerful and sustainable',
        demonstration: 'We use modern tools and methodologies, not legacy systems. Our streamlined structure allows us to adopt the best-in-class technologies without being constrained by outdated technology stacks.',
      },
      {
        icon: 'mdi:handshake',
        title: 'Partnership',
        description: 'Your success is our success. We work as an extension of your team',
        demonstration: 'Senior team involvement means you get strategic thinking, not just execution. We\'re invested in your long-term success.',
      },
      {
        icon: 'mdi:shield-check',
        title: 'Integrity',
        description: 'We maintain the highest standards of data security and ethical practices',
        demonstration: 'UAE PDPL and GDPR compliant from day one. Transparent processes. No hidden costs. Your data and trust are our top priorities.',
      },
      {
        icon: 'mdi:trophy',
        title: 'Excellence',
        description: 'We deliver exceptional quality in every project, no matter the size',
        demonstration: 'Every project receives senior attention. No junior consultants learning on your dime. We deliver enterprise quality with accelerated time-to-value.',
      },
      {
        icon: 'mdi:earth',
        title: 'International Perspective',
        description: 'Based in Dubai, we are positioned at the crossroads of global markets. We bring a deep understanding of regional regulations and cross-border business dynamics',
        demonstration: 'Our strategic location enables us to serve GCC clients expanding into Europe, European firms seeking Middle East expertise, and international organizations navigating complex cross-border data requirements.',
      },
    ] as Value[],
  },
  whyChoose: {
    title: 'Our Foundation in Numbers',
    subtitle: 'The metrics that define our expertise and commitment',
    stats: [
      {
        value: '15+',
        title: 'Years Combined Experience',
        description: 'Across key industries in GCC and international markets',
      },
      {
        value: '2025',
        title: 'Launch Year',
        description: 'Contemporary methodologies, unburdened by legacy systems and processes',
      },
      {
        value: '100%',
        title: 'Client-Focused',
        description: 'Every decision prioritizes your strategic objectives and measurable outcomes',
      },
    ] as Stat[],
  },
  team: {
    title: 'Meet the Founders',
    subtitle: 'Experienced data professionals serving organizations across the GCC, Europe, and global markets',
    hiring: {
      text: 'Interested in joining our team?',
      ctaText: "We're Hiring",
      ctaHref: 'contact',
    },
  },
  credentials: {
    title: 'Our Credentials',
    subtitle: 'Trust through proven expertise and compliance',
    items: [
      {
        icon: 'mdi:shield-check',
        label: 'PDPL Compliant',
        description: 'UAE Personal Data Protection Law compliance',
      },
      {
        icon: 'mdi:security',
        label: 'Security Best Practices',
        description: 'Enterprise-grade security standards',
      },
      {
        icon: 'mdi:certificate',
        label: 'Proven Methodology',
        description: 'Validated approach from years of experience',
      },
    ] as Credential[],
  },
  whyDifferent: {
    title: "Why We're Different",
    subtitle: 'Efficient delivery meets enterprise expertise',
    labels: {
      feature: 'Feature',
      them: 'Big Consultancies',
      us: 'AUXO',
    },
    comparisons: [
      {
        feature: 'Implementation Speed',
        them: 'Months of planning and bureaucracy',
        us: 'Weeks to first insights, agile delivery',
      },
      {
        feature: 'Who You Work With',
        them: 'Junior consultants, account managers',
        us: 'Direct access to senior experts',
      },
      {
        feature: 'Pricing',
        them: 'High costs, long-term contracts',
        us: 'Transparent pricing, flexible terms',
      },
      {
        feature: 'Decision Making',
        them: 'Multiple layers of approval',
        us: 'Streamlined decision-making, rapid iteration',
      },
      {
        feature: 'Personal Attention',
        them: 'One of many clients',
        us: 'Dedicated focus on your strategic objectives',
      },
    ] as Comparison[],
  },
  finalCta: {
    title: "Let's Build the Future Together",
    subtitle: "Ready to transform your data into strategic advantage? Share your analytics objectives, and let's explore how we can help you achieve measurable business outcomes.",
    primaryCta: {
      text: 'Discuss Your Project',
      href: 'contact',
    },
    secondaryCta: {
      text: 'View Our Services',
      href: 'services',
    },
  },
};

