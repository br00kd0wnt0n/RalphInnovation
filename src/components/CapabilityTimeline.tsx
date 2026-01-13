import { motion } from 'framer-motion';
import { getCapabilityTimeline } from '../data/relationships';
import { capabilityLabels, categoryColors, type Capability } from '../data/categories';
import { projects } from '../data/projects';

interface CapabilityTimelineProps {
  onProjectSelect?: (projectId: string) => void;
}

export function CapabilityTimeline({ onProjectSelect }: CapabilityTimelineProps) {
  // Always show both 2025 and 2026 - get all projects
  const timeline2025 = getCapabilityTimeline('2025');
  const timeline2026 = getCapabilityTimeline('2026');
  const quarters = ['Q1', 'Q2', 'Q3', 'Q4'];

  const capabilities: Capability[] = [
    'ai-integration',
    'trend-intelligence',
    'creator-data',
    'interactive-visuals',
    'data-architecture',
    'cms-systems',
    'real-time-streaming',
    'web-scraping',
    'forecasting',
    'consumer-ux',
  ];

  const getProjectColor = (projectId: string) => {
    const project = projects.find((p) => p.id === projectId);
    if (!project) return '#888888';
    return categoryColors[project.category]?.primary || '#888888';
  };

  // Custom display names for timeline buttons
  const getDisplayName = (projectName: string): string => {
    const displayNames: Record<string, string> = {
      'Ralph Loves Trends': 'Ralph Loves Trends',
      'Creator Rolodex': 'Creator Rolodex',
      'Client Survey': 'Client Survey',
      'Mag Chat': 'Mag Chat',
      'Squawk FM': 'Aerials',
      'Netflix Interactive Aerials': 'Aerials',
      'In Our Prime Trendspotter': 'In Our Prime',
      'Ralph TV Broadcaster': 'Broadcaster',
      'Care Bears Growth Dashboard': 'CareBears',
      'Ralph Intranet': 'Intranet',
      'Storytelling Intelligence': 'Storytelling',
      'Unified Dashboard': 'Unified Dashboard',
      'Ralph Voices': 'Ralph Voices',
      "Ralph's Lab": 'Lab',
      'Ralph Radio': 'Radio',
      'GWI Integration Layer': 'GWI Layer',
    };
    return displayNames[projectName] || projectName.split(' ')[0];
  };

  return (
    <div className="px-6 py-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-bg-card border border-border-default rounded-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="p-6 border-b border-border-default">
            <h3 className="text-xl font-semibold text-text-primary mb-2">
              Capability Evolution Timeline
            </h3>
            <p className="text-text-secondary text-sm">
              Watch how capabilities accumulated throughout 2025 and continue into 2026 as projects built on each other.
            </p>
          </div>

          {/* Timeline */}
          <div className="p-6 overflow-x-auto">
            <div className="min-w-[900px]">
              {/* Quarter Headers */}
              <div className="grid gap-2 mb-4 pb-4 border-b border-border-default grid-cols-[200px_repeat(5,1fr)]">
                <div className="text-xs text-text-muted uppercase tracking-wider">
                  Capability
                </div>
                {quarters.map((q) => (
                  <div
                    key={q}
                    className="text-center text-sm text-text-secondary font-medium"
                  >
                    {q} 2025
                  </div>
                ))}
                <div className="text-center text-sm font-medium text-accent-pink">
                  2026
                </div>
              </div>

              {/* Capability Rows */}
              <div className="space-y-3">
                {capabilities.map((cap, index) => {
                  const cap2025Projects = timeline2025[cap] || [];
                  const cap2026Projects = timeline2026[cap] || [];
                  const hasProjects = cap2025Projects.length > 0 || cap2026Projects.length > 0;

                  return (
                    <motion.div
                      key={cap}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="grid gap-2 items-center grid-cols-[200px_repeat(5,1fr)]"
                    >
                      {/* Capability Name */}
                      <div
                        className={`text-sm ${
                          hasProjects ? 'text-text-primary' : 'text-text-muted'
                        }`}
                      >
                        {capabilityLabels[cap]}
                      </div>

                      {/* Quarter Cells - 2025 */}
                      {quarters.map((q) => {
                        const quarterProjects = cap2025Projects.filter(
                          (p) => p.quarter === q
                        );

                        return (
                          <div key={q} className="flex flex-wrap gap-1 min-h-[32px]">
                            {quarterProjects.map((p) => (
                              <motion.button
                                key={p.projectId}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => onProjectSelect?.(p.projectId)}
                                className="px-2 py-1 text-xs rounded-md text-white font-medium truncate max-w-[140px] hover:ring-2 hover:ring-white/30 transition-all"
                                style={{
                                  backgroundColor: getProjectColor(p.projectId),
                                }}
                                title={p.projectName}
                              >
                                {getDisplayName(p.projectName)}
                              </motion.button>
                            ))}
                            {quarterProjects.length === 0 && (
                              <div className="w-full h-1 bg-border-default rounded self-center" />
                            )}
                          </div>
                        );
                      })}

                      {/* 2026 Cell */}
                      <div className="flex flex-wrap gap-1 min-h-[32px]">
                        {cap2026Projects.map((p) => (
                          <motion.button
                            key={p.projectId}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => onProjectSelect?.(p.projectId)}
                            className="px-2 py-1 text-xs rounded-md font-medium truncate max-w-[140px] hover:ring-2 hover:ring-accent-pink/30 transition-all border-2 border-dashed opacity-80 hover:opacity-100"
                            style={{
                              borderColor: getProjectColor(p.projectId),
                              color: getProjectColor(p.projectId),
                              backgroundColor: `${getProjectColor(p.projectId)}20`,
                            }}
                            title={p.projectName}
                          >
                            {getDisplayName(p.projectName)}
                          </motion.button>
                        ))}
                        {cap2026Projects.length === 0 && (
                          <div className="w-full h-1 bg-accent-pink/20 rounded self-center" />
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Footer Legend */}
          <div className="px-6 py-4 border-t border-border-default bg-bg-card-hover">
            <div className="flex flex-wrap gap-4 text-xs">
              <span className="text-text-muted">Project categories:</span>
              {Object.entries(categoryColors).map(([cat, colors]) => {
                const isRoadmapCat = cat === '2026 Roadmap';

                return (
                  <div key={cat} className="flex items-center gap-1">
                    <div
                      className={`w-3 h-3 rounded ${isRoadmapCat ? 'border-2 border-dashed' : ''}`}
                      style={{
                        backgroundColor: isRoadmapCat ? 'transparent' : colors.primary,
                        borderColor: isRoadmapCat ? colors.primary : undefined,
                      }}
                    />
                    <span className={isRoadmapCat ? 'text-accent-pink' : 'text-text-secondary'}>
                      {cat}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
