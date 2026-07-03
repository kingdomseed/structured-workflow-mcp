# Overview

This guide defines the vertical-slice TDD discipline for Flutter/Dart projects.

## Goals

- Enforce one-test-at-a-time red-green-refactor cycles.
- Produce honest tests that verify observed behavior, not imagined behavior.
- Drive minimal implementations through real test failures.
- Design interfaces for testability before writing code.

## Non-Goals

- Prescribing specific test frameworks or assertion libraries.
- Defining test tier taxonomy (unit/widget/integration boundaries).
- Replacing robot-testing conventions (TDD discipline works within them).

## Core Problem

LLMs default to **horizontal slicing**: write all tests first, then all implementation. This fails because:

1. Tests written in bulk verify imagined behavior, not real code paths.
2. Implementation fills in gaps without genuine constraint from test failures.
3. Tests and code evolve independently, producing false confidence.

## Solution: Vertical Slicing

Each feature increment follows a strict cycle:

1. **RED** — Write exactly one failing test.
2. **GREEN** — Write the minimum code to pass that test only.
3. **REFACTOR** — Clean up while keeping all tests green.

Repeat until the feature is complete. Each cycle produces a working, committable slice.

## Execution Rules

See [vertical-slice-cycle.md](./vertical-slice-cycle.md) for the full protocol.

## Test Quality

See [test-quality-contract.md](./test-quality-contract.md) for criteria distinguishing good tests from bad.

## Testability Design

See [planning-for-testability.md](./planning-for-testability.md) for pre-development design guidance.

## Applicability

Apply this discipline when:
- The task includes writing tests alongside implementation.
- New behavior is being added (features, bug fixes with regression tests).

Skip when:
- Pure refactors with existing test coverage.
- Configuration or documentation changes.
- Spikes where tests follow exploration.

## Policy Summary

- Never write multiple tests before implementing. One test at a time.
- Tests must genuinely fail before implementation begins.
- Implementation must be minimal — just enough to satisfy the current test.
- Refactor only when green. Never restructure while tests are red.
- Tests exercise public interfaces. Never mock internals or test private methods.
- Each cycle produces a committable slice that compiles and passes all tests.
