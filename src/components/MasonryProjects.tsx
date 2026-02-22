import { motion } from 'framer-motion';
import { useMemo } from 'react';
import ProjectCardApple, { type Project } from './ProjectCardApple';

interface MasonryProjectsProps {
  projects: Project[];
  onProjectClick?: (project: Project) => void;
}

export default function MasonryProjects({ projects, onProjectClick }: MasonryProjectsProps) {
  // Build layout sequence: Mobile apps always go first as hero, then alternate pattern
  const patternedProjects = useMemo(() => {
    // Separate mobile apps (always hero) from other projects
    const mobileApps = projects.filter(p => p.category === 'Mobile Applications');
    const otherProjects = projects.filter(p => p.category !== 'Mobile Applications');
    
    const sequence: Array<{ project: Project; layout: 'hero' | 'masonry' }> = [];

    // Add mobile apps first as heroes
    mobileApps.forEach(app => {
      sequence.push({ project: app, layout: 'hero' });
    });

    // Then add other projects as masonry
    otherProjects.forEach(project => {
      sequence.push({ project, layout: 'masonry' });
    });

    return sequence;
  }, [projects]);

  return (
    <div className="w-full overflow-visible px-1 sm:px-0">
      <div
        className="grid grid-cols-1 auto-rows-auto gap-4 sm:gap-5 lg:gap-6"
      >
        {patternedProjects.map(({ project, layout }, index) => (
          <motion.div
            key={project.id}
            className="relative w-full h-full"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: Math.min(index * 0.03, 0.3) }}
            viewport={{ once: true }}
          >
            <ProjectCardApple
              project={project}
              index={index}
              onClick={onProjectClick}
              layout={layout}
            />
          </motion.div>
        ))}
      </div>

      {/* Apple-style load more indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        viewport={{ once: true }}
        className="flex justify-center mt-12 sm:mt-14 lg:mt-16"
      >
        <div className="px-8 py-3 bg-gray-100/80 backdrop-blur-sm rounded-full 
                      text-sm font-medium text-gray-600 border border-gray-200/50">
          Showing {projects.length} projects
        </div>
      </motion.div>
    </div>
  );
}