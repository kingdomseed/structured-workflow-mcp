---
name: act-refine-spec-flutter
description: Review a Spec for Flutter/Dart codebase alignment, UX gaps, testing seams, and invalid platform assumptions.
argument-hint: "[Spec reference]"
tools: [Skill]
---

Run `act-refine-spec` with the original arguments and the Flutter/Dart guidance below applied throughout the workflow.

The core skill is authoritative for review posture, finding priority, report shape, edit policy, stopping conditions, and output shape. Flutter/Dart guidance may enrich the review, not replace its priorities or finding requirements.

When the core skill recommends next workflow commands, recommend the `-flutter` variants instead.

Preserve exact resolved contracts. Flag any Spec wording that generalizes specified UI text, routes, commands, configuration values, data shapes, supported values, error behavior, or verification requirements.

### Flutter/Dart Guidance

Check Spec claims against Flutter/Dart project facts when they affect the proposed work:

- `pubspec.yaml`, SDK constraints, dependencies, platform support, and verification commands.
- State management, routing/navigation, service/repository, theming, logging, security/config, and test conventions.
- Existing Test Seams, fakes, robot patterns, stable selectors, and external-service policies.

For Flutter user-facing work, flag missing or vague feature-specific behavior for:

- Entry, exit, back, cancel, retry, and discoverability.
- Loading, empty, error, offline, slow-network, and concurrent-action states.
- Accessibility, responsive layout, text scale, and platform constraints.

For data/model specs, check that proposed models support the required UX, persistence, transformation, and error behavior.

For testing strategy, flag Flutter/Dart-specific risks: unclear unit/widget/robot split, missing Test Seams, real external-service dependencies, flaky async assumptions, missing risky-behavior regression coverage, and robot journeys without stable selectors or deterministic setup.
