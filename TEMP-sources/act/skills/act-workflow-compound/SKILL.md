---
name: act-workflow-compound
description: Capture high-value session insights into reusable documentation under ai_docs/solutions
argument-hint: "[optional context, title hint, or file paths]"
tools: [Read, Write, Glob, Grep, Task, AskUserQuestion, Bash]
---

<objective>
Capture the most valuable insights from the current coding session and save them as a reusable reference in `ai_docs/solutions/`.

This skill is workflow-agnostic. It should work after feature delivery, refactors, bug fixes, migrations, reviews, or free-form diagnostics.

Focus on transferable learning, not a full transcript.

Input: $ARGUMENTS
</objective>

<workflow>

<step_1_collect_context>
Gather context from the current session and optional command arguments.

1. Parse `$ARGUMENTS` as optional hints:
   - title hint
   - work type hint (feature/refactor/bug/perf/etc.)
   - relevant file paths
   - links or identifiers (PR, issue, spec, plan)

2. If arguments include readable file paths, load them with Read.

3. Use lightweight codebase checks only when needed:
   - Glob/Grep to confirm referenced files or symbols
   - Read only files required to avoid incorrect claims

4. If critical context is missing, ask at most one targeted question using AskUserQuestion:
   - header: "Missing context"
   - question: "What is the most important outcome this session achieved?"
   - options:
     - "New capability delivered"
     - "Bug or failure resolved"
     - "Refactor or architecture improvement"
     - "Investigation and key findings"

Do not run a long interview. Default to reasonable inferences from available context.
</step_1_collect_context>

<step_2_parallel_extraction>
Extract insights in parallel when beneficial.

Use Task subagents (general or explore) for focused workstreams:

- Session Outcome Extractor: what changed and why it matters
- Decision and Tradeoff Extractor: choices made, alternatives rejected
- Reuse Extractor: patterns, heuristics, pitfalls, and checks useful in future sessions

If Task is unnecessary for a small session, perform extraction directly.
</step_2_parallel_extraction>

<step_3_synthesize>
Synthesize findings into a compact, reusable artifact.

Required content:

- concise summary of what was accomplished
- key insights that transfer to future work
- concrete references (files, commands, checks, or docs) when available

Optional content (include only if relevant):

- decisions and tradeoffs
- failure modes or pitfalls encountered
- validation strategy and confidence level
- follow-up ideas or unresolved questions

Avoid rigid templates and avoid timeline-style narration unless it adds value.
</step_3_synthesize>

<step_4_path_and_naming>
Save under `ai_docs/solutions/` with category + slug naming.

1. Pick a category from this lightweight set:
   - `feature-delivery`
   - `bug-fixes`
   - `refactors`
   - `performance`
   - `testing`
   - `tooling`
   - `architecture`
   - `investigations`
   - `cross-cutting`

2. Determine whether a numeric work-item prefix should be preserved:
   - If the session is based on a spec/plan file named like `XXX-some-slug-spec.md` or `XXX-some-slug-plan.md`, carry `XXX-` into the output filename.
   - Treat `XXX` as the leading numeric token from the source file (for example `001`, `042`, `123`).
   - If no such source file is present, do not add a prefix.

3. Build file path:
   - default: `ai_docs/solutions/<category>/<slug>.md`
   - with preserved prefix: `ai_docs/solutions/<category>/<XXX>-<slug>.md`

4. If `ai_docs/solutions/` or the category folder does not exist, create it:

```bash
mkdir -p ai_docs/solutions/<category>
```
</step_4_path_and_naming>

<step_5_write_document>
Write a markdown document with minimal frontmatter and flexible body.

Frontmatter fields:

```yaml
---
title: <short descriptive title>
date: <YYYY-MM-DD>
work_type: <feature|bugfix|refactor|perf|investigation|other>
tags: [<tag1>, <tag2>, <tag3>]
confidence: <high|medium|low>
references: [<optional paths/links>]
---
```

Body guidance:

- Include `## Summary` and `## Reusable Insights`
- Add other sections only when helpful (for example: `## Decisions`, `## Pitfalls`, `## Validation`, `## Follow-ups`)
- Keep it scannable and practical for future sessions
- Prefer specific guidance over generic advice
</step_5_write_document>

<step_6_report>
Return:

- saved file path
- one-line description of what future sessions can reuse from this note

Do not include unnecessary commentary.
</step_6_report>

</workflow>

<quality_bar>
The output is good if a future session can answer quickly:

- What was learned?
- Why did this approach work?
- What should be repeated or avoided next time?
- Where are the concrete references?

If those answers are not obvious in under one minute, improve the note before finishing.
</quality_bar>
