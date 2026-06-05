# Inquiry-Analysis Skill Audit

## Bucket Definition

Inquiry-Analysis includes skills that help the agent clarify the situation before
choosing a solution: define the problem, identify stakeholders, gather current
context, inspect existing systems, compare examples, surface constraints, resolve
language, and produce a trustworthy Design Brief. It should not choose the
solution, build code, slice issues, or run final acceptance; those belong to
Developing-Ideas, Creating-Solution, or Evaluating.

## Included Skills

| Source Pack | Skill | Source | Recommendation | Confidence |
| --- | --- | --- | --- | --- |
| Matt Pocock skills | grill-me | /Users/jholt/.agents/skills/grill-me/SKILL.md | adapt | high |
| Matt Pocock skills | grill-with-docs | /Users/jholt/.agents/skills/grill-with-docs/SKILL.md | adapt | high |
| Matt Pocock skills | ubiquitous-language | /Users/jholt/.agents/skills/ubiquitous-language/SKILL.md | adapt | high |
| Matt Pocock skills | zoom-out | /Users/jholt/.agents/skills/zoom-out/SKILL.md | adapt | high |
| ACT | act-workflow-spec | /Users/jholt/.agentic-coding-toolkit/skills/act-workflow-spec/SKILL.md | adapt | medium |
| Codex Product Design | get-context | /Users/jholt/.codex/plugins/cache/openai-curated-remote/product-design/0.1.43/skills/get-context/SKILL.md | adapt | high |
| Codex Product Design | research | /Users/jholt/.codex/plugins/cache/openai-curated-remote/product-design/0.1.43/skills/research/SKILL.md | reference | high |
| Codex Product Design | user-context | /Users/jholt/.codex/plugins/cache/openai-curated-remote/product-design/0.1.43/skills/user-context/SKILL.md | reference | medium |
| Codex Product Design | audit | /Users/jholt/.codex/plugins/cache/openai-curated-remote/product-design/0.1.43/skills/audit/SKILL.md | reference | medium |
| VGV Wingspan | brainstorm | https://github.com/VeryGoodOpenSource/vgv-wingspan/tree/main/skills/brainstorm | adapt | medium |
| VGV Wingspan | debrief | https://github.com/VeryGoodOpenSource/vgv-wingspan/tree/main/skills/debrief | reference | medium |
| VGV AI Flutter Plugin | vgv-accessibility | https://github.com/VeryGoodOpenSource/vgv-ai-flutter-plugin/tree/main/skills/accessibility | reference | medium |
| Superpowers | brainstorming | https://github.com/obra/superpowers/tree/main/skills/brainstorming | adapt | medium |
| Superpowers | systematic-debugging | https://github.com/obra/superpowers/tree/main/skills/systematic-debugging | reference | medium |
| Factory/Droid borrowed | browse-wiki | /Users/jholt/development/structured-workflow-mcp/r-and-d/borrowed-factory-skills/builtin/browse-wiki/SKILL.md | reference | high |
| Factory/Droid borrowed | wiki | /Users/jholt/development/structured-workflow-mcp/r-and-d/borrowed-factory-skills/builtin/wiki/SKILL.md | adapt | high |
| Bug Hunter | recon | https://github.com/codexstar69/bug-hunter/tree/main/skills/recon | reference | medium |
| planning-with-files | planning-with-files | https://github.com/OthmanAdi/planning-with-files/tree/master/skills/planning-with-files | reference | high |
| Cline Memory Bank | Memory Bank | https://docs.cline.bot/prompting/cline-memory-bank | reference | high |
| Linear curated | linear | /Users/jholt/.codex/plugins/cache/openai-curated/linear/e2d08a2e/skills/linear/SKILL.md | reference | medium |
| Sentry curated | sentry | /Users/jholt/.codex/plugins/cache/openai-curated/sentry/e2d08a2e/skills/sentry/SKILL.md | reference | medium |

## Justifications

### Matt Pocock skills / grill-me

- Belongs in: inquiry-analysis
- Source: /Users/jholt/.agents/skills/grill-me/SKILL.md
- Recommendation: adapt
- Why it belongs here: Its core loop is the same as Inquiry-Analysis' collaborative interview: ask one question at a time, walk dependent branches, provide recommended answers, and inspect the codebase instead of asking when evidence is available. Adapt the interview discipline, but retarget it from "plan or design" to the Design Brief.
- Confidence: high

### Matt Pocock skills / grill-with-docs

- Belongs in: inquiry-analysis
- Source: /Users/jholt/.agents/skills/grill-with-docs/SKILL.md
- Recommendation: adapt
- Why it belongs here: It adds domain-doc awareness, glossary challenge, fuzzy-language sharpening, scenario stress tests, and code/doc contradiction checks. That directly supports shared language, evidence gathering, sparse decision records, and Design Brief trustworthiness.
- Confidence: high

### Matt Pocock skills / ubiquitous-language

- Belongs in: inquiry-analysis
- Source: /Users/jholt/.agents/skills/ubiquitous-language/SKILL.md
- Recommendation: adapt
- Why it belongs here: It extracts nouns, verbs, ambiguities, canonical terms, relationships, and example dialogue. Inquiry-Analysis explicitly aims for ubiquitous language and updates `GLOSSARY.md` as terms resolve, so the method is a clean fit.
- Confidence: high

### Matt Pocock skills / zoom-out

- Belongs in: inquiry-analysis
- Source: /Users/jholt/.agents/skills/zoom-out/SKILL.md
- Recommendation: adapt
- Why it belongs here: It asks the agent to map relevant modules and callers using domain glossary vocabulary. That is exactly the "inspect existing systems" and "gather context before asking" behavior needed when the inquiry depends on codebase reality.
- Confidence: high

### ACT / act-workflow-spec

- Belongs in: inquiry-analysis
- Source: /Users/jholt/.agentic-coding-toolkit/skills/act-workflow-spec/SKILL.md
- Recommendation: adapt
- Why it belongs here: The early workflow analyzes goal, scope, constraints, gaps, user journeys, decision points, edge cases, and clarification questions after reading relevant files. Those moves help create an inquiry document and Design Brief. The later "implementation approach" and full executable spec parts should be stripped or moved to Developing-Ideas/Creating-Solution.
- Confidence: medium
- Please verify: Confirm whether Structured Workflow wants to borrow ACT's "spec" framing at all, because its output is closer to implementation specification than a problem-space Design Brief.

### Codex Product Design / get-context

- Belongs in: inquiry-analysis
- Source: /Users/jholt/.codex/plugins/cache/openai-curated-remote/product-design/0.1.43/skills/get-context/SKILL.md
- Recommendation: adapt
- Why it belongs here: It is explicitly a design-brief gate: clarify product/workflow/screen, visual source, preferences, and interactivity before proceeding. Its hard boundary against implementing while context is missing is aligned with Inquiry-Analysis refusing chosen solutions and code.
- Confidence: high

### Codex Product Design / research

- Belongs in: inquiry-analysis
- Source: /Users/jholt/.codex/plugins/cache/openai-curated-remote/product-design/0.1.43/skills/research/SKILL.md
- Recommendation: reference
- Why it belongs here: It gives a source-grounded research pattern: restate scope, search public/internal sources, separate observed evidence from inference, cluster problems, rank by severity/frequency/confidence, and produce a source map. That fits inquiry research and prior-art/problem evidence.
- Confidence: high

### Codex Product Design / user-context

- Belongs in: inquiry-analysis
- Source: /Users/jholt/.codex/plugins/cache/openai-curated-remote/product-design/0.1.43/skills/user-context/SKILL.md
- Recommendation: reference
- Why it belongs here: It models a curated source inventory for product URLs, Figma files, screenshots, tokens, brand assets, Storybook, and product notes. Inquiry-Analysis can borrow the discipline of inspecting only relevant saved context and treating durable context as grounding evidence.
- Confidence: medium
- Please verify: The skill is product-design-specific and stores plugin state outside the project, while Structured Workflow's durable memory is project-local.

### Codex Product Design / audit

- Belongs in: inquiry-analysis
- Source: /Users/jholt/.codex/plugins/cache/openai-curated-remote/product-design/0.1.43/skills/audit/SKILL.md
- Recommendation: reference
- Why it belongs here: For UI/product work, capturing the current flow and tying UX/accessibility findings to screenshots can be inquiry evidence about the existing system, user friction, constraints, and "what is actually wrong." Do not copy its destination/capture machinery wholesale.
- Confidence: medium
- Please verify: The word "audit" overlaps Evaluating; include only when the purpose is discovery for a Design Brief, not judging a finished solution.

### VGV Wingspan / brainstorm

- Belongs in: inquiry-analysis
- Source: https://github.com/VeryGoodOpenSource/vgv-wingspan/tree/main/skills/brainstorm
- Recommendation: adapt
- Why it belongs here: The first half maps the current project, asks one question at a time, explores purpose, users, constraints, success, edge cases, and existing patterns. Those are inquiry moves. Its approach-selection and brainstorm-doc output cross into Developing-Ideas and should not be copied into Inquiry-Analysis.
- Confidence: medium
- Please verify: Split the problem-understanding section from the solution-options section before promoting it.

### VGV Wingspan / debrief

- Belongs in: inquiry-analysis
- Source: https://github.com/VeryGoodOpenSource/vgv-wingspan/tree/main/skills/debrief
- Recommendation: reference
- Why it belongs here: For incident-driven work, it gathers what happened, who/what was affected, severity, detection, evidence, root cause, and gaps. That can seed the Need and Findings sections of an inquiry document before a new solution cycle starts.
- Confidence: medium
- Please verify: Keep action-item generation out of Inquiry-Analysis; that belongs downstream after the Design Brief clarifies the justified need.

### VGV AI Flutter Plugin / vgv-accessibility

- Belongs in: inquiry-analysis
- Source: https://github.com/VeryGoodOpenSource/vgv-ai-flutter-plugin/tree/main/skills/accessibility
- Recommendation: reference
- Why it belongs here: Its platform and WCAG-level selection makes accessibility constraints explicit before design/build choices are made. It is useful source material for constraints, stakeholders, and success criteria in the Design Brief.
- Confidence: medium
- Please verify: Most of the skill is audit/remediation and should be assigned to Evaluating or Creating-Solution; only the constraint-discovery preface belongs here.

### Superpowers / brainstorming

- Belongs in: inquiry-analysis
- Source: https://github.com/obra/superpowers/tree/main/skills/brainstorming
- Recommendation: adapt
- Why it belongs here: It requires project-context exploration, one-question-at-a-time clarification, purpose/constraints/success criteria, and presenting a design for approval before implementation. The inquiry-relevant core is strong, but Structured Workflow should stop at the Design Brief, before solution design approval.
- Confidence: medium
- Please verify: This skill spans Inquiry-Analysis and Developing-Ideas; promote only the context and clarification loop.

### Superpowers / systematic-debugging

- Belongs in: inquiry-analysis
- Source: https://github.com/obra/superpowers/tree/main/skills/systematic-debugging
- Recommendation: reference
- Why it belongs here: For bug/problem inquiries, root-cause investigation, reproduction, recent-change inspection, boundary instrumentation, data-flow tracing, and working-example comparison define the real problem before fixing. That directly supports evidence-backed Findings.
- Confidence: medium
- Please verify: Stop before hypothesis fixing and implementation; those phases belong outside Inquiry-Analysis.

### Factory/Droid borrowed / browse-wiki

- Belongs in: inquiry-analysis
- Source: /Users/jholt/development/structured-workflow-mcp/r-and-d/borrowed-factory-skills/builtin/browse-wiki/SKILL.md
- Recommendation: reference
- Why it belongs here: It provides a disciplined way to search, browse, and read repository wiki documentation, preferring local docs when available and using search before reading pages. That fits source inventory, prior art, and current-system context gathering.
- Confidence: high

### Factory/Droid borrowed / wiki

- Belongs in: inquiry-analysis
- Source: /Users/jholt/development/structured-workflow-mcp/r-and-d/borrowed-factory-skills/builtin/wiki/SKILL.md
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

## Borderline / Deferred

- ACT: `act-workflow-refine-spec`, `act-workflow-plan`, `act-workflow-work`, Flutter TDD/testing/screenshot/Sentry/setup/git skills are stronger fits for Evaluating, Developing-Ideas, Creating-Solution, or workflow-management. No additional strong Inquiry-Analysis candidate found.
- Matt Pocock skills: `to-prd`, `to-issues`, `prototype`, `design-an-interface`, `review`, `tdd`, `diagnose`, `request-refactor-plan`, and PR/publishing skills are downstream. Local and upstream inventories matched the same main candidates.
- VGV Wingspan: `plan`, `refine-approach`, `plan-technical-review`, `build`, PR/git skills, and `review` are later-phase planning, creation, or evaluation. `refine-approach` is useful for adversarial document review but should be synthesized through Evaluating rather than Inquiry-Analysis directly.
- VGV AI Flutter Plugin: `layered-architecture`, `navigation`, `internationalization`, `testing`, `material-theming`, `bloc`, `ui-package`, and setup/upgrade skills are technology guidance for Developing-Ideas, Creating-Solution, or Evaluating, not problem inquiry.
- Superpowers: `writing-plans`, `executing-plans`, `subagent-driven-development`, `verification-before-completion`, `requesting-code-review`, `receiving-code-review`, branch/commit skills, and TDD are downstream. `brainstorming` and `systematic-debugging` are included only for their inquiry portions.
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

## Notes For Final Synthesis

- The clean Inquiry-Analysis synthesis should be one coherent phase skill, not a collage of imported source-pack subskills.
- Best primitives to promote: one-question-at-a-time interview, ground-before-asking code/doc inspection, glossary challenge, source inventory, prior-art/product research, existing-system survey, incident/runtime evidence, and Design Brief playback.
- Medium-confidence entries mostly span multiple phases. Promote only their inquiry portions and explicitly route option selection, PRD writing, issue slicing, implementation, and final verdicts to later phases.
- Durable-memory sources support the rationale, but Structured Workflow's file shape should remain: one inquiry document ending in the Design Brief, plus `GLOSSARY.md`, `workflow-tracker.md`, and sparse decision records.
- For source packs with inaccessible or non-authorized sources, defer rather than infer.
