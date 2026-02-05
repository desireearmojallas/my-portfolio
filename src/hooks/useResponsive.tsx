import { useEffect, useState } from 'react';

type ScreenSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export function useResponsive() {
  // Initialize with current window size
  const getScreenSize = (): ScreenSize => {
    if (typeof window === 'undefined') return 'lg'; // Default for SSR
    
    const width = window.innerWidth;
    if (width < 480) return 'xs';
    if (width < 640) return 'sm';
    if (width < 768) return 'md';
    if (width < 1024) return 'lg';
    if (width < 1280) return 'xl';
    return '2xl';
  };

  const [screenSize, setScreenSize] = useState<ScreenSize>(getScreenSize());
  const [isMobile, setIsMobile] = useState<boolean>(
    typeof window !== 'undefined' && window.innerWidth < 768
  );

  useEffect(() => {
    const handleResize = () => {
      setScreenSize(getScreenSize());
      setIsMobile(window.innerWidth < 768);
    };

    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty array ensures effect is only run on mount and unmount

  return {
    screenSize,
    isMobile,
    isXs: screenSize === 'xs',
    isSm: screenSize === 'sm',
    isMd: screenSize === 'md',
    isLg: screenSize === 'lg',
    isXl: screenSize === 'xl',
    is2xl: screenSize === '2xl',
    isSmAndDown: ['xs', 'sm'].includes(screenSize),
    isMdAndDown: ['xs', 'sm', 'md'].includes(screenSize),
    isLgAndUp: ['lg', 'xl', '2xl'].includes(screenSize)
  };
}

// Breakpoint values for reference
export const breakpoints = {
  xs: 480,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536
};

export default useResponsive;
