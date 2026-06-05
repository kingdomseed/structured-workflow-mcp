# Inquiry-Analysis

The first phase of the Structured Workflow design cycle. Inquiry-Analysis turns a
vague request into shared understanding of the problem — in clear, agreed
language — before any solution is designed or built.

## What this phase is for

The goal is for the human and the agent to reach shared understanding of the
problem, expressed in **ubiquitous language**: the same terms used consistently
by the human, the agent, the code, the tests, and every later artifact.

This phase does **not** choose or design a solution — that is the next phase,
Developing-Ideas. Inquiry-Analysis establishes the *need* and the *evidence base*
so that, whenever the work crosses into solution design, that phase can focus
entirely on the idea and never on re-learning the problem.

The proof that understanding is shared is the **Design Brief** — the section that
hands off to the next phase. Whether inquiry takes five minutes or weeks of
research, the phase is finished when that brief is trustworthy.

## The engine: a collaborative interview

Inquiry-Analysis is run as an **interview**, not a form to fill in. The interview
is the operating mode of the entire phase — the agent and human work through the
problem together rather than the agent guessing and presenting a finished answer.

Core moves of the interview:

- **One question at a time**, leading with a recommended answer.
- **Ground before asking.** If the codebase, docs, or issues can answer a
  question, the agent investigates instead of asking.
- **Walk the problem one branch at a time**, resolving dependent questions in
  order rather than keeping every thread open at once.
- **Challenge fuzzy language.** When a term is vague or overloaded, propose a
  precise, canonical one ("you said 'account' — the Customer or the User?").
- **Stress-test with scenarios** and against the real code, surfacing
  contradictions between what is said and what exists.

The conversation itself is volatile. Its durable residue is two things: resolved
terms in the glossary, and findings recorded in the inquiry document.

## What the interview works out

The interview drives three lines of inquiry. None of them is a separate step with
its own procedure — they are all worked out through the same loop above.

- **The need.** Who is affected, what is actually wrong, why now, and what
  success looks like. Vague problem statements are challenged until they are
  concrete.
- **The research.** The agent does the discovery itself — exploring the codebase,
  reading docs, gathering evidence — then brings findings back for the human to
  interpret and confirm. Agent-led discovery, validated by human judgment.
- **The prior art.** The agent surveys existing or similar solutions, in the repo
  or outside it, presents what it found, and the pair decides together what to
  borrow, avoid, or be constrained by. The agent proposes; the human judges.

## The inquiry document

Inquiry-Analysis produces **one durable file**: the inquiry document. It records
the inquiry step by step and ends with the Design Brief.

```text
# Inquiry: <problem>

## Need            — the problem, who it is for, and why it is worth solving
## Findings        — what was researched, discovered, and figured out
## Prior Art       — existing/similar solutions; what to borrow, avoid, constrain
## Design Brief    — the distilled summary of the findings and the justified need
```

The findings live as the **body** of the document — full traceability the next
agent can open when it needs the "why." The **Design Brief is the only section
handed to the next phase**; the rest does not need to be loaded into context by
default.

These update alongside the document:

- **`GLOSSARY.md`** — the shared vocabulary, updated inline the moment a term
  resolves. It is glossary-only: no implementation detail, no planning notes.
- **`workflow-tracker.md`** — the always-on position file, updated as the inquiry
  proceeds and whenever control loops back from a later phase.
- **Decision records** — created sparingly, only for choices that are hard to
  reverse, surprising without context, and the result of a real trade-off.

## Evaluating the Design Brief: adversarial review

Before the Design Brief is trusted downstream, it is reviewed **adversarially** —
the same discipline this workflow applies to plans and code, brought forward so
problems are caught before any solution is designed.

How the review runs:

- **Spawn focused reviewers in parallel**, each judging the brief through one
  lens against explicit criteria.
- **Review first, edit never (silently).** The review pass produces findings; it
  does not quietly rewrite the brief.
- **Findings by severity**, with one prominent **must-address** item.
- **A gate, not a rubber stamp.** Blocking findings send the work back into the
  interview; the brief is not downstream authority until it passes.
- **Bounded iteration** — after about two passes, diminishing returns; complete
  or escalate rather than loop forever.

Criteria the brief is judged against:

- **Clarity** — the problem statement is concrete, no vague hedging.
- **Completeness** — need, constraints, and known edge cases are present; open
  questions are flagged, not hidden.
- **Specificity** — concrete enough that the next phase can develop ideas from it.
- **Scope / YAGNI** — bounded, not speculative or over-ambitious.
- **Codebase alignment** — claims and assumptions match what the code actually
  does.
- **Language** — terms are used consistently with the glossary.
- **Unresolved blockers** — no blocking question is left buried as a "later."

## When the phase is done

The phase ends when:

- no blocking question remains,
- the Design Brief is review-ready and has passed adversarial review, and
- the shared language is settled in the glossary.

This is **orientation, not a hard gate**. The agent always knows it is heading
toward the Design Brief, and when the blocking questions thin out it *offers* to
synthesise the brief rather than interviewing forever. It offers; it does not
block. Control can still flow forward and loop back later when a downstream phase
exposes a missing branch of the problem — that loop-back is recorded in
`workflow-tracker.md`, not treated as failure.

It does not end "when it feels done," and unresolved questions are never parked
as a forgotten open-questions list — they are blockers that keep the interview
open or are explicitly narrowed.

## What it produces and refuses

**Produces:** the inquiry document (findings + Design Brief), `GLOSSARY.md`
updates, and sparse decision records.

**Refuses:** an implementation plan, issue slices, a chosen solution, any code, an
endless brainstorm log, or an open-questions graveyard.

## Handoff

The **Design Brief** is the handoff to Developing-Ideas. The detailed mechanics of
moving between phases — including looping back when a later phase exposes a
missing branch — are described separately.
