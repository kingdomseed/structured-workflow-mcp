# Evaluating Skill Audit

## Bucket Definition

Evaluating includes skills that test an artifact or implementation against explicit criteria, gather current evidence, review quality/security/accessibility/compliance, inspect CI/runtime signals, and produce a usable verdict such as pass, pass-with-warnings, fail, blocked, verified, not verified, or inconclusive.

Structured Workflow's current evaluating phase is the reusable review engine for the Design Brief, PRD, issue/slice breakdown, and built solution. A good evaluating skill should name the criteria first, compare the artifact to evidence rather than memory, mark missing evidence honestly, and send control back to the owning phase when it finds a blocker.

## Included Skills

| Source Pack | Skill | Source | Recommendation | Confidence |
| --- | --- | --- | --- | --- |
| Matt Pocock skills | review | /Users/jholt/.agents/skills/review/SKILL.md and https://github.com/mattpocock/skills/tree/main/skills/in-progress/review | adapt | high |
| Matt Pocock skills | diagnose | /Users/jholt/.agents/skills/diagnose/SKILL.md and https://github.com/mattpocock/skills/tree/main/skills/engineering/diagnose | adapt | high |
| Matt Pocock skills | improve-codebase-architecture | /Users/jholt/.agents/skills/improve-codebase-architecture/SKILL.md and https://github.com/mattpocock/skills/tree/main/skills/engineering/improve-codebase-architecture | reference | medium |
| Matt Pocock skills | printing-press-score | /Users/jholt/.agents/skills/printing-press-score/SKILL.md | reference | medium |
| Matt Pocock skills | printing-press-output-review | /Users/jholt/.agents/skills/printing-press-output-review/SKILL.md | reference | medium |
| ACT | act-meta-audit-work | /Users/jholt/.agentic-coding-toolkit/skills/act-meta-audit-work/SKILL.md | adapt | high |
| ACT | act-workflow-refine-spec | /Users/jholt/.agentic-coding-toolkit/skills/act-workflow-refine-spec/SKILL.md | adapt | high |
| ACT | act-flutter-robot-testing | /Users/jholt/.agentic-coding-toolkit/skills/act-flutter-robot-testing/SKILL.md | reference | high |
| ACT | act-flutter-screenshot | /Users/jholt/.agentic-coding-toolkit/skills/act-flutter-screenshot/SKILL.md | reference | medium |
| Codex Product Design | audit | /Users/jholt/.codex/plugins/cache/openai-curated-remote/product-design/0.1.43/skills/audit/SKILL.md | adapt | high |
| Codex Product Design | design-qa | /Users/jholt/.codex/plugins/cache/openai-curated-remote/product-design/0.1.43/skills/design-qa/SKILL.md | adapt | high |
| VGV Wingspan | review | https://github.com/VeryGoodOpenSource/vgv-wingspan/tree/main/skills/review | adapt | high |
| VGV Wingspan | plan-technical-review | https://github.com/VeryGoodOpenSource/vgv-wingspan/tree/main/skills/plan-technical-review | adapt | high |
| VGV AI Flutter Plugin | vgv-accessibility | https://github.com/VeryGoodOpenSource/vgv-ai-flutter-plugin/tree/main/skills/accessibility | adapt | high |
| VGV AI Flutter Plugin | vgv-static-security | https://github.com/VeryGoodOpenSource/vgv-ai-flutter-plugin/tree/main/skills/static-security | adapt | high |
| VGV AI Flutter Plugin | vgv-testing | https://github.com/VeryGoodOpenSource/vgv-ai-flutter-plugin/tree/main/skills/testing | reference | high |
| VGV AI Flutter Plugin | vgv-license-compliance | https://github.com/VeryGoodOpenSource/vgv-ai-flutter-plugin/tree/main/skills/license-compliance | adapt | high |
| Superpowers | verification-before-completion | https://github.com/obra/superpowers/tree/main/skills/verification-before-completion | copy | high |
| Superpowers | requesting-code-review | https://github.com/obra/superpowers/tree/main/skills/requesting-code-review | adapt | high |
| Superpowers | receiving-code-review | https://github.com/obra/superpowers/tree/main/skills/receiving-code-review | reference | medium |
| Superpowers | systematic-debugging | https://github.com/obra/superpowers/tree/main/skills/systematic-debugging | adapt | high |
| Cursor Team Kit | verify-this | https://github.com/cursor/plugins/tree/main/cursor-team-kit/skills/verify-this | copy | high |
| Cursor Team Kit | fix-ci | https://github.com/cursor/plugins/tree/main/cursor-team-kit/skills/fix-ci | adapt | high |
| Cursor Team Kit | run-smoke-tests | https://github.com/cursor/plugins/tree/main/cursor-team-kit/skills/run-smoke-tests | adapt | high |
| Cursor Team Kit | check-compiler-errors | https://github.com/cursor/plugins/tree/main/cursor-team-kit/skills/check-compiler-errors | adapt | high |
| Cursor Team Kit | thermo-nuclear-code-quality-review | https://github.com/cursor/plugins/tree/main/cursor-team-kit/skills/thermo-nuclear-code-quality-review | reference | medium |
| Cursor Team Kit | pr-review-canvas | https://github.com/cursor/plugins/tree/main/cursor-team-kit/skills/pr-review-canvas | reference | medium |
| Factory/Droid borrowed | review | /Users/jholt/development/structured-workflow-mcp/r-and-d/borrowed-factory-skills/builtin/review/SKILL.md | adapt | high |
| Factory/Droid borrowed | security-review | /Users/jholt/development/structured-workflow-mcp/r-and-d/borrowed-factory-skills/builtin/security-review/SKILL.md | adapt | high |
| Factory/Droid borrowed | deep-security-review | /Users/jholt/development/structured-workflow-mcp/r-and-d/borrowed-factory-skills/builtin/deep-security-review/SKILL.md | reference | high |
| Factory/Droid borrowed | qa | /Users/jholt/development/structured-workflow-mcp/r-and-d/borrowed-factory-skills/builtin/qa/SKILL.md | adapt | high |
| Factory/Droid borrowed | incident | /Users/jholt/development/structured-workflow-mcp/r-and-d/borrowed-factory-skills/builtin/incident/SKILL.md | reference | medium |
| Flutter official skills | code-review | https://github.com/flutter/skills/tree/main/.agents/agents/reidbaker-agent/skills/code-review | adapt | high |
| Flutter official skills | dart-test-coverage | https://github.com/flutter/skills/tree/main/tool/dart_skills_lint/.agents/skills/dart-test-coverage | reference | high |
| Flutter official skills | definition-of-done | https://github.com/flutter/skills/tree/main/tool/dart_skills_lint/.agents/skills/definition-of-done | adapt | high |
| Dart official skills | dart-run-static-analysis | https://github.com/dart-lang/skills/tree/main/skills/dart-run-static-analysis | adapt | high |
| Dart official skills | dart-collect-coverage | https://github.com/dart-lang/skills/tree/main/skills/dart-collect-coverage | reference | high |
| Dart official skills | dart-fix-runtime-errors | https://github.com/dart-lang/skills/tree/main/skills/dart-fix-runtime-errors | adapt | medium |
| Impeccable | impeccable | /Users/jholt/.agents/skills/impeccable/SKILL.md; remote listed as https://github.com/impeccableai/impeccable | adapt | low |
| Bug Hunter | bug-hunter | https://github.com/codexstar69/bug-hunter/blob/main/SKILL.md | adapt | high |
| Bug Hunter | security-review | https://github.com/codexstar69/bug-hunter/tree/main/skills/security-review | adapt | high |
| Bug Hunter | vulnerability-validation | https://github.com/codexstar69/bug-hunter/tree/main/skills/vulnerability-validation | adapt | high |
| Bug Hunter | referee | https://github.com/codexstar69/bug-hunter/tree/main/skills/referee | adapt | high |
| vgv-pr-roundtrip | vgv-pr-roundtrip | /Users/jholt/development/structured-workflow-mcp/r-and-d/cleanup-2026-06-04/saved/vgv-pr-roundtrip/SKILL.md | reference | high |
| Sentry curated | sentry | /Users/jholt/.codex/plugins/cache/openai-curated/sentry/e2d08a2e/skills/sentry/SKILL.md | reference | high |

## Justifications

### Matt Pocock skills / review

- Belongs in: evaluating
- Source: /Users/jholt/.agents/skills/review/SKILL.md and https://github.com/mattpocock/skills/tree/main/skills/in-progress/review
- Recommendation: adapt
- Why it belongs here: It reviews a diff against two explicit criteria sets, repo standards and the originating spec. That maps directly to evaluating's "criteria first, evidence-backed verdict" engine for changed artifacts.
- Confidence: high

### Matt Pocock skills / diagnose

- Belongs in: evaluating
- Source: /Users/jholt/.agents/skills/diagnose/SKILL.md and https://github.com/mattpocock/skills/tree/main/skills/engineering/diagnose
- Recommendation: adapt
- Why it belongs here: It forces reproduction, falsifiable hypotheses, instrumentation, and regression verification before declaring a bug fixed. It is especially useful for evaluating runtime failures or failed verification slices.
- Confidence: high

### Matt Pocock skills / improve-codebase-architecture

- Belongs in: evaluating
- Source: /Users/jholt/.agents/skills/improve-codebase-architecture/SKILL.md and https://github.com/mattpocock/skills/tree/main/skills/engineering/improve-codebase-architecture
- Recommendation: reference
- Why it belongs here: It assesses maintainability, test seams, shallow modules, and architecture friction with recommendation strength. It fits evaluating as a quality review lens, but its report-and-grill loop also overlaps Developing-Ideas.
- Confidence: medium
- Please verify: Confirm whether architecture-deepening recommendations should live under evaluating or remain a cross-phase advisory lens invoked from evaluation findings.

### Matt Pocock skills / printing-press-score

- Belongs in: evaluating
- Source: /Users/jholt/.agents/skills/printing-press-score/SKILL.md
- Recommendation: reference
- Why it belongs here: It scores generated CLIs against a named bar and supports comparison. The domain is narrow, but the scoring/verdict pattern is useful for Structured Workflow evaluation documents.
- Confidence: medium
- Please verify: This appears local/domain-specific rather than upstream Matt Pocock content; verify the intended source before synthesis.

### Matt Pocock skills / printing-press-output-review

- Belongs in: evaluating
- Source: /Users/jholt/.agents/skills/printing-press-output-review/SKILL.md
- Recommendation: reference
- Why it belongs here: It performs human-plausibility review on sampled command outputs, catches issues rule-based checks miss, and returns PASS or warnings. This is a good pattern for evidence review after automated verification.
- Confidence: medium
- Please verify: This is internal to Printing Press; copy only the pattern, not the domain contract.

### ACT / act-meta-audit-work

- Belongs in: evaluating
- Source: /Users/jholt/.agentic-coding-toolkit/skills/act-meta-audit-work/SKILL.md
- Recommendation: adapt
- Why it belongs here: It audits a previous run using logs, git history, plan state, and a clear evidence model: Verified, Likely, Not Provable, Failed, Skipped, then Pass, Pass With Warnings, or Fail. This is very close to the current evaluating phase design.
- Confidence: high

### ACT / act-workflow-refine-spec

- Belongs in: evaluating
- Source: /Users/jholt/.agentic-coding-toolkit/skills/act-workflow-refine-spec/SKILL.md
- Recommendation: adapt
- Why it belongs here: It is an adversarial spec review for gaps, assumptions, UX coherence, data model fit, and codebase alignment. It matches evaluating's boundary review for Design Briefs and PRDs before downstream trust.
- Confidence: high

### ACT / act-flutter-robot-testing

- Belongs in: evaluating
- Source: /Users/jholt/.agentic-coding-toolkit/skills/act-flutter-robot-testing/SKILL.md
- Recommendation: reference
- Why it belongs here: It defines deterministic user-journey verification and explicit residual-risk reporting for Flutter. It should inform evaluating's method selection where Flutter widget journeys are the evidence source.
- Confidence: high

### ACT / act-flutter-screenshot

- Belongs in: evaluating
- Source: /Users/jholt/.agentic-coding-toolkit/skills/act-flutter-screenshot/SKILL.md
- Recommendation: reference
- Why it belongs here: It captures visual evidence from a running Flutter app for verification loops. It is not a full evaluator by itself, but it supplies evidence that evaluating can cite.
- Confidence: medium
- Please verify: Keep it as an evidence-capture helper unless final synthesis wants tool-specific subskills inside evaluating.

### Codex Product Design / audit

- Belongs in: evaluating
- Source: /Users/jholt/.codex/plugins/cache/openai-curated-remote/product-design/0.1.43/skills/audit/SKILL.md
- Recommendation: adapt
- Why it belongs here: It audits UX, design, and accessibility from freshly captured screenshots, ties findings to evidence, states limits, and reports risks and recommendations. That is a strong evaluating pattern for product surfaces.
- Confidence: high

### Codex Product Design / design-qa

- Belongs in: evaluating
- Source: /Users/jholt/.codex/plugins/cache/openai-curated-remote/product-design/0.1.43/skills/design-qa/SKILL.md
- Recommendation: adapt
- Why it belongs here: It compares source visual truth to rendered implementation, requires both artifacts, blocks if evidence is missing, and produces passed or blocked. This directly matches evaluating's falsifiable verdict model.
- Confidence: high

### VGV Wingspan / review

- Belongs in: evaluating
- Source: https://github.com/VeryGoodOpenSource/vgv-wingspan/tree/main/skills/review
- Recommendation: adapt
- Why it belongs here: It runs parallel quality review agents, consolidates findings, and is designed for code review before merging. Structured Workflow can use its multi-lens review pattern for evaluating changed implementations.
- Confidence: high

### VGV Wingspan / plan-technical-review

- Belongs in: evaluating
- Source: https://github.com/VeryGoodOpenSource/vgv-wingspan/tree/main/skills/plan-technical-review
- Recommendation: adapt
- Why it belongs here: It reviews an implementation plan for simplicity, VGV practice alignment, and split readiness before build. That maps to evaluating the creating-solution slice breakdown before it becomes tracker work.
- Confidence: high

### VGV AI Flutter Plugin / vgv-accessibility

- Belongs in: evaluating
- Source: https://github.com/VeryGoodOpenSource/vgv-ai-flutter-plugin/tree/main/skills/accessibility
- Recommendation: adapt
- Why it belongs here: It audits Flutter widgets against selected WCAG 2.2 levels and platforms, with severity templates and platform-specific checks. This is a clear accessibility evaluation lens.
- Confidence: high

### VGV AI Flutter Plugin / vgv-static-security

- Belongs in: evaluating
- Source: https://github.com/VeryGoodOpenSource/vgv-ai-flutter-plugin/tree/main/skills/static-security
- Recommendation: adapt
- Why it belongs here: It reviews Flutter/Dart source for secrets, storage, network, auth, crypto, dependency vulnerability, and platform security issues. This is an explicit security evaluation skill.
- Confidence: high

### VGV AI Flutter Plugin / vgv-testing

- Belongs in: evaluating
- Source: https://github.com/VeryGoodOpenSource/vgv-ai-flutter-plugin/tree/main/skills/testing
- Recommendation: reference
- Why it belongs here: It defines what good Dart and Flutter tests look like. It is partly creation guidance, but it is also a useful standard for evaluating test quality and whether verification evidence is meaningful.
- Confidence: high

### VGV AI Flutter Plugin / vgv-license-compliance

- Belongs in: evaluating
- Source: https://github.com/VeryGoodOpenSource/vgv-ai-flutter-plugin/tree/main/skills/license-compliance
- Recommendation: adapt
- Why it belongs here: It audits dependency licenses, flags non-compliant or unknown licenses, and produces a compliance summary. That is a release-readiness evaluation lens.
- Confidence: high

### Superpowers / verification-before-completion

- Belongs in: evaluating
- Source: https://github.com/obra/superpowers/tree/main/skills/verification-before-completion
- Recommendation: copy
- Why it belongs here: Its core rule is evidence before completion claims. That is the same discipline as evaluating's refusal to pass missing evidence and should be copied into the general evaluation gate.
- Confidence: high

### Superpowers / requesting-code-review

- Belongs in: evaluating
- Source: https://github.com/obra/superpowers/tree/main/skills/requesting-code-review
- Recommendation: adapt
- Why it belongs here: It dispatches focused reviewer context against a work product and requires acting on Critical and Important feedback before proceeding. That supports Structured Workflow's adversarial review engine.
- Confidence: high

### Superpowers / receiving-code-review

- Belongs in: evaluating
- Source: https://github.com/obra/superpowers/tree/main/skills/receiving-code-review
- Recommendation: reference
- Why it belongs here: It requires review feedback to be understood and verified against codebase reality before implementation. It is more about handling evaluation output than producing it.
- Confidence: medium
- Please verify: Consider placing this in workflow-management if final synthesis separates "evaluation production" from "evaluation response."

### Superpowers / systematic-debugging

- Belongs in: evaluating
- Source: https://github.com/obra/superpowers/tree/main/skills/systematic-debugging
- Recommendation: adapt
- Why it belongs here: It requires reproducible evidence, root-cause tracing, and verification before fixes. It is a strong runtime-failure evaluation loop.
- Confidence: high

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
- Source: /Users/jholt/development/structured-workflow-mcp/r-and-d/borrowed-factory-skills/builtin/review/SKILL.md
- Recommendation: adapt
- Why it belongs here: It reviews PR/branch diffs for high-confidence bugs, security issues, correctness problems, and broken contracts, with severity and confidence rules. This is a strong code-review evaluator.
- Confidence: high

### Factory/Droid borrowed / security-review

- Belongs in: evaluating
- Source: /Users/jholt/development/structured-workflow-mcp/r-and-d/borrowed-factory-skills/builtin/security-review/SKILL.md
- Recommendation: adapt
- Why it belongs here: It defines diff and full-project security audit modes using STRIDE, OWASP, LLM security risks, supply-chain review, and explicit scope selection. It belongs as a security evaluation lens.
- Confidence: high

### Factory/Droid borrowed / deep-security-review

- Belongs in: evaluating
- Source: /Users/jholt/development/structured-workflow-mcp/r-and-d/borrowed-factory-skills/builtin/deep-security-review/SKILL.md
- Recommendation: reference
- Why it belongs here: It is an exhaustive security audit with multi-pass verdict stabilization, provenance, findings, judge output, and evidence artifacts. The depth and side-effect profile are too heavy for default use, but its verdict/provenance model is valuable.
- Confidence: high

### Factory/Droid borrowed / qa

- Belongs in: evaluating
- Source: /Users/jholt/development/structured-workflow-mcp/r-and-d/borrowed-factory-skills/builtin/qa/SKILL.md
- Recommendation: adapt
- Why it belongs here: It performs diff-targeted functional QA, captures evidence, reports PASS/FAIL/BLOCKED/FLAKY/INCONCLUSIVE, and refuses unrelated flows. This fits built-solution evaluation well.
- Confidence: high

### Factory/Droid borrowed / incident

- Belongs in: evaluating
- Source: /Users/jholt/development/structured-workflow-mcp/r-and-d/borrowed-factory-skills/builtin/incident/SKILL.md
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

## Borderline / Deferred

- Matt Pocock skills / tdd: defer to Creating-Solution. It improves how tests are created, but the evaluation bucket should consume the resulting tests as evidence rather than own the red-green implementation loop.
- Matt Pocock skills / qa: defer. The local Matt QA skill is an issue-filing conversation flow with external side effects, not primarily an evidence-backed verdict skill.
- Matt Pocock skills / setup-pre-commit and git-guardrails-claude-code: defer to workflow-management or Creating-Solution. They install guardrails rather than evaluate an artifact.
- ACT / act-flutter-tdd: defer to Creating-Solution. It is a vertical-slice implementation discipline, though its test-quality contract can be referenced by evaluating.
- ACT / act-workflow-work: defer. It contains validation gates, but the skill's main purpose is execution and reconciliation, not independent evaluation.
- ACT / act-flutter-development, act-flutter-driver-mcp, act-flutter-sentry-init, project creation, git, and migration skills: no strong evaluating candidate beyond tool/setup support.
- Codex Product Design / research: defer to Inquiry-Analysis. It gathers source-grounded UX evidence but does not evaluate a specific artifact against known criteria.
- Codex Product Design / prototype, ideate, image-to-code, url-to-code, get-context, share, user-context: defer to Developing-Ideas or Creating-Solution.
- VGV Wingspan / build, hotfix, create-pr, create-commit, create-branch, rebase, plan, refine-approach, brainstorm, debrief, elements-of-style: no stronger evaluating fit than the included review and plan-technical-review skills. Build/hotfix contain validation references but primarily create.
- Superpowers / test-driven-development, executing-plans, finishing-a-development-branch, subagent-driven-development, writing-plans, brainstorming: defer. They can invoke evaluation, but their primary bucket is planning or implementation.
- Cursor Team Kit / get-pr-comments, loop-on-ci, review-and-ship, make-pr-easy-to-review, weekly-review, what-did-i-get-done, workflow-from-chats, control-cli, control-ui, deslop: mostly support, execution, presentation, or workflow operations. Evaluation should reference their evidence where useful rather than copy them wholesale.
- Factory/Droid borrowed / summarize-diff: defer. It summarizes changes and calls out risks/tests but does not run verification or produce a verdict.
- Factory/Droid borrowed / simplify: borderline quality review, but it fixes issues directly and lacks a clear pass/warning/fail artifact; better treated as Creating-Solution cleanup unless final synthesis wants an optional quality lens.
- Factory/Droid borrowed / agent-browser: evidence-capture helper only; evaluating may use it but should not classify browser control itself as an evaluating skill.
- Flutter official skills / flutter-add-widget-test, flutter-add-integration-test, flutter-fix-layout-issues, flutter-build-responsive-layout, routing/localization/HTTP/json skills: mostly implementation or test-creation support, not independent evaluation.
- Dart official skills / dart-add-unit-test, dart-generate-test-mocks, dart-build-cli-app, package conflict and migration skills: mostly implementation support.
- planning-with-files: no strong evaluating skill. Its `check-complete.sh` and `attest-plan.sh` are useful workflow-management references for completion status and tamper detection, but the pack's primary purpose is durable planning files, not artifact evaluation.
- Cline Memory Bank: no strong evaluating candidate found from the provided docs URL. It belongs as durable memory / workflow-management inspiration, not evaluating.
- Linear curated: no strong evaluating candidate. It is useful for reading issue acceptance criteria and review comments as source-of-truth evidence, but issue management itself belongs outside evaluating and has external side effects.
- Impeccable remote: listed URL returned 404. Local copy was included at low confidence because it appears to contain UI critique/audit behavior.

## Notes For Final Synthesis

- Strongest generic patterns to copy/adapt: ACT `act-meta-audit-work`, Cursor `verify-this`, Superpowers `verification-before-completion`, Product Design `design-qa`, and Bug Hunter `referee`.
- Keep Evaluating as one reusable engine, not a folder of unrelated "run checks" helpers: criteria first, evidence next, per-criterion result, rollup verdict, and loop-back target.
- Separate evidence capture helpers from verdict skills. Screenshots, Sentry reads, coverage collection, browser control, and Linear issue reads are inputs to evaluation, not evaluation by themselves.
- Preserve the current Structured Workflow distinction: Evaluating reports the verdict and owns the shipping gate; Creating-Solution owns fixes.
- Use `Pass`, `Pass-With-Warnings`, `Fail`, and `Blocked` as the human-facing rollup; use `Verified`, `Likely`, `Not Provable`, `Failed`, and `Skipped` per criterion.
