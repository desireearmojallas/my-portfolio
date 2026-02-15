import { motion } from 'framer-motion';
import { useMemo } from 'react';
import ProjectCardApple, { type Project } from './ProjectCardApple';

interface MasonryProjectsProps {
  projects: Project[];
  onProjectClick?: (project: Project) => void;
}

export default function MasonryProjects({ projects, onProjectClick }: MasonryProjectsProps) {
  // Build a strict 2–1–2–1 rhythm: two supporting tiles, then one hero tile.
  const patternedProjects = useMemo(() => {
    const heroQueue = [...projects.filter(p => p.featured)];
    const supportingQueue = [...projects.filter(p => !p.featured)];
    const sequence: Array<{ project: Project; layout: 'hero' | 'masonry' }> = [];

    // Keep sequencing until both queues are empty
    while (heroQueue.length > 0 || supportingQueue.length > 0) {
      // Add two supporting tiles (fallback to heroes if we run out)
      for (let i = 0; i < 2; i++) {
        if (supportingQueue.length > 0) {
          sequence.push({ project: supportingQueue.shift()!, layout: 'masonry' });
        } else if (heroQueue.length > 0) {
          sequence.push({ project: heroQueue.shift()!, layout: 'masonry' });
        }
      }

      // Add a hero tile (fallback to supporting if no heroes left)
      if (heroQueue.length > 0) {
        sequence.push({ project: heroQueue.shift()!, layout: 'hero' });
      } else if (supportingQueue.length > 0) {
        sequence.push({ project: supportingQueue.shift()!, layout: 'hero' });
      }
    }

    // If no projects were provided, keep it empty
    return sequence;
  }, [projects]);

  return (
    <div className="w-full overflow-hidden">
      <div
        className="grid grid-cols-1 md:grid-cols-2 auto-rows-auto gap-0 md:gap-0"
      >
        {patternedProjects.map(({ project, layout }, index) => (
          <motion.div
            key={project.id}
            className={`w-full h-full ${layout === 'hero' ? 'md:col-span-2' : ''}`}
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