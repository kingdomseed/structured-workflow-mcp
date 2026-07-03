---
name: act-flutter-tdd
description: Vertical-slice test-driven development discipline for Flutter/Dart. Enforces strict one-test-at-a-time red-green-refactor cycles to produce honest tests and minimal implementations. Use during planning (testability design) and execution (implementation discipline).
tools: [Read]
---

# Flutter TDD

Use this skill to enforce vertical-slice TDD discipline when planning and implementing Flutter/Dart features.

## Purpose

This skill helps you:
- follow strict red-green-refactor cycles (one test at a time)
- avoid horizontal slicing (all tests first, then all implementation)
- write tests that exercise public interfaces, not implementation details
- design for testability before writing code
- produce minimal implementations driven by real test failures

## Problem

LLMs default to horizontal slicing — writing all tests in bulk, then all implementation. This produces tests that verify *imagined* behavior, not *observed* behavior. Tests become decoupled from actual code paths.

Vertical-slice TDD forces honest tests through constrained cycles: each test must genuinely fail before implementation begins.

## Applicability

Use this skill when:
- implementing new features or fixing bugs with tests
- the plan includes test tasks alongside implementation tasks
- writing unit tests, widget tests, or integration tests

Skip this skill for:
- pure refactors where existing tests already cover behavior
- documentation or configuration-only changes
- exploratory spikes where tests will be written after

## Quick Start

1. Read [overview.md](./references/overview.md) for the full discipline
2. Pick focused references based on your need:
   - [vertical-slice-cycle.md](./references/vertical-slice-cycle.md) — the core red-green-refactor loop
   - [test-quality-contract.md](./references/test-quality-contract.md) — good vs bad test criteria
   - [planning-for-testability.md](./references/planning-for-testability.md) — pre-development design for testability

## Routing

| If you need | Read |
| --- | --- |
| Core TDD cycle and execution rules | [vertical-slice-cycle.md](./references/vertical-slice-cycle.md) |
| Criteria for good vs bad tests | [test-quality-contract.md](./references/test-quality-contract.md) |
| Pre-development testability planning | [planning-for-testability.md](./references/planning-for-testability.md) |

## Integration with Other Skills

- **act-flutter-robot-testing**: TDD discipline applies within robot-driven journey tests. Write one journey assertion at a time, implement the robot method, then the production code.
- **act-flutter-development**: TDD complements existing principles. YAGNI/KISS naturally emerge when implementation is driven by minimal test satisfaction.

## Guardrails

- One failing test at a time. Never write a batch of tests before implementing.
- Tests exercise public interfaces only. No mocking internals or testing private methods.
- Implementation must be minimal — just enough to pass the current test.
- Refactor only after green. Never restructure while tests are failing.
- Each red-green-refactor cycle produces a committable unit.
