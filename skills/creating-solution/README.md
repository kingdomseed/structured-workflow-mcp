# Creating-Solution

The third phase of the Structured Workflow design cycle. Creating-Solution turns
the PRD into a working solution — sliced into tracer-bullet issues, built
deliberately, and verified at the slice level — without re-opening the problem,
re-choosing the solution, or silently drifting from the plan.

## What this phase is for

The goal is to **build the chosen solution while preserving traceability**: take
the PRD handed over from Developing-Ideas, decompose it into a plan the agent can
follow, and create code that functions as intended.

This phase does **not** re-run the problem interview or re-choose the design —
those decisions are settled in the Design Brief and the PRD. It also does **not**
do deep evaluation or acceptance against the original criteria — that is the next
phase, Evaluating. Creating-Solution owns the build and the slice-level proof that
each piece works; the deeper verdict comes later.

The proof that the phase is progressing is a **working solution whose slices
build and function as intended**. The durable local artifact is the
**creating-solution document**, where the plan is refined and reviewed before it
becomes trackable work, and where any departure from the plan is later justified.

## The engine: follow the plan, building in verifiable vertical slices

Inquiry-Analysis runs on a problem interview; Developing-Ideas generates options
and chooses among them. Creating-Solution runs on a third engine — **decompose
the PRD into vertical slices and build them one at a time, verifying each** —
because it answers yet another kind of question: not *what is wrong* or *what
should we build*, but *how do we build it, in what order, and did each piece
actually work*.

Core moves of the engine:

- **Slice vertically, not horizontally.** Each slice is a tracer bullet that cuts
  through all layers and is demoable on its own — never a horizontal layer that
  only matters once everything else exists.
- **Choose the technical approach as part of planning.** Deciding which skills,
  conventions, tools, and methodology a slice needs is itself a planning act — it
  shapes the slices and can add new ones (such as a final end-to-end verification
  slice), so it is settled while slicing, not bolted on during the build.
- **Lead with the thinnest end-to-end slice.** Prove the path through the whole
  system first, then thicken it.
- **Label every slice human-ready or agent-ready.** HITL slices need human
  judgment before the agent proceeds; AFK slices are bounded enough to run
  unattended (the core "Working Together" distinction, doing real work here).
- **Refine locally, then publish.** Draft and review the slice breakdown in the
  creating-solution document first; only export it to the tracker once it passes.
- **Build, verify, commit, mark.** Build a slice end-to-end, verify at the slice
  level that it builds and works, commit it, and mark the issue complete — keeping
  the tracker reconciled with reality.
- **Justify every departure.** When evidence forces the agent over a wall or
  around a barrier, it records the change and the reason in the document rather
  than drifting silently.

## What the phase works out

The engine drives the four strands of MYP Criterion C. The first strands are
worked out in the creating-solution document; the build itself produces the code.

- **C1 — The plan.** Decompose the PRD into tracer-bullet vertical slices, drafted
  in the document so they can be refined and reviewed before becoming issues.
- **C2 — The technical approach.** Choosing the technical approach *is part of the
  planning*, not a separate step after it — C1 and C2 go back and forth. While
  slicing, the agent decides which engineering conventions apply (for example
  VGV's Flutter/Dart practices, or Vercel's TypeScript/React conventions), which
  tools the work needs (for example Patrol for end-to-end testing), and the
  methodology that carries the plan forward (for example TDD). That choice feeds
  back into the slices: it is attached to each issue so it says how it should be
  built, and it can **add slices** — for example, knowing the build needs a
  visual-validation artifact for a high confidence signal adds a final
  Patrol end-to-end slice to fully verify the result. We reference existing
  conventions here; a named principles document is deferred to Evaluating.
- **C3 — The build.** Follow the published slices: mark each issue in-progress,
  build it, verify it builds and functions at the slice level, commit, and mark it
  complete.
- **C4 — The justified changes.** When implementation departs from the PRD or
  Design Brief, record what changed and why — the agent's account of what it
  accomplished, how, and why it had to deviate.

## The creating-solution document

Creating-Solution produces **one durable local file**: the creating-solution
document. It is the staging and refinement surface for the plan, and it follows
the strands of MYP Criterion C.

```text
# Creating Solution: <solution>

## Slices             — the tracer-bullet vertical slices (C1), each demoable alone,
                        each labeled HITL or AFK
## Technical Approach  — conventions, tools, and methodology per slice (C2)
## Justified Changes   — departures from the PRD/Design Brief and why (C4),
                        filled in as the build proceeds
```

The **Slices** and **Technical Approach** sections are drafted and adversarially
reviewed here while they are still cheap to change, then **exported to the issue
tracker** (Matt Pocock `to-issues` style) as trackable, HITL/AFK-labeled work —
exactly how the PRD exports to the tracker. The live tracker issues are what the
build executes against. Granularity, dependencies, and ordering are settled in the
document, with the thinnest end-to-end slice first.

The **Justified Changes** section stays in the document and is filled as the build
proceeds — only when implementation uncovers something unexpected. If the build
follows the plan, there is little or nothing to write. Each entry is the agent's
honest report of going over a wall or around a barrier: what changed, why, how
(with links to the commits/slices), and a **confidence signal** (per the core
README) so a forced workaround is not mistaken for a verified decision. This is
the record of *why* the built thing differs from what was planned, and it travels
to Evaluating with the working solution.

Two things update alongside the build:

- **`GLOSSARY.md`** — kept current as implementation surfaces new shared terms.
  Glossary-only: no implementation detail.
- **`workflow-tracker.md`** — the always-on position file, updated as slices are
  built and whenever control loops back to an earlier phase.

## Evaluating the plan: adversarial review

Before the slice breakdown becomes trackable work, it is reviewed
**adversarially** — the same discipline applied to the Design Brief and the PRD,
moved to the moment it costs the least. It is reviewed while it is still a draft
in the document, before it is exported to the tracker, because a draft is far
cheaper to change than a board full of tickets.

How the review runs:

- **Spawn focused reviewers in parallel**, each judging the breakdown through one
  lens against explicit criteria.
- **Review first, edit never (silently).** The pass produces findings; it does not
  quietly re-slice the work.
- **Findings by severity**, with one prominent **must-address** item.
- **A gate, not a rubber stamp.** Blocking findings send the breakdown back before
  any issue is published or any code is written.
- **Bounded iteration** — after about two passes, complete or escalate rather than
  loop forever.

Criteria the breakdown is judged against:

- **Coverage** — every PRD requirement maps to a slice; nothing is dropped.
- **Verticality** — each slice is a tracer bullet through all layers, demoable on
  its own, not a horizontal layer.
- **Granularity** — slices are right-sized: small enough to build and verify,
  large enough to be meaningful.
- **Sequencing** — dependencies are sound and the thinnest end-to-end slice comes
  first.
- **Labels** — each slice is correctly marked HITL or AFK.
- **Technical approach** — conventions, tools, and methodology are named per slice
  and match what the codebase actually uses, and any verification slices the
  approach implies (for example an end-to-end run) are present.

## When the phase is done

The phase ends when:

- every PRD requirement is built into a slice that builds and functions as
  intended at the slice level,
- each slice is committed and marked complete on the tracker, and
- every departure from the plan is captured and justified in the document.

This is **orientation, not a hard gate**. The agent always knows it is building
toward a working solution, and verifies each slice as it goes rather than waiting
for a final wall. Deep review and acceptance against the original criteria are
deliberately deferred to Evaluating. Control can still flow back to
Developing-Ideas or Inquiry-Analysis when building exposes a flawed decision or a
missing branch of the problem — that loop-back is recorded in
`workflow-tracker.md`, not treated as failure.

## What it produces and refuses

**Produces:** the creating-solution document (slices, technical approach, and
justified changes), tracer-bullet issues exported to the tracker, working code and
tests, and `GLOSSARY.md` and `workflow-tracker.md` updates.

**Refuses:** re-opening the problem, re-choosing the solution, deep acceptance
review (that is Evaluating), exporting issues before the breakdown is reviewed, or
drifting from the plan without a justified change.

## Handoff

The **working solution** plus the **creating-solution document** (its justified
changes in particular) are the handoff to Evaluating, which verifies behavior and
reviews quality against the original criteria. The detailed mechanics of moving
between phases — including looping back when the build exposes a flawed decision —
are described separately.
