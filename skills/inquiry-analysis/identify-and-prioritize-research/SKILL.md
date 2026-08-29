---
name: identify-and-prioritize-research
description: Use when evidence is missing, assumptions need verification, research must be planned or delegated, or new findings reopen the inquiry.
---
# Identify and prioritize research

Update `workflow-tracker.md` to A2 before starting. Read the current inquiry document, request, glossary, project evidence, and existing research.

Prefer retrieval-led reasoning over training-led reasoning. Develop questions from the need, project review, authoritative external sources, contradictions, constraints, prior art, and gaps in current understanding. Invite the human to add, revise, remove, or reframe them.

## Build the research plan

Prioritize questions by how much their answers could change the justified need, Design Brief, or next useful move.

For each question, record:

- the question;
- why its answer matters;
- its priority and dependencies;
- the source type needed;
- the current answer and evidence;
- what remains unknown.

Use primary research for direct evidence from the people, project, tests, observations, or experiments involved. Use secondary research for official documentation, standards, papers, products, and industry analysis. Prefer the source that owns the fact.

## Run the research

Reuse the inquiry-wide subagent permission recorded by `$start-inquire-and-analyze`. If no permission is recorded and independent work can be parallelized, ask once.

After approval, fan out bounded research questions in parallel. Give each subagent the question, relevant context, source requirements, and expected output. Require concise findings with citations. Keep independent work moving while questions that depend on it wait.

Compare findings across sources. Resolve contradictions or record them clearly. Distinguish observed facts, supported inferences, human judgments, and unknowns when the difference matters. Cite every material finding and state where evidence is weak.

Bring findings to the human when their meaning or consequence requires judgment.

## Use experiments when evidence requires them

When a focused prototype would answer an important research question that available evidence or prior art cannot answer, offer a move to `$start-develop-ideas`, B2 — Develop feasible ideas. State the question and evidence needed before prototyping. Record the result as research evidence and project-created prior art. Then reassess the next useful direction with the human.

## Record the output

Write the **A2 — Identify and prioritize research** section of the inquiry document. Keep the prioritized questions, answers, citations, and remaining unknowns in the inquiry document.

A2 is complete when the important research is prioritized, the evidence needed for the Design Brief is recorded, and no known unanswered research question blocks Design Brief development.

Update `workflow-tracker.md` with the result, remaining questions, and recommended next move.
