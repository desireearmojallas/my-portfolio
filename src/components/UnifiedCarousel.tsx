import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Project } from './ProjectCardNew';
import ProjectCardNew from './ProjectCardNew';

interface UnifiedCarouselProps {
  projects: Project[];
  title: string;
  subtitle?: string;
  onProjectClick?: (project: Project) => void;
  className?: string;
}

interface BreakpointConfig {
  base: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
}

const UnifiedCarousel: React.FC<UnifiedCarouselProps> = ({
  projects,
  title,
  subtitle,
  onProjectClick,
  className = ""
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(1);
  const [containerWidth, setContainerWidth] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Breakpoint configuration for responsive card visibility
  // Calculate visible cards based on screen size
  const updateVisibleCards = useCallback(() => {
    if (typeof window === 'undefined') return;
    
    const breakpointConfig: BreakpointConfig = {
      base: 1,
      sm: 1,
      md: 2,
      lg: 3,
      xl: 4,
    };
    
    const width = window.innerWidth;
    
    if (width >= 1440) {
      setVisibleCards(breakpointConfig.xl);
    } else if (width >= 1024) {
      setVisibleCards(breakpointConfig.lg);
    } else if (width >= 768) {
      setVisibleCards(breakpointConfig.md);
    } else if (width >= 640) {
      setVisibleCards(breakpointConfig.sm);
    } else {
      setVisibleCards(breakpointConfig.base);
    }
  }, []);

  useEffect(() => {
    updateVisibleCards();
    window.addEventListener('resize', updateVisibleCards);
    return () => window.removeEventListener('resize', updateVisibleCards);
  }, [updateVisibleCards]);

  // Measure container width for accurate card sizing
  useEffect(() => {
    const measureContainer = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };

    measureContainer();

    const resizeObserver = new ResizeObserver(measureContainer);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => resizeObserver.disconnect();
  }, []);

  // Calculate pagination
  const totalPages = Math.ceil(projects.length / Math.floor(visibleCards));
  const currentPage = Math.floor(currentIndex / Math.floor(visibleCards));
  const maxIndex = Math.max(0, projects.length - Math.floor(visibleCards));

  // Navigation functions
  const goToNext = () => {
    setCurrentIndex(prev => Math.min(prev + Math.floor(visibleCards), maxIndex));
  };

  const goToPrev = () => {
    setCurrentIndex(prev => Math.max(prev - Math.floor(visibleCards), 0));
  };

  const goToPage = (page: number) => {
    const newIndex = page * Math.floor(visibleCards);
    setCurrentIndex(Math.min(newIndex, maxIndex));
  };

  // Calculate transform for smooth scrolling with better precision
  const getTransform = () => {
    if (typeof window === 'undefined') return 0;
    
    const cardWidth = getCardWidth();
    const gap = 24;
    
    return -(currentIndex * (cardWidth + gap));
  };

  // Get responsive gap class
  const getGapClass = () => {
    return "gap-6"; // Consistent 24px gap
  };

  // Calculate dynamic card width with improved precision
  const getCardWidth = () => {
    if (typeof window === 'undefined') return 320;
    
    // Use measured container width for accurate calculations
    let measuredWidth = containerWidth;
    
    if (!measuredWidth) {
      // Fallback calculation
      const maxContainerWidth = 1280;
      measuredWidth = Math.min(window.innerWidth - 48, maxContainerWidth); // 48px for padding
    }
    
    const effectiveVisibleCards = Math.floor(visibleCards);
    const totalGap = (effectiveVisibleCards - 1) * 24;
    const availableWidth = measuredWidth - totalGap;
    
    return Math.max(280, Math.floor(availableWidth / effectiveVisibleCards)); // Min width of 280px
  };

  return (
    <section className={`relative overflow-visible py-16 ${className}`}>
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-6 mb-10">
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-2">
          {title}
        </h2>
        {subtitle && (
          <p className="text-gray-500 mb-8">{subtitle}</p>
        )}
      </div>

      {/* Carousel Container */}
      <div ref={containerRef} className="max-w-7xl mx-auto px-6">
        {/* Overflow wrapper - clips carousel track during transitions */}
        <div className="relative w-full overflow-hidden rounded-2xl">
          {/* Padding wrapper - provides buffer zone for hover effects */}
          <div className="py-6 px-1">
            <motion.div
              ref={carouselRef}
              className={`flex ${getGapClass()}`}
              animate={{
                x: getTransform()
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
                duration: 0.8
              }}
              style={{
                width: `${projects.length * (getCardWidth() + 24)}px`
              }}
            >
            {projects.map((project, index) => (
              <motion.div
                key={`${title}-${project.id}`}
                className="flex-shrink-0"
                style={{ width: `${getCardWidth()}px` }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.1,
                  ease: "easeOut"
                }}
              >
                {/* Card wrapper with hover effects - buffer zone prevents clipping */}
                <motion.div
                  className="rounded-2xl bg-white border border-gray-200/50 h-full overflow-hidden
                            shadow-lg hover:shadow-2xl hover:shadow-pink-500/10 
                            transition-all duration-500 ease-out
                            hover:border-pink-200/50"
                  whileHover={{ 
                    scale: 1.03, 
                    y: -8,
                    transition: { 
                      type: "spring",
                      stiffness: 400,
                      damping: 25,
                      duration: 0.3 
                    }
                  }}
                >
                  <ProjectCardNew
                    project={project}
                    index={index}
                    onClick={onProjectClick}
                  />
                </motion.div>
              </motion.div>
          ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 mt-12">
          {/* Arrow Navigation - Hidden on mobile */}
          <div className="hidden sm:flex items-center gap-4">
            <motion.button
              onClick={goToPrev}
              disabled={currentPage === 0}
              className={`p-3 rounded-full border-2 transition-all duration-500 backdrop-blur-sm ${
                currentPage === 0
                  ? "opacity-40 cursor-not-allowed border-gray-200 text-gray-400 bg-white/40"
                  : "hover:border-pink-400 hover:text-pink-500 border-gray-300 text-gray-600 hover:bg-pink-50/80 bg-white/60 hover:shadow-lg hover:shadow-pink-500/20"
              }`}
              whileHover={currentPage === 0 ? {} : { 
                scale: 1.1, 
                y: -2,
                transition: { type: "spring", stiffness: 400, damping: 25 }
              }}
              whileTap={currentPage === 0 ? {} : { scale: 0.95 }}
            >
              <ChevronLeft className="w-5 h-5" />
            </motion.button>

            <motion.button
              onClick={goToNext}
              disabled={currentPage >= totalPages - 1}
              className={`p-3 rounded-full border-2 transition-all duration-500 backdrop-blur-sm ${
                currentPage >= totalPages - 1
                  ? "opacity-40 cursor-not-allowed border-gray-200 text-gray-400 bg-white/40"
                  : "hover:border-pink-400 hover:text-pink-500 border-gray-300 text-gray-600 hover:bg-pink-50/80 bg-white/60 hover:shadow-lg hover:shadow-pink-500/20"
              }`}
              whileHover={currentPage >= totalPages - 1 ? {} : { 
                scale: 1.1, 
                y: -2,
                transition: { type: "spring", stiffness: 400, damping: 25 }
              }}
              whileTap={currentPage >= totalPages - 1 ? {} : { scale: 0.95 }}
            >
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </div>

          {/* Pagination Dots */}
          {totalPages > 1 && (
            <div className="flex items-center gap-3">
              {Array.from({ length: totalPages }).map((_, i) => (
                <motion.button
                  key={i}
                  onClick={() => goToPage(i)}
                  className={`rounded-full transition-all duration-500 ${
                    currentPage === i 
                      ? 'h-3 w-8 bg-gradient-to-r from-[rgb(251,108,133)] to-[rgb(245,89,119)] shadow-lg shadow-pink-500/30' 
                      : 'h-3 w-3 bg-gray-300 hover:bg-gray-400 hover:shadow-md'
                  }`}
                  whileHover={{ 
                    scale: 1.3,
                    y: -2,
                    transition: { type: "spring", stiffness: 400, damping: 25 }
                  }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 + 0.3 }}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default UnifiedCarousel;