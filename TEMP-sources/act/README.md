# Agentic Coding Toolkit

[![Discord](https://img.shields.io/badge/Discord-Join%20Community-5865F2?logo=discord&logoColor=white)](https://nnbd.me/discord)
[![Docs](https://img.shields.io/badge/Docs-agentictoolkit.dev-blue?logo=readthedocs&logoColor=white)](https://docs.agentictoolkit.dev)

A collection of commands, agents, skills, and knowledge for AI-assisted Flutter development with Claude Code, OpenCode, Cursor, and Codex.

## Why This Toolkit?

AI agents can speed up development, but without proper guardrails they produce inconsistent results. This toolkit provides:

- **Structured workflows** that guide AI through interview → Spec → refine → Work Items → implementation
- **Flutter-specific knowledge** including principles, patterns, and breaking changes
- **Automated git workflows** for commits, branches, worktrees, and PRs
- **Hooks** that automate tasks like formatting Dart files after edits

The goal: AI-assisted development with a focus on quality over speed.

## Documentation

For detailed documentation, see the docs site:

### 🔗 [https://docs.agentictoolkit.dev](https://docs.agentictoolkit.dev)

## Installation

### 1) Clone once

```bash
git clone https://github.com/CodeWithAndreaPro/agentic-coding-toolkit ~/.agentic-coding-toolkit
```

### 2) Install for your CLI

#### Claude Code

```bash
cd ~/.agentic-coding-toolkit && ./scripts/install.sh --tool claude
```

For a separate Claude Code config, pass the Claude-only config directory:

```bash
cd ~/.agentic-coding-toolkit && ./scripts/install.sh --tool claude --config-dir ~/.claude-work
```

You can also use Claude Code's `CLAUDE_CONFIG_DIR` environment variable:

```bash
CLAUDE_CONFIG_DIR=~/.claude-work ./scripts/install.sh --tool claude
```

Claude config precedence is `--config-dir` first, then `CLAUDE_CONFIG_DIR`, then `~/.claude`.

#### OpenCode

```bash
cd ~/.agentic-coding-toolkit && ./scripts/install.sh --tool opencode
```

#### Cursor

```bash
cd ~/.agentic-coding-toolkit && ./scripts/install.sh --tool cursor
```

Restart Cursor after install so it reloads the local plugin.

#### Codex

```bash
cd ~/.agentic-coding-toolkit && ./scripts/install.sh --tool codex
```

ACT installs generated Codex-compatible skill copies under `~/.codex/skills/`, generated custom agents under `~/.codex/agents/`, and Codex hooks under `~/.codex/hooks/`.

Codex has near-feature parity with Claude Code and OpenCode. Canonical source skills remain shared with Claude Code, OpenCode, and Cursor; Codex gets generated compatibility copies because Codex does not support some tool-facing instructions such as `AskUserQuestion`. Re-run `./scripts/install.sh --tool codex` after updating ACT to regenerate Codex skill copies. If Codex still shows stale skill wording, restart Codex.

### 3) Verify install

Within CLI/agent session, run:

```text
/act-help
```

In Codex, use `/skills` to discover ACT skills, or mention a skill directly where supported, for example: `$act-create-issues`.

### What gets installed where

| CLI | Symlink location | Includes |
|-----|------------------|----------|
| Claude Code | `~/.claude/`, or the resolved Claude config directory | commands, agents, skills, and Claude hooks |
| OpenCode | `~/.config/opencode/` | commands, skills, and OpenCode hooks plugin |
| Cursor | `~/.cursor/plugins/local/agentic-coding-toolkit` | local plugin manifest plus repo-root skills, commands, and agents (experimental) |
| Codex | `~/.codex/skills/`, `~/.codex/agents/`, and `~/.codex/hooks/` | generated Codex-compatible skill copies, generated custom agents, and Codex hooks |

The installer also writes shared ACT settings to `~/.config/agentic-coding-toolkit/act-settings.json`.

Managed settings keys:

- `enableLogging`: enables ACT logging hooks when set to `true`
- `toolkitPath`: absolute path to the current ACT checkout, used by installed runtime helpers to find ACT-owned scripts from any caller working directory

If you move or reclone the toolkit to a different path, rerun `./scripts/install.sh --tool <claude|opencode|cursor|codex>` for each CLI so `toolkitPath` is refreshed. For custom Claude configs, rerun install with the same `--config-dir` or `CLAUDE_CONFIG_DIR` value you used originally.

## Updating

### 1) Update toolkit repository

Within a Claude/OpenCode/Cursor session, run:

```text
/act-update
```

### 2) Refresh symlinks for your CLI

`/act-update` does not run installer scripts automatically, so rerun install for each CLI to apply installer updates, including settings bootstrap updates.

#### Claude Code

```bash
cd ~/.agentic-coding-toolkit && ./scripts/install.sh --tool claude
```

For a custom Claude config, rerun install against the same target:

```bash
cd ~/.agentic-coding-toolkit && ./scripts/install.sh --tool claude --config-dir ~/.claude-work
```

#### OpenCode

```bash
cd ~/.agentic-coding-toolkit && ./scripts/install.sh --tool opencode
```

#### Cursor

```bash
cd ~/.agentic-coding-toolkit && ./scripts/install.sh --tool cursor
```

#### Codex

```bash
cd ~/.agentic-coding-toolkit && ./scripts/install.sh --tool codex
```

Codex skill bodies are generated copies, so rerun this command after ACT updates. Restart Codex if the `/skills` output or `$act-*` wording looks stale.

If you use multiple CLIs, run each relevant command.

### 3) Restart and verify

Restart your CLI/editor session, then verify:

```text
/act-help
```

## Uninstalling

### Claude Code

```bash
cd ~/.agentic-coding-toolkit && ./scripts/uninstall.sh --tool claude
```

For a custom Claude config:

```bash
cd ~/.agentic-coding-toolkit && ./scripts/uninstall.sh --tool claude --config-dir ~/.claude-work
```

Or use the environment variable when it matches the config you want to remove from:

```bash
CLAUDE_CONFIG_DIR=~/.claude-work ./scripts/uninstall.sh --tool claude
```

### OpenCode

```bash
cd ~/.agentic-coding-toolkit && ./scripts/uninstall.sh --tool opencode
```

### Cursor

```bash
cd ~/.agentic-coding-toolkit && ./scripts/uninstall.sh --tool cursor
```

After running the uninstall script, `/act-*` skills will remain visible until you fully close and restart Cursor (not just the current window).

### Codex

```bash
cd ~/.agentic-coding-toolkit && ./scripts/uninstall.sh --tool codex
```

## Workflow Overview

The toolkit follows a structured development lifecycle built around direct workflow skills. Run `/act-config` once per project before creating workflow artifacts.

- Claude Code: invoke `/act-*` workflow skills directly
- Cursor: invoke `/act-*` workflow skills directly
- OpenCode: use `/skills` to discover and run the same workflow skills
- Codex: use `/skills` to discover ACT skills, or mention a skill such as `$act-create-spec` where supported

```
/act-interview "add user authentication"
↓ Resolves intent, constraints, assumptions, and decision dependencies

/act-create-spec
↓ Creates a Spec with traceable requirements

/act-refine-spec ai_specs/0001-auth/spec.md  (optional)
↓ Reviews the Spec for contradictions, gaps, wrong assumptions, and codebase misalignment

/act-create-issues ai_specs/0001-auth/spec.md
↓ Creates approved Work Item files that can be executed independently

/act-implement ai_specs/0001-auth/work-items/01-auth.md
↓ Implements one Work Item or a small Spec
```

Each stage produces artifacts that inform the next, reducing ambiguity and rework.

### Migrating From Deprecated Workflow Skills

The older `act-workflow-*` skills remain available for compatibility, but the workflow above is now recommended.

| Deprecated skill | Recommended replacement |
|------------------|-------------------------|
| `/act-workflow-spec` | `/act-interview` + `/act-create-spec` |
| `/act-workflow-refine-spec` | `/act-refine-spec` |
| `/act-workflow-plan` | `/act-create-issues` |
| `/act-workflow-work` | `/act-implement` |

`/act-workflow-compound` remains available for capturing reusable session insights.

## Skills

Skills provide specialized capabilities invoked directly.

| Skill | Description |
|-------|-------------|
| `/act-flutter-create` | Create Flutter project with lints and analysis options |
| `/act-dart-create` | Create Dart CLI project with recommended setup |
| `/act-config` | Configure ACT workflow storage for the current working directory |
| `/act-interview` | Resolve intent, language, constraints, and decision dependencies before creating a Spec |
| `/act-interview-flutter` | Resolve Flutter/Dart UX, state, platform, and testing decisions before creating a Spec |
| `/act-create-spec` | Create a Spec from the current conversation context |
| `/act-create-spec-flutter` | Create a Flutter/Dart Spec with user flows, states, and test seams captured |
| `/act-refine-spec` | Review an ACT Spec for contradictions, gaps, wrong assumptions, and codebase misalignment |
| `/act-refine-spec-flutter` | Review a Spec for Flutter/Dart codebase alignment, UX gaps, and platform assumptions |
| `/act-create-issues` | Turn a Spec into approved Work Items |
| `/act-create-issues-flutter` | Turn a Spec into Flutter/Dart vertical-slice Work Items |
| `/act-implement` | Implement a Work Item or Spec |
| `/act-implement-flutter` | Implement a Flutter/Dart Work Item or Spec with appropriate tests and verification |
| `/act-workflow-spec` | Deprecated: create specification from task description; prefer `/act-interview` + `/act-create-spec` |
| `/act-workflow-refine-spec` | Deprecated: critically review spec for gaps, wrong assumptions, and UX issues; prefer `/act-refine-spec` |
| `/act-workflow-plan` | Deprecated: create phased implementation plan from a spec or task; prefer `/act-create-issues` |
| `/act-workflow-work` | Deprecated: execute a plan phase by phase with reconciliation and validation; prefer `/act-implement` |
| `/act-workflow-compound` | Capture reusable session insights in `ai_docs/solutions/` |
| `/act-flutter-development` | Flutter/Dart knowledge router (principles, patterns, rules) |
| `/act-figma-to-flutter` | Inspect Figma MCP designs for Flutter work before planning assets, tokens, or implementation |
| `/act-dart-migrate-dot-shorthand` | Migrate codebase to Dart 3.10+ dot shorthand syntax |
| `/act-dart-migrate-primary-constructors` | Migrate eligible Dart declarations to experimental primary-constructor syntax |
| `/act-flutter-pub-upgrade-major` | Upgrade dependencies to latest major versions with verification |
| `/act-flutter-screenshot` | Capture screenshots from running apps for visual verification |
| `/act-flutter-driver-mcp` | Set up Flutter Driver entrypoints for Dart MCP runtime interaction |
| `/act-flutter-robot-testing` | Guidance for robot-driven widget journey tests and stable selectors |
| `/act-flutter-drift-setup` | Set up Drift (SQLite) with cross-platform connection support |
| `/act-download-flutter-rules` | Fetch latest official Flutter rules |
| `/act-git-commit` | Conventional commit for staged changes |
| `/act-git-commit-all` | Conventional commit for all changes |
| `/act-git-push-make-pr` | Push current branch to GitHub and create a pull request |
| `/act-git-switch-main-pull` | Switch to main branch and pull latest changes |
| `/act-git-worktree` | Manage worktrees for parallel feature development |

## Agents

Research and review agents run in the background via runtime-specific subagent support. Claude Code and OpenCode use their Task/subagent workflow; Codex uses generated custom agents under `~/.codex/agents/`.

### Research Agents

| Agent | Description |
|-------|-------------|
| `act-flutter-patterns-researcher` | Find relevant patterns and principles |
| `act-flutter-docs-researcher` | Research SDK/package docs, migrations, and version constraints |
| `act-codebase-researcher` | Research project structure and conventions |

## Commands

### Toolkit

| Command | Description |
|---------|-------------|
| `/act-submit-feedback` | Open the ACT feedback form |
| `/act-update` | Check for updates and install with changelog preview |
| `/act-update-changelog` | Add changelog entry and commit release files |
| `/act-help [name]` | Show help navigator or detailed help for a command, agent, skill, or topic |

## Flutter Knowledge

### Principles (Critical Standards)

Must-follow architectural guidelines:

- API key storage
- Avoiding global state
- Avoiding tight coupling
- Resource disposal
- Exception handling
- Instance-based vs static-based design
- YAGNI/KISS
- Reactive state management
- Strongly-typed model classes
- Widget classes over build helpers

### Patterns (Recommended Practices)

Best practices and conventions:

- Column/row spacing
- Compute isolates
- Constant sizes
- Dot shorthand syntax
- Eager provider initialization
- Enhanced enums
- Folder structure
- Logging with dart:developer
- Multiline strings
- Named arguments
- Public constructor arguments
- Responsive MediaQuery
- Semantics for accessibility
- Switch expressions
- Theme extensions

### Breaking Changes

Documentation for breaking changes in:

- Dart language
- Flutter framework
- Riverpod

### Project Setup Recipes

Ready-to-use setup patterns:

- Adaptive alert dialogs
- Riverpod integration
- Constant sizes
- Environment variables
- Flavor configuration
- Force update
- Sentry initialization

## Git Worktrees

For complex features or parallel work, use worktrees instead of branches:

```bash
# Create worktree
/act-git-worktree create feature-auth

# Work in isolation
cd worktrees/feature-auth
claude
/act-interview "add authentication"
/act-create-spec
/act-create-issues ai_specs/0001-auth/spec.md
/act-implement ai_specs/0001-auth/work-items/01-email-sign-in.md

# Clean up after merge
/act-git-worktree cleanup
```

Benefits:
- Instant context switching (no stashing)
- Isolated working directories
- Automatic .env file copying
- Shared git history (fast, no network)


## Verification and Tests

```bash
# Validate toolkit integrity (docs, scripts, references)
node scripts/validate-toolkit.js

# Run hook tests
node hooks/tests/run-hooks-tests.mjs

# Run install tests
node scripts/tests/run-install-tests.mjs

# Run Codex skill transform tests
node scripts/tests/run-codex-skill-transform-tests.mjs
```

## Requirements

- [Claude Code](https://claude.ai/code), [OpenCode](https://opencode.ai/docs/), [Codex CLI](https://developers.openai.com/codex/cli), and/or [Cursor](https://cursor.com/)
- [Node.js](https://nodejs.org/) (used by the installer for hook registration, shared settings, and Codex agent generation)
- Git
- Flutter SDK (for Flutter projects)

## License

See [`LICENSE`](LICENSE).
