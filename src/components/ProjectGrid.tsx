import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProjectCard } from './ProjectCard';
import { ExpandedCard } from './ExpandedCard';
import { projects, type Project } from '../data/projects';
import type { Category } from '../data/categories';

interface ProjectGridProps {
  selectedCategory: Category | 'All';
  searchQuery: string;
  viewMode: 'grid' | 'list';
}

export function ProjectGrid({
  selectedCategory,
  searchQuery,
  viewMode,
}: ProjectGridProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filteredProjects = useMemo(() => {
    let result = projects;

    // Filter by category
    if (selectedCategory !== 'All') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Filter by search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.tagline.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.tags.some((tag) => tag.toLowerCase().includes(query)) ||
          p.poweredBy.some((tech) => tech.toLowerCase().includes(query))
      );
    }

    // Sort: featured first, then 2025 projects before roadmap, then by quarter (newest first)
    return result.sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;

      // 2025 projects before roadmap
      const aIsRoadmap = a.isRoadmap || a.category === '2026 Roadmap';
      const bIsRoadmap = b.isRoadmap || b.category === '2026 Roadmap';
      if (!aIsRoadmap && bIsRoadmap) return -1;
      if (aIsRoadmap && !bIsRoadmap) return 1;

      const quarterOrder = { Q4: 0, Q3: 1, Q2: 2, Q1: 3 };
      return quarterOrder[a.quarter] - quarterOrder[b.quarter];
    });
  }, [selectedCategory, searchQuery]);

  const expandedProject = expandedId
    ? projects.find((p) => p.id === expandedId)
    : null;

  const handleCardClick = (project: Project) => {
    setExpandedId(expandedId === project.id ? null : project.id);
  };

  const handleClose = () => {
    setExpandedId(null);
  };

  // Count 2025 and roadmap projects
  const count2025 = filteredProjects.filter((p) => !p.isRoadmap && p.category !== '2026 Roadmap').length;
  const countRoadmap = filteredProjects.filter((p) => p.isRoadmap || p.category === '2026 Roadmap').length;

  if (filteredProjects.length === 0) {
    return (
      <div className="px-6 py-16 text-center">
        <p className="text-text-secondary text-lg">
          No projects found matching your criteria.
        </p>
        <p className="text-text-muted text-sm mt-2">
          Try adjusting your filters or search query.
        </p>
      </div>
    );
  }

  return (
    <div className="px-6 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Results count */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-text-muted text-sm mb-6"
        >
          Showing {filteredProjects.length} project
          {filteredProjects.length !== 1 ? 's' : ''}
          {selectedCategory !== 'All' && ` in ${selectedCategory}`}
          {searchQuery && ` matching "${searchQuery}"`}
          {countRoadmap > 0 && count2025 > 0 && (
            <span className="ml-2 text-text-secondary">
              ({count2025} built, {countRoadmap} roadmap)
            </span>
          )}
        </motion.p>

        {/* Grid / List */}
        <div
          className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
              : 'flex flex-col gap-3'
          }
        >
          <AnimatePresence mode="sync">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onClick={() => handleCardClick(project)}
                isExpanded={expandedId === project.id}
                viewMode={viewMode}
              />
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Expanded Modal */}
      <AnimatePresence>
        {expandedProject && (
          <ExpandedCard project={expandedProject} onClose={handleClose} />
        )}
      </AnimatePresence>
    </div>
  );
}
