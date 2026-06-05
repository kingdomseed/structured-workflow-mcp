# Handoff — Next Phase: Developing-Ideas

Transient doc. Delete once `skills/developing-ideas/README.md` exists and this
context is absorbed. (Same disposability as `SCRATCHPAD.md`.)

## Orientation (read this first)

Structured Workflow is an install repo of skills / agents / hooks that gives a
coding agent the MYP design cycle — **inquiry-analysis -> developing-ideas ->
creating-solution -> evaluating** — backed by durable file memory and continuity
hooks. We are shaping it **one phase at a time, docs first**.

`inquiry-analysis` is DONE: `skills/inquiry-analysis/README.md`. **Your job: shape
`developing-ideas` the same way** — a self-contained phase README that mirrors the
inquiry-analysis doc's structure and voice.

## Current situation (read second)

`skills/developing-ideas/README.md` is **WRITTEN** (drafted 2026-06-05, mirroring
the inquiry-analysis doc). The cross-phase position file has a starter template at
`workflow-management/workflow-tracker.md`. The conceptual decisions behind both
are captured in `SCRATCHPAD.md` ("MYP Strand Structure", "Orientation, Not a Hard
Gate", "Durable Files Decision", "Corrected developing-ideas model", and the
"Developing-Ideas Research Evidence" pass). The research-delegation step is done.

What a follow-up agent should do next: (1) sanity-review the developing-ideas doc
against the inquiry-analysis voice/structure; (2) flesh out `workflow-tracker.md`
usage and the prototype jump-and-return mechanics; (3) then move to
`creating-solution`.

DONE this session: the two cross-phase principles (human-ready/agent-ready and
confidence signaling) graduated from PROVISIONAL into the core README as "Working
Together: Judgment and Confidence". The developing-ideas doc now references them
instead of marking them under review.

The "Research to delegate" section below is retained for reference but its tasks
are complete.

## Read these, in order

1. `README.md` — product framing. The core idea: one system, two aspects — the
   MYP cycle (the framework) and durable files (how an LLM keeps its place).
2. `skills/inquiry-analysis/README.md` — the finished phase doc. **Mirror its
   shape and voice.**
3. `SCRATCHPAD.md` — working notes: source-ingredient research, the verified
   cross-phase artifact flow, the adversarial-review concept, and open threads.

**Ignore `r-and-d/` entirely** — stale, contradictory, out of scope. Ignore
`mp_transcript.md` unless you specifically want Matt Pocock's raw framing.

## Your task

Write `skills/developing-ideas/README.md`:

- **Input:** the Design Brief handed off from inquiry-analysis.
- **Output:** one durable **developing-ideas document**. Its B4 section contains
  PRD/export content that can be written to Linear or another issue tracker for
  decomposition.
- This phase follows MYP Criterion B order: B1 design specifications -> B2
  feasible ideas / exploration / testing / feedback -> B3 chosen design and
  justification -> B4 planning requirements / PRD export.
- Mirror the inquiry-analysis README sections: what it's for, the engine / how it
  runs, what it works out, the single output doc + its B1-B4 shape,
  **adversarial review of B4/PRD content**, endpoint/orientation, produces/refuses,
  handoff stub.

## Locked decisions (do not relitigate)

- Four buckets, no fifth. Phases flow fluidly, not as rigid gates.
- **MYP strands are symmetric (verified against the design-cycle diagrams).**
  Each criterion's first three strands produce the fourth, which is the handoff
  artifact: A1 need + A2 research + A3 prior art -> **A4 Design Brief**; B1 spec +
  B2 ideas/prototype + B3 chosen/justified -> **B4 planning requirements / PRD
  export**. The back-and-forth is intrinsic to the structure (research feeds
  every strand; spec<->ideas interplay; a prototype can throw a question back to
  inquiry), not a caveat. See `SCRATCHPAD.md` "MYP Strand Structure" for the
  diagram.
- **Developing-ideas is one phase document, not a bundle of separate skills.**
  Outside skill/plugin groups are source evidence only. The phase doc owns B1-B4.
- **Design Brief vs developing-ideas — resolved, not competitors.** Design Brief
  = MYP A4, the *summary of the problem* (need + research + prior-art
  constraints), the what/why. Developing-Ideas = MYP B1-B4, the work of turning
  the brief into specifications, feasible ideas, a chosen design, and creation
  requirements. The PRD is the B4/export shape, not the whole phase document.
- **No hard gate — orientation instead.** The agent always knows which phase it
  is in and which artifact it is heading toward; when no *blocking* question
  remains it **offers** to synthesize that artifact rather than grilling forever.
  It offers; it does not block. (This replaces the earlier "endpoint gate"
  framing.)
- **`workflow-tracker.md`** is the always-on phase-state file (peer to
  `GLOSSARY.md`): current phase, current phase document, current criterion,
  likely next phase, looping-back flag, and linked artifacts. It makes the
  oscillation safe. NOT the `task_plan/progress/findings` triad.
- **Artifact spine (verified):** inquiry document -> developing-ideas document
  -> issue-tracker PRD/export -> issues -> review. Each phase owns ONE durable
  doc that is the next phase's input. **The documents ARE the cross-session
  memory;** the `handoff` skill is just glue.
- **B4/PRD synthesis is interview-free.** Shape (Matt `to-prd`): Problem /
  Solution / User Stories / Implementation Decisions / Testing Decisions / Out
  of Scope / Notes. B1-B3 produce the pieces; B4 is the synthesized creation
  requirements/export surface ("planning drawings" reinterpreted per task: API
  contracts, schema, test seams).
- `creating-solution` starts by decomposing the issue-tracker PRD/export or B4
  content into tracer-bullet vertical slices (Matt `to-issues`), each marked HITL
  or AFK.
- `GLOSSARY.md` is the always-on ubiquitous-language file (glossary only, no
  implementation detail). ADRs are sparse: hard-to-reverse + surprising + real
  trade-off.
- **Every steering artifact is untrusted until adversarial review:** parallel
  focused reviewers vs. an explicit criteria set; review-first, no silent edits;
  findings by severity with one must-address; a real gate; ~2 passes max.
- **Terminology:** use OUR names in product docs (Interview, GLOSSARY.md, Design
  Brief, PRD). Do NOT expose source-system names (Matt / VGV / Superpowers / ACT)
  in the doc body — attribution belongs in `NOTICE.md`.

## Traps that burned prior agents (the important part)

- **Do not rewrite docs wholesale or delete content the user liked.** Tighten in
  place; surface anything you cut. An earlier agent "replaced the draft" and lost
  trusted material — do not repeat that.
- **Do not lean on `r-and-d/`.** It is an all-over-the-place stale snapshot.
- **Do not reintroduce a `task_plan.md` / `progress.md` / `findings.md` triad.**
  That is planning-with-files, not ours. "Findings" live as the *body* of a phase
  doc, not a separate file.
- **No internal/process/cleanup talk in product docs.** Public-facing clarity.
- **Ground in REAL sources**, not memory or the R&D distillation.

## Method and tools that actually work here

- `web_search` has been failing. Use `webfetch` on **raw GitHub URLs** directly.
- Real source locations:
  - Matt Pocock (local): `~/.agents/skills/{grill-with-docs,grill-me,to-prd,to-issues,handoff,prototype}/SKILL.md`
  - ACT (local): `~/.agentic-coding-toolkit/skills/{act-workflow-spec,act-workflow-refine-spec,act-workflow-plan}/SKILL.md`
  - Superpowers: `https://raw.githubusercontent.com/obra/superpowers/main/skills/<name>/SKILL.md`
  - VGV Wingspan: `https://raw.githubusercontent.com/VeryGoodOpenSource/vgv-wingspan/main/skills/<name>/SKILL.md`
- **For developing-ideas specifically, read these sources** (the "develop the
  idea / shape the plan" analogs): VGV `brainstorm` / `refine-approach` /
  `plan-technical-review`, Superpowers `brainstorming`, Matt `to-prd` +
  `prototype`, ACT `act-workflow-spec` + `act-workflow-refine-spec`, and Codex
  Product Design `get-context` / `research` / `ideate` / `prototype` / `audit`.
  Use these as evidence for what the one phase doc tells the agent, not as
  separate product-facing skills.
- Subagent caveat: `run_subagent` selects a *profile*, not a model (you cannot pin
  a specific model like SWE-1.6). Read-only research = `subagent_explore`. Note
  subagents got sandbox-blocked reading `~/` paths and fell back to `r-and-d/`, so
  prefer fetching sources yourself (or request scope) rather than trusting a
  subagent's secondhand summary.

## Collaboration style the user expects

- **Shape, don't dump.** Treat the user's context as design direction that shapes
  the output, not verbatim text — unless they explicitly say "use these words."
- **Don't remove without flagging.** Always surface what you changed or cut.
- **Be objective.** Push back, verify against real sources, don't just agree.
- For this meta-work specifically: present synthesis and let the user sharpen.
  Expect misaligned pieces to drop as the design refines — that is intended.

## Open threads relevant to this phase

1. **Inquiry <-> Developing-Ideas oscillation — model decided, mechanics TBD.**
   No hard wall; `workflow-tracker.md` records position + loop-backs; the agent
   orients toward the target artifact. Still to write up: the concrete
   `prototype` jump-and-return (throwaway code answers one question, answer
   captured durably, prototype deleted). Mechanisms: Matt `handoff` + VGV
   clear-context handoff.
2. **Gate inventory — leaning soft.** Current direction is NO hard gate
   (orientation, not enforcement). Still to decide: whether ANY gate stays
   mandatory — likely only the pre-implementation one at the creating-solution
   boundary (Superpowers enforces an absolute pre-implementation gate even for
   "simple" work).
3. **Design-Brief vs PRD overlap — RESOLVED.** See Locked decisions. (Kept here
   only as a pointer; do not relitigate.)
4. **`workflow-tracker.md` scope — open.** Specify it inside the developing-ideas
   doc, or write it up separately as a cross-phase concept (it spans all four
   phases, like `GLOSSARY.md`)? Leaning cross-phase.
5. **Our own review criteria.** The adversarial reviewers need a named
   Structured-Workflow "engineering principles" set to judge against (the
   `@vgv-review-agent` equivalent). Likely an `ENGINEERING.md`. Park until
   `evaluating`.

## Research to delegate (read-only sub-agent tasks)

These are scoped so a cheaper agent can run them WITHOUT making product
decisions. Each returns a tight summary back to the user-facing agent, which does
the synthesis. Remind every sub-agent: **read real sources, do not lean on
`r-and-d/`, do not draft the README, do not expose source-system names** in any
proposed product text.

1. **The 2-3-approaches move.** Read VGV `plan` + `refine-approach`, Superpowers
   `brainstorming` (the "propose 2-3 approaches" + per-section approval steps).
   Return: how each generates/compares approaches, leads with a recommendation,
   and gates the choice. Map onto MYP B2 (ideas) -> B3 (chosen + justified).
2. **The prototype jump.** Read Matt `prototype` (local) + Superpowers
   `writing-plans`. Return: when a prototype is triggered, what it produces, how
   the answer is captured durably, and how the throwaway code is discarded. Tie
   to MYP B2's "Explore / Test / Gather feedback".
3. **PRD shape + B4 reinterpretation.** Re-read Matt `to-prd` (local). Return: the
   exact template, plus how "planning drawings / requirements for creation" (MYP
   B4) translates to software (API contracts, schema, test seams) — pull seam
   language from `to-prd` step 2.
4. **PRD adversarial review.** Read VGV `plan-technical-review` + ACT
   `act-workflow-refine-spec`. Return: reviewer lenses, the explicit criteria
   set, severity/must-address handling, and the bounded-iteration count — so the
   developing-ideas review section mirrors the inquiry-analysis one.

Source locations are in "Method and tools that actually work here" above.

## Done when

`skills/developing-ideas/README.md` exists, mirrors the inquiry-analysis doc's
voice and structure, defines one developing-ideas phase document organized by
B1-B4, treats B4 as the interview-free PRD/export content, places exploration,
testing, feedback, selected-design justification, and prototype-to-answer inside
that one phase doc, treats the inquiry<->developing-ideas boundary as
orientation (not a hard gate) backed by `workflow-tracker.md`, includes adversarial
review of B4/PRD content, and `SCRATCHPAD.md` stays the source of working notes.
