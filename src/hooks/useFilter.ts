import { useState, useEffect } from 'react';
import type { Category } from '../data/categories';

const STORAGE_KEY = 'ralph-dashboard-filter';

export function useFilter() {
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY);
      return (saved as Category | 'All') || 'All';
    }
    return 'All';
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, selectedCategory);
  }, [selectedCategory]);

  return {
    selectedCategory,
    setSelectedCategory,
  };
}
