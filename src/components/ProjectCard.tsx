import { motion } from 'framer-motion';
import { ExternalLink, ChevronDown, Star, Github } from 'lucide-react';
import type { Project } from '../data/projects';
import { statusColors, categoryColors } from '../data/categories';

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
  isExpanded: boolean;
  viewMode: 'grid' | 'list';
}

export function ProjectCard({
  project,
  onClick,
  isExpanded,
  viewMode,
}: ProjectCardProps) {
  const categoryColor = categoryColors[project.category];

  if (viewMode === 'list') {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.15 }}
        className="gradient-border card-glow cursor-pointer"
        onClick={onClick}
      >
        <div className="relative p-4 bg-bg-card rounded-xl">
          <div className="flex items-center gap-4">
            {/* Category & Status */}
            <div className="flex items-center gap-2 min-w-[200px]">
              <span
                className="text-xs uppercase tracking-wider font-medium"
                style={{ color: categoryColor.primary }}
              >
                {project.category}
              </span>
              <span
                className={`px-2 py-0.5 text-xs font-medium rounded-full text-white ${
                  statusColors[project.status]
                }`}
              >
                {project.status}
              </span>
              {project.featured && (
                <Star className="w-4 h-4 text-accent-yellow fill-accent-yellow" />
              )}
            </div>

            {/* Name & Tagline */}
            <div className="flex-1">
              <h3 className="text-text-primary font-medium">
                <span className="italic">{project.name}</span>
                <span className="text-text-muted mx-2">—</span>
                <span className="text-text-secondary font-normal">
                  {project.tagline}
                </span>
              </h3>
            </div>

            {/* Tags */}
            <div className="hidden lg:flex items-center gap-2">
              {project.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 text-xs bg-bg-card-hover text-text-secondary rounded"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Expand Icon */}
            <ChevronDown
              className={`w-5 h-5 text-text-muted transition-transform ${
                isExpanded ? 'rotate-180' : ''
              }`}
            />
          </div>
        </div>
      </motion.div>
    );
  }

  const isRoadmap = project.isRoadmap || project.category === '2026 Roadmap';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      className={`gradient-border card-glow cursor-pointer ${
        project.featured ? 'md:col-span-2' : ''
      } ${isRoadmap ? 'roadmap-card' : ''}`}
      onClick={onClick}
    >
      <div className="relative p-6 bg-bg-card rounded-xl h-full flex flex-col">
        {/* Featured Badge */}
        {project.featured && (
          <div className="absolute -top-3 -right-3 bg-gradient-to-r from-accent-pink to-accent-cyan px-3 py-1 rounded-full text-xs font-medium text-white shadow-lg">
            <span className="flex items-center gap-1">
              <Star className="w-3 h-3 fill-white" />
              Featured
            </span>
          </div>
        )}

        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2">
            <span
              className="text-xs uppercase tracking-wider font-medium"
              style={{ color: categoryColor.primary }}
            >
              {project.category}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span
              className={`px-2 py-0.5 text-xs font-medium rounded-full text-white ${
                statusColors[project.status]
              }`}
            >
              {project.status}
            </span>

            {project.liveUrl && project.liveUrl !== '#' && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-text-muted hover:text-accent-cyan transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl font-semibold text-text-primary mb-1">
          <span className="italic">{project.name}</span>
        </h3>
        <p className="text-sm text-accent-cyan mb-3">{project.tagline}</p>

        {/* Description */}
        <p className="text-text-secondary text-sm mb-4 flex-1 line-clamp-3">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 text-xs bg-bg-card-hover text-text-secondary rounded border border-border-default"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-border-default">
          <div className="text-xs text-text-muted">
            Powered by{' '}
            <span className="text-text-secondary">
              {project.poweredBy.slice(0, 2).join(', ')}
              {project.poweredBy.length > 2 && '...'}
            </span>
          </div>

          <div className="flex items-center gap-2 text-text-muted">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="hover:text-text-primary transition-colors"
              >
                <Github className="w-4 h-4" />
              </a>
            )}
            <span className="text-xs flex items-center gap-1">
              Click to expand
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  isExpanded ? 'rotate-180' : ''
                }`}
              />
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
