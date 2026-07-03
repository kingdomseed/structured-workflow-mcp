# Creating-Solution Skill Audit

Re-verified 2026-07-03 against fresh staged sources under `TEMP-sources/` (see
`TEMP-sources/INVENTORY.md` for pins). Every entry in the Skills, Hooks, and
Subagents sections was re-read in full from its staged file. Long-tail packs
were not re-verified this pass; their prior entries are preserved at the end.

## Bucket Definition

Creating-Solution owns the build phase after Developing-Ideas has produced a trusted Spec. A skill belongs here when it helps the agent decompose the completed Spec into tracer-bullet vertical slices, choose the per-slice technical approach, execute implementation, verify slices at build time, commit and publish work, keep the issue tracker reconciled, or record justified deviations from the Spec/Design Brief. It does not own problem inquiry, choosing the solution, deep acceptance evaluation, or broad post-build quality verdicts except where a check is needed to make a slice build and function before moving on.

Note on the slicing boundary: the act of decomposing the Spec into slices/issues is owned here (the old workflow-management audit also claimed `to-issues`; this bucket is the primary home for the slicing act itself). Tracker-coordination mechanics — state models, position tracking, cross-phase reconciliation — belong to workflow-management.

## Skills

| Source Pack | Skill | Source (TEMP-sources path + pin) | Recommendation | Confidence |
| --- | --- | --- | --- | --- |
| Matt Pocock skills | to-issues | `TEMP-sources/mattpocock-skills/skills/engineering/to-issues/SKILL.md` @ `272f99b` | copy | high |
| Matt Pocock skills | implement | `TEMP-sources/mattpocock-skills/skills/engineering/implement/SKILL.md` @ `272f99b` | adapt | high |
| Matt Pocock skills | tdd | `TEMP-sources/mattpocock-skills/skills/engineering/tdd/SKILL.md` @ `272f99b` | adapt | high |
| Matt Pocock skills | diagnosing-bugs | `TEMP-sources/mattpocock-skills/skills/engineering/diagnosing-bugs/SKILL.md` @ `272f99b` | reference | medium |
| Matt Pocock skills | triage | `TEMP-sources/mattpocock-skills/skills/engineering/triage/SKILL.md` @ `272f99b` | reference | medium |
| ACT | act-create-issues | `TEMP-sources/act/skills/act-create-issues/SKILL.md` @ 1.0.0 | adapt | high |
| ACT | act-create-issues-flutter | `TEMP-sources/act/skills/act-create-issues-flutter/SKILL.md` @ 1.0.0 | reference | high |
| ACT | act-implement | `TEMP-sources/act/skills/act-implement/SKILL.md` @ 1.0.0 | adapt | high |
| ACT | act-implement-flutter | `TEMP-sources/act/skills/act-implement-flutter/SKILL.md` @ 1.0.0 | reference | high |
| ACT | act-workflow-work (deprecated) | `TEMP-sources/act/skills/act-workflow-work/SKILL.md` @ 1.0.0 | reference | medium |
| ACT | act-flutter-development | `TEMP-sources/act/skills/act-flutter-development/SKILL.md` @ 1.0.0 | reference | high |
| ACT | act-flutter-tdd | `TEMP-sources/act/skills/act-flutter-tdd/SKILL.md` @ 1.0.0 | reference | high |
| ACT | act-flutter-robot-testing | `TEMP-sources/act/skills/act-flutter-robot-testing/SKILL.md` @ 1.0.0 | reference | high |
| ACT | act-flutter-screenshot | `TEMP-sources/act/skills/act-flutter-screenshot/SKILL.md` @ 1.0.0 | reference | high |
| ACT | act-git-commit | `TEMP-sources/act/skills/act-git-commit/SKILL.md` @ 1.0.0 | reference | high |
| ACT | act-git-push-make-pr | `TEMP-sources/act/skills/act-git-push-make-pr/SKILL.md` @ 1.0.0 | reference | medium |
| Codex Product Design | image-to-code | `TEMP-sources/product-design-0.1.47/skills/image-to-code/SKILL.md` @ 0.1.47 | adapt | high |
| Codex Product Design | url-to-code | `TEMP-sources/product-design-0.1.47/skills/url-to-code/SKILL.md` @ 0.1.47 | adapt | high |
| Codex Product Design | design-qa | `TEMP-sources/product-design-0.1.47/skills/design-qa/SKILL.md` @ 0.1.47 | reference | medium |
| VGV Wingspan | build | `TEMP-sources/vgv-wingspan/skills/build/SKILL.md` @ `7691c77` | adapt | high |
| VGV Wingspan | plan | `TEMP-sources/vgv-wingspan/skills/plan/SKILL.md` @ `7691c77` | adapt | high |
| VGV Wingspan | plan-technical-review | `TEMP-sources/vgv-wingspan/skills/plan-technical-review/SKILL.md` @ `7691c77` | reference | high |
| VGV Wingspan | create-pr | `TEMP-sources/vgv-wingspan/skills/create-pr/SKILL.md` @ `7691c77` | adapt | high |
| VGV Wingspan | rebase | `TEMP-sources/vgv-wingspan/skills/rebase/SKILL.md` @ `7691c77` | reference | medium |
| VGV Wingspan | create | `TEMP-sources/vgv-wingspan/skills/create/SKILL.md` @ `7691c77` | reference | medium |
| VGV Wingspan | hotfix | `TEMP-sources/vgv-wingspan/skills/hotfix/SKILL.md` @ `7691c77` | reference | medium |
| VGV AI Flutter Plugin | green-gate | `TEMP-sources/vgv-ai-flutter-plugin/skills/green-gate/SKILL.md` @ `d513aac` | adapt | high |
| VGV AI Flutter Plugin | layered-architecture | `TEMP-sources/vgv-ai-flutter-plugin/skills/layered-architecture/SKILL.md` @ `d513aac` | reference | high |
| VGV AI Flutter Plugin | bloc | `TEMP-sources/vgv-ai-flutter-plugin/skills/bloc/SKILL.md` @ `d513aac` | reference | high |
| VGV AI Flutter Plugin | testing | `TEMP-sources/vgv-ai-flutter-plugin/skills/testing/SKILL.md` @ `d513aac` | reference | high |
| VGV AI Flutter Plugin | create-project | `TEMP-sources/vgv-ai-flutter-plugin/skills/create-project/SKILL.md` @ `d513aac` | reference | medium |
| VGV AI Flutter Plugin | navigation | `TEMP-sources/vgv-ai-flutter-plugin/skills/navigation/SKILL.md` @ `d513aac` | reference | high |
| VGV AI Flutter Plugin | ui-package | `TEMP-sources/vgv-ai-flutter-plugin/skills/ui-package/SKILL.md` @ `d513aac` | reference | high |
| Superpowers | writing-plans | `TEMP-sources/superpowers/skills/writing-plans/SKILL.md` @ v6.1.1 `d884ae0` | adapt | high |
| Superpowers | executing-plans | `TEMP-sources/superpowers/skills/executing-plans/SKILL.md` @ v6.1.1 `d884ae0` | adapt | high |
| Superpowers | subagent-driven-development | `TEMP-sources/superpowers/skills/subagent-driven-development/SKILL.md` @ v6.1.1 `d884ae0` | adapt | high |
| Superpowers | test-driven-development | `TEMP-sources/superpowers/skills/test-driven-development/SKILL.md` @ v6.1.1 `d884ae0` | adapt | high |
| Superpowers | verification-before-completion | `TEMP-sources/superpowers/skills/verification-before-completion/SKILL.md` @ v6.1.1 `d884ae0` | reference | high |
| Superpowers | finishing-a-development-branch | `TEMP-sources/superpowers/skills/finishing-a-development-branch/SKILL.md` @ v6.1.1 `d884ae0` | adapt | high |
| Superpowers | systematic-debugging | `TEMP-sources/superpowers/skills/systematic-debugging/SKILL.md` @ v6.1.1 `d884ae0` | reference | medium |
| Superpowers | requesting-code-review | `TEMP-sources/superpowers/skills/requesting-code-review/SKILL.md` @ v6.1.1 `d884ae0` | reference | medium |
| Superpowers | receiving-code-review | `TEMP-sources/superpowers/skills/receiving-code-review/SKILL.md` @ v6.1.1 `d884ae0` | reference | medium |
| Superpowers | using-git-worktrees | `TEMP-sources/superpowers/skills/using-git-worktrees/SKILL.md` @ v6.1.1 `d884ae0` | reference | medium |

### Matt Pocock skills / to-issues

- Belongs in: creating-solution
- Source: `TEMP-sources/mattpocock-skills/skills/engineering/to-issues/SKILL.md` @ `272f99b`
- Recommendation: copy
- Why it belongs here: The fresh file is still the closest source match for C1. It breaks "a plan, spec, or PRD into independently-grabbable issues" as explicit tracer-bullet vertical slices ("a thin vertical slice that cuts through ALL integration layers end-to-end, NOT a horizontal slice of one layer"; "demoable or verifiable on its own"), quizzes the user on granularity/dependencies before publishing (our refine-locally-then-publish move), publishes in dependency order, and labels issues "ready for AFK agents" via a triage label — mapping directly to our HITL/AFK labels. Its issue body template (What to build / Acceptance criteria / Blocked by) is a ready-made slice export shape. This bucket owns the slicing act; the tracker/label vocabulary it depends on (configured via `setup-matt-pocock-skills`) is workflow-management's coordination concern.
- Confidence: high

### Matt Pocock skills / implement

- Belongs in: creating-solution
- Source: `TEMP-sources/mattpocock-skills/skills/engineering/implement/SKILL.md` @ `272f99b`
- Recommendation: adapt
- Why it belongs here: New in this generation. It is a deliberately thin C3 executor: implement the work described by a PRD or issues, use `/tdd` at pre-agreed seams, run typechecking and single test files regularly with the full suite once at the end, run `/code-review` when done, and commit to the current branch. That is our build-verify-commit loop in five lines. Adapt to take a published slice as input, keep slice-level verification here, and route the closing review to Evaluating rather than Matt's `code-review`.
- Confidence: high

### Matt Pocock skills / tdd

- Belongs in: creating-solution
- Source: `TEMP-sources/mattpocock-skills/skills/engineering/tdd/SKILL.md` @ `272f99b`
- Recommendation: adapt
- Why it belongs here: The fresh version is substantially revised: it centers **seams** ("Test only at pre-agreed seams," confirmed with the user before any test is written), names anti-patterns (implementation-coupled, tautological, horizontal slicing), and keeps the red-green loop as "one seam, one test, one minimal implementation per cycle" with each test "a tracer bullet." It explicitly rejects horizontal slicing, matching our verticality criterion. Notable change: "Refactoring is not part of the loop" — it defers refactoring to the review stage (`code-review`), which in our terms lands in Evaluating. Adapt so tests belong to each slice and seam agreement happens during C2.
- Confidence: high

### Matt Pocock skills / diagnosing-bugs

- Belongs in: creating-solution
- Source: `TEMP-sources/mattpocock-skills/skills/engineering/diagnosing-bugs/SKILL.md` @ `272f99b`
- Recommendation: reference
- Why it belongs here: The renamed successor to `diagnose`, heavily rewritten around "Phase 1 — Build a feedback loop" ("This is the skill. Everything else is mechanical."), with a tight red-capable loop as the completion criterion, then reproduce+minimise, 3-5 ranked falsifiable hypotheses, tagged instrumentation (`[DEBUG-a4f2]`), regression test at a correct seam, and cleanup/post-mortem. It is the strongest build-loop repair discipline in any source pack when a slice misbehaves during C3. It is not the Spec-to-slices engine, so it stays a reference.
- Confidence: medium
- Please verify: Confirm whether hard-bug diagnosis is C3 repair support (here) or evidence-gathering for Evaluating; the fresh skill's hypothesis/evidence framing overlaps both.

### Matt Pocock skills / triage

- Belongs in: creating-solution
- Source: `TEMP-sources/mattpocock-skills/skills/engineering/triage/SKILL.md` @ `272f99b`
- Recommendation: reference
- Why it belongs here: The fresh version is now a full triage state machine (`needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`) that also covers external PRs and agent briefs. Its `ready-for-agent`/`ready-for-human` states are the closest external vocabulary to our HITL/AFK labels, so it remains useful when exported slices need tracker state flow. It does not slice a Spec, and its intake/verification/grilling machinery serves inbound requests, not the build.
- Confidence: medium
- Please verify: Its primary home may be workflow-management (tracker state coordination) rather than here; keep only the state vocabulary in Creating-Solution either way.

### ACT / act-create-issues

- Belongs in: creating-solution
- Source: `TEMP-sources/act/skills/act-create-issues/SKILL.md` @ 1.0.0
- Recommendation: adapt
- Why it belongs here: The 1.0.0 successor to the deprecated `act-workflow-plan` (per `TEMP-sources/act/CHANGELOG.md`, the new core workflow is Interview → Create Spec → Refine Spec → Create Work Items → Implement). It turns an approved Spec into "standalone Work Items" that "can execute independently when prerequisites are satisfied," stops on `## Blocking Questions`, requires explicit user approval of the numbered proposal (granularity, combine/split, dependency checks — our adversarial review of the breakdown), enforces coverage traceability back to the Spec and Interview Ledger, and writes a Work Item body (What to build / Required context / Acceptance criteria / Covers / Blocked by). Adapt to draft in the creating-solution document first, add HITL/AFK labels, and export via our tracker step.
- Confidence: high

### ACT / act-create-issues-flutter

- Belongs in: creating-solution
- Source: `TEMP-sources/act/skills/act-create-issues-flutter/SKILL.md` @ 1.0.0
- Recommendation: reference
- Why it belongs here: A thin wrapper that runs `act-create-issues` with Flutter guidance: "Prefer vertical Flutter slices through UI, state, services/data, and tests. Avoid horizontal slices such as all models, then all providers, then all screens," carry testing expectations (unit/widget/robot split, stable selectors, deterministic seams) into each Work Item, and avoid separate test-infrastructure Work Items unless independently valuable. Excellent per-technology slicing guidance for C1/C2 when the Spec is Flutter work; the core adapt happens on the base skill.
- Confidence: high

### ACT / act-implement

- Belongs in: creating-solution
- Source: `TEMP-sources/act/skills/act-implement/SKILL.md` @ 1.0.0
- Recommendation: adapt
- Why it belongs here: The 1.0.0 successor to the deprecated `act-workflow-work`. It is now a terse contract: implement the Work Item or Spec; stop if blockers or blocking decisions are unresolved; TDD at agreed seams when feasible; static analysis and focused tests during work, full suite once before finishing; mark all acceptance criteria completed; commit only intended files unless `--do-not-commit`. That is C3's build-verify-commit-mark loop in compressed form. Adapt to add the tracker reconciliation ("mark the issue complete") and C4 deviation capture our phase requires.
- Confidence: high

### ACT / act-implement-flutter

- Belongs in: creating-solution
- Source: `TEMP-sources/act/skills/act-implement-flutter/SKILL.md` @ 1.0.0
- Recommendation: reference
- Why it belongs here: Wrapper that runs `act-implement` with Flutter defaults: load only needed support skills (`act-flutter-development`, `act-flutter-tdd`, `act-flutter-robot-testing`), "Implement exact upstream contracts. Do not generalize specified UI text, routes, commands...," default verification to `flutter analyze`/`flutter test` (or `dart` equivalents), and a pre-finish checklist (disposal, persistence cleanup, state derivation, entry-point parity). C2/C3 technology guidance for Flutter slices.
- Confidence: high

### ACT / act-workflow-work (deprecated)

- Belongs in: creating-solution
- Source: `TEMP-sources/act/skills/act-workflow-work/SKILL.md` @ 1.0.0 (frontmatter: "Deprecated legacy workflow skill. Prefer act-implement.")
- Recommendation: reference
- Why it belongs here: Even deprecated, its "Hard Contract" and staged invariants are the most explicit tracker-reconciliation discipline in any source: "`work` is not complete until the plan file has been reconciled with the work performed," mandatory `reconcile_plan` after every phase, blocked items must stay unchecked with a documented blocker, completed phase work must not be left uncommitted, and pitfalls naming "batching tests" and "80% done syndrome." Mine these invariants when designing our build-verify-commit-mark loop; cite `act-implement` as the living surface.
- Confidence: medium

### ACT / act-flutter-development

- Belongs in: creating-solution
- Source: `TEMP-sources/act/skills/act-flutter-development/SKILL.md` @ 1.0.0
- Recommendation: reference
- Why it belongs here: C2 technical-approach knowledge for Flutter/Dart slices: YAGNI/KISS, "make it work, make it right, make it fast," consistency, visible errors, state derivation over synchronization, plus routed reference files (patterns, principles, breaking changes, official rules) loadable at lite/full/official depth. Attach per slice when the Spec names Flutter.
- Confidence: high

### ACT / act-flutter-tdd

- Belongs in: creating-solution
- Source: `TEMP-sources/act/skills/act-flutter-tdd/SKILL.md` @ 1.0.0
- Recommendation: reference
- Why it belongs here: Vertical-slice TDD discipline for Flutter: strict one-test-at-a-time red-green-refactor, explicit diagnosis of the LLM horizontal-slicing failure mode, planning-for-testability references, and the guardrail that "each red-green-refactor cycle produces a committable unit" — which matches our per-slice commit rhythm. C3 implementation discipline for Flutter slices.
- Confidence: high

### ACT / act-flutter-robot-testing

- Belongs in: creating-solution
- Source: `TEMP-sources/act/skills/act-flutter-robot-testing/SKILL.md` @ 1.0.0
- Recommendation: reference
- Why it belongs here: Robot-driven widget journey tests with stable key-first selectors, deterministic Test Seams (DI/fakes/async control), and a consistent residual-risk report format. Good C2 verification choice for user-facing Flutter slices; the risk-reporting format also feeds the confidence signals our documents want.
- Confidence: high

### ACT / act-flutter-screenshot

- Belongs in: creating-solution
- Source: `TEMP-sources/act/skills/act-flutter-screenshot/SKILL.md` @ 1.0.0
- Recommendation: reference
- Why it belongs here: A concrete visual verification loop for UI slices: make change → prompt user to hot reload (never `flutter attach`) → capture via the ACT-owned script → read and verify against expectations → iterate. Slice-level proof for visual work before Evaluating's deeper review.
- Confidence: high

### ACT / act-git-commit

- Belongs in: creating-solution
- Source: `TEMP-sources/act/skills/act-git-commit/SKILL.md` @ 1.0.0
- Recommendation: reference
- Why it belongs here: Deterministic conventional-commit mechanics for staged slice work with a minimal allowed-command workflow (`git diff --cached --name-status`, `--shortstat`, optional `git log --oneline -5`, then commit) and explicit forbidden commands. Creating-Solution ends each built slice with a commit; this supplies the mechanics without context waste.
- Confidence: high

### ACT / act-git-push-make-pr

- Belongs in: creating-solution
- Source: `TEMP-sources/act/skills/act-git-push-make-pr/SKILL.md` @ 1.0.0
- Recommendation: reference
- Why it belongs here: Publication side of C3: checks for uncommitted changes, collects branch evidence (`git diff <base>...HEAD`, `git log`), treats git history as the source of truth and workflow artifacts (Work Item/Spec) only as validated enrichment, enforces a strict PR title policy, and aborts if generated content does not match the branch diff. Updated in 1.0.0 to support workflow files and confirmation flows.
- Confidence: medium
- Please verify: Decide whether PR creation happens inside Creating-Solution or only after Evaluating's ship gate.

### Codex Product Design / image-to-code

- Belongs in: creating-solution
- Source: `TEMP-sources/product-design-0.1.47/skills/image-to-code/SKILL.md` @ 0.1.47
- Recommendation: adapt
- Why it belongs here: Unchanged at 0.1.47. Implements a selected visual target as a faithful, interactive frontend — explicitly gated on a confirmed design brief from `get-context` (our upstream phases), with asset generation rules, measured layout, and a blocking `design-qa` loop until `final result: passed`. Once Developing-Ideas has chosen the design, this is C3 execution for design-to-code slices, with the QA gate serving as slice-level proof.
- Confidence: high

### Codex Product Design / url-to-code

- Belongs in: creating-solution
- Source: `TEMP-sources/product-design-0.1.47/skills/url-to-code/SKILL.md` @ 0.1.47
- Recommendation: adapt
- Why it belongs here: Unchanged at 0.1.47. Clones a confirmed source URL into a runnable local frontend with hard evidence rules ("Capture source evidence first... Do not build from memory") and the same blocking design-qa gate. Belongs only after the target is chosen and scoped; the evidence-before-build discipline transfers well to our verify-as-you-go stance.
- Confidence: high

### Codex Product Design / design-qa

- Belongs in: creating-solution
- Source: `TEMP-sources/product-design-0.1.47/skills/design-qa/SKILL.md` @ 0.1.47
- Recommendation: reference
- Why it belongs here: An internal, blocking build gate comparing source visual target against rendered implementation (same viewport/state, combined comparison input, required fidelity surfaces, P0-P3 severities, `passed`/`blocked` verdict written to `design-qa.md`). Its own frontmatter routes "broad UX critique, design critique, product audits" to `audit` — i.e., it is deliberately slice-level verification, not deep acceptance. That fits here; Evaluating owns the wider verdict.
- Confidence: medium

### VGV Wingspan / build

- Belongs in: creating-solution
- Source: `TEMP-sources/vgv-wingspan/skills/build/SKILL.md` @ `7691c77`
- Recommendation: adapt
- Why it belongs here: Executes an implementation plan task by task: implement in dependency order, "tests are non-negotiable" per unit, validate after each task, checkpoint progress, then a new **surgical-diff gate** (diff the branch against merge-base, remove untraceable churn before review), five parallel review agents, final validation, cleanup, conventional commit, and ship via `/create-pr skip-checks`. This is the strongest full C3 model in the sources. Adapt to our slice/tracker flow; the five-agent quality review phase overlaps Evaluating and should be scoped or handed over (see Subagents).
- Confidence: high

### VGV Wingspan / plan

- Belongs in: creating-solution
- Source: `TEMP-sources/vgv-wingspan/skills/plan/SKILL.md` @ `7691c77`
- Recommendation: adapt
- Why it belongs here: Turns a brainstorm/feature description into an actionable plan with targeted local research, a conditional external-research decision matrix, user-flow analysis, and — new in this generation — a **Success Criteria Gate**: every criterion must be machine-checkable with `verify: <command>` (or `verify: manual <steps>`), and vacuous criteria are rejected and rewritten with the user's approval. That gate is exactly the shape our slice acceptance criteria and verification slices need. Adapt to take our Spec as input and emit C1/C2 slices rather than a standalone plan phase.
- Confidence: high

### VGV Wingspan / plan-technical-review

- Belongs in: evaluating (referenced by creating-solution)
- Source: `TEMP-sources/vgv-wingspan/skills/plan-technical-review/SKILL.md` @ `7691c77`
- Recommendation: reference
- Why it belongs here: Runs three agents in parallel over a plan (`code-simplicity-review-agent`, `vgv-review-agent`, `plan-splitting-agent`) and, if a split is recommended, generates standalone part-plans with dependency notes after user approval. This is the closest source implementation of an adversarial review of the slice breakdown before issue export, including the granularity criterion (via plan splitting). Under the locked rule that adversarial reviews are invocations of the Evaluating engine, Evaluating is the single adapt owner; Creating-Solution references it as the pre-export review it calls on its own slice plan.
- Confidence: high

### VGV Wingspan / create-pr

- Belongs in: creating-solution
- Source: `TEMP-sources/vgv-wingspan/skills/create-pr/SKILL.md` @ `7691c77`
- Recommendation: adapt
- Why it belongs here: Now the single publication skill (with `create-commit` removed this generation, it owns stage → conventional commit → push → local CI checks → open PR, with secret-file guards, user confirmation before commit and before PR creation, and template-aware PR bodies). Supplies the commit-and-publish mechanics at the end of C3 while keeping external side effects behind explicit confirmation.
- Confidence: high

### VGV Wingspan / rebase

- Belongs in: creating-solution
- Source: `TEMP-sources/vgv-wingspan/skills/rebase/SKILL.md` @ `7691c77`
- Recommendation: reference
- Why it belongs here: New skill: safely rebases the feature branch onto the detected base branch (precondition checks, stash handling, abort-on-conflict with restore, force-push warning). Operational support that keeps a slice branch mergeable during a long build; not a phase artifact.
- Confidence: medium

### VGV Wingspan / create

- Belongs in: creating-solution
- Source: `TEMP-sources/vgv-wingspan/skills/create/SKILL.md` @ `7691c77`
- Recommendation: reference
- Why it belongs here: New skill, but **not** a successor to the removed `create-branch` — it is a thin project-scaffolding router that matches the request against companion-plugin recommendation files and delegates to that plugin's create skill. Relevant only when a slice's technical approach requires scaffolding a new project/package; the routing pattern is also a nice model for per-technology C2 delegation.
- Confidence: medium

### VGV Wingspan / hotfix

- Belongs in: creating-solution
- Source: `TEMP-sources/vgv-wingspan/skills/hotfix/SKILL.md` @ `7691c77`
- Recommendation: reference
- Why it belongs here: Emergency path that skips brainstorm/plan but keeps tests and review non-negotiable: triage → locate (via `codebase-review-agent`) → `hotfix/` branch → blast-radius check (>5 files or multiple layers escalates to `/plan`) → minimal fix with a bug-reproducing test → reduced two-agent review → cherry-pick-friendly commit and PR. A useful exception path when the "Spec" is a narrow bug report, but it bypasses the full phase sequence.
- Confidence: medium
- Please verify: Decide whether emergency hotfixes are a Creating-Solution shortcut or their own cross-phase exception.

### VGV AI Flutter Plugin / green-gate

- Belongs in: creating-solution
- Source: `TEMP-sources/vgv-ai-flutter-plugin/skills/green-gate/SKILL.md` @ `d513aac`
- Recommendation: adapt
- Why it belongs here: New this generation and a near-perfect model of slice/branch-level build verification: an autonomous verify-fix-rerun loop across four gates (analyze → format → test → coverage) that "exits only when a single final iteration proves all four pass with observed numbers," never caches green, never weakens a gate, tracks failure fingerprints to detect no-progress/oscillation, and escalates on genuine product decisions. "Exit only on observed numbers" is our evidence-backed slice proof stated as an algorithm. Adapt by generalizing the four gates to the project's own toolchain (the staged version is bound to Dart/Flutter MCP tools); the loop-state/escalation design transfers as-is.
- Confidence: high

### VGV AI Flutter Plugin / layered-architecture

- Belongs in: creating-solution
- Source: `TEMP-sources/vgv-ai-flutter-plugin/skills/layered-architecture/SKILL.md` @ `d513aac`
- Recommendation: reference
- Why it belongs here: C2 technical approach for Flutter monorepo slices: four layers as packages with strict unidirectional dependencies, worked patterns, anti-pattern table, and step-by-step workflows for adding data sources/repositories/features. Attach per slice; note that a tracer-bullet slice cuts through all four layers.
- Confidence: high

### VGV AI Flutter Plugin / bloc

- Belongs in: creating-solution
- Source: `TEMP-sources/vgv-ai-flutter-plugin/skills/bloc/SKILL.md` @ `d513aac`
- Recommendation: reference
- Why it belongs here: Implementation and test conventions for Bloc/Cubit slices (blocTest, mocktail, Page/View separation, sealed events, Equatable states), used when the chosen technical approach names Bloc.
- Confidence: high

### VGV AI Flutter Plugin / testing

- Belongs in: creating-solution
- Source: `TEMP-sources/vgv-ai-flutter-plugin/skills/testing/SKILL.md` @ `d513aac`
- Recommendation: reference
- Why it belongs here: Dart/Flutter unit, widget, and golden test conventions (structure that reads as sentences, private mocks, isolation rules, pumpApp helper, behavior-over-properties) for slice-level verification of Flutter work.
- Confidence: high

### VGV AI Flutter Plugin / create-project

- Belongs in: creating-solution
- Source: `TEMP-sources/vgv-ai-flutter-plugin/skills/create-project/SKILL.md` @ `d513aac`
- Recommendation: reference
- Why it belongs here: Scaffolds Dart/Flutter projects and packages from Very Good CLI templates via the MCP server, inferring the template from context. Belongs when a slice's technical approach requires creating a new package/app (e.g., `dart_package` for data/repository layers).
- Confidence: medium
- Please verify: Use only for slices that explicitly require scaffolding; otherwise it invites scope expansion.

### VGV AI Flutter Plugin / navigation

- Belongs in: creating-solution
- Source: `TEMP-sources/vgv-ai-flutter-plugin/skills/navigation/SKILL.md` @ `d513aac`
- Recommendation: reference
- Why it belongs here: GoRouter conventions (typed routes, hierarchical structure, no `extra`, context extensions) for implementation slices involving routes, redirects, or deep links.
- Confidence: high

### VGV AI Flutter Plugin / ui-package

- Belongs in: creating-solution
- Source: `TEMP-sources/vgv-ai-flutter-plugin/skills/ui-package/SKILL.md` @ `d513aac`
- Recommendation: reference
- Why it belongs here: C2/C3 reference for building reusable Flutter UI packages on Material (ThemeExtension tokens, one widget per file, barrel API, widget tests for every widget).
- Confidence: high

### Superpowers / writing-plans

- Belongs in: creating-solution
- Source: `TEMP-sources/superpowers/skills/writing-plans/SKILL.md` @ v6.1.1 `d884ae0`
- Recommendation: adapt
- Why it belongs here: v6 verified: writes implementation plans for an engineer with zero context — exact file paths, complete code in every step, bite-sized 2-5 minute steps, TDD, frequent commits. New in this generation: a **Task Right-Sizing** rule (a task is "the smallest unit that carries its own test cycle and is worth a fresh reviewer's gate"), a mandatory plan header with **Global Constraints** copied verbatim from the spec, an Interfaces block per task (consumes/produces), a "No Placeholders" failure list, and a structured self-review (spec coverage, placeholder scan, type consistency). Adapt the output into our document's Slices and Technical Approach sections; the right-sizing rule maps directly to our granularity criterion.
- Confidence: high

### Superpowers / executing-plans

- Belongs in: creating-solution
- Source: `TEMP-sources/superpowers/skills/executing-plans/SKILL.md` @ v6.1.1 `d884ae0`
- Recommendation: adapt
- Why it belongs here: v6 verified: simplified to load-plan → review critically → execute tasks exactly with verifications → hand off to `finishing-a-development-branch`, with explicit stop-and-ask triggers and "never start implementation on main/master without explicit user consent." It now openly recommends `subagent-driven-development` when subagents are available; keep this as the inline C3 execution loop for harnesses without subagent support.
- Confidence: high

### Superpowers / subagent-driven-development

- Belongs in: creating-solution
- Source: `TEMP-sources/superpowers/skills/subagent-driven-development/SKILL.md` @ v6.1.1 `d884ae0`
- Recommendation: adapt
- Why it belongs here: Heavily expanded in v6: fresh implementer subagent per task, a two-verdict task review (spec compliance + code quality) after each, and one broad whole-branch review at the end; pre-flight plan conflict scan; explicit model selection per role; file-based handoffs (`scripts/task-brief`, `scripts/review-package`) so briefs/diffs/reports never pollute the controller's context; and a **durable progress ledger** (`.superpowers/sdd/progress.md`) that survives compaction. This matches our "build slices one at a time" plus "spawn focused reviewers" model, and the ledger idea reinforces our durable-document stance (the always-on position file itself is workflow-management's `workflow-tracker.md`).
- Confidence: high

### Superpowers / test-driven-development

- Belongs in: creating-solution
- Source: `TEMP-sources/superpowers/skills/test-driven-development/SKILL.md` @ v6.1.1 `d884ae0`
- Recommendation: adapt
- Why it belongs here: v6 verified; the Iron Law ("NO PRODUCTION CODE WITHOUT A FAILING TEST FIRST"), red-green-refactor with mandatory watch-it-fail/watch-it-pass steps, rationalization tables, and a completion checklist. Enforces failing-test-first inside slice implementation. Adapt to defer seam choice to C2 and keep the loop per-slice.
- Confidence: high

### Superpowers / verification-before-completion

- Belongs in: evaluating (referenced by creating-solution)
- Source: `TEMP-sources/superpowers/skills/verification-before-completion/SKILL.md` @ v6.1.1 `d884ae0`
- Recommendation: reference
- Why it belongs here: v6 verified: "NO COMPLETION CLAIMS WITHOUT FRESH VERIFICATION EVIDENCE," a five-step gate function before any success claim, and claim-to-evidence tables (tests, build, bug fixed, agent completed). This is the discipline behind "verify each slice as it goes" and honest tracker marking, but Evaluating is the single copy owner for the cross-phase evidence rule. Creating-Solution references it for slice-level completion claims inside the build loop.
- Confidence: high
- Collision resolved 2026-07-03: Evaluating is the single copy owner.

### Superpowers / finishing-a-development-branch

- Belongs in: creating-solution
- Source: `TEMP-sources/superpowers/skills/finishing-a-development-branch/SKILL.md` @ v6.1.1 `d884ae0`
- Recommendation: adapt
- Why it belongs here: v6 verified and extended: verify tests first, then **detect environment** (normal repo vs linked worktree vs detached HEAD via `git-dir`/`git-common-dir`), present exactly 4 (or 3) structured options (merge / PR / keep / discard), typed confirmation for discard, and provenance-based worktree cleanup (only remove worktrees under `.worktrees/`). Fits the end of a Creating-Solution build branch, with shipping still gated by Evaluating.
- Confidence: high

### Superpowers / systematic-debugging

- Belongs in: creating-solution
- Source: `TEMP-sources/superpowers/skills/systematic-debugging/SKILL.md` @ v6.1.1 `d884ae0`
- Recommendation: reference
- Why it belongs here: v6 verified: four mandatory phases (root cause → pattern analysis → hypothesis → implementation), the 3-failed-fixes-means-question-the-architecture rule, and rationalization tables. Repair discipline when a slice hits bugs or failing tests during C3; not the main build engine. Overlaps Matt's `diagnosing-bugs`; pick one as the canonical repair loop during synthesis.
- Confidence: medium

### Superpowers / requesting-code-review

- Belongs in: creating-solution
- Source: `TEMP-sources/superpowers/skills/requesting-code-review/SKILL.md` @ v6.1.1 `d884ae0`
- Recommendation: reference
- Why it belongs here: v6 verified: dispatch a reviewer subagent with precisely crafted context (SHAs, description, requirements — never session history), act on Critical/Important findings before proceeding. Useful as per-slice reviewer dispatch inside the build loop; deep quality verdicts and the final review engine belong to Evaluating.
- Confidence: medium

### Superpowers / receiving-code-review

- Belongs in: creating-solution
- Source: `TEMP-sources/superpowers/skills/receiving-code-review/SKILL.md` @ v6.1.1 `d884ae0`
- Recommendation: reference
- Why it belongs here: v6 verified: verify-before-implementing feedback discipline (no performative agreement, clarify all unclear items before implementing any, one item at a time with tests, technical pushback rules, YAGNI check). Governs how the builder responds to review findings during the build loop; the review verdicts themselves are Evaluating's.
- Confidence: medium

### Superpowers / using-git-worktrees

- Belongs in: creating-solution
- Source: `TEMP-sources/superpowers/skills/using-git-worktrees/SKILL.md` @ v6.1.1 `d884ae0`
- Recommendation: reference
- Why it belongs here: v6 revised: detect existing isolation first (with a submodule guard), prefer the harness's native worktree tools, git-worktree fallback with ignore verification and a clean test baseline. Operational workspace support for isolated slice work, not a phase artifact.
- Confidence: medium
- Please verify: Confirm whether Structured Workflow wants built-in worktree policy or leaves it to harness-specific setup.

## Hooks

| Source Pack | Hook | Source (TEMP-sources path + pin) | Recommendation | Confidence |
| --- | --- | --- | --- | --- |
| ACT | Dart format on edit (PostToolUse) | `TEMP-sources/act/hooks/hooks.json` + `hooks/claude/act-claude-dart-format.js` + `hooks/core/act-dart-formatter.js` @ 1.0.0 | adapt | high |
| ACT | Session logging (all lifecycle events) | `TEMP-sources/act/hooks/hooks.json` + `hooks/claude/act-claude-log-session.js` + `hooks/core/act-logger.js` @ 1.0.0 | reference | medium |
| ACT | Statusline | `TEMP-sources/act/hooks/hooks.json` + `hooks/claude/act-claude-statusline.js` @ 1.0.0 | reference | low |
| VGV AI Flutter Plugin | analyze.sh (PostToolUse Edit\|Write, blocking) | `TEMP-sources/vgv-ai-flutter-plugin/hooks/hooks.json` + `hooks/scripts/analyze.sh` @ `d513aac` | adapt | high |
| VGV AI Flutter Plugin | format.sh (PostToolUse Edit\|Write, non-blocking) | `TEMP-sources/vgv-ai-flutter-plugin/hooks/hooks.json` + `hooks/scripts/format.sh` @ `d513aac` | adapt | high |
| VGV AI Flutter Plugin | block-cli-workarounds.sh (PreToolUse Bash, blocking) | `TEMP-sources/vgv-ai-flutter-plugin/hooks/hooks.json` + `hooks/scripts/block-cli-workarounds.sh` @ `d513aac` | reference | medium |
| VGV AI Flutter Plugin | check-vgv-cli.sh (PreToolUse MCP matcher) | `TEMP-sources/vgv-ai-flutter-plugin/hooks/hooks.json` + `hooks/scripts/check-vgv-cli.sh` @ `d513aac` | reference | medium |
| VGV AI Flutter Plugin | warn-missing-mcp.sh (SessionStart) | `TEMP-sources/vgv-ai-flutter-plugin/hooks/hooks.json` + `hooks/scripts/warn-missing-mcp.sh` @ `d513aac` | reference | medium |
| VGV AI Flutter Plugin | allow-readonly-git.sh (agent-scoped PreToolUse Bash) | `TEMP-sources/vgv-ai-flutter-plugin/hooks/scripts/allow-readonly-git.sh` (declared in `agents/flutter-reviewer.md`) @ `d513aac` | reference | medium |
| VGV Wingspan | recommend-plugins.sh (PreToolUse Read\|Glob\|Grep) | `TEMP-sources/vgv-wingspan/hooks/hooks.json` + `hooks/recommend-plugins.sh` @ `7691c77` | reference | medium |
| Superpowers | session-start (SessionStart bootstrap) | `TEMP-sources/superpowers/hooks/hooks.json` + `hooks/session-start` @ v6.1.1 `d884ae0` | reference | high |

### ACT / Dart format on edit

- Belongs in: creating-solution
- Source: `TEMP-sources/act/hooks/hooks.json` (PostToolUse, matcher `Edit|Write`) + `TEMP-sources/act/hooks/claude/act-claude-dart-format.js` + `TEMP-sources/act/hooks/core/act-dart-formatter.js` @ 1.0.0
- Recommendation: adapt
- Why it belongs here: Trigger and behavior verified in source: after every Edit/Write, `act-dart-formatter.js` normalizes candidate paths, keeps only existing `.dart` files (explicitly skipping generated `.g.dart`), and runs `dart format` per file, surfacing the first error (including "dart executable not found"). This is build-time hygiene at edit granularity — keeping every slice commit formatted without spending model turns on it. Adapt the pattern to the project's formatter, not just Dart.
- Confidence: high

### ACT / Session logging

- Belongs in: creating-solution
- Source: `TEMP-sources/act/hooks/hooks.json` (SessionStart, UserPromptSubmit, PreToolUse, PostToolUse on AskUserQuestion, PostToolUseFailure, PermissionRequest, SubagentStart/Stop, PreCompact, SessionEnd) + `TEMP-sources/act/hooks/core/act-logger.js` @ 1.0.0
- Recommendation: reference
- Why it belongs here: `act-logger.js` appends timestamped event lines to a per-session file under `ai_logs/` (auto-gitignored). During the build this yields an audit trail of what the agent actually did per slice — useful evidence for C4 justified changes and honest tracker marking. It is cross-phase infrastructure though, so the primary home may be workflow-management; keep here only as the build-time evidence use case.
- Confidence: medium
- Please verify: Confirm final ownership (workflow-management vs here) for session logging.

### ACT / Statusline

- Belongs in: creating-solution
- Source: `TEMP-sources/act/hooks/hooks.json` (`statusLine` command) + `TEMP-sources/act/hooks/claude/act-claude-statusline.js` @ 1.0.0
- Recommendation: reference
- Why it belongs here: Displays context usage, model, directory, branch, and task in the harness statusline. Ambient situational awareness while building; harness-specific nicety, not a workflow behavior we need to port.
- Confidence: low

### VGV AI Flutter Plugin / analyze.sh

- Belongs in: creating-solution
- Source: `TEMP-sources/vgv-ai-flutter-plugin/hooks/hooks.json` (PostToolUse, matcher `Edit|Write`) + `TEMP-sources/vgv-ai-flutter-plugin/hooks/scripts/analyze.sh` @ `d513aac`
- Recommendation: adapt
- Why it belongs here: Runs `dart analyze` on each modified `.dart` file and **exits 2 on failure (blocking)** — per the plugin's own docs, "Claude must fix the issue" before proceeding. This is the tightest possible slice-level verification loop: an edit cannot land broken. The green-gate skill explicitly treats these rejections as in-round analyze-gate feedback. Adapt the block-on-analyzer-error pattern to the project's linter.
- Confidence: high

### VGV AI Flutter Plugin / format.sh

- Belongs in: creating-solution
- Source: `TEMP-sources/vgv-ai-flutter-plugin/hooks/hooks.json` (PostToolUse, matcher `Edit|Write`) + `TEMP-sources/vgv-ai-flutter-plugin/hooks/scripts/format.sh` @ `d513aac`
- Recommendation: adapt
- Why it belongs here: Runs `dart format` on each modified `.dart` file, always exiting 0 (non-blocking). Pairs with analyze.sh as edit-time build hygiene; same adaptation note as ACT's formatter (they are alternative implementations of one pattern — pick one during synthesis).
- Confidence: high

### VGV AI Flutter Plugin / block-cli-workarounds.sh

- Belongs in: creating-solution
- Source: `TEMP-sources/vgv-ai-flutter-plugin/hooks/hooks.json` (PreToolUse, matcher `Bash`) + `TEMP-sources/vgv-ai-flutter-plugin/hooks/scripts/block-cli-workarounds.sh` @ `d513aac`
- Recommendation: reference
- Why it belongs here: Blocks Bash invocations that bypass the sanctioned VGV CLI MCP tools (exits 2). The general idea — force verification through the sanctioned toolchain so results are trustworthy — supports slice-level proof, but the mechanism is tightly coupled to the VGV MCP setup.
- Confidence: medium

### VGV AI Flutter Plugin / check-vgv-cli.sh

- Belongs in: creating-solution
- Source: `TEMP-sources/vgv-ai-flutter-plugin/hooks/hooks.json` (PreToolUse, matcher `mcp__.*very-good-cli__.*`) + `TEMP-sources/vgv-ai-flutter-plugin/hooks/scripts/check-vgv-cli.sh` @ `d513aac`
- Recommendation: reference
- Why it belongs here: Auto-approves Very Good CLI MCP tool calls when the CLI is installed and >= 1.3.0; denies with an install/upgrade message otherwise. Toolchain-precondition enforcement for the build environment; VGV-specific.
- Confidence: medium

### VGV AI Flutter Plugin / warn-missing-mcp.sh

- Belongs in: creating-solution
- Source: `TEMP-sources/vgv-ai-flutter-plugin/hooks/hooks.json` (SessionStart) + `TEMP-sources/vgv-ai-flutter-plugin/hooks/scripts/warn-missing-mcp.sh` @ `d513aac`
- Recommendation: reference
- Why it belongs here: Non-blocking session-start warning when the Very Good CLI is missing or outdated. Surfacing missing build-tooling before work starts is a useful pattern for C2 (the technical approach names tools; this verifies they exist).
- Confidence: medium

### VGV AI Flutter Plugin / allow-readonly-git.sh

- Belongs in: creating-solution
- Source: `TEMP-sources/vgv-ai-flutter-plugin/hooks/scripts/allow-readonly-git.sh`, declared as an agent-scoped PreToolUse hook in `TEMP-sources/vgv-ai-flutter-plugin/agents/flutter-reviewer.md` @ `d513aac`
- Recommendation: reference
- Why it belongs here: Restricts the `flutter-reviewer` agent's Bash to `git diff`/`git status` only (exits 2 on anything else, including compound-command bypass), enforcing the reviewer's read-only contract at the hook layer instead of trusting the prompt. Travels with wherever the reviewer subagent lands (see Subagents); the enforce-review-contracts-with-hooks pattern is worth copying for any reviewer we build.
- Confidence: medium

### VGV Wingspan / recommend-plugins.sh

- Belongs in: creating-solution
- Source: `TEMP-sources/vgv-wingspan/hooks/hooks.json` (PreToolUse, matcher `Read|Glob|Grep`, timeout 10) + `TEMP-sources/vgv-wingspan/hooks/recommend-plugins.sh` @ `7691c77`
- Recommendation: reference
- Why it belongs here: On the first matched tool call per session, scans declarative JSON files in `hooks/recommendations/` (detect file/glob + grep pattern → plugin + marketplace), collects every match for plugins not yet installed, and emits them once as `additionalContext` (with a `/tmp` marker suppressing repeats). This is C2 support: detecting the project's technology and suggesting the right companion tooling while the technical approach is being chosen. Data-driven and easily generalized.
- Confidence: medium

### Superpowers / session-start

- Belongs in: workflow-management (listed here for completeness)
- Source: `TEMP-sources/superpowers/hooks/hooks.json` (SessionStart, matcher `startup|clear|compact`) + `TEMP-sources/superpowers/hooks/session-start` @ v6.1.1 `d884ae0`
- Recommendation: reference
- Why it does not belong here: The script reads `skills/using-superpowers/SKILL.md` in full and injects it as session context (JSON-escaped, per-platform output format) so skills auto-trigger from the first message. That is skill-routing bootstrap — always-on workflow infrastructure, not a build-phase behavior. Workflow-management owns it; Creating-Solution just benefits (its skills get triggered at the right moments).
- Confidence: high

## Subagents (custom droids)

| Source Pack | Agent | Source (TEMP-sources path + pin) | Recommendation | Confidence |
| --- | --- | --- | --- | --- |
| ACT | codebase-researcher | `TEMP-sources/act/agents/act/codebase-researcher.md` @ 1.0.0 | adapt | high |
| ACT | flutter-docs-researcher | `TEMP-sources/act/agents/act/flutter-docs-researcher.md` @ 1.0.0 | reference | high |
| ACT | flutter-patterns-researcher | `TEMP-sources/act/agents/act/flutter-patterns-researcher.md` @ 1.0.0 | reference | medium |
| VGV Wingspan | research/official-docs-research-agent | `TEMP-sources/vgv-wingspan/agents/research/official-docs-research-agent.md` @ `7691c77` | adapt | high |
| VGV Wingspan | research/best-practices-research-agent | `TEMP-sources/vgv-wingspan/agents/research/best-practices-research-agent.md` @ `7691c77` | adapt | medium |
| VGV Wingspan | analysis/plan-splitting-agent | `TEMP-sources/vgv-wingspan/agents/analysis/plan-splitting-agent.md` @ `7691c77` | adapt | high |
| VGV Wingspan | analysis/user-flow-analysis-agent | `TEMP-sources/vgv-wingspan/agents/analysis/user-flow-analysis-agent.md` @ `7691c77` | reference | medium |
| VGV Wingspan | quality-review/pr-readiness-review-agent | `TEMP-sources/vgv-wingspan/agents/quality-review/pr-readiness-review-agent.md` @ `7691c77` | reference | high |
| VGV Wingspan | codebase-review/codebase-review-agent | `TEMP-sources/vgv-wingspan/agents/codebase-review/codebase-review-agent.md` @ `7691c77` | reference | medium |
| VGV Wingspan | codebase-review/vgv-review-agent | `TEMP-sources/vgv-wingspan/agents/codebase-review/vgv-review-agent.md` @ `7691c77` | reference | medium |
| VGV Wingspan | codebase-review/code-simplicity-review-agent | `TEMP-sources/vgv-wingspan/agents/codebase-review/code-simplicity-review-agent.md` @ `7691c77` | reference | medium |
| VGV Wingspan | quality-review/architecture-review-agent | `TEMP-sources/vgv-wingspan/agents/quality-review/architecture-review-agent.md` @ `7691c77` | reference | medium |
| VGV Wingspan | quality-review/test-quality-review-agent | `TEMP-sources/vgv-wingspan/agents/quality-review/test-quality-review-agent.md` @ `7691c77` | reference | medium |
| VGV AI Flutter Plugin | flutter-reviewer | `TEMP-sources/vgv-ai-flutter-plugin/agents/flutter-reviewer.md` @ `d513aac` | reference | medium |
| Codex Product Design | agents/openai.yaml | `TEMP-sources/product-design-0.1.47/agents/openai.yaml` @ 0.1.47 | omit | high |

### ACT / codebase-researcher

- Belongs in: creating-solution
- Source: `TEMP-sources/act/agents/act/codebase-researcher.md` @ 1.0.0
- Recommendation: adapt
- Why it belongs here: A read-only (edit/bash denied) research subagent that, given a feature or Spec summary, maps project structure, state-management and data-layer patterns, 2-3 reference implementations, and conventions, returning a structured report ("Be specific... Don't invent: only report what you actually find"). This is exactly the grounding C1/C2 needs so slices and technical approach match what the codebase actually uses (our review criterion). Adapt away the Flutter-specific search recipes; the shape generalizes.
- Confidence: high

### ACT / flutter-docs-researcher

- Belongs in: creating-solution
- Source: `TEMP-sources/act/agents/act/flutter-docs-researcher.md` @ 1.0.0
- Recommendation: reference
- Why it belongs here: Researches SDK features or packages with a mandatory deprecation/breaking-change check before recommending anything, version pinning against `pubspec.lock`, prioritized sources (Context7 → official docs → pub.dev → GitHub → web), and source-code exploration when docs fall short. C2 support when a Flutter slice's technical approach involves an unfamiliar API. Overlaps Wingspan's `official-docs-research-agent`, which is the tech-agnostic adapt; keep this as the Flutter-specialized reference.
- Confidence: high

### ACT / flutter-patterns-researcher

- Belongs in: creating-solution
- Source: `TEMP-sources/act/agents/act/flutter-patterns-researcher.md` @ 1.0.0
- Recommendation: reference
- Why it belongs here: Read-only agent that mines ACT's own knowledge base (`act-flutter-development` references) for patterns/principles relevant to a task and returns a concise applicable-guidance summary. Useful C2 pattern lookup, but it is tightly coupled to ACT's bundled reference files.
- Confidence: medium

### VGV Wingspan / research/official-docs-research-agent

- Belongs in: creating-solution
- Source: `TEMP-sources/vgv-wingspan/agents/research/official-docs-research-agent.md` @ `7691c77`
- Recommendation: adapt
- Why it belongs here: Tech-agnostic documentation researcher: identifies the exact installed version from the project's lock file, runs a **mandatory deprecation/sunset check** before recommending any external API, gathers official docs via Context7 with web-search fallback, explores package source and tests, and reports version constraints, implementation guide, and gotchas. Invoked from `/plan`'s conditional external research — in our terms, C2 evidence for choosing a slice's technical approach. Retrieval-led rather than training-led, which matches our house rules.
- Confidence: high

### VGV Wingspan / research/best-practices-research-agent

- Belongs in: creating-solution
- Source: `TEMP-sources/vgv-wingspan/agents/research/best-practices-research-agent.md` @ `7691c77`
- Recommendation: adapt
- Why it belongs here: Synthesizes best practices with an explicit authority ladder — project conventions/CLAUDE.md first, then installed skills, then official docs, then community — plus the same mandatory deprecation check, and requires source attribution per recommendation ("VGV conventions recommend..." vs "Official documentation recommends..."). That prioritization (codebase conventions beat generic best practice) is exactly how our C2 should resolve conflicts. Adapt the VGV-specific authority naming.
- Confidence: medium

### VGV Wingspan / analysis/plan-splitting-agent

- Belongs in: creating-solution
- Source: `TEMP-sources/vgv-wingspan/agents/analysis/plan-splitting-agent.md` @ `7691c77`
- Recommendation: adapt
- Why it belongs here: Assesses whether a plan is too large for one reviewable PR using multi-signal judgment (estimated LOC ~600 soft threshold, layers touched, new files/packages, separability), proposes split boundaries along logical seams where "every PR must leave the codebase in a working state," and deliberately refuses awkward splits ("Never force a bad split"). This is our granularity and sequencing review criterion as a dispatchable reviewer for the slice breakdown before export.
- Confidence: high

### VGV Wingspan / analysis/user-flow-analysis-agent

- Belongs in: creating-solution
- Source: `TEMP-sources/vgv-wingspan/agents/analysis/user-flow-analysis-agent.md` @ `7691c77`
- Recommendation: reference
- Why it belongs here: Invoked by `/plan` to analyze the drafted plan for flow completeness and gap identification, feeding updated success criteria. Maps to our coverage criterion in the breakdown review, though flow-gap analysis also borders Developing-Ideas' Spec completeness; keep as a reviewer-lens reference here.
- Confidence: medium

### VGV Wingspan / quality-review/pr-readiness-review-agent

- Belongs in: evaluating (referenced by creating-solution)
- Source: `TEMP-sources/vgv-wingspan/agents/quality-review/pr-readiness-review-agent.md` @ `7691c77`
- Recommendation: reference
- Why it belongs here: Unlike its quality-review siblings, this agent is deliberately mechanical, not judgmental: formatter in check mode, linter with zero-warning policy, a debug-artifact table (prints, TODO/FIXME, commented-out code, secrets, conflict markers, skipped tests), and commit hygiene over `git log main..HEAD` — "This review is mechanical, not subjective. Every finding should be objectively verifiable." It is excellent build/publish hygiene at the end of C3, but it still produces a readiness verdict, so Evaluating is the single adapt owner. Creating-Solution references it as a pre-publish readiness check.
- Confidence: high

### VGV Wingspan / codebase-review/codebase-review-agent

- Belongs in: creating-solution
- Source: `TEMP-sources/vgv-wingspan/agents/codebase-review/codebase-review-agent.md` @ `7691c77`
- Recommendation: reference
- Why it belongs here: Dual-purpose: partly codebase research (structure, conventions, templates — the examples show "what patterns does this codebase use?"), partly quality assessment against plans. Wingspan itself now avoids re-running it during `/plan` and `/build` (context comes from brainstorm), using it mainly in `/hotfix` Phase 1 to *locate* buggy code. The research/locate use cases are C2/C3 support here; the quality-verdict half belongs to Evaluating. ACT's `codebase-researcher` is the cleaner adapt for the research role.
- Confidence: medium

### VGV Wingspan / codebase-review/vgv-review-agent

- Belongs in: evaluating (listed here as reference)
- Source: `TEMP-sources/vgv-wingspan/agents/codebase-review/vgv-review-agent.md` @ `7691c77`
- Recommendation: reference
- Why it is only a reference here: A rigorous standards-enforcement reviewer (regressions pass first, convention strictness, simplicity audit, verdict + severity counts written to a report file). `/build` Phase 3 dispatches it as part of the five-agent quality review — but that pass is a quality verdict against explicit standards, which is Evaluating's engine (criteria-first, evidence-backed verdicts). Creating-Solution references it only as the reviewer `/build` happens to call before ship.
- Confidence: medium

### VGV Wingspan / codebase-review/code-simplicity-review-agent

- Belongs in: evaluating (listed here as reference)
- Source: `TEMP-sources/vgv-wingspan/agents/codebase-review/code-simplicity-review-agent.md` @ `7691c77`
- Recommendation: reference
- Why it is only a reference here: YAGNI/minimalism reviewer producing a prioritized simplification analysis with LOC-reduction estimates and a verdict. It has one genuine Creating-Solution use — `plan-technical-review` dispatches it against the *plan* to keep the breakdown simple, which is our pre-export review — but as a code reviewer its home is Evaluating.
- Confidence: medium

### VGV Wingspan / quality-review/architecture-review-agent

- Belongs in: evaluating (listed here as reference)
- Source: `TEMP-sources/vgv-wingspan/agents/quality-review/architecture-review-agent.md` @ `7691c77`
- Recommendation: reference
- Why it is only a reference here: Post-implementation validation of layer separation, state-management correctness, dependency direction, and package structure ("Layer separation is not negotiable"). A quality verdict against architectural criteria — Evaluating's territory. Reference here because `/build` runs it as part of pre-ship review and because its checks can catch slice-level violations early.
- Confidence: medium

### VGV Wingspan / quality-review/test-quality-review-agent

- Belongs in: evaluating (listed here as reference)
- Source: `TEMP-sources/vgv-wingspan/agents/quality-review/test-quality-review-agent.md` @ `7691c77`
- Recommendation: reference
- Why it is only a reference here: Coverage audit plus test anti-pattern detection ("bad tests are worse than no tests") with a quality verdict. As with the other quality reviewers, the verdict engine belongs to Evaluating; Creating-Solution references it for slice-level "does every new unit have a real test" checks during the build.
- Confidence: medium

### VGV AI Flutter Plugin / flutter-reviewer

- Belongs in: evaluating (referenced by creating-solution)
- Source: `TEMP-sources/vgv-ai-flutter-plugin/agents/flutter-reviewer.md` @ `d513aac` (added 2026-07-02)
- Recommendation: reference
- Why it belongs here: A read-only, diff-scoped reviewer designed to be dispatched "after writing or changing Dart code" — i.e., inside the build loop, per change, not as final acceptance. Its contract is unusually well-engineered: no edit tools, Bash locked to `git diff`/`git status` by an agent-scoped hook, adaptive diff scoping (uncommitted → branch-vs-merge-base → untracked), four preloaded standards as the only findings source, a single strict findings table (`location | problem | fix | standard`), an explicit out-of-domain note so clean reviews are not mistaken for full coverage, and a rule to omit analyzer-only findings (the analyze.sh hook owns those). Evaluating is the single adapt owner for this reviewer contract; Creating-Solution references it when a slice needs a diff-scoped Dart review before handoff.
- Confidence: medium
- Collision resolved 2026-07-03: Evaluating is the single adapt owner.

### Codex Product Design / agents/openai.yaml

- Belongs in: n/a
- Source: `TEMP-sources/product-design-0.1.47/agents/openai.yaml` @ 0.1.47
- Recommendation: omit
- Why: Inspected in full: it is not a subagent definition. It contains only harness interface metadata — `display_name: "Product Design"`, a short description, and a `default_prompt` steering users to confirm the design brief first. No behavior, tools, or role to place in any bucket.
- Confidence: high

## Rename and Removal Ledger

Every old-audit entry from the six re-verified systems, with fresh disposition.

### Matt Pocock skills (all old `~/.agents/skills/<name>` local paths are gone; repo reorganized into category folders @ `272f99b`)

| Old audit entry | Disposition |
| --- | --- |
| to-issues | MOVED → `skills/engineering/to-issues/`. Content verified: still tracer-bullet vertical slicing with user quiz and dependency-ordered publishing; kept as **copy**. |
| tdd | MOVED → `skills/engineering/tdd/`. Content substantially revised: seams-first ("test only at pre-agreed seams"), anti-pattern catalog, refactoring moved out of the loop to code review. Kept as **adapt**. |
| diagnose | RENAMED → `skills/engineering/diagnosing-bugs/`. Content rewritten around building a tight, red-capable feedback loop before any hypothesis; six phases with completion criteria. Kept as **reference**. |
| triage | MOVED → `skills/engineering/triage/`. Content rewritten as a two-category/five-state machine that also triages external PRs and writes agent briefs; `ready-for-agent`/`ready-for-human` states retained. Kept as **reference**; primary home may be workflow-management. |
| (new) implement | NEW skill, `skills/engineering/implement/` — thin PRD/issues → TDD → typecheck → code-review → commit executor. Adopted as **adapt**. |

### ACT (VERSION 1.0.0, 2026-07-03; see `TEMP-sources/act/CHANGELOG.md` [1.0.0])

| Old audit entry | Disposition |
| --- | --- |
| act-workflow-plan | DEPRECATED (frontmatter: "Deprecated legacy workflow skill. Prefer act-create-issues."). Successor **act-create-issues** (+ `act-create-issues-flutter`) adopted as the citation of record for Spec→slices; the deprecated file still exists but should not be the cited surface. |
| act-workflow-work | DEPRECATED (frontmatter: "Deprecated legacy workflow skill. Prefer act-implement."). Successor **act-implement** (+ `act-implement-flutter`) is the citation of record for execution; the deprecated skill is retained as a **reference** solely for its plan-reconciliation hard contract and invariants, which the terse successor does not restate. |
| act-flutter-development | STILL PRESENT, unchanged in role. Reference retained. |
| act-flutter-tdd | STILL PRESENT, unchanged in role. Reference retained. |
| act-flutter-robot-testing | STILL PRESENT ("Test Seams" now capitalized as a workflow term). Reference retained. |
| act-flutter-screenshot | STILL PRESENT, unchanged in role. Reference retained. |
| act-git-commit | STILL PRESENT, unchanged in role. Reference retained. |
| act-git-push-make-pr | STILL PRESENT, updated in 1.0.0 "to better support workflow files and user confirmation flows" (per CHANGELOG); now validates workflow context against branch diff/log. Reference retained. |
| act-meta-audit-work (mentioned in old deferred notes) | REMOVED in 1.0.0 ("Removed the obsolete act-meta-audit-work skill"). No successor adopted. |
| (new) act-interview, act-create-spec, act-refine-spec, act-config | NEW core-workflow skills; out of this bucket (interview → inquiry-analysis; spec creation/refinement → developing-ideas; config/storage → workflow-management). |

### VGV Wingspan (@ `7691c77`, 2026-07-03)

| Old audit entry | Disposition |
| --- | --- |
| build | STILL PRESENT; revised — no longer re-runs codebase review at build start (plan carries context), adds the surgical-diff gate, and runs five named review agents in parallel with report files. Adapt retained. |
| plan | STILL PRESENT; revised — brainstorm discovery, conditional external research decision matrix, and the new machine-checkable Success Criteria Gate (`verify:` commands). Adapt retained. |
| plan-technical-review | STILL PRESENT; revised — now dispatches code-simplicity, vgv-review, and the new plan-splitting-agent, and can generate split part-plans. Adapt retained. |
| create-branch | **REMOVED** (2026-07-03). No direct successor: the new `create` skill is a project-scaffolding router, not branch creation; branch setup now happens inline (e.g., `plan` step 5.1 offers `git checkout -b <type>/<kebab-topic>`; `hotfix` creates `hotfix/<slug>` branches). Old reference entry dropped; behavior noted under `plan`/`hotfix`. |
| create-commit | **REMOVED** (2026-07-03). Its role is absorbed by **create-pr**, which now owns stage → conventional commit (with confirmation) → push → PR. Old adapt transfers to `create-pr`. |
| create-pr | STILL PRESENT; expanded per above (skip-checks argument, secret-file guards, local CI checks, template-aware bodies). Adapt retained. |
| hotfix | STILL PRESENT; verified — blast-radius check, regression-test requirement, reduced two-agent review, cherry-pick-friendly commit. Reference retained. |
| (new) rebase | NEW skill; adopted as **reference** (branch-sync operational support). |
| (new) create | NEW skill; adopted as **reference** (companion-plugin scaffolding router). |
| (new) elements-of-style | NEW style skill preloaded by review agents; prose/writing standard, out of this bucket (Evaluating/workflow-management concern). Not adopted here. |

### VGV AI Flutter Plugin (@ `d513aac`, 2026-07-02)

| Old audit entry | Disposition |
| --- | --- |
| layered-architecture, bloc, testing, create-project, navigation, ui-package | ALL STILL PRESENT; contents re-verified (directive Core Standards format, MCP-tool integration). References retained. |
| (new) green-gate | NEW skill; adopted as **adapt** — autonomous four-gate verify-fix-rerun loop, the strongest slice-verification model in the sources. |
| (new) animations, dart-flutter-sdk-upgrade, internationalization, very-good-analysis-upgrade | NEW technology/maintenance skills; per-slice C2 references at most, not adopted into the core flow (same treatment as the other tech-specific skills in the old audit's deferred list). |
| (new) agents/flutter-reviewer.md | NEW subagent (see Subagents) — adopted as **adapt** for per-slice diff review shape. |

### Superpowers (v6.1.1 @ `d884ae0`; v6 was a major revision — every previously cited skill re-read in full)

| Old audit entry | Disposition |
| --- | --- |
| writing-plans | STILL PRESENT; v6 adds Task Right-Sizing, mandatory plan header with Global Constraints, Interfaces blocks, No-Placeholders failure list, and a structured self-review. Adapt retained. |
| executing-plans | STILL PRESENT; v6 simplified to a three-step inline loop and now explicitly recommends subagent-driven-development when subagents exist. Adapt retained. |
| subagent-driven-development | STILL PRESENT; v6 heavily expanded — two-verdict task review, pre-flight plan conflict scan, per-role model selection, file handoffs via `scripts/task-brief`/`scripts/review-package`, and the durable progress ledger. Adapt retained. |
| test-driven-development | STILL PRESENT; content substantively the same Iron-Law discipline. Adapt retained. |
| systematic-debugging | STILL PRESENT; same four-phase root-cause discipline plus 3-failures→question-architecture rule. Reference retained. |
| verification-before-completion | STILL PRESENT; same evidence-before-claims gate function. Adapt retained. |
| requesting-code-review | STILL PRESENT; verified — reviewer subagent with crafted context, code-reviewer.md template also consumed by SDD's final review. Reference retained. |
| receiving-code-review | STILL PRESENT; verified — verify-before-implementing, clarify-all-first, no performative agreement. Reference retained. |
| finishing-a-development-branch | STILL PRESENT; v6 adds environment detection (worktree/detached-HEAD menus) and provenance-based cleanup. Adapt retained. |
| using-git-worktrees | STILL PRESENT; v6 adds Step 0 isolation detection with submodule guard and native-tool preference. Reference retained. |
| (new) writing-skills | NEW to the audit surface; skill-authoring meta-skill, out of this bucket (workflow-management/meta). Not adopted here. |
| hooks/session-start | Now cataloged in the Hooks section: SessionStart bootstrap injecting `using-superpowers`; assigned to workflow-management. |

### Codex Product Design (0.1.47 — only cached version; not re-fetched)

| Old audit entry | Disposition |
| --- | --- |
| image-to-code, url-to-code, design-qa | UNCHANGED at 0.1.47; contents re-read in full and recommendations retained (adapt/adapt/reference). |
| agents/openai.yaml | Inspected this pass: interface metadata only, not a subagent. Recorded as omit. |

## Not Re-Verified This Pass (long tail)

The following entries are preserved from the previous audit pass without re-verification. Sources cited below were not re-staged; treat paths and pins as historical.

### Cursor Team Kit

| Skill | Source | Recommendation | Confidence |
| --- | --- | --- | --- |
| check-compiler-errors | https://github.com/cursor/plugins/tree/main/cursor-team-kit/skills/check-compiler-errors | reference | high |
| control-cli | https://github.com/cursor/plugins/tree/main/cursor-team-kit/skills/control-cli | reference | high |
| control-ui | https://github.com/cursor/plugins/tree/main/cursor-team-kit/skills/control-ui | reference | high |
| fix-ci | https://github.com/cursor/plugins/tree/main/cursor-team-kit/skills/fix-ci | reference | medium |
| fix-merge-conflicts | https://github.com/cursor/plugins/tree/main/cursor-team-kit/skills/fix-merge-conflicts | reference | medium |
| loop-on-ci | https://github.com/cursor/plugins/tree/main/cursor-team-kit/skills/loop-on-ci | reference | medium |
| new-branch-and-pr | https://github.com/cursor/plugins/tree/main/cursor-team-kit/skills/new-branch-and-pr | adapt | high |
| review-and-ship | https://github.com/cursor/plugins/tree/main/cursor-team-kit/skills/review-and-ship | adapt | medium |
| run-smoke-tests | https://github.com/cursor/plugins/tree/main/cursor-team-kit/skills/run-smoke-tests | reference | high |
| verify-this | https://github.com/cursor/plugins/tree/main/cursor-team-kit/skills/verify-this | adapt | high |

Prior justifications (verbatim summaries): check-compiler-errors — focused loop to fix and rerun blocking compile/type checks; control-cli — repeatable local harnesses for CLI/TUI slice verification; control-ui — browser/CDP harnesses for local UI slice verification; fix-ci — iterates failing PR checks to green (final ship gate remains Evaluating); fix-merge-conflicts — conflict resolution as operational support; loop-on-ci — monitors PR checks until green (overlaps Evaluating's evidence gate); new-branch-and-pr — compact branch→implement→test→commit→push→PR loop; review-and-ship — diff-targeted review/fix/ship, keep "review" scoped to slice readiness so it does not absorb Evaluating; run-smoke-tests — smoke verification before handoff; verify-this — turns a slice claim into a falsifiable local verification with baseline/treatment evidence and a verdict.

### Bug Hunter

| Skill | Source | Recommendation | Confidence |
| --- | --- | --- | --- |
| bug-hunter | https://github.com/codexstar69/bug-hunter/blob/main/SKILL.md | reference | medium |
| fixer | https://github.com/codexstar69/bug-hunter/tree/main/skills/fixer | reference | medium |

Prior justifications: bug-hunter — find/verify/fix/re-verify pipeline usable for bug-fix slices but heavier than the core C3 loop (please verify whether to reference only the fix pipeline); fixer — minimal surgical fixes for verified bugs, matching C3's smallest durable change rule (use only with a verified bug list).

### Flutter official skills

| Skill | Source | Recommendation | Confidence |
| --- | --- | --- | --- |
| flutter-apply-architecture-best-practices | https://github.com/flutter/skills/tree/main/skills/flutter-apply-architecture-best-practices | reference | high |
| flutter-add-widget-test | https://github.com/flutter/skills/tree/main/skills/flutter-add-widget-test | reference | high |
| flutter-add-integration-test | https://github.com/flutter/skills/tree/main/skills/flutter-add-integration-test | reference | high |
| flutter-build-responsive-layout | https://github.com/flutter/skills/tree/main/skills/flutter-build-responsive-layout | reference | high |
| flutter-fix-layout-issues | https://github.com/flutter/skills/tree/main/skills/flutter-fix-layout-issues | reference | high |
| flutter-implement-json-serialization | https://github.com/flutter/skills/tree/main/skills/flutter-implement-json-serialization | reference | high |
| flutter-setup-declarative-routing | https://github.com/flutter/skills/tree/main/skills/flutter-setup-declarative-routing | reference | high |
| flutter-use-http-package | https://github.com/flutter/skills/tree/main/skills/flutter-use-http-package | reference | high |

Prior justification (shared): concrete implementation/verification workflows for specific Flutter slice types (architecture layers, widget/integration tests, responsive layout, layout repair, serialization, routing, networking) — C2/C3 technology references attached per slice.

### Dart official skills

| Skill | Source | Recommendation | Confidence |
| --- | --- | --- | --- |
| dart-add-unit-test | https://github.com/dart-lang/skills/tree/main/skills/dart-add-unit-test | reference | high |
| dart-build-cli-app | https://github.com/dart-lang/skills/tree/main/skills/dart-build-cli-app | reference | high |
| dart-fix-runtime-errors | https://github.com/dart-lang/skills/tree/main/skills/dart-fix-runtime-errors | reference | high |
| dart-run-static-analysis | https://github.com/dart-lang/skills/tree/main/skills/dart-run-static-analysis | reference | high |
| dart-generate-test-mocks | https://github.com/dart-lang/skills/tree/main/skills/dart-generate-test-mocks | reference | high |
| dart-resolve-package-conflicts | https://github.com/dart-lang/skills/tree/main/skills/dart-resolve-package-conflicts | reference | medium |

Prior justification (shared): slice-level test creation, CLI implementation, runtime-error repair, static-analysis verification, mock generation, and dependency resolution for Dart slices — technology references, with dart-resolve-package-conflicts used narrowly (please verify: only for slices whose Spec names dependency changes).

### Factory/Droid borrowed

Note: local copies under `r-and-d/borrowed-factory-skills` were deleted on 2026-07-03; entries retained by name only.

| Skill | Source | Recommendation | Confidence |
| --- | --- | --- | --- |
| agent-browser | (deleted local copy; retained by name) | reference | high |
| qa | (deleted local copy; retained by name) | reference | medium |
| simplify | (deleted local copy; retained by name) | reference | medium |

Prior justifications: agent-browser — browser automation, screenshots, and interaction loops for verifying UI/web slices as built; qa — diff-targeted functional QA proving branch/slice behavior with real user flows (please verify: Factory QA config assumptions may not transfer; adapt only the diff-targeted idea); simplify — local cleanup pass after a slice, kept within slice scope to avoid drifting into Evaluating.

### planning-with-files

| Skill | Source | Recommendation | Confidence |
| --- | --- | --- | --- |
| planning-with-files | https://github.com/OthmanAdi/planning-with-files/tree/master/.codex/skills/planning-with-files | reference | medium |

Prior justification: persistent `task_plan.md`/`progress.md`, completion checks, and session recovery are useful durable-progress patterns, but Structured Workflow already defines its own phase documents and `workflow-tracker.md` — copy mechanics only (please verify: likely a cross-phase workflow-management reference rather than an installable Creating-Solution skill).

### vgv-pr-roundtrip (user-authored; local path still exists)

| Skill | Source | Recommendation | Confidence |
| --- | --- | --- | --- |
| vgv-pr-roundtrip | /Users/jholt/development/structured-workflow-mcp/r-and-d/cleanup-2026-06-04/saved/vgv-pr-roundtrip/SKILL.md | adapt | high |

Prior justification: an explicit ticket loop — choose the next buildable slice, build it, run review rounds, commit/push, open PR, address review feedback, reconcile docs, stop at merge-ready — strongly matching C3 plus tracker/PR flow, with VGV-specific review counts adapted out.

### Linear curated

| Skill | Source | Recommendation | Confidence |
| --- | --- | --- | --- |
| linear | /Users/jholt/.codex/plugins/cache/openai-curated/linear/e2d08a2e/skills/linear/SKILL.md | adapt | high |

Prior justification: Creating-Solution exports reviewed slices to the issue tracker and marks work in progress/complete; Linear supplies the issue/project/status operations for that tracker flow, with external side effects kept behind confirmation.

### Sentry curated

| Skill | Source | Recommendation | Confidence |
| --- | --- | --- | --- |
| sentry | /Users/jholt/.codex/plugins/cache/openai-curated/sentry/e2d08a2e/skills/sentry/SKILL.md | reference | medium |

Prior justification: Sentry can provide implementation evidence for production bug slices and confirm runtime failures before or after a fix — observability support, not the primary slice engine (please verify: include only for bug/incident slices where Sentry is the named evidence source).
