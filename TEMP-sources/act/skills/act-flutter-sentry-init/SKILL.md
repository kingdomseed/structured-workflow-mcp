---
name: act-flutter-sentry-init
description: Initialize Sentry error reporting in a Flutter project with recommended configuration and debug symbol uploads. Use when adding Sentry to a Flutter app, setting up crash reporting, or when the user mentions "sentry", "error reporting", or "crash monitoring".
argument-hint: "<sentry_project> <sentry_org>"
tools: [Read, Write, Edit, Bash]
---

# Flutter Sentry Init

Set up Sentry Flutter error reporting with DSN environment variable, debug symbol uploads, and a `beforeSend` callback that filters non-release events and connection errors.

## Arguments

- `sentry_project` (required): Sentry project name (e.g., `my-flutter-app`)
- `sentry_org` (required): Sentry organization slug (e.g., `my-org`)

## Prerequisites

- A Flutter project must already exist (`pubspec.yaml` must be present in the current directory)
- A Sentry project and organization must already be created at [sentry.io](https://sentry.io)

## Pre-Execution: Assess Existing Setup

Before making changes, check the project for existing Sentry infrastructure:

1. **Existing Sentry dependency** — Search for `sentry_flutter` in `pubspec.yaml`. If already present, adapt rather than duplicate.
2. **Existing initialization** — Search for `SentryFlutter.init` in `lib/`. If found, update the existing code rather than adding a second initialization.
3. **Existing Env class** — Search for `class Env` in `lib/`. If it exists, add the `sentryDsn` property to it rather than creating a new file.
4. **Dio usage** — Check if `dio` is already a dependency. If so, also add `sentry_dio`.
5. **Dio instance creation** — Search for where `Dio` is instantiated (for example: `Dio(`, `return Dio(`, provider/factory methods).

   - If exactly one shared instance is found, instrument that file.
   - If multiple instances are found, warn the user and take no automatic action on consolidation.

If the project already has a partial Sentry setup, apply only the missing pieces from the steps below.

## Execution

### Step 1: Add Dependencies

```bash
dart pub add sentry_flutter
dart pub add dev:sentry_dart_plugin
```

If the project uses Dio, also add:

```bash
dart pub add sentry_dio
```

### Step 2: Add Sentry Configuration

Add the `sentry` configuration block to the **root level** of `pubspec.yaml` (not nested under any other key), replacing placeholders with the provided arguments:

```yaml
sentry:
  upload_debug_symbols: true
  upload_source_maps: false
  upload_sources: false
  project: <sentry_project>
  org: <sentry_org>
  wait_for_processing: true
  log_level: error
  commits: auto
  ignore_missing: true
```

### Step 3: Add Environment Variable

Ensure a `.env` file exists in the project root (create it if missing) and add the `SENTRY_DSN` variable:

```
SENTRY_DSN=<paste DSN here>
```

Ask the user to copy the DSN value from the "Configure Flutter SDK" page in the Sentry dashboard and paste it into the `.env` file. Ensure `.env` is listed in `.gitignore` so it is not committed to version control.

Then, ensure an `Env` class exists with the `sentryDsn` property. If the project already has an `Env` class, add the property to it. Otherwise, create a new file (e.g., `lib/src/env/env.dart`):

```dart
class Env {
  static String get sentryDsn => const String.fromEnvironment('SENTRY_DSN');
}
```

### Step 4: Update `main.dart` (initialization + imports)

Read `references/sentry-flutter-init.md` for the full initialization code template.

Update the `main()` function in `lib/main.dart`. Ensure `WidgetsFlutterBinding.ensureInitialized()` is called first, followed immediately by `await SentryFlutter.init(...)` — Sentry must initialize before any other setup code. The initialization code should:

1. Set `options.dsn` from `Env.sentryDsn`
2. Clear `tracePropagationTargets` (workaround for [sentry-dart#3247](https://github.com/getsentry/sentry-dart/issues/3247))
3. Configure in-app frames using the package name extracted from `pubspec.yaml` (the `name` field)
4. Add a `beforeSend` callback that:
   - Returns `null` for non-release builds (`!kReleaseMode`)
   - Returns `null` for `DioException` with no response (connection errors) — only if Dio is used
   - Returns the event as-is for everything else

**Important:** Preserve all existing code in `main()`. Wrap it inside the `SentryFlutter.init` block, or place it after the `init` call completes.

Add these imports to `lib/main.dart`:

```dart
import 'package:flutter/foundation.dart';
import 'package:sentry_flutter/sentry_flutter.dart';
```

If Dio is used, also add:

```dart
import 'package:dio/dio.dart';
```

And import the `Env` class based on its location in the project.

### Step 5: Add Dio HTTP breadcrumbs (if Dio is used)

Locate the file where the shared `Dio` instance is created and modify it.

Add this import in that file:

```dart
import 'package:sentry_dio/sentry_dio.dart';
```

Then call `addSentry()` before returning the `Dio` instance:

```dart
// * Add http breadcrumbs
dio.addSentry();
```

Example shape:

```dart
final dio = Dio(baseOptions);
// * Add http breadcrumbs
dio.addSentry();
return dio;
```

If multiple Dio instances are created in the codebase, do not silently patch all of them. Warn the user and stop: do not auto-consolidate or choose one instance on the user's behalf.

## Post-Setup Validation

Run these checks to confirm the setup is working:

```bash
flutter analyze
```

Then ask the user to run the app on all target platforms to verify it builds and launches correctly.

## Post-Setup

On successful setup, commit the changes:

1. Stage all new and modified files with `git add -A`
2. Commit using conventional commits format: `feat: add sentry error reporting`
