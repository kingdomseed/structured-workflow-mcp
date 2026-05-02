# AI Collaboration Interview Guide

Date: 2026-05-02

## Purpose

This guide is for interviewing Jason about how he actually thinks and works when programming with AI. The goal is to turn implicit habits into explicit workflow rules, skill instructions, examples, and tests.

The interview should not try to force a generic engineering process onto the user. It should discover the user's actual cognitive workflow: what he notices, what he checks, what he fears, what makes him trust a result, and how he wants the model to stay in sync with him.

## Interview Principles

- Ask one main question at a time.
- Prefer concrete stories over abstract preferences.
- When possible, ask "tell me about the last time this happened."
- Capture exact phrases the user uses for workflow concepts.
- Distinguish what is always true from what depends on task risk.
- Separate "how I want the model to act" from "how I want to learn."
- Turn repeated answers into candidate skill rules.

## Session 1: Personal Programming Workflow

Goal: understand the user's natural problem-solving sequence.

Questions:

1. When you start a programming task, what do you usually do before touching code?
2. What do you look at first: files, docs, tests, app behavior, error output, diagrams, or something else?
3. How do you decide whether you understand enough to make a change?
4. What kinds of things do you keep in your head while programming?
5. What kinds of things do you need written down?
6. When you get confused, what is your personal recovery process?
7. What does "methodical" mean to you in practice?
8. What does a good programming partner do that a bad one does not?

Artifacts to capture:

- A step-by-step "Jason does this manually" sequence.
- Words the user uses for phases.
- Signals that mean "slow down."
- Signals that mean "go ahead and implement."

## Session 2: AI Failure Modes

Goal: identify the behaviors this system must prevent.

Questions:

1. What are the most frustrating mistakes AI models make in your codebases?
2. Which mistakes are annoying but recoverable?
3. Which mistakes destroy trust?
4. When a model "goes wild," what did it usually skip?
5. What does the model claim to know that it often has not actually checked?
6. When should the model stop and ask you instead of continuing?
7. What kinds of validation claims do you distrust?
8. What kinds of explanations help you learn versus just overwhelm you?

Candidate rule extraction:

- "Never do X without first checking Y."
- "If validation fails, do Z."
- "Ask me before X."
- "Do not ask me about Y if you can inspect it."

## Session 3: Shared Mind And Learning

Goal: define what "being of the same mind" means in a human-AI programming relationship.

Questions:

1. When you say you want to be of the same mind as the model, what would you see happening differently?
2. Do you want the model to narrate its process, create files, ask questions, or just behave differently?
3. When are you trying to learn, and when are you trying to ship?
4. How should the model adapt when you say "I don't fully understand this"?
5. How much should the model teach during implementation?
6. What kinds of explanations make object-oriented or architectural ideas click for you?
7. Where should the model preserve your thinking: chat, docs, specs, comments, diagrams, tests?
8. What should the model do when your intuition and the codebase disagree?

Artifacts to capture:

- Teaching mode rules.
- Shipping mode rules.
- Explanation style examples.
- "Same mind" definition.

## Session 4: Workflow Artifacts

Goal: decide which files should exist and what they should contain.

Questions:

1. Which previous workflow artifacts have actually helped you: specs, plans, findings, progress files, review reports, checklists?
2. Which artifacts became noise?
3. Where should workflow files live in a repo?
4. How long should they survive: forever, until merge, until feature complete, or archived?
5. Do you prefer one combined artifact or separate spec/plan/progress files?
6. What makes a plan usable for you?
7. What makes a plan unusable?
8. Should the plan be educational, operational, or both?

Candidate artifact model:

- `research.md`: facts discovered, with source paths.
- `spec.md`: what we intend to build and why.
- `plan.md`: ordered implementation tasks and validation.
- `progress.md`: current state and blockers.
- `review.md`: findings after implementation.

## Session 5: Skill And Hook Strictness

Goal: tune the system's forcefulness.

Questions:

1. When should the skill be strict?
2. When should it stay lightweight?
3. Which steps should be mandatory for every non-trivial programming task?
4. Which steps should only appear for high-risk work?
5. Would a hook that blocks edits before reading files feel helpful or annoying?
6. Would a hook that continues the turn when tests fail feel helpful or annoying?
7. What should happen if the model tries to finish without validation?
8. What should happen if the user explicitly says "just do it"?

Suggested strictness levels:

- Lightweight: orient, act, verify, report.
- Standard: orient, plan, work, validate, report.
- Strict: interview, spec, plan, work, review, validate, report.
- Debug: reproduce, trace, hypothesize, test, fix, verify.

## Session 6: Product Audience

Goal: understand who this is for beyond the user.

Questions:

1. Who else has the same problem you had in July 2025?
2. Is this for self-taught programmers, students, solo app builders, experts, or teams?
3. What would make this useful to someone with less programming confidence?
4. What would make it credible to an expert?
5. Is the product primarily a skill/plugin, an MCP server, a methodology, or a learning system?
6. What should the README promise?
7. What should it explicitly not promise?
8. What would a successful demo look like?

## Session 7: Evaluation

Goal: define tests for whether the workflow actually improves AI output.

Questions:

1. What old task would be a good benchmark?
2. What should the baseline model do wrong without the workflow?
3. What should the structured workflow model do better?
4. How should we grade audit quality?
5. How should we grade planning quality?
6. How should we grade implementation discipline?
7. How should we grade learning/collaboration quality?
8. What would count as failure even if the code works?

Candidate evaluation dimensions:

- Retrieval quality.
- Scope control.
- Existing-pattern reuse.
- Clarifying question quality.
- Plan usefulness.
- Test/validation behavior.
- Failure recovery.
- Final report honesty.
- User learning support.

## First Interview Script

Use this first if starting live with the user:

```text
I want to map how you actually think when programming, not impose a generic workflow.

Tell me about a recent task where AI either helped well or made a mess. What was the task, what did you expect it to do first, and what did it actually do?
```

Follow-ups:

```text
What would you have checked first if you were doing it yourself?
```

```text
At what point would you have felt comfortable changing code?
```

```text
What evidence would have made you trust the result?
```

```text
What should the model have written down so you could stay oriented?
```

## Output Format For Interview Notes

For each interview session, write notes like this:

```markdown
# Interview Notes: <topic>

Date:

## Raw Signals

- Exact phrase:
- Story:
- Pain point:
- Trust signal:

## Workflow Rules

- Rule:
- Applies when:
- Strictness:

## Skill Implications

- Add to:
- Trigger wording:
- Example:

## Open Questions

- Question:
```

## Candidate Skill Rules From Current Research

These are not final; validate them with the user.

- Prefer retrieval before advice when repo state matters.
- Ask only questions that cannot be answered by inspection.
- For fuzzy or personal workflow tasks, interview before planning.
- For implementation, make the first slice small and verifiable.
- If tests or lint fail, stop and fix before continuing.
- Do not claim completion without fresh validation evidence.
- Preserve the user's learning when they signal uncertainty.
- Use durable files when the task has multiple phases or should survive context loss.
- Use focused subagents for independent research/review, not full-history delegation.
- Use hooks for reminders and narrow guardrails, not broad pretend enforcement.
