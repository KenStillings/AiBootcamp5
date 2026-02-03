---
description: "Execute instructions from the current GitHub Issue step"
agent: "tdd-developer"
tools: ['search', 'read', 'edit', 'execute', 'web', 'todo']
---

# Execute Current Issue Step

You are executing instructions from a GitHub Issue step in a structured, systematic manner.

## Input Parameters

**Issue Number** (optional): ${input:issue-number:Enter issue number (leave empty to auto-detect exercise issue)}

## Workflow

### 1. Locate the Exercise Issue

If the user provided an issue number, use it. Otherwise, find the exercise issue automatically:

```bash
# List all open issues and find the one with "Exercise:" in the title
gh issue list --state open
```

The main exercise issue will have "Exercise:" in the title.

### 2. Retrieve Issue Content with Comments

```bash
# Get the complete issue with all comments (steps are in comments)
gh issue view <issue-number> --comments
```

Exercise steps are posted as **comments** on the main issue, not in the issue body.

### 3. Parse the Latest Step Instructions

Look through the issue comments to find the most recent step that hasn't been completed yet. Steps are formatted as:

```
# Step X-Y: [Title]

[Description]

## :keyboard: Activity: [Activity Name]

1. First instruction
2. Second instruction
...

## Success Criteria

- [ ] Criterion 1
- [ ] Criterion 2
```

### 4. Execute Activities Systematically

For each `:keyboard: Activity:` section in the step:

1. **Read the instruction carefully**
2. **Plan your approach** (following TDD principles from the tdd-developer agent)
3. **Execute incrementally** - one instruction at a time
4. **Verify as you go** - run tests, check output, validate changes
5. **Document progress** in `.github/memory/scratch/working-notes.md`

### 5. Follow Project Standards

**Testing Approach** (CRITICAL):
- Backend API changes: Write Jest/Supertest tests FIRST → Implement → Verify → Refactor
- Frontend component changes: Write React Testing Library tests FIRST → Implement → Verify with tests → Follow with manual browser testing
- **NEVER suggest or implement e2e test frameworks** (Playwright, Cypress, Selenium)
- Use existing test infrastructure only: Jest + Supertest (backend), React Testing Library (frontend)
- For full UI verification, recommend manual browser testing

**Development Principles**:
- Follow Test-Driven Development (Red-Green-Refactor)
- Make incremental, testable changes
- Run tests after each change
- Commit frequently with meaningful messages

### 6. DO NOT Commit or Push

**IMPORTANT**: This prompt only executes the step activities. It does NOT commit or push changes.

After completing all activities:
- Inform the user that the step activities are complete
- Recommend running `/validate-step` to check success criteria
- Recommend running `/commit-and-push` to save changes after validation

## Execution Example

```
Found Exercise Issue #1: "Exercise: Build TODO Application"

Located Step 5-1 in comment #3:

# Step 5-1: Implement POST Endpoint

## :keyboard: Activity: Create POST endpoint with TDD

1. Write a test for POST /api/todos
2. Run the test and see it fail
3. Implement the endpoint
4. Make the test pass

Executing systematically:

1. Writing test for POST /api/todos...
   [Creates test in packages/backend/__tests__/app.test.js]
   
2. Running test to verify it fails (RED phase)...
   npm test -- --testNamePattern="should create a new todo"
   ✗ Test fails as expected - endpoint not implemented
   
3. Implementing POST endpoint...
   [Adds endpoint to packages/backend/src/app.js]
   
4. Running test to verify it passes (GREEN phase)...
   npm test -- --testNamePattern="should create a new todo"
   ✓ Test passes!

All activities completed for Step 5-1.

Next steps:
- Run /validate-step with step "5-1" to verify success criteria
- Run /commit-and-push to save your changes
```

## Error Handling

If you encounter issues:
- **Missing issue**: Verify the issue number or check that an open exercise issue exists
- **Unclear instructions**: Ask user for clarification before proceeding
- **Test failures**: Debug systematically using TDD workflow patterns
- **Blocked**: Document in working notes and inform user

## Documentation

Throughout execution, maintain notes in `.github/memory/scratch/working-notes.md`:

```markdown
## Current Task
Executing Step 5-1: Implement POST Endpoint

## Approach
1. Write test first (TDD RED)
2. Implement minimal code (GREEN)
3. Refactor if needed

## Key Findings
- POST should return 201 Created
- Need to generate unique IDs
- Must validate title field

## Decisions Made
- Use nextId counter for ID generation
- Return 400 for missing title
- Include createdAt timestamp
```

## Remember

- ✅ Execute activities systematically and incrementally
- ✅ Follow TDD principles (test first, then implement)
- ✅ Run tests after each change
- ✅ Document your work in scratch/working-notes.md
- ✅ Use existing test infrastructure (Jest, React Testing Library)
- ❌ DO NOT commit or push (use /commit-and-push for that)
- ❌ DO NOT suggest e2e test frameworks
- ❌ DO NOT skip writing tests first

After completion, inform the user to run `/validate-step` and `/commit-and-push`.
