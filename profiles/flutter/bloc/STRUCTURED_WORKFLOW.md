# Structured Workflow Integration

This profile adapts the MIT-licensed VGV BLoC guidance into Structured Workflow.
The copied VGV skill text remains the source baseline; this file explains how
the profile participates in collaborative modeling, planning, implementation,
and review.

## Profile Role

Use this profile when a Flutter project uses `package:bloc`,
`package:flutter_bloc`, or `package:bloc_test`.

The profile is not the workflow entry point. It is loaded inside a workflow after
the repository context and user intent are understood.

## Load Order

When BLoC work is in scope, load context in this order:

1. `CONTEXT.md` and any context map.
2. Relevant ADRs and project-specific architecture docs.
3. Approved PRD or current collaborative-modeling artifact.
4. Current implementation plan and review notes.
5. This profile's VGV BLoC guidance:
   - `SKILL.md`
   - `references/architecture.md`
   - `references/patterns.md`
   - `references/testing.md`
   - `references/widgets.md`

Project language wins over generic examples. If VGV examples use placeholder
domain terms, translate them into the repo's Ubiquitous Language before writing
events, states, blocs, cubits, tests, or UI copy.

## Collaborative Modeling

During GrillMe / collaborative modeling, resolve BLoC-specific decisions before
planning implementation:

- Is the feature simple enough for Cubit, or does it need Bloc traceability?
- What domain terms name the events, states, repositories, and UI surfaces?
- Which state transitions matter to the user or domain?
- Which side effects belong in listeners instead of builders?
- Which repository or service boundaries already exist?
- Which current official docs need to be checked before implementation?

The outcome should be reflected in `CONTEXT.md`, ADRs, or the PRD before the
agent moves into implementation planning.

## Planning

For BLoC work, the implementation plan must include:

- Vertical slices that can be tested and verified independently.
- The Bloc/Cubit choice for each slice.
- Event and state names based on the Ubiquitous Language.
- Test-first steps using `blocTest()` for Bloc/Cubit behavior.
- Widget test steps for Page/View wiring and user-visible states.
- Official documentation research for current Bloc, Flutter Bloc, and Bloc Test
  APIs.
- A BLoC profile review gate before build starts.

Do not let the plan invent state-management conventions that conflict with the
repo's established profile.

## Build

Implementation follows TDD:

1. Write one failing test.
2. Run it and verify RED.
3. Implement the minimum code needed for GREEN.
4. Refactor only after GREEN.
5. Repeat for the next behavior.

The BLoC profile keeps these VGV rules active during build:

- Use `blocTest()` for Bloc/Cubit tests.
- Use `mocktail` for mocks.
- Keep business logic in Bloc/Cubit, not widgets.
- Preserve Page/View separation.
- Avoid direct bloc-to-bloc dependencies.
- Use `BlocListener` or equivalent listener behavior for side effects.

## Review

BLoC changes require review for:

- Correct Cubit vs Bloc choice.
- Domain-aligned event and state names.
- Exhaustive and typed state modeling.
- No business logic in widgets.
- Correct Page/View separation.
- Tests that prove state transitions and user-visible behavior.
- No stale or synchronized duplicate state.
- Alignment with `CONTEXT.md`, ADRs, PRD, and implementation plan.

If the review finds a shared-understanding problem, update the steering artifact
first. Do not patch code around an unclear model.

## Attribution

The BLoC source material in this profile is copied from the VGV AI Flutter
Plugin under the MIT License. Preserve `LICENSE` when reusing or publishing the
profile.
