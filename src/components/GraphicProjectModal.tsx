import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Play, Pause, Volume2, VolumeX, ZoomIn } from "lucide-react";
import type { GraphicProject } from "./GraphicProjectCard";

interface GraphicProjectModalProps {
  project: GraphicProject | null;
  onClose: () => void;
  isClosing?: boolean;
}

export default function GraphicProjectModal({ project, onClose, isClosing = false }: GraphicProjectModalProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoLoading, setIsVideoLoading] = useState(true);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const videoRef = useRef<HTMLVideoElement>(null);
  const modalContentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  
  const navigateNext = useCallback(() => {
    if (project && currentIndex < project.assets.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  }, [project, currentIndex]);
  
  const navigatePrev = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  }, [currentIndex]);
  
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
        exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.3, ease: "easeInOut" } }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 z-[999] flex items-center justify-center p-4 md:p-6 bg-black/60 backdrop-blur-sm project-modal-overlay"
        style={{ overflow: 'hidden' }}
        onClick={handleClickOutside}
        data-state={isClosing ? 'closing' : 'open'}
      >
        {/* Close button - repositioned outside the modal content */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-50 bg-white/90 backdrop-blur-sm w-12 h-12 flex items-center justify-center rounded-full text-gray-800 hover:bg-white transition-colors shadow-xl"
          aria-label="Close modal"
        >
          <X className="w-6 h-6" />
        </button>
        
        {/* Modal content */}
        <motion.div 
          ref={modalContentRef}
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0, transition: { duration: 0.3, ease: "easeInOut" } }}
          transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          className="relative w-full max-w-6xl mx-auto bg-white rounded-xl overflow-hidden flex flex-col md:flex-row shadow-xl project-modal-content modal-layer"
          style={{ 
            maxHeight: 'calc(95vh - 2rem)',
            maxWidth: 'min(95vw, 1200px)',
            margin: 'auto',
            overflowY: 'auto',
            WebkitOverflowScrolling: 'touch'
          }}
          onClick={(e) => e.stopPropagation()}
          tabIndex={0} // Make it focusable
        >
          {/* Media display area */}
          <div className="flex-1 md:w-3/5 bg-gray-50 relative" style={{ minHeight: '300px', maxHeight: '70vh' }}>
            {/* Navigation arrows */}
            {project.assets.length > 1 && (
              <>
                <button
                  onClick={navigatePrev}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 w-10 h-10 rounded-full flex items-center justify-center text-gray-800 z-10 hover:bg-white transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={currentIndex === 0}
                  aria-label="Previous image"
                  title="Previous image"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={navigateNext}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 w-10 h-10 rounded-full flex items-center justify-center text-gray-800 z-10 hover:bg-white transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={currentIndex === project.assets.length - 1}
                  aria-label="Next image"
                  title="Next image"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}
            
            {/* Asset counter badge */}
            {project.assets.length > 1 && (
              <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full z-10 project-asset-counter">
                <span className="text-white text-xs font-medium">
                  {currentIndex + 1} / {project.assets.length}
                </span>
              </div>
            )}
            
            {/* Media container */}
            <div className="w-full h-full flex items-center justify-center p-4">
              {currentIsVideo ? (
                <div className="relative w-full h-full flex items-center justify-center" style={{ maxHeight: '65vh' }}>
                  {isVideoLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-100/30 backdrop-blur-sm z-10">
                      <div className="bg-white/90 px-4 py-2 rounded-lg shadow-lg flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-[#fb6c85] border-t-transparent rounded-full animate-spin"></div>
                        <span className="text-sm text-gray-700">Loading video...</span>
                      </div>
                    </div>
                  )}
                  <video
                    ref={videoRef}
                    src={currentAsset}
                    className="max-w-full max-h-full object-contain bg-black rounded-md"
                    controls={false}
                    loop
                    preload="metadata"
                    playsInline
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
                  
                  {/* Video controls */}
                  <div className="absolute bottom-4 right-4 flex items-center gap-2 z-10">
                    <button
                      onClick={toggleMute}
                      className="bg-white/80 w-8 h-8 rounded-full flex items-center justify-center shadow-md hover:bg-white transition-colors"
                      aria-label={isMuted ? "Unmute video" : "Mute video"}
                      title={isMuted ? "Unmute video" : "Mute video"}
                    >
                      {isMuted ? (
                        <VolumeX className="w-4 h-4 text-gray-800" />
                      ) : (
                        <Volume2 className="w-4 h-4 text-gray-800" />
                      )}
                    </button>
                    <button
                      onClick={togglePlayPause}
                      className="bg-white/80 w-10 h-10 rounded-full flex items-center justify-center shadow-md hover:bg-white transition-colors"
                      aria-label={isPlaying ? "Pause video" : "Play video"}
                      title={isPlaying ? "Pause video" : "Play video"}
                    >
                      {isPlaying ? (
                        <Pause className="w-5 h-5 text-gray-800" />
                      ) : (
                        <Play className="w-5 h-5 text-gray-800 ml-0.5" />
                      )}
                    </button>
                    <button
                      onClick={() => {
                        if (videoRef.current) {
                          // Toggle browser controls
                          videoRef.current.controls = !videoRef.current.controls;
                        }
                      }}
                      className="bg-white/80 w-8 h-8 rounded-full flex items-center justify-center shadow-md hover:bg-white transition-colors"
                      aria-label="Toggle browser controls"
                      title="Toggle browser controls"
                    >
                      <span className="text-xs font-bold text-gray-800">HD</span>
                    </button>
                  </div>
                </div>
              ) : (
                // Image display with zoom
                <div 
                  className="flex items-center justify-center max-h-[65vh] overflow-hidden relative"
                  style={{
                    cursor: isZoomed ? 'zoom-out' : 'zoom-in',
                  }}
                >
                  <motion.img 
                    ref={imageRef}
                    src={currentAsset}
                    alt={project.title}
                    onClick={(e: React.MouseEvent) => toggleZoom(e)}
                    className="max-w-full max-h-full object-contain rounded-md shadow-sm transition-all duration-300"
                    style={{
                      transform: isZoomed ? `scale(2)` : 'scale(1)',
                      transformOrigin: isZoomed ? `${zoomPosition.x}% ${zoomPosition.y}%` : 'center',
                      transition: 'transform 0.3s ease-out'
                    }}
                    loading="eager" // Load immediately to prevent visual jumps
                  />
                  {!isZoomed && (
                    <div className="zoom-indicator">
                      <ZoomIn size={20} />
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          
          {/* Project details sidebar - with smooth scrolling */}
          <div 
            className="w-full md:w-2/5 lg:w-80 bg-white p-6 overflow-y-auto md:max-h-[90vh] flex-shrink-0 overscroll-contain modal-content-scroll"
            style={{ 
              overflowY: 'auto', 
              WebkitOverflowScrolling: 'touch',
              maxHeight: 'calc(95vh - 2rem)'
            }}
          >
            <h2 className="text-2xl font-medium text-gray-900 mb-2">{project.title}</h2>
            
            {project.client && (
              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-500">Client</h3>
                <p className="text-gray-900">{project.client}</p>
              </div>
            )}
            
            {project.description && (
              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-500">About</h3>
                <p className="text-gray-700">{project.description}</p>
              </div>
            )}
            
            <div className="mb-4">
              <h3 className="text-sm font-medium text-gray-500">Category</h3>
              <div className="flex gap-2 mt-1">
                <span className="bg-[#FBD1D9]/20 text-[rgb(251,108,133)] text-sm px-3 py-1 rounded-full">
                  {project.category}
                </span>
                {project.subcategory && (
                  <span className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full">
                    {project.subcategory}
                  </span>
                )}
              </div>
            </div>
            
            {project.tools && project.tools.length > 0 && (
              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-500">Tools Used</h3>
                <div className="flex flex-wrap gap-2 mt-1">
                  {project.tools.map(tool => (
                    <span 
                      key={tool}
                      className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {project.date && (
              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-500">Date</h3>
                <p className="text-gray-700">{project.date}</p>
              </div>
            )}
            
            {/* Image/asset navigation thumbnails */}
            {project.assets.length > 1 && (
              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-500 mb-2">
                  {project.type === 'video' ? 'Videos' : 'Images'} ({project.assets.length})
                </h3>
                <div className="grid grid-cols-4 gap-2">
                  {project.assets.map((asset, idx) => (
                    <div 
                      key={idx}
                      onClick={() => setCurrentIndex(idx)}
                      className={`cursor-pointer rounded-md overflow-hidden aspect-square relative transition-all duration-200 ${
                        idx === currentIndex 
                          ? 'ring-2 ring-[rgb(251,108,133)] shadow-md scale-105 z-10' 
                          : 'hover:ring-2 hover:ring-gray-200'
                      }`}
                    >
                      <img 
                        src={isVideoAsset(asset) ? project.thumbnail : asset}
                        alt={`Thumbnail ${idx + 1}`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      {isVideoAsset(asset) && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                          <Play className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </div>
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
