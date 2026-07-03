---
name: act-flutter-create
description: Create a new Flutter project with flutter_lints and preferred analysis options. Use when starting a new Flutter project or when the user wants to create a Flutter app.
argument-hint: "<project_name> [--org <org_name>] [--platforms <platforms>]"
tools: [Bash]
---

# Flutter Create

Create a new Flutter project with sensible defaults and flutter_lints configuration.

## Arguments

- `project_name` (required): Project name in `snake_case` format (e.g., `my_app`, `todo_list`)
- `--org <org_name>` (optional): Organization name in reverse DNS notation (e.g., `com.yourcompanyname`)
- `--platforms <platforms>` (optional): Comma-separated list of platforms to enable (e.g., `web,ios,android`). If omitted, all platforms are enabled.

## Execution

Run the ACT-owned script through the shared helper so it resolves correctly from any caller working directory:

```bash
node ~/.config/agentic-coding-toolkit/bin/act-run-script.js skills/act-flutter-create/scripts/flutter-create.sh <project_name> [--org <org_name>] [--platforms <platforms>]
```

The script:

1. **Directory validation** - Aborts if `pubspec.yaml` exists in current directory
2. **Passes through to `flutter create -e`** - Any validation errors come from Flutter
3. **Configures analysis_options.yaml** - Sets up flutter_lints with preserved trailing commas

## Example Usage

**Create a project with all platforms (default):**
```bash
node ~/.config/agentic-coding-toolkit/bin/act-run-script.js skills/act-flutter-create/scripts/flutter-create.sh my_awesome_app
```

**Create a project with custom org:**
```bash
node ~/.config/agentic-coding-toolkit/bin/act-run-script.js skills/act-flutter-create/scripts/flutter-create.sh my_awesome_app --org com.yourcompanyname
```

**Create a project with specific platforms:**
```bash
node ~/.config/agentic-coding-toolkit/bin/act-run-script.js skills/act-flutter-create/scripts/flutter-create.sh my_awesome_app --platforms web,ios
```

**Create a project with custom org and specific platforms:**
```bash
node ~/.config/agentic-coding-toolkit/bin/act-run-script.js skills/act-flutter-create/scripts/flutter-create.sh my_awesome_app --org com.yourcompanyname --platforms web,ios,android
```

## What the Script Does

- Checks current directory doesn't already have a `pubspec.yaml`
- Passes through to `flutter create -e` (validation handled by Flutter)
- Replaces `analysis_options.yaml` with flutter_lints configuration
- Reports success with next steps

## Post-Creation

On successful project creation, commit the generated project:

1. `cd` into the created project directory
2. Stage all files with `git add -A`
3. Commit using conventional commits format: `chore: bootstrap flutter project`
