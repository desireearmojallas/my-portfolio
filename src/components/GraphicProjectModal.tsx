import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import type { GraphicProject } from './GraphicProjectCard';

interface GraphicProjectModalProps {
  project: GraphicProject | null;
  onClose: () => void;
  isClosing?: boolean;
}

export default function GraphicProjectModal({ project, onClose }: GraphicProjectModalProps) {
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
    const originalStyle = window.getComputedStyle(document.body).overflow;
    const originalPaddingRight = window.getComputedStyle(document.body).paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = `${scrollbarWidth}px`;
    
    return () => {
      document.body.style.overflow = originalStyle;
      document.body.style.paddingRight = originalPaddingRight;
      
      if (window._lastScrollPosition !== undefined) {
        window.scrollTo(0, window._lastScrollPosition || 0);
      }
    };
  }, []);

  // Handle click outside modal
  const handleClickOutside = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
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

  // Determine if an asset is a video
  const isVideoAsset = (url: string) => {
    const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov'];
    return videoExtensions.some(ext => url.toLowerCase().endsWith(ext));
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-black/60 backdrop-blur-sm project-modal-overlay"
        onClick={handleClickOutside}
        onMouseDown={(e) => e.preventDefault()}
      >
        <motion.div
          ref={modalRef}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="bg-white rounded-3xl shadow-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto relative project-modal-content modal-content-scroll"
          style={{ overflowY: 'auto', WebkitOverflowScrolling: 'touch' }}
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
          }}
        >
          {/* Close button */}
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
              {project.client && (
                <p className="text-xl text-gray-600">
                  {project.client}
                </p>
              )}
            </motion.div>

            {/* Category & Subcategory */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-8"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Category
              </h3>
              <div className="flex flex-wrap gap-2">
                <span className="px-4 py-2 bg-[#FBD1D9]/20 text-[#E27396] rounded-full text-sm font-medium">
                  {project.category}
                </span>
                {project.subcategory && (
                  <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                    {project.subcategory}
                  </span>
                )}
              </div>
            </motion.div>

            {/* Tools Used */}
            {project.tools && project.tools.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="mb-8"
              >
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  Tools Used
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.tools.map((tool, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Description */}
            {project.description && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mb-10"
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  About
                </h3>
                <div className="prose prose-lg max-w-none text-gray-600">
                  <p>{project.description}</p>
                </div>
              </motion.div>
            )}

            {/* Project Gallery - Behance-style seamless vertical layout */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-10 -mx-6 md:-mx-8 lg:-mx-10"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-6 px-6 md:px-8 lg:px-10">
                Gallery
              </h3>
              <div className="flex flex-col">
                {project.assets.map((asset, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={`w-full bg-white ${
                      project.type === 'logo' ? 'p-8 md:p-12 lg:p-16' : ''
                    }`}
                  >
                    {isVideoAsset(asset) ? (
                      <video
                        src={asset}
                        className="w-full h-auto object-contain block"
                        controls
                        loop
                        playsInline
                        preload="metadata"
                      />
                    ) : (
                      <img 
                        src={asset} 
                        alt={`${project.title} - Image ${index + 1}`}
                        className={`w-full h-auto object-contain block ${
                          project.type === 'logo' ? 'max-w-2xl mx-auto' : ''
                        }`}
                      />
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
