# Riverpod Testing Reference

## Testing Contract

This profile assumes autonomous implementation uses TDD in vertical slices.
Each slice should prove one behavior through the public interface, implement the
smallest passing code, refactor while green, and then continue.

The profile is compatible with a high-rigor 100% non-generated line coverage
contract, but coverage is a project-profile decision. Coverage pressure must
never produce fake tests.

## TDD Execution Rules

For autonomous agents:

1. Write exactly one behavior test.
2. Run the test and confirm it fails for the expected reason.
3. Implement only enough production code to pass that test.
4. Run the test and confirm it passes.
5. Refactor only while green.
6. Repeat with the next behavior.

If a test passes before implementation, diagnose whether the behavior already
exists or the test does not prove what it claims.

## Vertical Slices

A vertical slice should cut through the necessary layers end to end:

- domain behavior or invariant
- data transformation or persistence behavior
- provider/controller behavior
- widget/user-visible behavior when UI is affected
- validation evidence

Avoid horizontal batches such as "write all models," "write all providers," or
"write all tests" before any behavior is running.

## What To Test By Layer

Domain tests should cover business rules, invariants, value behavior, edge
cases, and pure transformations. They should not mock domain models.

Data tests should cover repository implementations, DTO conversions,
serialization, persistence, migrations, and infrastructure exception
transformation.

Application tests should cover multi-repository coordination, transaction
semantics, business context, and error propagation.

Provider/controller tests should cover read-provider results, mutation state
transitions, repository calls, invalidation behavior, and error states.

Widget tests should cover rendering, user interactions, navigation effects,
loading states, error states, empty states, and provider override wiring.

## Real-System Boundary

Use real systems when the app owns the integration and correctness depends on
the integration actually working:

- local file I/O in temp directories
- JSON or DTO round-trips
- local storage abstractions controlled by the app
- repositories whose bugs commonly appear at serialization or persistence
  boundaries

Use fakes or mocks at external boundaries:

- network APIs
- third-party services
- payment providers
- platform plugins that would leave the test process
- nondeterministic hardware or OS behavior

The goal is not "never mock." The goal is to avoid replacing the business logic
or owned integration being tested with a fake that can drift from production.

## Riverpod Test Patterns

- Use provider overrides to inject dependencies.
- Prefer testing real notifier/controller logic with mocked repositories or
  services at the correct boundary.
- Do not mock the notifier/controller under test.
- Use provider containers that clean themselves up when the repo's Riverpod
  version supports that pattern.
- Test read paths by awaiting provider futures or observing provider state.
- Test write paths by asserting mutation state transitions and downstream
  effects.
- Verify invalidation behavior through observable results where possible.

## Coverage Integrity

When a repo chooses 100% non-generated line coverage:

- Exclude generated files according to repo policy.
- Confirm file-level coverage from coverage output, not just "tests passed."
- Add tests under mirrored paths when the repo mirrors `lib/` under `test/`.
- Do not add test-only seams as the default answer to hard-to-test code.
- If coverage requires exposing internals or adding brittle seams, treat that as
  a design signal. Refactor the boundary or record a testability follow-up.
- Delete or rewrite tests that do not prove behavior.

Coverage is evidence only when the assertions would fail if the behavior or
contract changed.

## Validation Commands

Use the repo's own commands. In a typical Flutter repo, validation may include:

```bash
dart run build_runner build --delete-conflicting-outputs
dart format .
flutter analyze
flutter test
flutter test --coverage
```

Do not claim validation passed unless the commands actually ran and passed. If a
command is skipped, state why.
