# Evaluating

The fourth phase of the Structured Workflow design cycle — and the one the agent
can return to from any other phase. Evaluating tests a piece of work against the
criteria it is meant to meet, gathers evidence, and delivers an honest verdict:
is this good enough to build on, or to ship?

## What this phase is for

The goal is to judge the current state against the criteria that define success,
back the judgement with evidence, and decide what happens next — proceed, fix, or
loop back.

This phase is unusual among the four. It is both the **last phase** — the deep
evaluation of the finished solution — and a **reusable engine** the agent points
at earlier artifacts whenever one of them must be trusted before the work moves
on: the Design Brief, the Spec, or the issue breakdown. The adversarial review the
other three phase docs describe *is* this engine, invoked at their boundary. So
evaluating is the most load-bearing piece of the cycle: every other phase produces
an artifact, and this is what makes any of them trustworthy.

This phase does **not** build or change the solution — that is Creating-Solution.
It does **not** re-open the problem or re-choose the design. It tests what already
exists and reports the verdict; the fixing happens back in the phase that owns the
work.

The proof that the phase is doing its job is a **falsifiable verdict** — each
criterion marked against real evidence and rolled into a result the team can act
on. The deepest application is the built solution; the same discipline applies to
every earlier artifact.

## The engine: test against the criteria, deliver an evidence-backed verdict

Inquiry-Analysis runs on a problem interview; Developing-Ideas generates options
and chooses among them; Creating-Solution follows the plan in slices. Evaluating
runs on a fourth engine — **gather evidence and judge against an explicit,
pre-stated set of criteria** — because it answers a different question again: not
*what is wrong*, *what should we build*, or *how do we build it*, but *did this
actually meet what it was supposed to, and how do we know?*

Core moves of the engine:

- **Name the criteria first, from the source of truth.** A verdict is only as
  honest as the bar it is measured against, so the criteria are stated before the
  testing — the original need from the Design Brief, the success criteria and
  testing decisions from the Spec, the issue acceptance, and the project's
  Definition of Done.
- **Design methods that actually generate the evidence.** Choose the tests and
  checks that will produce data about each criterion, rather than asserting a
  result from memory.
- **Compare the artifact to the criteria — both must be present.** If the
  source-of-truth criteria or the thing being judged cannot be opened, run, or
  compared, the result is **blocked**, not "passed."
- **Mark each criterion honestly:** verified, likely, not proven, or failed.
  Missing evidence is never recorded as a pass — it is an unproven criterion.
- **Roll up to one verdict:** pass, pass-with-warnings, or fail. A fail names the
  single most important thing that must change. This is the **confidence signal**
  (per the core README) applied to the whole solution.

## What the phase works out

The engine drives the four strands of MYP Criterion D. Pointed at the finished
solution it runs all four; pointed at an earlier artifact — a Brief, a Spec, the
issues — it runs the first two and stops, because that artifact has no "impact"
to measure yet.

- **D1 — The testing methods.** Decide how the work will be proven, and why those
  methods. For a document, the methods are the review lenses and codebase checks;
  for the built solution, they are the actual tests — unit, integration,
  end-to-end, smoke, and manual checks — and the artifacts they produce (results,
  screenshots, transcripts). The testing plan is **not invented here from
  scratch**: it has been accruing since the Spec's testing decisions and the
  verification slices planned during Creating-Solution. Evaluating consolidates
  and executes it.
- **D2 — The evaluation.** Run the methods, gather the evidence, and judge the
  result against the criteria and the Definition of Done. This is the **deep
  acceptance that Creating-Solution deliberately deferred** — not slice-level "it
  builds," but "it meets what we set out to do." The output is the per-criterion
  verdict.
- **D3 — The improvements.** From the gaps D2 exposes, state concretely how the
  solution could be improved — follow-up work, known limitations, deferred scope.
- **D4 — The impact.** Whether the solution meets the justified need from the
  Design Brief, and what actually changed for the client or audience.

## The evaluation document

Evaluating produces **one durable file**: the evaluation document. Unlike the
other phase documents it is not written once — it **accumulates an entry each time
evaluation is invoked**, so it becomes the running record of what was tested, why,
and how it came out, across the whole cycle.

```text
# Evaluation Log: <project>

## <state> — <date>        e.g. Design Brief / Spec / issues / built solution
   Criteria            — what this state is judged against (its source of truth)
   Testing methods     — how it was tested, and why those methods (D1)
   Evidence & verdict  — findings + per-criterion result, honest about confidence (D2)
   Improvements        — gaps and follow-up (D3)         [fullest at the build]
   Impact              — effect on the justified need (D4)   [build only]
```

Each invocation appends one entry. The **built-solution** entry is the full D1-D4
application; earlier entries lean on criteria, methods, and the evidence/verdict.

At the build, the criteria come in **two levels, and a failure at either level is
a failure**:

- **The Definition of Done** — the standing bar that applies to every cycle in the
  project (for example: generated code regenerated, formatting complete, checks
  and tests green). It is carried in from the project's template, so the agent
  starts already knowing what "done" means.
- **The Spec / issue-level success criteria** — this cycle's own bar, inherited
  from the Design Brief's justified need and decomposed to the issues.

These update alongside the document:

- **`GLOSSARY.md`** — kept current if evaluation surfaces a term that needs
  pinning down. Glossary-only: no implementation detail.
- **`workflow-tracker.md`** — the always-on position file, updated as evaluation
  runs and whenever a verdict sends control back to an earlier phase.

## Adversarial review: this phase is the engine

The "adversarial review" the other three phase docs apply to the Design Brief, the
Spec, and the slice breakdown is **this phase, invoked at their boundary**. It is
the same discipline everywhere it runs:

- **Spawn focused reviewers in parallel**, each judging through one lens against
  explicit criteria.
- **Review first, edit never (silently).** The pass produces findings; it does not
  quietly rewrite the work.
- **Findings by severity**, with one prominent **must-address** item.
- **A gate, not a rubber stamp.** Blocking findings send the work back to the phase
  that owns it.
- **Bounded iteration** — after about two passes, complete or escalate rather than
  loop forever.

The engine also keeps **itself** honest, which is why its verdict can be trusted:
a result is never "passed" without evidence, missing evidence is blocked rather
than waved through, and a weak inference is marked as such instead of dressed up
with the same polish as a verified fact.

## When the phase is done — and the one hard gate

For most of its uses, evaluating ends on **orientation**, like the other phases:
pointed at a Brief or a Spec, it surfaces the verdict and the must-address item, and
the human decides whether to proceed or loop back. It offers; it does not block.

But evaluating owns the framework's **one hard gate: shipping**. The solution does
not ship while any stated criterion — Definition of Done or Spec/issue-level — is
failing. That is a real, mechanical refusal, not an offer. This is the single place
orientation gives way to enforcement, and deliberately so: everywhere else a wrong
call is cheap to revise, but shipping a build that fails its own criteria is the
expensive mistake the whole cycle exists to prevent.

As the last phase, its endpoint is twofold: the **verdict and ship** (the impact
delivered to the client), or a **loop back** — D3 improvements and any failed
criteria can seed a new cycle. Either way the move is recorded in
`workflow-tracker.md`; the cycle closes or restarts, it does not dead-end.

## What it produces and refuses

**Produces:** the evaluation document (testing methods, evidence, verdict,
improvements, and impact), a falsifiable per-criterion verdict against the original
criteria and the Definition of Done, and `GLOSSARY.md` and `workflow-tracker.md`
updates.

**Refuses:** building or changing the solution (that is Creating-Solution),
re-opening the problem or re-choosing the design, declaring "passed" without
evidence, recording missing evidence as a pass, or shipping while a stated
criterion is failing.

## Handoff

As the final phase, the handoff is twofold: the **verdict and ship** to the
human or client when the criteria are met, or a **loop back** to the phase that
owns the work when evaluation exposes a failed criterion or a missing branch of
the problem. When evaluating is invoked mid-cycle on an earlier artifact, control
returns to that phase with the verdict in hand. The detailed mechanics of moving
between phases — including the loop-back recorded in `workflow-tracker.md` — are
described separately.
