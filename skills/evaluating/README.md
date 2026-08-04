# Evaluate

Evaluate judges an exact artifact or solution against explicit criteria using
fresh evidence. It can review work during any phase and provides the final
release verdict after creation.

The phase entry point is [`$start-evaluate`](start-evaluate/SKILL.md).

## Criterion skills

1. [**D1 — Design testing methods**](design-testing-methods/SKILL.md) maps each
   criterion to a method capable of producing relevant evidence.
2. [**D2 — Evaluate the solution against the design specification**](evaluate-against-the-design-specification/SKILL.md)
   runs or inspects those methods and records a per-criterion result.
3. [**D3 — Explain how the solution could be improved**](explain-how-the-solution-could-be-improved/SKILL.md)
   derives precise improvements from demonstrated gaps and routes them to the
   criterion that owns the affected work.
4. [**D4 — Explain the solution's impact**](explain-the-solutions-impact/SKILL.md)
   compares intended and observed change for the client, audience, systems, and
   justified need.

## Durable artifact

The evaluation document accumulates entries. Each entry identifies the exact
artifact or version, criteria source, methods, evidence, results, limits, and
return destination. Intermediate reviews usually use D1 and D2, then send
findings back to the criterion that owns the artifact. A finished solution uses
D1 through D4.

D2 uses one evidence-status vocabulary:

- **verified**
- **partially verified**
- **failed**
- **not proven**
- **blocked**

The release decision is the workflow's hard gate. A solution is ready to ship
only when every required design specification and Definition of Done criterion
has passing evidence. Missing evidence remains not proven or blocked.

## Movement

Evaluation is available from any phase. Record the artifact, version, criteria,
current question, and return destination in `workflow-tracker.md` before
starting. Evaluation reports what the evidence supports; changes return to the
criterion that owns the affected understanding, design, plan, or implementation.
