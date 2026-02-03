# Discovered Code Patterns

## Purpose

This file catalogs recurring code patterns discovered during development. Each pattern documents a problem, solution, and examples to help maintain consistency across the codebase.

---

## Pattern Template

Use this template when adding new patterns:

```markdown
### Pattern Name

**Context**: When does this pattern apply?

**Problem**: What issue does this pattern solve?

**Solution**: How should this be implemented?

**Example**:
[code example]

**Related Files**:
- List of files using this pattern

**Notes**: Additional considerations, edge cases, or warnings
```

---

## Discovered Patterns

### Service Initialization: Empty Arrays vs Null

**Context**: Initializing in-memory data structures at module level (e.g., todos array, users list)

**Problem**: Uninitialized variables default to `undefined`, causing "Cannot read property" errors when trying to use array methods like `.length`, `.map()`, `.filter()`, etc.

**Solution**: Always initialize collection variables with empty arrays (`[]`) rather than leaving undefined or using `null`. This eliminates the need for null checks throughout the codebase.

**Example**:
```javascript
// ❌ BAD - Causes runtime errors
let todos;  // undefined by default

app.get('/api/todos', (req, res) => {
  res.json(todos);  // TypeError: Cannot read property 'length' of undefined
});

// ✅ GOOD - Safe to use immediately
let todos = [];

app.get('/api/todos', (req, res) => {
  res.json(todos);  // Returns [] safely
});
```

**Related Files**:
- `packages/backend/src/app.js` - todos array initialization

**Notes**: 
- This pattern applies to any collection that will be used with array methods
- Empty array is truthy in JavaScript, so `if (todos)` checks still work
- Avoids defensive programming like `todos && todos.length`
- Aligns with functional programming practices (prefer values over null/undefined)

---

## Notes

- Add patterns as you discover them during development
- Update existing patterns when you find better solutions
- Remove patterns that become obsolete
- Reference these patterns in code reviews
- Link to specific files and line numbers when helpful
