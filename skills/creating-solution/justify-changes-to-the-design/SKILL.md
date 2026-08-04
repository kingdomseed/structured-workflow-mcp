---
name: justify-changes-to-the-design
description: Establish Criterion C4 by recording and justifying meaningful changes discovered while creating the solution, then updating the artifacts that own the affected decision. Use when implementation evidence requires a departure from the Spec, chosen design, plan, or ticket.
---

# Justify Changes to the Design

Update `workflow-tracker.md` to C4 before changing the approved direction. Read the active ticket, Spec, chosen-design justification, C1 plan, C2 and C3 evidence, current creating-solution document, `GLOSSARY.md`, and the evidence that exposed the need for change.

## Locate the owning decision

Classify the discovery before acting:

- Update C1 when ticket boundaries, dependencies, resources, or sequence must change without changing the chosen design.
- Return to B3 or B4 when the solution's shape, interface, contract, behavior, scope, or testing decision must change.
- Return to Criterion A when the discovery changes the justified need, research answer, prior-art understanding, or Design Brief.
- Return an evaluation finding to the criterion that owns the failed artifact.

Follow the movement rules in `AGENTS.md`. Obtain human approval when the change affects their intent, scope, trade-offs, user experience, risk, or chosen design.

## Justify the change

Record the change while the evidence is fresh. Include:

- what the approved design or plan said;
- what implementation evidence was discovered;
- why the original direction could not or should not be followed;
- alternatives considered;
- the chosen change and human decision where required;
- affected design specifications, contracts, tickets, tests, and planning artifacts;
- consequences, residual risk, and confidence;
- links to the relevant evidence, changes, and verification.

Use the smallest change that resolves the evidence while preserving the approved need and quality. A later explanation cannot turn silent drift into a justified decision; update the owning artifact before dependent work relies on the change whenever possible.

## Reconcile the workflow

Update the Spec, planning artifacts, tickets, tests, and coverage map that the change affects. Keep historical reasoning in the C4 record while making the current authoritative direction clear.

Write the **C4 — Justify changes to the design** section of the creating-solution document. Update `workflow-tracker.md` with the destination, decision, affected artifacts, and next useful move.

C4 is complete when the evidence, decision, consequences, and updated sources of truth agree, and dependent implementation can proceed without relying on the superseded design.
