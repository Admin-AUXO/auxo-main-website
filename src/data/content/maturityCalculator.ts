export interface Dimension {
  name: string;
  icon: string;
}

export interface BenefitItem {
  icon: string;
  title: string;
  items: string[];
}

export interface QuestionOption {
  text: string;
  score: number;
  pathwayFilter?: string[]; // Optional: which pathways this option applies to
}

export interface Question {
  category: string;
  question: string;
  options: QuestionOption[];
  id: string; // Unique identifier
  requiredFor?: string[]; // Which pathways require this question (undefined = all)
  skipFor?: string[]; // Which pathways should skip this question
}

export interface MaturityLevel {
  name: string;
  description: string;
  color: string;
}

export interface Pathway {
  id: string;
  name: string;
  description: string;
  minScore?: number; // Minimum classification score to enter this pathway
  maxScore?: number; // Maximum classification score to enter this pathway
}

export const maturityCalculatorContent = {
  hero: {
    badge: 'Free Assessment Tool',
    title: 'Data Analytics',
    titleHighlight: 'Maturity Assessment',
    subtitle: 'Discover where your organization stands and get personalized recommendations for growth',
    subtitleMeta: 'Personalized questions based on your organization • Takes 5-10 minutes',
  },
  intro: {
    benefits: {
      title: 'What You\'ll Get',
      icon: 'mdi:chart-line',
      items: [
        'Your maturity score across 5 key dimensions',
        'Personalized improvement roadmap tailored to your organization',
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
  // Classification questions (first 3 questions to determine pathway)
  classificationQuestions: [
    {
      id: 'classification-1',
      category: 'Organization Profile',
      question: 'What is the approximate size of your organization?',
      options: [
        { text: 'Startup (1-10 employees)', score: 1, pathwayFilter: ['startup'] },
        { text: 'Small business (11-50 employees)', score: 2, pathwayFilter: ['small', 'growing'] },
        { text: 'Medium business (51-250 employees)', score: 3, pathwayFilter: ['medium', 'growing'] },
        { text: 'Large company (251-1,000 employees)', score: 4, pathwayFilter: ['large', 'enterprise'] },
        { text: 'Enterprise (1,000+ employees)', score: 5, pathwayFilter: ['enterprise'] },
      ],
    },
    {
      id: 'classification-2',
      category: 'Organization Profile',
      question: 'How would you describe your organization\'s current data analytics maturity level?',
      options: [
        { text: 'Just getting started - limited or no analytics in place', score: 1, pathwayFilter: ['early'] },
        { text: 'Some basic reporting and dashboards, but inconsistent', score: 2, pathwayFilter: ['early', 'growing'] },
        { text: 'Established analytics with regular reporting and some insights', score: 3, pathwayFilter: ['growing', 'medium'] },
        { text: 'Advanced analytics with predictive models and data-driven decisions', score: 4, pathwayFilter: ['medium', 'advanced'] },
        { text: 'Data-driven organization with AI/ML and advanced capabilities', score: 5, pathwayFilter: ['advanced', 'enterprise'] },
      ],
    },
    {
      id: 'classification-3',
      category: 'Organization Profile',
      question: 'What is your primary goal or use case for data analytics?',
      options: [
        { text: 'Basic reporting and understanding what happened', score: 1, pathwayFilter: ['early'] },
        { text: 'Improve operational efficiency and decision-making', score: 2, pathwayFilter: ['growing', 'medium'] },
        { text: 'Customer analytics and experience optimization', score: 3, pathwayFilter: ['medium', 'advanced'] },
        { text: 'Advanced analytics, ML/AI, and competitive advantage', score: 4, pathwayFilter: ['advanced', 'enterprise'] },
        { text: 'Enterprise-wide data transformation and innovation', score: 5, pathwayFilter: ['enterprise'] },
      ],
    },
  ] as Question[],
  // All assessment questions organized by pathway
  questions: {
    // Core questions that apply to all pathways
    core: [
      {
        id: 'infra-1',
        category: 'Data Infrastructure',
        question: 'How would you describe your primary data storage and management infrastructure?',
        options: [
          { text: 'Mostly spreadsheets, local files, and manual processes', score: 1 },
          { text: 'Basic database systems with limited integration between departments', score: 2 },
          { text: 'Centralized data warehouse or data lake with some automation and ETL processes', score: 3 },
          { text: 'Cloud-based modern data platform (lakehouse/warehouse) with automated pipelines and real-time capabilities', score: 4 },
          { text: 'Advanced data fabric or mesh architecture with intelligent automation, real-time streaming, and self-service capabilities', score: 5 },
        ],
      },
      {
        id: 'infra-2',
        category: 'Data Infrastructure',
        question: 'How accessible is data across your organization for business users?',
        options: [
          { text: 'Data is highly siloed and difficult to access, requiring IT support for most requests', score: 1 },
          { text: 'Limited self-service access with significant IT involvement needed for data requests', score: 2 },
          { text: 'Moderate self-service capabilities for specific departments or use cases', score: 3 },
          { text: 'Broad self-service access across most of the organization with role-based permissions', score: 4 },
          { text: 'Fully democratized data access with intelligent governance, cataloging, and seamless user experience', score: 5 },
        ],
      },
      {
        id: 'analytics-1',
        category: 'Analytics Capabilities',
        question: 'What types of analytics capabilities does your organization currently use?',
        options: [
          { text: 'Primarily basic reporting using Excel and simple spreadsheets', score: 1 },
          { text: 'Descriptive analytics - reporting on what happened (historical analysis and dashboards)', score: 2 },
          { text: 'Diagnostic analytics - understanding why things happened (root cause analysis, drill-downs)', score: 3 },
          { text: 'Predictive analytics - forecasting what will likely happen (statistical models, ML predictions)', score: 4 },
          { text: 'Prescriptive analytics and AI-driven insights - automated recommendations and optimization (advanced ML, AI)', score: 5 },
        ],
      },
      {
        id: 'people-1',
        category: 'People & Skills',
        question: 'What data and analytics skills exist within your organization?',
        options: [
          { text: 'Primarily basic Excel skills with limited analytical capabilities', score: 1 },
          { text: 'Some SQL skills and reporting capabilities, mainly in IT or a small analytics team', score: 2 },
          { text: 'Dedicated analytics team with BI tool expertise and basic data engineering skills', score: 3 },
          { text: 'Data scientists, data engineers, and analytics professionals on staff with diverse skill sets', score: 4 },
          { text: 'Center of excellence with data engineers, scientists, analysts, and citizen data scientists across the organization', score: 5 },
        ],
      },
      {
        id: 'culture-1',
        category: 'Data Culture',
        question: 'How are business decisions typically made in your organization?',
        options: [
          { text: 'Primarily based on intuition, experience, and gut feeling', score: 1 },
          { text: 'Mix of intuition and some data, but data is not consistently used or trusted', score: 2 },
          { text: 'Data-informed decisions when data is available, but not consistently required', score: 3 },
          { text: 'Data-driven approach for most major decisions with analytics as a key input', score: 4 },
          { text: 'Data is central to all decisions - from strategy to operations, with a culture of fact-based choices', score: 5 },
        ],
      },
      {
        id: 'governance-1',
        category: 'Governance',
        question: 'How does your organization manage data privacy and security?',
        options: [
          { text: 'No formal data privacy or security policies in place', score: 1 },
          { text: 'Basic IT security measures but no comprehensive data privacy framework', score: 2 },
          { text: 'Formal data security policies in place with some privacy considerations', score: 3 },
          { text: 'Compliance with major regulations (UAE PDPL, GDPR, etc.) with documented processes', score: 4 },
          { text: 'Comprehensive privacy and security framework with proactive risk management and continuous monitoring', score: 5 },
        ],
      },
    ] as Question[],
    // Questions for early-stage/startup companies
    early: [
      {
        id: 'infra-3-early',
        category: 'Data Infrastructure',
        question: 'What is the state of your data quality and reliability?',
        options: [
          { text: 'Frequent data inconsistencies and reliability issues, no systematic quality controls', score: 1 },
          { text: 'Some ad-hoc quality checks but ongoing data quality problems remain unresolved', score: 2 },
          { text: 'Standardized quality processes for critical business data with periodic monitoring', score: 3 },
          { text: 'Automated data quality monitoring, validation rules, and proactive alerting systems', score: 4 },
          { text: 'Comprehensive data quality framework with SLAs, continuous monitoring, and predictive quality management', score: 5 },
        ],
        requiredFor: ['early', 'growing'],
      },
      {
        id: 'analytics-2-early',
        category: 'Analytics Capabilities',
        question: 'How are data insights currently delivered in your organization?',
        options: [
          { text: 'Manual reports created and distributed periodically via email or presentations', score: 1 },
          { text: 'Static dashboards with limited interactivity, updated on a scheduled basis', score: 2 },
          { text: 'Interactive dashboards and BI tools that users can explore, refreshed regularly', score: 3 },
          { text: 'Real-time dashboards with automated alerts and proactive notifications for key metrics', score: 4 },
          { text: 'AI-powered insights pushed proactively, personalized recommendations, and intelligent alerting systems', score: 5 },
        ],
        requiredFor: ['early', 'growing'],
      },
      {
        id: 'people-2-early',
        category: 'People & Skills',
        question: 'How does your organization invest in developing data and analytics skills?',
        options: [
          { text: 'No formal training or skill development programs for data/analytics', score: 1 },
          { text: 'Ad-hoc training provided when needed or on request', score: 2 },
          { text: 'Regular training programs for the analytics team and power users', score: 3 },
          { text: 'Organization-wide data literacy programs and continuous skill development initiatives', score: 4 },
          { text: 'Comprehensive learning culture with mandatory data literacy, certifications, and continuous innovation in analytics', score: 5 },
        ],
        requiredFor: ['early', 'growing'],
      },
      {
        id: 'culture-2-early',
        category: 'Data Culture',
        question: 'How does senior leadership view data and analytics?',
        options: [
          { text: 'Not a priority or seen as a cost center with limited strategic value', score: 1 },
          { text: 'Nice to have for reporting purposes but not considered strategic', score: 2 },
          { text: 'Important for operations but not core to business strategy', score: 3 },
          { text: 'Strategic priority with dedicated budget and executive sponsorship', score: 4 },
          { text: 'Core competitive advantage and strategic differentiator with strong executive commitment', score: 5 },
        ],
        requiredFor: ['early', 'growing'],
      },
      {
        id: 'governance-2-early',
        category: 'Governance',
        question: 'Do you have basic data governance practices in place?',
        options: [
          { text: 'No data governance framework in place', score: 1 },
          { text: 'Informal data ownership and governance, mostly ad-hoc or undocumented', score: 2 },
          { text: 'Basic governance policies for critical data with some defined roles and responsibilities', score: 3 },
          { text: 'Formal governance framework with data stewards, policies, standards, and oversight', score: 4 },
          { text: 'Mature governance with clear policies, automated controls, data quality standards, and continuous improvement', score: 5 },
        ],
        requiredFor: ['early', 'growing'],
      },
    ] as Question[],
    // Questions for growing/medium companies
    growing: [
      {
        id: 'infra-3-growing',
        category: 'Data Infrastructure',
        question: 'What level of data integration exists across your business systems?',
        options: [
          { text: 'Minimal or no integration between systems, mostly manual data transfers', score: 1 },
          { text: 'Manual data transfers and limited point-to-point integrations between key systems', score: 2 },
          { text: 'Some automated integrations using ETL tools or middleware for core business processes', score: 3 },
          { text: 'Well-integrated ecosystem with APIs, modern integration platforms, and most systems connected', score: 4 },
          { text: 'Fully integrated data ecosystem with event-driven architecture, real-time synchronization, and intelligent data routing', score: 5 },
        ],
        requiredFor: ['growing', 'medium'],
      },
      {
        id: 'analytics-3-growing',
        category: 'Analytics Capabilities',
        question: 'How quickly can your organization answer new business questions using data?',
        options: [
          { text: 'Weeks or months - requires significant manual work and coordination', score: 1 },
          { text: '1-2 weeks - needs IT or analyst support to gather and analyze data', score: 2 },
          { text: 'A few days - most questions can be answered with existing reports or quick analysis', score: 3 },
          { text: 'Within a day - self-service tools enable rapid insights for most stakeholders', score: 4 },
          { text: 'Minutes to hours - true self-service analytics with real-time data access and intuitive tools', score: 5 },
        ],
        requiredFor: ['growing', 'medium'],
      },
      {
        id: 'people-3-growing',
        category: 'People & Skills',
        question: 'Who is responsible for making data-driven decisions in your organization?',
        options: [
          { text: 'Only senior leadership makes strategic decisions, data is rarely used by others', score: 1 },
          { text: 'Department heads and managers make decisions with support from analysts when data is available', score: 2 },
          { text: 'Managers across the organization are expected to use data in decision-making when available', score: 3 },
          { text: 'All employees are encouraged and empowered to use data to inform their work and decisions', score: 4 },
          { text: 'Data literacy is expected at all levels, and data-driven decision-making is embedded in organizational culture', score: 5 },
        ],
        requiredFor: ['growing', 'medium'],
      },
      {
        id: 'culture-3-growing',
        category: 'Data Culture',
        question: 'How comfortable and engaged are employees across the organization with using data?',
        options: [
          { text: 'Most employees avoid using data, prefer intuition or established processes', score: 1 },
          { text: 'Only dedicated analysts or data professionals regularly use data tools', score: 2 },
          { text: 'Some departments and teams actively embrace data-driven approaches', score: 3 },
          { text: 'Data usage is widely accepted and encouraged across most of the organization', score: 4 },
          { text: 'Everyone actively seeks data to inform their work, with high data literacy and enthusiasm', score: 5 },
        ],
        requiredFor: ['growing', 'medium'],
      },
    ] as Question[],
    // Questions for advanced/enterprise companies
    advanced: [
      {
        id: 'infra-4-advanced',
        category: 'Data Infrastructure',
        question: 'What is the state of your data quality and reliability framework?',
        options: [
          { text: 'Frequent data inconsistencies and reliability issues, no systematic quality controls', score: 1 },
          { text: 'Some ad-hoc quality checks but ongoing data quality problems remain unresolved', score: 2 },
          { text: 'Standardized quality processes for critical business data with periodic monitoring', score: 3 },
          { text: 'Automated data quality monitoring, validation rules, and proactive alerting systems', score: 4 },
          { text: 'Comprehensive data quality framework with SLAs, continuous monitoring, and predictive quality management', score: 5 },
        ],
        requiredFor: ['medium', 'advanced', 'enterprise'],
      },
      {
        id: 'infra-5-advanced',
        category: 'Data Infrastructure',
        question: 'How do you handle real-time data processing and streaming analytics?',
        options: [
          { text: 'No real-time processing capabilities', score: 1 },
          { text: 'Some batch processing with periodic updates', score: 2 },
          { text: 'Hybrid approach with some near-real-time capabilities', score: 3 },
          { text: 'Real-time streaming for key business processes and use cases', score: 4 },
          { text: 'Comprehensive real-time data platform with event-driven architecture across all systems', score: 5 },
        ],
        requiredFor: ['advanced', 'enterprise'],
        skipFor: ['early', 'growing'],
      },
      {
        id: 'analytics-4-advanced',
        category: 'Analytics Capabilities',
        question: 'What is the level of machine learning and advanced analytics adoption?',
        options: [
          { text: 'Not using machine learning or advanced analytics at all', score: 1 },
          { text: 'Exploring or planning to start ML projects, but nothing in production yet', score: 2 },
          { text: 'Pilot ML projects in specific areas with some proof-of-concept models', score: 3 },
          { text: 'Production ML models deployed in several business use cases with measurable impact', score: 4 },
          { text: 'ML and AI deeply integrated across the organization, driving core business decisions and competitive advantage', score: 5 },
        ],
        requiredFor: ['medium', 'advanced', 'enterprise'],
      },
      {
        id: 'analytics-5-advanced',
        category: 'Analytics Capabilities',
        question: 'How are data insights delivered to decision-makers in your organization?',
        options: [
          { text: 'Manual reports created and distributed periodically via email or presentations', score: 1 },
          { text: 'Static dashboards with limited interactivity, updated on a scheduled basis', score: 2 },
          { text: 'Interactive dashboards and BI tools that users can explore, refreshed regularly', score: 3 },
          { text: 'Real-time dashboards with automated alerts and proactive notifications for key metrics', score: 4 },
          { text: 'AI-powered insights pushed proactively, personalized recommendations, and intelligent alerting systems', score: 5 },
        ],
        requiredFor: ['medium', 'advanced', 'enterprise'],
      },
      {
        id: 'people-4-advanced',
        category: 'People & Skills',
        question: 'What is your organizational structure for data leadership?',
        options: [
          { text: 'No dedicated data leadership role, data responsibilities are ad-hoc or part of IT', score: 1 },
          { text: 'Data responsibilities are managed within IT leadership without dedicated focus', score: 2 },
          { text: 'Analytics manager or director role responsible for data and analytics initiatives', score: 3 },
          { text: 'VP or senior director of Data/Analytics with strategic influence and dedicated resources', score: 4 },
          { text: 'Chief Data Officer (CDO) or equivalent C-level role with seat at executive table and strategic mandate', score: 5 },
        ],
        requiredFor: ['growing', 'medium', 'advanced', 'enterprise'],
      },
      {
        id: 'people-5-advanced',
        category: 'People & Skills',
        question: 'How does your organization invest in developing data and analytics skills?',
        options: [
          { text: 'No formal training or skill development programs for data/analytics', score: 1 },
          { text: 'Ad-hoc training provided when needed or on request', score: 2 },
          { text: 'Regular training programs for the analytics team and power users', score: 3 },
          { text: 'Organization-wide data literacy programs and continuous skill development initiatives', score: 4 },
          { text: 'Comprehensive learning culture with mandatory data literacy, certifications, and continuous innovation in analytics', score: 5 },
        ],
        requiredFor: ['medium', 'advanced', 'enterprise'],
      },
      {
        id: 'culture-4-advanced',
        category: 'Data Culture',
        question: 'How does your organization share data insights and learnings across teams?',
        options: [
          { text: 'Rarely or never - insights stay within specific teams or departments', score: 1 },
          { text: 'Occasionally via emails or presentations, but not systematically', score: 2 },
          { text: 'Regular reporting and dashboards shared with key stakeholders', score: 3 },
          { text: 'Active sharing through centralized dashboards, collaborative platforms, and knowledge repositories', score: 4 },
          { text: 'Strong knowledge-sharing culture with communities of practice, data storytelling, and continuous learning', score: 5 },
        ],
        requiredFor: ['medium', 'advanced', 'enterprise'],
      },
      {
        id: 'governance-3-advanced',
        category: 'Governance',
        question: 'Do you have a formal data governance framework?',
        options: [
          { text: 'No data governance framework in place', score: 1 },
          { text: 'Informal data ownership and governance, mostly ad-hoc or undocumented', score: 2 },
          { text: 'Basic governance policies for critical data with some defined roles and responsibilities', score: 3 },
          { text: 'Formal governance framework with data stewards, policies, standards, and oversight', score: 4 },
          { text: 'Mature governance with clear policies, automated controls, data quality standards, and continuous improvement', score: 5 },
        ],
        requiredFor: ['medium', 'advanced', 'enterprise'],
      },
      {
        id: 'governance-4-advanced',
        category: 'Governance',
        question: 'How do you maintain data documentation, metadata, and lineage?',
        options: [
          { text: 'No systematic documentation or metadata management', score: 1 },
          { text: 'Documentation scattered in various locations (emails, wikis, documents) with no central system', score: 2 },
          { text: 'Basic data dictionary or catalog for key systems and critical data', score: 3 },
          { text: 'Centralized metadata repository with searchable documentation and some lineage tracking', score: 4 },
          { text: 'Active data catalog with comprehensive metadata, automated lineage, and self-service discovery', score: 5 },
        ],
        requiredFor: ['advanced', 'enterprise'],
        skipFor: ['early'],
      },
      {
        id: 'governance-5-advanced',
        category: 'Governance',
        question: 'How do you measure and track the value and ROI of data initiatives?',
        options: [
          { text: 'We don\'t systematically measure the value or impact of data initiatives', score: 1 },
          { text: 'Anecdotal evidence and qualitative feedback, but no quantitative measurement', score: 2 },
          { text: 'Some KPIs and metrics tracked for major data projects and analytics investments', score: 3 },
          { text: 'Regular ROI tracking and value measurement for most data initiatives with defined success metrics', score: 4 },
          { text: 'Comprehensive value measurement framework with business impact tracking, ROI dashboards, and continuous optimization', score: 5 },
        ],
        requiredFor: ['advanced', 'enterprise'],
        skipFor: ['early', 'growing'],
      },
    ] as Question[],
  },
  pathways: {
    early: {
      id: 'early',
      name: 'Foundational',
      description: 'Focus on building solid foundations for data analytics',
      minScore: 1,
      maxScore: 6,
    },
    growing: {
      id: 'growing',
      name: 'Scaling',
      description: 'Scale your analytics capabilities and establish best practices',
      minScore: 7,
      maxScore: 10,
    },
    medium: {
      id: 'medium',
      name: 'Established',
      description: 'Optimize and enhance your mature analytics operations',
      minScore: 11,
      maxScore: 13,
    },
    advanced: {
      id: 'advanced',
      name: 'Advanced',
      description: 'Leverage advanced analytics and AI for competitive advantage',
      minScore: 14,
      maxScore: 15,
    },
    enterprise: {
      id: 'enterprise',
      name: 'Enterprise',
      description: 'Enterprise-wide data transformation and innovation',
      minScore: 16,
    },
  } as Record<string, Pathway>,
  maturityLevels: {
    1: {
      name: 'Initial',
      description: 'Your organization is in the early stages of data analytics adoption. Focus on building foundational infrastructure and basic capabilities.',
      color: '#ef4444',
    },
    2: {
      name: 'Developing',
      description: 'You\'re making progress with data analytics but have significant opportunities for improvement across multiple dimensions.',
      color: '#f97316',
    },
    3: {
      name: 'Defined',
      description: 'You have established data analytics processes and are seeing value from your efforts. Time to scale and optimize.',
      color: '#eab308',
    },
    4: {
      name: 'Managed',
      description: 'Your organization has mature data analytics capabilities with measurable business impact. Focus on innovation and advanced capabilities.',
      color: '#A3E635',
    },
    5: {
      name: 'Optimized',
      description: 'You\'re a data-driven organization with advanced analytics as a core competitive advantage. Focus on continuous innovation and excellence.',
      color: '#22c55e',
    },
  } as Record<number, MaturityLevel>,
};
