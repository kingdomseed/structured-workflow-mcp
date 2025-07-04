# MCP Server Test Prompt: SOLID Principles Refactoring

## Test Objective

This prompt is designed to test the Structured Workflow MCP Server's ability to guide AI assistants through a professional refactoring workflow. The `refactor-test` folder contains a deliberately poorly designed TypeScript class that violates all SOLID principles, created specifically for testing the MCP server's guidance tools.

## Context

- **Location**: `/refactor-test/src/UserService.ts`
- **Purpose**: Test the MCP server's workflow guidance for refactoring
- **Test Type**: SOLID principles compliance and refactoring
- **MCP Server**: Structured Workflow MCP Server v0.2.3

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
- Follow the guidance provided by each phase tool (`mcp__structured-workflow__audit_inventory_guidance`, etc.)
- Allow the MCP server to guide you through the workflow phases
- **IMPORTANT**: Use `mcp__structured-workflow__phase_output` to record your work with actual output artifacts after each phase

**Note**: Different AI platforms may add prefixes to tool names (like `mcp_` or `mcp7_`). If you get "Unknown tool" errors, your platform may require a prefix. Check the available tools list or use `mcp__structured-workflow__discover_workflow_tools` for guidance.

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
1. **PLANNING**: Initial workflow setup and planning
2. **AUDIT_INVENTORY**: Analyze existing code and catalog all SOLID violations
3. **COMPARE_ANALYZE**: Evaluate different refactoring approaches
4. **QUESTION_DETERMINE**: Clarify ambiguities and finalize refactoring strategy
5. **WRITE_OR_REFACTOR**: Implement the refactored solution
6. **TEST**: Run tests to verify functionality
7. **LINT**: Verify code quality
8. **ITERATE**: Fix any issues from testing or linting
9. **PRESENT**: Summarize the refactoring work

## Constraints

1. **DO NOT modify** the original files in `/refactor-test/src/`
2. **DO create** all refactored code in `/refactor-test/refactor-test-attempt/`
3. **DO maintain** all existing functionality
4. **DO ensure** all original tests still pass with your refactored code
5. **DO follow** the MCP server's workflow guidance
6. **DO provide output artifacts** - The MCP server now requires actual documentation/output when completing each phase

### 5. Output Artifact Requirements

The MCP server now enforces that you provide actual output artifacts when completing each phase. You have two options:

**Option 1 - Create Files:**
```json
{
  "path": "/path/to/analysis.md",
  "format": "markdown",
  "description": "SOLID violations analysis",
  "content": "# Analysis\n\n## Violations Found\n..."
}
```

**Option 2 - Provide Structured JSON:**
```json
{
  "path": "audit-inventory-results",
  "format": "json", 
  "description": "Structured analysis of SOLID violations",
  "content": "{\"violations\": [...], \"recommendations\": [...]}"
}
```

The MCP server will validate that your artifacts contain meaningful content and are properly formatted.

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
2. The workflow guides through all appropriate phases with proper output artifacts
3. Each phase completion includes valid output artifacts (files OR structured JSON)
4. The refactored code properly separates concerns
5. All original functionality is preserved
6. The refactored code is more maintainable and testable
7. The MCP server's output artifact validation passes for each phase

## Getting Started

Begin by examining the UserService class at `/refactor-test/src/UserService.ts` and then use the MCP server's refactoring workflow tool to start the structured refactoring process.

Remember: Let the MCP server guide you through the workflow - this is a test of its guidance capabilities as much as it is a refactoring exercise.