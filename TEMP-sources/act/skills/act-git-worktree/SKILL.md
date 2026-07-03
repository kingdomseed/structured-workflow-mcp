---
name: act-git-worktree
description: Manage git worktrees for isolated parallel feature development with automatic .env file copying and .gitignore management
argument-hint: "[create|list|delete|rename|switch|copy-env|cleanup] [args]"
tools: [Bash, AskUserQuestion]
---

# Git Worktree Manager

This skill provides a unified interface for managing Git worktrees for isolated feature development. Worktrees allow you to work on multiple branches simultaneously in separate directories without stashing or switching.

## What This Skill Does

- **List worktrees** with current status and branch info
- **Create worktrees** with automatic branch creation
- **Rename worktrees** and their associated branches
- **Delete worktrees** with optional branch cleanup
- **Switch between worktrees** for parallel work
- **Clean up inactive worktrees** with confirmation
- **Copy .env files** from main repo to worktrees
- **Automatic .gitignore management** for worktree directory

## CRITICAL: Always Use the Script

**NEVER call `git worktree add` directly.** Always invoke `git-worktree.sh` through the shared ACT runtime helper at `~/.config/agentic-coding-toolkit/bin/act-run-script.js`.

The script handles critical setup that raw git commands don't:

1. Copies `.env`, `.env.local`, `.env.test`, etc. from main repo (recursively)
2. Ensures `worktrees` is in `.gitignore`
3. Creates consistent directory structure
4. Provides interactive confirmations for safety

```bash
# CORRECT - Always use the script (with auto-confirm for Claude)
echo "y" | node ~/.config/agentic-coding-toolkit/bin/act-run-script.js skills/act-git-worktree/scripts/git-worktree.sh create feature-name

# WRONG - Never do this directly
git worktree add worktrees/feature-name -b feature-name main
```

## Manual Usage

For direct command-line usage, run the ACT-owned script through the shared helper. The helper resolves the real toolkit checkout via installed ACT settings while preserving the caller's current repo directory:

```bash
node ~/.config/agentic-coding-toolkit/bin/act-run-script.js skills/act-git-worktree/scripts/git-worktree.sh help
```

## Commands

### `list` (alias: `ls`)

Lists all worktrees with their branches and status.

**Output shows:**
- Worktree name and branch
- Current worktree marked with `✓`
- Main repository status and branch

### `create <branch-name> [from-branch]`

Creates a new worktree with the given branch name.

- `branch-name` (required): Name for the new branch and worktree
- `from-branch` (optional): Base branch to create from (defaults to current branch)

**What happens:**
1. Checks if worktree already exists (offers to switch if so)
2. Updates the base branch from remote
3. Creates new worktree at `worktrees/<branch-name>`
4. Copies all `.env*` files from main repo (except `.env.example`)
5. Reports path for cd-ing to the worktree

### `delete <name> [--branch]` (alias: `rm`)

Removes a worktree directory.

- `name` (required): Worktree to delete
- `--branch` (optional): Also delete the git branch

**Safety:**
- Cannot delete the current worktree (switch out first)
- Asks for confirmation before deletion

### `rename <old-name> <new-name>` (alias: `move`)

Renames a worktree and its associated branch.

- `old-name` (required): Current worktree name
- `new-name` (required): New name for worktree and branch

**What happens:**
1. Moves the worktree directory
2. Renames the git branch
3. Both operations are atomic

### `switch <name>` (alias: `go`)

Displays the path to switch to a worktree.

- `name` (optional): Worktree to switch to (prompts if not provided)

**Note:** The script cannot change the shell's directory. It outputs the `cd` command to run.

### `copy-env [name]`

Copies `.env*` files from main repo to a worktree.

- `name` (optional): Target worktree (auto-detects if running from within a worktree)

**Use when:**
- A worktree was created without .env files
- Main repo's .env files have been updated

### `cleanup` (alias: `clean`)

Interactively removes inactive worktrees.

**What happens:**
1. Lists all worktrees except current
2. Asks for confirmation
3. Removes selected worktrees
4. Cleans up empty directories

## Command Handling

Parse the input to determine the action. If no action is provided, show the menu.

### No Input → Show Menu

Use AskUserQuestion:

- header: "Worktree action"
- question: "What would you like to do?"
- options:
  - "Create" - Create a new worktree for a feature branch
  - "List" - Show all existing worktrees
  - "Delete" - Remove a worktree
  - "Switch" - Change to a different worktree

Then proceed to the appropriate action.

### Executing Commands

For all commands, call the script through the shared helper. **IMPORTANT:** The script has interactive confirmations that will hang when run from Claude. Use `echo "y" |` to auto-confirm:

```bash
# For commands that require confirmation (create, delete, rename, cleanup):
echo "y" | node ~/.config/agentic-coding-toolkit/bin/act-run-script.js skills/act-git-worktree/scripts/git-worktree.sh <command> [args]

# For non-interactive commands (list, switch, copy-env):
node ~/.config/agentic-coding-toolkit/bin/act-run-script.js skills/act-git-worktree/scripts/git-worktree.sh <command> [args]
```

Commands requiring `echo "y" |`:
- `create` - confirms before creating
- `delete` - confirms before deleting
- `rename` - confirms before renaming
- `cleanup` - confirms each worktree removal

Commands that don't need it:
- `list` / `ls` - read-only, no confirmation
- `switch` / `go` - just outputs cd path
- `copy-env` - no confirmation needed

## Key Design Principles

### Always Use the Script

Raw `git worktree` commands miss critical setup. The script ensures:
- Environment files are copied
- Directory structure is consistent
- `.gitignore` is updated
- User confirmations prevent accidents

### Opinionated Defaults

- Worktrees stored in `worktrees/` directory
- Branch name becomes worktree directory name
- Creates from current branch by default
- `.gitignore` automatically managed

### Safety First

- **Confirms before creating** worktrees
- **Confirms before deleting** to prevent accidents
- **Cannot delete current worktree** (must switch out first)
- **Backs up existing .env files** before overwriting
- **Clear error messages** for all failure modes

### Lightweight and Fast

- Worktrees share git objects (history, commits) with main repo
- Working files are checked out separately (same as any branch checkout)
- Much faster than cloning (no network, shared git database)
- Instant context switching between features

## When to Use Worktrees

Use this skill when you want isolated feature development:

- **Multi-phase features**: Working on something complex that spans multiple sessions
- **Parallel work**: Switching between features without stashing
- **Risky changes**: Experimenting without affecting your main working directory
- **Code reviews**: Checking out a PR branch without disrupting current work

**Typical workflow:**

```bash
# 1. Create worktree for your feature
echo "y" | node ~/.config/agentic-coding-toolkit/bin/act-run-script.js skills/act-git-worktree/scripts/git-worktree.sh create feature-auth

# 2. Switch to worktree and start Claude
cd worktrees/feature-auth
claude

# 3. Run your workflow
/act-interview "add authentication"
/act-create-spec
/act-create-issues ai_specs/0001-auth/spec.md
/act-implement ai_specs/0001-auth/work-items/01-auth.md

# 4. When done, return to main and optionally clean up
cd ../..
echo "y" | node ~/.config/agentic-coding-toolkit/bin/act-run-script.js skills/act-git-worktree/scripts/git-worktree.sh cleanup
```

## Directory Structure

```
project-root/
├── worktrees/                    # All worktrees live here
│   ├── feature-login/            # Worktree 1
│   │   ├── .git                  # Git link file
│   │   ├── .env                  # Copied from main
│   │   ├── lib/
│   │   └── ...
│   └── feature-notifications/    # Worktree 2
│       └── ...
├── .gitignore                    # Updated to include 'worktrees'
└── ...                           # Main repo files
```

## Usage by Other Commands

Other commands can invoke this skill using SlashCommand:

```
SlashCommand: /act-git-worktree create feature-name
```

For programmatic use (e.g., from act-implement):

1. Determine the branch name from context (plan filename, feature name)
2. Invoke `/act-git-worktree create <branch-name>`
3. Instruct user to `cd` into the worktree
4. Continue execution in the new working directory
