---
name: act-dart-migrate-primary-constructors
description: Migrate Dart classes and enums to the experimental primary constructors syntax. Use when asked to migrate Dart constructor boilerplate to primary constructors.
tools: [Read, Glob, Grep, Bash]
---

Migrate the current Dart or Flutter package by orchestrating the shared Dart migration launcher.

The launcher owns all CLI bootstrap and source transformation behavior. Do not hand-author migration edits, duplicate transform rules, inspect launcher internals, or create temporary codemods during the normal workflow. This skill owns prerequisite checks, runner resolution, launcher invocation, external formatting, verification, and reporting.

## Boundaries

- Do not run git commands.
- Do not edit target setup files such as `pubspec.yaml` or `analysis_options.yaml`.
- Do not run `pub get` in the Target package.
- Do not add the migration tool as a Target package dependency.
- Do not globally activate the migration tool.
- Do not publish or fetch the migration tool from pub.dev.
- Do not fall back to hand-written codemods unless the launcher fails and the user explicitly approves a temporary fallback after seeing the failure.

Before running migration commands, tell the user that the skill will edit eligible Dart files and will not run version-control commands. The user is responsible for starting from a state they can review or revert.

## Terms

- **Dart migration launcher**: the installed helper at `~/.config/agentic-coding-toolkit/bin/act-dart-migrate.js`, invoked with `node`. It bootstraps and runs the migration tool; this skill never invokes a migration tool directly.
- **Target package root**: the current package directory containing the `pubspec.yaml` to migrate.
- **Dart runner**: the Dart executable used for Target package analysis, formatting, and tests, and passed to the launcher via `ACT_DART_RUNNER`.

## Resolve The Target Package

1. Locate the nearest package root for the user's current work by finding `pubspec.yaml`.
2. Treat the package as Flutter when `pubspec.yaml` declares `flutter` under dependencies, dev dependencies, or the `environment` SDK uses Flutter conventions.
3. Otherwise treat it as a pure Dart package.
4. If no Target package root exists, abort and report that the skill must be run from a Dart or Flutter package.
5. Resolve the Target package root to an absolute path. The launcher runs the migration tool from its own directory, so a relative Target path would not resolve against the package being migrated.

## Verify Target Prerequisites

Abort immediately if any prerequisite fails. Report the exact failed prerequisite and do not edit files.

1. Verify the Target package SDK constraint allows Dart `>=3.12.0`.
2. Verify `analysis_options.yaml` exists in the Target package root.
3. Verify `analysis_options.yaml` enables the analyzer experiment `primary-constructors`.
4. Verify the installed toolchain:
   - Pure Dart Target packages require a Dart runner with Dart `>=3.12.0`.
   - Flutter Target packages require Flutter `>=3.44.0` and a Dart runner with Dart `>=3.12.0`.
5. Run pre-migration analysis from the Target package root:
   - Flutter: `flutter analyze`
   - Pure Dart: `<dart_runner> analyze`

If pre-migration analysis fails, abort before invoking the launcher.

## Resolve The Dart Runner

Use one Dart runner for the launcher (via `ACT_DART_RUNNER`), Dart package analysis, Dart package tests, and external formatting.

1. Try `dart --version` first.
2. Accept PATH `dart` only when it reports Dart `>=3.12.0`.
3. For Flutter Target packages, if PATH `dart` is missing or too old, resolve the Flutter SDK Dart executable from the detected Flutter SDK, then verify it with `<dart_runner> --version`.
4. For pure Dart Target packages, abort if PATH `dart` is missing or too old.
5. Use `flutter analyze` and `flutter test` for Flutter Target package verification, but use the resolved Dart runner for the launcher and formatting.

The resolved runner is passed to the launcher as `ACT_DART_RUNNER` so the launcher bootstraps and runs the migration tool with the same SDK used for verification. `ACT_DART_RUNNER` must be an executable path or command name only, with no embedded arguments.

## Verify The Launcher

The Dart migration launcher must exist at `~/.config/agentic-coding-toolkit/bin/act-dart-migrate.js`. If it is missing, abort and report that the ACT installation is incomplete and that the user should reinstall ACT.

Do not bootstrap, sync, or modify the migration tool yourself. The launcher runs dependency bootstrap on every invocation and routes that output to stderr.

## Run The Migration

Invoke the launcher with the resolved Dart runner exported and the absolute Target package root passed through:

```bash
ACT_DART_RUNNER=<dart_runner> node ~/.config/agentic-coding-toolkit/bin/act-dart-migrate.js primary-constructors <absolute_target_package_root> --json
```

Capture stdout and stderr separately. With `--json`, stdout must be machine-readable JSON only. Stderr may contain launcher bootstrap output and human diagnostics.

Distinguish failure sources:

- **Launcher-owned failures** are written to stderr with the `[act-dart-migrate]` prefix and produce no JSON report (for example missing ACT settings, a stale toolkit path, a missing tool snapshot, or an unspawnable Dart runner). Report these as an ACT distribution or environment problem, not a migration failure.
- **Migration failures** produce a JSON error report on stdout with `ok: false` and an `error` object with a stable `code` and `message`. Report the error and stop. Do not attempt a fallback codemod unless the user explicitly approves one after this failure.

The success JSON report has `ok: true` and includes:

- `migration`
- `schemaVersion`
- `toolVersion`
- `root`
- `dryRun`
- `formatted`
- `changedFiles`
- `migratedDeclarations`
- `skippedDeclarations`
- `skippedFiles`
- `skippedDirectories`
- `transformCounts`
- `skipReasonCounts`

The launcher does not format Target files (`formatted` is `false`); this skill owns formatting.

## Format Changed Dart Files

Read `changedFiles` from the JSON report. If it is empty, skip formatting and report that no files changed.

For non-empty `changedFiles`, format only those Dart files from the Target package root:

```bash
<dart_runner> format --enable-experiment=primary-constructors <changed-dart-files>
```

Use paths from the JSON report. Resolve relative paths against the reported `root`. Do not format files that are not listed in `changedFiles`.

## Post-Migration Verification

Run post-migration analysis after formatting:

- Flutter: `flutter analyze`
- Pure Dart: `<dart_runner> analyze`

Run tests after analysis passes:

- Flutter: `flutter test --enable-experiment=primary-constructors --no-pub`
- Pure Dart: `<dart_runner> test --enable-experiment=primary-constructors`

If the Target package has no tests, report tests as not run with the reason `no tests found`. If analysis or tests fail, report the failure and do not undo edits automatically.

## Report

Keep the report short. `changedFiles` and `migratedDeclarations` can run to
dozens or hundreds of entries, and the full per-item detail already lives in the
JSON report. Do not reproduce it.

- Never list `changedFiles` item-by-item. Report only the count, plus at most a
  one-line grouping summary (for example the top-level directories touched).
- Never list `migratedDeclarations` item-by-item and never print per-declaration
  `path`/`declarationKind`/`declarationName`/`transform` lines. Report only the
  count plus the per-transform breakdown from `transformCounts`.
- Full per-item listing is allowed only for the exception lists, which are
  normally small: `skippedDeclarations`, `skippedFiles`, and
  `skippedDirectories`.

Base the final report on the JSON report plus verification commands. Include:

- Target package root.
- Dart runner path or command.
- Tool version from `toolVersion`.
- Changed file count from `changedFiles`.
- Migrated declaration count plus the per-transform breakdown from `transformCounts`.
- Skipped declarations from `skippedDeclarations`, including `path`, `declarationKind`, `declarationName`, `transform`, `reason`, and `message` when present.
- Skipped files from `skippedFiles`, including `path` and `reason`.
- Skipped directories from `skippedDirectories`, including `path` and `reason`.
- Transform counts from `transformCounts`.
- Skip reason counts from `skipReasonCounts`.
- Pre-migration analysis result.
- Launcher invocation result.
- Formatting result.
- Post-migration analysis result.
- Test result.

Use this report shape:

```markdown
## Summary

Target package: <path>
Dart runner: <command-or-path>
Tool version: <toolVersion-or-not-available>
Changed files: <count>
Migrated declarations: <count>
Skipped declarations: <count>
Skipped files: <count>
Skipped directories: <count>

## Changed Files

<count> files<, optional one-line directory grouping>, or "None"

## Migrated Declarations

<count> declarations: <transform>: <n> for each entry in transformCounts

## Skipped Declarations

<path> <declarationKind> <declarationName> <transform> <reason> <message>
(first 10 only; append "(+N more)" when longer, or "None")

## Skipped Paths

Files:
<path> <reason> (first 10 only; append "(+N more)" when longer, or "None")

Directories:
<path> <reason> (first 10 only; append "(+N more)" when longer, or "None")

## Counts

Transforms: <transformCounts>
Skip reasons: <skipReasonCounts>

## Verification

Pre-migration analysis: <pass/fail> <command>
Migration: <pass/fail> <command>
Formatting: <pass/fail/not-run> <command-or-reason>
Post-migration analysis: <pass/fail> <command>
Tests: <pass/fail/not-run> <command-or-reason>

## Notes

<launcher or migration stderr, residual risks, or follow-up needed>
```

Keep transformation-rule explanations brief. When users ask why a declaration was not migrated, cite the reported `reason` and `message` rather than inventing a new rule.
