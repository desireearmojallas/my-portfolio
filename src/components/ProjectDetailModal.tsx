import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import type { Project } from './ProjectCard';
import UnifiedMediaGallery from './UnifiedMediaGallery';
import './UnifiedMediaGallery.css';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectDetailModal({ project, onClose }: ProjectDetailModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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

  // Convert project images to media items for the unified gallery
  const projectImages = project.images && project.images.length > 0
    ? project.images.map((src) => ({
        src,
        type: 'image' as const,
        alt: `${project.title} preview`
      }))
    : project.image ? [{
        src: project.image,
        type: 'image' as const,
        alt: `${project.title} preview`
      }] : [];

  return createPortal(
    <AnimatePresence>
      {project && (
        <motion.div
          key="project-modal"
          className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 backdrop-blur-md p-4 md:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          onClick={handleClickOutside}
        >
          <motion.div
            ref={modalRef}
            className="relative w-full max-w-5xl max-h-[calc(100vh-96px)] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            <div className="sticky top-0 z-10 flex-shrink-0 px-6 md:px-8 py-5 bg-white/90 backdrop-blur-sm border-b border-gray-200 flex flex-wrap items-start gap-4">
              <div className="flex-1 min-w-[240px]">
                <p className="text-xs uppercase tracking-[0.24em] text-pink-500 font-semibold mb-1">{project.category || 'Design Project'}</p>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 font-outfit leading-tight">{project.title}</h2>
              </div>
              <button
                onClick={handleCloseClick}
                className="p-2 rounded-full text-gray-500 hover:bg-gray-200/70 hover:text-gray-800 transition-colors"
                aria-label="Close project details"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="overflow-y-auto px-6 md:px-10 pb-12 pt-6 space-y-10">
              {project.overview && (
                <div className="space-y-3 text-left">
                  <h3 className="text-lg font-semibold text-gray-800">Project Overview</h3>
                  <p className="text-gray-600 whitespace-pre-wrap leading-relaxed">{project.overview}</p>
                </div>
              )}

              {project.tags && project.tags.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-gray-800">Tools & Technologies</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1.5 text-sm font-medium text-pink-600 bg-pink-100/70 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {projectImages.length > 0 && (
                <div className="space-y-4">
                  <UnifiedMediaGallery media={projectImages} />
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
