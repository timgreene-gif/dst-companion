---
name: update-ui-styling
description: Updates visual styling, themes, layouts, and CSS in the DST Companion app. Use when the user wants to change colors, adjust spacing, modify component styles, improve visual hierarchy, fix layout issues, or enhance the theme system.
---

# Update UI Styling

This skill guides CSS and visual styling updates for the DST Companion app while maintaining the established design system.

## Design System Overview

The app uses a CSS variable-based design system with dark/light theme support.

### Core CSS Variables

Located in `:root` (around line 8-28):

```css
:root {
    /* Backgrounds */
    --bg-primary: #1a1a1a;      /* Page background */
    --bg-secondary: #2a2a2a;    /* Cards, header */
    --bg-tertiary: #3a3a3a;     /* Buttons, inputs */

    /* Text */
    --text-primary: #e8e8e8;    /* Main text */
    --text-secondary: #a0a0a0;  /* Secondary text */

    /* Accents */
    --accent-primary: #d4a44a;   /* Gold - primary highlights */
    --accent-secondary: #8b4513; /* Brown - secondary highlights */
    --accent-gradient: linear-gradient(135deg, #d4a44a, #8b4513);

    /* Stats */
    --health-color: #e74c3c;    /* Red for health */
    --hunger-color: #f39c12;    /* Orange for hunger */
    --sanity-color: #9b59b6;    /* Purple for sanity */

    /* Tiers */
    --tier-s: #ffd700;          /* Gold */
    --tier-a: #c0c0c0;          /* Silver */
    --tier-b: #cd7f32;          /* Bronze */

    /* Seasons */
    --season-autumn: #d35400;
    --season-winter: #3498db;
    --season-spring: #27ae60;
    --season-summer: #e74c3c;

    /* Layout */
    --border-radius: 8px;
}
```

### Light Theme Overrides

Located in `body.light-theme` (around line 31-60):

```css
body.light-theme {
    --bg-primary: #f5f5f5;
    --bg-secondary: #ffffff;
    --bg-tertiary: #e8e8e8;
    --text-primary: #1a1a1a;
    --text-secondary: #666666;
}
```

## Styling Principles

### 1. Always Use CSS Variables

**Correct:**
```css
.my-element {
    background: var(--bg-secondary);
    color: var(--text-primary);
}
```

**Incorrect:**
```css
.my-element {
    background: #2a2a2a;  /* Hard-coded - breaks light theme! */
    color: #e8e8e8;
}
```

### 2. Theme-Agnostic Styling

Both themes should work without additional theme-specific overrides when using variables correctly.

Only add light theme overrides for:
- Box shadows
- Special effects that look different in light mode
- Border colors that need adjustment

### 3. Responsive Design

Mobile breakpoint: `768px`

```css
@media (max-width: 768px) {
    .element {
        /* Mobile adjustments */
    }
}
```

## Common Styling Tasks

### Updating Colors

**Single color change:**
1. Identify which variable controls it
2. Update the variable value in `:root`
3. If needed, update in `body.light-theme`
4. Test both themes

**Adding new color:**
1. Add variable to `:root` with descriptive name
2. Add light theme override if needed
3. Document in comments if non-obvious

### Adjusting Card Styles

Card types and their classes:
- Recipe cards: `.recipe-card`
- Boss cards: `.boss-card`
- Character cards: `.character-card`
- Checklist cards: `.checklist-card`
- Season cards: `.season-card`
- Synergy cards: `.synergy-card`

**Common card properties:**
```css
.card-type {
    background: var(--bg-secondary);
    border-radius: var(--border-radius);
    padding: 1.2rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s, box-shadow 0.2s;
}

.card-type:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);
}
```

### Spacing and Layout

**Standard spacing scale:**
- `0.5rem` (8px) - Tight spacing
- `1rem` (16px) - Default spacing
- `1.5rem` (24px) - Section spacing
- `2rem` (32px) - Major section spacing

**Grid layouts:**
```css
.content-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1rem;
}
```

### Typography

**Heading sizes:**
- `h1`: Logo/title - `1.4rem`
- `h2`: Section titles - `1.8rem`
- `h3`: Card titles - `1.1rem`
- Body: Default `16px` base

**Font weights:**
- Normal: `400`
- Bold: `700`
- Nav tabs active: `bold`

### Buttons and Interactive Elements

**Button pattern:**
```css
.button {
    padding: 8px 14px;
    background: var(--bg-tertiary);
    border: none;
    border-radius: 6px;
    color: var(--text-secondary);
    cursor: pointer;
    transition: all 0.2s;
    font-size: 0.85rem;
}

.button:hover {
    background: var(--bg-secondary);
    color: var(--text-primary);
}

.button.active {
    background: var(--accent-primary);
    color: #1a1a1a;
}
```

### Animations and Transitions

**Standard transitions:**
- Hover effects: `0.2s`
- Color changes: `0.3s`
- Layout shifts: `0.3s`

**Common patterns:**
```css
transition: transform 0.2s, box-shadow 0.2s;
transition: all 0.3s;  /* For multiple properties */
```

## Layout Structure

### Header
```css
.header {
    position: sticky;
    top: 0;
    z-index: 100;
    padding: 1rem 2rem;
}
```

### Main Content
```css
.main-content {
    max-width: 1400px;
    margin: 0 auto;
    padding: 2rem;
}
```

### Navigation Tabs
```css
.nav-tabs {
    display: flex;
    gap: 6px;
    flex-wrap: wrap;
}
```

## Responsive Adjustments

### Mobile-First Considerations

1. **Touch targets**: Minimum `44px` height for buttons
2. **Font sizes**: Adjust for readability on small screens
3. **Grid columns**: Auto-fill pattern handles this
4. **Padding**: Reduce on mobile if needed

### Common Mobile Overrides

```css
@media (max-width: 768px) {
    .main-content {
        padding: 1rem;
    }

    .section-title {
        font-size: 1.5rem;
    }

    .nav-tabs {
        gap: 4px;
    }

    .nav-tab {
        padding: 8px 12px;
        font-size: 0.8rem;
    }
}
```

## Light Theme Compatibility

### Testing Checklist
- [ ] All text is readable in light theme
- [ ] Cards have appropriate contrast
- [ ] Borders are visible if needed
- [ ] Active states are clearly visible
- [ ] Shadows work in both themes

### Common Light Theme Issues

**Issue:** Dark shadows too harsh
```css
body.light-theme .card {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);  /* Lighter shadow */
}
```

**Issue:** Border not visible
```css
body.light-theme .element {
    border-color: #ccc;
}
```

## Performance Considerations

### Efficient CSS

**Good:**
```css
.card { /* Direct class selector */ }
.card-header { /* Flat structure */ }
```

**Avoid:**
```css
.section .container .wrapper .card { /* Deep nesting */ }
```

### Hardware Acceleration

For smooth animations:
```css
transform: translateY(-4px);  /* Uses GPU */
will-change: transform;       /* Hint to browser */
```

### Avoid Layout Thrashing

Don't animate properties that cause reflow:
- ❌ `width`, `height`, `top`, `left`
- ✅ `transform`, `opacity`

## Testing Process

1. **Visual inspection** in dark theme
2. **Toggle to light theme** - verify all elements
3. **Resize browser** - test responsive breakpoints
4. **Test interactions** - hover, click, active states
5. **Check performance** - smooth animations, no jank
6. **Validate contrast** - text readability
7. **Cross-browser test** - Chrome, Firefox, Safari

## Debugging Tips

### Browser DevTools

1. **Inspect element** - Check computed styles
2. **Toggle variables** - See which ones apply
3. **Mobile emulation** - Test responsive design
4. **Performance tab** - Check for layout issues

### Common Issues

**Colors not changing:**
- Check if CSS variable is used
- Verify variable name spelling
- Look for hard-coded colors

**Layout broken on mobile:**
- Check media query breakpoints
- Verify grid min-width values
- Test with DevTools device emulation

**Theme toggle not working:**
- Verify `body.light-theme` selectors
- Check JavaScript theme toggle logic
- Ensure variables are overridden properly

## Documentation

When making significant styling changes, consider adding comments:

```css
/* Updated card hover effect for better user feedback */
.card:hover {
    transform: translateY(-4px);
}
```
