# Responsive Masonry Layout System

## ✅ Checklist Completion Status

### Structure
- ✅ **Container class**: All project items are wrapped in a container with class `.projects`
- ✅ **Item class**: Each project item has a consistent class `.project`
- ✅ **Modifier classes**: Items support `.landscape` and `.featured` modifiers

### CSS Layout
- ✅ **CSS Grid**: Uses `grid-auto-flow: dense` for optimal packing
- ✅ **CSS Grid**: Uses `grid-auto-rows: auto` for flexible item heights
- ✅ **Responsive breakpoints implemented**:
  - Mobile (<640px): 1 column
  - Tablet (640–960px): 2 columns
  - Desktop (960–1280px): 3 columns
  - Wide (>1280px): 4+ columns

### Responsiveness
- ✅ **Media queries**: Adjust column count and grid spanning based on breakpoint
- ✅ **Image/video scaling**: Scale to fit container width with `object-fit: cover`
- ✅ **Smooth transitions**: CSS transitions on resize with debounced updates

### Enhancements
- ✅ **Row span calculation**: `calculateRowSpan()` utility for perfect puzzle-fit layouts
- ✅ **Smooth transitions**: Framer Motion animations with staggered delays
- ✅ **Responsive utilities**: `masonryLayout.ts` helpers for dynamic calculations
- ✅ **Custom hook**: `useMasonryResponsive()` for responsive state management
- ✅ **Debounced resize**: 150ms debounce on window resize events

---

## File Structure

```
src/
├── components/
│   ├── GraphicMasonryGallery.tsx      (Main gallery component)
│   └── MasonryLayout.css               (Responsive masonry styles)
├── hooks/
│   └── useMasonryResponsive.tsx        (Custom responsive hook)
└── utils/
    └── masonryLayout.ts                (Responsive utilities)
```

---

## Component Usage

### Basic Implementation

```tsx
import GraphicMasonryGallery from './components/GraphicMasonryGallery';

export default function ProjectsPage() {
  return (
    <div>
      <h1>My Projects</h1>
      <GraphicMasonryGallery />
    </div>
  );
}
```

### Custom Styling

Add custom className to the component:

```tsx
<GraphicMasonryGallery className="custom-gallery-class" />
```

---

## CSS Classes Reference

### Container Class
```css
.projects {
  display: grid;
  grid-auto-flow: dense;
  gap: 16px;
  /* Responsive via media queries */
}
```

### Item Classes
```css
.project {}                    /* Base item */
.project.landscape {}          /* Spans 2 columns */
.project.featured {}           /* Spans 2 columns */
.project.aspect-square {}      /* Aspect ratio 1:1 */
.project.aspect-landscape {}   /* Aspect ratio 16:9 */
.project.aspect-portrait {}    /* Aspect ratio 9:16 */
.project.aspect-card {}        /* Aspect ratio 3.5:2 */
```

---

## Responsive Breakpoints

### Mobile (<640px)
- **Columns**: 1
- **Gap**: 12px
- **Min Height**: 280px

### Tablet (640–960px)
- **Columns**: 2
- **Gap**: 14px
- **Min Height**: 240px
- **Landscape items**: Span 2 columns

### Desktop (960–1280px)
- **Columns**: 3
- **Gap**: 16px
- **Min Height**: 220px
- **Landscape items**: Span 2 columns
- **Featured items**: Span 2 columns

### Wide (>1280px)
- **Columns**: 4+
- **Gap**: 18px
- **Min Height**: 200px
- **Landscape items**: Span 2 columns
- **Featured items**: Span 2 columns

---

## Hook Usage: `useMasonryResponsive`

```tsx
import { useMasonryResponsive } from '../hooks/useMasonryResponsive';

function MyComponent() {
  const { breakpoint, columns, gap, minHeight, windowWidth } = useMasonryResponsive();

  return (
    <div>
      <p>Current breakpoint: {breakpoint}</p>
      <p>Columns: {columns}</p>
      <p>Gap: {gap}px</p>
      <p>Window width: {windowWidth}px</p>
    </div>
  );
}
```

### Return Values
- `breakpoint`: Current breakpoint name ('mobile' | 'tablet' | 'desktop' | 'wide')
- `columns`: Number of columns for current breakpoint
- `gap`: Gap size in pixels
- `minHeight`: Minimum item height in pixels
- `windowWidth`: Current window width in pixels

---

## Utility Functions

### `masonryLayout.ts` Utilities

#### `getCurrentBreakpoint(width: number)`
Get the current breakpoint based on window width.

```tsx
import { getCurrentBreakpoint } from '../utils/masonryLayout';

const breakpoint = getCurrentBreakpoint(window.innerWidth);
// Returns: 'mobile' | 'tablet' | 'desktop' | 'wide'
```

#### `getColumnCount(breakpoint: string)`
Get the number of columns for a specific breakpoint.

```tsx
import { getColumnCount } from '../utils/masonryLayout';

const columns = getColumnCount('desktop');
// Returns: 3
```

#### `calculateRowSpan(aspectRatio: string, columnWidth: number, minRowHeight: number)`
Calculate how many rows an item should span based on its aspect ratio.

```tsx
import { calculateRowSpan } from '../utils/masonryLayout';

const rowSpan = calculateRowSpan('16/9', 300, 200);
// Returns: number of rows to span
```

#### `getGridItemProperties(width: number, isLandscape: boolean, isFeatured: boolean)`
Get all grid item properties for the current responsive state.

```tsx
import { getGridItemProperties } from '../utils/masonryLayout';

const props = getGridItemProperties(window.innerWidth, true, false);
// Returns: { breakpoint, columns, gap, minHeight, gridColumn }
```

#### `getProjectClasses(isLandscape: boolean, isFeatured: boolean, aspectRatio: string)`
Generate CSS class string for a project item.

```tsx
import { getProjectClasses } from '../utils/masonryLayout';

const classes = getProjectClasses(true, false, '16/9');
// Returns: "project landscape aspect-landscape"
```

---

## Data Structure

Each project item should follow this interface:

```tsx
interface GraphicProject {
  id: string;
  title: string;
  description: string;
  category?: string;
  subcategory?: string;
  type: 'video' | 'card' | 'logo' | 'packaging' | 'apparel';
  thumbnail: string;
  assets?: string[];
  date?: string;
  featured?: boolean;          // Spans 2 columns
  landscape?: boolean;         // Spans 2 columns, 16:9 ratio
  aspectRatio?: string;        // e.g., '16/9', '1/1', '9/16'
  client?: string;
  tools?: string[];
}
```

---

## Animations

### Built-in Animations
- **Fade In**: Items fade in on scroll with staggered delays
- **Hover Effect**: Items lift slightly on hover (transform: translateY(-4px))
- **Image Zoom**: Images zoom slightly on hover (scale: 1.03)
- **Smooth Transitions**: All state changes use smooth CSS transitions

### Customizing Animations

Edit animation delays in `MasonryLayout.css`:

```css
.project:nth-child(1) { animation-delay: 0s; }
.project:nth-child(2) { animation-delay: 0.08s; }
/* ... */
```

---

## Browser Support

- **Modern browsers**: Full support (Chrome, Firefox, Safari, Edge)
- **CSS Grid**: Required (IE 11 not supported)
- **gap property**: Required (IE 11 not supported)
- **CSS Media Queries**: Required

---

## Performance Optimization

1. **Debounced Resize**: Window resize events are debounced at 150ms
2. **Dense Grid Packing**: `grid-auto-flow: dense` optimizes layout efficiency
3. **Memoized Projects**: Projects array is memoized to prevent unnecessary recalculations
4. **Lazy Loading**: Consider implementing Intersection Observer for lazy-loading images

---

## Customization

### Change Breakpoint Values

Edit `src/utils/masonryLayout.ts`:

```tsx
export const BREAKPOINTS = {
  mobile: 640,
  tablet: 960,
  desktop: 1280,
  wide: 1536,
};
```

### Change Column Counts

Edit `src/utils/masonryLayout.ts`:

```tsx
export const COLUMN_CONFIG = {
  mobile: 1,
  tablet: 2,
  desktop: 3,
  wide: 4,
  ultraWide: 5,
};
```

### Change Gap Sizes

Edit both `src/utils/masonryLayout.ts` and `src/components/MasonryLayout.css`:

```tsx
// utils/masonryLayout.ts
export const GAP_CONFIG = {
  mobile: 12,
  tablet: 14,
  desktop: 16,
  wide: 18,
};
```

```css
/* MasonryLayout.css */
@media (max-width: 639px) {
  .projects {
    gap: 12px;
  }
}
```

---

## Troubleshooting

### Items not responsive to window resize
- Ensure `useMasonryResponsive()` hook is being used
- Check browser console for resize event logs
- Verify CSS media queries are being applied

### Landscape items not spanning 2 columns
- Add `.landscape` class to the project item
- In code: `className={project.landscape ? 'landscape' : ''}`
- Check that you're on tablet size or larger

### Images not filling container
- Add `object-fit: cover` to image styles
- Ensure images have a `src` attribute
- Check image aspect ratio

### Layout jumps on resize
- Increase debounce delay: `useMasonryResponsive(300)`
- Ensure fixed minimum heights are set
- Check for CSS conflicts with global styles

---

## Migration Guide

### From Old Layout System

If migrating from inline styles, update your component:

**Before:**
```tsx
style={{
  display: 'grid',
  gridTemplateColumns: `repeat(${columns}, 1fr)`,
  gap: '8px',
}}
```

**After:**
```tsx
className="projects"
```

---

## Testing

Test the layout at different breakpoints:

1. **Mobile (320px - 639px)**
   - Should show 1 column
   - No landscape spanning

2. **Tablet (640px - 959px)**
   - Should show 2 columns
   - Landscape items span 2 columns

3. **Desktop (960px - 1279px)**
   - Should show 3 columns
   - Landscape/featured items span 2 columns

4. **Wide (1280px+)**
   - Should show 4+ columns
   - Landscape/featured items span 2 columns

---

## Future Enhancements

- [ ] Virtual scrolling for large project lists
- [ ] Masonry column CSS alternative (fallback for browsers without grid)
- [ ] Animation presets (fade, slide, scale)
- [ ] Touch-optimized interactions
- [ ] Keyboard navigation support
- [ ] RTL (Right-to-Left) layout support
- [ ] Dynamic column count based on container width
