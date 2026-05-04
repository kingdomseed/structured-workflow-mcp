# Structured Workflow

Structured Workflow is a draft collaboration protocol for human-AI programming work.

It is no longer centered on the original MCP server. The current direction is a file-backed workflow system with reusable templates, phase-specific artifacts, adversarial review gates, and optional helper tooling.

## Core Model

```text
Setup Workspace
-> workflow.md
-> discovery.md
-> Discovery Review
-> Lane Selection
-> Lane Workflow
```

The workflow uses one control surface and one active steering artifact per phase.

| Surface | Default file | Role |
| --- | --- | --- |
| Workflow control | `workflow.md` | Phase, lane, gates, active artifact, artifact links, routing decision. |
| Discovery | `discovery.md` | Exploration evidence, clarifying questions, answers, assumptions, open questions, candidate lanes, routing rationale. |
| Intent | `specs/<name>-spec.md` | Approved user intent, requirements, boundaries, and validation expectations. |
| Execution | `plans/<name>-implementation-plan.md` | Approved implementation steps and verification commands. |
| Review | `reviews/<artifact>-review.md` | Adversarial critique of any steering artifact. |
| Evidence | `evidence/<name>-evidence.md` | Verification and completion evidence. |

## Starting Workspace

```text
.ai-workflow/
  workflow.md
  discovery.md
  reviews/
  specs/
  plans/
  evidence/
```

`workflow.md` tracks routing, phase gates, active artifacts, and links. It is not the implementation plan.

`discovery.md` captures the first Explore & Understand gate. It is not the spec.

## Lanes

- Brainstorm
- Fix
- Improve
- Test
- Plan
- Build
- Review
- Maintain
- Resume

Every non-trivial lane starts from reviewed discovery and every steering artifact receives adversarial review before downstream use.

```text
One agent's confident artifact is not trustworthy by itself.
```

## Repository Contents

- `docs/design/structured-workflow-v0.md` - current draft workflow design.
- `templates/` - reusable workflow artifacts.
- `templates/reviews/` - adversarial review templates.
- `skills/structured-workflow/SKILL.md` - first Codex skill draft.

## Research Corpus

The raw research corpus is local-only and ignored from this scaffold branch. Curated design decisions should move into `docs/design/` or templates before they are committed.
