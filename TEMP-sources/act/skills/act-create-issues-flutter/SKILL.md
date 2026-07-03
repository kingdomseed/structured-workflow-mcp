---
name: act-create-issues-flutter
description: Turn a Spec into Flutter/Dart vertical-slice Work Items with UX, state, and testing expectations carried forward.
argument-hint: "[Spec reference]"
tools: [Skill]
---

Run `act-create-issues` with the original arguments and the Flutter/Dart guidance below applied throughout the workflow.

The core skill is authoritative for readiness checks, approval-before-writing, Work Item shape, blockers, dependencies, traceability, and output shape. Flutter/Dart guidance may enrich decomposition, not replace its priorities or artifact requirements.

When the core skill recommends next workflow commands, recommend the `-flutter` variants instead.

Preserve exact Spec contracts in Work Items. Do not generalize specified UI text, routes, commands, configuration values, data shapes, supported values, error behavior, or verification requirements.

### Flutter/Dart Guidance

Prefer vertical Flutter slices through UI, state, services/data, and tests. Avoid horizontal slices such as all models, then all providers, then all screens unless the Spec requires that boundary.

For Flutter user-facing Work Items, translate relevant Spec requirements into acceptance criteria for visible behavior, user-visible states, navigation boundaries, accessibility/responsive behavior, and platform constraints.

Carry testing expectations from the Spec into each Work Item:

- Preserve the unit/widget/robot split when applicable.
- Add TDD acceptance only when the Spec or approved proposal expects test-first implementation.
- Include stable selector and deterministic seam requirements for robot journeys.

Use `## Required context` for similar features, state-management examples, service/repository conventions, test or robot conventions, and `pubspec.yaml` when dependency changes are involved.

Avoid separate test-infrastructure Work Items unless the seam or harness is independently valuable or blocks multiple slices.
