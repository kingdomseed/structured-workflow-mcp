# Autonomous Flutter Workflow North Star

Date: 2026-05-20

## Purpose

This document sharpens the product direction for Structured Workflow.

The goal is autonomous implementation after shared understanding has been fully
developed through collaborative modeling.

The human should be able to work with an AI on architecture, design, goals,
product requirements, interfaces, modules, failure modes, and validation
standards. Once that shared understanding exists, the agent should be able to
fill in implementation details correctly inside the agreed architecture.

The autonomous part comes after the human and model have done the hard
collaborative modeling work of establishing intent, ubiquitous language,
architecture, constraints, scenarios, and review standards. The early phase is
not hands-off. It is where the human invests serious thought, design judgment,
and domain knowledge so that later agent work can proceed independently without
drifting from the intended system.

## Core Thesis

Autonomy is earned by collaborative modeling that produces shared
understanding.

The premise is that code is not cheap. Matt Pocock's framing is the sharpest
version of this idea: "Code is not cheap" and bad code is "the most expensive
it's ever been." Generated code still becomes part of the system humans and
agents must understand, test, change, and trust.

The system should not rush from a prompt into a plan. It should first help the
human and model develop the same design concept, the same ubiquitous language,
and the same architectural map.

The artifact records the shared design concept. It does not replace the shared
design concept.

## Core Operating Principles

### Code Is Not Cheap

Generated code is still code that must be understood, changed, tested, and
trusted. Structured Workflow rejects the idea that the agent can repeatedly
regenerate code while the human ignores the system design underneath it.

Poor code makes both humans and agents less effective. A good codebase
amplifies AI capability because the agent can navigate it, test it, and change
it without destroying the surrounding design.

### The Human Remains Strategic

The agent can become a strong tactical implementer only when the human has
helped establish the strategy. The human participates deeply in collaborative
modeling, interface design, architecture, scenarios, vocabulary, and validation
standards.

The autonomous phase begins after that work is explicit enough for the agent to
execute without constantly reinterpreting the goal.

### Feedback Sets The Pace

Agents tend to do too much before checking whether the work is correct.
Structured Workflow treats the rate of trustworthy feedback as the speed limit:
tests, type checks, static analysis, runtime inspection, review agents, and PR
feedback all constrain how quickly implementation can safely widen.

This is why TDD is mandatory in autonomous implementation. It is the mechanism
that keeps the agent from claiming behavior it has not proved.

### Interfaces Are The Delegation Boundary

The human and agent should design module boundaries and public interfaces
deliberately. Once an interface, validation surface, and failure policy are
clear, the agent can own more of the implementation behind that boundary.

This is why architecture improvement is part of the workflow, not a cleanup
activity after coding.

### Follow The Proven Artifact Spine

Structured Workflow should follow the Matt Pocock skill sequence as the baseline
for collaborative modeling:

```text
grill with docs
-> update CONTEXT.md or CONTEXT-MAP.md as language crystallizes
-> create sparse ADRs only for durable trade-off decisions
-> synthesize the PRD from the conversation and codebase understanding
-> decompose approved work into vertical tracer-bullet slices
-> let autonomous agents implement AFK-ready slices
```

Structured Workflow adds an explicit control surface, review gates, runtime
adapters, hooks, evidence capture, and domain lines around that spine. It should
not replace the spine with a parallel artifact model unless a specific pressure
test shows the baseline is insufficient.

### Capabilities Can Have Multiple Execution Shapes

Some capabilities are useful in more than one place.

Architecture improvement is the clearest example. The user can trigger it
directly as a side flow when they want to investigate or improve the codebase.
The autonomous loop can also invoke architecture improvement as a review
perspective through a focused review agent.

The same distinction can apply to diagnosis, triage, PR feedback handling, test
quality review, simplicity review, and architecture review. The capability is
the same family of judgment, but the execution shape changes:

- **Side Flow**: user-triggered, focused, may stand alone.
- **Review Perspective**: invoked inside a review gate, usually through a
  focused subagent report.

Visual exploration is another side capability. During Collaborative Modeling,
the agent can offer a Visual Companion when the decision is easier to make by
seeing mockups, diagrams, spatial relationships, or side-by-side options. This
is optional and per-question. It does not replace `grill-with-docs`, and it does
not become a PRD section.

### Workflows Are Named For The Work

The autonomous section should not be named with abstract labels such as
"autonomous delivery workflow." Structured Workflow should name workflows after
the work they perform.

The user's `vgv-pr-roundtrip` skill is the reference shape:

```text
select the next buildable slice
-> build it
-> run the required local review rounds
-> fix each review round before widening scope
-> commit and push
-> open a real PR
-> wait for checks and external review
-> address PR feedback thread-aware
-> reconcile docs and learnings
-> repeat until merge-ready
```

This loop belongs inside the **Feature Workflow** and **Refactor Workflow** once
collaborative modeling, PRD, and planning have made the work buildable.

Every autonomous implementation loop is test-driven. The agent should prove one
behavior through the public interface, implement the minimal code, validate it,
refactor while green, and then move to the next behavior. Local green tests are
not the end of the workflow, but no code change is trusted without the
appropriate feedback loop.

Diagnosis is different. A diagnostic workflow may be partly autonomous, but it
often needs interactive evidence intake, logs, reproduction steps,
instrumentation, and human judgment. It should not be treated as a routine
stage inside feature or refactor work, though those workflows may route into it
when validation reveals a failure.

Diagnostic work may start with collaborative modeling when the bug report is
ambiguous, domain-heavy, or architecture-sensitive. For narrow concrete bugs,
collaborative modeling can be a lighter optional gate. Either way, diagnosis
must build a trustworthy feedback loop before fixing. A fix is not accepted
until the original failure no longer reproduces and regression evidence proves
the claimed cause was the cause.

## Strategic Role Split

The human remains strategic.

The model becomes tactical only after the strategy is explicit enough to guide
implementation.

| Human and model together | Agent can later execute |
| --- | --- |
| Purpose and product goal | File-level implementation details |
| User-facing behavior | Boilerplate and mechanical code |
| Domain vocabulary | Repeated patterns |
| Architecture shape | Internal implementation behind stable interfaces |
| Module interfaces | Test scaffolding and incremental slices |
| Error and validation policy | Framework-specific implementation details |
| Review and acceptance standards | Routine validation and fix loops |

The aspiration is that the agent can "read my mind" because the shared context
has been made explicit enough for the agent to act from it.

## Foundation Ideas

### 1. Collaborative Modeling

The pre-implementation phase is collaborative modeling, explicitly adapted from
Domain-Driven Design, introduced by Eric Evans in _Domain-Driven Design:
Tackling Complexity in the Heart of Software_.

In traditional DDD, developers, domain experts, and stakeholders build a shared
model through a ubiquitous language. In Structured Workflow, the agent becomes
one of the collaborators. The model interviews the human, explores the codebase
when answers are already available there, walks the design tree one decision at
a time, tests concrete scenarios, sharpens vocabulary, and resolves
dependencies between decisions before producing a PRD or plan.

The key output is not only a document. The key output is shared understanding:
a model of the work that is precise enough to guide autonomous implementation.

This phase responds to the first AI failure mode: the agent did not do what the
human meant because the collaborators did not yet share the design concept.

The normal artifact path is:

```text
CONTEXT.md / CONTEXT-MAP.md
-> ADRs when needed
-> PRD
-> tracer-bullet slices
```

The PRD should be synthesized only after the conversation and codebase
understanding are strong enough. It should use the project's ubiquitous
language, respect ADRs, name the major modules and interfaces, and record
testing decisions without anchoring itself to brittle file paths.

### 2. Ubiquitous Language

The workflow needs a durable domain-language artifact.

For many projects this can be `CONTEXT.md`. For larger projects it can be a
`CONTEXT-MAP.md` that points to context-specific language files.

This language artifact should capture:

- canonical domain terms
- terms to avoid
- relationships between terms
- resolved ambiguities
- example dialogue that shows the language in use

It should remain glossary-only. Implementation decisions belong in PRDs,
durable trade-offs belong in ADRs, execution details belong in plans, and broad
architecture guidance belongs in architecture docs.

This is the bridge between human intention, code names, tests, PRDs, and agent
reasoning.

This responds to the second failure mode: the human and agent talk across each
other because they do not share stable terms.

### 3. Durable Decisions

Some decisions deserve ADRs.

ADRs should be created when a decision is hard to reverse, surprising without
context, and the result of a real trade-off.

Most decisions should stay in the active workflow artifact, PRD, or plan.
ADRs are for decisions future agents would otherwise undo or relitigate.

ADRs are supporting documents, not heavyweight steering artifacts. Reviews of
PRDs, plans, diagnoses, architecture changes, and implementation slices should
check whether relevant ADRs were read, respected, and flagged when a real
conflict appears.

### 4. Deep Modules And Interfaces

The workflow should push toward deep modules: simple interfaces with meaningful
implementation hidden behind them.

The agent should help the human design interfaces and module seams deliberately,
then handle implementation behind those interfaces.

For Flutter work, this means plans should name:

- feature boundaries
- layer responsibilities
- repository contracts
- Riverpod provider responsibilities
- UI/controller interfaces
- test seams
- generated-code responsibilities
- error and validation boundaries

The interface is the collaboration surface. Implementation can be delegated
only when the interface and validation surface are strong.

Deep modules also reduce cognitive load. The human can review the purpose,
interface, and evidence of a bounded area without needing to keep every
implementation detail in mind.

### 5. Feedback Loop Speed Limit

The rate of feedback is the speed limit.

For implementation, the workflow should prefer small vertical slices:

```text
one behavior -> one failing test -> minimal implementation -> passing test -> refactor -> next behavior
```

Agents should not batch broad horizontal layers and then validate at the end.

### 6. Real Validation

Completion claims require fresh evidence.

Testing should prove behavior through public interfaces. For Flutter work, this
often means:

- real domain and data behavior where possible
- real serialization cycles for persistence code
- repository tests that exercise real storage when practical
- widget tests for rendered states and interactions
- journey/integration tests for critical flows
- analyzer, formatter, generated-code, and test commands run at the correct
  gates

### 7. Error Handling As Architecture

Error handling is part of the design, not cleanup.

Flutter/Dart plans should distinguish:

- programming errors that should surface as bugs
- recoverable infrastructure exceptions
- user corrections that should be modeled as validation states
- privacy-safe observability and Sentry reporting
- stack preservation when transforming exceptions

Typed failure boundaries should be planned and reviewed phase by phase.

## Flutter Development Line

Structured Workflow should become general at the protocol level and opinionated
for Flutter at the domain-pack level.

The Flutter development line should synthesize:

- Matt Pocock-style shared design concept, ubiquitous language, deep modules,
  and TDD feedback loops
- Very Good Ventures architecture, review, and Flutter conventions
- ACT-style codebase research, documentation retrieval, expert subagents, and
  concise executable plans
- the user's Mythic GME architecture, testing, and error-handling guides as
  proof that this shape already solved real alignment problems in production

## Influences And Credit

Structured Workflow is not presented as a novel invention from nowhere. It is a
deliberate synthesis of strong ideas from existing agent workflows, skills, and
software-engineering practice.

Important influences include:

- Eric Evans' _Domain-Driven Design_, especially collaborative modeling,
  ubiquitous language, bounded contexts, context mapping, purposeful
  architecture, and behavior-centered implementation.
- Matt Pocock's skills and talk framing around shared design concept,
  ubiquitous language, deep modules, TDD feedback loops, and the idea that code
  quality matters more in the AI age:
  <https://www.youtube.com/watch?v=v4F1gFy-hqg>.
- `grill-with-docs`, which connects the interview process to durable language
  and decision artifacts.
- Very Good Ventures' Flutter and Wingspan workflows for architecture,
  planning, review, build, and PR readiness.
- Agentic Coding Toolkit ideas around structured planning, current
  documentation retrieval, and specialist subagents.
- Planning with Files' emphasis on durable file-backed working memory.
- Superpowers' emphasis on sticky workflow language, commands, hooks, and
  subagent-driven development.
- The user's Mythic GME architecture, testing, and error-handling guides, which
  show these ideas applied to a real production Flutter app.

The project can borrow, fork, and adapt ideas while keeping public
documentation in original language and preserving credit for the systems and
people that shaped it.

## Mythic GME Guide Learnings

The Mythic GME guides show the same pattern in a concrete Flutter app:

- `ARCHITECTURE_GUIDE.md` establishes layer boundaries, feature-first
  structure, Riverpod codegen, read/write split, no timing fixes, no UI-isolate
  file I/O, and no compatibility shims.
- `TESTING_GUIDE.md` establishes 100% coverage as a baseline, vertical-slice
  TDD enforcement for AI agents, real-system tests where they catch real bugs,
  mirrored test structure, and layer-specific test expectations.
- `ERROR_HANDLING.md` establishes the Error versus Exception distinction,
  typed exception boundaries, validation as non-error state, Sentry privacy
  rules, and stack-preserving exception transformation.

These are not just project docs. They are examples of the kind of shared
understanding Structured Workflow should help create before autonomous
implementation begins.

## Workflow Implications

### Opening Gate

The opening gate should restore or create:

- workflow control surface
- discovery notes
- domain language surface: root `CONTEXT.md`, or root `CONTEXT-MAP.md` with
  per-context `CONTEXT.md` files
- ADR index if needed
- active workflow and active artifact

For open-ended sessions, the default next move is a documented
shared-understanding interview. The model should use a `grill-with-docs` style:
read the current domain language and decisions, grill the user one decision
branch at a time, sharpen vocabulary as it goes, and update the relevant
language or decision artifacts when shared meaning crystallizes.

Plain grilling is the fallback only when there is no useful documentation
surface yet or the work is intentionally document-light. The default path should
connect the interview to ubiquitous language, ADRs, and existing project docs.

Concrete action sessions can route directly into the relevant workflow or side
flow. Examples include fixing a named bug, triaging a specific issue,
addressing PR feedback, running a review, or executing an already-approved
plan. These sessions may still ask focused clarifying questions, but they do
not require a full shared-design interview unless the task proves ambiguous.

### Collaborative Modeling

Collaborative Modeling should become:

```text
explore context
-> build or update shared language
-> grill the design concept
-> resolve decision branches
-> identify modules and interfaces
-> decide validation standards
-> write PRD
-> adversarial review
-> user approval
```

### Plan

Planning should start from the reviewed PRD and produce an executable
implementation plan that names:

- vertical slices
- module/interface changes
- domain terms
- ADR constraints
- current framework docs consulted
- Flutter architecture constraints
- TDD and validation gates
- review checkpoints

### Build

Build should execute one bounded slice at a time.

The agent should:

- follow the approved plan
- preserve the plan's truth
- run the feedback loop before widening scope
- keep error handling and testing local to each slice
- stop when the plan or interface is wrong

### Refactor

Refactor follows the same broad shape as feature work, but the PRD becomes
architecture-focused. It must inventory the existing code first, then audit what
needs to change, then define the target module/interface shape and behavior
preservation evidence.

Inventory and audit matter in feature work too, because new systems must connect
to existing systems. The difference is emphasis: feature work inventories the
integration surface, while refactor work inventories the structure being
changed.

### Diagnostic

Diagnostic work is its own workflow.

It may start with collaborative modeling when the report is ambiguous or the
domain model matters. It may skip the heavy version of collaborative modeling
when the bug is concrete and the next step is obvious.

The non-negotiable gate is the feedback loop:

```text
build feedback loop
-> reproduce the user-described failure
-> rank falsifiable hypotheses
-> instrument one hypothesis at a time
-> write regression proof at the correct seam
-> fix
-> prove original failure no longer reproduces
```

Structured Workflow does not accept a diagnostic fix that cannot prove the bug
it claimed to fix.

### Architecture Improvement

Architecture improvement should include architecture deepening.

The agent should look for shallow modules, weak seams, hard-to-test boundaries,
and places where the codebase makes both human and model reasoning harder.

### Review

Review should be multi-perspective when risk warrants it:

- PRD review
- plan technical review
- architecture review
- code simplicity review
- test quality review
- PR readiness review
- domain-language and ADR alignment review

Subagent reports are evidence, not truth. The orchestrator reconciles them.

## Product Direction

Structured Workflow can be understood as a Flutter-focused fork of the shared
design concept approach.

Its distinctive value is integration:

- file-backed workflow artifacts
- explicit phase gates
- adversarial review of every steering artifact
- domain language and ADR capture
- Flutter architecture packs
- current documentation retrieval
- specialized subagents
- hooks and commands that keep the model on track
- evidence-backed completion

The product should make autonomous implementation possible only after the model
and human have done the hard collaborative work of understanding what should be
built and what kind of codebase it belongs in.

## Open Reconciliation

The remaining design branches and grill queue are tracked in
`docs/design/reconciliation-and-grill-queue.md`.
