import { motion } from "framer-motion";
import { useState } from "react";
import { Play, Image as ImageIcon, Package, CreditCard, Coffee, Shirt } from "lucide-react";

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

  // Calculate a delay based on the index for staggered animations
  const animationDelay = 0.1 + (index % 8) * 0.05;
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: animationDelay }}
      viewport={{ once: true }}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onClick(project);
      }}
      className={`project-card group cursor-pointer relative overflow-hidden rounded-lg bg-white shadow hover:shadow-lg transition-all duration-300 ${project.type === 'video' ? 'mb-6' : ''}`}
      style={style}
    >
      {/* Project thumbnail with hover effect */}
      <div className="relative aspect-[5/4] overflow-hidden bg-gray-100">
        {/* Type indicator badge */}
        <div className="absolute top-3 left-3 z-10 bg-white/90 backdrop-blur-sm px-2.5 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
          <div className="text-gray-800">
            {renderTypeIcon()}
          </div>
          <span className="text-xs font-medium text-gray-700 capitalize">{project.type}</span>
        </div>

        {/* Category pill - small and subtle */}
        <div className="absolute bottom-3 right-3 z-10 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm">
          <span className="text-white text-xs font-medium">{project.subcategory || project.category}</span>
        </div>

        {/* Play button for videos - only show for non-video thumbnails */}
        {project.type === 'video' && !isVideo(project.thumbnail) && (
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
              <Play className="w-6 h-6 text-[#fb6c85] ml-0.5" />
            </div>
          </div>
        )}

        {/* Main thumbnail - improved rendering */}
        {isVideo(project.thumbnail) ? (
          <div className="w-full h-full">
            <video
              src={project.thumbnail}
              className="w-full h-full object-cover"
              muted
              playsInline
              preload="metadata"
              onLoadStart={() => {
                // For video thumbnails, try to get a frame
                getThumbnailFromVideo(project.thumbnail);
              }}
              onError={() => setImageError(true)}
            />
            {/* Video play overlay */}
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
                <Play className="w-6 h-6 text-[#fb6c85] ml-0.5" />
              </div>
            </div>
          </div>
        ) : (
          <img
            src={project.thumbnail}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
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

        {/* Fallback for failed images */}
        {imageError && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-400">
            <div className="text-center">
              <ImageIcon className="w-10 h-10 mx-auto mb-2" />
              <p className="text-sm">{project.title}</p>
            </div>
          </div>
        )}

        {/* Subtle hover overlay with gradient - only for images */}
        {!isVideo(project.thumbnail) && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-30 group-hover:opacity-60 transition-opacity duration-300"></div>
        )}
      </div>

      {/* Project info - enhanced layout */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-800 group-hover:text-[rgb(251,108,133)] transition-colors duration-300 text-base mb-1.5 line-clamp-1">
          {project.title}
        </h3>
        
        <div className="flex items-center justify-between">
          {project.client ? (
            <p className="text-sm text-gray-600">
              {project.client}
            </p>
          ) : (
            <span className="text-sm text-gray-600">&nbsp;</span>
          )}
          
          {project.date && (
            <p className="text-xs text-gray-500 font-medium">
              {project.date}
            </p>
          )}
        </div>

        {/* Tools tags - smaller and more elegant */}
        {project.tools && project.tools.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {project.tools.slice(0, 1).map((tool) => (
              <span 
                key={tool} 
                className="bg-gray-100 text-gray-600 text-[10px] px-2 py-0.5 rounded"
              >
                {tool}
              </span>
            ))}
            {project.tools.length > 1 && (
              <span className="bg-gray-100 text-gray-500 text-[10px] px-1.5 py-0.5 rounded">
                +{project.tools.length - 1}
              </span>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}
