// Responsive utility functions

/**
 * Creates a responsive font size based on screen size
 * @param baseSize Base font size (typically for desktop)
 * @param mobileSize Font size for mobile
 * @returns CSS string with clamp function
 */
export const responsiveFontSize = (baseSize: number, mobileSize: number): string => {
  return `clamp(${mobileSize}rem, ${mobileSize}rem + ${baseSize - mobileSize}vw, ${baseSize}rem)`;
};

/**
 * Creates a responsive spacing value based on screen size
 * @param baseSize Base spacing size (typically for desktop)
 * @param mobileSize Spacing size for mobile
 * @returns CSS string with clamp function
 */
export const responsiveSpacing = (baseSize: number, mobileSize: number): string => {
  return `clamp(${mobileSize}rem, ${mobileSize}rem + ${baseSize - mobileSize}vw, ${baseSize}rem)`;
};

/**
 * Utility to format class names conditionally
 * Filters out falsy values and joins the remaining ones with spaces
 * @param classes Array of class names (can include conditional expressions that evaluate to falsy)
 * @returns String of class names
 */
export const cn = (...classes: (string | boolean | undefined)[]): string => {
  return classes.filter(Boolean).join(' ');
};

export default {
  responsiveFontSize,
  responsiveSpacing,
  cn
};
