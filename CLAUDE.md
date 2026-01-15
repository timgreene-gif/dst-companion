# DST Companion - Project Context

## Project Overview
Single-file HTML application serving as a comprehensive companion guide for the game "Don't Starve Together" (DST).

## Technical Architecture
- **File**: `index.html` (~6000 lines)
- **Structure**: Monolithic HTML with embedded CSS and JavaScript
- **No build process**: Direct browser usage
- **No dependencies**: Vanilla JS, no frameworks

## Core Features
1. **Crock Pot Recipes** - Cooking recipes with stats
2. **Progression Guide** - Game milestone timeline
3. **Bosses** - Boss information and strategies
4. **Characters** - Character stats and playstyles
5. **Crafting** - Crafting recipes by category
6. **Day Tracker** - In-game day tracking tool
7. **Checklists** - Progress tracking
8. **Gardening** - Farming/crop information

## Code Organization

### Data Location
Game data stored as JavaScript arrays starting ~line 3500:
- Recipe data
- Boss data
- Character data
- Gardening/crop data
- Crafting data

### Navigation Pattern
Tab-based with three components:
1. `<button class="nav-tab" data-tab="section-name">` - Navigation
2. `<section id="section-name" data-tab="section-name">` - Content
3. JavaScript event listeners - Tab switching

### Styling System
- CSS variables for theming (`:root`)
- Dark theme (default) + light theme toggle
- Mobile responsive with `@media (max-width: 768px)`

## Critical Conventions

### Data Format
```javascript
{
    name: 'Item Name',      // Title Case
    icon: '🎯',             // Single emoji
    // ... other properties
}
```

### Naming
- **Data variables**: `camelCase` (e.g., `crockPotRecipes`)
- **HTML IDs/classes**: `kebab-case` (e.g., `nav-tab`)
- **Seasons in arrays**: lowercase (e.g., `['autumn', 'winter']`)
- **Display text**: Title Case

### Alphabetical Ordering
All data arrays sorted alphabetically by `name` property.

## Don't Starve Together Context
- Survival game with hunger, health, and sanity mechanics
- Four seasons: Autumn, Winter, Spring, Summer
- Multiplayer focus (hence "Together")
- Crafting, farming, cooking, and boss fighting
- Character perks affect gameplay

## Common Tasks
- Adding/updating game data (recipes, bosses, characters)
- Adding new feature sections/tabs
- Styling and theme updates
- Data validation and corrections

## Testing
Open `index.html` directly in browser - no build step required.
