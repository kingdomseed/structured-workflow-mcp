---
name: act-help
description: Show ACT help navigator or detailed help by name
argument-hint: "[name|topic]"
allowed-tools: []
---

<objective>
Provide Flutter-style progressive help:

- `/act-help` -> short navigator + routing table
- `/act-help [name]` -> detailed help for one command, agent, skill, or topic
- Codex users discover this help as a native skill through `/skills` or by mentioning `$act-help` where supported

Keep output concise and actionable.
</objective>

<input>
Raw input: `$ARGUMENTS`
</input>

<normalization>
Normalize the input before matching:

1. trim whitespace
2. lowercase for matching (preserve original for display)
3. remove optional leading `/`
4. for commands, accept optional leading `act-`
</normalization>

<routing_topics>
Use these topic aliases:

- `workflow`
- `git`
- `prime` (`priming`)
- `skills` (`skill`)
- `agents` (`agent`)
- `all`
</routing_topics>

<registry>
Commands:

- `act-submit-feedback` - Open the ACT feedback form
- `act-update` - Check for and install toolkit updates
- `act-update-changelog` - Create release changelog entry and bump `VERSION`
- `act-help` - Show this help navigator or detailed help by name

Agents:

- `act-flutter-patterns-researcher` - Find relevant Flutter patterns and principles
- `act-codebase-researcher` - Research project structure and conventions
- `act-flutter-docs-researcher` - Research SDK/package docs and migration constraints

Skills:

- `act-config` - Configure ACT workflow storage for the current working directory
- `act-interview` - Resolve intent, language, constraints, and decision dependencies before creating a Spec
- `act-interview-flutter` - Resolve Flutter/Dart UX, state, platform, and testing decisions before creating a Spec
- `act-create-spec` - Create a Spec from the current conversation context
- `act-create-spec-flutter` - Create a Flutter/Dart Spec with user flows, states, and test seams captured
- `act-refine-spec` - Review an ACT Spec for contradictions, gaps, wrong assumptions, and codebase misalignment
- `act-refine-spec-flutter` - Review a Spec for Flutter/Dart codebase alignment, UX gaps, and platform assumptions
- `act-create-issues` - Turn a Spec into vertical implementation slices that can be executed independently after user approval
- `act-create-issues-flutter` - Turn a Spec into Flutter/Dart vertical-slice Work Items
- `act-implement` - Implement a Work Item or Spec
- `act-implement-flutter` - Implement a Flutter/Dart Work Item or Spec with appropriate tests and verification
- `act-workflow-spec` - Deprecated legacy workflow skill; prefer `act-interview` + `act-create-spec`
- `act-workflow-refine-spec` - Deprecated legacy workflow skill; prefer `act-refine-spec`
- `act-workflow-plan` - Deprecated legacy workflow skill; prefer `act-create-issues`
- `act-workflow-work` - Deprecated legacy workflow skill; prefer `act-implement`
- `act-workflow-compound` - Capture high-value session insights into reusable documentation under `ai_docs/solutions`
- `act-flutter-create` - Create a new Flutter project with flutter lints and preferred analysis options
- `act-dart-create` - Create a new Dart CLI project with recommended lints and preferred analysis options
- `act-flutter-development` - Load Flutter/Dart development knowledge including principles, patterns, breaking changes, and official rules
- `act-figma-to-flutter` - Inspect Figma MCP designs for Flutter work, report scope/states/assets first, and provide setup guidance
- `act-dart-migrate-dot-shorthand` - Migrate codebase to Dart 3.10+ dot shorthand syntax
- `act-dart-migrate-primary-constructors` - Migrate eligible Dart declarations to experimental primary-constructor syntax
- `act-flutter-pub-upgrade-major` - Upgrade all Flutter package dependencies to the latest compatible major versions
- `act-flutter-screenshot` - Capture screenshots from running Flutter apps on iOS or Android for visual verification
- `act-flutter-driver-mcp` - Set up Flutter Driver entrypoints for Dart MCP runtime interaction with running apps
- `act-flutter-robot-testing` - Guidance for robot-driven Flutter widget journey testing with stable selectors and deterministic seams
- `act-flutter-drift-setup` - Set up Drift (SQLite) database in a Flutter project with cross-platform connection support
- `act-download-flutter-rules` - Download the latest official Flutter rules from the Flutter repository
- `act-git-commit` - Create a conventional commit for staged changes
- `act-git-commit-all` - Create a conventional commit for all changes
- `act-git-push-make-pr` - Push current branch to GitHub and create a pull request
- `act-git-switch-main-pull` - Switch to main branch and pull latest changes
- `act-git-worktree` - Manage git worktrees for isolated parallel feature development with automatic .env file copying and .gitignore management
- `act-flutter-sentry-init` - Initialize Sentry error reporting in a Flutter project with recommended configuration and debug symbol uploads
- `act-flutter-tdd` - Enforce vertical-slice TDD discipline for Flutter and Dart work
</registry>

<matching_rules>
If input is empty: show the navigator output.

If input is present, resolve in this order:

1. Exact command match (accept forms like `act-update`, `/act-update`, `update`)
2. Exact agent match (accept with/without leading `/`)
3. Exact skill match (accept with/without leading `/`)
4. Topic alias match
5. Fuzzy single match from registry

If still unmatched, show an "Unknown help target" response with 3-6 likely matches.
</matching_rules>

<output_contract>
Return only help output. No analysis, no project inspection, no extra commentary.

## Navigator output (`/act-help`)

Use this structure exactly:

```markdown
# ACT Help

Agentic Coding Toolkit for Flutter/Dart workflows.

Common commands:

- `/act-config`
- `/act-interview [request|idea|source file]`
- `/act-interview-flutter [request|idea|source file]`
- `/act-create-spec`
- `/act-create-spec-flutter`
- `/act-refine-spec <spec-file>`
- `/act-refine-spec-flutter <spec-file>`
- `/act-create-issues <spec-file>`
- `/act-create-issues-flutter <spec-file>`
- `/act-implement <work-item-or-spec> [--do-not-commit]`
- `/act-implement-flutter <work-item-or-spec> [--do-not-commit]`
- `/act-git-push-make-pr`

Routing:

- Workflow skills -> `/act-help workflow`
- Git automation -> `/act-help git`
- Priming/context loading -> `/act-help prime`
- Skills catalog -> `/act-help skills`
- Agents catalog -> `/act-help agents`
- Full index -> `/act-help all`

Usage:

- `/act-help workflow`
- `/act-help /act-create-issues`
- `/act-help act-codebase-researcher`
- `/act-help /act-git-commit`

Codex:

- Use `/skills` to discover ACT skills
- Mention skills as `$act-create-spec`, `$act-help`, or another `$act-*` skill where supported
```

## Topic output (`/act-help <topic>`)

For each topic, show a compact index only for that topic:

- `workflow` -> act-interview/act-interview-flutter, act-create-spec/act-create-spec-flutter, act-refine-spec/act-refine-spec-flutter, act-create-issues/act-create-issues-flutter, act-implement/act-implement-flutter
- `git` -> act-git-commit/act-git-commit-all/act-git-switch-main-pull/act-git-push-make-pr/act-git-worktree with one-line purpose each
- `prime` -> act-flutter-development with `official` / `lite` / `full` guidance choices
- `skills` -> all skills with one-line purpose each
- `agents` -> all agents with one-line purpose each
- `all` -> full categorized index (all commands + agents + skills)

End each topic output with 1-3 example drill-down calls.

## Detail output (`/act-help <exact-name>`)

When target is a command:

```markdown
# /<canonical-command-name>

<one-line purpose>

Usage:
- `<primary usage>`
- `<secondary usage if useful>`

Examples:
- `<example 1>`
- `<example 2>`

Related:
- `<related command 1>`
- `<related command 2>`
```

When target is an agent:

```markdown
# <canonical-agent-name>

<one-line purpose>

Used by:
- `<workflow skill(s) or context>`

Focus:
- `<what it researches>`

Related:
- `/act-help agents`
```

When target is a skill:

```markdown
# /<canonical-skill-name>

<one-line purpose>

Usage:
- `/<skill-name> <args-if-any>`

Related:
- `/act-help skills`
```

## Unknown target output

```markdown
# ACT Help

No help topic matches `<user input>`.

Try one of these:
- `<best match 1>`
- `<best match 2>`
- `<best match 3>`

Examples:
- `/act-help workflow`
- `/act-help /act-create-issues`
- `/act-help skills`
```

## Footer

Append this footer at the very end of every help response:

```markdown
Need more help? Contact us here: https://agentictoolkit.dev/contact
```
</output_contract>

<detail_content>
Use these canonical usage snippets when generating detail output.

Command usage:

- `/act-submit-feedback`
- `/act-update`
- `/act-update-changelog [version] [since-commit]`
- `/act-help [name|topic]`

Skill usage:

- `/act-flutter-create <project_name> [--org <org_name>] [--platforms <platforms>]`
- `/act-dart-create <project_name>`
- `/act-config`
- `/act-interview [request|idea|source file]`
- `/act-interview-flutter [request|idea|source file]`
- `/act-create-spec`
- `/act-create-spec-flutter`
- `/act-refine-spec <spec-file>`
- `/act-refine-spec-flutter <spec-file>`
- `/act-create-issues <spec-file>`
- `/act-create-issues-flutter <spec-file>`
- `/act-implement <work-item-or-spec> [--do-not-commit]`
- `/act-implement-flutter <work-item-or-spec> [--do-not-commit]`
- `/act-workflow-spec [task description or file path]` (deprecated; prefer `/act-interview` + `/act-create-spec`)
- `/act-workflow-refine-spec <spec-file>` (deprecated; prefer `/act-refine-spec`)
- `/act-workflow-plan <spec-file|task description> [--use-subagents]` (deprecated; prefer `/act-create-issues`)
- `/act-workflow-work <plan-file> [official|lite|full] [--single-phase] [--do-not-commit] [--create-pr]` (deprecated; prefer `/act-implement`)
- `/act-workflow-compound [context|spec|plan]`
- `/act-flutter-development [official|lite|full|topic]`
- `/act-figma-to-flutter [setup|figma_url_with_node|selected Figma node]`
- `/act-dart-migrate-dot-shorthand`
- `/act-dart-migrate-primary-constructors`
- `/act-flutter-pub-upgrade-major`
- `/act-flutter-screenshot [output_path] [--device <device_id>]`
- `/act-flutter-driver-mcp [setup|verify|troubleshoot]`
- `/act-flutter-robot-testing`
- `/act-flutter-drift-setup`
- `/act-download-flutter-rules`
- `/act-git-commit`
- `/act-git-commit-all`
- `/act-git-push-make-pr`
- `/act-git-switch-main-pull`
- `/act-git-worktree [create|list|delete|rename|switch|copy-env|cleanup] [args]`
- `/act-flutter-sentry-init <sentry_project> <sentry_org>`
- `/act-flutter-tdd`

Codex usage:

- `/skills` to discover ACT skills
- `$act-create-spec`, `$act-create-issues`, `$act-implement`, or another `$act-*` skill where supported
</detail_content>

<deprecated_workflow_migration>
When generating detail output for deprecated workflow skills, include this Related section:

- `act-workflow-spec` -> use `/act-interview [request]`, then `/act-create-spec`
- `act-workflow-refine-spec` -> use `/act-refine-spec <spec-file>`
- `act-workflow-plan` -> use `/act-create-issues <spec-file>`
- `act-workflow-work` -> use `/act-implement <work-item-or-spec> [--do-not-commit]`
</deprecated_workflow_migration>
