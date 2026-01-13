import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '../data/projects';

// Define the mosaic layout - optimized for desktop/landscape aspect ratio images
// Layout: 12-column grid, 2 rows
const mosaicLayout = [
  { id: 0, colSpan: 5, rowSpan: 2, colStart: 1, rowStart: 1 },   // Large wide rectangle left
  { id: 1, colSpan: 4, rowSpan: 1, colStart: 6, rowStart: 1 },   // Wide rectangle top-middle
  { id: 2, colSpan: 3, rowSpan: 1, colStart: 10, rowStart: 1 },  // Medium rectangle top-right
  { id: 3, colSpan: 3, rowSpan: 1, colStart: 6, rowStart: 2 },   // Medium rectangle bottom-middle
  { id: 4, colSpan: 4, rowSpan: 1, colStart: 9, rowStart: 2 },   // Wide rectangle bottom-right
];

export function ScreengrabMosaic() {
  // Collect all images from projects (excluding videos for the mosaic)
  const allImages = useMemo(() => {
    const images: { src: string; project: string }[] = [];
    projects.forEach((project) => {
      if (project.images) {
        project.images.forEach((img) => {
          // Only include images, not videos
          if (!img.endsWith('.mp4') && !img.endsWith('.mov') && !img.endsWith('.webm')) {
            images.push({ src: img, project: project.name });
          }
        });
      }
    });
    return images;
  }, []);

  // We need more indices for the duplicated grids (3 copies x 5 cells = 15)
  const [cellIndices, setCellIndices] = useState<number[]>([]);

  // Shuffle function to get random images
  const getShuffledIndices = (count: number) => {
    const indices: number[] = [];
    const available = [...Array(allImages.length).keys()];
    for (let i = 0; i < count && available.length > 0; i++) {
      const randomIdx = Math.floor(Math.random() * available.length);
      indices.push(available[randomIdx]);
      available.splice(randomIdx, 1);
      if (available.length === 0 && i < count - 1) {
        // Refill if we need more
        available.push(...[...Array(allImages.length).keys()]);
      }
    }
    return indices;
  };

  // Initialize with random images
  useEffect(() => {
    if (allImages.length >= 5) {
      setCellIndices(getShuffledIndices(15)); // 3 copies of 5 cells
    }
  }, [allImages.length]);

  // Cycle random cells
  useEffect(() => {
    if (allImages.length < 5 || cellIndices.length === 0) return;

    const timer = setInterval(() => {
      setCellIndices((prev) => {
        const newIndices = [...prev];
        const cellToUpdate = Math.floor(Math.random() * prev.length);
        let newImageIndex;
        let attempts = 0;
        do {
          newImageIndex = Math.floor(Math.random() * allImages.length);
          attempts++;
        } while (prev.includes(newImageIndex) && attempts < 20);
        newIndices[cellToUpdate] = newImageIndex;
        return newIndices;
      });
    }, 3000);

    return () => clearInterval(timer);
  }, [allImages.length, cellIndices.length]);

  if (allImages.length < 5 || cellIndices.length < 15) return null;

  const renderMosaicGrid = (offset: number) => (
    <div
      className="grid gap-2 flex-shrink-0"
      style={{
        gridTemplateColumns: 'repeat(12, 80px)',
        gridTemplateRows: 'repeat(2, 160px)',
        width: '984px', // 12 * 80px + 11 * 8px gaps
      }}
    >
      {mosaicLayout.map((cell) => {
        const imageIdx = cellIndices[offset + cell.id];
        return (
          <div
            key={`${offset}-${cell.id}`}
            className="relative overflow-hidden rounded-xl bg-bg-card border border-border-default"
            style={{
              gridColumn: `${cell.colStart} / span ${cell.colSpan}`,
              gridRow: `${cell.rowStart} / span ${cell.rowSpan}`,
            }}
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={imageIdx}
                src={allImages[imageIdx]?.src}
                alt={allImages[imageIdx]?.project}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0 w-full h-full object-cover object-top"
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/30 via-transparent to-transparent pointer-events-none" />
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="py-4 overflow-hidden">
      {/* Desktop: Scrolling mosaic */}
      <div className="hidden md:block">
        <div
          className="flex gap-4 animate-scroll-left"
          style={{
            width: 'fit-content',
          }}
        >
          {renderMosaicGrid(0)}
          {renderMosaicGrid(5)}
          {renderMosaicGrid(10)}
        </div>
      </div>

      {/* Mobile: Simple stacked view */}
      <div className="md:hidden px-6 flex flex-col gap-2">
        {cellIndices.slice(0, 3).map((imageIndex, idx) => (
          <div
            key={idx}
            className="relative overflow-hidden rounded-lg bg-bg-card border border-border-default"
            style={{ height: '120px' }}
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={imageIndex}
                src={allImages[imageIndex]?.src}
                alt={allImages[imageIndex]?.project}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0 w-full h-full object-cover object-top"
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/30 via-transparent to-transparent pointer-events-none" />
          </div>
        ))}
      </div>

      <style>{`
        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-988px)); /* One grid width + gap */
          }
        }
        .animate-scroll-left {
          animation: scroll-left 30s linear infinite;
        }
        .animate-scroll-left:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
