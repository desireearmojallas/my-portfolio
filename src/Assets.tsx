import { useEffect, useState } from 'react';

// Define Asset types
export interface FolderAssets {
  [fileName: string]: string;
}

export interface Assets {
  // Top-level files like react.svg
  [key: string]: string | FolderAssets;
}

// Asset loading states
export interface AssetLoadingState {
  loading: boolean;
  error: boolean;
  progress: number;
}

// List of asset folders in src/assets
const assetFolders = [
  'resume',
];

// Local placeholder for missing assets
const placeholderUrl = '/src/assets/des-favicon.png';

// Cache for storing imported assets to avoid re-imports
const assetCache: Record<string, string> = {};

// Helper to get local asset URLs with error handling
function getAssetPath(folder: string | null, file: string): string {
  try {
    if (folder) {
      return `/src/assets/${folder}/${file}`;
    }
    return `/src/assets/${file}`;
  } catch (error) {
    console.error(`Error getting asset path for ${folder}/${file}:`, error);
    return placeholderUrl;
  }
}

// Helper to generate folder assets - this simulates the Firebase structure but with local files
async function fetchFolderAssets(folder: string): Promise<FolderAssets> {
  try {
    const folderAssets: FolderAssets = {};
    
    // Map all the actual files from the assets folders
    switch(folder) {
      case 'resume':
        // Resume files
        folderAssets['Armojallas, Desiree P. (2025) Resume.docx.pdf'] = getAssetPath(folder, 'Armojallas, Desiree P. (2025) Resume.docx.pdf');
        folderAssets['Armojallas, Desiree P. (2025) Resume.pdf'] = getAssetPath(folder, 'Armojallas, Desiree P. (2025) Resume.pdf');
        break;
        
      default:
        // For folders without specific handling, we'll return an empty object
        break;
    }
    
    return folderAssets;
  } catch (error) {
    console.error(`Failed to fetch folder: ${folder}`, error);
    return {};
  }
}

// Fetch all assets and return an object matching the old structure
export async function fetchAllAssets(
  onProgress?: (progress: number) => void
): Promise<Assets> {
  const assetObj: Assets = {};
  const totalItems = assetFolders.length + 4; // 4 top-level files
  let loadedItems = 0;
  
  // Function to update progress
  const updateProgress = () => {
    loadedItems++;
    const progress = Math.round((loadedItems / totalItems) * 100);
    if (onProgress) onProgress(progress);
  };
  
  // Top-level files (e.g. react.svg, des-favicon.png, behance.svg, des-formal-pic.jpg)
  const topLevelFiles = ['react.svg', 'des-favicon.png', 'behance.svg', 'des-formal-pic.jpg'];
  for (const file of topLevelFiles) {
    try {
      const cacheKey = file;
      
      // Check cache first
      if (assetCache[cacheKey]) {
        assetObj[file] = assetCache[cacheKey];
      } else {
        // Get path to local asset
        const url = getAssetPath(null, file);
        assetObj[file] = url;
        assetCache[cacheKey] = url;
      }
    } catch (error) {
      console.warn(`Failed to load top-level asset: ${file}`, error);
      assetObj[file] = placeholderUrl;
    }
    updateProgress();
  }
  
  // Folders
  for (const folder of assetFolders) {
    try {
      assetObj[folder] = await fetchFolderAssets(folder);
    } catch (error) {
      console.warn(`Failed to load folder: ${folder}`, error);
      assetObj[folder] = {};
    }
    updateProgress();
  }
  
  return assetObj;
}

// React hook to use assets in components
export function useAssets() {
  const [assets, setAssets] = useState<Assets | null>(null);
  const [loadingState, setLoadingState] = useState<AssetLoadingState>({
    loading: true,
    error: false,
    progress: 0
  });

  useEffect(() => {
    let isMounted = true;
    
    const loadAssets = async () => {
      try {
        setLoadingState(prev => ({ ...prev, loading: true, error: false }));
        
        const assetsData = await fetchAllAssets((progress) => {
          if (isMounted) {
            setLoadingState(prev => ({ ...prev, progress }));
          }
        });
        
        if (isMounted) {
          setAssets(assetsData);
          setLoadingState({ loading: false, error: false, progress: 100 });
        }
      } catch (error) {
        console.error("Failed to load assets:", error);
        if (isMounted) {
          setLoadingState({ loading: false, error: true, progress: 0 });
        }
      }
    };

    loadAssets();
    
    return () => {
      isMounted = false;
    };
  }, []);

  return { assets, loadingState };
}

// Helper function to get an asset URL by path (e.g. "resume/myfile.pdf")
export function getAssetUrl(
  assets: Assets | null, 
  path: string,
  fallbackUrl: string = placeholderUrl
): string {
  if (!assets) return fallbackUrl;
  
  // Handle empty paths
  if (!path) return fallbackUrl;
  
  const [folder, file] = path.includes('/') ? path.split('/', 2) : [null, path];
  
  if (!folder) {
    // Top-level file
    const asset = assets[file];
    return typeof asset === 'string' ? asset : fallbackUrl;
  }
  
  // File in a folder
  const folderAssets = assets[folder];
  if (!folderAssets || typeof folderAssets === 'string') {
    return fallbackUrl;
  }
  
  return folderAssets[file] || fallbackUrl;
}

// Helper to preload a specific asset (useful for important assets)
export async function preloadAsset(path: string): Promise<string> {
  try {
    // Check if already in cache
    if (assetCache[path]) return assetCache[path];
    
    // Split path into folder/file if needed
    const [folder, file] = path.includes('/') ? path.split('/', 2) : [null, path];
    
    // Get local asset path
    const url = folder ? getAssetPath(folder, file) : getAssetPath(null, path);
    assetCache[path] = url;
    return url;
  } catch (error) {
    console.error(`Failed to preload asset: ${path}`, error);
    return placeholderUrl;
  }
}
