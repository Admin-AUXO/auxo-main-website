export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  deliverables: string[];
  timeline?: string; // Typical timeline, e.g., "4-8 weeks"
  businessImpact?: string[]; // Business outcomes, e.g., "Faster decision-making", "Better ROI visibility"
}

export const services: Service[] = [
  {
    id: 'business-intelligence',
    title: 'Business Intelligence & Reporting',
    description: 'Turn complex data into real-time insights through intuitive, decision-ready dashboards.',
    icon: 'mdi:chart-line',
    timeline: '4-8 weeks',
    businessImpact: [
      'Faster decision-making with real-time insights',
      'Reduce reporting time by up to 80%',
      'Improve strategic planning accuracy',
      'Better visibility into KPIs and performance',
    ],
    features: [
      'Power BI & Tableau dashboard development',
      'Automated reporting with scheduling',
      'Real-time data visualization',
      'Executive-level KPI monitoring',
      'Multi-source data integration',
    ],
    deliverables: [
      'Interactive BI dashboards with drill-down capabilities',
      'Automated report templates and distribution',
      'Comprehensive data visualization framework',
      'User training sessions and documentation',
    ],
  },
  {
    id: 'data-analytics',
    title: 'Advanced Data Analytics',
    description: 'Transform raw information into predictive, actionable intelligence for smarter decisions.',
    icon: 'mdi:chart-scatter-plot',
    timeline: '6-10 weeks',
    businessImpact: [
      'Predict and prevent customer churn',
      'Optimize pricing strategies for better margins',
      'Identify growth opportunities early',
      'Make data-driven decisions with confidence',
    ],
    features: [
      'Descriptive & diagnostic analytics',
      'Predictive modeling & forecasting',
      'Customer behavior analysis',
      'Market trend identification',
      'A/B testing & experimentation',
    ],
    deliverables: [
      'Comprehensive analysis reports with recommendations',
      'Validated predictive models',
      'Customer segmentation strategy',
      'Executive summary presentations',
    ],
  },
  {
    id: 'data-strategy',
    title: 'Data Strategy & Roadmap',
    description: 'Align your data initiatives with business goals through a clear, execution-ready strategy.',
    icon: 'mdi:strategy',
    timeline: '3-6 weeks',
    businessImpact: [
      'Clear roadmap for data investments',
      'Better ROI on analytics spending',
      'Avoid costly technology mistakes',
      'Align data initiatives with business goals',
    ],
    features: [
      'Data maturity assessment',
      'Strategic roadmap development',
      'Technology stack evaluation',
      'Change management planning',
      'ROI modeling & business case development',
    ],
    deliverables: [
      'Comprehensive data strategy document',
      'Phased implementation roadmap',
      'Technology recommendations with vendors',
      'Data governance framework',
    ],
  },
  {
    id: 'data-engineering',
    title: 'Data Engineering & Integration',
    description: 'Build scalable, secure data pipelines that unify systems and power analytics.',
    icon: 'mdi:database-cog',
    timeline: '8-12 weeks',
    businessImpact: [
      'Unified view of business operations',
      'Reduce data processing costs',
      'Enable real-time business insights',
      'Scale analytics as you grow',
    ],
    features: [
      'ETL/ELT pipeline development',
      'Cloud data warehouse design (AWS, Azure, GCP)',
      'Real-time streaming data processing',
      'API & database integrations',
      'Data quality & monitoring',
    ],
    deliverables: [
      'Production-ready data pipelines',
      'Technical architecture documentation',
      'Data quality monitoring dashboards',
      'Operations & maintenance playbook',
    ],
  },
  {
    id: 'ml-ai',
    title: 'Machine Learning & AI Solutions',
    description: 'Deploy cutting edge AI to automate, predict, and optimize business outcomes intelligently.',
    icon: 'mdi:robot',
    timeline: '10-16 weeks',
    businessImpact: [
      'Automate repetitive tasks and processes',
      'Predict trends before they happen',
      'Personalize customer experiences',
      'Optimize operations for efficiency',
    ],
    features: [
      'Custom ML model development & tuning',
      'Natural language processing (NLP)',
      'Computer vision & image recognition',
      'Recommendation engines',
      'MLOps & model deployment',
    ],
    deliverables: [
      'Production-grade ML models',
      'Model performance documentation',
      'Deployment infrastructure',
      'Monitoring & retraining framework',
    ],
  },
  {
    id: 'data-governance',
    title: 'Data Governance & Compliance',
    description: 'Ensure trusted, compliant, and secure data across your entire enterprise.',
    icon: 'mdi:shield-check',
    timeline: '6-10 weeks',
    businessImpact: [
      'Ensure regulatory compliance (PDPL, GDPR)',
      'Build trust in your data quality',
      'Reduce risk of data breaches',
      'Enable confident data-driven decisions',
    ],
    features: [
      'UAE PDPL & GDPR compliance frameworks',
      'Data catalog & metadata management',
      'Role-based access control (RBAC)',
      'Data lineage & impact analysis',
      'Privacy by design implementation',
    ],
    deliverables: [
      'Compliance gap assessment',
      'Data governance operating model',
      'Policy & procedure documentation',
      'Staff training programs',
    ],
  },
];
