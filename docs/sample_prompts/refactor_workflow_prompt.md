# Refactor Workflow Sample Prompt

## Core Instructions

You are an agent - please keep going until the user’s query is completely resolved, before ending your turn and yielding back to the user. Only terminate your turn when you are sure that the problem is solved.

If you are not sure about file content or codebase structure pertaining to the user’s request, use your tools to read files and gather the relevant information: do NOT guess or make up an answer.

You MUST plan extensively before each function call, and reflect extensively on the outcomes of the previous function calls. DO NOT do this entire process by making function calls only, as this can impair your ability to solve the problem and think insightfully.

## Quick Copy-Paste Template

```
I need to refactor [TARGET_CODE_DESCRIPTION] to improve [SPECIFIC_GOALS]. 

**Context:**
- Project: [PROJECT_NAME]
- Language: [PROGRAMMING_LANGUAGE]
- Current issues: [SPECIFIC_PROBLEMS]
- Constraints: [ANY_LIMITATIONS]

**Objective:**
[DETAILED_DESCRIPTION_OF_WHAT_NEEDS_REFACTORING]

**Goals:**
- [GOAL_1]
- [GOAL_2]
- [GOAL_3]

Please use the Structured Workflow MCP Server to guide this refactoring process systematically.

Start by calling `mcp__structured-workflow__refactor_workflow` with this task description.
```

---

## Best Practices Template (Detailed)

### Context Setting
```
**Project Overview:**
- Repository: [REPO_URL_OR_PATH]
- Primary language: [LANGUAGE]
- Framework/stack: [TECH_STACK]
- Current pain points: [SPECIFIC_ISSUES]

**Code Location:**
- Target files: [FILE_PATHS]
- Dependencies: [RELATED_FILES]
- Test coverage: [CURRENT_TEST_STATUS]
```

### Specific Refactoring Goals
```
**Refactoring Objectives:**
1. **Code Quality**: [SPECIFIC_QUALITY_IMPROVEMENTS]
2. **Performance**: [PERFORMANCE_TARGETS]
3. **Maintainability**: [MAINTAINABILITY_GOALS]
4. **Architecture**: [ARCHITECTURAL_IMPROVEMENTS]

**Success Criteria:**
- [ ] [MEASURABLE_OUTCOME_1]
- [ ] [MEASURABLE_OUTCOME_2]
- [ ] [MEASURABLE_OUTCOME_3]
```

### Constraints and Requirements
```
**Important Constraints:**
- **DO NOT BREAK**: [CRITICAL_FUNCTIONALITY]
- **PRESERVE**: [EXISTING_INTERFACES_OR_APIS]
- **MAINTAIN**: [BACKWARD_COMPATIBILITY_REQUIREMENTS]
- **FOLLOW**: [CODING_STANDARDS_OR_PATTERNS]

**Testing Requirements:**
- All existing tests must pass
- [ADDITIONAL_TESTING_REQUIREMENTS]
```

---

## Complete Example Usage

```
I need to refactor our legacy authentication service to improve security and maintainability.

**Context:**
- Project: E-commerce Platform API
- Language: TypeScript/Node.js
- Current issues: Monolithic auth service, mixed responsibilities, security vulnerabilities
- Constraints: Cannot break existing API endpoints, must maintain session compatibility

**Objective:**
Refactor the AuthService class (src/services/AuthService.ts) which currently handles user authentication, session management, password hashing, email verification, and rate limiting all in a single 800-line class. This violates Single Responsibility Principle and makes testing difficult.

**Goals:**
- Separate concerns into focused services
- Implement proper dependency injection
- Improve testability with mocked dependencies
- Enhance security with updated patterns
- Maintain all existing functionality

**Critical Requirements:**
- Existing API endpoints must remain unchanged
- Current session tokens must continue working
- Database schema cannot be modified
- Must maintain backward compatibility

Please use the Structured Workflow MCP Server to guide this refactoring process systematically. Take a deep breath and work through this step-by-step.

Start by calling `mcp__structured-workflow__refactor_workflow` with this task description.
```

---

## Template Customization Guide

### Fill in these placeholders:

1. **[TARGET_CODE_DESCRIPTION]** - Brief description of what you're refactoring
   - Example: "legacy payment processing module"
   - Example: "monolithic user service class"

2. **[SPECIFIC_GOALS]** - What you want to achieve
   - Example: "code clarity and testability" 
   - Example: "performance and separation of concerns"

3. **[PROJECT_NAME]** - Your project identifier
   - Example: "E-commerce API v2"
   - Example: "Internal Analytics Dashboard"

4. **[PROGRAMMING_LANGUAGE]** - Primary language
   - Example: "TypeScript", "Python", "Java", "Rust"

5. **[SPECIFIC_PROBLEMS]** - Current pain points
   - Example: "500-line functions, no tests, tight coupling"
   - Example: "memory leaks, slow queries, circular dependencies"

6. **[ANY_LIMITATIONS]** - Important constraints
   - Example: "cannot change public API"
   - Example: "must work with existing database schema"

### Tips for Better Results:

- **Be specific**: "Improve performance" → "Reduce API response time from 2s to 500ms"
- **Provide context**: Include relevant background about the codebase
- **Set clear boundaries**: Specify what can and cannot be changed
- **Use emotional stimuli**: Phrases like "This is important to my team" can improve accuracy
- **Request step-by-step**: "Take a deep breath and work through this systematically"

### Platform Note:
Some AI platforms add prefixes to MCP tool names. If you get "Unknown tool" errors, try:
- `mcp_structured-workflow__refactor_workflow`
- `mcp7_structured-workflow__refactor_workflow`

Use `mcp__structured-workflow__discover_workflow_tools` to check available tools on your platform.
