---
name: act-interview-flutter
description: Resolve intent, language, and constraints before writing a Spec, with added Flutter/Dart UX and testing considerations.
argument-hint: "[request, idea, source file, or empty]"
tools: [Skill]
---

Run `act-interview` with the original arguments and the Flutter/Dart guidance below applied throughout the workflow.

The core skill is authoritative for workflow order, question priority, glossary behavior, stopping conditions, and output shape. If core framing or terminology questions compete with Flutter/Dart implementation or testing questions, ask the core framing or terminology question first.

When the core skill recommends next workflow commands, recommend the `-flutter` variants instead.

Do not ask Flutter/Dart implementation, state-management, testing, or verification questions until shared language, user-facing intent, and durable terminology conflicts are resolved.

### Flutter/Dart Guidance

Use project docs and code conventions first. Ask only when the answer is missing, contradictory, or feature-specific and affects implementation, testing, or user-visible behavior:

- Navigation entry, exit, back, cancel, and retry behavior.
- Loading, empty, error, offline, slow-network, and concurrent-action states.
- Screenshot, mockup, prompt, data, and existing UI conflicts.
- Exact visible labels, copy, ordering, disabled states, locking, undo, confirmation, completion, reset, review, and persistence behavior.
- Out-of-scope affordances shown in screenshots, mockups, examples, or source material.
- State management, persistence, API/service boundaries, dependency constraints, and Test Seams.
- Expected unit/widget/robot coverage and whether external services must be faked.
- Accessibility, responsive layout, and text-scale expectations.
- Error visibility, logging, and recovery expectations for failed async or external-service work.
- Source-of-truth state, side-effect boundaries, and lifecycle cleanup for controllers, streams, timers, navigation effects, or persistence.
- Security/config constraints for API keys, tokens, environment files, and client-safe versus server-only secrets.
