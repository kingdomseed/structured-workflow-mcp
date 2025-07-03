# Structured Workflow MCP Server

**Version**: 0.2.1

An open-source TypeScript-based Model Context Protocol (MCP) server that provides AI coding assistants with structured workflow guidance tools for professional development practices. This server adds specialized workflow tools to your AI assistant without restricting access to any existing capabilities.

## Core Philosophy: "Guide, Don't Gate"

- **Non-restrictive** - AI retains all its existing tools and capabilities
- **Additive** - MCP tools enhance, not replace existing functionality  
- **Guidance-based** - Provides instructions and recommendations, not enforcement
- **One hard rule** - Files must be read before modification (for safety)
- **Platform-agnostic** - Works with any MCP-compatible AI (Claude, Cursor, Windsurf, etc.)
- **Local-only** - Simple stdio transport, no remote servers needed

## Key Features

### 🚀 Multiple Workflow Types (v0.2.1)

1. **Refactor Workflow** - Code improvement without changing functionality
2. **Feature Workflow** - New functionality with integrated testing  
3. **Test Workflow** - Focused test coverage improvement
4. **TDD Workflow** - Test-Driven Development cycles
5. **Custom Workflow** - Build your own with `build_custom_workflow`

### 🎯 Core Capabilities

- **Session Management** - Comprehensive state tracking throughout workflow
- **Iteration Limits** - Configurable with automatic escalation to user input
- **Real-Time Output** - Generates documentation in `workflow-output/` directory
- **Validation System** - Phase completion requirements with blocking messages
- **Safety Enforcement** - Read-before-write file protection
- **Language Agnostic** - Works with any programming language or framework

## Installation

```bash
# Clone the repository
git clone <repository-url>
cd structured-workflow-mcp

# Install dependencies
npm install

# Build the TypeScript code
npm run build
```

## Configuration

### For Claude Desktop

Add to your Claude Desktop configuration:

```json
{
  "mcpServers": {
    "structured-workflow": {
      "command": "node",
      "args": ["/path/to/structured-workflow-mcp/dist/index.js"]
    }
  }
}
```

### For Cursor/Windsurf

Add to your MCP settings:

```json
{
  "mcp": {
    "servers": {
      "structured-workflow": {
        "command": "node",
        "args": ["/path/to/structured-workflow-mcp/dist/index.js"]
      }
    }
  }
}
```

## Usage

### Starting a Workflow

Choose the appropriate workflow for your task:

#### Option 1: Use a Specialized Workflow

```javascript
// For code improvements
refactor_workflow({ 
  task: "Refactor the authentication system to use JWT tokens",
  context: {
    targetFiles: ["auth.js", "middleware/auth.js"],
    scope: "directory"
  }
})

// For new features
create_feature_workflow({
  task: "Add user profile management API endpoints"
})

// For test coverage
test_workflow({
  task: "Write unit tests for the payment processing module"
})

// For Test-Driven Development
tdd_workflow({
  task: "Implement shopping cart functionality using TDD"
})
```

#### Option 2: Build a Custom Workflow

```javascript
build_custom_workflow({
  task: "Complex refactoring with custom phases",
  selectedPhases: ["AUDIT_INVENTORY", "COMPARE_ANALYZE", "WRITE_OR_REFACTOR", "LINT", "PRESENT"],
  iterationLimits: { TEST: 10, LINT: 15, ITERATE: 20 }
})
```

### Workflow Phases

Different workflows use different phase sequences:

#### Refactor Workflow
1. **AUDIT_INVENTORY** - Analyze code AND catalog all required changes
2. **COMPARE_ANALYZE** - Evaluate different approaches
3. **QUESTION_DETERMINE** - Clarify requirements AND finalize plan
4. **WRITE_OR_REFACTOR** - Implement changes
5. **LINT** - Verify code quality
6. **ITERATE** - Fix issues
7. **PRESENT** - Summarize work

#### Feature Workflow
1. **PLANNING** - Create comprehensive plan
2. **QUESTION_DETERMINE** - Clarify and finalize approach
3. **WRITE_OR_REFACTOR** - Implement new functionality
4. **TEST** - Run tests to verify
5. **LINT** - Check code quality
6. **ITERATE** - Fix any issues
7. **PRESENT** - Summarize work

#### Test Workflow
1. **AUDIT_INVENTORY** - Understand what needs testing
2. **QUESTION_DETERMINE** - Plan test strategy
3. **WRITE_OR_REFACTOR** - Write tests
4. **TEST** - Run tests
5. **ITERATE** - Fix failing tests
6. **PRESENT** - Summarize coverage

#### TDD Workflow
1. **PLANNING** - Plan the feature
2. **WRITE_OR_REFACTOR** - Write failing test
3. **TEST** - Verify test fails (Red)
4. **WRITE_OR_REFACTOR** - Write implementation
5. **TEST** - Verify test passes (Green)
6. **WRITE_OR_REFACTOR** - Refactor (optional)
7. **LINT** - Final quality check
8. **PRESENT** - Summarize work

### Available Tools

#### Workflow Entry Points
- `refactor_workflow` - Start a refactoring workflow
- `create_feature_workflow` - Start a feature creation workflow
- `test_workflow` - Start a test writing workflow
- `tdd_workflow` - Start a TDD workflow
- `build_custom_workflow` - Create a custom workflow with your phases

#### Phase Guidance Tools
- `audit_inventory_guidance` - Combined analysis and cataloging guidance
- `compare_analyze_guidance` - Guidance for evaluating approaches
- `question_determine_guidance` - Combined clarification and planning guidance
- `refactor_guidance` - Get instructions for making changes
- `test_guidance` - Guidance for running tests
- `lint_guidance` - Learn how to verify code quality
- `iterate_guidance` - Guidance for fixing issues
- `present_guidance` - How to summarize your work

#### Workflow Management
- `workflow_status` - Check current progress and session state
- `phase_output` - Record results from each phase
- `validate_action` - Ensures files are read before modification
- `validate_phase_completion` - Check if phase requirements are met
- `user_input_required_guidance` - Handle escalation scenarios
- `discover_workflow_tools` - See all available workflow tools

### The Only Hard Rule

**You must read a file before you can modify it.** This is enforced automatically to prevent accidental data loss. Everything else is guidance to help you work more effectively.

## Development

```bash
# Run TypeScript compiler in watch mode
npm run dev

# Run linter
npm run lint

# Type checking
npm run typecheck

# Run tests (when implemented)
npm test
```

## Architecture Overview

### Technology Stack
- **Language**: TypeScript
- **SDK**: @modelcontextprotocol/sdk (v1.0.4)
- **Transport**: stdio (local only)
- **State Management**: In-memory session-based

### Key Components

1. **Session Manager** - Tracks workflow progress, file history, and validation states
2. **Workflow Handler** - Executes workflows with shared logic across types
3. **Workflow Presets** - Defines configurations for each workflow type
4. **Tool Implementations** - Individual tool handlers for each MCP tool
5. **Type System** - Comprehensive TypeScript types for safety

### Design Principles

- **Language/Framework Agnostic** - Works with any programming language
- **Tool-Name Agnostic** - Describes actions, not specific tool names
- **Directive Guidance** - Uses "MUST", "REQUIRED" for AI optimization
- **DRY Architecture** - Shared WorkflowHandler avoids duplication
- **Backward Compatible** - All original tools still functional

## How It Works

1. AI connects to the MCP server via stdio transport
2. Chooses appropriate workflow type based on task
3. Follows phase-by-phase guidance using directive instructions
4. Uses existing tools based on guidance recommendations
5. Records outputs and progress in real-time
6. Escalates to user input when iteration limits reached

## Example Workflows

### Refactoring Example

```
User: "Refactor the user service to use dependency injection"

AI: I'll help you refactor the user service. Let me start with the refactor workflow.
[Calls refactor_workflow]

AI: Starting AUDIT_INVENTORY phase to analyze and catalog changes...
[Calls audit_inventory_guidance]
[Uses file reading and search tools]
[Documents all required changes]

AI: Moving to COMPARE_ANALYZE phase to evaluate approaches...
[Calls compare_analyze_guidance]
[Compares different DI patterns]

... continues through all phases ...

AI: Here's my final summary with all changes implemented.
[Calls present_guidance]
```

### TDD Example

```
User: "Create a shopping cart module using TDD"

AI: I'll implement the shopping cart using Test-Driven Development.
[Calls tdd_workflow]

AI: First, I'll write a failing test for adding items...
[Calls refactor_guidance - for test writing]
[Writes test]

AI: Running the test to verify it fails...
[Calls test_guidance]
[Test fails as expected - Red phase]

AI: Now implementing minimal code to pass...
[Calls refactor_guidance - for implementation]
[Writes code]

AI: Running test again...
[Calls test_guidance]
[Test passes - Green phase]

... continues with more test cycles ...
```

## Advanced Features

### Iteration Management
- Configurable limits per phase (TEST, LINT, ITERATE)
- Automatic escalation to user input when stuck
- Prevents infinite loops while maintaining flexibility

### Real-Time Output
- Generates documentation in `workflow-output/` directory
- Markdown and JSON formats available
- Progress tracking and phase artifacts

### Validation System
- Phase completion requirements
- Self-check questions for AI verification
- Blocking messages for critical steps

## Troubleshooting

### Common Issues

1. **"No active session" error**
   - Start a workflow using one of the workflow entry points first

2. **"Cannot modify file before reading" error**
   - This is the safety rule - read the file first, then modify

3. **Iteration limit reached**
   - The system will prompt for user input
   - You can continue, skip, or modify requirements

4. **Workflow selection**
   - Use `refactor_workflow` for code improvements
   - Use `create_feature_workflow` for new functionality
   - Use `test_workflow` for adding tests
   - Use `tdd_workflow` for test-first development

## Contributing

This is an open-source project and contributions are welcome! 

### How to Contribute

1. **Fork the repository** - Create your own fork to work on
2. **Create a feature branch** - `git checkout -b feature/your-feature-name`
3. **Make your changes** - Ensure TypeScript types are properly defined
4. **Test your changes** - Add tests for new features
5. **Submit a Pull Request** - Include a clear description of changes

### Contribution Guidelines

- Follow the existing code patterns and architecture
- Maintain the "Guide, Don't Gate" philosophy
- Update documentation for new features
- Include tests for new functionality
- Keep the tool language/framework agnostic

### Reporting Issues

Found a bug or have a feature request? Please open an issue on GitHub with:
- Clear description of the problem or feature
- Steps to reproduce (for bugs)
- Expected vs actual behavior
- Your environment details (OS, AI platform, etc.)

## Version History

- **v0.2.1** - First published open-source release with multiple workflow types
- **v0.2.0** - Added workflow presets and enhanced guidance
- **v0.1.0** - Initial development version with basic workflow support

## License

MIT