# Vertical Slice Cycle

The core TDD execution protocol. Follow this cycle for every behavior increment.

## The Cycle

```
RED → GREEN → REFACTOR → (commit) → repeat
```

### RED: Write One Failing Test

- Write exactly **one** test that describes the next behavior increment.
- Run the test. It **must fail**. If it passes, either:
  - The behavior already exists (skip implementation, write the next test).
  - The test doesn't actually verify what you think (fix the test).
- The test should be small and focused on a single behavior.

### GREEN: Minimal Implementation

- Write the **minimum** code to make the failing test pass.
- Do not generalize. Do not add code for future tests.
- Do not refactor yet. Ugly code that passes is fine.
- Run all tests. All must pass — not just the new one.

### REFACTOR: Clean Up

- Only refactor when **all tests are green**.
- Improve structure, remove duplication, rename for clarity.
- Run all tests after refactoring. They must still pass.
- If any test breaks during refactoring, **undo and try again**.

### Commit

- Each completed cycle (or small group of related cycles) is a valid commit point.
- Code compiles, all tests pass, implementation is minimal and clean.

## Execution Rules for LLMs

These constraints prevent the natural tendency to write implementation first:

1. **Never batch tests.** Writing 5 tests then implementing is horizontal slicing.
2. **Never implement ahead of tests.** If you know you'll need a method, don't write it until a test demands it.
3. **Never skip red.** Every test must demonstrably fail before you write implementation. If you can't run the test (compilation error is acceptable as a "fail"), the test at minimum must target behavior that doesn't exist yet.
4. **Never refactor while red.** Fix the failing test first, then restructure.
5. **Minimal means minimal.** Hardcoding a return value to pass a test is legitimate if only one test demands that behavior. The next test forces generalization.

## Cycle Example: Flutter Unit Test

Building a `TemperatureConverter`:

**Cycle 1 — RED:**
```dart
test('converts 0°C to 32°F', () {
  final converter = TemperatureConverter();
  expect(converter.celsiusToFahrenheit(0), 32.0);
});
```
Class doesn't exist yet → fails.

**Cycle 1 — GREEN:**
```dart
class TemperatureConverter {
  double celsiusToFahrenheit(double celsius) => 32.0; // hardcoded is fine
}
```
Test passes. Only one case demands this, so hardcoding is valid.

**Cycle 2 — RED:**
```dart
test('converts 100°C to 212°F', () {
  final converter = TemperatureConverter();
  expect(converter.celsiusToFahrenheit(100), 212.0);
});
```
Fails — hardcoded 32.0 doesn't satisfy 100°C.

**Cycle 2 — GREEN:**
```dart
double celsiusToFahrenheit(double celsius) => celsius * 9 / 5 + 32;
```
Now both tests pass. The second test forced the real formula.

**Cycle 2 — REFACTOR:** Nothing to clean up. Commit.

## Cycle Example: Flutter Widget Test

Building a `CounterWidget`:

**Cycle 1 — RED:**
```dart
testWidgets('displays initial count of 0', (tester) async {
  await tester.pumpWidget(const MaterialApp(home: CounterWidget()));
  expect(find.text('0'), findsOneWidget);
});
```

**Cycle 1 — GREEN:**
```dart
class CounterWidget extends StatelessWidget {
  const CounterWidget({super.key});

  @override
  Widget build(BuildContext context) {
    return const Text('0');
  }
}
```
Minimal — just renders '0'. No buttons, no state.

**Cycle 2 — RED:**
```dart
testWidgets('increments count on button tap', (tester) async {
  await tester.pumpWidget(const MaterialApp(home: CounterWidget()));
  await tester.tap(find.byKey(const Key('increment-button')));
  await tester.pump();
  expect(find.text('1'), findsOneWidget);
});
```
Fails — no button exists yet.

**Cycle 2 — GREEN:**
Convert to `StatefulWidget`, add button with key, wire up state. Test passes.

**Cycle 2 — REFACTOR:** Extract if needed. Commit.

## Anti-Patterns

| Anti-Pattern | Why It Fails |
| --- | --- |
| Write all tests first, then implement | Tests verify imagined behavior; implementation fills gaps without constraint |
| Write implementation first, then tests | Tests become after-the-fact documentation, not driving design |
| Skip the red step | Without genuine failure, you can't be sure the test verifies anything |
| Implement more than the test demands | Over-engineering; untested code paths accumulate |
| Refactor while red | Risk compounding failures; refactoring assumes a stable green baseline |
| Mock everything | Tests pass but verify mock behavior, not real system behavior |

## Checklist

- [ ] Each test is written before its implementation.
- [ ] Each test fails before implementation begins.
- [ ] Implementation is minimal — just enough for the current test.
- [ ] Refactoring happens only when all tests are green.
- [ ] No batch of tests written before any implementation.
- [ ] Each cycle produces working, compilable code.
