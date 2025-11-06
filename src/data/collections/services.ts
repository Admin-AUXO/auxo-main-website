export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  deliverables: string[];
  timeline?: string; // Typical timeline, e.g., "4-8 weeks"
  complexity?: 'Beginner-Friendly' | 'Intermediate' | 'Enterprise-Level'; // Complexity indicator
  businessImpact?: string[]; // Business outcomes, e.g., "Faster decision-making", "Better ROI visibility"
}

export const services: Service[] = [
  {
    id: 'business-intelligence',
    title: 'Business Intelligence & Reporting',
    description: 'Transform your complex data into clear, actionable insights with intuitive dashboards that empower faster, smarter decisions.',
    icon: 'mdi:chart-line',
    timeline: '4-8 weeks',
    complexity: 'Beginner-Friendly',
    businessImpact: [
      'Make faster decisions with real-time insights at your fingertips',
      'Reduce reporting time by up to 80% with automated dashboards',
      'Improve strategic planning accuracy with data-driven insights',
      'Gain complete visibility into KPIs and business performance',
    ],
    features: [
      'Custom Power BI & Tableau dashboard development',
      'Automated reporting with flexible scheduling options',
      'Real-time data visualization and updates',
      'Executive-level KPI monitoring and alerts',
      'Seamless multi-source data integration',
    ],
    deliverables: [
      'Interactive BI dashboards with drill-down capabilities',
      'Automated report templates and distribution',
      'Comprehensive data visualization framework',
      'User training sessions and documentation',
      'Data connection setup and integration guide',
    ],
  },
  {
    id: 'data-analytics',
    title: 'Advanced Data Analytics',
    description: 'Unlock hidden patterns in your data with predictive analytics and intelligent insights that drive competitive advantage.',
    icon: 'mdi:chart-scatter-plot',
    timeline: '6-10 weeks',
    complexity: 'Intermediate',
    businessImpact: [
      'Predict and prevent customer churn before it happens',
      'Optimize pricing strategies to maximize profit margins',
      'Identify growth opportunities ahead of the competition',
      'Make confident, data-driven decisions with predictive insights',
    ],
    features: [
      'Descriptive and diagnostic analytics to understand what happened and why',
      'Predictive modeling and forecasting for future trends',
      'Deep customer behavior analysis and segmentation',
      'Market trend identification and competitive intelligence',
      'A/B testing and experimentation frameworks',
    ],
    deliverables: [
      'Comprehensive analysis reports with recommendations',
      'Validated predictive models',
      'Customer segmentation strategy',
      'Executive summary presentations',
      'Interactive data exploration dashboards',
    ],
  },
  {
    id: 'data-strategy',
    title: 'Data Strategy & Roadmap',
    description: 'Build a clear, actionable data strategy that aligns with your business goals and maximizes your analytics investments.',
    icon: 'mdi:strategy',
    timeline: '3-6 weeks',
    complexity: 'Beginner-Friendly',
    businessImpact: [
      'Clear, prioritized roadmap for data investments',
      'Maximize ROI on analytics spending with strategic planning',
      'Avoid costly technology mistakes with expert evaluation',
      'Ensure all data initiatives directly support business objectives',
    ],
    features: [
      'Comprehensive data maturity assessment',
      'Strategic roadmap development with clear milestones',
      'Technology stack evaluation and vendor recommendations',
      'Change management planning for smooth adoption',
      'ROI modeling and compelling business case development',
    ],
    deliverables: [
      'Comprehensive data strategy document',
      'Phased implementation roadmap',
      'Technology recommendations with vendors',
      'Data governance framework',
      'ROI analysis and business case documentation',
    ],
  },
  {
    id: 'data-engineering',
    title: 'Data Engineering & Integration',
    description: 'Build robust, scalable data pipelines that seamlessly unify your systems and power advanced analytics at enterprise scale.',
    icon: 'mdi:database-cog',
    timeline: '8-12 weeks',
    complexity: 'Enterprise-Level',
    businessImpact: [
      'Unified view of all business operations in one place',
      'Reduce data processing costs with optimized pipelines',
      'Enable real-time business insights for instant decisions',
      'Scale analytics effortlessly as your business grows',
    ],
    features: [
      'Custom ETL/ELT pipeline development and optimization',
      'Cloud data warehouse design (AWS, Azure, GCP)',
      'Real-time streaming data processing capabilities',
      'Seamless API and database integrations',
      'Comprehensive data quality monitoring and validation',
    ],
    deliverables: [
      'Production-ready data pipelines',
      'Technical architecture documentation',
      'Data quality monitoring dashboards',
      'Operations & maintenance playbook',
      'Data integration testing and validation reports',
    ],
  },
  {
    id: 'ml-ai',
    title: 'Machine Learning & AI Solutions',
    description: 'Deploy advanced AI and machine learning solutions to automate processes, predict outcomes, and optimize your business performance.',
    icon: 'mdi:robot',
    timeline: '10-16 weeks',
    complexity: 'Enterprise-Level',
    businessImpact: [
      'Automate repetitive tasks and processes to save time and costs',
      'Predict trends and opportunities before competitors see them',
      'Personalize customer experiences at scale',
      'Optimize operations for maximum efficiency and profitability',
    ],
    features: [
      'Custom ML model development, training, and fine-tuning',
      'Natural language processing (NLP) for text analysis',
      'Computer vision and image recognition capabilities',
      'Intelligent recommendation engines',
      'Production-ready MLOps and model deployment pipelines',
    ],
    deliverables: [
      'Production-grade ML models',
      'Model performance documentation',
      'Deployment infrastructure',
      'Monitoring & retraining framework',
      'Model explainability and interpretability reports',
    ],
  },
  {
    id: 'data-governance',
    title: 'Data Governance & Compliance',
    description: 'Build a robust data governance framework that ensures compliance, security, and trust across your entire organization.',
    icon: 'mdi:shield-check',
    timeline: '6-10 weeks',
    complexity: 'Intermediate',
    businessImpact: [
      'Ensure full regulatory compliance (UAE PDPL, GDPR)',
      'Build complete trust in your data quality and accuracy',
      'Dramatically reduce risk of data breaches and penalties',
      'Enable confident, compliant data-driven decisions',
    ],
    features: [
      'UAE PDPL and GDPR compliance framework implementation',
      'Comprehensive data catalog and metadata management',
      'Enterprise-grade role-based access control (RBAC)',
      'Complete data lineage and impact analysis',
      'Privacy by design principles and implementation',
    ],
    deliverables: [
      'Compliance gap assessment',
      'Data governance operating model',
      'Policy & procedure documentation',
      'Staff training programs',
      'Data privacy impact assessments (DPIA)',
    ],
  },
];
