# Retrofitting Playbook

Use this playbook to add robot journey testing to existing Flutter apps without
large architecture rewrites.

## Principles

- Start with highest-value journeys.
- Add the smallest seams/selectors needed.
- Stabilize async behavior before expanding test coverage.
- Keep rollout incremental and measurable.

## Step 1: Pick Initial Journeys

Choose 1-3 high-value journeys first, such as:
- sign in/sign out
- add/edit/delete core entity
- purchase/checkout equivalent critical flow

## Step 2: Add Minimal Selector Contract

- Add stable keys to controls required by selected journeys.
- Do not mass-add keys to every widget.
- Add semantics identifiers only when needed for accessibility or black-box lane.

## Step 3: Create Test Seams

- Introduce override points for network/storage/time dependencies.
- Add fake repositories/services with deterministic behavior.
- Disable simulated delays in tests by default.

## Step 4: Build Robot Layer

- Create one top-level robot that composes feature robots.
- Move interaction details into robot methods.
- Keep journey tests short and intent-driven.

## Step 5: Split Files by Responsibility

- Keep journeys in `test/journeys` with orchestration only.
- Keep robots in `test/robots` with interaction/assertion methods.
- Keep setup helpers in `test/harness` and seed helpers in `test/fixtures`.
- Avoid a single file containing journeys, robots, and harness together.

See [test-layout-conventions.md](./test-layout-conventions.md) for naming and
ownership rules.

If you are starting from a single-file retrofit, extract incrementally:
1. Move harness/setup helpers first.
2. Extract feature robots next.
3. Split each journey into its own `*_journey_test.dart` file.

## Step 6: Handle Responsive Variants

Use robot methods that branch by visible UI shape where necessary:

```dart
Future<void> openPopupMenuIfCollapsed() async {
  final menuButton = find.byType(MoreMenuButton);
  if (menuButton.evaluate().isNotEmpty) {
    await tester.tap(menuButton);
    await tester.pumpAndSettle();
  }
}
```

Use viewport-aware setup when journey behavior changes by size/platform.

## Step 7: Stabilize Async/Timer Behavior

- Replace implicit timers in UI logic with injectable scheduling where feasible.
- Use deterministic pump strategy and observable state transitions.
- Keep `runAsync` as temporary fallback with documented rationale.

## Suggested Rollout

1. **Wave 1**: One critical happy-path journey.
2. **Wave 2**: Error and recovery paths for same feature.
3. **Wave 3**: Additional journeys and responsive edge cases.

## Anti-Patterns

- Rewriting the app architecture before adding first journey test.
- Requiring semantics metadata everywhere from day one.
- Relying on `find.text` and `find.byType` as primary action selectors.
- Leaving unresolved timer-based flakiness undocumented.
- Keeping all journeys, robots, and harness in one test file after adding
  multiple journeys.
