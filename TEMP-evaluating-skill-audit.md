# Evaluating Skill Audit

## Bucket Definition

Evaluating includes skills that test an artifact or implementation against explicit criteria, gather current evidence, review quality/security/accessibility/compliance, inspect CI/runtime signals, and produce a usable verdict such as pass, pass-with-warnings, fail, blocked, verified, not verified, or inconclusive.

Structured Workflow's evaluating phase is the reusable review engine for the Design Brief, the Spec, the issue/slice breakdown, and the built solution. A good evaluating skill names the criteria first, compares the artifact to evidence rather than memory, marks missing evidence honestly, and sends control back to the owning phase when it finds a blocker. The per-phase adversarial reviews (Spec refinement review, plan technical review, slice-breakdown review) are invocations of this engine, so review-engine skills live here even when the reviewed artifact belongs to another phase. Slice-level "it builds" verification stays in Creating-Solution; evaluating owns the framework's one hard gate: ship (fail = no ship).

## Skills

All entries below were re-read in full from the staged sources in `TEMP-sources/` (pins per `TEMP-sources/INVENTORY.md`). A recurring lesson from the fresh reads, carried forward from the old audit: keep verdict skills separate from evidence-capture helpers (screenshots, coverage, log reads are inputs to evaluation, not evaluation), and keep the verdict artifact falsifiable — criteria first, per-criterion result, rollup, loop-back target.

| Source Pack | Skill | Source (TEMP-sources path + pin) | Recommendation | Confidence |
| --- | --- | --- | --- | --- |
| Matt Pocock skills | code-review | `TEMP-sources/mattpocock-skills/skills/engineering/code-review/SKILL.md` @ 272f99b (2026-07-03) | adapt | high |
| Matt Pocock skills | diagnosing-bugs | `TEMP-sources/mattpocock-skills/skills/engineering/diagnosing-bugs/SKILL.md` @ 272f99b (2026-07-03) | adapt | high |
| Matt Pocock skills | improve-codebase-architecture | `TEMP-sources/mattpocock-skills/skills/engineering/improve-codebase-architecture/SKILL.md` @ 272f99b (2026-07-03) | reference | medium |
| Superpowers | verification-before-completion | `TEMP-sources/superpowers/skills/verification-before-completion/SKILL.md` @ v6.1.1, d884ae0 (2026-07-02) | copy | high |
| Superpowers | requesting-code-review | `TEMP-sources/superpowers/skills/requesting-code-review/SKILL.md` (+ `code-reviewer.md`) @ v6.1.1, d884ae0 (2026-07-02) | adapt | high |
| Superpowers | receiving-code-review | `TEMP-sources/superpowers/skills/receiving-code-review/SKILL.md` @ v6.1.1, d884ae0 (2026-07-02) | reference | medium |
| Superpowers | systematic-debugging | `TEMP-sources/superpowers/skills/systematic-debugging/SKILL.md` @ v6.1.1, d884ae0 (2026-07-02) | adapt | high |
| VGV Wingspan | review | `TEMP-sources/vgv-wingspan/skills/review/SKILL.md` @ 7691c77 (2026-07-03) | adapt | high |
| VGV Wingspan | plan-technical-review | `TEMP-sources/vgv-wingspan/skills/plan-technical-review/SKILL.md` @ 7691c77 (2026-07-03) | adapt | high |
| VGV AI Flutter Plugin | accessibility | `TEMP-sources/vgv-ai-flutter-plugin/skills/accessibility/SKILL.md` @ d513aac (2026-07-02) | adapt | high |
| VGV AI Flutter Plugin | static-security | `TEMP-sources/vgv-ai-flutter-plugin/skills/static-security/SKILL.md` @ d513aac (2026-07-02) | adapt | high |
| VGV AI Flutter Plugin | testing | `TEMP-sources/vgv-ai-flutter-plugin/skills/testing/SKILL.md` @ d513aac (2026-07-02) | reference | high |
| VGV AI Flutter Plugin | license-compliance | `TEMP-sources/vgv-ai-flutter-plugin/skills/license-compliance/SKILL.md` @ d513aac (2026-07-02) | adapt | high |
| VGV AI Flutter Plugin | green-gate | `TEMP-sources/vgv-ai-flutter-plugin/skills/green-gate/SKILL.md` @ d513aac (2026-07-02) | reference | high |
| ACT | act-refine-spec | `TEMP-sources/act/skills/act-refine-spec/SKILL.md` @ VERSION 1.0.0 (2026-07-03) | adapt | high |
| ACT | act-flutter-robot-testing | `TEMP-sources/act/skills/act-flutter-robot-testing/SKILL.md` @ VERSION 1.0.0 (2026-07-03) | reference | high |
| ACT | act-flutter-screenshot | `TEMP-sources/act/skills/act-flutter-screenshot/SKILL.md` @ VERSION 1.0.0 (2026-07-03) | reference | medium |
| Codex Product Design | audit | `TEMP-sources/product-design-0.1.47/skills/audit/SKILL.md` @ 0.1.47 | adapt | high |
| Codex Product Design | design-qa | `TEMP-sources/product-design-0.1.47/skills/design-qa/SKILL.md` @ 0.1.47 | adapt | high |

### Matt Pocock skills / code-review

- Belongs in: evaluating
- Source: `TEMP-sources/mattpocock-skills/skills/engineering/code-review/SKILL.md` @ 272f99b (2026-07-03)
- Recommendation: adapt
- Why it belongs here: The fresh skill (renamed and rewritten from the old `in-progress/review`) reviews the diff since a pinned fixed point along two deliberately separate axes — Standards (repo-documented standards plus a fixed Fowler smell baseline of twelve labelled heuristics) and Spec (does the code implement what the originating issue/PRD asked for, including missing requirements, scope creep, and wrong implementations). Both axes run as parallel sub-agents, findings are reported side by side without reranking, and the skill fails fast on a bad ref or empty diff before spawning reviewers. That is exactly our engine: criteria named first, artifact compared to a stated source of truth, and a "Standards pass / Spec fail" split that stops one axis masking the other.
- Confidence: high

### Matt Pocock skills / diagnosing-bugs

- Belongs in: evaluating
- Source: `TEMP-sources/mattpocock-skills/skills/engineering/diagnosing-bugs/SKILL.md` @ 272f99b (2026-07-03)
- Recommendation: adapt
- Why it belongs here: Renamed and substantially revised from the old `diagnose`. The fresh version makes Phase 1 — building a tight, red-capable, deterministic, agent-runnable feedback loop — the entire skill ("No red-capable command, no Phase 2"), then requires reproduce-and-minimise, 3-5 falsifiable ranked hypotheses, one-variable instrumentation with tagged debug logs, a regression test at a correct seam (with "no correct seam exists" recorded as a finding), and a cleanup checklist before declaring done. This is the evidence discipline evaluating needs when the artifact under judgment is a runtime failure or a failed verification slice.
- Confidence: high

### Matt Pocock skills / improve-codebase-architecture

- Belongs in: evaluating
- Source: `TEMP-sources/mattpocock-skills/skills/engineering/improve-codebase-architecture/SKILL.md` @ 272f99b (2026-07-03)
- Recommendation: reference
- Why it belongs here: The fresh version scans for shallow modules, missing test seams, and locality problems using the `/codebase-design` vocabulary and the deletion test, and labels each candidate with a recommendation strength (`Strong` / `Worth exploring` / `Speculative`). That graded-recommendation quality lens is useful when evaluating surfaces "this cannot be locked down by a test" findings. But its center of gravity has moved further from verdicting: it presents an HTML report and then runs a `/grilling` design loop with `CONTEXT.md`/ADR side effects, which is Developing-Ideas work. Reference only; Developing-Ideas is the natural owner of the grill-through-a-candidate half.
- Confidence: medium
- Please verify: Confirm Developing-Ideas claims this skill as its adapt home; if no bucket does, the report-with-recommendation-strength pattern should still be cited here.

### Superpowers / verification-before-completion

- Belongs in: evaluating
- Source: `TEMP-sources/superpowers/skills/verification-before-completion/SKILL.md` @ v6.1.1, d884ae0 (2026-07-02)
- Recommendation: copy
- Why it belongs here: Re-read at v6.1.1; the Iron Law stands: "NO COMPLETION CLAIMS WITHOUT FRESH VERIFICATION EVIDENCE." The gate function (identify the proving command, run it fresh and complete, read the full output, only then claim), the claim-vs-required-evidence table (including red-green verification for regression tests and "agent said success → verify independently via VCS diff"), and the rationalization table are precisely our "missing evidence is never recorded as a pass" rule in enforcement form. Copy into the general evaluation gate.
- Confidence: high

### Superpowers / requesting-code-review

- Belongs in: evaluating
- Source: `TEMP-sources/superpowers/skills/requesting-code-review/SKILL.md` and `code-reviewer.md` @ v6.1.1, d884ae0 (2026-07-02)
- Recommendation: adapt
- Why it belongs here: Dispatches a reviewer subagent with precisely crafted context — never the session's history — against a pinned git range plus the plan/requirements, and requires acting on Critical and Important findings before proceeding. The bundled `code-reviewer.md` template is a complete reviewer contract: read-only review rules (never move HEAD; use a temp worktree), plan-alignment checks that distinguish justified deviations from departures, severity calibration ("not everything is Critical"), and a mandatory verdict ("Ready to merge? Yes | No | With fixes"). This is our adversarial-review invocation pattern with a usable verdict shape.
- Confidence: high

### Superpowers / receiving-code-review

- Belongs in: evaluating
- Source: `TEMP-sources/superpowers/skills/receiving-code-review/SKILL.md` @ v6.1.1, d884ae0 (2026-07-02)
- Recommendation: reference
- Why it belongs here: Re-read at v6.1.1; it governs how evaluation output is consumed — verify feedback against codebase reality before implementing, clarify all unclear items before acting on any, push back with technical reasoning, no performative agreement. It is about handling a verdict rather than producing one, so it is a reference for the loop-back half of our engine (control returning to the owning phase with findings in hand); workflow-management may end up the better owner of the response protocol.
- Confidence: medium
- Please verify: Decide whether "evaluation response" lives here or in workflow-management's loop-back mechanics.

### Superpowers / systematic-debugging

- Belongs in: evaluating
- Source: `TEMP-sources/superpowers/skills/systematic-debugging/SKILL.md` @ v6.1.1, d884ae0 (2026-07-02)
- Recommendation: adapt
- Why it belongs here: Re-read at v6.1.1. The Iron Law ("NO FIXES WITHOUT ROOT CAUSE INVESTIGATION FIRST"), four gated phases (root cause with per-layer diagnostic instrumentation in multi-component systems, pattern analysis against working examples, single falsifiable hypothesis tested minimally, fix with a failing test first), and the v6 escalation rule that three failed fixes means question the architecture rather than attempt fix #4 — all of this is evidence-before-judgment discipline for runtime-failure evaluation. Overlaps Matt's diagnosing-bugs; synthesis should merge the two (Matt's feedback-loop construction + Superpowers' rationalization tables and architecture escalation).
- Confidence: high

### VGV Wingspan / review

- Belongs in: evaluating
- Source: `TEMP-sources/vgv-wingspan/skills/review/SKILL.md` @ 7691c77 (2026-07-03)
- Recommendation: adapt
- Why it belongs here: Re-read at 7691c77. It detects review scope (branch diff via script, explicit paths, or user-confirmed full project — never silently defaulting to whole-repo), runs four review agents in parallel (@vgv-review-agent, @code-simplicity-review-agent, @test-quality-review-agent, @architecture-review-agent), has each write a full report to `docs/code-review/` and return only a structured severity-count summary, then consolidates into Critical/Important/Suggestions and asks the user what to act on. Explicitly advisory ("It presents findings and lets you decide"), agent failures are non-fatal but reported so the review is known incomplete. This is our multi-lens parallel review engine, including the report-file-plus-summary context pattern.
- Confidence: high

### VGV Wingspan / plan-technical-review

- Belongs in: evaluating
- Source: `TEMP-sources/vgv-wingspan/skills/plan-technical-review/SKILL.md` @ 7691c77 (2026-07-03)
- Recommendation: adapt
- Why it belongs here: Re-read at 7691c77. It runs three agents in parallel over an implementation plan — simplicity review, VGV-practice review, and the plan-splitting-agent's scope assessment — then gates on the split recommendation via explicit user approval before the skill (not the agent) generates standalone part-plans with dependency sections. This is the evaluating engine invoked on Creating-Solution's slice breakdown before it becomes tracker work: per-lens criteria, findings, and a proceed/refine decision returned to the owning phase (it returns control to the caller when invoked by `/plan`).
- Confidence: high

### VGV AI Flutter Plugin / accessibility

- Belongs in: evaluating
- Source: `TEMP-sources/vgv-ai-flutter-plugin/skills/accessibility/SKILL.md` @ d513aac (2026-07-02)
- Recommendation: adapt
- Why it belongs here: Re-read at d513aac. It refuses to audit against an assumed bar: Phase 1 forces explicit WCAG 2.2 conformance-level selection (A / AA / AA + selected AAA / AAA) and Phase 2 forces platform selection before any finding is produced, then audits seven categories with per-finding criterion ID, severity, platform, current-vs-expected behavior, and a before/after fix. Remediation scope is a separate user decision after the report. Criteria-first, evidence-tied, verdict-then-fix-decision — a model accessibility evaluation lens.
- Confidence: high

### VGV AI Flutter Plugin / static-security

- Belongs in: evaluating
- Source: `TEMP-sources/vgv-ai-flutter-plugin/skills/static-security/SKILL.md` @ d513aac (2026-07-02)
- Recommendation: adapt
- Why it belongs here: Re-read at d513aac. Static security review for Flutter/Dart anchored to VGV's security guide and OWASP Mobile Top 10, scoped honestly to "something detectable by reading source code — no pen-testing or runtime analysis." Covers secrets (including the `--dart-define` trap), secure storage, network/certificate validation, server-side auth enforcement, crypto, input validation, log exposure, and supply-chain checks with wrong/right code pairs. A clear security evaluation lens with explicit evidence limits.
- Confidence: high

### VGV AI Flutter Plugin / testing

- Belongs in: evaluating
- Source: `TEMP-sources/vgv-ai-flutter-plugin/skills/testing/SKILL.md` @ d513aac (2026-07-02)
- Recommendation: reference
- Why it belongs here: Re-read at d513aac. It is primarily authoring guidance (structure, mocktail, pumpApp, lifecycle) whose adapt home is Creating-Solution, but its standards and anti-pattern tables (tautological assertions, top-level setUp, shared mutable state, `find.byKey` as default, real Blocs in widget tests) are the bar evaluating uses to judge whether test evidence is meaningful — coverage produced by bad tests is not evidence.
- Confidence: high

### VGV AI Flutter Plugin / license-compliance

- Belongs in: evaluating
- Source: `TEMP-sources/vgv-ai-flutter-plugin/skills/license-compliance/SKILL.md` @ d513aac (2026-07-02)
- Recommendation: adapt
- Why it belongs here: Re-read at d513aac. Audits dependency licenses via the Very Good CLI MCP tool, categorizes by risk (permissive / weak copyleft / strong copyleft / unknown), treats a missing license as "all rights reserved — always flag," tracks transitive copyleft obligations, and produces a structured compliance report with flagged dependencies and recommendations. A release-readiness evaluation lens with honest unknown-handling ("flag for manual review when in doubt — never assume compliance").
- Confidence: high

### VGV AI Flutter Plugin / green-gate

- Belongs in: evaluating
- Source: `TEMP-sources/vgv-ai-flutter-plugin/skills/green-gate/SKILL.md` @ d513aac (2026-07-02)
- Recommendation: reference
- Why it belongs here: New at d513aac. Its gate discipline is the best mechanical statement of our Definition-of-Done bar anywhere in the sources: four gates (analyze → format → test → coverage) with fixed precedence, "never cache green — re-evaluate every gate every round," "exit only on observed numbers" in one final all-green iteration, "never weaken a gate" (no deleted assertions, no lowered targets, no `// coverage:ignore` on reachable code), and per-gate failure fingerprints that make no-progress and oscillation detectable. But the skill's job is a verify-fix-rerun loop that edits code and authors tests, which is Creating-Solution's work under our phase split (evaluating reports; Creating-Solution fixes). Primary home: creating-solution. Evaluating should cite its exit criteria, fingerprint model, and escalation matrix as the DoD-gate reference.
- Confidence: high

### ACT / act-refine-spec

- Belongs in: evaluating
- Source: `TEMP-sources/act/skills/act-refine-spec/SKILL.md` @ VERSION 1.0.0 (2026-07-03); Flutter wrapper at `TEMP-sources/act/skills/act-refine-spec-flutter/SKILL.md`
- Recommendation: adapt
- Why it belongs here: This is the 1.0.0 successor to the now-deprecated `act-workflow-refine-spec` (whose own description says "Prefer act-refine-spec") — cite this one. It is an adversarial Spec review with a report-only default posture ("Edit only when the user explicitly asks"), a context check that verifies the Spec's codebase claims against actual code, a traceability check against the Interview Ledger and `GLOSSARY.md` (weakened ledger answers, deferred decisions treated as resolved), a review lens that includes testing-strategy gaps (missing seams, automation/manual split, regression coverage for risky behavior), severity labels Critical/High/Medium/Low with mandatory evidence per finding, "do not invent findings to fill the format," and an explicit no-blocking-findings path that states residual risks instead of forcing a prompt. This is our Spec-boundary invocation of the evaluating engine, with better honesty rules than its predecessor. The `-flutter` variant is a thin wrapper adding Flutter/Dart checks; treat it as ecosystem seasoning, not a separate skill.
- Confidence: high

### ACT / act-flutter-robot-testing

- Belongs in: evaluating
- Source: `TEMP-sources/act/skills/act-flutter-robot-testing/SKILL.md` @ VERSION 1.0.0 (2026-07-03)
- Recommendation: reference
- Why it belongs here: Re-read at 1.0.0; now a router-style skill over references for robot-driven Flutter widget journey tests: stable key-first selectors, deterministic Test Seams (DI/fakes/async control), a retrofitting playbook, and — most relevant to this bucket — a consistent risk-reporting format for coverage and residual risk. It informs evaluating's D1 method selection when Flutter user journeys are the evidence source; the test authoring itself is Creating-Solution work.
- Confidence: high

### ACT / act-flutter-screenshot

- Belongs in: evaluating
- Source: `TEMP-sources/act/skills/act-flutter-screenshot/SKILL.md` @ VERSION 1.0.0 (2026-07-03)
- Recommendation: reference
- Why it belongs here: Re-read at 1.0.0. It captures screenshots from a running Flutter app and defines a make-change → user hot-reloads → capture → analyze → iterate verification loop with concrete verification prompts ("verify the header shows 'Settings'…"). It is an evidence-capture helper, not an evaluator: evaluating can cite its artifacts but should not classify screenshot capture as evaluation.
- Confidence: medium
- Please verify: Keep as an evidence-capture helper unless final synthesis wants tool-specific evidence subskills inside evaluating.

### Codex Product Design / audit

- Belongs in: evaluating
- Source: `TEMP-sources/product-design-0.1.47/skills/audit/SKILL.md` @ 0.1.47
- Recommendation: adapt
- Why it belongs here: Unchanged at 0.1.47 and re-read in full. It audits a product flow only from screenshots captured in the current run ("Do not use memory, prior chats, old traces, cached screenshots"), rejects invalid captures (blank, loading, wrong state) before accepting them as evidence, ties every UX/design/accessibility finding to a numbered step and screenshot, and states evidence limits explicitly ("Do not claim full accessibility compliance from screenshots alone"). Fresh-evidence-only review with named blockers is exactly our engine pointed at a product surface.
- Confidence: high

### Codex Product Design / design-qa

- Belongs in: evaluating
- Source: `TEMP-sources/product-design-0.1.47/skills/design-qa/SKILL.md` @ 0.1.47
- Recommendation: adapt
- Why it belongs here: Unchanged at 0.1.47 and re-read in full. It compares a source visual target to the rendered implementation with both artifacts required — if either cannot be opened or compared, the run writes `final result: blocked` and refuses to let the build hand off as done. It normalizes state before judging, mandates five fidelity surfaces every pass, separates objective mismatches from subjective polish, and the final result must be exactly `passed` or `blocked` with P0-P3 severity governing which. This is the clearest falsifiable-verdict model in the sources: missing evidence is blocked, never passed.
- Confidence: high

## Hooks

Judged per system against one question: does the hook evaluate an artifact against criteria (a gate), or does it shape the build/session (Creating-Solution or workflow-management)?

| Source Pack | Hook | Source (TEMP-sources path + pin) | Recommendation | Confidence |
| --- | --- | --- | --- | --- |
| VGV AI Flutter Plugin | analyze.sh (PostToolUse, blocking) | `TEMP-sources/vgv-ai-flutter-plugin/hooks/scripts/analyze.sh` + `hooks/hooks.json` @ d513aac (2026-07-02) | adapt | high |
| VGV AI Flutter Plugin | allow-readonly-git.sh (agent-scoped PreToolUse) | `TEMP-sources/vgv-ai-flutter-plugin/hooks/scripts/allow-readonly-git.sh` @ d513aac (2026-07-02) | adapt | high |

### VGV AI Flutter Plugin / analyze.sh

- Belongs in: evaluating
- Source: `TEMP-sources/vgv-ai-flutter-plugin/hooks/scripts/analyze.sh`, wired in `hooks/hooks.json` as a PostToolUse hook on `Edit|Write` @ d513aac (2026-07-02)
- Recommendation: adapt
- Why it belongs here: It runs `dart analyze` on every edited `.dart` file and exits 2 (blocking) on failure, so an edit that introduces an analyzer error is rejected in the same round — a mechanical, always-on evaluation gate rather than a formatting convenience. The green-gate skill explicitly treats its rejection as analyze-gate feedback. This is the smallest working example of "a stated criterion mechanically refusing to pass," which is the shape of our ship gate. Its sibling `format.sh` (non-blocking, always exit 0) is build-time formatting and belongs to Creating-Solution.
- Confidence: high

### VGV AI Flutter Plugin / allow-readonly-git.sh

- Belongs in: evaluating
- Source: `TEMP-sources/vgv-ai-flutter-plugin/hooks/scripts/allow-readonly-git.sh` @ d513aac (2026-07-02), declared agent-scoped in `agents/flutter-reviewer.md` frontmatter
- Recommendation: adapt
- Why it belongs here: It enforces the reviewer's read-only contract mechanically: the flutter-reviewer agent's Bash is restricted to bare `git diff` / `git status`, with shell operators (`;`, `|`, redirection, command substitution) denied outright to block compound-command bypass. This is our "review first, edit never (silently)" rule turned into infrastructure — the review pass cannot quietly rewrite the work. Worth adapting for any reviewer subagent we build.
- Confidence: high

### Systems with no evaluating hooks

- **Superpowers** (`TEMP-sources/superpowers/hooks/hooks.json` @ v6.1.1, d884ae0): a single SessionStart bootstrap that injects the `using-superpowers` skill. Session wiring, not evaluation — workflow-management territory. None fit.
- **VGV Wingspan** (`TEMP-sources/vgv-wingspan/hooks/hooks.json` @ 7691c77): a PreToolUse hook on `Read|Glob|Grep` that recommends companion plugins by project detection. Environment/setup advice, no gate. None fit.
- **ACT** (`TEMP-sources/act/hooks/hooks.json` @ 1.0.0): session/tool logging to `ai_logs/` across ten hook events, Dart auto-format on edit, and a statusline. Formatting is Creating-Solution; logging and statusline are workflow-management. One note for synthesis: the `ai_logs/` trail was the evidence source the removed `act-meta-audit-work` consumed, so whichever bucket owns logging is producing evidence evaluating can later read. None fit as evaluating hooks.
- **VGV AI Flutter Plugin (remaining scripts)**: `check-vgv-cli.sh`, `block-cli-workarounds.sh`, `warn-missing-mcp.sh` enforce tool-integrity (use MCP tools, not CLI bypasses). They keep evidence trustworthy but gate tool usage, not artifacts — Creating-Solution/workflow-management. Not listed here.
- **Matt Pocock skills** and **Codex Product Design**: ship no hooks (per `TEMP-sources/INVENTORY.md` and repo inspection).

## Subagents (custom droids)

| Source Pack | Subagent | Source (TEMP-sources path + pin) | Recommendation | Confidence |
| --- | --- | --- | --- | --- |
| VGV Wingspan | vgv-review-agent | `TEMP-sources/vgv-wingspan/agents/codebase-review/vgv-review-agent.md` @ 7691c77 (2026-07-03) | adapt | high |
| VGV Wingspan | code-simplicity-review-agent | `TEMP-sources/vgv-wingspan/agents/codebase-review/code-simplicity-review-agent.md` @ 7691c77 (2026-07-03) | adapt | high |
| VGV Wingspan | codebase-review-agent | `TEMP-sources/vgv-wingspan/agents/codebase-review/codebase-review-agent.md` @ 7691c77 (2026-07-03) | reference | medium |
| VGV Wingspan | architecture-review-agent | `TEMP-sources/vgv-wingspan/agents/quality-review/architecture-review-agent.md` @ 7691c77 (2026-07-03) | adapt | high |
| VGV Wingspan | pr-readiness-review-agent | `TEMP-sources/vgv-wingspan/agents/quality-review/pr-readiness-review-agent.md` @ 7691c77 (2026-07-03) | adapt | high |
| VGV Wingspan | test-quality-review-agent | `TEMP-sources/vgv-wingspan/agents/quality-review/test-quality-review-agent.md` @ 7691c77 (2026-07-03) | adapt | high |
| VGV Wingspan | plan-splitting-agent | `TEMP-sources/vgv-wingspan/agents/analysis/plan-splitting-agent.md` @ 7691c77 (2026-07-03) | reference | medium |
| VGV AI Flutter Plugin | flutter-reviewer | `TEMP-sources/vgv-ai-flutter-plugin/agents/flutter-reviewer.md` @ d513aac (added 2026-07-02) | adapt | high |

### VGV Wingspan / vgv-review-agent

- Belongs in: evaluating
- Source: `TEMP-sources/vgv-wingspan/agents/codebase-review/vgv-review-agent.md` @ 7691c77 (2026-07-03)
- Recommendation: adapt
- Why it belongs here: The default general reviewer for `/review` and `/build`. Four ordered passes — regressions and breaking changes first, then architecture/conventions, then testing quality, then a simplicity/YAGNI audit — with stack detection before reviewing, an anti-pattern table, a strict-on-existing-code / pragmatic-on-new-code calibration, and a structured output ending in a merge verdict. Its file-report-plus-summary output contract (write full review to a path, return only verdict + severity counts to the caller) is the context-economical dispatch pattern our parallel reviewers should use.
- Confidence: high

### VGV Wingspan / code-simplicity-review-agent

- Belongs in: evaluating
- Source: `TEMP-sources/vgv-wingspan/agents/codebase-review/code-simplicity-review-agent.md` @ 7691c77 (2026-07-03)
- Recommendation: adapt
- Why it belongs here: A single-lens reviewer: YAGNI violations, unnecessary abstractions, removable code with estimated LOC reduction, and a final assessment ("Proceed with simplifications / Minor tweaks only / Already minimal"). Also used by plan-technical-review to judge plan simplicity, which makes it a per-lens component of both our built-solution review and our slice-breakdown review. Matches Structured Workflow's "small durable change" default.
- Confidence: high

### VGV Wingspan / codebase-review-agent

- Belongs in: evaluating
- Source: `TEMP-sources/vgv-wingspan/agents/codebase-review/codebase-review-agent.md` @ 7691c77 (2026-07-03)
- Recommendation: reference
- Why it belongs here: Despite living in `codebase-review/`, its examples and methodology are mostly discovery — mapping structure, conventions, templates, and patterns so someone can "quickly understand and align with the project's established patterns." Its quality checklist gives evaluating a useful whole-codebase health lens, but the agent's primary job is research context-gathering, which Inquiry-Analysis owns. Reference here; not part of the default reviewer set for `/review` either (the skill dispatches the other four).
- Confidence: medium

### VGV Wingspan / architecture-review-agent

- Belongs in: evaluating
- Source: `TEMP-sources/vgv-wingspan/agents/quality-review/architecture-review-agent.md` @ 7691c77 (2026-07-03)
- Recommendation: adapt
- Why it belongs here: Post-implementation architectural validation with hard criteria: layer separation ("One cross-layer import is a violation, not a judgment call"), state-management correctness table, dependency-direction checks including circulars, and package-structure checklist — every violation reported as `file:line`, ending in a verdict ("Architecture is clean / Fix N violations before merging"). A crisp example of explicit criteria plus a mechanical verdict.
- Confidence: high

### VGV Wingspan / pr-readiness-review-agent

- Belongs in: evaluating
- Source: `TEMP-sources/vgv-wingspan/agents/quality-review/pr-readiness-review-agent.md` @ 7691c77 (2026-07-03)
- Recommendation: adapt
- Why it belongs here: Purely mechanical ship-readiness evaluation: formatter in check mode, static analysis with severity-to-action mapping, a debug-artifact table (prints, TODO/FIXME in new code, commented-out code, secrets, conflict markers, silent test skips), and commit hygiene — with an Auto-Fixable list and a verdict. "This review is mechanical, not subjective. Every finding should be objectively verifiable" is the Definition-of-Done lane of our built-solution evaluation; deliberately runs on a small model (haiku), a useful costing precedent.
- Confidence: high

### VGV Wingspan / test-quality-review-agent

- Belongs in: evaluating
- Source: `TEMP-sources/vgv-wingspan/agents/quality-review/test-quality-review-agent.md` @ 7691c77 (2026-07-03)
- Recommendation: adapt
- Why it belongs here: Audits whether test evidence is trustworthy: coverage audit per testable unit, pattern compliance detected from the project's own test files, quality signals (success/failure/edge paths, behavior-not-implementation assertions), and an anti-pattern table (tautologies, mock-everything, implementation mirroring, over-verification). Its founding premise — "bad tests are worse than no tests: they create false confidence" — is exactly why evaluating must judge the evidence itself, not just the green check.
- Confidence: high

### VGV Wingspan / plan-splitting-agent

- Belongs in: evaluating
- Source: `TEMP-sources/vgv-wingspan/agents/analysis/plan-splitting-agent.md` @ 7691c77 (2026-07-03)
- Recommendation: reference
- Why it belongs here: Invoked by plan-technical-review (adapted above) to assess plan scope across multiple signals (estimated LOC, layers touched, new files/packages, separability) with a two-outcome verdict (split recommended / no split) and honest borderline guidance ("Never force a bad split… when in doubt, lean toward no split"). The assessment half is evaluating; the proposed restructuring is consumed by Creating-Solution's slice breakdown, and the sibling `user-flow-analysis-agent` in the same folder is planning support. Reference: the scope-verdict pattern should inform our slice-breakdown review lens without importing the whole agent.
- Confidence: medium

### VGV AI Flutter Plugin / flutter-reviewer

- Belongs in: evaluating
- Source: `TEMP-sources/vgv-ai-flutter-plugin/agents/flutter-reviewer.md` @ d513aac (added 2026-07-02)
- Recommendation: adapt
- Why it belongs here: A read-only reviewer with the tightest evidence contract in the sources: no Edit/Write tools, Bash restricted by an agent-scoped hook to `git diff`/`git status`, findings only from four preloaded standards (bloc, testing, static-security, accessibility) — "If a finding cannot name one of the four loaded standards, omit it." It self-scopes to changed Dart code, refuses to guess when scoping fails, refuses to review the whole repo, reports out-of-domain changed areas so a clean table is not mistaken for full coverage, and never invents findings for an empty scope. Criteria named first, evidence-only findings, honest coverage limits, fixes described but never applied — this is our review engine as a dispatchable droid.
- Confidence: high

### Systems with no evaluating subagents

- **Codex Product Design** (`TEMP-sources/product-design-0.1.47/agents/openai.yaml` @ 0.1.47): read in full — it is not an agent definition at all, only an interface manifest (display name, short description, default prompt for the plugin). The default prompt does route toward "prototype QA" via the design-qa skill, but there is no reviewer role to adapt. None fit.
- **ACT** (`TEMP-sources/act/agents/act/` @ 1.0.0): three researcher subagents (codebase-researcher, flutter-docs-researcher, flutter-patterns-researcher). Read of `codebase-researcher.md` confirms a read-only research role ("report findings that inform implementation decisions") — Inquiry-Analysis owns these. None fit.
- **Superpowers** @ v6.1.1: ships no agent definitions; the closest artifact is the `code-reviewer.md` prompt template covered under requesting-code-review above. The `dispatching-parallel-agents` and `subagent-driven-development` skills are about subagent use generally (workflow-management/Creating-Solution). None fit.
- **Matt Pocock skills** @ 272f99b: no subagents shipped (plugin.json lists skills only); code-review composes ad-hoc `general-purpose` sub-agents inline, covered in its skill entry.

## Rename and Removal Ledger

Every old-audit entry from the six re-verified systems, with fresh disposition. All old `~/` and GitHub citations are superseded by `TEMP-sources/` paths.

| Old audit entry | Fresh disposition |
| --- | --- |
| Matt Pocock / review (`~/.agents/skills/review`, `skills/in-progress/review`) | RENAMED and promoted to `skills/engineering/code-review/` @ 272f99b. Content rewritten: now a two-axis (Standards vs Spec) review with parallel sub-agents and a Fowler smell baseline. Entry retained as **code-review**, still adapt. |
| Matt Pocock / diagnose (`~/.agents/skills/diagnose`, `skills/engineering/diagnose`) | RENAMED to `skills/engineering/diagnosing-bugs/` @ 272f99b. Content revised: feedback-loop construction is now the explicit core ("No red-capable command, no Phase 2"), with minimisation and seam-quality findings added. Entry retained as **diagnosing-bugs**, still adapt. |
| Matt Pocock / improve-codebase-architecture | Moved to `skills/engineering/improve-codebase-architecture/` @ 272f99b. Content shifted further toward design exploration (HTML report + grilling loop). Still reference, now with a Developing-Ideas ownership flag. |
| Matt Pocock / printing-press-score | REMOVED from the audit surface: not present anywhere in `TEMP-sources/mattpocock-skills/` @ 272f99b (glob-verified). It was a local, domain-specific skill with no upstream home. No fresh source to cite; dropped. Its scoring-against-a-named-bar pattern is already covered by our per-criterion verdict model. |
| Matt Pocock / printing-press-output-review | REMOVED, same finding as above (absent from the fresh repo). Its human-plausibility pass over sampled outputs remains a good pattern for post-automation evidence review, but there is no citable source; dropped. |
| ACT / act-meta-audit-work | REMOVED. `act/CHANGELOG.md` 1.0.0: "Removed the obsolete `act-meta-audit-work` skill from the toolkit." No direct successor skill exists; the 1.0.0 workflow replaces the audit-a-previous-run step with the refine-and-implement loop (`act-refine-spec`, `act-implement`). Its evidence model (Verified / Likely / Not Provable / Failed / Skipped rolling into Pass / Pass With Warnings / Fail) — the old audit's strongest generic pattern — now survives only in our own phase design and cannot be cited from a fresh source. Entry dropped; pattern retained by us. |
| ACT / act-workflow-refine-spec | DEPRECATED, still present at `TEMP-sources/act/skills/act-workflow-refine-spec/SKILL.md` with description "Deprecated legacy workflow skill. Prefer act-refine-spec." Both were read in full. Recommendation: cite **act-refine-spec** — it keeps the adversarial five-dimension posture and adds Interview Ledger traceability, `GLOSSARY.md` terminology checks, testing-strategy review, and a stricter report-only default. Old entry replaced by the act-refine-spec entry above. |
| ACT / act-flutter-robot-testing | Still present @ 1.0.0; restructured into a router over reference files with explicit guardrails. Still reference. |
| ACT / act-flutter-screenshot | Still present @ 1.0.0; execution path changed to the ACT-run-script helper and it now forbids `flutter attach`. Still reference (evidence capture). |
| Superpowers / verification-before-completion | Re-read at v6.1.1 (major revision since old audit); Iron Law, gate function, and evidence tables intact. Still copy. |
| Superpowers / requesting-code-review | Re-read at v6.1.1; template-driven dispatch with read-only review rules confirmed. Still adapt. |
| Superpowers / receiving-code-review | Re-read at v6.1.1; verify-before-implementing protocol confirmed. Still reference. |
| Superpowers / systematic-debugging | Re-read at v6.1.1; adds the 3-failed-fixes → question-the-architecture escalation. Still adapt. |
| VGV Wingspan / review | Re-read @ 7691c77; now scope-detection + four default agents + report-dir consolidation + explicit advisory posture. Still adapt. |
| VGV Wingspan / plan-technical-review | Re-read @ 7691c77; adds plan-splitting-agent and skill-generated part-plans behind user approval. Still adapt. |
| VGV AI Flutter Plugin / accessibility, static-security, testing, license-compliance | All re-read @ d513aac; content consistent with prior entries (accessibility now WCAG 2.2 with mandatory level/platform selection phases). Recommendations unchanged. |
| VGV AI Flutter Plugin / green-gate (NEW @ d513aac) | Evaluated: reference here; primary home Creating-Solution (it edits code to fix). Its exit-only-on-observed-numbers gate discipline is cited as our DoD-gate reference. |
| VGV AI Flutter Plugin / very-good-analysis-upgrade (NEW @ d513aac) | Evaluated (`skills/very-good-analysis-upgrade/SKILL.md` read in full): a focused maintenance chore — bump the lint package, fix only newly introduced warnings, end with a clean analyze, ship a single-purpose PR. It uses analysis as verification but its purpose is changing the solution; primary home Creating-Solution. Not listed in this bucket. |
| Codex Product Design / audit, design-qa | Unchanged at 0.1.47 (only cached version; not re-fetched) and re-read in full. Recommendations unchanged. |

## Not Re-Verified This Pass (long tail)

The entries below are preserved verbatim from the previous audit pass and were **not** re-verified against fresh sources this pass. Their cited paths and URLs are as-of the earlier audit. For the Factory/Droid borrowed entries: the local copies under `r-and-d/borrowed-factory-skills` were deleted on 2026-07-03; those entries are retained by name only.

### Cursor Team Kit / verify-this

- Belongs in: evaluating
- Source: https://github.com/cursor/plugins/tree/main/cursor-team-kit/skills/verify-this
- Recommendation: copy
- Why it belongs here: It restates a claim falsifiably, captures baseline and treatment evidence, compares artifacts, and returns VERIFIED, NOT VERIFIED, or INCONCLUSIVE. This is nearly a standalone Structured Workflow evaluation primitive.
- Confidence: high

### Cursor Team Kit / fix-ci

- Belongs in: evaluating
- Source: https://github.com/cursor/plugins/tree/main/cursor-team-kit/skills/fix-ci
- Recommendation: adapt
- Why it belongs here: It inspects failing PR checks, uses CI as source of truth, applies minimal fixes, and rechecks until green. Evaluating needs this for CI/runtime evidence and stop-and-fix loops.
- Confidence: high

### Cursor Team Kit / run-smoke-tests

- Belongs in: evaluating
- Source: https://github.com/cursor/plugins/tree/main/cursor-team-kit/skills/run-smoke-tests
- Recommendation: adapt
- Why it belongs here: It runs end-to-end smoke checks, investigates failures, reruns to reduce flake risk, and reports remaining risk. This is a practical built-solution evidence method.
- Confidence: high

### Cursor Team Kit / check-compiler-errors

- Belongs in: evaluating
- Source: https://github.com/cursor/plugins/tree/main/cursor-team-kit/skills/check-compiler-errors
- Recommendation: adapt
- Why it belongs here: It runs compile and type-check commands, summarizes failures, fixes high-confidence issues, and reruns until clean or blocked. This belongs in the Definition-of-Done evidence lane.
- Confidence: high

### Cursor Team Kit / thermo-nuclear-code-quality-review

- Belongs in: evaluating
- Source: https://github.com/cursor/plugins/tree/main/cursor-team-kit/skills/thermo-nuclear-code-quality-review
- Recommendation: reference
- Why it belongs here: It is a strict maintainability and abstraction-quality review. The lens is useful for evaluating code quality, but its tone and ambition are stronger than Structured Workflow's "small durable change" default.
- Confidence: medium
- Please verify: Use as an optional deep quality lens, not the default evaluation voice.

### Cursor Team Kit / pr-review-canvas

- Belongs in: evaluating
- Source: https://github.com/cursor/plugins/tree/main/cursor-team-kit/skills/pr-review-canvas
- Recommendation: reference
- Why it belongs here: It builds an evidence-rich walkthrough from PR data and diffs. It is more presentation/reporting than verdicting, but useful for final evaluation handoff summaries.
- Confidence: medium
- Please verify: Treat as report-shaping inspiration unless Structured Workflow wants HTML review artifacts.

### Factory/Droid borrowed / review

- Belongs in: evaluating
- Source: `r-and-d/borrowed-factory-skills/builtin/review/SKILL.md` (local copy deleted 2026-07-03; entry retained by name only)
- Recommendation: adapt
- Why it belongs here: It reviews PR/branch diffs for high-confidence bugs, security issues, correctness problems, and broken contracts, with severity and confidence rules. This is a strong code-review evaluator.
- Confidence: high

### Factory/Droid borrowed / security-review

- Belongs in: evaluating
- Source: `r-and-d/borrowed-factory-skills/builtin/security-review/SKILL.md` (local copy deleted 2026-07-03; entry retained by name only)
- Recommendation: adapt
- Why it belongs here: It defines diff and full-project security audit modes using STRIDE, OWASP, LLM security risks, supply-chain review, and explicit scope selection. It belongs as a security evaluation lens.
- Confidence: high

### Factory/Droid borrowed / deep-security-review

- Belongs in: evaluating
- Source: `r-and-d/borrowed-factory-skills/builtin/deep-security-review/SKILL.md` (local copy deleted 2026-07-03; entry retained by name only)
- Recommendation: reference
- Why it belongs here: It is an exhaustive security audit with multi-pass verdict stabilization, provenance, findings, judge output, and evidence artifacts. The depth and side-effect profile are too heavy for default use, but its verdict/provenance model is valuable.
- Confidence: high

### Factory/Droid borrowed / qa

- Belongs in: evaluating
- Source: `r-and-d/borrowed-factory-skills/builtin/qa/SKILL.md` (local copy deleted 2026-07-03; entry retained by name only)
- Recommendation: adapt
- Why it belongs here: It performs diff-targeted functional QA, captures evidence, reports PASS/FAIL/BLOCKED/FLAKY/INCONCLUSIVE, and refuses unrelated flows. This fits built-solution evaluation well.
- Confidence: high

### Factory/Droid borrowed / incident

- Belongs in: evaluating
- Source: `r-and-d/borrowed-factory-skills/builtin/incident/SKILL.md` (local copy deleted 2026-07-03; entry retained by name only)
- Recommendation: reference
- Why it belongs here: It investigates alerts through observability tools and code to produce RCA, impact, and fixes. It belongs to evaluating when runtime evidence or production impact is the evaluation target, but it also has incident-response persistence behavior outside the bucket.
- Confidence: medium
- Please verify: Keep external-system and guideline-writing side effects out of Structured Workflow's default evaluating skill.

### Flutter official skills / code-review

- Belongs in: evaluating
- Source: https://github.com/flutter/skills/tree/main/.agents/agents/reidbaker-agent/skills/code-review
- Recommendation: adapt
- Why it belongs here: It performs a multi-step code review with context enrichment, issue-focused criteria, critique of comments, severity ordering, and a final review artifact. This is a language/ecosystem-specific evaluation pattern.
- Confidence: high

### Flutter official skills / dart-test-coverage

- Belongs in: evaluating
- Source: https://github.com/flutter/skills/tree/main/tool/dart_skills_lint/.agents/skills/dart-test-coverage
- Recommendation: reference
- Why it belongs here: It runs and interprets coverage, identifies missed lines, and reports coverage gaps. It is a useful quantitative evidence method, not a full verdict engine.
- Confidence: high

### Flutter official skills / definition-of-done

- Belongs in: evaluating
- Source: https://github.com/flutter/skills/tree/main/tool/dart_skills_lint/.agents/skills/definition-of-done
- Recommendation: adapt
- Why it belongs here: It defines mandatory checks before declaring work complete. Structured Workflow evaluation needs this style of project-specific DoD checklist as a standing bar.
- Confidence: high

### Dart official skills / dart-run-static-analysis

- Belongs in: evaluating
- Source: https://github.com/dart-lang/skills/tree/main/skills/dart-run-static-analysis
- Recommendation: adapt
- Why it belongs here: It runs analyzer checks, reviews diagnostics, applies mechanical fixes when appropriate, and reruns analysis. This is direct verification evidence for Dart work.
- Confidence: high

### Dart official skills / dart-collect-coverage

- Belongs in: evaluating
- Source: https://github.com/dart-lang/skills/tree/main/skills/dart-collect-coverage
- Recommendation: reference
- Why it belongs here: It collects coverage and validates LCOV output. This belongs as a coverage evidence method for Dart/Flutter evaluation.
- Confidence: high

### Dart official skills / dart-fix-runtime-errors

- Belongs in: evaluating
- Source: https://github.com/dart-lang/skills/tree/main/skills/dart-fix-runtime-errors
- Recommendation: adapt
- Why it belongs here: Despite the title, the inspected content focuses on static/runtime error diagnosis and verify-fix loops using `dart analyze` and `dart test`. It can support Dart failure evaluation, but overlaps with Creating-Solution because it fixes.
- Confidence: medium
- Please verify: Confirm the upstream skill body is not mislabeled or stale before copying any wording.

### Impeccable / impeccable

- Belongs in: evaluating
- Source: /Users/jholt/.agents/skills/impeccable/SKILL.md; remote listed as https://github.com/impeccableai/impeccable
- Recommendation: adapt
- Why it belongs here: The local Impeccable skill is explicitly used for interface critique, audit, polish, hardening, and design improvement. It is a plausible UI quality evaluation lens, but the listed GitHub URL returned 404 during this audit.
- Confidence: low
- Please verify: Find the authoritative Impeccable source before final synthesis; do not rely on the inaccessible URL alone.

### Bug Hunter / bug-hunter

- Belongs in: evaluating
- Source: https://github.com/codexstar69/bug-hunter/blob/main/SKILL.md
- Recommendation: adapt
- Why it belongs here: It runs adversarial bug hunting with recon, hunter, skeptic, referee, verification checkpoints, and scan-only modes. It is an evaluating-heavy pipeline for runtime behavior, regressions, and security.
- Confidence: high

### Bug Hunter / security-review

- Belongs in: evaluating
- Source: https://github.com/codexstar69/bug-hunter/tree/main/skills/security-review
- Recommendation: adapt
- Why it belongs here: It combines threat models, dependency CVEs, STRIDE review, and validation of severe findings. This is a security-specific evaluation workflow.
- Confidence: high

### Bug Hunter / vulnerability-validation

- Belongs in: evaluating
- Source: https://github.com/codexstar69/bug-hunter/tree/main/skills/vulnerability-validation
- Recommendation: adapt
- Why it belongs here: It validates security findings for reachability, exploitability, mitigations, CVSS, proof of concept, and impact. This is exactly "do not pass findings without evidence."
- Confidence: high

### Bug Hunter / referee

- Belongs in: evaluating
- Source: https://github.com/codexstar69/bug-hunter/tree/main/skills/referee
- Recommendation: adapt
- Why it belongs here: It independently arbitrates Hunter and Skeptic findings, re-reads code, and emits REAL_BUG, NOT_A_BUG, or MANUAL_REVIEW with confidence and verification mode. This is a strong verdict model for Structured Workflow.
- Confidence: high

### vgv-pr-roundtrip / vgv-pr-roundtrip

- Belongs in: evaluating
- Source: /Users/jholt/development/structured-workflow-mcp/r-and-d/cleanup-2026-06-04/saved/vgv-pr-roundtrip/SKILL.md
- Recommendation: reference
- Why it belongs here: It enforces repeated review rounds, PR checks, review-thread handling, docs reconciliation, mergeability, and Greptile confidence before stopping. It is broader than evaluating, but its local-review and external-feedback gates are useful for ship readiness.
- Confidence: high

### Sentry curated / sentry

- Belongs in: evaluating
- Source: /Users/jholt/.codex/plugins/cache/openai-curated/sentry/e2d08a2e/skills/sentry/SKILL.md
- Recommendation: reference
- Why it belongs here: It provides read-only production issue and event evidence with explicit auth, pagination, PII redaction, and no heuristic caching. It is an evidence source for runtime evaluation, not a general evaluator.
- Confidence: high
