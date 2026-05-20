# Structured Workflow

Structured Workflow is the product language for this repository. It captures the
terms that should stay stable while the system is designed, implemented, and
adapted across agent runtimes.

## Language

**Structured Workflow**:
A file-backed AI collaboration system for collaborative modeling first, then autonomous implementation through explicit artifacts, gates, skills, subagents, hooks, reviews, and evidence.
_Avoid_: Structured Workflow MCP, Autonomous Flutter Workflow as the top-level name

**Domain-Driven Design**:
The Eric Evans software-design approach Structured Workflow draws from for collaborative modeling, ubiquitous language, bounded contexts, purposeful architecture, and behavior-centered implementation.
_Avoid_: Treating collaborative modeling as an original Structured Workflow invention

**Collaborative Modeling**:
The DDD-derived human and agent work of modeling the goal, domain language, architecture, decisions, scenarios, boundaries, and validation standards before implementation.
_Avoid_: Casual brainstorming, prompt refinement, vibe check

**Ubiquitous Language**:
The shared domain-specific vocabulary used consistently in conversation, artifacts, tests, code names, reviews, and agent reasoning.
_Avoid_: Glossary as documentation-only, terminology list detached from code

**Context**:
A bounded domain-language surface recorded in `CONTEXT.md`.
_Avoid_: Chat-only vocabulary, implementation notes, scratchpad, planning artifact

**Shared Design Concept**:
The invisible working theory of what is being built that the human and agent must converge on before artifact creation or implementation.
_Avoid_: Markdown artifact as a substitute for the actual model

**Context Map**:
A root `CONTEXT-MAP.md` that lists multiple contexts, links to their `CONTEXT.md` files, and records how the contexts relate.
_Avoid_: One overloaded glossary for unrelated meanings

**ADR**:
A tiny, sparse record of a durable architectural decision and why it was made.
_Avoid_: Design document, planning artifact, required review artifact

**Capability**:
A reusable unit of workflow behavior that can appear as a workflow, side flow, review perspective, skill, subagent packet, hook, command, or tool.
_Avoid_: Skill as the only execution shape

**Orchestrator**:
The main agent role that owns context, reconciles subagent reports, updates steering artifacts, and decides the next workflow move.
_Avoid_: Passive coordinator, rubber-stamp aggregator

**Gate**:
A workflow checkpoint that decides whether an artifact or phase is trustworthy enough for downstream use.
_Avoid_: Checklist item with no blocking force

**Steering Artifact**:
The active document that guides the current phase of work.
_Avoid_: Supporting note, archived report, raw transcript

**Workflow**:
A top-level route named after the kind of work being performed.
_Avoid_: Abstract delivery labels, generic task buckets, side flow

**Feature Workflow**:
The workflow for developing a new feature from collaborative modeling through PRD, planning, autonomous implementation, review, PR feedback, and merge-ready completion.
_Avoid_: Generic delivery workflow, build-only workflow

**Code Is Not Cheap**:
The premise that poor code is expensive because it makes future human and agent work harder to understand, validate, and change.
_Avoid_: Specs-to-code as if generated code can be ignored

**Feedback Loop Speed Limit**:
The principle that implementation pace must be constrained by the rate at which tests, type checks, real runtime checks, and reviews can produce trustworthy feedback.
_Avoid_: Large code batches followed by delayed validation

**Outrunning The Headlights**:
Moving faster than the available feedback can prove, causing the agent to build, fix, or refactor beyond what it actually knows.
_Avoid_: Big-batch implementation, speculative confidence

**Feedback Loop**:
An agent-runnable signal that proves whether a behavior, bug, or performance condition is present.
_Avoid_: Reading code and guessing, vague manual confidence

**Test-Driven Development**:
The implementation discipline of writing one behavior test, making it pass through the public interface, and repeating in vertical slices.
_Avoid_: Writing all tests first, testing implementation details, fixing without a failing proof

**Deep Module**:
A module with a simple interface that hides meaningful implementation complexity behind a boundary that can be understood and tested from the outside.
_Avoid_: Shallow fragments that scatter related behavior across many weak boundaries

**Shared Understanding**:
The achieved state where the human and agent can reason from the same model, language, architecture, scenarios, decisions, validation standards, and risks.
_Avoid_: Agreement, approval, prompt, plan, spec as the whole shared context

**Autonomous Implementation**:
The post-alignment phase where the agent executes approved software work independently inside the agreed design, architecture, validation, and review constraints.
_Avoid_: Autonomous software engineering as if it begins at the first prompt

**Autonomous Loop**:
The repeated implementation cycle where the agent builds a tracer-bullet slice, validates it, runs review agents, fixes findings, publishes work, handles PR feedback, and repeats until the work is merge-ready.
_Avoid_: One-pass build task, tests-pass-and-stop

**Refactor Workflow**:
The workflow for changing the structure of existing code while preserving behavior, from inventory and audit through an architecture-focused PRD, planning, autonomous implementation, review, PR feedback, and merge-ready completion.
_Avoid_: Cleanup, drive-by improvement, feature workflow

**Diagnostic Workflow**:
A troubleshooting workflow for proving, reproducing, investigating, instrumenting, fixing, and regression-testing a bug or failure.
_Avoid_: Treating diagnosis as part of the normal feature or refactor path

**Inventory**:
A descriptive record of the existing code, modules, interfaces, tests, docs, and constraints relevant to the work.
_Avoid_: Evaluation before evidence

**Audit**:
An evaluative pass over an inventory that identifies risks, gaps, friction, or change candidates.
_Avoid_: Raw file list, ungrounded critique

**Regression Evidence**:
Proof that a diagnosed bug or failure no longer reproduces and is protected by the best correct feedback loop available.
_Avoid_: Fix based on hypothesis alone

**Side Flow**:
A focused workflow that can be triggered directly without running the full Structured Workflow sequence from collaborative modeling through autonomous implementation.
_Avoid_: Subflow

**Visual Companion**:
A side capability for showing mockups, diagrams, spatial relationships, or side-by-side visual options during Collaborative Modeling.
_Avoid_: Default mode for every UI question, PRD section, replacement for verbal decisions

**Review Perspective**:
A specific review lens used inside a review gate, often executed by a focused subagent that returns a written report.
_Avoid_: Generic review, full-context subagent

**Review Agent**:
A focused subagent that applies one review perspective to a bounded scope and returns a written report to the orchestrator.
_Avoid_: General-purpose helper agent, agent with full conversation history

**PRD**:
The post-modeling product requirements artifact that records the user-facing problem, solution, user stories, implementation decisions, testing decisions, scope boundaries, and notes.
_Avoid_: Spec as the default name, shared-design document as a synonym

**Tracer-Bullet Slice**:
A thin vertical implementation unit that cuts through the necessary layers end to end and can be verified on its own.
_Avoid_: Horizontal layer task, broad phase task

**Domain Line**:
An opinionated stack-specific expression of Structured Workflow for a particular development context.
_Avoid_: Fork, separate product

**Autonomous Flutter**:
The Flutter domain line for Structured Workflow.
_Avoid_: Structured Workflow as a whole

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
- **Collaborative Modeling** can be recorded in a **PRD** after the shared model is strong enough.
- A **PRD** can be decomposed into **Tracer-Bullet Slice** work for **Autonomous Implementation**.
- **Autonomous Implementation** depends on **Shared Understanding**.
- **Feature Workflow** and **Refactor Workflow** use an **Autonomous Loop** after
  collaborative modeling, PRD, and planning make the work buildable.
- **Autonomous Loop** work uses **Test-Driven Development**.
- **Diagnostic Workflow** can be autonomous in parts, but it is separate from a
  normal **Feature Workflow** or **Refactor Workflow**.
- **Diagnostic Workflow** requires a **Feedback Loop** before a fix is trusted.
- **Regression Evidence** is required before a **Diagnostic Workflow** can claim
  the bug is fixed.
- **Inventory** precedes **Audit**.
- **Visual Companion** can support **Collaborative Modeling** when a decision is
  easier to make visually.
- A capability can exist both as a **Side Flow** and as a **Review Perspective**.
- A **Review Agent** executes a **Review Perspective** and reports back to the
  orchestrator.
- **Code Is Not Cheap** is why **Autonomous Implementation** must remain inside explicit architecture, validation, and review constraints.
- **Feedback Loop Speed Limit** constrains how fast **Autonomous Implementation** should move.
- **Outrunning The Headlights** is the failure mode **Feedback Loop Speed
  Limit** prevents.
- **Deep Module** boundaries make **Autonomous Implementation** safer to delegate and easier to review.
- **Autonomous Flutter** is a **Domain Line** of **Structured Workflow**.

## Example Dialogue

> **Developer:** "Can the agent run autonomously now?"
> **Domain expert:** "Only after **Collaborative Modeling** has produced enough **Shared Understanding** for **Autonomous Implementation**."

## Flagged Ambiguities

- "Autonomous software engineering" can imply autonomy from the first prompt; resolved: autonomy belongs to **Autonomous Implementation** after **Shared Understanding**.
- "Autonomous Flutter Workflow" can sound like the whole product name; resolved: **Autonomous Flutter** is a **Domain Line** inside **Structured Workflow**.
- "Shared understanding" can sound like informal agreement; resolved: **Shared Understanding** is the outcome of **Collaborative Modeling** through **Ubiquitous Language**.
- "Collaborative modeling" can sound like original project branding; resolved: **Collaborative Modeling** is explicitly adapted from **Domain-Driven Design**.
- "Spec" can sound like the source of truth; resolved: a spec may record the **Shared Design Concept**, but it does not replace it.
- "`CONTEXT.md`" can become a planning scratchpad; resolved: **Context** files are glossary-only and implementation decisions belong in PRDs, ADRs, plans, or architecture docs.
- "Subflow" was used ambiguously; resolved: use **Side Flow** for directly triggered focused workflows and **Review Perspective** for focused lenses inside review gates.
- "Capability" can be confused with skill; resolved: **Capability** is the behavior, while skills, side flows, review perspectives, hooks, commands, and tools are execution shapes.
- "Autonomous Delivery Workflow" was too abstract; resolved: name workflows after the work, such as **Feature Workflow**, **Refactor Workflow**, and **Diagnostic Workflow**.
