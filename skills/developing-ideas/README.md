# Developing-Ideas

The second phase of the Structured Workflow design cycle. Developing-Ideas turns
a trustworthy understanding of the problem into one chosen, planned solution —
ready to be built — without re-opening the problem and without starting to build.

## What this phase is for

The goal is to move from *need* to *solution*: take the Design Brief handed over
from Inquiry-Analysis and work out what a good solution must achieve, what the
solution could be, which option to commit to, and what is required to create it.

This phase does **not** re-run the problem interview — that work is done, and its
result is the Design Brief. It also does **not** write the solution; building
belongs to the next phase, Creating-Solution. Developing-Ideas occupies the space
between: it is where options are generated, compared, and resolved into a single
direction with enough definition that implementation can proceed.

The proof that the phase is finished is the completed **Spec** — the Design Brief
carried forward and expanded with the specifications, selected direction,
planning documents, and prototype evidence needed to create the chosen solution.
Whether developing the ideas takes one pass or several rounds of prototyping, the
phase is finished when that Spec is trustworthy.

## The engine: generate options, then choose against criteria

Inquiry-Analysis runs on a problem interview. Developing-Ideas runs on a
different engine — **generate feasible options and decide among them against
explicit criteria** — because it answers a different *kind* of question. Inquiry
asks problem-space questions (who is this for, what is wrong, why now);
Developing-Ideas asks solution-space questions (what must a solution achieve,
what could it be, which one, and how).

Core moves of the engine:

- **Set the success criteria first.** Translate the Design Brief into explicit,
  testable criteria a solution must meet. These are what every option is later
  judged against.
- **Generate two or three concrete approaches**, each with its trade-offs, and
  lead with a recommendation. Prefer boring, existing patterns; right-size the
  design; apply YAGNI to keep options grounded.
- **Decide against the criteria, not by taste.** The chosen approach is justified
  by how it meets the success criteria — not asserted.
- **Prototype to answer, not to build.** When an approach cannot be judged in the
  abstract, jump to a throwaway prototype that answers one question, capture the
  answer durably, and discard the prototype. The decision survives; the code does
  not.

Questioning still happens, but it is directed at solution choices — confirming a
direction, resolving a remaining trade-off — never at re-understanding the
problem.

## What the phase works out

The engine drives three lines of work. None is a separate procedure; they are the
solution-space strands that feed the output document.

- **The success criteria.** What a good solution must do, measured concretely
  enough that an option can be judged against it. Drawn from the Design Brief and
  the research behind it.
- **The feasible ideas.** A small set of real candidate approaches — explored,
  sketched, and where useful prototyped and tested — presented clearly enough
  that others can weigh them.
- **The chosen design.** One direction, selected and justified fully against the
  success criteria. Choosing among viable approaches is **human-ready** work — it
  needs human judgment before the agent proceeds — so the agent recommends and
  the human chooses.

The two cross-phase principles apply throughout: choosing an approach is
**human-ready** work, while generating options and drafting from approved
material is **agent-ready**; and every recommendation carries a **confidence
signal** so a fluent option is not mistaken for a verified one. Both are defined
in the core README ("Working Together: Judgment and Confidence").

## The developing-ideas document

Developing-Ideas produces **one durable file**: the developing-ideas document. It
follows the four strands of MYP Criterion B, starts from the Design Brief, and
completes the Spec.

```text
# Developing Ideas: <solution>

## Design Brief           — the inquiry handoff that starts the Spec
## Design Specifications  — the success criteria a solution must meet
## Feasible Ideas         — candidate approaches, trade-offs, prototypes
## Chosen Design          — the selected direction, justified against the criteria
## Planning Documents     — diagrams, contracts, models, or prototype files as needed
## Spec                   — the completed requirements for creating the chosen solution
```

The middle sections are the body — the reasoning a later agent can open when it
needs the "why" behind the choice. The **completed Spec is the section handed to
the next phase**; the supporting material does not need to be loaded into context
by default unless the build needs it.

The final Spec section is **interview-free synthesis**: by the time it is written
the decisions already exist, so it is composed from what is known, not gathered by
re-asking. It carries the solution-defining content — Problem, Solution, User
Stories, Implementation Decisions, Testing Decisions (including the test seams),
Out of Scope, and Notes. Creating-Solution begins by decomposing the completed
Spec into issues; Developing-Ideas does not write tracker issues.

These update alongside the document:

- **`GLOSSARY.md`** — the shared vocabulary, kept current as solution terms
  resolve. Glossary-only: no implementation detail.
- **`workflow-tracker.md`** — the always-on position file, updated as the work
  moves through the strands and whenever control loops back to Inquiry.
- **Decision records** — created sparingly, only for choices that are hard to
  reverse, surprising without context, and the result of a real trade-off.

## Evaluating the Spec: adversarial review

Before the Spec is trusted downstream, it is reviewed **adversarially** — the same
discipline applied to the Design Brief, brought forward so problems are caught
before any code is written.

How the review runs:

- **Spawn focused reviewers in parallel**, each judging the Spec through one lens
  against explicit criteria.
- **Review first, edit never (silently).** The review pass produces findings; it
  does not quietly rewrite the Spec.
- **Findings by severity**, with one prominent **must-address** item.
- **A gate, not a rubber stamp.** Blocking findings send the work back into the
  engine; the Spec is not downstream authority until it passes.
- **Bounded iteration** — after about two passes, diminishing returns; complete
  or escalate rather than loop forever.

Criteria the Spec is judged against:

- **Clarity** — the chosen solution is stated concretely, no vague hedging.
- **Completeness** — criteria, chosen design, implementation and testing
  decisions, and out-of-scope are present; open decisions are flagged, not hidden.
- **Specificity** — concrete enough that the next phase can slice and build from
  it.
- **Scope / YAGNI** — the solution is right-sized, not speculative or
  over-ambitious.
- **Criteria alignment** — the chosen design is justified against the success
  criteria, not by preference.
- **Codebase alignment** — implementation and test-seam decisions match what the
  code actually does.
- **Language** — terms are used consistently with the glossary.

## When the phase is done

The phase ends when:

- one design is chosen and justified against the success criteria,
- the Spec is review-ready and has passed adversarial review, and
- no blocking decision remains.

This is **orientation, not a hard gate**. The agent always knows it is heading
toward the Spec, and when the open decisions thin out it *offers* to synthesise
the Spec rather than generating options forever. It offers; it does not block.
Control can still flow back to Inquiry-Analysis when developing the ideas exposes
a missing branch of the problem — that loop-back is recorded in
`workflow-tracker.md`, not treated as failure.

## What it produces and refuses

**Produces:** the developing-ideas document (specifications, feasible ideas,
chosen design, and the Spec), `GLOSSARY.md` and `workflow-tracker.md` updates, and
sparse decision records.

**Refuses:** re-running the requirements interview, writing the solution, slicing
the work into issues (that is Creating-Solution), an endless options log, or
building from a Design Brief with no chosen direction.

## Handoff

The **Spec** is the handoff to Creating-Solution, which begins by decomposing it
into tracer-bullet vertical slices. The detailed mechanics of moving between
phases — including the prototype jump and looping back to Inquiry — are described
separately.
