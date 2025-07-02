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

This is the Structured Workflow MCP Server v2.0 - a TypeScript-based MCP (Model Context Protocol) server designed to provide AI coding assistants with structured workflow guidance tools for professional refactoring practices.

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