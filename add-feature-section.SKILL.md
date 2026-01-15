---
name: add-feature-section
description: Adds new feature sections or tabs to the DST Companion app. Use when the user wants to add a new category of content, create a new tab in the navigation, or introduce entirely new functionality like mob information, season guides, or item databases.
---

# Add Feature Section

This skill guides adding new tabs and sections to the DST Companion single-file HTML application while maintaining consistency with existing architecture.

## Architecture Overview

The app follows a tab-based navigation pattern with three key components:

1. **Navigation button** - In the header `<nav class="nav-tabs">` section (around line 2265)
2. **Content section** - In the main content area with matching `data-tab` value (around line 2280)
3. **Tab switching logic** - JavaScript event listeners (around line 3526)

## Standard Implementation Pattern

### 1. Add Navigation Button

Location: Inside `<nav class="nav-tabs">` block

```html
<button class="nav-tab" data-tab="your-section-name">Display Name</button>
```

**Naming conventions:**
- `data-tab` value: lowercase with hyphens
- Display name: Title Case
- Place logically among existing tabs (group related content)

### 2. Create Content Section

Location: After existing sections, before the `<script>` tag

```html
<!-- Your Feature Section -->
<section id="your-section-name" class="section" data-tab="your-section-name">
    <h2 class="section-title">Feature Name</h2>

    <!-- Filters (if needed) -->
    <div class="filter-bar">
        <!-- Use existing filter-btn pattern -->
    </div>

    <!-- Search (if needed) -->
    <input type="text" class="search-box" placeholder="Search...">

    <!-- Content container -->
    <div class="content-grid">
        <!-- Your cards/content here -->
    </div>
</section>
```

### 3. Add Data Structure (if applicable)

Location: In `<script>` section after existing data arrays (around line 3500-5900)

```javascript
const yourFeatureData = [
    {
        name: 'Item Name',
        icon: '🎯',
        // Additional properties
    },
    // More items...
];
```

**Data conventions:**
- Use camelCase for variable names
- Sort items alphabetically by name
- Include `icon` property using emoji
- Add descriptive comments for complex structures

### 4. Implement Rendering Logic

Location: After data structures in `<script>` section

```javascript
// Render Your Feature
function renderYourFeature(dataToRender = yourFeatureData) {
    const container = document.querySelector('#your-section-name .content-grid');
    container.innerHTML = '';

    dataToRender.forEach(item => {
        const card = document.createElement('div');
        card.className = 'feature-card';  // Reuse existing card styles or create new
        card.innerHTML = `
            <div class="card-header">
                <span class="card-icon">${item.icon}</span>
                <h3>${item.name}</h3>
            </div>
            <div class="card-content">
                <!-- Your content here -->
            </div>
        `;
        container.appendChild(card);
    });
}

// Initial render
renderYourFeature();
```

### 5. Add Filter/Search Logic (if needed)

```javascript
// Search functionality
const searchBox = document.querySelector('#your-section-name .search-box');
searchBox?.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filtered = yourFeatureData.filter(item =>
        item.name.toLowerCase().includes(searchTerm)
    );
    renderYourFeature(filtered);
});

// Filter buttons
document.querySelectorAll('#your-section-name .filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        // Toggle active state
        btn.classList.toggle('active');

        // Filter logic here
        const filtered = yourFeatureData.filter(/* your filter criteria */);
        renderYourFeature(filtered);
    });
});
```

## CSS Styling

### Reuse Existing Patterns

The app has established card patterns:
- `.recipe-card` - Standard content cards
- `.boss-card` - Boss information
- `.character-card` - Character profiles
- `.checklist-card` - Checklist items
- `.season-card` - Seasonal information

**Best practice:** Extend existing card styles rather than creating entirely new ones.

### Creating New Card Styles

If new styling is required:

```css
.your-feature-card {
    background: var(--bg-secondary);
    border-radius: var(--border-radius);
    padding: 1.2rem;
    transition: transform 0.2s;
}

.your-feature-card:hover {
    transform: translateY(-4px);
}

/* Use CSS variables for colors */
.your-feature-card .highlight {
    color: var(--accent-primary);
}
```

**CSS variable reference:**
- `--bg-primary`, `--bg-secondary`, `--bg-tertiary` - Background colors
- `--text-primary`, `--text-secondary` - Text colors
- `--accent-primary`, `--accent-secondary` - Accent colors
- `--border-radius` - Standard border radius (8px)
- `--health-color`, `--hunger-color`, `--sanity-color` - Stat colors

## Responsive Design Considerations

The app supports mobile devices. Use existing grid patterns:

```css
.content-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1rem;
}
```

## Integration Checklist

Before completing:
- [ ] Navigation button added in correct position
- [ ] Section has matching `id` and `data-tab` values
- [ ] Data structure follows naming conventions
- [ ] Render function uses existing card patterns
- [ ] Search/filter logic implemented (if applicable)
- [ ] CSS uses existing variables and patterns
- [ ] Light theme compatibility verified
- [ ] Mobile responsive (test grid layout)
- [ ] No console errors when switching tabs
- [ ] Content renders on initial page load

## Common Features to Include

### Statistics Display
```html
<div class="stat-row">
    <span class="stat-icon">❤️</span>
    <span class="stat-value">${item.health}</span>
</div>
```

### Tags/Badges
```html
<span class="tag">${category}</span>
```

### Expandable Details
```javascript
card.addEventListener('click', () => {
    card.classList.toggle('expanded');
});
```

## Testing

After adding a new section:
1. Click the new tab - section should appear
2. Click other tabs - section should hide properly
3. Refresh page - default tab (Welcome) should show
4. Test search and filters work correctly
5. Toggle light theme - verify styling works
6. Resize browser window - verify responsive layout
7. Check browser console for errors

## Performance Considerations

For large datasets (>100 items):
- Implement pagination or lazy loading
- Debounce search input events
- Cache filtered results when possible
- Consider virtual scrolling for very long lists

Example debounce:
```javascript
let searchTimeout;
searchBox.addEventListener('input', (e) => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
        // Perform search
    }, 300);
});
```
