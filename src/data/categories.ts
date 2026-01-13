export type Category =
  | 'Commercial Products'
  | 'Intelligence'
  | 'Infrastructure'
  | 'Client Work'
  | '2026 Roadmap';

export type Status = 'Live' | 'Testing' | 'Prototype' | 'Sold' | 'Pitch Tool' | 'Prototyping' | 'Concept' | 'Planned' | 'In Negotiation';

export type Capability =
  | 'ai-integration'
  | 'trend-intelligence'
  | 'creator-data'
  | 'real-time-streaming'
  | 'interactive-visuals'
  | 'data-architecture'
  | 'cms-systems'
  | 'consumer-ux'
  | 'forecasting'
  | 'web-scraping';

export type Theme =
  | 'trend-identification'
  | 'audience-connection'
  | 'data-ownership'
  | 'creator-relationships'
  | 'brand-storytelling'
  | 'entertainment-infrastructure'
  | 'internal-efficiency';

export type Quarter = 'Q1' | 'Q2' | 'Q3' | 'Q4';

export const categoryColors: Record<Category, { primary: string; secondary: string }> = {
  'Commercial Products': { primary: '#E91E8C', secondary: '#b8157a' },
  'Intelligence': { primary: '#00CED1', secondary: '#00a8ab' },
  'Infrastructure': { primary: '#4CAF50', secondary: '#388E3C' },
  'Client Work': { primary: '#9b59b6', secondary: '#8e44ad' },
  '2026 Roadmap': { primary: '#E91E8C', secondary: '#00CED1' },
};

export const statusColors: Record<Status, string> = {
  'Live': 'status-live',
  'Testing': 'status-testing',
  'Prototype': 'status-prototype',
  'Prototyping': 'status-prototype',
  'Sold': 'status-sold',
  'Pitch Tool': 'status-pitch',
  'Concept': 'status-concept',
  'Planned': 'status-planned',
  'In Negotiation': 'status-negotiation',
};

export const capabilityLabels: Record<Capability, string> = {
  'ai-integration': 'AI Integration',
  'trend-intelligence': 'Trend Intelligence',
  'creator-data': 'Creator Data',
  'real-time-streaming': 'Real-time Streaming',
  'interactive-visuals': 'Interactive Visuals',
  'data-architecture': 'Data Architecture',
  'cms-systems': 'CMS Systems',
  'consumer-ux': 'Consumer UX',
  'forecasting': 'Forecasting',
  'web-scraping': 'Web Scraping',
};

export const themeLabels: Record<Theme, string> = {
  'trend-identification': 'Trend Identification',
  'audience-connection': 'Audience Connection',
  'data-ownership': 'Data Ownership',
  'creator-relationships': 'Creator Relationships',
  'brand-storytelling': 'Brand Storytelling',
  'entertainment-infrastructure': 'Entertainment Infrastructure',
  'internal-efficiency': 'Internal Efficiency',
};

export const allCategories: Category[] = [
  'Commercial Products',
  'Intelligence',
  'Infrastructure',
  'Client Work',
  '2026 Roadmap',
];
