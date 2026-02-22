# Background-Aware Favicon Switching

## Overview
The portfolio now automatically switches between light and dark favicons based on the navbar's background brightness.

## How It Works

1. **Brightness Detection**: Calculates the brightness of the navbar background using the relative luminance formula: `(299*R + 587*G + 114*B) / 1000`

2. **Threshold Logic**: 
   - If brightness < 128 → Uses white/light favicon (for dark backgrounds)
   - If brightness ≥ 128 → Uses black/dark favicon (for light backgrounds)

3. **Dynamic Updates**: Automatically updates on:
   - Page load
   - Window resize
   - Scroll events
   - Navbar style/class changes (via MutationObserver)

## Required Files

Place your two favicon versions in the `/public` folder:

- `/public/favicon-white.png` - White/light version (for dark backgrounds)
- `/public/favicon-black.png` - Black/dark version (for light backgrounds)

## File Naming Options

You can customize the file paths in `src/App.tsx`:

```typescript
useFaviconSwitcher({
  lightFavicon: '/favicon-white.png',  // Your light version path
  darkFavicon: '/favicon-black.png',   // Your dark version path
  brightnessThreshold: 128             // Adjust threshold if needed
});
```

## Recommended Favicon Specifications

- **Format**: PNG or ICO
- **Size**: 32x32px or 16x16px (or both)
- **Background**: Transparent
- **Design**: High contrast for visibility

## Testing

1. Open browser DevTools → Console
2. Look for log messages: `Favicon updated: brightness=X, using /favicon-Y.png`
3. Change screen size or scroll to see updates
4. Use browser's light/dark mode to test

## Customization

### Adjust Brightness Threshold

If the switching isn't working as expected, adjust the threshold:

```typescript
brightnessThreshold: 150  // Higher = switches to dark favicon more easily
```

### Disable Scroll Updates

If you only want updates on resize, modify the hook in `src/hooks/useFaviconSwitcher.tsx` by commenting out the scroll event listener.

## Current Implementation

- **Hook**: `src/hooks/useFaviconSwitcher.tsx`
- **Integration**: `src/App.tsx`
- **Target Element**: `<nav>` element in Header component
