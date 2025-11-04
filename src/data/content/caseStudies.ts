export interface CaseStudy {
  id: string;
  title: string;
  client: string;
  industry: string;
  challenge: string;
  solution: string;
  results: string[];
  technologies: string[];
  icon: string;
  color: string;
  borderColor: string;
  keyMetrics?: {
    label: string;
    value: string;
    improvement?: string;
  }[];
  keyAchievement?: string;
  insights?: string[];
  challengesOvercome?: string[];
}

export const caseStudies: CaseStudy[] = [
  {
    id: 'retail-analytics',
    title: 'Retail Chain Sales Forecasting',
    client: 'Leading UAE Retail Group',
    industry: 'Retail & E-commerce',
    challenge: 'Struggled with inventory management and sales forecasting across 50+ locations',
    solution: 'Implemented predictive analytics platform with real-time inventory optimization',
    results: [
      '35% reduction in inventory costs',
      '25% improvement in forecast accuracy',
      '15% increase in revenue through better stock management',
      'ROI achieved in 6 months',
    ],
    technologies: ['Python', 'Power BI', 'Azure Synapse', 'Prophet'],
    icon: 'mdi:store',
    color: 'from-blue-500/20 to-cyan-500/20',
    borderColor: 'border-blue-500/30',
    keyMetrics: [
      { label: 'Cost Reduction', value: '35%', improvement: 'vs. baseline' },
      { label: 'Forecast Accuracy', value: '25%', improvement: 'improvement' },
      { label: 'Revenue Increase', value: '15%', improvement: 'through optimization' },
      { label: 'ROI Timeline', value: '6 months', improvement: 'faster than expected' },
    ],
    keyAchievement: 'Transformed inventory management from reactive to predictive, reducing waste while improving customer satisfaction',
    insights: [
      'Seasonal patterns vary significantly by location—localized models outperformed global ones',
      'Real-time dashboards enabled store managers to make daily adjustments',
      'Customer footfall patterns identified optimal restocking times',
    ],
    challengesOvercome: [
      'Data quality issues across 50+ locations—implemented automated data validation',
      'Legacy systems integration—built custom connectors without disrupting operations',
      'Change management—provided comprehensive training and ongoing support',
    ],
  },
  {
    id: 'banking-fraud',
    title: 'Real-time Fraud Detection System',
    client: 'Regional Banking Institution',
    industry: 'Financial Services',
    challenge: 'High false-positive rate in fraud detection causing customer friction',
    solution: 'Developed ML-powered fraud detection with real-time scoring and adaptive learning',
    results: [
      '70% reduction in false positives',
      '95% fraud detection accuracy',
      '$2M+ saved annually in fraud losses',
      'Improved customer satisfaction scores',
    ],
    technologies: ['TensorFlow', 'Kafka', 'AWS SageMaker', 'Snowflake'],
    icon: 'mdi:shield-check',
    color: 'from-red-500/20 to-orange-500/20',
    borderColor: 'border-red-500/30',
    keyMetrics: [
      { label: 'False Positives', value: '70%', improvement: 'reduction' },
      { label: 'Detection Accuracy', value: '95%', improvement: 'vs. 78% baseline' },
      { label: 'Annual Savings', value: '$2M+', improvement: 'fraud prevention' },
      { label: 'Response Time', value: '<100ms', improvement: 'real-time scoring' },
    ],
    keyAchievement: 'Balanced fraud prevention with customer experience—reduced false positives while maintaining security',
    insights: [
      'Behavioral patterns are more reliable than transaction amounts alone',
      'Adaptive learning models improved over time as they processed more transactions',
      'Real-time processing enabled instant decision-making without blocking legitimate transactions',
    ],
    challengesOvercome: [
      'Latency requirements—optimized ML models for sub-100ms response times',
      'Model explainability for compliance—built interpretable models with clear reasoning',
      'Data privacy concerns—implemented federated learning approach for sensitive data',
    ],
  },
  {
    id: 'healthcare-analytics',
    title: 'Patient Flow Optimization',
    client: 'Multi-specialty Healthcare Provider',
    industry: 'Healthcare',
    challenge: 'Long patient wait times and inefficient resource allocation across departments',
    solution: 'Built analytics platform to optimize patient scheduling and resource utilization',
    results: [
      '40% reduction in average wait times',
      '30% improvement in resource utilization',
      '92% patient satisfaction rate',
      '20% increase in daily patient capacity',
    ],
    technologies: ['Tableau', 'SQL Server', 'Python', 'Airflow'],
    icon: 'mdi:hospital',
    color: 'from-green-500/20 to-emerald-500/20',
    borderColor: 'border-green-500/30',
    keyMetrics: [
      { label: 'Wait Time Reduction', value: '40%', improvement: 'vs. previous average' },
      { label: 'Resource Utilization', value: '30%', improvement: 'improvement' },
      { label: 'Patient Satisfaction', value: '92%', improvement: 'high satisfaction rate' },
      { label: 'Daily Capacity', value: '20%', improvement: 'more patients served' },
    ],
    keyAchievement: 'Eliminated bottlenecks in patient flow while maintaining high-quality care standards, resulting in better patient experience and operational efficiency',
    insights: [
      'Peak appointment times varied significantly by specialty—customized scheduling rules per department',
      'Resource allocation patterns revealed underutilized equipment during certain hours',
      'Patient arrival patterns showed 15% early arrivals, which we leveraged to reduce gaps',
    ],
    challengesOvercome: [
      'Complex multi-department coordination—implemented cross-functional analytics dashboard',
      'Real-time data integration from multiple legacy systems—built automated ETL pipelines',
      'Change management across medical staff—provided training and demonstrated ROI with pilot departments',
    ],
  },
  {
    id: 'logistics-optimization',
    title: 'Supply Chain & Route Optimization',
    client: 'Logistics & Distribution Company',
    industry: 'Transportation & Logistics',
    challenge: 'Inefficient routing and high fuel costs across delivery fleet',
    solution: 'Implemented AI-powered route optimization and demand forecasting system',
    results: [
      '25% reduction in fuel costs',
      '35% improvement in on-time deliveries',
      '18% increase in daily deliveries per vehicle',
      'Reduced carbon footprint by 22%',
    ],
    technologies: ['Google OR-Tools', 'BigQuery', 'GCP', 'Looker'],
    icon: 'mdi:truck-fast',
    color: 'from-yellow-500/20 to-amber-500/20',
    borderColor: 'border-yellow-500/30',
    keyMetrics: [
      { label: 'Fuel Cost Savings', value: '25%', improvement: 'annual reduction' },
      { label: 'On-Time Delivery', value: '35%', improvement: 'improvement rate' },
      { label: 'Delivery Efficiency', value: '18%', improvement: 'more deliveries per vehicle' },
      { label: 'Carbon Reduction', value: '22%', improvement: 'environmental impact' },
    ],
    keyAchievement: 'Transformed logistics operations from reactive to predictive, reducing operational costs while improving customer satisfaction and environmental sustainability',
    insights: [
      'Traffic patterns and delivery windows were more predictable than assumed—optimization algorithms capitalized on this',
      'Combining multiple deliveries in optimized routes reduced total distance by 30% on average',
      'Driver behavior data revealed opportunities for training and efficiency improvements',
    ],
    challengesOvercome: [
      'Real-time route adjustments—implemented dynamic routing that adapts to traffic and delivery changes',
      'Integration with existing fleet management systems—built API connectors without disrupting operations',
      'Driver adoption—provided mobile app with clear benefits and incentives for optimized routes',
    ],
  },
  {
    id: 'manufacturing-quality',
    title: 'Predictive Maintenance & Quality Control',
    client: 'Manufacturing Enterprise',
    industry: 'Manufacturing',
    challenge: 'Unplanned equipment downtime and quality control issues',
    solution: 'Deployed IoT sensors and ML models for predictive maintenance and defect detection',
    results: [
      '60% reduction in unplanned downtime',
      '45% decrease in defect rates',
      '$1.5M saved in maintenance costs',
      'Extended equipment lifespan by 3 years',
    ],
    technologies: ['Apache Spark', 'Azure IoT', 'Computer Vision', 'Power BI'],
    icon: 'mdi:factory',
    color: 'from-purple-500/20 to-pink-500/20',
    borderColor: 'border-purple-500/30',
    keyMetrics: [
      { label: 'Downtime Reduction', value: '60%', improvement: 'unplanned incidents' },
      { label: 'Defect Rate', value: '45%', improvement: 'decrease' },
      { label: 'Cost Savings', value: '$1.5M', improvement: 'annual maintenance' },
      { label: 'Equipment Lifespan', value: '+3 years', improvement: 'extended' },
    ],
    keyAchievement: 'Shifted from reactive to predictive operations, preventing costly breakdowns and quality issues before they impact production',
    insights: [
      'Vibration patterns and temperature trends were early indicators of equipment failure—caught 80% of issues 2-3 weeks early',
      'Computer vision models identified defects that human inspectors missed 15% of the time',
      'Predictive alerts allowed scheduled maintenance during low-production windows, minimizing disruption',
    ],
    challengesOvercome: [
      'IoT sensor deployment in harsh manufacturing environment—designed robust sensor network with proper shielding',
      'Real-time data processing from thousands of sensors—implemented distributed processing with Apache Spark',
      'Change management with maintenance teams—demonstrated value with pilot program showing clear ROI',
    ],
  },
  {
    id: 'real-estate-insights',
    title: 'Real Estate Market Intelligence',
    client: 'Property Development Group',
    industry: 'Real Estate',
    challenge: 'Lacked data-driven insights for investment and pricing decisions',
    solution: 'Created comprehensive market intelligence platform with pricing analytics',
    results: [
      '15% improvement in pricing accuracy',
      '90% faster market analysis',
      'Identified 12 high-ROI investment opportunities',
      '3x increase in data-driven decision making',
    ],
    technologies: ['Python', 'Pandas', 'Plotly', 'PostgreSQL', 'Docker'],
    icon: 'mdi:office-building',
    color: 'from-lime-500/20 to-green-500/20',
    borderColor: 'border-lime-500/30',
    keyMetrics: [
      { label: 'Pricing Accuracy', value: '15%', improvement: 'improvement' },
      { label: 'Analysis Speed', value: '90%', improvement: 'faster' },
      { label: 'Investment Opportunities', value: '12', improvement: 'high-ROI identified' },
      { label: 'Data-Driven Decisions', value: '3x', improvement: 'increase' },
    ],
    keyAchievement: 'Transformed real estate investment decisions from intuition-based to data-driven, enabling faster and more accurate market assessments',
    insights: [
      'Location features (schools, transport, amenities) had stronger price correlation than previously assumed',
      'Market trends showed seasonal patterns that could be leveraged for timing investments',
      'Combining multiple data sources (transactions, demographics, development plans) provided more accurate valuations',
    ],
    challengesOvercome: [
      'Fragmented data sources—aggregated data from multiple APIs, government databases, and internal systems',
      'Real-time market data integration—built automated data pipelines with scheduled updates',
      'User adoption by traditional real estate professionals—created intuitive dashboards with clear visualizations',
    ],
  },
];

export const caseStudiesContent = {
  hero: {
    badge: 'Success Stories',
    title: 'Results We Deliver',
    titleHighlight: 'For Our Clients',
    subtitle: "As a new consultancy, we're building our portfolio with every project. These examples represent the types of results our founding team has delivered at previous organizations—and what we'll achieve together.",
    founderExperience: {
      title: 'Founding Team Experience',
      description: 'Our founding team brings 15+ years of combined enterprise experience from leading organizations across the UAE and MENA region. We\'ve delivered similar results for years—now we\'re bringing that expertise to AUXO.',
    },
    provenMethodology: {
      title: 'Proven Methodology',
      description: 'These case studies showcase our systematic approach: deep discovery, data-driven solutions, and measurable results. We don\'t experiment on clients—we apply battle-tested methodologies.',
    },
  },
  finalCta: {
    title: 'Ready to Write Your Success Story?',
    subtitle: "Let's discuss how we can help you achieve similar results and transform your data into competitive advantage",
    primaryCta: {
      text: 'Start Your Project',
      href: 'contact',
    },
    secondaryCta: {
      text: 'Explore Services',
      href: 'services',
    },
    contextualText: 'See similar results in your industry',
  },
};

