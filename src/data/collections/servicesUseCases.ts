export interface UseCase {
  title: string;
  description: string;
}

export const servicesUseCases: Record<string, UseCase[]> = {
  'business-intelligence': [
    { title: 'Executive Dashboards', description: 'Real-time KPI monitoring for C-suite decision-making' },
    { title: 'Sales Performance Tracking', description: 'Monitor sales metrics, forecasts, and team performance' },
    { title: 'Financial Reporting', description: 'Automated monthly/quarterly financial reports and variance analysis' },
    { title: 'Operational Metrics', description: 'Track efficiency, productivity, and operational excellence' },
  ],
  'data-analytics': [
    { title: 'Customer Churn Prediction', description: 'Identify at-risk customers before they leave' },
    { title: 'Market Basket Analysis', description: 'Discover product associations and cross-sell opportunities' },
    { title: 'Demand Forecasting', description: 'Predict future demand for inventory optimization' },
    { title: 'Pricing Optimization', description: 'Data-driven pricing strategies to maximize revenue' },
  ],
  'data-strategy': [
    { title: 'Digital Transformation', description: 'Develop data strategy for organization-wide transformation' },
    { title: 'Data Modernization', description: 'Migrate from legacy systems to modern cloud infrastructure' },
    { title: 'Analytics ROI Planning', description: 'Build business case for analytics investments' },
    { title: 'Organizational Alignment', description: 'Align data initiatives with business objectives' },
  ],
  'data-engineering': [
    { title: 'Data Warehouse Migration', description: 'Move from on-premise to cloud data warehouse' },
    { title: 'Real-time Data Pipelines', description: 'Stream processing for real-time analytics' },
    { title: 'Data Lake Implementation', description: 'Centralize all your data sources in a scalable data lake' },
    { title: 'API Integration', description: 'Connect disparate systems for unified data view' },
  ],
  'ml-ai': [
    { title: 'Document Processing', description: 'Automate document classification and data extraction' },
    { title: 'Fraud Detection', description: 'Identify anomalous patterns and fraudulent transactions' },
    { title: 'Personalization Engines', description: 'Deliver personalized content and recommendations' },
    { title: 'Predictive Maintenance', description: 'Forecast equipment failures before they occur' },
  ],
  'data-governance': [
    { title: 'GDPR Compliance', description: 'Implement frameworks for EU data protection compliance' },
    { title: 'UAE PDPL Readiness', description: 'Ensure compliance with UAE Personal Data Protection Law' },
    { title: 'Data Quality Management', description: 'Establish data quality standards and monitoring' },
    { title: 'Master Data Management', description: 'Create single source of truth for critical data' },
  ],
};

export function getUseCases(serviceId: string): UseCase[] {
  return servicesUseCases[serviceId] || [];
}

