import { useState } from 'react';
import { Search, LayoutGrid, List, X, ChevronDown, ChevronUp, Filter } from 'lucide-react';
import { allCategories, type Category } from '../data/categories';

interface FilterBarProps {
  selectedCategory: Category | 'All';
  onCategoryChange: (category: Category | 'All') => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
  isExpanded: boolean;
  onExpandedChange: (expanded: boolean) => void;
}

export function FilterBar({
  selectedCategory,
  onCategoryChange,
  searchQuery,
  onSearchChange,
  viewMode,
  onViewModeChange,
  isExpanded,
  onExpandedChange,
}: FilterBarProps) {
  const [isFocused, setIsFocused] = useState(false);

  const filters: (Category | 'All')[] = ['All', ...allCategories];

  return (
    <div className="px-6 py-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Header with Toggle */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-text-primary">
            Project Catalog
          </h2>
          <button
            onClick={() => onExpandedChange(!isExpanded)}
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

        {/* Collapsed State - show active filters */}
        {!isExpanded ? (
          <div className="flex items-center gap-3 text-text-secondary">
            <Filter className="w-4 h-4" />
            <span className="text-sm">Filters:</span>
            {selectedCategory !== 'All' && (
              <span className="text-xs px-2 py-0.5 rounded bg-accent-cyan/20 text-accent-cyan">
                {selectedCategory}
              </span>
            )}
            {searchQuery && (
              <span className="text-xs px-2 py-0.5 rounded bg-accent-pink/20 text-accent-pink">
                "{searchQuery}"
              </span>
            )}
            {selectedCategory === 'All' && !searchQuery && (
              <span className="text-xs text-text-muted">None active</span>
            )}
          </div>
        ) : (
          <>

            {/* Search and View Toggle Row */}
            <div className="flex flex-wrap items-center gap-4 mb-4">
          {/* Search Input */}
          <div className="relative flex-1 min-w-[200px] max-w-md">
            <Search
              className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${
                isFocused ? 'text-accent-cyan' : 'text-text-muted'
              }`}
            />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className="w-full pl-10 pr-10 py-2 bg-bg-card border border-border-default rounded-lg text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-cyan transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* View Toggle */}
          <div className="flex items-center bg-bg-card border border-border-default rounded-lg p-1">
            <button
              onClick={() => onViewModeChange('grid')}
              className={`p-2 rounded transition-colors ${
                viewMode === 'grid'
                  ? 'bg-accent-cyan/20 text-accent-cyan'
                  : 'text-text-muted hover:text-text-primary'
              }`}
              aria-label="Grid view"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => onViewModeChange('list')}
              className={`p-2 rounded transition-colors ${
                viewMode === 'list'
                  ? 'bg-accent-cyan/20 text-accent-cyan'
                  : 'text-text-muted hover:text-text-primary'
              }`}
              aria-label="List view"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => {
            const isActive = selectedCategory === filter;
            const isRoadmap = filter === '2026 Roadmap';

            return (
              <button
                key={filter}
                onClick={() => onCategoryChange(filter)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? isRoadmap
                      ? 'bg-gradient-to-r from-accent-pink/30 to-accent-cyan/30 text-text-primary border border-dashed border-accent-pink/50'
                      : 'bg-gradient-to-r from-accent-pink/20 to-accent-cyan/20 text-text-primary border border-accent-pink/30'
                    : isRoadmap
                    ? 'text-text-secondary hover:text-text-primary border border-dashed border-accent-pink/40'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                <span className={isRoadmap ? 'roadmap-badge' : ''}>
                  {filter}
                </span>
              </button>
            );
          })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
