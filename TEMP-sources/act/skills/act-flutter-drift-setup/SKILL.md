---
name: act-flutter-drift-setup
description: Set up Drift (SQLite) database in a Flutter project with cross-platform connection support. This skill should be used when adding Drift to a Flutter project, creating a new Drift database, or setting up SQLite persistence. Triggers on "add drift", "set up database", "add sqlite", "drift setup", or requests to add local database persistence.
tools: [Read, Write, Edit, Bash]
---

# Flutter Drift Setup

Set up a Drift (SQLite) database in a Flutter project with cross-platform connection support (native + web).

## Prerequisites

- A Flutter project must already exist (pubspec.yaml must be present in the current directory)
- The project should have `build_runner` in dev_dependencies (add it if missing)

## Pre-Execution: Assess Existing Architecture

Before making changes, check the project for existing Drift infrastructure:

1. **Existing database file** — Search for `@DriftDatabase` in `lib/`. If a database file already exists, adapt it rather than creating a new one.
2. **Existing connection folder** — Check if a `connection/` folder with platform implementations already exists near the database file.
3. **Import/export logic** — If the project already has database import/export or backup features, preserve those public APIs and avoid relocating or restructuring them.
4. **Database file placement** — Note where the project places database infrastructure (`data/`, `database/`, etc.) and follow the existing convention rather than imposing a default path.

If the project already has a partial Drift setup, apply only the missing pieces from the steps below.

## Execution

### Step 1: Add Dependencies

Add the required packages to `pubspec.yaml`:

**Under `dependencies`:**
```yaml
drift: ^2.31.0
sqlite3: ^2.6.0
sqlite3_flutter_libs: ^0.5.41
path_provider: ^2.1.0
path: ^1.8.0
```

**Under `dev_dependencies`:**
```yaml
build_runner: ^2.4.0
```

Then run:
```bash
flutter pub get
```

Note: update the dependencies to the latest versions.

### Step 2: Create the Connection Folder

Create a `connection/` folder inside the database path (e.g., `lib/src/data/connection/`).

Read `references/connection.md` and copy all four code snippets into the target `connection/` folder as separate `.dart` files:

- `connection.dart` — conditional export that selects the right implementation per platform
- `native.dart` — native (iOS/Android/macOS/Linux/Windows) connection using `NativeDatabase`
- `unsupported.dart` — fallback stubs that throw `UnsupportedError`
- `web.dart` — web connection using `WasmDatabase`

### Step 3: Create the Database File

Create or update the database file (e.g., `app_database.dart`) in the database path with:

```dart
import 'package:drift/drift.dart';
import 'connection/connection.dart' as impl;

part '<database_file_name>.g.dart';

// TODO: Define table classes here

@DriftDatabase(
  tables: [
    // TODO: Add table classes here
  ],
)
class <DatabaseName> extends _$<DatabaseName> {
  <DatabaseName>() : super(impl.connect());

  @override
  int get schemaVersion => 1;
}
```

Replace `<DatabaseName>` with the chosen database name (default: `AppDatabase`) and `<database_file_name>` with the snake_case version of the file name.

### Step 4: Configure build.yaml

Create or update `build.yaml` in the project root with Drift builder options:

```yaml
targets:
  $default:
    builders:
      drift_dev:
        options:
          generate_manager: false
```

If `build.yaml` already exists, merge the `drift_dev` builder options into the existing configuration. If Riverpod code generation is also present, add the `runs_before` ordering:

```yaml
global_options:
  drift_dev:
    runs_before:
      - riverpod_generator
```

### Step 5: Download Web Support Files

If the project targets Flutter web, download `sqlite3.wasm` and `drift_worker.js` into the `web/` folder.

To determine the correct versions, read `pubspec.lock` and extract the resolved versions for the `sqlite3` and `drift` packages. Then download:

```bash
curl -L -o web/sqlite3.wasm "https://github.com/simolus3/sqlite3.dart/releases/download/sqlite3-<SQLITE3_VERSION>/sqlite3.wasm"
curl -L -o web/drift_worker.js "https://github.com/simolus3/drift/releases/download/drift-<DRIFT_VERSION>/drift_worker.js"
```

Replace `<SQLITE3_VERSION>` and `<DRIFT_VERSION>` with the versions from `pubspec.lock` (e.g., `2.6.0` and `2.31.0`).

**Important:** The `sqlite3.wasm` file must come from a 2.x release of `sqlite3`, not 3.x — they are incompatible.

### Step 6: Run Code Generation

```bash
dart run build_runner build --delete-conflicting-outputs
```

## Architecture Guidance

These principles are not enforced by the skill but help avoid common pitfalls:

- **Separate connection from file IO.** The `connection/` folder owns executor selection (native vs web vs unsupported). Database import/export, backup, and file validation are separate concerns and belong in their own module (e.g., `database/io/`).
- **Avoid `dart:io` in shared code when web is a target.** Use conditional exports with native and stub implementations to keep the web compile path clean.
- **Treat runtime schema validation as optional.** The `native.dart` reference includes `validateDatabaseSchema` using `drift_dev` APIs — this is useful in debug mode but can cause dependency or lint friction in some projects. Omit it if not needed.
- **Preserve existing public APIs.** When adding Drift to a project that already has database logic, prefer adapting existing code over replacing it. Keep public methods used by callers and tests stable, and delegate internally to platform-aware helpers.

## Post-Setup Validation

Run these checks to confirm the setup is working:

```bash
dart run build_runner build --delete-conflicting-outputs
flutter analyze
flutter test  # if database tests exist
flutter build web  # if web is a target platform
```

## Post-Setup

On successful setup, commit the changes:

1. Stage all new and modified files with `git add -A`
2. Commit using conventional commits format: `feat: add drift database setup`
