---
description: "Analyze changes, generate commit message, and push to feature branch"
tools: ['read', 'execute', 'todo']
---

# Commit and Push Changes

Analyze current changes, generate a conventional commit message, and push to a feature branch.

## Input Parameters

**Branch Name** (REQUIRED): ${input:branch-name:Enter the feature branch name (e.g., feature/add-post-endpoint)}

## Workflow

### 1. Verify Branch Name Provided

If no branch name was provided, **STOP** and ask the user:

```
Please provide a branch name for your changes.

Examples:
- feature/add-post-endpoint
- fix/toggle-bug
- feature/delete-endpoint

Branch name: 
```

### 2. Analyze Changes

```bash
# Show current changes
git status

# Show detailed diff
git diff
```

Review:
- Which files were modified?
- What functionality was added/changed/fixed?
- Are there any test files changed?
- What's the overall theme of the changes?

### 3. Generate Conventional Commit Message

Based on the changes, create a commit message following the conventional commit format:

**Format**: `<type>: <description>`

**Types**:
- `feat:` - New feature or functionality
- `fix:` - Bug fix
- `test:` - Adding or updating tests
- `refactor:` - Code refactoring without behavior change
- `chore:` - Maintenance tasks (dependencies, config)
- `docs:` - Documentation updates
- `style:` - Code formatting (non-functional)

**Examples**:
```bash
feat: add POST /api/todos endpoint with validation
fix: correct toggle endpoint to properly toggle completed state
test: add integration tests for DELETE endpoint
refactor: extract validation logic into middleware
chore: update ESLint configuration
docs: add API documentation for todo endpoints
```

**Guidelines**:
- Use imperative mood ("add" not "added")
- Lowercase after the colon
- No period at the end
- Be specific but concise (50-70 characters)
- Describe WHAT changed, not HOW

### 4. Create or Switch to Feature Branch

```bash
# Check if branch exists
git branch --list <branch-name>

# If branch doesn't exist, create it
git checkout -b <branch-name>

# If branch exists, switch to it
git checkout <branch-name>
```

**CRITICAL**: 
- ✅ ONLY push to the user-provided branch name
- ❌ NEVER commit to `main` or any other branch
- ❌ NEVER create or use a different branch name than provided

### 5. Stage All Changes

```bash
# Stage all modified, new, and deleted files
git add .
```

Verify staged changes:
```bash
git status
```

### 6. Commit with Generated Message

```bash
# Commit with the conventional commit message
git commit -m "<generated-message>"
```

### 7. Push to Feature Branch

```bash
# Push to the specified feature branch
git push origin <branch-name>
```

If this is the first push to this branch:
```bash
# Set upstream and push
git push --set-upstream origin <branch-name>
```

### 8. Confirm Success

Report to the user:
```
✓ Changes committed successfully
✓ Pushed to branch: <branch-name>

Commit message: <generated-message>

Next steps:
- Create a Pull Request to merge into main
- Or continue working and run /commit-and-push again with new changes
```

## Workflow Example

```
User provides branch name: feature/add-post-endpoint

Analyzing changes...

Modified files:
- packages/backend/src/app.js (added POST endpoint)
- packages/backend/__tests__/app.test.js (added POST tests)

Generated commit message:
feat: add POST /api/todos endpoint with validation

Creating feature branch...
✓ Branch created: feature/add-post-endpoint

Staging changes...
✓ All changes staged

Committing...
✓ Committed: feat: add POST /api/todos endpoint with validation

Pushing to origin/feature/add-post-endpoint...
✓ Pushed successfully

Next steps:
- Create a Pull Request on GitHub
- Or continue working on this branch
```

## Error Handling

### No Changes to Commit

```
No changes detected. Git status shows:
  nothing to commit, working tree clean

Did you forget to save your files?
```

### Branch Name Not Provided

```
Error: Branch name is required.

Please provide a branch name using the format:
- feature/<descriptive-name> for new features
- fix/<descriptive-name> for bug fixes

Example: feature/add-delete-endpoint
```

### Already on Main Branch

If currently on `main`:

```
Warning: You are currently on the main branch.

I will create and switch to your feature branch: <branch-name>
before committing and pushing.
```

### Merge Conflicts

If there are conflicts:

```
Error: Cannot push to remote. Conflicts detected.

You may need to:
1. Pull latest changes: git pull origin main
2. Resolve conflicts
3. Run /commit-and-push again
```

## Best Practices

### Good Commit Messages

```
✅ feat: add delete todo endpoint
✅ fix: toggle endpoint now properly toggles state
✅ test: add comprehensive validation tests
✅ refactor: extract error handling middleware
```

### Poor Commit Messages

```
❌ update code
❌ fixes
❌ changes
❌ WIP
❌ asdf
```

### Branch Naming

```
✅ feature/add-delete-endpoint
✅ fix/toggle-bug
✅ feature/priority-field
✅ fix/validation-error
```

```
❌ branch1
❌ test
❌ updates
❌ my-changes
```

## Remember

- ✅ Always use conventional commit format
- ✅ Only commit to the user-provided branch
- ✅ Stage all changes before committing
- ✅ Be specific and descriptive in commit messages
- ✅ Push to the correct branch
- ❌ Never commit to main directly
- ❌ Never use vague commit messages
- ❌ Never push to a different branch than specified

The user can run this prompt multiple times as they make progress on their work.
