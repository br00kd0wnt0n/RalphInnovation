import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export function Header() {
  return (
    <header className="relative py-16 px-6 text-center overflow-hidden">
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-accent-pink/5 via-transparent to-transparent pointer-events-none" />

      {/* Animated gradient orbs */}
      <motion.div
        className="absolute top-0 left-1/4 w-96 h-96 bg-accent-pink/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute top-0 right-1/4 w-96 h-96 bg-accent-cyan/10 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.5, 0.3, 0.5],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-2 mb-6"
        >
          <span className="text-xs uppercase tracking-[0.3em] text-accent-pink font-medium">
            Ralph
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex items-center justify-center gap-4 mb-4"
        >
          <Sparkles className="w-5 h-5 text-accent-pink" />
          <h1 className="text-5xl md:text-6xl font-bold">
            <span className="gradient-text">Innovation</span>
            <span className="text-text-primary"> 2025 - 2026</span>
          </h1>
          <Sparkles className="w-5 h-5 text-accent-cyan" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg text-text-secondary max-w-2xl mx-auto"
        >
          Tools, experiments, and infrastructure for Ralph's evolution
        </motion.p>
      </div>
    </header>
  );
}
