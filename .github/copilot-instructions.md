---
description: "Global instructions for GitHub Copilot when working on the TODO application"
---

# TODO Application - Copilot Instructions

## Project Context

This is a full-stack TODO application with:
- **Frontend**: React-based user interface
- **Backend**: Express.js REST API
- **Development Approach**: Iterative, feedback-driven development
- **Current Phase**: Backend stabilization and frontend feature completion

The project emphasizes incremental progress with continuous validation through testing and code quality checks.

## Documentation References

Refer to these files for detailed guidance:
- [docs/project-overview.md](../docs/project-overview.md) - Architecture, tech stack, and project structure
- [docs/testing-guidelines.md](../docs/testing-guidelines.md) - Test patterns and testing standards
- [docs/workflow-patterns.md](../docs/workflow-patterns.md) - Development workflow guidance

Always consult these documents before implementing significant changes.

## Development Principles

Follow these core principles when working on this project:

1. **Test-Driven Development (TDD)**: Follow the Red-Green-Refactor cycle
   - Write tests first (RED)
   - Implement minimal code to pass (GREEN)
   - Improve code quality (REFACTOR)

2. **Incremental Changes**: Make small, testable modifications
   - One feature or fix at a time
   - Each change should be independently testable
   - Commit frequently with meaningful messages

3. **Systematic Debugging**: Use test failures as diagnostic tools
   - Read error messages carefully
   - Identify root causes before fixing
   - Add tests to prevent regression

4. **Validation Before Commit**: Ensure code quality gates pass
   - All tests must pass
   - No linting errors
   - Code follows project conventions

## Testing Scope

This project uses **unit tests and integration tests ONLY**:

### Backend Testing
- **Framework**: Jest + Supertest
- **Scope**: API endpoints, middleware, business logic
- **Location**: `packages/backend/__tests__/`

### Frontend Testing
- **Framework**: React Testing Library
- **Scope**: Component behavior, user interactions, state management
- **Location**: `packages/frontend/src/__tests__/`

### Manual Testing
- **Browser testing** for full UI verification
- Use browser developer tools for debugging UI issues

### Important Constraints
- **DO NOT** suggest or implement e2e test frameworks (Playwright, Cypress, Selenium)
- **DO NOT** suggest browser automation tools
- **Reason**: This lab focuses on unit and integration testing skills without e2e complexity

### Testing Approach by Context

**Backend API Changes**:
1. Write Jest/Supertest tests FIRST (RED)
2. Run tests and see them fail
3. Implement the API endpoint/feature (GREEN)
4. Refactor for quality
5. Verify all tests pass

**Frontend Component Features**:
1. Write React Testing Library tests FIRST for component behavior (RED)
2. Run tests and see them fail
3. Implement the component/feature (GREEN)
4. Refactor for quality
5. Verify all tests pass
6. Follow with manual browser testing for full UI flows

This is true TDD: **Test first, then code to pass the test**.

## Workflow Patterns

Follow these established workflows:

### 1. TDD Workflow (Red-Green-Refactor)
1. **Write/Fix Tests**: Create or update tests for the feature
2. **Run Tests**: Execute test suite and observe failures (RED)
3. **Implement**: Write minimal code to pass tests (GREEN)
4. **Refactor**: Improve code quality while keeping tests green
5. **Verify**: Run full test suite to ensure no regressions

### 2. Code Quality Workflow
1. **Run Lint**: Execute ESLint to identify issues
2. **Categorize Issues**: Group by type (unused vars, formatting, etc.)
3. **Fix Systematically**: Address one category at a time
4. **Re-validate**: Run lint again to confirm fixes
5. **Test**: Ensure fixes didn't break functionality

### 3. Integration Workflow
1. **Identify Issue**: Understand the problem through tests or manual testing
2. **Debug**: Use logging, debuggers, or test output to diagnose
3. **Test**: Write or update tests to cover the fix
4. **Fix**: Implement the solution
5. **Verify End-to-End**: Test the complete user flow manually

## Agent Usage

Use specialized agents for specific tasks:

### `tdd-developer` Agent
Use for:
- Writing new tests
- Implementing features using TDD
- Debugging test failures
- Following Red-Green-Refactor cycles
- Test coverage improvements

### `code-reviewer` Agent
Use for:
- Addressing ESLint errors
- Code quality improvements
- Refactoring for better patterns
- Ensuring code standards compliance
- Pre-commit code reviews

Switch to the appropriate agent based on the task context.

## Memory System

This project uses a structured memory system to help GitHub Copilot provide context-aware suggestions:

### Persistent Memory
- **Location**: This file (`.github/copilot-instructions.md`)
- **Content**: Foundational principles, workflows, and project-wide standards
- **Updates**: Rarely, only when core practices change

### Working Memory
- **Location**: `.github/memory/` directory
- **Content**: Session discoveries, code patterns, active development notes
- **Updates**: Frequently, during every development session

### Memory Files

**`.github/memory/session-notes.md`** (committed):
- Historical summaries of completed development sessions
- Key findings, decisions, and outcomes
- Update at the end of each session

**`.github/memory/patterns-discovered.md`** (committed):
- Catalog of recurring code patterns discovered during development
- Pattern definitions with context, problem, solution, and examples
- Update when you discover or refine patterns

**`.github/memory/scratch/working-notes.md`** (NOT committed):
- Active workspace for current development session
- Real-time notes, observations, decisions, debugging insights
- Extract key findings to session-notes.md at session end
- Gitignored - ephemeral working memory

### Using the Memory System

**During active development**:
1. Take notes in `.github/memory/scratch/working-notes.md`
2. Document patterns as you discover them
3. Reference past patterns for consistency

**At session end**:
1. Review `scratch/working-notes.md`
2. Extract key findings → `session-notes.md`
3. Extract patterns → `patterns-discovered.md`
4. Commit session notes and patterns

**When providing suggestions**, GitHub Copilot will:
- Reference documented patterns for consistent solutions
- Review recent session notes for project context
- Apply lessons learned to similar problems
- Avoid contradicting past decisions

See [.github/memory/README.md](memory/README.md) for detailed guidance on using the memory system.

## Workflow Utilities

GitHub CLI commands are available for workflow automation:

### Issue Management
```bash
# List all open issues
gh issue list --state open

# View specific issue details
gh issue view <issue-number>

# View issue with all comments
gh issue view <issue-number> --comments
```

### Exercise Workflow
- The main exercise issue has "Exercise:" in the title
- Exercise steps are posted as comments on the main issue
- Use `gh issue view` with `--comments` to see all steps
- Reference when using `/execute-step` or `/validate-step` prompts

## Git Workflow

Follow these Git conventions:

### Conventional Commits
Use semantic commit messages:
- `feat:` - New feature
- `fix:` - Bug fix
- `test:` - Adding or updating tests
- `refactor:` - Code refactoring without behavior change
- `chore:` - Maintenance tasks
- `docs:` - Documentation updates
- `style:` - Code formatting (non-functional)

**Examples**:
```bash
git commit -m "feat: add delete todo endpoint"
git commit -m "fix: correct todo validation logic"
git commit -m "test: add integration tests for todo API"
```

### Branch Strategy
- **Main branch**: `main` (production-ready code)
- **Feature branches**: `feature/<descriptive-name>`
- **Fix branches**: `fix/<descriptive-name>`

**Examples**:
```bash
git checkout -b feature/add-todo-priority
git checkout -b fix/todo-validation-error
```

### Commit Best Practices
1. **Stage all changes** before committing:
   ```bash
   git add .
   ```

2. **Commit with descriptive message**:
   ```bash
   git commit -m "feat: add priority field to todo model"
   ```

3. **Push to the correct branch**:
   ```bash
   git push origin <branch-name>
   ```

4. Keep commits focused and atomic (one logical change per commit)

---

**Remember**: These instructions apply globally across the workspace. Always prioritize test-first development and incremental, validated progress.
