---
description: "Validate that all success criteria for the current step are met"
agent: "code-reviewer"
tools: ['search', 'read', 'execute', 'web', 'todo']
---

# Validate Step Completion

Validate that all success criteria for a specific exercise step have been met.

## Input Parameters

**Step Number** (REQUIRED): ${input:step-number:Enter step number (e.g., "5-0", "5-1", "5-2")}

## Workflow

### 1. Verify Step Number Provided

If no step number was provided, **STOP** and ask the user:

```
Please provide the step number you want to validate.

Format: "X-Y" (e.g., "5-0", "5-1", "5-2")

Step number: 
```

### 2. Locate the Exercise Issue

```bash
# Find the exercise issue (has "Exercise:" in title)
gh issue list --state open
```

Identify the issue number for the exercise.

### 3. Retrieve Issue with All Comments

```bash
# Get complete issue with comments (steps are in comments)
gh issue view <issue-number> --comments
```

### 4. Find the Specific Step

Search through the issue content and comments to locate:

```
# Step <step-number>: [Title]
```

For example, if validating step "5-1", find:
```
# Step 5-1: [Title]
```

### 5. Extract Success Criteria

From the located step, extract the **Success Criteria** section:

```
## Success Criteria

- [ ] Criterion 1
- [ ] Criterion 2
- [ ] Criterion 3
```

### 6. Validate Each Criterion

For each success criterion, check against the current workspace state:

**Common Criterion Types and How to Validate**:

#### "Tests should pass"
```bash
# Run the test suite
npm test

# Or specific test file/pattern
npm test -- <test-file>
npm test -- --testNamePattern="<pattern>"
```

✅ **PASS**: All tests pass, no failures
❌ **FAIL**: Show which tests are failing and why

#### "No ESLint errors"
```bash
# Run linter
npm run lint

# Or for specific package
npm run lint --workspace=packages/backend
npm run lint --workspace=packages/frontend
```

✅ **PASS**: Exit code 0, no errors reported
❌ **FAIL**: Show error count and categorize issues

#### "Endpoint returns correct status code"
```bash
# Run relevant integration tests
npm test -- --testNamePattern="<endpoint-test>"
```

✅ **PASS**: Test verifies correct status code
❌ **FAIL**: Show expected vs actual status code

#### "Application runs without errors"
```bash
# Try starting the application
npm run start
```

✅ **PASS**: Server starts, no startup errors
❌ **FAIL**: Show startup error details

#### "Code follows TDD workflow"
- Check that test files exist for new features
- Verify tests were committed before or with implementation
- Look for test coverage

✅ **PASS**: Tests exist and cover the implementation
❌ **FAIL**: Missing tests or incomplete coverage

#### "Conventional commits used"
```bash
# Check recent commit messages
git log --oneline -5
```

✅ **PASS**: Commits follow format (feat:, fix:, test:, etc.)
❌ **FAIL**: Show non-conforming commits

### 7. Generate Validation Report

Create a comprehensive report:

```markdown
# Step <step-number> Validation Report

## Success Criteria Status

### ✅ Criterion 1: [Description]
- Status: PASS
- Evidence: [What confirms this passes]

### ❌ Criterion 2: [Description]
- Status: FAIL
- Issue: [What's wrong]
- Fix: [How to resolve]

### ✅ Criterion 3: [Description]
- Status: PASS
- Evidence: [What confirms this passes]

## Overall Status

2 of 3 criteria met (66%)

## Next Steps

To complete Step <step-number>:

1. [First action needed]
2. [Second action needed]

After addressing these items:
- Re-run /validate-step with step "<step-number>"
- When all criteria pass, run /commit-and-push
```

### 8. Provide Specific Guidance

For each failing criterion, provide:

1. **What's wrong**: Clear explanation of the issue
2. **How to verify**: Command to check the criterion
3. **How to fix**: Specific steps to resolve
4. **How to re-validate**: Command to check again

## Validation Example

```
User provides step number: 5-1

Locating exercise issue...
Found: Issue #1 "Exercise: Build TODO Application"

Searching for Step 5-1...
Found in comment #3:

# Step 5-1: Implement POST Endpoint

## Success Criteria

- [ ] POST /api/todos endpoint exists
- [ ] Returns 201 status code
- [ ] Test for POST endpoint passes
- [ ] No ESLint errors

Validating criteria...

✅ POST /api/todos endpoint exists
   - Verified in packages/backend/src/app.js:45
   
✅ Returns 201 status code  
   - Test confirms correct status
   
✅ Test for POST endpoint passes
   - npm test shows: ✓ should create a new todo
   
❌ No ESLint errors
   - Found 2 errors:
     * packages/backend/src/app.js:23 - no-console
     * packages/backend/src/app.js:34 - no-unused-vars
   - Run: npm run lint --workspace=packages/backend
   - Fix: Remove console.log and unused variable
   - Recommend: Use @code-reviewer agent for systematic fixes

Overall: 3 of 4 criteria met (75%)

Next Steps:
1. Run: npm run lint --workspace=packages/backend
2. Fix the 2 ESLint errors (suggest using @code-reviewer)
3. Re-run: /validate-step with step "5-1"
4. When all pass: /commit-and-push
```

## Error Handling

### Step Not Found

```
Error: Could not find Step <step-number> in the exercise issue.

Available steps found:
- Step 5-0: Setup and Initialization
- Step 5-1: Implement POST Endpoint
- Step 5-2: Code Quality Review

Did you mean one of these?
```

### Invalid Step Format

```
Error: Invalid step number format.

Expected format: "X-Y" (e.g., "5-0", "5-1", "5-2")
You provided: <input>

Please use the correct format.
```

### No Exercise Issue Found

```
Error: Could not locate an open exercise issue.

Looked for issues with "Exercise:" in the title.

Please verify:
1. An exercise issue exists
2. The issue is open (not closed)
3. You have access to the repository
```

## Validation Commands Reference

### Testing
```bash
npm test                                    # All tests
npm test -- <file>                          # Specific file
npm test -- --testNamePattern="<pattern>"   # Match pattern
npm test -- --coverage                      # With coverage
```

### Linting
```bash
npm run lint                                # All packages
npm run lint --workspace=packages/backend   # Backend only
npm run lint --workspace=packages/frontend  # Frontend only
```

### Application
```bash
npm run start                               # Start both frontend and backend
npm run dev --workspace=packages/backend    # Backend only
npm run dev --workspace=packages/frontend   # Frontend only
```

### Git
```bash
git log --oneline -5                        # Recent commits
git status                                  # Current changes
git diff                                    # Detailed changes
```

## Remember

- ✅ Validate ALL criteria systematically
- ✅ Provide specific evidence for PASS/FAIL
- ✅ Give actionable guidance for failures
- ✅ Run actual commands to verify (don't guess)
- ✅ Be thorough but concise
- ❌ Don't mark criteria as passed without verification
- ❌ Don't provide vague guidance
- ❌ Don't skip any criteria

After all criteria pass, recommend the user run `/commit-and-push` to save their work.
