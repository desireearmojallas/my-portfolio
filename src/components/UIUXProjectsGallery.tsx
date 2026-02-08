import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Smartphone, Monitor, Tablet, ExternalLink, ArrowRight } from "lucide-react";
import ProjectDetailModal from "./ProjectDetailModal";
import type { Project } from "./ProjectCard";

interface UIUXProjectsGalleryProps {
  projects: Project[];
  defaultOpen?: boolean;
  className?: string;
  onToggle?: (isOpen: boolean) => void;
}

export default function UIUXProjectsGallery({ 
  projects, 
  className = ""
}: UIUXProjectsGalleryProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  // Filter UI/UX projects only
  const uiuxProjects = useMemo(() => {
    return projects.filter(project => project.type === "uiux");
  }, [projects]);

  // Handle modal open/close with proper scroll management
  const handleOpenProject = (project: Project) => {
    window._lastScrollPosition = window.scrollY;
    document.body.style.overflow = 'hidden';
    setSelectedProject(project);
  };

  const handleCloseProject = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    document.body.style.overflow = '';
    setSelectedProject(null);
    if (window._lastScrollPosition !== undefined) {
      setTimeout(() => {
        window.scrollTo(0, window._lastScrollPosition || 0);
      }, 10);
    }
  };

  // Determine device type based on tags
  const getDeviceType = (project: Project) => {
    const tags = project.tags.map(t => t.toLowerCase());
    if (tags.some(t => t.includes('mobile') || t.includes('app'))) return 'phone';
    if (tags.some(t => t.includes('tablet'))) return 'tablet';
    return 'desktop';
  };

  return (
    <div className={`${className}`}>
      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {uiuxProjects.map((project, index) => {
          const deviceType = getDeviceType(project);
          const isHovered = hoveredProject === project.id;

          return (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative"
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <div className="relative h-full bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl overflow-hidden border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-500">
                {/* Background gradient that shifts on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-pink-50/50 via-purple-50/30 to-blue-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Content */}
                <div className="relative h-full p-6 flex flex-col">
                  {/* Device Icon Badge */}
                  <div className="absolute top-4 right-4 z-10">
                    <div className="bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-md">
                      {deviceType === 'phone' && <Smartphone className="w-4 h-4 text-[rgb(251,108,133)]" />}
                      {deviceType === 'tablet' && <Tablet className="w-4 h-4 text-[rgb(251,108,133)]" />}
                      {deviceType === 'desktop' && <Monitor className="w-4 h-4 text-[rgb(251,108,133)]" />}
                    </div>
                  </div>

                  {/* Project Image */}
                  <div className="flex-1 flex items-center justify-center mb-6 relative overflow-hidden rounded-xl">
                    <motion.div
                      animate={{ 
                        scale: isHovered ? 1.05 : 1,
                      }}
                      transition={{ duration: 0.4 }}
                      className="w-full h-full"
                    >
                      <img 
                        src={project.image} 
                        alt={project.title}
                        className="w-full h-full object-cover rounded-xl"
                      />
                    </motion.div>

                    {/* Hover overlay with CTA */}
                    <AnimatePresence>
                      {isHovered && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent flex items-end justify-center pb-8"
                        >
                          <motion.button
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 20, opacity: 0 }}
                            onClick={() => handleOpenProject(project)}
                            className="bg-white text-gray-900 px-6 py-3 rounded-full font-semibold text-sm flex items-center gap-2 hover:bg-[rgb(251,108,133)] hover:text-white transition-colors duration-300 shadow-xl"
                          >
                            View Case Study
                            <ArrowRight className="w-4 h-4" />
                          </motion.button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Project Info */}
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-[rgb(251,108,133)] transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {project.tags.slice(0, 3).map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-3 py-1 bg-white/80 backdrop-blur-sm text-xs font-medium text-gray-700 rounded-full border border-gray-200"
                        >
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 3 && (
                        <span className="px-3 py-1 bg-gradient-to-r from-[rgb(251,108,133)] to-[rgb(245,89,119)] text-xs font-medium text-white rounded-full">
                          +{project.tags.length - 3}
                        </span>
                      )}
                    </div>

                    {/* Action Button */}
                    <button
                      onClick={() => handleOpenProject(project)}
                      className="w-full mt-4 flex items-center justify-center gap-2 bg-gradient-to-r from-[rgb(251,108,133)] to-[rgb(245,89,119)] text-white px-4 py-3 rounded-xl font-semibold text-sm hover:shadow-lg hover:scale-105 transition-all duration-300 group/btn"
                    >
                      <span>Explore Project</span>
                      <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <ProjectDetailModal
          project={selectedProject}
          onClose={handleCloseProject}
        />
      )}
    </div>
  );
}
