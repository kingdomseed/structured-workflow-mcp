# Reconciliation And Grill Queue

Date: 2026-05-20

## Purpose

This document reconciles the current Structured Workflow design with the
autonomous Flutter north star and records the natural work items we have not
worked through yet.

It exists because the north star changed the center of gravity:

```text
shared understanding first -> autonomous implementation second
```

The workflow cannot safely move from prompt to plan just because it can write a
plan. It must first establish shared design concept, domain language,
architecture boundaries, interface shape, validation standards, and durable
decisions.

## Answer: Should We Use Grill-With-Docs?

Yes. For open-ended sessions, `grill-with-docs` should be the default
shared-understanding gate.

Use `grill-with-docs` when the user is shaping a plan, design, product
direction, architecture, workflow, research path, or other decision tree where
human judgment and model understanding need to converge.

Do not use it to ask questions the agent can answer by reading the repo,
current docs, or existing artifacts.

The important difference from plain `grill-me` is that the interview must be
anchored in durable language and decision artifacts. The model should read the
available `CONTEXT.md`, `CONTEXT-MAP.md`, ADRs, architecture docs, and active
workflow artifacts; challenge the user's wording against them; sharpen fuzzy or
overloaded terms; and update the language or decision artifacts when a term or
decision is resolved.

Plain `grill-me` is the fallback when there is no meaningful documentation
surface yet, or when the session is intentionally lightweight and not tied to a
domain model.

Concrete action sessions can skip the full grill gate and route directly to the
appropriate workflow or side flow. Examples include fixing a named bug,
triaging a specific issue, addressing PR feedback, reviewing a known artifact,
or executing an approved implementation plan. If those sessions uncover
unresolved design branches, route back into `grill-with-docs`.

The right sequence is:

```text
reconcile known evidence
-> identify unresolved decision branches
-> grill one branch at a time
-> update the authoritative artifact
-> review the artifact
```

For this project, `grill-with-docs` should become the method for resolving open
design branches, not the whole workflow.

## Reconciled Direction

Structured Workflow should be a portable collaboration protocol with a
Flutter-focused autonomous development line.

The protocol stays general:

- file-backed artifacts
- explicit gates
- one active steering artifact per phase
- adversarial review before downstream use
- evidence-backed completion
- runtime adapters instead of one runtime assumption

The Flutter line becomes opinionated:

- domain language and ADR awareness
- feature boundaries and layer responsibilities
- module/interface design
- Riverpod or BLoC project-profile detection
- generated-code policy
- vertical-slice TDD
- real validation boundaries
- typed error-handling policy
- specialized review perspectives

## Source Authority

When source systems disagree, default to Matt Pocock's skill design for
Collaborative Modeling, PRD, ADR, context, TDD, diagnosis, and architecture
improvement.

Do not treat the earlier Structured Workflow brainstorm/spec draft files as
authority. They were untested synthesis documents created for comparison. Keep
or delete them as private research artifacts, but do not use them to define the
successor workflow unless a specific idea is traced back to an original source
or validated in real use.

The useful mapping is:

- `grill-with-docs` absorbs most brainstorm/spec elicitation behavior.
- `to-prd` synthesizes the PRD after the conversation and codebase
  understanding are strong enough.
- Planning with Files contributes durable file-backed memory discipline across
  the whole system, not a PRD template.
- Superpowers' Visual Companion contributes an optional visual side capability
  during Collaborative Modeling.
- ACT and VGV contribute review and validation pressure, but their spec and
  brainstorm formats are not the baseline PRD shape.

## What We Know Now

### Collaborative Modeling Produces A PRD

The old Brainstorm label is too narrow if it means "write a spec." Structured
Workflow should use **Collaborative Modeling** for this phase.

It should mean:

```text
explore context
-> build or update shared language
-> grill unresolved design branches
-> identify modules and interfaces
-> decide validation and error policy
-> capture PRD
-> adversarial review
-> user approval
```

The PRD records the shared design concept. It does not replace it.

### Domain Language Is A Workflow Artifact

The workflow needs a durable language artifact when domain terms, module names,
test names, or user-facing behavior can drift.

Resolved baseline:

- single-context repos use one root `CONTEXT.md`
- multi-context repos use a root `CONTEXT-MAP.md` pointing to per-context
  `CONTEXT.md` files
- active workflow artifacts link to the relevant context files, but do not
  replace them

Even small repos should have a context surface. It may start small, but agents
need a canonical place to check and update the ubiquitous language.

Resolved boundary: `CONTEXT.md` is strict glossary-only. It contains terms,
avoid-list entries, relationships, example dialogue, and flagged ambiguities. It
does not contain implementation decisions, planning notes, architecture
guidance, or scratchpad content.

### ADRs Are Needed But Should Stay Sparse

ADRs should capture decisions that are hard to reverse, surprising without
context, and based on real trade-offs.

Not every design decision deserves an ADR. Many belong in the active
PRD or plan artifact.

Resolved baseline from Matt's skills: ADRs do not receive their own heavy review
workflow. They are tiny supporting documents created lazily, then consumed by
downstream skills.

The active PRD, plan, architecture review, diagnosis, or implementation review
checks whether relevant ADRs were read, respected, and flagged when a real
conflict appears.

### PRD Is The Default Post-Modeling Artifact

Resolved direction: rename the successor workflow's intent artifact from
`specs/` to `prds/`. The north star should follow the Matt Pocock artifact spine
unless pressure tests show it is insufficient:

```text
CONTEXT.md / CONTEXT-MAP.md
-> sparse ADRs
-> PRD
-> vertical tracer-bullet slices
```

The PRD is the normal post-modeling intent artifact. It records the problem,
solution, user stories, implementation decisions, testing decisions, out of
scope boundaries, and notes.

PRD, spec, shared-design document, and brainstorm artifact overlap in ordinary
usage. Structured Workflow uses PRD because it names the position in the
workflow: after collaborative modeling, before planning and autonomous
implementation. Technical specification details can live inside the PRD when
the work requires them.

### Diagnostic Workflow Should Be Explicit

Diagnosis needs its own workflow or explicit artifact:

```text
feedback loop
-> reproduce
-> ranked falsifiable hypotheses
-> instrumentation
-> fix
-> regression evidence
-> cleanup
-> post-mortem / architecture follow-up
```

Resolved baseline: Diagnostic Workflow is separate from Feature Workflow and
Refactor Workflow.

### Architecture Improvement Means Deepening

Architecture improvement should include deepening shallow modules, strengthening seams,
clarifying public interfaces, and making the codebase easier for humans and
agents to navigate.

Architecture improve artifacts should name:

- current friction
- module/interface candidate
- hidden complexity
- test seam
- locality and leverage
- behavior-preservation evidence
- ADR implications

Open question: whether architecture vocabulary is core protocol vocabulary,
domain-line vocabulary, or both.

### Plan Needs Richer Inputs

Implementation plans should not start from a PRD alone.

They should load:

- reviewed PRD
- domain language
- ADR constraints
- module/interface decisions
- current codebase evidence
- current framework docs
- validation and error policy
- Flutter domain-pack profile when relevant

### Build Must Protect The Interface

Build should execute bounded vertical slices, but it also needs stop
conditions.

Build should stop and route back when:

- planned interface is wrong
- validation cannot prove the behavior
- domain language no longer matches the intended behavior
- error category was misclassified
- a regression seam is missing and that absence changes risk

### Review Needs Named Perspectives

Review is a universal gate and can also appear as a directly triggered side
flow.

Needed perspectives:

- PRD/shared-design review
- domain-language review
- ADR alignment review
- plan technical review
- architecture review
- code simplicity review
- test quality review
- implementation compliance review
- PR readiness review
- completion evidence review

### Flutter Should Be Project-Profile Aware

The Flutter line should not force one architecture onto every Flutter repo.

It should detect and record:

- state management: Riverpod, BLoC/Cubit, Provider, or other
- layer model and package layout
- generated-code tools
- coverage contract
- real-system testing boundaries
- platform targets
- local architecture docs
- error-handling policy

Mythic provides a high-rigor Riverpod profile. VGV provides strong Flutter
architecture and review conventions. ACT provides current-doc retrieval,
research agents, and concise executable planning. The Flutter line should
integrate these without pretending they are identical.

## Natural Items Not Yet Worked Through

### Artifact Model

- PRD template shape
- domain-language template
- context-map template
- ADR template
- ADR index template
- diagnosis template
- architecture audit template
- module/interface design template
- issue decomposition template
- issue readiness review template
- handoff template
- debrief template
- PR readiness / release evidence template
- review reconciliation template
- domain-pack profile template
- runtime adapter profile template
- hook job matrix template
- eval scenario template
- stale-context review checklist

### Workflow Model

- whether Feature Workflow, Refactor Workflow, and Diagnostic Workflow are the
  complete v1 workflow set
- how diagnostic side flows relate to Diagnostic Workflow
- how architecture improvement side flows relate to Refactor Workflow and
  review perspectives
- whether issue creation belongs to planning, delivery, or a separate adapter
- whether delivery and handoff are completion phases or side flows
- how Review operates as both universal gate and side flow
- how resumable work consumes handoff artifacts
- which capabilities can be both directly triggered side flows and review
  perspectives inside the autonomous loop
- which named workflows Structured Workflow should support first

### Workspace Model

- whether the workspace remains `.ai-workflow/`
- whether domain language lives inside workflow, repo docs, or both
- whether ADRs are workflow-local, repo-local, or host-specific
- how `workflow.md` links active language, ADR, PRD, plan, evidence, and
  handoff artifacts
- minimum machine-readable fields for hooks and scripts

### Collaborative Modeling

- PRD section shape and technical-spec detail policy
- when `CONTEXT.md` becomes required
- how many grill loops are expected before artifact synthesis
- how unresolved decisions are represented
- how user stories, implementation decisions, testing decisions, interfaces,
  and validation standards fit together

### Flutter Line

- Riverpod-first, BLoC-first, or state-management-neutral with profiles
- 100% coverage as global default, Mythic-profile default, or per-project
  contract
- exact real-systems testing boundary
- generated-code policy and commands
- how local project architecture overrides domain-pack defaults
- how much Mythic-derived specificity belongs in public guidance
- how Flutter team skills fit once the complete workflow is stable

### Plan And Slice Model

- whether tracer-bullet slices live inside the plan or in `slices/`
- whether every slice gets HITL/AFK classification
- how local slice packets become external issues without making trackers
  mandatory
- whether issue creation belongs to Plan, Delivery, or a separate adapter
- how requirement-to-slice-to-evidence traceability is recorded

### Diagnostic Workflow

- standalone `diagnoses/` folder versus discovery subtype
- hotfix path and evidence requirements
- when Diagnostic Workflow can use a lighter collaborative modeling gate
- how production/log evidence is captured safely
- what happens when no correct regression seam exists

### Architecture Improvement

- shared architecture vocabulary
- deletion-test prompts
- interface-design subagent pattern
- when architecture improvement must precede implementation
- when rejected architecture candidates become ADRs
- how behavior preservation is proven

### Review

- review perspective taxonomy
- review packet templates
- review-of-review behavior
- how to reconcile conflicting subagent reviews
- what blocks downstream use versus what is advisory
- how glossary and ADR alignment are checked
- which review perspectives map to reusable side flows

### Hooks And Runtime Adapters

- which hook jobs are advisory versus blocking
- how much hooks may mutate files automatically
- Codex adapter profile
- Claude Code adapter profile
- OpenCode, Cursor, Windsurf, Pi, Gemini, VS Code / Copilot profiles
- CLI helpers versus MCP tools
- local install versus marketplace install

### Skill Package

- one core plugin versus core plugin plus domain lines
- one bootstrap skill first versus workflow skills on day one
- skill names and descriptions
- entrypoint skills versus internal references
- skill eval suite
- pressure-test scenarios
- public/private source boundary review

## Grill Queue

These should be handled one branch at a time.

### 1. PRD Artifact

Resolved: the normal output of Collaborative Modeling is a PRD.

Open follow-up: decide the exact PRD template sections, including where
technical-spec details, interface decisions, validation standards, unresolved
questions, and out-of-scope boundaries live.

### 2. Context Scope And Strictness

Resolved: a context surface is required for every Structured Workflow repo.

Resolved: `CONTEXT.md` remains strict glossary-only.

### 3. ADR Gate

Resolved: ADRs are supporting documents reviewed through the active PRD, plan,
architecture review, diagnosis, or implementation review.

### 4. Workflow Model

The first workflow set is resolved enough for v1:

- Feature Workflow
- Refactor Workflow
- Diagnostic Workflow

Current vocabulary correction: do not use "subflow" unless it is later defined.
Use **Side Flow** for a directly triggered focused workflow. Use **Review
Perspective** for a focused lens invoked inside a review gate. Some
capabilities, such as Architecture Improvement, can exist in both shapes.

Second vocabulary correction: name workflows after the work they do. The user's
`vgv-pr-roundtrip` skill describes the autonomous loop that belongs inside a
Feature Workflow or Refactor Workflow: it starts from a buildable slice, runs
build/review/fix/PR-feedback loops, reconciles docs, and stops only at
merge-ready completion. That is larger than a single implementation phase.

Diagnosis belongs to a separate diagnostic workflow. It may run autonomously in
parts, but it is not part of the normal path for feature or refactor work.

Feature Workflow and Refactor Workflow both contain an autonomous loop after
collaborative modeling, PRD, and planning. Every autonomous implementation loop requires TDD.
Diagnostic Workflow may use collaborative modeling as an initial gate when the
bug is ambiguous, domain-heavy, or architecture-sensitive. Its hard gate is a
feedback loop that proves the reported failure before the fix and regression
evidence after the fix.

Refactor Workflow uses an architecture-focused PRD. It shares the broad Feature
Workflow sequence, but emphasizes inventory and audit of existing code before
planning the target architecture. Feature Workflow also needs inventory when it
connects to existing systems, but the emphasis is integration rather than
structural change.

### 5. Flutter Identity

Is the first-class Flutter line Riverpod-first because Mythic is the reference
implementation, or state-management-neutral with Riverpod and BLoC profiles?

### 6. Coverage Contract

Should 100% non-generated line coverage be:

- global Flutter default,
- Mythic-like high-rigor profile default,
- or per-project decision?

### 7. Real Systems Boundary

Where exactly do we require real implementations instead of mocks/fakes?

This should distinguish data correctness, UI journey determinism, external
services, storage, serialization, and platform integration.

### 8. Slice Representation

Do tracer-bullet slices live inside the implementation plan, or in dedicated
slice artifacts?

### 9. Missing Regression Seam

If no correct regression-test seam exists, does implementation pause and route
to Architecture Improvement, or continue with weaker evidence and recorded
risk?

### 10. Skill Package Shape

Should the first installable package ship:

- one bootstrap skill,
- bootstrap plus workflow skills,
- or core plugin plus Flutter domain pack?

### 11. Artifact Cleanup Carry-Forward

The untested Structured Workflow comparison drafts were deleted from the private
skill lab. Do not treat their wording as source material.

The cleanup pass left these questions for the `grill-with-docs` queue:

- Should `workflow.md` enforce one active steering artifact per phase, or only
  record the convention?
- What minimum evidence must exist before the system chooses Feature Workflow,
  Refactor Workflow, or Diagnostic Workflow?
- Should artifact review be one generic review capability, or phase-specific
  review perspectives?
- Which final claims require reviewed evidence before the agent can report,
  commit, push, or open a PR?
- How should the orchestrator reconcile subagent and reviewer outputs as
  evidence rather than truth?
- Which responsibilities belong to hooks and commands, and which belong to
  skills and subagents?
- Should Flutter/Dart guidance be a separate domain line layered onto the
  protocol, or part of the first core package?
- How do we keep public docs original while still crediting private or paid
  systems that influenced the design?

## Recommended Next Move

Use `grill-with-docs` on the first unresolved branch: PRD Artifact.

The workflow set is resolved enough for v1. Context scope is resolved enough to
keep the glossary strict. ADR Gate is resolved enough to follow Matt's
supporting-document model. The next useful branch is the PRD artifact because
it is the output of Collaborative Modeling and the input to planning.

Suggested starting question:

```text
What should the PRD template look like so it supports both Feature Workflow and
architecture-focused Refactor Workflow without muddying the ubiquitous language?
```
