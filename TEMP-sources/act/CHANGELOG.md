# Changelog

All notable changes to the Agentic Coding Toolkit will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-07-03

This is a major release that introduces a brand new **ACT core workflow**:

```
Interview -> Create Spec -> Refine Spec -> Create Work Items -> Implement
```

This replaces the old `/act-workflow-*` skills with the following:

- `act-config` - Configure ACT workflow storage and settings.
- `act-interview` - Interview the user to create a Spec.
- `act-create-spec` - Create and save a Spec from current conversation context.
- `act-refine-spec` - Review a Spec for contradictions, gaps, wrong assumptions, and codebase misalignment.
- `act-create-issues` - Turn a Spec into independently executable Work Items after user approval.
- `act-implement` - Implement a Work Item or Spec.

New features:

- Choose between local or GitHub workflow storage.
- Core workflow skills for general work, plus wrappers like `act-interview-flutter` for Flutter-specific work.
- Brand new interview format with freeform questions that captures stable, project-specific terminology inside GLOSSARY.md.
- Interview ledgers for better traceability from conversation decisions.
- Create independently executable implementation tasks that use the context window more optimally.

### Added
- New ACT workflow skills for interviewing, creating Specs, creating Work Items, refining Specs, implementing Work Items, and configuring workflow storage.
- Flutter-specific workflow skill variants that preserve Flutter and Dart implementation guardrails across the ACT workflow.
- Local and GitHub workflow storage documentation and configuration helpers for managing ACT Specs and Work Items.

### Changed
- Updated ACT help, README guidance, validation checks, and legacy workflow skill descriptions to reflect the new workflow commands.
- Improved workflow-related prompts, terminology, and documentation around Specs, Work Items, Interview Ledgers, Test Seams, and storage behavior.
- Updated `act-git-worktree` and `act-git-push-make-pr` guidance to better support workflow files and user confirmation flows.

### Deprecated
- All the old `/act-workflow-*` skills have been deprecated.

### Removed
- Removed the obsolete `act-meta-audit-work` skill from the toolkit.

For all the details, read:

- https://docs.agentictoolkit.dev/breaking-changes/new-workflow-skills/

## [0.5.0] - 2026-06-11

### Added
- New shared Dart migration CLI and launcher for running ACT Dart migrations from a single executable.
- `act-git-worktree` now symlinks gitignored agent files into new worktrees, so agent memory and config carry over automatically.

### Changed
- Synced `act_dart_migrate` to report schema v4 with refined migration documentation and validator behavior.
- `.gitignore` now excludes agent memory files to keep them out of version control.

## [0.4.10] - 2026-06-05

### Changed
- Refined the `act-dart-migrate-primary-constructors` skill to better handle const constructors during Dart primary constructor migrations.

## [0.4.9] - 2026-06-04

### Added
- New `act-dart-migrate-primary-constructors` skill for migrating Dart classes and enums to experimental primary constructors syntax.

### Documentation
- Official Dart and Flutter installation skill documentation now includes explicit empty `tools` sections for consistent skill metadata.

### Removed
- Removed the deprecated `download-flutter-rules.sh` wrapper script in favor of the skill-owned download workflow.

### Fixed
- `act-git-worktree` now recognizes both `worktrees` and `worktrees/` entries in `.gitignore`, preventing duplicate exclusions.

## [0.4.8] - 2026-05-27

### Added
- New `act-flutter-driver-mcp` skill with setup and troubleshooting guidance for enabling Dart MCP driver interactions with running Flutter apps.

## [0.4.7] - 2026-05-26

### Added
- New `act-figma-to-flutter` skill and setup guide for translating Figma designs into implementation-ready Flutter work.

### Documentation
- Codebase researcher documentation now includes `AGENTS.md` as a supported project guidance file.

## [0.4.6] - 2026-05-16

### Added
- New `act-install-official-dart-flutter-skills` skill for installing the official Dart and Flutter agent skills.

### Changed
- Official Dart and Flutter skill installation guidance now focuses on install commands without obsolete uninstall instructions.

## [0.4.5] - 2026-05-06

### Added
- Codex support for installing ACT skills, agents, and hooks, including Codex-specific skill and agent transforms.
- Codex hook coverage for Dart formatting and session logging, with fixtures and tests for supported hook events.

### Changed
- Install and uninstall tooling now uses shared library scripts, making multi-tool support easier to maintain across Claude, Cursor, OpenCode, and Codex.

### Documentation
- Added a GitHub bug report template to guide issue reports with clearer reproduction details.
- Updated Flutter development priming guidance to track the current official rules source.

## [0.4.4] - 2026-04-30

### Added
- Claude installations can now use a custom configuration directory, making ACT easier to install in non-default Claude setups.

### Changed
- Install scripts now share common helper logic, reducing duplication and keeping install behavior more consistent across supported tools.

### Fixed
- `/act-workflow-spec` now asks clarification questions with clearer prompt guidance.

## [0.4.3] - 2026-04-29

### Added
- Cursor support: new `.cursor-plugin/plugin.json` manifest and `--tool cursor` install/uninstall flow that exposes ACT skills as `/act-*` commands inside Cursor.
- Toolkit validator now checks the Cursor plugin manifest and the README/help snippets that document Cursor usage.

### Changed
- README, `/act-help`, and `/act-update` instructions updated to cover Cursor installation, post-update reload steps, and the `/act-*` skill discovery convention across all supported CLI tools.

## [0.4.2] - 2026-04-24

### Changed
- Toolkit command and agent source files now consistently use hyphenated `act-*` names instead of the legacy colon-based layout.
- Install and uninstall flows now clean up legacy colon-named command links so local toolkit entries stay aligned with the current command naming scheme.

## [0.4.1] - 2026-04-23

### Changed
- Install and uninstall flows now remove stale toolkit-owned symlinks for skills that were removed from the main distribution, while leaving user-managed entries untouched.

### Removed
- Removed the legacy ACT prime command wrappers so the direct skill-based workflow remains the supported path.
- Removed maintainer-only `act-meta-*` skills from the user-facing toolkit catalog; `act-meta-audit-work` remains available.

## [0.4.0] - 2026-04-22

### Changed
- Migrated ACT workflow, git, and meta commands to canonical skills (`act-workflow-*`, `act-git-*`, `act-meta-*`), removing the command wrappers in favor of direct skill invocations.
- Refreshed README and `/act:help` registry to reflect the new skill-based command surface.
- For more details, see the [commands-to-skills migration](https://docs.agentictoolkit.dev/breaking-changes/commands-to-skills-migration/) documentation.

### Fixed
- Toolkit validator now bounds the README skills section so unrelated content isn't parsed as skill entries.

## [0.3.3] - 2026-04-20

### Removed
- Deprecated non-`act-*` skill aliases and the legacy `/act:migrate-dot-shorthand` alias have been removed; update any local references to the canonical `act-*` skill names.

### Fixed
- OpenCode session logging now records skill invocations correctly in the session adapter.
- Claude statusline dirty-checks now avoid optional git index locks when reading repository status.

## [0.3.2] - 2026-04-20

### Added
- **`/act-dart-migrate-dot-shorthand`** skill, which replaces the deprecated `/act:migrate-dot-shorthand` command (now an alias), to guide Dart 3.10+ migrations to dot shorthand syntax.

### Changed
- OpenCode agent installation now generates platform-shaped agent folders with the required OpenCode frontmatter and permissions instead of relying on toolkit symlinks.
- Script-backed ACT tooling now uses a shared runtime helper with stricter validation so installed commands can safely resolve toolkit-owned scripts from any working directory.

### Fixed
- OpenCode installer paths for custom agents now target the correct directories during install and update flows.

## [0.3.1] - 2026-04-17

### Fixed
- Install and uninstall scripts now flag mismatched symlinks before replacing or removing them, with Enter accepting the suggested cleanup by default.

## [0.3.0] - 2026-04-17

### Changed
- **Breaking change**: ACT-owned built-in skills have all been prefixed with `act-`. If you reference toolkit skills from custom prompts, scripts, or automation, update those references to the new `act-*` names.
- After updating, make sure to rerun `scripts/install.sh --tool <tool>` so your local installation picks up the renamed skills and compatibility aliases.

### Documentation
- Clarified Dart CLI workflow guidance in `/act:workflow:work`.

## [0.2.6] - 2026-04-15

### Added
- **`/act:meta:audit-work`** command for best-effort auditing of a previous work run using logs, git history, and plan state
- **`/act:meta:compare-workflow-runs-branch`** command for comparing two branch runs against a shared spec
- `--do-not-commit` flag for `/act:workflow:work` to run workflows without creating commits

### Changed
- Rewrote `/act:workflow:work` with a harder contract, clearer stage invariants, mandatory plan reconciliation, execution heuristics, and a pitfalls section covering batching tests and the 80% done syndrome
- Renamed `/act:meta:compare-workflow-runs` to `/act:meta:compare-workflow-runs-worktree` for clarity alongside the new branch variant
- Improved `/act:workflow:refine-spec` review flow robustness with clearer review gate options and findings shown before the review prompt

### Documentation
- Updated help documentation to include the new audit-work and branch comparison commands

## [0.2.5] - 2026-03-30

### Documentation
- Document the `--single-phase` option for `/act:workflow:work`, including the matching help output and phase-stop behavior.

## [0.2.4] - 2026-03-30

### Added
- Claude Code statusline token count display using precise `current_usage` input totals, with fallback estimate from context window size
- Note: rerun `scripts/install.sh --tool claude` to apply the new statusline hook

### Changed
- Claude Code statusline uses `used_percentage` directly instead of scaling `remaining_percentage` with an effective-window-ratio workaround
- Window-size-aware color thresholds: different breakpoints for 200k vs 1M context windows
- 1M context windows show progress bar and token count only (no percentage)
- Token count color matches the progress bar color
- Streamlined git commit command workflows
- PR creation is now opt-in in workflow commands

## [0.2.3] - 2026-03-24

### Added
- Global ACT settings bootstrap during install, including shared settings loading for hooks
- Fail-closed session logging gate so hook logging only runs when ACT settings are available

### Fixed
- Install recovery now treats dangling ACT settings symlinks as unreadable so broken links can be recreated cleanly

### Documentation
- Streamlined README setup guidance by moving detailed hooks and settings documentation to the docs site
- Added a docs site badge to the README

## [0.2.2] - 2026-03-19

### Added
- Global ACT settings bootstrap during install with fail-closed logging gate
- OpenCode `command.execute.before` hook for eager slash command prompt logging
- Node.js preflight check in install and uninstall scripts

### Fixed
- Hook install now preserves `hooks/core/` and `hooks/claude/` directory structure instead of flattening into a single `scripts/` directory
- Install and uninstall scripts resolve `SOURCE_DIR` from `TOOLKIT_PATH` instead of CWD, fixing symlink creation when run from outside the toolkit root
- OpenCode session logging captures slash command input correctly instead of logging expanded template bodies

### Documentation
- Fixed legacy hook paths in README to reference `hooks/core/*.js` and `hooks/claude/*.js`
- Added Node.js requirement and verification/test section to README

## [0.2.1] - 2026-03-17

### Added
- OpenCode plugin support with logging adapter and plugin entrypoint

### Changed
- Unified install/uninstall into single scripts with `--tool` argument (replacing separate per-tool scripts)
- Refactored hook runtimes to extract shared logging utilities and Dart formatter across runtimes
- Spec command now uses AskUserQuestion for next-step menu

### Documentation
- Added flutter-tdd testing guidance to spec command
- Removed tracer bullet terminology from docs
- Added Discord community badge link to README

## [0.2.0] - 2026-03-10

### Added
- **`/flutter-tdd`** skill for vertical-slice test-driven development with strict one-test-at-a-time red-green-refactor cycles
- **`/act:meta:compare-workflow-runs`** command for comparing two worktree runs and producing qualitative winner reports
- AskUserQuestion answer logging in session logs
- Custom license for paid toolkit

### Changed
- Merged `plan-lite` into `plan` as the default mode (no more separate `/act:workflow:plan-lite` command)
- Simplified `compare-workflow-runs` to accept full paths directly
- Rewrote help command as a progressive navigator with contextual guidance

### Removed
- Review workflow commands, agent, and supporting review files

### Documentation
- Updated repository URLs to CodeWithAndreaPro organization
- Clarified install, update, and uninstall flow in README
- Refined CLI wording and command sections in README

## [0.1.9] - 2026-02-27

### Added
- **Tracer bullet methodology** in plan and work workflow commands — Phase 1 must be a thin, end-to-end vertical slice proving the critical path before expanding
- **Small composable widgets** principle — build features as self-contained widgets where each widget that fetches data or performs mutations owns its own controller
- **Monolithic Screen Widgets** section (#10) in lite review principles as an Important Issue
- ACT statusline hook with context window scaling
- Session logging hook for tracking prompts and tool usage
- AskUserQuestion metadata logging in session log

### Fixed
- Context bar scaling to use effective window size

## [0.1.8] - 2026-02-26

### Added
- **`/flutter-sentry-init`** skill for initializing Sentry error reporting in Flutter projects with recommended configuration and debug symbol uploads
- Flutter maintainability guardrails in skill documentation

### Changed
- Removed spec-analyzer agent from plan pipeline for a streamlined workflow
- Made patterns and principles documentation framework-agnostic
- Updated spec next steps with refine, commit, and plan options
- Cleaned up inline links and hardcoded counts from aggregate references

### Fixed
- Step numbering in plan and plan-lite workflow commands

## [0.1.7] - 2026-02-24

### Added
- **`/flutter-drift-setup`** skill for cross-platform Drift database setup with connection wiring, web asset downloads, architecture detection, and validation
- **`/act:workflow:compound`** command for capturing high-value session insights into reusable documentation

### Changed
- Namespaced `act` command and agent names for consistent toolkit-wide organization
- Streamlined workflow plan format and clarified spec test type mapping
- Updated help, README, and command references to align with namespaced conventions

## [0.1.6] - 2026-02-16

### Added
- **`/flutter-robot-testing`** skill for creating and retrofitting robot-driven Flutter widget journey tests with stable selectors, deterministic test seams, and explicit risk reporting

### Changed
- Updated command documentation to require plan-to-PR alignment checks when preparing pull request content

## [0.1.5] - 2026-02-11

### Added
- **`/act:workflow:plan-lite`** command for creating implementation plans quickly without spawning research subagents
- **`/act:workflow:refine-spec`** command for adversarial spec review to identify gaps, wrong assumptions, and UX issues
- **`flutter-docs-researcher`** agent for gathering Flutter/Dart SDK documentation and best practices
- Focused review workflow type for targeted code reviews on specific areas
- `avoid-long-methods` principle for review workflows
- Review exclusions support to skip specific findings in future reviews
- Full details format for P3 findings in review output
- Spec file reference automatically included in generated plans
- Toolkit smoke validation script for CI and doc metadata checks

### Changed
- Renamed `flutter-researcher` agent to `flutter-patterns-researcher` for clarity
- Improved phase gating documentation in workflow guide
- Added StreamProvider over FutureProvider guidance in principles
- Updated screenshot skill to prompt for hot reload before capture
- Added exception for framework-required navigator keys in principles

## [0.1.4] - 2026-02-03

### Added
- **`/flutter-pub-upgrade-major`** skill for upgrading all Flutter package dependencies to latest compatible major versions
- **`/flutter-screenshot`** skill for capturing screenshots from running Flutter apps on iOS/Android simulators and devices for visual verification
- PostToolUse hook for automatic Dart file formatting after edits

## [0.1.3] - 2026-01-30

### Added
- Pattern files now included in review workflows: 15 patterns in review-full, all-patterns.md in review-lite

### Changed
- Improved pattern documentation with applicability criteria, anti-patterns, and verification sections
- Reorganized pattern file sections for better readability

## [0.1.2] - 2026-01-23

### Added
- **`/act:update`** command for toolkit self-update with version comparison and changelog preview
- **`/act:meta:prompt-comparator`** command for comparing two commands by analyzing outputs and execution patterns

### Changed
- Refactored review workflows to extract shared components (parameters, scan logic, report format)
- Standardized severity levels to P1/P2/P3 across all review types
- Improved git-worktree variable naming and messages

## [0.1.1] - 2026-01-22

### Added
- **`/act:update-changelog`** command for automated changelog updates following Keep a Changelog conventions
- **`/act:help`** command reference help file for quick command lookup

## [0.1.0] - 2026-01-22

Initial release of the Agentic Coding Toolkit—a collection of commands, agents, skills, and knowledge for AI-assisted Flutter development.

### Workflow Commands

Core workflow commands for structured AI-assisted development:

- **`/act:workflow:spec`** - Transform task descriptions into detailed specifications with user flow mapping and clarifying questions
- **`/act:workflow:plan`** - Create implementation plans using parallel research agents (flutter-researcher, codebase-researcher, spec-analyzer)
- **`/act:workflow:work`** - Execute plans phase by phase with automatic progress tracking, commits, and PR creation
- **`/act:workflow:review`** - Review codebase with three modes: `official` (Flutter conventions), `lite` (practical issues), `full` (architectural principles)

### Git Commands

Streamlined git workflow automation:

- **`/act:git:commit`** - Conventional commit for staged changes
- **`/act:git:commit-all`** - Conventional commit for all changes (staged and unstaged)
- **`/act:git:push-make-pr`** - Push branch and create GitHub PR
- **`/act:git:switch-main-pull`** - Switch to main branch and pull latest

### Priming Commands

Load Flutter knowledge into context before development:

- **`/act:prime-official-rules`** - Official Flutter team guidelines
- **`/act:prime-patterns-lite`** - Critical principles only (faster, smaller context)
- **`/act:prime-patterns-full`** - All principles and patterns (comprehensive)

### Skills

Specialized capabilities with dedicated tooling:

- **`/flutter-create`** - Scaffold new Flutter projects with flutter_lints, analysis options, and platform selection
- **`/dart-create`** - Scaffold new Dart CLI projects with recommended lints
- **`/flutter-development`** - Router skill for Flutter/Dart knowledge (principles, patterns, breaking changes)
- **`/download-flutter-rules`** - Fetch latest official Flutter rules from the Flutter repository
- **`/git-worktree`** - Manage git worktrees for isolated parallel feature development with automatic .env copying

### Research Agents

Background agents for gathering context:

- **`flutter-researcher`** - Find relevant patterns and principles from toolkit knowledge
- **`codebase-researcher`** - Research project structure, patterns, and conventions
- **`spec-analyzer`** - Analyze specifications for user flows, edge cases, and gaps

### Review Agents

Code quality validation:

- **`flutter-code-reviewer`** - Unified review agent with type (`official`/`lite`/`full`) and scope parameters

### Flutter Knowledge Base

#### Principles (Critical Standards)

- API key storage patterns
- Avoiding global state
- Avoiding tight coupling
- Resource disposal
- Exception handling
- Instance-based vs static-based design
- YAGNI/KISS guidelines
- Reactive state management
- Strongly-typed model classes
- Widget classes over build helpers

#### Patterns (Recommended Practices)

- Column/row spacing conventions
- Compute isolates for expensive operations
- Constant sizes system
- Dart dot shorthand syntax
- Eager provider initialization
- Enhanced enums
- Folder structure conventions
- Logging with dart:developer
- Multiline strings
- Named arguments preference
- Public constructor arguments
- Responsive design with MediaQuery
- Semantics for accessibility
- Switch expressions
- Theme extensions

#### Breaking Changes Documentation

- Dart language breaking changes
- Flutter framework breaking changes
- Riverpod breaking changes

#### Project Setup Recipes

- Adaptive alert dialogs
- Riverpod integration
- Constant sizes setup
- Environment variables (Env class)
- Flavor configuration
- Force update implementation
- Sentry initialization

### Scripts

Shell scripts for deterministic operations:

- **`install-claude.sh`** - Install toolkit to `~/.claude/` for global availability
- **`uninstall-claude.sh`** - Remove toolkit symlinks from `~/.claude/`
- **`install-opencode.sh`** - Install toolkit to `~/.config/opencode/` for OpenCode
- **`uninstall-opencode.sh`** - Remove toolkit symlinks from `~/.config/opencode/`
- **`download-flutter-rules.sh`** - Download official Flutter rules (symlink to skill)
- **`git-worktree.sh`** - Unified worktree management (symlink to skill)

### Documentation

- Philosophy document explaining the spec → plan → work → review → compound workflow
- Workflow guide with branch vs worktree decision matrix
- Review guidelines with type selection guide and scoring interpretation
- Command reference tables in README
