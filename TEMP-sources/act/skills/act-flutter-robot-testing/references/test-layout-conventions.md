# Robot Test Layout Conventions

Use these conventions for robot-driven journey tests.

## Scope Boundary

This document applies to robot journey tests only.
It does not define conventions for non-robot Flutter widget tests.

## Recommended Structure

```text
test/
  journeys/
    onboarding_journey_test.dart
    investments_crud_journey_test.dart
  robots/
    app_robot.dart
    onboarding_robot.dart
    investments_robot.dart
    investment_form_robot.dart
  harness/
    app_harness.dart
    create_test_container.dart
  fixtures/
    seed_investments.dart
    seed_snapshots.dart
```

## Convention Compatibility

Use the structure above as the default for new robot journey test setups.
For existing codebases with established test infrastructure, prioritize
maintainability outcomes over exact folder names.

- Keep existing paths when they are coherent and already used across tests.
- Require separation of responsibilities even if folder names differ:
  journeys orchestrate, robots encapsulate interactions/assertions, harness owns
  setup/DI, fixtures own seed data.
- Migrate from monolithic files incrementally when scale increases (for example,
  multiple journeys or repeated setup code).
- If structure remains temporarily monolithic, call out maintainability risk in
  journey verification output.

Equivalent layouts are acceptable when ownership boundaries remain clear, such
as `test/presentation/journeys`, `test/helpers/harness`, or feature-scoped robot
folders.

## Ownership Rules

- `test/journeys/*_journey_test.dart`
  - Contains high-level user flow orchestration.
  - Calls robot methods.
  - Does not define full robot classes or full harness builders.
- `test/robots/*_robot.dart`
  - Contains interaction and assertion methods.
  - Uses key-first selectors as the default.
- `test/harness/*.dart`
  - Contains app bootstrap, provider overrides, and pump helpers.
- `test/fixtures/*.dart`
  - Contains deterministic seed data and reusable fake inputs.

## Naming Conventions

- Top-level composed robot: `app_robot.dart`
- Feature robot: `<feature>_robot.dart`
- Journey file: `<journey>_journey_test.dart`
- Harness entrypoint: `app_harness.dart`

## Pragmatic Exception Threshold

A single-file setup is temporarily acceptable only when both are true:
- exactly one journey is under test
- exactly one feature robot is needed

Once either threshold is exceeded, split files by the structure above and report
any temporary monolithic structure as maintainability risk.

## Anti-Pattern

Do not keep all journeys, robot classes, harness setup, and fixtures in one
large test file after adding multiple journeys.

## Acceptance Checklist

- Journey files are intent-focused and short.
- Robot files encapsulate interaction details.
- Harness and fixture helpers are imported, not duplicated.
- Key-first selector guidance remains unchanged.
- Added selectors and seams are limited to declared journeys.
