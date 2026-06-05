# Handoff — Structured Workflow

Transient brief. Delete once the remaining work below is done and `SCRATCHPAD.md`
has been reconciled. (Same disposability as `SCRATCHPAD.md`.)

## Orientation

Structured Workflow is an install repo of skills / agents / hooks that gives a
coding agent the MYP design cycle — **inquiry-analysis -> developing-ideas ->
creating-solution -> evaluating** — backed by durable file memory and continuity
hooks. We are shaping it **one phase at a time, docs first**.

## Current state

**All four core phase docs are DONE and mutually consistent:**

- `skills/inquiry-analysis/README.md`
- `skills/developing-ideas/README.md`
- `skills/creating-solution/README.md`
- `skills/evaluating/README.md`

Also written and reconciled: the core `README.md`, and the starter template
`skills/workflow-management/workflow-tracker.md`. The two cross-phase principles
(human-ready/agent-ready and confidence signaling) live in the core README under
"Working Together: Judgment and Confidence". Working notes — the MYP strand
diagram, source research, source-bucket audit context, and open threads — live in
`SCRATCHPAD.md`.

## What's next (remaining work)

See `SCRATCHPAD.md` "Open Threads" for detail. In short:

1. **Source skill bucket synthesis** — use the five `TEMP-*-skill-audit.md` docs to
   decide which source skills/favorite skill groups belong in each Structured
   Workflow bucket. Do not use stale bucket placements.
2. **Root README** — further polish when needed.
3. **Inquiry <-> Developing-Ideas oscillation** — write up the concrete `prototype`
   jump-and-return mechanics (model decided; mechanics TBD).
4. **`workflow-tracker.md` usage narrative** — how it is read/updated across phases.
5. **Per-project template mechanics** — the Definition-of-Done-in-template decision
   is firm; where templates live and how a new cycle is seeded is TBD.
6. **Consistency pointer (light)** — optionally note in the three earlier phase docs
   that their adversarial-review sections are invocations of the evaluating engine.
   No rewrite.
7. **`agents/` and `hooks/`** — not yet built.

## Read these, in order

1. `README.md` — product framing. One system, two aspects: the MYP cycle (the
   framework) and durable files (how an LLM keeps its place).
2. `skills/inquiry-analysis/README.md` — the template phase doc; **mirror its
   shape and voice**. Then the other three siblings for consistency.
3. `SCRATCHPAD.md` — the MYP strand diagram, source provenance, and open threads.

**Ignore `r-and-d/` entirely** — stale, contradictory, out of scope. Ignore
`mp_transcript.md` unless you specifically want Matt Pocock's raw framing.

## Locked decisions (do not relitigate)

- **Four buckets, no fifth.** Phases flow fluidly, not as rigid gates.
- **MYP strands are symmetric** (verified against the design-cycle diagrams):
  A1 need + A2 research + A3 prior art -> **A4 Design Brief**; B1 spec + B2
  ideas/prototype + B3 chosen/justified -> **B4 PRD**. The back-and-forth is
  intrinsic, not a caveat. See `SCRATCHPAD.md` "MYP Strand Structure".
- **Criterion C breaks the symmetry** (real product is code + tests) but keeps one
  durable local doc — the **creating-solution document** staging C1 slices + C2
  technical approach, adversarially reviewed *before* export to the tracker, with
  C4 justified changes folded in. C3 builds against the live issues; verification
  is slice-level only. **C1 <-> C2 interleave:** choosing the technical approach is
  itself planning and can add slices.
- **Criterion D returns to the symmetric shape AND is a cross-phase engine.**
  Evaluation is jumpable from any phase to judge the current state (Design Brief /
  PRD / issues / built solution); the per-phase adversarial-review sections are
  invocations of it. It owns ONE **accumulating evaluation document**.
- **Each phase owns ONE durable document** that is the next phase's input. The
  documents ARE the cross-session memory; the `handoff` skill is just glue.
- **One hard gate only: ship.** The framework cannot ship while any stated
  criterion (project **Definition of Done** or PRD/issue level) is failing.
  Everywhere else the boundary is soft — orientation, not enforcement: the agent
  offers the next artifact; it does not block.
- **No `ENGINEERING.md`.** The reviewers' criteria live inside the evaluation
  system; the *standing* engineering criteria are a per-project **Definition of
  Done** carried by a customizable project template; cycle-specific criteria come
  from the Brief/PRD/issues. Capture **both** levels.
- **`workflow-tracker.md`** is the always-on position file (peer to `GLOSSARY.md`):
  current phase/document/criterion, likely next phase, looping-back flag, linked
  artifacts. NOT a `task_plan/progress/findings` triad.
- **`GLOSSARY.md`** is the always-on ubiquitous-language file (glossary only).
  ADRs are sparse: hard-to-reverse + surprising + real trade-off.
- **B4/PRD synthesis is interview-free** (Problem / Solution / User Stories /
  Implementation Decisions / Testing Decisions / Out of Scope / Notes), and
  `creating-solution` starts by decomposing it into tracer-bullet vertical slices,
  each marked HITL or AFK.
- **Do not create or plan `NOTICE.md` now.** Source-lineage packaging is explicitly
  deferred until the repo contents are finalized and the user decides what is being
  kept. Current source work is bucket audit and synthesis only.
- **Terminology:** use OUR names in product docs (Interview, GLOSSARY.md, Design
  Brief, PRD). Do NOT expose source-system names (Matt / VGV / Superpowers / ACT /
  Codex) in the doc body.

## Traps that burned prior agents

- **Do not rewrite docs wholesale or delete content the user liked.** Tighten in
  place; surface anything you cut.
- **Do not lean on `r-and-d/`.** It is a stale, all-over-the-place snapshot.
- **Do not reintroduce a `task_plan.md` / `progress.md` / `findings.md` triad.**
  "Findings" live as the *body* of a phase doc, not a separate file.
- **No internal/process/cleanup talk in product docs.** Public-facing clarity.
- **Ground in REAL sources**, not memory or the R&D distillation.
- **Do not bring up `NOTICE.md` as remaining work.** It is intentionally deferred.

## Collaboration style the user expects

- **Shape, don't dump.** Treat the user's context as design direction, not verbatim
  text — unless they say "use these words."
- **Don't remove without flagging.** Always surface what you changed or cut.
- **Be objective.** Push back, verify against real sources, don't just agree.
- Present synthesis and let the user sharpen.

## Method and tools that work here

- `web_search` has been unreliable. Use `webfetch` on **raw GitHub URLs** directly.
- Real source locations:
  - Matt Pocock (local): `~/.agents/skills/{grill-with-docs,grill-me,to-prd,to-issues,handoff,prototype}/SKILL.md`
  - ACT (local): `~/.agentic-coding-toolkit/skills/{act-workflow-spec,act-workflow-refine-spec,act-workflow-work,act-meta-audit-work}/SKILL.md`
  - Codex Product Design (local): `~/.codex/plugins/cache/openai-curated-remote/product-design/<version>/skills/{design-qa,audit,...}/SKILL.md`
  - Superpowers: `https://raw.githubusercontent.com/obra/superpowers/main/skills/<name>/SKILL.md`
  - VGV Wingspan: `https://raw.githubusercontent.com/VeryGoodOpenSource/vgv-wingspan/main/skills/<name>/SKILL.md`
- Subagents got sandbox-blocked reading `~/` paths and fell back to `r-and-d/`, so
  fetch sources yourself rather than trusting a subagent's secondhand summary.
