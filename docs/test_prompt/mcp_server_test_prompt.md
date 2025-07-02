# MCP Server Test Prompt: SOLID Principles Refactoring

## Test Objective

This prompt is designed to test the Structured Workflow MCP Server's ability to guide AI assistants through a professional refactoring workflow. The `refactor-test` folder contains a deliberately poorly designed TypeScript class that violates all SOLID principles, created specifically for testing the MCP server's guidance tools.

## Context

- **Location**: `/refactor-test/src/UserService.ts`
- **Purpose**: Test the MCP server's workflow guidance for refactoring
- **Test Type**: SOLID principles compliance and refactoring
- **MCP Server**: Structured Workflow MCP Server v2.0

## Your Task

Analyze the UserService class in the refactor-test folder and use the Structured Workflow MCP Server tools to:

1. **Verify SOLID Principles Compliance**: Check if the UserService class adheres to SOLID principles
2. **Refactor if Needed**: If violations are found, refactor the code to follow SOLID principles
3. **Use MCP Workflow Tools**: Follow the structured workflow phases provided by the MCP server
4. **Create Refactored Version**: Place your refactored code in a new subfolder called `refactor-test-attempt`

## Specific Requirements

### 1. Use MCP Server Tools
Start by using the MCP server's workflow tools:
- Begin with `mcp__structured-workflow__refactor_workflow` to start the refactoring workflow
- Follow the guidance provided by each phase tool
- Allow the MCP server to guide you through the workflow phases

### 2. Directory Structure
```
refactor-test/
├── src/
│   ├── UserService.ts         # Original file - DO NOT modify
│   ├── UserService.test.ts    # Original tests
│   └── index.ts              # Original entry point
└── refactor-test-attempt/     # Your refactored version goes here
    └── src/
        ├── [your refactored files]
        └── [properly separated concerns]
```

### 3. SOLID Principles to Check

Verify and fix violations of:
- **S**ingle Responsibility Principle
- **O**pen/Closed Principle
- **L**iskov Substitution Principle
- **I**nterface Segregation Principle
- **D**ependency Inversion Principle

### 4. Expected Workflow Phases

The MCP server should guide you through:
1. **AUDIT**: Analyze the existing code without modifying it
2. **INVENTORY**: Catalog all SOLID violations and needed changes
3. **COMPARE/ANALYZE**: Evaluate different refactoring approaches
4. **DETERMINE/PLAN**: Finalize your refactoring strategy
5. **WRITE/REFACTOR**: Implement the refactored solution
6. **LINT**: Verify code quality
7. **ITERATE**: Fix any issues
8. **PRESENT**: Summarize the refactoring work

## Constraints

1. **DO NOT modify** the original files in `/refactor-test/src/`
2. **DO create** all refactored code in `/refactor-test/refactor-test-attempt/`
3. **DO maintain** all existing functionality
4. **DO ensure** all original tests still pass with your refactored code
5. **DO follow** the MCP server's workflow guidance

## Expected Deliverables

1. **Refactored Code Structure** in `refactor-test-attempt/` with:
   - Separated responsibilities into distinct services/classes
   - Proper interfaces and abstractions
   - Dependency injection where appropriate
   - Clean, testable code following SOLID principles

2. **Summary Report** including:
   - All SOLID violations found in the original code
   - How each violation was addressed
   - The new architecture and class structure
   - Benefits of the refactored design

## Success Criteria

The test is successful if:
1. The MCP server correctly identifies all SOLID violations
2. The workflow guides through all appropriate phases
3. The refactored code properly separates concerns
4. All original functionality is preserved
5. The refactored code is more maintainable and testable

## Getting Started

Begin by examining the UserService class at `/refactor-test/src/UserService.ts` and then use the MCP server's refactoring workflow tool to start the structured refactoring process.

Remember: Let the MCP server guide you through the workflow - this is a test of its guidance capabilities as much as it is a refactoring exercise.