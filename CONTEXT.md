# Structured Workflow

Structured Workflow is the product language for this repository. It captures the
terms that should stay stable while the system is designed, implemented, and
adapted across agent runtimes.

## Language

**Structured Workflow**:
A file-backed AI collaboration system for collaborative modeling first, then autonomous implementation through explicit artifacts, gates, skills, subagents, hooks, reviews, and evidence.

**Domain-Driven Design**:
The Eric Evans software-design approach Structured Workflow draws from for collaborative modeling, ubiquitous language, bounded contexts, purposeful architecture, and behavior-centered implementation.

**Collaborative Modeling**:
The DDD-derived human and agent work of modeling the goal, domain language, architecture, decisions, scenarios, boundaries, and validation standards before implementation.

**Ubiquitous Language**:
The shared domain-specific vocabulary used consistently in conversation, artifacts, tests, code names, reviews, and agent reasoning.

**Context**:
A bounded domain-language surface recorded in `CONTEXT.md`.

**Shared Design Concept**:
The invisible working theory of what is being built that the human and agent must converge on before artifact creation or implementation.

**Context Map**:
A root `CONTEXT-MAP.md` that lists multiple contexts, links to their `CONTEXT.md` files, and records how the contexts relate.

**ADR**:
A tiny, sparse record of a durable architectural decision and why it was made.

**Capability**:
A reusable unit of workflow behavior that can appear as a workflow, side flow, skill, subagent packet, hook, command, or tool.

**Orchestrator**:
The main agent role that owns context, reconciles subagent reports, updates steering artifacts, and decides the next workflow move.

**Gate**:
A workflow checkpoint that decides whether an artifact or phase is trustworthy enough for downstream use.

**Steering Artifact**:
The active document that guides the current phase of work.

**Workflow**:
A top-level route named after the kind of work being performed.

**Workflow Skill**:
A skill loaded for a specific workflow that guides how the shared artifact spine should be used for that kind of work.

**Feature Workflow**:
The workflow for developing a new feature from collaborative modeling through PRD, planning, autonomous implementation, review, PR feedback, and merge-ready completion.

**Code Is Not Cheap**:
The premise that poor code is expensive because it makes future human and agent work harder to understand, validate, and change.

**Feedback Loop Speed Limit**:
The principle that implementation pace must be constrained by the rate at which tests, type checks, real runtime checks, and reviews can produce trustworthy feedback.

**Outrunning The Headlights**:
Moving faster than the available feedback can prove, causing the agent to build, fix, or refactor beyond what it actually knows.

**Feedback Loop**:
An agent-runnable signal that proves whether a behavior, bug, or performance condition is present.

**Test-Driven Development**:
The implementation discipline of writing one behavior test, making it pass through the public interface, and repeating in vertical slices.

**Deep Module**:
A module with a simple interface that hides meaningful implementation complexity behind a boundary that can be understood and tested from the outside.

**Shared Understanding**:
The achieved state where the human and agent can reason from the same model, language, architecture, scenarios, decisions, validation standards, and risks.

**Autonomous Implementation**:
The post-alignment phase where the agent executes approved software work independently inside the agreed design, architecture, validation, and review constraints.

**Autonomous Loop**:
The repeated implementation cycle where the agent builds a vertical slice, validates it, runs review agents, fixes findings, publishes work, handles PR feedback, and repeats until the work is merge-ready.

**Slice Loop**:
The per-vertical-slice cycle of writing the failing proof, making the smallest passing change, refactoring, validating, reviewing, fixing, recording evidence, and optionally committing the slice.

**Near-PR Hardening Loop**:
The final local review cycle before opening a PR, usually using multiple VGV-style review rounds to catch integration, simplicity, architecture, test, and PR-readiness issues after slices have accumulated.

**Single PR Boundary**:
The default delivery boundary where independently committed slices are reviewed together in one coherent PR unless a Plan Split explicitly creates multiple PRs.

**Refactor Workflow**:
The workflow for changing the structure of existing code while preserving behavior, from inventory and audit through an architecture-focused PRD, planning, autonomous implementation, review, PR feedback, and merge-ready completion.

**Diagnostic Workflow**:
A troubleshooting workflow for proving, reproducing, investigating, instrumenting, fixing, and regression-testing a bug or failure.

**Inventory**:
A descriptive record of the existing code, modules, interfaces, tests, docs, and constraints relevant to the work.

**Audit**:
An evaluative pass over an inventory that identifies risks, gaps, friction, or change candidates.

**Regression Evidence**:
Proof that a diagnosed bug or failure no longer reproduces and is protected by the best correct feedback loop available.

**Side Flow**:
A focused workflow that can be triggered directly without running the full Structured Workflow sequence from collaborative modeling through autonomous implementation.

**Review Side Flow**:
A side flow that reviews an artifact, code change, plan, PR, or evidence surface from one focused review angle and returns a written report.

**PRD Review Side Flow**:
A review side flow that determines whether a PRD is trustworthy enough to feed implementation planning.

**Visual Companion**:
A side capability for showing mockups, diagrams, spatial relationships, or side-by-side visual options during Collaborative Modeling.

**Review Agent**:
A focused subagent that runs a review side flow over a bounded scope and returns a written report to the orchestrator.

**Core Review Agent**:
A review agent used by the ordinary software workflow because it checks plan alignment, scope, simplicity, testability, architecture, PRD compliance, or implementation quality.

**Required Review Agent**:
A review agent that a workflow must run because the workflow is not trustworthy without that review.

**Domain Review Agent**:
A review agent selected because the work touches a specific stack, framework, package, architectural pattern, product surface, or risk domain.

**Plan Review Side Flow**:
A review side flow that determines whether an implementation plan is ready for autonomous or HITL execution.

**PRD**:
The post-modeling product requirements artifact that records the user-facing problem, solution, user stories, implementation decisions, testing decisions, scope boundaries, and notes.

**Vertical Slice**:
A thin vertical implementation unit that cuts through the necessary layers end to end and can be verified on its own.

**Plan Split**:
The act of dividing an implementation plan into smaller independently reviewable plan artifacts or issue slices when the original plan is too large for one autonomous loop, PR, or review.

**AFK**:
Away from keyboard; a vertical slice or workflow segment that is ready for autonomous agent execution end to end after Collaborative Modeling, PRD, and planning are complete.

**HITL**:
Human in the loop; a vertical slice, side flow, or workflow segment that must pause for human judgment, approval, product decision, architecture decision, visual choice, credential/access step, or other non-autonomous input.

**Autonomy Intent**:
The user's up-front expectation for whether a plan should be entirely AFK or may include HITL gates.

**Docs Research Agent**:
A focused subagent that retrieves current official documentation, version constraints, migration notes, and API usage guidance for the language, framework, SDK, package, platform, test, or lint decisions a plan depends on.

**Codebase Research Agent**:
A focused subagent that inspects the local project structure, conventions, reference implementations, and existing architecture patterns a plan must follow.

**Research Artifact**:
A separate written report produced by a research agent, stored under the workflow workspace, and linked from the plan it supports.

**Research Acceptance**:
The gate where research artifacts are judged trustworthy enough to feed planning.

**Domain Line**:
An opinionated stack-specific expression of Structured Workflow for a particular development context.

**Autonomous Flutter**:
The Flutter domain line for Structured Workflow.

## Relationships

- **Structured Workflow** uses **Collaborative Modeling** to reach **Shared Understanding** before allowing **Autonomous Implementation**.
- **Collaborative Modeling** is adapted from **Domain-Driven Design**.
- **Collaborative Modeling** is carried by **Ubiquitous Language**.
- **Ubiquitous Language** is recorded in one or more **Context** files.
- **Context** files are glossary-only.
- **Context Map** coordinates multiple **Context** files.
- **Collaborative Modeling** converges on a **Shared Design Concept**.
- **ADR** files record durable decisions that future agents should not
  relitigate casually.
- A **Capability** can take different execution shapes in different parts of
  the system.
- The **Orchestrator** owns reconciliation when **Review Agent** reports
  disagree.
- A **Gate** controls whether a **Steering Artifact** can be used downstream.
- **Feature Workflow**, **Refactor Workflow**, and **Diagnostic Workflow** are
  named for the work they do.
- A **Workflow Skill** changes the guidance for a workflow without changing the
  core artifact spine.
- **Collaborative Modeling** can be recorded in a **PRD** after the shared model is strong enough.
- A **PRD** can be decomposed into **Vertical Slice** work for **Autonomous Implementation**.
- A **Plan Split** happens only when the implementation plan is too large or
  risky to execute, review, or ship as one unit.
- **AFK** and **HITL** classify whether a vertical slice or side flow can run
  autonomously or must pause for human input.
- **AFK** work can enter the **Autonomous Loop** after Collaborative Modeling,
  PRD, and planning are complete.
- **HITL** work may still use agents heavily, but the loop contains explicit
  human gates.
- **Autonomy Intent** is recorded before planning, then each **Vertical Slice**
  is still labeled **AFK** or **HITL** individually.
- Software planning uses separate **Docs Research Agent** and **Codebase
  Research Agent** reports by default.
- The **Docs Research Agent** uses official documentation only. If official
  documentation does not cover an innovative or unusual approach, it reports the
  gap rather than filling it with unofficial web advice.
- The **Codebase Research Agent** is evidence-only: it cites current repo files,
  committed docs, and accepted local conventions; any inference must be labeled
  as inference.
- **Docs Research Agent** and **Codebase Research Agent** outputs are
  **Research Artifact** files, not inline-only plan summaries.
- **Research Artifact** files live under `.ai-workflow/research/<plan-slug>/`
  beside the workflow artifacts they support.
- `workflow.md` tracks active **Research Artifact** files and whether they are
  accepted for planning.
- Routine **Research Acceptance** can be handled by the **Orchestrator**.
- Research that changes product behavior, architecture direction, scope, or
  AFK/HITL classification becomes **HITL** and needs human approval.
- **Autonomous Implementation** depends on **Shared Understanding**.
- **Feature Workflow** and **Refactor Workflow** use an **Autonomous Loop** after
  collaborative modeling, PRD, and planning make the work buildable.
- **Autonomous Loop** work uses **Test-Driven Development**.
- The **Autonomous Loop** contains a **Slice Loop** for each approved vertical
  slice and a **Near-PR Hardening Loop** before opening a PR.
- A **Slice Loop** should not outrun its feedback: one proof, one smallest
  passing change, one refactor step, then validation and review.
- A **Near-PR Hardening Loop** is required because local slice success does not
  prove the accumulated branch is merge-ready.
- **Slice Loop** work can create independent commits as checkpoints.
- **Single PR Boundary** is the default: independently committed slices still
  open one coherent PR unless a **Plan Split** explicitly says otherwise.
- **Diagnostic Workflow** can be autonomous in parts, but it is separate from a
  normal **Feature Workflow** or **Refactor Workflow**.
- **Diagnostic Workflow** requires a **Feedback Loop** before a fix is trusted.
- **Regression Evidence** is required before a **Diagnostic Workflow** can claim
  the bug is fixed.
- **Inventory** precedes **Audit**.
- **Visual Companion** can support **Collaborative Modeling** when a decision is
  easier to make visually.
- **Side Flow** has named variants, such as **Review Side Flow**, triage side
  flow, diagnostic side flow, and architecture improvement side flow.
- A capability can exist as a directly triggered **Side Flow** or as a
  **Review Side Flow** inside a gate.
- A **PRD Review Side Flow** writes its own review artifact and updates
  `workflow.md`; it does not write status into the PRD.
- Accepted findings from a **PRD Review Side Flow** must be applied back to the
  PRD before planning uses it.
- A **Review Agent** runs a **Review Side Flow** and reports back to the
  **Orchestrator**.
- A **Plan Review Side Flow** can use both **Core Review Agent** and **Domain
  Review Agent** reports.
- Some **Core Review Agent** reports are **Required Review Agent** reports for a
  given workflow.
- **Core Review Agent** reports protect the general software workflow:
  alignment, buildability, scope, simplicity, TDD readiness, architecture, and
  code quality.
- **Feature Workflow** and **Refactor Workflow** always run a code simplicity
  review.
- **Refactor Workflow** always runs an architecture/deep-module review.
- **Feature Workflow** runs architecture/deep-module review when the work adds,
  changes, or depends on module seams, interfaces, architectural layers, or
  state-management boundaries.
- **Domain Review Agent** reports protect stack-specific or risk-specific
  work, such as Flutter, Bloc, Drift, accessibility, security, navigation,
  localization, user flows, or current official documentation.
- **Domain Review Agent** selection is evidence-based: the plan, PRD, codebase
  research, and docs research determine which specialists are needed.
- **Code Is Not Cheap** is why **Autonomous Implementation** must remain inside explicit architecture, validation, and review constraints.
- **Feedback Loop Speed Limit** constrains how fast **Autonomous Implementation** should move.
- **Outrunning The Headlights** is the failure mode **Feedback Loop Speed
  Limit** prevents.
- **Deep Module** boundaries make **Autonomous Implementation** safer to delegate and easier to review.
- **Autonomous Flutter** is a **Domain Line** of **Structured Workflow**.

## Example Dialogue

> **Developer:** "Can the agent run autonomously now?"
> **Domain expert:** "Only after **Collaborative Modeling** has produced enough **Shared Understanding** for **Autonomous Implementation**."
