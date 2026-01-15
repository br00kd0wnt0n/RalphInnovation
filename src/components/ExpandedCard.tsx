import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ExternalLink,
  Github,
  Calendar,
  Zap,
  Target,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import type { Project } from '../data/projects';
import { categoryColors, capabilityLabels, themeLabels } from '../data/categories';
import { getProjectConnections } from '../data/relationships';

interface ExpandedCardProps {
  project: Project;
  onClose: () => void;
  allProjects?: Project[];
  onNavigate?: (projectId: string) => void;
}

export function ExpandedCard({ project, onClose, allProjects = [], onNavigate }: ExpandedCardProps) {
  // Navigation
  const currentIndex = allProjects.findIndex(p => p.id === project.id);
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < allProjects.length - 1;

  const goToPrev = () => {
    if (hasPrev && onNavigate) {
      onNavigate(allProjects[currentIndex - 1].id);
    }
  };

  const goToNext = () => {
    if (hasNext && onNavigate) {
      onNavigate(allProjects[currentIndex + 1].id);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goToPrev();
      if (e.key === 'ArrowRight') goToNext();
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, allProjects.length]);
  const categoryColor = categoryColors[project.category];
  const connections = getProjectConnections(project.id);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Reset slide when project changes
  useEffect(() => {
    setCurrentSlide(0);
  }, [project.id]);

  // Get images grouped into pairs for the carousel
  const images = project.images || [];
  const isVideo = (src: string) => src.endsWith('.mp4') || src.endsWith('.mov') || src.endsWith('.webm');

  // Group images into slides of 2 (or 1 if odd number at end)
  const slides: string[][] = [];
  for (let i = 0; i < images.length; i += 2) {
    slides.push(images.slice(i, i + 2));
  }

  // Auto-advance carousel
  useEffect(() => {
    if (slides.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
        onClick={onClose}
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-bg-primary/90 backdrop-blur-sm"
        />

        {/* Navigation Chevrons */}
        {allProjects && allProjects.length > 0 && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); goToPrev(); }}
              disabled={!hasPrev}
              className={`fixed left-4 md:left-8 top-1/2 -translate-y-1/2 z-[60] p-3 rounded-full bg-bg-card border border-border-default shadow-lg transition-all ${
                hasPrev
                  ? 'text-text-primary hover:bg-bg-card-hover hover:border-accent-pink cursor-pointer'
                  : 'text-text-muted/30 cursor-not-allowed'
              }`}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); goToNext(); }}
              disabled={!hasNext}
              className={`fixed right-4 md:right-8 top-1/2 -translate-y-1/2 z-[60] p-3 rounded-full bg-bg-card border border-border-default shadow-lg transition-all ${
                hasNext
                  ? 'text-text-primary hover:bg-bg-card-hover hover:border-accent-pink cursor-pointer'
                  : 'text-text-muted/30 cursor-not-allowed'
              }`}
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', bounce: 0.2 }}
          className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-bg-card border border-border-default rounded-2xl shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Gradient accent line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent-pink via-accent-cyan to-accent-pink rounded-t-2xl" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-text-muted hover:text-text-primary hover:bg-bg-card-hover rounded-lg transition-colors z-10"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="p-8">
            {/* Header */}
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-2">
                <span
                  className="text-xs uppercase tracking-wider font-medium px-2 py-1 rounded"
                  style={{
                    color: categoryColor.primary,
                    backgroundColor: `${categoryColor.primary}20`,
                  }}
                >
                  {project.category}
                </span>
                <span className="text-xs text-text-muted flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {project.quarter} {project.startDate?.startsWith('2026') ? '2026' : '2025'}
                </span>
              </div>

              <h2 className="text-3xl font-bold text-text-primary mb-2">
                <span className="italic">{project.name}</span>
              </h2>
              <p className="text-lg text-accent-cyan">{project.tagline}</p>
            </div>

            {/* Description */}
            <p className="text-text-secondary mb-6">{project.description}</p>

            {/* Images Carousel */}
            {slides.length > 0 && (
              <div className="mb-8 relative">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`grid gap-4 ${slides[currentSlide].length === 1 ? 'grid-cols-1' : 'grid-cols-2'}`}
                  >
                    {slides[currentSlide].map((src, idx) => (
                      isVideo(src) ? (
                        <video
                          key={idx}
                          src={src}
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="w-full rounded-xl border border-border-default"
                        />
                      ) : (
                        <img
                          key={idx}
                          src={src}
                          alt={`${project.name} screenshot`}
                          className="w-full rounded-xl border border-border-default"
                        />
                      )
                    ))}
                  </motion.div>
                </AnimatePresence>

                {/* Slide indicators */}
                {slides.length > 1 && (
                  <div className="flex justify-center gap-2 mt-4">
                    {slides.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentSlide(idx)}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          idx === currentSlide
                            ? 'bg-accent-cyan'
                            : 'bg-border-default hover:bg-text-muted'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Action buttons */}
            <div className="flex flex-wrap gap-3 mb-8">
              {project.liveUrl && project.liveUrl !== '#' && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-accent-pink to-accent-cyan text-white font-medium rounded-lg hover:opacity-90 transition-opacity"
                >
                  <ExternalLink className="w-4 h-4" />
                  View Live
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-bg-card-hover text-text-primary font-medium rounded-lg border border-border-default hover:border-text-muted transition-colors"
                >
                  <Github className="w-4 h-4" />
                  View Code
                </a>
              )}
            </div>

            {/* Tags & Tech */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div>
                <h4 className="text-sm font-medium text-text-muted uppercase tracking-wider mb-3">
                  Tags
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-sm bg-bg-card-hover text-text-secondary rounded-lg border border-border-default"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-text-muted uppercase tracking-wider mb-3">
                  Powered By
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.poweredBy.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-sm bg-accent-cyan/10 text-accent-cyan rounded-lg"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Capabilities & Themes */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div>
                <h4 className="text-sm font-medium text-text-muted uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-accent-yellow" />
                  Capabilities
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.capabilities.map((cap) => (
                    <span
                      key={cap}
                      className="px-3 py-1 text-sm bg-accent-yellow/10 text-accent-yellow rounded-lg"
                    >
                      {capabilityLabels[cap]}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-text-muted uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Target className="w-4 h-4 text-accent-pink" />
                  Strategic Themes
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.themes.map((theme) => (
                    <span
                      key={theme}
                      className="px-3 py-1 text-sm bg-accent-pink/10 text-accent-pink rounded-lg"
                    >
                      {themeLabels[theme]}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Connections */}
            {(connections.incoming.length > 0 || connections.outgoing.length > 0) && (
              <div className="mb-8 p-4 bg-bg-card-hover rounded-xl border border-border-default">
                <h4 className="text-sm font-medium text-text-muted uppercase tracking-wider mb-3">
                  Project Connections
                </h4>
                <div className="flex flex-wrap items-center gap-2">
                  {connections.incoming.length > 0 && (
                    <>
                      <span className="text-text-secondary text-sm">Built on:</span>
                      {connections.incoming.map((p) => (
                        <span
                          key={p.id}
                          className="px-2 py-1 text-xs bg-bg-card text-text-primary rounded border border-border-default"
                        >
                          {p.name}
                        </span>
                      ))}
                    </>
                  )}
                  {connections.incoming.length > 0 && connections.outgoing.length > 0 && (
                    <ArrowRight className="w-4 h-4 text-text-muted mx-2" />
                  )}
                  {connections.outgoing.length > 0 && (
                    <>
                      <span className="text-text-secondary text-sm">Powers:</span>
                      {connections.outgoing.map((p) => (
                        <span
                          key={p.id}
                          className="px-2 py-1 text-xs bg-bg-card text-text-primary rounded border border-border-default"
                        >
                          {p.name}
                        </span>
                      ))}
                    </>
                  )}
                </div>
              </div>
            )}

            {/* 2025 Recap & 2026 Vision */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 bg-bg-card-hover rounded-xl border border-border-default">
                <h4 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-lg bg-accent-cyan/20 flex items-center justify-center text-accent-cyan text-sm font-bold">
                    '25
                  </span>
                  2025 Recap
                </h4>
                <div className="text-sm text-text-secondary whitespace-pre-line leading-relaxed">
                  {project.recap2025}
                </div>
              </div>

              <div className="p-6 bg-bg-card-hover rounded-xl border border-border-default">
                <h4 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-lg bg-accent-pink/20 flex items-center justify-center text-accent-pink text-sm font-bold">
                    '26
                  </span>
                  2026 Vision
                </h4>
                <div className="text-sm text-text-secondary whitespace-pre-line leading-relaxed">
                  {project.vision2026}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
