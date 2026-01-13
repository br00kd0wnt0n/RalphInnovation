import { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, Calendar, ChevronDown, ChevronUp } from 'lucide-react';
import { CapabilityTimeline } from './CapabilityTimeline';
import { ProjectTimeline } from './ProjectTimeline';

interface VisualizationTabsProps {
  onProjectSelect?: (projectId: string) => void;
}

export function VisualizationTabs({ onProjectSelect }: VisualizationTabsProps) {
  const [activeTab, setActiveTab] = useState<'project-timeline' | 'capability'>('project-timeline');
  const [isExpanded, setIsExpanded] = useState(true);

  const tabs = [
    { id: 'project-timeline' as const, label: 'Project Timeline', icon: Calendar },
    { id: 'capability' as const, label: 'Capability Timeline', icon: Clock },
  ];

  return (
    <div className="px-6 py-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Header with Toggle */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-text-primary">
            Project Relationships
          </h2>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2 px-3 py-1.5 text-sm text-text-secondary hover:text-text-primary transition-colors"
          >
            {isExpanded ? (
              <>
                <span>Collapse</span>
                <ChevronUp className="w-4 h-4" />
              </>
            ) : (
              <>
                <span>Expand</span>
                <ChevronDown className="w-4 h-4" />
              </>
            )}
          </button>
        </div>

        {/* Tabs */}
        <motion.div
          initial={false}
          animate={{ height: isExpanded ? 'auto' : 0, opacity: isExpanded ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <div className="flex gap-2 mb-4">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-accent-cyan/20 text-accent-cyan border border-accent-cyan/30'
                      : 'bg-bg-card text-text-secondary hover:text-text-primary border border-border-default'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Content */}
          <div key={activeTab}>
            {activeTab === 'project-timeline' ? (
              <ProjectTimeline onProjectSelect={onProjectSelect} />
            ) : (
              <CapabilityTimeline onProjectSelect={onProjectSelect} />
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
