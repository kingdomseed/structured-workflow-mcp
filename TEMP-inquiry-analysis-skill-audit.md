# Inquiry-Analysis Skill Audit

Re-verified 2026-07-03 against the fresh source staging under `TEMP-sources/`
(see `TEMP-sources/INVENTORY.md` for pinned versions). Every entry in the
Skills, Hooks, and Subagents sections below cites a `TEMP-sources/` path and
was read in full for this pass. Long-tail source packs were not re-verified;
their prior entries are preserved unchanged in the final section.

## Bucket Definition

Inquiry-Analysis includes skills that help the agent clarify the situation before
choosing a solution: define the problem, identify stakeholders, gather current
context, inspect existing systems, compare examples, surface constraints, resolve
language, and produce a trustworthy Design Brief. It should not choose the
solution, build code, slice issues, or run final acceptance; those belong to
Developing-Ideas, Creating-Solution, or Evaluating. The interview is the engine
of the phase; the Design Brief is where it ends.

## Skills

| Source Pack | Skill | Source (TEMP-sources path + pin) | Recommendation | Confidence |
| --- | --- | --- | --- | --- |
| Matt Pocock skills | grilling | `TEMP-sources/mattpocock-skills/skills/productivity/grilling/SKILL.md` @ `272f99b` | adapt | high |
| Matt Pocock skills | domain-modeling | `TEMP-sources/mattpocock-skills/skills/engineering/domain-modeling/SKILL.md` @ `272f99b` | adapt | high |
| Matt Pocock skills | research | `TEMP-sources/mattpocock-skills/skills/engineering/research/SKILL.md` @ `272f99b` | adapt | high |
| Matt Pocock skills | grill-me | `TEMP-sources/mattpocock-skills/skills/productivity/grill-me/SKILL.md` @ `272f99b` | reference | high |
| Matt Pocock skills | grill-with-docs | `TEMP-sources/mattpocock-skills/skills/engineering/grill-with-docs/SKILL.md` @ `272f99b` | reference | high |
| Matt Pocock skills | ubiquitous-language | `TEMP-sources/mattpocock-skills/skills/deprecated/ubiquitous-language/SKILL.md` @ `272f99b` | reference (deprecated upstream) | medium |
| Matt Pocock skills | diagnosing-bugs | `TEMP-sources/mattpocock-skills/skills/engineering/diagnosing-bugs/SKILL.md` @ `272f99b` | reference | medium |
| Matt Pocock skills | wayfinder | `TEMP-sources/mattpocock-skills/skills/in-progress/wayfinder/SKILL.md` @ `272f99b` | reference | low |
| ACT | act-interview | `TEMP-sources/act/skills/act-interview/SKILL.md` @ 1.0.0 | adapt | high |
| ACT | act-interview-flutter | `TEMP-sources/act/skills/act-interview-flutter/SKILL.md` @ 1.0.0 | reference | medium |
| ACT | act-workflow-spec | `TEMP-sources/act/skills/act-workflow-spec/SKILL.md` @ 1.0.0 | reference (deprecated upstream) | high |
| Codex Product Design | get-context | `TEMP-sources/product-design-0.1.47/skills/get-context/SKILL.md` @ 0.1.47 | adapt | high |
| Codex Product Design | research | `TEMP-sources/product-design-0.1.47/skills/research/SKILL.md` @ 0.1.47 | reference | high |
| Codex Product Design | user-context | `TEMP-sources/product-design-0.1.47/skills/user-context/SKILL.md` @ 0.1.47 | reference | medium |
| Codex Product Design | audit | `TEMP-sources/product-design-0.1.47/skills/audit/SKILL.md` @ 0.1.47 | reference | medium |
| VGV Wingspan | brainstorm | `TEMP-sources/vgv-wingspan/skills/brainstorm/SKILL.md` @ `7691c77` | reference | medium |
| VGV Wingspan | debrief | `TEMP-sources/vgv-wingspan/skills/debrief/SKILL.md` @ `7691c77` | reference | medium |
| VGV AI Flutter Plugin | accessibility | `TEMP-sources/vgv-ai-flutter-plugin/skills/accessibility/SKILL.md` @ `d513aac` | reference | medium |
| Superpowers | brainstorming | `TEMP-sources/superpowers/skills/brainstorming/SKILL.md` @ v6.1.1 `d884ae0` | reference | medium |
| Superpowers | systematic-debugging | `TEMP-sources/superpowers/skills/systematic-debugging/SKILL.md` @ v6.1.1 `d884ae0` | reference | medium |

### Matt Pocock skills / grilling

- Belongs in: inquiry-analysis
- Source: `TEMP-sources/mattpocock-skills/skills/productivity/grilling/SKILL.md` @ `272f99b`
- Recommendation: adapt
- Why it belongs here: This is the extracted interview engine that `grill-me` and
  `grill-with-docs` now merely invoke. Its text is exactly our Interview's core
  moves: interview relentlessly until shared understanding, walk each branch of
  the design tree resolving dependent decisions one by one, one question at a
  time with a recommended answer, explore the codebase instead of asking when it
  can answer, and do not proceed until shared understanding is confirmed. Adapt
  it with the target retargeted from "plan or design" to the Design Brief.
- Confidence: high

### Matt Pocock skills / domain-modeling

- Belongs in: inquiry-analysis
- Source: `TEMP-sources/mattpocock-skills/skills/engineering/domain-modeling/SKILL.md` @ `272f99b`
- Recommendation: adapt
- Why it belongs here: It is the active language discipline the Interview runs
  on: challenge terms against the existing glossary, sharpen fuzzy or overloaded
  language with a proposed canonical term, stress-test relationships with
  concrete edge-case scenarios, cross-reference the user's claims with what the
  code actually does, update the glossary inline the moment a term resolves, and
  offer decision records only when a choice is hard to reverse, surprising
  without context, and a real trade-off. That is our GLOSSARY.md and sparse
  decision-record behavior, stated almost verbatim. It absorbs the old
  `ubiquitous-language` and much of what `grill-with-docs` used to add.
- Confidence: high
- Please verify: The file-layout mechanics (`CONTEXT.md`, `CONTEXT-MAP.md`,
  `docs/adr/`, the `CONTEXT-FORMAT.md` and `ADR-FORMAT.md` references) are
  durable-artifact plumbing; confirm whether workflow-management wants to own
  the glossary/decision-record file formats while inquiry-analysis owns the
  challenge-and-sharpen behavior.

### Matt Pocock skills / research

- Belongs in: inquiry-analysis
- Source: `TEMP-sources/mattpocock-skills/skills/engineering/research/SKILL.md` @ `272f99b`
- Recommendation: adapt
- Why it belongs here: New skill this pass. It dispatches a background agent to
  investigate a question against primary sources only (official docs, source
  code, specs, first-party APIs), follow every claim back to the source that
  owns it, and write a single findings file citing each claim's source. That is
  agent-led discovery producing evidence-backed Findings for the inquiry
  document, with the citation discipline the Design Brief needs to be
  trustworthy.
- Confidence: high

### Matt Pocock skills / grill-me

- Belongs in: inquiry-analysis
- Source: `TEMP-sources/mattpocock-skills/skills/productivity/grill-me/SKILL.md` @ `272f99b`
- Recommendation: reference
- Why it belongs here: Formerly the main interview candidate (old audit: adapt).
  The fresh file is a one-line user-invoked wrapper: "Run a `/grilling`
  session." All the substance moved to `grilling`, which this audit adapts.
  Keep `grill-me` only as a reference for the wrapper pattern (a user-facing
  trigger name over a model-invocable engine).
- Confidence: high

### Matt Pocock skills / grill-with-docs

- Belongs in: inquiry-analysis
- Source: `TEMP-sources/mattpocock-skills/skills/engineering/grill-with-docs/SKILL.md` @ `272f99b`
- Recommendation: reference
- Why it belongs here: Formerly adapt. The fresh file is one line: "Run a
  `/grilling` session, using the `/domain-modeling` skill." Its old content
  (glossary challenge, ADRs-as-you-go) now lives in `domain-modeling`. Keep it
  as a reference for the composition pattern — interview engine plus language
  discipline run together — which is exactly how our Interview phase composes.
- Confidence: high

### Matt Pocock skills / ubiquitous-language

- Belongs in: inquiry-analysis
- Source: `TEMP-sources/mattpocock-skills/skills/deprecated/ubiquitous-language/SKILL.md` @ `272f99b`
- Recommendation: reference (deprecated upstream)
- Why it belongs here: Formerly adapt. Upstream moved it to `deprecated/`; its
  live successor for the challenge-and-capture behavior is `domain-modeling`.
  The deprecated file still holds the best concrete glossary output format in
  any source pack: grouped term tables with "aliases to avoid," relationships
  with cardinality, flagged ambiguities, and an example dialogue between dev
  and domain expert. Reference it when designing GLOSSARY.md's shape; do not
  adopt its batch "extract from the conversation at the end" model, which
  domain-modeling explicitly replaced with inline updates.
- Confidence: medium

### Matt Pocock skills / diagnosing-bugs

- Belongs in: inquiry-analysis
- Source: `TEMP-sources/mattpocock-skills/skills/engineering/diagnosing-bugs/SKILL.md` @ `272f99b`
- Recommendation: reference
- Why it belongs here: Successor to the old `diagnose` (confirmed by content: a
  phased diagnosis loop). For bug-shaped inquiries, its Phase 1–2 discipline —
  build a tight red-capable feedback loop before theorizing, reproduce, then
  minimise until every remaining element is load-bearing — is the strongest
  "define the real problem with evidence" method in the source packs. Phases
  3–6 (hypothesise, instrument, fix, cleanup) are fixing work; their primary
  home is Creating-Solution, which should own this skill overall.
- Confidence: medium

### Matt Pocock skills / wayfinder

- Belongs in: inquiry-analysis
- Source: `TEMP-sources/mattpocock-skills/skills/in-progress/wayfinder/SKILL.md` @ `272f99b`
- Recommendation: reference
- Why it belongs here: New, in-progress upstream. It charts a fog-wrapped idea
  as a shared map of investigation tickets (research, prototype, grilling,
  task) and resolves them one per session until "the way to the goal is clear."
  The fog-of-war idea — don't chart what you can't yet phrase as a sharp
  question — is a useful model for multi-session inquiries whose open questions
  outlive one context window. Its substance, though, is tracker mechanics
  (claiming, blocking edges, frontier queries, decision index), so
  workflow-management is the likely primary owner if it is promoted at all.
- Confidence: low
- Please verify: It sits in `in-progress/` upstream and is not promoted there;
  confirm whether Structured Workflow wants to borrow from an unfinished skill,
  and whether workflow-management claims it.

### ACT / act-interview

- Belongs in: inquiry-analysis
- Source: `TEMP-sources/act/skills/act-interview/SKILL.md` @ 1.0.0
- Recommendation: adapt
- Why it belongs here: The strongest new inquiry candidate this pass, replacing
  the old `act-workflow-spec` entry. It is a pure interview skill with an
  explicit stop line — "Do not produce any other files, drafts, or work
  breakdowns. Do not proceed to implementation." Its moves map onto ours nearly
  one-to-one: one numbered question at a time with a specific recommended
  answer; explore the project first "so you do not ask what the project can
  answer"; a question priority ladder (framing, critical, important,
  nice-to-have); challenge competing vocabulary and update `GLOSSARY.md`
  immediately, keeping it "a glossary, not a Spec or decision log"; walk
  concrete scenarios that expose boundaries and failure states; resolve
  dependency chains in order; and end at a readiness checkpoint rather than a
  hard gate. Adapt the question-prioritization ladder, the product-contract
  framing, and the silent end-of-interview audit for missed decisions; drop the
  ACT-specific handoff into `act-create-spec` (Spec completion is
  Developing-Ideas' job) and the summary/ledger reference formats, which feed
  ACT's Spec storage.
- Confidence: high

### ACT / act-interview-flutter

- Belongs in: inquiry-analysis
- Source: `TEMP-sources/act/skills/act-interview-flutter/SKILL.md` @ 1.0.0
- Recommendation: reference
- Why it belongs here: A thin overlay that runs `act-interview` with a
  Flutter/Dart question pack (navigation states, loading/empty/error/offline
  states, exact labels, test seams, accessibility), and a firm ordering rule:
  no technology questions until shared language and durable terminology
  conflicts are resolved. Structured Workflow is tech-agnostic, so don't copy
  the Flutter content; reference the pattern of layering a domain-specific
  question pack over a core interview without disturbing its order.
- Confidence: medium

### ACT / act-workflow-spec

- Belongs in: inquiry-analysis (historical entry)
- Source: `TEMP-sources/act/skills/act-workflow-spec/SKILL.md` @ 1.0.0
- Recommendation: reference (deprecated upstream)
- Why it belongs here: Formerly adapt (with a caveat the old audit flagged: its
  output was closer to an implementation spec than a Design Brief). Upstream
  resolved that exact tension for us: the frontmatter now reads "Deprecated
  legacy workflow skill. Prefer act-interview followed by act-create-spec."
  The clarification half became `act-interview` (adapted above); the
  spec-writing half became `act-create-spec`, which is interview-free and
  belongs to Developing-Ideas. Keep this file only as a reference for its
  user-flow mapping and permutation checklist (entry/exit points,
  first-time vs returning, offline, partial completion, cancellation), which
  are good scenario prompts for the Interview.
- Confidence: high

### Codex Product Design / get-context

- Belongs in: inquiry-analysis
- Source: `TEMP-sources/product-design-0.1.47/skills/get-context/SKILL.md` @ 0.1.47
- Recommendation: adapt
- Why it belongs here: Unchanged upstream (0.1.47 was already the audited
  version). It is explicitly a "mandatory design-brief gate": clarify what is
  being designed, what visual source governs it, and the expected
  interactivity, with a hard boundary against implementing while context is
  missing. Two moves are worth adapting beyond the old entry's rationale: the
  question-mode/playback-mode split (when the human already supplied the
  answers, don't re-ask — play the brief back pithily and confirm), and the
  explicit confirmation that "done means the user has confirmed the design
  brief." That playback-and-confirm is our Design Brief handoff in miniature.
- Confidence: high

### Codex Product Design / research

- Belongs in: inquiry-analysis
- Source: `TEMP-sources/product-design-0.1.47/skills/research/SKILL.md` @ 0.1.47
- Recommendation: reference
- Why it belongs here: Unchanged upstream. Source-grounded research pattern:
  restate scope before scanning, search public and internal sources, cite
  sources, separate observed evidence from inference, don't overclaim from
  anecdotes, cluster problems, rank by severity/frequency/confidence/leverage,
  and report a source map naming where signal was weak. Those contract rules
  are directly reusable for the Research and Need lines of inquiry.
- Confidence: high

### Codex Product Design / user-context

- Belongs in: inquiry-analysis
- Source: `TEMP-sources/product-design-0.1.47/skills/user-context/SKILL.md` @ 0.1.47
- Recommendation: reference
- Why it belongs here: Unchanged upstream. It models a curated source inventory
  (product URLs, Figma files, screenshots, codebase paths, tokens, design
  systems) with two disciplines worth borrowing: inspect only the saved
  references the current task needs, and never persist secrets or credentials
  in durable context. Inquiry-Analysis can treat that as the pattern for its
  source-inventory evidence.
- Confidence: medium
- Please verify: It stores state under `$CODEX_HOME/state/plugins/`, outside
  the project; Structured Workflow's durable memory is project-local, so only
  the curation discipline transfers, not the storage model.

### Codex Product Design / audit

- Belongs in: inquiry-analysis
- Source: `TEMP-sources/product-design-0.1.47/skills/audit/SKILL.md` @ 0.1.47
- Recommendation: reference
- Why it belongs here: Unchanged upstream. For UI/product inquiries, its
  evidence rules are the useful part: use only evidence captured in the current
  run, never memory or cached artifacts; tie every finding to a numbered step
  and screenshot; state explicitly what could not be checked from the evidence
  gathered. That is current-system discovery with honest evidence limits. Do
  not copy the Figma/browser capture machinery.
- Confidence: medium
- Please verify: The word "audit" overlaps Evaluating; include it here only
  when the purpose is discovering what is actually wrong for a Design Brief,
  not judging a finished solution. Evaluating may want it as reference too.

### VGV Wingspan / brainstorm

- Belongs in: developing-ideas (referenced by inquiry-analysis)
- Source: `TEMP-sources/vgv-wingspan/skills/brainstorm/SKILL.md` @ `7691c77`
- Recommendation: reference
- Why it belongs here: "Clarify WHAT to build before diving into HOW" supports
  this bucket, especially step 0.1's clarity assessment, lightweight project
  research, and the one-question-at-a-time loop over purpose, users,
  constraints, success, edge cases, and existing patterns. The fresh source,
  however, continues into 2-3 concrete approaches, a preferred direction, and
  a brainstorm document that feeds planning. Under the one-adapt-home rule,
  Developing-Ideas owns the full skill; Inquiry-Analysis references its
  clarity-gate and early-questioning mechanics only.
- Confidence: medium
- Collision resolved 2026-07-03: Developing-Ideas is the single adapt owner.

### VGV Wingspan / debrief

- Belongs in: inquiry-analysis
- Source: `TEMP-sources/vgv-wingspan/skills/debrief/SKILL.md` @ `7691c77`
- Recommendation: reference
- Why it belongs here: For incident-driven work, its gathering half seeds the
  Need and Findings sections of an inquiry document: what happened, when,
  where, severity, detection, resolution, and references, asked one question at
  a time and adapted to skip what the context already answers; then automated
  evidence collection from git history, CI runs, and affected-file analysis;
  then blameless root-cause synthesis. It explicitly works with partial
  information and marks gaps rather than blocking — good inquiry hygiene.
  Its action-item drafting and issue previews are downstream outputs and stay
  out of this bucket.
- Confidence: medium

### VGV AI Flutter Plugin / accessibility

- Belongs in: inquiry-analysis
- Source: `TEMP-sources/vgv-ai-flutter-plugin/skills/accessibility/SKILL.md` @ `d513aac`
- Recommendation: reference
- Why it belongs here: Only Phases 1–2 belong: it refuses to assume a WCAG
  conformance level or platform set and forces both to be chosen up front,
  which is constraint discovery — surfacing a stakeholder-and-success-criteria
  decision before any design or build choice. Everything after (the
  seven-category audit, severity-tagged findings, remediation scope selection)
  is audit/remediation work whose primary home is Evaluating or
  Creating-Solution.
- Confidence: medium

### Superpowers / brainstorming

- Belongs in: inquiry-analysis
- Source: `TEMP-sources/superpowers/skills/brainstorming/SKILL.md` @ v6.1.1 `d884ae0`
- Recommendation: reference
- Why it belongs here: Formerly adapt; demoted this pass. The v6 file is a
  full idea-to-approved-spec pipeline: hard gate against implementation,
  context exploration, one-question-at-a-time clarification, then 2–3
  approaches, sectioned design presentation, a written and committed design
  doc, spec self-review, and a mandatory transition into `writing-plans`. Most
  of that is solution design and Spec authoring, so Developing-Ideas is the
  primary owner. What this bucket should reference: the "too simple to need a
  design" anti-pattern (unexamined assumptions cost the most on "simple"
  work), the scope-decomposition check before spending questions on details,
  and the context-first clarification loop — all of which our adapted
  interview sources already cover in substance.
- Confidence: medium

### Superpowers / systematic-debugging

- Belongs in: inquiry-analysis
- Source: `TEMP-sources/superpowers/skills/systematic-debugging/SKILL.md` @ v6.1.1 `d884ae0`
- Recommendation: reference
- Why it belongs here: For bug-shaped inquiries, Phase 1 (read the errors,
  reproduce consistently, check recent changes, instrument component
  boundaries to gather evidence of where it breaks, trace data flow to the
  origin) and Phase 2 (compare against working examples and list every
  difference) define the real problem with evidence before any fix — directly
  supporting evidence-backed Findings. Its Iron Law, "no fixes without root
  cause investigation first," is a good inquiry-side guard. Phases 3–4
  (hypothesis testing, implementation) are fixing work; the skill's primary
  home is Creating-Solution.
- Confidence: medium

## Hooks

No source hook fits this bucket. None of the staged hooks clarify a problem,
gather evidence, resolve language, or gate a Design Brief; they are all
harness plumbing or code-time enforcement owned by other buckets:

- **ACT hooks** (`TEMP-sources/act/hooks/hooks.json` + `core/`, `claude/`,
  `codex/`, `opencode/` @ 1.0.0): session/activity logging to `ai_logs/` on
  every lifecycle event, a statusline, and Dart auto-format after edits.
  Continuity/observability mechanics — workflow-management territory at best;
  the formatter belongs with Creating-Solution's build hygiene.
- **Superpowers session-start** (`TEMP-sources/superpowers/hooks/session-start`
  @ v6.1.1 `d884ae0`): a SessionStart bootstrap that injects the
  `using-superpowers` skill-routing content into context. Skill-dispatch
  bootstrapping is workflow-management's concern.
- **VGV Wingspan recommend-plugins**
  (`TEMP-sources/vgv-wingspan/hooks/hooks.json` + `recommend-plugins.sh` @
  `7691c77`): a PreToolUse hook on Read/Glob/Grep that detects project type
  and recommends companion plugins. Environment setup, not inquiry.
- **VGV AI Flutter Plugin hooks**
  (`TEMP-sources/vgv-ai-flutter-plugin/hooks/hooks.json` + `scripts/` @
  `d513aac`): VGV CLI checks, Bash-workaround blocking, `dart analyze`/`dart
  format` after edits, and the reviewer agent's read-only git guard. All
  build-time or review-time enforcement for Creating-Solution and Evaluating.

## Subagents (custom droids)

| Source Pack | Subagent | Source (TEMP-sources path + pin) | Recommendation | Confidence |
| --- | --- | --- | --- | --- |
| ACT | act-codebase-researcher | `TEMP-sources/act/agents/act/codebase-researcher.md` @ 1.0.0 | reference | high |
| VGV Wingspan | best-practices-research-agent | `TEMP-sources/vgv-wingspan/agents/research/best-practices-research-agent.md` @ `7691c77` | reference | medium |
| VGV Wingspan | official-docs-research-agent | `TEMP-sources/vgv-wingspan/agents/research/official-docs-research-agent.md` @ `7691c77` | reference | medium |
| VGV Wingspan | user-flow-analysis-agent | `TEMP-sources/vgv-wingspan/agents/analysis/user-flow-analysis-agent.md` @ `7691c77` | reference | medium |
| VGV Wingspan | codebase-review-agent | `TEMP-sources/vgv-wingspan/agents/codebase-review/codebase-review-agent.md` @ `7691c77` | reference | medium |
| ACT | act-flutter-docs-researcher | `TEMP-sources/act/agents/act/flutter-docs-researcher.md` @ 1.0.0 | reference | medium |

### ACT / act-codebase-researcher

- Belongs in: creating-solution (referenced by inquiry-analysis)
- Source: `TEMP-sources/act/agents/act/codebase-researcher.md` @ 1.0.0
- Recommendation: reference
- Why it belongs here: A strictly read-only subagent (Glob/Grep/Read allowed;
  edit, bash, and web denied) that surveys a project and reports structure,
  patterns, reference implementations, and conventions in a fixed findings
  format, with the guardrails our evidence rules want: "Don't invent — only
  report what you actually find" and "Flag gaps." Inquiry-Analysis can use
  this as a grounding move before asking codebase-dependent questions, but the
  fresh source is explicitly framed around planning features and where new
  code should live. Creating-Solution is the single adapt owner for the C1/C2
  implementation-pattern research role.
- Confidence: high

### VGV Wingspan / best-practices-research-agent

- Belongs in: creating-solution (referenced by inquiry-analysis)
- Source: `TEMP-sources/vgv-wingspan/agents/research/best-practices-research-agent.md` @ `7691c77`
- Recommendation: reference
- Why it belongs here: A prior-art research subagent with a trust ladder —
  local skills and project conventions first, then official documentation,
  then community sources — plus a mandatory deprecation/sunset check before
  recommending any external API, and source attribution on every claim
  ("official docs recommend..." vs "many projects tend to..."). Inquiry can
  reference that evidence discipline for prior-art research, but the fresh
  agent is dispatched from Wingspan planning to choose implementation
  standards and technical approaches. Creating-Solution is the single adapt
  owner for the C2 "which tools/conventions should this slice use?" role.
- Confidence: medium
- Collision resolved 2026-07-03: Creating-Solution is the single adapt owner.

### VGV Wingspan / official-docs-research-agent

- Belongs in: inquiry-analysis
- Source: `TEMP-sources/vgv-wingspan/agents/research/official-docs-research-agent.md` @ `7691c77`
- Recommendation: reference
- Why it belongs here: The documentation-specific sibling: version-aware doc
  gathering pinned to the project's lock file, the same mandatory deprecation
  check, official sources prioritized over tutorials, and a structured report
  ending in references. Useful as a template for doc-focused research
  dispatches, but it overlaps the adapted best-practices agent and Matt's
  `research` skill; one adapted research primitive is enough.
- Confidence: medium

### VGV Wingspan / user-flow-analysis-agent

- Belongs in: inquiry-analysis
- Source: `TEMP-sources/vgv-wingspan/agents/analysis/user-flow-analysis-agent.md` @ `7691c77`
- Recommendation: reference
- Why it belongs here: It maps every user journey and permutation from a spec
  or feature description, identifies gaps by category, and formulates
  prioritized clarifying questions (critical/important/nice-to-have) with the
  assumption it would make if unanswered. As a reviewer of a written document
  against gap criteria, its primary home is the Evaluating engine (a lens for
  adversarial review of the Design Brief or Spec); Inquiry-Analysis references
  it as a generator of concrete scenario questions for the Interview.
- Confidence: medium

### VGV Wingspan / codebase-review-agent

- Belongs in: inquiry-analysis
- Source: `TEMP-sources/vgv-wingspan/agents/codebase-review/codebase-review-agent.md` @ `7691c77`
- Recommendation: reference
- Why it belongs here: Wingspan's `brainstorm` dispatches it before questioning
  ("Understand existing patterns related to: <feature>"), so it plays the
  ground-before-asking role in that pack. But the agent's own text is mostly
  quality judgment — code quality assessment, SOLID adherence, quality
  checklists — so its primary home is Evaluating. Reference here for its
  research methodology (start with high-level docs, drill down, cross-reference
  sources, provide file paths as evidence, distinguish official guidelines
  from observed patterns).
- Confidence: medium

### ACT / act-flutter-docs-researcher

- Belongs in: inquiry-analysis
- Source: `TEMP-sources/act/agents/act/flutter-docs-researcher.md` @ 1.0.0
- Recommendation: reference
- Why it belongs here: A docs-research subagent that classifies the topic,
  pins versions from the lock file, runs a stop-and-report deprecation check,
  gathers docs in priority order (official first), and falls back to reading
  package source when docs are insufficient. Same shape as Wingspan's docs
  agent; Flutter-specific throughout, so reference-only for the report format
  and the "if docs are poor, say so and fill gaps from source" honesty rule.
- Confidence: medium

Considered and excluded: `TEMP-sources/act/agents/act/flutter-patterns-researcher.md`
(@ 1.0.0) only retrieves entries from ACT's own Flutter pattern knowledge base —
implementation guidance for Creating-Solution, no inquiry content.
`TEMP-sources/vgv-ai-flutter-plugin/agents/flutter-reviewer.md` (@ `d513aac`) is
a read-only code reviewer; it belongs to Evaluating.
`TEMP-sources/product-design-0.1.47/agents/openai.yaml` (@ 0.1.47) is not an
agent definition at all — it is interface metadata (display name, short
description, default prompt) for the plugin; nothing to place.
Wingspan's `analysis/plan-splitting-agent` and the `quality-review/` agents were
not read this pass; by name and pack role they are Creating-Solution
(plan/issue slicing) and Evaluating candidates, not inquiry.

## Rename and Removal Ledger

Every item the old audit cited from the six re-verified systems, where the old
citation no longer resolves as cited. (All old Matt citations pointed at
`~/.agents/skills/<name>`, which no longer exists; ACT citations pointed at
`~/.agentic-coding-toolkit/`; Wingspan, flutter-plugin, and Superpowers
citations were GitHub URLs. Everything below is verified against the staged
`TEMP-sources/` copies.)

| Old citation | What happened | Disposition in this rewrite |
| --- | --- | --- |
| Matt `grill-me` | Moved to `skills/productivity/grill-me/`; hollowed out to a one-line wrapper over new `grilling` | Demoted adapt → reference; `grilling` adapted in its place |
| Matt `grill-with-docs` | Moved to `skills/engineering/grill-with-docs/`; now a one-line wrapper over `grilling` + `domain-modeling` | Demoted adapt → reference; `domain-modeling` adapted in its place |
| Matt `ubiquitous-language` | Moved to `skills/deprecated/` (deprecated upstream); behavior absorbed by `domain-modeling` (inline glossary updates replace end-of-conversation extraction) | Demoted adapt → reference (deprecated upstream), kept for its glossary output format |
| Matt `zoom-out` | Removed upstream. CHANGELOG (`TEMP-sources/mattpocock-skills/CHANGELOG.md`, commit `47bde84`): "zoom-out went unused in practice, so it's been removed from the repo." Not absorbed — neither `codebase-design` (deep-module vocabulary) nor `domain-modeling` contains its module/caller-mapping move | Entry dropped. Its role (inspect existing systems before asking) is now covered by the adapted `act-codebase-researcher` subagent and the ground-before-asking rules in `grilling`/`act-interview` |
| Matt `diagnose` (old Borderline mention) | Renamed/rebuilt as `skills/engineering/diagnosing-bugs/` (confirmed by content: phased diagnosis loop) | Promoted from Borderline to a reference entry for its Phase 1–2 evidence discipline; primary home Creating-Solution |
| Matt `design-an-interface` (old Borderline mention) | Moved to `skills/deprecated/` (deprecated upstream); its design-it-twice move now lives in `codebase-design`'s `DESIGN-IT-TWICE.md` reference | Remains out of this bucket (Developing-Ideas material); noted here so no audit re-cites the old path |
| Matt `review`, `request-refactor-plan` (old Borderline mentions) | `review` renamed to `skills/engineering/code-review/`; `request-refactor-plan` moved to `skills/deprecated/` | Remain out of this bucket (Evaluating / Developing-Ideas concerns) |
| Matt new skills (`codebase-design`, `grilling`, `research`, `domain-modeling`, `wayfinder`) | Added upstream since the old audit | `grilling`, `domain-modeling`, `research` adapted; `wayfinder` reference; `codebase-design` evaluated and placed elsewhere — it is deep-module design vocabulary for Developing-Ideas/Creating-Solution, no inquiry content |
| ACT `act-workflow-spec` | Still present but deprecated upstream ("Prefer act-interview followed by act-create-spec"); ACT CHANGELOG 1.0.0: "All the old `/act-workflow-*` skills have been deprecated." | Demoted adapt → reference (deprecated upstream). Its interview half is superseded by `act-interview` (adapted here); its spec-writing half by `act-create-spec` (Developing-Ideas' to claim) |
| ACT `act-workflow-refine-spec`, `act-workflow-plan`, `act-workflow-work` (old Borderline mentions) | Deprecated upstream; successors `act-refine-spec`, `act-create-issues`, `act-implement` (+ `-flutter` variants) | Remain out of this bucket (Evaluating, Creating-Solution) |
| ACT `act-meta-audit-work` | Removed upstream with no successor. CHANGELOG 1.0.0: "Removed the obsolete `act-meta-audit-work` skill from the toolkit." (It had been maintainer-only since 0.5.x) | Never an inquiry entry; recorded so no bucket re-cites it |
| Wingspan `create-branch`, `create-commit` (old Borderline "PR/git skills") | Removed at commit `7691c77` per INVENTORY; replaced in the pack by `create`, `rebase` | Remain out of this bucket (workflow-management/Creating-Solution mechanics) |
| Product Design pack (get-context, research, user-context, audit) | Unchanged at 0.1.47; only the citation root moved from the Codex plugin cache to `TEMP-sources/product-design-0.1.47/` | Recommendations unchanged; entries re-verified and re-cited |
| Superpowers `brainstorming` | Still present; v6 rewrite added the hard gate, spec self-review, user review gate, writing-plans terminal state, and visual companion | Demoted adapt → reference; primary home Developing-Ideas |
| Superpowers `systematic-debugging` | Still present; content re-verified at v6.1.1 | Recommendation unchanged (reference) |
| VGV flutter-plugin `accessibility` | Still present; old audit cited it as "vgv-accessibility" via GitHub URL; actual skill name is `accessibility` | Recommendation unchanged (reference); renamed in the table to match the source |

## Not Re-Verified This Pass (long tail)

Preserved from the previous audit without re-verification. Sources cited below
were not re-staged; treat recommendations as provisional until their packs are
re-verified.

Note on Factory/Droid borrowed entries: the local copies under
`r-and-d/borrowed-factory-skills` were deleted on 2026-07-03; these entries are
retained by name only.

| Source Pack | Skill | Source | Recommendation | Confidence |
| --- | --- | --- | --- | --- |
| Factory/Droid borrowed | browse-wiki | (local copy deleted 2026-07-03; retained by name only) | reference | high |
| Factory/Droid borrowed | wiki | (local copy deleted 2026-07-03; retained by name only) | adapt | high |
| Bug Hunter | recon | https://github.com/codexstar69/bug-hunter/tree/main/skills/recon | reference | medium |
| planning-with-files | planning-with-files | https://github.com/OthmanAdi/planning-with-files/tree/master/skills/planning-with-files | reference | high |
| Cline Memory Bank | Memory Bank | https://docs.cline.bot/prompting/cline-memory-bank | reference | high |
| Linear curated | linear | /Users/jholt/.codex/plugins/cache/openai-curated/linear/e2d08a2e/skills/linear/SKILL.md | reference | medium |
| Sentry curated | sentry | /Users/jholt/.codex/plugins/cache/openai-curated/sentry/e2d08a2e/skills/sentry/SKILL.md | reference | medium |

### Factory/Droid borrowed / browse-wiki

- Belongs in: inquiry-analysis
- Source: local copy deleted 2026-07-03; retained by name only
- Recommendation: reference
- Why it belongs here: It provides a disciplined way to search, browse, and read repository wiki documentation, preferring local docs when available and using search before reading pages. That fits source inventory, prior art, and current-system context gathering.
- Confidence: high

### Factory/Droid borrowed / wiki

- Belongs in: inquiry-analysis
- Source: local copy deleted 2026-07-03; retained by name only
- Recommendation: adapt
- Why it belongs here: Its repository survey maps project purpose, subsystems, data flows, dependencies, build/test commands, and deep code topics. That is a strong pattern for inspecting existing systems before writing a Design Brief. Avoid its upload/output model; keep only the survey method.
- Confidence: high

### Bug Hunter / recon

- Belongs in: inquiry-analysis
- Source: https://github.com/codexstar69/bug-hunter/tree/main/skills/recon
- Recommendation: reference
- Why it belongs here: Recon maps architecture, trust boundaries, service boundaries, risky entry points, state transitions, error boundaries, concurrency boundaries, recent churn, and file metrics without fixing bugs. This is valuable for problem discovery and system inspection in bug/security-flavored inquiries.
- Confidence: medium
- Please verify: Its risk map is optimized for bug hunting, so do not import severity/risk taxonomy as the general Inquiry-Analysis model.

### planning-with-files / planning-with-files

- Belongs in: inquiry-analysis
- Source: https://github.com/OthmanAdi/planning-with-files/tree/master/skills/planning-with-files
- Recommendation: reference
- Why it belongs here: It treats the filesystem as durable working memory, separates plan, findings, and progress, re-reads before decisions, and logs discoveries immediately. Structured Workflow already uses this as a durable-memory influence; Inquiry-Analysis can reference its "findings survive context loss" pattern while keeping Structured Workflow's single inquiry document plus `GLOSSARY.md` and `workflow-tracker.md`.
- Confidence: high

### Cline Memory Bank / Memory Bank

- Belongs in: inquiry-analysis
- Source: https://docs.cline.bot/prompting/cline-memory-bank
- Recommendation: reference
- Why it belongs here: Memory Bank defines projectbrief, product context, active context, system patterns, tech context, and progress as persistent context. Structured Workflow should not copy the file set, but the source supports the durable-context rationale behind the inquiry document, glossary, and tracker.
- Confidence: high

### Linear curated / linear

- Belongs in: inquiry-analysis
- Source: /Users/jholt/.codex/plugins/cache/openai-curated/linear/e2d08a2e/skills/linear/SKILL.md
- Recommendation: reference
- Why it belongs here: Its read-first workflow can gather issue, project, team, cycle, label, documentation, and comment context before any external write. That can identify stakeholders, prior decisions, problem history, and constraints for an inquiry document.
- Confidence: medium
- Please verify: Side effects require confirmation; only read/search/list behavior belongs in Inquiry-Analysis.

### Sentry curated / sentry

- Belongs in: inquiry-analysis
- Source: /Users/jholt/.codex/plugins/cache/openai-curated/sentry/e2d08a2e/skills/sentry/SKILL.md
- Recommendation: reference
- Why it belongs here: It provides read-only production error context: issue lists, event detail, time ranges, environments, counts, and recency. For reliability work, that evidence can establish the real problem, impact, and "why now" before a Design Brief.
- Confidence: medium
- Please verify: Keep it read-only and evidence-gathering; debugging, fixing, and verification belong elsewhere.

### Long-tail borderline notes (preserved)

- Cursor Team Kit: no strong Inquiry-Analysis candidate found. `workflow-from-chats` mines durable preferences, but it is meta-workflow personalization rather than defining a task problem or Design Brief. PR, CI, smoke-test, compiler, review, and summary skills are downstream.
- Flutter official skills: no strong Inquiry-Analysis candidate found. The pack is implementation/testing/setup guidance for Flutter.
- Dart official skills: no strong Inquiry-Analysis candidate found. The pack is implementation, analysis, testing, and runtime-error guidance for Dart.
- Impeccable: the provided URL `https://github.com/impeccableai/impeccable` returned 404 during audit. A local `/Users/jholt/.agents/skills/impeccable/SKILL.md` exists and contains frontend critique/clarify/audit/design flows, but it was not listed as the authorized source for this pack. Defer until the source URL or intended local source is verified.
- Bug Hunter: `threat-model-generation`, `doc-lookup`, `hunter`, `skeptic`, `referee`, `security-review`, `vulnerability-validation`, `fixer`, and commit security scan are security evaluation/fixing support. Only `recon` is included for architecture and boundary discovery.
- planning-with-files: include as durable-memory reference only. Do not import its root `task_plan.md`, `findings.md`, `progress.md` file set over Structured Workflow's inquiry document, `GLOSSARY.md`, and `workflow-tracker.md`.
- Cline Memory Bank: include as durable-memory reference only. Do not copy the Memory Bank file hierarchy into the four-phase Structured Workflow model.
- vgv-pr-roundtrip: no strong Inquiry-Analysis candidate found. It is a build/review/PR completion loop for Creating-Solution and Evaluating.
- Linear curated: include read-only context gathering only. Issue creation/update belongs to Creating-Solution or external workflow-management and requires confirmation.
- Sentry curated: include read-only production evidence only. Remediation, validation, and incident follow-up belong to later phases.
