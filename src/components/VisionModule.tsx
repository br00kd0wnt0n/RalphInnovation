import { useState } from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, Users, BarChart3, ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';

export function VisionModule() {
  const [isExpanded, setIsExpanded] = useState(true);

  const phases = [
    {
      phase: '01',
      title: 'IDEATE',
      subtitle: 'Ralph Narrativ',
      description: 'Generate and refine creative concepts through AI-powered storytelling intelligence, trend analysis, and strategic frameworks.',
      icon: Lightbulb,
      color: 'accent-cyan',
      tools: ['Ralph Narrativ', 'Ralph Loves Trends', 'Unified Dashboard'],
    },
    {
      phase: '02',
      title: 'VALIDATE',
      subtitle: 'Ralph Voices',
      description: 'Stress-test ideas with synthetic audience personas calibrated to specific demographics before real-world exposure.',
      icon: Users,
      color: 'accent-pink',
      tools: ['Ralph Voices', 'Creator Rolodex', 'GWI Integration'],
    },
    {
      phase: '03',
      title: 'MEASURE',
      subtitle: 'Ralph Dashboards',
      description: 'Track performance, forecast outcomes, and optimize campaigns with predictive analytics and real-time intelligence.',
      icon: BarChart3,
      color: 'accent-yellow',
      tools: ['Care Bears Dashboard', 'HayStack Dashboard', 'Forecasting Engine'],
    },
  ];

  return (
    <div className="px-6 py-12">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-bg-card to-bg-card-hover border border-border-default rounded-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="p-8 border-b border-border-default relative">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-center"
            >
              <h2 className="text-2xl font-bold text-text-primary mb-3">
                Ralph Innovation Suite
              </h2>
              <p className="text-text-secondary max-w-2xl mx-auto">
                How we build fandoms. A systematic approach to creative intelligence — from ideation through validation to measurement.
              </p>
            </motion.div>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="absolute right-8 top-8 flex items-center gap-2 px-3 py-1.5 text-sm text-text-secondary hover:text-text-primary transition-colors"
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

          {/* Phases */}
          <motion.div
            initial={false}
            animate={{ height: isExpanded ? 'auto' : 0, opacity: isExpanded ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
          <div className="p-8">
            <div className="grid md:grid-cols-3 gap-6">
              {phases.map((phase, index) => (
                <motion.div
                  key={phase.phase}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="relative"
                >
                  {/* Connection Arrow (between phases) */}
                  {index < phases.length - 1 && (
                    <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                      <ArrowRight className="w-6 h-6 text-text-muted" />
                    </div>
                  )}

                  <div className={`bg-bg-primary border border-border-default rounded-xl p-6 h-full hover:border-${phase.color}/50 transition-colors`}>
                    {/* Phase Number */}
                    <div className={`text-xs font-bold text-${phase.color} mb-2`}>
                      PHASE {phase.phase}
                    </div>

                    {/* Icon */}
                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-${phase.color}/10 mb-4`}>
                      <phase.icon className={`w-6 h-6 text-${phase.color}`} />
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-text-primary mb-1">
                      {phase.title}
                    </h3>
                    <div className={`text-sm text-${phase.color} font-medium mb-3`}>
                      {phase.subtitle}
                    </div>

                    {/* Description */}
                    <p className="text-text-secondary text-sm mb-4">
                      {phase.description}
                    </p>

                    {/* Tools */}
                    <div className="pt-4 border-t border-border-default">
                      <div className="text-xs text-text-muted uppercase tracking-wider mb-2">
                        Key Tools
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {phase.tools.map((tool) => (
                          <span
                            key={tool}
                            className="text-xs px-2 py-1 rounded-md bg-bg-card text-text-secondary"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          </motion.div>

        </motion.div>
      </div>
    </div>
  );
}
