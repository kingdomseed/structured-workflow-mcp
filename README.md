# Structured Workflow MCP Server

A Model Context Protocol (MCP) server that provides intelligent workflow guidance for AI-assisted code refactoring. This server adds specialized workflow tools to your AI assistant without restricting access to any existing capabilities.

## Core Philosophy: Create Methodical Approach for AI to Follow

- **All tools remain available** - Your AI keeps access to all its built-in tools
- **Intelligent guidance** - Our tools provide phase-specific instructions and recommendations
- **Platform-agnostic** - Works with any MCP-compatible AI (Claude, Cursor, Windsurf, etc.)
- **Local-only** - Simple stdio transport, no remote servers needed

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

Always begin with the `plan_workflow` tool:

```
plan_workflow({ 
  task: "Refactor the authentication system to use JWT tokens",
  context: {
    targetFiles: ["auth.js", "middleware/auth.js"],
    scope: "directory"
  }
})
```

### Following the Phases

The workflow guides you through these phases:

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

### Available Tools

- `plan_workflow` - Start here to create a refactoring plan
- `audit_guidance` - Get instructions for code analysis phase
- `inventory_guidance` - Learn how to catalog needed changes
- `compare_analyze_guidance` - Guidance for evaluating approaches
- `question_guidance` - When you need to clarify requirements
- `determine_plan_guidance` - Finalize your implementation strategy
- `refactor_guidance` - Get instructions for making changes
- `lint_guidance` - Learn how to verify your changes
- `iterate_guidance` - Guidance for fixing issues
- `present_guidance` - How to summarize your work
- `workflow_status` - Check progress and session state
- `phase_output` - Record results from each phase
- `validate_action` - Ensures files are read before modification
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

## How It Works

1. When you connect this MCP server, your AI retains all its existing tools
2. Our server adds workflow-specific guidance tools
3. You follow the phase-based workflow for structured refactoring
4. Session state is maintained in memory during the connection
5. The only enforcement is the read-before-write safety rule

## Example Workflow

```
User: "I need to refactor the user service to use dependency injection"

AI: I'll help you refactor the user service. Let me start by creating a plan.
[Calls plan_workflow]

AI: Now I'll begin the AUDIT phase to understand the current implementation.
[Calls audit_guidance]
[Uses built-in file reading tools based on guidance]

AI: I've completed my audit. Let me create an inventory of needed changes.
[Calls inventory_guidance]
[Documents all required modifications]

... continues through all phases ...

AI: Here's my final summary of the refactoring work completed.
[Calls present_guidance]
[Provides comprehensive summary]
```

## License

MIT