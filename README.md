# Structured Workflow

Structured Workflow installs a design cycle into your coding agent — and a
durable memory that keeps the agent from losing its place in that cycle.

It ships as installable skills, companion agents, and hooks for agent
harnesses. Together they give an agent a clear way to move through a piece of
work: understand the problem, shape options, build deliberately, and evaluate
the result.

## One System, Two Aspects

Structured Workflow is a single idea with two inseparable parts.

**The workflow is the framework.** Real design work is a fluid motion between
phases — inquiry, ideas, building, evaluation — not a fixed sequence of steps.
The MYP Design Cycle describes that motion well, because it treats design as an
evidence-producing process rather than a single implementation step. This is the
high-level frame the agent works inside, for any project.

**Durable files are how the agent keeps track.** An LLM's context is volatile
memory: it compresses, drifts, and is eventually lost. So the agent's position
in the cycle — what it has learned, where it is, and where it is going next — has
to live somewhere durable. Structured Workflow keeps that in a small, fixed set
of files, and uses hooks to reconnect the agent to them as context shifts.

The cycle tells the agent where it is going. The files let it remember where it
is.

## The Workflow: Four Phases

Structured Workflow uses four phases adapted from the MYP Design Cycle. They are
a fluid motion, not rigid gates — a skill belongs to the phase where it most
helps the agent make progress.

### `inquiry-analysis`

Clarify the situation before choosing a solution.

Define the problem, identify stakeholders, gather context, inspect existing
systems, compare examples, surface constraints, and write the first design brief.

Typical outputs:

- problem statement
- research notes
- source inventory
- glossary or domain model
- initial success criteria

### `developing-ideas`

Turn understanding into options.

Generate alternatives, compare trade-offs, sharpen requirements, prototype
directions, choose a path, and make the plan legible before implementation
begins.

Typical outputs:

- candidate approaches
- decision notes
- sketches or prototypes
- implementation plan
- issue breakdown

### `creating-solution`

Build the chosen solution while preserving traceability.

Implement, coordinate changes, keep work aligned with the plan, adapt when
evidence changes, and record the reason for meaningful deviations.

Typical outputs:

- working code or content
- changed files
- migration notes
- deviation log
- implementation evidence

### `evaluating`

Test the solution and decide what should happen next.

Verify behavior, review quality, compare outcomes against the original criteria,
identify follow-up work, and explain impact.

Typical outputs:

- test results
- review findings
- acceptance notes
- improvement list
- release or handoff summary

## Durable Memory: The Working Files

Context is volatile, so the agent writes its working memory to a deliberately
small, fixed set of files. The set is bounded on purpose: tell an agent to "keep
notes" and it will sprawl into endless side documents. A small set keeps the
working memory coherent, and lets the agent answer — at any moment — what phase
it is in, why it is here, and where it is going next.

These files live in your project, not in this repo. Two artifacts anchor the
work beyond the working set:

- **Linear issues** are the task workspace — where work is organized and tracked
  at the project level.
- **`PRD.md`** is an output — the cleaned-up result of interviews and decisions,
  ready to be reviewed and broken into issues.

Hooks maintain continuity. They bring the current phase, prior context, and the
next action back into the agent's attention at the right moments, so the work
survives context loss.

The durable-files idea draws on two projects that treat the filesystem as the
agent's persistent memory: Cline's Memory Bank and Othman Adi's
planning-with-files.

## Working Together: Judgment and Confidence

Two principles govern how the agent and human collaborate inside every phase.
They are what keep the cycle a real collaboration rather than an agent narrating
its way to an answer the human rubber-stamps.

### Human-ready and agent-ready work

The workflow labels every handoff, decision, and proposed next step as one of two
kinds:

- **Human-ready** work needs human judgment before the agent proceeds — choosing
  among viable approaches, approving a direction, accepting a trade-off or risk,
  confirming scope, or deciding whether a prototype's answer is good enough.
- **Agent-ready** work can proceed unattended because its inputs, constraints,
  success criteria, and verification path are already clear — research, codebase
  inspection, drafting from approved material, running checks, or slicing an
  approved PRD into issues.

This keeps the agent from treating human judgment as an implementation detail,
and keeps the human out of the loop for work that is already well bounded.

### Confidence over fluent certainty

An agent can be wrong *fluently* — stating a weak inference with the same polish
as a verified fact, which invites the human to accept it with too little
scrutiny. The workflow counters this by requiring the agent to say how much to
trust each meaningful claim, recommendation, and handoff artifact:

- **High** — grounded in current repo evidence, direct sources, passing
  verification, or explicit human confirmation.
- **Medium** — plausible synthesis from partial evidence; enough to proceed, and
  easy to revise.
- **Low** — weak evidence, missing sources, unresolved ambiguity, or inferred
  intent that needs verification before downstream work relies on it.

When confidence is not high, the agent names the specific weak point and asks the
human to verify it — the claim, its source, and why verification is needed —
rather than burying uncertainty in prose. Uncertainty becomes a collaboration
point instead of a hidden risk.

## What This Installs

The repo is organized around three agent-facing surfaces:

- `skills/` — reusable `SKILL.md` workflows, discoverable and installable by
  skill-aware agent systems, grouped under the four phases.
- `agents/` — subagent definitions for harnesses that support specialized roles.
- `hooks/` — guardrails and continuity hooks for harnesses that support
  execution-time checks.

The primary distribution target is the open agent skills install flow:

```sh
npx skills add <owner>/<repo>
```

The skills registry is the narrowest shared install surface; agents and hooks
are companion assets for harnesses that can use them directly.

## Repository Shape

```text
skills/
  inquiry-analysis/
  developing-ideas/
  creating-solution/
  evaluating/

agents/
  inquiry-analysis/
  developing-ideas/
  creating-solution/
  evaluating/

hooks/
```

Each installable skill lives in its own folder with a `SKILL.md` file. The four
phase folders are organizational boundaries, not extra phases.

## Attribution

Retained source lineage lives in `NOTICE.md`. Each entry identifies:

- the source project or author
- the retained file or idea
- the license or permission basis
- the Structured Workflow skill, agent, or hook that uses it

## References

- [IB: Design in the MYP](https://www.ibo.org/programmes/middle-years-programme/curriculum/design/)
- [IB MYP Design Subject Brief](https://www.ibo.org/globalassets/new-structure/brochures-and-infographics/pdfs/myp-brief_design_2015.pdf)
- [Design and Inquiry: MYP Design Cycle](https://sites.google.com/view/designandinquiry/myp-design)
- [Cline Memory Bank](https://docs.cline.bot/prompting/cline-memory-bank)
- [Othman Adi: planning-with-files](https://github.com/OthmanAdi/planning-with-files)
- [vercel-labs/skills](https://github.com/vercel-labs/skills)
