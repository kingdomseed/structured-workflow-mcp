---
name: start-inquire-and-analyze
description: Start or coordinate Criterion A from an initial request through an approved Design Brief using four criterion skills, retrieval-led reasoning, shared language, and fluid movement across the design cycle. Use to enter, resume, or revisit Inquire and Analyze.
---
# Start Inquire and Analyze

## Start with the tracker

Ensure Structured Workflow has been initialized. If its project files are missing, tell the human what is unavailable and offer to initialize it.

Open and update `workflow-tracker.md` before other inquiry work. Record the current phase and criterion, the question that brought the work here, the active document, the target artifact, and the likely next move.

Read the workflow configuration, project inquiry template, `GLOSSARY.md`, current inquiry document, and relevant project sources.

Prefer retrieval-led reasoning over training-led reasoning. Ground material claims and recommendations in the project, primary sources, and direct human knowledge. Cite their sources. Mark unsupported points as inference, judgment, or unknown.

## Orient the inquiry

Criterion A has four callable criterion skills:

1. **A1 — Explain and justify the need:** `$explain-and-justify-the-need`
2. **A2 — Identify and prioritize research:** `$identify-and-prioritize-research`
3. **A3 — Analyze prior art:** `$analyze-prior-art`
4. **A4 — Develop the Design Brief:** `$develop-design-brief`

Start a new inquiry with A1, then move through A2, A3, and A4. This is the opinionated default direction. Explain why the next criterion fits before entering it.

The human and agent are uncovering the fog of war together: neither can see the whole inquiry at the start. As questions and evidence change what is understood, work can move in any direction to any other criterion or phase that best fits the current need. A later discovery may reopen work that appeared settled.

Before changing criterion or phase, state:

- the question prompting the move;
- why the destination fits;
- the evidence, artifact, or decision it should produce.

Update `workflow-tracker.md`, make the move, then reassess the next useful direction with the human. Read the destination phase's parent skill or phase document when leaving Criterion A.

## Coordinate the collaboration

Develop the initial inquiry questions from the request, project evidence, relevant external sources, contradictions, constraints, and current understanding. Explain why each important question belongs. Invite the human to add, revise, remove, or reframe questions.

Work in rounds. Research relevant questions based on the context and your understanding of what the user wants. Include file search and web search where appropriate. Group questions that can be answered without depending on another unanswered question. Number them, explain unfamiliar language, and recommend an answer when evidence supports one. Use open questions for the human's intent, priorities, and values.

Let the balance fit the collaboration. Lead retrieval, review, synthesis, and question development. Keep the human involved where their knowledge or judgment changes the result.

Ask once near the start whether subagents may be used throughout the inquiry. After approval, keep using them for bounded independent work without asking for each dispatch. Fan out retrieval, project review, research, and prior-art work in parallel. Require concise findings with citations. Compare the results, resolve conflicts, and keep human judgment in the main conversation.

Build shared language throughout every criterion. When a term is unclear or conflicts with the project, explain the ambiguity, propose a precise term, test it with a scenario, check it against the project, and update `GLOSSARY.md` when it settles. Keep the glossary focused on meaning.

## Run the criteria

Invoke only the criterion skill needed for the current question. Give it the current inquiry document, tracker position, relevant evidence, and settled language.

Each criterion skill updates its section of the inquiry document and reports:

- what it established;
- the evidence and confidence behind it;
- remaining questions;
- its recommended next move.

Record the result in `workflow-tracker.md`. A later finding may reopen any criterion.

## Complete Criterion A

Use `$develop-design-brief` when the first three criteria appear sufficient to support a Design Brief. That skill asks the human whether they are ready to write the Design Brief together, have the agent draft it, or continue the inquiry.

The Design Brief is a trusted Criterion A artifact when A1 through A4 are complete, its material claims are supported, no known blocking question remains, and the human approves it.

Recommend `$start-develop-ideas` when shaping the solution is the next useful work. Keep the full inquiry document available whenever another phase needs its evidence and reasoning.
