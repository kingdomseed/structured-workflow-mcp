---
name: act-dart-create
description: Create a new Dart CLI project with recommended lints and preferred analysis options. Use when starting a new Dart console application or CLI tool.
argument-hint: "<project_name>"
tools: [Bash]
---

# Dart Create

Create a new Dart CLI project with sensible defaults and recommended lints configuration.

## Arguments

- `project_name` (required): Project name in `snake_case` format (e.g., `my_cli`, `todo_app`)

## Execution

Run the ACT-owned script through the shared helper so it resolves correctly from any caller working directory:

```bash
node ~/.config/agentic-coding-toolkit/bin/act-run-script.js skills/act-dart-create/scripts/dart-create.sh <project_name>
```

The script:

1. **Directory validation** - Aborts if `pubspec.yaml` exists in current directory
2. **Passes through to `dart create -t console`** - Any validation errors come from Dart
3. **Configures analysis_options.yaml** - Sets up recommended lints with preserved trailing commas

## Example Usage

```bash
node ~/.config/agentic-coding-toolkit/bin/act-run-script.js skills/act-dart-create/scripts/dart-create.sh my_cli_app
```

## What the Script Does

- Checks current directory doesn't already have a `pubspec.yaml`
- Passes through to `dart create -t console` (validation handled by Dart)
- Replaces `analysis_options.yaml` with recommended lints configuration
- Reports success with next steps

## Post-Creation

On successful project creation, commit the generated project:

1. `cd` into the created project directory
2. Stage all files with `git add -A`
3. Commit using conventional commits format: `chore: bootstrap dart project`
