import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Github, ExternalLink, Figma } from 'lucide-react';
import type { Project } from './ProjectCard';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectDetailModal({ project, onClose }: ProjectDetailModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  // Close on Escape key press
  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscKey);
    return () => window.removeEventListener('keydown', handleEscKey);
  }, [onClose]);

  // Preserve scroll position and handle body scroll
  useEffect(() => {
    // Store original body styles
    const originalStyle = window.getComputedStyle(document.body).overflow;
    const originalPaddingRight = window.getComputedStyle(document.body).paddingRight;
    
    // Calculate scrollbar width to prevent layout shift
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    
    // Lock body scroll but keep the scrollbar space to prevent layout shift
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = `${scrollbarWidth}px`;
    
    // We'll use window._lastScrollPosition for consistency across components
    
    // Cleanup function
    return () => {
      // Re-enable scrolling when modal is closed
      document.body.style.overflow = originalStyle;
      document.body.style.paddingRight = originalPaddingRight;
      
      // Restore scroll position using the stored value
      if (window._lastScrollPosition !== undefined) {
        window.scrollTo(0, window._lastScrollPosition || 0);
      }
    };
  }, []);

  // Handle click outside modal
  const handleClickOutside = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent default behavior
    e.stopPropagation(); // Stop event propagation
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  // Handle close button click
  const handleCloseClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onClose();
  };

  if (!project) return null;

  // Mock images for the project (replace with real images from your project data)
  const projectImages = [
    { id: 1, src: project.image || '/placeholder.jpg', alt: `${project.title} preview 1` },
    { id: 2, src: '/placeholder-2.jpg', alt: `${project.title} preview 2` },
    { id: 3, src: '/placeholder-3.jpg', alt: `${project.title} preview 3` },
  ];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 overflow-y-auto bg-black/60 backdrop-blur-sm project-modal-overlay modal-layer"
        style={{ overflow: 'hidden' }}
        onClick={handleClickOutside}
        onMouseDown={(e) => e.preventDefault()} // Prevent mousedown events
      >
        <motion.div
          ref={modalRef}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="bg-white rounded-3xl shadow-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto relative project-modal-content modal-layer modal-content-scroll"
          style={{ overflowY: 'auto', WebkitOverflowScrolling: 'touch' }}
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
          }}
        >
          {/* Close button - repositioned for better placement */}
          <button
            onClick={handleCloseClick}
            className="absolute top-4 right-4 z-10 bg-white/90 backdrop-blur-sm rounded-full p-2.5 shadow-md hover:bg-gray-100 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5 text-gray-700" />
          </button>

          {/* Project content */}
          <div className="p-6 md:p-8 lg:p-10">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-8"
            >
              <h2 className="text-3xl md:text-4xl font-outfit font-bold text-gray-800 mb-2">
                {project.title}
              </h2>
              <p className="text-xl text-gray-600">
                {project.role === 'designer' ? 'Design Project' : 'Development Project'}
              </p>
            </motion.div>

            {/* Cover Image */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-10"
            >
              <div className="rounded-2xl overflow-hidden shadow-lg aspect-video bg-gray-100">
                <img 
                  src={project.image || '/placeholder.jpg'} 
                  alt={`${project.title} cover`}
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            {/* Tools/Tags */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-8"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Tools & Technologies
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-[#FBD1D9]/20 text-[#E27396] rounded-full text-sm font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-10"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Project Overview
              </h3>
              <div className="prose prose-lg max-w-none text-gray-600">
                <p>{project.description}</p>
                <p className="mt-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. 
                  Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus 
                  rhoncus ut eleifend nibh porttitor. Ut in nulla enim.
                </p>
              </div>
            </motion.div>

            {/* Project Images Gallery */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mb-10"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Project Gallery
              </h3>
              <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
                {projectImages.map((image) => (
                  <motion.div
                    key={image.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="rounded-xl overflow-hidden shadow-md aspect-video bg-gray-100"
                  >
                    <img 
                      src={image.src} 
                      alt={image.alt}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* External Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-4 mb-6"
            >
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-3 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors text-gray-800 font-medium"
                >
                  <Github className="w-5 h-5" />
                  View Code
                </a>
              )}
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-[rgb(251,108,133)] to-[rgb(245,89,119)] text-white rounded-full font-medium transition-transform hover:scale-105"
                >
                  <ExternalLink className="w-5 h-5" />
                  Live Demo
                </a>
              )}
              {project.role === 'designer' && (
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-3 bg-black text-white rounded-full font-medium transition-transform hover:scale-105"
                >
                  <Figma className="w-5 h-5" />
                  Figma Design
                </a>
              )}
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
