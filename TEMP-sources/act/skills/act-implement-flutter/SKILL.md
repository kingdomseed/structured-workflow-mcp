---
name: act-implement-flutter
description: Implement a Flutter/Dart Work Item or Spec using appropriate support skills, tests, and verification defaults.
argument-hint: "[Work Item or Spec] [--do-not-commit]"
tools: [Skill]
---

Run `act-implement` with the original arguments and the Flutter/Dart guidance below applied throughout the workflow.

The core skill is authoritative for blockers, acceptance criteria, implementation scope, verification, completion behavior, and commit behavior. Flutter/Dart guidance may enrich implementation, not replace its priorities or completion requirements.

When the core skill recommends next workflow commands, recommend the `-flutter` variants instead.

Implement exact upstream contracts. Do not generalize specified UI text, routes, commands, configuration values, data shapes, supported values, error behavior, or verification requirements.

### Flutter/Dart Guidance

If no project exists and the work requires one, use `act-flutter-create` for Flutter apps or `act-dart-create` for Dart CLI projects.

Before implementation, load only the support skills needed for the accepted work:

- `act-flutter-development` for Flutter/Dart code work.
- `act-flutter-tdd` when acceptance criteria require TDD.
- `act-flutter-robot-testing` when robot or widget journey tests are required.

For TDD work, follow one failing test, minimum implementation, then refactor while green. Prefer fakes over mocks and test public behavior rather than internals.

Use project docs or scripts when they define verification. Otherwise default to `flutter analyze` and `flutter test` for Flutter, or `dart analyze` and `dart test` for Dart CLI/package work.

Before finishing, consider async flows, controller/subscription/timer disposal, persistence cleanup, state derivation, widget rebuild behavior, entry-point parity, and untested widget/integration paths.
