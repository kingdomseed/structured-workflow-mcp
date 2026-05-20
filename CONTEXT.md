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
A reusable unit of workflow behavior that can appear as a workflow, side flow, skill, subagent packet, hook, command, or tool.
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

**File-Backed Discovery**:
The practice of recording findings, questions, answers, evidence, and decisions in workflow files so durable documents carry context instead of relying on the model's context window.
_Avoid_: Discovery as a separate required phase, chat transcript as the only memory

**Workflow**:
A top-level route named after the kind of work being performed.
_Avoid_: Abstract delivery labels, generic task buckets, side flow

**Workflow Selection**:
The routing decision made after Collaborative Modeling has clarified what kind of work is actually being done and what context the model needs next.
_Avoid_: Preselecting a workflow before the shared design concept is understood

**Workflow Skill**:
A skill loaded for a specific workflow that guides how the shared artifact spine should be used for that kind of work.
_Avoid_: Separate artifact model for every workflow, vague workflow emphasis section

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

**End-to-End System Build**:
The effort to build the complete Structured Workflow system one component at a time without reducing the target to a minimal or partial package.
_Avoid_: MVP as scope reduction, weird piecemeal subset, stopping after a few starter skills

**Autonomous Loop**:
The repeated implementation cycle where the agent builds a vertical slice, validates it, runs review agents, fixes findings, publishes work, handles PR feedback, and repeats until the work is merge-ready.
_Avoid_: One-pass build task, tests-pass-and-stop

**Round Trip Skill System**:
The existing VGV-style skill loop that can build a slice, run review rounds, apply fixes, commit, push, open a PR, and respond to PR feedback until the work is merge-ready.
_Avoid_: Treating round trip execution as unproven, replacing proven VGV-style loops before integrating them

**Slice Loop**:
The per-vertical-slice cycle of writing the failing proof, making the smallest passing change, refactoring, validating, reviewing, fixing, recording evidence, and optionally committing the slice.
_Avoid_: Large batch implementation, skipping review until the end, treating a slice commit as PR-ready

**Near-PR Hardening Loop**:
The final local review cycle before opening a PR, usually using multiple VGV-style review rounds to catch integration, simplicity, architecture, test, and PR-readiness issues after slices have accumulated.
_Avoid_: Treating completed slices as PR-ready without final review pressure

**Single PR Boundary**:
The default delivery boundary where independently committed slices are reviewed together in one coherent PR unless a Plan Split explicitly creates multiple PRs.
_Avoid_: One PR per slice by default, opening PRs before near-PR hardening

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
_Avoid_: Subflow, review perspective

**Review Side Flow**:
A side flow that reviews an artifact, code change, plan, PR, or evidence surface from one focused review angle and returns a written report.
_Avoid_: Review perspective

**PRD Review Side Flow**:
A review side flow that determines whether a PRD is trustworthy enough to feed implementation planning.
_Avoid_: PRD review status inside the PRD, stale PRD after accepted findings

**Visual Companion**:
A side capability for showing mockups, diagrams, spatial relationships, or side-by-side visual options during Collaborative Modeling.
_Avoid_: Default mode for every UI question, PRD section, replacement for verbal decisions

**Review Agent**:
A focused subagent that runs a review side flow over a bounded scope and returns a written report to the orchestrator.
_Avoid_: General-purpose helper agent, agent with full conversation history

**Core Review Agent**:
A review agent used by the ordinary software workflow because it checks plan alignment, scope, simplicity, testability, architecture, PRD compliance, or implementation quality.
_Avoid_: Stack-specific specialist, optional reviewer chosen only because a package or domain appears

**Required Review Agent**:
A review agent that a workflow must run because the workflow is not trustworthy without that review.
_Avoid_: Treating always-on quality gates as optional stack/risk selections

**Domain Review Agent**:
A review agent selected because the work touches a specific stack, framework, package, architectural pattern, product surface, or risk domain.
_Avoid_: Running every available specialist on every plan, treating stack-specific expertise as generic review

**Plan Review Side Flow**:
A review side flow that determines whether an implementation plan is ready for autonomous or HITL execution.
_Avoid_: Plan approval without research artifacts, PRD alignment, vertical slices, TDD readiness, or stack-specific review where needed

**PRD**:
The post-modeling product requirements artifact that records the user-facing problem, solution, user stories, implementation decisions, testing decisions, scope boundaries, and notes.
_Avoid_: Spec as the default name, shared-design document as a synonym

**Vertical Slice**:
A thin vertical implementation unit that cuts through the necessary layers end to end and can be verified on its own.
_Avoid_: Horizontal layer task, broad phase task, tracer-bullet slice as canonical term

**Plan Split**:
The act of dividing an implementation plan into smaller independently reviewable plan artifacts or issue slices when the original plan is too large for one autonomous loop, PR, or review.
_Avoid_: Dedicated slice artifacts by default, splitting before size/risk requires it

**AFK**:
Away from keyboard; a vertical slice or workflow segment that is ready for autonomous agent execution end to end after Collaborative Modeling, PRD, and planning are complete.
_Avoid_: Unreviewed autonomy, autonomous work before shared understanding

**HITL**:
Human in the loop; a vertical slice, side flow, or workflow segment that must pause for human judgment, approval, product decision, architecture decision, visual choice, credential/access step, or other non-autonomous input.
_Avoid_: Treating every pause as failure, pretending human judgment can always be automated

**Autonomy Intent**:
The user's up-front expectation for whether a plan should be entirely AFK or may include HITL gates.
_Avoid_: Discovering human gates only after autonomous implementation begins

**Docs Research Agent**:
A focused subagent that retrieves current official documentation, version constraints, migration notes, and API usage guidance for the language, framework, SDK, package, platform, test, or lint decisions a plan depends on.
_Avoid_: Planner relying on training data, unofficial web best-practices research, blogs as authority

**Codebase Research Agent**:
A focused subagent that inspects the local project structure, conventions, reference implementations, and existing architecture patterns a plan must follow.
_Avoid_: Planning from generic framework knowledge without local code evidence, unlabeled inference as fact

**Research Artifact**:
A separate written report produced by a research agent, stored under the workflow workspace, and linked from the plan it supports.
_Avoid_: Inline-only research summary as the source of planning truth

**Research Acceptance**:
The gate where research artifacts are judged trustworthy enough to feed planning.
_Avoid_: Planner silently treating every research report as accepted

**Domain Line**:
An opinionated stack-specific expression of Structured Workflow for a particular development context.
_Avoid_: Fork, separate product

**Autonomous Flutter**:
The Flutter domain line for Structured Workflow.
_Avoid_: Structured Workflow as a whole

**Project Profile**:
A repo-specific description of the Flutter architecture, state management, testing contract, generated-code policy, validation boundaries, and local conventions Structured Workflow must follow.
_Avoid_: One global Flutter architecture for every repo

**BLoC Profile**:
A Project Profile for Flutter repos that use Bloc or Cubit, drawing primarily from Very Good Ventures' Bloc engineering conventions.
_Avoid_: Generic Flutter state-management advice, Riverpod assumptions

**Riverpod Profile**:
A Project Profile for Flutter repos that use Riverpod, initially informed by the user's Mythic GME architecture, testing, and error-handling guides.
_Avoid_: Treating Mythic-specific choices as universal Flutter rules

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
- **File-Backed Discovery** applies across all workflow phases rather than
  living in a separate `discovery.md` phase.
- **Collaborative Modeling** is the shared entry point for Structured Workflow.
- **Workflow Selection** happens after **Collaborative Modeling** has clarified
  what the model is working on and what context it needs.
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
- The successor work is an **End-to-End System Build**: components can be built
  sequentially, but the intended scope remains the complete Structured Workflow
  system.
- **Feature Workflow** and **Refactor Workflow** use an **Autonomous Loop** after
  collaborative modeling, PRD, and planning make the work buildable.
- **Autonomous Loop** work uses **Test-Driven Development**.
- **Round Trip Skill System** is evidence that the VGV-style autonomous loop
  execution shape works and should be integrated rather than treated as
  speculative.
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
- **Autonomous Flutter** uses **Project Profile** detection rather than a single
  state-management identity.
- **BLoC Profile** and **Riverpod Profile** are **Project Profile** variants.
- A **Project Profile** is loaded after **Context**, relevant ADRs, PRD, and
  implementation-plan context so stack guidance is applied inside the shared
  model rather than replacing it.
- **BLoC Profile** guidance must translate example event, state, repository,
  and widget names into the current **Ubiquitous Language** before planning or
  implementation.
- **Riverpod Profile** guidance must be calibrated to the repo's risk posture,
  ADRs, coverage contract, generated-provider policy, and real-system testing
  boundary before implementation.

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
- "Subflow" was used ambiguously; resolved: use **Side Flow** for focused workflows, including review side flows inside gates.
- "Review perspective" was unclear; resolved: a review perspective is just a review side flow.
- "Capability" can be confused with skill; resolved: **Capability** is the behavior, while skills, side flows, hooks, commands, and tools are execution shapes.
- "Autonomous Delivery Workflow" was too abstract; resolved: name workflows after the work, such as **Feature Workflow**, **Refactor Workflow**, and **Diagnostic Workflow**.
- "Minimal first executable package" can imply shrinking the goal to a small
  starter subset; resolved: the work is an **End-to-End System Build** built
  one component at a time.
- "Workflow Entry Point", "Setup Workspace", "Restore/Create Context", and
  "Explore & Understand" appeared in scaffold diagrams/templates before they
  were defined through shared understanding; resolved: **Collaborative
  Modeling** is the entry point, **Workflow Selection** follows it, and those
  scaffold labels disappear unless a concrete later need earns them back.
- "`discovery.md`" as a named pre-phase disappeared, but **File-Backed
  Discovery** remains a cross-phase practice inherited from Planning with
  Files.
