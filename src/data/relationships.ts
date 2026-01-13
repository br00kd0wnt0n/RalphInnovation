import { projects } from './projects';
import type { Capability, Theme, Quarter } from './categories';

export interface RelationshipNode {
  id: string;
  name: string;
  category: string;
  quarter: Quarter;
  isRoadmap?: boolean;
  x?: number;
  y?: number;
  fx?: number | null;
  fy?: number | null;
}

export interface RelationshipLink {
  source: string | RelationshipNode;
  target: string | RelationshipNode;
  type: 'buildsOn' | 'dataFlowsTo';
  isRoadmapLink?: boolean;
}

export const getNetworkData = (yearFilter: '2025' | '2026' | 'all' = 'all') => {
  const filteredProjects = yearFilter === '2026'
    ? projects.filter((p) => p.isRoadmap || p.category === '2026 Roadmap')
    : yearFilter === '2025'
    ? projects.filter((p) => !p.isRoadmap && p.category !== '2026 Roadmap')
    : projects; // 'all' returns all projects

  const nodes: RelationshipNode[] = filteredProjects.map((p) => ({
    id: p.id,
    name: p.name,
    category: p.category,
    quarter: p.quarter,
    isRoadmap: p.isRoadmap || p.category === '2026 Roadmap',
  }));

  const nodeIds = new Set(nodes.map((n) => n.id));
  const links: RelationshipLink[] = [];

  filteredProjects.forEach((project) => {
    const isProjectRoadmap = project.isRoadmap || project.category === '2026 Roadmap';

    project.buildsOn.forEach((targetId) => {
      if (nodeIds.has(targetId)) {
        links.push({
          source: project.id,
          target: targetId,
          type: 'buildsOn',
          isRoadmapLink: isProjectRoadmap,
        });
      }
    });

    project.dataFlowsTo.forEach((targetId) => {
      if (nodeIds.has(targetId)) {
        links.push({
          source: project.id,
          target: targetId,
          type: 'dataFlowsTo',
          isRoadmapLink: isProjectRoadmap,
        });
      }
    });
  });

  return { nodes, links };
};

export const getCapabilityTimeline = (yearFilter: '2025' | '2026' = '2025') => {
  const capabilities: Capability[] = [
    'ai-integration',
    'trend-intelligence',
    'creator-data',
    'real-time-streaming',
    'interactive-visuals',
    'data-architecture',
    'cms-systems',
    'consumer-ux',
    'forecasting',
    'web-scraping',
  ];

  const quarters: Quarter[] = ['Q1', 'Q2', 'Q3', 'Q4'];

  const filteredProjects = yearFilter === '2026'
    ? projects.filter((p) => p.isRoadmap || p.category === '2026 Roadmap')
    : projects.filter((p) => !p.isRoadmap && p.category !== '2026 Roadmap');

  const timeline: Record<Capability, { quarter: Quarter; projectId: string; projectName: string; isRoadmap: boolean }[]> = {} as Record<Capability, { quarter: Quarter; projectId: string; projectName: string; isRoadmap: boolean }[]>;

  capabilities.forEach((cap) => {
    timeline[cap] = [];

    filteredProjects.forEach((project) => {
      if (project.capabilities.includes(cap)) {
        timeline[cap].push({
          quarter: project.quarter,
          projectId: project.id,
          projectName: project.name,
          isRoadmap: project.isRoadmap || project.category === '2026 Roadmap',
        });
      }
    });

    // Sort by quarter, then roadmap last
    timeline[cap].sort((a, b) => {
      const quarterDiff = quarters.indexOf(a.quarter) - quarters.indexOf(b.quarter);
      if (quarterDiff !== 0) return quarterDiff;
      if (a.isRoadmap && !b.isRoadmap) return 1;
      if (!a.isRoadmap && b.isRoadmap) return -1;
      return 0;
    });
  });

  return timeline;
};

export const getThemeCoverage = () => {
  const themes: Theme[] = [
    'trend-identification',
    'audience-connection',
    'data-ownership',
    'creator-relationships',
    'brand-storytelling',
    'entertainment-infrastructure',
    'internal-efficiency',
  ];

  const coverage: Record<Theme, number> = {} as Record<Theme, number>;

  themes.forEach((theme) => {
    coverage[theme] = projects.filter((p) => p.themes.includes(theme)).length;
  });

  return coverage;
};

export const getProjectConnections = (projectId: string) => {
  const project = projects.find((p) => p.id === projectId);
  if (!project) return { incoming: [], outgoing: [] };

  const incoming = projects.filter(
    (p) => p.dataFlowsTo.includes(projectId) || p.buildsOn.includes(projectId)
  );

  const outgoing = projects.filter(
    (p) => project.dataFlowsTo.includes(p.id) || project.buildsOn.includes(p.id)
  );

  return { incoming, outgoing };
};

export const keyInsights = [
  {
    title: 'The Intelligence Stack',
    description: 'Trends → Rolodex → Unified Dashboard → Ralph Narrativ',
    detail: 'Four projects that build on each other to create a unique data advantage.',
    projects: ['ralph-loves-trends', 'creator-rolodex', 'unified-dashboard', 'ralph-narrativ'],
  },
  {
    title: 'AI Everywhere',
    description: '11 of 18 projects integrate AI',
    detail: 'Not as a feature, but as infrastructure.',
    stat: '61%',
  },
  {
    title: 'From Tools to Products',
    description: 'Q1-Q3 built capabilities. Q4 combined them.',
    detail: 'The year\'s infrastructure investment paying off in commercial products.',
  },
  {
    title: 'Client-Ready Innovation',
    description: 'Netflix sold, HayStack pitched, Care Bears deployed',
    detail: 'Rapid prototyping methodology proven with real client wins.',
    projects: ['netflix-aerials', 'haystack-dashboard', 'care-bears-dashboard'],
  },
];
