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
- specialized review side flows

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
-> vertical slices
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

Resolved: architecture vocabulary is both core and domain-line aware. Core
concepts such as Deep Module, Interface, Feedback Loop, and TDD belong to the
protocol language. Stack-specific architecture reviewers and package/layer
rules belong to the relevant domain line.

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

### Plan Review Can Use Core And Domain Agents

The plan gate is also an opportunity to select focused review agents based on
the stack and risk surface.

Across ACT, Superpowers, and VGV, the same pattern appears in different
language:

- research agents gather current docs and local codebase evidence before or
  during planning
- plan reviewers check whether the plan is complete, aligned, decomposed, and
  buildable
- scope reviewers decide whether the plan should be split into smaller
  independently reviewable pieces
- simplicity reviewers challenge unnecessary abstraction, speculative scope,
  and overbuilt implementation shape
- test reviewers check whether the work can be proved by meaningful feedback
  loops
- architecture reviewers check layer boundaries, dependency direction, module
  shape, and state-management correctness
- spec or PRD compliance reviewers distrust implementer summaries and compare
  actual work back to the approved artifact
- user-flow reviewers search for missing journeys, edge cases, roles,
  permissions, error states, and ambiguous user feedback

Resolved direction: Structured Workflow should separate **Required Review
Agents**, **Core Review Agents**, and **Domain Review Agents**.

Core Review Agents are considered for ordinary software plans regardless of
stack:

- plan readiness
- plan splitting
- simplicity
- TDD/test readiness
- architecture/deep-module review
- PRD compliance
- code quality

Some core agents are always-on for a workflow. They are not selected by the
orchestrator's taste or by stack detection.

For Feature Workflow and Refactor Workflow:

- code simplicity review always runs
- TDD/test readiness always runs because implementation is always TDD
- PRD compliance always runs before autonomous work

For Refactor Workflow:

- architecture/deep-module review always runs
- the review should use Matt Pocock's architecture language where applicable:
  module, interface, implementation, depth, seam, adapter, leverage, locality,
  deletion test, and "the interface is the test surface"

For Feature Workflow:

- architecture/deep-module review runs whenever the feature adds, changes, or
  depends on module seams, public interfaces, architectural layers, package
  boundaries, state-management boundaries, or persistence/network seams

Domain Review Agents are selected only when the work touches their area:

- Flutter official-docs researcher
- Flutter codebase researcher
- Bloc/state-management reviewer
- Drift/persistence reviewer
- navigation reviewer
- accessibility reviewer
- security reviewer
- localization reviewer
- user-flow reviewer
- any project-specific module or context reviewer

This keeps the gate strict without making every plan run every available
specialist. The orchestrator runs required review agents first, then selects
additional domain review agents from the plan, PRD, codebase research, official
docs research, risk profile, and chosen workflow skill.

### Build Must Protect The Interface

Build should execute bounded vertical slices, but it also needs stop
conditions.

Build should stop and route back when:

- planned interface is wrong
- validation cannot prove the behavior
- domain language no longer matches the intended behavior
- error category was misclassified
- a regression seam is missing and that absence changes risk

### Autonomous Loop Needs Slice And Near-PR Review Cycles

Resolved direction: the autonomous loop should contain two different review
rhythms.

The first rhythm is the **Slice Loop**:

```text
take next approved vertical slice
-> write failing proof first
-> make the smallest passing change
-> refactor
-> run validation
-> run required slice review agents
-> fix findings
-> update evidence
-> commit the slice when useful
-> continue or stop at a HITL gate
```

The second rhythm is the **Near-PR Hardening Loop**:

```text
all planned local slices complete
-> run multiple VGV-style review rounds
-> fix each round before starting the next
-> validate again
-> reconcile docs and evidence
-> commit and push
-> open PR
-> handle PR feedback until merge-ready
```

This preserves the user's existing `vgv-pr-roundtrip` lesson: completed local
slices are not enough. Before a PR is opened, the branch still needs repeated
review pressure, especially around simplicity, architecture, test quality,
PR-readiness, and integration between slices.

Default for the Flutter line: keep the VGV-style pre-PR review count at three
rounds unless the user or workflow skill overrides it. This may become lighter
after Structured Workflow has been tested in real projects, but the first
version should keep the hardening loop explicit.

Resolved commit/PR boundary: vertical slices may be committed independently as
checkpoints, but the default delivery boundary is one coherent PR. One PR per
slice only happens when a Plan Split explicitly decides the work should become
multiple independently reviewable PRs.

### Review Needs Named Side Flows

Review is a universal gate and can also appear as a directly triggered side
flow.

Needed review side flows:

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

- how diagnostic side flows relate to Diagnostic Workflow
- how architecture improvement side flows relate to Refactor Workflow and
  review side flows
- whether issue creation belongs to planning, delivery, or a separate adapter
- whether delivery and handoff are completion phases or side flows
- how Review operates as both universal gate and side flow
- how resumable work consumes handoff artifacts
- which capabilities can be both directly triggered side flows and review side
  flows inside the autonomous loop

### Workspace Model

- whether ADRs are workflow-local, repo-local, or host-specific
- how `workflow.md` links active language, ADR, PRD, plan, evidence, and
  handoff artifacts
- minimum machine-readable fields for hooks and scripts

### Collaborative Modeling

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

- review side flow taxonomy
- review packet templates
- review-of-review behavior
- how to reconcile conflicting subagent reviews
- what blocks downstream use versus what is advisory
- how glossary and ADR alignment are checked
- which review side flows map to reusable side flows

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

Matt Pocock's `to-prd` skill is the baseline shape:

- synthesize from existing conversation and codebase understanding
- do not interview the user again during PRD creation
- use the project's glossary and respect relevant ADRs
- sketch major modules to build or modify
- actively look for deep-module opportunities with simple, testable interfaces
- check module and testing expectations with the user before publishing

The baseline PRD sections are:

- Problem Statement
- Solution
- User Stories
- Implementation Decisions
- Testing Decisions
- Out of Scope
- Further Notes

Resolved: do not add an Open Questions section to the PRD. Questions must be
closed during Collaborative Modeling before PRD synthesis. If a question is
still open, the PRD is not ready.

Resolved: review status should not live inside the PRD because it can go stale.
`workflow.md` and the review artifact track whether the PRD is reviewed and
approved for downstream use.

Resolved: a short Source section is acceptable when it points to the few
artifacts the PRD depends on: Collaborative Modeling notes, context files, ADRs,
and discovery/inventory evidence.

Resolved: workflow-specific PRD emphasis belongs in workflow skills, not in the
PRD template. The Feature Workflow and Refactor Workflow can use the same PRD
spine while loading different guidance for what to consider and how to fill the
sections.

The Refactor Workflow skill should draw from software engineering principles
such as Domain-Driven Design and John Ousterhout's _A Philosophy of Software
Design_: domain language, deep modules, simple interfaces, locality, leverage,
testability, and behavior preservation.

### 1a. PRD Review Gate

Resolved: after `to-prd` produces a PRD, the next step is a PRD Review Side
Flow. The PRD itself does not carry review status.

The source pass over adjacent systems supports this shape:

- ACT's spec review is adversarial, codebase-grounded, evidence-cited, and
  blocks editing until findings are visible.
- VGV's refine-approach flow checks clarity, completeness, specificity, scope,
  YAGNI, UX coherence, data fit, codebase fit, and verification, then presents
  visible findings before updates.
- Superpowers' spec reviewer calibrates the review to block only on issues
  that would cause real planning or implementation problems.

Structured Workflow should combine those ideas with Matt's PRD baseline:

- review the PRD against the glossary, ADRs, discovery/inventory evidence, and
  codebase reality
- verify questions are closed; if not, return to Collaborative Modeling
- verify the PRD reflects the user's intent with fidelity
- verify module/interface decisions are clear enough to plan from
- verify deep-module opportunities were considered where relevant
- verify testing decisions identify behavior, module seams, and useful prior
  art
- verify scope boundaries prevent accidental expansion
- separate blocking findings from advisory improvements
- write a review artifact and update `workflow.md`
- apply accepted findings back into the PRD before planning begins

The gate passes only when no blocking findings remain and accepted findings
have been reconciled into the PRD. Advisory improvements can be recorded
without blocking planning, but anything accepted as necessary must update the
PRD before the plan treats it as authoritative.

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

Use **Side Flow** for focused workflows, including review side flows invoked
inside review gates. Some capabilities, such as Architecture Improvement, can
exist in both directly triggered and review-gate shapes.

Second vocabulary correction: name workflows after the work they do. The user's
`vgv-pr-roundtrip` skill describes the autonomous loop that belongs inside a
Feature Workflow or Refactor Workflow: it starts from a buildable slice, runs
build/review/fix/PR-feedback loops, reconciles docs, and stops only at
merge-ready completion. That is larger than a single implementation phase.

Diagnosis belongs to a separate diagnostic workflow. It may run autonomously in
parts, but it is not part of the normal path for feature or refactor work.

Feature Workflow and Refactor Workflow both contain an autonomous loop after
collaborative modeling, PRD, and planning. Every autonomous implementation loop
requires TDD.
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

Resolved: vertical slices live inside the implementation plan by default.

Source pass:

- Matt's `to-issues` turns an approved plan or PRD into issue-tracker slices
  after the higher-level artifact exists. It classifies slices as HITL or AFK
  and asks the user to approve granularity, dependencies, and split/merge
  choices before publishing.
- VGV planning records local research, external-doc decisions, requirements,
  tasks, verification steps, and a first thin vertical slice. VGV technical
  review can recommend splitting a plan into smaller plan files when one PR is
  too large.
- ACT planning produces terse phased implementation plans. Its style contract
  makes Phase 1 a thin end-to-end vertical slice and splits phases only around
  risk, integration, or checkpoint boundaries.
- Superpowers planning produces bite-sized executable tasks and requires
  self-review against the source spec, placeholder scan, type consistency, and
  task coverage.

Structured Workflow decision:

- Matt's vertical-slice model from `to-issues` is the primary model for turning
  a reviewed PRD or plan into implementation work.
- Software planning uses separate research agents by default.
- A Docs Research Agent retrieves current official docs, version constraints,
  migration notes, and API guidance. This includes language syntax, SDK
  behavior, framework APIs, package APIs, platform APIs, test APIs, lint rules,
  and external services. It is especially important for Flutter, Dart, Bloc,
  Riverpod, GoRouter, platform APIs, and third-party packages.
- Docs research uses official documentation only. It does not use blogs,
  generic web best-practices posts, or community advice as authority.
- If official docs do not cover an innovative or unusual approach, the Docs
  Research Agent records the documentation gap instead of pretending the gap is
  resolved.
- Best-practice claims in the plan must come from official docs, accepted local
  project conventions, or explicitly credited engineering principles already
  accepted by the workflow.
- A Codebase Research Agent inspects local project structure, conventions,
  reference implementations, and architecture patterns so the plan matches the
  actual repo.
- Codebase research is evidence-only. It uses current repo files, committed
  docs, accepted local conventions, and exact references. It may infer from
  patterns, but must label inference clearly.
- Docs Research Agent and Codebase Research Agent reports are separate Research
  Artifact files. They are not inline-only summaries inside the plan.
- The plan links the research artifacts and may include brief extracted
  decisions, but the source reports must remain inspectable by later agents.
- Research Artifacts live under `.ai-workflow/research/<plan-slug>/`, for
  example `official-docs.md` and `codebase-research.md`.
- `workflow.md` tracks active Research Artifacts and whether each report is
  accepted for planning. The implementation plan also links them, but
  `workflow.md` is the control surface that prevents the planner from skipping
  or ignoring them.
- The orchestrator can accept routine docs/codebase research for planning.
- Any research finding that changes product behavior, architecture direction,
  scope, or AFK/HITL classification becomes HITL and needs human approval.
- Skipping docs research requires an explicit low-risk justification. "Repo
  local" is not enough by itself because even local Dart code depends on
  current Dart, Flutter, analyzer, testing, and package behavior.
- The planner reconciles those research reports before writing the plan.
- The implementation plan contains vertical slices directly.
- A Plan Split creates separate plan artifacts or external issue slices only
  when the plan is too large for one autonomous loop, one PR, or one useful
  review.
- Every vertical slice is classified as AFK or HITL.
- The user's Autonomy Intent is recorded before planning: all-AFK if possible,
  or HITL allowed where decisions/access/approval are required.
- AFK means ready for fully autonomous end-to-end execution after Collaborative
  Modeling, PRD, and planning are complete.
- HITL means human judgment, approval, access, product decision, architecture
  decision, or visual choice is required inside the loop.
- The plan review side flow may recommend a Plan Split, but the orchestrator
  reconciles that recommendation before creating new artifacts.
- The first implementation unit should be a thin vertical slice unless the plan
  explicitly explains why that is impossible.
- Every requirement or user story in the PRD should map to at least one
  implementation task and one verification step.

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
  review side flows?
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

Use `grill-with-docs` on the next unresolved branch: Flutter Identity.

The workflow set is resolved enough for v1. Context scope is resolved enough to
keep the glossary strict. ADR Gate is resolved enough to follow Matt's
supporting-document model. PRD Artifact and PRD Review Gate are resolved enough
to draft templates and skills later. Plan And Slice Model is resolved enough for
the first scaffold: vertical slices live in the implementation plan, every slice
gets AFK/HITL classification, research artifacts are required by default, slice
commits are allowed, and one coherent PR is the default delivery boundary.

The next useful branch is Flutter Identity because it decides whether the first
domain line is state-management-neutral with profiles, Riverpod-first, or
BLoC-first, and how VGV, ACT, Flutter-team, and Mythic guidance layer onto the
core protocol.

Suggested starting question:

```text
Should Autonomous Flutter be state-management-neutral with project profiles, or
should the first public version privilege a specific reference stack?
```
