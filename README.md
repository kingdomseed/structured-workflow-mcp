# Structured Workflow MCP Server

[![Buy Me a Coffee](https://img.shields.io/badge/Buy%20Me%20a%20Coffee-FFDD00?style=flat&logo=buy-me-a-coffee&logoColor=black)](https://coff.ee/jasonholtdigital)

An MCP server that enforces disciplined programming practices by requiring AI assistants to audit their work and produce verified outputs at each phase of development.

## Why I Built This

**TLDR**: I found that prompting with these two words: INVENTORY and AUDIT, make AI think systematically and follow structured phases in development, but got tired of repeating them across every platform and prompt - so I built this MCP server to enforce this discipline automatically.

After a year of heavy AI development usage, I got frustrated with AI not thinking through problems the way I do.

When I approach a problem, I ask: How are these components connected? How do they relate to other systems? What side effects will this change produce? What steps ensure success? What already exists in my codebase?

AI skips this analysis. It jumps into code changes without understanding the system it's building into. It creates new classes and folder structures when they already exist. It adds code without understanding component relationships or potential side effects.

Planning modes helped, but didn't always force the AI to break down the problem properly, especially in larger existing codebases. Eventually I discovered two key words: inventory and audit. Forcing AI to INVENTORY and AUDIT before acting was the key to getting the model to be thorough and disciplined in understanding the system it was building into. *But* I had to keep repeating these instructions across multiple prompts and different AI platforms. I spent time with each of these - Cursor, Windsurf, Claude Code, Cline - a lot of time and a lot of tokens trying to get consistent the models to follow clear steps to arrive at a proper solution that fits the system it's building into.

I looked for existing MCP tools but didn't find anything quite like what I needed. The [Sequential Thinking MCP server](https://github.com/modelcontextprotocol/servers/tree/main/src/sequentialthinking) was inspiring (and I still use this a lot), but I needed something that went further - forcing AI to follow structured phases and produce verifiable output before proceeding.

So I built this for myself. I need this kind of disciplined workflow. If others find it useful, great. If not, no worries - I'll keep using it because it solves my problem.

I'm sharing this in case others have similar frustrations. Contributions, improvements, and discussion are welcome.

## Features

**Enforced Workflow Phases** - AI must complete specific phases in order (audit, analysis, planning, implementation, testing, etc.)

**Mandatory Output Artifacts** - Each phase requires structured documentation or verified outputs before proceeding

**Multiple Workflow Types**:
- Refactor workflows for code improvement  
- Feature development with integrated testing
- Test-focused workflows for coverage improvement
- Test-driven development (TDD) cycles
- Custom workflows for specialized needs

**Output Verification** - The server validates that outputs contain meaningful content and proper structure

**Session State Management** - Tracks progress and prevents skipping phases

## Example Output Artifacts

The server enforces that AI produces structured outputs like these:

**AUDIT_INVENTORY Phase Output:**
```json
{
  "filesAnalyzed": ["lib/auth/user_service.dart", "lib/auth/auth_middleware.dart"],
  "dependencies": {
    "providers": ["userProvider", "authStateProvider"],
    "models": ["User", "AuthToken"]
  },
  "issues": [
    "Single Responsibility Principle violation - handles too many concerns",
    "File approaching 366 lines - recommended to keep widgets smaller"
  ],
  "changesList": [
    {
      "action": "CREATE",
      "file": "lib/auth/components/auth_form.dart",
      "description": "Extract authentication form logic",
      "justification": "Component focused on form validation only"
    }
  ]
}
```

**COMPARE_ANALYZE Phase Output:**
```json
{
  "approaches": [
    {
      "name": "Incremental Component Extraction",
      "complexity": "Medium",
      "risk": "Low", 
      "timeEstimate": "30-45 minutes"
    }
  ],
  "recommendation": "Incremental Component Extraction",
  "justification": "Provides best balance of benefits vs. risk",
  "selectedImplementationOrder": [
    "1. Extract form component (lowest risk)",
    "2. Create validation service",
    "3. Refactor main view"
  ]
}
```

Each phase requires documented analysis and planning before the AI can proceed to implementation.

## Installation

```bash
# Clone the repository
git clone https://github.com/kingdomseed/structured-workflow-mcp
cd structured-workflow-mcp

# Install dependencies and build
npm install
npm run build
```

## Configuration

### Claude Desktop
Add to your `claude_desktop_config.json`:

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

### VS Code / Cursor / Windsurf
Add to your MCP configuration:

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

## Tools

### Workflow Entry Points

**refactor_workflow** - Start a structured refactoring process with required analysis and planning phases

**create_feature_workflow** - Develop new features with integrated testing and documentation requirements  

**test_workflow** - Add test coverage with mandatory analysis of what needs testing

**tdd_workflow** - Implement Test-Driven Development with enforced Red-Green-Refactor cycles

**build_custom_workflow** - Create workflows with custom phases and validation requirements

### Phase Guidance Tools

- **audit_inventory_guidance** - Forces thorough code analysis and change cataloging

- **compare_analyze_guidance** - Requires evaluation of multiple approaches with pros/cons

- **question_determine_guidance** - Mandates clarification and finalized planning

- **phase_output** - Validates and records structured outputs from each phase

- **workflow_status** - Check current progress and validation state

## Usage

The server enforces structured workflows through mandatory phases. Each workflow type has different phase requirements:

- **Refactor Workflow**: AUDIT_INVENTORY → COMPARE_ANALYZE → QUESTION_DETERMINE → WRITE_OR_REFACTOR → LINT → ITERATE → PRESENT

- **Feature Workflow**: PLANNING → QUESTION_DETERMINE → WRITE_OR_REFACTOR → TEST → LINT → ITERATE → PRESENT  

- **Test Workflow**: AUDIT_INVENTORY → QUESTION_DETERMINE → WRITE_OR_REFACTOR → TEST → ITERATE → PRESENT

- **TDD Workflow**: PLANNING → WRITE_OR_REFACTOR → TEST → (Red-Green-Refactor cycles) → LINT → PRESENT

### Input Validation

The server requires:
- `task` (string): Description of what you want to accomplish
- `outputArtifacts` (array): Structured documentation for each completed phase

### Output Validation

Each phase completion is validated for:
- Meaningful content length (minimum 10 characters)
- Valid JSON format for structured outputs
- Phase-specific content requirements
- Proper documentation of decisions and analysis

### Safety Rule

Files must be read before modification. This prevents accidental data loss and ensures informed changes.

## Development

```bash
npm run dev      # TypeScript compiler in watch mode  
npm run lint     # Run linter
npm run typecheck # Type checking
npm test         # Run tests
```

## How It Works

1. AI starts a workflow using one of the entry point tools
2. Server creates a session and tracks phase progression  
3. Each phase requires specific outputs before proceeding
4. The `phase_output` tool validates artifacts have meaningful content
5. AI cannot skip phases or claim completion without verified outputs
6. Session state prevents circumventing the structured approach

## Testing the MCP Server

You can quickly try out the Structured Workflow MCP server using the test prompts and helper scripts included in this repository.

1. Build the server (if you haven't already):
   ```bash
   npm run build
   ```
2. Start the server:
   ```bash
   node dist/index.js
   ```
3. Open the test prompt [`docs/test_prompt/mcp_server_test_prompt.md`](docs/test_prompt/mcp_server_test_prompt.md) in your preferred MCP-compatible AI client and paste the contents.
4. Alternatively, open the sample project located in [`refactor-test/`](refactor-test) for an end-to-end refactor workflow demo. Follow the steps in its `README.md` to run and observe the structured workflow in action.
5. Watch the AI progress through each phase and verify the structured outputs produced.

## Sample Prompts

The [`docs/sample_prompts`](docs/sample_prompts) directory contains several ready-to-use prompts illustrating typical workflows:

- `feature_workflow_prompt.md`
- `refactor_workflow_prompt.md`
- `test_workflow_prompt.md`
- `tdd_workflow_prompt.md`
- `custom_workflow_prompt.md`

Use these as a starting point and adapt them to your projects.

## Building

```bash
npm install
npm run build
```

The server uses TypeScript with the @modelcontextprotocol/sdk and runs locally via stdio transport.

## Pull Requests Welcome

We welcome and encourage pull requests! Whether you're fixing bugs, adding features, or improving documentation, your contributions are valuable.

Please follow these steps:

1. Fork the repository on GitHub.
2. Create a new branch: `git checkout -b feature/your-feature`.
3. Make your changes and commit with clear, descriptive messages.
4. Write tests for any new functionality and ensure all existing tests pass.
5. Push to your branch: `git push origin feature/your-feature`.
6. Open a pull request and describe your changes clearly.

See [CONTRIBUTING.md](CONTRIBUTING.md) for more details, if available.  

Thank you for contributing!

## License

This MCP server is licensed under the MIT License. This means you are free to use, modify, and distribute the software, subject to the terms and conditions of the MIT License.