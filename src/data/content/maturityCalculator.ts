export interface Dimension {
  name: string;
  icon: string;
}

export interface BenefitItem {
  icon: string;
  title: string;
  items: string[];
}

export const maturityCalculatorContent = {
  hero: {
    badge: 'Free Assessment Tool',
    title: 'Data Analytics',
    titleHighlight: 'Maturity Assessment',
    subtitle: 'Discover where your organization stands and get personalized recommendations for growth',
    subtitleMeta: 'Takes about 5 minutes • 20 questions across 5 dimensions',
  },
  intro: {
    benefits: {
      title: 'What You\'ll Get',
      icon: 'mdi:chart-line',
      items: [
        'Your maturity score across 5 key dimensions',
        'Personalized improvement roadmap',
        'Comparison with industry benchmarks',
        'Downloadable PDF report',
      ],
    } as BenefitItem,
    privacy: {
      title: 'Your Privacy',
      icon: 'mdi:lock',
      items: [
        'No registration required',
        'Completely anonymous',
        'Instant results',
        'Optional: Save results via email',
      ],
    } as BenefitItem,
    dimensions: {
      title: 'The 5 Dimensions We Assess:',
      list: [
        { name: 'Data Infrastructure', icon: 'mdi:database' },
        { name: 'Analytics Capabilities', icon: 'mdi:chart-bar' },
        { name: 'People & Skills', icon: 'mdi:account-group' },
        { name: 'Data Culture', icon: 'mdi:lightbulb' },
        { name: 'Governance', icon: 'mdi:shield-check' },
      ] as Dimension[],
    },
    startButton: 'Start Assessment →',
  },
  questionScreen: {
    questionLabel: 'Question',
    ofLabel: 'of',
    completeLabel: 'Complete',
    backButton: '← Back',
    nextButton: 'Next Question →',
  },
  results: {
    title: 'Your Data Analytics Maturity Level',
    scoresTitle: 'Your Scores by Dimension',
    downloadReport: 'Download PDF Report',
    shareResults: 'Share Results',
    retakeAssessment: 'Retake Assessment',
    contactUs: 'Contact Us',
  },
};

