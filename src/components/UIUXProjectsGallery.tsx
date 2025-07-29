import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Palette, Filter } from "lucide-react";
import ProjectCard from "./ProjectCard";
import ProjectDetailModal from "./ProjectDetailModal";
import CollapsibleSection from "./CollapsibleSection";
import type { Project } from "./ProjectCard";

interface UIUXProjectsGalleryProps {
  projects: Project[];
  defaultOpen?: boolean;
  className?: string;
  onToggle?: (isOpen: boolean) => void;
}

export default function UIUXProjectsGallery({ 
  projects, 
  defaultOpen = false,
  className = "",
  onToggle
}: UIUXProjectsGalleryProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  // Filter UI/UX projects only
  const uiuxProjects = useMemo(() => {
    return projects.filter(project => project.type === "uiux");
  }, [projects]);

  // Get unique categories
  
  // Handle modal open/close with proper scroll management
  const handleOpenProject = (project: Project) => {
    // Store current scroll position
    window._lastScrollPosition = window.scrollY;
    
    // Save scroll position
    document.body.style.overflow = 'hidden';
    setSelectedProject(project);
  };

  const handleCloseProject = (e?: React.MouseEvent) => {
    // Prevent default navigation
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    // Re-enable scrolling
    document.body.style.overflow = '';
    setSelectedProject(null);
    
    // Restore scroll position
    if (window._lastScrollPosition !== undefined) {
      setTimeout(() => {
        window.scrollTo(0, window._lastScrollPosition || 0);
      }, 10);
    }
  };
  const categories = useMemo(() => {
    const cats = uiuxProjects.map(project => project.category).filter((cat): cat is string => typeof cat === "string" && cat !== undefined);
    return [...new Set(cats)];
  }, [uiuxProjects]);

  // Filter projects based on active category
  const filteredProjects = useMemo(() => {
    if (!activeCategory) return uiuxProjects;
    return uiuxProjects.filter(project => project.category === activeCategory);
  }, [uiuxProjects, activeCategory]);

  return (
    <CollapsibleSection 
      title="UI/UX Design Projects" 
      icon={<Palette className="w-6 h-6" />}
      defaultOpen={defaultOpen}
      className={className}
      onToggle={onToggle}
    >
      <div className="py-6">
        {/* Category Filters */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8 flex flex-wrap gap-3"
        >
          <button
            onClick={() => setActiveCategory(null)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              activeCategory === null 
                ? 'bg-[rgb(251,108,133)] text-white shadow-md' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All Projects
          </button>
          
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === category 
                  ? 'bg-[rgb(251,108,133)] text-white shadow-md' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Display filter results */}
        <div className="flex items-center gap-2 mb-6 px-1.5 text-sm text-gray-600">
          <Filter className="w-4 h-4 text-[rgb(251,108,133)]" />
          <span>
            Showing <span className="font-semibold">{filteredProjects.length}</span> projects
            {activeCategory && <> in <span className="font-semibold">{activeCategory}</span></>}
          </span>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16 px-6 bg-gray-50 rounded-xl"
          >
            <h3 className="text-xl font-medium text-gray-600 mb-2">No projects found</h3>
            <p className="text-gray-500">No projects match the selected category.</p>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                onClick={handleOpenProject}
              />
            ))}
          </motion.div>
        )}

        {/* Project Detail Modal */}
        {selectedProject && (
          <ProjectDetailModal
            project={selectedProject}
            onClose={handleCloseProject}
          />
        )}
      </div>
    </CollapsibleSection>
  );
}
