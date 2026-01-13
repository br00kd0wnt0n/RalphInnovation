import { motion } from 'framer-motion';
import { Lightbulb, TrendingUp, Brain, Sparkles, Rocket } from 'lucide-react';
import { keyInsights } from '../data/relationships';

interface Insight {
  title: string;
  description: string;
  detail: string;
  stat?: string;
  projects?: string[];
}

const evolutionInsight: Insight = {
  title: '2025 → 2026',
  description: 'Every 2026 roadmap project builds on 2025 foundations.',
  detail: 'Ralph Voices needs Ralph Narrativ + Care Bears forecasting. The Innovation Suite needs Rolodex + Unified Dashboard. Nothing planned starts from scratch.',
};

export function InsightsPanel() {
  const icons = [TrendingUp, Brain, Sparkles, Lightbulb, Rocket];

  const insights: Insight[] = [...keyInsights, evolutionInsight];

  return (
    <div className="px-6 py-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h3 className="text-xl font-semibold text-text-primary mb-6 flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-accent-yellow" />
            Key Insights
          </h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
            {insights.map((insight, index) => {
              const Icon = icons[index % icons.length];
              const isEvolutionInsight = insight.title === '2025 → 2026';

              return (
                <motion.div
                  key={insight.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`bg-bg-card border rounded-xl p-5 hover:border-accent-cyan/30 transition-colors group ${
                    isEvolutionInsight
                      ? 'border-dashed border-accent-pink/40'
                      : 'border-border-default'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className={`p-2 rounded-lg transition-colors ${
                      isEvolutionInsight
                        ? 'bg-gradient-to-r from-accent-pink/10 to-accent-cyan/10 group-hover:from-accent-pink/20 group-hover:to-accent-cyan/20'
                        : 'bg-accent-cyan/10 group-hover:bg-accent-cyan/20'
                    }`}>
                      <Icon className={`w-4 h-4 ${isEvolutionInsight ? 'text-accent-pink' : 'text-accent-cyan'}`} />
                    </div>
                    {'stat' in insight && insight.stat && (
                      <span className="text-2xl font-bold gradient-text">
                        {insight.stat}
                      </span>
                    )}
                  </div>

                  <h4 className={`font-semibold mb-2 ${isEvolutionInsight ? 'roadmap-badge' : 'text-text-primary'}`}>
                    {insight.title}
                  </h4>

                  <p className="text-text-secondary text-sm mb-2">
                    {insight.description}
                  </p>

                  <p className="text-text-muted text-xs">{insight.detail}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
