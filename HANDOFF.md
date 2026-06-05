# Handoff — Next Phase: Evaluating

Transient doc. Delete once `skills/evaluating/README.md` exists and this
context is absorbed. (Same disposability as `SCRATCHPAD.md`.)

## Orientation (read this first)

Structured Workflow is an install repo of skills / agents / hooks that gives a
coding agent the MYP design cycle — **inquiry-analysis -> developing-ideas ->
creating-solution -> evaluating** — backed by durable file memory and continuity
hooks. We are shaping it **one phase at a time, docs first**.

`inquiry-analysis`, `developing-ideas`, and `creating-solution` are DONE:
`skills/{inquiry-analysis,developing-ideas,creating-solution}/README.md`. **Your
job: shape `evaluating` the same way** — a self-contained phase README that
mirrors the existing phase docs' structure and voice.

## Current situation (read second)

`skills/creating-solution/README.md` is **WRITTEN** (drafted 2026-06-05). Its
decisions are captured in `SCRATCHPAD.md` "Creating-Solution (Criterion C)
decisions". Key points: Criterion C breaks the A/B symmetry (real product is code
+ tests), but it still keeps **one durable local doc — the creating-solution
document** — which stages the C1 slices + C2 technical approach, is adversarially
reviewed locally *before* the slices are exported to the tracker as HITL/AFK
issues, and into which **C4 justified changes fold**. C3 builds against the live
tracker issues; verification at slice level only ("it builds and works"), with
deep review deferred to evaluating.

`skills/developing-ideas/README.md` and the `workflow-management/workflow-tracker.md`
starter template are also written. The two cross-phase principles
(human-ready/agent-ready and confidence signaling) live in the core README as
"Working Together: Judgment and Confidence".

What a follow-up agent should do next: (1) shape `skills/evaluating/README.md`
(MYP Criterion D); (2) the named review-criteria question is now **resolved — there
is NO `ENGINEERING.md`** (killed as a holdover). The criteria the cross-phase
reviewers judge against live **inside the evaluation system itself**, and the
*standing* engineering criteria live in a per-project **Definition of Done**
carried by a customizable project template; (3) flesh out `workflow-tracker.md`
usage and the prototype jump-and-return mechanics (still TBD).

**Major reframe (user, 2026-06-05): evaluation is a cross-phase engine, not just
the terminal phase.** It is jumpable from any phase to evaluate the current state
(Design Brief / PRD / issues / built solution). The per-phase "adversarial review"
sections in the other three docs are *invocations of this one engine*. It owns ONE
**accumulating evaluation document** that records what was tested and why at each
state. See `SCRATCHPAD.md` "Evaluating (Criterion D) analysis" for the full,
current decisions — that section supersedes anything below that conflicts.

The "Research to delegate" section below is scoped for the evaluating phase. The
earlier developing-ideas/creating-solution research is complete and its findings
live in `SCRATCHPAD.md`.

## Read these, in order

1. `README.md` — product framing. The core idea: one system, two aspects — the
   MYP cycle (the framework) and durable files (how an LLM keeps its place).
2. `skills/inquiry-analysis/README.md` — the finished template phase doc.
   **Mirror its shape and voice.** Also read `skills/developing-ideas/README.md`
   and `skills/creating-solution/README.md` (the two newer siblings) so the
   evaluating doc stays consistent with all three.
3. `SCRATCHPAD.md` — working notes: source-ingredient research, the verified
   cross-phase artifact flow, the adversarial-review concept, and open threads.

**Ignore `r-and-d/` entirely** — stale, contradictory, out of scope. Ignore
`mp_transcript.md` unless you specifically want Matt Pocock's raw framing.

## Your task

Write `skills/evaluating/README.md`:

- **Input:** the working solution plus the creating-solution document (its
  justified changes in particular), handed off from creating-solution.
- **Output:** the evaluation — test results, review findings, and a verdict
  against the *original* success criteria (from the Design Brief and the PRD), plus
  follow-up work and impact. **Durable shape is resolved: ONE accumulating
  evaluation document** (an entry per evaluation event, recording what was tested
  and why + the verdict), not a thinner artifact.
- This phase follows MYP Criterion D order: D1 design the testing methods -> D2
  test the solution and evaluate it against the design specifications -> D3
  explain how the solution could be improved -> D4 explain the solution's impact
  on the client/audience. Reinterpret per software task.
- Mirror the existing phase docs' sections: what it's for, the engine / how it
  runs, what it works out, the durable output, **adversarial review**,
  endpoint/orientation, produces/refuses, handoff stub.
- **Named review-criteria — RESOLVED: no `ENGINEERING.md`.** The reviewers judge
  against criteria that live inside the evaluation system: document-quality lenses
  for the Brief/PRD/issues, plus, for the built solution, the **two-level criteria**
  — the per-project **Definition of Done** (from the project template) and the
  **PRD/issue-level** success criteria. See SCRATCHPAD "Two levels of criteria +
  per-project templates" and "Open thread #5 ... KILLED".

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
- **Criterion C breaks the A/B symmetry, but still keeps one durable local doc.**
  Real product is code + tests. The **creating-solution document** stages C1
  (Slices) + C2 (Technical Approach), is adversarially reviewed locally *before*
  the slices are exported to the tracker, and **C4 Justified Changes folds into
  that same doc** (the agent's account of departures from the PRD/Design Brief,
  with confidence). C3 builds against the live tracker issues; **verification is
  slice-level only ("it builds and works") — deep review/acceptance is deferred to
  evaluating.** A named `ENGINEERING.md` is also deferred to evaluating.
- **C1 <-> C2 interleave: choosing the technical approach IS planning.** Deciding
  which skills/conventions/tools/methodology a slice needs (e.g. TDD, VGV layered
  architecture, Patrol for E2E) is itself a planning act — it is attached to each
  issue *and can add slices* (e.g. a final Patrol E2E slice to produce the
  visual-validation artifact needed for a high confidence signal). The
  slice-breakdown review checks that any verification slices the approach implies
  are present. See `SCRATCHPAD.md` "MYP Strand Structure" (the diagram now
  includes the C strands and this C1<->C2 loop).
- **Evaluation is a cross-phase engine (Criterion D is its fullest use).** The
  agent jumps to it from any phase to judge the current state against its criteria;
  the per-phase adversarial-review sections are invocations of it. It owns ONE
  **accumulating evaluation document** that shows what was tested and why at each
  state. It is the most critical piece of the framework.
- **No `ENGINEERING.md`.** Criteria live inside the evaluation system. The standing
  engineering criteria are a per-project **Definition of Done** carried by a
  customizable project template; cycle-specific criteria come from the Brief/PRD/
  issues. We capture **both** levels.
- **Ship is the one hard gate.** The framework cannot ship while any stated
  criterion (project DoD *or* PRD/issue level) is failing — a real, mechanical
  refusal. Everywhere else evaluation is advisory: it surfaces the Fail + the one
  must-address item and the human decides (orientation, consistent with the other
  phases).
- **Per-project templates** are user-owned and customizable; every new design cycle
  is seeded from them, so the standing Definition of Done rides along automatically.
  Exact template mechanics are TBD; the DoD-in-template decision is firm.
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
- **For evaluating specifically, read these sources** (the "test / verify /
  review / judge" analogs): Cursor Team Kit `verify-this` + `control-cli` +
  `control-ui` (falsifiable verdicts, evidence harness), `run-smoke-tests`,
  `review-and-ship`, `thermo-nuclear-code-quality-review`; Codex Product Design
  `design-qa` + `audit` (compare built result to the source-of-truth, mark
  passed/blocked, tie findings to evidence); VGV `plan-technical-review` (parallel
  named reviewers) for the adversarial-review criteria set; ACT
  `act-workflow-refine-spec` for the review discipline. Use these as evidence for
  what the one phase doc tells the agent, not as separate product-facing skills.
  (The earlier developing-ideas/creating-solution source research lives in
  `SCRATCHPAD.md` "Developing-Ideas Research Evidence".)
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
2. **Gate inventory — RESOLVED.** Exactly one hard gate: **ship**. The framework
   cannot ship while any stated criterion (project DoD or PRD/issue level) is
   failing. Every other boundary stays soft (orientation, not enforcement),
   including creating-solution's "review before issues are published." Do not
   relitigate.
3. **Design-Brief vs PRD overlap — RESOLVED.** See Locked decisions. (Kept here
   only as a pointer; do not relitigate.)
4. **`workflow-tracker.md` scope — RESOLVED.** It is cross-phase, peer to
   `GLOSSARY.md`. Starter template at `workflow-management/workflow-tracker.md`.
   Still TBD: flesh out its usage narrative and the prototype jump-and-return
   mechanics (see thread #1).
5. **Our own review criteria — RESOLVED (no `ENGINEERING.md`).** The criteria live
   inside the evaluation system; the standing engineering criteria are a per-project
   **Definition of Done** in a customizable project template, joined by the
   PRD/issue-level criteria. Do not create a separate principles file. See
   SCRATCHPAD "Two levels of criteria + per-project templates".

## Research to delegate (read-only sub-agent tasks)

**Status: largely DONE this session.** The evaluating sources were read directly
(ACT `act-meta-audit-work` + `act-workflow-refine-spec` + `act-workflow-work`,
Codex `design-qa`, VGV `plan-technical-review`); findings are synthesized in
SCRATCHPAD "Evaluating (Criterion D) analysis". The tasks below remain as the
record of what was covered.

These are scoped so a cheaper agent can run them WITHOUT making product
decisions. Each returns a tight summary back to the user-facing agent, which does
the synthesis. Remind every sub-agent: **read real sources, do not lean on
`r-and-d/`, do not draft the README, do not expose source-system names** in any
proposed product text.

1. **The verification harness.** Read Cursor Team Kit `verify-this` +
   `control-cli` + `control-ui` + `run-smoke-tests`. Return: how each drives the
   built solution, captures evidence (transcripts/screenshots/profiles), and
   produces a falsifiable verdict. Tie to MYP D1 (design the testing methods) and
   D2 (test the solution).
2. **Source-of-truth comparison.** Read Codex Product Design `design-qa` +
   `audit`. Return: how the built result is compared to the original
   criteria/visual truth, how findings tie to evidence, and the passed/blocked
   gate. Map onto D2 (evaluate against the design specifications).
3. **The named review-criteria set (`ENGINEERING.md`).** Read VGV
   `plan-technical-review` + the `@vgv-review-agent` "Very Good Engineering"
   notion + ACT `act-workflow-refine-spec`. Return: the explicit criteria each
   reviewer judges against, so we can draft our own named principles set the
   cross-phase adversarial reviewers reference (open thread #5).
4. **Improvement + impact framing.** Read VGV `review-and-ship` / shipping skills
   and any retro/impact patterns. Return: how solutions are judged for follow-up
   work and client/audience impact. Map onto D3 (improvements) and D4 (impact).

Source locations are in "Method and tools that actually work here" above.

## Done when

`skills/evaluating/README.md` exists, mirrors the existing phase docs' voice and
structure, and defines evaluating as a **cross-phase engine** (jumpable from any
phase to judge the Design Brief / PRD / issues / built solution) whose fullest use
is MYP Criterion D (D1 testing methods -> D2 test + evaluate against the design
specifications -> D3 improvements -> D4 impact). It evaluates against the *original*
success criteria from the Design Brief and PRD plus the project **Definition of
Done**, owns ONE **accumulating evaluation document** (what was tested and why +
verdict per state), carries the cross-phase adversarial-review treatment, makes
**ship the one hard gate** (no shipping while any stated criterion fails) while
keeping every other boundary soft (orientation, backed by `workflow-tracker.md`),
and **introduces no `ENGINEERING.md`** (criteria live in the engine + the
per-project DoD template). `SCRATCHPAD.md` stays the source of working notes.
