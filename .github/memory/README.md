# Development Memory System

## Purpose

This memory system helps GitHub Copilot track patterns, decisions, and lessons learned during development. By maintaining a structured knowledge base, AI can provide more context-aware suggestions that align with your project's specific patterns and past decisions.

## Two Types of Memory

### Persistent Memory
Located in `.github/copilot-instructions.md`, this contains:
- Foundational development principles
- Core workflow patterns
- Testing standards
- Git conventions

**When to update**: Rarely. Only when project-wide practices change.

### Working Memory
Located in `.github/memory/`, this contains:
- Session-specific discoveries
- Accumulated code patterns
- Active work notes
- Decision logs

**When to update**: Frequently. During every development session.

## Directory Structure

```
.github/memory/
├── README.md                    # This file - explains the memory system
├── session-notes.md             # Historical summaries of completed sessions (committed)
├── patterns-discovered.md       # Accumulated code patterns (committed)
└── scratch/
    ├── .gitignore               # Ignores all files in scratch/
    └── working-notes.md         # Active session notes (NOT committed)
```

### File Purposes

#### `session-notes.md` (Committed)
- **Purpose**: Historical record of completed development sessions
- **Content**: Summaries of what was accomplished, key findings, decisions made
- **Lifecycle**: Append-only. Add new session summaries at the top
- **When to update**: At the end of each development session
- **Git status**: Committed to repository

#### `patterns-discovered.md` (Committed)
- **Purpose**: Catalog of recurring code patterns discovered during development
- **Content**: Pattern definitions with context, problem, solution, and examples
- **Lifecycle**: Updated when you discover new patterns or refine existing ones
- **When to update**: When you notice a recurring solution to a common problem
- **Git status**: Committed to repository

#### `scratch/working-notes.md` (NOT Committed)
- **Purpose**: Active session workspace for current development work
- **Content**: Real-time notes, observations, temporary decisions, debugging insights
- **Lifecycle**: Overwritten each session. Key findings extracted to `session-notes.md`
- **When to update**: Throughout your current development session
- **Git status**: Ignored (see `scratch/.gitignore`)

## How to Use During Development Workflows

### TDD Workflow (Red-Green-Refactor)

**During the workflow:**
1. Start work → Open `scratch/working-notes.md`
2. Write test (RED) → Note expected behavior and test rationale
3. Implement (GREEN) → Document implementation decisions
4. Refactor → Capture patterns you discover
5. Between tests → Note insights about API design, edge cases

**At session end:**
1. Review `scratch/working-notes.md`
2. Extract key findings → Add to `session-notes.md`
3. Extract patterns → Add to `patterns-discovered.md`
4. Commit session-notes and patterns
5. Leave working-notes.md for next session (it's gitignored)

### Linting Workflow

**During the workflow:**
1. Run lint → Note categories of errors in `scratch/working-notes.md`
2. Fix systematically → Document any project-specific linting decisions
3. Discover patterns → Note if certain error types reveal deeper issues

**At session end:**
1. If you made linting configuration decisions → Add to `session-notes.md`
2. If you discovered patterns (e.g., "Always use const over let") → Add to `patterns-discovered.md`

### Debugging Workflow

**During the workflow:**
1. Encounter bug → Document symptoms in `scratch/working-notes.md`
2. Investigate → Track hypotheses and evidence
3. Identify root cause → Note the actual problem
4. Implement fix → Document the solution
5. Reflect → Capture what led to the bug

**At session end:**
1. Extract significant bug patterns → Add to `patterns-discovered.md`
2. Summarize debugging session → Add to `session-notes.md`
3. Note any preventive measures for future work

## How AI Uses These Memories

### During Active Development
When you ask Copilot for help, it can:
- Reference patterns from `patterns-discovered.md` to suggest consistent solutions
- Review recent session notes to understand current project state
- Check past decisions to avoid contradicting earlier work
- Apply lessons learned to new similar problems

### Example AI Interactions

**Without memory:**
```
You: "How should I initialize the todos array?"
Copilot: "You could use let todos = [] or let todos = null..."
```

**With memory (referencing patterns-discovered.md):**
```
You: "How should I initialize the todos array?"
Copilot: "Based on the 'Service Initialization' pattern documented in 
patterns-discovered.md, use let todos = [] to avoid null checks. 
This follows the project's preference for empty arrays over null."
```

## Session Workflow Example

### Start of Session
```bash
# Open your active notes
code .github/memory/scratch/working-notes.md

# Review recent session
code .github/memory/session-notes.md
```

### During Session
Work in `scratch/working-notes.md`:
```markdown
## Current Task
Implement DELETE /api/todos/:id endpoint

## Approach
- Write test first (TDD)
- Parse ID from params
- Find todo, return 404 if not found
- Remove from array and return 204

## Key Findings
- Array.findIndex() better than .indexOf() for objects
- Should test both success and 404 cases

## Decisions Made
- Use 204 No Content for successful delete (REST convention)
- Return 404 with error message for missing todo
```

### End of Session
Extract to `session-notes.md`:
```markdown
## Session: Implement DELETE Endpoint - 2026-02-03

### Accomplished
- Implemented DELETE /api/todos/:id endpoint
- Added comprehensive tests for success and error cases
- All tests passing

### Key Findings
- Array.findIndex() preferred for object lookups
- REST convention: 204 No Content for successful DELETE

### Outcomes
- DELETE endpoint fully functional
- Test coverage improved to 95%
```

Extract patterns to `patterns-discovered.md` if applicable.

## Best Practices

### DO ✅
- Take notes in `scratch/working-notes.md` as you work
- Be specific and concrete in pattern descriptions
- Include code examples in patterns
- Reference file paths and line numbers
- Update memory files at the end of each session
- Review recent session notes before starting new work

### DON'T ❌
- Don't commit `scratch/working-notes.md` (it's gitignored)
- Don't let session-notes.md grow indefinitely without summarizing
- Don't copy-paste entire files into memory (link to them instead)
- Don't document obvious patterns (e.g., "use semicolons")
- Don't leave working-notes.md empty during active development

## Memory Maintenance

### Weekly
- Review `session-notes.md` and consolidate related sessions
- Clean up outdated patterns in `patterns-discovered.md`

### Monthly
- Archive old session notes to a separate file if needed
- Promote frequently-used patterns to `.github/copilot-instructions.md`

### When in Doubt
- **Permanent, project-wide**: → `.github/copilot-instructions.md`
- **Discovered patterns**: → `patterns-discovered.md`
- **Session summaries**: → `session-notes.md`
- **Active work**: → `scratch/working-notes.md`

---

**Remember**: This memory system makes GitHub Copilot smarter about YOUR project. The more you document, the better AI understands your context, decisions, and patterns.
