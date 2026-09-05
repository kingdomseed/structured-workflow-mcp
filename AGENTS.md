# Structured Workflow

Structured Workflow is an evidence-producing design cycle for human-agent
collaboration. This repository contains the reusable workflow. Maintaining it
does not require initializing a consuming project or creating a project tracker.

## Running an initialized workflow

Use the consuming project's `workflow-tracker.md`, configured phase documents,
templates, and `GLOSSARY.md`. If the user requests a workflow and its required
files are missing, identify what is missing and offer initialization.

The tracker records the phase, criterion, current question, active document,
target artifact, and likely next move. Update it when the phase or criterion
changes. Phase documents own findings and reasoning; the issue tracker owns
implementation tickets. Keep each responsibility in its assigned place.

## Phase and criterion names

Use these names exactly in trackers, documents, tickets, and handoffs.

| Phase | Criteria |
| --- | --- |
| A — Inquire and Analyze | A1 — Explain and justify the need; A2 — Identify and prioritize research; A3 — Analyze prior art; A4 — Develop the Design Brief |
| B — Develop Ideas | B1 — Develop design specifications; B2 — Develop feasible ideas; B3 — Present and justify the chosen design; B4 — Develop planning drawings and diagrams |
| C — Create Solution | C1 — Construct a logical plan; C2 — Demonstrate technical skills; C3 — Follow the plan to create the solution; C4 — Justify changes to the design |
| D — Evaluate | D1 — Design testing methods; D2 — Evaluate the solution against the design specification; D3 — Explain how the solution could be improved; D4 — Explain the solution's impact |

The default direction is A through D. A and B follow criterion order. C1 turns
the approved Spec into an implementation plan and tickets. C2 records skilled
application during C3; it does not choose the technical approach. C4 handles
design changes. A full final evaluation covers D1 through D4.

## Movement and decisions

The sequence is a starting point, not a set of gates. Move to the criterion that
answers the current question. State the question, why the destination fits, and
what evidence, artifact, or decision the move should produce; update the tracker.
Return findings to the criterion that owns them. Evaluation is available
throughout the cycle.

Use the relevant phase entry point and criterion instructions when running that
part of the workflow. Do not read every phase before a small repository edit.

The human owns intent, priorities, and product/design judgment. The agent leads
retrieval, review, synthesis, and bounded execution. Continue approved work
through its agreed artifact and verification; do not stop at the first draft
unless review at that point was requested. Ask when a missing human decision
changes the direction, not for each reversible step within the approved work.

Ask once whether subagents may be used for bounded independent work. Reuse that
permission while it remains in scope; combine their findings and resolve conflicts
in the main collaboration.

## Evidence and durability

Cite material claims where they are recorded. Distinguish supported facts, human
judgments, inferences, and unknowns when the difference affects the work. Preserve
findings in the authoritative phase document as they settle.

Use the configured templates and exact criterion names. Resolve ambiguous terms
with the human and record the agreed meaning in the consuming project's glossary.
