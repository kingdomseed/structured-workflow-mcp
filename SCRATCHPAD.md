# Structured Workflow Scratchpad

Temporary planning notes. Delete this file after the README and final project
docs have absorbed the useful context.

Inquiry-Analysis is now written up as a self-contained phase doc:
`skills/inquiry-analysis/README.md`. This scratchpad keeps the source research,
the cross-phase artifact flow, the adversarial-review concept, and the remaining
open threads.

## Naming Decisions To Preserve

Structured Workflow should not expose source-system names as the active product
surface.

- Matt `grill-with-docs` maps to Structured Workflow `Interview`.
- Matt `CONTEXT.md` (glossary-only) maps to Structured Workflow `GLOSSARY.md`.
- Matt `CONTEXT-MAP.md` maps to `GLOSSARY-MAP.md`, only when multiple glossary
  contexts are needed.
- Matt's ubiquitous-language idea maps to resolving ambiguity between human,
  agent, artifacts, tests, code, and reviews.

## Inquiry-Analysis (migrated)

The core thesis, the Interview-as-engine framing, the interview loop, the
endpoint gate, the inquiry document shape, and the Design Brief review now live
in `skills/inquiry-analysis/README.md`. The source research that fed them is
kept below.

## Source Ingredients (from the real skills)

Each favorite contributes one distinct ingredient. They are parts of one phase,
not alternatives.

### grill-with-docs / grill-me (Matt Pocock) — the engine

Source: `~/.agents/skills/grill-with-docs/SKILL.md`, `.../grill-me/SKILL.md`.

- Interview relentlessly; walk the design tree one branch at a time, resolving
  dependent decisions in order; give a recommended answer per question.
- Ask one question at a time; if the codebase can answer it, explore instead.
- Challenge the user's wording against the glossary; sharpen fuzzy/overloaded
  terms; stress-test with concrete scenarios; cross-reference against code.
- Update `GLOSSARY.md` inline as terms resolve (glossary-only, no implementation
  detail). Offer ADRs sparingly: only hard-to-reverse + surprising + real
  trade-off.
- `grill-me` is the no-docs fallback when there is no domain surface yet.

### Superpowers brainstorming — the hard gate

Source: `github.com/obra/superpowers` `skills/brainstorming/SKILL.md`.

- Ordered checklist: explore context -> (offer visual companion) -> clarifying
  questions one at a time -> propose 2-3 approaches -> present design in
  sections with approval after each -> write design doc -> spec self-review ->
  user reviews spec -> transition to planning.
- HARD GATE: do not code/scaffold/invoke implementation until a design is
  presented and approved. Applies to every project, "too simple" included.
- Spec self-review scans for placeholders, contradictions, scope, ambiguity.
- It bundles a lot into one skill: not just inquiry and the 2-3-approaches
  idea-generation, but the full technical design/spec — architecture,
  components, data flow, error handling, testing. In our four buckets that one
  source skill spans all of `inquiry-analysis` AND `developing-ideas`.
- Scope-decomposition: if the request is several independent subsystems, it
  stops and decomposes into sub-projects first, each getting its own
  spec -> plan -> implementation cycle. (Converges with VGV's Step 0 "is this
  even one project?" check.)

### VGV Wingspan brainstorm — phase discipline + the clarity gate

Source: `github.com/VeryGoodOpenSource/vgv-wingspan` `skills/brainstorm/SKILL.md`.

- Clarify WHAT before HOW. Step 0 assesses scope (new project vs feature).
- Up-front CLARITY GATE (0.1): if requirements are already clear, skip
  brainstorm and suggest going straight to planning. Brainstorm only when there
  is real ambiguity.
- Lightweight project research first; collaborative Q&A one at a time
  (multiple-choice preferred, broad -> narrow, success criteria early).
- 2-3 concrete approaches with trade-offs, lead with a recommendation; YAGNI
  ruthlessly, prefer boring/existing patterns, right-size architecture.
- Capture a dated brainstorm doc, then an explicit handoff that can **clear
  context** before planning. DO NOT CODE.

### ACT spec-writing / refine-spec — output shape + adversarial review

Source: `~/.agentic-coding-toolkit/skills/act-workflow-spec`, `.../refine-spec`.

- Spec dimensions: goal, scope, user flows (with a permutation checklist:
  first-time vs returning, offline/slow, partial/resume, cancel/rollback,
  concurrency), constraints, edge cases, validation, codebase context.
- Preview-outline gate before writing the full spec.
- `refine-spec` is an adversarial reviewer: review-only first, no silent edits,
  five dimensions (completeness, assumptions, UX coherence, data model, codebase
  alignment), findings by severity, then a review gate.

## Adversarial Review (cross-phase concept)

Every steering artifact is untrusted until an adversarial review pass clears it.
This is a cross-phase pattern: the Design Brief (inquiry-analysis), the PRD
(developing-ideas), and the implementation plan / code (creating-solution,
evaluating) all face the same discipline. First instance is written up in
`skills/inquiry-analysis/README.md`.

The shared shape (grounded in the real sources):

- **Spawn focused reviewers in parallel**, each with one lens, judging the
  artifact against an explicit criteria set. *(VGV `plan-technical-review` runs
  `@code-simplicity-review-agent`, `@vgv-review-agent`, `@plan-splitting-agent`
  in parallel.)*
- **Criteria are explicit and named.** VGV `refine-approach`: Clarity,
  Completeness, Specificity, YAGNI, Scope. VGV `@vgv-review-agent`: Very Good
  Engineering practices. ACT `refine-spec`: completeness, assumptions, UX
  coherence, data model, codebase alignment.
- **Review first, no silent edits.** The pass produces findings; it does not
  quietly rewrite the artifact.
- **Findings by severity**, with one prominent **must-address** item.
- **A gate, not a rubber stamp.** Blocking findings route back; the artifact is
  not downstream authority until it passes.
- **Bounded iteration** — ~2 passes, then complete or escalate.

Open question: our own criteria set / "engineering principles" equivalent.
VGV anchors on Very Good Engineering; we need our named principles (likely the
`ENGINEERING.md` lineage) before the review agents have something to judge
against. Park until we shape `evaluating`.

## Phase Artifact Flow (verified)

Each phase ends by producing one durable document. That document is what the
next phase reads. The documents ARE the cross-phase memory — not a separate
handoff step.

```text
inquiry-analysis   -> inquiry document (full findings step by step; its final
                                       Design Brief section is the handoff)
developing-ideas   -> PRD            (solution, user stories, implementation
                                       decisions, testing decisions, out of scope)
creating-solution  -> code + tests   (entered by slicing the PRD into issues)
evaluating         -> review/evidence
```

Verified against the real skills:

- **PRD is interview-free.** Matt `to-prd`: "Do NOT interview the user — just
  synthesize what you already know." The interviewing happened in
  inquiry-analysis, so developing-ideas synthesizes rather than re-asks. PRD
  shape: Problem / Solution / User Stories / Implementation Decisions / Testing
  Decisions / Out of Scope / Notes.
- **Creating-solution starts by decomposing the PRD.** Matt `to-issues` breaks
  "a plan, spec, or PRD" into tracer-bullet vertical slices: each cuts through
  all layers, is demoable on its own, and is marked HITL or AFK.

Nuances to respect:

- "Interview-free" is precise about PRD *synthesis*. Developing-ideas still has
  an approval gate when choosing among the 2-3 approaches, and `to-issues`
  quizzes the user on slice granularity. These are confirmations, not
  requirements interviews.
- Design-brief vs PRD overlap risk. Brief = lightweight "what/why"
  (understanding); PRD = heavier "solution/how." If they start to duplicate,
  collapse the brief — or let a clearly-specified request skip the brief and
  route straight to the PRD (the clarity gate).

Durable files vs handoff:

- The phase artifacts (brief -> PRD -> issues) plus the always-on `GLOSSARY.md`
  are the durable memory. The `handoff` skill is lightweight glue for clearing
  context mid-phase, not the primary continuity mechanism.
- This only works if files are written at the right moment, re-read at phase
  entry, kept bounded, and never duplicated.

## Open Threads (follow later, do not chase now)

1. **Inquiry <-> Developing-Ideas oscillation.** MYP flows back and forth, and
   Matt models this: a grill question you cannot answer in the abstract triggers
   a jump to `prototype` (throwaway code that answers one question), then a
   return with the answer (captured durably, prototype deleted). The "propose
   2-3 approaches" step belongs to `developing-ideas`. Decision needed: how the
   two buckets pass control back and forth without a hard wall.

2. **Gate inventory.** Gates found so far: clarity gate (entry to inquiry, skip
   when already clear — VGV); endpoint gate (exit of inquiry — ours to define);
   approval gate (choosing an approach in developing-ideas — Superpowers/VGV);
   slice-approval gate (entry to creating-solution — `to-issues`). Superpowers
   enforces an absolute pre-implementation gate even for "simple" work. Decide
   which gates are mandatory vs skippable.
