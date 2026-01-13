import { motion } from 'framer-motion';
import { projects } from '../data/projects';
import { Boxes, Brain, Users, Zap, TrendingUp } from 'lucide-react';

export function StatsPanel() {
  // Calculate comprehensive stats across all projects
  const allProjects = projects;
  const projectsRoadmap = projects.filter((p) => p.isRoadmap || p.category === '2026 Roadmap');

  const aiProjects = allProjects.filter((p) =>
    p.capabilities.includes('ai-integration')
  ).length;

  // Unique capabilities developed
  const uniqueCapabilities = new Set(allProjects.flatMap((p) => p.capabilities));

  // Client-facing projects (Client Work + Commercial Products with Live/Sold status)
  const clientFacing = allProjects.filter(
    (p) =>
      (p.category === 'Client Work' || p.category === 'Commercial Products') &&
      (p.status === 'Live' || p.status === 'Sold' || p.status === 'Pitch Tool')
  ).length;

  const statItems = [
    {
      label: 'Total Projects',
      value: allProjects.length,
      icon: Boxes,
      color: 'text-accent-cyan',
      bgColor: 'bg-accent-cyan/10',
    },
    {
      label: 'AI-Powered',
      value: aiProjects,
      icon: Brain,
      color: 'text-accent-pink',
      bgColor: 'bg-accent-pink/10',
    },
    {
      label: 'Capabilities',
      value: uniqueCapabilities.size,
      icon: Zap,
      color: 'text-accent-cyan',
      bgColor: 'bg-accent-cyan/10',
    },
    {
      label: 'Client Tools',
      value: clientFacing,
      icon: Users,
      color: 'text-purple-400',
      bgColor: 'bg-purple-400/10',
    },
    {
      label: '2026 Roadmap',
      value: projectsRoadmap.length,
      icon: TrendingUp,
      color: 'text-accent-pink',
      bgColor: 'bg-accent-pink/10',
      isRoadmap: true,
    },
  ];

  return (
    <div className="px-6 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {statItems.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className={`bg-bg-card border border-border-default rounded-xl p-5 text-center ${
                stat.isRoadmap ? 'border-dashed border-accent-pink/30' : ''
              }`}
            >
              <div
                className={`inline-flex items-center justify-center w-10 h-10 rounded-lg ${stat.bgColor} mb-3`}
              >
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <motion.div
                className="text-3xl font-bold text-text-primary mb-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              >
                {stat.value}
              </motion.div>
              <div className={`text-sm ${stat.isRoadmap ? 'roadmap-badge' : 'text-text-secondary'}`}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
