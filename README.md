# Structured Workflow

Structured Workflow is a draft collaboration protocol for human-AI programming
work.

The current direction is a file-backed workflow system for collaborative
modeling first, then autonomous implementation after shared understanding is
strong enough to trust.

## Core Model

```text
Collaborative Modeling
-> Workflow Selection
-> Feature Workflow / Refactor Workflow / Diagnostic Workflow / Side Flow
```

The workflow uses one control surface and one active steering artifact per phase.
File-backed discovery applies across all phases: findings, questions, answers,
evidence, and decisions should be captured in the relevant workflow artifact
rather than kept only in the model's context window.

| Surface | Default file | Role |
| --- | --- | --- |
| Domain language | `CONTEXT.md` or `CONTEXT-MAP.md` | Canonical vocabulary and context relationships. |
| Workflow control | `workflow.md` | Phase, workflow, gates, active artifact, artifact links, routing decision. |
| Intent | `prds/<name>-prd.md` | Post-modeling intent artifact: problem, solution, user stories, implementation decisions, testing decisions, boundaries, and notes. |
| Execution | `plans/<name>-implementation-plan.md` | Approved implementation steps and verification commands. |
| Review | `reviews/<artifact>-review.md` | Adversarial critique of any steering artifact. |
| Evidence | `evidence/<name>-evidence.md` | Verification and completion evidence. |
| Profiles | `profiles/<domain>/<profile>/` | Domain-specific profile seeds and guidance. |

## Context Surface

At the repository root, Structured Workflow expects a domain-language surface:

```text
CONTEXT.md
```

For multi-context repos, use a root context map and per-context files:

```text
CONTEXT-MAP.md
src/<context>/CONTEXT.md
```

Even small repos should have a context surface. It may start small, but agents
need a canonical place to check and update the ubiquitous language.

`CONTEXT.md` is strict glossary-only: terms, avoid-list, relationships, example
dialogue, and flagged ambiguities. It is not a PRD, plan, scratchpad, or
architecture guide.

```text
.ai-workflow/
  workflow.md
  research/
  reviews/
  prds/
  plans/
  evidence/
```

`workflow.md` tracks routing, phase gates, active artifacts, research artifacts,
review status, and links. It is not the implementation plan.

`prds/` is the canonical name for post-modeling intent artifacts.

In ordinary software practice, PRDs, specs, brainstorm documents, and
shared-design notes overlap. Structured Workflow does not treat those words as
interchangeable. The system depends on ubiquitous language, so the chosen term
matters.

Structured Workflow uses PRD because this artifact is synthesized after
collaborative modeling and before implementation planning. It records the
problem, solution, user stories, implementation decisions, testing decisions,
boundaries, and notes. Technical specification details can live inside the PRD
when the work requires them.

Structured Workflow uses PRD as a record of shared understanding. The PRD
records the shared design concept; it does not replace it.

## Initial Workflows

- Feature Workflow
- Refactor Workflow
- Diagnostic Workflow

Feature and Refactor work start with Collaborative Modeling unless the work is
already backed by reviewed artifacts. Workflow Selection happens after
Collaborative Modeling has clarified what kind of work is actually being done
and what context the model needs. Diagnostic and side-flow work may use a
lighter Collaborative Modeling pass when the task is concrete, but the model
should still avoid loading unrelated workflow context up front.

Every steering artifact receives adversarial review before downstream use.

```text
One agent's confident artifact is not trustworthy by itself.
```

Feature and Refactor work use a test-driven autonomous loop after the PRD and
implementation plan have been reviewed. Vertical slices may be committed as
checkpoints, but the default delivery boundary is one coherent PR unless a Plan
Split explicitly creates multiple PRs.

Before a PR opens, the branch goes through a Near-PR Hardening Loop. For the
Flutter line, the current default is three VGV-style local review rounds unless
the user or workflow skill overrides that count.

## Active Documents

- `CONTEXT.md` - strict glossary and ubiquitous language.
- `docs/design/autonomous-flutter-workflow-north-star.md` - current north star.
- `docs/design/reconciliation-and-grill-queue.md` - open design branches and
  resolved decisions.
- `profiles/flutter/bloc/` - MIT-licensed VGV BLoC profile seed plus
  Structured Workflow integration notes.
- `profiles/flutter/riverpod/` - Mythic-informed high-rigor Riverpod profile
  seed plus Structured Workflow integration notes.
- `templates/` - reusable workflow artifacts.
- `templates/reviews/` - adversarial review templates.

## Research Corpus

The raw research corpus is local-only and ignored from this scaffold branch.
Curated design decisions should move into `docs/design/` or templates before
they are committed.
