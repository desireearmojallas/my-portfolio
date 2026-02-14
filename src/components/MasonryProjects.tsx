import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import ProjectCardApple, { type Project } from './ProjectCardApple';

interface MasonryProjectsProps {
  projects: Project[];
  onProjectClick?: (project: Project) => void;
}

export default function MasonryProjects({ projects, onProjectClick }: MasonryProjectsProps) {
  const [columns, setColumns] = useState(3);
  const containerRef = useRef<HTMLDivElement>(null);

  // Responsive column calculation
  useEffect(() => {
    const updateColumns = () => {
      const width = window.innerWidth;
      // Limit to 1–2 columns so cards stay wide and visuals feel prominent
      if (width < 768) setColumns(1);
      else setColumns(2);
    };

    updateColumns();
    window.addEventListener('resize', updateColumns);
    return () => window.removeEventListener('resize', updateColumns);
  }, []);

  // Assign dynamic sizes for visual variety (Apple-style)
  const getProjectsWithSizes = (projects: Project[]) => {
    return projects.map((project, index) => {
      // Create an interesting pattern of sizes
      let size: 'small' | 'medium' | 'large' = 'medium';
      
      if (index % 7 === 0) size = 'large';
      else if (index % 5 === 0) size = 'small';
      else if (index % 3 === 0) size = 'medium';
      
      return { ...project, size };
    });
  };

  const projectsWithSizes = getProjectsWithSizes(projects);

  // Distribute projects across columns for masonry effect
  const distributeProjects = () => {
    const columnArrays: Project[][] = Array.from({ length: columns }, () => []);
    
    projectsWithSizes.forEach((project) => {
      // Find column with least total height (approximate)
      const columnHeights = columnArrays.map(col => 
        col.reduce((height, p) => {
          if (p.size === 'large') return height + 380;
          if (p.size === 'medium') return height + 320;
          return height + 280;
        }, 0)
      );
      
      const shortestColumnIndex = columnHeights.indexOf(Math.min(...columnHeights));
      columnArrays[shortestColumnIndex].push(project);
    });
    
    return columnArrays;
  };

  const distributedProjects = distributeProjects();

  return (
    <div className="w-full overflow-hidden">
      {/* Hero project showcase - first featured project */}
      {projects.find(p => p.featured) && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <ProjectCardApple
            project={projects.find(p => p.featured)!}
            index={0}
            onClick={onProjectClick}
            layout="hero"
          />
        </motion.div>
      )}

      {projects.find(p => p.featured) && (
        <div className="mb-12">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-200/80 to-transparent" />
        </div>
      )}

      {/* Masonry grid - Fixed layout */}
      <div 
        ref={containerRef}
        className={`grid gap-8 ${
          columns === 1 ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'
        }`}
      >
        {distributedProjects.map((column, columnIndex) => (
          <div key={columnIndex} className="flex flex-col gap-6 w-full">
            {column.map((project, projectIndex) => {
              const globalIndex = columnIndex * Math.ceil(projects.length / columns) + projectIndex;
              return (
                <motion.div 
                  key={project.id} 
                  className="w-full"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: projectIndex * 0.1 }}
                  viewport={{ once: true }}
                >
                  <ProjectCardApple
                    project={project}
                    index={globalIndex}
                    onClick={onProjectClick}
                    layout="masonry"
                  />
                </motion.div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Apple-style load more indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        viewport={{ once: true }}
        className="flex justify-center mt-16"
      >
        <div className="px-8 py-3 bg-gray-100/80 backdrop-blur-sm rounded-full 
                      text-sm font-medium text-gray-600 border border-gray-200/50">
          Showing {projects.length} projects
        </div>
      </motion.div>
    </div>
  );
}