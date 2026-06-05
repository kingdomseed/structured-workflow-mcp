# Workflow-Management Skill Audit

## Bucket Definition

Workflow-Management is the cross-phase support layer for Structured Workflow. It is not a fifth MYP phase. It includes skills, hooks, memory patterns, trackers, handoffs, glossary mechanics, continuity behavior, project templates, context-recovery systems, issue-tracker coordination, and reusable working conventions that keep the four-phase cycle coherent across context shifts.

Inclusion rule: include only skills that maintain or recover the workflow state across phases, move durable artifacts between phases, configure the project-level workflow surface, or preserve shared language/context. Skills that primarily perform inquiry, ideation, implementation, testing, code review, design work, or domain-specific engineering are deferred to the relevant phase unless they contain a reusable workflow-management mechanic.

## Included Skills

| Source Pack | Skill | Source | Recommendation | Confidence |
| --- | --- | --- | --- | --- |
| Matt Pocock skills | handoff | /Users/jholt/.agents/skills/handoff/SKILL.md; https://github.com/mattpocock/skills/tree/main/skills/handoff | adapt | high |
| Matt Pocock skills | setup-matt-pocock-skills | /Users/jholt/.agents/skills/setup-matt-pocock-skills/SKILL.md; https://github.com/mattpocock/skills/tree/main/skills/setup-matt-pocock-skills | adapt | high |
| Matt Pocock skills | to-issues | /Users/jholt/.agents/skills/to-issues/SKILL.md; https://github.com/mattpocock/skills/tree/main/skills/to-issues | adapt | high |
| Matt Pocock skills | to-prd | /Users/jholt/.agents/skills/to-prd/SKILL.md; https://github.com/mattpocock/skills/tree/main/skills/to-prd | reference | medium |
| Matt Pocock skills | triage | /Users/jholt/.agents/skills/triage/SKILL.md; https://github.com/mattpocock/skills/tree/main/skills/triage | adapt | high |
| Matt Pocock skills | ubiquitous-language | /Users/jholt/.agents/skills/ubiquitous-language/SKILL.md; https://github.com/mattpocock/skills/tree/main/skills/ubiquitous-language | adapt | high |
| Matt Pocock skills | grill-with-docs | /Users/jholt/.agents/skills/grill-with-docs/SKILL.md; https://github.com/mattpocock/skills/tree/main/skills/grill-with-docs | reference | medium |
| ACT | act-workflow-work | /Users/jholt/.agentic-coding-toolkit/skills/act-workflow-work/SKILL.md | adapt | high |
| ACT | act-workflow-compound | /Users/jholt/.agentic-coding-toolkit/skills/act-workflow-compound/SKILL.md | adapt | high |
| ACT | act-meta-audit-work | /Users/jholt/.agentic-coding-toolkit/skills/act-meta-audit-work/SKILL.md | adapt | high |
| ACT | act-git-worktree | /Users/jholt/.agentic-coding-toolkit/skills/act-git-worktree/SKILL.md | reference | medium |
| Codex Product Design | user-context | /Users/jholt/.codex/plugins/cache/openai-curated-remote/product-design/0.1.43/skills/user-context/SKILL.md | adapt | high |
| Codex Product Design | get-context | /Users/jholt/.codex/plugins/cache/openai-curated-remote/product-design/0.1.43/skills/get-context/SKILL.md | reference | medium |
| VGV Wingspan | create-branch | https://github.com/VeryGoodOpenSource/vgv-wingspan/tree/main/skills/create-branch | reference | medium |
| VGV Wingspan | refine-approach | https://github.com/VeryGoodOpenSource/vgv-wingspan/tree/main/skills/refine-approach | adapt | medium |
| VGV Wingspan | debrief | https://github.com/VeryGoodOpenSource/vgv-wingspan/tree/main/skills/debrief | adapt | medium |
| Superpowers | using-superpowers | https://github.com/obra/superpowers/tree/main/skills/using-superpowers | adapt | medium |
| Superpowers | dispatching-parallel-agents | https://github.com/obra/superpowers/tree/main/skills/dispatching-parallel-agents | adapt | high |
| Superpowers | subagent-driven-development | https://github.com/obra/superpowers/tree/main/skills/subagent-driven-development | adapt | medium |
| Superpowers | using-git-worktrees | https://github.com/obra/superpowers/tree/main/skills/using-git-worktrees | reference | medium |
| Superpowers | verification-before-completion | https://github.com/obra/superpowers/tree/main/skills/verification-before-completion | adapt | high |
| Cursor Team Kit | workflow-from-chats | https://github.com/cursor/plugins/tree/main/cursor-team-kit/skills/workflow-from-chats | adapt | high |
| Cursor Team Kit | make-pr-easy-to-review | https://github.com/cursor/plugins/tree/main/cursor-team-kit/skills/make-pr-easy-to-review | reference | medium |
| Factory/Droid borrowed | session-navigation | /Users/jholt/development/structured-workflow-mcp/r-and-d/borrowed-factory-skills/builtin/session-navigation/SKILL.md | adapt | high |
| Factory/Droid borrowed | init | /Users/jholt/development/structured-workflow-mcp/r-and-d/borrowed-factory-skills/builtin/init/SKILL.md | adapt | medium |
| Factory/Droid borrowed | incident-guidelines | /Users/jholt/development/structured-workflow-mcp/r-and-d/borrowed-factory-skills/builtin/incident-guidelines/SKILL.md | reference | medium |
| Factory/Droid borrowed | wiki | /Users/jholt/development/structured-workflow-mcp/r-and-d/borrowed-factory-skills/builtin/wiki/SKILL.md | reference | medium |
| Bug Hunter | bug-hunter | https://github.com/codexstar69/bug-hunter/blob/main/SKILL.md | reference | medium |
| planning-with-files | planning-with-files | https://github.com/OthmanAdi/planning-with-files/tree/main/skills/planning-with-files | adapt | high |
| Cline Memory Bank | Memory Bank | https://docs.cline.bot/best-practices/memory-bank | adapt | high |
| vgv-pr-roundtrip | vgv-pr-roundtrip | /Users/jholt/development/structured-workflow-mcp/r-and-d/cleanup-2026-06-04/saved/vgv-pr-roundtrip/SKILL.md | adapt | high |
| Linear curated | linear | /Users/jholt/.codex/plugins/cache/openai-curated/linear/e2d08a2e/skills/linear/SKILL.md | reference | high |

## Justifications

### Matt Pocock skills / handoff

- Belongs in: workflow-management
- Source: /Users/jholt/.agents/skills/handoff/SKILL.md; https://github.com/mattpocock/skills/tree/main/skills/handoff
- Recommendation: adapt
- Why it belongs here: Structured Workflow explicitly needs handoff mechanics so work survives context loss. This skill already avoids duplicating durable artifacts and references PRDs, plans, ADRs, issues, commits, and diffs by path or URL, which matches the repo's fixed-file continuity model.
- Confidence: high

### Matt Pocock skills / setup-matt-pocock-skills

- Belongs in: workflow-management
- Source: /Users/jholt/.agents/skills/setup-matt-pocock-skills/SKILL.md; https://github.com/mattpocock/skills/tree/main/skills/setup-matt-pocock-skills
- Recommendation: adapt
- Why it belongs here: It configures repo-level agent guidance, issue-tracker location, triage labels, and domain-doc layout. Structured Workflow needs the same kind of project template/configuration surface for `GLOSSARY.md`, `workflow-tracker.md`, phase docs, issue tracker export, and project Definition of Done.
- Confidence: high

### Matt Pocock skills / to-issues

- Belongs in: workflow-management
- Source: /Users/jholt/.agents/skills/to-issues/SKILL.md; https://github.com/mattpocock/skills/tree/main/skills/to-issues
- Recommendation: adapt
- Why it belongs here: The Creating-Solution doc says the reviewed slice breakdown is exported to the issue tracker Matt Pocock `to-issues` style. Its vertical-slice, HITL/AFK, dependency, and tracker-publish mechanics are direct workflow-management material.
- Confidence: high

### Matt Pocock skills / to-prd

- Belongs in: workflow-management
- Source: /Users/jholt/.agents/skills/to-prd/SKILL.md; https://github.com/mattpocock/skills/tree/main/skills/to-prd
- Recommendation: reference
- Why it belongs here: Most PRD synthesis belongs in Developing-Ideas, but the tracker-publish behavior, label application, testing-decision preservation, and "do not re-interview, synthesize from existing context" rule are useful cross-phase handoff mechanics.
- Confidence: medium
- Please verify: Confirm whether PRD publication belongs in workflow-management or should remain only in the Developing-Ideas phase skill with a small workflow-management reference.

### Matt Pocock skills / triage

- Belongs in: workflow-management
- Source: /Users/jholt/.agents/skills/triage/SKILL.md; https://github.com/mattpocock/skills/tree/main/skills/triage
- Recommendation: adapt
- Why it belongs here: It defines issue states, ready-for-agent vs ready-for-human routing, issue resumption, and durable agent briefs. Those map closely to Structured Workflow's human-ready/agent-ready distinction and the issue tracker as the task workspace.
- Confidence: high

### Matt Pocock skills / ubiquitous-language

- Belongs in: workflow-management
- Source: /Users/jholt/.agents/skills/ubiquitous-language/SKILL.md; https://github.com/mattpocock/skills/tree/main/skills/ubiquitous-language
- Recommendation: adapt
- Why it belongs here: The authority docs make `GLOSSARY.md` always on, updated across all phases, and glossary-only. This skill provides the strongest source pattern for ambiguity detection, canonical term choice, aliases to avoid, and relationship capture.
- Confidence: high

### Matt Pocock skills / grill-with-docs

- Belongs in: workflow-management
- Source: /Users/jholt/.agents/skills/grill-with-docs/SKILL.md; https://github.com/mattpocock/skills/tree/main/skills/grill-with-docs
- Recommendation: reference
- Why it belongs here: It contains useful mechanics for updating glossary/domain docs inline, challenging terminology against existing docs, and creating ADRs sparingly. The interview itself belongs mostly in Inquiry-Analysis, but the glossary/ADR mechanics are cross-phase.
- Confidence: medium
- Please verify: Keep the interview behavior out of workflow-management unless final synthesis wants a shared glossary-maintenance subroutine.

### ACT / act-workflow-work

- Belongs in: workflow-management
- Source: /Users/jholt/.agentic-coding-toolkit/skills/act-workflow-work/SKILL.md
- Recommendation: adapt
- Why it belongs here: Its hard contract is plan truthfulness: completed checklist items must be reconciled with actual work, blockers remain explicit, final validation is required, and the top-level controller remains responsible even when subagents execute. That is directly useful for keeping `workflow-tracker.md`, phase documents, and issue state truthful.
- Confidence: high

### ACT / act-workflow-compound

- Belongs in: workflow-management
- Source: /Users/jholt/.agentic-coding-toolkit/skills/act-workflow-compound/SKILL.md
- Recommendation: adapt
- Why it belongs here: It captures reusable session insights after feature delivery, refactors, bug fixes, reviews, or diagnostics. Structured Workflow can adapt this as a bounded "promote durable learning" mechanic for project templates, glossary updates, and future-cycle context without turning phase docs into transcripts.
- Confidence: high

### ACT / act-meta-audit-work

- Belongs in: workflow-management
- Source: /Users/jholt/.agentic-coding-toolkit/skills/act-meta-audit-work/SKILL.md
- Recommendation: adapt
- Why it belongs here: It audits a prior run using logs, git history, plan state, and a verified/likely/not-provable evidence model. That maps cleanly to Structured Workflow's confidence discipline and context-recovery needs after delegated or interrupted work.
- Confidence: high

### ACT / act-git-worktree

- Belongs in: workflow-management
- Source: /Users/jholt/.agentic-coding-toolkit/skills/act-git-worktree/SKILL.md
- Recommendation: reference
- Why it belongs here: Isolated worktrees support multi-agent work and protect concurrent sessions. The reusable part is not the ACT script itself but the workflow-management policy around branch isolation, env copying, `.gitignore` safety, and explicit cleanup confirmation.
- Confidence: medium
- Please verify: Include only if Structured Workflow will own workspace-isolation guidance rather than leaving it to harness-specific companions.

### Codex Product Design / user-context

- Belongs in: workflow-management
- Source: /Users/jholt/.codex/plugins/cache/openai-curated-remote/product-design/0.1.43/skills/user-context/SKILL.md
- Recommendation: adapt
- Why it belongs here: It manages saved product/design context so future work starts from known sources. Structured Workflow needs a generic version for project templates, standing criteria, source locations, product/domain references, and recurring context anchors.
- Confidence: high

### Codex Product Design / get-context

- Belongs in: workflow-management
- Source: /Users/jholt/.codex/plugins/cache/openai-curated-remote/product-design/0.1.43/skills/get-context/SKILL.md
- Recommendation: reference
- Why it belongs here: Its "brief gate" pattern confirms context before downstream design/build actions. Structured Workflow can reference the gating mechanics for phase-entry checks, but the product-design specifics belong in phase or domain skills.
- Confidence: medium
- Please verify: Decide whether this should be represented as a generic phase-entry checklist rather than a workflow-management skill.

### VGV Wingspan / create-branch

- Belongs in: workflow-management
- Source: https://github.com/VeryGoodOpenSource/vgv-wingspan/tree/main/skills/create-branch
- Recommendation: reference
- Why it belongs here: It sets up a branch or worktree before artifacts are written and asks the user to confirm workspace type. That is relevant to workflow continuity and multi-agent safety, especially when phase documents and implementation artifacts should not land on the wrong branch.
- Confidence: medium
- Please verify: Keep as reference-only unless final Structured Workflow scope includes branch/worktree orchestration.

### VGV Wingspan / refine-approach

- Belongs in: workflow-management
- Source: https://github.com/VeryGoodOpenSource/vgv-wingspan/tree/main/skills/refine-approach
- Recommendation: adapt
- Why it belongs here: The clear-context handoff and document-readiness loop are useful for moving from one artifact to the next. Its review criteria also resemble Structured Workflow's adversarial boundary checks, but most artifact-specific review belongs in Evaluating.
- Confidence: medium
- Please verify: Avoid duplicating Evaluating; extract only the handoff and "ready for next context" mechanics.

### VGV Wingspan / debrief

- Belongs in: workflow-management
- Source: https://github.com/VeryGoodOpenSource/vgv-wingspan/tree/main/skills/debrief
- Recommendation: adapt
- Why it belongs here: It captures timelines, root cause, evidence, and action items while context is fresh. Structured Workflow can adapt this as a cycle-closing or loop-back memory pattern, especially when Evaluation seeds a new cycle.
- Confidence: medium
- Please verify: Confirm whether incident/debrief output is part of workflow-management or a specialized Evaluating add-on.

### Superpowers / using-superpowers

- Belongs in: workflow-management
- Source: https://github.com/obra/superpowers/tree/main/skills/using-superpowers
- Recommendation: adapt
- Why it belongs here: It defines skill routing, instruction priority, platform adaptation, and when to invoke process skills. Structured Workflow needs a lighter version so phase skills, cross-phase workflow-management skills, agents, and hooks activate consistently.
- Confidence: medium
- Please verify: The source is intentionally forceful; adapt the routing concept without importing its "always use a skill" posture wholesale.

### Superpowers / dispatching-parallel-agents

- Belongs in: workflow-management
- Source: https://github.com/obra/superpowers/tree/main/skills/dispatching-parallel-agents
- Recommendation: adapt
- Why it belongs here: Structured Workflow docs repeatedly call for focused reviewers in parallel. This skill provides reusable mechanics for independent domains, scoped prompts, isolated context, and integration of subagent results.
- Confidence: high

### Superpowers / subagent-driven-development

- Belongs in: workflow-management
- Source: https://github.com/obra/superpowers/tree/main/skills/subagent-driven-development
- Recommendation: adapt
- Why it belongs here: Its fresh-subagent-per-task model, spec-review then quality-review loop, and controller responsibility are useful for workflow-management coordination. The implementation-plan execution details belong in Creating-Solution.
- Confidence: medium
- Please verify: Extract only orchestration and review handoff mechanics; do not make workflow-management own build execution.

### Superpowers / using-git-worktrees

- Belongs in: workflow-management
- Source: https://github.com/obra/superpowers/tree/main/skills/using-git-worktrees
- Recommendation: reference
- Why it belongs here: It supplies workspace-isolation policy, branch/worktree detection, native-tool preference, and ignored-directory safety. This is useful when multiple agents work around the same phase documents and codebase.
- Confidence: medium
- Please verify: Include only if Structured Workflow will document concurrency/workspace isolation.

### Superpowers / verification-before-completion

- Belongs in: workflow-management
- Source: https://github.com/obra/superpowers/tree/main/skills/verification-before-completion
- Recommendation: adapt
- Why it belongs here: It is a cross-phase honesty gate: claims require fresh evidence. Structured Workflow's confidence model and Evaluation engine need this exact discipline, generalized beyond code checks to Design Briefs, PRDs, issue breakdowns, and final solutions.
- Confidence: high

### Cursor Team Kit / workflow-from-chats

- Belongs in: workflow-management
- Source: https://github.com/cursor/plugins/tree/main/cursor-team-kit/skills/workflow-from-chats
- Recommendation: adapt
- Why it belongs here: It extracts durable working preferences from recent chats and converts them into skills, rules, or workflow docs. Structured Workflow needs this as a controlled way to promote repeated human preferences into project templates or agent instructions without bloating phase docs.
- Confidence: high

### Cursor Team Kit / make-pr-easy-to-review

- Belongs in: workflow-management
- Source: https://github.com/cursor/plugins/tree/main/cursor-team-kit/skills/make-pr-easy-to-review
- Recommendation: reference
- Why it belongs here: It improves handoff reviewability without changing behavior by clarifying PR descriptions, reviewer guidance, generated files, risks, and important paths. That can inform Structured Workflow's final handoff/release summary mechanics.
- Confidence: medium
- Please verify: PR reviewability may belong to Creating-Solution or Evaluating if workflow-management stays limited to state continuity.

### Factory/Droid borrowed / session-navigation

- Belongs in: workflow-management
- Source: /Users/jholt/development/structured-workflow-mcp/r-and-d/borrowed-factory-skills/builtin/session-navigation/SKILL.md
- Recommendation: adapt
- Why it belongs here: It is explicitly a context-recovery system: list, search, resume, and inspect prior sessions by project/date/content. Structured Workflow needs the same capability, likely pointed at durable phase docs and tracker state rather than proprietary Droid session stores.
- Confidence: high

### Factory/Droid borrowed / init

- Belongs in: workflow-management
- Source: /Users/jholt/development/structured-workflow-mcp/r-and-d/borrowed-factory-skills/builtin/init/SKILL.md
- Recommendation: adapt
- Why it belongs here: It creates repo-level agent/contributor guidelines. Structured Workflow needs project initialization templates for the workflow activation contract, fixed working files, and allowed side effects.
- Confidence: medium
- Please verify: Adapt as a project-template initializer, not as a generic AGENTS.md generator.

### Factory/Droid borrowed / incident-guidelines

- Belongs in: workflow-management
- Source: /Users/jholt/development/structured-workflow-mcp/r-and-d/borrowed-factory-skills/builtin/incident-guidelines/SKILL.md
- Recommendation: reference
- Why it belongs here: It stores learned alert mappings, required tools, auth methods, repos, and gotchas for recurring RCA. The reusable idea is a memory pattern for operational project templates and recurring context, not the incident-specific table.
- Confidence: medium
- Please verify: Include only as a pattern for project templates or domain-specific standing criteria.

### Factory/Droid borrowed / wiki

- Belongs in: workflow-management
- Source: /Users/jholt/development/structured-workflow-mcp/r-and-d/borrowed-factory-skills/builtin/wiki/SKILL.md
- Recommendation: reference
- Why it belongs here: It generates interconnected repository documentation and supports incremental refresh from a base wiki. Structured Workflow can borrow the "rebuild only affected context" idea for project context recovery, but the wiki generator itself is broader than this bucket.
- Confidence: medium
- Please verify: Keep generated repo docs separate from the small fixed working set.

### Bug Hunter / bug-hunter

- Belongs in: workflow-management
- Source: https://github.com/codexstar69/bug-hunter/blob/main/SKILL.md
- Recommendation: reference
- Why it belongs here: The security pipeline is domain-specific, but its checkpointed verification, resume state for large codebases, staged artifacts, and independent challenge/referee roles are strong patterns for trustworthy cross-phase evaluation and recovery.
- Confidence: medium
- Please verify: Do not import bug/security scanning as workflow-management; only borrow checkpoint/resume and adversarial-verdict mechanics.

### planning-with-files / planning-with-files

- Belongs in: workflow-management
- Source: https://github.com/OthmanAdi/planning-with-files/tree/main/skills/planning-with-files
- Recommendation: adapt
- Why it belongs here: It is one of the README's named influences. It provides file-based planning, progress tracking, findings capture, automatic session recovery, active-plan hooks, and plan-data injection safeguards. Structured Workflow should adapt the recovery and hook mechanics into its smaller fixed set rather than copy `task_plan.md`, `findings.md`, and `progress.md` directly.
- Confidence: high

### Cline Memory Bank / Memory Bank

- Belongs in: workflow-management
- Source: https://docs.cline.bot/best-practices/memory-bank
- Recommendation: adapt
- Why it belongs here: It is the other named influence in the README. It treats markdown files as persistent memory across sessions, including active context, progress, system patterns, and context-window recovery. Structured Workflow should adapt the durable-memory principle while preserving its own bounded files: phase docs, `GLOSSARY.md`, `workflow-tracker.md`, and project templates.
- Confidence: high

### vgv-pr-roundtrip / vgv-pr-roundtrip

- Belongs in: workflow-management
- Source: /Users/jholt/development/structured-workflow-mcp/r-and-d/cleanup-2026-06-04/saved/vgv-pr-roundtrip/SKILL.md
- Recommendation: adapt
- Why it belongs here: It is a completion loop, not a one-pass coding task: build a slice, run repeated reviews, open PR, poll feedback, address comments, reconcile docs/LEARNINGS, and stop only when merge-ready. This maps to Structured Workflow's tracker reconciliation, handoff, confidence, and "do not silently skip checks" mechanics.
- Confidence: high

### Linear curated / linear

- Belongs in: workflow-management
- Source: /Users/jholt/.codex/plugins/cache/openai-curated/linear/e2d08a2e/skills/linear/SKILL.md
- Recommendation: reference
- Why it belongs here: The core README names the issue tracker as the task workspace. The Linear skill provides practical issue/project/team workflow operations, read-before-write behavior, batching, and result summaries that can inform a tracker adapter without making Structured Workflow depend on Linear.
- Confidence: high

## Borderline / Deferred

- Matt Pocock skills: `qa` is useful issue intake, but it files GitHub issues directly and belongs nearer Inquiry/Evaluating or tracker adapter design. `review`, `diagnose`, `tdd`, `prototype`, `design-an-interface`, `request-refactor-plan`, and architecture/writing skills are phase or domain skills, not workflow-management.
- ACT: `act-workflow-spec`, `act-workflow-plan`, and `act-workflow-refine-spec` are strong phase candidates for Inquiry/Developing-Ideas/Evaluating, but they primarily create or review specs/plans rather than maintain the cross-phase layer. Flutter/Dart implementation, TDD, screenshot, Sentry init, commit, push, and create skills are deferred to Creating-Solution or tool/domain packs.
- Codex Product Design: `audit`, `research`, `ideate`, `prototype`, `image-to-code`, `url-to-code`, `design-qa`, and `share` are product-design phase skills. No additional workflow-management candidate beyond `user-context` and `get-context`.
- VGV Wingspan: `brainstorm`, `plan`, `plan-technical-review`, `build`, `hotfix`, `review`, `create-pr`, `create-commit`, `rebase`, `create`, and `elements-of-style` are valuable but phase/tool-specific. `build` and `hotfix` contain progress/review mechanics, but the current docs place their core behavior in Creating-Solution and Evaluating.
- VGV AI Flutter Plugin: no strong workflow-management candidate found. The pack is Flutter/Dart domain guidance: accessibility, architecture, Bloc, security, testing, theming, navigation, localization, SDK/lint upgrades, license compliance, and project scaffolding. Defer to Creating-Solution/Evaluating or domain convention references.
- Flutter official skills: no strong workflow-management candidate found. The skills are implementation/testing primitives such as integration tests, widget tests, previews, layout, routing, localization, JSON, networking, and architecture. Defer to Creating-Solution/Evaluating.
- Dart official skills: no strong workflow-management candidate found. The skills are Dart implementation/testing primitives such as unit tests, coverage, CLI apps, static analysis, dependency conflicts, mocks, and migrations. Defer to Creating-Solution/Evaluating.
- Impeccable: deferred because https://github.com/impeccableai/impeccable returned repository not found during audit. Please verify whether the repo is private, renamed, or replaced by the local `/Users/jholt/.agents/skills/impeccable/SKILL.md`; the local skill is frontend interface work, not a strong workflow-management candidate.
- Bug Hunter: `doc-lookup`, `recon`, `hunter`, `skeptic`, `referee`, `fixer`, `security-review`, `commit-security-scan`, `threat-model-generation`, and `vulnerability-validation` are security/evaluation skills. Only the top-level checkpoint/resume/adversarial pipeline pattern is included by reference.
- Cursor Team Kit: `what-did-i-get-done` and `weekly-review` are useful status-summary references but are not included because they summarize commits rather than manage the Structured Workflow cycle. `review-and-ship`, `verify-this`, `fix-ci`, `loop-on-ci`, `get-pr-comments`, `pr-review-canvas`, `run-smoke-tests`, `control-ui`, `control-cli`, `fix-merge-conflicts`, `new-branch-and-pr`, `deslop`, `check-compiler-errors`, and strict code-quality review belong to Creating-Solution/Evaluating or tool support.
- Factory/Droid borrowed: `incident`, `qa`, `review`, `security-review`, `deep-security-review`, `simplify`, `summarize-diff`, `agent-browser`, `browse-wiki`, `install-code-review`, `install-qa`, `install-wiki`, `figma-mcp-helper`, `pdf-document`, and `powerpoint` are domain/tool/evaluation skills. Some include reusable runbook or report-template ideas, but not enough to include as workflow-management skills.
- Sentry curated: no strong workflow-management candidate found. It is read-only observability access for production issue evidence. Reference from Evaluating, incident/debrief, or source-backed diagnostics rather than this bucket.

## Notes For Final Synthesis

- Keep workflow-management small and cross-phase: phase docs remain the deep memory; `workflow-tracker.md` is position only; `GLOSSARY.md` is glossary-only; project templates carry standing criteria.
- Strongest direct sources are `planning-with-files`, Cline Memory Bank, Matt `handoff`, Matt `to-issues`, Matt `triage`, Matt `ubiquitous-language`, ACT `act-workflow-work`, ACT `act-meta-audit-work`, Product Design `user-context`, Factory `session-navigation`, and `vgv-pr-roundtrip`.
- Prefer adapt over copy. Most sources assume their own file hierarchy, tracker, or harness. Structured Workflow should preserve its own fixed-file model and use source packs for mechanics: recovery hooks, tracker adapters, handoff summaries, confidence/evidence labels, and repo-level setup.
- Do not let workflow-management absorb Evaluating. Adversarial review, testing, and verdicts are the Evaluating engine; workflow-management should route to it, preserve its results, and update position/handoff state.
- Use Linear and other tracker skills as adapters. The core model should say "issue tracker" and define required operations; Linear/GitHub/local markdown can implement those operations.
- Preserve the human-ready/agent-ready distinction everywhere tracker or handoff state is written. Several source packs use AFK/HITL or ready-for-agent/ready-for-human language; final synthesis should normalize the vocabulary.
- Any low or medium confidence candidate should be rechecked during synthesis against the final repo packaging goal so workflow-management does not become a catch-all bucket for useful process skills.
