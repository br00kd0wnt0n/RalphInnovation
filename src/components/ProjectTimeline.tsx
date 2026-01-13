import { motion } from 'framer-motion';
import { projects } from '../data/projects';
import { categoryColors } from '../data/categories';

interface ProjectTimelineProps {
  onProjectSelect?: (projectId: string) => void;
}

export function ProjectTimeline({ onProjectSelect }: ProjectTimelineProps) {
  // Define the time range: Q1 2025 through Q1 2026
  const quarters = [
    { label: 'Q1', year: 2025 },
    { label: 'Q2', year: 2025 },
    { label: 'Q3', year: 2025 },
    { label: 'Q4', year: 2025 },
    { label: 'Q1', year: 2026 },
  ];

  const totalQuarters = quarters.length;

  // Map month to quarter index
  const getQuarterIndex = (dateStr: string | undefined, isEnd = false): number => {
    if (!dateStr) return isEnd ? totalQuarters - 1 : 0;
    if (dateStr === 'ongoing') return totalQuarters - 1;

    const [year, month] = dateStr.split('-').map(Number);

    // Determine quarter from month
    let q: string;
    if (month <= 3) q = 'Q1';
    else if (month <= 6) q = 'Q2';
    else if (month <= 9) q = 'Q3';
    else q = 'Q4';

    const idx = quarters.findIndex((quarter) => quarter.year === year && quarter.label === q);
    return idx === -1 ? (isEnd ? totalQuarters - 1 : 0) : idx;
  };

  // Get projects with dates, sorted by start
  const projectsWithDates = projects
    .filter((p) => p.startDate || p.endDate)
    .sort((a, b) => {
      const aStart = getQuarterIndex(a.startDate);
      const bStart = getQuarterIndex(b.startDate);
      return aStart - bStart;
    });

  // Custom display names for timeline
  const getDisplayName = (project: typeof projects[0]): string => {
    const displayNames: Record<string, string> = {
      'Ralph Loves Trends': 'Ralph Loves Trends',
      'Creator Rolodex': 'Creator Rolodex',
      'Client Survey': 'Client Survey',
      'Mag Chat': 'Mag Chat',
      'Netflix Interactive Aerials': 'Netflix Aerials',
      'In Our Prime Trendspotter': 'In Our Prime',
      'Ralph TV Broadcaster': 'Broadcaster',
      'Care Bears Pitch': 'Care Bears Pitch',
      'Care Bears Dashboard': 'Care Bears Production',
      'SuperCell HayStack': 'SuperCell HayStack',
      'Ralph Intranet': 'Intranet',
      'Ralph Narrativ': 'Narrativ',
      'Unified Dashboard': 'Unified Dashboard',
      'Ralph Voices': 'Ralph Voices',
      "Ralph's Lab": "Ralph's Lab",
      'Ralph Radio': 'Ralph Radio',
      'GWI Integration Layer': 'GWI Integration',
      'Visual Canvas': 'Ralph World Dynamic Canvas',
      'RalphBot': 'RalphBot',
      'ReCaptionator': 'ReCaptionator',
      'BD-1 Wavelength': 'BD-1 Wavelength',
      'Squawk FM': 'Squawk FM',
      'BeReal AR Test': 'BeReal AR',
      'Circles': 'Circles',
      'CareBears Product': 'CareBears Product',
      'Haystack': 'Haystack',
    };
    return displayNames[project.name] || project.name;
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
              Project Timeline
            </h3>
            <p className="text-text-secondary text-sm">
              Innovation journey from Q4 2024 through 2026. Click any project to see details.
            </p>
          </div>

          {/* Timeline */}
          <div className="p-6 overflow-x-auto">
            <div className="min-w-[800px]">
              {/* Year Headers */}
              <div className="flex mb-2">
                <div className="w-[180px] shrink-0" />
                <div className="flex flex-1">
                  <div
                    className="text-center text-xs font-semibold text-text-primary uppercase tracking-wider border-r border-border-default"
                    style={{ width: `${(4 / totalQuarters) * 100}%` }}
                  >
                    2025
                  </div>
                  <div
                    className="text-center text-xs font-semibold text-accent-pink uppercase tracking-wider"
                    style={{ width: `${(1 / totalQuarters) * 100}%` }}
                  >
                    2026
                  </div>
                </div>
              </div>

              {/* Quarter Headers */}
              <div className="flex mb-4 pb-4 border-b border-border-default">
                <div className="w-[180px] shrink-0 text-xs text-text-muted uppercase tracking-wider pr-4">
                  Project
                </div>
                <div className="flex flex-1">
                  {quarters.map((q, i) => (
                    <div
                      key={`${q.year}-${q.label}`}
                      className={`text-center text-sm font-medium ${
                        q.year === 2026
                          ? 'text-accent-pink/70'
                          : 'text-text-secondary'
                      } ${i === 3 ? 'border-r border-border-default' : ''}`}
                      style={{ width: `${100 / totalQuarters}%` }}
                    >
                      {q.label}
                    </div>
                  ))}
                </div>
              </div>

              {/* Project Rows */}
              <div className="space-y-2">
                {projectsWithDates.map((project, index) => {
                  const startIdx = getQuarterIndex(project.startDate);
                  const endIdx = getQuarterIndex(project.endDate, true);
                  const duration = endIdx - startIdx + 1;
                  const isRoadmap = project.isRoadmap || project.category === '2026 Roadmap';
                  const isOngoing = project.endDate === 'ongoing';
                  const color = categoryColors[project.category]?.primary || '#888888';

                  return (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.03 }}
                      className="flex items-center h-9"
                    >
                      {/* Project Name */}
                      <div className="w-[180px] shrink-0 pr-4">
                        <button
                          onClick={() => onProjectSelect?.(project.id)}
                          className="text-sm text-text-primary hover:text-accent-cyan transition-colors truncate text-left w-full"
                          title={project.name}
                        >
                          {getDisplayName(project)}
                        </button>
                      </div>

                      {/* Timeline Bar */}
                      <div className="flex flex-1 relative">
                        {/* Background grid */}
                        <div className="absolute inset-0 flex">
                          {quarters.map((q, i) => (
                            <div
                              key={`grid-${q.year}-${q.label}`}
                              className={`h-full ${
                                i === 3
                                  ? 'border-r border-border-default'
                                  : 'border-r border-border-default/30'
                              }`}
                              style={{ width: `${100 / totalQuarters}%` }}
                            />
                          ))}
                        </div>

                        {/* Project bar */}
                        <motion.button
                          onClick={() => onProjectSelect?.(project.id)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className={`absolute h-7 top-1 rounded-md flex items-center justify-center text-xs font-medium transition-all z-10 ${
                            isRoadmap
                              ? 'border-2 border-dashed opacity-80 hover:opacity-100'
                              : 'hover:ring-2 hover:ring-white/30'
                          } ${isOngoing ? 'rounded-r-none' : ''}`}
                          style={{
                            left: `${(startIdx / totalQuarters) * 100}%`,
                            width: `${(duration / totalQuarters) * 100}%`,
                            backgroundColor: isRoadmap ? `${color}20` : color,
                            borderColor: isRoadmap ? color : undefined,
                            color: isRoadmap ? color : 'white',
                          }}
                          title={`${project.name}: ${project.startDate} - ${project.endDate}`}
                        >
                          <span className="truncate px-2">
                            {getDisplayName(project)}
                          </span>
                        </motion.button>

                        {/* Ongoing indicator */}
                        {isOngoing && (
                          <div
                            className="absolute h-7 top-1 flex items-center"
                            style={{
                              left: `${((endIdx + 1) / totalQuarters) * 100}%`,
                            }}
                          >
                            <div
                              className="w-6 h-full"
                              style={{
                                background: `linear-gradient(to right, ${isRoadmap ? `${color}40` : color}, transparent)`,
                              }}
                            />
                          </div>
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
              <span className="text-text-muted">Categories:</span>
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
