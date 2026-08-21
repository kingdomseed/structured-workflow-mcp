---
name: develop-planning-drawings-and-diagrams
description: Use after a design is chosen, or when creation exposes missing or conflicting detail needed to complete the Spec.
---

# Develop planning drawings and diagrams

Update `workflow-tracker.md` to B4 before starting. Read the Design Brief, B1 specifications, B2 evidence, B3 chosen design, current developing-ideas document, project template, `GLOSSARY.md`, and the project sources that constrain the design.

## Make the design precise

Select the planning artifacts that make the chosen design precise. Use the form that best fits the work: annotated drawings, user flows, state machines, data-flow or sequence diagrams, domain models, schemas, interface contracts, API behavior, component relationships, interaction states, content structure, migration rules, or test seams.

Create only artifacts that carry a real decision or remove implementation guesswork. Keep each one accurate, internally consistent, and connected to the design specifications.

Describe what creation requires:

- behavior across normal, empty, loading, error, cancellation, retry, and recovery paths when relevant;
- interfaces, invariants, state transitions, data shapes, and error behavior;
- platform, accessibility, security, performance, compatibility, or migration constraints;
- existing project conventions and reusable modules;
- implementation decisions already settled by B3;
- testing decisions, observable seams, and evidence the finished solution must produce.

Keep the boundary with C1 clear. B4 defines the chosen solution and its creation requirements. C1 decides the executable ticket boundaries, dependency order, resources, and implementation sequence.

## Complete the Spec

Synthesize the settled work without restarting the interview. Use the configured template and the project's shared language.

Ensure the completed Spec contains or links to:

- the Design Brief and justified need;
- the chosen solution and user-visible behavior;
- B1 design specifications;
- user stories or flows where they clarify behavior;
- planning drawings, diagrams, models, and contracts;
- implementation and testing decisions;
- constraints and out-of-scope boundaries;
- non-blocking uncertainty and residual risk.

Describe the intended finished form. Preserve approved requirements unless the human chooses a staged scope. Keep source-backed claims cited and trace decisions to their evidence.

## Review and approve

Review the planning artifacts and Spec with the human for clarity, completeness, consistency, testability, codebase alignment, scope, and traceability. Use `$start-evaluate` with D1 and D2 when an independent review would improve trust. Return findings to B1, B2, B3, or B4 as appropriate.

Write the **B4 — Develop planning drawings and diagrams** section and finalize the Spec in the developing-ideas document.

B4 is complete when the human approves the Spec, its planning artifacts make the chosen design creatable, and no known design decision would force C1 to guess.

Update `workflow-tracker.md` and recommend `$start-create-solution` when implementation planning and ticket creation are the next useful work.
