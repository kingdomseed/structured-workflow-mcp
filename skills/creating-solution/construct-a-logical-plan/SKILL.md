---
name: construct-a-logical-plan
description: Establish Criterion C1 by translating an approved Spec into a logical, resource-aware implementation plan and human-approved tickets. Use when the chosen solution is ready to decompose, or when later discoveries require the implementation order or ticket boundaries to change.
---

# Construct a Logical Plan

Update `workflow-tracker.md` to C1 before starting. Read the approved Spec and planning artifacts, developing-ideas evidence needed to understand the design, creating-solution document and template, `GLOSSARY.md`, project instructions, issue-tracker guidance, and relevant code or project structure.

## Confirm the planning basis

Check that the Spec contains no blocking design decision. Bring an unresolved need to Criterion A and an unresolved solution-shape decision to Criterion B. Preserve non-blocking uncertainty as a named risk or ticket decision.

Inspect the actual project areas the plan will touch. Retrieve current interfaces, conventions, files, tests, commands, dependencies, and similar implementations. Prefer current project evidence over remembered patterns.

## Build the coverage map

Map every design specification, user-visible behavior, contract, constraint, testing decision, and approved planning artifact to one or more tickets. Record any requirement that is intentionally non-implementation work or already satisfied, with evidence.

Make gaps visible before creating tracker items. A plan is not complete when a requirement is merely mentioned; another agent must be able to point to the ticket and acceptance evidence that will satisfy it.

## Draw ticket boundaries

Create thin vertical slices that deliver a complete, independently verifiable path through the parts of the system they touch. Start with the thinnest end-to-end slice that proves the route through the solution, then add depth.

Right-size a ticket as the smallest unit that carries its own meaningful verification and can receive an independent review. Fold setup, scaffolding, documentation, and enabling refactors into the slice that needs them unless they create an independently valuable and verifiable result.

For each ticket, record:

- a clear outcome-focused title;
- what to create and the user-visible or system behavior it delivers;
- the Spec requirements and decisions it covers;
- required context, stable project locations, and relevant existing examples;
- interfaces it consumes and produces when other tickets depend on them;
- blockers and dependency order;
- acceptance criteria with an exact command or numbered manual method when known;
- technique skills, project guidance, or human judgment the work requires;
- whether the agent can execute it independently or needs human judgment, and why.

Avoid brittle implementation scripts in the ticket. Include precise code or type shapes only when they carry an approved design decision more accurately than prose. Preserve exact global constraints and user-visible contracts from the Spec.

## Review and publish

Present the numbered breakdown to the human. Ask whether ticket boundaries, dependencies, coverage, human involvement, and verification methods are right. Revise until approved.

Use `$start-evaluate` with D1 and D2 to review the draft plan when independent evidence would improve trust. Check coverage, verticality, granularity, sequencing, interface consistency, verifiability, project alignment, and unnecessary scope.

Write the **C1 — Construct a logical plan** section of the creating-solution document. After approval, publish the tickets in dependency order and store their references in the document and `workflow-tracker.md`.

C1 is complete when a peer or fresh agent can follow the plan without guessing, every Spec requirement is accounted for, and the human approves the published ticket set.
