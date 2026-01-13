import { motion } from 'framer-motion';
import { Sparkles, Zap, TrendingUp, Brain, BarChart3, Megaphone } from 'lucide-react';

export function BiggerPicture() {
  const innovationCapabilities = [
    { icon: TrendingUp, label: 'Signals', description: 'Real-time trend intelligence across platforms' },
    { icon: Brain, label: 'AI', description: 'Intelligent automation and insight generation' },
    { icon: Zap, label: 'Automation', description: 'Streamlined workflows and processes' },
    { icon: BarChart3, label: 'Measurement', description: 'Data-driven forecasting and analytics' },
    { icon: Megaphone, label: 'Paid Media', description: 'Intelligence-backed amplification' },
  ];

  return (
    <section className="py-16 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
            <span className="italic text-accent-pink">'Our Bigger Picture'</span>
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Ralph is the Entertainment People. But there's more to the story than you might know.
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left: Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="relative"
          >
            <img
              src="/bigger-picture.png"
              alt="Ralph's Bigger Picture - What You Know and What You Might Not"
              className="w-full rounded-2xl border border-border-default shadow-lg"
            />
          </motion.div>

          {/* Right: Innovation Context */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            {/* What You Know */}
            <div className="p-6 bg-bg-card rounded-xl border border-border-default">
              <h3 className="text-lg font-semibold text-text-primary mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-text-muted" />
                What You Know
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                Strategy, Creative, Production, Communities, Influencers, Earned Media  -
                <span className="text-text-primary font-medium"> Making stuff people love & share.</span>
              </p>
            </div>

            {/* What You Might Not */}
            <div className="p-6 bg-gradient-to-br from-accent-pink/10 to-accent-cyan/10 rounded-xl border border-accent-pink/30">
              <h3 className="text-lg font-semibold text-text-primary mb-3 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-accent-pink" />
                What You Might Not
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed mb-4">
                This is where <span className="text-accent-cyan font-semibold">Innovation</span> lives  -
                powering the <span className="text-accent-pink font-medium">Intelligence, Amplification & Effectiveness</span> side of Ralph.
              </p>

              {/* Capability Pills */}
              <div className="flex flex-wrap gap-2">
                {innovationCapabilities.map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-bg-card rounded-lg border border-border-default"
                  >
                    <Icon className="w-3.5 h-3.5 text-accent-pink" />
                    <span className="text-sm text-text-primary">{label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* The Connection */}
            <div className="p-6 bg-bg-card-hover rounded-xl border border-border-default">
              <h3 className="text-lg font-semibold text-text-primary mb-3">
                Innovation Powers the Difference
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                Every project on this page  - from trend intelligence to AI-driven campaign tools to
                real-time streaming infrastructure  - expands what Ralph can do beyond traditional
                creative services. We're building the systems that turn data into decisions,
                signals into strategy, and ideas into measurable impact.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Bottom Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-12 pt-8 border-t border-border-default"
        >
          <p className="text-xl text-text-primary italic mb-2">
            'Your World is our World'
          </p>
          <p className="text-accent-pink font-semibold">
            Let's Talk About 2026
          </p>
        </motion.div>
      </div>
    </section>
  );
}
