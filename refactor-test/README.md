# Refactor Test - MCP Server Validation

This folder contains a test scenario designed to validate the Structured Workflow MCP Server's ability to guide AI assistants through professional refactoring workflows.

## Purpose

The `refactor-test` folder serves as a controlled testing environment for:
- Validating the MCP server's workflow guidance capabilities
- Testing AI compliance with structured refactoring phases
- Demonstrating SOLID principles refactoring in practice
- Ensuring the "Guide, Don't Gate" philosophy works effectively

## Test Scenario

### The Challenge
The `UserService.ts` file in `src/` is deliberately designed with multiple SOLID principle violations:

- **Single Responsibility Principle**: The class handles user management, authentication, logging, email, notifications, data export/import, report generation, and more
- **Open/Closed Principle**: Hardcoded configurations that can't be extended without modification
- **Liskov Substitution Principle**: Inconsistent method behaviors
- **Interface Segregation Principle**: Mixed concerns forcing unwanted dependencies
- **Dependency Inversion Principle**: Direct dependencies on concrete implementations

### Test Objective
Use the Structured Workflow MCP Server to guide the refactoring of this problematic code into a clean, SOLID-compliant architecture.

## Directory Structure

```
refactor-test/
├── README.md                    # This file
├── src/                        # Original problematic code (DO NOT MODIFY)
│   ├── UserService.ts          # The main class with SOLID violations
│   ├── UserService.test.ts     # Tests that must still pass after refactoring
│   └── index.ts               # Entry point
├── package.json               # Dependencies and scripts
├── jest.config.js             # Test configuration
├── tsconfig.json              # TypeScript configuration
└── refactor-test-attempt/     # Your refactored solution goes here (TO BE CREATED)
    └── src/
        ├── services/
        ├── repositories/
        ├── interfaces/
        └── ...
```

## How to Use This Test

### For Testing the MCP Server

1. **Start the refactoring workflow:**
   ```
   mcp__structured-workflow__refactor_workflow({
     task: "Refactor UserService to comply with SOLID principles"
   })
   ```

2. **Follow the workflow phases:**
   - AUDIT_INVENTORY: Analyze without modifying
   - COMPARE_ANALYZE: Evaluate refactoring approaches
   - QUESTION_DETERMINE: Finalize strategy
   - WRITE_REFACTOR: Implement changes
   - LINT: Verify quality
   - ITERATE: Fix issues
   - PRESENT: Summarize work

3. **Create refactored code in:** `refactor-test-attempt/`

4. **Maintain all original functionality**

### Expected Outcomes

A successful refactoring should produce:
- Separated services (UserRepository, AuthenticationService, Logger, etc.)
- Proper interfaces and abstractions
- Dependency injection
- Clean, testable architecture
- All original tests passing

## Running Tests

```bash
# Install dependencies
npm install

# Run tests on original code
npm test

# After refactoring, update imports in tests and run again
npm test
```

## Success Criteria

The MCP server guidance is successful if:
1. All SOLID violations are identified during AUDIT phase
2. The workflow progression feels natural and helpful
3. The refactored code properly separates all concerns
4. Original functionality is preserved
5. Code is more maintainable and testable

## Important Notes

- **DO NOT MODIFY** files in the original `src/` directory
- **CREATE ALL REFACTORED CODE** in `refactor-test-attempt/`
- **ENSURE TESTS STILL PASS** with your refactored implementation
- **FOLLOW MCP GUIDANCE** through all workflow phases

## Evaluation Metrics

When testing, evaluate:
1. **Guidance Quality** - How helpful were the phase instructions?
2. **Workflow Flow** - How smooth was the phase progression?
3. **Violation Detection** - How well did it identify issues?
4. **Refactoring Quality** - How good was the final code?
5. **User Experience** - How easy was it to follow?

## Background

This test scenario is part of the Structured Workflow MCP Server validation suite. It tests whether the server can effectively guide AI assistants through complex refactoring tasks while maintaining the "Guide, Don't Gate" philosophy - providing helpful structure without restricting the AI's capabilities.

The deliberately poor design of UserService.ts makes it an ideal test case for validating the MCP server's ability to:
- Guide systematic code analysis
- Help identify all design flaws
- Suggest appropriate refactoring strategies
- Ensure quality through the workflow phases
- Produce professional-grade refactored code

This is as much a test of the MCP server's guidance capabilities as it is a refactoring exercise.