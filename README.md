# Structured Workflow

Structured Workflow gives coding agents an evidence-producing design cycle for
working with humans. It provides a useful default direction while allowing the
work to follow new questions, ideas, prototypes, implementation discoveries, and
evaluation evidence wherever they lead.

The repository currently contains 20 skills: one parent and four criterion
skills for each of four phases. It also defines the durable project files that
preserve shared understanding and workflow position across sessions.

## The design cycle

New work normally moves from A through D. This direction helps the human and
agent begin without pretending the full problem or solution is already visible.
Work can move to any criterion or phase that best answers the current question.

### [A — Inquire and Analyze](skills/inquiry-analysis/README.md)

- A1 — Explain and justify the need
- A2 — Identify and prioritize research
- A3 — Analyze prior art
- A4 — Develop the Design Brief

The phase produces an approved Design Brief supported by inquiry evidence.

### [B — Develop Ideas](skills/developing-ideas/README.md)

- B1 — Develop design specifications
- B2 — Develop feasible ideas
- B3 — Present and justify the chosen design
- B4 — Develop planning drawings and diagrams

The phase produces an approved Spec that defines the chosen solution.

### [C — Create Solution](skills/creating-solution/README.md)

- C1 — Construct a logical plan
- C2 — Demonstrate technical skills
- C3 — Follow the plan to create the solution
- C4 — Justify changes to the design

The phase produces approved tickets, a working solution, verification evidence,
and justified changes.

### [D — Evaluate](skills/evaluating/README.md)

- D1 — Design testing methods
- D2 — Evaluate the solution against the design specification
- D3 — Explain how the solution could be improved
- D4 — Explain the solution's impact

The phase produces an evidence-backed verdict, improvements, and an impact
explanation.

The default direction inside A and B follows criterion order. Criterion C starts
with C1, demonstrates C2 while carrying out C3, and uses C4 when creation
requires a design change. A complete final evaluation follows D1 through D4.

Evaluation is also available throughout the cycle. A Design Brief, Spec, plan,
ticket set, prototype, implementation, or claim can be evaluated whenever the
work needs an evidence-based judgment.

## How artifacts develop

Each phase maintains one authoritative project document:

1. The **inquiry document** preserves A1–A4 evidence and produces the Design
   Brief.
2. The **developing-ideas document** preserves B1–B4 evidence and completes the
   Spec.
3. The **creating-solution document** preserves the logical plan, technical
   skills evidence, creation record, and justified changes. Approved
   implementation tickets live in the project's issue tracker.
4. The **evaluation document** accumulates reviews and final evaluation evidence.

The documents preserve the reasoning behind each handoff. A later phase can load
the approved artifact first and retrieve deeper evidence from the owning phase
document when needed.

## Durable project context

Structured Workflow uses a small set of project files to survive context loss:

- **`AGENTS.md`** contains the short, always-loaded workflow rules.
- **`workflow-tracker.md`** records the current phase, exact criterion, current
  question, active artifact, target result, and likely next move.
- **`GLOSSARY.md`** preserves the shared meaning of important project terms.
- **Phase documents** preserve findings, evidence, decisions, and uncertainty.
- **Project templates** define the document locations and reusable expectations,
  including the project's Definition of Done.

The tracker records position rather than findings. Research and reasoning belong
in the phase document that owns them. Implementation work belongs in the issue
tracker.

## Human-agent collaboration

Prefer retrieval-led reasoning over training-led reasoning. The agent begins with
the project, its code or materials, direct human knowledge, and primary sources.
Material claims are cited where they are recorded. Supported facts, human
judgments, inferences, and unknowns remain distinguishable.

The agent develops questions from the request, project evidence, industry
evidence, contradictions, constraints, and missing understanding. It leads
retrieval, review, synthesis, and other bounded work. The human directs intent,
priorities, values, and consequential choices. The balance can be even or mostly
agent-led, depending on the human and the work.

This evidence trail gives the human a concrete basis for inspecting the agent's
reasoning, evidence, and uncertainty.

## Repository status

The current repository includes:

- the always-loaded workflow rules in [`AGENTS.md`](AGENTS.md);
- four parent skills and sixteen criterion skills under `skills/`;
- four human-facing phase guides;
- a project-level [workflow tracker template](skills/workflow-management/workflow-tracker.md).

The following surfaces are still planned:

- project initialization and document templates;
- companion subagent definitions;
- continuity and guardrail hooks;
- packaged installation and update commands.

The skills can be inspected and tested now, but the repository does not yet
provide a complete installer. Projects using the workflow must currently place
the skills and project files through their agent harness's normal configuration
mechanism.

## Repository structure

```text
AGENTS.md
README.md
skills/
  inquiry-analysis/
    README.md
    start-inquire-and-analyze/
    explain-and-justify-the-need/
    identify-and-prioritize-research/
    analyze-prior-art/
    develop-design-brief/
  developing-ideas/
    README.md
    start-develop-ideas/
    develop-design-specifications/
    develop-feasible-ideas/
    present-and-justify-the-chosen-design/
    develop-planning-drawings-and-diagrams/
  creating-solution/
    README.md
    start-create-solution/
    construct-a-logical-plan/
    demonstrate-technical-skills/
    follow-the-plan-to-create-the-solution/
    justify-changes-to-the-design/
  evaluating/
    README.md
    start-evaluate/
    design-testing-methods/
    evaluate-against-the-design-specification/
    explain-how-the-solution-could-be-improved/
    explain-the-solutions-impact/
  workflow-management/
    workflow-tracker.md
```

The phase folders organize the skills; they are not additional workflow phases.
`workflow-management/` contains cross-phase project resources.

## Sources and acknowledgments

Structured Workflow adapts the four criteria of the
[IB MYP Design Cycle](https://www.ibo.org/programmes/middle-years-programme/curriculum/design/)
for human-agent software work.

The criterion structure was checked against the
[IB MYP Design Subject Brief](https://www.ibo.org/globalassets/new-structure/brochures-and-infographics/pdfs/myp-brief_design_2015.pdf)
and the diagrams published by
[Design and Inquiry](https://sites.google.com/view/designandinquiry/myp-design).

The workflow and skill design were informed by:

- [CodeWithAndreaPro/agentic-coding-toolkit](https://github.com/CodeWithAndreaPro/agentic-coding-toolkit)
- [VeryGoodOpenSource/vgv-wingspan](https://github.com/VeryGoodOpenSource/vgv-wingspan)
- [VeryGoodOpenSource/vgv-ai-flutter-plugin](https://github.com/VeryGoodOpenSource/vgv-ai-flutter-plugin)
- [mattpocock/skills](https://github.com/mattpocock/skills)
- [obra/superpowers](https://github.com/obra/superpowers)
- OpenAI's Product Design skill pack
- [Cline Memory Bank](https://docs.cline.bot/prompting/cline-memory-bank)
- [OthmanAdi/planning-with-files](https://github.com/OthmanAdi/planning-with-files)

The human-judgment and evidence-trace principles were also informed by Shaw and
Nave's research on
[cognitive surrender](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=6097646).
