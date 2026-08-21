---
name: start-evaluate
description: Use for the final evaluation of a solution or to review a Design Brief, Spec, plan, ticket set, prototype, or other intermediate artifact.
---

# Start evaluate

## Start with the tracker

Open and update `workflow-tracker.md` before other work. Record Criterion D, the artifact and exact state under evaluation, the question that brought the work here, the criteria source, the evaluation document, and the likely return destination.

Read `AGENTS.md`, the artifact, the phase document that owns it, its approved criteria, `GLOSSARY.md`, relevant project instructions, the project Definition of Done when applicable, and prior evaluation entries that bear on the current state.

## Follow the evaluation shape

Criterion D has four criterion skills:

1. **D1 — Design testing methods:** `$design-testing-methods`
2. **D2 — Evaluate the solution against the design specification:** `$evaluate-against-the-design-specification`
3. **D3 — Explain how the solution could be improved:** `$explain-how-the-solution-could-be-improved`
4. **D4 — Explain the solution's impact:** `$explain-the-solutions-impact`

For a finished solution, start with D1 and move through D2, D3, and D4. For an earlier artifact, use D1 and D2 to reach an evidence-backed verdict, then return findings to the criterion that owns the artifact. Use D3 when the verdict supports concrete improvements. Reserve the full D4 impact analysis for a solution that has been used or can otherwise produce credible impact evidence.

Evaluation can be entered from any phase. Use the movement rules in `AGENTS.md` when evidence changes the current question.

## Set the criteria before judging

Use the artifact's approved source of truth. A Design Brief is judged against inquiry evidence and its readiness criteria. A chosen design or Spec is judged against the Design Brief and design specifications. A plan and tickets are judged against the Spec. A finished solution is judged against the design specifications, tickets, justified changes, and project Definition of Done.

Report independent criteria separately so one result cannot hide another. For example, judge Spec coverage separately from project standards. Judge functional behavior separately from visual fidelity and accessibility.

Use D1 to choose methods that can generate evidence for each criterion. Reuse testing decisions and verification artifacts accumulated during B4, C1, C2, and C3. Add methods for uncovered criteria rather than assuming existing tests prove them.

## Require fresh evidence

Use D2 to run or inspect the complete method against the exact artifact state being judged. Read full outputs, inspect captured evidence, and record limits. A previous green result, an agent report, code inspection, or confidence statement does not prove the current state.

Reuse the subagent permission recorded under `AGENTS.md`. Give independent reviewers the artifact, criteria, fixed scope, evidence requirements, and a read-only reporting contract. Keep their contexts separate when the review lenses should remain independent. Verify their findings against the artifact and resolve conflicts in the main collaboration.

Report findings before changing the artifact. Return each accepted finding to its owning criterion. When the human asks to fix findings, update the tracker and move to the phase that owns the change.

## Record the evaluation

Append one entry to the configured evaluation document for each evaluated state. Record the artifact and version, criteria, methods, evidence, per-criterion results, overall verdict, evidence limits, improvements, return destination, and impact when D4 applies.

A solution is ready to ship only when every required design specification and Definition of Done criterion has passing evidence. Missing evidence remains unproven or blocked. It does not become a pass.

Update `workflow-tracker.md` with the verdict and the next useful direction.
