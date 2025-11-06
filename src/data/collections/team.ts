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
    name: 'Vignesh Ramesh',
    role: 'Co-Founder & CEO',
    bio: 'Passionate about turning data into strategic advantages. Built AUXO from the ground up to bring fresh thinking to analytics consulting. Loves solving complex business problems with elegant data solutions.',
    linkedin: 'https://www.linkedin.com/in/vignesh-rvdcommerce/',
    expertise: [
      'Business Strategy',
      'Digital Transformation',
      'Operations Excellence',
    ],
    funFact: 'Started AUXO because I believe analytics should be accessible, actionable, and actually move the needle—not just pretty dashboards.',
  },
  {
    name: 'Ajay Kumar',
    role: 'Co-Founder & CTO',
    bio: 'Tech geek who gets excited about building scalable data infrastructure. Spent years as a BI engineer before deciding to build something better. Now crafting the technical foundation that makes AUXO tick.',
    linkedin: 'https://www.linkedin.com/in/ajaykumar9795/',
    expertise: [
      'Big Data Analytics',
      'AI & Decision Science',
      'Data Engineering',
    ],
    funFact: 'Trained in Big Data Analytics at INSOFE—because understanding data at scale is what separates good insights from great ones.',
  },
  {
    name: 'AUXO Data Labs',
    role: 'Founding Team',
    bio: 'A team of experienced data professionals who came together in 2025 to build a modern analytics consultancy. We combine years of enterprise experience with streamlined delivery and contemporary methodologies. Based in Dubai, serving clients across the GCC, Europe, and global markets.',
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
