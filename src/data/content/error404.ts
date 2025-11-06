export interface Error404Content {
  meta: {
    title: string;
    description: string;
  };
  hero: {
    title: string;
    description: string;
  };
  actions: {
    primary: {
      text: string;
      href: string;
      icon: string;
    };
    secondary: {
      text: string;
      href: string;
      icon: string;
    };
  };
  explore: {
    title: string;
    links: Array<{
      icon: string;
      text: string;
      href: string;
    }>;
  };
  search: {
    text: string;
    homepage: {
      text: string;
      href: string;
    };
    contact: {
      text: string;
      href: string;
    };
  };
}

export const error404Content: Error404Content = {
  meta: {
    title: '404 - Page Not Found | AUXO Data Labs',
    description: 'The page you\'re looking for doesn\'t exist. Return to AUXO Data Labs homepage or explore our services.',
  },
  hero: {
    title: 'Page Not Found',
    description: 'The page you\'re looking for doesn\'t exist or has been moved.',
  },
  actions: {
    primary: {
      text: 'Return Home',
      href: '',
      icon: 'mdi:home',
    },
    secondary: {
      text: 'Contact Us',
      href: 'contact',
      icon: 'mdi:email-outline',
    },
  },
  explore: {
    title: 'Explore AUXO Data Labs',
    links: [
      {
        icon: 'mdi:briefcase',
        text: 'Services',
        href: 'services',
      },
      {
        icon: 'mdi:information',
        text: 'About Us',
        href: 'about',
      },
      {
        icon: 'mdi:post',
        text: 'Blog',
        href: 'blog',
      },
      {
        icon: 'mdi:calculator',
        text: 'Assessment',
        href: 'tools/maturity-calculator',
      },
    ],
  },
  search: {
    text: 'Lost? Try starting from our',
    homepage: {
      text: 'homepage',
      href: '',
    },
    contact: {
      text: 'contact us',
      href: 'contact',
    },
  },
};

