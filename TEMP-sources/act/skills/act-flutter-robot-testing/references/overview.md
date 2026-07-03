# Overview

This guide defines policy for robot-driven Flutter widget journey verification.

## Goals

- Verify user journeys in widget tests with a robot API layer.
- Improve test reliability with stable selectors and deterministic seams.
- Keep robot journey tests maintainable as coverage grows.
- Keep completion reporting explicit about what was verified and what risk remains.

## Non-Goals

- Auto-generating app-level robot tests.
- Introducing a tier taxonomy (`smoke/core/full`).
- Changing visual screenshot lane behavior.

## Verification Lanes

1. **Widget robot journey lane (default)**
   - Primary lane for flow verification.
   - Uses key-first selectors.
2. **Black-box UI lane (optional)**
   - Uses semantics metadata when justified.
   - Useful for accessibility-centric or automation-centric checks.
3. **Visual lane (separate)**
   - Use screenshot-based checks separately.

## Applicability Rule

Apply this guidance when the task is both:
- Flutter
- user-facing

Otherwise, keep existing workflow behavior and skip robot-specific requirements.

## Scope Boundary

This guidance defines conventions for robot-driven journey tests only.
It does not define folder conventions for non-robot Flutter widget tests.

## Minimum Artifact Layout (Multi-Journey Retrofit)

When a retrofit covers multiple journeys, keep artifacts split by responsibility:
- `test/journeys`: high-level journey tests
- `test/robots`: top-level and feature robots
- `test/harness`: app pump/bootstrap and DI setup
- `test/fixtures`: reusable seed data and fake inputs

See [test-layout-conventions.md](./test-layout-conventions.md) for naming,
ownership boundaries, and exceptions.

## Minimum Artifacts Per Journey

For each declared journey, provide:
- journey name
- robot methods used
- stable selector contract (keys, plus semantics only if justified)
- targeted verification command
- remaining risk statement

See [risk-reporting.md](./risk-reporting.md) for the required output format.

Example journey catalog (normalized from baseline app flows):

```markdown
| Journey | Targeted command |
| --- | --- |
| Sign in and sign out | `flutter test test/src/features/auth_flow_test.dart` |
| Full purchase flow | `flutter test test/src/features/purchase_flow_test.dart` |
```

## Policy Summary

- Start with [test-layout-conventions.md](./test-layout-conventions.md) to keep
  robot journey tests scalable.
- Start with [robot-architecture.md](./robot-architecture.md) to shape robot APIs.
- Use [selector-contract.md](./selector-contract.md) to avoid brittle selectors.
- Use [test-harness-di-fakes.md](./test-harness-di-fakes.md) to make async deterministic.
- Use [retrofitting-playbook.md](./retrofitting-playbook.md) for incremental rollout.
