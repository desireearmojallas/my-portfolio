import { useEffect, useCallback, useRef } from 'react';

interface PreloadOptions {
  priority?: 'high' | 'low' | 'auto';
  loading?: 'eager' | 'lazy';
}

/**
 * Custom hook to preload images and videos
 * Uses browser's native preloading with priority hints
 */
export function useImagePreloader() {
  const preloadedImages = useRef<Set<string>>(new Set());
  const preloadQueue = useRef<Map<string, HTMLImageElement | HTMLVideoElement>>(new Map());

  /**
   * Preload a single image or video
   */
  const preloadAsset = useCallback((url: string, options: PreloadOptions = {}) => {
    // Skip if already preloaded
    if (preloadedImages.current.has(url)) {
      return Promise.resolve();
    }

    // Check if it's a video
    const isVideo = url.match(/\.(mp4|webm|ogg|mov)$/i);

    return new Promise<void>((resolve, reject) => {
      if (isVideo) {
        // Preload video
        const video = document.createElement('video');
        video.preload = 'metadata'; // Load metadata without full video
        video.src = url;
        
        const onLoad = () => {
          preloadedImages.current.add(url);
          preloadQueue.current.set(url, video);
          cleanup();
          resolve();
        };
        
        const onError = () => {
          console.warn(`Failed to preload video: ${url}`);
          cleanup();
          reject(new Error(`Failed to preload video: ${url}`));
        };
        
        const cleanup = () => {
          video.removeEventListener('loadedmetadata', onLoad);
          video.removeEventListener('error', onError);
        };
        
        video.addEventListener('loadedmetadata', onLoad);
        video.addEventListener('error', onError);
      } else {
        // Preload image
        const img = new Image();
        
        // Set loading and fetchpriority attributes for better browser optimization
        if (options.loading) {
          img.loading = options.loading;
        }
        
        if (options.priority && 'fetchPriority' in img) {
          (img as any).fetchPriority = options.priority;
        }
        
        const onLoad = () => {
          preloadedImages.current.add(url);
          preloadQueue.current.set(url, img);
          cleanup();
          resolve();
        };
        
        const onError = () => {
          console.warn(`Failed to preload image: ${url}`);
          cleanup();
          reject(new Error(`Failed to preload image: ${url}`));
        };
        
        const cleanup = () => {
          img.removeEventListener('load', onLoad);
          img.removeEventListener('error', onError);
        };
        
        img.addEventListener('load', onLoad);
        img.addEventListener('error', onError);
        img.src = url;
      }
    });
  }, []);

  /**
   * Preload multiple assets
   */
  const preloadAssets = useCallback(async (urls: string[], options: PreloadOptions = {}) => {
    const promises = urls.map(url => 
      preloadAsset(url, options).catch(err => {
        // Log but don't fail the entire batch
        console.warn('Preload failed:', err);
      })
    );
    
    await Promise.all(promises);
  }, [preloadAsset]);

  /**
   * Preload assets with delay (for background preloading)
   */
  const preloadAssetsWithDelay = useCallback((urls: string[], delay: number = 1000) => {
    setTimeout(() => {
      preloadAssets(urls, { priority: 'low', loading: 'lazy' });
    }, delay);
  }, [preloadAssets]);

  /**
   * Check if an asset is preloaded
   */
  const isPreloaded = useCallback((url: string) => {
    return preloadedImages.current.has(url);
  }, []);

  /**
   * Clear preload cache (optional cleanup)
   */
  const clearCache = useCallback(() => {
    preloadedImages.current.clear();
    preloadQueue.current.clear();
  }, []);

  return {
    preloadAsset,
    preloadAssets,
    preloadAssetsWithDelay,
    isPreloaded,
    clearCache,
  };
}

/**
 * Hook to preload project assets on mount or interaction
 */
export function useProjectPreloader(projects: any[], options?: {
  preloadOnMount?: boolean;
  delay?: number;
}) {
  const { preloadAssets, preloadAssetsWithDelay } = useImagePreloader();

  useEffect(() => {
    if (!options?.preloadOnMount || !projects.length) return;

    // Collect all asset URLs from projects
    const allAssets: string[] = [];
    
    projects.forEach(project => {
      // Add thumbnail
      if (project.thumbnail) {
        allAssets.push(project.thumbnail);
      }
      
      // Add all assets
      if (project.assets && Array.isArray(project.assets)) {
        allAssets.push(...project.assets);
      }
    });

    // Preload with delay to not block initial page load
    if (options.delay !== undefined) {
      preloadAssetsWithDelay(allAssets, options.delay);
    } else {
      preloadAssets(allAssets, { priority: 'low' });
    }
  }, [projects, options?.preloadOnMount, options?.delay, preloadAssets, preloadAssetsWithDelay]);

  return { preloadAssets };
}
