import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import * as d3 from 'd3';
import { getNetworkData, type RelationshipNode, type RelationshipLink } from '../data/relationships';
import { categoryColors } from '../data/categories';

type NetworkTimeFilter = '2025' | '2026' | 'all';

interface NetworkGraphProps {
  onProjectSelect?: (projectId: string) => void;
  timeFilter: NetworkTimeFilter;
}

export function NetworkGraph({ onProjectSelect, timeFilter }: NetworkGraphProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 500 });

  const is2026 = timeFilter === '2026' || timeFilter === 'all';

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { width } = containerRef.current.getBoundingClientRect();
        setDimensions({ width: Math.max(600, width), height: 500 });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    if (!svgRef.current) return;

    const { nodes, links } = getNetworkData(timeFilter);
    const { width, height } = dimensions;

    // Clear previous
    d3.select(svgRef.current).selectAll('*').remove();

    const svg = d3.select(svgRef.current);

    // Create defs for gradients
    const defs = svg.append('defs');

    // Gradient for links
    const linkGradient = defs
      .append('linearGradient')
      .attr('id', 'linkGradient')
      .attr('gradientUnits', 'userSpaceOnUse');

    linkGradient
      .append('stop')
      .attr('offset', '0%')
      .attr('stop-color', '#E91E8C')
      .attr('stop-opacity', 0.6);

    linkGradient
      .append('stop')
      .attr('offset', '100%')
      .attr('stop-color', '#00CED1')
      .attr('stop-opacity', 0.6);

    // Create container group
    const g = svg.append('g');

    // Zoom behavior
    const zoom = d3
      .zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.5, 2])
      .on('zoom', (event) => {
        g.attr('transform', event.transform);
      });

    svg.call(zoom);

    // Quarter positions for x-axis layout
    const quarterPositions: Record<string, number> = {
      Q1: width * 0.15,
      Q2: width * 0.38,
      Q3: width * 0.62,
      Q4: width * 0.85,
    };

    // Simulation
    const simulation = d3
      .forceSimulation<RelationshipNode>(nodes)
      .force(
        'link',
        d3
          .forceLink<RelationshipNode, RelationshipLink>(links)
          .id((d) => d.id)
          .distance(100)
      )
      .force('charge', d3.forceManyBody().strength(-300))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force(
        'x',
        d3
          .forceX<RelationshipNode>()
          .x((d) => {
            // Roadmap projects go to the far right
            if (d.isRoadmap) return width * 0.92;
            return quarterPositions[d.quarter] || width / 2;
          })
          .strength(0.3)
      )
      .force('y', d3.forceY(height / 2).strength(0.1))
      .force('collision', d3.forceCollide().radius(50));

    // Links
    const link = g
      .append('g')
      .attr('class', 'links')
      .selectAll('line')
      .data(links)
      .enter()
      .append('line')
      .attr('stroke', 'url(#linkGradient)')
      .attr('stroke-width', 2)
      .attr('stroke-dasharray', (d) => {
        if (d.isRoadmapLink) return '4,4';
        return d.type === 'buildsOn' ? '5,5' : '0';
      })
      .attr('opacity', (d) => (d.isRoadmapLink ? 0.3 : 0.4));

    // Node groups
    const nodeGroup = g
      .append('g')
      .attr('class', 'nodes')
      .selectAll('g')
      .data(nodes)
      .enter()
      .append('g')
      .attr('cursor', 'pointer')
      .call(
        d3
          .drag<SVGGElement, RelationshipNode>()
          .on('start', (event, d) => {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
          })
          .on('drag', (event, d) => {
            d.fx = event.x;
            d.fy = event.y;
          })
          .on('end', (event, d) => {
            if (!event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
          })
      );

    // Node circles
    nodeGroup
      .append('circle')
      .attr('r', 20)
      .attr('fill', (d) => {
        const colors = categoryColors[d.category as keyof typeof categoryColors];
        return colors?.primary || '#888888';
      })
      .attr('stroke', (d) => (d.isRoadmap ? '#E91E8C' : '#0a0a0f'))
      .attr('stroke-width', (d) => (d.isRoadmap ? 3 : 2))
      .attr('stroke-dasharray', (d) => (d.isRoadmap ? '4,4' : '0'))
      .attr('opacity', (d) => (d.isRoadmap ? 0.7 : 0.9));

    // Node labels
    nodeGroup
      .append('text')
      .text((d) => d.name.split(' ')[0])
      .attr('text-anchor', 'middle')
      .attr('dy', 35)
      .attr('fill', (d) => (d.isRoadmap ? '#E91E8C' : '#888888'))
      .attr('font-size', '10px')
      .attr('font-family', 'Inter, sans-serif')
      .attr('opacity', (d) => (d.isRoadmap ? 0.8 : 1));

    // Hover effects
    nodeGroup
      .on('mouseenter', function (_event, d) {
        setHoveredNode(d.id);

        // Highlight connected nodes and links
        const connectedIds = new Set<string>();
        links.forEach((l) => {
          const sourceId = typeof l.source === 'object' ? l.source.id : l.source;
          const targetId = typeof l.target === 'object' ? l.target.id : l.target;
          if (sourceId === d.id) connectedIds.add(targetId);
          if (targetId === d.id) connectedIds.add(sourceId);
        });

        nodeGroup.attr('opacity', (n) =>
          n.id === d.id || connectedIds.has(n.id) ? 1 : 0.3
        );

        link.attr('opacity', (l) => {
          const sourceId = typeof l.source === 'object' ? l.source.id : l.source;
          const targetId = typeof l.target === 'object' ? l.target.id : l.target;
          return sourceId === d.id || targetId === d.id ? 0.8 : 0.1;
        });

        d3.select(this).select('circle').attr('r', 25).attr('stroke', '#ffffff');
      })
      .on('mouseleave', function (_event, d) {
        setHoveredNode(null);
        nodeGroup.attr('opacity', (n) => (n.isRoadmap ? 0.7 : 1));
        link.attr('opacity', (l) => (l.isRoadmapLink ? 0.3 : 0.4));
        d3.select(this)
          .select('circle')
          .attr('r', 20)
          .attr('stroke', d.isRoadmap ? '#E91E8C' : '#0a0a0f');
      })
      .on('click', (_event, d) => {
        onProjectSelect?.(d.id);
      });

    // Update positions on tick
    simulation.on('tick', () => {
      link
        .attr('x1', (d) => (d.source as RelationshipNode).x!)
        .attr('y1', (d) => (d.source as RelationshipNode).y!)
        .attr('x2', (d) => (d.target as RelationshipNode).x!)
        .attr('y2', (d) => (d.target as RelationshipNode).y!);

      nodeGroup.attr('transform', (d) => `translate(${d.x},${d.y})`);
    });

    // Quarter labels
    const quarterLabels = svg.append('g').attr('class', 'quarter-labels');

    Object.entries(quarterPositions).forEach(([quarter, x]) => {
      quarterLabels
        .append('text')
        .attr('x', x)
        .attr('y', 30)
        .attr('text-anchor', 'middle')
        .attr('fill', '#555555')
        .attr('font-size', '12px')
        .attr('font-weight', '500')
        .text(quarter + ' 2025');
    });

    // Add 2026 label if showing roadmap
    if (is2026) {
      quarterLabels
        .append('text')
        .attr('x', width * 0.92)
        .attr('y', 30)
        .attr('text-anchor', 'middle')
        .attr('fill', '#E91E8C')
        .attr('font-size', '12px')
        .attr('font-weight', '500')
        .text('2026 Roadmap');
    }

    return () => {
      simulation.stop();
    };
  }, [dimensions, onProjectSelect, timeFilter]);

  const hoveredProject = hoveredNode
    ? getNetworkData(timeFilter).nodes.find((n) => n.id === hoveredNode)
    : null;

  return (
    <div className="px-6 py-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-bg-card border border-border-default rounded-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="p-6 border-b border-border-default">
            <h3 className="text-xl font-semibold text-text-primary mb-2">
              Project Relationship Network
            </h3>
            <p className="text-text-secondary text-sm">
              Explore how projects connect, share capabilities, and build on each other.
              Drag nodes to rearrange. Click to view details.
            </p>
          </div>

          {/* Legend */}
          <div className="px-6 py-3 border-b border-border-default flex flex-wrap items-center gap-6 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-accent-pink" />
              <span className="text-text-secondary">Commercial Products</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-accent-cyan" />
              <span className="text-text-secondary">Intelligence</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-accent-yellow" />
              <span className="text-text-secondary">Infrastructure</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#9b59b6]" />
              <span className="text-text-secondary">Client Work</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#f39c12]" />
              <span className="text-text-secondary">Personal Innovation</span>
            </div>
            {is2026 && (
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full border-2 border-dashed border-accent-pink opacity-70" />
                <span className="text-accent-pink">2026 Roadmap</span>
              </div>
            )}
            <div className="flex items-center gap-4 ml-auto">
              <div className="flex items-center gap-2">
                <div className="w-6 h-0.5 bg-gradient-to-r from-accent-pink to-accent-cyan" />
                <span className="text-text-muted">Data flows</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-0.5 border-t-2 border-dashed border-text-muted" />
                <span className="text-text-muted">Builds on</span>
              </div>
            </div>
          </div>

          {/* Graph */}
          <div ref={containerRef} className="relative">
            <svg
              ref={svgRef}
              width={dimensions.width}
              height={dimensions.height}
              className="bg-bg-primary"
            />

            {/* Tooltip */}
            {hoveredProject && (
              <div className={`absolute top-4 right-4 bg-bg-card border rounded-lg p-3 shadow-lg max-w-xs ${
                hoveredProject.isRoadmap ? 'border-dashed border-accent-pink/50' : 'border-border-default'
              }`}>
                <p className="text-text-primary font-medium">{hoveredProject.name}</p>
                <p className={`text-xs ${hoveredProject.isRoadmap ? 'text-accent-pink' : 'text-text-muted'}`}>
                  {hoveredProject.category}
                </p>
                <p className="text-text-secondary text-xs mt-1">
                  Click to view full details
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
