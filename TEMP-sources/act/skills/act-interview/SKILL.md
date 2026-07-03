---
name: act-interview
description: Resolve intent, language, constraints, and decision dependencies before writing a Spec. Use when the user invokes act-interview as the first workflow step.
argument-hint: "[request, idea, source file, or empty]"
tools: [Read, Glob, Grep, Edit, Write, AskUserQuestion, SlashCommand]
---

Interview the user until the request has shared language, clear intent, resolved decision dependencies, and enough product-contract detail to write a faithful Spec. Start by grounding the discussion in the project's domain model, then walk the product behavior tree one branch at a time.

Request input: $ARGUMENTS

## Interview Posture

Ask one question at a time. Prefix each user-facing question with `Question N:` and increment `N` through the interview. Wait for the answer before moving on.

For each question, give one recommended answer that is specific enough to become a Spec decision. Include exact labels, state transitions, output shapes, reset behavior, and negative requirements when they would prevent downstream ambiguity. Use bullets when the answer has multiple parts. Keep the reason concise. Mention trade-offs only when the choice would materially change the decision.

Use freeform questions during discovery. Save structured options for explicit checkpoints.

## Before Asking

Explore the current project and existing docs, so you do not ask what the project can answer.

Keep exploration targeted. Look for:

- `GLOSSARY.md` in the command working directory.
- Nearby feature code, tests, scripts, examples, or docs implied by the request.
- Places where the user's assumption appears to disagree with the code.

Read [glossary-docs.md](./references/glossary-docs.md) before editing glossary documents. Do not produce any other files, drafts, or work breakdowns. Do not proceed to implementation.

## Prioritize Questions

Ask questions in order of importance:

1. **Framing** - Resolves the domain concept, user-facing language, and intent
2. **Critical** - Blocks implementation or creates security/data risks
3. **Important** - Significantly affects UX or maintainability
4. **Nice-to-have** - Improves clarity but has reasonable defaults

**Guidelines:**

- Address real unknowns, not things already stated or inferable
- Offer a concrete recommended answer, and mention alternatives only when they materially affect the decision.
- Focus on decisions that would change the implementation
- Prefer product-contract questions over implementation-preference questions. Product-contract questions change observable behavior, inputs, outputs, state, errors, compatibility, or user expectations.
- Ask direction-setting choices before the Spec-ready checkpoint: decisions that would change dependencies, data model, API contract, test strategy, or overall implementation path.
- Make recommendations actionable: include exact terms, output shapes, commands, examples, or bullet lists when those details would prevent ambiguity in the Spec.
- Be specific: "What should happen when OAuth returns a 429?" not "What about errors?"

**Typical areas needing clarification:**

- Source-of-truth conflicts between prompt, code, docs, examples, schemas, fixtures, or data files
- Inputs, outputs, side effects, state transitions, ordering, idempotency, and persistence behavior
- Non-happy-path behavior and edge cases
- Contract details: names, formats, statuses, defaults, limits, validation rules, and compatibility boundaries
- Scope boundaries for implied behavior not backed by source material or requirements
- Integration requirements, dependencies, Test Seams, and verification expectations

## Challenge Language

Treat project vocabulary as part of the design, not a cleanup task after implementation details are settled.

When the request, code, scripts, examples, docs, or selected glossary document use competing words for nearby concepts, stop and ask which concept is canonical.

When the user uses vague or overloaded language, propose a sharper term before resolving downstream behavior.

When project-specific language is resolved as durable terminology, update the selected `GLOSSARY.md` immediately. Do not batch these updates. Read [glossary-format.md](./references/glossary-format.md) for the expected shape.

## Test Concrete Scenarios

Walk decisions through realistic examples. Prefer scenarios that expose boundaries, failure states, ownership, sequencing, and naming collisions.

If the code contradicts the plan, surface it directly.

Resolve dependency chains in order. If a naming decision affects storage, and storage affects migration behavior, settle the naming decision first.

Before stopping, silently audit for missed product decisions. If one unresolved observable behavior would likely cause rework or drift, ask it. If several remain, ask the highest-impact one first.

## Update Glossary Inline

`GLOSSARY.md` is a glossary, not a Spec or decision log.

Only capture stable, project-specific terminology. Define what the term means in this project, not the requirements, behavior, tests, or implementation connected to it.

Use `Terminology` for canonical words.

If the existing glossary uses a different structure, preserve it and make the smallest compatible terminology edit.

## Ready To Write The Spec

When framing, blocking ambiguities, direction-setting choices, and high-impact product-contract details appear resolved, present the same-session checkpoint from [summary-format.md](./references/summary-format.md). Include resolved product decisions, resolved technical/test decisions, and remaining non-blocking defaults. Do not suggest starting a new session at this point.

If the user asks for a summary, read [summary-format.md](./references/summary-format.md) and summarize without turning it into a Spec outline or implementation plan.

If the user asks to write the Spec before blockers are resolved, honor the request. Preserve unresolved blockers so the Spec can carry them forward as Blocking Questions.

If the user chooses `act-create-spec`, invoke it in the same session with the gathered interview context.
