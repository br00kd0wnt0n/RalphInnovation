import { motion } from 'framer-motion';
import { Lightbulb, Database, Cpu, Users, ArrowRight } from 'lucide-react';

export function InsightsNarrative() {
  const pillars = [
    {
      icon: Database,
      title: 'Proprietary Data',
      description: 'Our own trend signals, creator relationships, and audience intelligence  - not rented from third parties.',
    },
    {
      icon: Cpu,
      title: 'AI-Powered Analysis',
      description: 'Machine learning that turns raw data into strategic recommendations and creative opportunities.',
    },
    {
      icon: Users,
      title: 'Human Expertise',
      description: 'Technology amplifies our people  - strategists, creatives, and producers who know entertainment.',
    },
  ];

  return (
    <section className="py-16 px-6 bg-bg-card border-y border-border-default">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent-cyan/10 rounded-full mb-6">
            <Lightbulb className="w-4 h-4 text-accent-cyan" />
            <span className="text-sm font-medium text-accent-cyan">Introducing</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
            Ralph <span className="text-accent-cyan">Insights</span>
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            A new capability layer for the entertainment industry
          </p>
        </motion.div>

        {/* Main Narrative - Deck-Ready Copy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="space-y-6 mb-12"
        >
          <p className="text-text-primary text-lg leading-relaxed">
            Over the past year, Ralph's Innovation practice has built something unique:
            <span className="text-accent-pink font-medium"> a connected ecosystem of intelligence tools</span> designed
            specifically for entertainment marketing. These aren't off-the-shelf solutions  - they're
            proprietary systems that give our teams (and our clients) capabilities no one else has.
          </p>

          <p className="text-text-secondary leading-relaxed">
            We track emerging trends before they peak. We maintain relationships with hundreds of
            creators in a searchable, intelligent database. We forecast campaign outcomes using
            real audience data. We generate strategic narratives powered by AI trained on our
            best thinking. And we stream content 24/7 through infrastructure we built from scratch.
          </p>

          <p className="text-text-secondary leading-relaxed">
            Together, these tools form <span className="text-text-primary font-medium">Ralph Insights</span>  -
            a new department that sits at the intersection of data science, artificial intelligence,
            and entertainment strategy. It's how we're evolving from a creative agency into something more:
            <span className="text-accent-cyan font-medium"> a company that doesn't just make content, but understands
            why content works.</span>
          </p>
        </motion.div>

        {/* Three Pillars */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="grid md:grid-cols-3 gap-6 mb-12"
        >
          {pillars.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="p-6 bg-bg-primary rounded-xl border border-border-default"
            >
              <div className="w-10 h-10 rounded-lg bg-accent-pink/10 flex items-center justify-center mb-4">
                <Icon className="w-5 h-5 text-accent-pink" />
              </div>
              <h3 className="text-lg font-semibold text-text-primary mb-2">{title}</h3>
              <p className="text-sm text-text-secondary leading-relaxed">{description}</p>
            </div>
          ))}
        </motion.div>

        {/* The Value Proposition */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="p-8 bg-gradient-to-br from-accent-pink/5 to-accent-cyan/5 rounded-2xl border border-border-default"
        >
          <h3 className="text-xl font-semibold text-text-primary mb-4 flex items-center gap-2">
            <ArrowRight className="w-5 h-5 text-accent-pink" />
            What This Means for Clients
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="text-text-secondary leading-relaxed mb-4">
                <span className="text-text-primary font-medium">Faster, smarter briefs.</span> Our
                AI-powered tools can analyze a brief and generate strategic territory in hours,
                not weeks  - with live trend data and creator recommendations built in.
              </p>
              <p className="text-text-secondary leading-relaxed">
                <span className="text-text-primary font-medium">Forecasting that matters.</span> Before
                you commit budget, we can model different scenarios and show projected outcomes
                based on real audience behavior.
              </p>
            </div>
            <div>
              <p className="text-text-secondary leading-relaxed mb-4">
                <span className="text-text-primary font-medium">Exclusive relationships.</span> Our
                creator database isn't just names  - it's vetted relationships with collaboration
                history, audience insights, and AI-powered matching to your brand.
              </p>
              <p className="text-text-secondary leading-relaxed">
                <span className="text-text-primary font-medium">Always-on infrastructure.</span> From
                24/7 streaming channels to interactive experiences, we build the platforms that
                keep your brand present, not just visible.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Closing Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-12 pt-8 border-t border-border-default"
        >
          <p className="text-lg text-text-primary italic max-w-2xl mx-auto">
            "Innovation isn't a side project at Ralph  - it's becoming the foundation
            of how we work."
          </p>
        </motion.div>
      </div>
    </section>
  );
}
