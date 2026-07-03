# Developing-Ideas Skill Audit

Re-verified 2026-07-03 against the fresh source staging under `TEMP-sources/` (see `TEMP-sources/INVENTORY.md` for pins). Every entry below cites a `TEMP-sources/` path plus its pinned commit or version. Long-tail packs from the previous pass are preserved unmodified in the final section.

## Bucket Definition

Developing-Ideas takes the trusted Design Brief from Inquiry-Analysis and turns it into one chosen, planned solution. A skill belongs here when it helps the agent translate the brief into explicit success criteria, generate a small set of feasible approaches, prototype only to answer an unresolved design question, compare trade-offs against the criteria, gather human judgment on the chosen direction, and synthesize the Spec-ready requirements that hand off to Creating-Solution.

Developing-Ideas does not re-run the problem interview, write the production solution, slice work into implementation issues, run PR loops, or perform final acceptance evaluation. Those belong to Inquiry-Analysis, Creating-Solution, or Evaluating.

## Skills

| Source Pack | Skill | Source (TEMP-sources path + pin) | Recommendation | Confidence |
| --- | --- | --- | --- | --- |
| Matt Pocock skills | codebase-design | `TEMP-sources/mattpocock-skills/skills/engineering/codebase-design/SKILL.md` (+ `DESIGN-IT-TWICE.md`), commit `272f99b` | adapt | high |
| Matt Pocock skills | prototype | `TEMP-sources/mattpocock-skills/skills/engineering/prototype/SKILL.md`, commit `272f99b` | adapt | high |
| Matt Pocock skills | to-prd | `TEMP-sources/mattpocock-skills/skills/engineering/to-prd/SKILL.md`, commit `272f99b` | adapt | high |
| Matt Pocock skills | grill-me | `TEMP-sources/mattpocock-skills/skills/productivity/grill-me/SKILL.md`, commit `272f99b` | reference | high |
| Matt Pocock skills | improve-codebase-architecture | `TEMP-sources/mattpocock-skills/skills/engineering/improve-codebase-architecture/SKILL.md`, commit `272f99b` | reference | medium |
| Matt Pocock skills | domain-modeling | `TEMP-sources/mattpocock-skills/skills/engineering/domain-modeling/SKILL.md`, commit `272f99b` | reference | medium |
| Matt Pocock skills | research | `TEMP-sources/mattpocock-skills/skills/engineering/research/SKILL.md`, commit `272f99b` | reference | medium |
| ACT | act-create-spec | `TEMP-sources/act/skills/act-create-spec/SKILL.md` (+ `references/spec-format.md`, `references/interview-ledger-format.md`), VERSION 1.0.0 | adapt | high |
| ACT | act-refine-spec | `TEMP-sources/act/skills/act-refine-spec/SKILL.md`, VERSION 1.0.0 | reference | medium |
| Codex Product Design | ideate | `TEMP-sources/product-design-0.1.47/skills/ideate/SKILL.md`, 0.1.47 | adapt | high |
| Codex Product Design | prototype | `TEMP-sources/product-design-0.1.47/skills/prototype/SKILL.md`, 0.1.47 | reference | medium |
| VGV Wingspan | brainstorm | `TEMP-sources/vgv-wingspan/skills/brainstorm/SKILL.md` (+ `references/template.md`), commit `7691c77` | adapt | high |
| VGV Wingspan | refine-approach | `TEMP-sources/vgv-wingspan/skills/refine-approach/SKILL.md`, commit `7691c77` | reference | medium |
| Superpowers | brainstorming | `TEMP-sources/superpowers/skills/brainstorming/SKILL.md`, v6.1.1 (`d884ae0`) | adapt | high |

Verified as belonging to other buckets (not table entries here): Superpowers `writing-plans` (`TEMP-sources/superpowers/skills/writing-plans/SKILL.md`, v6.1.1) was re-read in full and confirmed to be Creating-Solution — it writes bite-sized implementation task plans with exact file paths, test code, and commit steps, and is the explicit terminal handoff of `brainstorming`. Likewise owned elsewhere: Matt `to-issues` and ACT `act-create-issues` (Spec-to-issues slicing starts Creating-Solution), ACT `act-interview`/`act-interview-flutter` (the interview engine belongs to Inquiry-Analysis), and Wingspan `plan`/`plan-technical-review` (Creating-Solution). ACT's `-flutter` skill variants (`act-create-spec-flutter`, `act-refine-spec-flutter`) are wrappers that preserve Flutter/Dart guardrails per `TEMP-sources/act/CHANGELOG.md` 1.0.0; cite the core skills here.

### Matt Pocock skills / codebase-design

- Belongs in: developing-ideas
- Source: `TEMP-sources/mattpocock-skills/skills/engineering/codebase-design/SKILL.md` and `DESIGN-IT-TWICE.md`, commit `272f99b`
- Recommendation: adapt
- Why it belongs here: This is the successor surface for the deprecated `design-an-interface`. `DESIGN-IT-TWICE.md` carries the absorbed pattern almost intact: spawn 3+ parallel sub-agents, each with a radically different design constraint, present designs sequentially, compare in prose on depth/locality/seam placement, then give an opinionated recommendation ("the user wants a strong read, not a menu"). That is the B2 feasible-ideas and B3 chosen-design engine for module-shaped solutions. The SKILL.md itself supplies the vocabulary (module, interface, depth, seam, adapter, leverage, locality) and decision principles (deletion test, "the interface is the test surface") that make option comparison concrete rather than taste-based.
- Confidence: high
- Please verify: The vocabulary half of this skill is cross-phase (Creating-Solution and Evaluating both benefit from the same terms). Confirm adapt-here-with-reference-elsewhere is the intended split, versus treating the glossary as shared reference material and adapting only the design-it-twice pattern.

### Matt Pocock skills / prototype

- Belongs in: developing-ideas
- Source: `TEMP-sources/mattpocock-skills/skills/engineering/prototype/SKILL.md`, commit `272f99b`
- Recommendation: adapt
- Why it belongs here: The fresh version opens with the same core rule — "A prototype is throwaway code that answers a question" — and closes with "The _answer_ is the only thing worth keeping," captured somewhere durable before the prototype is deleted or absorbed. That is exactly the Structured Workflow prototype-to-answer move in B2. The revision adds a useful branch structure (LOGIC.md for "does this state model feel right?", UI.md for "what should this look like?") and rules worth carrying: clearly marked throwaway, one command to run, no persistence, no polish, surface the state after every action.
- Confidence: high

### Matt Pocock skills / to-prd

- Belongs in: developing-ideas
- Source: `TEMP-sources/mattpocock-skills/skills/engineering/to-prd/SKILL.md`, commit `272f99b`
- Recommendation: adapt
- Why it belongs here: It is explicitly interview-free — "Do NOT interview the user — just synthesize what you already know" — which matches B4 Spec completion. Its template maps nearly one-to-one onto our Spec sections: Problem Statement, Solution, User Stories, Implementation Decisions, Testing Decisions, Out of Scope, Further Notes. It also sketches test seams before writing ("Existing seams should be preferred… the ideal number is one") and permits inlining decision-rich prototype snippets, both of which our Spec's Testing Decisions section relies on. Adaptation should drop the automatic issue-tracker publishing and `ready-for-agent` labelling (issue work starts Creating-Solution, and external issue creation needs explicit confirmation) and keep the Spec as the durable phase artifact.
- Confidence: high

### Matt Pocock skills / grill-me

- Belongs in: inquiry-analysis (referenced here)
- Source: `TEMP-sources/mattpocock-skills/skills/productivity/grill-me/SKILL.md`, commit `272f99b`
- Recommendation: reference
- Why it belongs here: The fresh file is now a two-line stub: "Run a `/grilling` session." The questioning engine lives in `skills/productivity/grilling/`, and per the locked placement rules the interview/grilling engine belongs to Inquiry-Analysis. Developing-Ideas keeps it as a reference because directed questioning still happens in this phase — confirming a direction, resolving a remaining trade-off — but the engine itself is owned elsewhere.
- Confidence: high
- Please verify: The developing-ideas synthesis should point at `grilling` (the engine, via Inquiry-Analysis) rather than the `grill-me` stub.

### Matt Pocock skills / improve-codebase-architecture

- Belongs in: developing-ideas
- Source: `TEMP-sources/mattpocock-skills/skills/engineering/improve-codebase-architecture/SKILL.md`, commit `272f99b`
- Recommendation: reference
- Why it belongs here: It generates architecture-improvement candidates ("deepening opportunities"), presents them with before/after visuals and recommendation-strength badges, ends with a top recommendation, and only then grills through the user's pick — a generate-options-then-choose shape that supports B2/B3 when the Design Brief already frames architecture improvement as the solution-space problem. The fresh version is now wired into `codebase-design` (vocabulary), `domain-modeling` (glossary/ADR side effects), and `grilling`, so its exploration front half still overlaps Inquiry-Analysis and its side-effect machinery belongs to other buckets.
- Confidence: medium
- Please verify: Use only when the Design Brief already frames architecture improvement as the need; the initial friction-hunting exploration drifts into inquiry.

### Matt Pocock skills / domain-modeling

- Belongs in: workflow-management (referenced here)
- Source: `TEMP-sources/mattpocock-skills/skills/engineering/domain-modeling/SKILL.md`, commit `272f99b`
- Recommendation: reference
- Why it belongs here: It is the successor to the deprecated `ubiquitous-language` and governs the two artifacts Developing-Ideas updates alongside its document: the glossary ("`CONTEXT.md`… is a glossary and nothing else" mirrors our GLOSSARY.md glossary-only rule) and sparse decision records (its three-part ADR test — hard to reverse, surprising without context, result of a real trade-off — is exactly our decision-record bar). But glossary/template mechanics are owned by workflow-management under the locked rules, so Developing-Ideas consumes this as reference for when solution terms resolve mid-phase.
- Confidence: medium
- Please verify: Confirm workflow-management claims this as its adapt; if it lands unclaimed, Developing-Ideas is the heaviest in-phase user of its ADR discipline.

### Matt Pocock skills / research

- Belongs in: inquiry-analysis (referenced here)
- Source: `TEMP-sources/mattpocock-skills/skills/engineering/research/SKILL.md`, commit `272f99b`
- Recommendation: reference
- Why it belongs here: A short skill: spin up a background agent to investigate a question against primary sources and capture cited findings as a durable Markdown file. In this bucket it serves B2 feasibility checks (can approach X actually be built on API Y?) when a design question is answerable by reading rather than prototyping. Its primary home is Inquiry-Analysis, where evidence-gathering for the Design Brief lives.
- Confidence: medium
- Please verify: Confirm inquiry-analysis takes this as its adapt/copy; Developing-Ideas only needs the pattern "research to answer a design question, capture the answer durably."

### ACT / act-create-spec

- Belongs in: developing-ideas
- Source: `TEMP-sources/act/skills/act-create-spec/SKILL.md` with `references/spec-format.md` and `references/interview-ledger-format.md`, VERSION 1.0.0
- Recommendation: adapt
- Why it belongs here: This replaces the deprecated `act-workflow-spec` (per `act/CHANGELOG.md` 1.0.0 and the old skill's own description) and is a much closer fit to B4 than its predecessor. It opens with "Do not interview the user or require outline approval" — interview-free synthesis, asking inline only for a Critical Ambiguity — and identifies Test Seams before writing, preferring existing seams. Its Spec format (Problem, Proposed Outcome, User Stories, Requirements, Technical Decisions, Testing Strategy, Out of Scope, Open/Blocking Questions, Notes) aligns with our Spec sections, and the Interview Ledger (`L#` records with status `current`/`deferred`, checked so every current record appears in the Spec) is a traceability pattern worth adapting for the Design Brief → Spec chain. Adaptation should drop the `.act/config.yaml` workflow-storage machinery and next-command routing, and route unresolved points into our loop-back-to-Inquiry move rather than `Open Questions` limbo.
- Confidence: high

### ACT / act-refine-spec

- Belongs in: evaluating (referenced here)
- Source: `TEMP-sources/act/skills/act-refine-spec/SKILL.md`, VERSION 1.0.0
- Recommendation: reference
- Why it belongs here: It replaces the deprecated `act-workflow-refine-spec` as the adversarial pre-implementation Spec review: contradictions, vague or untestable requirements, codebase-claim verification, testing-strategy gaps, terminology drift against `GLOSSARY.md`, severity-ordered evidence-backed findings, report-first-edit-never-silently. That is precisely the "Evaluating the Spec: adversarial review" step at the B4 boundary — and under the locked rules that review is an invocation of Evaluating, the reusable cross-phase review engine. Developing-Ideas keeps it as the reference for what the Spec gate must check (including its Interview Ledger coverage check, which pairs with `act-create-spec`).
- Confidence: medium
- Please verify: Placement is genuinely ambiguous — this skill only ever reviews Specs, our phase's artifact. I placed ownership with Evaluating per the locked rule that adversarial Spec review is an Evaluating invocation; confirm Evaluating's audit claims it.

### Codex Product Design / ideate

- Belongs in: developing-ideas
- Source: `TEMP-sources/product-design-0.1.47/skills/ideate/SKILL.md`, 0.1.47
- Recommendation: adapt
- Why it belongs here: Re-verified at the same pinned 0.1.47; the fresh read confirms the fit. It refuses to generate until the design brief has been "played back and confirmed" (a trusted-brief gate matching our handoff), inspects visual references directly ("Do not infer from filenames alone"), generates exactly three independent options with distinct hierarchy, layout strategy, interaction model, or product framing, and then stops: "After generating options, stop for the user's selection before any build work begins." That is a strong B2/B3 pattern for visual solution spaces, including its combine-parts-of-options feedback loop for synthesizing the chosen design.
- Confidence: high

### Codex Product Design / prototype

- Belongs in: developing-ideas
- Source: `TEMP-sources/product-design-0.1.47/skills/prototype/SKILL.md`, 0.1.47
- Recommendation: reference
- Why it belongs here: Its Golden Rule of Prototyping is the valuable part: "Do not build until you have a visual target"; "A `$get-context` brief is not a visual target"; ideate before build when no visual source exists; wait for the user to choose an option. Those gates structure the prototype jump for UI-heavy work. But the skill's body routes into `$image-to-code`/`$url-to-code` coded-prototype builds, which cross into Creating-Solution unless constrained to throwaway decision evidence.
- Confidence: medium
- Please verify: Keep only the no-build-before-visual-target and selection gates; do not import the clone/redesign/extend build workflows into Developing-Ideas.

### VGV Wingspan / brainstorm

- Belongs in: developing-ideas
- Source: `TEMP-sources/vgv-wingspan/skills/brainstorm/SKILL.md` and `references/template.md`, commit `7691c77`
- Recommendation: adapt
- Why it belongs here: The fresh version keeps everything that made it a B1-B3 match: ask about success criteria early, propose "2-3 concrete approaches" with a fixed pros/cons/best-when structure, "Lead with your recommendation and explain why," YAGNI ruthlessly ("Do we need this now, or are we guessing?"), prefer boring patterns, right-size the architecture, ask the user to choose, capture a brainstorm document ("DO NOT CODE! Just explore and document decisions."). The template records What We're Building, Why This Approach, Key Decisions with rationale, and Open Questions — a compact chosen-design record. Adaptation should drop the harness mechanics that belong elsewhere: new-project routing to `/create`, feature-branch setup, clear-context handoff, and the `/plan` handoff (Creating-Solution).
- Confidence: high

### VGV Wingspan / refine-approach

- Belongs in: evaluating (referenced here)
- Source: `TEMP-sources/vgv-wingspan/skills/refine-approach/SKILL.md`, commit `7691c77`
- Recommendation: reference
- Why it belongs here: This was "adapt" in the old audit, but the locked rules make Evaluating the reusable cross-phase review engine, and refine-approach is exactly that engine: assess, score against explicit criteria (Clarity, Completeness, Specificity, YAGNI, Scope, plus fidelity to user intent for brainstorm docs), highlight one prominent "must address" item, gate substantive edits on approval, and recommend completion after two passes. Our phase README's Spec review criteria and bounded-iteration guidance visibly descend from it, so Developing-Ideas cites it as the reference for what its Spec gate invokes — but the engine itself should be adapted once, in Evaluating, not duplicated here.
- Confidence: medium
- Please verify: This is the biggest placement change in this bucket versus the old audit (adapt → reference). Confirm Evaluating's audit claims refine-approach as adapt; if it does not, this bucket is the fallback owner.

### Superpowers / brainstorming

- Belongs in: developing-ideas
- Source: `TEMP-sources/superpowers/skills/brainstorming/SKILL.md`, v6.1.1 (`d884ae0`)
- Recommendation: adapt
- Why it belongs here: The v6 revision is still the strongest generate-options-and-choose source: propose 2-3 approaches with trade-offs, lead with the recommendation, present the design in sections scaled to complexity with approval after each, YAGNI ruthlessly, write the design doc, then a spec self-review (placeholder scan, internal consistency, scope check, ambiguity check) and an explicit user review gate before handoff. Its HARD-GATE — no implementation action "until you have presented a design and the user has approved it," with the anti-pattern callout that "'Simple' projects are where unexamined assumptions cause the most wasted work" — is a direct statement of our human-ready choice principle. Its early decomposition check (flag multi-subsystem requests before refining details) is worth carrying into B1. Adaptation should drop what belongs elsewhere: the clarifying-questions opener overlaps the Inquiry-Analysis interview (here it should start from the Design Brief), the visual-companion server is harness machinery, and the terminal invocation of `writing-plans` is the Creating-Solution handoff. The bundled `spec-document-reviewer-prompt.md` subagent template is Evaluating material (an adversarial doc-review dispatch), not part of this bucket's adapt.
- Confidence: high

## Hooks

None fit. Reviewed against `TEMP-sources/INVENTORY.md` and the source files:

- **Superpowers** `hooks/session-start` (v6.1.1): a SessionStart bootstrap that injects the `using-superpowers` skill content into context. That is session-continuity/skill-routing plumbing — workflow-management territory, and even there it is harness mechanics, not phase content.
- **VGV Wingspan** `hooks/hooks.json` + `recommend-plugins.sh` (commit `7691c77`): a PreToolUse hook on `Read|Glob|Grep` that detects project type and recommends companion plugins. Tooling-installation support, no Developing-Ideas relevance.
- **VGV AI Flutter Plugin** `hooks/hooks.json` + `scripts/` (commit `d513aac`): dart format/analyze on edit, VGV CLI guards, read-only git enforcement for the reviewer agent. All implementation-time and review-time enforcement — Creating-Solution/Evaluating adjacent, not option generation or Spec synthesis.
- **ACT** `hooks/` (VERSION 1.0.0): session logging, statusline, and Dart formatting across Claude/Codex/OpenCode. Harness instrumentation, no phase relevance.
- **Matt Pocock skills** and **Codex Product Design**: ship no hooks (per `INVENTORY.md`).

No hook in the six re-verified systems operationalizes success criteria, option generation, prototyping, design choice, or Spec synthesis, so this bucket recommends none.

## Subagents (custom droids)

| Source Pack | Subagent | Source (TEMP-sources path + pin) | Recommendation | Confidence |
| --- | --- | --- | --- | --- |
| VGV Wingspan | user-flow-analysis-agent | `TEMP-sources/vgv-wingspan/agents/analysis/user-flow-analysis-agent.md`, commit `7691c77` | reference | medium |
| VGV Wingspan | best-practices-research-agent, official-docs-research-agent | `TEMP-sources/vgv-wingspan/agents/research/best-practices-research-agent.md`, `.../official-docs-research-agent.md`, commit `7691c77` | reference | medium |
| ACT | codebase-researcher | `TEMP-sources/act/agents/act/codebase-researcher.md`, VERSION 1.0.0 | reference | medium |

Not relevant to this bucket:

- **VGV Wingspan** `agents/analysis/plan-splitting-agent.md` (commit `7691c77`): assesses whether an implementation plan should be split "into multiple independently-mergeable PRs" during plan technical review. That is work slicing after the Spec — Creating-Solution owns it.
- **VGV Wingspan** quality-review and codebase-review agents: PR/code review — Evaluating or Creating-Solution.
- **VGV AI Flutter Plugin** `agents/flutter-reviewer.md` (commit `d513aac`): a read-only reviewer of changed Dart code against preloaded VGV standards, hook-restricted to `git diff`/`git status`. Pure review engine — Evaluating.
- **ACT** `agents/act/flutter-docs-researcher.md`, `flutter-patterns-researcher.md` (VERSION 1.0.0): Flutter implementation research supporting build planning — Creating-Solution.
- **Codex Product Design** `agents/openai.yaml` (0.1.47): not an agent definition at all — it is interface metadata (display name, short description, default prompt) for the plugin surface. Nothing to place.

### VGV Wingspan / user-flow-analysis-agent

- Belongs in: evaluating (referenced here)
- Source: `TEMP-sources/vgv-wingspan/agents/analysis/user-flow-analysis-agent.md`, commit `7691c77`
- Recommendation: reference
- Why it belongs here: It takes "specifications, plans, and feature descriptions" and maps every user journey and permutation, identifies gaps by category, and emits prioritized clarifying questions with the assumptions it would make if unanswered. As a dispatched analyst over a draft Spec it is a strong lens for the B4 boundary — its flow-permutation matrix directly pressure-tests the Spec's User Stories — but its output is findings-and-questions, review-shaped, so the reusable engine belongs to Evaluating's parallel focused reviewers.
- Confidence: medium
- Please verify: Could equally be read as a B4 drafting aid (flow mapping feeds User Stories before review). I placed ownership with Evaluating per the locked review-engine rule; flag for the human if Evaluating's audit does not claim it.

### VGV Wingspan / best-practices-research-agent and official-docs-research-agent

- Belongs in: creating-solution (referenced here)
- Source: `TEMP-sources/vgv-wingspan/agents/research/best-practices-research-agent.md` and `official-docs-research-agent.md`, commit `7691c77`
- Recommendation: reference
- Why it belongs here: Both are dispatched research agents with source-attribution discipline (conventions first, then official docs, then community) and a mandatory API deprecation/sunset check before recommending anything external. In this bucket they earn a reference for B2 feasibility: when comparing approaches, a deprecation check or version-constraint lookup can eliminate an option without a prototype. Wingspan itself dispatches them from `/plan` (per the pack's own workflow docs), so their primary home is Creating-Solution's research support.
- Confidence: medium

### ACT / codebase-researcher

- Belongs in: creating-solution (referenced here)
- Source: `TEMP-sources/act/agents/act/codebase-researcher.md`, VERSION 1.0.0
- Recommendation: reference
- Why it belongs here: A read-only (`edit: deny`, `bash: deny`) research subagent that reports project structure, state-management and data-layer patterns, 2-3 reference implementations, and conventions — "findings that inform implementation decisions," with a "Don't invent: only report what you actually find" rule. Useful here as the grounding pass behind the Spec's Implementation Decisions and Testing Decisions (prior art for tests, where new code would live), but it is planning-support machinery whose primary consumer is implementation planning in Creating-Solution.
- Confidence: medium

## Rename and Removal Ledger

Every old-audit citation from the six in-scope systems that no longer exists at its old path, with disposition:

| Old citation | What happened | Disposition |
| --- | --- | --- |
| Matt `~/.agents/skills/design-an-interface/SKILL.md` | DEPRECATED — now at `skills/deprecated/design-an-interface/` (commit `272f99b`). Verified absorbed: `skills/engineering/codebase-design/DESIGN-IT-TWICE.md` carries the same parallel-sub-agent, radically-different-designs, present-then-compare pattern, upgraded with the deep-module vocabulary and an explicit recommendation step. | Cite `codebase-design` (adapt) instead; drop the deprecated skill. |
| Matt `~/.agents/skills/prototype/SKILL.md` | Moved to `skills/engineering/prototype/` and revised (LOGIC/UI branch structure, six shared rules). | Entry updated in place; still adapt. |
| Matt `~/.agents/skills/to-prd/SKILL.md` | Moved to `skills/engineering/to-prd/`. Template substance unchanged. | Entry updated in place; still adapt. |
| Matt `~/.agents/skills/grill-me/SKILL.md` | Moved to `skills/productivity/grill-me/` and hollowed out to a stub that runs `/grilling`. | Reference only; the engine (`grilling`) is owned by Inquiry-Analysis. |
| Matt `~/.agents/skills/improve-codebase-architecture/SKILL.md` | Moved to `skills/engineering/improve-codebase-architecture/`; now delegates vocabulary to `codebase-design` and side effects to `domain-modeling`/`grilling`. | Entry updated in place; still reference. |
| ACT `~/.agentic-coding-toolkit/skills/act-workflow-spec/SKILL.md` | Still present at `TEMP-sources/act/skills/act-workflow-spec/` but self-describes as "Deprecated legacy workflow skill. Prefer act-interview followed by act-create-spec." `act/CHANGELOG.md` 1.0.0 deprecates all `/act-workflow-*` skills in favor of the Interview → Create Spec → Refine Spec → Create Work Items → Implement chain. Note the legacy skill bundled interview + spec generation; the successor splits them, which matches our phase boundary (interview = Inquiry-Analysis, Spec synthesis = here). | Cite `act-create-spec` (adapt). Recommend citing the new generation everywhere; do not adapt the legacy skill. |
| ACT `~/.agentic-coding-toolkit/skills/act-workflow-refine-spec/SKILL.md` | Same deprecation ("Prefer act-refine-spec"). The successor drops the mandatory review-gate questionnaire in favor of report-first with severity labels and adds Interview Ledger and GLOSSARY.md checks. | Cite `act-refine-spec` (reference; Evaluating owns). |
| Codex Product Design `~/.codex/plugins/cache/.../0.1.47/skills/{ideate,prototype}/SKILL.md` | Path change only — same 0.1.47 version now staged under `TEMP-sources/product-design-0.1.47/`. Content re-verified unchanged in substance. | Citations repointed. |
| VGV Wingspan `https://github.com/VeryGoodOpenSource/vgv-wingspan` `skills/{brainstorm,refine-approach}/SKILL.md` | Old audit cited GitHub URLs from memory; now re-verified from the staged tree at commit `7691c77`. Pack-level changes noted by `INVENTORY.md`: `create-branch` and `create-commit` REMOVED; `create`, `rebase`, `elements-of-style` added (none of the three is a Developing-Ideas candidate). | Citations repointed to `TEMP-sources/vgv-wingspan/`; `refine-approach` downgraded adapt → reference (Evaluating owns the review engine). |
| Superpowers `https://github.com/obra/superpowers` `skills/brainstorming/SKILL.md` | Old audit cited a GitHub URL from memory; re-verified from the staged v6.1.1 tree (`d884ae0`), a major revision (HARD-GATE, decomposition check, spec self-review + user review gate, visual companion). `writing-plans` also re-read: confirmed Creating-Solution. | Citation repointed to `TEMP-sources/superpowers/`; still adapt. |
| ACT `act-meta-audit-work` | Not cited by this bucket's old audit, but noted for completeness: REMOVED in 1.0.0 per `act/CHANGELOG.md`, no successor named. | No action for this bucket. |

## Not Re-Verified This Pass (long tail)

Entries below are preserved verbatim from the previous audit pass and were not re-verified against fresh sources. Factory/Droid note: local copies under `r-and-d/borrowed-factory-skills` were deleted on 2026-07-03; entries retained by name only.

### Impeccable / impeccable

- Belongs in: developing-ideas
- Source: `https://github.com/impeccableai/impeccable` unavailable during audit; local reviewed path `/Users/jholt/.agents/skills/impeccable/SKILL.md`
- Recommendation: reference
- Why it belongs here: The local skill provides frontend design critique and refinement guidance across hierarchy, typography, layout, color, interaction, accessibility, copy, and anti-patterns. Those are useful as design criteria and option-quality lenses for UI-heavy B2/B3 work, but the skill is primarily production-UI craft and QA.
- Confidence: low
- Please verify: The requested GitHub URL returned repository-not-found during audit; confirm the intended canonical Impeccable source before importing ideas.

### Long-tail borderline / deferred notes (preserved)

- Cursor Team Kit: no strong Developing-Ideas candidate found. `workflow-from-chats` is workflow-memory extraction; `verify-this`, smoke tests, compiler checks, PR review canvas, code-quality review, CI loops, merge conflict repair, and PR preparation belong to Evaluating, Creating-Solution, or workflow-management.
- Factory/Droid borrowed: no strong Developing-Ideas candidate found. `simplify`, `qa`, `review`, security review, incident response, wiki/PDF/PowerPoint generation, and install helpers are review, validation, delivery, or tooling flows.
- Flutter official skills: no strong Developing-Ideas candidate found. The official skills are implementation-oriented Flutter tasks such as responsive layout, routing, localization, widget tests, integration tests, previews, HTTP, JSON serialization, and architecture best practices. The embedded `grill-with-docs` copy is not a Flutter official phase candidate and is already covered by the Matt-style pattern.
- Dart official skills: no strong Developing-Ideas candidate found. The skills cover Dart implementation, testing, mocks, package conflicts, runtime errors, static analysis, coverage, and CLI creation.
- Bug Hunter: no strong Developing-Ideas candidate found. The pack is an adversarial bug/security review and fix pipeline; it belongs to Evaluating and, when auto-fixing, Creating-Solution.
- planning-with-files: no Developing-Ideas-specific candidate found. It is important prior art for durable file-based planning and session recovery, but Structured Workflow already uses that idea at the system level through phase documents and `workflow-tracker.md`.
- Cline Memory Bank: no Developing-Ideas-specific candidate found. It is cross-phase durable-memory prior art with projectbrief/productContext/activeContext/systemPatterns/techContext/progress files, not a B-phase option-generation or Spec-synthesis skill.
- vgv-pr-roundtrip: deferred to Creating-Solution and GitHub/PR workflow. It begins from a buildable slice and runs build, review, commit, PR, feedback, and merge-ready loops, which occur after the Spec and issue slicing.
- Linear curated: deferred to workflow-management or Creating-Solution. Linear can receive issue work after Creating-Solution slices the completed Spec, but Structured Workflow says the Spec is the Developing-Ideas output and issue slicing belongs to Creating-Solution. Also, external issue creation requires explicit confirmation.
- Sentry curated: deferred to Inquiry-Analysis or Evaluating. It can provide production-error evidence or verification data, but it does not generate solution options or synthesize Spec-ready requirements.
