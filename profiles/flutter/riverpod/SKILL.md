---
name: structured-workflow-riverpod
description: High-rigor Riverpod project profile for Flutter apps using generated Riverpod providers, layered architecture, TDD, behavior-focused coverage, and explicit error boundaries. Use when planning, implementing, or reviewing Flutter code that uses Riverpod.
---

# Structured Workflow Riverpod Profile

This profile guides Flutter work in repos that use Riverpod as the state
management and dependency-injection layer.

It is a **Project Profile**, not a universal Flutter architecture. Load it only
after reading the repo's `CONTEXT.md`, relevant ADRs, PRD, current plan, and
local architecture docs.

## Source Positioning

This profile is initially informed by the user's Mythic GME architecture,
testing, and error-handling guides. Those guides synthesize Andrea Bizzotto's
Riverpod architecture work, Very Good Ventures quality standards, official
Flutter/Dart/Riverpod documentation, and production lessons from a published
offline-first app.

ACT Flutter guidance was used as private pressure-test input. Do not copy ACT
paid-source wording into public Structured Workflow profile text.

## Core Standards

Apply these standards when the repo confirms this high-rigor Riverpod profile:

- Use generated Riverpod providers for production state.
- Treat Riverpod as the dependency-injection container.
- Keep domain, data, application, and presentation responsibilities separated.
- Organize by feature first, then layer inside the feature.
- Use query providers for read paths and mutation controllers for write paths.
- Do not let controllers cache application data that belongs to the source of
  truth.
- Derive state from one source of truth instead of synchronizing duplicate
  state.
- Keep side effects out of direct `build()` execution; use transition-driven
  listener behavior.
- Preserve typed error boundaries and stack traces.
- Use TDD in vertical slices for autonomous implementation.
- Test behavior through public interfaces; coverage must not create fake tests.
- Verify current APIs through official docs before planning or implementation
  relies on syntax, package behavior, or migration assumptions.

## References

Read only the reference files needed for the task:

- [references/architecture.md](references/architecture.md) for layer rules,
  Riverpod provider shape, project-profile calibration, and state invariants.
- [references/testing.md](references/testing.md) for TDD, coverage, real-system
  testing boundaries, provider tests, and behavior-focused assertions.
- [references/error-handling.md](references/error-handling.md) for error vs
  exception policy, layer handling, `AsyncValue`, Sentry/privacy, and stack
  preservation.

For Structured Workflow integration, load
[STRUCTURED_WORKFLOW.md](STRUCTURED_WORKFLOW.md).
