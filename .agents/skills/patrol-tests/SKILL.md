---
name: patrol-tests
description: Rules for writing Patrol E2E tests in Flutter apps
---

# Order of actions when writing new tests

## Critical precedence

Project and mission guidance overrides this generic skill. If a project bans Patrol MCP, requires shell `patrol test -t ... -d <device>`, uses semantics or typed finders as stable test surfaces, or requires repo gates such as `flutter test`, follow the project. Never run `patrol_test/*` with `flutter test`, but do not skip unrelated unit/widget test gates.

Patrol actions already wait for visibility and settle after the action. Do not add waits or pumps to fix a missed tap. A missed visible target is a target-selection, hit-test, alignment, coverage, or finder problem until proven otherwise. Extra frame pumping is allowed only after a successful action has hit the intended control and the exact async/animation/route transition being advanced is named. If a visible target is missed, instrument once, fix the target choice first, try at most one targeted fallback, then stop with evidence instead of cycling finder variants.

1. Inspect existing test code for functions that can be reused
2. Also think if one of existing functions can be adjusted to match its existing usage and new test
3. Assign test keys to required elements if they are not assigned yet
4. Start writing test: reuse existing functions + put new test steps in new test file
5. Write patrol actions directly in the test file, do not create new methods
6. Run the test frequently during development — don't wait until the full test is written. Run after completing each logical group of steps to catch failures early
7. After full test passes, reorganize new code into reusable functions
8. Rerun the test after reorganizing to confirm it still passes

# Patrol MCP Usage

When working with Patrol tests:

- Use `patrol-run({ "testFile": "patrol_test/your_test.dart" })` to run tests and wait for completion
- If no session running: starts new session with specified test file
- If session already running: automatically restarts current tests
- Use `patrol-screenshot({ "platform": "android" })` or `patrol-screenshot({ "platform": "ios" })` to capture screenshots for debugging test failures
- Use `patrol-quit({})` to quit the session gracefully
- Use `patrol-status({})` to check current status and recent output
- Use `patrol-native-tree({})` to fetch the current native UI tree hierarchy for writing native interactions and interactions with apps other than the app under test.

# Patrol Tests Rules

## Patrol API

- Any file that directly uses Patrol APIs (`$()`, `.scrollTo()`, `.tap()`, `.enterText()`, `.waitUntilVisible()`, etc.) should `import 'package:patrol/patrol.dart';`
- ALWAYS inspect Patrol API before implementing test actions:
  - Search codebase for existing Patrol API usage patterns
  - Check $.platform APIs for the specific action
  - If method not found in codebase, check: https://patrol.leancode.co/
  - Only implement after confirming the correct API method
- ALWAYS inspect `$.platform` methods before implementing test actions
- Prefer Patrol APIs for E2E actions. `flutter_test` finders, `expect`, or `WidgetTester` access are acceptable when Patrol exposes them or the project has established helper patterns.
- Run Patrol E2E with the project-approved runner. If the project mandates shell `patrol test -t patrol_test/<file>_test.dart -d <device>`, use that instead of Patrol MCP. Never run `patrol_test/*` with `flutter test`; repo unit/widget gates may still require `flutter test`.
- Do not write patrolSetUp and patrolTearDown methods on your own

## Action Rules

- Do not add waits/pumps to make a missed tap work. Patrol handles ordinary visibility and post-action settling. Extra frame pumping is only for a named transition after a confirmed successful action.
- Prefer stable keys, but project patterns may use semantics labels, typed/scoped finders, or documented geometry taps for custom widgets. Follow the local test surface contract.
- Don't write try catch blocks unless absolutely necessary
- After writing test check if it works by running it with the project-approved Patrol runner, fix genuine test or product failures, and stop on infrastructure blockers with evidence.
- If test fails because element was not found, check if it need to be scrolled to in the app code and adjust the test if needed

## Assertion Rules

- Prefer final user-outcome assertions, but assertions after important state transitions are allowed when they make failures deterministic and match project helper patterns.
- Prefer using `waitUntilVisible` as assertion at the end of the test
- Use `expect()` for assertions only when `waitUntilVisible` is not enough

## Native Dialog Handling

- ALWAYS handle native dialogs that appear during the flow:
  - Handle dialogs immediately after the action that triggers them
  - For native permissions prefer `$.platform.mobile.grantPermissionWhenInUse` over `$.platform.mobile.tap`

# Test Keys

- Assign a key ONLY to widgets involved in testing
- ONLY add the `key` parameter to existing widgets
- NEVER change widget signatures
- NEVER refactor existing code structure
- NEVER hardcode keys in the app, you must use keys from the keys file that is shared between app and tests
- NEVER create new widgets in the app
- NEVER create a key that is not assigned to a widget
- Always make sure that each key value is unique
- ALWAYS sort keys alphabetically
- Add keys as first parameter to the widget constructor

- If widget is not unique (for example generated from a list) use a parameterized key

  - ALWAYS prefer using enums or DTOs as the parameter if they already exist
  - Use existing widget properties for parameterized keys
  - NEVER assign a parameterized key in the app and then use fixed values for it in the keys file (and vice versa)
  - NEVER create helper methods, use parameterized keys instead
  - When widgets are generated from existing enums or DTOs, always use parameterized keys with the those enum/DTO values as the parameter

  Use individual keys when:

  - Widgets are hardcoded and known at compile time
  - Widgets have distinct, meaningful names

  Use parameterized keys when:

  - Widgets are generated from dynamic data
  - Widgets are generated from a DTO or enums
  - Number of widgets is variable or large
  - Widgets are generated in loops or from lists
