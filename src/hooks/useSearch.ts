import { useState, useMemo } from 'react';
import { projects } from '../data/projects';

export function useSearch(query: string) {
  const results = useMemo(() => {
    if (!query.trim()) return projects;

    const lowerQuery = query.toLowerCase();

    return projects.filter((project) => {
      const searchableText = [
        project.name,
        project.tagline,
        project.description,
        ...project.tags,
        ...project.poweredBy,
        project.category,
      ]
        .join(' ')
        .toLowerCase();

      return searchableText.includes(lowerQuery);
    });
  }, [query]);

  return results;
}

export function useSearchState() {
  const [searchQuery, setSearchQuery] = useState('');

  return {
    searchQuery,
    setSearchQuery,
  };
}
