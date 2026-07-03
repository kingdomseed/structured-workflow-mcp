---
name: act-create-spec-flutter
description: Create a Spec with Flutter/Dart user flows, states, testing seams, and implementation constraints captured.
argument-hint: ""
tools: [Skill]
---

Run `act-create-spec` with the original arguments and the Flutter/Dart guidance below applied throughout the workflow.

The core skill is authoritative for workflow order, storage behavior, artifact shape, traceability, stopping conditions, and output shape. Flutter/Dart guidance may enrich these requirements, not replace them.

When the core skill recommends next workflow commands, recommend the `-flutter` variants instead.

Preserve exact resolved contracts. Do not generalize specified UI text, routes, commands, configuration values, data shapes, supported values, error behavior, or verification requirements.

### Flutter/Dart Guidance

Use the Interview Ledger, conversation, project docs, and code conventions first. Do not re-ask resolved Flutter/Dart questions. Ask only if a Critical Ambiguity would make the Spec unsafe or misleading.

For Flutter user-facing work, ensure resolved or inferable context appears in the relevant Spec sections:

- User flows and boundaries: entry, exit, back, cancel, retry.
- User-visible states: loading, empty, error, offline, slow-network, concurrent actions.
- Feature-specific accessibility, responsive layout, text-scale, and platform constraints.
- Error visibility, logging, recovery, external-service behavior, and security/config constraints.
- Source-of-truth state, side-effect boundaries, lifecycle cleanup, persistence, and Test Seams when they affect requirements or testing.

In `## Testing Strategy`:

- Capture whether TDD is expected for logic, state, services, or widget behavior.
- Capture whether critical Flutter journeys need widget or robot journey coverage.
- Capture the expected unit/widget/robot split when known or inferable.
- Require stable selectors and deterministic seams only when robot or journey tests are in scope.
- Prefer fakes and Test Seams over real network calls or API keys in automated tests unless explicitly approved.
