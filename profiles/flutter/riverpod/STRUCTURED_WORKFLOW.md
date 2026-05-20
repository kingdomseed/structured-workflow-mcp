# Structured Workflow Integration

This file explains how the Riverpod profile participates in Structured
Workflow. The profile is loaded inside a workflow after shared context exists;
it is not a standalone workflow entry point.

## Profile Role

Use this profile when a Flutter project uses Riverpod providers, generated
providers, `ProviderScope` overrides, `ProviderContainer` tests, or Riverpod
`AsyncValue` as a core architecture surface.

This profile is high-rigor. It fits published, offline-first, user-data, or
architecture-sensitive apps especially well. A lower-risk Riverpod repo may
choose a lighter profile later, but it should still preserve TDD, official docs
research, visible failures, and behavior-focused tests.

## Load Order

When Riverpod work is in scope, load context in this order:

1. `CONTEXT.md` and any context map.
2. Relevant ADRs and project-specific architecture docs.
3. Approved PRD or current collaborative-modeling artifact.
4. Current implementation plan, research artifacts, and review notes.
5. This profile's Riverpod guidance:
   - `SKILL.md`
   - `references/architecture.md`
   - `references/testing.md`
   - `references/error-handling.md`

Project decisions win over profile defaults when they are explicit, current,
and reviewed. If local docs are stale or conflict with current official docs,
stop and route the conflict through collaborative modeling or an ADR.

## Collaborative Modeling

During GrillMe / collaborative modeling, resolve Riverpod-specific decisions
before planning implementation:

- What is the repo's current layer model?
- Which terms belong in the Ubiquitous Language before provider, controller,
  repository, model, and error names are chosen?
- Which data is the source of truth?
- Which state is derived from that source of truth?
- Which operations are read paths and which are write paths?
- Which work belongs in domain, data, application, or presentation?
- Which dependencies are injected through providers?
- Which API assumptions need current official documentation research?
- Which failures are expected validation results, runtime exceptions, or
  programming errors?

Record durable decisions in `CONTEXT.md`, ADRs, or the PRD before moving into
implementation planning.

## Planning

For Riverpod work, the implementation plan must include:

- Vertical slices that can be tested and verified independently.
- The provider/controller/repository surfaces touched by each slice.
- The read/write split for data fetching and mutations.
- The source of truth and any derived state.
- Test-first steps for domain, data, provider/controller, and widget behavior.
- Current official docs research for Flutter, Dart, Riverpod, and relevant
  packages.
- Coverage expectations and any explicit exemption policy from the repo.
- Riverpod profile review before build starts.

Do not allow the plan to rely on training-data syntax for current Riverpod,
Flutter, Dart, Sentry, or package APIs.

## Build

Implementation follows TDD:

1. Write one failing test.
2. Run it and verify RED.
3. Implement the minimum code needed for GREEN.
4. Refactor only after GREEN.
5. Repeat for the next behavior.

Keep autonomous implementation inside the approved vertical slice. If the slice
reveals a missing architecture decision, stop and update the steering artifact
instead of widening the code change.

## Review

Riverpod changes require review for:

- Alignment with `CONTEXT.md`, ADRs, PRD, and implementation plan.
- Correct layer ownership.
- Correct read/write split.
- Generated-provider consistency.
- No duplicate state synchronized by hand.
- Behavior-focused tests and honest coverage.
- Real-system testing where the app owns the integration.
- Visible failure handling with typed boundaries and stack preservation.
- No compatibility shims for obsolete APIs in touched code.
- Official docs research for current API usage.

If the review finds a shared-understanding problem, update the steering artifact
first. Do not patch code around an unclear model.

## Attribution

This profile is initially informed by the user's Mythic GME architecture,
testing, and error-handling guides, plus public Riverpod/Flutter architecture
material from Andrea Bizzotto, Very Good Ventures quality conventions, and
official Flutter/Dart/Riverpod documentation.
