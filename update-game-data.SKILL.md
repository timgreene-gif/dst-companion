---
name: update-game-data
description: Updates game data in the DST Companion app including recipes, bosses, characters, crafting items, and farming information. Use when the user wants to add, modify, or remove game content, fix incorrect data, or update information to match the latest Don't Starve Together game version.
---

# Update Game Data

This skill guides updating Don't Starve Together game data in the single-file HTML companion app.

## Data Structure Location

All game data is embedded in the `<script>` section of `index.html` starting around line 3500. Data structures use JavaScript array-of-objects format with consistent property naming.

## Common Data Types

### Recipes (Crock Pot)
```javascript
{
    name: 'Recipe Name',
    icon: '🍲',  // Emoji representing the dish
    ingredients: ['Item1', 'Item2'],
    health: 0,
    hunger: 37.5,
    sanity: 5,
    cookTime: 15,
    perishTime: '15 days',
    priority: 10,
    category: 'Meals',  // or 'Desserts', 'Other'
    favoriteFood: ['Character Name'],  // Characters who love this
    notes: 'Recipe restrictions or tips'
}
```

### Bosses
```javascript
{
    name: 'Boss Name',
    icon: '👹',
    health: 2000,
    damage: 75,
    season: 'Autumn',  // or 'Winter', 'Spring', 'Summer', 'Year Round'
    drops: ['Loot1', 'Loot2'],
    strategy: 'Combat tips and strategies',
    tier: 'S'  // S, A, or B
}
```

### Characters
```javascript
{
    name: 'Character Name',
    icon: '👤',
    health: 150,
    hunger: 150,
    sanity: 200,
    perk: 'Special ability description',
    downside: 'Character disadvantages',
    favoriteFood: '🍲',  // Emoji icon
    favoriteFoodName: 'Food Name',
    strategy: 'How to play effectively'
}
```

### Farming/Gardening Crops
```javascript
{
    name: 'Crop Name',
    icon: '🥕',
    seed: 'Seed Name',
    seasons: ['autumn', 'winter', 'spring'],  // lowercase
    water: 'Low',  // 'Low', 'Medium', or 'High'
    nutrients: 'Manure',  // 'Manure', 'Compost', or 'Growth Formula'
    growTime: '6-8 days',
    family: 'Vegetable',  // or 'Fruit'
    companions: ['Crop1', 'Crop2'],  // Compatible neighbors
    giant: true,  // Can grow giant version
    giantYield: '8-10 Carrots',
    tips: 'Growing tips and usage notes'
}
```

## Update Procedures

### Adding New Data

1. **Find the data array** - Search for the relevant array name (e.g., `crockPotRecipes`, `bossData`, `characterData`, `gardenData`)
2. **Maintain alphabetical order** - Insert new entries in alphabetical order by `name` property for consistency
3. **Use existing icons** - Select appropriate emoji icons that match the app's visual style
4. **Validate properties** - Ensure all required properties are present with correct types
5. **Follow naming conventions** - Use title case for names, consistent property naming

### Modifying Existing Data

1. **Search by name** - Use Grep to find the exact object to modify
2. **Preserve structure** - Maintain the object's property order and formatting
3. **Verify downstream usage** - Check if the data is referenced elsewhere (filters, favorites, synergies)
4. **Update related data** - If changing a name, update all references

### Removing Obsolete Data

1. **Confirm removal** - Verify the data is truly obsolete or incorrect
2. **Check dependencies** - Search for references in filters, character favorites, or strategy notes
3. **Clean up references** - Remove from any favoriteFood arrays or companion lists

## Validation Checklist

Before completing:
- [ ] Data structure matches existing format exactly
- [ ] All required properties are present
- [ ] Icons are appropriate emojis (single character)
- [ ] Numerical values are accurate to game mechanics
- [ ] Arrays use consistent formatting (e.g., lowercase season names)
- [ ] Entry is in alphabetical order within its array
- [ ] No trailing commas on last array element
- [ ] Related data updated (character favorites, synergies)

## Data Accuracy

Always verify game data against:
- Official Don't Starve Together wiki
- Recent game patch notes
- Community consensus for strategies

Prioritize accuracy over completeness. Better to omit uncertain data than include incorrect information.

## Common Patterns

### Character Favorite Foods
When adding recipes, check if any characters have this as their favorite food. Update the `favoriteFood` array in the recipe and the character's `favoriteFoodName` property.

### Seasonal Content
Use lowercase for seasons in arrays: `['autumn', 'winter', 'spring', 'summer']`
Use title case for display: `'Autumn'`, `'Winter'`, etc.

### Health/Hunger/Sanity Values
Use exact game values. Negative values indicate penalties (e.g., `hunger: -10` for Monster Lasagna).

## Testing

After updates:
1. Open `index.html` in a browser
2. Navigate to the relevant tab
3. Verify the new/updated data displays correctly
4. Test filters and search functionality
5. Check that icons render properly
6. Validate data appears in correct sort order
