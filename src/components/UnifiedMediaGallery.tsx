import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface MediaItem {
  src: string;
  type: 'image' | 'video';
  alt?: string;
}

interface UnifiedMediaGalleryProps {
  media: MediaItem[];
  title?: string;
  projectType?: 'logo' | 'image' | 'video' | 'packaging' | 'apparel' | 'card' | 'default';
  isMobile?: boolean;
}

/**
 * Unified Media Gallery Component
 * 
 * Renders images and videos in a Behance-style seamless vertical layout
 * - Mobile: Stacked vertically with smooth scrolling
 * - Desktop: Maintains grid/full-width layout with no gaps
 * - Supports lazy loading and smooth animations
 */
export default function UnifiedMediaGallery({
  media,
  title = 'Project Gallery',
  projectType = 'default',
  isMobile = false,
}: UnifiedMediaGalleryProps) {
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const [videoErrorStates, setVideoErrorStates] = useState<Map<string, boolean>>(new Map());

  const isVideoAsset = (url: string) => {
    const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov'];
    return videoExtensions.some(ext => url.toLowerCase().endsWith(ext));
  };

  // Generate a low-quality blurred placeholder for Cloudinary images
  const getBlurPlaceholder = (src: string): string => {
    // Only apply to Cloudinary URLs
    if (!src.includes('cloudinary.com')) {
      return src;
    }
    
    // Insert blur transformation into Cloudinary URL
    // e.g., .../upload/... becomes .../upload/e_blur:2000,q_auto:low,w_100/...
    return src.replace('/upload/', '/upload/e_blur:2000,q_auto:low,w_100/');
  };

  const handleImageLoad = (src: string) => {
    setLoadedImages(prev => new Set([...prev, src]));
  };

  const handleVideoError = (src: string) => {
    setVideoErrorStates(prev => new Map([...prev, [src, true]]));
  };

  if (!media || media.length === 0) {
    return null;
  }

  // Determine padding based on project type
  const getPadding = (): string => {
    if (projectType === 'logo') {
      return isMobile ? 'p-6 md:p-12 lg:p-16' : 'p-8 md:p-12 lg:p-16';
    }
    return isMobile ? 'py-1 md:py-2' : 'py-2 md:py-4';
  };

  // Get max height for media
  const getMaxHeight = (): string => {
    return isMobile ? 'max-h-[50vh]' : 'max-h-[calc(90vh-300px)]';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
      className="gallery-container w-full"
    >
      {title && (
        <h3 className="gallery-title text-lg md:text-xl font-semibold text-gray-800 mb-4 md:mb-6 px-4 md:px-6 lg:px-8">
          {title}
        </h3>
      )}

      {/* Media Grid - Seamless vertical stack */}
      <div className="gallery-grid flex flex-col w-full bg-white gap-0">
        {media.map((item, index) => {
          const hasError = videoErrorStates.get(item.src);
          const isLoaded = loadedImages.has(item.src);
          const isVideo = isVideoAsset(item.src);

          return (
            <motion.div
              key={`${item.src}-${index}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className={`gallery-item w-full flex items-center justify-center bg-white ${getPadding()} relative`}
            >
              {/* Loading skeleton while media loads */}
              {!isLoaded && !isVideo && (
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded-lg" 
                     style={{ 
                       animation: 'shimmer 2s infinite linear',
                       minHeight: isMobile ? '200px' : '300px'
                     }} />
              )}

              {/* Image */}
              {!isVideo ? (
                <>
                  {/* Blur placeholder - loads instantly */}
                  {!isLoaded && item.src.includes('cloudinary.com') && (
                    <img
                      src={getBlurPlaceholder(item.src)}
                      alt=""
                      className={`w-auto h-auto max-w-full object-contain block mx-auto ${getMaxHeight()} absolute inset-0`}
                      style={{ filter: 'blur(20px)', transform: 'scale(1.1)' }}
                      loading="eager"
                    />
                  )}
                  
                  {/* Full quality image */}
                  <img
                    src={item.src}
                    alt={item.alt || `Gallery item ${index + 1}`}
                    onLoad={() => handleImageLoad(item.src)}
                    className={`w-auto h-auto max-w-full object-contain block mx-auto ${getMaxHeight()} transition-opacity duration-500 relative z-10 ${
                      isLoaded ? 'opacity-100' : 'opacity-0'
                    }`}
                    loading="lazy"
                    decoding="async"
                  />
                </>
              ) : (
                /* Video */
                !hasError ? (
                  <div className="relative w-full flex items-center justify-center">
                    {/* Video loading skeleton */}
                    {!isLoaded && (
                      <div className="absolute inset-0 w-full bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] rounded-lg flex items-center justify-center"
                           style={{ 
                             animation: 'shimmer 2s infinite linear',
                             minHeight: isMobile ? '200px' : '300px'
                           }}>
                        <div className="text-gray-400 text-sm">Loading video...</div>
                      </div>
                    )}
                    
                    <video
                      src={item.src}
                      className={`w-auto h-auto max-w-full object-contain block mx-auto ${getMaxHeight()} transition-opacity duration-500 relative z-10 ${
                        isLoaded ? 'opacity-100' : 'opacity-0'
                      }`}
                      controls
                      autoPlay={false}
                      loop
                      playsInline
                      preload="metadata"
                      onLoadedData={() => handleImageLoad(item.src)}
                      onError={() => handleVideoError(item.src)}
                      style={{
                        maxHeight: isMobile ? '50vh' : 'calc(90vh - 300px)',
                        maxWidth: '100%'
                      }}
                    />
                  </div>
                ) : (
                  /* Video Error Fallback */
                  <div className="w-full max-w-2xl h-64 md:h-96 bg-gray-100 rounded-lg flex items-center justify-center">
                    <p className="text-gray-500 text-sm md:text-base">
                      Unable to load video. Please try again or use a different browser.
                    </p>
                  </div>
                )
              )}
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
