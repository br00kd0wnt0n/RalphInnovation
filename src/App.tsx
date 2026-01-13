import { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { FilterBar } from './components/FilterBar';
import { StatsPanel } from './components/StatsPanel';
import { ProjectGrid } from './components/ProjectGrid';
import { InsightsPanel } from './components/InsightsPanel';
import { VisualizationTabs } from './components/VisualizationTabs';
import { VisionModule } from './components/VisionModule';
import { ExpandedCard } from './components/ExpandedCard';
import { ScreengrabMosaic } from './components/ScreengrabMosaic';
import { BiggerPicture } from './components/BiggerPicture';
import { InsightsNarrative } from './components/InsightsNarrative';
import { useFilter } from './hooks/useFilter';
import { useSearchState } from './hooks/useSearch';
import { projects } from './data/projects';

function App() {
  const { selectedCategory, setSelectedCategory } = useFilter();
  const { searchQuery, setSearchQuery } = useSearchState();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [isFilterExpanded, setIsFilterExpanded] = useState(true);

  const handleProjectSelect = useCallback((projectId: string) => {
    setSelectedProjectId(projectId);
  }, []);

  const handleCloseExpanded = useCallback(() => {
    setSelectedProjectId(null);
  }, []);

  const selectedProject = selectedProjectId
    ? projects.find((p) => p.id === selectedProjectId)
    : null;

  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Header */}
      <Header />

      {/* Screengrab Mosaic */}
      <ScreengrabMosaic />

      {/* Stats */}
      <StatsPanel />

      {/* Key Insights */}
      <InsightsPanel />

      {/* Visualizations */}
      <VisualizationTabs onProjectSelect={handleProjectSelect} />

      {/* Filter Bar */}
      <FilterBar
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        isExpanded={isFilterExpanded}
        onExpandedChange={setIsFilterExpanded}
      />

      {/* Project Grid - only show when filter section is expanded */}
      {isFilterExpanded && (
        <ProjectGrid
          selectedCategory={selectedCategory}
          searchQuery={searchQuery}
          viewMode={viewMode}
        />
      )}

      {/* 2026 Vision Module */}
      <VisionModule />

      {/* Ralph Insights Narrative */}
      <InsightsNarrative />

      {/* Bigger Picture */}
      <BiggerPicture />

      {/* Footer */}
      <Footer />

      {/* Expanded Project Modal (from visualization clicks) */}
      {selectedProject && (
        <ExpandedCard project={selectedProject} onClose={handleCloseExpanded} />
      )}
    </div>
  );
}

export default App;
