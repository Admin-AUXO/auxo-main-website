export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  linkedin?: string;
  expertise?: string[];
  funFact?: string;
}

export const team: TeamMember[] = [
  {
    name: 'AUXO Data Labs',
    role: 'Founding Team',
    bio: 'A team of experienced data professionals who came together in 2025 to build a different kind of analytics consultancy. We combine years of enterprise experience with startup agility and fresh perspectives. Based in Dubai, designed for the UAE.',
    linkedin: 'https://www.linkedin.com/company/auxo-data/',
    expertise: [
      'Data Strategy & Governance',
      'Business Intelligence',
      'Machine Learning',
      'Cloud Analytics',
      'Data Engineering',
    ],
    funFact: 'Our founding team has delivered 100+ analytics projects across 8 industries—from retail forecasting to fraud detection systems.',
  },
];
