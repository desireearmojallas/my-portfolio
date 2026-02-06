/**
 * Responsive Masonry Layout Utilities
 * Provides helper functions for managing responsive behavior in masonry layouts
 */

export const BREAKPOINTS = {
  mobile: 640,      // < 640px
  tablet: 960,      // 640px – 960px
  desktop: 1280,    // 960px – 1280px
  wide: 1536,       // > 1280px
} as const;

export const COLUMN_CONFIG = {
  mobile: 1,        // Mobile: 1 column
  tablet: 2,        // Tablet: 2 columns
  desktop: 3,       // Desktop: 3 columns
  wide: 4,          // Wide: 4 columns
  ultraWide: 5,     // Ultra-wide: 5 columns
} as const;

export const GAP_CONFIG = {
  mobile: 12,       // 12px gap on mobile
  tablet: 14,       // 14px gap on tablet
  desktop: 16,      // 16px gap on desktop
  wide: 18,         // 18px gap on wide screens
} as const;

export const MIN_HEIGHT_CONFIG = {
  mobile: 280,      // Minimum height on mobile
  tablet: 240,      // Minimum height on tablet
  desktop: 220,     // Minimum height on desktop (can be taller with aspect ratio)
  wide: 200,        // Minimum height on wide (can be taller with aspect ratio)
} as const;

/**
 * Get current breakpoint based on window width
 * @param width - Current window width
 * @returns Breakpoint name: 'mobile' | 'tablet' | 'desktop' | 'wide'
 */
export function getCurrentBreakpoint(width: number): 'mobile' | 'tablet' | 'desktop' | 'wide' {
  if (width < BREAKPOINTS.mobile) return 'mobile';
  if (width < BREAKPOINTS.tablet) return 'tablet';
  if (width < BREAKPOINTS.desktop) return 'desktop';
  return 'wide';
}

/**
 * Get number of columns for current breakpoint
 * @param breakpoint - Current breakpoint
 * @returns Number of columns
 */
export function getColumnCount(breakpoint: 'mobile' | 'tablet' | 'desktop' | 'wide'): number {
  const columnMap = {
    mobile: COLUMN_CONFIG.mobile,
    tablet: COLUMN_CONFIG.tablet,
    desktop: COLUMN_CONFIG.desktop,
    wide: COLUMN_CONFIG.wide,
  };
  return columnMap[breakpoint];
}

/**
 * Get gap size for current breakpoint
 * @param breakpoint - Current breakpoint
 * @returns Gap size in pixels
 */
export function getGapSize(breakpoint: 'mobile' | 'tablet' | 'desktop' | 'wide'): number {
  const gapMap = {
    mobile: GAP_CONFIG.mobile,
    tablet: GAP_CONFIG.tablet,
    desktop: GAP_CONFIG.desktop,
    wide: GAP_CONFIG.wide,
  };
  return gapMap[breakpoint];
}

/**
 * Get minimum height for current breakpoint
 * @param breakpoint - Current breakpoint
 * @returns Minimum height in pixels
 */
export function getMinHeight(breakpoint: 'mobile' | 'tablet' | 'desktop' | 'wide'): number {
  const heightMap = {
    mobile: MIN_HEIGHT_CONFIG.mobile,
    tablet: MIN_HEIGHT_CONFIG.tablet,
    desktop: MIN_HEIGHT_CONFIG.desktop,
    wide: MIN_HEIGHT_CONFIG.wide,
  };
  return heightMap[breakpoint];
}

/**
 * Calculate row span for grid items based on aspect ratio
 * Useful for complex masonry puzzles
 * @param aspectRatio - Item's aspect ratio (e.g., "16/9", "1/1")
 * @param columnWidth - Width of one column in pixels
 * @param minRowHeight - Minimum row height in pixels
 * @returns Number of rows the item should span
 */
export function calculateRowSpan(
  aspectRatio: string,
  columnWidth: number,
  minRowHeight: number
): number {
  try {
    const [width, height] = aspectRatio.split('/').map(Number);
    const itemHeight = (columnWidth * height) / width;
    return Math.ceil(itemHeight / minRowHeight);
  } catch {
    return 1; // Default to 1 row if calculation fails
  }
}

/**
 * Calculate actual grid item properties based on responsive state
 * @param width - Current window width
 * @param isLandscape - Whether item is marked as landscape
 * @param isFeatured - Whether item is marked as featured
 * @returns Object with grid spanning and sizing properties
 */
export function getGridItemProperties(
  width: number,
  isLandscape: boolean,
  isFeatured: boolean
) {
  const breakpoint = getCurrentBreakpoint(width);
  const columns = getColumnCount(breakpoint);

  return {
    breakpoint,
    columns,
    gap: getGapSize(breakpoint),
    minHeight: getMinHeight(breakpoint),
    gridColumn: {
      mobile: 1,
      tablet: isLandscape || isFeatured ? 2 : 1,
      desktop: isLandscape ? 2 : isFeatured ? 2 : 1,
      wide: isLandscape ? 2 : isFeatured ? 2 : 1,
    }[breakpoint],
  };
}

/**
 * Get CSS class modifiers based on item properties
 * @param isLandscape - Whether item is landscape
 * @param isFeatured - Whether item is featured
 * @param aspectRatio - Item's aspect ratio
 * @returns String of CSS classes to apply
 */
export function getProjectClasses(
  isLandscape: boolean = false,
  isFeatured: boolean = false,
  aspectRatio?: string
): string {
  const classes: string[] = ['project'];

  if (isLandscape) classes.push('landscape');
  if (isFeatured) classes.push('featured');

  // Add aspect ratio classes
  if (aspectRatio) {
    if (aspectRatio === '1/1') classes.push('aspect-square');
    else if (aspectRatio === '16/9') classes.push('aspect-landscape');
    else if (aspectRatio === '9/16') classes.push('aspect-portrait');
    else if (aspectRatio === '3.5/2') classes.push('aspect-card');
  }

  return classes.join(' ');
}

export default {
  BREAKPOINTS,
  COLUMN_CONFIG,
  GAP_CONFIG,
  MIN_HEIGHT_CONFIG,
  getCurrentBreakpoint,
  getColumnCount,
  getGapSize,
  getMinHeight,
  calculateRowSpan,
  getGridItemProperties,
  getProjectClasses,
};
