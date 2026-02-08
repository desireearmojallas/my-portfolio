import { useState, useRef, useEffect, useCallback } from "react";
import type { PanInfo } from "framer-motion";
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Play, Pause, Volume2, VolumeX, ZoomIn, Info } from "lucide-react";
import type { GraphicProject } from "./GraphicProjectCard";
import { useResponsive } from '../hooks/useResponsive';
import './GraphicProjectInteractions.css';

interface GraphicProjectModalProps {
  project: GraphicProject | null;
  onClose: () => void;
  isClosing?: boolean;
}

export default function GraphicProjectModal({ project, onClose, isClosing = false }: GraphicProjectModalProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true); // Start muted for autoplay
  const [isVideoLoading, setIsVideoLoading] = useState(true);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [showDetails, setShowDetails] = useState(false); // For mobile detail toggle
  const videoRef = useRef<HTMLVideoElement>(null);
  const modalContentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const dragX = useMotionValue(0);
  const { isMobile, isSmAndDown, isMdAndDown } = useResponsive();
  
  const navigateNext = useCallback(() => {
    if (project && currentIndex < project.assets.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setIsZoomed(false); // Reset zoom when changing assets
    }
  }, [project, currentIndex]);
  
  const navigatePrev = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      setIsZoomed(false); // Reset zoom when changing assets
    }
  }, [currentIndex]);
  
  // Handle swipe gestures for touch devices
  const handleDragEnd = useCallback((_: any, info: PanInfo) => {
    const threshold = 50; // Minimum swipe distance
    const velocity = info.velocity.x;
    const offset = info.offset.x;
    
    if (Math.abs(offset) > threshold || Math.abs(velocity) > 500) {
      if (offset > 0 && velocity >= 0) {
        // Swiped right - go to previous
        navigatePrev();
      } else if (offset < 0 && velocity <= 0) {
        // Swiped left - go to next
        navigateNext();
      }
    }
    
    // Reset drag position
    animate(dragX, 0, { type: "spring", stiffness: 300, damping: 30 });
  }, [navigateNext, navigatePrev, dragX]);
  
  const togglePlayPause = useCallback(() => {
    setIsPlaying(prev => !prev);
  }, []);
  
  const toggleMute = useCallback(() => {
    setIsMuted(prev => !prev);
  }, []);
  
  // Determine if the current asset is a video by file extension
  const isVideoAsset = (url: string) => {
    const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov'];
    return videoExtensions.some(ext => url.toLowerCase().endsWith(ext));
  };

  // Always define these, even if project is null, to keep hooks order consistent
  const currentAsset = project ? project.assets[currentIndex] : "";
  const currentIsVideo = project ? isVideoAsset(currentAsset) : false;

  // Toggle zoom for images
    const toggleZoom = useCallback((e?: React.MouseEvent) => {
      if (!currentIsVideo) {
        // Reset zoom when changing images
        if (isZoomed) {
          setIsZoomed(false);
          setZoomPosition({ x: 0, y: 0 });
        } else if (e && imageRef.current) {
          const rect = imageRef.current.getBoundingClientRect();
          // Calculate click position relative to image dimensions
          const x = ((e.clientX - rect.left) / rect.width) * 100;
          const y = ((e.clientY - rect.top) / rect.height) * 100;
          setZoomPosition({ x, y });
          setIsZoomed(true);
        }
      }
    }, [isZoomed, currentIsVideo]);
  
    const handleKeyDown = useCallback((e: KeyboardEvent) => {
      if (!project) return;
      
      switch (e.key) {
        case "Escape":
          // Handle the escape key properly
          onClose();
          break;
        case "ArrowLeft":
          navigatePrev();
          break;
        case "ArrowRight":
          navigateNext();
          break;
        case " ": // Space key
          if (currentIsVideo) {
            togglePlayPause();
            e.preventDefault(); // Prevent page scroll
          } else {
            // If not video, toggle zoom
            toggleZoom();
            e.preventDefault();
          }
          break;
        case "m":
          toggleMute();
          break;
      }
    }, [project, navigatePrev, navigateNext, togglePlayPause, toggleMute, onClose, currentIsVideo, toggleZoom]);
  
    // Add keyboard event listener
    useEffect(() => {
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    }, [handleKeyDown]);
  
    // Early return if no project
    // (Moved after all hooks to avoid conditional hook call)

  // Handle space bar for toggling zoom
  useEffect(() => {
    const handleSpaceKey = (e: KeyboardEvent) => {
      if (e.code === 'Space' && !currentIsVideo) {
        e.preventDefault(); // Prevent page scroll
        toggleZoom();
      }
    };
    
    window.addEventListener('keydown', handleSpaceKey);
    return () => window.removeEventListener('keydown', handleSpaceKey);
  }, [toggleZoom, currentIsVideo]);

  // Autoplay videos when modal opens
  useEffect(() => {
    if (project && currentIsVideo) {
      setIsPlaying(true);
      setIsMuted(true); // Start muted for autoplay compliance
    } else {
      setIsPlaying(false);
    }
  }, [project, currentIsVideo, currentIndex]);
  
  // Lock body scroll when modal is open
  useEffect(() => {
    // Store original body styles
    const originalStyle = window.getComputedStyle(document.body).overflow;
    const originalPaddingRight = window.getComputedStyle(document.body).paddingRight;
    
    // Calculate scrollbar width to prevent layout shift
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    
    // Prevent body from scrolling when modal is open (but allow modal content to scroll)
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = `${scrollbarWidth}px`;
    
    // Re-enable scrolling when modal is closed
    return () => {
      document.body.style.overflow = originalStyle;
      document.body.style.paddingRight = originalPaddingRight;
      
      // Restore scroll position using the stored value
      if (window._lastScrollPosition !== undefined) {
        window.scrollTo(0, window._lastScrollPosition || 0);
      }
    };
  }, []);

  // Focus trap - keep focus inside modal
  useEffect(() => {
    if (!modalContentRef.current) return;
    
    const modalContent = modalContentRef.current;
    modalContent.focus();
    
    // Create a focus trap
    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      
      const focusableElements = modalContent.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      
      if (focusableElements.length === 0) return;
      
      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;
      
      if (e.shiftKey && document.activeElement === firstElement) {
        lastElement.focus();
        e.preventDefault();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        firstElement.focus();
        e.preventDefault();
      }
    };
    
    window.addEventListener("keydown", handleTabKey);
    return () => {
      window.removeEventListener("keydown", handleTabKey);
    };
  }, []);
  
  // Initialize video when asset changes
  useEffect(() => {
    if (!project || !currentIsVideo) return;

    // Try to autoplay or toggle to play if user intended
    const attemptPlay = () => {
      if (videoRef.current) {
        if (isPlaying) {
          // Try to play
          videoRef.current.play().catch(error => {
            console.warn("Video autoplay failed:", error);
            // Don't show error, just set playing state to false
            setIsPlaying(false);
          });
        }
      }
    };

    // Reset loading state when asset changes
    setIsVideoLoading(true);
    
    // Small delay to ensure the component is fully rendered
    const timer = setTimeout(() => {
      attemptPlay();
    }, 300);

    return () => clearTimeout(timer);
  }, [currentIndex, currentIsVideo, project, isPlaying]);
  
  // Control video playback
  useEffect(() => {
    if (!project) return;
    
    const videoElement = videoRef.current;
    if (!videoElement) return;
    
    const handleCanPlayThrough = () => {
      setIsVideoLoading(false);
    };
    
    videoElement.addEventListener('canplaythrough', handleCanPlayThrough);
    
    // Reset video when changing assets
    if (currentIsVideo) {
      // Set source again to ensure proper loading
      videoElement.src = currentAsset;
      videoElement.load();
      
      // Try to play after a short delay
      setTimeout(() => {
        if (isPlaying) {
          videoElement.play().catch(error => {
            console.error("Autoplay failed:", error);
            setIsPlaying(false);
            // Fall back to browser controls if autoplay fails
            if (videoRef.current) {
              videoRef.current.controls = true;
            }
          });
        } else {
          videoElement.pause();
        }
      }, 100);
    }
    
    videoElement.muted = isMuted;
    
    // Clean up event listener
    return () => {
      videoElement.removeEventListener('canplaythrough', handleCanPlayThrough);
    };
  }, [isPlaying, isMuted, currentIndex, project, currentAsset, currentIsVideo]);
  
  // Early return if no project (after all hooks)
  if (!project) return null;
  
  // Handle click outside of modal content
  const handleClickOutside = (e: React.MouseEvent) => {
    if (modalContentRef.current && !modalContentRef.current.contains(e.target as Node)) {
      onClose();
    }
  };
  
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="graphic-modal"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.2, ease: "easeOut" } }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-[999] flex items-center justify-center bg-black/80 backdrop-blur-sm project-modal-overlay"
        style={{ 
          overflow: 'hidden',
          padding: isMdAndDown ? '0' : '1rem'
        }}
        onClick={handleClickOutside}
        data-state={isClosing ? 'closing' : 'open'}
      >
        {/* Close button - responsive positioning */}
        <button
          onClick={onClose}
          className="absolute z-50 bg-white/95 backdrop-blur-sm flex items-center justify-center text-gray-800 hover:bg-white active:scale-95 transition-all shadow-xl"
          style={{
            top: isMdAndDown ? '0.75rem' : '1.5rem',
            right: isMdAndDown ? '0.75rem' : '1.5rem',
            width: isMdAndDown ? '44px' : '48px',
            height: isMdAndDown ? '44px' : '48px',
            borderRadius: '50%',
            touchAction: 'manipulation' // Improve touch responsiveness
          }}
          aria-label="Close modal"
        >
          <X className={isMdAndDown ? "w-5 h-5" : "w-6 h-6"} />
        </button>
        
        {/* Modal content with improved responsive layout */}
        <motion.div 
          ref={modalContentRef}
          initial={isMdAndDown ? { y: '100%' } : { scale: 0.96, opacity: 0 }}
          animate={isMdAndDown ? { y: 0 } : { scale: 1, opacity: 1 }}
          exit={isMdAndDown ? 
            { y: '100%', transition: { duration: 0.25, ease: [0.4, 0, 1, 1] } } : 
            { scale: 0.96, opacity: 0, transition: { duration: 0.2, ease: "easeOut" } }
          }
          transition={isMdAndDown ? 
            { type: 'spring', damping: 35, stiffness: 300 } : 
            { type: 'spring', damping: 30, stiffness: 300 }
          }
          className="relative w-full mx-auto bg-white overflow-hidden flex shadow-2xl project-modal-content modal-layer"
          style={{ 
            maxHeight: isMdAndDown ? '100vh' : 'calc(96vh - 2rem)',
            maxWidth: isMdAndDown ? '100vw' : 'min(95vw, 1280px)',
            height: isMdAndDown ? '100vh' : 'auto',
            borderRadius: isMdAndDown ? '0' : '16px',
            flexDirection: isMdAndDown ? 'column' : 'row',
            overflowY: 'auto',
            WebkitOverflowScrolling: 'touch'
          }}
          onClick={(e) => e.stopPropagation()}
          tabIndex={0}
        >
          {/* Media display area - enhanced for responsive design */}
          <motion.div 
            className="flex-1 bg-white relative overflow-hidden"
            drag={!currentIsVideo && project.assets.length > 1 && isMdAndDown ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
            style={{ 
              minHeight: isMdAndDown ? '60vh' : '400px',
              maxHeight: isMdAndDown ? '70vh' : 'none',
              height: isMdAndDown ? 'auto' : '100%',
              width: isMdAndDown ? '100%' : '65%',
              touchAction: currentIsVideo ? 'auto' : 'none',
              x: dragX
            }}
          >
            {/* Navigation arrows - touch-optimized */}
            {project.assets.length > 1 && !isMdAndDown && (
              <>
                <button
                  onClick={navigatePrev}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-800 z-20 hover:bg-white active:scale-95 transition-all shadow-lg disabled:opacity-40 disabled:cursor-not-allowed"
                  style={{
                    width: '48px',
                    height: '48px',
                    touchAction: 'manipulation'
                  }}
                  disabled={currentIndex === 0}
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={navigateNext}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-800 z-20 hover:bg-white active:scale-95 transition-all shadow-lg disabled:opacity-40 disabled:cursor-not-allowed"
                  style={{
                    width: '48px',
                    height: '48px',
                    touchAction: 'manipulation'
                  }}
                  disabled={currentIndex === project.assets.length - 1}
                  aria-label="Next image"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
            
            {/* Asset counter badge - repositioned for mobile */}
            {project.assets.length > 1 && (
              <div 
                className="absolute bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full z-20 project-asset-counter"
                style={{
                  bottom: isMdAndDown ? '1rem' : '1.5rem',
                  left: isMdAndDown ? '1rem' : '1.5rem'
                }}
              >
                <span className="text-white text-sm font-medium">
                  {currentIndex + 1} / {project.assets.length}
                </span>
              </div>
            )}
            
            {/* Media container - responsive sizing */}
            <div 
              className="w-full h-full flex items-center justify-center"
              style={{
                padding: isMdAndDown ? '0.5rem' : '1rem'
              }}
            >
              {currentIsVideo ? (
                <div 
                  className="relative w-full h-full flex items-center justify-center"
                  style={{ 
                    maxHeight: isMdAndDown ? '65vh' : '80vh'
                  }}
                >
                  {isVideoLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-900/50 backdrop-blur-sm z-10">
                      <div className="bg-white/95 px-4 py-2 rounded-xl shadow-lg flex items-center gap-2">
                        <div className="w-4 h-4 border-3 border-[#fb6c85] border-t-transparent rounded-full animate-spin"></div>
                        <span className="text-sm text-gray-700 font-medium">Loading video...</span>
                      </div>
                    </div>
                  )}
                  <video
                    ref={videoRef}
                    src={currentAsset}
                    className="max-w-full max-h-full object-contain bg-black"
                    style={{
                      borderRadius: isMdAndDown ? '0' : '8px'
                    }}
                    controls={false}
                    loop
                    preload="metadata"
                    playsInline
                    webkit-playsinline="true"
                    onLoadedMetadata={() => {
                      console.log("Video metadata loaded");
                      // Set current time to ensure poster frame shows
                      if (videoRef.current) videoRef.current.currentTime = 0.1;
                    }}
                    onCanPlay={() => setIsVideoLoading(false)}
                    onWaiting={() => setIsVideoLoading(true)}
                    onPlaying={() => setIsVideoLoading(false)}
                    onError={(e) => {
                      console.error("Video error:", e);
                      setIsVideoLoading(false);
                      // Show browser controls when there's an error
                      if (videoRef.current) {
                        videoRef.current.controls = true;
                      }
                    }}
                    poster={project.thumbnail}
                  />
                  
                  {/* Video controls - touch-optimized */}
                  <div 
                    className="absolute flex items-center gap-2 z-20"
                    style={{
                      bottom: isMdAndDown ? '1rem' : '1.5rem',
                      right: isMdAndDown ? '1rem' : '1.5rem'
                    }}
                  >
                    <button
                      onClick={toggleMute}
                      className="bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white active:scale-95 transition-all"
                      style={{
                        width: isMdAndDown ? '44px' : '44px',
                        height: isMdAndDown ? '44px' : '44px',
                        touchAction: 'manipulation'
                      }}
                      aria-label={isMuted ? "Unmute video" : "Mute video"}
                    >
                      {isMuted ? (
                        <VolumeX className="w-5 h-5 text-gray-800" />
                      ) : (
                        <Volume2 className="w-5 h-5 text-gray-800" />
                      )}
                    </button>
                    <button
                      onClick={togglePlayPause}
                      className="bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white active:scale-95 transition-all"
                      style={{
                        width: isMdAndDown ? '48px' : '52px',
                        height: isMdAndDown ? '48px' : '52px',
                        touchAction: 'manipulation'
                      }}
                      aria-label={isPlaying ? "Pause video" : "Play video"}
                    >
                      {isPlaying ? (
                        <Pause className="w-6 h-6 text-gray-800" />
                      ) : (
                        <Play className="w-6 h-6 text-gray-800 ml-0.5" />
                      )}
                    </button>
                  </div>
                </div>
              ) : (
                // Image display with zoom
                <div 
                  className="flex items-center justify-center overflow-hidden relative"
                  style={{
                    cursor: isZoomed ? 'zoom-out' : 'zoom-in',
                    maxHeight: isMdAndDown ? '65vh' : '80vh'
                  }}
                >
                  <motion.img 
                    ref={imageRef}
                    src={currentAsset}
                    alt={project.title}
                    onClick={(e: React.MouseEvent) => !isMdAndDown && toggleZoom(e)}
                    className="max-w-full max-h-full object-contain shadow-sm transition-all duration-300"
                    style={{
                      transform: isZoomed ? `scale(2)` : 'scale(1)',
                      transformOrigin: isZoomed ? `${zoomPosition.x}% ${zoomPosition.y}%` : 'center',
                      transition: 'transform 0.3s ease-out',
                      borderRadius: isMdAndDown ? '0' : '8px',
                      userSelect: 'none',
                      WebkitUserSelect: 'none'
                    }}
                    loading="eager"
                    draggable={false}
                  />
                  {!isZoomed && !isMdAndDown && (
                    <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-full shadow-lg flex items-center gap-2 z-20">
                      <ZoomIn size={16} className="text-gray-700" />
                      <span className="text-xs text-gray-700 font-medium">Click to zoom</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
          
          {/* Project details sidebar - responsive with mobile toggle */}
          <div 
            className="bg-white overflow-y-auto flex-shrink-0 overscroll-contain modal-content-scroll"
            style={{ 
              width: isMdAndDown ? '100%' : '35%',
              minWidth: isMdAndDown ? 'auto' : '320px',
              maxWidth: isMdAndDown ? '100%' : '420px',
              padding: isMdAndDown ? '1.5rem' : '2rem',
              overflowY: 'auto', 
              WebkitOverflowScrolling: 'touch',
              maxHeight: isMdAndDown ? '40vh' : 'none',
              borderTop: isMdAndDown ? '1px solid #e5e7eb' : 'none'
            }}
          >
            {/* Mobile swipe indicator */}
            {isMdAndDown && (
              <div className="flex justify-center mb-3">
                <div className="w-12 h-1 bg-gray-300 rounded-full"></div>
              </div>
            )}
            <h2 
              className="font-semibold text-gray-900 mb-3"
              style={{
                fontSize: isMdAndDown ? '1.25rem' : '1.5rem',
                lineHeight: '1.3'
              }}
            >
              {project.title}
            </h2>
            
            {project.client && (
              <div className="mb-3">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Client</h3>
                <p className="text-gray-900 text-sm">{project.client}</p>
              </div>
            )}
            
            {project.description && (
              <div className="mb-4">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">About</h3>
                <p className="text-gray-700 text-sm leading-relaxed">{project.description}</p>
              </div>
            )}
            
            <div className="mb-3">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Category</h3>
              <div className="flex flex-wrap gap-2">
                <span className="bg-[#FBD1D9]/30 text-[rgb(251,108,133)] text-xs font-medium px-3 py-1.5 rounded-full">
                  {project.category}
                </span>
                {project.subcategory && (
                  <span className="bg-gray-100 text-gray-700 text-xs font-medium px-3 py-1.5 rounded-full">
                    {project.subcategory}
                  </span>
                )}
              </div>
            </div>
            
            {project.tools && project.tools.length > 0 && (
              <div className="mb-3">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Tools Used</h3>
                <div className="flex flex-wrap gap-1.5">
                  {project.tools.map(tool => (
                    <span 
                      key={tool}
                      className="bg-gray-100 text-gray-700 text-xs font-medium px-2.5 py-1 rounded-md"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {project.date && (
              <div className="mb-4">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Date</h3>
                <p className="text-gray-700 text-sm">{project.date}</p>
              </div>
            )}
            
            {/* Image/asset navigation thumbnails */}
            {project.assets.length > 1 && (
              <div className="mt-5 pt-4 border-t border-gray-100">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
                  {project.type === 'video' ? 'Videos' : 'Gallery'} ({project.assets.length})
                </h3>
                <div 
                  className="grid gap-2"
                  style={{
                    gridTemplateColumns: isMdAndDown ? 'repeat(auto-fill, minmax(70px, 1fr))' : 'repeat(4, 1fr)'
                  }}
                >
                  {project.assets.map((asset, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentIndex(idx)}
                      className={`rounded-lg overflow-hidden aspect-square relative transition-all duration-200 ${
                        idx === currentIndex 
                          ? 'ring-3 ring-[rgb(251,108,133)] shadow-lg scale-105' 
                          : 'ring-1 ring-pink-100 hover:ring-2 hover:ring-[rgb(251,108,133)]/40 active:scale-95'
                      }`}
                      style={{
                        touchAction: 'manipulation',
                        outline: 'none'
                      }}
                      aria-label={`View ${project.type === 'video' ? 'video' : 'image'} ${idx + 1}`}
                    >
                      <img 
                        src={isVideoAsset(asset) ? project.thumbnail : asset}
                        alt={`Thumbnail ${idx + 1}`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        draggable={false}
                      />
                      {isVideoAsset(asset) && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                          <div className="bg-white/90 backdrop-blur-sm rounded-full p-1.5">
                            <Play className="w-3 h-3 text-gray-800" fill="currentColor" />
                          </div>
                        </div>
                      )}
                      {idx === currentIndex && (
                        <div className="absolute inset-0 border-2 border-white rounded-lg pointer-events-none"></div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
