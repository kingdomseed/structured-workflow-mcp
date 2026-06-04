# Structured Workflow

Structured Workflow is a small set of installable agent skills, companion
agents, and hooks for helping coding agents work through a clear design cycle:
understand the problem, shape options, build deliberately, and evaluate the
result.

This repo is not a source archive. It should contain the runtime assets that can
be installed into an agent harness, plus the minimum documentation needed to
explain how those assets fit together.

## What This Installs

The repo is organized around three agent-facing surfaces:

- `skills/` contains reusable `SKILL.md` workflows that can be discovered and
  installed by skill-aware agent systems.
- `agents/` contains subagent definitions for harnesses that support specialized
  agent roles.
- `hooks/` contains guardrails and automation hooks for harnesses that support
  execution-time checks.

The primary compatibility target for public distribution is the open agent
skills install flow:

```sh
npx skills add <owner>/<repo>
```

The skills registry is the narrowest shared install surface. Agents and hooks
are companion assets for harnesses that can use them directly.

## The Four Buckets

Structured Workflow uses four buckets adapted from the MYP Design Cycle. The
cycle is a useful fit because it treats design as an evidence-producing process,
not as a single implementation step.

### `inquiry-analysis`

Clarify the situation before choosing a solution.

Use this bucket for skills and agents that help define the problem, identify
stakeholders, gather context, inspect existing systems, compare examples, surface
constraints, and write the first design brief.

Typical outputs:

- problem statement
- research notes
- source inventory
- glossary or domain model
- initial success criteria

### `developing-ideas`

Turn understanding into options.

Use this bucket for skills and agents that help generate alternatives, compare
trade-offs, sharpen requirements, prototype directions, choose a path, and make
the plan legible before implementation begins.

Typical outputs:

- candidate approaches
- decision notes
- sketches or prototypes
- implementation plan
- issue breakdown

### `creating-solution`

Build the chosen solution while preserving traceability.

Use this bucket for skills and agents that help implement, coordinate changes,
keep work aligned with the plan, adapt when evidence changes, and record the
reason for meaningful deviations.

Typical outputs:

- working code or content
- changed files
- migration notes
- deviation log
- implementation evidence

### `evaluating`

Test the solution and decide what should happen next.

Use this bucket for skills and agents that help verify behavior, review quality,
compare outcomes against the original criteria, identify follow-up work, and
explain impact.

Typical outputs:

- test results
- review findings
- acceptance notes
- improvement list
- release or handoff summary

## Repository Shape

The intended public shape is:

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

Each installable skill should live in its own folder with a `SKILL.md` file.
The four bucket folders are organizational boundaries, not extra phases. A skill
belongs in the bucket where it primarily helps the agent make progress.

## What Belongs Here

Keep assets that are meant to be installed, reused, or cited by this project:

- authored Structured Workflow skills
- authored companion agents
- authored hooks
- concise docs explaining how the system is organized
- attribution and provenance for retained source material

## What Does Not Belong Here

Do not vendor broad upstream corpora or private inspiration sources into this
repo. External projects can inform the design, but copied bodies should not be
kept here unless they are intentionally retained, attributed, and licensed for
reuse.

In particular, this repo should not accumulate disposable research dumps, raw
source extracts, or copied skill bundles that can be pulled again from their
original upstream projects.

## Attribution

Attributions and retained source lineage should live in `NOTICE.md`. Each entry
should identify:

- the source project or author
- the retained file or idea
- the license or permission basis
- the specific Structured Workflow skill, agent, or hook that uses it

## Status

This repo is being rebuilt from a clean R&D archive into a publishable install
repo. The root should stay focused on the final public shape. Draft material,
contradictory notes, and recovery evidence belong outside the install surfaces
until they are deliberately promoted.

## References

- [IB: Design in the MYP](https://www.ibo.org/programmes/middle-years-programme/curriculum/design/)
- [IB MYP Design Subject Brief](https://www.ibo.org/globalassets/new-structure/brochures-and-infographics/pdfs/myp-brief_design_2015.pdf)
- [Design and Inquiry: MYP Design Cycle](https://sites.google.com/view/designandinquiry/myp-design)
- [vercel-labs/skills](https://github.com/vercel-labs/skills)
