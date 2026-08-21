---
name: start-create-solution
description: Use to enter, resume, or revisit Create Solution when approved work must be planned, built, verified, or reconciled.
---

# Start create solution

## Start with the tracker

Open and update `workflow-tracker.md` before other work. Record Criterion C, the current criterion and ticket, the question that brought the work here, the authoritative Spec and creating-solution document, the target artifact, and the likely next move.

Read `AGENTS.md`, the approved Spec and its planning artifacts, `GLOSSARY.md`, the creating-solution template and document, the relevant project instructions, and the issue-tracker guidance.

## Use the C1-C4 structure

Criterion C has four criterion skills:

1. **C1 — Construct a logical plan:** `$construct-a-logical-plan`
2. **C2 — Demonstrate technical skills:** `$demonstrate-technical-skills`
3. **C3 — Follow the plan to create the solution:** `$follow-the-plan-to-create-the-solution`
4. **C4 — Justify changes to the design:** `$justify-changes-to-the-design`

Start new Criterion C work with C1. Use C2 while C3 creates the solution. Technical skill is demonstrated through the work and its evidence. Do not treat C2 as a separate step before creation. Use C4 whenever evidence requires a meaningful departure from the approved design.

The Spec and B4 planning artifacts define the chosen solution and its technical decisions. C1 converts them into an executable order and implementation tickets. If C1 or creation exposes a missing design choice, move to B3 or B4 rather than deciding it silently inside Criterion C.

Keep the human informed when new evidence changes the work. A build discovery can send the work to any criterion or phase that owns the new question. Apply the movement rules in `AGENTS.md` and keep the tracker current.

## Plan for independent execution

Use C1 to trace every Spec requirement into a ticket that can be reviewed and verified independently. Prefer complete, end-to-end slices that carry their own verification. Name dependencies, interfaces, acceptance criteria, relevant project context, and the technical skills or supporting skills the implementer must use.

Draft and review the complete breakdown before publishing tickets. Use `$start-evaluate` with D1 and D2 to judge coverage, slice completeness, ticket size, sequencing, verifiability, and project alignment. Publish only the human-approved breakdown.

## Create the intended solution

Use C2 and C3 together for each ticket. Load only the project guidance and technique skills relevant to that ticket. Implement the approved final form. Treat a staged or partial delivery as scope only when the human approved it in the Spec or later change decision.

Work through one verifiable slice at a time. Keep tests and implementation together. Run focused verification during the work and the complete project verification required before the solution is presented as complete.

Reuse the subagent permission recorded under `AGENTS.md`. Give each implementer a bounded ticket, the exact authoritative artifacts, relevant project context, constraints, and expected evidence. Keep the main agent responsible for inspecting changes, resolving conflicts, running independent verification, and reconciling the tracker.

Preserve unrelated work. Keep the diff traceable to the approved tickets. Record meaningful departures through C4 while the reason and evidence are fresh.

## Complete Criterion C

Criterion C is complete when every approved requirement maps to completed work, every ticket's acceptance criteria have fresh evidence, the solution passes its required project checks, the tracker matches reality, and every meaningful design change is justified and reflected in the authoritative artifacts.

Recommend `$start-evaluate` for the full Criterion D evaluation against the design specifications, project Definition of Done, and justified need.
