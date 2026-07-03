---
name: act-flutter-robot-testing
description: Guidance for creating and retrofitting robot-driven Flutter widget journey tests with stable selectors, deterministic Test Seams, and explicit risk reporting.
tools: [Read]
---

# Flutter Robot Testing

Use this skill to design or retrofit robot-driven Flutter widget journey tests.

## Purpose

This skill helps you:
- define a practical robot architecture for user journeys
- use stable key-first selectors without over-instrumenting the UI
- add deterministic Test Seams (DI/fakes/async control)
- keep robot journey test code maintainable with clear file ownership
- report test coverage and remaining risk in a consistent format

## Applicability

Use this skill when all are true:
- the project is a Flutter app
- the task changes user-facing behavior or interaction flows
- widget-test journey verification is in scope

Skip this skill for:
- Dart CLI projects
- non-user-facing refactors or infrastructure-only changes
- visual diff workflows (use `act-flutter-screenshot` for visual lane checks)

## Quick Start

1. Read [overview.md](./references/overview.md)
2. Pick one or more focused references based on your need:
   - [test-layout-conventions.md](./references/test-layout-conventions.md)
   - [robot-architecture.md](./references/robot-architecture.md)
   - [selector-contract.md](./references/selector-contract.md)
   - [test-harness-di-fakes.md](./references/test-harness-di-fakes.md)
   - [retrofitting-playbook.md](./references/retrofitting-playbook.md)
   - [risk-reporting.md](./references/risk-reporting.md)
3. Apply guidance with minimal instrumentation and explicit residual-risk reporting

## Routing

| If you need | Read |
| --- | --- |
| robot journey test file and folder conventions | [test-layout-conventions.md](./references/test-layout-conventions.md) |
| end-to-end journey structure with robots | [robot-architecture.md](./references/robot-architecture.md) |
| stable selector policy | [selector-contract.md](./references/selector-contract.md) |
| DI/fake harness and async stability | [test-harness-di-fakes.md](./references/test-harness-di-fakes.md) |
| incremental adoption in existing apps | [retrofitting-playbook.md](./references/retrofitting-playbook.md) |
| completion output and residual risk format | [risk-reporting.md](./references/risk-reporting.md) |

## Guardrails

- Widget journey lane is key-first. Stable app-owned `Key` selectors are sufficient.
- Semantics metadata (including `Semantics.identifier`) is optional and situational.
- Async/timer guidance is deterministic-first; `runAsync` is fallback only.
- Add only selectors and seams needed for declared journeys.
- Published guidance should stay source-agnostic (no direct external repo paths).
