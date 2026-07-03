---
name: act-download-flutter-rules
description: Download the latest official Flutter rules from the Flutter repository
argument-hint: ""
tools: [Bash]
---

# Download Flutter Rules

This skill downloads the official Flutter team rules from the Flutter repository and saves them to `skills/act-flutter-development/references/flutter-rules-official.md`.

## What This Skill Does

- Downloads the latest `rules.md` from the Flutter repository's main branch
- Saves to the `act-flutter-development` skill's references directory (sibling skill)
- Works from any installation location (project, user, or plugin scope)
- Skips download if the file is already up to date
- Provides colored output showing success or failure

## When to Use This Skill

Use this skill when:

- Setting up a new project with the AI toolkit
- Updating to the latest Flutter team rules
- Verifying you have the current official guidelines
- Before running reviews against official rules (`/review-official`)

## Usage

Simply invoke the skill with no arguments:

```
/act-download-flutter-rules
```

## Execution

Run the download script through the shared helper so it resolves correctly from any caller working directory:

```bash
node ~/.config/agentic-coding-toolkit/bin/act-run-script.js skills/act-download-flutter-rules/scripts/download-flutter-rules.sh
```

The script will:

1. Determine output path relative to its own location (works from any scope)
2. Create the output directory if it doesn't exist
3. Download the rules from GitHub
4. Compare with existing file and only update if changed
5. Report success or failure with colored output

## Output

**Success (new download):**
```
Downloading Flutter rules...
  ✓ Downloaded to /path/to/skills/act-flutter-development/references/flutter-rules-official.md
```

**Success (already up to date):**
```
Downloading Flutter rules...
  ✓ /path/to/skills/act-flutter-development/references/flutter-rules-official.md is already up to date
```

**Failure:**
```
Downloading Flutter rules...
  ✗ Failed to download Flutter rules
```

## Source

The rules are downloaded from:
`https://raw.githubusercontent.com/flutter/flutter/refs/heads/main/docs/rules/rules.md`

This is the official Flutter team's style guide and conventions document maintained in the Flutter repository.
