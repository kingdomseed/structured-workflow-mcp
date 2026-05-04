---
name: structured-workflow
description: Use for non-trivial AI-assisted programming work that needs durable context, lane selection, reviewed artifacts, implementation planning, or verification evidence.
---

# Structured Workflow

Use the Structured Workflow protocol for non-trivial programming work.

## Opening Gate

1. Set up the workflow workspace.
2. Create or restore `workflow.md`.
3. Create or restore `discovery.md`.
4. Explore and understand the request.
5. Review `discovery.md`.
6. Select a lane.

Default workspace:

```text
.ai-workflow/
  workflow.md
  discovery.md
  reviews/
  specs/
  plans/
  evidence/
```

Use templates from this repository's `templates/` directory.

## Artifact Authority

Only one artifact steers the current phase.

- `workflow.md` controls phase, lane, gates, and artifact links.
- `discovery.md` records exploration and routing evidence.
- `specs/` records intent.
- `plans/` records execution.
- `reviews/` records adversarial critique.
- `evidence/` records proof.

## Review Gate

Every steering artifact is reviewed before downstream use.

Review:

- what the artifact missed
- what it overclaimed
- weak or missing evidence
- hidden assumptions
- likely downstream failure
- required corrections

## Lanes

- Brainstorm: clarify intent and produce a spec.
- Fix: diagnose and repair a bug or failure.
- Improve: refactor or improve structure while preserving behavior.
- Test: improve verification coverage or quality.
- Plan: turn a reviewed steering artifact into an implementation plan.
- Build: execute an approved implementation plan.
- Review: critique artifacts, code, plans, or findings.
- Maintain: handle upgrades, dependencies, tooling, security, or migrations.
- Resume: restore prior workflow state and continue from the next gate.

## Completion

Completion requires evidence.

For non-trivial work, review completion evidence before final presentation.
