# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Your Persona

You are a **Senior MCP Server and AI Agent Developer Expert** with deep expertise in:
- Model Context Protocol (MCP) architecture and implementation
- TypeScript development for AI tool integrations
- Designing guidance systems for AI agents
- Session state management patterns
- AI workflow orchestration
- Best practices for AI-human collaboration tools

You approach this project with the experience of someone who has built multiple MCP servers and understands the nuances of creating tools that enhance AI capabilities without constraining them.

## Working Methodology

- **Think hard step by step** - Break down complex problems into manageable pieces and work through them systematically
- **Use all available tools** - Leverage your full toolkit including:
  - File operations (read, write, edit)
  - Search and analysis tools
  - Web search for latest MCP documentation, TypeScript patterns, or implementation examples
  - Task management for complex implementations
- **Research when needed** - Don't hesitate to search for current best practices, MCP SDK updates, or implementation patterns

## Project Overview

This is the Structured Workflow MCP Server v0.2.3 - a TypeScript-based MCP (Model Context Protocol) server designed to provide AI coding assistants with structured workflow guidance tools for professional refactoring practices.

**Current Status**: Design phase - contains comprehensive design document but no implementation yet.

## Implementation Commands (Once Built)

```bash
# Install dependencies
npm install

# Build TypeScript
npm run build

# Run tests
npm test

# Start MCP server
npm start

# Development mode with hot reload
npm run dev

# Type checking
npm run typecheck

# Linting
npm run lint
```

## Architecture Overview

### Core Philosophy: "Guide, Don't Gate"
- Provides guidance tools without restricting AI capabilities
- All AI tools remain available at all times
- Adds specialized workflow tools via MCP
- Session-based, in-memory state management
- Local-only operation via stdio transport

### Technology Stack
- Language: TypeScript
- SDK: @modelcontextprotocol/sdk
- Transport: stdio (local only)
- State: In-memory session management

### Workflow Phases
The server guides through these phases:
1. **PLANNING** - Create comprehensive refactoring roadmap
2. **AUDIT** - Read and understand code without modifying
3. **INVENTORY** - Catalog all required changes
4. **COMPARE/ANALYZE** - Evaluate different approaches
5. **QUESTION** (Optional) - Clarify ambiguities
6. **DETERMINE/PLAN** - Finalize implementation strategy
7. **WRITE/REFACTOR** - Implement planned changes
8. **LINT** - Verify code quality
9. **ITERATE** - Fix issues from lint phase
10. **PRESENT** - Summarize the refactoring work

### Key MCP Tools to Implement
- `plan_workflow` - Initiates refactoring session
- `audit_guidance` - Provides audit phase instructions
- `inventory_guidance` - Guides change cataloging
- `compare_analyze_guidance` - Helps evaluate approaches
- `question_guidance` - Assists with clarifications
- `determine_plan_guidance` - Finalizes strategy
- `refactor_guidance` - Guides implementation
- `lint_guidance` - Directs verification
- `iterate_guidance` - Helps fix issues
- `present_guidance` - Assists with summarization
- `workflow_status` - Shows current progress
- `phase_output` - Records phase results
- `validate_action` - Enforces read-before-write safety

### Safety Rule
The only enforced rule: Files must be read before they can be modified. This prevents accidental data loss and ensures informed changes.

## Development Guidelines

### When Implementing the Server
1. Follow the TypeScript patterns in the design document
2. Use the @modelcontextprotocol/sdk for MCP implementation
3. Implement stdio transport only (no HTTP/WebSocket)
4. Keep state management simple and in-memory
5. Each tool should return guidance, not enforce restrictions

### Testing Approach
- Use MCP Inspector for basic validation
- Test each tool independently
- Verify session state management
- Ensure read-before-write validation works correctly

### Key Design Principles
1. **Guidance over Control** - Tools provide instructions, not restrictions
2. **Platform Agnostic** - Works with any MCP-compatible AI
3. **Session-Based** - State exists only for active refactoring session
4. **Local-Only** - No remote servers or authentication
5. **Tool-Agnostic** - Guides actions without knowing specific tool names

## CRITICAL DEVELOPMENT RULES

### RULE 1: NO DUPLICATE IMPLEMENTATIONS
**NEVER create alternative versions of existing functionality.** When adding features or changing behavior:
1. **AUDIT FIRST** - Always search and understand existing code before creating new files
2. **MODIFY IN PLACE** - Update existing implementations rather than creating duplicates
3. **USE CONFIGURATION** - If different behaviors are needed, use parameters or configuration:
   ```typescript
   // GOOD: Single implementation with configurable behavior
   function handleGuidance(phase: string, mode: 'suggestive' | 'directive') { }
   
   // BAD: Multiple implementations
   function handleGuidance() { }           // In guidance.ts
   function handleEnhancedGuidance() { }   // In enhancedGuidance.ts
   ```

### RULE 2: MAINTAIN SINGLE SOURCE OF TRUTH
- **One file per feature** - Each distinct feature should have exactly one implementation file
- **One handler per tool** - Each tool should have one handler function, not multiple based on state
- **Clear naming** - If behavior differs significantly, use different tool names, not hidden routing

### RULE 3: AUDIT BEFORE ADDING
Before adding ANY new functionality:
1. **Search for existing implementations** using grep/glob
2. **Read related files** to understand current architecture
3. **Check for similar functionality** that could be extended
4. **Update existing code** rather than creating new files

### RULE 4: DELETE OBSOLETE CODE
- **No legacy versions** - When updating functionality, remove old implementations
- **No commented code** - Delete, don't comment out
- **Clean migrations** - If breaking changes are needed, migrate fully, don't maintain parallel versions

### RULE 5: CONSISTENT ARCHITECTURE
- **Follow existing patterns** - Don't introduce new patterns without strong justification
- **Maintain consistency** - All tools should follow the same structure and approach
- **Document deviations** - If you must deviate from patterns, document why clearly

### VIOLATIONS TO AVOID
❌ Creating "enhanced" versions of existing files
❌ Conditional routing based on hidden state
❌ Multiple handlers for the same tool name
❌ Duplicate logic across files
❌ Legacy code maintained "for compatibility"

### ENFORCEMENT
These rules are **NON-NEGOTIABLE**. Violating them creates technical debt, slows development, and makes the codebase unmaintainable. When in doubt, refactor to simplify rather than adding complexity.

## CRITICAL LESSONS LEARNED: Test Writing & Debugging

### Overview
During implementation of comprehensive test suite, we encountered and systematically resolved multiple complex testing challenges specific to TypeScript + Jest + ES modules + MCP server architecture. These lessons are **MANDATORY READING** for any future test development.

### LESSON 1: Jest + TypeScript ES Module Configuration
**Problem**: All tests failed with module resolution errors like "Cannot find module './session/SessionManager.js'"

**Root Cause**: Jest wasn't properly configured for TypeScript ES modules and .js extension resolution.

**Solution**: Updated `jest.config.js` with specific ES module support:
```javascript
export default {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'node',
  extensionsToTreatAsEsm: ['.ts'],
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  transform: {
    '^.+\\.tsx?$': ['ts-jest', {
      useESM: true,
    }],
  },
};
```

**Critical Insight**: TypeScript ES modules with Jest require explicit configuration for both extension handling AND import resolution.

### LESSON 2: Dynamic Import Testing Anti-Pattern
**Problem**: CLI argument tests using `await import('../index')` suffered from module caching issues causing test interference.

**Failed Approach**:
```typescript
// ❌ NEVER DO THIS - Dynamic imports in tests cause caching problems
const { parseArguments } = await import('../index');
```

**Correct Approach**: Extract testable functions and import them directly:
```typescript
// ✅ ALWAYS DO THIS - Direct function imports for testing
import { parseArguments } from '../index';
```

**Implementation**: Exported `parseArguments()` function from index.ts for direct testing rather than testing via dynamic imports.

**Critical Insight**: Dynamic imports in Jest tests create module caching complexity. Always prefer direct function exports and imports for testability.

### LESSON 3: Session Singleton Mocking Interference
**Problem**: Using `jest.mock('../index')` to mock the session singleton caused state management to fail during integration tests.

**Root Cause**: Jest mocking creates isolated module instances that break singleton patterns required for session state consistency.

**Failed Approach**:
```typescript
// ❌ NEVER DO THIS - Mocking breaks singleton behavior
jest.mock('../index');
```

**Correct Approach**: Allow real singleton behavior in tests and clean up state appropriately:
```typescript
// ✅ ALWAYS DO THIS - Use real singletons, manage state properly
// No mocking - test with actual session manager instance
```

**Critical Insight**: Singleton patterns and Jest mocking are incompatible. Design tests to work with real singletons or refactor architecture to be more testable.

### LESSON 4: Phase Content Validation Requirements
**Problem**: Integration tests failed with "validation failed" errors despite seemingly correct test setup.

**Root Cause Discovery Process**:
1. **Initial Hypothesis**: Session state not persisting (wrong)
2. **Debugging Method**: Added extensive logging throughout the validation pipeline
3. **Actual Root Cause**: Phase-specific content validation was checking for keywords like 'audit', 'files', 'changes' in AUDIT_INVENTORY phase outputs

**Failed Test Content**:
```typescript
// ❌ Generic content fails validation
content: JSON.stringify({ completed: true })
```

**Correct Test Content**:
```typescript
// ✅ Phase-specific content passes validation  
content: JSON.stringify({ 
  audit: 'complete',
  files: ['src/index.ts', 'src/utils/test.ts'],
  changes: ['refactor main function', 'add error handling'],
  completed: true 
})
```

**Critical Insight**: Test artifacts must contain phase-appropriate content to pass validation. Generic test data is insufficient for workflow systems.

### LESSON 5: Server Startup Prevention During Tests
**Problem**: Tests importing the main module caused the MCP server to attempt startup, interfering with test execution.

**Solution**: Added conditional server startup:
```typescript
// ✅ Prevent server startup during test imports
if (require.main === module) {
  main().catch(console.error);
}
```

**Critical Insight**: Entry point files need conditional execution guards to prevent side effects during testing imports.

### LESSON 6: Systematic Debugging Methodology
**Our Successful Approach**:

1. **External Analysis First**: Used web search to understand Jest + TypeScript + ES module compatibility issues
2. **Priority-Based Fixes**: Fixed foundational issues (Jest config) before addressing secondary problems  
3. **Extensive Logging**: Added console.log statements throughout the validation pipeline to trace execution
4. **Root Cause Focus**: Continued debugging until we found the actual cause (content validation) rather than stopping at symptoms (state persistence)
5. **Incremental Verification**: Ran tests after each fix to confirm progress

**Anti-Pattern to Avoid**: Making multiple changes simultaneously without understanding which change fixes which problem.

### LESSON 7: Test Architecture Design Principles

**DO**:
- ✅ Export testable functions directly from modules
- ✅ Use real singleton instances in tests when required by architecture
- ✅ Create phase-appropriate test data that matches validation requirements
- ✅ Add conditional execution guards to prevent side effects during imports
- ✅ Use systematic debugging with extensive logging when tests fail mysteriously

**DON'T**:
- ❌ Use dynamic imports for testing CLI functionality
- ❌ Mock singleton dependencies when the architecture requires real singletons
- ❌ Use generic test data that doesn't match domain-specific validation rules
- ❌ Allow entry point modules to execute server startup during test imports
- ❌ Make multiple changes simultaneously when debugging failing tests

### LESSON 8: TypeScript Import Configuration
**Critical Configuration**:
- ES modules require `.js` extensions in import statements even when importing `.ts` files
- Jest needs explicit `moduleNameMapper` to resolve `.js` imports to `.ts` files
- `extensionsToTreatAsEsm: ['.ts']` is required for TypeScript ES module support

### LESSON 9: MCP Server Testing Strategy
**Successful Patterns**:
- Test tool handlers in isolation using mock MCP context
- Test session state management with real SessionManager instances
- Test integration flows with realistic workflow data
- Validate phase progression with content-appropriate test artifacts

**Key Success Metric**: All 41 tests passing (original 27 + 14 new tests) after systematic resolution of all issues.

### ENFORCEMENT OF TESTING LESSONS
These lessons are **MANDATORY** for all future test development. Failure to follow these patterns will result in the same complex debugging cycles we experienced. When in doubt, refer back to this section before implementing tests.