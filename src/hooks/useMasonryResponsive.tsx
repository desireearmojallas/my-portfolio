import { useState, useEffect, useCallback, useRef } from 'react';
import {
  BREAKPOINTS,
  getCurrentBreakpoint,
  getColumnCount,
  getGapSize,
  getMinHeight,
  type COLUMN_CONFIG,
} from '../utils/masonryLayout';

interface UseMasonryResponsiveReturn {
  breakpoint: 'mobile' | 'tablet' | 'desktop' | 'wide';
  columns: number;
  gap: number;
  minHeight: number;
  windowWidth: number;
}

/**
 * Custom hook for managing responsive masonry layout
 * Handles window resize detection with debouncing and provides responsive values
 * 
 * @param debounceMs - Debounce delay for resize events (default: 150ms)
 * @returns Object with current breakpoint and layout values
 * 
 * @example
 * const { breakpoint, columns, gap } = useMasonryResponsive();
 * console.log(`Using ${columns} columns on ${breakpoint}`);
 */
export function useMasonryResponsive(debounceMs: number = 150): UseMasonryResponsiveReturn {
  const [windowWidth, setWindowWidth] = useState<number>(() => {
    // Initialize with current window width on SSR-safe manner
    if (typeof window !== 'undefined') {
      return window.innerWidth;
    }
    return 1024; // Default fallback
  });

  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  // Responsive calculation based on window width
  const breakpoint = getCurrentBreakpoint(windowWidth);
  const columns = getColumnCount(breakpoint);
  const gap = getGapSize(breakpoint);
  const minHeight = getMinHeight(breakpoint);

  // Handle window resize with debouncing
  const handleResize = useCallback(() => {
    if (typeof window === 'undefined') return;

    // Clear existing timer
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    // Set new timer for debounced resize
    debounceTimer.current = setTimeout(() => {
      setWindowWidth(window.innerWidth);
    }, debounceMs);
  }, [debounceMs]);

  useEffect(() => {
    // Initial setup
    setWindowWidth(window.innerWidth);

    // Add resize listener
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, [handleResize]);

  return {
    breakpoint,
    columns,
    gap,
    minHeight,
    windowWidth,
  };
}

export default useMasonryResponsive;
