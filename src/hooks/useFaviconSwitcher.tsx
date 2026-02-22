import { useEffect, useCallback } from 'react';

interface FaviconSwitcherOptions {
  lightFavicon?: string;
  darkFavicon?: string;
  brightnessThreshold?: number;
}

/**
 * Custom hook to switch favicon based on background brightness
 * Calculates the brightness of the navbar background and updates favicon accordingly
 */
export default function useFaviconSwitcher({
  lightFavicon = '/favicon-white.png',
  darkFavicon = '/favicon-black.png',
  brightnessThreshold = 128
}: FaviconSwitcherOptions = {}) {
  
  /**
   * Calculate brightness from RGB values using luminance formula
   * Formula: (299*R + 587*G + 114*B) / 1000
   * @param rgb - RGB values string like "rgb(255, 255, 255)" or "rgba(255, 255, 255, 0.75)"
   * @returns brightness value between 0-255
   */
  const calculateBrightness = useCallback((rgb: string): number => {
    // Extract RGB values from string
    const match = rgb.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
    if (!match) return 255; // Default to bright if parsing fails
    
    const r = parseInt(match[1]);
    const g = parseInt(match[2]);
    const b = parseInt(match[3]);
    
    // Calculate brightness using relative luminance formula
    return (299 * r + 587 * g + 114 * b) / 1000;
  }, []);

  /**
   * Update favicon based on background brightness
   */
  const updateFavicon = useCallback(() => {
    // Get the navbar element
    const navbar = document.querySelector('nav');
    if (!navbar) return;

    // Get computed background color
    const computedStyle = window.getComputedStyle(navbar);
    const backgroundColor = computedStyle.backgroundColor;
    
    // Calculate brightness
    const brightness = calculateBrightness(backgroundColor);
    
    // Determine which favicon to use
    const faviconPath = brightness < brightnessThreshold ? lightFavicon : darkFavicon;
    
    // Update favicon
    let link: HTMLLinkElement | null = document.querySelector("link[rel~='icon']");
    
    if (!link) {
      // Create link element if it doesn't exist
      link = document.createElement('link');
      link.rel = 'icon';
      document.head.appendChild(link);
    }
    
    // Only update if the path has changed
    if (link.href !== faviconPath) {
      link.href = faviconPath;
      console.log(`Favicon updated: brightness=${brightness.toFixed(0)}, using ${faviconPath}`);
    }
  }, [calculateBrightness, brightnessThreshold, lightFavicon, darkFavicon]);

  useEffect(() => {
    // Initial update
    updateFavicon();

    // Update on window resize
    const handleResize = () => {
      updateFavicon();
    };

    window.addEventListener('resize', handleResize);

    // Optional: Update on scroll for dynamic backgrounds
    const handleScroll = () => {
      updateFavicon();
    };

    window.addEventListener('scroll', handleScroll);

    // Create a MutationObserver to detect style changes on navbar
    const navbar = document.querySelector('nav');
    let observer: MutationObserver | null = null;
    
    if (navbar) {
      observer = new MutationObserver(() => {
        updateFavicon();
      });

      observer.observe(navbar, {
        attributes: true,
        attributeFilter: ['style', 'class'],
        subtree: false
      });
    }

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      if (observer) {
        observer.disconnect();
      }
    };
  }, [updateFavicon]);

  return { updateFavicon };
}
