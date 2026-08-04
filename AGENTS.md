# Structured Workflow

Structured Workflow is an evidence-producing design cycle for human-agent collaboration. It gives the work an opinionated direction while allowing the human and agent to follow new questions and discoveries wherever they lead.

## Start with the tracker

Open and update `workflow-tracker.md` before other workflow work. Record the current phase and criterion, the question that brought the work there, the active document, the target artifact, and the likely next move.

If Structured Workflow has not been initialized and the tracker or other required project files are missing, say what is missing and offer to initialize it.

Update the tracker whenever work changes criterion or phase. Keep findings in the phase documents; keep the tracker short and focused on position.

## Follow the design cycle

The default direction is A through D. A and B move through their criteria in number order. C begins with C1, demonstrates C2 while carrying out C3, and uses C4 when creation requires a design change. A full final evaluation moves through D1 to D4.

### A — Inquire and Analyze

1. **A1 — Explain and justify the need**
2. **A2 — Identify and prioritize research**
3. **A3 — Analyze prior art**
4. **A4 — Develop the Design Brief**

### B — Develop Ideas

1. **B1 — Develop design specifications**
2. **B2 — Develop feasible ideas**
3. **B3 — Present and justify the chosen design**
4. **B4 — Develop planning drawings and diagrams**

### C — Create Solution

1. **C1 — Construct a logical plan**
2. **C2 — Demonstrate technical skills**
3. **C3 — Follow the plan to create the solution**
4. **C4 — Justify changes to the design**

C1 translates the approved Spec into a logical implementation plan and tickets. C2 records skilled application during C3; it does not choose the technical approach. The chosen design and technical decisions come from Criterion B and the approved C1 plan.

### D — Evaluate

1. **D1 — Design testing methods**
2. **D2 — Evaluate the solution against the design specification**
3. **D3 — Explain how the solution could be improved**
4. **D4 — Explain the solution's impact**

Use the phase entry point to coordinate the work: `$start-inquire-and-analyze` for A, `$start-develop-ideas` for B, `$start-create-solution` for C, and `$start-evaluate` for D. Use the relevant criterion skill for criterion-specific work.

Use the phase and criterion names exactly as written above in the tracker, phase documents, tickets, and handoffs. Do not replace a full criterion name with shorthand such as “Need,” “Ideas,” or “Make it build-ready.”

## Move with the work

The default direction provides a useful place to start. It is not a rigid sequence or a set of gates.

The human and agent uncover the fog of war together. Neither should assume that the whole need, solution, or path is visible at the start. New evidence, ideas, prototypes, implementation discoveries, and evaluations may change what needs attention next.

Work can move in any direction to any criterion or phase that best answers the current question. Before moving, state:

- the question prompting the move;
- why the destination fits;
- the evidence, artifact, or decision the move should produce.

Update `workflow-tracker.md`, read the destination skill, make the move, and then reassess the next useful direction with the human. Return findings to the criterion that owns the affected understanding or artifact.

Evaluation is available throughout the cycle. Use it whenever an artifact, idea, plan, implementation, or claim needs an evidence-based judgment.

## Build trustworthy understanding

Prefer retrieval-led reasoning over training-led reasoning. Start with the project, its code or materials, direct human knowledge, and primary sources. Use external prior art and authoritative sources to widen the view beyond the project.

Cite material claims where they are recorded. Distinguish supported facts, human judgments, inferences, and unknowns when the difference affects the work. Mark unsupported points as inference or unknown.

Develop questions from the request, project evidence, relevant external sources, contradictions, constraints, and gaps in understanding. Explain why important questions matter. Invite the human to add, revise, remove, or reframe them.

## Work as collaborators

Start with an opinionated recommendation and explain it in plain language. The human chooses where their judgment, intent, priorities, or experience should direct the work. The agent leads retrieval, review, synthesis, question development, and other well-bounded work.

The balance may be even or mostly agent-led. Keep the human involved wherever their judgment could change the result.

Ask once whether subagents may be used for bounded independent work. After approval, reuse that permission while it remains in scope. Fan out research and review where parallel work will preserve context or improve coverage. Bring the combined findings, conflicts, and decisions back to the main collaboration.

## Keep the work durable

Each phase updates its authoritative document as findings settle. Use the configured project templates rather than inventing new document shapes.

Maintain `GLOSSARY.md` as the shared language of the work. When a term is unclear or conflicts with the project, explain the ambiguity, propose a precise meaning, test it against examples and project evidence, and record it once it settles.

Phase documents preserve the evidence and reasoning that later phases need. The issue tracker holds implementation tickets. `workflow-tracker.md` records position. Keep each responsibility in its assigned place.
