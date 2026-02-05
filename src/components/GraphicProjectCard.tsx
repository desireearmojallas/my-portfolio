import { useState } from "react";
import { Play, Image as ImageIcon, Package, CreditCard, Coffee, Shirt } from "lucide-react";
import './GraphicProjectInteractions.css';

// Define the types of graphic projects we'll support
export type GraphicProjectType = 'video' | 'image' | 'logo' | 'card' | 'packaging' | 'apparel';

export interface GraphicProject {
  id: string;
  title: string;
  description?: string;
  category: string;
  subcategory?: string;
  type: GraphicProjectType;
  client?: string;
  tools?: string[];
  thumbnail: string;
  assets: string[]; // Can be images or videos
  date?: string;
}

interface GraphicProjectCardProps {
  project: GraphicProject;
  index: number;
  onClick: (project: GraphicProject) => void;
  style?: React.CSSProperties;
}

export default function GraphicProjectCard({ project, index, onClick, style }: GraphicProjectCardProps) {
  // Function to check if an asset is a video
  const isVideo = (url: string) => {
    return url.toLowerCase().endsWith('.mp4') || 
           url.toLowerCase().endsWith('.webm') || 
           url.toLowerCase().endsWith('.mov');
  };

  // Function to create optimized video thumbnails
  const getThumbnailFromVideo = (videoUrl: string) => {
    // If we've already processed this video, return the cached URL
    // This reduces network traffic and improves performance
    if (window.videoThumbnails && window.videoThumbnails[videoUrl]) {
      return window.videoThumbnails[videoUrl];
    }
    
    // Otherwise try to extract a frame (this is async but we return the original URL first)
    try {
      const video = document.createElement('video');
      video.preload = 'metadata';
      video.src = videoUrl;
      video.currentTime = 0.1; // Get frame at 0.1 seconds
      
      // After loaded, extract frame to canvas and cache it
      video.addEventListener('loadeddata', () => {
        try {
          const canvas = document.createElement('canvas');
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            const thumbnailUrl = canvas.toDataURL('image/jpeg', 0.8);
            
            // Cache it for future use
            if (!window.videoThumbnails) window.videoThumbnails = {};
            window.videoThumbnails[videoUrl] = thumbnailUrl;
          }
        } catch (e) {
          console.error('Failed to create video thumbnail:', e);
        }
      });
    } catch (e) {
      console.error('Error setting up video thumbnail:', e);
    }
    
    // Return original URL initially (will be replaced when thumb is ready)
    return videoUrl;
  };

  // Index is used for staggered animations in the inline style
  const [, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Function to render the appropriate icon based on project type
  const renderTypeIcon = () => {
    switch (project.type) {
      case 'video':
        return <Play className="w-4 h-4" />;
      case 'image':
        return <ImageIcon className="w-4 h-4" />;
      case 'logo':
        return <Coffee className="w-4 h-4" />;
      case 'card':
        return <CreditCard className="w-4 h-4" />;
      case 'packaging':
        return <Package className="w-4 h-4" />;
      case 'apparel':
        return <Shirt className="w-4 h-4" />;
      default:
        return <ImageIcon className="w-4 h-4" />;
    }
  };

  return (
    <div
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onClick(project);
      }}
      className={`project-card group cursor-pointer relative overflow-hidden rounded-xl bg-white shadow-md hover:shadow-xl transition-all duration-300 ${project.type === 'video' ? 'mb-4' : ''}`}
      style={{
        ...style,
        opacity: 0, 
        animation: `fadeInSimple 0.5s ease-out ${0.1 + (index % 6) * 0.05}s forwards`
      }}
    >
      {/* Project thumbnail with simplified hover effect */}
      <div className="relative aspect-[5/4] overflow-hidden bg-gray-50">
        {/* Type indicator badge - made responsive */}
        <div className="absolute top-2 sm:top-3 left-2 sm:left-3 z-10 bg-white/95 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full flex items-center gap-1 sm:gap-2 shadow-sm">
          <div className="text-[#fb6c85]">
            {renderTypeIcon()}
          </div>
          <span className="text-[10px] sm:text-xs font-medium text-gray-800 capitalize">{project.type}</span>
        </div>

        {/* Category pill - made responsive */}
        <div className="absolute bottom-2 sm:bottom-3 right-2 sm:right-3 z-10 bg-black/70 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full shadow-md">
          <span className="text-white text-[10px] sm:text-xs font-medium tracking-wide">{project.subcategory || project.category}</span>
        </div>

        {/* Play button for videos - simplified */}
        {project.type === 'video' && !isVideo(project.thumbnail) && (
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
            <div className="w-16 h-16 bg-white/95 rounded-full flex items-center justify-center shadow-md">
              <Play className="w-6 h-6 text-[#fb6c85] ml-0.5" />
            </div>
          </div>
        )}

        {/* Main thumbnail with improved rendering and hover effects */}
        {isVideo(project.thumbnail) ? (
          <div className="w-full h-full">
            <video
              src={project.thumbnail}
              className="w-full h-full object-cover scale-105"
              muted
              playsInline
              preload="metadata"
              onLoadStart={() => {
                // For video thumbnails, try to get a frame
                getThumbnailFromVideo(project.thumbnail);
              }}
              onError={() => setImageError(true)}
            />
            {/* Video play overlay - improved */}
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <div className="w-16 h-16 bg-white/95 rounded-full flex items-center justify-center shadow-lg transform transition-transform group-hover:scale-110">
                <Play className="w-6 h-6 text-[#fb6c85] ml-0.5" />
              </div>
            </div>
            
            {/* Enhanced video overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-60"></div>
          </div>
        ) : (
          <img
            src={project.thumbnail}
            alt={project.title}
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
            onError={() => {
              setImageError(true);
              // Fallback to placeholder if image fails to load
              console.error(`Failed to load image: ${project.thumbnail}`);
            }}
            style={{ 
              visibility: imageError ? 'hidden' : 'visible' 
            }}
          />
        )}

        {/* Fallback for failed images - enhanced */}
        {imageError && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-50 text-gray-400">
            <div className="text-center px-4">
              <ImageIcon className="w-12 h-12 mx-auto mb-2 opacity-60" />
              <p className="text-sm font-medium">{project.title}</p>
              <p className="text-xs mt-2">Image not available</p>
            </div>
          </div>
        )}

        {/* Enhanced hover overlay with gradient - only for images */}
        {!isVideo(project.thumbnail) && !imageError && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-80 transition-opacity duration-300"></div>
        )}
        
        {/* Hover info overlay - responsive */}
        <div className="absolute inset-0 flex flex-col justify-end p-3 sm:p-4 opacity-0 group-hover:opacity-100 transition-all duration-300 z-10">
          <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            <h3 className="text-base sm:text-lg font-bold text-white mb-0.5 sm:mb-1 line-clamp-1 sm:line-clamp-2 text-shadow-sm">
              {project.title}
            </h3>
            {project.description && (
              <p className="hidden xs:block text-xs sm:text-sm text-white/90 line-clamp-1 sm:line-clamp-2 mb-2 sm:mb-3">
                {project.description}
              </p>
            )}
            <button 
              className="bg-white text-gray-800 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium flex items-center space-x-1 hover:bg-[#fb6c85] hover:text-white transition-colors duration-300 shadow-lg"
            >
              View Details
            </button>
          </div>
        </div>
      </div>

      {/* Project info - responsive layout */}
      <div className="p-3 sm:p-4 md:p-5">
        <h3 className="font-semibold text-gray-800 group-hover:text-[#fb6c85] transition-colors duration-300 text-sm sm:text-base mb-1 sm:mb-1.5 line-clamp-1">
          {project.title}
        </h3>
        
        <div className="flex flex-col xs:flex-row xs:items-center xs:justify-between">
          {project.client ? (
            <p className="text-xs sm:text-sm text-gray-600 line-clamp-1">
              {project.client}
            </p>
          ) : (
            <span className="text-xs sm:text-sm text-gray-600">&nbsp;</span>
          )}
          
          {project.date && (
            <p className="text-[10px] xs:text-xs text-gray-500 font-medium mt-1 xs:mt-0">
              {project.date}
            </p>
          )}
        </div>

        {/* Tools tags - responsive design */}
        {project.tools && project.tools.length > 0 && (
          <div className="flex flex-wrap gap-1 sm:gap-1.5 mt-2 sm:mt-3">
            {/* On small screens show only 1 tool, on larger show 2 */}
            {project.tools.slice(0, window.innerWidth < 400 ? 1 : 2).map((tool) => (
              <span 
                key={tool} 
                className="bg-gray-100 text-gray-700 text-[10px] sm:text-xs px-2 sm:px-2.5 py-0.5 rounded-md"
              >
                {tool}
              </span>
            ))}
            {project.tools.length > (window.innerWidth < 400 ? 1 : 2) && (
              <span className="bg-[#fb6c85]/10 text-[#fb6c85] text-[10px] sm:text-xs px-2 sm:px-2.5 py-0.5 rounded-md font-medium">
                +{project.tools.length - (window.innerWidth < 400 ? 1 : 2)}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
