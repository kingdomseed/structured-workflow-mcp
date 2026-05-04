# Structured Workflow V0

Date: 2026-05-04

## Purpose

Structured Workflow is a file-backed collaboration protocol for AI-assisted programming work.

The system organizes work through durable artifacts, explicit routing, review gates, and verification evidence.

## Core Rule

```text
One active steering artifact per phase.
```

The active artifact is the document the model should follow for the current phase. Other artifacts stay linked as supporting context.

## Workspace

```text
.ai-workflow/
  workflow.md
  discovery.md
  reviews/
  specs/
  plans/
  evidence/
```

## Opening Gate

```text
Setup Workspace
-> Create/Restore workflow.md
-> Explore & Understand
-> discovery.md
-> Discovery Review
-> Lane Selection
```

The opening gate creates durable context before choosing a lane.

## Artifact Roles

| Artifact | Role |
| --- | --- |
| `workflow.md` | Control surface: phase, lane, gates, active artifact, artifact links, routing decision. |
| `discovery.md` | Exploration surface: evidence, clarifying questions, answers, assumptions, candidate lanes, routing rationale. |
| `specs/<name>-spec.md` | Intent surface: approved user intent, requirements, boundaries, validation expectations. |
| `plans/<name>-implementation-plan.md` | Execution surface: approved tasks, sequence, risks, verification commands. |
| `reviews/<artifact>-review.md` | Review surface: adversarial critique of a steering artifact. |
| `evidence/<name>-evidence.md` | Proof surface: validation output and completion evidence. |

## Lane Selection

Lanes:

- Brainstorm
- Fix
- Improve
- Test
- Plan
- Build
- Review
- Maintain
- Resume

Lane selection is recorded in `workflow.md` and justified in `discovery.md`.

## Universal Review Gate

Every steering artifact receives adversarial review before downstream use.

Steering artifacts include:

- discovery notes
- specs
- implementation plans
- research findings
- audit and inventory documents
- diagnosis notes
- test plans
- migration plans
- review findings
- completion evidence

Review output uses:

- Critical: blocks downstream use
- Important: likely to cause rework or bad decisions
- Minor: worth improving
- Strengths
- Recommended changes

## Lane Summaries

### Brainstorm

Use when the desired outcome is not clear enough to plan.

Sequence:

```text
explore context -> interview -> compare approaches -> approve direction -> draft spec -> self-review -> artifact review -> domain review -> resolution
```

### Fix

Use when something is broken or urgent.

Sequence:

```text
verify symptom -> assess impact -> inspect relevant code -> identify root cause -> diagnosis review -> determine fix -> plan validation -> build -> verify
```

### Improve

Use when structure, quality, maintainability, or architecture should improve while behavior stays stable.

Sequence:

```text
audit -> inventory -> inventory review -> compare approaches -> determine safe plan -> build -> verify behavior preserved
```

### Test

Use when the primary work is verification coverage or test quality.

Sequence:

```text
inventory behavior -> inspect coverage -> identify critical paths -> coverage review -> plan test slices -> write tests -> run -> iterate
```

### Plan

Use when there is a reviewed steering artifact ready to become an implementation plan.

Examples:

- reviewed spec
- reviewed discovery
- reviewed diagnosis
- reviewed maintenance findings
- reviewed coverage findings

Sequence:

```text
load reviewed artifact -> retrieve current docs -> inspect codebase -> call experts -> review research -> draft plan -> self-review -> plan review -> resolution
```

### Build

Use when there is an approved implementation plan.

Sequence:

```text
confirm plan -> execute slice -> verify -> implementation review -> reconcile artifacts -> continue or escalate
```

### Review

Use when the task is critique, PR feedback, code review, plan review, spec review, or review-of-review.

Sequence:

```text
read artifact -> gather evidence -> produce severity-ranked findings -> review findings and severity -> recommend changes -> resolve
```

### Maintain

Use for dependency, SDK, tooling, license, security, migration, or project hygiene work.

Sequence:

```text
inventory current state -> retrieve current docs/releases -> assess compatibility -> maintenance review -> plan migration -> build -> verify
```

### Resume

Use when prior work exists.

Sequence:

```text
restore workflow.md -> read active artifact -> inspect working tree -> reconcile artifacts -> review restored state -> identify next gate
```

## Completion

Completion requires verification evidence.

For non-trivial work, completion evidence is reviewed before final presentation.

Final presentation should include:

- what changed
- where it changed
- evidence
- remaining risk
- excluded or deferred work
- updated artifacts
- suggested next gate
